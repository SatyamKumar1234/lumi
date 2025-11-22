import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { themes } from './theme';
import { BarChart2, BookOpen, Calendar, Settings, Clock, MessageSquare, PenTool, Layers } from 'lucide-react';

// Screens
import LandingScreen from './screens/LandingScreen';
import StatsScreen from './screens/StatsScreen';
import FlashcardsScreen from './screens/FlashcardsScreen';
import StudyDumpScreen from './screens/StudyDumpScreen';
import CalendarScreen from './screens/CalendarScreen';
import ChatScreen from './screens/ChatScreen';
import DiaryScreen from './screens/DiaryScreen';
import TimerScreen from './screens/TimerScreen';
import SettingsScreen from './screens/SettingsScreen';
import SyllabusScreen from './screens/SyllabusScreen';

import BackgroundGradient from './components/BackgroundGradient';
import GlassView from './components/GlassView';
import TabBar from './components/TabBar';

import { ThemeContext } from './ThemeContext';
import { UserContext } from './UserContext';
import { StudyContext, StudyFile, Flashcard } from './StudyContext';

const App = () => {
    const [themeId, setThemeId] = useState('light');
    const [userName, setUserName] = useState('User');
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

    // Study Context State
    const [files, setFiles] = useState<StudyFile[]>([
        { id: '1', name: 'Physics_Notes_Ch1.pdf', type: 'pdf', size: '2.4 MB', date: '2023-10-24' },
        { id: '2', name: 'Chemistry_Formulas.jpg', type: 'image', size: '1.1 MB', date: '2023-10-25' },
        { id: '3', name: 'Math_Calculus_CheatSheet.pdf', type: 'pdf', size: '3.5 MB', date: '2023-10-26' },
        { id: '4', name: 'Biology_Diagrams.png', type: 'image', size: '4.2 MB', date: '2023-10-27' },
    ]);
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

    useEffect(() => {
        const savedTheme = localStorage.getItem('lumina_theme');
        if (savedTheme && themes[savedTheme]) setThemeId(savedTheme);

        const savedName = localStorage.getItem('lumina_username');
        if (savedName) setUserName(savedName);

        const savedBg = localStorage.getItem('lumina_background');
        if (savedBg) setBackgroundImage(savedBg);

        const savedFiles = localStorage.getItem('lumina_files');
        if (savedFiles) setFiles(JSON.parse(savedFiles));

        const savedCards = localStorage.getItem('lumina_flashcards');
        if (savedCards) setFlashcards(JSON.parse(savedCards));
    }, []);

    const handleSetTheme = (id: string) => {
        setThemeId(id);
        localStorage.setItem('lumina_theme', id);
    };

    const handleSetUserName = (name: string) => {
        setUserName(name);
        localStorage.setItem('lumina_username', name);
    };

    const handleSetBackgroundImage = (uri: string | null) => {
        setBackgroundImage(uri);
        if (uri) localStorage.setItem('lumina_background', uri);
        else localStorage.removeItem('lumina_background');
    };

    // Study Context Handlers
    const addFile = (file: StudyFile) => {
        const newFiles = [...files, file];
        setFiles(newFiles);
        localStorage.setItem('lumina_files', JSON.stringify(newFiles));
    };

    const deleteFile = (id: string) => {
        const newFiles = files.filter(f => f.id !== id);
        setFiles(newFiles);
        localStorage.setItem('lumina_files', JSON.stringify(newFiles));
    };

    const addFlashcards = (newCards: Flashcard[]) => {
        const updatedCards = [...flashcards, ...newCards];
        setFlashcards(updatedCards);
        localStorage.setItem('lumina_flashcards', JSON.stringify(updatedCards));
    };

    const deleteFlashcard = (id: string) => {
        const updatedCards = flashcards.filter(c => c.id !== id);
        setFlashcards(updatedCards);
        localStorage.setItem('lumina_flashcards', JSON.stringify(updatedCards));
    };

    const currentTheme = themes[themeId] || themes.light;
    const isDarkMode = themeId === 'dark' || themeId === 'midnight' || themeId === 'forest';

    return (
        <UserContext.Provider value={{
            userName,
            setUserName: handleSetUserName,
            backgroundImage,
            setBackgroundImage: handleSetBackgroundImage
        }}>
            <StudyContext.Provider value={{
                files, setFiles,
                flashcards, setFlashcards,
                addFile, deleteFile,
                addFlashcards, deleteFlashcard
            }}>
                <ThemeContext.Provider value={{ themeId, setThemeId: handleSetTheme, theme: currentTheme, isDarkMode }}>
                    <Router>
                        <BackgroundGradient themeId={themeId} isDarkMode={isDarkMode} customBackground={backgroundImage}>
                            <SafeAreaView style={styles.container}>
                                <StatusBar
                                    barStyle={isDarkMode ? "light-content" : "dark-content"}
                                    backgroundColor="transparent"
                                    translucent
                                />
                                <View style={styles.content}>
                                    <Routes>
                                        <Route path="/" element={<LandingScreen />} />
                                        <Route path="/stats" element={<StatsScreen />} />
                                        <Route path="/flashcards" element={<FlashcardsScreen />} />
                                        <Route path="/dump" element={<StudyDumpScreen />} />
                                        <Route path="/calendar" element={<CalendarScreen />} />
                                        <Route path="/chat" element={<ChatScreen />} />
                                        <Route path="/diary" element={<DiaryScreen />} />
                                        <Route path="/timer" element={<TimerScreen />} />
                                        <Route path="/settings" element={<SettingsScreen />} />
                                        <Route path="/syllabus" element={<SyllabusScreen />} />
                                    </Routes>
                                </View>
                                <TabBar />
                            </SafeAreaView>
                        </BackgroundGradient>
                    </Router>
                </ThemeContext.Provider>
            </StudyContext.Provider>
        </UserContext.Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        height: '100vh', // Web specific
    },
    content: {
        flex: 1,
        overflow: 'hidden',
    },
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

export default App;
