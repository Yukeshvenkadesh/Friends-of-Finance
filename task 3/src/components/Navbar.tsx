import React from 'react';
import { useCRM } from '../context/CRMContext';
import { LayoutDashboard, Users, HelpCircle, RotateCcw, Plus, Search, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenAddMember: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAddMember }) => {
  const { activeTab, setActiveTab, resetData, searchQuery, setSearchQuery } = useCRM();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-xl font-bold text-white tracking-wider">FoF</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white text-lg tracking-tight">Friends of Finance</span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  CRM
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                Internal Community Engagement & Intelligence Platform
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-950/50 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab('directory')}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'directory'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Users className="w-4 h-4 mr-2" />
              Member Directory
            </button>

            <button
              onClick={() => setActiveTab('help')}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'help'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Help & Safeguards
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-3">
            {/* Quick Search */}
            <div className="relative hidden lg:block w-48 xl:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search member/role..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'directory') setActiveTab('directory');
                }}
                className="w-full bg-slate-950/70 text-slate-200 text-xs rounded-lg pl-9 pr-3 py-2 border border-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
              />
            </div>

            {/* Add Member Button */}
            <button
              onClick={onOpenAddMember}
              className="flex items-center px-3 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-lg text-xs font-semibold transition-all hover:border-indigo-500/50"
              title="Add New Community Member"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Member
            </button>

            {/* Reset Mock Data */}
            <button
              onClick={() => {
                if (window.confirm('Reset member data and activities back to seed mock data?')) {
                  resetData();
                }
              }}
              className="p-2 text-slate-400 hover:text-slate-200 bg-slate-800/50 hover:bg-slate-800 rounded-lg border border-slate-700/50 text-xs transition-all"
              title="Reset Demo Seed Data"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Nav Bar */}
        <div className="md:hidden flex items-center justify-around border-t border-slate-800/80 py-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center py-1 px-3 text-xs font-medium rounded-lg ${
              activeTab === 'dashboard' ? 'text-indigo-400' : 'text-slate-400'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 mb-1" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('directory')}
            className={`flex flex-col items-center py-1 px-3 text-xs font-medium rounded-lg ${
              activeTab === 'directory' ? 'text-indigo-400' : 'text-slate-400'
            }`}
          >
            <Users className="w-4 h-4 mb-1" />
            Directory
          </button>
          <button
            onClick={() => setActiveTab('help')}
            className={`flex flex-col items-center py-1 px-3 text-xs font-medium rounded-lg ${
              activeTab === 'help' ? 'text-indigo-400' : 'text-slate-400'
            }`}
          >
            <ShieldCheck className="w-4 h-4 mb-1" />
            Help
          </button>
        </div>
      </div>
    </header>
  );
};
