# Anthem SEO Route Inventory

Production URL: `https://anthemcv.com`

## Core Routes

| Final route | App Router source | Page type |
| --- | --- | --- |
| `/` | `app/page.tsx` | Homepage |
| `/about-us` | `app/about-us/page.tsx` | Company |
| `/contact` | `app/contact/page.tsx` | Conversion |
| `/services` | `app/services/page.tsx` | Service hub |
| `/services/[service]` | `app/services/[service]/page.tsx` | Service detail |
| `/locations` | `app/locations/page.tsx` | Location hub |
| `/[location]` | `app/[location]/page.tsx` | California location detail |
| `/privacy-policy` | `app/privacy-policy/page.tsx` | Legal |
| `/terms-of-service` | `app/terms-of-service/page.tsx` | Legal |

## Service Routes

Service records are centralized in `data/services.ts`. The dynamic route statically generates plumbing, residential plumbing, commercial plumbing, drain cleaning, sewer line, hydro jetting, water heater, cooling, HVAC, AC, heating, furnace, boiler, insulation, and air-duct pages.

## Location Routes

Location records are centralized in `data/locations.ts`. Final URLs are extensionless California slugs: Palm Springs, Palm Desert, Indio, Cathedral City, La Quinta, Coachella, Desert Hot Springs, Rancho Mirage, and Coachella Valley.

## Shared Layout

All indexable routes use `app/layout.tsx`, `SiteHeader`, `ReviewBanner`, and `SiteFooter`. Every page has crawlable navigation, production metadata, one H1, meaningful H2 sections, and direct links to final service and location routes.
