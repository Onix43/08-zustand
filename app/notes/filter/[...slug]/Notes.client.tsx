"use client";

import { useState } from "react";
import { createNote, deleteNote, fetchNotes } from "@/lib/api";
import css from "./NotesPage.module.css";
import NoteList from "@/components/NoteList/NoteList";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import NoteForm from "@/components/NoteForm/NoteForm";
import { Note } from "@/types/note";

type Props = {
  params: string | undefined;
};

function NotesClient({ params }: Props) {
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["notes", currentPage, query],
    queryFn: () => fetchNotes(query, currentPage, params),
    refetchOnMount: false,
  });

  const mutation = useMutation({
    mutationFn: (newNote: Note) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setModalIsOpen(false);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleQueryChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
      setCurrentPage(1);
    },
    500,
  );

  const handleDeleteMutation = (noteId: string) => {
    deleteMutation.mutate(noteId);
  };

  const handleMutation = (note: Note) => {
    mutation.mutate(note);
  };

  const onClose = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox handleSearch={handleQueryChange} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {modalIsOpen && (
        <Modal onClose={onClose}>
          <NoteForm handleNoteCreation={handleMutation} onClose={onClose} />
        </Modal>
      )}
      {data?.notes && data.notes.length > 0 && (
        <NoteList notes={data.notes} handleDelete={handleDeleteMutation} />
      )}
    </div>
  );
}

export default NotesClient;
