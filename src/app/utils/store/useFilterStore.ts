import { create } from "zustand";

type FilterState = {
  status: string | null;
  gender: string | null;
  page: string;
  initialized: boolean;
  setStatus: (status: string | null) => void;
  setGender: (gender: string | null) => void;
  setPage: (page: string) => void;
  initializeFilters: (
    status: string | null,
    gender: string | null,
    page: string
  ) => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  status: null,
  gender: null,
  page: "1",
  initialized: false,
  setStatus: (status) => set({ status }),
  setGender: (gender) => set({ gender }),
  setPage: (page) => set({ page }),
  /**
   * Initializes the filter state with the provided status, gender, and page values.
   * If the state is already initialized, it does nothing.
   *
   * @param {string | null} status - The status filter value to set.
   * @param {string | null} gender - The gender filter value to set.
   * @param {string} page - The page value to set.
   */

  initializeFilters: (status, gender, page) =>
    set((state) =>
      state.initialized ? {} : { status, gender, page, initialized: true }
    ),
}));
