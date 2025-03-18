import { BaseAPIUrl } from "@/lib/constants";
import { IApiResponse, TSearchParams } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * Fetches the characters from the Rick & Morty API, applying the given filters.
 *
 * @param {TSearchParams} filters
 * @returns {Promise<IApiResponse>}
 */
export const getCharacters = async (
  filters: TSearchParams
): Promise<IApiResponse> => {
  const params = new URLSearchParams();

  if (filters.status) params.append("status", filters.status);
  if (filters.gender) params.append("gender", filters.gender);
  if (filters.page) params.append("page", filters.page);

  const { data } = await axios.get<IApiResponse>(
    `${BaseAPIUrl}/api/character?${params.toString()}`
  );
  return data;
};

export const useCharacters = (filters: TSearchParams) => {
  return useQuery<IApiResponse>({
    queryKey: ["characters", filters.status, filters.gender, filters.page],
    queryFn: () => getCharacters(filters),
    staleTime: 0,
  });
};
