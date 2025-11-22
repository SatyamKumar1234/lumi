import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput, Modal } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import GlassView from '../components/GlassView';
import { Play, Pause, RotateCcw, Type, Volume2, VolumeX, X, Check } from 'lucide-react';
const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.7;
const TimerScreen = () => {
    const { theme } = useContext(ThemeContext);
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('focus'); // focus, shortBreak, longBreak
    const [customColor, setCustomColor] = useState(null);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const timerRef = useRef(null);
    const modes = {
        focus: { label: 'Focus', minutes: 25 },
        shortBreak: { label: 'Short Break', minutes: 5 },
        longBreak: { label: 'Long Break', minutes: 15 },
    };
    useEffect(() => {
        const savedColor = localStorage.getItem('lumina_timer_color');
        if (savedColor)
            setCustomColor(savedColor);
        const savedMute = localStorage.getItem('lumina_timer_mute');
        if (savedMute)
            setIsMuted(savedMute === 'true');
    }, []);
    const handleSetColor = (color) => {
        setCustomColor(color);
        if (color)
            localStorage.setItem('lumina_timer_color', color);
        else
            localStorage.removeItem('lumina_timer_color');
        setShowColorPicker(false);
    };
    const toggleMute = () => {
        const newMute = !isMuted;
        setIsMuted(newMute);
        localStorage.setItem('lumina_timer_mute', String(newMute));
    };
    const textColor = customColor || theme.colors.text;
    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        else if (timeLeft === 0) {
            setIsActive(false);
            clearInterval(timerRef.current);
            if (!isMuted) {
                // Play alarm sound here (mock)
                console.log('Alarm playing');
            }
        }
        return () => clearInterval(timerRef.current);
    }, [isActive, timeLeft, isMuted]);
    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(modes[mode].minutes * 60);
    };
    const changeMode = (newMode) => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(modes[newMode].minutes * 60);
    };
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    return (<View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: textColor }]}>Pomodoro</Text>
                <View style={styles.headerActions}>
                    <GlassView style={styles.iconButton} onPress={() => setShowColorPicker(true)}>
                        <Type size={20} color={textColor}/>
                    </GlassView>
                    <GlassView style={styles.iconButton} onPress={toggleMute}>
                        {isMuted ? <VolumeX size={20} color={textColor}/> : <Volume2 size={20} color={textColor}/>}
                    </GlassView>
                </View>
            </View>

            <Modal visible={showColorPicker} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <GlassView style={[styles.modalContent, { backgroundColor: theme.colors.card }]} intensity={80}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Text Color</Text>
                            <TouchableOpacity onPress={() => setShowColorPicker(false)}>
                                <X size={24} color={theme.colors.text}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.colorGrid}>
                            {['#FFFFFF', '#000000', '#FF3B30', '#34C759', '#007AFF', '#FFCC00', '#AF52DE', '#FF2D55'].map(c => (<TouchableOpacity key={c} style={[styles.colorOption, { backgroundColor: c }]} onPress={() => handleSetColor(c)}>
                                    {customColor === c && <Check size={16} color={c === '#FFFFFF' ? '#000' : '#FFF'}/>}
                                </TouchableOpacity>))}
                        </View>
                        <Text style={[styles.label, { color: theme.colors.text, marginTop: 15 }]}>Custom Hex</Text>
                        <TextInput style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]} placeholder="#RRGGBB" placeholderTextColor={theme.colors.textSecondary} value={customColor || ''} onChangeText={handleSetColor}/>
                        <TouchableOpacity style={styles.resetButton} onPress={() => handleSetColor(null)}>
                            <Text style={{ color: theme.colors.danger }}>Reset to Theme Default</Text>
                        </TouchableOpacity>
                    </GlassView>
                </View>
            </Modal>

            <GlassView style={styles.modeSelector} intensity={20}>
                {Object.keys(modes).map((m) => (<TouchableOpacity key={m} style={[
                styles.modeButton,
                mode === m && { backgroundColor: theme.colors.primary }
            ]} onPress={() => changeMode(m)}>
                        <Text style={[
                styles.modeText,
                { color: mode === m ? '#FFF' : theme.colors.textSecondary }
            ]}>
                            {modes[m].label}
                        </Text>
                    </TouchableOpacity>))}
            </GlassView>

            <View style={styles.timerContainer}>
                <GlassView style={styles.timerCircle} intensity={30}>
                    <Text style={[styles.timeText, { color: textColor }]}>
                        {formatTime(timeLeft)}
                    </Text>
                    <Text style={[styles.statusText, { color: textColor, opacity: 0.7 }]}>
                        {isActive ? 'Stay Focused' : 'Ready?'}
                    </Text>
                </GlassView>
            </View>

            <View style={styles.controls}>
                <GlassView style={styles.controlButton} onPress={resetTimer}>
                    <RotateCcw size={24} color={textColor}/>
                </GlassView>

                <GlassView style={[styles.playButton, { backgroundColor: theme.colors.primary }]} onPress={toggleTimer} intensity={0}>
                    {isActive ?
            <Pause size={32} color="#FFF" fill="#FFF"/> :
            <Play size={32} color="#FFF" fill="#FFF" style={{ marginLeft: 4 }}/>}
                </GlassView>

                <View style={{ width: 60 }}/>
            </View>
        </View>);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: '800',
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
    modeSelector: {
        flexDirection: 'row',
        padding: 4,
        borderRadius: 16,
        marginBottom: 40,
    },
    modeButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 12,
    },
    modeText: {
        fontSize: 13,
        fontWeight: '600',
    },
    timerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
    timerCircle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    timeText: {
        fontSize: 64,
        fontWeight: '200',
        fontVariant: ['tabular-nums'],
    },
    statusText: {
        fontSize: 16,
        marginTop: 10,
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    controlButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    playButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
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
        maxWidth: 340,
        borderRadius: 24,
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
    },
    colorGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'center',
    },
    colorOption: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        fontSize: 16,
    },
    resetButton: {
        marginTop: 15,
        alignItems: 'center',
        padding: 10,
    },
});
export default TimerScreen;
