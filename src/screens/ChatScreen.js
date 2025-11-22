import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import GlassView from '../components/GlassView';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { AIService } from '../services/AIService';
const ChatScreen = () => {
    const { theme } = useContext(ThemeContext);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm Lumina AI. How can I help you study today?", sender: 'ai' }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollViewRef = useRef(null);
    const handleSend = async () => {
        if (!inputText.trim())
            return;
        const userMsg = { id: Date.now(), text: inputText, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsLoading(true);
        try {
            const responseText = await AIService.generateText(userMsg.text);
            const aiMsg = { id: Date.now() + 1, text: responseText, sender: 'ai' };
            setMessages(prev => [...prev, aiMsg]);
        }
        catch (error) {
            const errorMsg = { id: Date.now() + 1, text: "Sorry, I couldn't connect to the AI. Please check your API keys in Settings.", sender: 'ai', isError: true };
            setMessages(prev => [...prev, errorMsg]);
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages]);
    return (<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Lumina AI</Text>
                <View style={[styles.statusBadge, { backgroundColor: theme.colors.success + '20' }]}>
                    <View style={[styles.statusDot, { backgroundColor: theme.colors.success }]}/>
                    <Text style={[styles.statusText, { color: theme.colors.success }]}>Online</Text>
                </View>
            </View>

            <ScrollView ref={scrollViewRef} style={styles.chatContainer} contentContainerStyle={styles.chatContent}>
                {messages.map((msg) => (<View key={msg.id} style={[
                styles.messageRow,
                msg.sender === 'user' ? styles.userRow : styles.aiRow
            ]}>
                        {msg.sender === 'ai' && (<View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
                                <Bot size={16} color="#FFF"/>
                            </View>)}

                        <GlassView style={[
                styles.bubble,
                msg.sender === 'user' ?
                    { backgroundColor: theme.colors.primary, borderBottomRightRadius: 4 } :
                    { backgroundColor: theme.colors.card, borderBottomLeftRadius: 4 }
            ]} intensity={msg.sender === 'user' ? 0 : 40} // Solid for user, glass for AI
        >
                            <Text style={[
                styles.messageText,
                { color: msg.sender === 'user' ? '#FFF' : theme.colors.text }
            ]}>
                                {msg.text}
                            </Text>
                        </GlassView>

                        {msg.sender === 'user' && (<View style={[styles.avatar, { backgroundColor: theme.colors.textSecondary }]}>
                                <User size={16} color="#FFF"/>
                            </View>)}
                    </View>))}
                {isLoading && (<View style={styles.loadingRow}>
                        <ActivityIndicator size="small" color={theme.colors.primary}/>
                        <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>Thinking...</Text>
                    </View>)}
            </ScrollView>

            <GlassView style={[styles.inputContainer, { backgroundColor: theme.colors.card }]}>
                <TextInput style={[styles.input, { color: theme.colors.text }]} placeholder="Ask anything..." placeholderTextColor={theme.colors.textSecondary} value={inputText} onChangeText={setInputText} onSubmitEditing={handleSend}/>
                <TouchableOpacity style={[styles.sendButton, { backgroundColor: theme.colors.primary }]} onPress={handleSend} disabled={isLoading}>
                    {isLoading ? <Sparkles size={20} color="#FFF"/> : <Send size={20} color="#FFF"/>}
                </TouchableOpacity>
            </GlassView>
        </KeyboardAvoidingView>);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        gap: 6,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    chatContainer: {
        flex: 1,
    },
    chatContent: {
        padding: 20,
        paddingBottom: 20,
    },
    messageRow: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'flex-end',
        gap: 10,
    },
    userRow: {
        justifyContent: 'flex-end',
    },
    aiRow: {
        justifyContent: 'flex-start',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bubble: {
        maxWidth: '75%',
        padding: 14,
        borderRadius: 20,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 22,
    },
    loadingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 42, // Align with AI bubble
        gap: 10,
    },
    loadingText: {
        fontSize: 12,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        margin: 20,
        borderRadius: 30,
        marginBottom: 100, // Clear tab bar
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 10,
        height: 40,
        outlineStyle: 'none', // Web specific
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default ChatScreen;
