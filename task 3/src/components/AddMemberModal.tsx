import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import type { MemberStatus, CommunitySpace, OwnerName } from '../types';
import { X, UserPlus } from 'lucide-react';

interface AddMemberModalProps {
  onClose: () => void;
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({ onClose }) => {
  const { addMember, setActiveTab } = useCRM();

  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('FP&A Manager');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<MemberStatus>('Newly Joined');
  const [owner, setOwner] = useState<OwnerName>('Yukesh');
  const [communitySpace, setCommunitySpace] = useState<CommunitySpace>('Finance Workflows');
  const [nextAction, setNextAction] = useState('Send onboarding check-in & welcome guide');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !company.trim()) return;

    addMember({
      fullName: fullName.trim(),
      role: role.trim() || 'Finance Professional',
      company: company.trim(),
      email: email.trim() || `${fullName.toLowerCase().replace(/\s+/g, '.')}@demo-finance.com`,
      status,
      owner,
      communitySpace,
      nextAction: nextAction.trim() || 'Schedule introduction call'
    });

    onClose();
    setActiveTab('directory');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <UserPlus className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white">Add New Community Member</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-semibold">Full Name *</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Samantha Vance"
              className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Role *</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Head of Treasury"
                className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Company *</label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Stripe"
                className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-semibold">Work Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. samantha@stripe-demo.com"
              className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as MemberStatus)}
                className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-800"
              >
                <option value="Newly Joined">Newly Joined</option>
                <option value="Active">Active</option>
                <option value="Highly Active">Highly Active</option>
                <option value="At Risk">At Risk</option>
                <option value="Dormant">Dormant</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Owner</label>
              <select
                value={owner}
                onChange={(e) => setOwner(e.target.value as OwnerName)}
                className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-800"
              >
                <option value="Yukesh">Yukesh</option>
                <option value="Priya">Priya</option>
                <option value="Alex">Alex</option>
                <option value="Sarah">Sarah</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Space</label>
              <select
                value={communitySpace}
                onChange={(e) => setCommunitySpace(e.target.value as CommunitySpace)}
                className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-800"
              >
                <option value="Finance Workflows">Finance Workflows</option>
                <option value="Ask Finance Peers">Ask Finance Peers</option>
                <option value="Tools & Systems">Tools & Systems</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-semibold">Initial Next Action</label>
            <input
              type="text"
              value={nextAction}
              onChange={(e) => setNextAction(e.target.value)}
              className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-lg border border-slate-800 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-md shadow-indigo-600/20"
            >
              Create Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
