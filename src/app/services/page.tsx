import ServicesClient from '@/components/ServicesClient';


// Force dynamic rendering to ensure fresh data from S3
// export const dynamic = 'force-dynamic'; // Commented for static export
// export const revalidate = 0; // Commented for static export

export default function Services() {
  return <ServicesClient />;
}