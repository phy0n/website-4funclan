import { notFound } from 'next/navigation';
import { getEnhancedMembers } from "@/lib/roblox";
import PortfolioClient from './PortfolioClient';

export const revalidate = 3600;

export default async function PortfolioPage({ params }: { params: Promise<{ name: string }> }) {
    const name = (await params).name;
    const members = await getEnhancedMembers();
    const decodedName = decodeURIComponent(name).toLowerCase();
    const member = members.find(m => m.name.toLowerCase() === decodedName);

    if (!member) {
        notFound();
    }

    return <PortfolioClient member={member} />;
}
