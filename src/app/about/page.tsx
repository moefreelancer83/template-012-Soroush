import AboutClient from '@/components/AboutClient';

// Force dynamic rendering to ensure fresh data from S3
// export const dynamic = 'force-dynamic'; // Commented for static export
// export const revalidate = 0; // Commented for static export

export default function About() {
  return <AboutClient />;
}