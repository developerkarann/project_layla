/**
 * Redux slice for content sections (page/section editable blocks).
 * Used by: public pages (hero, disclaimer, etc.) and admin panel.
 * Sections are keyed by "pageSlug/sectionKey" for caching.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getContentSection, putContentSection } from "../../api";

export const fetchContentSection = createAsyncThunk(
  "content/fetchSection",
  async ({ pageSlug, sectionKey }, { rejectWithValue }) => {
    try {
      const section = await getContentSection(pageSlug, sectionKey);
      return { pageSlug, sectionKey, section };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/** Admin or hook: save section; then refetch to sync state. */
export const saveContentSection = createAsyncThunk(
  "content/saveSection",
  async ({ pageSlug, sectionKey, body }, { rejectWithValue }) => {
    try {
      const section = await putContentSection(pageSlug, sectionKey, body);
      return { pageSlug, sectionKey, section };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const contentSlice = createSlice({
  name: "content",
  initialState: {
    /** Map of "pageSlug/sectionKey" -> { fields, images } */
    byKey: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearContentError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContentSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContentSection.fulfilled, (state, action) => {
        state.loading = false;
        const { pageSlug, sectionKey, section } = action.payload;
        const key = `${pageSlug}/${sectionKey}`;
        state.byKey[key] = section;
      })
      .addCase(fetchContentSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load section";
      })
      .addCase(saveContentSection.fulfilled, (state, action) => {
        const { pageSlug, sectionKey, section } = action.payload;
        const key = `${pageSlug}/${sectionKey}`;
        state.byKey[key] = section;
      });
  },
});

export const { clearContentError } = contentSlice.actions;

/** Select section by page and section key. Returns undefined if not loaded. */
export const selectContentSection = (state, pageSlug, sectionKey) => {
  const key = `${pageSlug}/${sectionKey}`;
  return state.content.byKey[key];
};

export default contentSlice.reducer;
