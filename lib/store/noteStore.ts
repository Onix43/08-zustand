import { CreateNoteValues } from "@/types/note";
import { persist } from "zustand/middleware";
import { create } from "zustand";

type noteStore = {
  draft: CreateNoteValues;
  setDraft: (note: CreateNoteValues) => void;
  clearDraft: () => void;
};
const initialDraft: CreateNoteValues = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<noteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
