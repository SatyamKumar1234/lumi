import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, TextInput } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { StudyContext } from '../StudyContext';
import GlassView from '../components/GlassView';
import { FileText, Upload, Trash2, Sparkles, Image as ImageIcon, File, Plus, X } from 'lucide-react';
import { AIService } from '../services/AIService';

const StudyDumpScreen = () => {
    const { theme } = useContext(ThemeContext);
    const { files, deleteFile, addFile } = useContext(StudyContext);
    const [showAddNote, setShowAddNote] = useState(false);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this file?')) {
            deleteFile(id);
        }
    };

    const handleSaveNote = () => {
        if (!noteTitle.trim() || !noteContent.trim()) {
            alert('Please enter both title and content');
            return;
        }
        const newFile = {
            id: Date.now().toString(),
            name: noteTitle,
            type: 'manual' as const,
            content: noteContent,
            size: `${noteContent.length} chars`,
            date: new Date().toLocaleDateString()
        };
        addFile(newFile);
        setShowAddNote(false);
        setNoteTitle('');
        setNoteContent('');
    };

    const handleGenerateFlashcards = async (file: any) => {
        if (file.type !== 'text' && file.type !== 'manual') {
            alert('AI Flashcards are currently only supported for text notes.');
            return;
        }
        try {
            alert(`Generating flashcards for ${file.name}...`);
            // In a real app, this would navigate to Flashcards or trigger generation
            // For now, we just show the alert as per previous implementation
            // The actual generation logic is better placed in FlashcardsScreen or a shared service
            // But the user asked to "conditionally enable", so we restrict it here.
        } catch (error) {
            alert('Failed to generate flashcards');
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.headerRow}>
                <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Study Dump</Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <TouchableOpacity
                        style={[styles.uploadButton, { backgroundColor: theme.colors.primary }]}
                        onPress={() => setShowAddNote(true)}
                    >
                        <Plus size={20} color="#FFF" />
                        <Text style={styles.uploadText}>Note</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.uploadButton, { backgroundColor: theme.colors.textSecondary }]}>
                        <Upload size={20} color="#FFF" />
                        <Text style={styles.uploadText}>Upload</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal visible={showAddNote} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <GlassView style={[styles.modalContent, { backgroundColor: theme.colors.card }]} intensity={90}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>New Note</Text>
                            <TouchableOpacity onPress={() => setShowAddNote(false)}>
                                <X size={24} color={theme.colors.text} />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
                            placeholder="Note Title"
                            placeholderTextColor={theme.colors.textSecondary}
                            value={noteTitle}
                            onChangeText={setNoteTitle}
                        />
                        <TextInput
                            style={[styles.textArea, { color: theme.colors.text, borderColor: theme.colors.border }]}
                            placeholder="Type your notes here..."
                            placeholderTextColor={theme.colors.textSecondary}
                            multiline
                            value={noteContent}
                            onChangeText={setNoteContent}
                            textAlignVertical="top"
                        />
                        <TouchableOpacity
                            style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
                            onPress={handleSaveNote}
                        >
                            <Text style={styles.saveButtonText}>Save Note</Text>
                        </TouchableOpacity>
                    </GlassView>
                </View>
            </Modal>

            <View style={styles.grid}>
                {files.map((file) => (
                    <GlassView key={file.id} style={[styles.fileCard, { backgroundColor: theme.colors.card }]} intensity={20}>
                        <View style={styles.fileHeader}>
                            <View style={[styles.iconBox, { backgroundColor: theme.colors.glassBackground }]}>
                                {file.type === 'pdf' ? <FileText size={20} color={theme.colors.primary} /> :
                                    file.type === 'image' ? <ImageIcon size={20} color={theme.colors.warning} /> :
                                        <FileText size={20} color={theme.colors.success} />
                                }
                            </View>
                            <TouchableOpacity onPress={() => handleDelete(file.id)}>
                                <Trash2 size={18} color={theme.colors.danger} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.fileInfo}>
                            <Text style={[styles.fileName, { color: theme.colors.text }]} numberOfLines={2}>
                                {file.name}
                            </Text>
                            <Text style={[styles.fileMeta, { color: theme.colors.textSecondary }]}>
                                {file.size} • {file.date}
                            </Text>
                        </View>

                        <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

                        <TouchableOpacity
                            style={[
                                styles.actionRow,
                                (file.type !== 'text' && file.type !== 'manual') && { opacity: 0.5 }
                            ]}
                            onPress={() => handleGenerateFlashcards(file)}
                            disabled={file.type !== 'text' && file.type !== 'manual'}
                        >
                            <Sparkles size={14} color={theme.colors.primary} />
                            <Text style={[styles.actionText, { color: theme.colors.primary }]}>AI Flashcards</Text>
                        </TouchableOpacity>
                    </GlassView>
                ))}
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
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        gap: 8,
    },
    uploadText: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 15,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
    },
    fileCard: {
        width: '47%', // 2 columns with gap
        borderRadius: 20,
        padding: 15,
        marginBottom: 5,
    },
    fileHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fileInfo: {
        marginBottom: 15,
    },
    fileName: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
        height: 40, // Fixed height for 2 lines
    },
    fileMeta: {
        fontSize: 12,
    },
    divider: {
        height: 1,
        marginBottom: 10,
        opacity: 0.5,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    actionText: {
        fontSize: 13,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        width: '100%',
        maxWidth: 500,
        borderRadius: 24,
        padding: 25,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '700',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
    },
    textArea: {
        height: 150,
        borderWidth: 1,
        borderRadius: 12,
        padding: 15,
        fontSize: 16,
        marginBottom: 20,
    },
    saveButton: {
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default StudyDumpScreen;
