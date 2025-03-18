import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { TSearchParams } from "@/lib/types";
import { getCharacters } from "./utils/hooks/useCharacters";
import Filters from "./components/Filters";
import CharacterList from "./components/CharsList";
import PaginationControls from "./components/PaginationControls";

/**
 * This page will be server-side rendered (SSR) and will prefetch the
 * characters data. It will also be wrapped in a HydrationBoundary, which
 * will rehydrate the prefetched data on the client.
 *
 * @param {{
 *   searchParams: Promise<TSearchParams>
 * }} props
 * @returns {JSX.Element}
 */

export default async function Home({
  searchParams: rawSearchParams,
}: {
  searchParams: Promise<TSearchParams>;
}) {
  const searchParams = await rawSearchParams;
  const filters = {
    status: searchParams.status ?? undefined,
    gender: searchParams.gender ?? undefined,
    page: searchParams.page ?? "1",
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["characters", filters],
    queryFn: () => getCharacters(filters),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="container mx-auto p-6">
        <Filters />
        <CharacterList />
        <PaginationControls />
      </main>
    </HydrationBoundary>
  );
}
