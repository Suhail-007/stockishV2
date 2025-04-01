import { MD3Theme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

const tintColorLight = '#2f95dc';
const tintColorDark = '#ffffff';

const Colors = {
  light: {
    // 🎨 Backgrounds
    screenBg: '#F5F5F5',
    background: '#FFFFFF',
    secondaryBg: '#F5F5F5',
    cardBg: '#32A08B',
    backgroundWhite: '#FFFFFF',
    errorBg: '#f2dede',
    successBg: '#e1fbfc',

    // 🟦 Buttons
    buttonBg: '#007CBB',
    buttonBgSecondary: '#2969B7',

    //Tertiary
    tertiary: '#2969B7',

    // 🔤 Text
    textPrimary: '#333333',
    textSecondary: '#666666',
    text: '#000000',
    textWhite: '#FFFFFF',

    // 🌟 Accents & Highlights
    tint: tintColorLight,
    activeTabHighlight: '#6851A4',
    hoverEffects: '#008BB0',

    // ✅ Status & Alerts
    success: '#00979E',
    warning: '#FFA500',
    errorText: '#D32F2F',

    // 🎛 Icons & Borders

    tabIconDefault: '#CCCCCC',
    tabIconSelected: tintColorLight,
    statusBarContent: '#D32F2F',

    //inputs
    borderDefault: '#CCCCCC',
    borderFocused: '#2969B7',
    borderError: '#D32F2F',
    borderDisabled: '#E0E0E0',

    //shades
    primary100: '#cfc1f2'
  },

  dark: {
    // 🎨 Backgrounds
    screenBg: '#121212',
    background: '#1E1E1E',
    secondaryBg: '#2A2A2A',
    cardBg: '#257767',
    backgroundWhite: '#FFFFFF',
    errorBg: '#6c3636',
    successBg: '#1b5e20',

    // 🟦 Buttons
    buttonBg: '#005A8E',
    buttonBgSecondary: '#1E4E89',

    // 🔤 Text
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B0',
    text: '#FFFFFF',
    textWhite: '#FFFFFF',

    // 🌟 Accents & Highlights
    tint: tintColorDark,
    activeTabHighlight: '#6851A4',
    hoverEffects: '#008BB0',

    // ✅ Status & Alerts
    success: '#00979E',
    warning: '#FFA500',
    errorText: '#D32F2F',

    // 🎛 Icons & Borders
    tertiary: '#3671b9',
    tabIconDefault: '#888888',
    tabIconSelected: tintColorDark,
    statusBarContent: '#D32F2F',

    //Inputs
    borderDefault: '#444444',
    borderFocused: '#3671b9',
    borderError: '#FF6B6B',
    borderDisabled: '#555555',

    //shades
    primary100: '#cfc1f2'
  }
};

// Primary UI Elements
// App Bar / Navigation Bar → #6851A4 (Deep Purple for branding and consistency)

// Primary Button Background (e.g., "Add Item", "Save") → #007CBB (Bright Blue for strong CTA)

// Secondary Button Background (e.g., "Cancel") → #2969B7 (Dark Blue for contrast)

// Floating Action Button (FAB) → #008BB0 (Teal Blue to keep it visually distinct)

// 📊 Inventory Data & Lists
// Card Background → #32A08B (Muted Green for a clean and soft contrast)

// Icons / Actionable Items (Edit, Delete, View Details) → #2969B7 (Dark Blue for intuitive actions)

// Text on Buttons (Primary & Secondary) → #FFFFFF (White for readability)

// ⚠️ Status Indicators
// Success Messages (Item Added, Sync Successful) → #00979E (Aqua Green for a positive feel)

// Warning / Caution (Low Stock, Expiring Soon) → Yellow/Orange (You might need a warning color like #FFA500 for contrast)

// Error Messages (Failed Sync, Invalid Input) → Red (#D32F2F) (A color outside your palette to stand out clearly)

// 🎨 Background & Highlights
// Screen Background → Light Gray (#F5F5F5) (Use a neutral tone to contrast with your primary colors)

// Active Tab Highlight / Selected Item → #6851A4 (Deep Purple to maintain brand consistency)

// Hover Effects & Links → #008BB0 (Teal Blue for subtle interaction cues)

export type ThemeType<T> = Omit<MD3Theme, 'colors'> & { colors: T & MD3Colors };

export default Colors;
