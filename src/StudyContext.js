import { createContext } from 'react';
export const StudyContext = createContext({
    files: [],
    setFiles: () => { },
    flashcards: [],
    setFlashcards: () => { },
    addFile: () => { },
    deleteFile: () => { },
    addFlashcards: () => { },
    deleteFlashcard: () => { },
});
