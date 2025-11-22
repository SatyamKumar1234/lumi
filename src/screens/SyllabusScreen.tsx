import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import GlassView from '../components/GlassView';
import { Plus, Trash2, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

const SyllabusScreen = () => {
    const { theme } = useContext(ThemeContext);
    const [subjects, setSubjects] = useState([
        {
            id: 1,
            name: 'Physics',
            chapters: [
                { id: 101, name: 'Kinematics', progress: 100 },
                { id: 102, name: 'Dynamics', progress: 50 },
                { id: 103, name: 'Thermodynamics', progress: 0 },
            ],
            expanded: true
        },
        {
            id: 2,
            name: 'Mathematics',
            chapters: [
                { id: 201, name: 'Calculus', progress: 80 },
                { id: 202, name: 'Algebra', progress: 30 },
            ],
            expanded: false
        }
    ]);

    const [newSubjectName, setNewSubjectName] = useState('');
    const [isAddingSubject, setIsAddingSubject] = useState(false);

    const toggleExpand = (id: number) => {
        setSubjects(subjects.map(s => s.id === id ? { ...s, expanded: !s.expanded } : s));
    };

    const updateProgress = (subjectId: number, chapterId: number, newProgress: number) => {
        setSubjects(subjects.map(s => {
            if (s.id === subjectId) {
                return {
                    ...s,
                    chapters: s.chapters.map(c => c.id === chapterId ? { ...c, progress: newProgress } : c)
                };
            }
            return s;
        }));
    };

    const deleteSubject = (id: number) => {
        setSubjects(subjects.filter(s => s.id !== id));
    };

    const addSubject = () => {
        if (!newSubjectName.trim()) return;
        const newSubject = {
            id: Date.now(),
            name: newSubjectName,
            chapters: [],
            expanded: true
        };
        setSubjects([...subjects, newSubject]);
        setNewSubjectName('');
        setIsAddingSubject(false);
    };

    const addChapter = (subjectId: number) => {
        const chapterName = prompt("Enter Chapter Name:"); // Simple prompt for web
        if (!chapterName) return;

        setSubjects(subjects.map(s => {
            if (s.id === subjectId) {
                return {
                    ...s,
                    chapters: [...s.chapters, { id: Date.now(), name: chapterName, progress: 0 }]
                };
            }
            return s;
        }));
    };

    const calculateTotalProgress = (chapters: any[]) => {
        if (chapters.length === 0) return 0;
        const total = chapters.reduce((acc, curr) => acc + curr.progress, 0);
        return Math.round(total / chapters.length);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.headerRow}>
                <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Syllabus Meter</Text>
                <TouchableOpacity onPress={() => setIsAddingSubject(!isAddingSubject)}>
                    <GlassView style={styles.addButton}>
                        <Plus size={24} color={theme.colors.primary} />
                    </GlassView>
                </TouchableOpacity>
            </View>

            {isAddingSubject && (
                <GlassView style={[styles.addSubjectCard, { backgroundColor: theme.colors.card }]}>
                    <TextInput
                        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
                        placeholder="Subject Name"
                        placeholderTextColor={theme.colors.textSecondary}
                        value={newSubjectName}
                        onChangeText={setNewSubjectName}
                    />
                    <TouchableOpacity onPress={addSubject} style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}>
                        <Text style={{ color: '#FFF', fontWeight: '600' }}>Add</Text>
                    </TouchableOpacity>
                </GlassView>
            )}

            {subjects.map(subject => (
                <GlassView key={subject.id} style={[styles.subjectCard, { backgroundColor: theme.colors.card }]}>
                    <TouchableOpacity
                        style={styles.subjectHeader}
                        onPress={() => toggleExpand(subject.id)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.subjectInfo}>
                            <Text style={[styles.subjectName, { color: theme.colors.text }]}>{subject.name}</Text>
                            <Text style={[styles.subjectProgress, { color: theme.colors.textSecondary }]}>
                                {calculateTotalProgress(subject.chapters)}% Done
                            </Text>
                        </View>
                        <View style={styles.headerActions}>
                            <TouchableOpacity onPress={() => deleteSubject(subject.id)} style={{ marginRight: 10 }}>
                                <Trash2 size={18} color={theme.colors.danger} />
                            </TouchableOpacity>
                            {subject.expanded ?
                                <ChevronUp size={20} color={theme.colors.textSecondary} /> :
                                <ChevronDown size={20} color={theme.colors.textSecondary} />
                            }
                        </View>
                    </TouchableOpacity>

                    {subject.expanded && (
                        <View style={styles.chaptersList}>
                            {subject.chapters.map(chapter => (
                                <View key={chapter.id} style={styles.chapterRow}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.chapterName, { color: theme.colors.text }]}>{chapter.name}</Text>
                                        <View style={styles.progressBarBg}>
                                            <View
                                                style={[
                                                    styles.progressBarFill,
                                                    {
                                                        width: `${chapter.progress}%`,
                                                        backgroundColor: chapter.progress === 100 ? theme.colors.success : theme.colors.primary
                                                    }
                                                ]}
                                            />
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => updateProgress(subject.id, chapter.id, chapter.progress === 100 ? 0 : 100)}
                                        style={{ marginLeft: 15 }}
                                    >
                                        <CheckCircle
                                            size={24}
                                            color={chapter.progress === 100 ? theme.colors.success : theme.colors.border}
                                            fill={chapter.progress === 100 ? theme.colors.success + '20' : 'transparent'}
                                        />
                                    </TouchableOpacity>
                                </View>
                            ))}
                            <TouchableOpacity
                                style={[styles.addChapterBtn, { borderColor: theme.colors.border }]}
                                onPress={() => addChapter(subject.id)}
                            >
                                <Plus size={16} color={theme.colors.textSecondary} />
                                <Text style={[styles.addChapterText, { color: theme.colors.textSecondary }]}>Add Chapter</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </GlassView>
            ))}
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
    addButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addSubjectCard: {
        padding: 15,
        borderRadius: 16,
        marginBottom: 20,
        flexDirection: 'row',
        gap: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        outlineStyle: 'none',
    },
    saveButton: {
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subjectCard: {
        borderRadius: 20,
        marginBottom: 15,
        overflow: 'hidden',
    },
    subjectHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    subjectName: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 4,
    },
    subjectProgress: {
        fontSize: 14,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chaptersList: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    chapterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    chapterName: {
        fontSize: 16,
        marginBottom: 8,
    },
    progressBarBg: {
        height: 6,
        backgroundColor: 'rgba(128,128,128, 0.2)',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
    },
    addChapterBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 12,
        gap: 8,
        marginTop: 5,
    },
    addChapterText: {
        fontSize: 14,
        fontWeight: '600',
    },
});

export default SyllabusScreen;
