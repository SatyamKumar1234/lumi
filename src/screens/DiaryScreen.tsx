import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import GlassView from '../components/GlassView';
import { Plus, Save, Trash2, Edit3 } from 'lucide-react';

const DiaryScreen = () => {
    const { theme } = useContext(ThemeContext);
    const [notes, setNotes] = useState([
        { id: 1, title: 'Project Ideas', content: '1. AI Study Buddy\n2. React Native App\n3. Glassmorphism UI', date: 'Oct 24, 2023' },
        { id: 2, title: 'Meeting Notes', content: 'Discussed the new design system. Need to update color palette.', date: 'Oct 22, 2023' },
    ]);
    const [selectedNote, setSelectedNote] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSave = () => {
        if (!title.trim() && !content.trim()) return;

        const date = new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        if (selectedNote) {
            // Update existing
            const updatedNotes = notes.map(n =>
                n.id === selectedNote.id ? { ...n, title, content, date } : n
            );
            setNotes(updatedNotes);
        } else {
            // Create new
            const newNote = {
                id: Date.now(),
                title: title || 'Untitled Note',
                content,
                date
            };
            setNotes([newNote, ...notes]);
        }
        resetEditor();
    };

    const handleDelete = (id: number) => {
        setNotes(notes.filter(n => n.id !== id));
        if (selectedNote?.id === id) resetEditor();
    };

    const openNote = (note: any) => {
        setSelectedNote(note);
        setTitle(note.title);
        setContent(note.content);
        setIsEditing(true);
    };

    const resetEditor = () => {
        setSelectedNote(null);
        setTitle('');
        setContent('');
        setIsEditing(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Notes</Text>
                <TouchableOpacity
                    onPress={() => { resetEditor(); setIsEditing(true); }}
                    activeOpacity={0.7}
                >
                    <GlassView style={styles.addButton}>
                        <Plus size={24} color={theme.colors.primary} />
                    </GlassView>
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                {/* Sidebar List (or full width on mobile) */}
                {!isEditing ? (
                    <ScrollView style={styles.notesList} contentContainerStyle={{ paddingBottom: 100 }}>
                        {notes.map((note) => (
                            <GlassView
                                key={note.id}
                                style={[styles.noteCard, { backgroundColor: theme.colors.card }]}
                                onPress={() => openNote(note)}
                            >
                                <View style={styles.noteHeader}>
                                    <Text style={[styles.noteTitle, { color: theme.colors.text }]} numberOfLines={1}>
                                        {note.title}
                                    </Text>
                                    <Text style={[styles.noteDate, { color: theme.colors.textSecondary }]}>
                                        {note.date}
                                    </Text>
                                </View>
                                <Text style={[styles.notePreview, { color: theme.colors.textSecondary }]} numberOfLines={2}>
                                    {note.content}
                                </Text>
                            </GlassView>
                        ))}
                    </ScrollView>
                ) : (
                    <KeyboardAvoidingView
                        style={styles.editorContainer}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <GlassView style={[styles.editorCard, { backgroundColor: theme.colors.card }]}>
                            <View style={styles.editorToolbar}>
                                <TouchableOpacity onPress={resetEditor}>
                                    <Text style={{ color: theme.colors.primary, fontSize: 16 }}>Cancel</Text>
                                </TouchableOpacity>
                                <View style={styles.editorActions}>
                                    {selectedNote && (
                                        <TouchableOpacity onPress={() => handleDelete(selectedNote.id)} style={styles.actionBtn}>
                                            <Trash2 size={20} color={theme.colors.danger} />
                                        </TouchableOpacity>
                                    )}
                                    <TouchableOpacity onPress={handleSave} style={styles.actionBtn}>
                                        <Save size={20} color={theme.colors.primary} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TextInput
                                style={[styles.titleInput, { color: theme.colors.text }]}
                                placeholder="Title"
                                placeholderTextColor={theme.colors.textSecondary}
                                value={title}
                                onChangeText={setTitle}
                            />
                            <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
                            <TextInput
                                style={[styles.contentInput, { color: theme.colors.text }]}
                                placeholder="Start typing..."
                                placeholderTextColor={theme.colors.textSecondary}
                                value={content}
                                onChangeText={setContent}
                                multiline
                                textAlignVertical="top"
                            />
                        </GlassView>
                    </KeyboardAvoidingView>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
    contentContainer: {
        flex: 1,
    },
    notesList: {
        flex: 1,
    },
    noteCard: {
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
    },
    noteHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    noteTitle: {
        fontSize: 17,
        fontWeight: '700',
        flex: 1,
        marginRight: 10,
    },
    noteDate: {
        fontSize: 14,
    },
    notePreview: {
        fontSize: 15,
        lineHeight: 20,
    },
    editorContainer: {
        flex: 1,
    },
    editorCard: {
        flex: 1,
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
    },
    editorToolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    editorActions: {
        flexDirection: 'row',
        gap: 15,
    },
    actionBtn: {
        padding: 5,
    },
    titleInput: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 15,
        outlineStyle: 'none',
    },
    divider: {
        height: 1,
        marginBottom: 15,
        opacity: 0.5,
    },
    contentInput: {
        flex: 1,
        fontSize: 16,
        lineHeight: 24,
        outlineStyle: 'none',
    },
});

export default DiaryScreen;
