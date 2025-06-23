import NoteDetailsClient from './NoteDetailsClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return <NoteDetailsClient id={id} />;
}
