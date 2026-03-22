import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LotusSectionIcon from "../components/LotusSectionIcon";
import { getCurrentUser, registerForEvent } from "../api";
import { fetchAllEvents } from "../store/slices/eventsSlice";
import { selectUpcomingEvents, selectPastEvents, selectEventsLoading, selectEventsError } from "../store/slices/eventsSlice";
import { formatEventDate, formatEventDateShort } from "../utils/fallbacks";
import { isUserLoggedIn } from "../utils/userAuth";

const HERO_IMAGE = "/slide1.JPG";

function EventCardUpcoming({ event, index, onRegister, isRegistered }) {
  const contentOnRight = index % 2 === 1;
  return (
    <article className="group relative w-full min-h-[65vh] sm:min-h-[70vh] overflow-hidden rounded-3xl border border-reiki-card-border shadow-lg">
      <img src={event.image || "/slide2.JPG"} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      {contentOnRight ? (
        <div className="absolute inset-0 bg-gradient-to-l from-reiki-dark/88 via-reiki-dark/45 to-transparent" aria-hidden />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-reiki-dark/88 via-reiki-dark/45 to-transparent" aria-hidden />
      )}
      <div className={`absolute top-4 flex flex-col gap-2 z-10 ${contentOnRight ? "right-4 left-auto" : "left-4"}`}>
        <span className="rounded-full bg-white/95 px-3 py-1 font-lato text-[11px] font-semibold uppercase tracking-wider text-reiki-dark shadow">
          {event.type || "Event"}
        </span>
        <span className="inline-flex items-center rounded-full bg-reiki-dark/90 px-3 py-1.5 font-lato text-xs font-medium text-white shadow">
          {formatEventDateShort(event.date)}
          {event.time && <span className="ml-1.5 text-white/80">· {event.time}</span>}
        </span>
      </div>
      <div className={`absolute inset-0 flex items-end z-10 ${contentOnRight ? "justify-end" : "justify-start"}`}>
        <div className={`w-full max-w-xl p-6 sm:p-8 lg:p-10 ${contentOnRight ? "pr-6 sm:pr-8 lg:pr-12 text-right" : "pl-6 sm:pl-8 lg:pl-12"}`}>
          <p className="font-lato text-sm text-white/80">{formatEventDate(event.date)}</p>
          <h2 className="mt-2 font-garamond text-2xl text-white sm:text-3xl md:text-4xl leading-tight drop-shadow" style={{ fontFamily: "EB Garamond" }}>
            {event.title}
          </h2>
          <p className="mt-2 font-lato text-sm text-reiki-accent">{event.location}</p>
          <p className="mt-4 font-lato text-base text-white/90 leading-relaxed">{event.description}</p>
          <button
            type="button"
            onClick={() => onRegister(event)}
            disabled={isRegistered}
            className={`mt-6 inline-block rounded-lg bg-white px-8 py-3 font-sans text-sm font-semibold text-reiki-dark transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 ${contentOnRight ? "" : "ml-auto"}`}
          >
            {isRegistered ? "Registered" : event.cta || "Register"}
          </button>
        </div>
      </div>
    </article>
  );
}

function EventCardPast({ event }) {
  return (
    <article className="group relative isolate overflow-hidden rounded-3xl border border-reiki-card-border bg-white shadow-md transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
      <div className="relative h-72 sm:h-80 lg:h-96">
        <img src={event.image || "/slide5.JPG"} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-reiki-dark/90 via-reiki-dark/35 to-transparent" aria-hidden />
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/15 blur-xl" aria-hidden />
        <div className="absolute left-4 top-4 z-10 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/95 px-3 py-1 font-lato text-[11px] font-semibold uppercase tracking-wider text-reiki-dark shadow">
            {event.type || "Event"}
          </span>
          <span className="inline-flex items-center rounded-full bg-reiki-dark/90 px-3 py-1.5 font-lato text-xs font-medium text-white shadow">
            {formatEventDateShort(event.date)}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7">
          <h2 className="font-garamond text-3xl leading-tight text-white drop-shadow sm:text-4xl" style={{ fontFamily: "EB Garamond" }}>
            {event.title}
          </h2>
        </div>
      </div>
      <div className="p-6 sm:p-7">
        <span className="font-lato text-xs font-semibold uppercase tracking-wider text-reiki-muted">
            {formatEventDate(event.date)} · {event.type || "Event"}
        </span>
        <p className="mt-3 font-lato text-base leading-relaxed text-reiki-body">{event.description}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-reiki-olive">Memories</span>
          <span className="h-px w-20 bg-reiki-accent" />
        </div>
      </div>
    </article>
  );
}

export default function EventsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const upcoming = useSelector(selectUpcomingEvents);
  const past = useSelector(selectPastEvents);
  const loading = useSelector(selectEventsLoading);
  const error = useSelector(selectEventsError);
  const loggedIn = isUserLoggedIn();
  const [registeredEventDbIds, setRegisteredEventDbIds] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  useEffect(() => {
    if (!loggedIn) {
      setRegisteredEventDbIds([]);
      return;
    }
    let mounted = true;
    getCurrentUser()
      .then((response) => {
        if (!mounted) return;
        const userEvents = Array.isArray(response?.user?.events) ? response.user.events : [];
        setRegisteredEventDbIds(userEvents.map((event) => String(event._id)));
      })
      .catch(() => {
        if (mounted) setRegisteredEventDbIds([]);
      });
    return () => {
      mounted = false;
    };
  }, [loggedIn]);

  const registeredSet = useMemo(() => new Set(registeredEventDbIds), [registeredEventDbIds]);

  const handleRegisterClick = (event) => {
    if (!loggedIn) {
      navigate("/login");
      return;
    }
    setFeedback("");
    setSelectedEvent(event);
    setIsConfirmOpen(true);
  };

  const closeModal = () => {
    if (isSubmitting) return;
    setIsConfirmOpen(false);
    setSelectedEvent(null);
  };

  const confirmRegistration = async () => {
    if (!selectedEvent || isSubmitting) return;
    setIsSubmitting(true);
    setFeedback("");
    try {
      const response = await registerForEvent(selectedEvent.id);
      const userEvents = Array.isArray(response?.user?.events) ? response.user.events : [];
      setRegisteredEventDbIds(userEvents.map((event) => String(event._id)));
      setFeedback(response?.message || "Event registration successful");
      setIsConfirmOpen(false);
      setSelectedEvent(null);
    } catch (err) {
      let message = "Could not register for event";
      try {
        message = JSON.parse(err.message || "{}")?.message || message;
      } catch {
        if (err?.message) message = err.message;
      }
      setFeedback(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-page-bg">
      {error && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-sm text-amber-800 text-center">
          Could not load events. Showing cached or empty list.
        </div>
      )}
      <section className="relative min-h-[45vh] sm:min-h-[52vh] flex items-end justify-center overflow-hidden">
        <img src={HERO_IMAGE} alt="" className="absolute inset-0 h-full w-full object-cover object-top md:object-[50%_25%] scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-reiki-dark/20 via-reiki-dark/45 to-reiki-dark/75" aria-hidden />
        <div className="relative z-10 w-full max-w-7xl px-4 pb-14 pt-24 sm:pb-20 md:pb-24 text-center">
          <h1 className="mt-4 font-garamond text-4xl font-normal text-white sm:text-5xl md:text-6xl lg:text-7xl" style={{ fontFamily: "EB Garamond" }}>
            Events
          </h1>
          <p className="mt-4 font-lato text-base text-white/90 sm:text-lg max-w-xl mx-auto">
            Circles, workshops, and gatherings—in person and online
          </p>
        </div>
      </section>

      <section className="bg-reiki-bg-stripe border-y border-reiki-accent/40 py-8">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="font-serif text-lg italic text-reiki-quote sm:text-xl leading-relaxed" style={{ fontFamily: "Lora" }}>
            “Coming together in circle reminds us we are not alone on the path. Here you can learn, practice, and connect.”
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-14 md:py-20">
        <LotusSectionIcon />
        <div className="mx-auto max-w-6xl">
          <span className="font-lato text-xs font-semibold uppercase tracking-wider text-reiki-olive">What’s on</span>
          <h2 className="mt-2 font-garamond text-3xl text-reiki-dark sm:text-4xl md:text-5xl lg:text-6xl" style={{ fontFamily: "EB Garamond" }}>
            Upcoming <span className="text-reiki-olive">events</span>
          </h2>
          {loading ? (
            <p className="mt-8 font-lato text-reiki-body">Loading events…</p>
          ) : (
            <>
              <div className="mt-10 space-y-10">
                {upcoming.map((event, index) => (
                  <EventCardUpcoming
                    key={event.id}
                    event={event}
                    index={index}
                    onRegister={handleRegisterClick}
                    isRegistered={registeredSet.has(String(event._id))}
                  />
                ))}
              </div>
              {upcoming.length === 0 && (
                <p className="mt-8 font-lato text-reiki-body">
                  New events will be announced soon. Stay in touch via the newsletter or contact.
                </p>
              )}
            </>
          )}
        </div>
      </section>

      <section className="bg-reiki-bg-stripe border-y border-reiki-accent/40 py-10 md:py-14">
        <div className="mx-auto max-w-4xl px-4 flex flex-col items-center gap-3">
          <span className="text-reiki-olive text-xl" aria-hidden>◆</span>
          <p className="font-serif text-center text-lg italic text-reiki-quote sm:text-xl" style={{ fontFamily: "Lora" }}>
            Every gathering leaves a trace. Here are some we’ve shared.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 mb-10">
          <span className="font-lato text-xs font-semibold uppercase tracking-wider text-reiki-muted">Archive</span>
          <h2 className="mt-2 font-garamond text-3xl text-reiki-dark sm:text-4xl md:text-5xl lg:text-6xl" style={{ fontFamily: "EB Garamond" }}>
            Past <span className="text-reiki-olive">events</span>
          </h2>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 lg:grid-cols-2">
          {past.map((event, index) => (
            <div
              key={event.id}
              className={`${index % 2 === 0 ? "lg:translate-y-0" : "lg:translate-y-8"}`}
            >
              <EventCardPast event={event} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-reiki-bg-stripe border-t border-reiki-accent/40 px-4 py-14 md:py-18">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-garamond text-xl text-reiki-dark sm:text-2xl" style={{ fontFamily: "EB Garamond" }}>
            Stay in the <span className="text-reiki-olive">loop</span>
          </h2>
          <p className="mt-3 font-lato text-reiki-body">
            Get notified about new circles, workshops, and online events.
          </p>
          <Link to="/contact" className="mt-6 inline-block rounded-lg bg-reiki-dark px-8 py-3 font-sans text-sm font-semibold text-white transition hover:opacity-90">
            Get in touch
          </Link>
        </div>
      </section>
      {feedback ? (
        <div className="fixed bottom-5 right-5 z-40 rounded-lg bg-reiki-dark px-4 py-3 text-sm text-white shadow-lg">
          {feedback}
        </div>
      ) : null}
      {isConfirmOpen && selectedEvent ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-reiki-dark/55 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-xl text-reiki-dark" style={{ fontFamily: "EB Garamond" }}>
              Confirm Registration
            </h3>
            <p className="mt-2 text-sm text-reiki-body">
              Do you want to register for <span className="font-semibold text-reiki-dark">{selectedEvent.title}</span>?
            </p>
            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                disabled={isSubmitting}
                className="rounded-lg border border-reiki-card-border px-4 py-2 text-sm font-semibold text-reiki-dark disabled:opacity-70"
              >
                No
              </button>
              <button
                type="button"
                onClick={confirmRegistration}
                disabled={isSubmitting}
                className="rounded-lg bg-reiki-dark px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
              >
                {isSubmitting ? "Registering..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
