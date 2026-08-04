import type { ContactContent } from "@/lib/content";

export function Contact({ content }: { content: ContactContent }) {
  return (
    <div
      className="hide-scrollbar overflow-y-auto"
      style={{ maxHeight: "calc(100dvh - var(--nav-height) - 20px)" }}
    >
      <div className="flex flex-col gap-5 px-[var(--page-margin)] pb-5 nav:flex-row nav:gap-0 nav:pb-[30px]">
        <div className="flex flex-col gap-5 nav:w-[calc(var(--title-offset)-var(--page-margin))] nav:shrink-0 nav:pr-5">
          <p>{content.intro}</p>

          {content.links?.map((link) => (
            <div key={link.label}>
              <h3 className="label">{link.label}</h3>
              <p>
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="underline-reveal"
                >
                  {link.text}
                </a>
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 nav:flex-1 nav:flex-row nav:gap-[calc(var(--column)+var(--grid-gap))]">
          <div className="flex flex-col gap-5 nav:w-[calc(var(--column)*3+var(--grid-gap)*2)] nav:shrink-0">
            {content.lists?.map((list) => (
              <div key={list.label}>
                <h3 className="label">{list.label}</h3>
                <p>{list.items.join(" | ")}</p>
              </div>
            ))}
          </div>

          <div className="nav:flex-1">
            <h3 className="label">exhibitions</h3>
            <ul>
              {content.exhibitions?.map((exhibition) => (
                <li key={exhibition}>{exhibition}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
