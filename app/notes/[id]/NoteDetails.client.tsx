'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import type { Note } from '../../../types/note';
import css from './NoteDetailsClient.module.css';

interface NoteDetailsClientProps {
  id: string;
}

const NoteDetailsClient: React.FC<NoteDetailsClientProps> = ({ id }) => {
  const noteId = parseInt(id, 10);

  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery<Note, Error, Note, ['note', number]>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: !isNaN(noteId),
  });

  if (isNaN(noteId)) {
    return <p className={css.errorMessage}>Incorrect note ID.</p>;
  }

  if (isLoading) {
    return <p className={css.loadingMessage}>Loading, please wait...</p>;
  }

  if (isError) {
    return (
      <p className={css.errorMessage}>
        An error occurred: {error?.message || 'Unknown error'}
      </p>
    );
  }

  if (!note) {
    return <p className={css.errorMessage}>Note not found.</p>;
  }

  const formattedDate = note.updatedAt
    ? `Updated: ${new Date(note.updatedAt).toLocaleDateString()}`
    : `Created by: ${new Date(note.createdAt).toLocaleDateString()}`;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2 className={css.title}>{note.title}</h2>
          <button className={css.editBtn}>Edit a note</button>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{formattedDate}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
