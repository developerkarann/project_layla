import { Link } from "react-router-dom";
import { useState } from "react";

const MONTH = "February 2026";
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DATES = [null, null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
const TIME_SLOTS = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"];

export default function AvailabilityPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <main className="min-h-screen bg-page-bg">
      <section className="px-4 py-10 sm:py-14 md:py-18">
        <div className="mx-auto max-w-2xl">
          <p className="font-lato text-xs uppercase tracking-wider text-reiki-muted mb-2">Demo</p>
          <h1 className="font-garamond text-2xl text-reiki-dark sm:text-3xl" style={{ fontFamily: "EB Garamond" }}>
            Choose a time
          </h1>
          <p className="mt-2 font-lato text-sm text-reiki-body">
            Select a date and slot below. This is a demo and does not submit a real booking.
          </p>

          <div className="mt-8 rounded-2xl border border-reiki-card-border bg-white shadow-sm overflow-hidden">
            {/* Calendar widget */}
            <div className="p-6 sm:p-8 border-b border-reiki-card-border">
              <h2 className="font-lato text-sm font-semibold text-reiki-dark mb-4">Select date</h2>
              <p className="font-lato text-lg text-reiki-body mb-4">{MONTH}</p>
              <div className="grid grid-cols-7 gap-1 text-center">
                {DAYS.map((d) => (
                  <div key={d} className="font-lato text-xs font-medium text-reiki-muted py-2">
                    {d}
                  </div>
                ))}
                {DATES.map((d, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    className={`font-lato text-sm rounded-lg py-2 transition-colors ${
                      d === null
                        ? "invisible"
                        : selectedDate === d
                          ? "bg-reiki-dark text-white"
                          : "text-reiki-dark hover:bg-reiki-section"
                    }`}
                    disabled={!d}
                  >
                    {d ?? ""}
                  </button>
                ))}
              </div>
            </div>

            {/* Time slots */}
            <div className="p-6 sm:p-8">
              <h2 className="font-lato text-sm font-semibold text-reiki-dark mb-4">Select time</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`font-lato text-sm rounded-lg py-2.5 px-3 border transition-colors ${
                      selectedTime === slot
                        ? "border-reiki-olive bg-reiki-olive/10 text-reiki-dark"
                        : "border-reiki-card-border text-reiki-body hover:border-reiki-olive/50"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-6 sm:px-8 pb-6 sm:pb-8">
              <button
                type="button"
                disabled={!selectedDate || !selectedTime}
                className="w-full rounded-lg bg-reiki-dark py-3 font-lato text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedDate && selectedTime
                  ? `Confirm ${selectedDate} ${MONTH.split(" ")[0]} at ${selectedTime}`
                  : "Select date and time"}
              </button>
              <p className="mt-4 text-center font-lato text-xs text-reiki-muted">
                This is a demo. No booking will be made.
              </p>
            </div>
          </div>

          <p className="mt-6 text-center">
            <Link to="/contact" className="font-lato text-sm text-reiki-olive hover:underline">
              ← Back to contact
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
