import type { Metadata } from "next";
import Link from "next/link";
import { Cursor } from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative flex h-dvh flex-col">
      <div className="grid min-h-[var(--nav-height)] grid-cols-2 items-baseline gap-5 bg-paper p-[var(--page-margin)] nav:grid-cols-12 nav:px-[var(--page-margin)] nav:py-[13px]">
        <Link
          href="/"
          className="logotype col-start-1 row-start-1 nav:col-span-2 nav:col-start-1"
        >
          Nina Raasch
        </Link>
        <h1 className="col-start-2 row-start-1 justify-self-end nav:col-span-5 nav:col-start-3 nav:justify-self-start">
          404
        </h1>
      </div>

      <div className="flex flex-1 items-center justify-center px-[var(--page-margin)]">
        <div className="flex flex-col items-center gap-2.5 text-center">
          <p>This page does not exist.</p>
          <Link href="/" className="underline-reveal bold">
            back to the work
          </Link>
        </div>
      </div>

      <Cursor />
    </main>
  );
}
