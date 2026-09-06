// GenLayer Studio API Integration
// This connects the frontend to the DistriNovaGrants.py Intelligent Contract
import { createClient } from "genlayer-js";

export const GENLAYER_STUDIO_RPC = process.env.NEXT_PUBLIC_GENLAYER_RPC || "https://studio.genlayer.com/rpc";
export const CONTRACT_ADDRESS = "0xf68e55250AB7E767484b8C5D55538b275597c0d8";

export interface Grant {
  id: string;
  sponsor: string;
  developer: string;
  has_resolved: boolean;
  repo_url: string;
  required_stars: number;
  amount: number;
  real_stars: number;
}

// Helper to get client configured for current environment
const getClient = () => {
  if (typeof window !== "undefined" && (window as any).ethereum) {
    return createClient({ provider: (window as any).ethereum });
  }
  return createClient({ endpoint: GENLAYER_STUDIO_RPC });
};

export const genlayerClient = {
  // Read Grants from the Intelligent Contract
  async getGrants(contractAddress: string = CONTRACT_ADDRESS): Promise<Record<string, Grant>> {
    if (!contractAddress) {
      console.warn("No contract address provided, returning empty list.");
      return {};
    }

    try {
      const client = getClient();
      const data = await client.readContract({
        address: contractAddress as `0x${string}`,
        functionName: "get_grants",
        args: []
      });
      return (data as Record<string, Grant>) || {};
    } catch (e) {
      console.error("Failed to fetch grants from GenLayer:", e);
      return {};
    }
  },

  // Trigger non-deterministic verification
  async resolveGrant(contractAddress: string = CONTRACT_ADDRESS, grantId: string, developerName: string, developer: string, repoUrl: string): Promise<boolean> {
      if (!contractAddress) return false;
      const client = getClient();
      console.log(`Sending resolve_grant(${grantId}, ${developerName}, ${developer}, ${repoUrl}) transaction to GenLayer`);
      
      try {
        const hash = await client.writeContract({
          address: contractAddress as `0x${string}`,
          functionName: "resolve_grant",
          args: [grantId, developerName, developer, repoUrl]
        });
        
        await client.waitForTransactionReceipt({ hash, status: "FINALIZED" });
        return true;
      } catch (err) {
        console.error("resolveGrant error:", err);
        throw err;
      }
  },

  // Create a new grant (Sponsors)
  async createGrant(
    contractAddress: string = CONTRACT_ADDRESS, 
    grantData: { grantId: string, requiredStars: number, amount: number }
  ): Promise<boolean> {
      if (!contractAddress) return false;
      const client = getClient();
      console.log(`Sending create_grant transaction to GenLayer and escrowing funds`, grantData);
      
      try {
        const hash = await client.writeContract({
          address: contractAddress as `0x${string}`,
          functionName: "create_grant",
          args: [grantData.grantId, grantData.requiredStars, grantData.amount]
        });
        
        await client.waitForTransactionReceipt({ hash, status: "FINALIZED" });
        return true;
      } catch (err) {
        console.error("createGrant error:", err);
        throw err;
      }
  },

  // Claim Rewards
  async claimRewards(contractAddress: string = CONTRACT_ADDRESS): Promise<boolean> {
      if (!contractAddress) return false;
      const client = getClient();
      console.log(`Sending claim_rewards transaction to GenLayer to withdraw balance`);
      
      try {
        const hash = await client.writeContract({
          address: contractAddress as `0x${string}`,
          functionName: "claim_rewards",
          args: []
        });
        
        await client.waitForTransactionReceipt({ hash, status: "FINALIZED" });
        return true;
      } catch (err) {
        console.error("claimRewards error:", err);
        throw err;
      }
  }
};

