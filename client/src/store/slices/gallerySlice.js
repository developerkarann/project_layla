/**
 * Redux slice for Gallery groups (each group has title + images). Used by: GalleryPage and admin.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGalleryGroups, getGalleryGroup, upsertGalleryGroup } from "../../api";

export const fetchGalleryGroups = createAsyncThunk(
  "gallery/fetchGroups",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getGalleryGroups();
      return res?.groups ?? [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchGalleryGroupByKey = createAsyncThunk(
  "gallery/fetchGroup",
  async (key, { rejectWithValue }) => {
    try {
      return await getGalleryGroup(key);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const upsertGroup = createAsyncThunk(
  "gallery/upsertGroup",
  async ({ key, body }, { rejectWithValue }) => {
    try {
      return await upsertGalleryGroup(key, body);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    groups: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGalleryGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGalleryGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload ?? [];
      })
      .addCase(fetchGalleryGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load gallery";
      })
      .addCase(upsertGroup.fulfilled, (state, action) => {
        const idx = state.groups.findIndex((g) => g.key === action.payload.key);
        if (idx !== -1) state.groups[idx] = action.payload;
        else state.groups.push(action.payload);
      });
  },
});

export const selectGalleryGroups = (state) => state.gallery.groups;
export const selectGalleryLoading = (state) => state.gallery.loading;
export const selectGalleryError = (state) => state.gallery.error;

export default gallerySlice.reducer;
