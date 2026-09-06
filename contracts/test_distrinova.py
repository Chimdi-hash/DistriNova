import sys
import unittest
import json
from dataclasses import dataclass

# --- MOCK GENLAYER FRAMEWORK ---
class MockAddress:
    def __init__(self, addr):
        self.addr = addr
    @property
    def as_hex(self):
        return self.addr
    def __eq__(self, other):
        return self.addr == getattr(other, 'addr', other)
    def __hash__(self):
        return hash(self.addr)

class MockMessage:
    def __init__(self, sender_address="0xMockSponsor"):
        self.sender_address = MockAddress(sender_address)

class MockWeb:
    def render(self, url, mode="text"):
        return f"Mock content for {url}"

class MockNondet:
    def __init__(self):
        self.web = MockWeb()
        # Mock LLM response to always succeed with 1500 stars and owns_repo=True
        self.mock_llm_response = {"stars": 1500, "owns_repo": True}

    def exec_prompt(self, task, response_format="json"):
        return self.mock_llm_response

class MockEqPrinciple:
    def strict_eq(self, func):
        # Simply execute the function directly instead of running consensus
        return func()

class MockGL:
    def __init__(self):
        self.message = MockMessage()
        self.nondet = MockNondet()
        self.eq_principle = MockEqPrinciple()
        
    class Contract:
        pass

    class public:
        @staticmethod
        def write(func):
            return func
        @staticmethod
        def view(func):
            return func

# Inject mock into sys.modules
gl_mock = MockGL()
sys.modules['genlayer'] = type('genlayer', (), {
    'gl': gl_mock,
    'Contract': MockGL.Contract,
    'TreeMap': dict,
    'u256': int,
    'Address': MockAddress,
    'allow_storage': lambda x: x
})

# Now import the contract
from DistriNovaGrants import DistriNovaGrants, Grant

# --- TEST SUITE ---
class TestDistriNovaGrants(unittest.TestCase):
    def setUp(self):
        self.contract = DistriNovaGrants()
        self.contract.grants = {}
        self.contract.balances = {}

    def test_create_grant(self):
        gl_mock.message = MockMessage(sender_address="0xSponsor")
        
        self.contract.create_grant(grant_id="grant1", required_stars=1000, amount=5000)
        
        self.assertIn("grant1", self.contract.grants)
        grant = self.contract.grants["grant1"]
        self.assertEqual(grant.sponsor, "0xSponsor")
        self.assertEqual(grant.amount, 5000)
        self.assertEqual(grant.required_stars, 1000)
        self.assertFalse(grant.has_resolved)

    def test_resolve_grant_success(self):
        # Setup Grant
        self.contract.create_grant(grant_id="grant1", required_stars=1000, amount=5000)
        
        # Configure AI mock to pass
        gl_mock.nondet.mock_llm_response = {"stars": 1500, "owns_repo": True}
        
        # Resolve
        self.contract.resolve_grant("grant1", "Chimdi", "0xDev", "https://github.com/chimdi/repo")
        
        # Assertions
        grant = self.contract.grants["grant1"]
        self.assertTrue(grant.has_resolved)
        self.assertEqual(grant.real_stars, 1500)
        self.assertEqual(grant.developer, "0xDev")
        self.assertEqual(self.contract.balances[MockAddress("0xDev")], 5000)

    def test_resolve_grant_ownership_failed(self):
        self.contract.create_grant(grant_id="grant2", required_stars=1000, amount=5000)
        
        # Configure AI mock to fail ownership check
        gl_mock.nondet.mock_llm_response = {"stars": 1500, "owns_repo": False}
        
        with self.assertRaises(Exception) as context:
            self.contract.resolve_grant("grant2", "Hacker", "0xHacker", "https://github.com/facebook/react")
        
        self.assertIn("Ownership verification failed", str(context.exception))
        self.assertFalse(self.contract.grants["grant2"].has_resolved)

    def test_resolve_grant_stars_not_met(self):
        self.contract.create_grant(grant_id="grant3", required_stars=1000, amount=5000)
        
        # AI says only 500 stars
        gl_mock.nondet.mock_llm_response = {"stars": 500, "owns_repo": True}
        
        self.contract.resolve_grant("grant3", "Chimdi", "0xDev", "https://github.com/chimdi/repo")
        
        grant = self.contract.grants["grant3"]
        self.assertEqual(grant.real_stars, 500)
        self.assertFalse(grant.has_resolved)  # Not resolved!
        self.assertNotIn(MockAddress("0xDev"), self.contract.balances)  # No funds released

    def test_claim_rewards(self):
        # Developer has funds
        dev_addr = MockAddress("0xDev")
        self.contract.balances[dev_addr] = 5000
        
        # Set message sender to developer
        gl_mock.message = MockMessage(sender_address="0xDev")
        
        self.contract.claim_rewards()
        
        # Balance should be 0 after claim
        self.assertEqual(self.contract.balances[dev_addr], 0)

    def test_claim_rewards_empty(self):
        gl_mock.message = MockMessage(sender_address="0xEmpty")
        
        with self.assertRaises(Exception) as context:
            self.contract.claim_rewards()
            
        self.assertIn("No funds to claim", str(context.exception))

if __name__ == '__main__':
    unittest.main()
