import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationButtonProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function PaginationButton({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationButtonProps) {
  const handlePageChange = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPaginationItems = () => {
    const items = [];
    const windowSize = 1;

    let startPage = Math.max(1, currentPage - windowSize);
    let endPage = Math.min(totalPages, currentPage + windowSize);

    if (totalPages >= 3) {
      if (currentPage <= 2) {
        endPage = 3;
      }
      if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2;
      }
    }

    items.push(
      <PaginationItem key={1}>
        <PaginationLink
          href="#"
          isActive={currentPage === 1}
          onClick={(e) => handlePageChange(e, 1)}
          className={
            currentPage === 1
              ? "rounded-full bg-brand-300 text-white hover:bg-brand-300 hover:text-white"
              : ""
          }
        >
          1
        </PaginationLink>
      </PaginationItem>,
    );

    if (startPage > 2) {
      items.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i === 1) continue;

      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={currentPage === i}
            onClick={(e) => handlePageChange(e, i)}
            className={
              currentPage === i
                ? "rounded-full bg-brand-300 text-white hover:bg-brand-300 hover:text-white"
                : ""
            }
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (endPage < totalPages) {
      items.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    return items;
  };

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => handlePageChange(e, currentPage - 1)}
            aria-disabled={currentPage <= 1}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {renderPaginationItems()}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => handlePageChange(e, currentPage + 1)}
            aria-disabled={currentPage >= totalPages}
            className={
              currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
