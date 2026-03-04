import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LotusSectionIcon from "../components/LotusSectionIcon";
import { fetchMembershipData } from "../store/slices/membershipSlice";
import {
  selectMembershipTiers,
  selectHealingSpaceItems,
  selectMembershipProducts,
  selectMembershipLoading,
  selectMembershipError,
} from "../store/slices/membershipSlice";

const HERO_IMAGE = "/awaken-final.jpg";

function CheckIcon() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-reiki-benefit-icon" aria-hidden>
      <svg viewBox="0 0 24 24" className="h-3 w-3 text-reiki-dark" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}

export default function MembershipPage() {
  const dispatch = useDispatch();
  const tiers = useSelector(selectMembershipTiers);
  const healingSpace = useSelector(selectHealingSpaceItems);
  const products = useSelector(selectMembershipProducts);
  const loading = useSelector(selectMembershipLoading);
  const error = useSelector(selectMembershipError);

  useEffect(() => {
    dispatch(fetchMembershipData());
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-page-bg">
      {error && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-sm text-amber-800 text-center">
          Could not load membership data. Showing cached or empty list.
        </div>
      )}
      <section className="relative min-h-[50vh] sm:min-h-[58vh] flex items-end justify-center overflow-hidden">
        <img src={HERO_IMAGE} alt="" className="absolute inset-0 h-full w-full object-cover object-top md:object-[50%_25%] scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-reiki-dark/25 via-reiki-dark/50 to-reiki-dark/80" aria-hidden />
        <div className="relative z-10 w-full max-w-7xl px-4 pb-16 pt-24 sm:pb-20 md:pb-24 text-center">
          <h1 className="mt-4 font-garamond text-4xl font-normal text-white sm:text-5xl md:text-6xl lg:text-7xl" style={{ fontFamily: "EB Garamond" }}>
            Membership
          </h1>
          <p className="mt-4 font-lato text-base text-white/90 sm:text-lg md:text-xl max-w-2xl mx-auto">
            The Healing Space—meditations, music, rituals, and podcasts. Grow at your own pace with tiered access.
          </p>
        </div>
      </section>

      <section className="bg-reiki-bg-stripe border-y border-reiki-accent/40 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="font-serif text-lg italic text-reiki-quote sm:text-xl md:text-2xl leading-relaxed" style={{ fontFamily: "Lora" }}>
            “A space where you can return again and again—for a few minutes of stillness or a deeper dive into practice. No pressure, only presence.”
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-14 md:py-20">
        <LotusSectionIcon />
        <div className="mx-auto max-w-6xl">
          <span className="font-lato text-xs font-semibold uppercase tracking-wider text-reiki-olive">The Healing Space</span>
          <h2 className="mt-2 font-garamond text-2xl text-reiki-dark sm:text-3xl md:text-4xl" style={{ fontFamily: "EB Garamond" }}>
            What’s inside
          </h2>
          <p className="mt-4 font-lato text-reiki-body max-w-2xl">
            Content is being created from April to August. The space will include:
          </p>
          {loading ? (
            <p className="mt-8 font-lato text-reiki-body">Loading…</p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {healingSpace.map((item) => (
                <div key={item.id} className="rounded-2xl border border-reiki-card-border bg-reiki-section p-6 shadow-sm transition hover:border-reiki-olive/40">
                  <span className="rounded-full border border-reiki-olive/40 bg-reiki-olive/10 px-3 py-1 font-lato text-xs font-semibold uppercase tracking-wider text-reiki-dark">
                    {item.type || "Content"}
                  </span>
                  <h3 className="mt-4 font-garamond text-xl text-reiki-dark" style={{ fontFamily: "EB Garamond" }}>{item.title}</h3>
                  <p className="mt-2 font-lato text-sm text-reiki-body leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-reiki-bg-stripe px-4 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <span className="font-lato text-xs font-semibold uppercase tracking-wider text-reiki-muted">Clear progression</span>
          <h2 className="mt-2 font-garamond text-2xl text-reiki-dark sm:text-3xl md:text-4xl text-center" style={{ fontFamily: "EB Garamond" }}>
            Tiered <span className="text-reiki-olive">membership</span>
          </h2>
          <p className="mt-4 font-lato text-reiki-body text-center max-w-2xl mx-auto">
            Choose the level that fits your practice. Upgrade or downgrade anytime.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative flex flex-col rounded-2xl border-2 bg-reiki-section p-6 shadow-sm transition-all hover:shadow-md md:p-8 ${
                  tier.highlighted ? "border-reiki-olive bg-reiki-section-alt shadow-md ring-2 ring-reiki-olive/30" : "border-reiki-card-border"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-reiki-olive px-4 py-1 font-lato text-xs font-semibold uppercase tracking-wider text-white">
                    Most popular
                  </span>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="font-garamond text-4xl text-reiki-dark" style={{ fontFamily: "EB Garamond" }}>${tier.price}</span>
                  <span className="font-lato text-reiki-muted">/{tier.period || "month"}</span>
                </div>
                <h3 className="mt-2 font-garamond text-xl text-reiki-dark sm:text-2xl" style={{ fontFamily: "EB Garamond" }}>{tier.name}</h3>
                <p className="mt-1 font-lato text-sm font-medium text-reiki-olive">{tier.tagline}</p>
                <p className="mt-4 font-lato text-sm text-reiki-body leading-relaxed">{tier.description}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {(tier.features || []).map((f, i) => (
                    <li key={i} className="flex gap-3">
                      <CheckIcon />
                      <span className="font-lato text-sm text-reiki-dark">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`mt-8 block w-full rounded-lg py-3 text-center font-sans text-sm font-semibold transition ${
                    tier.highlighted ? "bg-reiki-dark text-white hover:opacity-90" : "border-2 border-reiki-dark text-reiki-dark hover:bg-reiki-dark hover:text-white"
                  }`}
                >
                  {tier.cta || "Join"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 md:py-20">
        <LotusSectionIcon />
        <div className="mx-auto max-w-5xl">
          <span className="font-lato text-xs font-semibold uppercase tracking-wider text-reiki-muted">One-time purchase</span>
          <h2 className="mt-2 font-garamond text-2xl text-reiki-dark sm:text-3xl md:text-4xl" style={{ fontFamily: "EB Garamond" }}>
            Individual <span className="text-reiki-olive">products</span>
          </h2>
          <p className="mt-4 font-lato text-reiki-body max-w-2xl">
            Prefer to buy single items? Audio and video courses will be available without a membership.
          </p>
          <div className="mt-10 space-y-6">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col gap-4 rounded-2xl border border-reiki-card-border bg-reiki-section p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="rounded-full border border-reiki-card-border bg-white px-3 py-1 font-lato text-xs font-medium text-reiki-muted">{product.type || "Product"}</span>
                  <h3 className="mt-2 font-garamond text-lg text-reiki-dark sm:text-xl" style={{ fontFamily: "EB Garamond" }}>{product.title}</h3>
                  <p className="mt-1 font-lato text-sm text-reiki-body">{product.description}</p>
                  {product.priceLabel && <p className="mt-2 font-lato text-xs font-semibold text-reiki-olive">{product.priceLabel}</p>}
                </div>
                <Link to="/contact" className="shrink-0 self-start rounded-lg border-2 border-reiki-dark px-6 py-2.5 font-sans text-sm font-semibold text-reiki-dark transition hover:bg-reiki-dark hover:text-white sm:self-center">
                  Inquire
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-reiki-bg-stripe border-t border-reiki-accent/40 px-4 py-14 md:py-18">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-serif text-lg italic text-reiki-quote sm:text-xl" style={{ fontFamily: "Lora" }}>
            “The Healing Space will meet you where you are. Questions? Let’s talk.”
          </p>
          <Link to="/contact" className="mt-8 inline-block rounded-lg bg-reiki-dark px-10 py-4 font-sans text-sm font-semibold text-white transition hover:opacity-90">
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}
