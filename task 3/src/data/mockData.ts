import type { Member, Activity } from '../types';

export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'mem-1',
    fullName: 'Elena Rostova',
    role: 'VP of FP&A',
    company: 'Stripe Global',
    email: 'elena.rostova@stripe-demo.com',
    status: 'Highly Active',
    owner: 'Yukesh',
    nextAction: 'Invite as speaker for Q3 Strategic FP&A Masterclass',
    communitySpace: 'Finance Workflows',
    joinedDate: '2026-03-12',
    lastActiveDate: '2026-08-19',
    engagementScore: 94,
    aiSuggestion: {
      title: 'Peer Leadership Opportunity',
      recommendation: 'Invite Elena to co-host an upcoming roundtable on multi-currency FP&A modeling.',
      rationale: 'High participation rate (14 posts in 30d) and expert feedback on SaaS metric benchmarking threads.',
      suggestedAction: 'Send invite for co-hosting FP&A masterclass'
    }
  },
  {
    id: 'mem-2',
    fullName: 'Marcus Vance',
    role: 'Head of Treasury',
    company: 'Brex Tech',
    email: 'm.vance@brex-demo.io',
    status: 'At Risk',
    owner: 'Priya',
    nextAction: 'Schedule 1-on-1 catchup call on liquidity management',
    communitySpace: 'Tools & Systems',
    joinedDate: '2026-01-15',
    lastActiveDate: '2026-08-01',
    engagementScore: 42,
    aiSuggestion: {
      title: 'Re-engagement Prompt',
      recommendation: 'Share recent community poll results on automated Treasury Workflows to spark interest.',
      rationale: 'Has not posted in 18 days after previously engaging with corporate cash management threads.',
      suggestedAction: 'Share Treasury Automation whitepaper via community DM'
    }
  },
  {
    id: 'mem-3',
    fullName: 'Sophia Lin',
    role: 'Senior Finance Manager',
    company: 'Datadog Systems',
    email: 'sophia.lin@datadog-demo.com',
    status: 'Newly Joined',
    owner: 'Yukesh',
    nextAction: 'Send community welcome kit & tag in #Ask Finance Peers',
    communitySpace: 'Ask Finance Peers',
    joinedDate: '2026-08-16',
    lastActiveDate: '2026-08-18',
    engagementScore: 78,
    aiSuggestion: {
      title: 'Onboarding Nudge',
      recommendation: 'Introduce Sophia to 2 senior members working on similar NetSuite to Workday migration stacks.',
      rationale: 'Newly joined 3 days ago and filled profile interests around financial tech stack upgrades.',
      suggestedAction: 'Tag Sophia in NetSuite Migration discussion thread'
    }
  },
  {
    id: 'mem-4',
    fullName: 'David Sterling',
    role: 'Chief Financial Officer',
    company: 'Apex Logistics',
    email: 'dsterling@apexlogistics-demo.com',
    status: 'Dormant',
    owner: 'Priya',
    nextAction: 'Send personal re-engagement check-in regarding CFO peer circle',
    communitySpace: 'General',
    joinedDate: '2025-11-04',
    lastActiveDate: '2026-07-10',
    engagementScore: 18,
    aiSuggestion: {
      title: 'Executive Outreach',
      recommendation: 'Invite David to exclusive quarterly Executive CFO Dinner in SF or virtual executive briefing.',
      rationale: 'Dormant for >35 days. High executive level requires high-touch private networking invite.',
      suggestedAction: 'Invite David to SF CFO Executive Dinner'
    }
  },
  {
    id: 'mem-5',
    fullName: 'Ananya Sharma',
    role: 'Corporate Controller',
    company: 'Razorpay',
    email: 'ananya.s@razorpay-demo.in',
    status: 'Active',
    owner: 'Alex',
    nextAction: 'Ask for feedback on US GAAP vs IFRS revenue recognition guide',
    communitySpace: 'Finance Workflows',
    joinedDate: '2026-04-02',
    lastActiveDate: '2026-08-17',
    engagementScore: 68,
    aiSuggestion: {
      title: 'Content Contribution Request',
      recommendation: 'Ask Ananya to contribute a template on ASC 606 revenue recognition checklist.',
      rationale: 'Consistent weekly activity and frequently answers accounting policy questions.',
      suggestedAction: 'Request Revenue Recognition template submission'
    }
  },
  {
    id: 'mem-6',
    fullName: 'Klaus Webber',
    role: 'Director of Strategic Finance',
    company: 'Fintech Scale',
    email: 'klaus.w@finscale-demo.de',
    status: 'Highly Active',
    owner: 'Sarah',
    nextAction: 'Invite to present unit economics benchmark breakdown',
    communitySpace: 'Tools & Systems',
    joinedDate: '2026-02-18',
    lastActiveDate: '2026-08-19',
    engagementScore: 96,
    aiSuggestion: {
      title: 'Ambassador Role Candidate',
      recommendation: 'Nominate Klaus as a Community Space Lead for #Tools & Systems.',
      rationale: 'Top 2% contributor with 22 helpful replies this month.',
      suggestedAction: 'Propose Community Moderator badge & perks'
    }
  },
  {
    id: 'mem-7',
    fullName: 'Rachel Chen',
    role: 'Treasury Analyst',
    company: 'Global Pay',
    email: 'rachel.c@globalpay-demo.com',
    status: 'Newly Joined',
    owner: 'Yukesh',
    nextAction: 'Share Treasury 101 beginner resource pack',
    communitySpace: 'Ask Finance Peers',
    joinedDate: '2026-08-15',
    lastActiveDate: '2026-08-19',
    engagementScore: 72,
    aiSuggestion: {
      title: 'Welcome Warmup',
      recommendation: 'Encourage Rachel to post her first question in #Ask Finance Peers regarding FX hedging tools.',
      rationale: 'Viewed 5 FX hedging threads within 48 hours of joining.',
      suggestedAction: 'Direct message FX hedging discussion starter'
    }
  },
  {
    id: 'mem-8',
    fullName: 'Tariq Al-Mansoor',
    role: 'Head of FP&A & Ops',
    company: 'Middle East Tech Ventures',
    email: 'tariq@metv-demo.ae',
    status: 'Active',
    owner: 'Priya',
    nextAction: 'Invite to regional finance leaders online networking session',
    communitySpace: 'Finance Workflows',
    joinedDate: '2026-05-11',
    lastActiveDate: '2026-08-15',
    engagementScore: 65,
    aiSuggestion: {
      title: 'Regional Networking Nudge',
      recommendation: 'Connect Tariq with EMEA finance heads discussing cross-border tax structured models.',
      rationale: 'Active commenter in EMEA corporate expansion threads.',
      suggestedAction: 'Invite to EMEA Finance Leaders Virtual Coffee'
    }
  },
  {
    id: 'mem-9',
    fullName: 'Jessica Miller',
    role: 'Financial Systems Architect',
    company: 'Enterprise SaaS Co',
    email: 'jmiller@enterprisesaas-demo.com',
    status: 'At Risk',
    owner: 'Sarah',
    nextAction: 'Check in regarding Adaptive Insights integration post feedback',
    communitySpace: 'Tools & Systems',
    joinedDate: '2026-03-30',
    lastActiveDate: '2026-08-03',
    engagementScore: 38,
    aiSuggestion: {
      title: 'Targeted Discussion Tag',
      recommendation: 'Tag Jessica on recent Anaplan vs Pigment comparison post.',
      rationale: 'Was previously active in ERP & EPM software reviews before 16-day lull.',
      suggestedAction: 'Tag in Pigment vs Anaplan comparison thread'
    }
  },
  {
    id: 'mem-10',
    fullName: 'Vikram Patel',
    role: 'VP of Finance',
    company: 'Cloud Scale Tech',
    email: 'vikram.patel@cloudscale-demo.com',
    status: 'Active',
    owner: 'Alex',
    nextAction: 'Send preview link for 2026 CFO Compensation Survey',
    communitySpace: 'General',
    joinedDate: '2026-01-22',
    lastActiveDate: '2026-08-16',
    engagementScore: 61,
    aiSuggestion: {
      title: 'Survey Engagement Opportunity',
      recommendation: 'Ask Vikram to submit data for the Executive Compensation Report.',
      rationale: 'Completed 2 previous community surveys and downloaded benchmarking reports.',
      suggestedAction: 'Send early access compensation survey form'
    }
  },
  {
    id: 'mem-11',
    fullName: 'Charlotte Dubois',
    role: 'Audit & Compliance Lead',
    company: 'FinOps International',
    email: 'c.dubois@finops-demo.fr',
    status: 'Dormant',
    owner: 'Yukesh',
    nextAction: 'Send newsletter highlight on SOC 2 Type II audit checklist',
    communitySpace: 'Finance Workflows',
    joinedDate: '2025-10-18',
    lastActiveDate: '2026-06-25',
    engagementScore: 12,
    aiSuggestion: {
      title: 'Re-activation Campaign',
      recommendation: 'Send curated digest of top compliance and audit discussion threads from past month.',
      rationale: 'No login recorded for 55 days; high past interest in internal controls.',
      suggestedAction: 'Send personalized Compliance Digest email'
    }
  },
  {
    id: 'mem-12',
    fullName: 'Liam O\'Connor',
    role: 'FP&A Lead',
    company: 'NeoBank UK',
    email: 'liam.oc@neobank-demo.co.uk',
    status: 'Newly Joined',
    owner: 'Priya',
    nextAction: 'Confirm attendance for New Member Orientation call',
    communitySpace: 'Finance Workflows',
    joinedDate: '2026-08-17',
    lastActiveDate: '2026-08-19',
    engagementScore: 82,
    aiSuggestion: {
      title: 'Fast-Track Onboarding',
      recommendation: 'Invite Liam to introduce himself in #General introduce-yourself channel.',
      rationale: 'Joined 2 days ago and completed profile 100%.',
      suggestedAction: 'Send welcome prompt with link to introduction channel'
    }
  },
  {
    id: 'mem-13',
    fullName: 'Samantha Wright',
    role: 'Director of Revenue Operations',
    company: 'HyperGrowth AI',
    email: 'swright@hypergrowth-demo.ai',
    status: 'Highly Active',
    owner: 'Alex',
    nextAction: 'Feature RevOps case study on community homepage',
    communitySpace: 'Ask Finance Peers',
    joinedDate: '2026-02-05',
    lastActiveDate: '2026-08-19',
    engagementScore: 98,
    aiSuggestion: {
      title: 'Community Champion',
      recommendation: 'Highlight Samantha\'s post on SaaS ARR metrics in the weekly community digest.',
      rationale: 'Posted most upvoted response on net retention rate calculations.',
      suggestedAction: 'Feature post in weekly newsletter'
    }
  },
  {
    id: 'mem-14',
    fullName: 'Carlos Rodriguez',
    role: 'Accounts Payable Manager',
    company: 'Global Retail Group',
    email: 'c.rodriguez@globalretail-demo.es',
    status: 'At Risk',
    owner: 'Sarah',
    nextAction: 'Ask if interested in automated invoice processing demo',
    communitySpace: 'Tools & Systems',
    joinedDate: '2026-04-19',
    lastActiveDate: '2026-08-04',
    engagementScore: 35,
    aiSuggestion: {
      title: 'Nudge on Tooling',
      recommendation: 'Share discussion link on AI AP automation benchmarking.',
      rationale: 'Inactive for 15 days after starting draft on ERP invoice matching.',
      suggestedAction: 'Send helpful AP automation guide link'
    }
  },
  {
    id: 'mem-15',
    fullName: 'Hana Tanaka',
    role: 'Strategic Planning Lead',
    company: 'Pacific Innovation',
    email: 'hana.tanaka@pacific-demo.jp',
    status: 'Active',
    owner: 'Yukesh',
    nextAction: 'Invite to Asia-Pacific Finance Leaders sync',
    communitySpace: 'Finance Workflows',
    joinedDate: '2026-05-30',
    lastActiveDate: '2026-08-18',
    engagementScore: 70,
    aiSuggestion: {
      title: 'Peer Discussion Invitation',
      recommendation: 'Invite Hana to participate in scenario planning roundtable for H2 budget forecasting.',
      rationale: 'Active participant in financial forecasting threads.',
      suggestedAction: 'Send calendar invite for H2 Planning Roundtable'
    }
  }
];

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'act-101',
    memberId: 'mem-1',
    memberName: 'Elena Rostova',
    date: '2026-08-19',
    timestamp: '10:45 AM',
    activityDescription: 'Published detailed post on "3-Way Financial Model Architecture in Excel & Pigment"',
    space: 'Finance Workflows',
    type: 'post'
  },
  {
    id: 'act-102',
    memberId: 'mem-6',
    memberName: 'Klaus Webber',
    date: '2026-08-19',
    timestamp: '09:20 AM',
    activityDescription: 'Commented on "Best practices for automated ERP consolidation across 5 subsidiaries"',
    space: 'Tools & Systems',
    type: 'comment'
  },
  {
    id: 'act-103',
    memberId: 'mem-13',
    memberName: 'Samantha Wright',
    date: '2026-08-19',
    timestamp: '08:15 AM',
    activityDescription: 'Answered peer question regarding "Gross Margin vs Net Margin adjustments in SaaS"',
    space: 'Ask Finance Peers',
    type: 'comment'
  },
  {
    id: 'act-104',
    memberId: 'mem-12',
    memberName: 'Liam O\'Connor',
    date: '2026-08-19',
    timestamp: '07:30 AM',
    activityDescription: 'Joined community space #Finance Workflows and filled profile details',
    space: 'Finance Workflows',
    type: 'joined'
  },
  {
    id: 'act-105',
    memberId: 'mem-7',
    memberName: 'Rachel Chen',
    date: '2026-08-19',
    timestamp: '06:50 AM',
    activityDescription: 'Downloaded "Corporate Treasury & Cash Flow Management Matrix Template"',
    space: 'Ask Finance Peers',
    type: 'download'
  },
  {
    id: 'act-106',
    memberId: 'mem-3',
    memberName: 'Sophia Lin',
    date: '2026-08-18',
    timestamp: '04:12 PM',
    activityDescription: 'Commented on post "NetSuite to Workday migration timeline & pitfalls"',
    space: 'Tools & Systems',
    type: 'comment'
  },
  {
    id: 'act-107',
    memberId: 'mem-15',
    memberName: 'Hana Tanaka',
    date: '2026-08-18',
    timestamp: '02:30 PM',
    activityDescription: 'Attended virtual event "Mastering H2 Scenario Planning & Sensitivity Analysis"',
    space: 'Finance Workflows',
    type: 'attended'
  },
  {
    id: 'act-108',
    memberId: 'mem-5',
    memberName: 'Ananya Sharma',
    date: '2026-08-17',
    timestamp: '05:00 PM',
    activityDescription: 'Shared template "US GAAP ASC 606 Revenue Recognition Readiness Checklist"',
    space: 'Finance Workflows',
    type: 'post'
  },
  {
    id: 'act-109',
    memberId: 'mem-10',
    memberName: 'Vikram Patel',
    date: '2026-08-16',
    timestamp: '11:10 AM',
    activityDescription: 'Completed poll "What is your primary FP&A tool stack in 2026?"',
    space: 'General',
    type: 'comment'
  },
  {
    id: 'act-110',
    memberId: 'mem-8',
    memberName: 'Tariq Al-Mansoor',
    date: '2026-08-15',
    timestamp: '01:45 PM',
    activityDescription: 'Commented on "Handling multi-currency inflation adjustments in budget forecasts"',
    space: 'Finance Workflows',
    type: 'comment'
  },
  {
    id: 'act-111',
    memberId: 'mem-14',
    memberName: 'Carlos Rodriguez',
    date: '2026-08-04',
    timestamp: '03:15 PM',
    activityDescription: 'Started draft thread "AI Optical Character Recognition for AP Invoices"',
    space: 'Tools & Systems',
    type: 'post'
  },
  {
    id: 'act-112',
    memberId: 'mem-9',
    memberName: 'Jessica Miller',
    date: '2026-08-03',
    timestamp: '10:00 AM',
    activityDescription: 'Commented on "Adaptive Insights vs Workday Financials integration issues"',
    space: 'Tools & Systems',
    type: 'comment'
  },
  {
    id: 'act-113',
    memberId: 'mem-2',
    memberName: 'Marcus Vance',
    date: '2026-08-01',
    timestamp: '09:00 AM',
    activityDescription: 'Downloaded "Yield Optimization Strategies for Corporate Cash Reserves"',
    space: 'Tools & Systems',
    type: 'download'
  },
  {
    id: 'act-114',
    memberId: 'mem-4',
    memberName: 'David Sterling',
    date: '2026-07-10',
    timestamp: '02:00 PM',
    activityDescription: 'Attended executive roundtable "Strategic Finance for Series C+ CFOs"',
    space: 'General',
    type: 'attended'
  },
  {
    id: 'act-115',
    memberId: 'mem-11',
    memberName: 'Charlotte Dubois',
    date: '2026-06-25',
    timestamp: '11:30 AM',
    activityDescription: 'Downloaded "EU AI Act Compliance Checklist for Financial Systems"',
    space: 'Finance Workflows',
    type: 'download'
  }
];
