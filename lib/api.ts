import axios from "axios";
import type { Note, CreateNoteValues } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const baseUrl = "https://notehub-public.goit.study/api";
const noteOptions = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
};
axios.defaults.baseURL = baseUrl;

export async function fetchNotes(
  search?: string,
  page?: number,
  tag?: string,
): Promise<FetchNotesResponse> {
  const response = await axios.get<FetchNotesResponse>("/notes", {
    params: { search, page, tag, perPage: 12 },
    method: "GET",
    ...noteOptions,
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get(`/notes/${id}`, {
    ...noteOptions,
  });
  return response.data;
}

export async function createNote(
  note: CreateNoteValues,
): Promise<FetchNotesResponse> {
  const response = await axios.post<FetchNotesResponse>(
    "/notes",
    note,
    noteOptions,
  );
  return response.data;
}

export async function deleteNote(noteId: string): Promise<FetchNotesResponse> {
  const response = await axios.delete<FetchNotesResponse>(
    `/notes/${noteId}`,
    noteOptions,
  );
  return response.data;
}
