"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaDiscord, FaInstagram, FaTiktok } from "react-icons/fa6";
import { SiRoblox } from "react-icons/si";
import { Search, X, ChevronDown, Fingerprint, ScanLine, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Member } from "@/lib/roblox";
import { useLanguage } from "@/context/LanguageContext";

const getDiscordAssetUrl = (appId: string, assetId: string) => {
    if (assetId.startsWith('mp:')) {
        return `https://media.discordapp.net/${assetId.replace('mp:', '')}`;
    }
    if (assetId.startsWith('external/')) {
        return `https://media.discordapp.net/${assetId}`;
    }
    return `https://cdn.discordapp.com/app-assets/${appId}/${assetId}.png`;
};

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

const SpotifyProgress = ({ start, end, compact = false }: { start: number, end: number, compact?: boolean }) => {
    const [progress, setProgress] = useState(0);
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        const updateProgress = () => {
            const currentNow = Date.now();
            setNow(currentNow);
            const total = end - start;
            const current = currentNow - start;
            const percentage = Math.min(100, Math.max(0, (current / total) * 100));
            setProgress(percentage);
        };

        updateProgress();
        const interval = setInterval(updateProgress, 1000);
        return () => clearInterval(interval);
    }, [start, end]);

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const currentMs = Math.min(end - start, Math.max(0, now - start));
    const totalMs = end - start;

    return (
        <div className={`w-full flex flex-col gap-1 ${compact ? 'mt-1' : 'mt-3'}`}>
            <div className={`w-full bg-white/10 rounded-full overflow-hidden ${compact ? 'h-0.5' : 'h-1'}`}>
                <div
                    className="h-full bg-[#1DB954] rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>
            {!compact && (
                <div className="flex justify-between items-center w-full">
                    <span className="text-[9px] text-zinc-500 font-medium">{formatTime(currentMs)}</span>
                    <span className="text-[9px] text-zinc-500 font-medium">{formatTime(totalMs)}</span>
                </div>
            )}
        </div>
    );
};

export default function MembersClient({ initialMembers }: { initialMembers: Member[] }) {
    const { t } = useLanguage();
    const [activeFilter, setActiveFilter] = useState("ALL");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    const [livePresences, setLivePresences] = useState<Record<number, any>>({});
    const [liveAvatars, setLiveAvatars] = useState<Record<number, string>>({});
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

        const fetchAvatars = async () => {
            try {
                const res = await fetch('/api/avatars', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userIds: robloxIds })
                });
                if (res.ok) {
                    const data = await res.json();
                    const newAvatars: Record<number, string> = {};
                    data.userAvatars?.forEach((a: any) => {
                        if (a.state === "Completed") {
                            newAvatars[a.targetId] = a.imageUrl;
                        }
                    });
                    setLiveAvatars(newAvatars);
                }
            } catch (e) {
                // Ignore error
            }
        };

        fetchPresence();
        fetchAvatars();
        const interval = setInterval(() => {
            fetchPresence();
        }, 15000);
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

    const selectedRobloxIdMatch = selectedMember?.robloxProfile?.match(/users\/(\d+)/);
    const selectedRobloxId = selectedRobloxIdMatch ? parseInt(selectedRobloxIdMatch[1]) : null;

    return (
        <div className="relative w-full bg-[#0a0a0a] min-h-screen pb-10 pt-32 md:pt-40">
            <div className="relative z-20 max-w-4xl px-6 md:px-24 mb-16">
                <div className="flex items-center gap-3 mb-3">
                    <p className="text-zinc-500 font-bold tracking-widest text-xs uppercase">
                        4Fun Clan / {t("members_title")}
                    </p>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
                    <p className="text-primary font-black tracking-widest text-xs uppercase bg-primary/10 px-2 py-0.5 rounded-sm">
                        {sortedMembers.length} {t("members_active")}
                    </p>
                </div>
                <h1 className="text-white font-black text-[13vw] sm:text-5xl md:text-7xl tracking-tighter mb-4 md:mb-6 leading-none uppercase whitespace-nowrap">
                    {t("members_title")}<span className="text-primary">.</span>
                </h1>
                <p className="text-zinc-400 font-medium text-sm md:text-xl leading-relaxed max-w-lg border-l-2 border-primary pl-4">
                    {t("members_desc")}
                </p>
            </div>

            <div className="w-full px-6 md:px-24">
                <div className="flex flex-col md:flex-row gap-4 items-center w-full mb-12 bg-[#111] p-2 border border-white/5 shadow-lg">
                    <div className="relative flex-1 w-full">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-zinc-500" />
                        </div>
                        <input
                            type="text"
                            placeholder={t("members_search")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent border-none py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-0"
                        />
                    </div>

                    <div className="flex gap-2 w-full md:w-auto shrink-0 px-2 pb-2 md:pb-0 md:px-0">
                        <div className="relative flex-1 md:w-48">
                            <select
                                value={activeFilter}
                                onChange={(e) => setActiveFilter(e.target.value)}
                                className="w-full appearance-none bg-[#0a0a0a] border border-white/10 text-zinc-300 text-xs font-bold tracking-widest uppercase py-3 pl-4 pr-10 focus:outline-none focus:border-white/20 transition-colors cursor-pointer">
                                {ALL_ROLES.map(role => (
                                    <option key={role} value={role}>{role === "ALL" ? t("members_filter_all") : role}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                <ChevronDown className="h-4 w-4 text-zinc-500" />
                            </div>
                        </div>

                        <div className="relative flex-1 md:w-40">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full appearance-none bg-[#0a0a0a] border border-white/10 text-zinc-300 text-xs font-bold tracking-widest uppercase py-3 pl-4 pr-10 focus:outline-none focus:border-white/20 transition-colors cursor-pointer">
                                <option value="ALL">ALL STATUS</option>
                                <option value="ONLINE">ONLINE</option>
                                <option value="OFFLINE">OFFLINE</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                <ChevronDown className="h-4 w-4 text-zinc-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {filteredMembers.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-12 pt-6 pb-12">
                        {filteredMembers.map((member) => {
                            const mainRole = getHighestRole(member.roles);
                            const bannerColor = getRoleBannerColor(mainRole);

                            const robloxIdMatch = member.robloxProfile?.match(/users\/(\d+)/);
                            const robloxId = robloxIdMatch ? parseInt(robloxIdMatch[1]) : null;
                            const currentPresence = (robloxId && livePresences[robloxId]) || member.presence;

                            const dData = member.socials?.discordId ? lanyardData[member.socials.discordId] : null;
                            const isOnline = (currentPresence && currentPresence.userPresenceType > 0) || (dData && dData.discord_status !== 'offline');

                            return (
                                <div key={member.id} onClick={() => setSelectedMember(member)} className="group relative w-full sm:w-auto flex flex-col pt-4 pb-2 px-2 items-center cursor-pointer hover:-translate-y-2 transition-transform duration-500">
                                    <div className="relative w-full sm:w-[300px] max-w-[300px] bg-black rounded-xl p-1 shadow-[0_15px_35px_rgba(0,0,0,0.8)] border border-white/20 flex flex-col mx-auto">
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black border-t border-l border-r border-white/20 rounded-t-xl z-30 flex items-center justify-center">
                                            <div className="w-10 h-2 bg-[#111] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,1)]"></div>
                                        </div>

                                        <div className="relative w-full h-[420px] flex flex-col bg-[#111] rounded-lg border border-white/5 overflow-hidden">
                                            <div className={`absolute top-0 inset-x-0 h-32 ${bannerColor} opacity-20 blur-[40px] z-0 pointer-events-none`}></div>
                                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] z-0 pointer-events-none mix-blend-overlay"></div>

                                            <div className="relative pt-5 pb-3 px-5 flex justify-between items-start border-b border-white/5 z-20">
                                                <div className="flex flex-col">
                                                    <span className="font-black text-2xl tracking-tighter text-white uppercase leading-none">4FUN</span>
                                                    <span className="text-[7px] tracking-[0.2em] text-zinc-500 uppercase font-bold mt-0.5">Member Identity</span>
                                                </div>
                                                <div className="text-right flex flex-col items-end">
                                                    <span className="font-mono text-zinc-500 text-[11px] font-bold">{member.socials?.discordId || 'N/A'}</span>
                                                </div>
                                            </div>

                                            <div className="relative w-full h-[220px] bg-[#0a0a0a] flex items-center justify-center overflow-hidden border-b border-white/5 shadow-inner shrink-0">
                                                {isOnline && (
                                                    <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded-full border border-white/10 backdrop-blur-md">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                        <span className="text-[7px] font-bold tracking-widest text-zinc-300 uppercase">ONLINE</span>
                                                    </div>
                                                )}

                                                {((robloxId && liveAvatars[robloxId]) || member.image) && !member.image?.includes('wikipedia') && (
                                                    <Image
                                                        src={(robloxId && liveAvatars[robloxId]) || member.image}
                                                        alt={`${member.name} avatar`}
                                                        fill
                                                        unoptimized
                                                        className="object-contain object-bottom drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)]"
                                                    />
                                                )}
                                            </div>

                                            <div className="relative z-20 flex flex-col items-center flex-1 px-4 py-4 w-full bg-gradient-to-t from-black via-[#111]/80 to-transparent">
                                                <h3 className="font-black text-xl text-white tracking-tighter drop-shadow-lg leading-none text-center">{member.name}</h3>
                                                <p className="text-zinc-500 font-bold text-[9px] tracking-[0.2em] uppercase mt-1 mb-3 text-center">
                                                    @{member.username}
                                                </p>

                                                <div className="flex flex-wrap justify-center gap-1.5 mb-auto">
                                                    {member.roles.map((role) => (
                                                        <span key={role} className={`font-black text-[8px] uppercase tracking-widest px-2 py-1 rounded border ${getRoleStyle(role)} backdrop-blur-md`}>
                                                            {role}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="w-full h-8 opacity-40 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/UPC-A-036000291452.svg/2560px-UPC-A-036000291452.svg.png')] bg-contain bg-center bg-no-repeat invert mt-4 mb-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="w-full py-24 flex flex-col items-center justify-center text-center border border-white/5 bg-[#111]">
                        <h3 className="font-black text-3xl text-zinc-600 uppercase tracking-tighter mb-2">NOBODY'S HERE</h3>
                        <p className="text-zinc-500 font-medium">There are currently no members with the <strong className="text-white">{activeFilter}</strong> role.</p>
                    </div>
                )}
            </div>



            {selectedMember && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 md:py-12 bg-black/80 backdrop-blur-md transition-opacity duration-300" onClick={() => setSelectedMember(null)}>
                    <div className="relative w-full max-w-4xl max-h-full bg-black rounded-2xl p-1 shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/20 flex flex-col mx-auto overflow-hidden" onClick={(e) => e.stopPropagation()}>

                        <div className="relative w-full h-full flex flex-col md:flex-row bg-[#0a0a0a] rounded-xl border-[2px] border-white/5 overflow-y-auto scrollbar-hide">
                            {/* <div className={`absolute top-0 inset-x-0 h-40 ${getRoleBannerColor(getHighestRole(selectedMember.roles))} opacity-20 blur-[60px] z-0 pointer-events-none`}></div> */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] z-0 pointer-events-none mix-blend-overlay"></div>
                            <div className="w-full md:w-[320px] flex flex-col items-center p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/5 bg-black/20 z-10 shrink-0">
                                <div className="relative w-[180px] h-[240px] md:w-[250px] md:h-[340px] flex items-end justify-center mb-6 md:mb-8 bg-transparent">

                                    {((selectedRobloxId && liveAvatars[selectedRobloxId]) || selectedMember.image) && !selectedMember.image?.includes('wikipedia') && (
                                        <Image
                                            src={(selectedRobloxId && liveAvatars[selectedRobloxId]) || selectedMember.image}
                                            alt={selectedMember.name}
                                            fill
                                            unoptimized
                                            className="object-contain object-bottom drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)] scale-[1.15] md:scale-[1.35] origin-bottom"
                                        />
                                    )}
                                </div>

                                <div className="hidden md:flex flex-col items-center justify-center w-full mb-6 mt-6 pointer-events-none select-none relative">
                                    <style>{`
                                        @import url('https://fonts.googleapis.com/css2?family=Mrs+Saint+Delafield&display=swap');
                                    `}</style>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] blur-[1px]">
                                        <span className="text-5xl text-white font-black tracking-tighter mix-blend-overlay">4FUNCLAN</span>
                                    </div>
                                    <div className="relative z-10 -rotate-12 transform scale-150 opacity-90 mt-4 mb-2">
                                        <span className="text-5xl text-primary capitalize drop-shadow-md" style={{ fontFamily: '"Mrs Saint Delafield", cursive' }}>
                                            {selectedMember.name}
                                        </span>
                                    </div>
                                    <div className="w-1/2 h-px bg-white/20 mt-4 rounded-full"></div>
                                    <span className="text-[7px] font-mono tracking-widest text-zinc-500 uppercase mt-2">Verified Identity</span>
                                </div>


                            </div>

                            <div className="flex-1 flex flex-col p-6 md:p-10 z-10 relative">
                                <div className="flex flex-col items-start mb-6 border-b border-white/5 pb-6 shrink-0">
                                    <span className="font-black text-2xl md:text-4xl tracking-tighter text-white uppercase drop-shadow-md leading-none">4FUN CLAN</span>
                                    <span className="text-[10px] md:text-xs tracking-[0.3em] text-zinc-500 uppercase font-bold mt-2">Official Member Identification</span>
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="space-y-5">
                                        <div className="flex items-center gap-4">
                                            <span className="font-bold text-xs md:text-sm text-zinc-500 w-24 shrink-0 tracking-widest uppercase">ID NO.</span>
                                            <div className="flex flex-1 items-center gap-3 overflow-hidden">
                                                <span className="font-bold text-base md:text-lg text-zinc-200 uppercase">:</span>
                                                <span className="font-mono font-black text-sm sm:text-base md:text-2xl text-white truncate">{selectedMember.socials?.discordId || 'N/A'}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-bold text-xs md:text-sm text-zinc-500 w-24 shrink-0 tracking-widest uppercase">Name</span>
                                            <div className="flex flex-1 items-center gap-3">
                                                <span className="font-bold text-base md:text-lg text-zinc-200 uppercase">:</span>
                                                <span className="font-bold text-base md:text-lg text-zinc-200 uppercase truncate">{selectedMember.name}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-bold text-xs md:text-sm text-zinc-500 w-24 shrink-0 tracking-widest uppercase">Username</span>
                                            <div className="flex flex-1 items-center gap-3">
                                                <span className="font-bold text-base md:text-lg text-zinc-200 uppercase">:</span>
                                                <span className="font-bold text-base md:text-lg text-primary uppercase truncate">@{selectedMember.username}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <span className="font-bold text-xs md:text-sm text-zinc-500 w-24 shrink-0 tracking-widest uppercase mt-1">Roles</span>
                                            <div className="flex flex-1 gap-3">
                                                <span className="font-bold text-base md:text-lg text-zinc-200 uppercase">:</span>
                                                <div className="flex flex-wrap gap-2 flex-1 items-start">
                                                    {selectedMember.roles.map((role) => (
                                                        <span key={role} className={`font-black text-[10px] md:text-xs uppercase tracking-widest px-2.5 py-1 rounded border ${getRoleStyle(role)} backdrop-blur-md`}>
                                                            {role}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {selectedMember.description && (
                                            <div className="flex items-start gap-4 mt-2">
                                                <span className="font-bold text-xs md:text-sm text-zinc-500 w-24 shrink-0 tracking-widest uppercase mt-1">About</span>
                                                <div className="flex flex-1 gap-3">
                                                    <span className="font-bold text-base md:text-lg text-zinc-200 uppercase">:</span>
                                                    <p className="text-xs md:text-sm text-zinc-400 font-medium leading-relaxed italic mt-1.5 line-clamp-3">
                                                        "{selectedMember.description}"
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {selectedMember.socials && Object.keys(selectedMember.socials).length > 0 && (
                                            <div className="flex items-center gap-4 mt-2">
                                                <span className="font-bold text-xs md:text-sm text-zinc-500 w-24 shrink-0 tracking-widest uppercase">Socials</span>
                                                <div className="flex flex-1 gap-4 items-center">
                                                    <span className="font-bold text-base md:text-lg text-zinc-200 uppercase mr-1">:</span>
                                                    {selectedMember.socials.instagram && (
                                                        <a href={selectedMember.socials.instagram.startsWith('http') ? selectedMember.socials.instagram : `https://instagram.com/${selectedMember.socials.instagram}`} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-pink-500 transition-all duration-300">
                                                            <FaInstagram size={24} />
                                                        </a>
                                                    )}
                                                    {selectedMember.socials.tiktok && (
                                                        <a href={selectedMember.socials.tiktok.startsWith('http') ? selectedMember.socials.tiktok : `https://tiktok.com/@${selectedMember.socials.tiktok}`} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-all duration-300">
                                                            <FaTiktok size={24} />
                                                        </a>
                                                    )}
                                                    {selectedMember.socials.discord && (
                                                        <a href={`https://discord.com/users/${selectedMember.socials.discordId}`} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#5865F2] transition-all duration-300">
                                                            <FaDiscord size={24} />
                                                        </a>
                                                    )}
                                                    {selectedMember.socials.portfolio && (
                                                        <a href={selectedMember.socials.portfolio.startsWith('http') ? selectedMember.socials.portfolio : `https://${selectedMember.socials.portfolio}`} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-all duration-300">
                                                            <Globe size={24} />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {(() => {
                                        const dData = selectedMember.socials?.discordId ? lanyardData[selectedMember.socials.discordId] : null;
                                        const rPresence = (selectedRobloxId && livePresences[selectedRobloxId]) || selectedMember.presence;

                                        const isRobloxPlaying = rPresence?.userPresenceType === 2;
                                        const isRobloxOnline = rPresence?.userPresenceType === 1 || rPresence?.userPresenceType === 3;

                                        const dSpotify = dData?.spotify;
                                        const dActivity = dData?.activities?.find((a: any) => a.type === 0);

                                        const widgets = [];

                                        if (isRobloxPlaying) {
                                            widgets.push(
                                                <div key="roblox-playing" className="bg-[#161616] border border-white/5 p-4 rounded mt-4">
                                                    <div className="flex items-center gap-4">
                                                        {rPresence.gameIconUrl ? (
                                                            <div className="relative w-12 h-12 shrink-0 overflow-hidden border border-white/10">
                                                                <Image src={rPresence.gameIconUrl} alt="Game Icon" fill unoptimized className="object-cover" />
                                                            </div>
                                                        ) : (
                                                            <div className="w-12 h-12 bg-zinc-800 border border-white/10 flex items-center justify-center shrink-0">
                                                                <span className="text-zinc-600 font-bold">?</span>
                                                            </div>
                                                        )}
                                                        <div className="flex flex-col flex-1 min-w-0">
                                                            <span className="text-[9px] font-bold text-green-400 uppercase tracking-widest mb-0.5">Playing Roblox</span>
                                                            <span className="text-sm text-white font-bold truncate">{rPresence.lastLocation || 'Hidden Location'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        if (dSpotify) {
                                            widgets.push(
                                                <div key="discord-spotify" className="bg-[#161616] border border-white/5 p-4 rounded mt-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="relative w-12 h-12 shrink-0 overflow-hidden border border-white/10">
                                                            <Image src={dSpotify.album_art_url} alt="Spotify" fill unoptimized className="object-cover" />
                                                        </div>
                                                        <div className="flex flex-col flex-1 min-w-0">
                                                            <span className="text-[9px] font-bold text-[#1DB954] uppercase tracking-widest mb-0.5">Listening</span>
                                                            <span className="text-sm text-white font-bold truncate">{dSpotify.song}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        if (dActivity) {
                                            widgets.push(
                                                <div key="discord-activity" className="bg-[#161616] border border-white/5 p-4 rounded mt-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="relative w-12 h-12 bg-zinc-800 shrink-0 overflow-hidden border border-white/10 flex items-center justify-center">
                                                            {dActivity.assets?.large_image ? (
                                                                <Image src={getDiscordAssetUrl(dActivity.application_id, dActivity.assets.large_image)} alt={dActivity.name} fill unoptimized className="object-cover" />
                                                            ) : (
                                                                <FaDiscord size={20} className="text-zinc-500" />
                                                            )}
                                                        </div>
                                                        <div className="flex flex-col flex-1 min-w-0">
                                                            <span className="text-[9px] font-bold text-[#5865F2] uppercase tracking-widest mb-0.5">Playing a Game</span>
                                                            <span className="text-sm text-white font-bold truncate">{dActivity.name}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        if (isRobloxOnline && !isRobloxPlaying) {
                                            widgets.push(
                                                <div key="roblox-online" className="bg-[#161616] border border-white/5 p-4 rounded mt-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-12 h-12 ${rPresence.userPresenceType === 3 ? 'bg-orange-500/10 border-orange-500/20' : 'bg-white/5 border-white/10'} flex items-center justify-center border shrink-0`}>
                                                            <SiRoblox size={20} className={`${rPresence.userPresenceType === 3 ? 'text-orange-500 drop-shadow-[0_0_8px_#f97316]' : 'text-zinc-200'}`} />
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
                                            const dCustomStatus = dData?.activities?.find((a: any) => a.type === 4);
                                            const isDiscordOnline = dData && (dData.discord_status === 'online' || dData.discord_status === 'idle' || dData.discord_status === 'dnd');

                                            if (isDiscordOnline) {
                                                const discordStatusText =
                                                    dData.discord_status === 'online' ? 'Online on Discord' :
                                                        dData.discord_status === 'idle' ? 'Idle on Discord' :
                                                            'Do Not Disturb';

                                                widgets.push(
                                                    <div key="discord-status" className="bg-[#161616] border border-white/5 p-4 rounded mt-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-[#5865F2]/10 flex items-center justify-center border border-[#5865F2]/20 shrink-0">
                                                                <FaDiscord size={20} className="text-[#5865F2]" />
                                                            </div>
                                                            <div className="flex flex-col flex-1 min-w-0">
                                                                <span className="text-[9px] font-bold text-[#5865F2] uppercase tracking-widest mb-0.5">
                                                                    {dData.discord_status === 'dnd' ? 'Busy' : 'Active'}
                                                                </span>
                                                                <span className="text-sm text-white font-bold truncate">
                                                                    {dCustomStatus?.state ? dCustomStatus.state : discordStatusText}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            } else {
                                                widgets.push(
                                                    <div key="offline-status" className="bg-[#161616]/50 border border-white/5 p-4 rounded mt-4 opacity-70">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-zinc-800/30 flex items-center justify-center border border-white/5 shrink-0">
                                                                <div className="w-2 h-2 rounded-full bg-zinc-500"></div>
                                                            </div>
                                                            <div className="flex flex-col flex-1 min-w-0">
                                                                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-0.5">Status</span>
                                                                <span className="text-sm text-zinc-400 font-bold truncate">Currently Offline</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        }

                                        return (
                                            <div className="mt-6 flex flex-col gap-2 shrink-0">
                                                <h3 className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em] border-t border-white/5 pt-4">Live Status</h3>
                                                {widgets}
                                            </div>
                                        );
                                    })()}

                                    <div className="mt-6 pt-6 border-t border-white/5 w-full flex justify-center">
                                        <Link 
                                            href={`/${selectedMember.name.toLowerCase().replace(/\s+/g, "")}`}
                                            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest"
                                        >
                                            Visit Profile Page <ArrowRight size={12} />
                                        </Link>
                                    </div>

                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedMember(null)}
                                className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white/50 hover:text-white transition-colors border border-white/10 cursor-pointer backdrop-blur-md">
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
