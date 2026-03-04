/**
 * Admin "All Membership" tab: CRUD for Tiers, Healing Space items, and Products (MembershipPage data).
 */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMembershipData,
  createTier,
  updateTier,
  removeTier,
  createHealingItem,
  updateHealingItem,
  removeHealingItem,
  createProduct,
  updateProduct,
  removeProduct,
} from "../../store/slices/membershipSlice";
import {
  selectMembershipTiers,
  selectHealingSpaceItems,
  selectMembershipProducts,
  selectMembershipLoading,
} from "../../store/slices/membershipSlice";

const emptyTier = { id: "", name: "", price: "", period: "month", tagline: "", description: "", features: "", cta: "Join", highlighted: false };
const emptyHealing = { id: "", title: "", type: "Content", description: "" };
const emptyProduct = { id: "", title: "", type: "Product", description: "", priceLabel: "" };

export default function AdminAllMembership() {
  const dispatch = useDispatch();
  const tiers = useSelector(selectMembershipTiers);
  const healingSpace = useSelector(selectHealingSpaceItems);
  const products = useSelector(selectMembershipProducts);
  const loading = useSelector(selectMembershipLoading);

  const [activeTab, setActiveTab] = useState("tiers");
  const [editingTier, setEditingTier] = useState(null);
  const [editingHealing, setEditingHealing] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formTier, setFormTier] = useState(emptyTier);
  const [formHealing, setFormHealing] = useState(emptyHealing);
  const [formProduct, setFormProduct] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchMembershipData());
  }, [dispatch]);

  const openNewTier = () => { setEditingTier(null); setFormTier({ ...emptyTier, id: `tier-${Date.now()}` }); };
  const openEditTier = (t) => {
    setEditingTier(t.id);
    setFormTier({
      id: t.id,
      name: t.name ?? "",
      price: String(t.price ?? ""),
      period: t.period ?? "month",
      tagline: t.tagline ?? "",
      description: t.description ?? "",
      features: (t.features || []).join("\n"),
      cta: t.cta ?? "Join",
      highlighted: t.highlighted ?? false,
    });
  };
  const handleSaveTier = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = {
        id: formTier.id,
        name: formTier.name.trim(),
        price: Number(formTier.price) || 0,
        period: formTier.period.trim() || "month",
        tagline: formTier.tagline.trim(),
        description: formTier.description.trim(),
        features: formTier.features.split("\n").map((s) => s.trim()).filter(Boolean),
        cta: formTier.cta.trim() || "Join",
        highlighted: formTier.highlighted,
      };
      if (editingTier) await dispatch(updateTier({ id: formTier.id, body })).unwrap();
      else await dispatch(createTier(body)).unwrap();
      setEditingTier(null);
      setFormTier(emptyTier);
      dispatch(fetchMembershipData());
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };
  const handleDeleteTier = async (id) => {
    if (!window.confirm("Delete this tier?")) return;
    try {
      await dispatch(removeTier(id)).unwrap();
      if (editingTier === id) setEditingTier(null);
      dispatch(fetchMembershipData());
    } catch (err) {
      console.error(err);
    }
  };

  const openNewHealing = () => { setEditingHealing(null); setFormHealing({ ...emptyHealing, id: `healing-${Date.now()}` }); };
  const openEditHealing = (h) => {
    setEditingHealing(h.id);
    setFormHealing({ id: h.id, title: h.title ?? "", type: h.type ?? "Content", description: h.description ?? "" });
  };
  const handleSaveHealing = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = { id: formHealing.id, title: formHealing.title.trim(), type: formHealing.type.trim() || "Content", description: formHealing.description.trim() };
      if (editingHealing) await dispatch(updateHealingItem({ id: formHealing.id, body })).unwrap();
      else await dispatch(createHealingItem(body)).unwrap();
      setEditingHealing(null);
      setFormHealing(emptyHealing);
      dispatch(fetchMembershipData());
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };
  const handleDeleteHealing = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await dispatch(removeHealingItem(id)).unwrap();
      if (editingHealing === id) setEditingHealing(null);
      dispatch(fetchMembershipData());
    } catch (err) {
      console.error(err);
    }
  };

  const openNewProduct = () => { setEditingProduct(null); setFormProduct({ ...emptyProduct, id: `product-${Date.now()}` }); };
  const openEditProduct = (p) => {
    setEditingProduct(p.id);
    setFormProduct({ id: p.id, title: p.title ?? "", type: p.type ?? "Product", description: p.description ?? "", priceLabel: p.priceLabel ?? "" });
  };
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = { id: formProduct.id, title: formProduct.title.trim(), type: formProduct.type.trim() || "Product", description: formProduct.description.trim(), priceLabel: formProduct.priceLabel.trim() };
      if (editingProduct) await dispatch(updateProduct({ id: formProduct.id, body })).unwrap();
      else await dispatch(createProduct(body)).unwrap();
      setEditingProduct(null);
      setFormProduct(emptyProduct);
      dispatch(fetchMembershipData());
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await dispatch(removeProduct(id)).unwrap();
      if (editingProduct === id) setEditingProduct(null);
      dispatch(fetchMembershipData());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-full flex-col bg-page-bg">
      <header className="shrink-0 border-b border-reiki-card-border bg-white/90 px-6 py-4 backdrop-blur-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-reiki-olive">Edit content</p>
        <h1 className="mt-1 text-2xl text-reiki-dark sm:text-3xl" style={{ fontFamily: "EB Garamond, serif" }}>
          Membership › All Membership
        </h1>
        <p className="mt-1 text-sm text-reiki-muted">Manage tiers, Healing Space items, and products. Same data as the Membership page.</p>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="flex gap-2 border-b border-reiki-card-border">
            {["tiers", "healing", "products"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium capitalize ${activeTab === tab ? "border-b-2 border-reiki-olive text-reiki-olive" : "text-reiki-muted hover:text-reiki-dark"}`}
              >
                {tab === "healing" ? "Healing Space" : tab}
              </button>
            ))}
          </div>

          {activeTab === "tiers" && (
            <>
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-reiki-dark">Tiers</h2>
                  <button type="button" onClick={openNewTier} className="rounded-xl bg-reiki-olive px-4 py-2 text-sm font-semibold text-white hover:opacity-90">Add tier</button>
                </div>
                {loading ? <p className="text-reiki-muted">Loading…</p> : (
                  <ul className="space-y-2">
                    {tiers.map((t) => (
                      <li key={t.id} className="flex items-center justify-between rounded-xl border border-reiki-card-border bg-white px-4 py-3">
                        <span className="font-medium text-reiki-dark">{t.name}</span>
                        <div className="flex gap-2">
                          <button type="button" onClick={() => openEditTier(t)} className="text-sm font-medium text-reiki-olive hover:underline">Edit</button>
                          <button type="button" onClick={() => handleDeleteTier(t.id)} className="text-sm font-medium text-red-600 hover:underline">Delete</button>
                        </div>
                      </li>
                    ))}
                    {tiers.length === 0 && <p className="text-reiki-muted">No tiers yet.</p>}
                  </ul>
                )}
              </section>
              {(editingTier || formTier.id) && (
                <section className="rounded-2xl border border-reiki-card-border bg-white p-6">
                  <h3 className="text-lg font-semibold text-reiki-dark mb-4">{editingTier ? "Edit tier" : "New tier"}</h3>
                  <form onSubmit={handleSaveTier} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-reiki-dark mb-1">Name *</label>
                        <input type="text" required value={formTier.name} onChange={(e) => setFormTier((f) => ({ ...f, name: e.target.value }))} className="w-full rounded-lg border border-reiki-card-border px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-reiki-dark mb-1">Price *</label>
                        <input type="number" required value={formTier.price} onChange={(e) => setFormTier((f) => ({ ...f, price: e.target.value }))} className="w-full rounded-lg border border-reiki-card-border px-3 py-2" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-reiki-dark mb-1">Period</label>
                      <input type="text" value={formTier.period} onChange={(e) => setFormTier((f) => ({ ...f, period: e.target.value }))} placeholder="month" className="w-full rounded-lg border border-reiki-card-border px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-reiki-dark mb-1">Tagline</label>
                      <input type="text" value={formTier.tagline} onChange={(e) => setFormTier((f) => ({ ...f, tagline: e.target.value }))} className="w-full rounded-lg border border-reiki-card-border px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-reiki-dark mb-1">Description</label>
                      <textarea value={formTier.description} onChange={(e) => setFormTier((f) => ({ ...f, description: e.target.value }))} rows={2} className="w-full rounded-lg border border-reiki-card-border px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-reiki-dark mb-1">Features (one per line)</label>
                      <textarea value={formTier.features} onChange={(e) => setFormTier((f) => ({ ...f, features: e.target.value }))} rows={4} className="w-full rounded-lg border border-reiki-card-border px-3 py-2" />
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" checked={formTier.highlighted} onChange={(e) => setFormTier((f) => ({ ...f, highlighted: e.target.checked }))} className="rounded border-reiki-card-border" />
                        <span className="text-sm text-reiki-dark">Highlighted (Most popular)</span>
                      </label>
                      <div>
                        <label className="block text-sm font-medium text-reiki-dark mb-1">CTA</label>
                        <input type="text" value={formTier.cta} onChange={(e) => setFormTier((f) => ({ ...f, cta: e.target.value }))} className="w-32 rounded-lg border border-reiki-card-border px-3 py-2" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" disabled={saving} className="rounded-xl bg-reiki-olive px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
                      <button type="button" onClick={() => { setEditingTier(null); setFormTier(emptyTier); }} className="rounded-xl border border-reiki-card-border px-4 py-2 text-sm text-reiki-muted hover:bg-reiki-section">Cancel</button>
                    </div>
                  </form>
                </section>
              )}
            </>
          )}

          {activeTab === "healing" && (
            <>
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-reiki-dark">Healing Space items</h2>
                  <button type="button" onClick={openNewHealing} className="rounded-xl bg-reiki-olive px-4 py-2 text-sm font-semibold text-white hover:opacity-90">Add item</button>
                </div>
                {loading ? <p className="text-reiki-muted">Loading…</p> : (
                  <ul className="space-y-2">
                    {healingSpace.map((h) => (
                      <li key={h.id} className="flex items-center justify-between rounded-xl border border-reiki-card-border bg-white px-4 py-3">
                        <span className="font-medium text-reiki-dark">{h.title}</span>
                        <div className="flex gap-2">
                          <button type="button" onClick={() => openEditHealing(h)} className="text-sm font-medium text-reiki-olive hover:underline">Edit</button>
                          <button type="button" onClick={() => handleDeleteHealing(h.id)} className="text-sm font-medium text-red-600 hover:underline">Delete</button>
                        </div>
                      </li>
                    ))}
                    {healingSpace.length === 0 && <p className="text-reiki-muted">No items yet.</p>}
                  </ul>
                )}
              </section>
              {(editingHealing || formHealing.id) && (
                <section className="rounded-2xl border border-reiki-card-border bg-white p-6">
                  <h3 className="text-lg font-semibold text-reiki-dark mb-4">{editingHealing ? "Edit item" : "New item"}</h3>
                  <form onSubmit={handleSaveHealing} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-reiki-dark mb-1">Title *</label>
                      <input type="text" required value={formHealing.title} onChange={(e) => setFormHealing((f) => ({ ...f, title: e.target.value }))} className="w-full rounded-lg border border-reiki-card-border px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-reiki-dark mb-1">Type</label>
                      <input type="text" value={formHealing.type} onChange={(e) => setFormHealing((f) => ({ ...f, type: e.target.value }))} placeholder="Content" className="w-full rounded-lg border border-reiki-card-border px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-reiki-dark mb-1">Description</label>
                      <textarea value={formHealing.description} onChange={(e) => setFormHealing((f) => ({ ...f, description: e.target.value }))} rows={3} className="w-full rounded-lg border border-reiki-card-border px-3 py-2" />
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" disabled={saving} className="rounded-xl bg-reiki-olive px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
                      <button type="button" onClick={() => { setEditingHealing(null); setFormHealing(emptyHealing); }} className="rounded-xl border border-reiki-card-border px-4 py-2 text-sm text-reiki-muted hover:bg-reiki-section">Cancel</button>
                    </div>
                  </form>
                </section>
              )}
            </>
          )}

          {activeTab === "products" && (
            <>
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-reiki-dark">Products</h2>
                  <button type="button" onClick={openNewProduct} className="rounded-xl bg-reiki-olive px-4 py-2 text-sm font-semibold text-white hover:opacity-90">Add product</button>
                </div>
                {loading ? <p className="text-reiki-muted">Loading…</p> : (
                  <ul className="space-y-2">
                    {products.map((p) => (
                      <li key={p.id} className="flex items-center justify-between rounded-xl border border-reiki-card-border bg-white px-4 py-3">
                        <span className="font-medium text-reiki-dark">{p.title}</span>
                        <div className="flex gap-2">
                          <button type="button" onClick={() => openEditProduct(p)} className="text-sm font-medium text-reiki-olive hover:underline">Edit</button>
                          <button type="button" onClick={() => handleDeleteProduct(p.id)} className="text-sm font-medium text-red-600 hover:underline">Delete</button>
                        </div>
                      </li>
                    ))}
                    {products.length === 0 && <p className="text-reiki-muted">No products yet.</p>}
                  </ul>
                )}
              </section>
              {(editingProduct || formProduct.id) && (
                <section className="rounded-2xl border border-reiki-card-border bg-white p-6">
                  <h3 className="text-lg font-semibold text-reiki-dark mb-4">{editingProduct ? "Edit product" : "New product"}</h3>
                  <form onSubmit={handleSaveProduct} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-reiki-dark mb-1">Title *</label>
                      <input type="text" required value={formProduct.title} onChange={(e) => setFormProduct((f) => ({ ...f, title: e.target.value }))} className="w-full rounded-lg border border-reiki-card-border px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-reiki-dark mb-1">Type</label>
                      <input type="text" value={formProduct.type} onChange={(e) => setFormProduct((f) => ({ ...f, type: e.target.value }))} placeholder="Product" className="w-full rounded-lg border border-reiki-card-border px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-reiki-dark mb-1">Description</label>
                      <textarea value={formProduct.description} onChange={(e) => setFormProduct((f) => ({ ...f, description: e.target.value }))} rows={2} className="w-full rounded-lg border border-reiki-card-border px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-reiki-dark mb-1">Price label</label>
                      <input type="text" value={formProduct.priceLabel} onChange={(e) => setFormProduct((f) => ({ ...f, priceLabel: e.target.value }))} placeholder="e.g. From $29" className="w-full rounded-lg border border-reiki-card-border px-3 py-2" />
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" disabled={saving} className="rounded-xl bg-reiki-olive px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
                      <button type="button" onClick={() => { setEditingProduct(null); setFormProduct(emptyProduct); }} className="rounded-xl border border-reiki-card-border px-4 py-2 text-sm text-reiki-muted hover:bg-reiki-section">Cancel</button>
                    </div>
                  </form>
                </section>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
