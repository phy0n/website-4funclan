"use client";

import { useState } from "react";
import Image from "next/image";
import { FaDiscord, FaInstagram, FaTiktok } from "react-icons/fa6";
import membersData from "@/data/members.json";

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
    case "OWNER": return "from-white/10 to-[#0a0a0a]";
    case "CO OWNER": return "from-blue-900/60 to-blue-900/10";
    case "STAFF": return "from-cyan-500/40 to-cyan-500/5";
    case "ASSESSOR": return "from-green-500/40 to-green-500/5";
    case "DARK SIDE": return "from-red-600/40 to-red-600/5";
    case "CONTENT CREATOR": return "from-yellow-500/40 to-yellow-500/5";
    case "MEMBER": return "from-pink-500/40 to-pink-500/5";
    default: return "from-white/10 to-white/0";
  }
};

type Member = {
  id: number;
  name: string;
  username: string;
  description: string;
  roles: string[];
  image: string;
  socials?: {
    discord?: string;
    instagram?: string;
    tiktok?: string;
  };
  orderPriority: number;
};

export default function Members() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const sortedMembers = ([...membersData] as Member[]).sort((a, b) => {
    return getHighestRolePriority(a.roles) - getHighestRolePriority(b.roles);
  });

  const filteredMembers = sortedMembers.filter(member => 
    activeFilter === "ALL" || member.roles.includes(activeFilter)
  );

  const ALL_ROLES = ["ALL", "OWNER", "CO OWNER", "STAFF", "ASSESSOR", "DARK SIDE", "CONTENT CREATOR", "MEMBER"];

  return (
    <div className="relative w-full bg-[#0a0a0a] min-h-screen pb-10 pt-32 md:pt-40">
      <div className="relative z-20 max-w-4xl px-6 md:px-24 mb-16">
        <div className="flex items-center gap-3 mb-3">
          <p className="text-zinc-500 font-bold tracking-widest text-xs uppercase">
            4Fun Clan / Member
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
          <p className="text-primary font-black tracking-widest text-xs uppercase bg-primary/10 px-2 py-0.5 rounded-sm">
            {sortedMembers.length} ACTIVE
          </p>
        </div>
        <h1 className="text-white font-black text-4xl sm:text-5xl md:text-7xl tracking-tighter mb-4 md:mb-6 leading-none uppercase">
          Members.
        </h1>
        <p className="text-zinc-400 font-medium text-base md:text-xl leading-relaxed max-w-lg border-l-2 border-primary pl-4">
          Meet the family. The people who make this clan feel like home.
        </p>
      </div>

      <div className="w-full px-6 md:px-24">

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-12">
        {ALL_ROLES.map(role => (
          <button
            key={role}
            onClick={() => setActiveFilter(role)}
            className={`px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-full border transition-all duration-300 ${
              activeFilter === role 
                ? "bg-primary text-white border-primary shadow-[0_0_15px_rgba(220,38,38,0.5)]" 
                : "bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white"
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member) => {
          const mainRole = getHighestRole(member.roles);
          const bannerGradient = getRoleBannerColor(mainRole);

          return (
            <div key={member.id} className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#111] hover:border-white/30 transition-colors flex flex-col shadow-xl duration-300">
              <div className={`h-28 w-full bg-gradient-to-br ${bannerGradient} border-b border-white/5 relative`}></div>
              <div className="relative -mt-14 flex justify-center w-full px-6">
                <div className="w-28 h-28 rounded-full border-4 border-[#111] bg-[#1a1a1a] overflow-hidden flex items-center justify-center relative shadow-lg">
                  <Image
                    src={member.image}
                    alt={`${member.name}'s avatar`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center justify-start p-6 pt-4 flex-1">
                <h3 className="font-black text-2xl text-white truncate mb-0">{member.name}</h3>
                <p className="text-zinc-500 font-medium text-sm mb-3">
                  @{member.username}
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-3 mb-4">
                  {member.roles.map((role) => (
                    <span key={role} className={`font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border ${getRoleStyle(role)}`}>
                      {role}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-400 text-center font-medium line-clamp-3 mb-6">
                  {member.description}
                </p>

                {/* Socials */}
                {/* <div className="flex gap-4 mt-auto pt-4 border-t border-white/5 w-full justify-center">
                  {member.socials?.discord && (
                    <a href={`https://discord.com/users/${member.socials.discord}`} target="_blank" rel="noreferrer" title="Discord" className="text-gray-500 hover:text-[#5865F2] transition-colors">
                      <FaDiscord className="w-5 h-5" />
                    </a>
                  )}
                  {member.socials?.instagram && (
                    <a href={`https://instagram.com/${member.socials.instagram}`} target="_blank" rel="noreferrer" title="Instagram" className="text-gray-500 hover:text-[#E1306C] transition-colors">
                      <FaInstagram className="w-5 h-5" />
                    </a>
                  )}
                  {member.socials?.tiktok && (
                    <a href={`https://tiktok.com/@${member.socials.tiktok}`} target="_blank" rel="noreferrer" title="TikTok" className="text-gray-500 hover:text-white transition-colors">
                      <FaTiktok className="w-4 h-4 mt-0.5" />
                    </a>
                  )}
                </div> */}
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
