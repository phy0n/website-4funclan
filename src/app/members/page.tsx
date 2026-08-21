import { getEnhancedMembers } from "@/lib/roblox";
import MembersClient from "./MembersClient";

export const revalidate = 3600; // Revalidate every hour

export default async function MembersPage() {
  const members = await getEnhancedMembers();
  return <MembersClient initialMembers={members} />;
}
