// app/notes/[id]/page.tsx
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client';

// Видаляємо явну типізацію NoteDetailsPageProps
// Next.js надає свій власний PageProps, і ми можемо просто деструктурувати params.
export default async function NoteDetailsPage({
  params,
}: {
  params: { id: string }; // Явно типізуємо params тут, без створення окремого інтерфейсу PageProps
}) {
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
