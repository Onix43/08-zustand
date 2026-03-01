export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}

export interface CreateNoteValues {
  title: string;
  content: string;
  tag: NoteTag;
}
export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
