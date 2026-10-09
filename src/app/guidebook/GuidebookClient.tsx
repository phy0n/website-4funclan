"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";

const SECTIONS = [
  { id: "introduction", title: "Introduction" },
  { id: "about", title: "About 4FUN" },
  { id: "organization", title: "Organization Structure" },
  { id: "staff", title: "Staff & Division System" },
  { id: "membership", title: "Membership System" },
  { id: "progression", title: "Progression & Privileges" },
  { id: "darkside", title: "DARKSIDE" },
  { id: "goodside", title: "GOODSIDE" },
  { id: "guests", title: "Guest System" },
  { id: "recruitment", title: "Recruitment System" },
  { id: "rules", title: "Rules & Standards" },
  { id: "support", title: "Support Center" },
  { id: "faq", title: "FAQ" },
];

export default function GuidebookClient() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -60% 0px", // Adjust for header offset
        threshold: 0.1,
      }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative w-full bg-[#0a0a0a] min-h-screen pb-20 pt-28 md:pt-40 text-white">
      {/* Header Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 md:mb-20">
        <div className="flex items-center gap-3 mb-3">
          <p className="text-zinc-500 font-bold tracking-widest text-xs uppercase">
            4Fun Clan / Guidebook
          </p>
        </div>
        <h1 className="text-white font-black text-5xl md:text-7xl tracking-tighter mb-6 leading-none uppercase">
          Guidebook<span className="text-primary">.</span>
        </h1>
        <p className="text-zinc-400 font-medium text-sm md:text-xl leading-relaxed max-w-3xl border-l-2 border-primary pl-4">
          The official reference for understanding the clan, its organizational structure, membership systems, privileges, divisions, and clan standards.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
        {/* Mobile Nav Toggle */}
        <div className="md:hidden w-full bg-[#111] border border-white/10 p-4 sticky top-28 z-40 rounded-sm mb-4 shadow-lg shadow-black/50">
          <button 
            className="flex items-center justify-between w-full font-bold uppercase tracking-widest text-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span>Navigate Guidebook</span>
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          {isMobileMenuOpen && (
            <div className="mt-4 flex flex-col gap-2 max-h-60 overflow-y-auto scrollbar-hide border-t border-white/10 pt-4">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-left text-sm font-semibold uppercase tracking-wider p-2 transition-colors ${
                    activeSection === section.id ? "text-primary bg-white/5" : "text-zinc-500 hover:text-white"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 shrink-0 sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-hide border-r border-white/10 pr-6 pb-12">
          <span className="text-xs font-black tracking-[0.2em] text-zinc-600 uppercase mb-6">Contents</span>
          <nav className="flex flex-col gap-3">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-left text-xs font-bold uppercase tracking-widest transition-all duration-300 border-l-2 pl-4 py-1.5 ${
                  activeSection === section.id 
                    ? "border-primary text-white" 
                    : "border-transparent text-zinc-500 hover:text-white hover:border-white/30"
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 max-w-4xl pb-24">
          
          <section id="introduction" className="mb-20 scroll-mt-32">
            <h2 className="font-black text-3xl md:text-5xl text-white uppercase tracking-tighter mb-6">4FUN Official Guidebook</h2>
            <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed mb-4">
              Welcome to 4FUN, a dedicated gaming clan focused primarily on Evade on Roblox. This guidebook is the central documentation hub designed to ensure clarity and consistency across our ranks.
            </p>
            <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed">
              Here, you will find everything you need to understand your rights, responsibilities, available privileges, and the established systems that keep 4FUN organized, active, and united.
            </p>
          </section>

          <section id="about" className="mb-20 scroll-mt-32">
            <h2 className="font-black text-3xl md:text-5xl text-white uppercase tracking-tighter mb-6">About 4FUN</h2>
            <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed mb-4">
              4FUN is an Evade-focused clan where players come together to improve their gameplay, compete, cooperate, and build lasting friendships through shared experiences in Roblox. Rather than being a generic multi-game community, we dedicate our efforts to mastering Evade while fostering a strong, connected identity.
            </p>
            <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed mb-4">
              We accommodate different playstyles through two distinct sides of the clan: <strong className="text-white">DARKSIDE</strong> and <strong className="text-white">GOODSIDE</strong>. DARKSIDE focuses on competitive Evade gameplay, structured practice sessions, recording, and high-level teamwork. GOODSIDE serves as the casual side for members who want to enjoy Evade, socialize, and play together without mandatory competitive expectations. Both sides are essential parts of 4FUN, and neither is inherently superior to the other.
            </p>
            <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed">
              To support our members, 4FUN operates with a defined organizational structure, clear membership progression, and dedicated staff divisions. These systems exist to maintain our clan standards, recognize member commitment, and keep the environment structured without being unnecessarily restrictive. Every rule and role is designed to serve a purpose for the clan.
            </p>
          </section>

          <section id="organization" className="mb-20 scroll-mt-32">
            <h2 className="font-black text-3xl md:text-5xl text-white uppercase tracking-tighter mb-8">Organization Structure</h2>
            <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed mb-8">
              The official hierarchy of 4FUN is structured to maintain order and provide clear leadership. Each position has a distinct scope of authority. Holding a title does not automatically grant unrestricted permissions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#111] border border-white/5 p-6 hover:border-primary/50 transition-colors">
                <h3 className="font-black text-xl text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                  <ChevronRight size={18} className="text-primary" /> Owner
                </h3>
                <p className="text-zinc-400 text-sm md:text-base">Responsible for the overall direction, identity, major decisions, and long-term development of the clan.</p>
              </div>
              <div className="bg-[#111] border border-white/5 p-6 hover:border-primary/50 transition-colors">
                <h3 className="font-black text-xl text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                  <ChevronRight size={18} className="text-primary" /> Co-Owner
                </h3>
                <p className="text-zinc-400 text-sm md:text-base">Assists the Owner, supports senior leadership, and helps oversee organizational operations.</p>
              </div>
              <div className="bg-[#111] border border-white/5 p-6 hover:border-primary/50 transition-colors">
                <h3 className="font-black text-xl text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                  <ChevronRight size={18} className="text-primary" /> Executive
                </h3>
                <p className="text-zinc-400 text-sm md:text-base">Supervises broader operational areas and coordinates organizational development.</p>
              </div>
              <div className="bg-[#111] border border-white/5 p-6 hover:border-primary/50 transition-colors">
                <h3 className="font-black text-xl text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                  <ChevronRight size={18} className="text-primary" /> Manager
                </h3>
                <p className="text-zinc-400 text-sm md:text-base">Oversees assigned operational teams, coordinates their work, and reviews reports.</p>
              </div>
              <div className="bg-[#111] border border-white/5 p-6 hover:border-primary/50 transition-colors">
                <h3 className="font-black text-xl text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                  <ChevronRight size={18} className="text-primary" /> Head Division
                </h3>
                <p className="text-zinc-400 text-sm md:text-base">Manages their respective departments, organizes tasks, supervises staff, and reports to higher management.</p>
              </div>
              <div className="bg-[#111] border border-white/5 p-6 hover:border-primary/50 transition-colors">
                <h3 className="font-black text-xl text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                  <ChevronRight size={18} className="text-primary" /> Staff Division</h3>
                <p className="text-zinc-400 text-sm md:text-base">Carries out assigned operational responsibilities within their respective departments.</p>
              </div>
            </div>
          </section>

          <section id="staff" className="mb-20 scroll-mt-32">
            <h2 className="font-black text-3xl md:text-5xl text-white uppercase tracking-tighter mb-6">Staff & Division System</h2>
            <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed mb-8">
              Staff positions represent responsibilities rather than status symbols. All staff members are expected to be fair, reliable, respectful, accountable, and professional. They must follow applicable rules, respect the limits of their permissions, protect confidential information, communicate with their supervisors, and avoid abusing their authority.
            </p>

            <div className="space-y-6">
              <div className="border-l-2 border-white/20 pl-6">
                <h3 className="font-black text-2xl text-white uppercase tracking-tighter mb-2">Member Relations</h3>
                <p className="text-zinc-400 text-base md:text-lg">
                  Responsible for engaging with clan members, organizing internal activities, assisting with onboarding, and fostering a positive and welcoming clan environment.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-6">
                <h3 className="font-black text-2xl text-white uppercase tracking-tighter mb-2">Moderation Division</h3>
                <p className="text-zinc-400 text-base md:text-lg">
                  Responsible for maintaining clan order, handling reports, and enforcing rules within its assigned permissions. Ordinary Moderators have restricted authority, including the ability to mute members. Ban and Kick authority is strictly reserved for the Head Division or other explicitly authorized leadership.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-6">
                <h3 className="font-black text-2xl text-white uppercase tracking-tighter mb-2">Recording Division</h3>
                <p className="text-zinc-400 text-base md:text-lg">
                  Responsible for recording relevant gameplay and supporting competitive activities and content production.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-6">
                <h3 className="font-black text-2xl text-white uppercase tracking-tighter mb-2">Partnership Management Division</h3>
                <p className="text-zinc-400 text-base md:text-lg">
                  Responsible for communicating with external clans and groups, reviewing partnership inquiries, and coordinating authorized collaborations.
                </p>
              </div>
            </div>
          </section>

          <section id="membership" className="mb-20 scroll-mt-32">
            <h2 className="font-black text-3xl md:text-5xl text-white uppercase tracking-tighter mb-6">Membership System</h2>
            <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed mb-6">
              The 4FUN clan categorizes individuals based on their involvement and recruitment status.
            </p>
            <ul className="flex flex-col gap-6">
              <li className="bg-[#111] p-6 border border-white/10">
                <h3 className="font-black text-xl text-white uppercase tracking-wider mb-2 text-primary">Official Members</h3>
                <p className="text-zinc-400 text-sm md:text-base">
                  Individuals accepted into the clan through the designated recruitment or membership process. They are expected to follow the clan rules, respect other members, maintain appropriate conduct, and participate according to the requirements of their membership category.
                </p>
              </li>
              <li className="bg-[#111] p-6 border border-white/10">
                <h3 className="font-black text-xl text-white uppercase tracking-wider mb-2">Guests</h3>
                <p className="text-zinc-400 text-sm md:text-base mb-2">
                  Individuals who want to hang out, socialize, and play with 4FUN members without being recognized as Official Members.
                </p>
                <div className="inline-block bg-white/10 px-3 py-1 text-xs font-bold tracking-widest uppercase text-white mt-2">
                  GUEST is not an Official Member of 4FUN
                </div>
                <p className="text-zinc-400 text-sm md:text-base mt-3">
                  Guest access does not automatically grant official membership, membership progression privileges, staff permissions, or unrestricted access to internal channels.
                </p>
              </li>
              <li className="bg-[#111] p-6 border border-white/10">
                <h3 className="font-black text-xl text-white uppercase tracking-wider mb-2">Open Members</h3>
                <p className="text-zinc-400 text-sm md:text-base">
                  Participants in the designated open-member process. They are not automatically accepted as Official Members. The main clan server and the separate Open Member server serve different purposes, and users must follow the designated ticket and application procedures to join officially.
                </p>
              </li>
            </ul>
          </section>

          <section id="progression" className="mb-20 scroll-mt-32">
            <h2 className="font-black text-3xl md:text-5xl text-white uppercase tracking-tighter mb-6">Member Progression & Privileges</h2>
            <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed mb-8">
              Membership progression distinguishes between membership recognition and administrative authority. These are membership progression roles, not staff positions, and the order of progression does not automatically grant administrative authority.
            </p>

            <h3 className="font-black text-2xl text-white uppercase tracking-tighter mb-4">Progression Order</h3>
            
            <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-0 mb-10 w-full relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 z-0"></div>
              
              <div className="flex-1 relative z-10 flex flex-col md:items-center text-left md:text-center p-4 md:p-6 bg-[#111] border border-white/10 mx-0 md:mx-2 group">
                <div className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center font-black mb-3 hidden md:flex border border-white/20">1</div>
                <h4 className="font-black text-lg text-white uppercase tracking-wide mb-2">Official Member</h4>
                <p className="text-zinc-400 text-sm">The standard status granted after successfully joining through the official recruitment process. Expected to follow rules and the monthly attendance system.</p>
              </div>

              <div className="flex md:hidden justify-center text-white/30">↓</div>

              <div className="flex-1 relative z-10 flex flex-col md:items-center text-left md:text-center p-4 md:p-6 bg-[#111] border border-primary/30 mx-0 md:mx-2 shadow-[0_0_15px_rgba(229,9,20,0.1)] group">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-black mb-3 hidden md:flex border border-primary/50">2</div>
                <h4 className="font-black text-lg text-primary uppercase tracking-wide mb-2">Active Member</h4>
                <p className="text-zinc-400 text-sm">The next progression level representing a recognized member who has advanced beyond standard status and earned specific privileges.</p>
              </div>

              <div className="flex md:hidden justify-center text-white/30">↓</div>

              <div className="flex-1 relative z-10 flex flex-col md:items-center text-left md:text-center p-4 md:p-6 bg-[#111] border border-yellow-500/30 mx-0 md:mx-2 shadow-[0_0_15px_rgba(234,179,8,0.1)] group">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center font-black mb-3 hidden md:flex border border-yellow-500/50">3</div>
                <h4 className="font-black text-lg text-yellow-500 uppercase tracking-wide mb-2">Veteran</h4>
                <p className="text-zinc-400 text-sm">The higher progression level, recognizing long-term commitment and established Veteran standing within the clan.</p>
              </div>
            </div>

            <h3 className="font-black text-2xl text-white uppercase tracking-tighter mb-4">Monthly Attendance & Exemptions</h3>
            <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed mb-6">
              Ordinary Official Members who have not reached an exempt progression role must follow the monthly attendance procedure announced by 4FUN. Failure to submit attendance may result in removal under the clan's established attendance policy. 
            </p>
            <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed mb-6">
              <strong>Active Members</strong> and <strong>Veterans</strong> share a specific privilege: they are exempt from the ordinary monthly attendance-based kick requirement. They must not be kicked simply because they failed to submit their monthly attendance check-in. This exemption recognizes their membership standing and provides greater flexibility.
            </p>
            <div className="border-l-4 border-primary bg-primary/5 p-6 mb-6">
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                <strong>Important:</strong> The exemption does not mean immunity from all clan rules, does not grant automatic staff permissions, and does not prevent consequences for unrelated serious violations. Staff members responsible for attendance management must verify the member's current progression role before applying an attendance-based removal.
              </p>
            </div>

            <h3 id="invitation-privilege" className="font-black text-2xl text-white uppercase tracking-tighter mb-4 scroll-mt-32">Recruitment-Closed Invitation Privilege</h3>
            <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed mb-4">
              When the general recruitment period is closed, ordinary recruitment applications may no longer be open. However, eligible members who possess this specific privilege may still invite friends or potential members to join through the clan's designated invitation procedure.
            </p>
            <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed mb-4">
              This is a special privilege rather than an unrestricted reopening of public recruitment. People invited through this privilege must still follow any applicable joining, verification, ticket, or onboarding procedures required by 4FUN. An invitation does not automatically guarantee Official Member status, bypass clan requirements, or grant the invitee immediate membership privileges. The purpose is to let trusted or eligible members introduce potential recruits to the clan outside the normal public recruitment period while maintaining control over membership quality and capacity.
            </p>
            <div className="bg-white/5 border border-white/10 p-4 inline-block w-full text-sm">
              <span className="text-yellow-500 font-bold uppercase tracking-wider block mb-1">Status Note</span>
              <span className="text-zinc-300">
                Eligibility for this privilege requires confirmation from official documentation. Currently pending clarification on whether this specific privilege applies to Active Members, Veterans, or both.
              </span>
            </div>
          </section>

          <section id="darkside" className="mb-20 scroll-mt-32">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-black text-3xl md:text-5xl text-white uppercase tracking-tighter m-0 leading-none">DARKSIDE</h2>
              <span className="text-[10px] font-bold tracking-[0.2em] text-white bg-primary px-3 py-1 uppercase rounded-sm">Competitive</span>
            </div>
            <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed mb-4">
              DARKSIDE represents the competitive-oriented side of 4FUN, particularly focused on Evade gameplay, organized practice, recording, and coordination. 
            </p>
            <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed mb-4">
              Members are expected to fulfill approximately <strong>one to two recording sessions per week</strong> and <strong>two to three practice sessions per week</strong>. Members must coordinate with their teammates, make reasonable efforts to participate, and communicate when they cannot attend.
            </p>
            <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed">
              A degree of trash talk is permitted within the appropriate competitive practice environment, provided it remains within the boundaries of the clan's rules. This allowance does not authorize harassment, discriminatory remarks, threats, or unrestricted hostility outside the designated context.
            </p>
          </section>

          <section id="goodside" className="mb-20 scroll-mt-32">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-black text-3xl md:text-5xl text-white uppercase tracking-tighter m-0 leading-none">GOODSIDE</h2>
              <span className="text-[10px] font-bold tracking-[0.2em] text-black bg-white px-3 py-1 uppercase rounded-sm">Casual</span>
            </div>
            <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed mb-4">
              GOODSIDE represents the casual-oriented side and serves as the main side for Official Members who prefer relaxed gaming and social interaction. It focuses on playing casually, socializing, making friends, and enjoying the clan without the mandatory recording and practice expectations established for DARKSIDE.
            </p>
            <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed">
              GOODSIDE members must still follow the main clan rules, respect other people, and avoid unnecessary drama. GOODSIDE and DARKSIDE serve different purposes within the same clan; neither side is inherently superior to the other.
            </p>
          </section>

          <section id="guests" className="mb-20 scroll-mt-32">
            <h2 className="font-black text-3xl md:text-5xl text-white uppercase tracking-tighter mb-6">Guest System</h2>
            <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed">
              The GUEST role is for those who are close to the clan but are not recognized as Official Members. Guest status grants access to socialize and play alongside the clan but does not automatically grant official membership or member-only privileges. Individuals who wish to become Official Members must follow the designated recruitment procedure rather than relying on Guest access.
            </p>
          </section>

          <section id="recruitment" className="mb-20 scroll-mt-32">
            <h2 className="font-black text-3xl md:text-5xl text-white uppercase tracking-tighter mb-6">Open Member & Recruitment</h2>
            <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed mb-4">
              4FUN maintains a separate Open Member server and a main clan server. Users who want to join must follow the relevant ticket and application procedure, provide accurate information, and wait for the recruitment decision. 
            </p>
            <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed mb-4">
              Applications may be accepted or denied according to current requirements and available membership capacity. If denied, applicants may wait for a future recruitment period where permitted by the applicable policy.
            </p>
            <div className="bg-white/5 border border-white/10 p-4 md:p-6 inline-block w-full">
              <h4 className="text-white font-bold tracking-widest text-sm uppercase mb-2">Display Name Convention</h4>
              <p className="text-zinc-400 text-sm md:text-base">
                Accepted applicants must place the number <strong>4</strong> at the beginning of their display name when instructed to do so (for example, <strong>4Example</strong>).
              </p>
            </div>
          </section>

          <section id="rules" className="mb-20 scroll-mt-32">
            <h2 className="font-black text-3xl md:text-5xl text-white uppercase tracking-tighter mb-6">Rules & Clan Standards</h2>
            <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed mb-6">
              Members are expected to uphold the clan's principles at all times:
            </p>
            <ul className="flex flex-col gap-3 mb-6">
              <li className="flex items-start gap-3">
                <ChevronRight size={20} className="text-primary mt-1 shrink-0" />
                <span className="text-zinc-300 text-base md:text-lg">Respect others and maintain appropriate conduct.</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight size={20} className="text-primary mt-1 shrink-0" />
                <span className="text-zinc-300 text-base md:text-lg">No racism or discrimination of any kind.</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight size={20} className="text-primary mt-1 shrink-0" />
                <span className="text-zinc-300 text-base md:text-lg">Restrictions on NSFW content.</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight size={20} className="text-primary mt-1 shrink-0" />
                <span className="text-zinc-300 text-base md:text-lg">Respect personal boundaries and avoid unnecessary drama.</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight size={20} className="text-primary mt-1 shrink-0" />
                <span className="text-zinc-300 text-base md:text-lg">Respect staff responsibilities and use the clan platforms appropriately.</span>
              </li>
            </ul>
            <p className="text-zinc-500 text-sm italic border-t border-white/10 pt-4">
              Note: The complete and current rules published through 4FUN's official rules channel or verified rules documentation remain the authoritative source for detailed violations and enforcement procedures.
            </p>
          </section>

          <section id="support" className="mb-20 scroll-mt-32">
            <h2 className="font-black text-3xl md:text-5xl text-white uppercase tracking-tighter mb-6">Support Center</h2>
            <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed mb-4">
              Members should contact staff or open a ticket for matters including asking questions, requesting clarification about clan systems, reporting rule violations, raising complaints, providing feedback, requesting membership assistance, or discussing a private clan matter. A support voice channel may also be used when available and appropriate.
            </p>
            <p className="text-zinc-400 font-medium text-base md:text-lg leading-relaxed">
              Clearly distinguish the general Support Center from Open Member application tickets: the general Support Center is for assistance, questions, reports, and other clan-related issues, whereas Open Member tickets are strictly for the designated open-member or recruitment process. Please provide relevant details and communicate respectfully.
            </p>
          </section>

          <section id="faq" className="mb-24 scroll-mt-32">
            <h2 className="font-black text-3xl md:text-5xl text-white uppercase tracking-tighter mb-8">Frequently Asked Questions</h2>
            
            <div className="flex flex-col gap-6">
              <div className="bg-[#111] p-6 border-l-4 border-white/20">
                <h3 className="font-black text-lg text-white mb-2">What is the membership progression order in 4FUN?</h3>
                <p className="text-zinc-400 text-base">The official progression is <strong>Official Member → Active Member → Veteran</strong>.</p>
              </div>
              <div className="bg-[#111] p-6 border-l-4 border-white/20">
                <h3 className="font-black text-lg text-white mb-2">What is the difference between an Official Member, an Active Member, and a Veteran?</h3>
                <p className="text-zinc-400 text-base">An Official Member is the standard status given upon joining. Active Member is the next step recognizing advancement and specific privileges. Veteran is the highest progression recognizing long-term commitment. Higher roles receive certain exemptions, but none automatically grant staff authority.</p>
              </div>
              <div className="bg-[#111] p-6 border-l-4 border-primary">
                <h3 className="font-black text-lg text-white mb-2">Do Active Members need to submit monthly attendance?</h3>
                <p className="text-zinc-400 text-base">No. Active Members are exempt from the ordinary monthly attendance-based kick requirement.</p>
              </div>
              <div className="bg-[#111] p-6 border-l-4 border-yellow-500">
                <h3 className="font-black text-lg text-white mb-2">Do Veterans need to submit monthly attendance?</h3>
                <p className="text-zinc-400 text-base">No. Veterans are also exempt from the ordinary monthly attendance-based kick requirement.</p>
              </div>
              <div className="bg-[#111] p-6 border-l-4 border-white/20">
                <h3 className="font-black text-lg text-white mb-2">What happens if an ordinary Official Member fails to submit attendance?</h3>
                <p className="text-zinc-400 text-base">They may face removal under the clan's established attendance policy, as they do not possess the attendance exemption privilege.</p>
              </div>
              <div className="bg-[#111] p-6 border-l-4 border-white/20">
                <h3 className="font-black text-lg text-white mb-2">Can eligible members invite people when public recruitment is closed?</h3>
                <p className="text-zinc-400 text-base">Yes, members holding the designated Recruitment-Closed Invitation Privilege may invite people outside of open recruitment periods through the official invitation procedure.</p>
              </div>
              <div className="bg-[#111] p-6 border-l-4 border-white/20">
                <h3 className="font-black text-lg text-white mb-2">Which progression role is allowed to use the recruitment-closed invitation privilege?</h3>
                <p className="text-zinc-400 text-base"><em>[Eligibility requires confirmation from official documentation. Currently pending clarification.]</em></p>
              </div>
              <div className="bg-[#111] p-6 border-l-4 border-white/20">
                <h3 className="font-black text-lg text-white mb-2">Does inviting someone automatically make that person an Official Member?</h3>
                <p className="text-zinc-400 text-base">No. Invitees must still follow joining, verification, or onboarding procedures and are not guaranteed automatic Official Member status.</p>
              </div>
              <div className="bg-[#111] p-6 border-l-4 border-white/20">
                <h3 className="font-black text-lg text-white mb-2">Does the invitation privilege mean public recruitment is open again?</h3>
                <p className="text-zinc-400 text-base">No. It is a special privilege for eligible members to introduce potential recruits, separate from general public recruitment.</p>
              </div>
              
              <div className="bg-[#111] p-6 border-l-4 border-white/20">
                <h3 className="font-black text-lg text-white mb-2">Are Guests Official Members?</h3>
                <p className="text-zinc-400 text-base">No. GUEST is not an Official Member of 4FUN. They are individuals socializing and playing with the clan.</p>
              </div>
              <div className="bg-[#111] p-6 border-l-4 border-white/20">
                <h3 className="font-black text-lg text-white mb-2">Does attendance exemption mean immunity from all rules?</h3>
                <p className="text-zinc-400 text-base">No. It does not grant immunity from rules, grant staff permissions, or prevent consequences for serious violations.</p>
              </div>
              <div className="bg-[#111] p-6 border-l-4 border-white/20">
                <h3 className="font-black text-lg text-white mb-2">Must GOODSIDE members follow DARKSIDE's recording and practice requirements?</h3>
                <p className="text-zinc-400 text-base">No. GOODSIDE is for relaxed gaming and social interaction, without DARKSIDE's mandatory requirements.</p>
              </div>
              <div className="bg-[#111] p-6 border-l-4 border-white/20">
                <h3 className="font-black text-lg text-white mb-2">What are the usual DARKSIDE practice and recording expectations?</h3>
                <p className="text-zinc-400 text-base">Approximately one to two recording sessions per week and two to three practice sessions per week.</p>
              </div>
              <div className="bg-[#111] p-6 border-l-4 border-white/20">
                <h3 className="font-black text-lg text-white mb-2">Is trash talk unrestricted?</h3>
                <p className="text-zinc-400 text-base">No. It is permitted within competitive practice environments but must not cross into harassment, discrimination, or unrestricted hostility.</p>
              </div>
              <div className="bg-[#111] p-6 border-l-4 border-white/20">
                <h3 className="font-black text-lg text-white mb-2">Can every Moderator ban or kick members?</h3>
                <p className="text-zinc-400 text-base">No. Ordinary Moderators have restricted authority (such as muting). Ban and Kick authority is reserved for the Head Division and higher leadership.</p>
              </div>
              <div className="bg-[#111] p-6 border-l-4 border-white/20">
                <h3 className="font-black text-lg text-white mb-2">How do I become an Official Member?</h3>
                <p className="text-zinc-400 text-base">Follow the designated ticket and application procedure in the separate Open Member server.</p>
              </div>
              <div className="bg-[#111] p-6 border-l-4 border-white/20">
                <h3 className="font-black text-lg text-white mb-2">How do I contact support?</h3>
                <p className="text-zinc-400 text-base">Open a ticket in the Support Center or use the designated support voice channel.</p>
              </div>
              <div className="bg-[#111] p-6 border-l-4 border-white/20">
                <h3 className="font-black text-lg text-white mb-2">Does Veteran status automatically grant staff authority?</h3>
                <p className="text-zinc-400 text-base">No. It is a membership progression role recognizing commitment, not an administrative staff position.</p>
              </div>
            </div>
          </section>

          {/* Closing Statement */}
          <div className="border-t border-white/10 pt-16 text-center">
            <h3 className="text-white font-black text-lg md:text-3xl leading-relaxed md:leading-normal uppercase tracking-widest mb-4">
              We grow through teamwork.<br/>We remain strong through respect.<br/>We move forward as one clan.
            </h3>
            <span className="text-primary font-black text-sm md:text-xl tracking-[0.2em] uppercase">#stayWith4Fun</span>
          </div>
        </div>
      </div>
    </div>
  );
}
