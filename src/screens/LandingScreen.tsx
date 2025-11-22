import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-dom';
import { Zap, PenTool, MessageSquare, Book } from 'lucide-react';
import { ThemeContext } from '../ThemeContext';
import { UserContext } from '../UserContext';
import GlassView from '../components/GlassView';

const QuickAction = ({ icon: Icon, label, to, color }: { icon: any, label: string, to: string, color: string }) => (
    <Link to={to} style={{ textDecoration: 'none', flex: 1 }}>
        <GlassView style={[styles.actionCard, { backgroundColor: color }]} intensity={20} borderOpacity={0.2}>
            <Icon size={32} color="#FFF" />
            <Text style={styles.actionLabel}>{label}</Text>
        </GlassView>
    </Link>
);

const LandingScreen = () => {
    const { theme } = useContext(ThemeContext);
    const { userName } = useContext(UserContext);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Text style={[styles.date, { color: theme.colors.textSecondary }]}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </Text>
                <Text style={[styles.title, { color: theme.colors.text }]}>Hi {userName}</Text>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
                <View style={styles.grid}>
                    <QuickAction icon={Zap} label="Focus" to="/timer" color={theme.colors.primary} />
                    <QuickAction icon={PenTool} label="Diary" to="/diary" color={theme.colors.warning} />
                </View>
                <View style={[styles.grid, { marginTop: 12 }]}>
                    <QuickAction icon={MessageSquare} label="AI Chat" to="/chat" color={theme.colors.success} />
                    <QuickAction icon={Book} label="Flashcards" to="/flashcards" color={theme.colors.danger} />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
                <GlassView style={[styles.card, { backgroundColor: theme.colors.card }]}>
                    <View style={styles.row}>
                        <Text style={[styles.rowLabel, { color: theme.colors.text }]}>Study Session</Text>
                        <Text style={[styles.rowValue, { color: theme.colors.textSecondary }]}>45 mins</Text>
                    </View>
                    <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
                    <View style={styles.row}>
                        <Text style={[styles.rowLabel, { color: theme.colors.text }]}>Flashcards Reviewed</Text>
                        <Text style={[styles.rowValue, { color: theme.colors.textSecondary }]}>24 cards</Text>
                    </View>
                </GlassView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    content: {
        padding: 20,
        paddingBottom: 100,
    },
    header: {
        marginTop: 20,
        marginBottom: 30,
    },
    date: {
        fontSize: 13,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    title: {
        fontSize: 34,
        fontWeight: '800', // Extra Bold for iOS 17 look
        marginTop: 4,
        letterSpacing: -0.5,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 15,
        letterSpacing: -0.5,
    },
    grid: {
        flexDirection: 'row',
        gap: 12,
    },
    actionCard: {
        padding: 20,
        borderRadius: 24, // More rounded
        height: 130, // Taller
        justifyContent: 'space-between',
        flex: 1,
    },
    actionLabel: {
        fontSize: 17,
        fontWeight: '700',
        color: '#FFF',
    },
    card: {
        borderRadius: 20,
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    rowLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    rowValue: {
        fontSize: 16,
    },
    divider: {
        height: 1,
        marginVertical: 8,
        opacity: 0.3,
    },
});

export default LandingScreen;
