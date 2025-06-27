import { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";
import { HiArrowPath } from "react-icons/hi2";
import { BsFiletypePdf } from "react-icons/bs";
import { PiShareFat } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import { SiGamescience } from "react-icons/si";
import { useSvg } from '../../context/SvgContext'; // Import useSvg

const ActionButtons = ({ exportFunctions }) => {
    const [isSaveAsDropdownOpen, setIsSaveAsDropdownOpen] = useState(false);
    const [isDrillDropdownOpen, setIsDrillDropdownOpen] = useState(false);
    const { drills, addDrill, switchDrill, activeDrillIndex } = useSvg();

    return (
        <div className="flex justify-between items-start mb-10">
            <div className="flex flex-col gap-6">
                <div className="relative">
                    <button
                        onClick={() => setIsSaveAsDropdownOpen(!isSaveAsDropdownOpen)}
                        className="w-60 h-12 px-6 py-2.5 rounded-full border border-blue-900 flex items-center gap-2 hover:bg-blue-50 cursor-pointer max-[1330px]:w-40 max-[1330px]:h-10"
                    >
                        <HiArrowPath className="w-5 h-5" />
                        <span className="text-lg font-medium">Save as</span>
                    </button>
                    {isSaveAsDropdownOpen && (
                        <div className="absolute top-full mt-2 w-60 bg-white border rounded shadow-lg z-10 max-[1330px]:w-40">
                            <button
                                onClick={() => {
                                    exportFunctions.png();
                                    setIsSaveAsDropdownOpen(false);
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Save as PNG
                            </button>
                            <button
                                onClick={() => {
                                    exportFunctions.jpg();
                                    setIsSaveAsDropdownOpen(false);
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Save as JPG
                            </button>
                            <button
                                onClick={() => {
                                    exportFunctions.pdf();
                                    setIsSaveAsDropdownOpen(false);
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Save as PDF
                            </button>
                        </div>
                    )}
                </div>
                <div className="relative">
                    <button
                        onClick={() => setIsDrillDropdownOpen(!isDrillDropdownOpen)}
                        className="w-56 h-16 bg-slate-200 rounded-2xl border border-blue-900 flex items-center justify-between px-4 max-[1330px]:w-40 max-[1330px]:h-10"
                    >
                        <span className="text-lg font-medium">{drills[activeDrillIndex].name}</span>
                        <FaChevronDown />
                    </button>
                    {isDrillDropdownOpen && (
                        <div className="absolute top-full mt-2 w-56 bg-white border rounded shadow-lg z-10 max-[1330px]:w-40">
                            {drills.map((drill, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        switchDrill(index);
                                        setIsDrillDropdownOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-Start items-center gap-2"
                                >
                                    <SiGamescience /> {drill.name}
                                </button>
                            ))}
                            <button
                                onClick={() => {
                                    addDrill();
                                    setIsDrillDropdownOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 font-bold flex justify-Start items-center gap-2"
                            >
                                <FiPlus /> Add Drill
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <button
                    className="flex flex-col justify-center items-center p-1 w-[130px] h-[100px] shadow rounded-lg hover:bg-gray-100"
                    onClick={exportFunctions.pdf}
                >
                    <BsFiletypePdf className="text-3xl mb-1" />
                    <span className="text-lg font-medium">Save as PDF</span>
                </button>
                <button className="flex flex-col justify-center items-center p-1 w-[130px] h-[100px] shadow rounded-lg hover:bg-gray-100">
                    <PiShareFat className="text-3xl mb-1" />
                    <span className="text-lg font-medium">Share</span>
                </button>
            </div>
        </div>
    );
};

export default ActionButtons;