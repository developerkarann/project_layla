import { useEffect } from "react";

export default function AdminModal({ open, title, onClose, children, maxWidthClass = "max-w-3xl" }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div className={`relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-3xl border border-reiki-card-border bg-white p-6 shadow-xl ${maxWidthClass}`}>
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-reiki-dark">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-reiki-card-border px-3 py-1 text-sm font-medium text-reiki-muted hover:bg-reiki-section"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
