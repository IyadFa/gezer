"use client";

import { useQueryState } from "nuqs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { useFilterStore } from "../utils/store/useFilterStore";

/**
 * A component that renders two dropdowns for filtering the characters by their
 * status and gender. The component is connected to the `useFilterStore` and
 * `useQueryState` hooks to manage the state of the filters and update the
 * query parameters when the user changes the filter values.
 *
 * @returns A JSX element that renders the two dropdowns.
 */
export default function Filters() {
  const [queryStatus, setQueryStatus] = useQueryState("status");
  const [queryGender, setQueryGender] = useQueryState("gender");

  const {
    status,
    gender,
    setStatus,
    setGender,
    setPage,
    initializeFilters,
    initialized,
  } = useFilterStore();

  useEffect(() => {
    if (!initialized) {
      initializeFilters(queryStatus ?? null, queryGender ?? null, "1");
    }
  }, [queryStatus, queryGender, initialized, initializeFilters]);

  const handleChange = (key: "status" | "gender", value: string | null) => {
    if (key === "status") {
      setQueryStatus(value, { shallow: false });
      setStatus(value);
    } else {
      setQueryGender(value, { shallow: false });
      setGender(value);
    }
    setPage("1");
  };

  return (
    <div className="flex gap-4 p-4">
      <Select
        value={status ?? ""}
        onValueChange={(value) => handleChange("status", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="alive">Alive</SelectItem>
          <SelectItem value="dead">Dead</SelectItem>
          <SelectItem value="unknown">Unknown</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={gender ?? ""}
        onValueChange={(value) => handleChange("gender", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="unknown">Unknown</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
