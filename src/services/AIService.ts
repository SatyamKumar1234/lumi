interface ApiKeys {
    gemini?: string;
    openRouter?: string;
}

const KEYS_STORAGE_KEY = 'lumina_api_keys';

export const AIService = {
    saveKeys: (keys: ApiKeys) => {
        localStorage.setItem(KEYS_STORAGE_KEY, JSON.stringify(keys));
    },

    getKeys: (): ApiKeys => {
        const keys = localStorage.getItem(KEYS_STORAGE_KEY);
        return keys ? JSON.parse(keys) : {};
    },

    // Helper for Gemini API calls
    callGemini: async (prompt: string, imageBase64?: string) => {
        const keys = AIService.getKeys();
        if (!keys.gemini) throw new Error('Gemini API Key is missing. Please add it in Settings.');

        const model = imageBase64 ? 'gemini-1.5-flash' : 'gemini-pro';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${keys.gemini}`;

        const contents = [
            {
                parts: [
                    { text: prompt },
                    ...(imageBase64 ? [{ inline_data: { mime_type: 'image/jpeg', data: imageBase64 } }] : [])
                ]
            }
        ];

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Gemini API Error');
            }

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error: any) {
            console.error('AI Service Error:', error);
            throw new Error(error.message || 'Failed to connect to AI Service');
        }
    },

    generateText: async (prompt: string) => {
        return await AIService.callGemini(prompt);
    },

    parseDatesheet: async (imageBase64: string): Promise<any[]> => {
        const prompt = `
        Analyze this image of a date sheet/timetable. 
        Extract the exams with their Subject, Date, and Time.
        Return ONLY a valid JSON array with objects containing keys: "subject" (string), "date" (ISO string), "time" (string like "10:00 AM").
        Do not include markdown formatting or backticks.
        `;

        try {
            const result = await AIService.callGemini(prompt, imageBase64);
            const cleanResult = result.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanResult);
        } catch (error) {
            console.error('Datesheet Parsing Error:', error);
            throw new Error('Failed to parse datesheet. Ensure image is clear.');
        }
    },

    generateFlashcards: async (content: string): Promise<any[]> => {
        const prompt = `
        Generate 5 study flashcards based on the following content: "${content}".
        Return ONLY a valid JSON array with objects containing keys: "front" (question) and "back" (answer).
        Do not include markdown formatting or backticks.
        `;

        try {
            const result = await AIService.callGemini(prompt);
            const cleanResult = result.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanResult);
        } catch (error) {
            console.error('Flashcard Generation Error:', error);
            throw new Error('Failed to generate flashcards.');
        }
    }
};
