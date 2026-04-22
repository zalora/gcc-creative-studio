# Custom Domain Setup

Steps to map a custom domain (e.g. `creative-studio.zalora.net`) to the Creative Studio frontend.

## 1. Firebase Hosting — Add Custom Domain

In the Firebase Console → Hosting → your site, add the custom domain and follow the verification steps.

## 2. DNS

Point the domain's A record to the IP address provided by Firebase Hosting (e.g. `199.36.158.100`).

## 3. OAuth Consent Screen

In Google Cloud Console → APIs & Services → Credentials → your OAuth 2.0 Client ID, add the custom domain to:
- **Authorized JavaScript origins**
- **Authorized redirect URIs**

## 4. Firebase Auth

In Firebase Console → Authentication → Settings → Authorized domains, add the custom domain.

## 5. Frontend Build — Use Relative Backend URL

In Cloud Build → Triggers → your frontend trigger, change `_BACKEND_URL` from the absolute Firebase Hosting URL (e.g. `https://creative-studio-493912.web.app`) to `/`.

This ensures the frontend uses a relative path for API calls (`/api`), which works regardless of which domain serves the frontend. Firebase Hosting rewrites handle proxying `/api/**` to Cloud Run.

Retrigger the frontend build after this change.

## 6. Cloud Run IAM — Allow Unauthenticated Invocations

Firebase Hosting proxies `/api/**` requests to Cloud Run, but requires the Cloud Run service to allow unauthenticated invocations. Without this, Firebase's proxy receives a 403 from Cloud Run.

This is now handled automatically by Terraform via the `allow_unauthenticated` IAM binding in `infra/modules/cloud-run-service/main.tf`. No manual steps required if deploying via `terraform apply`.

> This is safe because the app handles its own authentication via OIDC token verification in the FastAPI backend.
