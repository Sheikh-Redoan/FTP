import { useState, useCallback } from 'react';

const initialDrillState = {
    name: "Drill 1",
    history: [[]],
    historyIndex: 0,
};

export const useDrillManager = () => {
    const [drills, setDrills] = useState([initialDrillState]);
    const [activeDrillIndex, setActiveDrillIndex] = useState(0);

    const setDroppedEquipment = useCallback((action, overwrite = false) => {
        setDrills(prevDrills => {
            const newDrills = [...prevDrills];
            const activeDrill = newDrills[activeDrillIndex];
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
            return newDrills;
        });
    }, [activeDrillIndex]);

    const undo = useCallback(() => {
        setDrills(prevDrills => {
            const newDrills = [...prevDrills];
            const activeDrill = newDrills[activeDrillIndex];
            if (activeDrill.historyIndex > 0) {
                activeDrill.historyIndex--;
            }
            return newDrills;
        });
    }, [activeDrillIndex]);

    const redo = useCallback(() => {
        setDrills(prevDrills => {
            const newDrills = [...prevDrills];
            const activeDrill = newDrills[activeDrillIndex];
            if (activeDrill.historyIndex < activeDrill.history.length - 1) {
                activeDrill.historyIndex++;
            }
            return newDrills;
        });
    }, [activeDrillIndex]);

    const addDrill = () => {
        const newDrillName = `Drill ${drills.length + 1}`;
        const newDrill = { name: newDrillName, history: [[]], historyIndex: 0 };
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
        addDrill,
        switchDrill,
        droppedEquipment: activeDrill ? activeDrill.history[activeDrill.historyIndex] : [],
        setDroppedEquipment,
        undo,
        redo,
        canUndo: activeDrill ? activeDrill.historyIndex > 0 : false,
        canRedo: activeDrill ? activeDrill.history.length - 1 > activeDrill.historyIndex : false,
    };
};