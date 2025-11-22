import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, Layers, BookOpen, Calendar, Clock, PenTool, MessageSquare, Settings } from 'lucide-react';
import GlassView from './GlassView';
const TabBar = () => {
    const location = useLocation();
    const activeColor = '#D4AF37';
    const inactiveColor = 'rgba(255, 255, 255, 0.5)';
    const backgroundColor = 'rgba(20, 20, 20, 0.85)';
    if (location.pathname === '/')
        return null;
    const tabs = [
        { path: '/stats', icon: BarChart2, label: 'Stats' },
        { path: '/flashcards', icon: Layers, label: 'Flashcards' },
        { path: '/dump', icon: BookOpen, label: 'Dump' },
        { path: '/calendar', icon: Calendar, label: 'Plan' },
        { path: '/timer', icon: Clock, label: 'Focus' },
        { path: '/syllabus', icon: PenTool, label: 'Syllabus' },
        { path: '/chat', icon: MessageSquare, label: 'AI' },
        { path: '/settings', icon: Settings, label: 'Config' },
    ];
    return (<View style={styles.floatingTabContainer}>
            <GlassView style={[styles.tabBar, { backgroundColor }]} intensity={40} borderOpacity={0.1}>
                {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (<Link to={tab.path} key={tab.path} style={{ textDecoration: 'none', flex: 1 }}>
                            <View style={styles.tabItem}>
                                <tab.icon size={22} color={isActive ? activeColor : inactiveColor}/>
                                {isActive && (<View style={[styles.activeDot, { backgroundColor: activeColor }]}/>)}
                            </View>
                        </Link>);
        })}
            </GlassView>
        </View>);
};
const styles = StyleSheet.create({
    floatingTabContainer: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    tabBar: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 35,
        width: '100%',
        maxWidth: 500,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },
    activeDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        marginTop: 4,
    },
});
export default TabBar;
