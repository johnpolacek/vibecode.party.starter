<a href="https://starter.vibecode.party"><img src="https://starter.vibecode.party/screenshot.png" alt="Vibecode Party Starter Project Image" /></a>

# Vibecode Party Starter

VibeStarter is a [Next.js](https://nextjs.org) starter project that comes with everything I need to get started with a new vibe-coding project.

## Initializing Project

You can install with a single command, then answer the prompts:

```
npx vibecode-party-starter
```

## Services

You will need to create a `.env` file and set environment variables for the services you wish to use (see below).


### Shadcn/UI for Components

The components in this starter have been built on top of the [Shadcn/UI](https://ui.shadcn.com/) component library, which itself uses other libraries like [TailwindCSS](https://tailwindcss.com/) for styling, [Lucide icons](https://lucide.dev/icons/) and many others. For making new components, you can install more from the ShadCN/UI library, generate them with Cursor or [v0](v0.dev), or find compatible components built by the community.

### Clerk for Auth

If using Auth, create a new project on [Clerk](https://dashboard.clerk.com/) then add the environment variables to `.env`

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

You will need to set up individual oAuth integrations (e.g. Google, Github, etc) in the Clerk dashboard for your project.

User auth components are already built into the starter project. If you are not using Auth, you will need to remove these.

Admin users are created by adding Clerk User Ids into an environment variable on `.env`:

```
ADMIN_USER_IDS=user_1234567890,user_0987654321
```

*Why use Clerk for Auth*

- Convex Auth is only in beta (as on 4/26/2025)
- Using Clerk for Auth makes it easier to switch to a different Cloud DB

### Convex for Cloud Database

For the database, create a new project in [Convex Console](https://dashboard.convex.dev) then:

1. Create a new project
2. Get your deployment URL from the dashboard
3. Add the following environment variable to `.env`:

When you are ready to deploy, you will need to add a deploy key and public convex url - `https://<your-project>.convex.cloud` - to your environment variables. See more at [docs.convex.dev](https://docs.convex.dev/production/hosting/)

```
CONVEX_DEPLOY_KEY=
NEXT_PUBLIC_CONVEX_URL=
```

*Why use Convex?*

- Convex has great DX with easier setup than Supabase or Firebase.
- Convex is very well interpreted by LLMs (better oneshotting than Supabase or Firebase)
- Convex does not require running Docker or emulation for local development (avoiding excess CPU consumption)

#### Local Development with Convex

Convex is cloud-first and doesn't require local emulators. Your local development environment will automatically connect to your cloud deployment.

To view your Convex dashboard:
```bash
pnpm db:convex
```

The development server will start both Next.js and Convex:
```bash
pnpm dev
```

### AWS S3 for File Storage

To use [AWS](https://aws.amazon.com/) for File Storage (images, etc), create a new public S3 bucket then create a new IM user with Admin S3 permissions for that specific bucket only, then add the environment variables to `.env`

```
AWS_KEY=
AWS_SECRET=
AWS_REGION=
AWS_BUCKET_PUBLIC=
```

For images, it is recommended to use Cloudfront for a better cache strategy and to help stay under the image transformation limit with the Next.js Image component and Vercel. Create a new Cloudfront distribution and load all your images via the Cloudfront domain rather than S3.

```
CLOUDFRONT_DOMAIN=
```

### AWS S3 for Flat File Database

For projects where data is not very complex and changes less frequently, using S3 as a flat file database can be a good option. To do this, you can do the same steps as above but keep your bucket private and do not use Cloudfront (unless you want all the data to be public)

### SendGrid for Email

To use [SendGrid](https://app.sendgrid.com/) for programatically sending emails, create a new SendGrid project then add the environment variables to `.env`

```
SENDGRID_API_KEY=
SENDGRID_SENDER=
```

Once you have done this, you can start integrate SendGrid into your other services like Clerk and Stripe.

#### Contact Form

For the contact form to work, you will need to add a contact email as an environment variable. This is the email you wish for SendGrid to forward messages from the contact form. It will not be publicly available.

```
CONTACT_EMAIL=
```

The contact form in the starter include a ReCAPTCHA integration to prevent bots from sending emails. To configure this, you will need to create a new [Google ReCaptcha Site](https://www.google.com/recaptcha/admin) then add the environment variables to `.env`

```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
```

### Stripe for Payments

If using payment, create a new project on [Stripe](https://dashboard.stripe.com/) then add the environment variables to `.env`

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```

## AI SDK

We have hooks available for:

- Generating text with `useGenerateText()`
- Generating an array of strings with `useGenerateStrings()`
- Generating structured data with `useGenerateObject()`
- Generating images with `useGenerateImage()`

## Local Development

To start the app:

```
pnpm dev
```

### Linting

The starter project has been set up with eslint and prettier, and is set to automatically format your code with every save and every copy/paste.

You can lint with:

```
pnpm lint
```

### Testing

As vibe-coding projects grow, it becomes increasingly likely that AI will make breaking changes. By adding tests at the start, you can have confidence even when vibing that your application works.

To start using tests with party starter, you will need to create a test user. After you have completed the steps for setting up Clerk and have added the environment variables to your project, run your application on localhost and sign up for an account with an email address you own, and a new password for the project. Use the email confirmation code to complete the signup process.

#### Convex Database: Init, Teardown, and Seeding

Convex is cloud-first and does not require a local emulator. For testing, you can use Convex mutations/queries or custom scripts to reset and seed your database before each test run.

- **Init/Teardown:**  
  Create test helpers or scripts that clear relevant Convex tables/collections before and/or after your test suite runs. This can be done by calling Convex mutations that delete all documents in a table, or by using the Convex dashboard to reset data manually for development.

- **Seeding:**  
  Write seed scripts or test helpers that populate your Convex database with the data needed for your test cases. You can call Convex mutations directly from your test setup code to insert the required documents.

Example (using Playwright or your test runner):

```typescript
// Example test setup (pseudo-code)
await convex.mutation("test.clearAllData", {});
await convex.mutation("test.seedTestData", { users: [...], posts: [...] });
```

You can create a `test` module in your Convex functions for these helpers, and restrict them to run only in development or test environments.

We use Playwright for testing in the starter project. It has a built-in UI mode where you can pause the debugger and record your interactions that will auto-generate test code as you go.

To open the test console:

```
pnpm pw
```

To run the entire test suite in headless mode:

```
pnpm test
```

### MCP Rules

In the `.cursor/rules` there are a number of MDC rules that help with keeping Cursor from making mistakes so you can keep the vibes going. You may want to customize the following rules:

- `003-openai` - Sets preferred OpenAI model. Only need if using the OpenAI API.
- `101-project-structure` - Guidelines when creating new files to maintain consistent project organization
- `200-*` - Firebase rules. Only need if using Firebase
- `300-*` - Auth rules for Clerk. Only need if using Auth

## Deployment

For your services to work in production, you will need to add all the environment variables to your production server.
