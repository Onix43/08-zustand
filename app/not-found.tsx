import css from "./Home.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub Error",
  description: "Sorry, this page doesn`t exist",
  openGraph: {
    title: "NoteHub Error",
    description: "Sorry, this page doesn`t exist",
    url: `https://notehub.com/notes`,
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

export default function NotFound() {
  return (
    <section>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </section>
  );
}
