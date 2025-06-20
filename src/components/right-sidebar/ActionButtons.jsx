import { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";
import { HiArrowPath } from "react-icons/hi2";
import { BsFiletypePdf } from "react-icons/bs";
import { PiShareFat } from "react-icons/pi";

const ActionButtons = ({ exportFunctions }) => {
    const [isSaveAsDropdownOpen, setIsSaveAsDropdownOpen] = useState(false);

    return (
        <div className="flex justify-between items-start mb-10">
            <div className="flex flex-col gap-6">
                <div className="relative">
                    <button
                        onClick={() => setIsSaveAsDropdownOpen(!isSaveAsDropdownOpen)}
                        className="w-60 h-12 px-6 py-2.5 rounded-full border border-blue-900 flex items-center gap-2 hover:bg-blue-50"
                    >
                        <HiArrowPath className="w-5 h-5" />
                        <span className="text-lg font-medium">Save as</span>
                    </button>
                    {isSaveAsDropdownOpen && (
                        <div className="absolute top-full mt-2 w-60 bg-white border rounded shadow-lg z-10">
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
                <div className="w-56 h-16 bg-slate-200 rounded-2xl border border-blue-900 flex items-center justify-between px-4">
                    <span className="text-lg font-medium">Drill</span>
                    <FaChevronDown />
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