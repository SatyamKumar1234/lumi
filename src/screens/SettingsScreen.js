import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import GlassView from '../components/GlassView';
import { AIService } from '../services/AIService';
import { Save, Key, User, ImageIcon } from 'lucide-react';
const SettingsScreen = () => {
    const { theme, themeId, setThemeId } = useContext(ThemeContext);
    const [geminiKey, setGeminiKey] = useState('');
    const [openRouterKey, setOpenRouterKey] = useState('');
    useEffect(() => {
        const keys = AIService.getKeys();
        if (keys.gemini)
            setGeminiKey(keys.gemini);
        if (keys.openRouter)
            setOpenRouterKey(keys.openRouter);
    }, []);
    const handleSave = () => {
        AIService.saveKeys({ gemini: geminiKey, openRouter: openRouterKey });
        // In a real app, use a toast. For now, simple alert/log
        console.log('Keys saved');
        alert('Settings Saved!');
    };
    return (<ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Settings</Text>

            <Text style={[styles.sectionHeader, { color: theme.colors.textSecondary }]}>APPEARANCE</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.themeList}>
                {[
            { id: 'light', name: 'Light', color: '#F2F2F7' },
            { id: 'dark', name: 'Dark', color: '#000000' },
            { id: 'cream', name: 'Cream', color: '#FDFBF7' },
            { id: 'midnight', name: 'Midnight', color: '#050510' },
            { id: 'forest', name: 'Forest', color: '#1A2F1A' },
        ].map((t) => (<GlassView key={t.id} style={[
                styles.themeCard,
                { borderColor: themeId === t.id ? theme.colors.primary : 'transparent', borderWidth: 2 }
            ]} onPress={() => setThemeId(t.id)} intensity={20}>
                        <View style={[styles.themePreview, { backgroundColor: t.color }]}/>
                        <Text style={[styles.themeName, { color: theme.colors.text }]}>{t.name}</Text>
                    </GlassView>))}
            </ScrollView>

            <Text style={[styles.sectionHeader, { color: theme.colors.textSecondary }]}>PERSONALIZATION</Text>
            <GlassView style={[styles.card, { backgroundColor: theme.colors.card }]}>
                <View style={styles.inputGroup}>
                    <View style={styles.labelRow}>
                        <User size={16} color={theme.colors.primary}/>
                        <Text style={[styles.label, { color: theme.colors.text }]}>Your Name</Text>
                    </View>
                    <TextInput style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]} placeholder="Enter your name" placeholderTextColor={theme.colors.textSecondary} value={userName} onChangeText={setUserName}/>
                </View>
                <View style={[styles.divider, { backgroundColor: theme.colors.border }]}/>
                <View style={styles.inputGroup}>
                    <View style={styles.labelRow}>
                        <ImageIcon size={16} color={theme.colors.primary}/>
                        <Text style={[styles.label, { color: theme.colors.text }]}>Global Background URL</Text>
                    </View>
                    <TextInput style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]} placeholder="Enter Image URL" placeholderTextColor={theme.colors.textSecondary} value={backgroundImage || ''} onChangeText={(text) => setBackgroundImage(text || null)}/>
                </View>
            </GlassView>

            <Text style={[styles.sectionHeader, { color: theme.colors.textSecondary }]}>AI CONFIGURATION</Text>
            <GlassView style={[styles.card, { backgroundColor: theme.colors.card }]}>
                <View style={styles.inputGroup}>
                    <View style={styles.labelRow}>
                        <Key size={16} color={theme.colors.primary}/>
                        <Text style={[styles.label, { color: theme.colors.text }]}>Gemini API Key</Text>
                    </View>
                    <TextInput style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]} placeholder="Enter Gemini API Key" placeholderTextColor={theme.colors.textSecondary} value={geminiKey} onChangeText={setGeminiKey} secureTextEntry/>
                </View>

                <View style={[styles.divider, { backgroundColor: theme.colors.border }]}/>

                <View style={styles.inputGroup}>
                    <View style={styles.labelRow}>
                        <Key size={16} color={theme.colors.warning}/>
                        <Text style={[styles.label, { color: theme.colors.text }]}>OpenRouter API Key</Text>
                    </View>
                    <TextInput style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]} placeholder="Enter OpenRouter API Key" placeholderTextColor={theme.colors.textSecondary} value={openRouterKey} onChangeText={setOpenRouterKey} secureTextEntry/>
                </View>
            </GlassView>

            <GlassView style={[styles.saveButton, { backgroundColor: theme.colors.primary }]} onPress={handleSave} intensity={40}>
                <Save size={20} color="#FFF"/>
                <Text style={styles.saveButtonText}>Save Configuration</Text>
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
        padding: 20,
        marginBottom: 30,
    },
    inputGroup: {
        marginVertical: 10,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        marginVertical: 15,
        opacity: 0.5,
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        borderRadius: 28,
        gap: 10,
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
    },
    themeList: {
        paddingHorizontal: 10,
        paddingBottom: 20,
        gap: 15,
    },
    themeCard: {
        width: 100,
        height: 120,
        borderRadius: 16,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    themePreview: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'rgba(128,128,128,0.2)',
    },
    themeName: {
        fontSize: 14,
        fontWeight: '600',
    },
});
export default SettingsScreen;
