export type MemberStatus = 'Newly Joined' | 'Active' | 'Highly Active' | 'At Risk' | 'Dormant';

export type CommunitySpace = 'Finance Workflows' | 'Ask Finance Peers' | 'Tools & Systems' | 'General';

export type OwnerName = 'Yukesh' | 'Priya' | 'Alex' | 'Sarah';

export interface Activity {
  id: string;
  memberId: string;
  memberName: string;
  date: string; // e.g. "2026-08-18" or relative
  timestamp: string;
  activityDescription: string;
  space: CommunitySpace;
  type: 'joined' | 'comment' | 'post' | 'attended' | 'download' | 'note';
}

export interface Member {
  id: string;
  fullName: string;
  role: string;
  company: string;
  email: string;
  avatarUrl?: string;
  status: MemberStatus;
  owner: OwnerName;
  nextAction: string;
  communitySpace: CommunitySpace;
  joinedDate: string;
  lastActiveDate: string;
  engagementScore: number; // 0 - 100
  aiSuggestion: {
    title: string;
    recommendation: string;
    rationale: string;
    suggestedAction: string;
  };
}

export type NavigationTab = 'dashboard' | 'directory' | 'help';

export type FocusedViewType = 'all' | 'newly-joined' | 'highly-active' | 'at-risk-dormant';
