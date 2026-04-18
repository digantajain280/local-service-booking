import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserCog, CalendarClock } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from '../firebase';

export default function AdminLayout() {
  const { user } = useAuth();
  
  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/users', icon: Users, label: 'Users' },
    { to: '/admin/providers', icon: UserCog, label: 'Providers' },
    { to: '/admin/bookings', icon: CalendarClock, label: 'Bookings' }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-neutral-200 font-bold text-lg">
          UrbanServe Admin
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              className={({isActive}) => cn(
                 "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium",
                 isActive ? "bg-black text-white" : "text-neutral-500 hover:bg-neutral-100 hover:text-black"
              )}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-neutral-200">
          <button onClick={signOut} className="w-full text-left px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-xl transition-colors">
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-y-auto">
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center px-8 justify-between">
           <h1 className="font-semibold">Admin Panel</h1>
           <div className="text-sm font-medium text-neutral-500">{user?.email}</div>
        </header>
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
