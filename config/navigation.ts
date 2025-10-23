export interface NavLink {
  href: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface NavDropdown {
  label: string;
  items: NavLink[];
}

export type NavItem = NavLink | NavDropdown;

// Helper function to check if item is a dropdown
export function isDropdown(item: NavItem): item is NavDropdown {
  return 'items' in item;
}

// Main navigation configuration
export const navigationConfig: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/portfolio', label: 'Portfolio' },
  
  // Dynamic Projects/Labs dropdown - easily add more items here
  {
    label: 'Labs',
    items: [
      {
        href: '/crud',
        label: 'CRUD Manager',
        description: 'Create, read, update, and delete records',
        icon: '📝'
      },
      {
        href: '/tic-tac-toe',
        label: 'Tic-Tac-Toe',
        description: 'Play classic game with AI opponent',
        icon: '⭕'
      },
      {
        href: '/calculator',
        label: 'Calculator',
        description: 'Advanced calculator with history',
        icon: '🧮'
      },
      {
        href: '/users-table',
        label: 'Users Table',
        description: 'Browse users with sorting',
        icon: '👥'
      },
      {
        href: '/posts-table',
        label: 'Posts Table',
        description: 'View posts with pagination',
        icon: '📄'
      },
      {
        href: '/todos-table',
        label: 'Todos Table',
        description: 'Filter completed/pending todos',
        icon: '✅'
      },
      {
        href: '/quotes-table',
        label: 'Quotes Table',
        description: 'Random inspirational quotes',
        icon: '💭'
      },
      // 🚀 Add more project ideas here as you build them:
      // Uncomment and modify these templates, or create your own!
      
      // {
      //   href: '/todo',
      //   label: 'Todo App',
      //   description: 'Manage your daily tasks efficiently',
      //   icon: '✅'
      // },
      // {
      //   href: '/notes',
      //   label: 'Notes App',
      //   description: 'Take quick notes and organize ideas',
      //   icon: '📔'
      // },
      // {
      //   href: '/weather',
      //   label: 'Weather Dashboard',
      //   description: 'Check current weather conditions',
      //   icon: '🌤️'
      // },
      // {
      //   href: '/timer',
      //   label: 'Pomodoro Timer',
      //   description: 'Stay focused with timed work sessions',
      //   icon: '⏱️'
      // },
    ]
  },
  
  { href: '/contact', label: 'Contact' },
];

// Primary CTA button (appears on right side of navbar)
export const primaryCTA = {
  href: '/contact',
  label: 'Get Started',
};

