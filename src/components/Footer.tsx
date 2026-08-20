import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black p-8 mt-20">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <Link href="/" className="hover:opacity-80 transition-opacity flex items-center">
          <Image src="/img/4F.webp" alt="4Fun Logo" width={44} height={44} className="rounded-sm object-cover" />
        </Link>
        <div className="text-sm font-semibold text-gray-500">
          © {new Date().getFullYear()} 4Fun Clan.
        </div>
      </div>
    </footer>
  );
}
