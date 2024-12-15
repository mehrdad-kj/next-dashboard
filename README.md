## Next.js App Router Course - Full code with notes

## Next.js Notes:
** fonts **
Next.js automatically optimizes fonts in the application when you use the next/font module. It downloads font files at build time and hosts them with your other static assets. This means when a user visits your application, there are no additional network requests for fonts which would impact performance.

** images **
The <Image> Component is an extension of the HTML <img> tag, and comes with automatic image optimization, such as:

-Preventing layout shift automatically when images are loading.
-Resizing images to avoid shipping large images to devices with a smaller viewport.
-Lazy loading images by default (images load as they enter the viewport).
-Serving images in modern formats, like WebP and AVIF, when the browser supports it.

** pages and layouts and nested routes **

- page.tsx is a special Next.js file that exports a React component, and it's required for the route to be accessible.
- To create a nested route, you can nest folders inside each other and add page.tsx files inside them.
- create different pages in Next.js: create a new route segment using a folder, and add a page file inside it.
  -In Next.js, you can use a special layout.tsx file to create UI that is shared between multiple pages.
  -One benefit of using layouts in Next.js is that on navigation, only the page components update while the layout won't re-render. This is called partial rendering.
  -Any UI you add to the root layout will be shared across all pages in your application.
  -You can use the root layout to modify your <html> and <body> tags, and add metadata

** navigation **

- In Next.js, you can use the <Link /> Component to link between pages in your application. <Link> allows you to do client-side navigation with JavaScript.
  -To improve the navigation experience, Next.js automatically code splits your application by route segments. Splitting code by routes means that pages become isolated. If a certain page throws an error, the rest of the application will still work.
- Furthermore, in production, whenever <Link> components appear in the browser's viewport, Next.js automatically prefetches the code for the linked route in the background. By the time the user clicks the link, the code for the destination page will already be loaded in the background, and this is what makes the page transition near-instant!
  -Next.js provides a hook called usePathname() that you can use to check the path
- In Next.js, 'use client'; is used to tell Next.js that a component should run in the browser (client-side) instead of on the server.

** Fetching Data in Next.js **

- By default, Next.js applications use React Server Components.
- Server Components support promises, providing a simpler solution for asynchronous tasks like data fetching. You can use async/await syntax without reaching out for useEffect, useState or data fetching libraries.
- Server Components execute on the server, so you can keep expensive data fetches and logic on the server and only send the result to the client.
- As mentioned before, since Server Components execute on the server, you can query the database directly without an additional API layer.

** SQL **

- SQL is versatile, allowing you to fetch and manipulate specific data.

** waterfall **

- A "waterfall" refers to a sequence of network requests that depend on the completion of previous requests. In the case of data fetching, each request can only begin once the previous request has returned data.

** parallel fetching **

- In JavaScript, you can use the Promise.all() or Promise.allSettled() functions to initiate all promises at the same time.

** static and dynamic rendering **

- With static rendering, data fetching and rendering happens on the server at build time (when you deploy) or when revalidating data.
- With dynamic rendering, content is rendered on the server for each user at request time (when the user visits the page).
- With dynamic rendering, your application is only as fast as your slowest data fetch.

** streaming **

- Streaming is a data transfer technique that allows you to break down a route into smaller "chunks" and progressively stream them from the server to the client as they become ready.
- There are two ways you implement streaming in Next.js:

1. At the page level, with the loading.tsx file.
2. For specific components, with <Suspense>.

- Suspense allows you to defer rendering parts of your application until some condition is met (e.g. data is loaded). You can wrap your dynamic components in Suspense. Then, pass it a fallback component to show while the dynamic component loads.

- In general, it's good practice to move your data fetches down to the components that need it, and then wrap those components in Suspense. But there is nothing wrong with streaming the sections or the whole page if that's what your application needs

** Route Groups **

- Route groups allow you to organize files into logical groups without affecting the URL path structure. When you create a new folder using parentheses (), the name won't be included in the URL path.

** Partial Prerendering **

- a new rendering model that allows you to combine the benefits of static and dynamic rendering in the same route.
- holes in the context of Partial Prerendering are Locations where dynamic content will load asynchronously.

** Searching **

- useSearchParams- Allows you to access the parameters of the current URL. For example, the search params for this URL /dashboard/invoices?page=1&query=pending would look like this: {page: '1', query: 'pending'}.

- usePathname - Lets you read the current URL's pathname. For example, for the route /dashboard/invoices, usePathname would return '/dashboard/invoices'.

- useRouter - Enables navigation between routes within client components programmatically.

- URLSearchParams is a Web API that provides utility methods for manipulating the URL query parameters.

- Page components accept a prop called searchParams.

- If you gave a client component to extract search params use hook like useSearchParams().
- If you have a serve component that fetches its own data you can use searchParams props in Page compnent and pass it by props to the server component.

** Debouncing **
How Debouncing Works:

1. Trigger Event: When an event that should be debounced (like a keystroke in the search box) occurs, a timer starts.
2. Wait: If a new event occurs before the timer expires, the timer is reset.
3. Execution: If the timer reaches the end of its countdown, the debounced function is executed.

** Mutations **

- React Server Actions allow you to run asynchronous code directly on the server.They eliminate the need to create API endpoints to mutate your data. Instead, you write asynchronous functions that execute on the server and can be invoked from your Client or Server Components.
- By adding the 'use server', you mark all the exported functions within the file as Server Actions.
- use revalidatePath from 'next/cache' to clear cache and trigger a new request to the server.

** Dynamic Route segment **

- Next.js allows you to create Dynamic Route Segments when you don't know the exact segment name and want to create routes based on data.
- You can create dynamic route segments by wrapping a folder's name in square brackets. For example, [id], [post] or [slug].

-- redirect is being called outside of the try/catch block. This is because redirect works by throwing an error, which would be caught by the catch block. To avoid this, you can call redirect after try/catch. redirect would only be reachable if try is successful.

** Error handling **

- The error.tsx file can be used to define a UI boundary for a route segment. It serves as a catch-all for unexpected errors and allows you to display a fallback UI to your users.
- "use client" - error.tsx needs to be a Client Component.
  -It accepts two props:

* error: This object is an instance of JavaScript's native Error object.
* reset: This is a function to reset the error boundary. When executed, the function will try to re-render the route segment.

- Another way you can handle errors gracefully is by using the notFound function.
- when notFound function runs the not-found.tsx will be shown to user.
- That's something to keep in mind, notFound will take precedence over error.tsx, so you can reach out for it when you want to handle more specific errors!

** Accessibility in Next js **

- By adding "lint": "next lint" in package.json in "scripts" you can catch accessibility issues early. For example, this plugin warns if you have images without alt text, use the aria-\* and role attributes incorrectly, and more.

** Validation in Next js **
- client side validation, The simplest would be to rely on the form validation provided by the browser by adding the required attribute to the <input> and <select> elements in your forms.


** Authentication **
- In web development, authentication and authorization serve different roles:

-- Authentication is about making sure the user is who they say they are. You're proving your identity with something you have like a username and password.
-- Authorization is the next step. Once a user's identity is confirmed, authorization decides what parts of the application they are allowed to use.


** Meta Data **
- In web development, metadata provides additional details about a webpage. Metadata is not visible to the users visiting the page. Instead, it works behind the scenes, embedded within the page's HTML, usually within the <head> element. This hidden information is crucial for search engines and other systems that need to understand your webpage's content better.

- Metadata plays a significant role in enhancing a webpage's SEO.

-- types of meta data: 

* Title Metadata: Responsible for the title of a webpage that is displayed on the browser tab. It's crucial for SEO as it helps search engines understand what the webpage is about.
<title>Page Title</title>


* Description Metadata: This metadata provides a brief overview of the webpage content and is often displayed in search engine results.
<meta name="description" content="A brief description of the page content." />


* Keyword Metadata: This metadata includes the keywords related to the webpage content, helping search engines index the page.
<meta name="keywords" content="keyword1, keyword2, keyword3" />


* Open Graph Metadata: This metadata enhances the way a webpage is represented when shared on social media platforms, providing information such as the title, description, and preview image.
<meta property="og:title" content="Title Here" />
<meta property="og:description" content="Description Here" />
<meta property="og:image" content="image_url_here" />

* Favicon Metadata: This metadata links the favicon (a small icon) to the webpage, displayed in the browser's address bar or tab.
<link rel="icon" href="path/to/favicon.ico" />

- You can also include a metadata object from any layout.js or page.js file to add additional page information like title and description. Any metadata in layout.js will be inherited by all pages that use it.
- But what if you want to add a custom title for a specific page? You can do this by adding a metadata object to the page itself. Metadata in nested pages will override the metadata in the parent.



