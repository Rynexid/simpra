# Authentication

Authentication is handled by Better Auth on the web app.

## Base path

```
/api/auth
```

## Key endpoints

- `POST /api/auth/sign-up/email`
- `POST /api/auth/sign-in/email`
- `POST /api/auth/sign-out`
- `GET /api/auth/get-session`
- `POST /api/auth/callback/google`

## Organization flows

- `POST /api/auth/create-organization`
- `POST /api/auth/set-active-organization`
- `POST /api/auth/create-invitation`

## Notes

- Callbacks and redirects use `BETTER_AUTH_URL`
- Turnstile captcha is enabled on sign-up and sign-in email endpoints when `TURNSTILE_SECRET_KEY` is configured
- Google OAuth requires `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
