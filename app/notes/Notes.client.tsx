'use client';

import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useNotes } from '../../hooks/useNotes';
import NoteList from '../../components/NoteList/NoteList';
import Pagination from '../../components/Pagination/Pagination';
import SearchBox from '../../components/SearchBox/SearchBox';
import NoteModal from '../../components/NoteModal/NoteModal';
import css from './NotesPage.module.css';
import Loader from '../loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import type { Note } from '../../types/note';
import type { NotesResponse } from '../../lib/api';

interface NotesClientProps {
  initialNotes: Note[];
  initialTotalPages: number;
}

const NotesClient: React.FC<NotesClientProps> = ({
  initialNotes,
  initialTotalPages,
}) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notesPerPage = 12;

  const {
    data: notesData,
    isLoading,
    isError,
    error,
  } = useNotes(
    { page, search: debouncedSearch, perPage: notesPerPage },
    {
      initialData: {
        notes: initialNotes,
        totalPages: initialTotalPages,
        total: initialTotalPages * notesPerPage,
        page: 1,
      } as NotesResponse,
    }
  );

  const totalPages = notesData?.totalPages || 1;
  const currentNotes = notesData?.notes || [];

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleOpenCreateModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={(value: string) => {
            setSearch(value);
            setPage(1);
          }}
        />

        {totalPages > 1 && (
          <Pagination
            page={page}
            onPageChange={setPage}
            totalPages={totalPages}
          />
        )}

        <button className={css.button} onClick={handleOpenCreateModal}>
          Create Note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && (
        <ErrorMessage message={error?.message || 'Unknown error'} />
      )}{' '}
      {!isLoading && !isError && currentNotes.length === 0 ? (
        <div className={css.message}>No notes to display.</div>
      ) : (
        !isLoading &&
        !isError &&
        currentNotes.length > 0 && <NoteList notes={currentNotes} />
      )}
      {isModalOpen && <NoteModal onClose={handleModalClose} />}
    </div>
  );
};

export default NotesClient;
