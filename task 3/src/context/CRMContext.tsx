import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Member, Activity, MemberStatus, CommunitySpace, OwnerName, NavigationTab, FocusedViewType } from '../types';
import { INITIAL_MEMBERS, INITIAL_ACTIVITIES } from '../data/mockData';

interface CRMContextType {
  members: Member[];
  activities: Activity[];
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  selectedMemberId: string | null;
  selectedMember: Member | null;
  openMemberDetail: (memberId: string) => void;
  closeMemberDetail: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStatus: MemberStatus | 'All';
  setSelectedStatus: (status: MemberStatus | 'All') => void;
  selectedSpace: CommunitySpace | 'All';
  setSelectedSpace: (space: CommunitySpace | 'All') => void;
  selectedOwner: OwnerName | 'All';
  setSelectedOwner: (owner: OwnerName | 'All') => void;
  focusedView: FocusedViewType;
  setFocusedView: (view: FocusedViewType) => void;
  updateMember: (id: string, updates: Partial<Member>) => void;
  addActivityNote: (memberId: string, noteText: string, space?: CommunitySpace) => void;
  resetData: () => void;
  addMember: (memberData: Omit<Member, 'id' | 'joinedDate' | 'lastActiveDate' | 'engagementScore' | 'aiSuggestion'>) => void;
  kpiCounts: {
    total: number;
    newlyJoined: number;
    active: number;
    highlyActive: number;
    atRisk: number;
    dormant: number;
  };
}

const STORAGE_KEY_MEMBERS = 'fof_crm_members_v1';
const STORAGE_KEY_ACTIVITIES = 'fof_crm_activities_v1';

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const CRMProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_MEMBERS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse members from localStorage', e);
      }
    }
    return INITIAL_MEMBERS;
  });

  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ACTIVITIES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse activities from localStorage', e);
      }
    }
    return INITIAL_ACTIVITIES;
  });

  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<MemberStatus | 'All'>('All');
  const [selectedSpace, setSelectedSpace] = useState<CommunitySpace | 'All'>('All');
  const [selectedOwner, setSelectedOwner] = useState<OwnerName | 'All'>('All');
  const [focusedView, setFocusedView] = useState<FocusedViewType>('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_MEMBERS, JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(activities));
  }, [activities]);

  const openMemberDetail = (id: string) => {
    setSelectedMemberId(id);
  };

  const closeMemberDetail = () => {
    setSelectedMemberId(null);
  };

  const selectedMember = members.find((m) => m.id === selectedMemberId) || null;

  const updateMember = (id: string, updates: Partial<Member>) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  const addActivityNote = (memberId: string, noteText: string, space?: CommunitySpace) => {
    const member = members.find((m) => m.id === memberId);
    if (!member) return;

    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      memberId,
      memberName: member.fullName,
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      activityDescription: `Community Note: ${noteText}`,
      space: space || member.communitySpace,
      type: 'note'
    };

    setActivities((prev) => [newActivity, ...prev]);
    // Also update member's last active date
    updateMember(memberId, { lastActiveDate: newActivity.date });
  };

  const handleSetFocusedView = (view: FocusedViewType) => {
    setFocusedView(view);
    if (view === 'newly-joined') {
      setSelectedStatus('Newly Joined');
    } else if (view === 'highly-active') {
      setSelectedStatus('Highly Active');
    } else if (view === 'at-risk-dormant') {
      // In UI logic we filter for At Risk OR Dormant
      setSelectedStatus('All');
    } else {
      setSelectedStatus('All');
    }
  };

  const resetData = () => {
    setMembers(INITIAL_MEMBERS);
    setActivities(INITIAL_ACTIVITIES);
    setSearchQuery('');
    setSelectedStatus('All');
    setSelectedSpace('All');
    setSelectedOwner('All');
    setFocusedView('all');
    localStorage.removeItem(STORAGE_KEY_MEMBERS);
    localStorage.removeItem(STORAGE_KEY_ACTIVITIES);
  };

  const addMember = (memberData: Omit<Member, 'id' | 'joinedDate' | 'lastActiveDate' | 'engagementScore' | 'aiSuggestion'>) => {
    const newId = `mem-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];
    const newMember: Member = {
      ...memberData,
      id: newId,
      joinedDate: today,
      lastActiveDate: today,
      engagementScore: 75,
      aiSuggestion: {
        title: 'New Member Welcome Sequence',
        recommendation: `Schedule onboarding sync for ${memberData.fullName} in #${memberData.communitySpace}.`,
        rationale: 'Newly created profile requires owner check-in.',
        suggestedAction: `Send welcome message to ${memberData.fullName}`
      }
    };

    setMembers((prev) => [newMember, ...prev]);

    // Add initial activity
    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      memberId: newId,
      memberName: newMember.fullName,
      date: today,
      timestamp: 'Just now',
      activityDescription: `Joined community space #${newMember.communitySpace}`,
      space: newMember.communitySpace,
      type: 'joined'
    };

    setActivities((prev) => [newActivity, ...prev]);
  };

  // Calculate KPI Counts strictly
  const kpiCounts = {
    total: members.length,
    newlyJoined: members.filter((m) => m.status === 'Newly Joined').length,
    active: members.filter((m) => m.status === 'Active').length,
    highlyActive: members.filter((m) => m.status === 'Highly Active').length,
    atRisk: members.filter((m) => m.status === 'At Risk').length,
    dormant: members.filter((m) => m.status === 'Dormant').length
  };

  return (
    <CRMContext.Provider
      value={{
        members,
        activities,
        activeTab,
        setActiveTab,
        selectedMemberId,
        selectedMember,
        openMemberDetail,
        closeMemberDetail,
        searchQuery,
        setSearchQuery,
        selectedStatus,
        setSelectedStatus,
        selectedSpace,
        setSelectedSpace,
        selectedOwner,
        setSelectedOwner,
        focusedView,
        setFocusedView: handleSetFocusedView,
        updateMember,
        addActivityNote,
        resetData,
        addMember,
        kpiCounts
      }}
    >
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};
