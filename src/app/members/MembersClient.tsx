"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaDiscord, FaInstagram, FaTiktok } from "react-icons/fa6";
import { SiRoblox } from "react-icons/si";
import { Search, X } from "lucide-react";
import { Member } from "@/lib/roblox";

const ROLE_PRIORITY: Record<string, number> = {
  "OWNER": 1,
  "CO OWNER": 2,
  "ADMIN": 3,
  "STAFF": 4,
  "ASSESSOR": 5,
  "DARK SIDE": 6,
  "CONTENT CREATOR": 7,
  "MEMBER": 8
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
    case "ADMIN": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
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
    case "ADMIN": return "bg-purple-500";
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
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [livePresences, setLivePresences] = useState<Record<number, any>>({});
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [lanyardData, setLanyardData] = useState<Record<string, any>>({});

  useEffect(() => {
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

    fetchPresence();
    const interval = setInterval(fetchPresence, 15000);
    return () => clearInterval(interval);
  }, [initialMembers]);

  useEffect(() => {
    const discordIds = initialMembers
      .map(m => m.socials?.discordId)
      .filter((id): id is string => !!id);

    if (discordIds.length === 0) return;

    const fetchLanyard = async () => {
      try {
        const newData: Record<string, any> = {};
        await Promise.all(discordIds.map(async (id) => {
          const res = await fetch(`https://api.lanyard.rest/v1/users/${id}`);
          if (res.ok) {
            const json = await res.json();
            if (json.success) {
              newData[id] = json.data;
            }
          }
        }));
        setLanyardData(newData);
      } catch (e) {
        // ignore
      }
    };

    fetchLanyard();
    const interval = setInterval(fetchLanyard, 15000);
    return () => clearInterval(interval);
  }, [initialMembers]);

  const sortedMembers = [...initialMembers].sort((a, b) => {
    return getHighestRolePriority(a.roles) - getHighestRolePriority(b.roles);
  });

  const filteredMembers = sortedMembers.filter(member => {
    const matchesFilter = activeFilter === "ALL" || member.roles.includes(activeFilter);
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.username && member.username.toLowerCase().includes(searchQuery.toLowerCase()));

    const robloxIdMatch = member.robloxProfile?.match(/users\/(\d+)/);
    const robloxId = robloxIdMatch ? parseInt(robloxIdMatch[1]) : null;
    const currentPresence = (robloxId && livePresences[robloxId]) || member.presence;

    const dData = member.socials?.discordId ? lanyardData[member.socials.discordId] : null;
    const isDiscordOnline = dData && dData.discord_status !== 'offline';
    const isRobloxOnline = currentPresence?.userPresenceType > 0;
    const isOnline = isRobloxOnline || isDiscordOnline;

    let matchesStatus = true;
    if (statusFilter === "ONLINE") {
      matchesStatus = isOnline;
    } else if (statusFilter === "OFFLINE") {
      matchesStatus = !isOnline;
    }

    return matchesFilter && matchesSearch && matchesStatus;
  });

  const ALL_ROLES = ["ALL", "OWNER", "CO OWNER", "ADMIN", "STAFF", "ASSESSOR", "DARK SIDE", "CONTENT CREATOR", "MEMBER"];

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
        <div className="flex flex-col gap-6 mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
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

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] ml-1">Status Filter:</span>
            {["ALL", "ONLINE", "OFFLINE"].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 text-[9px] font-bold tracking-[0.1em] uppercase rounded-full border transition-all duration-300 ${statusFilter === status
                  ? "bg-white/10 text-white border-white/20 shadow-lg backdrop-blur-md"
                  : "bg-transparent text-zinc-600 border-white/5 hover:border-white/10 hover:text-zinc-400"
                  }`}
              >
                {status}
              </button>
            ))}
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
                <div key={member.id} onClick={() => setSelectedMember(member)} className="group relative flex flex-col p-2 rounded-3xl bg-gradient-to-br from-zinc-800/80 via-black to-zinc-900/80 border border-white/10 shadow-2xl cursor-pointer hover:border-white/30 transition-all duration-500">
                  <div className="relative w-full h-full flex flex-col items-center border-[1.5px] border-white/5 rounded-2xl bg-[#0a0a0a] overflow-hidden">
                    <div className={`absolute top-0 inset-x-0 h-48 ${bannerColor} opacity-15 blur-2xl z-0 pointer-events-none rounded-t-2xl`}></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] z-0 pointer-events-none mix-blend-overlay"></div>
                    <div className="relative w-full h-64 md:h-72 mt-4 mb-[-1rem] z-20 pointer-events-none flex items-end justify-center">
                      {member.image && !member.image.includes('wikipedia') && (
                        <Image
                          src={member.image}
                          alt={`${member.name}'s avatar`}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          quality={100}
                          className="object-contain scale-[0.95] drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)] origin-bottom"
                        />
                      )}
                    </div>

                    <div className="relative z-20 flex flex-col items-center flex-1 px-4 pb-6 w-full pt-4 bg-gradient-to-t from-black via-black/80 to-transparent">
                      <h3 className="font-black text-xl md:text-2xl text-white tracking-tighter drop-shadow-lg mb-0.5 text-center">{member.name}</h3>
                      <p className="text-zinc-500 font-bold text-[9px] md:text-[10px] tracking-[0.2em] uppercase mb-4 text-center">
                        @{member.username}
                      </p>

                      {(member.robloxProfile || member.socials?.discordId) && (() => {
                        const dData = member.socials?.discordId ? lanyardData[member.socials.discordId] : null;
                        const isDiscordOnline = dData && dData.discord_status !== 'offline';

                        if (currentPresence?.userPresenceType === 2) {
                          return (
                            <div className="mb-6 w-full px-2 flex justify-center">
                              <div className="flex items-center gap-3 w-full bg-white/5 p-2 rounded-xl border border-white/10 backdrop-blur-md max-w-[200px] shadow-lg">
                                {currentPresence.gameIconUrl ? (
                                  <div className="relative w-9 h-9 shrink-0">
                                    <Image
                                      src={currentPresence.gameIconUrl}
                                      alt="Game Icon"
                                      fill
                                      sizes="36px"
                                      className="rounded-md object-cover border border-white/10"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-9 h-9 bg-zinc-800 rounded-md shrink-0 border border-white/10 flex items-center justify-center">
                                    <span className="text-[10px] text-zinc-500 font-bold">?</span>
                                  </div>
                                )}
                                <div className="flex flex-col flex-1 min-w-0">
                                  <span className="text-[8px] font-bold text-green-400 uppercase tracking-[0.2em] mb-0.5 drop-shadow-md">Playing</span>
                                  <span className="text-[10px] font-medium text-zinc-200 truncate" title={currentPresence.lastLocation || 'A Game'}>
                                    {currentPresence.lastLocation || 'A Game'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }

                        const dSpotify = dData?.spotify;
                        const dActivity = dData?.activities?.find((a: any) => a.type === 0);

                        if (dSpotify) {
                          return (
                            <div className="mb-6 w-full px-2 flex justify-center">
                              <div className="flex items-center gap-3 w-full bg-white/5 p-2 rounded-xl border border-white/10 backdrop-blur-md max-w-[200px] shadow-lg">
                                <div className="relative w-9 h-9 shrink-0">
                                  <Image
                                    src={dSpotify.album_art_url}
                                    alt="Spotify"
                                    fill
                                    sizes="36px"
                                    className="rounded-md object-cover border border-white/10"
                                  />
                                </div>
                                <div className="flex flex-col flex-1 min-w-0">
                                  <span className="text-[8px] font-bold text-[#1DB954] uppercase tracking-[0.2em] mb-0.5 drop-shadow-md">Listening</span>
                                  <span className="text-[10px] font-medium text-zinc-200 truncate" title={dSpotify.song}>
                                    {dSpotify.song}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }

                        if (dActivity) {
                          return (
                            <div className="mb-6 w-full px-2 flex justify-center">
                              <div className="flex items-center gap-3 w-full bg-white/5 p-2 rounded-xl border border-white/10 backdrop-blur-md max-w-[200px] shadow-lg">
                                <div className="relative w-9 h-9 shrink-0 bg-zinc-800 rounded-md border border-white/10 flex items-center justify-center overflow-hidden">
                                  {dActivity.assets?.large_image && dActivity.assets.large_image.startsWith('mp:') ? (
                                    <Image src={`https://media.discordapp.net/${dActivity.assets.large_image.replace('mp:', '')}`} alt={dActivity.name} fill className="object-cover" />
                                  ) : dActivity.assets?.large_image ? (
                                    <Image src={`https://cdn.discordapp.com/app-assets/${dActivity.application_id}/${dActivity.assets.large_image}.png`} alt={dActivity.name} fill className="object-cover" />
                                  ) : (
                                    <FaDiscord size={16} className="text-zinc-500" />
                                  )}
                                </div>
                                <div className="flex flex-col flex-1 min-w-0">
                                  <span className="text-[8px] font-bold text-[#5865F2] uppercase tracking-[0.2em] mb-0.5 drop-shadow-md">Playing</span>
                                  <span className="text-[10px] font-medium text-zinc-200 truncate" title={dActivity.name}>
                                    {dActivity.name}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }

                        return null;
                      })()}
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

                      {member.socials && (member.socials.discord || member.socials.instagram || member.socials.tiktok) && (
                        <div onClick={(e) => e.stopPropagation()} className="flex items-center justify-center gap-4 mt-5 pt-4 border-t border-white/5 w-full">
                          {member.socials.instagram && (
                            <a href={member.socials.instagram.startsWith('http') ? member.socials.instagram : `https://instagram.com/${member.socials.instagram}`} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-pink-500 hover:drop-shadow-[0_0_12px_rgba(236,72,153,0.8)] transition-all duration-300">
                              <FaInstagram size={20} />
                            </a>
                          )}
                          {member.socials.tiktok && (
                            <a href={member.socials.tiktok.startsWith('http') ? member.socials.tiktok : `https://tiktok.com/@${member.socials.tiktok}`} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-300">
                              <FaTiktok size={20} />
                            </a>
                          )}
                          {member.socials.discord && (
                            <a href={`https://discord.com/users/${member.socials.discord}`} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#5865F2] hover:drop-shadow-[0_0_12px_rgba(88,101,242,0.8)] transition-all duration-300" title="Discord">
                              <FaDiscord size={20} />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
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

      {/* Member Detail Modal (Showcase Style) */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 md:py-12 bg-black/80 backdrop-blur-md transition-opacity duration-300" onClick={() => setSelectedMember(null)}>
          <div className="relative w-full max-w-4xl h-full md:h-auto max-h-[850px] overflow-y-auto md:overflow-visible bg-[#111] rounded-3xl flex flex-col md:flex-row shadow-[0_0_50px_rgba(0,0,0,0.8)] scrollbar-hide border border-white/10" onClick={(e) => e.stopPropagation()}>

            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors border border-white/5 cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Left Column - Avatar Showcase */}
            <div className="relative w-full md:w-[45%] h-[300px] sm:h-[350px] md:h-auto min-h-[300px] sm:min-h-[350px] md:min-h-[400px] bg-[#0a0a0a] flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5 shrink-0 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
              {/* Background Glow */}
              <div className={`absolute inset-0 opacity-20 blur-3xl z-0 pointer-events-none ${getRoleBannerColor(getHighestRole(selectedMember.roles))}`}></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] z-0 pointer-events-none mix-blend-overlay"></div>

              {/* Character Image */}
              {selectedMember.image && !selectedMember.image.includes('wikipedia') && (
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                  <div className="relative w-[85%] h-[85%]">
                    <Image
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      fill
                      className="object-contain object-center drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]"
                    />
                  </div>
                </div>
              )}

              {/* Status Indicator */}
              {(selectedMember.robloxProfile || selectedMember.socials?.discordId) && (() => {
                const robloxIdMatch = selectedMember.robloxProfile?.match(/users\/(\d+)/);
                const rPresence = ((robloxIdMatch && livePresences[parseInt(robloxIdMatch[1])]) || selectedMember.presence);
                const dData = selectedMember.socials?.discordId ? lanyardData[selectedMember.socials.discordId] : null;
                const isOnline = (rPresence && rPresence.userPresenceType > 0) || (dData && dData.discord_status !== 'offline');
                return (
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 flex items-center gap-1.5 md:gap-2 bg-black/40 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                    <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${isOnline ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-zinc-600'}`}></span>
                    <span className="text-[8px] md:text-[9px] font-bold tracking-widest text-zinc-300 uppercase">
                      {isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                );
              })()}
            </div>

            {/* Right Column - Info & Activity */}
            <div className="w-full md:w-[55%] p-5 md:p-10 flex flex-col gap-6 md:gap-8 bg-[#111] rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none">

              {/* Header */}
              <div className="mt-1 md:mt-0">
                <h2 className="font-black text-3xl md:text-5xl text-white tracking-tighter uppercase mb-2 md:mb-3 leading-none">{selectedMember.name}</h2>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-primary font-bold text-sm tracking-widest uppercase">@{selectedMember.username}</p>
                  <div className="w-1 h-1 rounded-full bg-zinc-600"></div>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.roles.map((role) => (
                      <span key={role} className={`font-bold text-[9px] uppercase tracking-widest px-2 py-1 rounded border ${getRoleStyle(role)} backdrop-blur-md`}>
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio & Socials */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-3">About</h3>
                  {selectedMember.description ? (
                    <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                      {selectedMember.description}
                    </p>
                  ) : (
                    <p className="text-sm text-zinc-600 italic">No description provided.</p>
                  )}
                </div>

                <div>
                  <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-3">Connect</h3>
                  <div className="flex gap-4">
                    {selectedMember.socials && Object.keys(selectedMember.socials).length > 0 ? (
                      <>
                        {selectedMember.socials.instagram && (
                          <a href={selectedMember.socials.instagram.startsWith('http') ? selectedMember.socials.instagram : `https://instagram.com/${selectedMember.socials.instagram}`} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-pink-500 hover:drop-shadow-[0_0_12px_rgba(236,72,153,0.8)] transition-all duration-300">
                            <FaInstagram size={24} />
                          </a>
                        )}
                        {selectedMember.socials.tiktok && (
                          <a href={selectedMember.socials.tiktok.startsWith('http') ? selectedMember.socials.tiktok : `https://tiktok.com/@${selectedMember.socials.tiktok}`} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-300">
                            <FaTiktok size={24} />
                          </a>
                        )}
                        {selectedMember.socials.discord && (
                          <a href={`https://discord.com/users/${selectedMember.socials.discord}`} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#5865F2] hover:drop-shadow-[0_0_12px_rgba(88,101,242,0.8)] transition-all duration-300" title="Discord">
                            <FaDiscord size={24} />
                          </a>
                        )}
                      </>
                    ) : (
                      <span className="text-sm text-zinc-600 italic">No connections linked.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Activity Widget */}
              {(() => {
                const dData = selectedMember.socials?.discordId ? lanyardData[selectedMember.socials.discordId] : null;
                const robloxIdMatch = selectedMember.robloxProfile?.match(/users\/(\d+)/);
                const robloxId = robloxIdMatch ? parseInt(robloxIdMatch[1]) : null;
                const rPresence = (robloxId && livePresences[robloxId]) || selectedMember.presence;

                const isRobloxPlaying = rPresence?.userPresenceType === 2;
                const isRobloxOnline = rPresence?.userPresenceType === 1 || rPresence?.userPresenceType === 3;

                const dSpotify = dData?.spotify;
                const dActivity = dData?.activities?.find((a: any) => a.type === 0);

                const widgets = [];

                // 1. Roblox Playing
                if (isRobloxPlaying) {
                  widgets.push(
                    <div key="roblox-playing" className="bg-[#161616] border border-white/5 rounded-2xl p-4">
                      <div className="flex items-center gap-4">
                        {rPresence.gameIconUrl ? (
                          <div className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden border border-white/10">
                            <Image src={rPresence.gameIconUrl} alt="Game Icon" fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-14 h-14 bg-zinc-800 rounded-xl border border-white/10 flex items-center justify-center shrink-0">
                            <span className="text-zinc-600 font-bold">?</span>
                          </div>
                        )}
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-0.5">Playing Roblox</span>
                          <span className="text-sm text-white font-bold truncate">{rPresence.lastLocation || 'Hidden Location'}</span>
                        </div>
                      </div>
                    </div>
                  );
                }

                // 2. Discord Spotify
                if (dSpotify) {
                  widgets.push(
                    <div key="discord-spotify" className="bg-[#161616] border border-white/5 rounded-2xl p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden border border-white/10">
                          <Image src={dSpotify.album_art_url} alt="Spotify" fill className="object-cover" />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-[#1DB954] uppercase tracking-widest mb-0.5">Listening to Spotify</span>
                          <span className="text-sm text-white font-bold truncate">{dSpotify.song}</span>
                          <span className="text-xs text-zinc-400 truncate">by {dSpotify.artist}</span>
                        </div>
                      </div>
                    </div>
                  );
                }

                // 3. Discord Activity (Game)
                if (dActivity) {
                  widgets.push(
                    <div key="discord-activity" className="bg-[#161616] border border-white/5 rounded-2xl p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 bg-zinc-800 shrink-0 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
                          {dActivity.assets?.large_image && dActivity.assets.large_image.startsWith('mp:') ? (
                            <Image src={`https://media.discordapp.net/${dActivity.assets.large_image.replace('mp:', '')}`} alt={dActivity.name} fill className="object-cover" />
                          ) : dActivity.assets?.large_image ? (
                            <Image src={`https://cdn.discordapp.com/app-assets/${dActivity.application_id}/${dActivity.assets.large_image}.png`} alt={dActivity.name} fill className="object-cover" />
                          ) : (
                            <FaDiscord size={24} className="text-zinc-500" />
                          )}
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-[#5865F2] uppercase tracking-widest mb-0.5">Playing a Game</span>
                          <span className="text-sm text-white font-bold truncate">{dActivity.name}</span>
                          {dActivity.details && <span className="text-xs text-zinc-400 truncate">{dActivity.details}</span>}
                        </div>
                      </div>
                    </div>
                  );
                }

                // 4. Roblox Online (if not playing)
                if (isRobloxOnline && !isRobloxPlaying) {
                  widgets.push(
                    <div key="roblox-online" className="bg-[#161616] border border-white/5 rounded-2xl p-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 ${rPresence.userPresenceType === 3 ? 'bg-orange-500/10 border-orange-500/20' : 'bg-white/5 border-white/10'} rounded-xl flex items-center justify-center border shrink-0`}>
                          <SiRoblox size={22} className={`${rPresence.userPresenceType === 3 ? 'text-orange-500 drop-shadow-[0_0_8px_#f97316]' : 'text-zinc-200'}`} />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className={`text-[10px] font-bold ${rPresence.userPresenceType === 3 ? 'text-orange-500' : 'text-[#00b06f]'} uppercase tracking-widest mb-0.5`}>
                            {rPresence.userPresenceType === 3 ? 'In Studio' : 'Online'}
                          </span>
                          <span className="text-sm text-white font-bold truncate">
                            {rPresence.userPresenceType === 3
                              ? (rPresence.lastLocation || 'Developing on Roblox')
                              : (rPresence.lastLocation && rPresence.lastLocation !== 'Website' ? rPresence.lastLocation : 'Active on Roblox')}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (widgets.length === 0) {
                  return null;
                }

                return (
                  <div className="mt-2 flex-1 flex flex-col justify-end gap-3">
                    <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Live Status</h3>
                    {widgets}
                  </div>
                );
              })()}

              {/* Footer Actions */}
              {selectedMember.robloxProfile && (
                <div className="mt-4 pt-6 border-t border-white/5">
                  <a href={selectedMember.robloxProfile} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full py-4 bg-transparent hover:bg-white text-zinc-300 hover:text-black font-black uppercase tracking-widest text-xs rounded-xl transition-all duration-300 border border-white/20 hover:border-white">
                    Visit Roblox Profile
                  </a>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
