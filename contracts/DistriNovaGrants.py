# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }
import json
from dataclasses import dataclass
from genlayer import *

@allow_storage
@dataclass
class Grant:
    id: str
    sponsor: str
    developer: str
    has_resolved: bool
    repo_url: str
    required_stars: u256
    amount: u256
    real_stars: u256

class DistriNovaGrants(gl.Contract):
    grants: TreeMap[str, Grant]
    balances: TreeMap[Address, u256]

    def __init__(self):
        pass

    def _check_milestone(self, repo_url: str, expected_name: str) -> dict:
        def get_repo_stats() -> str:
            # Render the github repo page
            web_data = gl.nondet.web.render(repo_url, mode="text")

            task = f"""
Extract the number of stars for the GitHub repository at {repo_url}.
Also, verify if the exact name "{expected_name}" appears anywhere in the repository page (e.g., as the author, in the readme, or description) to prove ownership.

Web content:
{web_data}

Respond in JSON format:
{{
    "stars": int, // The number of stargazers, e.g., 1500. Return -1 if not found.
    "owns_repo": bool // true if the name "{expected_name}" is found in the text, false otherwise.
}}
It is mandatory that you respond only using the JSON format above, nothing else.
Don't include any formatting prefix or suffix.
"""
            result = gl.nondet.exec_prompt(task, response_format="json")
            return json.dumps(result, sort_keys=True)

        result_json = json.loads(gl.eq_principle.strict_eq(get_repo_stats))
        return result_json

    @gl.public.write
    def create_grant(
        self, grant_id: str, required_stars: int, amount: int
    ) -> None:
        if grant_id in self.grants:
            raise Exception("Grant already created")

        sponsor_addr = gl.message.sender_address

        # The sponsor acts as the funder. In a complete mainnet implementation,
        # they would transfer native GEN tokens here.
        grant = Grant(
            id=grant_id,
            sponsor=sponsor_addr.as_hex,
            developer="",
            has_resolved=False,
            repo_url="",
            required_stars=u256(required_stars),
            amount=u256(amount),
            real_stars=u256(0)
        )
        self.grants[grant_id] = grant

    @gl.public.write
    def resolve_grant(self, grant_id: str, developer_name: str, developer_address: str, repo_url: str) -> None:
        if grant_id not in self.grants:
            raise Exception("Grant not found")
            
        grant = self.grants[grant_id]
        if grant.has_resolved:
            raise Exception("Grant already resolved")

        repo_stats = self._check_milestone(repo_url, developer_name)
        stars = int(repo_stats.get("stars", -1))
        owns_repo = bool(repo_stats.get("owns_repo", False))
        
        # Save the attempt data so it is visible publicly
        grant.developer = developer_address
        grant.repo_url = repo_url

        if not owns_repo:
            raise Exception("Ownership verification failed: Developer Name not found on the GitHub page.")
        
        if stars < 0:
            raise Exception("Failed to fetch repository stars")
            
        grant.real_stars = u256(stars)
        
        # If requirements met, release funds to the developer's internal balance
        if stars >= grant.required_stars:
            grant.has_resolved = True
            
            dev_addr = Address(developer_address)
            if dev_addr not in self.balances:
                self.balances[dev_addr] = u256(0)
            self.balances[dev_addr] += u256(grant.amount)

    @gl.public.write
    def claim_rewards(self) -> None:
        # Developer calls this to withdraw their successfully resolved grant payouts
        sender = gl.message.sender_address
        if sender not in self.balances or self.balances[sender] == u256(0):
            raise Exception("No funds to claim")
        
        amount_to_claim = self.balances[sender]
        self.balances[sender] = u256(0)
        # Here we would execute a native token transfer back to the sender
        # gl.bank.transfer(sender, amount_to_claim)

    @gl.public.view
    def get_grants(self) -> dict:
        result = {}
        for k, v in self.grants.items():
            result[k] = {
                "id": v.id,
                "sponsor": v.sponsor,
                "developer": v.developer,
                "has_resolved": v.has_resolved,
                "repo_url": v.repo_url,
                "required_stars": int(v.required_stars),
                "amount": int(v.amount),
                "real_stars": int(v.real_stars)
            }
        return result

    @gl.public.view
    def get_balance(self, account: str) -> int:
        return int(self.balances.get(Address(account), u256(0)))
