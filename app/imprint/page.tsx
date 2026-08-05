import type { Metadata } from "next";
import Link from "next/link";
import { Cursor } from "@/components/Cursor";
import type { ImprintContent } from "@/lib/content";
import { sanityClient } from "@/lib/sanity/client";
import { imprintQuery } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Imprint — Nina Raasch",
};

export default async function ImprintPage() {
  const imprint = await sanityClient.fetch<ImprintContent>(imprintQuery);

  return (
    <main className="hide-scrollbar h-dvh overflow-y-auto">
      <div className="grid min-h-[var(--nav-height)] grid-cols-2 items-baseline gap-5 bg-paper p-[var(--page-margin)] nav:grid-cols-12 nav:px-[var(--page-margin)] nav:py-[13px]">
        <Link
          href="/"
          className="logotype col-start-1 row-start-1 nav:col-span-2 nav:col-start-1"
        >
          Nina Raasch
        </Link>
        <p className="col-start-2 row-start-1 justify-self-end nav:col-span-5 nav:col-start-3 nav:justify-self-start">
          {imprint?.title ?? "Imprint"}
        </p>
        <Link
          href="/"
          aria-label="Back to home"
          className="col-span-2 row-start-2 justify-self-end text-[22px] leading-none transition-opacity duration-200 hover:opacity-50 nav:col-span-5 nav:col-start-8 nav:row-start-1"
        >
          ×
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-5 px-[var(--page-margin)] pt-10 pb-20 nav:grid-cols-12">
        {imprint?.sections?.map((section, index) => (
          <div
            key={`${section.heading ?? "section"}-${index}`}
            className="col-span-2 flex flex-col gap-2.5 nav:col-span-5 nav:col-start-3"
          >
            {section.heading ? <h2 className="label">{section.heading}</h2> : null}
            {section.body ? (
              <p className="whitespace-pre-line">{section.body}</p>
            ) : null}
          </div>
        ))}
      </div>

      <Cursor />
    </main>
  );
}
