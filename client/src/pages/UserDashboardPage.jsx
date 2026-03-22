import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../api";
import {
  clearUserProfile,
  clearUserToken,
  getUserProfile,
  isUserLoggedIn,
  setUserProfile,
} from "../utils/userAuth";
import { formatEventDate, formatEventDateShort } from "../utils/fallbacks";

function MembershipSticker() {
  return (
    <div className="relative h-36 w-36">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-reiki-accent to-reiki-section-alt shadow-md" />
      <svg viewBox="0 0 180 180" className="absolute inset-0 h-full w-full p-6 text-reiki-dark" fill="none">
        <circle cx="90" cy="90" r="42" stroke="currentColor" strokeWidth="4" opacity="0.7" />
        <path d="M90 40L101 74L136 74L108 95L118 128L90 108L62 128L72 95L44 74L79 74Z" fill="currentColor" opacity="0.22" />
      </svg>
    </div>
  );
}

function MembershipActiveSticker() {
  return (
    <div className="relative h-28 w-28">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-reiki-olive/30 to-reiki-accent shadow-md" />
      <svg viewBox="0 0 180 180" className="absolute inset-0 h-full w-full p-5 text-reiki-dark" fill="none">
        <circle cx="90" cy="90" r="40" stroke="currentColor" strokeWidth="4" opacity="0.5" />
        <path d="M90 35L101 70L138 70L108 92L120 127L90 105L60 127L72 92L42 70L79 70Z" fill="currentColor" opacity="0.25" />
        <path d="M72 93L85 106L108 82" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function EventCardUpcoming({ event, index }) {
  const contentOnRight = index % 2 === 1;
  return (
    <article className="group relative w-full min-h-[58vh] overflow-hidden rounded-3xl border border-reiki-card-border shadow-lg">
      <img src={event.image || "/slide2.JPG"} alt={event.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      {contentOnRight ? (
        <div className="absolute inset-0 bg-gradient-to-l from-reiki-dark/88 via-reiki-dark/45 to-transparent" aria-hidden />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-reiki-dark/88 via-reiki-dark/45 to-transparent" aria-hidden />
      )}
      <div className={`absolute top-4 z-10 flex flex-col gap-2 ${contentOnRight ? "right-4 left-auto" : "left-4"}`}>
        <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-reiki-dark shadow">
          {event.type || "Event"}
        </span>
        <span className="inline-flex items-center rounded-full bg-reiki-dark/90 px-3 py-1.5 text-xs font-medium text-white shadow">
          {formatEventDateShort(event.date)}
          {event.time && <span className="ml-1.5 text-white/80">· {event.time}</span>}
        </span>
      </div>
      <div className={`absolute inset-0 z-10 flex items-end ${contentOnRight ? "justify-end" : "justify-start"}`}>
        <div className={`w-full max-w-xl p-6 sm:p-8 ${contentOnRight ? "pr-6 sm:pr-8 text-right" : "pl-6 sm:pl-8"}`}>
          <p className="text-sm text-white/80">{formatEventDate(event.date)}</p>
          <h3 className="mt-2 text-2xl leading-tight text-white sm:text-3xl" style={{ fontFamily: "EB Garamond" }}>
            {event.title}
          </h3>
          <p className="mt-2 text-sm text-reiki-accent">{event.location}</p>
          <p className="mt-3 text-base text-white/90">{event.description}</p>
        </div>
      </div>
    </article>
  );
}

function EventCardPast({ event }) {
  return (
    <article className="group relative w-full min-h-[55vh] overflow-hidden rounded-3xl border border-reiki-card-border shadow-lg">
      <img src={event.image || "/slide5.JPG"} alt={event.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-reiki-dark/92 via-reiki-dark/40 to-transparent" aria-hidden />
      <div className="absolute inset-0 z-10 flex items-end justify-center p-6 sm:p-8">
        <div className="w-full max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
            {formatEventDate(event.date)} · {event.type || "Event"}
          </span>
          <h3 className="mt-3 text-3xl leading-tight text-white sm:text-4xl" style={{ fontFamily: "EB Garamond" }}>
            {event.title}
          </h3>
          <p className="mt-4 text-base text-white/90">{event.description}</p>
        </div>
      </div>
    </article>
  );
}

export default function UserDashboardPage() {
  const navigate = useNavigate();
  const loggedIn = isUserLoggedIn();
  const fallbackProfile = {
    name: "Guest User",
    email: "guest@example.com",
    phoneNo: "+1 234 567 8900",
  };
  const initialProfile = getUserProfile() ?? fallbackProfile;
  const [name, setName] = useState(initialProfile.name);
  const [email, setEmail] = useState(initialProfile.email);
  const [phoneNo, setPhoneNo] = useState(initialProfile.phone || initialProfile.phoneNo || "");
  const [password, setPassword] = useState("");
  const [membershipPlan, setMembershipPlan] = useState(null);
  const [events, setEvents] = useState([]);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const welcomeName = useMemo(() => name?.trim() || "Seeker", [name]);
  const bookedUpcoming = useMemo(
    () => events.filter((event) => event?.status === "upcoming").slice(0, 2),
    [events]
  );
  const bookedPast = useMemo(
    () => events.filter((event) => event?.status === "past").slice(0, 2),
    [events]
  );

  useEffect(() => {
    if (!loggedIn) {
      setLoading(false);
      return;
    }
    let mounted = true;
    async function loadCurrentUser() {
      try {
        const response = await getCurrentUser();
        const user = response?.user;
        if (!mounted || !user) return;
        setName(user.name || "");
        setEmail(user.email || "");
        setPhoneNo(user.phone || "");
        setUserProfile(user);
        setEvents(Array.isArray(user.events) ? user.events : []);
        const tier = user.membership?.membershipTier;
        const hasMembership = user.hasMembership && tier;
        setMembershipPlan(
          hasMembership
            ? {
                name: tier.name || "Membership",
                status: "Active",
                renewalDate: user.membership?.expiryDate,
                price: tier.price,
                period: tier.period || "month",
                tagline: tier.tagline || "",
                benefits: Array.isArray(tier.features) ? tier.features.slice(0, 3) : [],
              }
            : null
        );
      } catch {
        clearUserToken();
        clearUserProfile();
        navigate("/login");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadCurrentUser();
    return () => {
      mounted = false;
    };
  }, [loggedIn, navigate]);

  if (!loggedIn) {
    return (
      <main className="px-4 py-16">
        <section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 rounded-3xl border border-reiki-card-border bg-white p-10 text-center shadow-lg">
          <h1 className="font-script text-4xl text-reiki-dark">My Account</h1>
          <p className="text-reiki-muted">Please login first to access your dashboard.</p>
          <Link to="/login" className="rounded-xl bg-reiki-dark px-5 py-3 font-semibold text-white">
            Go to Login
          </Link>
        </section>
      </main>
    );
  }

  const saveProfile = (e) => {
    e.preventDefault();
    setUserProfile({ name, email, phone: phoneNo });
    setIsProfileModalOpen(false);
  };

  const logout = () => {
    logoutUser().catch(() => null).finally(() => {
      clearUserToken();
      clearUserProfile();
      navigate("/login");
    });
  };

  if (loading) {
    return (
      <main className="px-4 py-16">
        <section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 rounded-3xl border border-reiki-card-border bg-white p-10 text-center shadow-lg">
          <h1 className="font-script text-4xl text-reiki-dark">My Account</h1>
          <p className="text-reiki-muted">Loading your dashboard...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-gradient-to-b from-page-bg via-reiki-section-alt/20 to-page-bg px-4 py-10 sm:py-14">
      <section className="mx-auto w-full max-w-7xl space-y-8">
        <div className="rounded-3xl border border-reiki-card-border bg-white p-6 shadow-xl sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-reiki-muted">My Sacred Space</p>
              <h1 className="font-script text-4xl text-reiki-dark sm:text-5xl">Welcome, {welcomeName}</h1>
              <p className="mt-3 max-w-2xl text-reiki-body">
                Your dashboard keeps your journey in one place with your events, membership updates, and profile details.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(true)}
                  className="rounded-xl bg-reiki-dark px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Edit Profile
                </button>
                <Link
                  to="/events"
                  className="rounded-xl border border-reiki-dark/20 px-5 py-2.5 text-sm font-semibold text-reiki-dark transition hover:bg-reiki-dark hover:text-white"
                >
                  Explore More Events
                </Link>
              </div>
            </div>
            <div className="flex items-start justify-end gap-3">
              <button
                type="button"
                onClick={logout}
                className="rounded-xl border border-reiki-dark/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-reiki-dark transition hover:bg-reiki-dark hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <section className="rounded-3xl border border-reiki-card-border bg-white p-6 shadow-lg sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-reiki-olive">Booked Journey</span>
              <h2 className="mt-2 text-3xl text-reiki-dark sm:text-4xl" style={{ fontFamily: "EB Garamond" }}>
                Upcoming Events
              </h2>
            </div>
          </div>
          <div className="space-y-8">
            {bookedUpcoming.length ? (
              bookedUpcoming.map((event, index) => (
                <EventCardUpcoming key={event._id || event.id} event={event} index={index} />
              ))
            ) : (
              <p className="text-reiki-muted">No upcoming events booked yet.</p>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-reiki-card-border bg-white p-6 shadow-lg sm:p-8">
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-reiki-muted">Archive</span>
            <h2 className="mt-2 text-3xl text-reiki-dark sm:text-4xl" style={{ fontFamily: "EB Garamond" }}>
              Past Events
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {bookedPast.length ? (
              bookedPast.map((event) => <EventCardPast key={event._id || event.id} event={event} />)
            ) : (
              <p className="text-reiki-muted">No past events yet.</p>
            )}
          </div>
        </section>

        <section className="grid gap-8">
          <article className="rounded-3xl border border-reiki-card-border bg-white p-6 shadow-lg sm:p-8">
            <h2 className="font-serif text-2xl text-reiki-dark">Membership</h2>
            {membershipPlan ? (
              <div className="mt-5 rounded-2xl bg-gradient-to-br from-reiki-section to-reiki-section-alt p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-reiki-muted">Current Plan</p>
                    <p className="mt-1 text-2xl font-semibold text-reiki-dark">{membershipPlan.name}</p>
                    <p className="mt-1 text-sm text-reiki-olive">
                      ${membershipPlan.price}/{membershipPlan.period}
                    </p>
                    {membershipPlan.tagline && <p className="mt-1 text-sm text-reiki-body">{membershipPlan.tagline}</p>}
                    <span className="mt-2 inline-flex rounded-full bg-reiki-dark px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                      {membershipPlan.status}
                    </span>
                  </div>
                  <MembershipActiveSticker />
                </div>
                <div className="mt-5 grid gap-4 rounded-xl bg-white/80 p-4 md:grid-cols-[1.2fr_1fr]">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-reiki-muted">Your practice vibe</p>
                    <p className="mt-2 text-sm text-reiki-body">
                      You are in a steady-growth phase. Continue with guided sessions this week to deepen clarity and calm.
                    </p>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-reiki-dark/15 bg-white px-3 py-1 text-xs font-semibold text-reiki-dark">
                      <span className="h-2 w-2 rounded-full bg-reiki-olive" />
                      Aligned and progressing
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl border border-reiki-card-border">
                    <img src="/yoga.JPG" alt="Yoga practice" className="h-36 w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-reiki-dark/55 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-reiki-dark">
                      Mindful flow
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-reiki-muted">Member Benefits</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {membershipPlan.benefits.map((benefit) => (
                      <span key={benefit} className="rounded-full border border-reiki-dark/15 bg-white px-3 py-1 text-xs font-semibold text-reiki-dark">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-sm text-reiki-body">Next renewal: {formatEventDate(membershipPlan.renewalDate)}</p>
              </div>
            ) : (
              <div className="mt-5 flex flex-col items-center rounded-2xl bg-reiki-bg-stripe p-6 text-center">
                <MembershipSticker />
                <p className="mt-3 text-2xl text-reiki-dark" style={{ fontFamily: "EB Garamond" }}>You are one step away from deeper healing.</p>
                <p className="mt-2 max-w-lg text-sm text-reiki-muted">Unlock member-only circles, private community guidance, and early booking windows for your next sessions.</p>
                <Link to="/membership" className="mt-5 rounded-xl bg-reiki-olive px-5 py-2.5 text-sm font-semibold text-white">
                  Buy Membership
                </Link>
              </div>
            )}
          </article>
        </section>

        <section className="rounded-3xl border border-reiki-card-border bg-white p-6 shadow-lg sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl text-reiki-dark" style={{ fontFamily: "EB Garamond" }}>
              Profile Details
            </h2>
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(true)}
              className="rounded-xl border border-reiki-dark/20 px-4 py-2 text-sm font-semibold text-reiki-dark transition hover:bg-reiki-dark hover:text-white"
            >
              Open Edit Modal
            </button>
          </div>
          <form onSubmit={saveProfile} className="mt-5 grid gap-4 md:grid-cols-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="rounded-xl border border-reiki-card-border bg-page-bg/60 px-4 py-3 text-reiki-dark focus:border-reiki-olive focus:outline-none focus:ring-2 focus:ring-reiki-olive/25"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="rounded-xl border border-reiki-card-border bg-page-bg/60 px-4 py-3 text-reiki-dark focus:border-reiki-olive focus:outline-none focus:ring-2 focus:ring-reiki-olive/25"
              required
            />
            <input
              type="tel"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              placeholder="Phone No"
              className="rounded-xl border border-reiki-card-border bg-page-bg/60 px-4 py-3 text-reiki-dark focus:border-reiki-olive focus:outline-none focus:ring-2 focus:ring-reiki-olive/25"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="rounded-xl border border-reiki-card-border bg-page-bg/60 px-4 py-3 text-reiki-dark focus:border-reiki-olive focus:outline-none focus:ring-2 focus:ring-reiki-olive/25"
            />
            <button
              type="submit"
              className="rounded-xl bg-reiki-dark px-4 py-3 font-semibold text-white transition hover:opacity-90 md:col-span-2"
            >
              Save Profile
            </button>
          </form>
        </section>
      </section>

      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-reiki-dark/55 px-4 py-8">
          <div className="relative w-full max-w-lg rounded-3xl border border-reiki-card-border bg-white p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute right-4 top-4 rounded-full border border-reiki-dark/20 px-2.5 py-1 text-sm font-semibold text-reiki-dark hover:bg-reiki-dark hover:text-white"
            >
              X
            </button>
            <h3 className="text-3xl text-reiki-dark" style={{ fontFamily: "EB Garamond" }}>
              Edit Profile
            </h3>
            <p className="mt-2 text-sm text-reiki-muted">Update your account details and save.</p>
            <form onSubmit={saveProfile} className="mt-6 space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full rounded-xl border border-reiki-card-border bg-page-bg/60 px-4 py-3 text-reiki-dark focus:border-reiki-olive focus:outline-none focus:ring-2 focus:ring-reiki-olive/25"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full rounded-xl border border-reiki-card-border bg-page-bg/60 px-4 py-3 text-reiki-dark focus:border-reiki-olive focus:outline-none focus:ring-2 focus:ring-reiki-olive/25"
                required
              />
              <input
                type="tel"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                placeholder="Phone No"
                className="w-full rounded-xl border border-reiki-card-border bg-page-bg/60 px-4 py-3 text-reiki-dark focus:border-reiki-olive focus:outline-none focus:ring-2 focus:ring-reiki-olive/25"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-xl border border-reiki-card-border bg-page-bg/60 px-4 py-3 text-reiki-dark focus:border-reiki-olive focus:outline-none focus:ring-2 focus:ring-reiki-olive/25"
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-reiki-dark px-4 py-3 font-semibold text-white transition hover:opacity-90"
              >
                Save Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
