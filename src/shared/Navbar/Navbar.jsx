const Navbar = () => {
  return (
    <nav>
      <div className="w-full h-[100px] bg-white relative px-[50px] flex justify-between items-center">
          <div className="flex flex-col items-center gap-1 ">
            <h2 className="text-blue-900 text-6xl font-extrabold font-roboto lowercase">
              FTP
            </h2>
            <p className="text-blue-900 text-base font-normal font-roboto w-max">
              Football Training Platform
            </p>
          </div>
        <div className="text-slate-900 text-3xl font-medium font-roboto w-full text-center">
          [Title....]
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
