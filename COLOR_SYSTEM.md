# DOC CRM Color System

This document defines the color palette and usage guidelines for the DOC CRM application.

## Color Palette

### Primary Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| White | `#FFFFFF` | Backgrounds, cards, forms |
| Brand Teal | `#0A7A75` | Primary accent, headings, buttons, links |
| Brand Yellow | `#F6D02F` | Secondary accent, highlights, badges, brand name |
| Brand Red | `#D62828` | Alerts, warnings, delete buttons, urgent labels |

## Color Usage Guidelines

### Backgrounds
- **All backgrounds** should use pure white (`#FFFFFF`)
- Cards, forms, and containers should have white backgrounds with subtle shadows

### Text
- **Headings**: Brand Teal (`#0A7A75`)
- **Body text**: Dark gray (`#374151`)
- **Labels/secondary text**: Medium gray (`#6B7280`)
- **Error messages**: Brand Red (`#D62828`)
- **Highlights**: Brand Yellow (`#F6D02F`)

### Buttons
- **Primary buttons**: Brand Teal background with white text
- **Warning/destroy buttons**: Brand Red background with white text
- **Secondary/outline buttons**: White background with Brand Teal border and text
- **Accent buttons**: White background with Brand Yellow text and border

### Borders & Dividers
- **Card borders**: Light gray (`#E5E7EB`)
- **Form input borders**: Light gray (`#E5E7EB`)
- **Focus states**: Brand Teal (`#0A7A75`)
- **Error states**: Brand Red (`#D62828`)

### Icons
- **Default icons**: Brand Teal (`#0A7A75`)
- **Hover state**: Brand Yellow (`#F6D02F`)
- **Warning icons**: Brand Red (`#D62828`)

### Interactive Elements
- **Hover states**: Use 10% opacity of the base color
- **Active states**: Use 20% opacity of the base color
- **Focus rings**: Brand Teal with 20% opacity

## Tailwind CSS Configuration

The color palette is defined in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      brand: {
        teal: '#0A7A75',
        yellow: '#F6D02F',
        red: '#D62828',
      },
    },
  },
}
```

## Component-Specific Guidelines

### Navbar
- White background with Brand Teal bottom border
- Brand Teal text for active items
- Brand Yellow for brand name

### Sidebar
- White background with Brand Teal highlights
- Brand Teal for active/hover states

### Cards
- White background with soft shadows
- Brand Teal section headers with bottom border

### Tables
- White background with Brand Teal hover states
- Brand Yellow for badges

### Forms
- White background with rounded corners
- Brand Teal for labels and focus states
- Brand Red for error messages

### Buttons
- Rounded-xl corners
- Soft shadows
- Hover effects with scale transformation