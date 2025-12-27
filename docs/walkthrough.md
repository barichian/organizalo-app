# Walkthrough - Organizalo.app Deployment & Fixes

## 1. Authentication Redirection Fix
**Problem:** Users were being redirected to the landing page (`/`) instead of the app (`/` on the app subdomain) after login logic, or getting caught in a loop because `next_path` was missing or invalid.
**Solution:**
- **Frontend:** Modified `password.tsx` and `unique-code.tsx` to explicitly set `next_path` to the absolute URL `https://app.organizalo.app`.
- **Backend:** Patched `apps/api/plane/authentication/utils/host.py` to Force-Return `settings.APP_BASE_URL` ("https://app.organizalo.app") when `is_app=True`, even if `APP_BASE_URL` env var was missing or misconfigured in some contexts.

## 2. Branding (Logo & Text)
**Problem:** The app had "Plane" branding. The new logo was not applied consistently, and centering was off.
**Solution:**
- **Login Screen:** Updated `auth-header.tsx` to use `organizalo-logo.png` with improved sizing (`h-20`) and centering classes.
- **Landing Page:** Identified `apps/landing` as the source. Updated `page.tsx` to use the new logo in the Navbar, Hero, and Footer.
- **Assets:** Added `organizalo-logo.png` to both `apps/web/public` and `apps/landing/public`.

## 3. Signup Stability (Error 505)
**Problem:** Signup was failing with a 500 Server Error, likely due to synchronous email sending or cache invalidation failures when secondary services (RabbitMQ/Redis) were unstable.
**Solution:**
- **Email Task:** Wrapped `user_activation_email.delay()` in a `try/except` block in `apps/api/plane/authentication/adapter/base.py`. This ensures user creation succeeds even if the welcome email fails to send.
- **Cache Invalidation:** Wrapped `invalidate_cache_directly` in `apps/api/plane/authentication/utils/workspace_project_join.py` to prevent Redis errors from blocking the signup flow.

## 4. Deployment Instructions (Hostinger/EasyPanel)
To apply all changes, perform a **Force Rebuild** on the following services:
1.  **api**: (Backend code updates)
2.  **worker**: (Backend code updates)
3.  **web**: (Login screen logo updates)
4.  **landing**: (Landing page logo updates)
