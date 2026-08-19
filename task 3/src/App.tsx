import React, { useState } from 'react';
import { CRMProvider, useCRM } from './context/CRMContext';
import { Navbar } from './components/Navbar';
import { DashboardPage } from './components/DashboardPage';
import { DirectoryPage } from './components/DirectoryPage';
import { HelpPage } from './components/HelpPage';
import { MemberDetailModal } from './components/MemberDetailModal';
import { AddMemberModal } from './components/AddMemberModal';
import { ShieldCheck } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, selectedMemberId } = useCRM();
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenAddMember={() => setIsAddMemberOpen(true)} />

      {/* Main App Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <DashboardPage />}
        {activeTab === 'directory' && <DirectoryPage onOpenAddMember={() => setIsAddMemberOpen(true)} />}
        {activeTab === 'help' && <HelpPage />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">Friends of Finance</span>
            <span>•</span>
            <span>Community CRM (Internal B2B SaaS)</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              Simulated AI Safeguards Active
            </span>
            <span>•</span>
            <span className="text-slate-500">Frontend-Only Pure React Architecture</span>
          </div>
        </div>
      </footer>

      {/* Member Detail Modal */}
      {selectedMemberId && <MemberDetailModal />}

      {/* Add Member Modal */}
      {isAddMemberOpen && <AddMemberModal onClose={() => setIsAddMemberOpen(false)} />}
    </div>
  );
};

export default function App() {
  return (
    <CRMProvider>
      <AppContent />
    </CRMProvider>
  );
}
