import React from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Activity, 
  UserPlus, 
  Moon, 
  Lock,
  MessageSquareOff,
  UserCheck
} from 'lucide-react';

export const HelpPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Banner */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-950">
        <div className="flex items-center space-x-3 text-indigo-400 mb-2">
          <BookOpen className="w-6 h-6" />
          <span className="text-xs font-bold uppercase tracking-wider bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/20">
            System Documentation
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Friends of Finance - CRM Architecture & Safeguards
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Comprehensive reference guide detailing engagement scoring logic, status assignment rules, simulated AI recommendations policy, and reviewer testing steps.
        </p>
      </div>

      {/* 1. STATUS RULES & CLASSIFICATION LOGIC */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-4">
          <Activity className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white tracking-wide">
            1. Member Engagement Status Rules
          </h2>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Members are classified into 5 strict status categories based on tenure and 30-day activity telemetry:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs pt-2">
          {/* Newly Joined */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-400">Newly Joined</span>
              <UserPlus className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Members who created their account within the last <strong>&lt; 7 days</strong>. High priority for onboarding check-ins and introduction prompts.
            </p>
          </div>

          {/* Active */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400">Active</span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Members recording <strong>2 to 4 activities</strong> (comments, posts, template downloads) within any rolling 30-day window.
            </p>
          </div>

          {/* Highly Active */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-purple-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-300">Highly Active</span>
              <Sparkles className="w-4 h-4 text-purple-300" />
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Power contributors recording <strong>5+ activities</strong> within 30 days. Candidates for community moderation or roundtable hosting.
            </p>
          </div>

          {/* At Risk */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400">At Risk</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Members with no recorded community activity for <strong>14+ consecutive days</strong>. Requires owner outreach.
            </p>
          </div>

          {/* Dormant */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-400">Dormant</span>
              <Moon className="w-4 h-4 text-rose-400" />
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Members inactive for <strong>30+ consecutive days</strong>. Recommended for targeted re-engagement email or executive briefing invites.
            </p>
          </div>
        </div>
      </div>

      {/* 2. AI SAFEGUARDS & GOVERNANCE POLICY */}
      <div className="glass-card rounded-2xl p-6 border border-purple-500/30 bg-purple-950/10 space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-4">
          <ShieldCheck className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold text-white tracking-wide">
            2. AI Safeguards & Ethical Usage Principles
          </h2>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The AI engine built into Friends of Finance is designed with strict human-in-the-loop safeguards to prevent unauthorized outreach, hallucination, or inappropriate commercialization:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-1">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-rose-400 font-bold">
              <MessageSquareOff className="w-4 h-4" />
              <span>Zero Automated Outreach</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              AI <strong>never sends messages automatically</strong> or executes autonomous outreach. All recommendations are presented strictly for human review by community managers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 font-bold">
              <Lock className="w-4 h-4" />
              <span>No Invented Personalization</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              AI recommendations rely strictly on explicit in-app telemetry (posts, channels, downloads). It does <strong>not invent third-party data</strong> or scrape private information.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold">
              <UserCheck className="w-4 h-4" />
              <span>Purely Peer Engagement</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Suggestions focus entirely on <strong>value-add peer connection</strong> (knowledge sharing, roundtable invites, resource recommendations)—strictly <strong>no sales, upsell, or purchase intent</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 3. REVIEWER TESTING GUIDE */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white tracking-wide">
            3. Reviewer Testing Guide & Walkthrough
          </h2>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Follow these quick testing steps to evaluate all core functional features of the CRM:
        </p>

        <ol className="space-y-3 text-xs text-slate-300 list-decimal list-inside leading-relaxed">
          <li className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
            <strong className="text-white">KPI Telemetry Cards:</strong> On the <strong>Dashboard</strong>, click any of the 6 KPI cards (e.g., <em>At Risk</em> or <em>Newly Joined</em>) to instantly navigate to the Member Directory with that filter pre-applied.
          </li>
          <li className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
            <strong className="text-white">Predefined Focused Views:</strong> In the <strong>Member Directory</strong>, test the 3 tab triggers (<em>New Members</em>, <em>Highly Active</em>, <em>At Risk / Dormant</em>) to verify instant filtering.
          </li>
          <li className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
            <strong className="text-white">Multi-Filter & Search:</strong> Combine text search (e.g., search "CFO" or "Elena") with Status, Community Space, and Owner dropdowns.
          </li>
          <li className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
            <strong className="text-white">Member Detail Profile & AI Card:</strong> Click on any member row (or "View") to open their modal. Inspect the <strong>AI Suggestion (Simulated)</strong> card, observe the mandatory disclaimer text, and click <em>"Apply to Next Action"</em>.
          </li>
          <li className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
            <strong className="text-white">Activity Logging & Live State:</strong> Type a new note into the member timeline form, click <em>"Log Note"</em>, and verify that the timeline updates instantly and saves into browser local storage.
          </li>
        </ol>
      </div>
    </div>
  );
};
