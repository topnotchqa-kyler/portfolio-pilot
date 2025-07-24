
export type Project = {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  aiHint?: string;
};

export const projectsData: Project[] = [
  {
    id: 2,
    title: 'Test Automation',
    description: 'A comprehensive test automation suite using WebdriverIO that covers the whole of the website - e-commerce, blog, form, and login authentication.',
    techStack: ['Next.js', 'TypeScript', 'GenAI', 'Jest'],
    imageUrl: 'https://webdriver.io/img/webdriverio.png',
    liveUrl: '/test-improver',
    githubUrl: '#',
    aiHint: 'testing framework logo'
  },
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with a modern UI, product management, and a mock checkout process. Built with Next.js and Tailwind CSS.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GenAI'],
    imageUrl: 'https://placehold.co/600x400.png',
    liveUrl: '/store',
    githubUrl: '#',
    aiHint: 'modern storefront'
  },
  {
    id: 3,
    title: 'Personal Blog',
    description: 'A statically generated blog built with Next.js, featuring posts written in Markdown. Demonstrates content creation and static site generation.',
    techStack: ['Next.js', 'React', 'Markdown'],
    imageUrl: 'https://placehold.co/600x400.png',
    liveUrl: '/blog',
    githubUrl: '#',
    aiHint: 'minimalist writing desk'
  },
  {
    id: 4,
    title: 'Membership Portal',
    description: 'A simple membership portal with signup, login, and a protected dashboard page. Implemented using server actions and cookies for auth simulation.',
    techStack: ['Next.js', 'Server Actions', 'Middleware'],
    imageUrl: 'https://placehold.co/600x400.png',
    liveUrl: '/login',
    githubUrl: '#',
    aiHint: 'secure login screen'
  },
];

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  aiHint: string;
};

export const productsData: Product[] = [
  {
    id: 'prod_001',
    name: 'Quantum Widget',
    description: 'A revolutionary widget that operates at the quantum level. Features include superposition and entanglement for unparalleled performance.',
    price: 99.99,
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'glowing cube'
  },
  {
    id: 'prod_002',
    name: 'Hyper-Threaded Mouse',
    description: 'Experience zero latency with our hyper-threaded computer mouse. Perfect for gaming and professional design work.',
    price: 75.50,
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'gaming mouse'
  },
  {
    id: 'prod_003',
    name: 'Cybernetic Keyboard',
    description: 'A mechanical keyboard with a direct neural interface (adapter sold separately). Typing has never been more intuitive.',
    price: 249.99,
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'mechanical keyboard'
  },
  {
    id: 'prod_004',
    name: 'AI-Powered Coffee Mug',
    description: 'This smart mug keeps your coffee at the perfect temperature and provides daily affirmations powered by a tiny AI.',
    price: 49.99,
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'smart mug'
  },
  {
    id: 'prod_005',
    name: 'Holographic Desk Plant',
    description: 'A beautiful, maintenance-free holographic plant for your desk. Choose from over 100 species.',
    price: 39.99,
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'holographic plant'
  },
  {
    id: 'prod_006',
    name: 'Anti-Gravity Pen',
    description: 'Write upside down, underwater, or in zero gravity. This pen defies physics for the ultimate writing experience.',
    price: 29.99,
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'floating pen'
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
};
