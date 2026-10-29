import React, { useState, useEffect } from 'react';
import {
  Lock,
  Users,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  BarChart2,
  PieChart as PieIcon,
  RotateCcw,
  AlertOctagon,
  FileText,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { api, AdminAnalytics } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const AdminPage: React.FC = () => {
  const { user, isAdmin, demoLogin } = useAuth();
  const [stats, setStats] = useState<AdminAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const data = await api.admin.getStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load admin metrics:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Lock className="w-3.5 h-3.5" />
            Administrative Operations & Telemetry
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Security Intelligence Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Aggregated, privacy-preserving metrics across platform scans, threat vectors, and community submissions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!isAdmin && (
            <button
              onClick={() => demoLogin('admin')}
              className="px-3.5 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-bold transition hover:bg-amber-500/30"
            >
              Simulate Admin Role
            </button>
          )}
          <button
            onClick={fetchStats}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Refresh
          </button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Registered Netizens</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{stats?.totalUsers || 2}</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Active user accounts</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Total Threat Scans</span>
            <FileText className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-cyan-400 font-mono">{stats?.totalScans || 0}</div>
          <span className="text-[11px] text-cyan-400/80 mt-1 block">AI inferences executed</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Scams Intercepted</span>
            <AlertOctagon className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-extrabold text-rose-400 font-mono">{stats?.scamsIdentified || 0}</div>
          <span className="text-[11px] text-rose-400/80 mt-1 block">High & Critical risks</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Community Submissions</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">{stats?.totalReports || 1}</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Hashed threat indicators</span>
        </div>
      </div>

      {/* Threat Analytics Visualizations */}
      {stats && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Level Distribution */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Scam Risk Severity Spectrum
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.riskDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={85}
                    innerRadius={55}
                    paddingAngle={3}
                  >
                    {stats.riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {stats.riskDistribution.map((r, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: r.color }} />
                  <span>{r.name}: <strong>{r.value}</strong></span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Scan Count Trend */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Daily Threat Evaluation Activity
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.activityData}>
                  <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="count" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-xs text-slate-500 mt-4">
              Telemetry aggregated without logging sensitive user payload bodies
            </div>
          </div>
        </div>
      )}

      {/* Scam Category Breakdown Table */}
      {stats && stats.categories.length > 0 && (
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
          <h3 className="text-sm font-bold text-white mb-1">Most Prevalent Threat Categories</h3>
          <p className="text-xs text-slate-400 mb-4">Frequency ranking across all evaluated solicitations</p>
          <div className="space-y-3">
            {stats.categories.map((cat, idx) => {
              const percentage = Math.round((cat.count / (stats.totalScans || 1)) * 100);
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-200">{cat.name}</span>
                    <span className="text-slate-400 font-mono">{cat.count} occurrences ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div
                      className="bg-cyan-500 h-full rounded-full transition-all"
                      style={{ width: `${Math.max(percentage, 5)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Admin Privacy Principle Alert */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-400 flex items-center gap-3">
        <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>
          <strong>Ethical Surveillance Guardrail:</strong> In adherence to Section 18 of the product charter, administrative consoles access strictly anonymized frequency metrics. Raw sensitive user passwords, chat histories, or phone numbers are never stored in plaintext or exposed to administrators.
        </span>
      </div>
    </div>
  );
};

