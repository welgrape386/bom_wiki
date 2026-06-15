import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Sprout, Menu, X } from 'lucide-react';

const navItems = [
  { label: '홈', to: '/' },
  { label: '콘텐츠', to: '/content-hub' },
  { label: '명령어', to: '/commands' },
  { label: '서버정보', to: '/server-info' },
  { label: '도움말', to: '/help' },
];

export function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white"
      style={{ borderBottom: '1.5px solid #e8f5e9', boxShadow: '0 1px 8px rgba(91,190,99,0.08)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform"
            style={{ backgroundColor: '#5BBE63' }}
          >
            <Sprout size={18} color="white" />
          </div>
          <span
            style={{ fontWeight: 800, fontSize: '17px', color: '#2C3E20', letterSpacing: '-0.3px' }}
          >
            새봄농장 비공식 위키
          </span>
        </Link>

        {/* Desktop nav — 오른쪽 정렬 */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navItems.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.label + item.to}
                to={item.to}
                className="px-3.5 py-2 rounded-lg text-sm transition-colors"
                style={{
                  fontWeight: active ? 700 : 600,
                  color: active ? '#2d7a35' : '#52666a',
                  backgroundColor: active ? '#f0fdf4' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = '#f0fdf4';
                }}
                onMouseLeave={(e) => {
                  if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg transition-colors"
          style={{ color: '#52666a' }}
          onClick={() => setMenuOpen(!menuOpen)}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0fdf4')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="md:hidden border-t py-2"
          style={{ backgroundColor: 'white', borderColor: '#e8f5e9' }}
        >
          {navItems.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.label + item.to + 'mob'}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-3 text-sm"
                style={{
                  fontWeight: active ? 700 : 600,
                  color: active ? '#2d7a35' : '#52666a',
                  backgroundColor: active ? '#f0fdf4' : 'transparent',
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
