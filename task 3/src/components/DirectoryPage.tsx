import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { StatusBadge } from './StatusBadge';
import type { MemberStatus, CommunitySpace, OwnerName } from '../types';
import { 
  Search, 
  Filter, 
  UserPlus, 
  Sparkles, 
  AlertTriangle, 
  Users, 
  X, 
  Eye, 
  ArrowUpDown, 
  Building2, 
  Briefcase, 
  Plus, 
  Calendar,
  Grid,
  List as ListIcon
} from 'lucide-react';

interface DirectoryPageProps {
  onOpenAddMember: () => void;
}

export const DirectoryPage: React.FC<DirectoryPageProps> = ({ onOpenAddMember }) => {
  const {
    members,
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    selectedSpace,
    setSelectedSpace,
    selectedOwner,
    setSelectedOwner,
    focusedView,
    setFocusedView,
    openMemberDetail,
    kpiCounts
  } = useCRM();

  const [sortField, setSortField] = useState<'fullName' | 'lastActiveDate' | 'engagementScore'>('lastActiveDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Perform multi-criteria filtering
  const filteredMembers = members.filter((member) => {
    // Search query filter (matches name, role, or company)
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      member.fullName.toLowerCase().includes(query) ||
      member.role.toLowerCase().includes(query) ||
      member.company.toLowerCase().includes(query) ||
      member.email.toLowerCase().includes(query);

    // Focused View filter
    let matchesFocused = true;
    if (focusedView === 'newly-joined') {
      matchesFocused = member.status === 'Newly Joined';
    } else if (focusedView === 'highly-active') {
      matchesFocused = member.status === 'Highly Active';
    } else if (focusedView === 'at-risk-dormant') {
      matchesFocused = member.status === 'At Risk' || member.status === 'Dormant';
    }

    // Status dropdown filter
    const matchesStatus =
      selectedStatus === 'All' || member.status === selectedStatus;

    // Space dropdown filter
    const matchesSpace =
      selectedSpace === 'All' || member.communitySpace === selectedSpace;

    // Owner dropdown filter
    const matchesOwner =
      selectedOwner === 'All' || member.owner === selectedOwner;

    return matchesSearch && matchesFocused && matchesStatus && matchesSpace && matchesOwner;
  });

  // Sorting
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (sortField === 'fullName') {
      return sortOrder === 'asc'
        ? a.fullName.localeCompare(b.fullName)
        : b.fullName.localeCompare(a.fullName);
    } else if (sortField === 'engagementScore') {
      return sortOrder === 'asc'
        ? a.engagementScore - b.engagementScore
        : b.engagementScore - a.engagementScore;
    } else {
      return sortOrder === 'asc'
        ? a.lastActiveDate.localeCompare(b.lastActiveDate)
        : b.lastActiveDate.localeCompare(a.lastActiveDate);
    }
  });

  const toggleSort = (field: 'fullName' | 'lastActiveDate' | 'engagementScore') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedStatus('All');
    setSelectedSpace('All');
    setSelectedOwner('All');
    setFocusedView('all');
  };

  const hasActiveFilters =
    searchQuery ||
    selectedStatus !== 'All' ||
    selectedSpace !== 'All' ||
    selectedOwner !== 'All' ||
    focusedView !== 'all';

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Member Directory
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-medium">
              {filteredMembers.length} of {members.length} members
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Search, filter, and review active finance leaders across community spaces.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-slate-900 rounded-lg p-1 border border-slate-800">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md ${
                viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Table View"
            >
              <ListIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md ${
                viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Grid Cards View"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onOpenAddMember}
            className="flex items-center px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            New Member
          </button>
        </div>
      </div>

      {/* 3 PREDEFINED FOCUSED VIEWS (Tabs / Buttons) */}
      <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 flex items-center">
            <Filter className="w-3.5 h-3.5 mr-1.5 text-indigo-400" /> Focused Views:
          </span>

          {/* All Members */}
          <button
            onClick={() => setFocusedView('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center ${
              focusedView === 'all'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5 mr-1.5" />
            All Members ({kpiCounts.total})
          </button>

          {/* a) New Members */}
          <button
            onClick={() => setFocusedView('newly-joined')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center ${
              focusedView === 'newly-joined'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-slate-800/80 text-blue-400 hover:bg-slate-800 border border-blue-500/20'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 mr-1.5" />
            New Members ({kpiCounts.newlyJoined})
          </button>

          {/* b) Highly Active */}
          <button
            onClick={() => setFocusedView('highly-active')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center ${
              focusedView === 'highly-active'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-slate-800/80 text-purple-300 hover:bg-slate-800 border border-purple-500/20'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Highly Active ({kpiCounts.highlyActive})
          </button>

          {/* c) At Risk / Dormant */}
          <button
            onClick={() => setFocusedView('at-risk-dormant')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center ${
              focusedView === 'at-risk-dormant'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'bg-slate-800/80 text-amber-400 hover:bg-slate-800 border border-amber-500/20'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
            At Risk / Dormant ({kpiCounts.atRisk + kpiCounts.dormant})
          </button>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center px-2 py-1 bg-rose-500/10 rounded border border-rose-500/20 transition-all"
          >
            <X className="w-3.5 h-3.5 mr-1" />
            Clear Filters
          </button>
        )}
      </div>

      {/* SEARCH AND DROPDOWN FILTERS */}
      <div className="glass-card rounded-xl p-4 space-y-3 border border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          {/* Text Search */}
          <div className="lg:col-span-4 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, role, company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 text-slate-200 text-xs rounded-lg pl-9 pr-8 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Dropdown */}
          <div className="lg:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value as MemberStatus | 'All');
                setFocusedView('all');
              }}
              className="w-full bg-slate-950/80 text-slate-200 text-xs rounded-lg px-3 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Statuses</option>
              <option value="Newly Joined">Newly Joined (&lt;7 days)</option>
              <option value="Active">Active (2-4 acts/30d)</option>
              <option value="Highly Active">Highly Active (5+ acts/30d)</option>
              <option value="At Risk">At Risk (14+ days idle)</option>
              <option value="Dormant">Dormant (30+ days idle)</option>
            </select>
          </div>

          {/* Community Space Dropdown */}
          <div className="lg:col-span-3">
            <select
              value={selectedSpace}
              onChange={(e) => setSelectedSpace(e.target.value as CommunitySpace | 'All')}
              className="w-full bg-slate-950/80 text-slate-200 text-xs rounded-lg px-3 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Community Spaces</option>
              <option value="Finance Workflows">Finance Workflows</option>
              <option value="Ask Finance Peers">Ask Finance Peers</option>
              <option value="Tools & Systems">Tools & Systems</option>
              <option value="General">General</option>
            </select>
          </div>

          {/* Owner Dropdown */}
          <div className="lg:col-span-2">
            <select
              value={selectedOwner}
              onChange={(e) => setSelectedOwner(e.target.value as OwnerName | 'All')}
              className="w-full bg-slate-950/80 text-slate-200 text-xs rounded-lg px-3 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Owners</option>
              <option value="Yukesh">Yukesh</option>
              <option value="Priya">Priya</option>
              <option value="Alex">Alex</option>
              <option value="Sarah">Sarah</option>
            </select>
          </div>
        </div>
      </div>

      {/* TABLE VIEW */}
      {viewMode === 'table' ? (
        <div className="glass-panel rounded-xl overflow-hidden border border-slate-800 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/90 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                  <th className="py-3.5 px-4 font-bold">
                    <button
                      onClick={() => toggleSort('fullName')}
                      className="flex items-center hover:text-white"
                    >
                      Member Name & Role <ArrowUpDown className="w-3 h-3 ml-1" />
                    </button>
                  </th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold">Community Space</th>
                  <th className="py-3.5 px-4 font-bold">Owner</th>
                  <th className="py-3.5 px-4 font-bold">Next Recommended Action</th>
                  <th className="py-3.5 px-4 font-bold">
                    <button
                      onClick={() => toggleSort('lastActiveDate')}
                      className="flex items-center hover:text-white"
                    >
                      Last Active <ArrowUpDown className="w-3 h-3 ml-1" />
                    </button>
                  </th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
                {sortedMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                    onClick={() => openMemberDetail(member.id)}
                  >
                    {/* Name & Role */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-md">
                          {member.fullName
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        <div>
                          <div className="font-bold text-white group-hover:text-indigo-300 transition-colors">
                            {member.fullName}
                          </div>
                          <div className="text-[11px] text-slate-400 flex items-center space-x-1.5 mt-0.5">
                            <Briefcase className="w-3 h-3 text-slate-500" />
                            <span>{member.role}</span>
                            <span className="text-slate-600">•</span>
                            <Building2 className="w-3 h-3 text-slate-500" />
                            <span className="text-slate-300 font-medium">{member.company}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <StatusBadge status={member.status} size="sm" />
                    </td>

                    {/* Community Space */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded bg-slate-800/90 text-indigo-300 border border-slate-700/80 font-medium">
                        #{member.communitySpace}
                      </span>
                    </td>

                    {/* Owner */}
                    <td className="py-3.5 px-4 font-semibold text-slate-200">
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                        {member.owner}
                      </span>
                    </td>

                    {/* Next Action */}
                    <td className="py-3.5 px-4 max-w-xs truncate text-slate-300 font-normal">
                      <span className="italic truncate block" title={member.nextAction}>
                        {member.nextAction}
                      </span>
                    </td>

                    {/* Last Active */}
                    <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>{member.lastActiveDate}</span>
                      </div>
                    </td>

                    {/* Action Button */}
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => openMemberDetail(member.id)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-indigo-600 hover:text-white text-indigo-300 rounded-lg text-xs font-semibold transition-all border border-slate-700"
                      >
                        <Eye className="w-3.5 h-3.5 inline mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {sortedMembers.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <Users className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                      <p className="text-sm font-semibold">No members match the selected filters.</p>
                      <button
                        onClick={clearAllFilters}
                        className="mt-3 text-xs text-indigo-400 underline font-medium hover:text-indigo-300"
                      >
                        Reset search & filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => openMemberDetail(member.id)}
              className="glass-card rounded-xl p-5 border border-slate-800 cursor-pointer space-y-4 hover:border-indigo-500/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
                    {member.fullName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm hover:text-indigo-300 transition-colors">
                      {member.fullName}
                    </h3>
                    <p className="text-xs text-slate-400">{member.role}</p>
                    <p className="text-xs text-indigo-300 font-semibold">{member.company}</p>
                  </div>
                </div>
                <StatusBadge status={member.status} size="sm" />
              </div>

              <div className="space-y-2 text-xs pt-2 border-t border-slate-800/60">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Community Space:</span>
                  <span className="font-semibold text-slate-200">#{member.communitySpace}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Assigned Owner:</span>
                  <span className="font-semibold text-slate-200">{member.owner}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Last Active:</span>
                  <span className="text-slate-300">{member.lastActiveDate}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                <span className="text-amber-400 font-bold block mb-0.5">Next Action:</span>
                <p className="text-slate-300 italic truncate">{member.nextAction}</p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openMemberDetail(member.id);
                }}
                className="w-full py-2 bg-slate-800 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded-lg text-xs font-semibold transition-all border border-slate-700 flex items-center justify-center"
              >
                <Eye className="w-3.5 h-3.5 mr-1.5" />
                View Full Profile & Timeline
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
