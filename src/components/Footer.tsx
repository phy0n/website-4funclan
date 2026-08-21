import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black p-8 mt-20">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <Link href="/" className="hover:opacity-80 transition-opacity flex items-center">
          <Image src="/img/4F.webp" alt="4Fun Logo" width={44} height={44} className="rounded-sm object-cover" />
        </Link>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a href="https://discord.gg/SrcssWm3xA" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors font-bold text-sm uppercase tracking-wider">
            Discord
          </a>
          <a href="https://www.roblox.com/communities/144778500/4F-COMMUNITY" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors font-bold text-sm uppercase tracking-wider">
            Communities
          </a>
          <a href="https://www.tiktok.com/@4fun.clan" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors font-bold text-sm uppercase tracking-wider">
            TikTok
          </a>
        </div>
        <div className="text-sm font-semibold text-gray-500">
          © {new Date().getFullYear()} 4Fun Clan.
        </div>
      </div>
    </footer>
  );
}
