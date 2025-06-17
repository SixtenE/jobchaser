import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FilterState = {
  filters: string[];
  search: string;
};

const initialState: FilterState = {
  filters: [],
  search: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    toggleFilter: (state, action: PayloadAction<string>) => {
      const filter = action.payload;
      if (state.filters.includes(filter)) {
        state.filters = state.filters.filter((f) => f !== filter);
      } else {
        state.filters = [...state.filters, filter];
      }
    },
    clearFilters: (state) => {
      state.filters = [];
    },
  },
});

export const { setSearch, toggleFilter, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
