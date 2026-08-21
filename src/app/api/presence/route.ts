import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userIds } = await request.json();

    if (!userIds || !Array.isArray(userIds)) {
      return NextResponse.json({ error: "Invalid userIds" }, { status: 400 });
    }

    const userPresences = [];
    const chunkSize = 50;

    for (let i = 0; i < userIds.length; i += chunkSize) {
      const chunk = userIds.slice(i, i + chunkSize);
      const presenceRes = await fetch("https://presence.roblox.com/v1/presence/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIds: chunk }),
        cache: "no-store",
      });

      if (presenceRes.ok) {
        const data = await presenceRes.json();
        if (data.userPresences) {
          userPresences.push(...data.userPresences);
        }
      } else {
        const errorText = await presenceRes.text();
        console.error("Failed to fetch presence chunk from Roblox. Status:", presenceRes.status, "Body:", errorText);
      }
    }

    const universeIds = [...new Set(userPresences.filter(p => p.userPresenceType === 2 && p.universeId).map(p => p.universeId))];
    const gameIconsMap = new Map<number, string>();

    if (universeIds.length > 0) {
      try {
        const iconsRes = await fetch(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeIds.join(',')}&size=150x150&format=Png&isCircular=false`, {
          cache: "no-store",
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
        console.error("Failed to fetch game icons chunk", e);
      }
    }

    userPresences.forEach(p => {
      if (p.universeId && gameIconsMap.has(p.universeId)) {
        p.gameIconUrl = gameIconsMap.get(p.universeId);
      }
    });

    return NextResponse.json({ userPresences });
  } catch (error) {
    console.error("Presence API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
