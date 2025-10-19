import GenreDropdown from './GenreDropdown';

export default function DesktopSidebar({ className }: { className: string }) {
  return (
    <aside className={className}>
      <GenreDropdown isCollapsed={false} />
    </aside>
  );
}
