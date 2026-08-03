import { exhibitions, instagramUrl, intro, links, lists } from "@/data/contact";

export function Contact() {
  return (
    <div
      className="hide-scrollbar overflow-y-auto"
      style={{ maxHeight: "calc(100dvh - var(--nav-height) - 20px)" }}
    >
      <div className="grid grid-cols-2 gap-5 px-[var(--page-margin)] pb-5 nav:grid-cols-12 nav:pb-[30px]">
        <div className="col-span-2 flex flex-col gap-5 nav:col-span-3 nav:col-start-1">
          <p>{intro}</p>

          {links.map((link) => (
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

          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="mt-5"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4.4" />
              <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>

        <div className="col-span-2 flex flex-col gap-5 nav:col-span-4 nav:col-start-5">
          {lists.map((list) => (
            <div key={list.label}>
              <h3 className="label">{list.label}</h3>
              <p>{list.items.join(" | ")}</p>
            </div>
          ))}
        </div>

        <div className="col-span-2 nav:col-span-4 nav:col-start-9">
          <h3 className="label">exhibitions</h3>
          <ul>
            {exhibitions.map((exhibition) => (
              <li key={exhibition}>{exhibition}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
