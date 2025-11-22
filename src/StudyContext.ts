import { createContext } from 'react';

export interface StudyFile {
    id: string;
    name: string;
    type: 'pdf' | 'image' | 'text' | 'manual'; // Added manual
    content?: string; // For manual notes or text files
    size: string;
    date: string;
}

export interface Flashcard {
    id: string;
    front: string;
    back: string;
    topic: string;
    date: string;
}

export interface StudyContextType {
    files: StudyFile[];
    setFiles: (files: StudyFile[]) => void;
    flashcards: Flashcard[];
    setFlashcards: (cards: Flashcard[]) => void;
    addFile: (file: StudyFile) => void;
    deleteFile: (id: string) => void;
    addFlashcards: (newCards: Flashcard[]) => void;
    deleteFlashcard: (id: string) => void;
}

export const StudyContext = createContext<StudyContextType>({
    files: [],
    setFiles: () => { },
    flashcards: [],
    setFlashcards: () => { },
    addFile: () => { },
    deleteFile: () => { },
    addFlashcards: () => { },
    deleteFlashcard: () => { },
});
