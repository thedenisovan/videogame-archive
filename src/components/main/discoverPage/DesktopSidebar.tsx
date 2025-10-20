import GenreDropdown from './GenreDropdown';

export default function DesktopSidebar({ dark }: { dark: boolean }) {
  return (
    <aside
      className={`${
        dark ? 'bg-gray-600' : 'bg-gray-300'
      } relative min-w-[350px] hidden lg:block !flex-1`}
    >
      <GenreDropdown isCollapsed={false} />
    </aside>
  );
}
