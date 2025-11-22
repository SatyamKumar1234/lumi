import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import GlassView from '../components/GlassView';
const StatRow = ({ label, value, isLast, theme }) => (<View>
        <View style={styles.row}>
            <Text style={[styles.rowLabel, { color: theme.colors.text }]}>{label}</Text>
            <Text style={[styles.rowValue, { color: theme.colors.textSecondary }]}>{value}</Text>
        </View>
        {!isLast && <View style={[styles.divider, { backgroundColor: theme.colors.border }]}/>}
    </View>);
const StatsScreen = () => {
    const { theme } = useContext(ThemeContext);
    return (<ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Statistics</Text>

            <Text style={[styles.sectionHeader, { color: theme.colors.textSecondary }]}>THIS WEEK</Text>
            <GlassView style={[styles.card, { backgroundColor: theme.colors.card }]}>
                <StatRow label="Total Focus Time" value="12h 30m" theme={theme}/>
                <StatRow label="Daily Average" value="2h 05m" theme={theme}/>
                <StatRow label="Tasks Completed" value="14" isLast theme={theme}/>
            </GlassView>

            <Text style={[styles.sectionHeader, { color: theme.colors.textSecondary }]}>PERFORMANCE</Text>
            <GlassView style={[styles.card, { backgroundColor: theme.colors.card }]}>
                <StatRow label="Focus Score" value="85%" theme={theme}/>
                <StatRow label="Streak" value="5 Days" isLast theme={theme}/>
            </GlassView>
        </ScrollView>);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    content: {
        padding: 20,
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: '800',
        marginBottom: 20,
        marginTop: 20,
        letterSpacing: -0.5,
    },
    sectionHeader: {
        fontSize: 13,
        marginBottom: 10,
        marginLeft: 10,
        textTransform: 'uppercase',
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    card: {
        borderRadius: 20,
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        alignItems: 'center',
    },
    rowLabel: {
        fontSize: 17,
        fontWeight: '500',
    },
    rowValue: {
        fontSize: 17,
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        marginLeft: 0,
        opacity: 0.5,
    },
});
export default StatsScreen;
