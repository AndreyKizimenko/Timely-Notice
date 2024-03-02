import { Status } from "@prisma/client";
import { create } from "zustand";

interface SortOrder {
  status?: "asc" | "desc";
  title?: "asc" | "desc";
  updated?: "asc" | "desc";
  created?: "asc" | "desc";
}

interface ListStore {
  filter: Status | undefined;
  setFilter: (newFilter: Status) => void;
  sorting: SortOrder;
  setSorting: (newSort: SortOrder) => void;
}

const useListStore = create<ListStore>((set) => ({
  filter: undefined,
  setFilter: (newFilter) => set({ filter: newFilter }),
  sorting: { status: "asc" },
  setSorting: (newSort) => set({ sorting: newSort }),
}));

export default useListStore;
