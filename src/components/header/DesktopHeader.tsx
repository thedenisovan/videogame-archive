import Button from 'react-bootstrap/Button';

function DesktopHeader({ className = 'hidden' }: { className: string }) {
  return (
    <div className={className}>
      <button>Browse</button>
      <button>My Library</button>
      <Button variant='primary'>Sign in</Button>
    </div>
  );
}

export default DesktopHeader;
