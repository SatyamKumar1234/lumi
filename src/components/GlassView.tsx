import React, { useRef } from 'react';
import { View, StyleSheet, Platform, ViewProps, Pressable, Animated } from 'react-native';

interface GlassViewProps extends ViewProps {
    intensity?: number;
    style?: any;
    children?: React.ReactNode;
    onPress?: () => void;
    borderOpacity?: number;
}

const GlassView: React.FC<GlassViewProps> = ({ children, style, intensity = 20, onPress, borderOpacity = 0.2, ...props }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.96,
            useNativeDriver: true,
            speed: 20,
            bounciness: 10,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            speed: 20,
            bounciness: 10,
        }).start();
    };

    const Container = onPress ? Pressable : View;

    return (
        <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
            <Container
                onPress={onPress}
                onPressIn={onPress ? handlePressIn : undefined}
                onPressOut={onPress ? handlePressOut : undefined}
                style={[
                    styles.glass,
                    // @ts-ignore - Web specific style for backdrop-filter
                    Platform.select({
                        web: {
                            backdropFilter: `blur(${intensity}px)`,
                            WebkitBackdropFilter: `blur(${intensity}px)`,
                        },
                    }),
                    !onPress && style, // Apply style here if not animated wrapper
                ]}
                {...props}
            >
                {children}
            </Container>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    glass: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Much more transparent
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 5,
    },
});

export default GlassView;
