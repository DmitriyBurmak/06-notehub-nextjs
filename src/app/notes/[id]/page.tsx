import NoteDetailsClient from './NoteDetailsClient';

interface PageProps {
  params: { id: string };
}

export default function NoteDetailsPage({ params }: PageProps) {
  return <NoteDetailsClient id={params.id} />;
}
