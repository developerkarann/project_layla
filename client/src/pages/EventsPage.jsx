import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LotusSectionIcon from "../components/LotusSectionIcon";
import { fetchAllEvents } from "../store/slices/eventsSlice";
import { selectUpcomingEvents, selectPastEvents, selectEventsLoading, selectEventsError } from "../store/slices/eventsSlice";
import { formatEventDate, formatEventDateShort } from "../utils/fallbacks";

const HERO_IMAGE = "/slide1.JPG";

function EventCardUpcoming({ event, index }) {
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
          <Link to="/contact" className={`mt-6 inline-block rounded-lg bg-white px-8 py-3 font-sans text-sm font-semibold text-reiki-dark transition hover:opacity-90 ${contentOnRight ? "" : "ml-auto"}`}>
            {event.cta || "Register"}
          </Link>
        </div>
      </div>
    </article>
  );
}

function EventCardPast({ event }) {
  return (
    <article className="relative w-full min-h-[100vh] overflow-hidden">
      <img src={event.image || "/slide5.JPG"} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-reiki-dark/92 via-reiki-dark/40 to-transparent" aria-hidden />
      <div className="absolute inset-0 flex items-end justify-center z-10 p-6 sm:p-8 lg:p-12 pb-16 sm:pb-20">
        <div className="w-full max-w-3xl text-center">
          <span className="font-lato text-base font-semibold uppercase tracking-wider text-white/80">
            {formatEventDate(event.date)} · {event.type || "Event"}
          </span>
          <h2 className="mt-3 font-garamond text-white leading-tight drop-shadow whitespace-nowrap text-base sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl" style={{ fontFamily: "EB Garamond" }}>
            {event.title}
          </h2>
          <p className="mt-6 font-lato text-xl text-white/90 leading-relaxed mx-auto">{event.description}</p>
        </div>
      </div>
    </article>
  );
}

export default function EventsPage() {
  const dispatch = useDispatch();
  const upcoming = useSelector(selectUpcomingEvents);
  const past = useSelector(selectPastEvents);
  const loading = useSelector(selectEventsLoading);
  const error = useSelector(selectEventsError);

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

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
                  <EventCardUpcoming key={event.id} event={event} index={index} />
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
        <div className="space-y-0">
          {past.map((event) => (
            <EventCardPast key={event.id} event={event} />
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
    </main>
  );
}
