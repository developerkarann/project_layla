/**
 * Admin CRUD for Events. List upcoming/past, add, edit, delete. Uses Redux events slice.
 */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllEvents,
  createEventItem,
  updateEventItem,
  removeEvent,
} from "../../store/slices/eventsSlice";
import { selectUpcomingEvents, selectPastEvents, selectEventsLoading } from "../../store/slices/eventsSlice";
import { formatEventDate } from "../../utils/fallbacks";

const emptyEvent = {
  id: "",
  title: "",
  date: "",
  time: "",
  location: "",
  type: "Workshop",
  description: "",
  image: "",
  cta: "Register",
  status: "upcoming",
};

export default function AdminEvents() {
  const dispatch = useDispatch();
  const upcoming = useSelector(selectUpcomingEvents);
  const past = useSelector(selectPastEvents);
  const loading = useSelector(selectEventsLoading);

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyEvent);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  const openNew = (status = "upcoming") => {
    setEditing(null);
    setForm({ ...emptyEvent, id: `event-${Date.now()}`, status });
  };

  const openEdit = (event) => {
    setEditing(event.id);
    setForm({
      id: event.id,
      title: event.title ?? "",
      date: event.date ? new Date(event.date).toISOString().slice(0, 10) : "",
      time: event.time ?? "",
      location: event.location ?? "",
      type: event.type ?? "Workshop",
      description: event.description ?? "",
      image: event.image ?? "",
      cta: event.cta ?? "Register",
      status: event.status ?? "upcoming",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        date: form.date ? new Date(form.date) : new Date(),
      };
      if (editing) {
        await dispatch(updateEventItem({ id: form.id, body: payload })).unwrap();
      } else {
        await dispatch(createEventItem(payload)).unwrap();
      }
      setEditing(null);
      setForm(emptyEvent);
      dispatch(fetchAllEvents());
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await dispatch(removeEvent(id)).unwrap();
      if (editing === id) setEditing(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-full flex-col bg-page-bg">
      <header className="shrink-0 border-b border-reiki-card-border bg-white/90 px-6 py-4 backdrop-blur-sm">
        <h1 className="text-2xl text-reiki-dark" style={{ fontFamily: "EB Garamond, serif" }}>Manage Events</h1>
        <p className="mt-1 text-sm text-reiki-muted">Add, edit, or remove upcoming and past events. Changes appear on the Events page.</p>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Upcoming events */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-reiki-dark">Upcoming events</h2>
              <button type="button" onClick={() => openNew("upcoming")} className="rounded-xl bg-reiki-olive px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
                Add event
              </button>
            </div>
            {loading ? (
              <p className="text-reiki-muted">Loading…</p>
            ) : (
              <ul className="space-y-2">
                {upcoming.map((event) => (
                  <li key={event.id} className="flex items-center justify-between rounded-xl border border-reiki-card-border bg-white px-4 py-3">
                    <div>
                      <span className="font-medium text-reiki-dark">{event.title}</span>
                      <span className="ml-2 text-xs text-reiki-muted">{formatEventDate(event.date)}</span>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => openEdit(event)} className="text-sm font-medium text-reiki-olive hover:underline">Edit</button>
                      <button type="button" onClick={() => handleDelete(event.id)} className="text-sm font-medium text-red-600 hover:underline">Delete</button>
                    </div>
                  </li>
                ))}
                {upcoming.length === 0 && <p className="text-reiki-muted">No upcoming events. Add one above.</p>}
              </ul>
            )}
          </section>

          {/* Divider */}
          <div className="flex items-center gap-4 py-2">
            <span className="h-px flex-1 bg-reiki-card-border" aria-hidden />
            <span className="font-lato text-sm font-semibold uppercase tracking-wider text-reiki-muted">Past events</span>
            <span className="h-px flex-1 bg-reiki-card-border" aria-hidden />
          </div>

          {/* Past events */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-reiki-dark">Past events</h2>
              <button type="button" onClick={() => openNew("past")} className="rounded-xl border border-reiki-card-border px-4 py-2 text-sm font-medium text-reiki-muted hover:bg-reiki-section">
                Add past event
              </button>
            </div>
            {loading ? (
              <p className="text-reiki-muted">Loading…</p>
            ) : (
              <ul className="space-y-2">
                {past.map((event) => (
                  <li key={event.id} className="flex items-center justify-between rounded-xl border border-reiki-card-border bg-white px-4 py-3">
                    <div>
                      <span className="font-medium text-reiki-dark">{event.title}</span>
                      <span className="ml-2 text-xs text-reiki-muted">{formatEventDate(event.date)}</span>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => openEdit(event)} className="text-sm font-medium text-reiki-olive hover:underline">Edit</button>
                      <button type="button" onClick={() => handleDelete(event.id)} className="text-sm font-medium text-red-600 hover:underline">Delete</button>
                    </div>
                  </li>
                ))}
                {past.length === 0 && <p className="text-reiki-muted">No past events yet.</p>}
              </ul>
            )}
          </section>

          {/* Form */}
          {(editing || form.id) && (
            <section className="rounded-3xl border border-reiki-card-border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-reiki-dark mb-4">{editing ? "Edit event" : "New event"}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-reiki-dark mb-1">Title *</label>
                  <input type="text" required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="w-full rounded-lg border border-reiki-card-border px-3 py-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-reiki-dark mb-1">Date *</label>
                    <input type="date" required value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} className="w-full rounded-lg border border-reiki-card-border px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-reiki-dark mb-1">Time</label>
                    <input type="text" value={form.time} onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))} placeholder="18:00" className="w-full rounded-lg border border-reiki-card-border px-3 py-2" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-reiki-dark mb-1">Location</label>
                  <input type="text" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} className="w-full rounded-lg border border-reiki-card-border px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-reiki-dark mb-1">Type</label>
                  <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} className="w-full rounded-lg border border-reiki-card-border px-3 py-2">
                    <option value="Workshop">Workshop</option>
                    <option value="Class">Class</option>
                    <option value="Talk">Talk</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-reiki-dark mb-1">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} className="w-full rounded-lg border border-reiki-card-border px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-reiki-dark mb-1">Image URL</label>
                  <input type="text" value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} placeholder="/slide2.JPG" className="w-full rounded-lg border border-reiki-card-border px-3 py-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-reiki-dark mb-1">CTA button text</label>
                    <input type="text" value={form.cta} onChange={(e) => setForm((f) => ({ ...f, cta: e.target.value }))} className="w-full rounded-lg border border-reiki-card-border px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-reiki-dark mb-1">Status</label>
                    <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className="w-full rounded-lg border border-reiki-card-border px-3 py-2">
                      <option value="upcoming">Upcoming</option>
                      <option value="past">Past</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button type="submit" disabled={saving} className="rounded-xl bg-reiki-olive px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50">
                    {saving ? "Saving…" : editing ? "Update event" : "Create event"}
                  </button>
                  <button type="button" onClick={() => { setEditing(null); setForm(emptyEvent); }} className="rounded-xl border border-reiki-card-border px-4 py-2 text-sm font-medium text-reiki-muted hover:bg-reiki-section">
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
