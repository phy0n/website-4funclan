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
    "EXECUTIVE": 2.5,
    "ADMIN": 3,
    "STAFF": 4,
    "TRAINEE": 4.5,
    "ASSESSOR": 5,
    "DARKSIDE": 6,
    "FEARLESS": 6.5,
    "STREAMER": 7,
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
        case "OWNER": return "text-white";
        case "CO OWNER": return "text-blue-400";
        case "EXECUTIVE": return "text-fuchsia-400";
        case "ADMIN": return "text-purple-400";
        case "STAFF": return "text-cyan-400";
        case "TRAINEE": return "text-lime-400";
        case "ASSESSOR": return "text-green-400";
        case "DARKSIDE": return "text-red-500";
        case "FEARLESS": return "text-orange-400";
        case "STREAMER": return "text-yellow-400";
        case "MEMBER": return "text-zinc-400";
        default: return "text-zinc-500";
    }
};

const getRoleBannerColor = (role: string) => {
    switch (role) {
        case "OWNER": return "bg-white";
        case "CO OWNER": return "bg-blue-600";
        case "EXECUTIVE": return "bg-fuchsia-500";
        case "ADMIN": return "bg-purple-500";
        case "STAFF": return "bg-cyan-500";
        case "TRAINEE": return "bg-lime-400";
        case "ASSESSOR": return "bg-green-500";
        case "DARKSIDE": return "bg-primary";
        case "FEARLESS": return "bg-orange-400";
        case "STREAMER": return "bg-yellow-500";
        case "MEMBER": return "bg-zinc-700";
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

        const isOnline = currentPresence && currentPresence.userPresenceType > 0;

        let matchesStatus = true;
        if (statusFilter === "ONLINE") {
            matchesStatus = isOnline;
        } else if (statusFilter === "OFFLINE") {
            matchesStatus = !isOnline;
        }

        return matchesFilter && matchesSearch && matchesStatus;
    });

    const ALL_ROLES = ["ALL", "OWNER", "CO OWNER", "EXECUTIVE", "ADMIN", "STAFF", "TRAINEE", "ASSESSOR", "DARKSIDE", "FEARLESS", "STREAMER", "MEMBER"];

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
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 pt-6 pb-12">
                        {filteredMembers.map((member) => {
                            const mainRole = getHighestRole(member.roles);
                            const bannerColor = getRoleBannerColor(mainRole);

                            const robloxIdMatch = member.robloxProfile?.match(/users\/(\d+)/);
                            const robloxId = robloxIdMatch ? parseInt(robloxIdMatch[1]) : null;
                            const currentPresence = (robloxId && livePresences[robloxId]) || member.presence;
                            const isOnline = currentPresence && currentPresence.userPresenceType > 0;

                            return (
                                <div key={member.id} onClick={() => setSelectedMember(member)} className="group relative cursor-pointer">
                                    <div className="relative w-full bg-[#111] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 overflow-hidden hover:-translate-y-1">

                                        <div className="relative w-full aspect-square bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                                            <span className="absolute top-3 left-3 z-20 font-mono text-zinc-600 text-[10px] font-bold">#{String(member.id).padStart(3, '0')}</span>

                                            {((robloxId && liveAvatars[robloxId]) || member.image) && !member.image?.includes('wikipedia') && (
                                                <Image
                                                    src={(robloxId && liveAvatars[robloxId]) || member.image}
                                                    alt={`${member.name} avatar`}
                                                    fill
                                                    unoptimized
                                                    className="object-contain object-bottom drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]"
                                                />
                                            )}
                                        </div>

                                        <div className="relative z-20 px-3 pt-3 pb-4 w-full">
                                            <h3 className="font-black text-sm text-white tracking-tight leading-none">{member.name}</h3>
                                            <p className="text-zinc-600 font-semibold text-[9px] tracking-widest uppercase mt-0.5 mb-2">
                                                {member.username}
                                            </p>

                                            <div className="flex flex-wrap gap-x-2 gap-y-1">
                                                {member.roles.map((role) => (
                                                    <span key={role} className={`font-bold text-[8px] uppercase tracking-widest ${getRoleStyle(role)}`}>
                                                        {role}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className={`h-[2px] w-full ${getRoleBannerColor(mainRole)}`}></div>
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
                    <div className="relative w-full max-w-3xl max-h-full bg-[#0a0a0a] border border-white/[0.08] flex flex-col mx-auto overflow-hidden" onClick={(e) => e.stopPropagation()}>

                        <div className="relative w-full h-full flex flex-col md:flex-row overflow-y-auto scrollbar-hide">
                            {/* Left: Avatar */}
                            <div className="w-full md:w-[300px] flex flex-col items-center pt-6 pb-4 px-6 md:p-6 border-b md:border-b-0 md:border-r border-white/[0.06] bg-black/40 shrink-0">
                                <div className="relative w-[200px] h-[260px] sm:w-[240px] sm:h-[300px] md:w-[240px] md:h-[320px] flex items-end justify-center bg-transparent">
                                    {((selectedRobloxId && liveAvatars[selectedRobloxId]) || selectedMember.image) && !selectedMember.image?.includes('wikipedia') && (
                                        <Image
                                            src={(selectedRobloxId && liveAvatars[selectedRobloxId]) || selectedMember.image}
                                            alt={selectedMember.name}
                                            fill
                                            unoptimized
                                            className="object-contain object-bottom drop-shadow-[0_15px_20px_rgba(0,0,0,0.9)] scale-[1.3] sm:scale-[1.35] md:scale-[1.3] origin-bottom"
                                        />
                                    )}
                                </div>

                                {/* Signature */}
                                <div className="hidden md:flex flex-col items-center justify-center w-full mt-4 mb-2 pointer-events-none select-none relative">
                                    <style>{`
                                        @import url('https://fonts.googleapis.com/css2?family=Mrs+Saint+Delafield&display=swap');
                                    `}</style>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] blur-[1px]">
                                        <span className="text-5xl text-white font-black tracking-tighter">4FUNCLAN</span>
                                    </div>
                                    <div className="relative z-10 -rotate-12 transform scale-150 opacity-90 mt-4 mb-2">
                                        <span className="text-5xl text-primary capitalize drop-shadow-md" style={{ fontFamily: '"Mrs Saint Delafield", cursive' }}>
                                            {selectedMember.name}
                                        </span>
                                    </div>
                                    <div className="w-1/2 h-px bg-white/15 mt-4 rounded-full"></div>
                                    <span className="text-[7px] font-mono tracking-widest text-zinc-600 uppercase mt-2">Verified Identity</span>
                                </div>
                            </div>

                            {/* Right: Info */}
                            <div className="flex-1 flex flex-col p-6 md:p-8 relative">
                                {/* Header */}
                                <div className="mb-6 pb-5 border-b border-white/[0.06]">
                                    <span className="font-black text-2xl md:text-3xl tracking-tighter text-white uppercase drop-shadow-md leading-none">4FUN CLAN</span>
                                    <p className="text-[10px] md:text-xs tracking-[0.3em] text-zinc-500 uppercase font-bold mt-2">Official Member Identification</p>
                                </div>

                                {/* Details */}
                                <div className="space-y-5 flex-1">
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold text-xs md:text-sm text-zinc-500 w-28 shrink-0 tracking-widest uppercase">Member ID</span>
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-base md:text-lg text-zinc-200">:</span>
                                            <span className="font-bold text-base md:text-lg text-white">#{String(selectedMember.id).padStart(3, '0')}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold text-xs md:text-sm text-zinc-500 w-28 shrink-0 tracking-widest uppercase">Name</span>
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-base md:text-lg text-zinc-200">:</span>
                                            <span className="font-bold text-base md:text-lg text-white uppercase truncate">{selectedMember.name}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold text-xs md:text-sm text-zinc-500 w-28 shrink-0 tracking-widest uppercase">Username</span>
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-base md:text-lg text-zinc-200">:</span>
                                            <span className="font-bold text-base md:text-lg text-white truncate">{selectedMember.username}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold text-xs md:text-sm text-zinc-500 w-28 shrink-0 tracking-widest uppercase">Roles</span>
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <span className="font-bold text-base md:text-lg text-zinc-200">:</span>
                                            <div className="flex flex-wrap gap-x-3 gap-y-1 items-center">
                                                {selectedMember.roles.map((role) => (
                                                    <span key={role} className={`font-black text-sm md:text-base uppercase tracking-wide ${getRoleStyle(role)}`}>
                                                        {role}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {selectedMember.description && (
                                        <div className="flex items-start gap-4">
                                            <span className="font-bold text-xs md:text-sm text-zinc-500 w-28 shrink-0 tracking-widest uppercase mt-1">About</span>
                                            <div className="flex gap-3 flex-1">
                                                <span className="font-bold text-base md:text-lg text-zinc-200">:</span>
                                                <p className="text-sm text-zinc-400 font-medium leading-relaxed mt-0.5">
                                                    {selectedMember.description}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Live Status */}
                                {(() => {
                                    const rPresence = (selectedRobloxId && livePresences[selectedRobloxId]) || selectedMember.presence;
                                    const isRobloxPlaying = rPresence?.userPresenceType === 2;
                                    const isRobloxOnline = rPresence?.userPresenceType === 1 || rPresence?.userPresenceType === 3;

                                    let statusWidget = null;

                                    if (isRobloxPlaying) {
                                        statusWidget = (
                                            <div className="flex items-center gap-3">
                                                {rPresence.gameIconUrl ? (
                                                    <div className="relative w-10 h-10 shrink-0 overflow-hidden border border-white/[0.06]">
                                                        <Image src={rPresence.gameIconUrl} alt="Game Icon" fill unoptimized className="object-cover" />
                                                    </div>
                                                ) : (
                                                    <div className="w-10 h-10 bg-zinc-900 border border-white/[0.06] flex items-center justify-center shrink-0">
                                                        <SiRoblox size={16} className="text-green-400" />
                                                    </div>
                                                )}
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-[9px] font-bold text-green-400 uppercase tracking-widest">Playing Roblox</span>
                                                    <span className="text-sm text-white font-bold truncate">{rPresence.lastLocation || 'Hidden Location'}</span>
                                                </div>
                                            </div>
                                        );
                                    } else if (isRobloxOnline) {
                                        statusWidget = (
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 ${rPresence.userPresenceType === 3 ? 'bg-orange-500/10' : 'bg-white/[0.03]'} flex items-center justify-center border border-white/[0.06] shrink-0`}>
                                                    <SiRoblox size={16} className={rPresence.userPresenceType === 3 ? 'text-orange-500' : 'text-zinc-300'} />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className={`text-[9px] font-bold ${rPresence.userPresenceType === 3 ? 'text-orange-500' : 'text-green-400'} uppercase tracking-widest`}>
                                                        {rPresence.userPresenceType === 3 ? 'In Studio' : 'Online'}
                                                    </span>
                                                    <span className="text-sm text-white font-bold truncate">
                                                        {rPresence.userPresenceType === 3
                                                            ? (rPresence.lastLocation || 'Developing on Roblox')
                                                            : (rPresence.lastLocation && rPresence.lastLocation !== 'Website' ? rPresence.lastLocation : 'Active on Roblox')}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        statusWidget = (
                                            <div className="flex items-center gap-3 opacity-50">
                                                <div className="w-10 h-10 bg-white/[0.02] flex items-center justify-center border border-white/[0.04] shrink-0">
                                                    <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Status</span>
                                                    <span className="text-sm text-zinc-500 font-bold">Currently Offline</span>
                                                </div>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div className="mt-6 pt-5 border-t border-white/[0.06]">
                                            <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-3 block">Live Status</span>
                                            {statusWidget}
                                        </div>
                                    );
                                })()}

                                {/* Profile Link */}
                                <div className="mt-5 pt-5 border-t border-white/[0.06] flex justify-center">
                                    <Link
                                        href={`/${selectedMember.name.toLowerCase().replace(/\s+/g, "")}`}
                                        className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest"
                                    >
                                        Visit Profile Page <ArrowRight size={12} />
                                    </Link>
                                </div>
                            </div>

                            {/* 4FUN Logo (Mobile) */}
                            <div className="absolute top-4 left-4 z-50 md:hidden pointer-events-none select-none">
                                <Image src="/img/4Flogo.png" alt="4FUN Clan" width={36} height={36} className="object-contain drop-shadow-lg" />
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedMember(null)}
                                className="absolute top-3 right-3 z-50 p-2 bg-black/50 hover:bg-white/10 text-white/40 hover:text-white transition-colors cursor-pointer backdrop-blur-sm">
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
