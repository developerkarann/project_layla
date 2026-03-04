/**
 * Redux slice for Events (upcoming/past). Used by: EventsPage and admin CRUD.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUpcomingEvents,
  getPastEvents,
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../../api";

export const fetchUpcomingEvents = createAsyncThunk(
  "events/fetchUpcoming",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUpcomingEvents();
      return res?.events ?? [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchPastEvents = createAsyncThunk(
  "events/fetchPast",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getPastEvents();
      return res?.events ?? [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/** Fetch both upcoming and past in one go for the events page. */
export const fetchAllEvents = createAsyncThunk(
  "events/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const [upcomingRes, pastRes] = await Promise.all([
        getUpcomingEvents(),
        getPastEvents(),
      ]);
      return {
        upcoming: upcomingRes?.events ?? [],
        past: pastRes?.events ?? [],
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchEventById = createAsyncThunk(
  "events/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      return await getEventById(id);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createEventItem = createAsyncThunk(
  "events/create",
  async (body, { rejectWithValue }) => {
    try {
      return await createEvent(body);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateEventItem = createAsyncThunk(
  "events/update",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      return await updateEvent(id, body);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeEvent = createAsyncThunk(
  "events/remove",
  async (id, { rejectWithValue }) => {
    try {
      await deleteEvent(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    upcoming: [],
    past: [],
    current: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.upcoming = action.payload ?? [];
      })
      .addCase(fetchUpcomingEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load events";
      })
      .addCase(fetchPastEvents.fulfilled, (state, action) => {
        state.past = action.payload ?? [];
      })
      .addCase(fetchAllEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.upcoming = action.payload.upcoming ?? [];
        state.past = action.payload.past ?? [];
      })
      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load events";
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(createEventItem.fulfilled, (state, action) => {
        const e = action.payload;
        if (e.status === "upcoming") state.upcoming.push(e);
        else state.past.push(e);
      })
      .addCase(updateEventItem.fulfilled, (state, action) => {
        const e = action.payload;
        const replace = (arr) => {
          const i = arr.findIndex((x) => x.id === e.id);
          if (i !== -1) arr[i] = e;
        };
        replace(state.upcoming);
        replace(state.past);
        if (state.current?.id === e.id) state.current = e;
      })
      .addCase(removeEvent.fulfilled, (state, action) => {
        state.upcoming = state.upcoming.filter((x) => x.id !== action.payload);
        state.past = state.past.filter((x) => x.id !== action.payload);
        if (state.current?.id === action.payload) state.current = null;
      });
  },
});

export const selectUpcomingEvents = (state) => state.events.upcoming;
export const selectPastEvents = (state) => state.events.past;
export const selectEventsLoading = (state) => state.events.loading;
export const selectEventsError = (state) => state.events.error;

export default eventsSlice.reducer;
