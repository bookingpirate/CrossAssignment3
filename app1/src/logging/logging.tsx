import { useState, useCallback, useEffect } from 'react';

// Key für localStorage
const LOG_STORAGE_KEY = 'app_logs';

// Custom Hook für Logging mit localStorage
export const useLogging = () => {
    const [logs, setLogs] = useState<string[]>(() => {
        // Lade die Logs aus localStorage beim ersten Aufruf
        const storedLogs = localStorage.getItem(LOG_STORAGE_KEY);
        return storedLogs ? JSON.parse(storedLogs) : [];
    });

    // Funktion zum Speichern der Logs in localStorage
    const saveLogsToStorage = (logs: string[]) => {
        localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(logs));
    };

    // Funktion zum Hinzufügen eines neuen Logs
    const addLog = useCallback((log: string) => {
        setLogs((prevLogs) => {
            const newLogs = [...prevLogs, log];
            saveLogsToStorage(newLogs); // Speichere die Logs in localStorage
            return newLogs;
        });
        console.log(log); // Optional: Logs in der Konsole anzeigen
    }, []);

    // Funktion, um alle Logs abzurufen
    const getLogs = useCallback(() => {
        return logs;
    }, [logs]);

    // Funktion, um alle Logs zu löschen
    const clearLogs = useCallback(() => {
        setLogs([]);
        localStorage.removeItem(LOG_STORAGE_KEY); // Entfernt die Logs aus localStorage
    }, []);

    return { addLog, getLogs, clearLogs };
};
