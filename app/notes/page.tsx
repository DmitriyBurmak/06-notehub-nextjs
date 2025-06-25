import { fetchNotes } from '../../lib/api';
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import type { NotesResponse } from '../../types/note';

const NotesPage = async () => {
  const queryClient = new QueryClient();
  const initialPage = 1;
  const initialSearch = '';
  const initialPerPage = 12;

  const queryKey = ['notes', initialPage, initialSearch, initialPerPage];

  await queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: () => fetchNotes(initialPage, initialSearch, initialPerPage),
  });

  const prefetchedNotesData = queryClient.getQueryData<NotesResponse>(queryKey);
  const initialNotes = prefetchedNotesData?.notes || [];
  const initialTotalPages = prefetchedNotesData?.totalPages || 1;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        initialNotes={initialNotes}
        initialTotalPages={initialTotalPages}
      />
    </HydrationBoundary>
  );
};

export default NotesPage;
