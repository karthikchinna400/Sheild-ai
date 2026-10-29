import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  History,
  Search,
  Filter,
  Trash2,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  Shield,
  AlertTriangle,
  RotateCcw,
  Lock,
} from 'lucide-react';
import { api, SavedScanRecord } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [scans, setScans] = useState<SavedScanRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchScans = async () => {
    setIsLoading(true);
    try {
      const data = await api.scans.getAll();
      setScans(data);
    } catch (err) {
      console.error('Failed to fetch scans:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchScans();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to remove this scan from your history?')) return;
    try {
      await api.scans.delete(id);
      setScans(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      alert('Unable to delete scan.');
    }
  };

  // Filter & Search logic
  const filteredScans = scans
    .filter((s) => {
      if (selectedType !== 'all' && s.scanType !== selectedType) return false;
      if (selectedRisk !== 'all' && s.riskLevel !== selectedRisk) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          s.scamCategory.toLowerCase().includes(query) ||
          s.summary.toLowerCase().includes(query) ||
          s.inputPreview.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'score') {
        return b.riskScore - a.riskScore;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'SAFE':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'LOW RISK':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'MEDIUM RISK':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'HIGH RISK':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400 mb-1">
            <History className="w-3.5 h-3.5" />
            Archive & Intelligence Log
          </div>
          <h1 className="text-3xl font-extrabold text-white">Threat Scan History</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse, search, review, and export previous threat evaluations.
          </p>
        </div>

        <button
          onClick={fetchScans}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-2 self-start sm:self-auto transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords, category, or preview..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Threat Types</option>
            <option value="message">SMS / Message</option>
            <option value="url">Web URL</option>
            <option value="screenshot">Screenshot</option>
            <option value="email">Email</option>
            <option value="job">Job Offer</option>
            <option value="payment">Payment / UPI</option>
          </select>

          {/* Risk Level Filter */}
          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Risk Levels</option>
            <option value="CRITICAL RISK">Critical Risk (80–100)</option>
            <option value="HIGH RISK">High Risk (60–79)</option>
            <option value="MEDIUM RISK">Medium Risk (40–59)</option>
            <option value="LOW RISK">Low Risk (20–39)</option>
            <option value="SAFE">Safe (0–19)</option>
          </select>
        </div>

        {/* Sort selector */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
          <span>Showing {filteredScans.length} of {scans.length} total records</span>
          <div className="flex items-center gap-2">
            <span>Sort by:</span>
            <button
              onClick={() => setSortBy('date')}
              className={`px-2.5 py-1 rounded-lg ${sortBy === 'date' ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-800' : 'hover:text-white'}`}
            >
              Latest Date
            </button>
            <button
              onClick={() => setSortBy('score')}
              className={`px-2.5 py-1 rounded-lg ${sortBy === 'score' ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-800' : 'hover:text-white'}`}
            >
              Highest Risk
            </button>
          </div>
        </div>
      </div>

      {/* Scans Grid / List */}
      {isLoading ? (
        <div className="py-20 text-center text-slate-500 text-xs">
          Loading scan intelligence archive...
        </div>
      ) : filteredScans.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
          <History className="w-8 h-8 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-slate-300">No matching threat reports found</h3>
          <p className="text-xs text-slate-500">
            {scans.length === 0 ? "You haven't scanned any content yet." : "Try adjusting your search query or filters."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredScans.map((scan) => (
            <div
              key={scan._id}
              onClick={() => navigate('/result', { state: { scanResult: scan, scanType: scan.scanType } })}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-bold border border-slate-700">
                    {scan.scanType}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getRiskBadge(scan.riskLevel)}`}>
                    {scan.riskLevel}
                  </span>
                  <span className="text-xs font-semibold text-slate-200">
                    {scan.scamCategory}
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-1">
                  {scan.summary}
                </p>

                {scan.inputPreview && (
                  <p className="text-[11px] text-slate-500 font-mono italic line-clamp-1">
                    "{scan.inputPreview}"
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <div className="text-right">
                  <div className="text-lg font-extrabold font-mono text-white">
                    {scan.riskScore}<span className="text-xs text-slate-500 font-normal">/100</span>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {new Date(scan.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleDelete(scan._id, e)}
                    className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition"
                    title="Delete Scan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Privacy Charter Footer */}
      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2.5">
        <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>
          <strong>Zero-Knowledge Privacy:</strong> Previews stored above have sensitive passwords, PINs, and full card numbers automatically scrubbed and redacted.
        </span>
      </div>
    </div>
  );
};

