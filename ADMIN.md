# Admin Dashboard

The admin dashboard at `/admin` lets you edit **section content** (text and image URLs) for the whole site. Changes are saved to the API and appear on the live frontend.

## What You Can Edit from the Dashboard

- **Section content by page**  
  For each page (Home, About, Services, Gallery, Blog, Events, Membership, Contact, Availability) and **Site-wide**, you can edit:
  - Text fields (titles, subtitles, body copy, quotes, etc.)
  - Image URL and alt text per image (no file upload yet; use URLs to assets you host)

- **Pages and sections in the sidebar**  
  The sidebar lists every page and, under each page, every section. Choosing a section loads its content from the API (or defaults from the seed). Use **Save changes** to persist edits.

- **Dynamic frontend**  
  The Footer disclaimer is already loaded from the API. Other sections can be wired the same way using the `useContent(pageSlug, sectionKey)` hook and optionally `getFieldValue(fields, fieldId)` so that admin edits appear across the application.

## What Is Not in the Dashboard Yet (Backend Exists)

These are managed by their own APIs; the admin UI does not yet have list/add/edit screens for them:

| Data | API | Suggested admin addition |
|------|-----|---------------------------|
| **Events** (upcoming/past) | `GET/POST/PUT/DELETE /api/events` | Events list + form to add/edit/delete events |
| **Blog posts** | `GET/POST/PUT/DELETE /api/blog` | Blog list + editor |
| **Services** | `GET/POST/PUT/DELETE /api/services` | Services list + form |
| **Gallery groups & images** | `GET/POST/PUT/DELETE /api/gallery` | Gallery manager |
| **Membership tiers & products** | `GET/POST/PUT/DELETE /api/membership/*` | Tiers and products CRUD |
| **About page** (structured content) | `GET/PUT /api/about` | Optional: form for mission, values, journey, etc. |
| **Contact** (methods, FAQ, hours) | `GET/PUT /api/contact` | Optional: form for contact content |

Adding these would make the **entire application** data manageable from the admin (section content is already covered).

## Running Admin + API

1. **Backend:** From `server/`, run `node scripts/seed.js` once to seed content sections (and other data), then start the API (e.g. `npm run dev` or `node app.js`).
2. **Frontend:** From `client/`, run `npm run dev`. Vite proxies `/api` to the backend (see `vite.config.js`). For production, set `VITE_API_URL` to your API base URL.

## Adding More Dynamic Sections

To make a frontend section use admin-edited content:

1. Use `useContent(pageSlug, sectionKey)` to load the section (with API fallback to defaults).
2. Use `getFieldValue(fields, fieldId)` for a single field, or map over `fields`/`images` as needed.
3. Ensure the section is in `adminNav.js` and has default structure in `adminSectionContent.js` (and optionally in the seed) so the admin panel can load and save it.
