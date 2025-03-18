"use client";

import { useQueryState } from "nuqs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { useCharacters } from "../utils/hooks/useCharacters";
import { useFilterStore } from "../utils/store/useFilterStore";

/**
 * A component that manages and displays pagination controls for the character list.
 * It integrates with the filter store to keep track of current filter settings and updates
 * the page based on user interaction with the pagination controls.
 *
 * This component uses `useQueryState` to synchronize the query parameter for the page and
 * `useCharacters` to fetch character data based on the current filters and page. The pagination
 * UI is rendered using various pagination components, allowing users to navigate through pages
 * of character data.
 *
 * The component also initializes filters if they haven't been initialized and sets the filters
 * ready state once initialization is complete.
 *
 * @returns {JSX.Element | null} A JSX element containing pagination controls or null if no data is available.
 */

export default function PaginationControls() {
  const [queryPage, setQueryPage] = useQueryState("page");
  const { page, setPage, status, gender, initializeFilters, initialized } =
    useFilterStore();

  const [filtersReady, setFiltersReady] = useState(false);

  useEffect(() => {
    if (!initialized) {
      initializeFilters(status, gender, queryPage ?? "1");
    } else {
      setFiltersReady(true);
    }
  }, [queryPage, initialized, initializeFilters, status, gender]);

  const currentPage = queryPage ?? page;

  const { data } = useCharacters(
    filtersReady
      ? {
          page: currentPage,
          status: status || undefined,
          gender: gender || undefined,
        }
      : {}
  );

  if (!data) return null;
  const totalPages = data.info.pages;

  const goToPage = (newPage: string) => {
    setQueryPage(newPage, { shallow: false });
    setPage(newPage);
  };

  return (
    <div className="flex justify-center mt-6">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() =>
                goToPage(Math.max(1, parseInt(currentPage) - 1).toString())
              }
            />
          </PaginationItem>
          {[...Array(totalPages)].slice(0, 5).map((_, index) => {
            const pageNum = (index + 1).toString();
            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href="#"
                  isActive={pageNum === currentPage}
                  onClick={() => goToPage(pageNum)}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                goToPage(
                  Math.min(totalPages, parseInt(currentPage) + 1).toString()
                )
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
