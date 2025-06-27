import { useState, useCallback } from 'react';

// Updated initial state to include pitch and notes
const initialDrillState = {
    name: "Drill 1",
    history: [[]],
    historyIndex: 0,
    pitch: null,
    notes: { ops: [] }, // Default empty Quill delta
};

export const useDrillManager = () => {
    const [drills, setDrills] = useState([initialDrillState]);
    const [activeDrillIndex, setActiveDrillIndex] = useState(0);

    const setDroppedEquipment = useCallback((action, overwrite = false) => {
        setDrills(prevDrills => {
            const newDrills = [...prevDrills];
            const activeDrill = { ...newDrills[activeDrillIndex] };
            const { history, historyIndex } = activeDrill;
            const currentDroppedEquipment = history[historyIndex];
            const newDroppedEquipment = typeof action === 'function' ? action(currentDroppedEquipment) : action;

            if (overwrite) {
                const newHistory = [...history];
                newHistory[historyIndex] = newDroppedEquipment;
                activeDrill.history = newHistory;
            } else {
                const newHistory = history.slice(0, historyIndex + 1);
                newHistory.push(newDroppedEquipment);
                activeDrill.history = newHistory;
                activeDrill.historyIndex = newHistory.length - 1;
            }
            newDrills[activeDrillIndex] = activeDrill;
            return newDrills;
        });
    }, [activeDrillIndex]);

    const undo = useCallback(() => {
        setDrills(prevDrills => {
            const newDrills = [...prevDrills];
            const activeDrill = newDrills[activeDrillIndex];
            if (activeDrill.historyIndex > 0) {
                const newActiveDrill = { ...activeDrill, historyIndex: activeDrill.historyIndex - 1 };
                newDrills[activeDrillIndex] = newActiveDrill;
            }
            return newDrills;
        });
    }, [activeDrillIndex]);

    const redo = useCallback(() => {
        setDrills(prevDrills => {
            const newDrills = [...prevDrills];
            const activeDrill = newDrills[activeDrillIndex];
            if (activeDrill.historyIndex < activeDrill.history.length - 1) {
                const newActiveDrill = { ...activeDrill, historyIndex: activeDrill.historyIndex + 1 };
                newDrills[activeDrillIndex] = newActiveDrill;
            }
            return newDrills;
        });
    }, [activeDrillIndex]);

    // Function to set the pitch for the active drill
    const setDrillPitch = useCallback((pitch) => {
        setDrills(prevDrills => {
            const newDrills = [...prevDrills];
            const newActiveDrill = { ...newDrills[activeDrillIndex], pitch: pitch };
            newDrills[activeDrillIndex] = newActiveDrill;
            return newDrills;
        });
    }, [activeDrillIndex]);

    // Function to set the notes for the active drill
    const setDrillNotes = useCallback((notes) => {
        setDrills(prevDrills => {
            const newDrills = [...prevDrills];
            const newActiveDrill = { ...newDrills[activeDrillIndex], notes: notes };
            newDrills[activeDrillIndex] = newActiveDrill;
            return newDrills;
        });
    }, [activeDrillIndex]);

    const addDrill = () => {
        const newDrillName = `Drill ${drills.length + 1}`;
        // Add new properties to a new drill
        const newDrill = { 
            name: newDrillName, 
            history: [[]], 
            historyIndex: 0,
            pitch: null,
            notes: { ops: [] }
        };
        setDrills([...drills, newDrill]);
        setActiveDrillIndex(drills.length);
    };

    const switchDrill = (index) => {
        setActiveDrillIndex(index);
    };

    const activeDrill = drills[activeDrillIndex];

    return {
        drills,
        activeDrillIndex,
        activeDrill, // Expose the entire active drill object
        addDrill,
        switchDrill,
        droppedEquipment: activeDrill ? activeDrill.history[activeDrill.historyIndex] : [],
        setDroppedEquipment,
        undo,
        redo,
        setDrillPitch, // Expose the new function
        setDrillNotes, // Expose the new function
        canUndo: activeDrill ? activeDrill.historyIndex > 0 : false,
        canRedo: activeDrill ? activeDrill.history.length - 1 > activeDrill.historyIndex : false,
    };
};