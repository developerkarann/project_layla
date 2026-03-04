/**
 * Redux store. All slices are combined here. Use with React Redux Provider in main.jsx.
 * Slices: content (section blocks), about, contact, services, blog, gallery, events, membership, settings.
 * Pages dispatch fetch thunks on mount and read from selectors; admin CRUD dispatches create/update/delete thunks.
 */
import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./slices/contentSlice";
import aboutReducer from "./slices/aboutSlice";
import contactReducer from "./slices/contactSlice";
import servicesReducer from "./slices/servicesSlice";
import blogReducer from "./slices/blogSlice";
import galleryReducer from "./slices/gallerySlice";
import eventsReducer from "./slices/eventsSlice";
import membershipReducer from "./slices/membershipSlice";
import settingsReducer from "./slices/settingsSlice";

export const store = configureStore({
  reducer: {
    content: contentReducer,
    about: aboutReducer,
    contact: contactReducer,
    services: servicesReducer,
    blog: blogReducer,
    gallery: galleryReducer,
    events: eventsReducer,
    membership: membershipReducer,
    settings: settingsReducer,
  },
});
