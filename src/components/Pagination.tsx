import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav className="flex justify-center items-center gap-2 mt-8">
      {currentPage > 1 && (
        <Link
          href={currentPage === 2 ? basePath : `${basePath}?page=${currentPage - 1}`}
          className="px-3 py-2 text-sm border border-[var(--border)] rounded-lg hover:bg-[var(--card)] transition-colors"
        >
          Previous
        </Link>
      )}

      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`dots-${i}`} className="px-2 text-[var(--muted)]">
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={page === 1 ? basePath : `${basePath}?page=${page}`}
            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
              page === currentPage
                ? "bg-[var(--primary)] text-white"
                : "border border-[var(--border)] hover:bg-[var(--card)]"
            }`}
          >
            {page}
          </Link>
        )
      )}

      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-3 py-2 text-sm border border-[var(--border)] rounded-lg hover:bg-[var(--card)] transition-colors"
        >
          Next
        </Link>
      )}
    </nav>
  );
}
