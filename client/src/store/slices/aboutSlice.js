/**
 * Redux slice for About page content (single document from API).
 * Used by: AboutPage. Editable from admin (About content or future admin screen).
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAbout, putAbout } from "../../api";

export const fetchAbout = createAsyncThunk(
  "about/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getAbout();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateAbout = createAsyncThunk(
  "about/update",
  async (body, { rejectWithValue }) => {
    try {
      return await putAbout(body);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const aboutSlice = createSlice({
  name: "about",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load about";
      })
      .addCase(updateAbout.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const selectAbout = (state) => state.about.data;
export const selectAboutLoading = (state) => state.about.loading;
export const selectAboutError = (state) => state.about.error;

export default aboutSlice.reducer;
