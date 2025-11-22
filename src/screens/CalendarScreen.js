import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import GlassView from '../components/GlassView';
import { Plus, Scan, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { AIService } from '../services/AIService';
const CalendarScreen = () => {
    const { theme } = useContext(ThemeContext);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [exams, setExams] = useState([
        { id: 1, subject: 'Computer Science', date: new Date(Date.now() + 86400000 * 2), time: '09:00 AM' },
        { id: 2, subject: 'History', date: new Date(Date.now() + 86400000 * 5), time: '01:00 PM' },
    ]);
    const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const changeMonth = (increment) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
    };
    const handleScanDatesheet = async () => {
        try {
            // In a real app, this would open the image picker
            const result = await AIService.parseDatesheet('dummy_url');
            const newExams = result.map((exam, index) => ({
                id: Date.now() + index,
                subject: exam.subject,
                date: new Date(exam.date),
                time: exam.time
            }));
            setExams([...exams, ...newExams]);
            alert('Datesheet Scanned! 3 exams added.');
        }
        catch (error) {
            alert(error.message);
        }
    };
    const handleAddEvent = () => {
        const newEvent = {
            id: Date.now(),
            subject: 'Study Session',
            date: new Date(Date.now() + 86400000), // Tomorrow
            time: '10:00 AM',
            type: 'event'
        };
        setExams([...exams, newEvent]);
        alert('New Event Added!');
    };
    const handleDeleteEvent = (id) => {
        setExams(exams.filter(e => e.id !== id));
    };
    const renderCalendarDays = () => {
        const days = [];
        const totalDays = daysInMonth(currentDate);
        const startDay = firstDayOfMonth(currentDate);
        for (let i = 0; i < startDay; i++) {
            days.push(<View key={`empty-${i}`} style={styles.dayCell}/>);
        }
        for (let i = 1; i <= totalDays; i++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            const isToday = new Date().toDateString() === date.toDateString();
            const hasExam = exams.some(e => e.date.toDateString() === date.toDateString());
            days.push(<View key={i} style={styles.dayCell}>
                    <View style={[
                    styles.dayCircle,
                    isToday && { backgroundColor: theme.colors.primary },
                    hasExam && !isToday && { backgroundColor: theme.colors.notification }
                ]}>
                        <Text style={[
                    styles.dayText,
                    (isToday || hasExam) && { color: '#FFF', fontWeight: 'bold' },
                    !isToday && !hasExam && { color: theme.colors.text }
                ]}>{i}</Text>
                    </View>
                </View>);
        }
        return days;
    };
    return (<ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.headerRow}>
                <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Calendar</Text>
                <View style={styles.headerActions}>
                    <TouchableOpacity onPress={handleScanDatesheet}>
                        <GlassView style={styles.iconButton}>
                            <Scan size={20} color={theme.colors.primary}/>
                        </GlassView>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleAddEvent}>
                        <GlassView style={styles.iconButton}>
                            <Plus size={20} color={theme.colors.primary}/>
                        </GlassView>
                    </TouchableOpacity>
                </View>
            </View>

            <GlassView style={[styles.calendarCard, { backgroundColor: theme.colors.card }]}>
                <View style={styles.monthHeader}>
                    <TouchableOpacity onPress={() => changeMonth(-1)}>
                        <ChevronLeft size={24} color={theme.colors.text}/>
                    </TouchableOpacity>
                    <Text style={[styles.monthTitle, { color: theme.colors.text }]}>
                        {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </Text>
                    <TouchableOpacity onPress={() => changeMonth(1)}>
                        <ChevronRight size={24} color={theme.colors.text}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.weekDays}>
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (<Text key={i} style={[styles.weekDayText, { color: theme.colors.textSecondary }]}>{d}</Text>))}
                </View>
                <View style={styles.daysGrid}>
                    {renderCalendarDays()}
                </View>
            </GlassView>

            <Text style={[styles.sectionHeader, { color: theme.colors.textSecondary }]}>UPCOMING EXAMS</Text>

            {exams.map((exam) => (<GlassView key={exam.id} style={[styles.examCard, { backgroundColor: theme.colors.card }]}>
                    <View style={styles.examDateBox}>
                        <Text style={[styles.examDateDay, { color: theme.colors.primary }]}>{exam.date.getDate()}</Text>
                        <Text style={[styles.examDateMonth, { color: theme.colors.primary }]}>
                            {exam.date.toLocaleDateString('en-US', { month: 'short' })}
                        </Text>
                    </View>
                    <View style={styles.examInfo}>
                        <Text style={[styles.examSubject, { color: theme.colors.text }]}>{exam.subject}</Text>
                        <Text style={[styles.examTime, { color: theme.colors.textSecondary }]}>
                            {exam.date.toLocaleDateString('en-US', { weekday: 'long' })} • {exam.time}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => handleDeleteEvent(exam.id)} style={{ marginLeft: 10 }}>
                        <Trash2 size={20} color={theme.colors.textSecondary}/>
                    </TouchableOpacity>
                </GlassView>))}

        </ScrollView>);
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
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    headerActions: {
        flexDirection: 'row',
        gap: 10,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    calendarCard: {
        borderRadius: 24,
        padding: 20,
        marginBottom: 30,
    },
    monthHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    monthTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    weekDays: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    weekDayText: {
        fontSize: 13,
        fontWeight: '600',
        width: 30,
        textAlign: 'center',
    },
    daysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayCell: {
        width: '14.28%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayText: {
        fontSize: 15,
        fontWeight: '500',
    },
    sectionHeader: {
        fontSize: 13,
        marginBottom: 15,
        marginLeft: 10,
        textTransform: 'uppercase',
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    examCard: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 20,
        marginBottom: 12,
        alignItems: 'center',
    },
    examDateBox: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 16,
        borderRightWidth: 1,
        borderRightColor: 'rgba(128,128,128, 0.2)',
        marginRight: 16,
    },
    examDateDay: {
        fontSize: 20,
        fontWeight: '800',
    },
    examDateMonth: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    examInfo: {
        flex: 1,
    },
    examSubject: {
        fontSize: 17,
        fontWeight: '700',
        marginBottom: 4,
    },
    examTime: {
        fontSize: 14,
    },
    countdownTag: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
    },
    countdownText: {
        fontSize: 13,
        fontWeight: '700',
    },
});
export default CalendarScreen;
