"use client";

import Image from "next/image";
import { useCharacters } from "../utils/hooks/useCharacters";
import { useFilterStore } from "../utils/store/useFilterStore";
import { ICharacter } from "@/lib/types";
import ClipLoader from "react-spinners/ClipLoader";

/**
 * A component that displays a list of characters from the Rick & Morty API,
 * based on the current filter settings.
 *
 * @returns A JSX element representing the list of characters.
 * @example
 * <CharacterList />
 */
export default function CharacterList() {
  const { status, gender, page } = useFilterStore();
  const { data, isLoading, error } = useCharacters({
    status: status || undefined,
    gender: gender || undefined,
    page: page || "1",
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full py-4">
        <ClipLoader />
        <p className="text-sm text-gray-500 mt-2">Fetching characters...</p>
      </div>
    );
  if (error)
    return (
      <p className="text-red-500 text-center">Error loading characters.</p>
    );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data?.results?.map((char: ICharacter) => (
        <div key={char.id} className="border p-4 rounded-lg shadow-md">
          <Image
            width={500}
            height={500}
            src={char.image}
            alt={char.name}
            className="rounded-md object-center"
          />
          <h3 className="text-lg font-semibold mt-2">{char.name}</h3>
          <p className="text-sm">
            {char.status} - {char.gender}
          </p>
        </div>
      ))}
    </div>
  );
}
