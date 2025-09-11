import TeamMemberClient from '@/components/TeamMemberClient';
import { loadTemplate } from '@/services/templateLoader';

// Force dynamic rendering
// export const dynamic = 'force-dynamic'; // Commented for static export
// export const revalidate = 0; // Commented for static export

interface TeamMemberPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { slug } = await params;
  return <TeamMemberClient slug={slug} />;
}

export async function generateStaticParams() {
  const templateData = await loadTemplate();
  
  // Generate params for both languages
  const deMembers = templateData.de?.team?.members || [];
  const enMembers = templateData.en?.team?.members || [];
  
  // Combine members from both languages and get unique slugs
  const allMembers = [...deMembers, ...enMembers];
  const uniqueSlugs = new Set<string>();
  
  allMembers.forEach((member: any) => {
    const slug = member.slug || member.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    uniqueSlugs.add(slug);
  });
  
  return Array.from(uniqueSlugs).map(slug => ({
    slug: slug as string,
  }));
}