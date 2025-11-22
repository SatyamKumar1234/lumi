import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
const { width, height } = Dimensions.get('window');
const getThemeColors = (themeId) => {
    switch (themeId) {
        case 'cream':
            return { bg: '#FDFBF7', b1: '#E6DCCF', b2: '#D4AF37', b3: '#F0AD4E', overlay: 'rgba(255,255,255,0.2)' };
        case 'midnight':
            return { bg: '#050510', b1: '#000033', b2: '#00FFFF', b3: '#FF0055', overlay: 'rgba(0,0,0,0.4)' };
        case 'forest':
            return { bg: '#1A2F1A', b1: '#2E4C2E', b2: '#4CAF50', b3: '#66BB6A', overlay: 'rgba(0,0,0,0.3)' };
        case 'dark':
            return { bg: '#000000', b1: '#4F46E5', b2: '#06B6D4', b3: '#C026D3', overlay: 'rgba(0,0,0,0.6)' };
        default: // light
            return { bg: '#F2F2F7', b1: '#4F46E5', b2: '#06B6D4', b3: '#C026D3', overlay: 'rgba(255,255,255,0.1)' };
    }
};
const BackgroundGradient = ({ children, themeId = 'light', customBackground }) => {
    const colors = getThemeColors(themeId);
    return (<View style={[styles.container, { backgroundColor: colors.bg }]}>
            <View style={[styles.background, { backgroundColor: colors.bg }]}>
                {customBackground ? (<>
                        <Image source={{ uri: customBackground }} style={StyleSheet.absoluteFillObject} resizeMode="cover"/>
                        <View style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.3)' }]}/>
                    </>) : (<>
                        {/* Mesh Gradient Blobs */}
                        <View style={[styles.blob, styles.blob1, { backgroundColor: colors.b1 }]}/>
                        <View style={[styles.blob, styles.blob2, { backgroundColor: colors.b2 }]}/>
                        <View style={[styles.blob, styles.blob3, { backgroundColor: colors.b3 }]}/>

                        {/* Overlay to blend them */}
                        <View style={[styles.overlay, { backgroundColor: colors.overlay }]}/>
                    </>)}
            </View>
            <View style={styles.content}>
                {children}
            </View>
        </View>);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
        zIndex: 0,
    },
    content: {
        flex: 1,
        zIndex: 1,
    },
    blob: {
        position: 'absolute',
        borderRadius: 999,
        opacity: 0.6,
    },
    blob1: {
        width: width * 0.8,
        height: width * 0.8,
        top: -width * 0.2,
        left: -width * 0.2,
        transform: [{ scale: 1.5 }],
    },
    blob2: {
        width: width * 0.9,
        height: width * 0.9,
        top: height * 0.2,
        right: -width * 0.3,
        transform: [{ scale: 1.2 }],
    },
    blob3: {
        width: width * 1.0,
        height: width * 1.0,
        bottom: -width * 0.3,
        left: -width * 0.2,
        transform: [{ scale: 1.4 }],
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backdropFilter: 'blur(60px)', // Softer blur
        WebkitBackdropFilter: 'blur(60px)',
    },
});
export default BackgroundGradient;
