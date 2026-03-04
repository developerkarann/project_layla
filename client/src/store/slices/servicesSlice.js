/**
 * Redux slice for Services (list of service cards). Used by: ServicesPage and admin CRUD.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../../api";

export const fetchServices = createAsyncThunk(
  "services/fetch",
  async (publishedOnly = true, { rejectWithValue }) => {
    try {
      const res = await getServices(publishedOnly);
      return res?.services ?? [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchServiceById = createAsyncThunk(
  "services/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      return await getServiceById(id);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createServiceItem = createAsyncThunk(
  "services/create",
  async (body, { rejectWithValue }) => {
    try {
      return await createService(body);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateServiceItem = createAsyncThunk(
  "services/update",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      return await updateService(id, body);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeService = createAsyncThunk(
  "services/remove",
  async (id, { rejectWithValue }) => {
    try {
      await deleteService(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    list: [],
    current: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload ?? [];
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load services";
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(createServiceItem.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateServiceItem.fulfilled, (state, action) => {
        const idx = state.list.findIndex((s) => s.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
        if (state.current?.id === action.payload.id) state.current = action.payload;
      })
      .addCase(removeService.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s.id !== action.payload);
        if (state.current?.id === action.payload) state.current = null;
      });
  },
});

export const selectServices = (state) => state.services.list;
export const selectServicesLoading = (state) => state.services.loading;
export const selectServicesError = (state) => state.services.error;
export const selectServiceById = (state, id) =>
  state.services.list.find((s) => s.id === id);

export default servicesSlice.reducer;
