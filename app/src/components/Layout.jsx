import { Outlet, NavLink } from 'react-router-dom';
import { Home, PlusCircle, TrendingUp, Target, User } from 'lucide-react';
import { useHealthStore } from '../store/healthStore';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/log', icon: PlusCircle, label: 'Log' },
  { to: '/trends', icon: TrendingUp, label: 'Trends' },
  { to: '/goals', icon: Target, label: 'Goals' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export default function Layout() {
  const darkMode = useHealthStore((state) => state.darkMode);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-navy-950 text-white' : 'bg-sage-50 text-gray-900'}`}>
      <main className="flex-1 pb-20 max-w-lg mx-auto w-full px-4 pt-6">
        <Outlet />
      </main>

      <nav className={`fixed bottom-0 left-0 right-0 border-t ${darkMode ? 'bg-navy-900 border-navy-800' : 'bg-white border-gray-100'} shadow-lg`}>
        <div className="max-w-lg mx-auto flex justify-around items-center py-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-sage-600 scale-105'
                    : darkMode
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-400 hover:text-gray-600'
                }`
              }
            >
              <Icon size={22} />
              <span className="text-xs font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
