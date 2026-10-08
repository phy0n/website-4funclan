"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

interface DiscordUser {
  id: string;
  username: string;
  global_name: string | null;
  avatar_url: string | null;
}

interface StaffMemberProps {
  name: string;
  discordId: string;
  description?: string;
}

function useDiscordUser(discordId: string) {
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!discordId) {
      setLoading(false);
      return;
    }
    const apiUrl = process.env.NEXT_PUBLIC_BOT_API_URL || "http://localhost:8080";
    fetch(`${apiUrl}/api/user/${discordId}`)
      .then(res => res.json())
      .then(data => {
        if (data) setUser(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch discord user", err);
        setLoading(false);
      });
  }, [discordId]);

  return { user, loading };
}

const StaffProfile = ({ name, discordId, description, showRoleDesc, horizontal = false }: StaffMemberProps & { showRoleDesc?: string, horizontal?: boolean }) => {
  const { user, loading } = useDiscordUser(discordId);
  const displayName = user?.global_name || user?.username || name;
  const avatarUrl = user?.avatar_url || "/img/default-avatar.png";

  if (horizontal) {
    return (
      <div className="flex items-center gap-4 group">
        <div className="relative w-12 h-12 rounded-full border border-white/10 overflow-hidden bg-white/5 shrink-0 flex items-center justify-center">
          {!loading && avatarUrl !== "/img/default-avatar.png" ? (
            <Image src={avatarUrl} alt={displayName} fill className="object-cover" />
          ) : (
            <User className="w-1/2 h-1/2 text-white/20" strokeWidth={1.5} />
          )}
        </div>
        <div className="flex flex-col text-left">
          <h4 className="text-sm font-bold text-white tracking-wide">{displayName}</h4>
          {description && <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">{description}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center w-full group">
      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/10 overflow-hidden bg-white/5 mb-4">
        {!loading && avatarUrl !== "/img/default-avatar.png" ? (
          <Image src={avatarUrl} alt={displayName} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/5">
            <User className="w-1/2 h-1/2 text-white/20" strokeWidth={1.5} />
          </div>
        )}
      </div>
      <h4 className="text-lg md:text-xl font-bold text-white tracking-wide mb-1">{displayName}</h4>
      {description && <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">{description}</p>}
      {showRoleDesc && <p className="text-xs md:text-sm text-zinc-400 max-w-[280px] leading-relaxed mt-2">{showRoleDesc}</p>}
    </div>
  );
};

interface Division {
  title: string;
  description: string;
  head: StaffMemberProps[];
  staff: StaffMemberProps[];
}

export default function StaffClient() {
  const divisions: Division[] = [
    {
      title: "Member Relations",
      description: "Welcoming new members, mingling with the community, and fostering a friendly clan environment.",
      head: [],
      staff: []
    },
    {
      title: "Moderation",
      description: "Managing tickets, resolving conflicts, and enforcing clan rules.",
      head: [],
      staff: [
        { name: "4moca", discordId: "1313494943456821320", description: "Moderator" }
      ]
    },
    {
      title: "Recording",
      description: "Recording gameplay, editing clips, and managing our social media presence.",
      head: [],
      staff: []
    },
    {
      title: "Event Organizer",
      description: "Preparing and hosting clan events, managing participants, and creating mini-games.",
      head: [],
      staff: []
    }
  ];

  return (
    <div className="relative w-full bg-[#0a0a0a] min-h-screen pb-32 pt-28 md:pt-40 text-white font-sans overflow-hidden">

      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-12 mb-20 md:mb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-zinc-500 font-bold tracking-[0.3em] text-xs uppercase mb-6">
            Organization Chart
          </p>
          <h1 className="text-white font-black text-4xl sm:text-5xl md:text-6xl tracking-tighter mb-4 md:mb-8 leading-none uppercase">
            Staff Structure
          </h1>
          <p className="text-zinc-400 font-medium text-xs md:text-sm lg:text-lg leading-relaxed max-w-2xl mx-auto px-4 md:px-0">
            The organizational structure and division of responsibilities to ensure the 4Fun clan continues to grow and stays organized.
          </p>
        </motion.div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-8">

        {/* LEADERSHIP TREE */}
        <div className="flex flex-col items-center relative">

          <RoleCard
            title="OWNER"
            desc="The highest decision maker and founder of the clan."
            delay={0.1}
            members={[{ name: "4Vo1d", discordId: "877885373152362528", description: "The Founder" }]}
          />

          <TreeLine />

          <RoleCard
            title="CO-OWNER"
            desc="Assists the Owner in making decisions and directing the clan."
            delay={0.2}
            members={[]}
          />

          <TreeLine />

          <RoleCard
            title="EXECUTIVE"
            desc="Manages all aspects of the clan under the approval of the Owner/Co-Owner."
            delay={0.3}
            members={[{ name: "4phy", discordId: "494169184175915019", description: "Executive" }]}
          />

          <TreeLine />

          <RoleCard
            title="MANAGER"
            desc="Manages internal operations, ensuring the clan runs according to the Executive's directives."
            delay={0.4}
            members={[]}
          />

        </div>

        {/* HORIZONTAL LINE FOR BRANCHES */}
        <div className="hidden lg:block relative w-full h-16">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-8 w-[1px] bg-white/10"></div>
          <div className="absolute top-8 left-[12.5%] right-[12.5%] h-[1px] bg-white/10"></div>
          <div className="absolute top-8 left-[12.5%] h-8 w-[1px] bg-white/10"></div>
          <div className="absolute top-8 left-[37.5%] h-8 w-[1px] bg-white/10"></div>
          <div className="absolute top-8 left-[62.5%] h-8 w-[1px] bg-white/10"></div>
          <div className="absolute top-8 left-[87.5%] h-8 w-[1px] bg-white/10"></div>
        </div>

        {/* HORIZONTAL LINE FOR BRANCHES (Mobile) */}
        <div className="lg:hidden w-[1px] h-16 bg-white/10 mx-auto mb-8"></div>

        {/* DIVISIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 relative">
          {divisions.map((div, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + (i * 0.1), duration: 0.6, ease: "easeOut" }}
              className="flex flex-col relative items-center text-center"
            >
              <div className="pt-6 pb-4 relative z-10 flex flex-col items-center min-h-[130px] md:min-h-[140px] lg:min-h-[160px]">
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest text-white mb-2">{div.title}</h3>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed max-w-sm">
                  {div.description}
                </p>
              </div>

              <div className="flex flex-col gap-6 w-full">

                <div className="flex flex-col items-center">
                  <p className="text-[10px] text-zinc-600 font-bold tracking-[0.2em] mb-4 uppercase">HEAD DIVISION</p>
                  {div.head.length > 0 ? (
                    <div className="flex flex-row justify-center gap-6 flex-wrap">
                      {div.head.map((member, idx) => <StaffProfile key={idx} {...member} />)}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center w-full group opacity-50">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-dashed border-white/30 flex items-center justify-center bg-white/[0.02] mb-4">
                        <User className="w-8 h-8 md:w-10 md:h-10 text-white/30" strokeWidth={1.5} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full h-px bg-white/10 my-1"></div>

                <div className="flex flex-col items-center">
                  <p className="text-[10px] text-zinc-600 font-bold tracking-[0.2em] mb-4 uppercase">STAFF DIVISION</p>
                  {div.staff.length > 0 ? (
                    <div className="flex flex-row justify-center gap-6 flex-wrap">
                      {div.staff.map((member, idx) => <StaffProfile key={idx} {...member} />)}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center w-full group opacity-50">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-dashed border-white/30 flex items-center justify-center bg-white/[0.02] mb-4">
                        <User className="w-8 h-8 md:w-10 md:h-10 text-white/30" strokeWidth={1.5} />
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

function RoleCard({ title, desc, delay, members }: { title: string, desc: string, delay: number, members: StaffMemberProps[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="relative z-10 flex flex-col items-center text-center py-6 px-2 md:p-8 w-full max-w-lg mx-auto"
    >
      <h2 className="text-lg md:text-2xl font-bold uppercase tracking-[0.2em] text-white mb-6 md:mb-10">{title}</h2>

      {members.length > 0 ? (
        <div className="flex flex-col w-full">
          {members.map((member, i) => (
            <StaffProfile key={i} {...member} showRoleDesc={desc} />
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-dashed border-white/20 flex items-center justify-center bg-white/[0.02] mb-2 md:mb-3">
            <User className="w-6 h-6 md:w-8 md:h-8 text-white/20" strokeWidth={1.5} />
          </div>
          <p className="text-xs md:text-sm text-zinc-500 max-w-[250px] leading-relaxed">{desc}</p>
        </div>
      )}
    </motion.div>
  );
}

function TreeLine() {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      whileInView={{ height: 56, opacity: 1 }}
      viewport={{ once: true }}
      className="w-[1px] h-14 bg-white/10"
    />
  );
}
