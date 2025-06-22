import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetailsClient';

interface NoteDetailsPageProps {
  params: {
    id: string;
  };
}

const NoteDetailsPage = async ({ params }: NoteDetailsPageProps) => {
  const { id } = params;
  const noteId = parseInt(id, 10);

  if (isNaN(noteId)) {
    return <div>Incorrect note ID.</div>;
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetailsPage;
