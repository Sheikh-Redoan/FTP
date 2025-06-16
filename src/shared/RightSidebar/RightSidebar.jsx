import { useState } from "react";

const RightSidebar = () => {
  const [text, setText] = useState("");
  return (
    <div className="w-[661px] h-full bg-white p-6 flex flex-col justify-end">
      <div className="w-[561px] h-[524px] rounded-2xl border border-indigo-300 p-6 flex flex-col">
        {/* Icons sidebar */}
        <div className="flex flex-col items-center gap-4 mb-6">
          {/* Icon buttons would go here */}
        </div>

        {/* Text input area */}
        <textarea
          className="flex-1 w-full p-4 text-lg font-medium font-roboto text-slate-900 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="Type here coaching points /VAR"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
};

export default RightSidebar;
