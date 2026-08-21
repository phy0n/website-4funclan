"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaDiscord, FaInstagram, FaTiktok } from "react-icons/fa6";
import { Search } from "lucide-react";
import { Member } from "@/lib/roblox";

const ROLE_PRIORITY: Record<string, number> = {
  "OWNER": 1,
  "CO OWNER": 2,
  "STAFF": 3,
  "ASSESSOR": 4,
  "DARK SIDE": 5,
  "CONTENT CREATOR": 6,
  "MEMBER": 7
};

function getHighestRolePriority(roles: string[]) {
  return Math.min(...roles.map(role => ROLE_PRIORITY[role] || 99));
}

function getHighestRole(roles: string[]) {
  return roles.reduce((prev, current) =>
    (ROLE_PRIORITY[current] || 99) < (ROLE_PRIORITY[prev] || 99) ? current : prev
    , roles[0]);
}

const getRoleStyle = (role: string) => {
  switch (role) {
    case "OWNER": return "bg-[#0a0a0a] text-white border-white/20";
    case "CO OWNER": return "bg-blue-900/80 text-blue-200 border-blue-600/30";
    case "STAFF": return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
    case "ASSESSOR": return "bg-green-500/20 text-green-400 border-green-500/30";
    case "DARK SIDE": return "bg-red-600/20 text-red-500 border-red-600/30";
    case "CONTENT CREATOR": return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
    case "MEMBER": return "bg-pink-500/20 text-pink-400 border-pink-500/30";
    default: return "bg-white/5 text-gray-400 border-white/10";
  }
};

const getRoleBannerColor = (role: string) => {
  switch (role) {
    case "OWNER": return "bg-white";
    case "CO OWNER": return "bg-blue-600";
    case "STAFF": return "bg-cyan-500";
    case "ASSESSOR": return "bg-green-500";
    case "DARK SIDE": return "bg-primary";
    case "CONTENT CREATOR": return "bg-yellow-500";
    case "MEMBER": return "bg-pink-500";
    default: return "bg-gray-600";
  }
};

export default function MembersClient({ initialMembers }: { initialMembers: Member[] }) {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [livePresences, setLivePresences] = useState<Record<number, any>>({});

  useEffect(() => {
    // Ambil ID roblox dari profile
    const robloxIds = initialMembers
      .filter(m => m.robloxProfile)
      .map(m => {
        const match = m.robloxProfile?.match(/users\/(\d+)/);
        return match ? parseInt(match[1]) : null;
      })
      .filter(id => id !== null);

    if (robloxIds.length === 0) return;

    const fetchPresence = async () => {
      try {
        const res = await fetch('/api/presence', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userIds: robloxIds })
        });
        if (res.ok) {
          const data = await res.json();
          const newPresences: Record<number, any> = {};
          data.userPresences?.forEach((p: any) => {
            newPresences[p.userId] = p;
          });
          setLivePresences(newPresences);
        }
      } catch (e) {
        // Ignore error
      }
    };

    fetchPresence(); // fetch initially
    const interval = setInterval(fetchPresence, 15000); // Poll every 15s
    return () => clearInterval(interval);
  }, [initialMembers]);

  const sortedMembers = [...initialMembers].sort((a, b) => {
    return getHighestRolePriority(a.roles) - getHighestRolePriority(b.roles);
  });

  const filteredMembers = sortedMembers.filter(member => {
    const matchesFilter = activeFilter === "ALL" || member.roles.includes(activeFilter);
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const ALL_ROLES = ["ALL", "OWNER", "CO OWNER", "STAFF", "ASSESSOR", "DARK SIDE", "CONTENT CREATOR", "MEMBER"];

  return (
    <div className="relative w-full bg-[#0a0a0a] min-h-screen pb-10 pt-32 md:pt-40">
      <div className="relative z-20 max-w-4xl px-6 md:px-24 mb-16">
        <div className="flex items-center gap-3 mb-3">
          <p className="text-zinc-500 font-bold tracking-widest text-xs uppercase">
            4Fun Clan / Members
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
          <p className="text-primary font-black tracking-widest text-xs uppercase bg-primary/10 px-2 py-0.5 rounded-sm">
            {sortedMembers.length} ACTIVE
          </p>
        </div>
        <h1 className="text-white font-black text-[13vw] sm:text-5xl md:text-7xl tracking-tighter mb-4 md:mb-6 leading-none uppercase whitespace-nowrap">
          MEMBERS<span className="text-primary">.</span>
        </h1>
        <p className="text-zinc-400 font-medium text-sm md:text-xl leading-relaxed max-w-lg border-l-2 border-primary pl-4">
          Meet the family. The people who make this clan feel like home.
        </p>
      </div>

      <div className="w-full px-6 md:px-24">
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2 flex-1">
            {ALL_ROLES.map(role => (
              <button
                key={role}
                onClick={() => setActiveFilter(role)}
                className={`px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-full border transition-all duration-300 ${activeFilter === role
                  ? "bg-primary text-white border-primary shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                  : "bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white"
                  }`}>
                {role}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-64 lg:w-80 shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-zinc-500" />
            </div>
            <input
              type="text"
              placeholder="Search member..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300"
            />
          </div>
        </div>

        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member) => {
              const mainRole = getHighestRole(member.roles);
              const bannerColor = getRoleBannerColor(mainRole);
              
              const robloxIdMatch = member.robloxProfile?.match(/users\/(\d+)/);
              const robloxId = robloxIdMatch ? parseInt(robloxIdMatch[1]) : null;
              const currentPresence = (robloxId && livePresences[robloxId]) || member.presence;

              return (
                <div key={member.id} className="group relative transition-all duration-500 hover:-translate-y-2 hover:z-30 flex flex-col mt-12 md:mt-16 items-center">
                  
                  {/* Podium Background Card (Only for content) */}
                  <div className="absolute top-32 inset-x-0 bottom-0 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 group-hover:border-white/20 rounded-2xl shadow-2xl transition-colors duration-500 z-0">
                    {/* Subtle top border accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1 ${bannerColor} opacity-50 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl`}></div>
                  </div>

                  {/* Avatar */}
                  <div className="relative w-full h-56 md:h-64 mb-[-2rem] z-20 pointer-events-none overflow-visible">
                    <Image
                      src={member.image}
                      alt={`${member.name}'s avatar`}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      quality={100}
                      className="object-contain scale-110 md:scale-125 drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)] group-hover:scale-125 md:group-hover:scale-[1.4] group-hover:-translate-y-4 transition-transform duration-700 origin-bottom"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-20 flex flex-col items-center flex-1 px-4 pb-6 w-full pt-4">
                    <h3 className="font-black text-xl md:text-2xl text-white tracking-tighter group-hover:text-primary transition-colors drop-shadow-lg mb-0.5 text-center">{member.name}</h3>
                    <p className="text-zinc-500 font-bold text-[9px] md:text-[10px] tracking-[0.2em] uppercase mb-4 text-center">
                      @{member.username}
                    </p>

                    {/* Status Indicator */}
                    {member.robloxProfile && (
                      <div className="flex items-center gap-2 mb-6 bg-black/40 px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
                        <div className="relative flex h-2 w-2">
                          <span className={`relative inline-flex rounded-full h-2 w-2 ${
                            (currentPresence?.userPresenceType === 1 || currentPresence?.userPresenceType === 2) ? 'bg-green-500' :
                            currentPresence?.userPresenceType === 3 ? 'bg-orange-500' :
                            'bg-zinc-600'
                          }`}></span>
                        </div>
                        <span className="text-[9px] font-bold tracking-widest text-zinc-300 uppercase truncate max-w-[120px]">
                          {currentPresence?.userPresenceType === 1 ? 'Online' :
                           currentPresence?.userPresenceType === 2 ? (currentPresence.lastLocation || 'In Game') :
                           currentPresence?.userPresenceType === 3 ? 'In Studio' :
                           'Offline'}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {member.roles.map((role) => (
                        <span key={role} className={`font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded border ${getRoleStyle(role)} backdrop-blur-md`}>
                          {role}
                        </span>
                      ))}
                    </div>

                    {member.description && (
                      <div className="w-full mt-2 pt-4">
                        <p className="text-xs md:text-sm text-zinc-400 text-center font-medium line-clamp-3 leading-relaxed">
                          {member.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full py-24 flex flex-col items-center justify-center text-center border border-white/5 rounded-2xl bg-[#111]">
            <h3 className="font-black text-3xl text-zinc-600 uppercase tracking-tighter mb-2">NOBODY'S HERE</h3>
            <p className="text-zinc-500 font-medium">There are currently no members with the <strong className="text-white">{activeFilter}</strong> role.</p>
          </div>
        )}
      </div>
    </div>
  );
}
