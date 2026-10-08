"use client";

import { motion } from "framer-motion";
import { Users, Crown, ShieldAlert, Video, Calendar, Star, Ribbon, UserCircle2 } from "lucide-react";
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

const StaffProfile = ({ name, discordId, description, showRoleDesc }: StaffMemberProps & { showRoleDesc?: string }) => {
  const { user, loading } = useDiscordUser(discordId);
  const displayName = user?.global_name || user?.username || name;
  const avatarUrl = user?.avatar_url || "/img/default-avatar.png";

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/10 overflow-hidden bg-white/5 mb-4">
        {!loading && avatarUrl !== "/img/default-avatar.png" ? (
          <Image src={avatarUrl} alt={displayName} fill className="object-cover" />
        ) : (
          <UserCircle2 className="w-full h-full text-white/10 p-4" />
        )}
      </div>
      <h4 className="text-lg md:text-xl font-bold text-white tracking-wide mb-1">{displayName}</h4>
      {description && <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">{description}</p>}
      {showRoleDesc && <p className="text-sm text-gray-400 max-w-[280px] leading-relaxed mt-2">{showRoleDesc}</p>}
    </div>
  );
};

interface Division {
  title: string;
  icon: React.ReactNode;
  tasks: string[];
  head: StaffMemberProps[];
  staff: StaffMemberProps[];
}

export default function StaffClient() {
  const divisions: Division[] = [
    {
      title: "Member Relations",
      icon: <Users className="w-6 h-6 text-white" />,
      tasks: [
        "Welcoming new members",
        "Helping members adapt",
        "Mingling with members",
        "Inviting members to play",
        "Listening to feedback",
        "Creating active interactions"
      ],
      head: [],
      staff: []
    },
    {
      title: "Moderation",
      icon: <ShieldAlert className="w-6 h-6 text-white" />,
      tasks: [
        "Managing member tickets",
        "Assisting members with issues",
        "Answering member questions",
        "Resolving conflicts",
        "Enforcing rules",
        "Reporting serious issues to Head"
      ],
      head: [],
      staff: [
        { name: "4moca", discordId: "1313494943456821320", description: "Moderator" }
      ]
    },
    {
      title: "Recording",
      icon: <Video className="w-6 h-6 text-white" />,
      tasks: [
        "Recording gameplay",
        "Editing videos/clips",
        "Creating short content",
        "Capturing clan activities",
        "Brainstorming content ideas",
        "Managing social media content"
      ],
      head: [],
      staff: []
    },
    {
      title: "Event Organizer",
      icon: <Calendar className="w-6 h-6 text-white" />,
      tasks: [
        "Assisting with event prep",
        "Managing participants",
        "Running events",
        "Creating mini-games",
        "Documenting events",
        "Proposing new activities"
      ],
      head: [],
      staff: []
    }
  ];

  return (
    <div className="relative w-full bg-[#0a0a0a] min-h-screen pb-32 pt-32 md:pt-40 text-white font-sans overflow-hidden">
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-zinc-500 font-medium tracking-[0.2em] text-xs uppercase mb-4">
            4Fun Clan / Organization Chart
          </p>
          <h1 className="text-white font-black text-5xl md:text-7xl tracking-tighter mb-6 leading-none uppercase">
            Staff <span className="text-white/50">Structure</span>
          </h1>
          <p className="text-zinc-400 font-medium text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
            The organizational structure and division of responsibilities to ensure the 4Fun clan continues to grow and stays organized.
          </p>
        </motion.div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-6">
        {/* TOP LEVEL ROLES */}
        <div className="flex flex-col items-center relative">
          
          <RoleCard 
            title="OWNER" 
            desc="The highest decision maker and founder of the clan."
            icon={<Crown className="w-5 h-5 text-white" />}
            delay={0.1}
            members={[{ name: "4Vo1d", discordId: "877885373152362528", description: "The Founder" }]}
          />

          <TreeLine />

          <RoleCard 
            title="CO-OWNER" 
            desc="Assists the Owner in making decisions and directing the clan."
            icon={<Star className="w-5 h-5 text-white" />}
            delay={0.2}
            members={[]}
          />

          <TreeLine />

          <RoleCard 
            title="EXECUTIVE" 
            desc="Manages all aspects of the clan under the approval of the Owner/Co-Owner."
            icon={<Ribbon className="w-5 h-5 text-white" />}
            delay={0.3}
            members={[{ name: "4phy", discordId: "494169184175915019", description: "Executive" }]}
          />

          <TreeLine />

          <RoleCard 
            title="MANAGER" 
            desc="Manages internal operations, ensuring the clan runs according to the Executive's directives."
            icon={<Users className="w-5 h-5 text-white" />}
            delay={0.4}
            members={[]}
          />

        </div>

        {/* HORIZONTAL LINE FOR BRANCHES (Desktop) */}
        <div className="hidden lg:block relative w-full h-16">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 h-8 w-[1px] bg-white/20"></div>
           <div className="absolute top-8 left-[12.5%] right-[12.5%] h-[1px] bg-white/20"></div>
           <div className="absolute top-8 left-[12.5%] h-8 w-[1px] bg-white/20"></div>
           <div className="absolute top-8 left-[37.5%] h-8 w-[1px] bg-white/20"></div>
           <div className="absolute top-8 left-[62.5%] h-8 w-[1px] bg-white/20"></div>
           <div className="absolute top-8 left-[87.5%] h-8 w-[1px] bg-white/20"></div>
        </div>

        {/* HORIZONTAL LINE FOR BRANCHES (Mobile) */}
        <div className="lg:hidden w-[1px] h-12 bg-white/20 mx-auto"></div>

        {/* DIVISIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative mt-0">
          {divisions.map((div, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + (i * 0.1), duration: 0.5 }}
              className="flex flex-col items-center p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md relative"
            >
              <div className="flex items-center justify-center gap-3 mb-8 w-full">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  {div.icon}
                </div>
                <h3 className="text-base md:text-lg font-bold uppercase tracking-widest text-white leading-tight">{div.title}</h3>
              </div>
              
              <div className="w-full flex flex-col gap-8 relative mb-8 flex-grow">
                <div className="text-center relative z-10 w-full flex flex-col items-center">
                  <p className="font-bold text-[10px] text-white/30 tracking-[0.2em] mb-4 uppercase">Head of Division</p>
                  {div.head.length > 0 ? (
                    <div className="flex justify-center gap-6 flex-wrap">
                      {div.head.map((member, idx) => <StaffProfile key={idx} {...member} />)}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center opacity-50">
                      <UserCircle2 className="w-12 h-12 text-white/10 mb-2" />
                      <p className="text-[10px] text-white/30 uppercase tracking-wider">Vacant</p>
                    </div>
                  )}
                </div>

                <div className="text-center relative z-10 w-full flex flex-col items-center pt-8 border-t border-white/5">
                  <p className="font-bold text-[10px] text-white/30 tracking-[0.2em] mb-4 uppercase">Staff Members</p>
                  {div.staff.length > 0 ? (
                    <div className="flex justify-center gap-6 flex-wrap">
                      {div.staff.map((member, idx) => <StaffProfile key={idx} {...member} />)}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center opacity-50">
                      <UserCircle2 className="w-12 h-12 text-white/10 mb-2" />
                      <p className="text-[10px] text-white/30 uppercase tracking-wider">Vacant</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full pt-6 border-t border-white/5 mt-auto">
                <p className="text-[10px] font-bold text-white/30 mb-3 uppercase tracking-[0.2em] text-center">Responsibilities</p>
                <p className="text-xs text-gray-400 leading-relaxed text-center">
                  {div.tasks.join(" • ")}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

function RoleCard({ title, desc, icon, delay, members }: { title: string, desc: string, icon: React.ReactNode, delay: number, members: StaffMemberProps[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="relative z-10 flex flex-col items-center text-center p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md w-full max-w-lg mx-auto"
    >
      <div className="flex items-center justify-center gap-3 mb-8 w-full border-b border-white/5 pb-6">
        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <h2 className="text-lg md:text-xl font-bold uppercase tracking-[0.15em] text-white m-0">{title}</h2>
      </div>
      
      {members.length > 0 ? (
        <div className="flex flex-col gap-6 w-full">
          {members.map((member, i) => (
            <StaffProfile key={i} {...member} showRoleDesc={desc} />
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col items-center opacity-50">
          <UserCircle2 className="w-16 h-16 text-white/10 mb-4" />
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2">Vacant</p>
          <p className="text-xs text-gray-500 max-w-[250px] leading-relaxed">{desc}</p>
        </div>
      )}
    </motion.div>
  );
}

function TreeLine() {
  return (
    <motion.div 
      initial={{ height: 0, opacity: 0 }}
      whileInView={{ height: 48, opacity: 1 }}
      viewport={{ once: true }}
      className="w-[1px] h-12 bg-white/20"
    />
  );
}
