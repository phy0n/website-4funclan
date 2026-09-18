import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userIds } = await request.json();

    if (!userIds || !Array.isArray(userIds)) {
      return NextResponse.json({ error: "Invalid userIds" }, { status: 400 });
    }

    const userAvatars = [];
    const chunkSize = 100; // Roblox max is 100

    for (let i = 0; i < userIds.length; i += chunkSize) {
      const chunk = userIds.slice(i, i + chunkSize);
      const avatarsRes = await fetch(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${chunk.join(',')}&size=720x720&format=Png&isCircular=false`, {
        cache: "no-store",
      });

      if (avatarsRes.ok) {
        const data = await avatarsRes.json();
        if (data.data) {
          userAvatars.push(...data.data);
        }
      } else {
        const errorText = await avatarsRes.text();
        console.error("Failed to fetch avatars chunk from Roblox. Status:", avatarsRes.status, "Body:", errorText);
      }
    }

    return NextResponse.json({ userAvatars });
  } catch (error) {
    console.error("Avatars API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
