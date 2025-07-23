
export type Project = {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
};

export const projectsData: Project[] = [
  {
    id: 2,
    title: 'Test Automation',
    description: 'An AI-powered tool to analyze and improve test suites, ensuring code quality and robustness. Suggests new tests and enhances existing ones.',
    techStack: ['Next.js', 'TypeScript', 'GenAI', 'Jest'],
    imageUrl: 'https://placehold.co/600x400.png',
    liveUrl: '/test-improver',
    githubUrl: '#',
  },
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with a modern UI, product management, and a mock checkout process. Built with Next.js and Tailwind CSS.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GenAI'],
    imageUrl: 'https://placehold.co/600x400.png',
    liveUrl: '/store',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'Personal Blog',
    description: 'A statically generated blog built with Next.js, featuring posts written in Markdown. Demonstrates content creation and static site generation.',
    techStack: ['Next.js', 'React', 'Markdown'],
    imageUrl: 'https://placehold.co/600x400.png',
    liveUrl: '/blog',
    githubUrl: '#',
  },
  {
    id: 4,
    title: 'Membership Portal',
    description: 'A simple membership portal with signup, login, and a protected dashboard page. Implemented using server actions and cookies for auth simulation.',
    techStack: ['Next.js', 'Server Actions', 'Middleware'],
    imageUrl: 'https://placehold.co/600x400.png',
    liveUrl: '/login',
    githubUrl: '#',
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
};

export const blogPostsData: BlogPost[] = [
  {
    slug: 'the-art-of-component-design',
    title: 'The Art of Component Design in React',
    excerpt: 'Discover the principles behind creating reusable, maintainable, and scalable React components.',
    date: '2024-05-15',
    content: `
# The Art of Component Design in React

Building complex applications requires a solid foundation. In React, this foundation is built upon components. Well-designed components are reusable, maintainable, and easy to understand. This post explores key principles for effective component design.

## Single Responsibility Principle
A component should ideally do one thing. If a component handles data fetching, state management, and rendering complex UI, it's time to break it down.

## Separation of Concerns
Separate container components (logic-heavy) from presentational components (UI-focused). This makes your UI components highly reusable.

## Props and State
Keep components as stateless as possible. Lift state up to the nearest common ancestor when multiple components need to share it. Use props to pass data and callbacks down.

By following these principles, you can create a robust and scalable component architecture for your React applications.
    `,
  },
  {
    slug: 'getting-started-with-nextjs-14',
    title: 'Getting Started with Next.js 14 App Router',
    excerpt: 'A beginner\'s guide to the new App Router in Next.js, covering layouts, server components, and more.',
    date: '2024-06-02',
    content: `
# Getting Started with Next.js 14 App Router

Next.js 14 introduced the App Router, a new paradigm for building applications. It brings powerful features like Server Components, nested layouts, and improved data fetching.

## Key Concepts

- **Server Components:** These run on the server, reducing the amount of JavaScript sent to the client. This leads to faster initial page loads.
- **Layouts:** Create UI that is shared between multiple pages. Layouts can be nested to create complex application shells.
- **Route Handlers & Server Actions:** Build your API right inside your app directory or perform data mutations securely on the server without creating separate API endpoints.

The App Router is a powerful evolution for Next.js, enabling developers to build faster, more efficient, and more interactive web applications.
    `,
  },
];

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export const productsData: Product[] = [
  {
    id: 'prod_001',
    name: 'Quantum Widget',
    description: 'A revolutionary widget that operates at the quantum level. Features include superposition and entanglement for unparalleled performance.',
    price: 99.99,
    imageUrl: 'https://placehold.co/400x400.png',
  },
  {
    id: 'prod_002',
    name: 'Hyper-Threaded Mouse',
    description: 'Experience zero latency with our hyper-threaded computer mouse. Perfect for gaming and professional design work.',
    price: 75.50,
    imageUrl: 'https://placehold.co/400x400.png',
  },
  {
    id: 'prod_003',
    name: 'Cybernetic Keyboard',
    description: 'A mechanical keyboard with a direct neural interface (adapter sold separately). Typing has never been more intuitive.',
    price: 249.99,
    imageUrl: 'https://placehold.co/400x400.png',
  },
  {
    id: 'prod_004',
    name: 'AI-Powered Coffee Mug',
    description: 'This smart mug keeps your coffee at the perfect temperature and provides daily affirmations powered by a tiny AI.',
    price: 49.99,
    imageUrl: 'https://placehold.co/400x400.png',
  },
  {
    id: 'prod_005',
    name: 'Holographic Desk Plant',
    description: 'A beautiful, maintenance-free holographic plant for your desk. Choose from over 100 species.',
    price: 39.99,
    imageUrl: 'https://placehold.co/400x400.png',
  },
  {
    id: 'prod_006',
    name: 'Anti-Gravity Pen',
    description: 'Write upside down, underwater, or in zero gravity. This pen defies physics for the ultimate writing experience.',
    price: 29.99,
    imageUrl: 'https://placehold.co/400x400.png',
  },
];
