import HomeClient from '@/components/HomeClient';

// Force dynamic rendering to load template from S3 at runtime
// export const dynamic = 'force-dynamic'; // Commented for static export
// export const revalidate = 0; // Commented for static export

export default function Home() {

  return <HomeClient />;
}