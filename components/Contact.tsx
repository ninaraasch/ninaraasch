import { exhibitions, intro, links, lists } from "@/data/contact";

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
        </div>

        <div className="col-span-2 flex flex-col gap-5 nav:col-span-3 nav:col-start-5">
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
