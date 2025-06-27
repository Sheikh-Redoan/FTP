import { createContext, useContext, useState } from "react";
import { useQuickAccess } from "../hooks/useQuickAccess";
import { useDrillManager } from "../hooks/useDrillManager";

const SvgContext = createContext();

export const SvgProvider = ({ children }) => {
    const drillManager = useDrillManager();
    const [selectedSvg, setSelectedSvg] = useState(null);
    const [svgBgColor, setSvgBgColor] = useState("#00A859");
    const [svgLineColor, setSvgLineColor] = useState("#FFFFFF");
    const [selectedEquipmentSvg, setSelectedEquipmentSvg] = useState(null);
    const [equipmentBgColor, setEquipmentBgColor] = useState("#D4DA65");
    const [equipmentLineColor, setEquipmentLineColor] = useState("#D4DA65");
    const [playerColor, setPlayerColor] = useState("#FDE100");
    const [draggedEquipmentSrc, setDraggedEquipmentSrc] = useState(null);
    const [pitch, setPitch] = useState(null);
    const [lineColor, setLineColor] = useState("#FDE100");
    const [addEquipment, setAddEquipment] = useState(() => () => {
        console.error("addEquipment function not yet implemented");
    });
    const [quickAccessItems, addQuickAccessItem] = useQuickAccess();

    const [exportFunctions, setExportFunctions] = useState({
        png: () => console.log("Export to PNG not implemented"),
        jpg: () => console.log("Export to JPG not implemented"),
        pdf: () => console.log("Export to PDF not implemented"),
    });

    const [getNotesDeltaFunc, setGetNotesDeltaFunc] = useState(null);


    return (
        <SvgContext.Provider
            value={{
                ...drillManager,
                selectedSvg,
                setSelectedSvg,
                svgBgColor,
                setSvgBgColor,
                svgLineColor,
                setSvgLineColor,
                selectedEquipmentSvg,
                setSelectedEquipmentSvg,
                equipmentBgColor,
                setEquipmentBgColor,
                equipmentLineColor,
                setEquipmentLineColor,
                playerColor,
                setPlayerColor,
                draggedEquipmentSrc,
                setDraggedEquipmentSrc,
                pitch,
                setPitch,
                lineColor,
                setLineColor,
                addEquipment,
                setAddEquipment,
                quickAccessItems,
                addQuickAccessItem,
                exportFunctions,
                setExportFunctions,
                getNotesDeltaFunc,
                setGetNotesDeltaFunc,
            }}
        >
            {children}
        </SvgContext.Provider>
    );
};

export const useSvg = () => useContext(SvgContext);