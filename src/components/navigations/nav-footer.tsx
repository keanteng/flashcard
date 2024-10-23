import Link from "next/link";

const links = [
  {
    name: "Home",
    url: "/"
  },
  {
    name: 'Flashcard',
    url: '/flashcard'
  },
  {
    name: "Docs",
    url: "/docs"
  }
]

export default function NavFooter() {
    return (
      <div className="w-full bottom-0 py-6 px-8 border-t shadow-sm">
        <div className="text-gray-500 text-sm">
          <span>Kean Teng © 2024. &nbsp;All Rights Reserved.</span>
        </div>
        <ul className="flex flex-wrap items-center gap-3 text-sm text-gray-500 font-semibold">
          {links.map((link, index) => (
            <li key={index}>
              <Link 
                href={link.url}
                className="hover:underline"
              >
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
}