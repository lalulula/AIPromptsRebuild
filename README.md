This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Notes

1. What does Next.js have that React doesn’t?

   - Next.js simplifies the development process (Extension of React)
   - On top of that, it optimizes your web apps
     => All of these are done by Next.js’s primary features

2. Primary Features

   1. Rendering (Automatically) -> (React vs NextJS 가장큰 차이는 how they handle rendering)

   - React : render user interface on the client side
   - Next : performs server side rendering(But is flexible, based on needs)
   - Client Side Rendering & Server Side Rendering:

     1. CSR : Happens on the client’s device, the browser. When a user request for a webpage, the server sends a basic HTML document and JS code. The browser downloads and executes the code, and the rendering of the component happens, and then is displayed on the website.
     2. SSR : Involves rendering the web page on the server before transmitting it to the client’s device. User requests a page, and server process the request and renders the components on the server side. Then the server then sends back the fully rendered html to the client’s browser, enabling immediate display.

        - This distinction highlights an essential aspect of WebDev : **SEO(Search Engine Optimization)**

          - **원인:** Search Engine Crawlers face difficulties indexing pages dynamically rendered on the client side, which as a result, the SEO performance of such pages may suffer as such search engines may not fully comprehend their content and rank them appropriately.
          - **Sol:** By sending pre-rendered code directly to the client by using NextJS, this issue is solved (Easy Crawling and Indexing = improved SEO)
          - **Why prioritize SEO?:**
            - Crucial for optimizing a website’s visibility and ranking in search engine results. This will result in success of your website and its inline presence
            - Has benefits of:
              1. Increased organic traffic
              2. Enhanced user experience
              3. Credibility and trust worthiness
              4. Competitive advantage

   2. Routing

      1. React :
         - Need to install a additional package, ex: ReactRouter, RRDom, and create routes in one of the files.
      2. Next :
         - Use a file base routing system - Handled by the file system. Each folder in the app directory and the folder name becomes the routes path => No need for external packages or complete configurations

   3. Ability to create full stack applications(after v9) - New feature called **<ins>API Routes</ins>** were created:
      This enables the creation of serverless functions to handle API requests - Serverless APIs: - Way of creating API endpoints in NextJS without the need for a traditional server. - It allows us to build and deploy APIs: - Without managing server infrastructure, - Without wetting about scaling their server as traffic increases.
      => We can create API endpoints by simply adding a file named “route.js” in each of the route in the app directory

3. Features that will be used:
   - Automatic Code Splitting:
     Breaks down large bundles of JS code into smaller, more manageable chunks that can be loaded <ins>when needed</ins>
     => reduces the initial load time of a website and optimizes the user’s experience while browsing
     <=> React 에서는 lazy, suspense 같은 것을 이용해 필요할때 불려짐

**→ One major benefit that should be thought over is that, NextJS is a technology that is build on top of React, so it is not a completely new technology. It’s purpose if to simplify certain tasks, allowing developers to concentrate on the core React code. (Let us focus on the essential business logic of the application)**

## File Structures & Components & Features

1. `app` directory

   1. `layout.js`
      - Main entry point of the application
      - All components are wrapped around in it as its children
      - Common layout or template for all of the pages (children밖에 사용할 경우)
      - Any component that you write in this file will be shared with the entire application
      - When you want to add something that should stay consistent across all routes, you should place it in this file
   2. `page.js`
      - Simply represent the homepage route : http://localhost:3000/
   3. `global.css`
      - Contains global css style of the entire application

2. Client & Server Side Component

   - By default NextJS renders all components that are created inside the `app` directory as a ServerSide Component
   - To change it to be rendered as a client side component you need to add `"use client"` to the top of the page.
   - **WHEN?**
     - Whenever you are utilizing state or hooks in react or other client side management solutions, you should use/declare Client Side Components by the `use client` import (=> Since state management is usually done in the client side of the program)
     - _DOCUMENTATION_: We recomment using the server components(default in the app directory) until you have the need to use the client component(ex: useState, useEffect, interactivity etc)

3. Routing & Special files

   1. Nested routes:
      - nested directory로 해결
   2. Dynamic routes
      - directory names with `[ ]`: ex) [postId] => accessible within the code as {postId}
   3. `layout.js` created in route (sub)directories
      - Used for sharing UI components between routes
   4. `error.js`
      - will handle errors gracefully in components
      - needs to be a client component
   5. `loading.js`
      - handles page loading

4. Data Fetching

   1. Server Side Rendering
      - dynamic server rendered data
      - each request to the server triggers a new rendering cycle and data fetch
      - Endure that content is always up to date
   2. Static Side Generation
      - cache O
   3. Incremental Static Generation
      - SSR + SSG => revalidate time interval : data will be cached for a certain period of time(for dynamic contents)

5. API Endpoints( Used as a serverless FW )

   1. File base route handler in `/app/api` directory (preferred)
      - `/app/api/home/route.js`
      - example of backend logic
        ```
        export async function GET(request){
            return new Response("Hello")
        }
        ```
   2. Direct route handler in `/app` directory itself
      - file name **MUST** be `route.js`, for it to work as a API Endpoint

6. Metadata Handling : will also help improve SEO

## 결론

Key Features of NextJS:

1. Routing
2. Code Splitting
3. Search Engine Optimization
4. Rendering Automatically

- automation saves a considerable amount of time, reducing the effort required to build a react app from the ground up - automates some functions so that developers can focus on writing React code.

### Code Notes

1. Tailwind Css classNames
   - 기본적으로 주어지는 클래스 이름에 맞게 css가 입혀짐, 모를경우 검색 ex) https://tailwindcss.com/docs/width
2. 규칙
   - "class_name" :우리가 제공하는 이름 "class-name" : tailwind 사용하는 이름

# AIPrompts
# AIPromptsRebuild
