## Author

Lluis Pitarch Ripolles

Linkedin: https://linkedin.com/in/lluis-pitarch

---

## Technical design

The application was created using [Next.js](https://nextjs.org) framework and its project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

- The app uses the `/api` routes from Next js to retrieve the wikipedia open api to get the results with a simple query request, and adapts this to the app Result model, this approach ensures a type safety across the whole app.

- I decide to just use a hook to keep the app data, this decision is made to prevent an overkill solution, in the future if the app has the need we can alway implement a store management layer like React Context, Zustand, MobX or Redux.

- For fetching data I use the `@tanstack/use-query` library because fits perfect with the use case of the app, also it's perfect for avoiding multiple calls, caching and cancel parallel calls. I also combine the solution with the custom made hook `useDebounceQuery.tsx` that allows to prevent queries while the user is still typing on the input.

- In order to virtualizate the results and ensure a optimum performance, I choose the solution from the same team of Tanstack: `@tanstack/react-virtual`

## Testing

I just wrote one test that is checking the app core handled by the hook `useSearchWiki.tsx` this is the responsible of keeping the store on the app, fetching data and creating an easy return of the data to the different components.

And another test as an example to test the different conditional rendering cases on the result list component: `ResultList.tsx`.

## Improvement

- Refactor the project foldering to an more Scream architecture approach.
- Implement pagination to reduce the network traffic and performance.
- If the SEO is critical, refactor the app to take the chance of use the react server components feature from Next.js.
- Styling refactor and implement a solid style-guide
- Add more features like delete the elements from the recent searches or move this storage to a real db and link this with a user auth, link to the wikipedia real page.

## Getting Started

First, run the development server:

Install the dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Run the tests:

```bash
npm run test
```
