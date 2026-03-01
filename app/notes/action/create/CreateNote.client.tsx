"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import { CreateNoteValues } from "@/types/note";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CreateNoteClient() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (newNote: CreateNoteValues) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push("/notes/filter/all");
    },
  });
  const handleMutation = (note: CreateNoteValues) => {
    mutation.mutate(note);
  };
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm onSubmit={handleMutation} />
      </div>
    </main>
  );
}
