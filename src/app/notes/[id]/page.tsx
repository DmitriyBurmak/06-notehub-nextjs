import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetailsClient';

interface PageParams {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: PageParams) {
  const noteId = parseInt(params.id, 10);

  if (isNaN(noteId)) {
    return <div>Invalid note ID</div>;
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
}
