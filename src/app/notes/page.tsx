import { getNotes } from '@/lib/api';
// Імпортуємо QueryClient, dehydrate та HydrationBoundary
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';

// Серверний компонент сторінки
const NotesPage = async () => {
  // Створюємо новий екземпляр QueryClient для кожного запиту на сервері
  const queryClient = new QueryClient();

  // Заздалегідь завантажуємо дані за допомогою prefetchQuery
  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', 12], // Точний queryKey, як у useNotes (page, search, perPage)
    queryFn: () => getNotes(), // Функція для фетчингу даних
  });

  return (
    // Обертаємо NotesClient у HydrationBoundary, передаючи дегідратований стан
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};

export default NotesPage;
