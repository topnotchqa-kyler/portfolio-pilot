
import placeholderImages from '@/app/lib/placeholder-images.json';

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
    title: 'WebdriverIO & Cucumber',
    description: 'A comprehensive test automation suite using WebdriverIO and Cucumber that covers the whole of the website - e-commerce, blog, form, and login authentication.',
    techStack: ['WebdriverIO', 'TypeScript', 'Node.js', 'Cucumber'],
    imageUrl: placeholderImages.projects.test_automation.src,
    githubUrl: 'https://github.com/kchavez05/portfolio-site-testing.git',
    aiHint: 'testing framework logo'
  },
  {
    id: 3,
    title: 'Playwright',
    description: 'A comprehensive test automation suite using Playwright that covers the whole of the website - e-commerce, blog, form, and login authentication.',
    techStack: ['Playwright', 'TypeScript', 'Node.js'],
    imageUrl: placeholderImages.projects.playwright.src,
    githubUrl: '#',
    aiHint: 'playwright logo'
  },
  {
    id: 5,
    title: 'Cypress',
    description: 'A comprehensive test automation suite using Cypress that covers the whole of the website - e-commerce, blog, form, and login authentication.',
    techStack: ['Cypress', 'JavaScript', 'Node.js'],
    imageUrl: placeholderImages.projects.cypress.src,
    githubUrl: '#',
    aiHint: 'cypress logo'
  }
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
    imageUrl: placeholderImages.store.prod_001.src,
    aiHint: 'glowing cube'
  },
  {
    id: 'prod_002',
    name: 'Hyper-Threaded Mouse',
    description: 'Experience zero latency with our hyper-threaded computer mouse. Perfect for gaming and professional design work.',
    price: 75.50,
    imageUrl: placeholderImages.store.prod_002.src,
    aiHint: 'gaming mouse'
  },
  {
    id: 'prod_003',
    name: 'Cybernetic Keyboard',
    description: 'A mechanical keyboard with a direct neural interface (adapter sold separately). Typing has never been more intuitive.',
    price: 249.99,
    imageUrl: placeholderImages.store.prod_003.src,
    aiHint: 'mechanical keyboard'
  },
  {
    id: 'prod_004',
    name: 'AI-Powered Coffee Mug',
    description: 'This smart mug keeps your coffee at the perfect temperature and provides daily affirmations powered by a tiny AI.',
    price: 49.99,
    imageUrl: placeholderImages.store.prod_004.src,
    aiHint: 'smart mug'
  },
  {
    id: 'prod_005',
    name: 'Holographic Desk Plant',
    description: 'A beautiful, maintenance-free holographic plant for your desk. Choose from over 100 species.',
    price: 39.99,
    imageUrl: placeholderImages.store.prod_005.src,
    aiHint: 'holographic plant'
  },
  {
    id: 'prod_006',
    name: 'Anti-Gravity Pen',
    description: 'Write upside down, underwater, or in zero gravity. This pen defies physics for the ultimate writing experience.',
    price: 29.99,
    imageUrl: placeholderImages.store.prod_006.src,
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
