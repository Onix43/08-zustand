import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const queryClient = new QueryClient();

  const note = await queryClient.fetchQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchNoteById(id),
  });
  return {
    title: `NoteHub note: ${note.title}`,
    description: `NoteHub note description: ${note.content.slice(0, 30)}`,
    openGraph: {
      title: `NoteHub note: ${note.title}`,
      description: `NoteHub note description: ${note.content.slice(0, 30)}`,
      url: `https://notehub.com/notes/filter/${note.id}`,
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

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
