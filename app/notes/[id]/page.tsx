import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface NoteDetailsPageProps {
  params: { id: string };
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const noteId = Number(params.id);

  if (isNaN(noteId)) {
    return <div>Неправильний ID нотатки</div>;
  }

  const queryClient = new QueryClient();
  const queryKey = ['note', noteId];

  await queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={noteId} />
    </HydrationBoundary>
  );
}
