# Navigation Configuration

This directory contains the centralized navigation configuration for the entire application.

## 📁 Files

- **`navigation.ts`** - Main navigation configuration

## 🚀 How to Add New Projects/Pages

### Adding a New Lab/Project Item

To add a new project to the "Labs" dropdown menu, simply edit `config/navigation.ts`:

```typescript
{
  label: 'Labs',
  items: [
    {
      href: '/crud',
      label: 'CRUD Manager',
      description: 'Create, read, update, and delete records',
      icon: '📝'
    },
    // Add your new project here:
    {
      href: '/your-new-page',
      label: 'Your Project Name',
      description: 'Brief description of what it does',
      icon: '🚀' // Optional emoji icon
    },
  ]
},
```

### Adding a New Top-Level Link

To add a new link to the main navigation bar:

```typescript
export const navigationConfig: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  // Add your new link:
  { href: '/new-page', label: 'New Page' },
  // ... rest of the config
];
```

### Creating a New Dropdown Menu

To create a completely new dropdown section (like "Resources", "Tools", etc.):

```typescript
{
  label: 'Resources', // Dropdown button label
  items: [
    {
      href: '/docs',
      label: 'Documentation',
      description: 'Learn how to use our platform',
      icon: '📚'
    },
    {
      href: '/tutorials',
      label: 'Tutorials',
      description: 'Step-by-step guides',
      icon: '🎓'
    },
  ]
},
```

### Changing the Primary CTA Button

To modify the main call-to-action button on the right side of the navbar:

```typescript
export const primaryCTA = {
  href: '/your-link',
  label: 'Your Label',
};
```

## 🎨 Features

- **Automatic Updates**: Changes to `navigation.ts` automatically update both desktop and mobile navigation
- **Dropdown Support**: Easily create nested navigation menus
- **Icons & Descriptions**: Add visual context to dropdown items
- **TypeScript Types**: Full type safety for navigation items
- **Responsive**: Desktop and mobile menus stay in sync
- **Dark Mode**: Fully supports light/dark theme switching

## 📝 Properties Reference

### NavLink
- `href` (string, required) - The page URL
- `label` (string, required) - Display text
- `description` (string, optional) - Additional info shown in dropdowns
- `icon` (string, optional) - Emoji or icon shown in dropdowns

### NavDropdown
- `label` (string, required) - Dropdown button text
- `items` (NavLink[], required) - Array of links in the dropdown

## 🎯 Best Practices

1. **Keep it Simple**: Limit dropdown items to 5-7 for best UX
2. **Use Clear Labels**: Make navigation intuitive
3. **Group Related Items**: Use dropdowns for related pages
4. **Add Descriptions**: Help users understand what each page does
5. **Choose Relevant Icons**: Use emojis that represent the page content

## 🔄 Example: Adding Multiple New Projects

```typescript
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
      href: '/todo',
      label: 'Todo App',
      description: 'Manage your daily tasks efficiently',
      icon: '✅'
    },
    {
      href: '/notes',
      label: 'Notes App',
      description: 'Take quick notes and organize ideas',
      icon: '📔'
    },
    {
      href: '/calculator',
      label: 'Calculator',
      description: 'Perform quick calculations',
      icon: '🧮'
    },
    {
      href: '/weather',
      label: 'Weather Dashboard',
      description: 'Check current weather conditions',
      icon: '🌤️'
    },
  ]
},
```

That's it! Your navigation will automatically update across desktop and mobile views. 🎉

