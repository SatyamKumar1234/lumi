/// <reference types="vite/client" />

declare module 'react-native' {
    import * as React from 'react';
    export const View: any;
    export const Text: any;
    export const StyleSheet: any;
    export const ScrollView: any;
    export const TouchableOpacity: any;
    export const TextInput: any;
    export const Modal: any;
    export const Pressable: any;
    export const Animated: any;
    export const Platform: any;
    export const Dimensions: any;
    export const Alert: any;
    export const Image: any;
    export const SafeAreaView: any;
    export const StatusBar: any;
    export const KeyboardAvoidingView: any;
    export const TouchableWithoutFeedback: any;
    export const Keyboard: any;
    export const ActivityIndicator: any;
    export const FlatList: any;
    export const SectionList: any;
    export const Switch: any;
    export const RefreshControl: any;
    export const PlatformColor: any;
    export const AppRegistry: any;
    export interface ViewProps extends React.HTMLAttributes<HTMLElement> {
        style?: any;
    }
}
