/**
 * Redux slice for Contact page content (single document: methods, FAQ, office hours).
 * Used by: ContactPage. Editable from admin.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getContact, putContact } from "../../api";

export const fetchContact = createAsyncThunk(
  "contact/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getContact();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contact/update",
  async (body, { rejectWithValue }) => {
    try {
      return await putContact(body);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContact.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load contact";
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const selectContact = (state) => state.contact.data;
export const selectContactLoading = (state) => state.contact.loading;
export const selectContactError = (state) => state.contact.error;

export default contactSlice.reducer;
