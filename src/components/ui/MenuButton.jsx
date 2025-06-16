const MenuButton = ({ icon: Icon, label, onClick }) => (
  <div
    className="p-5 hover:bg-blue-50 bg-white shadow flex flex-col items-center rounded-2xl cursor-pointer"
    onClick={onClick}
  >
    <Icon className="text-4xl" />
    <p className="text-lg font-medium font-roboto">{label}</p>
  </div>
);

export default MenuButton;