# Backend & Database Architecture

This document describes the Express + MongoDB backend used to serve all website content dynamically. The design is aligned with the existing admin panel (page/section editing) and with all current pages: Home, About, Services, Gallery, Blog, Contact, Availability, and site-wide Header/Footer.

---

## 1. High-Level Structure

```
server/
├── app.js                 # Entry: connect DB, mount routes, error handling
├── config/
│   └── db.js              # MongoDB connection (Mongoose)
├── models/                # Mongoose schemas (collections)
│   ├── ContentSection.js
│   ├── Service.js
│   ├── BlogPost.js
│   ├── GalleryGroup.js
│   ├── AboutContent.js
│   ├── ContactContent.js
│   ├── SiteSetting.js
│   ├── Event.js
│   ├── MembershipTier.js
│   ├── HealingSpaceItem.js
│   ├── MembershipProduct.js
│   └── MembershipMeta.js
├── routes/
│   ├── index.js           # Mounts all API routes under /api
│   ├── content.routes.js  # Page sections (admin + public)
│   ├── services.routes.js
│   ├── blog.routes.js
│   ├── gallery.routes.js
│   ├── about.routes.js
│   ├── contact.routes.js
│   ├── settings.routes.js
│   ├── events.routes.js
│   └── membership.routes.js
├── controllers/
│   ├── content.controller.js
│   ├── services.controller.js
│   ├── blog.controller.js
│   ├── gallery.controller.js
│   ├── about.controller.js
│   ├── contact.controller.js
│   ├── settings.controller.js
│   ├── events.controller.js
│   └── membership.controller.js
├── middleware/
│   ├── errorHandler.js
│   └── notFound.js
└── package.json
```

---

## 2. MongoDB Collections & Schemas

### 2.1 ContentSection

**Collection:** `contentsections`

Stores editable content for each **page section** (hero, intro, testimonial, etc.). Used by the admin panel and by the frontend to render Home page sections and any other page that uses the same “fields + optional images” pattern.

| Field     | Type     | Description |
|----------|----------|-------------|
| pageSlug | String   | Page identifier: `home`, `about`, `services`, `gallery`, `blog`, `contact`, `availability`, `global`. Required. |
| sectionKey | String | Section identifier: e.g. `hero-slider`, `holistic-healing-intro`, `hero`, `intro`. Required. |
| fields   | Array    | List of `{ id, label?, type, value }`. `type`: `text` \| `textarea`. |
| images   | Array    | Optional. List of `{ id, url, alt }`. |
| updatedAt | Date   | Set on each update. |

---

### 2.2 Service

**Collection:** `services`

One document per service (e.g. Shamanic Healing, TCK Holistic Coaching, Vitality Qigong). Drives the Services page.

| Field          | Type     | Description |
|----------------|----------|-------------|
| order          | Number   | Display order (1, 2, 3). Required. |
| id             | String   | Slug for anchor, e.g. `shamanic-healing`. Required. |
| title          | String   | Required. |
| tagline         | String   | Short line under title. |
| image          | String   | Main image URL. |
| imageSecondary | String   | Optional second image URL. |
| imageAlt       | String   | Alt text for main image. |
| keyPoints      | [String] | Bullet list. |
| offerings      | [String] | List of offerings. |
| description    | String   | Main body. |
| whoItsFor      | String   | “Who it’s for” paragraph. |
| quote          | String   | Optional quote. |
| isActive       | Boolean  | If false, hide from public list. Default true. |
| updatedAt      | Date     | Auto. |

---

### 2.3 BlogPost

**Collection:** `blogposts`

Blog entries for Blog listing and Blog detail page.

| Field      | Type     | Description |
|------------|----------|-------------|
| slug       | String   | URL slug. Required. |
| title      | String   | Required. |
| excerpt    | String   | Short summary. |
| image      | String   | Featured image URL. |
| publishedAt | Date   | Publication date. |
| author     | String   | e.g. "Layla". |
| category   | String   | e.g. "Mindfulness", "Reiki". |
| body       | [String] | Array of paragraphs (or single rich-text string if you prefer). |
| isPublished | Boolean | If false, exclude from public API. Default true. |
| updatedAt  | Date    | Auto. |

---

### 2.4 GalleryGroup

**Collection:** `gallerygroups`

Gallery is organized by groups (e.g. Healing Spaces, Nature & Stillness, Practice & Presence). Each group has a list of images.

| Field   | Type   | Description |
|---------|--------|-------------|
| key     | String | Key: `healing-spaces`, `nature-stillness`, `practice-presence`. Required. |
| title   | String | Section title. |
| images  | Array  | `[{ src, alt, order }]`. `order` for sorting. |
| updatedAt | Date | Auto. |

---

### 2.5 AboutContent

**Collection:** `aboutcontents` (single-doc pattern: one document for the whole About page)

| Field            | Type     | Description |
|------------------|----------|-------------|
| name             | String   | e.g. "Layla". |
| tagline          | String   | Hero tagline. |
| introTitle       | String   | e.g. "Hi, my name is Layla". |
| introParagraphs  | [String] | Intro text blocks. |
| mission          | Object   | `{ title, quote, body }`. |
| approach         | Object   | `{ title, body }`. |
| awaken           | Object   | `{ title, paragraphs[], closing }`. |
| vision           | String   | Single paragraph. |
| trainings        | [String] | List of training items. |
| values           | Array    | `[{ title, text }]`. |
| testimonial      | Object   | `{ quote, attribution }`. |
| journey          | Array    | `[{ year, title, text }]`. |
| updatedAt        | Date     | Auto. |

---

### 2.6 ContactContent

**Collection:** `contactcontents` (single-doc pattern)

| Field            | Type   | Description |
|------------------|--------|-------------|
| contactMethods   | Array  | `[{ title, description, value, href?, iconKey }]`. |
| interestOptions  | [String] | Form dropdown options. |
| faq              | Array  | `[{ q, a }]`. |
| officeHours      | Array  | `[{ day, time }]`. |
| updatedAt        | Date   | Auto. |

---

### 2.7 SiteSetting

**Collection:** `sitesettings`

Key-value store for global and miscellaneous content: header, footer, availability text, nav links, social links, etc. Easy to extend.

| Field   | Type   | Description |
|---------|--------|-------------|
| key     | String | Unique: `header`, `footer`, `availability`, `navLinks`, `socialLinks`, etc. |
| value   | Mixed  | JSON object or array. Structure per key (see below). |
| updatedAt | Date | Auto. |

**Example keys and value shape:**

- **header:** `{ siteName, tagline, logoUrl?, phone?, ctaLabel? }`
- **footer:** `{ siteName, visionText, links[], contactAddress?, contactEmail?, contactPhone?, socialLinks[], copyrightText? }`
- **availability:** `{ pageTitle?, introText?, monthLabel?, timeSlots[]? }` (for demo or config)
- **navLinks:** `[{ label, to }]` (optional; can stay in frontend if not edited in admin)

---

## 3. API Overview

Base path: **`/api`**

All responses use JSON. Use appropriate HTTP status codes (200, 201, 400, 404, 500).

### 3.1 Content sections (page/section)

| Method | Path | Description |
|--------|------|-------------|
| GET    | `/content/pages` | List known page slugs (or return from config). |
| GET    | `/content/:pageSlug/sections` | All sections for a page (for public or admin). |
| GET    | `/content/:pageSlug/sections/:sectionKey` | Single section (admin load / public). |
| PUT    | `/content/:pageSlug/sections/:sectionKey` | Create or update section (admin). Body: `{ fields, images? }`. |

### 3.2 Services

| Method | Path | Description |
|--------|------|-------------|
| GET    | `/services` | List active services (ordered). |
| GET    | `/services/:id` | One service by `id` (slug). |
| POST   | `/services` | Create (admin). |
| PUT    | `/services/:id` | Update (admin). |
| DELETE | `/services/:id` | Delete (admin). |

### 3.3 Blog

| Method | Path | Description |
|--------|------|-------------|
| GET    | `/blog` | List published posts (optional query: `?published=true`). |
| GET    | `/blog/categories` | Unique categories (for filters). |
| GET    | `/blog/:slug` | Single post by slug. |
| POST   | `/blog` | Create (admin). |
| PUT    | `/blog/:slug` | Update (admin). |
| DELETE | `/blog/:slug` | Delete (admin). |

### 3.4 Gallery

| Method | Path | Description |
|--------|------|-------------|
| GET    | `/gallery/groups` | All gallery groups with images. |
| GET    | `/gallery/groups/:key` | One group. |
| PUT    | `/gallery/groups/:key` | Create or update group (admin). Body: `{ title?, images }`. |

### 3.5 About

| Method | Path | Description |
|--------|------|-------------|
| GET    | `/about` | Single about document (public). |
| PUT    | `/about` | Replace about content (admin). |

### 3.6 Contact

| Method | Path | Description |
|--------|------|-------------|
| GET    | `/contact` | Single contact document (public). |
| PUT    | `/contact` | Replace contact content (admin). |

### 3.7 Settings

| Method | Path | Description |
|--------|------|-------------|
| GET    | `/settings` | All settings (or list of keys). |
| GET    | `/settings/:key` | One setting by key. |
| PUT    | `/settings/:key` | Set/update (admin). Body: `{ value }`. |

### 3.8 Events

| Method | Path | Description |
|--------|------|-------------|
| GET    | `/events` | All events (optional `?status=upcoming` or `?status=past`). |
| GET    | `/events/upcoming` | Upcoming events only (sorted by date). |
| GET    | `/events/past` | Past events only (sorted by date desc). |
| GET    | `/events/:id` | One event by `id`. |
| POST   | `/events` | Create (admin). |
| PUT    | `/events/:id` | Update (admin). |
| DELETE | `/events/:id` | Delete (admin). |

Section titles and copy for the Events page: `GET/PUT /api/content/events/sections/:sectionKey` (hero, intro-quote, upcoming, divider, past, cta).

### 3.9 Membership

| Method | Path | Description |
|--------|------|-------------|
| GET    | `/membership/tiers` | List membership tiers. |
| GET    | `/membership/tiers/:id` | One tier. |
| POST   | `/membership/tiers` | Create tier (admin). |
| PUT    | `/membership/tiers/:id` | Update tier (admin). |
| DELETE | `/membership/tiers/:id` | Delete tier (admin). |
| GET    | `/membership/healing-space` | List healing space items. |
| GET    | `/membership/healing-space/:id` | One item. |
| POST   | `/membership/healing-space` | Create (admin). |
| PUT    | `/membership/healing-space/:id` | Update (admin). |
| DELETE | `/membership/healing-space/:id` | Delete (admin). |
| GET    | `/membership/products` | List individual products. |
| GET    | `/membership/products/:id` | One product. |
| POST   | `/membership/products` | Create (admin). |
| PUT    | `/membership/products/:id` | Update (admin). |
| DELETE | `/membership/products/:id` | Delete (admin). |
| GET    | `/membership/meta` | Tech & hosting + features (single doc). |
| PUT    | `/membership/meta` | Update (admin). |

Section titles and copy for the Membership page: `GET/PUT /api/content/membership/sections/:sectionKey` (hero, intro-quote, healing-space, tiers, products, cta).

---

## 4. Frontend Usage (Summary)

- **Home / section-based pages:** Fetch `GET /api/content/:pageSlug/sections` (or per section) and map response to existing section components (fields + images).
- **Admin panel:** Load section with `GET /api/content/:pageSlug/sections/:sectionKey`, update with `PUT /api/content/:pageSlug/sections/:sectionKey`.
- **About page:** `GET /api/about` and replace `aboutData.js` with API data.
- **Services page:** `GET /api/services` and replace `servicesData.js`.
- **Blog:** `GET /api/blog`, `GET /api/blog/:slug`, `GET /api/blog/categories`; replace `blogPosts.js`.
- **Gallery:** `GET /api/gallery/groups`; replace inline arrays in GalleryPage.
- **Contact:** `GET /api/contact`; replace CONTACT_METHODS, FAQ_ITEMS, etc.
- **Header / Footer:** `GET /api/settings/header`, `GET /api/settings/footer` (or single `GET /api/settings` and pick keys).
- **Events page:** `GET /api/events/upcoming`, `GET /api/events/past`; section titles/copy from `GET /api/content/events/sections`.
- **Membership page:** `GET /api/membership/tiers`, `GET /api/membership/healing-space`, `GET /api/membership/products`; section titles/copy from `GET /api/content/membership/sections`.

---

## 5. Scalability & Conventions

- **Validation:** Validate required fields and types in controllers or with Mongoose schema validators; return 400 with clear messages.
- **Idempotent PUT:** Use “upsert” for section, about, contact, settings (create if not exists, else update).
- **Image uploads:** Not implemented in this phase; store image URLs (or paths) in the above models. Add a separate `/api/upload` and link uploaded file URL into fields/images when you implement file upload.
- **Auth:** Admin routes can be protected later with a simple auth middleware (e.g. JWT or session); for now all endpoints are open for prototype.
- **Env:** Use `process.env.MONGODB_URI` and `process.env.PORT`; keep defaults in `config/db.js` and `app.js` for local dev.

---

## 6. Seeding (Optional)

A seed script can populate:

- **ContentSection:** One document per (pageSlug, sectionKey) from current `adminSectionContent.js` prototype.
- **Service:** Three documents from `servicesData.js`.
- **BlogPost:** From `blogPosts.js`.
- **GalleryGroup:** Three groups from GalleryPage constants.
- **AboutContent:** One doc from `aboutData.js`.
- **ContactContent:** One doc from ContactPage constants.
- **SiteSetting:** `header`, `footer`, `availability` from current hardcoded values.

This allows the site to work with the same content from the DB from day one.

**Run the seed:** From the `server/` directory, ensure MongoDB is running, then:

```bash
npm run seed
```

---

## 7. Quick start (backend)

1. **Install dependencies:** `cd server && npm install`
2. **MongoDB:** Have MongoDB running locally (e.g. `mongod`) or set `MONGODB_URI` in `.env`.
3. **Seed (optional):** `npm run seed` to populate collections with initial content.
4. **Start server:** `npm start` or `npm run dev` (with watch). API base: `http://localhost:5000/api`.
