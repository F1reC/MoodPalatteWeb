import React from 'react';
import { Users, Package, ShoppingCart, MapPin, LogOut } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, active, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
      active
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="flex items-center space-x-2 px-4 py-5">
        <Package className="h-8 w-8 text-blue-600" />
        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
      </div>
      
      <nav className="flex-1 space-y-2 mt-8">
        <NavItem
          icon={<Users className="h-5 w-5" />}
          label="Users"
          active={activeTab === 'users'}
          onClick={() => onTabChange('users')}
        />
        <NavItem
          icon={<Package className="h-5 w-5" />}
          label="Products"
          active={activeTab === 'products'}
          onClick={() => onTabChange('products')}
        />
        <NavItem
          icon={<ShoppingCart className="h-5 w-5" />}
          label="Orders"
          active={activeTab === 'orders'}
          onClick={() => onTabChange('orders')}
        />
        <NavItem
          icon={<MapPin className="h-5 w-5" />}
          label="Addresses"
          active={activeTab === 'addresses'}
          onClick={() => onTabChange('addresses')}
        />
      </nav>

      <button className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:text-red-600 transition-colors">
        <LogOut className="h-5 w-5" />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  );
}