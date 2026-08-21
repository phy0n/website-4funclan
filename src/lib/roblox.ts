import membersData from "@/data/members.json";

export type Member = {
  id: number;
  name: string;
  username: string;
  description: string;
  roles: string[];
  image: string;
  robloxProfile?: string;
  socials?: {
    discord?: string;
    instagram?: string;
    tiktok?: string;
  };
  orderPriority: number;
  presence?: {
    userPresenceType: number;
    lastLocation: string;
  };
};

export async function getEnhancedMembers(): Promise<Member[]> {
  const members = membersData as Member[];
  const userIds: number[] = [];
  const memberIdToRobloxIdMap = new Map<number, number>();

  // Extract Roblox IDs
  for (const member of members) {
    if (member.robloxProfile) {
      const match = member.robloxProfile.match(/users\/(\d+)/);
      if (match && match[1]) {
        const robloxId = parseInt(match[1]);
        userIds.push(robloxId);
        memberIdToRobloxIdMap.set(member.id, robloxId);
      }
    }
  }

  if (userIds.length === 0) return members;

  try {
    // 1. Fetch Users Info
    const usersRes = await fetch("https://users.roblox.com/v1/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userIds }),
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    // 2. Fetch Avatars
    const avatarsRes = await fetch(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userIds.join(',')}&size=720x720&format=Png&isCircular=false`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!usersRes.ok || !avatarsRes.ok) {
      console.error("Failed to fetch Roblox API");
      return members;
    }

    const usersData = await usersRes.json();
    const avatarsData = await avatarsRes.json();

    // 3. Fetch Presence (Chunked max 50)
    const presencesData: any = { userPresences: [] };
    const chunkSize = 50;
    
    for (let i = 0; i < userIds.length; i += chunkSize) {
      const chunk = userIds.slice(i, i + chunkSize);
      const presenceRes = await fetch("https://presence.roblox.com/v1/presence/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIds: chunk }),
        next: { revalidate: 60 } // Cache for 1 minute for presence
      });
      
      if (presenceRes.ok) {
        const data = await presenceRes.json();
        if (data.userPresences) {
          presencesData.userPresences.push(...data.userPresences);
        }
      } else {
        console.error("Failed to fetch Presence API Chunk");
      }
    }

    const robloxUsers = new Map<number, any>();
    const robloxAvatars = new Map<number, string>();
    const robloxPresences = new Map<number, any>();

    usersData.data?.forEach((user: any) => {
      robloxUsers.set(user.id, user);
    });

    avatarsData.data?.forEach((avatar: any) => {
      if (avatar.state === "Completed") {
        robloxAvatars.set(avatar.targetId, avatar.imageUrl);
      }
    });

    // Fetch Game Icons
    const universeIds = [...new Set(presencesData.userPresences.filter((p: any) => p.userPresenceType === 2 && p.universeId).map((p: any) => p.universeId))];
    const gameIconsMap = new Map<number, string>();
    
    if (universeIds.length > 0) {
      try {
        const iconsRes = await fetch(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeIds.join(',')}&size=150x150&format=Png&isCircular=false`, {
          next: { revalidate: 3600 } // Cache icons for 1 hour
        });
        if (iconsRes.ok) {
          const iconsData = await iconsRes.json();
          iconsData.data?.forEach((icon: any) => {
            if (icon.state === "Completed") {
              gameIconsMap.set(icon.targetId, icon.imageUrl);
            }
          });
        }
      } catch (e) {
        console.error("Failed to fetch game icons in roblox.ts");
      }
    }

    presencesData.userPresences?.forEach((p: any) => {
      if (p.universeId && gameIconsMap.has(p.universeId)) {
        p.gameIconUrl = gameIconsMap.get(p.universeId);
      }
      robloxPresences.set(p.userId, p);
    });

    // Merge Data
    return members.map(member => {
      const robloxId = memberIdToRobloxIdMap.get(member.id);
      if (!robloxId) return member;

      const rUser = robloxUsers.get(robloxId);
      const rAvatar = robloxAvatars.get(robloxId);
      const rPresence = robloxPresences.get(robloxId);

      return {
        ...member,
        name: rUser?.displayName || member.name, // Display Name as Name
        username: rUser?.name || member.username, // Roblox Name as Username
        image: rAvatar || member.image, // Roblox Avatar as Image
        presence: rPresence ? { userPresenceType: rPresence.userPresenceType, lastLocation: rPresence.lastLocation } : undefined,
      };
    });

  } catch (error) {
    console.error("Roblox API Error:", error);
    return members;
  }
}
