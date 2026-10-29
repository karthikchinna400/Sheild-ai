import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  History,
  TrendingUp,
  MessageSquare,
  Globe,
  Image as ImageIcon,
  Briefcase,
  CreditCard,
  ArrowRight,
  ExternalLink,
  Lock,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  AreaChart,
  Area,
} from 'recharts';
import { api, SavedScanRecord, AdminAnalytics } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recentScans, setRecentScans] = useState<SavedScanRecord[]>([]);
  const [stats, setStats] = useState<AdminAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        const [scansData, statsData] = await Promise.all([
          api.scans.getAll(),
          api.admin.getStats(),
        ]);
        setRecentScans(scansData.slice(0, 5));
        setStats(statsData);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  const quickScanCards = [
    {
      title: "Scan Message",
      desc: "Analyze SMS, WhatsApp texts, or alerts",
      icon: MessageSquare,
      type: "message",
      color: "from-blue-600/20 to-cyan-600/10 border-blue-500/30 text-blue-400",
    },
    {
      title: "Scan URL",
      desc: "Inspect links for phishing & domain anomalies",
      icon: Globe,
      type: "url",
      color: "from-emerald-600/20 to-teal-600/10 border-emerald-500/30 text-emerald-400",
    },
    {
      title: "Scan Screenshot",
      desc: "AI Vision analysis for chat captures",
      icon: ImageIcon,
      type: "screenshot",
      color: "from-purple-600/20 to-indigo-600/10 border-purple-500/30 text-purple-400",
    },
    {
      title: "Scan Job Offer",
      desc: "Detect registration fees & task fraud",
      icon: Briefcase,
      type: "job",
      color: "from-amber-600/20 to-orange-600/10 border-amber-500/30 text-amber-400",
    },
    {
      title: "Scan Payment Request",
      desc: "Verify UPI collect requests & refunds",
      icon: CreditCard,
      type: "payment",
      color: "from-rose-600/20 to-pink-600/10 border-rose-500/30 text-rose-400",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Cyber Threat Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back{user?.name ? `, ${user.name}` : ''}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Active defense metrics, threat distribution, and quick scanning tools.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/scanner"
            className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            <Search className="w-3.5 h-3.5" />
            Launch Scanner
          </Link>
          <Link
            to="/history"
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-2"
          >
            <History className="w-3.5 h-3.5" />
            Full History
          </Link>
        </div>
      </div>

      {/* Quick Scan Cards */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Quick Scan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {quickScanCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                onClick={() => navigate(`/scanner?tab=${card.type}`)}
                className={`p-4 rounded-xl bg-gradient-to-br ${card.color} border hover:border-cyan-400/80 hover:scale-[1.02] transition-all cursor-pointer group flex flex-col justify-between`}
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-slate-900/80 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
                    {card.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-800/40 flex items-center justify-between text-[11px] font-semibold text-slate-300 group-hover:text-cyan-300">
                  <span>Start Scan</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security Overview Metrics */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
          Security Overview
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium">Total Scans Executed</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-mono">
              {stats?.totalScans || 0}
            </div>
            <span className="text-[11px] text-cyan-400 mt-1 block">Live Threat Database</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium">Scams Identified</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 mt-1 font-mono">
              {stats?.scamsIdentified || 0}
            </div>
            <span className="text-[11px] text-rose-400/80 mt-1 block">High & Critical Threats</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium">Safe Solicitations</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1 font-mono">
              {stats?.safeScans || 0}
            </div>
            <span className="text-[11px] text-emerald-400/80 mt-1 block">Verified Normal Content</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium">Top Detected Threat</span>
            <div className="text-sm sm:text-base font-bold text-amber-300 mt-2 truncate">
              {stats?.mostCommonThreat || 'Phishing / Impersonation'}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Most frequent pattern</span>
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      {stats && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Level Distribution Chart */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Threat Risk Distribution
              </h3>
              <span className="text-[11px] text-slate-500">All Time</span>
            </div>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.riskDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={50}
                    paddingAngle={4}
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
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {stats.riskDistribution.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}: <strong>{item.value}</strong></span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Over Time Trend Chart */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Weekly Threat Scans Volume
              </h3>
              <span className="text-[11px] text-slate-500">Last 7 Days</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.activityData}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#0ea5e9"
                    fillOpacity={1}
                    fill="url(#colorCount)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Recent Scans Table */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white">Recent Scam Investigations</h3>
            <p className="text-xs text-slate-400">Recently evaluated messages, links, and transactions</p>
          </div>
          <Link to="/history" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition">
            View All ({recentScans.length})
          </Link>
        </div>

        {recentScans.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-xs">
            No scans recorded yet. Try scanning a message or running a demo scenario!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Risk Level</th>
                  <th className="py-3 px-3">Score</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentScans.map((scan) => {
                  const getBadge = (lvl: string) => {
                    switch (lvl) {
                      case 'SAFE': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
                      case 'LOW RISK': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
                      case 'MEDIUM RISK': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
                      case 'HIGH RISK': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
                      default: return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
                    }
                  };

                  return (
                    <tr key={scan._id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-3 font-semibold uppercase text-cyan-400 font-mono text-[11px]">
                        {scan.scanType}
                      </td>
                      <td className="py-3 px-3 text-slate-200 font-medium">
                        {scan.scamCategory}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getBadge(scan.riskLevel)}`}>
                          {scan.riskLevel}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-white">
                        {scan.riskScore}/100
                      </td>
                      <td className="py-3 px-3 text-slate-400">
                        {new Date(scan.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Link
                          to={`/result`}
                          state={{ scanResult: scan }}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-300 font-semibold transition"
                        >
                          View Report
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

