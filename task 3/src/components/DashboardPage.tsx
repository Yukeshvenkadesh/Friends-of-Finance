import React from 'react';
import { useCRM } from '../context/CRMContext';
import { StatusBadge } from './StatusBadge';
import { 
  Users, 
  UserPlus, 
  Activity as ActivityIcon, 
  Sparkles, 
  AlertTriangle, 
  Moon, 
  Clock, 
  MessageSquare, 
  FileText, 
  UserCheck, 
  ExternalLink,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import type { MemberStatus, Activity as ActivityType } from '../types';

export const DashboardPage: React.FC = () => {
  const { 
    members, 
    activities, 
    kpiCounts, 
    setActiveTab, 
    setSelectedStatus, 
    setFocusedView, 
    openMemberDetail,
    setSelectedSpace
  } = useCRM();

  // Filter members needing follow-up (At Risk or Dormant)
  const followUpMembers = members.filter(
    (m) => m.status === 'At Risk' || m.status === 'Dormant'
  );

  const handleKpiClick = (status: MemberStatus | 'All') => {
    setActiveTab('directory');
    if (status === 'All') {
      setFocusedView('all');
    } else if (status === 'Newly Joined') {
      setFocusedView('newly-joined');
    } else if (status === 'Highly Active') {
      setFocusedView('highly-active');
    } else if (status === 'At Risk' || status === 'Dormant') {
      setFocusedView('at-risk-dormant');
    } else {
      setSelectedStatus(status);
    }
  };

  const getActivityIcon = (type: ActivityType['type']) => {
    switch (type) {
      case 'joined':
        return <UserPlus className="w-4 h-4 text-blue-400" />;
      case 'comment':
        return <MessageSquare className="w-4 h-4 text-indigo-400" />;
      case 'post':
        return <TrendingUp className="w-4 h-4 text-purple-400" />;
      case 'attended':
        return <UserCheck className="w-4 h-4 text-emerald-400" />;
      case 'download':
        return <FileText className="w-4 h-4 text-amber-400" />;
      case 'note':
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-[#1e293b] space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Executive Community Overview
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
              Live Real-Time Sync
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track engagement telemetry, prioritize community outreach, and manage finance peer interactions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleKpiClick('At Risk')}
            className="flex items-center text-xs font-semibold px-3 py-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-all"
          >
            <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
            Review At Risk ({kpiCounts.atRisk + kpiCounts.dormant})
          </button>
          <button
            onClick={() => {
              setFocusedView('all');
              setSelectedStatus('All');
              setSelectedSpace('All');
              setActiveTab('directory');
            }}
            className="flex items-center text-xs font-semibold px-3 py-2 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition-all"
          >
            <Users className="w-3.5 h-3.5 mr-1.5" />
            View Full Roster ({kpiCounts.total})
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Community Health Metrics (15 Fictional Members)
          </h2>
          <span className="text-xs text-slate-500">Click any card to filter directory</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Total Members */}
          <div
            onClick={() => handleKpiClick('All')}
            className="glass-card rounded-xl p-4 cursor-pointer hover:border-indigo-500/50 group"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Total Roster</span>
              <div className="p-1.5 rounded-lg bg-slate-800 group-hover:bg-indigo-600/20 group-hover:text-indigo-400 transition-all">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{kpiCounts.total}</div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center">
              Active Finance Leaders
            </div>
          </div>

          {/* Newly Joined */}
          <div
            onClick={() => handleKpiClick('Newly Joined')}
            className="glass-card rounded-xl p-4 cursor-pointer hover:border-blue-500/50 group"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Newly Joined</span>
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                <UserPlus className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-400">{kpiCounts.newlyJoined}</div>
            <div className="text-[11px] text-slate-400 mt-1">&lt; 7 days tenure</div>
          </div>

          {/* Active */}
          <div
            onClick={() => handleKpiClick('Active')}
            className="glass-card rounded-xl p-4 cursor-pointer hover:border-emerald-500/50 group"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Active</span>
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <ActivityIcon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-emerald-400">{kpiCounts.active}</div>
            <div className="text-[11px] text-slate-400 mt-1">2-4 acts / 30d</div>
          </div>

          {/* Highly Active */}
          <div
            onClick={() => handleKpiClick('Highly Active')}
            className="glass-card rounded-xl p-4 cursor-pointer hover:border-purple-500/50 group"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Highly Active</span>
              <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-purple-400">{kpiCounts.highlyActive}</div>
            <div className="text-[11px] text-slate-400 mt-1">5+ acts / 30d</div>
          </div>

          {/* At Risk */}
          <div
            onClick={() => handleKpiClick('At Risk')}
            className="glass-card rounded-xl p-4 cursor-pointer hover:border-amber-500/50 group"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">At Risk</span>
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-amber-400">{kpiCounts.atRisk}</div>
            <div className="text-[11px] text-slate-400 mt-1">14+ days idle</div>
          </div>

          {/* Dormant */}
          <div
            onClick={() => handleKpiClick('Dormant')}
            className="glass-card rounded-xl p-4 cursor-pointer hover:border-rose-500/50 group"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Dormant</span>
              <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
                <Moon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold text-rose-400">{kpiCounts.dormant}</div>
            <div className="text-[11px] text-slate-400 mt-1">30+ days idle</div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Activity & Members Needing Follow-up */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Members Needing Follow-up (Priority List) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <h2 className="text-base font-bold text-white tracking-wide">
                Members Needing Follow-up ({followUpMembers.length})
              </h2>
            </div>
            <button
              onClick={() => handleKpiClick('At Risk')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center"
            >
              View in Directory <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          <div className="space-y-3">
            {followUpMembers.map((member) => (
              <div
                key={member.id}
                className="glass-card rounded-xl p-4 border-l-4 border-l-amber-500/80 hover:border-slate-700 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-rose-600 flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-md">
                      {member.fullName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span
                          onClick={() => openMemberDetail(member.id)}
                          className="font-bold text-white hover:text-indigo-300 cursor-pointer text-sm"
                        >
                          {member.fullName}
                        </span>
                        <StatusBadge status={member.status} size="sm" />
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {member.role} • <span className="text-slate-300">{member.company}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 self-end sm:self-center">
                    <span className="text-[11px] text-slate-400 bg-slate-900/60 px-2 py-1 rounded border border-slate-800">
                      Owner: <strong className="text-slate-200">{member.owner}</strong>
                    </span>
                    <button
                      onClick={() => openMemberDetail(member.id)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/20"
                    >
                      Action Details
                    </button>
                  </div>
                </div>

                {/* Next Action banner */}
                <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <div className="flex items-center text-slate-300 space-x-1.5 truncate">
                    <span className="font-semibold text-amber-400 shrink-0">Next Action:</span>
                    <span className="truncate italic">{member.nextAction}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 shrink-0 ml-2">
                    Last active: {member.lastActiveDate}
                  </span>
                </div>
              </div>
            ))}

            {followUpMembers.length === 0 && (
              <div className="glass-card rounded-xl p-8 text-center text-slate-400">
                <UserCheck className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-sm font-medium">All members are actively engaged!</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity Telemetry Stream */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <h2 className="text-base font-bold text-white tracking-wide">
                Recent Community Activity
              </h2>
            </div>
            <span className="text-xs text-slate-400">{activities.length} total events</span>
          </div>

          <div className="glass-panel rounded-xl p-4 space-y-3 max-h-[600px] overflow-y-auto">
            {activities.slice(0, 8).map((act) => (
              <div
                key={act.id}
                className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/30 transition-all flex items-start space-x-3"
              >
                <div className="p-2 rounded-lg bg-slate-800 shrink-0 mt-0.5">
                  {getActivityIcon(act.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span
                      onClick={() => openMemberDetail(act.memberId)}
                      className="text-xs font-bold text-white hover:text-indigo-300 cursor-pointer truncate"
                    >
                      {act.memberName}
                    </span>
                    <span className="text-[10px] text-slate-500 shrink-0 ml-2">{act.date}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-snug">
                    {act.activityDescription}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-medium">
                      #{act.space}
                    </span>
                    <button
                      onClick={() => openMemberDetail(act.memberId)}
                      className="text-[10px] text-slate-400 hover:text-slate-200 flex items-center"
                    >
                      View member <ExternalLink className="w-2.5 h-2.5 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
