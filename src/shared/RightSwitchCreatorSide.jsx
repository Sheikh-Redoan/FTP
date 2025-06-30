import { Refersh1, SavePDF1, Share11 } from "@/assets/SidebarIcon";
import { GoPlus } from "react-icons/go";
import { BiSolidDownArrow } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";

import TextEditor from "@/components/SwitchCreatorComponent/TextEditor";
import { useState } from "react";

const RightSwitchCreatorSide = () => {
  const [drills, setDrills] = useState([{ id: 1, name: "Drill 1" }]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [drillRenamingId, setDrillRenamingId] = useState(null);
  const [newName, setNewName] = useState("");

  const handleAddDrill = () => {
    if (drills.length < 8) {
      const newDrill = {
        id: drills.length + 1,
        name: `Drill ${drills.length + 1}`,
      };
      setDrills([...drills, newDrill]);
    }
  };

  const toggleVariants = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleDeleteDrill = (id) => {
    setDrills(drills.filter((drill) => drill.id !== id));
    setOpenDropdown(null);
  };

  const handleRenameDrill = (id, currentName) => {
    setDrillRenamingId(id);
    setNewName(currentName);
    setOpenDropdown(null);
  };

  const handleSaveSame = (id) => {
    setDrills(
      drills.map((drill) =>
        drill.id === id ? { ...drill, name: newName } : drill
      )
    );
    setDrillRenamingId(null);
    setNewName("");
  };

  return (
    <div>
      {/* Button section */}
      <div>
        <button className="flex gap-2 items-center py-2 px-[35px] text-lg rounded-full w-[180px] hover:bg-[#010792] hover:text-white border text-[#010792]">
          <Refersh1 width={40} height={40} fillColor="currentColor" />
          Save as
        </button>
      </div>

      {/* Select section */}
      <div className="flex justify-between items-start my-10">
        <div className="flex gap-2 flex-wrap">
          <div className="flex flex-col gap-4">
            {drills.map((drill, index) => (
              <div key={drill.id} className="relative">
                {/* Drill button with dropdown arrow */}

                {drillRenamingId === drill.id ? (
                  <div className="flex gap-2">
                    <input
                      className="w-[120px] bg-[#E6E6F4] text-[#010792] border-[#010792] py-2 px-4 rounded-sm"
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      autoFocus
                    />
                    <button
                      className="w-[80px] bg-[#010792] text-white border-[#010792] py-2 px-4 rounded-sm hover:bg-[#010792] hover:text-white"
                      onClick={() => handleSaveSame(drill.id)}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button className="w-[120px] bg-[#E6E6F4] text-[#010792] border-[#010792] py-2 px-4 rounded-sm hover:bg-[#cecef1] flex justify-between items-center gap-6">
                    <span>{drill.name}</span>
                    <BiSolidDownArrow onClick={() => toggleVariants(index)} />
                  </button>
                )}

                {/* Dropdown menu */}
                {openDropdown === index && (
                  <div className="absolute top-10 left-0 w-[120px] bg-[#E6E6F4] border border-[#010792] rounded-sm shadow-lg z-10 mt-2 ">
                    <ul>
                      <li
                        className="px-4 py-2 cursor-pointer flex justify-center hover:bg-white items-center rounded-sm gap-1"
                        onClick={() => handleRenameDrill(drill.id, drill.name)} // Rename the drill
                      >
                       <MdDriveFileRenameOutline size={24}/> Rename
                      </li>
                      <li
                        className="px-4 py-2 cursor-pointer flex justify-center hover:bg-white items-center rounded-sm gap-1"
                        onClick={() => handleDeleteDrill(drill.id)}
                      >
                       <MdOutlineDeleteOutline size={24} />  Delete
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Plus button */}
          <button
            onClick={handleAddDrill}
            className="bg-[#E6E6F4] border-[#010792] py-2 h-[40px] rounded-sm hover:bg-[#cecef1] w-[120px] flex justify-center"
          >
            <GoPlus size={24} />
          </button>
        </div>

        {/* Save as PDF and Share buttons */}
        <div className="flex flex-col gap-4">
          <button className="flex flex-col gap-2 items-center py-4 text-lg rounded-[16px] w-[120px] hover:bg-[#010792] hover:text-white bg-white text-[#010792]">
            <SavePDF1 width={40} height={40} fillColor="currentColor" />
            Save as PDF
          </button>
          <button className="flex flex-col gap-2 items-center py-4 text-lg rounded-[16px] w-[120px] hover:bg-[#010792] hover:text-white bg-white text-[#010792]">
            <Share11 width={40} height={40} fillColor="currentColor" />
            Share
          </button>
        </div>
      </div>

      {/* Text editor section */}
      <TextEditor />
    </div>
  );
};

export default RightSwitchCreatorSide;