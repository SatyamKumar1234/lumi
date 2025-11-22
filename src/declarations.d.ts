declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';

// Help TypeScript understand react-native-web types
declare module 'react-native' {
    export * from 'react-native-web';
}
