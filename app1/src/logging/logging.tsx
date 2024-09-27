import { useState, useCallback, useEffect } from 'react';

const LOG_STORAGE_KEY = 'app_logs';

// Custom Hook für Logging mit localStorage
export const useLogging = () => {
    const [logs, setLogs] = useState<string[]>(() => {
        const storedLogs = localStorage.getItem(LOG_STORAGE_KEY);
        return storedLogs ? JSON.parse(storedLogs) : [];
    });

    const saveLogsToStorage = (logs: string[]) => {
        localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(logs));
    };

    const addLog = useCallback((log: string) => {
        setLogs((prevLogs) => {
            const newLogs = [...prevLogs, log];
            saveLogsToStorage(newLogs);
            return newLogs;
        });
        console.log(log);
    }, []);

    const getLogs = useCallback(() => {
        return logs;
    }, [logs]);

    const clearLogs = useCallback(() => {
        setLogs([]);
        localStorage.removeItem(LOG_STORAGE_KEY);
    }, []);

    return { addLog, getLogs, clearLogs };
};
