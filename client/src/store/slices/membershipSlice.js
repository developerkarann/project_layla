/**
 * Redux slice for Membership: tiers, healing-space items, products, meta. Used by: MembershipPage and admin CRUD.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMembershipTiers,
  getHealingSpaceItems,
  getMembershipProducts,
  getMembershipMeta,
  createMembershipTier,
  updateMembershipTier,
  deleteMembershipTier,
  createHealingSpaceItem,
  updateHealingSpaceItem,
  deleteHealingSpaceItem,
  createMembershipProduct,
  updateMembershipProduct,
  deleteMembershipProduct,
  updateMembershipMeta,
} from "../../api";

export const fetchMembershipTiers = createAsyncThunk(
  "membership/fetchTiers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMembershipTiers();
      return res?.tiers ?? [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchHealingSpaceItems = createAsyncThunk(
  "membership/fetchHealingSpace",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getHealingSpaceItems();
      return res?.items ?? [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchMembershipProducts = createAsyncThunk(
  "membership/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMembershipProducts();
      return res?.products ?? [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchMembershipMeta = createAsyncThunk(
  "membership/fetchMeta",
  async (_, { rejectWithValue }) => {
    try {
      return await getMembershipMeta();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/** Fetch all membership data for the membership page. */
export const fetchMembershipData = createAsyncThunk(
  "membership/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const [tiersRes, healingRes, productsRes, metaRes] = await Promise.all([
        getMembershipTiers(),
        getHealingSpaceItems(),
        getMembershipProducts(),
        getMembershipMeta(),
      ]);
      return {
        tiers: tiersRes?.tiers ?? [],
        healingSpace: healingRes?.items ?? [],
        products: productsRes?.products ?? [],
        meta: metaRes ?? null,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// CRUD thunks (admin)
export const createTier = createAsyncThunk("membership/createTier", (body, { rejectWithValue }) =>
  createMembershipTier(body).catch((e) => rejectWithValue(e.message))
);
export const updateTier = createAsyncThunk(
  "membership/updateTier",
  ({ id, body }, { rejectWithValue }) =>
    updateMembershipTier(id, body).catch((e) => rejectWithValue(e.message))
);
export const removeTier = createAsyncThunk("membership/removeTier", (id, { rejectWithValue }) =>
  deleteMembershipTier(id).then(() => id).catch((e) => rejectWithValue(e.message))
);
export const createHealingItem = createAsyncThunk("membership/createHealing", (body, { rejectWithValue }) =>
  createHealingSpaceItem(body).catch((e) => rejectWithValue(e.message))
);
export const updateHealingItem = createAsyncThunk(
  "membership/updateHealing",
  ({ id, body }, { rejectWithValue }) =>
    updateHealingSpaceItem(id, body).catch((e) => rejectWithValue(e.message))
);
export const removeHealingItem = createAsyncThunk("membership/removeHealing", (id, { rejectWithValue }) =>
  deleteHealingSpaceItem(id).then(() => id).catch((e) => rejectWithValue(e.message))
);
export const createProduct = createAsyncThunk("membership/createProduct", (body, { rejectWithValue }) =>
  createMembershipProduct(body).catch((e) => rejectWithValue(e.message))
);
export const updateProduct = createAsyncThunk(
  "membership/updateProduct",
  ({ id, body }, { rejectWithValue }) =>
    updateMembershipProduct(id, body).catch((e) => rejectWithValue(e.message))
);
export const removeProduct = createAsyncThunk("membership/removeProduct", (id, { rejectWithValue }) =>
  deleteMembershipProduct(id).then(() => id).catch((e) => rejectWithValue(e.message))
);
export const updateMeta = createAsyncThunk("membership/updateMeta", (body, { rejectWithValue }) =>
  updateMembershipMeta(body).catch((e) => rejectWithValue(e.message))
);

const membershipSlice = createSlice({
  name: "membership",
  initialState: {
    tiers: [],
    healingSpace: [],
    products: [],
    meta: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembershipTiers.fulfilled, (state, action) => {
        state.tiers = action.payload ?? [];
      })
      .addCase(fetchHealingSpaceItems.fulfilled, (state, action) => {
        state.healingSpace = action.payload ?? [];
      })
      .addCase(fetchMembershipProducts.fulfilled, (state, action) => {
        state.products = action.payload ?? [];
      })
      .addCase(fetchMembershipMeta.fulfilled, (state, action) => {
        state.meta = action.payload;
      })
      .addCase(fetchMembershipData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMembershipData.fulfilled, (state, action) => {
        state.loading = false;
        state.tiers = action.payload.tiers ?? [];
        state.healingSpace = action.payload.healingSpace ?? [];
        state.products = action.payload.products ?? [];
        state.meta = action.payload.meta ?? null;
      })
      .addCase(fetchMembershipData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load membership";
      })
      .addCase(createTier.fulfilled, (state, action) => {
        state.tiers.push(action.payload);
      })
      .addCase(updateTier.fulfilled, (state, action) => {
        const i = state.tiers.findIndex((t) => t.id === action.payload.id);
        if (i !== -1) state.tiers[i] = action.payload;
      })
      .addCase(removeTier.fulfilled, (state, action) => {
        state.tiers = state.tiers.filter((t) => t.id !== action.payload);
      })
      .addCase(createHealingItem.fulfilled, (state, action) => {
        state.healingSpace.push(action.payload);
      })
      .addCase(updateHealingItem.fulfilled, (state, action) => {
        const i = state.healingSpace.findIndex((h) => h.id === action.payload.id);
        if (i !== -1) state.healingSpace[i] = action.payload;
      })
      .addCase(removeHealingItem.fulfilled, (state, action) => {
        state.healingSpace = state.healingSpace.filter((h) => h.id !== action.payload);
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const i = state.products.findIndex((p) => p.id === action.payload.id);
        if (i !== -1) state.products[i] = action.payload;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      })
      .addCase(updateMeta.fulfilled, (state, action) => {
        state.meta = action.payload;
      });
  },
});

export const selectMembershipTiers = (state) => state.membership.tiers;
export const selectHealingSpaceItems = (state) => state.membership.healingSpace;
export const selectMembershipProducts = (state) => state.membership.products;
export const selectMembershipMeta = (state) => state.membership.meta;
export const selectMembershipLoading = (state) => state.membership.loading;
export const selectMembershipError = (state) => state.membership.error;

export default membershipSlice.reducer;
