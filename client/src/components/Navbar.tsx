import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Shield,
  Search,
  LayoutDashboard,
  GraduationCap,
  AlertTriangle,
  History,
  Lock,
  Menu,
  X,
  Sparkles,
  Mic,
  LogOut,
  User as UserIcon,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface NavbarProps {
  onOpenDemo?: () => void;
  onOpenVoice?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo, onOpenVoice }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/scanner', label: t.nav.scanner, icon: Search },
    { to: '/dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { to: '/academy', label: t.nav.academy, icon: GraduationCap },
    { to: '/report', label: t.nav.reports, icon: AlertTriangle },
    { to: '/history', label: t.nav.history, icon: History },
    { to: '/admin', label: t.nav.admin, icon: Lock },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                  ScamShield <span className="text-cyan-400 font-mono text-xs px-1.5 py-0.5 bg-cyan-950/80 border border-cyan-800/60 rounded">AI</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wider">DEFENSIVE CYBER PLATFORM</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      active
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Live Demo Trigger */}
            {onOpenDemo && (
              <button
                onClick={onOpenDemo}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 transition shadow-sm"
                title="Launch Pre-loaded Demo Scenarios for Workshop Presentation"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Demo Mode</span>
              </button>
            )}

            {/* Voice Assistant Trigger */}
            {onOpenVoice && (
              <button
                onClick={onOpenVoice}
                className="p-1.5 rounded-lg text-slate-300 hover:text-cyan-300 bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
                title="Voice Assistant"
              >
                <Mic className="w-4 h-4 text-cyan-400" />
              </button>
            )}

            {/* Language Selector */}
            <LanguageSelector />

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-semibold text-slate-200">{user?.name}</span>
                  {user?.role === 'admin' && (
                    <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-1 rounded">Admin</span>
                  )}
                </div>
                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 border border-transparent hover:border-rose-900/40 transition"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition"
                >
                  {t.nav.login}
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1.5 text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                >
                  {t.nav.register}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <LanguageSelector />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            {onOpenDemo && (
              <button
                onClick={() => {
                  onOpenDemo();
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Demo Mode
              </button>
            )}
            {onOpenVoice && (
              <button
                onClick={() => {
                  onOpenVoice();
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 rounded-lg text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center gap-1.5"
              >
                <Mic className="w-3.5 h-3.5" /> Voice AI
              </button>
            )}
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive(link.to)
                      ? 'bg-cyan-500/20 text-cyan-300'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800">
            {isAuthenticated ? (
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200">{user?.name}</span>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-rose-400 font-semibold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2 text-center text-xs font-bold bg-slate-900 border border-slate-800 text-slate-200 rounded-lg"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2 text-center text-xs font-bold bg-cyan-600 text-white rounded-lg"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

