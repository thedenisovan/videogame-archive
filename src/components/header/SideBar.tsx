export default function SideBar({ isOpen }: { isOpen: boolean }) {
  return (
    <div>
      <div
        className={`w-[80%] h-[100vh] bg-gray-700 absolute top-0 duration-300 ease-in ${
          !isOpen && '-translate-x-100'
        }`}
      ></div>
    </div>
  );
}
