import NoteDetailsClient from './NoteDetailsClient';

interface PageParams {
  params: { id: string };
}

export default function NoteDetailsPage({ params }: PageParams) {
  return <NoteDetailsClient id={params.id} />;
}
