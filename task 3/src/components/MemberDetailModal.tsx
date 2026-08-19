import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { StatusBadge } from './StatusBadge';
import type { MemberStatus, OwnerName, CommunitySpace } from '../types';
import { 
  X, 
  Sparkles, 
  Clock, 
  Send, 
  Edit3, 
  Check, 
  User, 
  MessageSquare, 
  FileText, 
  UserCheck, 
  UserPlus, 
  TrendingUp
} from 'lucide-react';

export const MemberDetailModal: React.FC = () => {
  const { 
    selectedMember, 
    closeMemberDetail, 
    updateMember, 
    activities, 
    addActivityNote 
  } = useCRM();

  if (!selectedMember) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState<MemberStatus>(selectedMember.status);
  const [editedOwner, setEditedOwner] = useState<OwnerName>(selectedMember.owner);
  const [editedSpace, setEditedSpace] = useState<CommunitySpace>(selectedMember.communitySpace);
  const [editedNextAction, setEditedNextAction] = useState(selectedMember.nextAction);

  const [newNote, setNewNote] = useState('');
  const [copiedNotice, setCopiedNotice] = useState(false);

  // Filter activities for this member and order chronologically (latest first)
  const memberActivities = activities
    .filter((act) => act.memberId === selectedMember.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleSaveChanges = () => {
    updateMember(selectedMember.id, {
      status: editedStatus,
      owner: editedOwner,
      communitySpace: editedSpace,
      nextAction: editedNextAction
    });
    setIsEditing(false);
  };

  const handleApplyAiSuggestion = () => {
    setEditedNextAction(selectedMember.aiSuggestion.suggestedAction);
    updateMember(selectedMember.id, {
      nextAction: selectedMember.aiSuggestion.suggestedAction
    });
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 3000);
  };

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    addActivityNote(selectedMember.id, newNote.trim(), selectedMember.communitySpace);
    setNewNote('');
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'joined':
        return <UserPlus className="w-3.5 h-3.5 text-blue-400" />;
      case 'comment':
        return <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />;
      case 'post':
        return <TrendingUp className="w-3.5 h-3.5 text-purple-400" />;
      case 'attended':
        return <UserCheck className="w-3.5 h-3.5 text-emerald-400" />;
      case 'download':
        return <FileText className="w-3.5 h-3.5 text-amber-400" />;
      case 'note':
      default:
        return <Clock className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-extrabold text-white text-base shadow-lg">
              {selectedMember.fullName
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  {selectedMember.fullName}
                </h2>
                <StatusBadge status={selectedMember.status} size="md" />
              </div>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                <span>{selectedMember.role}</span>
                <span>•</span>
                <span className="text-indigo-300 font-semibold">{selectedMember.company}</span>
                <span>•</span>
                <span className="text-slate-500">{selectedMember.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center transition-all"
              >
                <Edit3 className="w-3.5 h-3.5 mr-1.5" />
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleSaveChanges}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center transition-all shadow-md shadow-emerald-600/20"
              >
                <Check className="w-3.5 h-3.5 mr-1.5" />
                Save Changes
              </button>
            )}

            <button
              onClick={closeMemberDetail}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* EDITABLE OR DISPLAYED PROFILE METRICS GRID */}
          <div className="glass-card rounded-xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center">
                <User className="w-4 h-4 mr-1.5 text-indigo-400" /> Member Core Attributes
              </h3>
              <span className="text-xs text-slate-500">
                Joined: {selectedMember.joinedDate} | Last Active: {selectedMember.lastActiveDate}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {/* Status Selector */}
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Engagement Status</label>
                {isEditing ? (
                  <select
                    value={editedStatus}
                    onChange={(e) => setEditedStatus(e.target.value as MemberStatus)}
                    className="w-full bg-slate-950 text-slate-200 p-2 rounded-lg border border-slate-700"
                  >
                    <option value="Newly Joined">Newly Joined</option>
                    <option value="Active">Active</option>
                    <option value="Highly Active">Highly Active</option>
                    <option value="At Risk">At Risk</option>
                    <option value="Dormant">Dormant</option>
                  </select>
                ) : (
                  <div className="pt-1">
                    <StatusBadge status={selectedMember.status} size="sm" />
                  </div>
                )}
              </div>

              {/* Owner Selector */}
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Assigned Owner</label>
                {isEditing ? (
                  <select
                    value={editedOwner}
                    onChange={(e) => setEditedOwner(e.target.value as OwnerName)}
                    className="w-full bg-slate-950 text-slate-200 p-2 rounded-lg border border-slate-700"
                  >
                    <option value="Yukesh">Yukesh</option>
                    <option value="Priya">Priya</option>
                    <option value="Alex">Alex</option>
                    <option value="Sarah">Sarah</option>
                  </select>
                ) : (
                  <div className="pt-1 font-semibold text-slate-200">
                    {selectedMember.owner}
                  </div>
                )}
              </div>

              {/* Community Space Selector */}
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Community Space</label>
                {isEditing ? (
                  <select
                    value={editedSpace}
                    onChange={(e) => setEditedSpace(e.target.value as CommunitySpace)}
                    className="w-full bg-slate-950 text-slate-200 p-2 rounded-lg border border-slate-700"
                  >
                    <option value="Finance Workflows">Finance Workflows</option>
                    <option value="Ask Finance Peers">Ask Finance Peers</option>
                    <option value="Tools & Systems">Tools & Systems</option>
                    <option value="General">General</option>
                  </select>
                ) : (
                  <div className="pt-1 text-indigo-300 font-medium">
                    #{selectedMember.communitySpace}
                  </div>
                )}
              </div>

              {/* Engagement Score */}
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Engagement Score</label>
                <div className="pt-1 flex items-center space-x-2">
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full"
                      style={{ width: `${selectedMember.engagementScore}%` }}
                    />
                  </div>
                  <span className="font-bold text-slate-200">{selectedMember.engagementScore}/100</span>
                </div>
              </div>
            </div>

            {/* Next Action Field */}
            <div className="pt-2">
              <label className="block text-slate-400 mb-1 text-xs font-semibold">
                Next Recommended Action:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedNextAction}
                  onChange={(e) => setEditedNextAction(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 text-xs p-2.5 rounded-lg border border-slate-700"
                  placeholder="Enter next action..."
                />
              ) : (
                <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-xs text-amber-300 font-medium flex items-center justify-between">
                  <span>{selectedMember.nextAction}</span>
                </div>
              )}
            </div>
          </div>

          {/* AI SUGGESTION (SIMULATED) CARD - MANDATORY RULE ENFORCEMENT */}
          <div className="relative overflow-hidden rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-950/40 via-indigo-950/30 to-slate-900 p-5 shadow-xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    AI Suggestion (Simulated)
                  </h3>
                  <p className="text-[11px] text-purple-300 font-medium">
                    {selectedMember.aiSuggestion.title}
                  </p>
                </div>
              </div>

              <button
                onClick={handleApplyAiSuggestion}
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold transition-all shadow-md shadow-purple-600/30 flex items-center"
              >
                Apply to Next Action
              </button>
            </div>

            {copiedNotice && (
              <div className="mt-3 p-2 bg-emerald-500/20 text-emerald-300 text-xs rounded border border-emerald-500/30 font-medium flex items-center">
                <Check className="w-3.5 h-3.5 mr-1.5" /> Applied recommendation as Next Action!
              </div>
            )}

            <div className="mt-4 space-y-2 text-xs">
              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                <span className="text-slate-400 font-semibold">Recommendation: </span>
                <span className="text-slate-200">{selectedMember.aiSuggestion.recommendation}</span>
              </div>
              <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/50">
                <span className="text-slate-400 font-semibold">Activity Rationale: </span>
                <span className="text-slate-300 italic">{selectedMember.aiSuggestion.rationale}</span>
              </div>
            </div>

            {/* MANDATORY AI RULE DISCLAIMER TEXT */}
            <div className="mt-4 pt-3 border-t border-purple-500/20 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-normal italic">
                AI-assisted suggestion — simulated. Requires human review.
              </span>
              <span className="text-purple-400/80 font-medium text-[10px] uppercase tracking-wider">
                Non-automated • Internal engagement focus only
              </span>
            </div>
          </div>

          {/* CHRONOLOGICAL ACTIVITY HISTORY TIMELINE */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white tracking-wide flex items-center">
                <Clock className="w-4 h-4 mr-2 text-indigo-400" />
                Chronological Activity History ({memberActivities.length})
              </h3>
            </div>

            {/* Add Activity Note Form */}
            <form onSubmit={handleAddNoteSubmit} className="flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Log a community note or interaction for this member..."
                className="flex-1 bg-slate-950 text-slate-200 text-xs rounded-lg px-3 py-2 border border-slate-800 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-all flex items-center"
              >
                <Send className="w-3.5 h-3.5 mr-1" />
                Log Note
              </button>
            </form>

            {/* Timeline Stream */}
            <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
              {memberActivities.map((act) => (
                <div key={act.id} className="relative flex items-start space-x-3 pl-8">
                  <div className="absolute left-1 top-1 w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                    {getActivityIcon(act.type)}
                  </div>
                  <div className="flex-1 bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-xs">
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                      <span className="font-semibold text-slate-300">#{act.space}</span>
                      <span className="text-[10px] text-slate-500">{act.date} at {act.timestamp}</span>
                    </div>
                    <p className="text-slate-200 font-medium">{act.activityDescription}</p>
                  </div>
                </div>
              ))}

              {memberActivities.length === 0 && (
                <p className="text-xs text-slate-500 italic pl-8">No recorded activity history yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>Member ID: {selectedMember.id}</span>
          <button
            onClick={closeMemberDetail}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold transition-all"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
