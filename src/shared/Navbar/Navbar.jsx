import { useSvg } from "../../context/SvgContext"; // Import useSvg

const Navbar = () => {
  const { activeDrill } = useSvg(); // Get the active drill's data

  return (
    <nav>
      <div className="w-full h-[100px] bg-white relative px-[50px] flex justify-between items-center max-[800px]:px-[20px] max-[800px]:h-[60px]">
        <div className="flex flex-col items-center gap-1 ">
          <h2 className="text-blue-900 text-5xl font-extrabold font-roboto lowercase max-[800px]:text-[35px]">
            FTP
          </h2>
          <p className="text-blue-900 text-base font-normal font-roboto w-max max-[800px]:hidden">
            Football Training Platform
          </p>
        </div>
        <div className="text-slate-900 text-2xl font-medium font-roboto w-full text-center max-[800px]:text-sm">
          {activeDrill ? activeDrill.name : "[Title....]"}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;