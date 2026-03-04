/**
 * Redux slice for Blog: list of posts and single post by slug. Used by: BlogPage, BlogDetailPage, admin CRUD.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBlogPosts,
  getBlogCategories,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "../../api";

export const fetchBlogPosts = createAsyncThunk(
  "blog/fetchPosts",
  async (publishedOnly = true, { rejectWithValue }) => {
    try {
      const res = await getBlogPosts(publishedOnly);
      return res?.posts ?? [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchBlogCategories = createAsyncThunk(
  "blog/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getBlogCategories();
      return res?.categories ?? [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchBlogPostBySlug = createAsyncThunk(
  "blog/fetchBySlug",
  async ({ slug, includeUnpublished = false }, { rejectWithValue }) => {
    try {
      return await getBlogPostBySlug(slug, includeUnpublished);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createPost = createAsyncThunk(
  "blog/create",
  async (body, { rejectWithValue }) => {
    try {
      return await createBlogPost(body);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "blog/update",
  async ({ slug, body }, { rejectWithValue }) => {
    try {
      return await updateBlogPost(slug, body);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removePost = createAsyncThunk(
  "blog/remove",
  async (slug, { rejectWithValue }) => {
    try {
      await deleteBlogPost(slug);
      return slug;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    posts: [],
    categories: [],
    currentPost: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload ?? [];
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load posts";
      })
      .addCase(fetchBlogCategories.fulfilled, (state, action) => {
        state.categories = action.payload ?? [];
      })
      .addCase(fetchBlogPostBySlug.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const raw = action.payload;
        const slugUsed = action.meta?.arg?.slug;
        const normalized = raw && typeof raw === "object"
          ? {
              _id: raw._id,
              slug: raw.slug ?? slugUsed,
              title: raw.title ?? "",
              excerpt: raw.excerpt ?? "",
              image: raw.image ?? "",
              publishedAt: raw.publishedAt,
              author: raw.author ?? "Layla",
              category: raw.category ?? "",
              body: Array.isArray(raw.body) ? raw.body : [],
              isPublished: raw.isPublished !== false,
            }
          : null;
        if (!normalized) return;
        const idx = state.posts.findIndex((p) => p.slug === slugUsed || p.slug === normalized.slug);
        if (idx !== -1) {
          state.posts[idx] = normalized;
        } else {
          state.posts.push(normalized);
        }
        if (state.currentPost?.slug === slugUsed || state.currentPost?.slug === normalized.slug) {
          state.currentPost = normalized;
        }
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p.slug !== action.payload);
        if (state.currentPost?.slug === action.payload) state.currentPost = null;
      });
  },
});

export const { clearCurrentPost } = blogSlice.actions;
export const selectBlogPosts = (state) => state.blog.posts;
export const selectBlogCategories = (state) => state.blog.categories;
export const selectCurrentPost = (state) => state.blog.currentPost;
export const selectBlogLoading = (state) => state.blog.loading;
export const selectBlogError = (state) => state.blog.error;

export default blogSlice.reducer;
