export const lightTheme = {
    colors: {
        primary: '#007AFF',
        background: '#F2F2F7',
        card: 'rgba(255, 255, 255, 0.65)',
        text: '#000000',
        textSecondary: '#8E8E93',
        border: '#C6C6C8',
        notification: '#FF3B30',
        danger: '#FF3B30',
        success: '#34C759',
        warning: '#FFCC00',
        glassBorder: 'rgba(255, 255, 255, 0.2)',
        glassBackground: 'rgba(255, 255, 255, 0.2)',
    },
    spacing: {
        s: 8,
        m: 16,
        l: 24,
        xl: 32,
    },
    borderRadius: {
        s: 8,
        m: 12,
        l: 20, // iOS 15+ style
        xl: 32,
    },
    shadows: {
        default: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 2,
        },
    },
};
export const darkTheme = {
    colors: {
        primary: '#0A84FF',
        background: '#000000',
        card: 'rgba(28, 28, 30, 0.65)',
        text: '#FFFFFF',
        textSecondary: '#8E8E93',
        border: '#38383A',
        notification: '#FF453A',
        danger: '#FF453A',
        success: '#32D74B',
        warning: '#FFD60A',
        glassBorder: 'rgba(255, 255, 255, 0.1)',
        glassBackground: 'rgba(0, 0, 0, 0.3)',
    },
    spacing: lightTheme.spacing,
    borderRadius: lightTheme.borderRadius,
    shadows: lightTheme.shadows,
};
export const creamTheme = {
    colors: {
        primary: '#D4AF37', // Gold/Bronze
        background: '#FDFBF7', // Warm Cream
        card: 'rgba(255, 250, 240, 0.7)', // Warm White
        text: '#4A4036', // Dark Brown
        textSecondary: '#8C7B6C', // Light Brown
        border: '#E6DCCF',
        notification: '#D9534F',
        danger: '#D9534F',
        success: '#5CB85C',
        warning: '#F0AD4E',
        glassBorder: 'rgba(74, 64, 54, 0.1)',
        glassBackground: 'rgba(253, 251, 247, 0.4)',
    },
    spacing: lightTheme.spacing,
    borderRadius: lightTheme.borderRadius,
    shadows: lightTheme.shadows,
};
export const midnightTheme = {
    colors: {
        primary: '#00FFFF', // Cyan
        background: '#050510', // Deep Blue/Black
        card: 'rgba(20, 20, 40, 0.7)',
        text: '#E0E0FF', // Cool White
        textSecondary: '#8080A0',
        border: '#202040',
        notification: '#FF0055',
        danger: '#FF0055',
        success: '#00FF99',
        warning: '#FFFF00',
        glassBorder: 'rgba(100, 100, 255, 0.2)',
        glassBackground: 'rgba(10, 10, 30, 0.5)',
    },
    spacing: lightTheme.spacing,
    borderRadius: lightTheme.borderRadius,
    shadows: lightTheme.shadows,
};
export const forestTheme = {
    colors: {
        primary: '#4CAF50', // Green
        background: '#1A2F1A', // Dark Green
        card: 'rgba(30, 50, 30, 0.7)',
        text: '#E8F5E9', // Off-white green
        textSecondary: '#A5D6A7',
        border: '#2E4C2E',
        notification: '#FF6B6B',
        danger: '#FF6B6B',
        success: '#66BB6A',
        warning: '#FFD54F',
        glassBorder: 'rgba(255, 255, 255, 0.1)',
        glassBackground: 'rgba(20, 40, 20, 0.4)',
    },
    spacing: lightTheme.spacing,
    borderRadius: lightTheme.borderRadius,
    shadows: lightTheme.shadows,
};
export const themes = {
    light: lightTheme,
    dark: darkTheme,
    cream: creamTheme,
    midnight: midnightTheme,
    forest: forestTheme,
};
export const theme = lightTheme; // Default export for backward compatibility
