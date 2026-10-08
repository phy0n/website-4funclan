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

const StaffProfile = ({ name, discordId, description }: StaffMemberProps) => {
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!discordId) {
      setLoading(false);
      return;
    }
    
    const apiUrl = process.env.NEXT_PUBLIC_BOT_API_URL || "http://localhost:8080";
    // Fetch from Rust Bot API
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

  const displayName = user?.global_name || user?.username || name;
  const avatarUrl = user?.avatar_url || "/img/default-avatar.png";

  return (
    <div className="flex flex-col items-center mt-6 gap-3 group">
      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/10 overflow-hidden bg-white/5 transition-transform duration-300 group-hover:scale-105 group-hover:border-white/30">
        {!loading && avatarUrl !== "/img/default-avatar.png" ? (
          <Image src={avatarUrl} alt={displayName} fill className="object-cover" />
        ) : (
          <UserCircle2 className="w-full h-full text-white/20 p-2" />
        )}
      </div>
      <div className="text-center">
        <h4 className="text-sm md:text-base font-bold text-white tracking-wide">{displayName}</h4>
        {description && <p className="text-xs text-gray-400 mt-1 max-w-[150px] mx-auto">{description}</p>}
      </div>
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
      title: "Member Relation",
      icon: <Users className="w-6 h-6 mb-3 text-white" />,
      tasks: [
        "Menyambut member baru",
        "Membantu member beradaptasi",
        "Berbaur dengan member",
        "Mengajak member bermain bersama",
        "Mendengarkan feedback",
        "Menciptakan interaksi aktif antar-member"
      ],
      head: [],
      staff: []
    },
    {
      title: "Moderation",
      icon: <ShieldAlert className="w-6 h-6 mb-3 text-white" />,
      tasks: [
        "Mengelola member ticket",
        "Membantu member bermasalah",
        "Menjawab pertanyaan member",
        "Membantu menangani konflik",
        "Memastikan rules dijalankan",
        "Melaporkan masalah serius ke Head"
      ],
      head: [],
      staff: [
        { name: "4moca", discordId: "1313494943456821320", description: "Moderator" }
      ]
    },
    {
      title: "Recording",
      icon: <Video className="w-6 h-6 mb-3 text-white" />,
      tasks: [
        "Record gameplay",
        "Edit video/clip",
        "Membuat short content",
        "Mengambil footage clan",
        "Mencari ide konten",
        "Mengelola konten media sosial"
      ],
      head: [],
      staff: []
    },
    {
      title: "Event Organizer",
      icon: <Calendar className="w-6 h-6 mb-3 text-white" />,
      tasks: [
        "Membantu persiapan event",
        "Mengatur peserta",
        "Menjalankan event",
        "Membuat mini-games",
        "Dokumentasi event",
        "Ide kegiatan baru"
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
            4Fun Clan / Struktur Organisasi
          </p>
          <h1 className="text-white font-black text-5xl md:text-7xl tracking-tighter mb-6 leading-none uppercase">
            Staff <span className="text-white/50">Structure</span>
          </h1>
          <p className="text-zinc-400 font-medium text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
            Struktur organisasi dan pembagian tugas untuk menjaga agar clan 4Fun terus berkembang dan tetap terorganisir.
          </p>
        </motion.div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-6">
        {/* TOP LEVEL ROLES */}
        <div className="flex flex-col items-center relative">
          
          <RoleCard 
            title="OWNER" 
            desc="Pemilik dan pengambil keputusan tertinggi di clan."
            icon={<Crown className="w-6 h-6 text-white mb-2" />}
            delay={0.1}
            members={[{ name: "4Vo1d", discordId: "877885373152362528", description: "The Founder" }]}
          />

          <TreeLine />

          <RoleCard 
            title="CO-OWNER" 
            desc="Membantu Owner dalam mengambil keputusan dan mengatur arah clan."
            icon={<Star className="w-6 h-6 text-white mb-2" />}
            delay={0.2}
            members={[]}
          />

          <TreeLine />

          <RoleCard 
            title="EXECUTIVE" 
            desc="Mengatur semua hal yang ada di clan di bawah persetujuan Owner / Co-Owner."
            icon={<Ribbon className="w-6 h-6 text-white mb-2" />}
            delay={0.3}
            members={[{ name: "4phy", discordId: "494169184175915019", description: "Executive" }]}
          />

          <TreeLine />

          <RoleCard 
            title="MANAGER" 
            desc="Mengatur internal clan, memastikan clan berjalan sesuai arahan Executive."
            icon={<Users className="w-6 h-6 text-white mb-2" />}
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
              className="flex flex-col items-center p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md relative hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex flex-col items-center text-center mb-6 w-full border-b border-white/5 pb-6">
                {div.icon}
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest text-white">{div.title}</h3>
              </div>
              
              <div className="w-full flex flex-col gap-3 relative mb-8">
                <div className="text-center relative z-10">
                  <p className="font-bold text-xs text-white/50 tracking-[0.2em]">HEAD DIVISION</p>
                  {div.head.length > 0 ? (
                    <div className="flex justify-center gap-4 flex-wrap">
                      {div.head.map((member, idx) => <StaffProfile key={idx} {...member} />)}
                    </div>
                  ) : (
                    <p className="text-xs text-white/20 mt-4 italic">Vacant</p>
                  )}
                </div>
                
                <div className="w-[1px] h-8 bg-white/10 mx-auto mt-2"></div>

                <div className="text-center relative z-10 mt-2">
                  <p className="font-bold text-xs text-white/50 tracking-[0.2em]">STAFF DIVISION</p>
                  {div.staff.length > 0 ? (
                    <div className="flex justify-center gap-4 flex-wrap">
                      {div.staff.map((member, idx) => <StaffProfile key={idx} {...member} />)}
                    </div>
                  ) : (
                    <p className="text-xs text-white/20 mt-4 italic">Vacant</p>
                  )}
                </div>
              </div>

              <div className="w-full mt-auto pt-6 border-t border-white/5">
                <p className="text-[10px] font-bold text-white/40 mb-4 uppercase tracking-widest text-center">Responsibilities</p>
                <ul className="text-sm text-gray-400 space-y-3">
                  {div.tasks.map((task, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1 h-1 rounded-full bg-white/30 mt-2 shrink-0"></span>
                      <span className="leading-relaxed text-xs">{task}</span>
                    </li>
                  ))}
                </ul>
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
      className="relative z-10 flex flex-col items-center text-center p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md w-full max-w-lg mx-auto hover:bg-white/[0.04] transition-colors"
    >
      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h2 className="text-xl md:text-2xl font-bold uppercase tracking-[0.15em] mb-3 text-white">{title}</h2>
      <p className="text-xs md:text-sm font-medium text-gray-400 leading-relaxed mb-6">{desc}</p>
      
      {members.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6 mt-2 pt-6 border-t border-white/5 w-full">
          {members.map((member, i) => (
            <StaffProfile key={i} {...member} />
          ))}
        </div>
      ) : (
        <div className="mt-2 pt-6 border-t border-white/5 w-full">
          <p className="text-xs text-white/20 italic">Vacant</p>
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
