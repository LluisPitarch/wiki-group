## Author

Lluis Pitarch Ripollés

LinkedIn: https://linkedin.com/in/lluis-pitarch

---

## Technical Design

The application is built using the [Next.js](https://nextjs.org) framework, and it was bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

- The app utilizes Next.js' `/api` routes to interact with the Wikipedia open API for fetching results via simple query requests. The results are adapted to the app's `Result` model, ensuring type safety throughout the application.

- I decided to use a hook to manage the app's data, opting for a lightweight solution. If the app grows and requires more complexity, a state management layer like React Context, Zustand, MobX, or Redux can be added in the future.

- Data fetching is handled by the `@tanstack/use-query` library, which is well-suited to the app's needs. It minimizes unnecessary API calls, supports caching, and allows for canceling parallel requests. Additionally, I implemented a custom hook, `useDebounceQuery.tsx`, to prevent queries from being sent while the user is still typing in the input field.

- To optimize performance and virtualize the results, I used `@tanstack/react-virtual`, which provides efficient rendering for large lists of data.

## Testing

- A core test was written for the `useSearchWiki.tsx` hook, which manages the app's state, handles data fetching, and ensures the data is easily accessible to various components.

- Another test was created for the `ResultList.tsx` component, which covers different conditional rendering scenarios.

\*We should increase the test coverage and even add an E2E test using Cypress or Playwright

## Improvements

- Refactor the project structure to follow a more modular "Screaming Architecture" approach.
- Implement pagination to reduce network traffic and improve performance.
- If SEO becomes a priority, consider refactoring the app to leverage Next.js' React Server Components feature.
- Refactor the styling and establish a solid style guide.
- Add more features, such as allowing users to delete items from their recent searches or moving storage to a real database with user authentication, and providing direct links to Wikipedia pages.

## Getting Started

To start the development server:

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

Run tests:

```bash
npm run test
```
