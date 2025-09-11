import ClientsClient from '@/components/ClientsClient';


// Force dynamic rendering to ensure fresh data from S3
// export const dynamic = 'force-dynamic'; // Commented for static export
// export const revalidate = 0; // Commented for static export

export default function Clients() {
  return <ClientsClient />;
}