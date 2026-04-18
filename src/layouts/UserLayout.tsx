import { Outlet, NavLink } from 'react-router-dom';
import { Home, Search, Calendar, User } from 'lucide-react';
import { cn } from '../lib/utils';

export default function UserLayout() {
  const navItems = [
    { to: '/user', icon: Home, label: 'Home' },
    { to: '/user/search', icon: Search, label: 'Search' },
    { to: '/user/bookings', icon: Calendar, label: 'Bookings' },
    { to: '/user/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pb-20 relative ios-safe-area shadow-sm max-w-md mx-auto h-screen overflow-hidden flex flex-col bg-white">
      <main className="flex-1 overflow-y-auto no-scrollbar">
        <Outlet />
      </main>

      <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-100 flex justify-around items-center px-4 pt-3 pb-safe-5 ios-pb">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/user'}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center p-2 rounded-xl transition-all',
                  isActive ? 'text-black' : 'text-neutral-400 hover:text-neutral-700'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[10px] font-medium mt-1">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
