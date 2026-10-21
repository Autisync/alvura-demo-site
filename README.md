# Alvura Dental Clinic demo website

A website for Alvura Dental Clinic, a made-up dental practice, in **English
(London, £)** and **European Portuguese (Lisboa, €)** on one page. It shows
prospects in the UK and Portugal what their own website does with the Autisync
CRM behind it. Everything on it books and enquires into the CRM account
**Alvura Dental Clinic (Demo)** (`npm run demo:business -- dental` in the CRM).

## What it shows

- **Next free appointment, live**: the hero reads the diary in the CRM. Book
  that time and the site moves on to the next one.
- **Treatments with prices**: check-up, hygienist, whitening, implants, clear
  aligners, bonding, emergency. Every "Book" button opens the booking on the
  right appointment.
- **Booking on the page**: appointment, person (or first available, which
  checks every clinician's own hours), day, time, details. It lands in the CRM
  as a confirmed appointment, with the patient created and the confirmation
  email sent in the visitor's language.
- **New patient enquiry**: arrives in the CRM as a new lead, with "interested
  in", best time to call, the page language and an optional, unticked
  marketing opt-in. The form asks people not to send medical details.
- **Emergency appointments, payment plans, the team** (initials, no photos of
  real people), **example reviews** clearly labelled "demo", and a WhatsApp
  button that explains what it does on a real site (the number is fictional).
- **How the system works behind this site** (for the sales call): an animated
  phone and timeline of the follow-ups the CRM's dental playbook installs:
  missed call or after-hours WhatsApp → instant reply → booked → reminder the
  day before → no-show follow-up → review request → 6-month recall →
  treatment plan follow-up. It plays when scrolled into view, can be paused,
  stepped and clicked, and never plays by itself with reduced motion.
- **Visitors**: with a `TRACK_KEY`, every visit, scroll, click and booking
  shows in the CRM under Visitors.

No framework and no install. `build.mjs` copies `src/` to `dist/` and writes
`dist/config.js`.

## Showing English or Portuguese

- `/?lang=en`: London version. `/?lang=pt`: Lisboa version.
- Without `?lang`, the browser's language decides (Portuguese browsers get
  PT); the EN | PT switch in the header changes it and is remembered on that
  device.
- `/?demo=0` (with `&lang=pt` if wanted): the clean, client-like view, without
  the "how it works" section and the floating demo note. The footer still says
  it is a demo.

## Vercel

1. Push this folder to its own GitHub repository.
2. Vercel → Add New → Project → import the repository, framework preset
   **Other**. Build settings come from `vercel.json` (`node build.mjs`,
   output `dist`).
3. Optional environment variables (Settings → Environment Variables), then
   redeploy:
   - `TRACK_KEY`: create a website in the demo account under Visitors →
     Tracking and paste its `as_...` key. Without it visits are not counted.
   - `CRM_API_URL` (default `https://api.autisync.com/api`), `CRM_APP_URL`
     (default `https://app.autisync.com`), `BOOKING_SLUG` and `SITE_SLUG`
     (both default `alvura-demo`).

The CRM must allow websites to call the public booking and form endpoints
(already the case for the Aurelle and Kestrel demos).

## Before a demo

On the server: `docker compose exec crm-backend npm run demo:business -- dental --refresh`
so the diary holds this week's appointments. Add `--pt` when building or
rebuilding for the Lisboa version of the account (euros, Portuguese pipeline
and follow-ups). Cancel test bookings in the CRM afterwards.

The implant consultation takes a deposit in the CRM; the demo account has no
payment provider connected, so on this site it books as "paid on the day".

Every name, review and number here is invented. UK numbers are in Ofcom's
drama range (020 7946 0xxx, 07700 900xxx), the Portuguese ones are
placeholders (210 000 000, 900 000 000), and every email ends in `.example`.

## Locally

```
CRM_API_URL=http://localhost:3001/api node build.mjs && npx serve dist
```
