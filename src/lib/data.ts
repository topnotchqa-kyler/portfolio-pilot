
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
    techStack: ['WebdriverIO', 'TypeScript', 'Node.js'],
    imageUrl: 'https://webdriver.io/img/webdriverio.png',
    githubUrl: 'https://github.com/kchavez05/portfolio-site-testing.git',
    aiHint: 'testing framework logo'
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
    imageUrl: '/assets/quantum-widget.jpg',
    aiHint: 'glowing cube'
  },
  {
    id: 'prod_002',
    name: 'Hyper-Threaded Mouse',
    description: 'Experience zero latency with our hyper-threaded computer mouse. Perfect for gaming and professional design work.',
    price: 75.50,
    imageUrl: '/assets/hyper-threaded-mouse.jpg',
    aiHint: 'gaming mouse'
  },
  {
    id: 'prod_003',
    name: 'Cybernetic Keyboard',
    description: 'A mechanical keyboard with a direct neural interface (adapter sold separately). Typing has never been more intuitive.',
    price: 249.99,
    imageUrl: '/assets/cybernetic-keyboard.jpg',
    aiHint: 'mechanical keyboard'
  },
  {
    id: 'prod_004',
    name: 'AI-Powered Coffee Mug',
    description: 'This smart mug keeps your coffee at the perfect temperature and provides daily affirmations powered by a tiny AI.',
    price: 49.99,
    imageUrl: '/assets/ai-powered-coffee-mug.jpg',
    aiHint: 'smart mug'
  },
  {
    id: 'prod_005',
    name: 'Holographic Desk Plant',
    description: 'A beautiful, maintenance-free holographic plant for your desk. Choose from over 100 species.',
    price: 39.99,
    imageUrl: '/assets/holographic-desk-plant.jpg',
    aiHint: 'holographic plant'
  },
  {
    id: 'prod_006',
    name: 'Anti-Gravity Pen',
    description: 'Write upside down, underwater, or in zero gravity. This pen defies physics for the ultimate writing experience.',
    price: 29.99,
    imageUrl: '/assets/anti-gravity-pen.jpg',
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
