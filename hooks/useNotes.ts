import {
  useQuery,
  useQueryClient,
  QueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { fetchNotes } from '../lib/api';
import type { NotesResponse } from '../lib/api';

export const queryClient = new QueryClient();

interface UseNotesParams {
  page: number;
  search: string;
  perPage?: number;
}

type NotesQueryKey = ['notes', number, string, number | undefined];

type UseNotesOptionsWithInitialData = Omit<
  UseQueryOptions<NotesResponse, Error, NotesResponse, NotesQueryKey>,
  'queryKey' | 'queryFn'
> & {
  initialData?: NotesResponse;
};

export const useNotes = (
  params: UseNotesParams,
  options?: UseNotesOptionsWithInitialData
) => {
  const queryClientInstance = useQueryClient();
  const queryKey: NotesQueryKey = [
    'notes',
    params.page,
    params.search,
    params.perPage,
  ];

  return useQuery<NotesResponse, Error, NotesResponse, NotesQueryKey>({
    queryKey: queryKey,
    queryFn: () => fetchNotes(params.page, params.search, params.perPage),
    staleTime: 1000 * 60,
    retry: 1,
    placeholderData: previousData => {
      if (previousData) {
        return previousData;
      }

      if (params.page > 1) {
        return queryClientInstance.getQueryData<NotesResponse>([
          'notes',
          params.page - 1,
          params.search,
          params.perPage,
        ]);
      }
      return undefined;
    },
    ...options,
  });
};
