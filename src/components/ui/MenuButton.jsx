const MenuButton = ({ icon: Icon, label, onClick }) => (
  <div
    className="p-5 hover:bg-blue-50 bg-white shadow flex flex-col items-center rounded-2xl cursor-pointer max-[1330px]:p-3"
    onClick={onClick}
  >
    <Icon className="text-4xl max-[1330px]:text-2xl" />
    <p className="text-lg font-medium font-roboto max-[1330px]:text-[15px]">{label}</p>
  </div>
);

export default MenuButton;