function DesktopHeader({ className }: { className: string }) {
  return (
    <div className={className}>
      <button>Browse</button>
      <button>My Library</button>
      <button>Sign in</button>
    </div>
  );
}

export default DesktopHeader;
