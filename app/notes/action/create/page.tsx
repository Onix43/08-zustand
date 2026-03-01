import { Metadata } from "next";
import CreateNoteClient from "./CreateNote.client";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `NoteHub: Note Creation`,
    description: `NoteHub: Note Creation page`,
    openGraph: {
      title: `NoteHub: Note Creation`,
      description: `NoteHub: Note Creation page`,
      url: `https://notehub.com/notes/action/create`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
    },
  };
}

export default function CreateNote() {
  return <CreateNoteClient />;
}
