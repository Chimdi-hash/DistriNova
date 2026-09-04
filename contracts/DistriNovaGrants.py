import json
from dataclasses import dataclass
from genlayer import *

@allow_storage
@dataclass
class Grant:
    id: str
    developer: Address
    has_resolved: bool
    repo_url: str
    required_stars: int
    amount: u256
    real_stars: int

class DistriNovaGrants(gl.Contract):
    grants: TreeMap[str, Grant]
    balances: TreeMap[Address, u256]

    def __init__(self):
        pass

    def _check_milestone(self, repo_url: str) -> dict:
        def get_repo_stats() -> str:
            # Render the github repo page
            web_data = gl.nondet.web.render(repo_url, mode="text")

            task = f"""
Extract the number of stars for the GitHub repository at {repo_url}.

Web content:
{web_data}

Respond in JSON format:
{{
    "stars": int // The number of stargazers, e.g., 1500. Return -1 if not found.
}}
It is mandatory that you respond only using the JSON format above, nothing else.
Don't include any formatting prefix or suffix.
"""
            result = gl.nondet.exec_prompt(task, response_format="json")
            return json.dumps(result, sort_keys=True)

        result_json = json.loads(gl.eq_principle.strict_eq(get_repo_stats))
        return result_json

    @gl.public.write
    def fund_contract(self) -> None:
        # A simple method to add funds to the contract balance pool
        sender = gl.message.sender_address
        value = gl.message.value
        if sender not in self.balances:
            self.balances[sender] = u256(0)
        self.balances[sender] += value

    @gl.public.write
    def create_grant(
        self, grant_id: str, developer: str, repo_url: str, required_stars: int, amount: int
    ) -> None:
        sender_address = gl.message.sender_address
        
        if grant_id in self.grants:
            raise Exception("Grant already created")

        # In a real startup scenario, a DAO or sponsor would escrow funds here.
        # For simplicity, we just log the grant.
        grant = Grant(
            id=grant_id,
            developer=Address(developer),
            has_resolved=False,
            repo_url=repo_url,
            required_stars=required_stars,
            amount=u256(amount),
            real_stars=0
        )
        self.grants[grant_id] = grant

    @gl.public.write
    def resolve_grant(self, grant_id: str) -> None:
        if grant_id not in self.grants:
            raise Exception("Grant not found")
            
        grant = self.grants[grant_id]
        if grant.has_resolved:
            raise Exception("Grant already resolved")

        repo_stats = self._check_milestone(grant.repo_url)
        stars = int(repo_stats.get("stars", -1))
        
        if stars < 0:
            raise Exception("Failed to fetch repository stars")
            
        grant.real_stars = stars
        
        if stars >= grant.required_stars:
            grant.has_resolved = True
            
            # Payout logic
            if grant.developer not in self.balances:
                self.balances[grant.developer] = u256(0)
            self.balances[grant.developer] += grant.amount

    @gl.public.view
    def get_grants(self) -> dict:
        # Cannot return dataclass directly, need to convert to dict manually
        result = {}
        for k, v in self.grants.items():
            result[k] = {
                "id": v.id,
                "developer": v.developer.as_hex,
                "has_resolved": v.has_resolved,
                "repo_url": v.repo_url,
                "required_stars": v.required_stars,
                "amount": int(v.amount),
                "real_stars": v.real_stars
            }
        return result

    @gl.public.view
    def get_balance(self, account: str) -> int:
        return int(self.balances.get(Address(account), u256(0)))
