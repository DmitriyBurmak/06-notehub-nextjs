import NoteDetailsClient from './NoteDetailsClient';

interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = await params;

  return <NoteDetailsClient id={id} />;
}
