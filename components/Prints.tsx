import type { Print } from "@/lib/content";
import { Asset } from "./Asset";

export function Prints({ prints }: { prints: Print[] }) {
  return (
    <div
      className="hide-scrollbar overflow-y-auto"
      style={{ maxHeight: "calc(100dvh - var(--nav-height) - 20px)" }}
    >
      <div className="grid grid-cols-2 gap-5 px-[var(--page-margin)] pb-5 nav:grid-cols-5 nav:pb-[30px]">
        {prints.map((print) => {
          const details = [print.size, print.edition].filter(Boolean).join(", ");

          return (
            <a
              key={print.id}
              href={print.url}
              target="_blank"
              rel="noreferrer"
              className="group block"
            >
              <Asset
                src={print.src}
                width={print.width}
                height={print.height}
                alt={print.alt ?? `${print.title}, print by Nina Raasch`}
                sizes="(max-width: 700px) 50vw, 20vw"
                aspectRatio="4/5"
                className="w-full"
              />

              <div className="flex flex-col gap-px pt-2.5">
                <span className="italic">{print.title}</span>
                {details ? <span>{details}</span> : null}
                {print.price ? <span>{print.price}</span> : null}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
