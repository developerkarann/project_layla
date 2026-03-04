/**
 * Redux slice for site settings (header, footer, availability key-value). Used by: Header, Footer, AvailabilityPage.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSettings, getSettingByKey, setSetting } from "../../api";

export const fetchSettings = createAsyncThunk(
  "settings/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getSettings();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateSetting = createAsyncThunk(
  "settings/update",
  async ({ key, value }, { rejectWithValue }) => {
    try {
      return await setSetting(key, value);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    /** Key-value map from API */
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload ?? {};
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load settings";
      })
      .addCase(updateSetting.fulfilled, (state, action) => {
        if (state.data && action.payload) {
          state.data[action.payload.key] = action.payload.value;
        }
      });
  },
});

export const selectSettings = (state) => state.settings.data;
export const selectSetting = (state, key) => state.settings.data?.[key];
export const selectSettingsLoading = (state) => state.settings.loading;

export default settingsSlice.reducer;
