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

const NotesClient: React.FC = () => {
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
  } = useNotes({ page, search: debouncedSearch, perPage: notesPerPage });

  const totalPages = notesData?.totalPages || 1;

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
      {!isLoading && !isError && notesData && notesData.notes.length === 0 && (
        <div className={css.message}>No notes to display.</div>
      )}
      {!isLoading && !isError && notesData && notesData.notes.length > 0 && (
        <NoteList notes={notesData.notes} />
      )}
      {isModalOpen && <NoteModal onClose={handleModalClose} />}
    </div>
  );
};

export default NotesClient;
