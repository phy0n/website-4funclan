"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Member } from "@/lib/roblox";
import { Globe, ArrowLeft, Gamepad2, Music } from "lucide-react";
import { FaDiscord, FaInstagram, FaTiktok } from "react-icons/fa6";
import { SiRoblox } from "react-icons/si";
import Link from "next/link";
import { motion } from "framer-motion";

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

export default function PortfolioClient({ member }: { member: Member }) {
    const [lanyardData, setLanyardData] = useState<any>(null);

    useEffect(() => {
        if (!member.socials?.discordId) return;

        const fetchLanyard = async () => {
            try {
                const res = await fetch(`https://api.lanyard.rest/v1/users/${member.socials?.discordId}`);
                const json = await res.json();
                if (json.success) {
                    setLanyardData(json.data);
                }
            } catch (err) {
                console.error("Lanyard error", err);
            }
        };

        fetchLanyard();
        const interval = setInterval(fetchLanyard, 10000); // poll every 10s
        return () => clearInterval(interval);
    }, [member.socials?.discordId]);

    const isOffline = lanyardData?.discord_status === 'offline' || !lanyardData;
    const statusColor = isOffline ? 'bg-zinc-500' : 
                        lanyardData.discord_status === 'online' ? 'bg-green-500' :
                        lanyardData.discord_status === 'idle' ? 'bg-yellow-500' : 'bg-red-500';

    const playingActivity = lanyardData?.activities?.find((a: any) => a.type === 0);
    const spotify = lanyardData?.spotify;

    return (
        <main className="relative min-h-screen w-full overflow-x-hidden overflow-y-auto bg-black font-sans">
            {/* Background Video */}
            <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="fixed inset-0 w-full h-full object-cover z-0 opacity-50 pointer-events-none"
                src="/video/background1.mp4"
            />
            {/* Dynamic Gradient Overlay */}
            <div className="fixed inset-0 bg-gradient-to-b md:bg-gradient-to-tr from-black/80 via-black/50 to-black/10 z-0 pointer-events-none"></div>

            {/* Back Button - Top Left */}
            <div className="fixed top-4 left-4 md:top-8 md:left-8 z-50">
                <Link href="/members" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs md:text-sm font-bold uppercase tracking-widest bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                    <ArrowLeft size={16} /> Back
                </Link>
            </div>

            <div className="relative z-10 w-full min-h-screen flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-0 gap-8 md:gap-0">
                
                {/* Left Side: Floating Character */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full md:w-1/2 h-[45vh] md:h-[85vh] flex justify-center items-center order-1"
                >
                    {/* Character Image */}
                    <div className="relative w-full h-full">
                        <Image 
                            src={member.image} 
                            alt={member.name} 
                            fill 
                            className="object-contain object-center z-10" 
                            unoptimized 
                        />
                    </div>
                </motion.div>

                {/* Right Side: Identity & Info */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left order-2 z-20 pb-12 md:pb-0">
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-5xl sm:text-7xl lg:text-[6rem] font-black text-white tracking-tighter uppercase leading-[0.9] drop-shadow-2xl">
                            {member.name}
                        </h1>
                        <h2 className="text-xl md:text-3xl font-medium text-zinc-400 mt-2 mb-8">
                            @{member.username}
                        </h2>

                        {/* Roles */}
                        {member.roles.length > 0 && (
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-8">
                                {member.roles.map((role) => (
                                    <span key={role} className={`px-4 py-1.5 border text-[10px] sm:text-xs font-black uppercase tracking-widest rounded ${getRoleStyle(role)}`}>
                                        {role}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Description */}
                        {member.description && (
                            <p className="text-base text-zinc-300 font-medium max-w-md leading-relaxed mb-10 border-l-4 border-primary pl-4 bg-gradient-to-r from-primary/10 to-transparent py-2">
                                {member.description}
                            </p>
                        )}
                    </motion.div>

                    {/* Live Activities (Bento Style) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-md flex flex-col gap-4 mb-12"
                    >
                        {playingActivity && (
                            <div className="group w-full bg-black/40 hover:bg-black/60 transition-colors border border-white/5 p-4 rounded-2xl flex items-center gap-5 backdrop-blur-md">
                                <div className="w-16 h-16 bg-zinc-900 rounded-xl overflow-hidden shrink-0 relative flex items-center justify-center shadow-lg transition-transform">
                                    {playingActivity.assets?.large_image ? (
                                        <Image src={`https://cdn.discordapp.com/app-assets/${playingActivity.application_id}/${playingActivity.assets.large_image}.png`} alt="Activity" fill unoptimized className="object-cover" />
                                    ) : (
                                        <Gamepad2 size={28} className="text-zinc-500" />
                                    )}
                                    {playingActivity.assets?.small_image && (
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-2 border-[#121212] rounded-full overflow-hidden bg-zinc-800">
                                            <Image src={`https://cdn.discordapp.com/app-assets/${playingActivity.application_id}/${playingActivity.assets.small_image}.png`} alt="Small" fill unoptimized className="object-cover" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col min-w-0 flex-1">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Playing</span>
                                    <span className="font-bold text-white text-base truncate">{playingActivity.name}</span>
                                    {playingActivity.details && <span className="text-sm text-zinc-400 truncate">{playingActivity.details}</span>}
                                </div>
                            </div>
                        )}

                        {spotify && (
                            <div className="group w-full bg-[#1DB954]/5 hover:bg-[#1DB954]/10 transition-colors border border-[#1DB954]/20 p-4 rounded-2xl flex items-center gap-5 backdrop-blur-md">
                                <div className="w-16 h-16 bg-zinc-900 rounded-xl overflow-hidden shrink-0 relative shadow-lg transition-transform">
                                    <Image src={spotify.album_art_url} alt="Spotify" fill unoptimized className="object-cover" />
                                </div>
                                <div className="flex flex-col min-w-0 flex-1">
                                    <span className="text-[10px] font-black text-[#1DB954] uppercase tracking-[0.2em] mb-1 flex items-center gap-1.5">
                                        <Music size={12} /> Listening to Spotify
                                    </span>
                                    <span className="font-bold text-white text-base truncate">{spotify.song}</span>
                                    <span className="text-sm text-zinc-400 truncate">{spotify.artist}</span>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Socials */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-wrap items-center justify-center md:justify-start gap-4"
                    >
                        {member.socials?.instagram && (
                            <a href={member.socials.instagram.startsWith('http') ? member.socials.instagram : `https://instagram.com/${member.socials.instagram}`} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 hover:bg-white text-zinc-400 hover:text-black transition-all rounded-2xl border border-white/5">
                                <FaInstagram size={22} />
                            </a>
                        )}
                        {member.socials?.tiktok && (
                            <a href={member.socials.tiktok.startsWith('http') ? member.socials.tiktok : `https://tiktok.com/@${member.socials.tiktok}`} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 hover:bg-white text-zinc-400 hover:text-black transition-all rounded-2xl border border-white/5">
                                <FaTiktok size={22} />
                            </a>
                        )}
                        {member.socials?.discordId && (
                            <a href={`https://discord.com/users/${member.socials.discordId}`} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 hover:bg-[#5865F2] hover:border-[#5865F2] text-zinc-400 hover:text-white transition-all rounded-2xl border border-white/5">
                                <FaDiscord size={22} />
                            </a>
                        )}
                        {member.robloxProfile && (
                            <a href={member.robloxProfile} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 hover:bg-white text-zinc-400 hover:text-black transition-all rounded-2xl border border-white/5">
                                <SiRoblox size={22} />
                            </a>
                        )}
                        {member.socials?.portfolio && (
                            <a href={member.socials.portfolio.startsWith('http') ? member.socials.portfolio : `https://${member.socials.portfolio}`} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 hover:bg-white text-zinc-400 hover:text-black transition-all rounded-2xl border border-white/5 flex items-center gap-3">
                                <Globe size={22} />
                                <span className="text-xs font-black uppercase tracking-widest hidden sm:block">Portfolio</span>
                            </a>
                        )}
                    </motion.div>

                </div>
            </div>
        </main>
    );
}
