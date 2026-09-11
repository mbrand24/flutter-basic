import React from 'react';
import { TabType } from '../types';
import { 
  Rocket, 
  Smartphone, 
  Cpu, 
  Sparkles,
  Code, 
  AlertTriangle, 
  Award,
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  quizCompletedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, quizCompletedCount }) => {
  const navItems: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    { id: 'intro', label: 'เริ่มต้น & ติดตั้ง', icon: Rocket },
    { id: 'playground', label: 'Widget Playground', icon: Smartphone, badge: 'ขยายเพิ่ม' },
    { id: 'concepts', label: 'เข้าใจ State & Layout', icon: Cpu, badge: 'สถาปัตยกรรม' },
    { id: 'animations', label: 'แอนิเมชันน่าสนใจ', icon: Sparkles, badge: 'ใหม่!' },
    { id: 'snippets', label: 'คลังสูตรโค้ด', icon: Code },
    { id: 'gotchas', label: 'แก้บั๊กยอดฮิต', icon: AlertTriangle },
    { id: 'quiz', label: 'แบบทดสอบ', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('intro')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-700 shadow-lg shadow-sky-500/20">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                {/* Minimalist Flutter logo mark */}
                <path d="M14.314 0L2.3 12 6 15.7 21.714 0h-7.4z" />
                <path d="M14.314 11.429L8.6 17.143 12.3 20.857 21.714 11.429h-7.4z" />
                <path d="M8.6 17.143l5.714 5.714h7.4l-9.414-9.428L8.6 17.143z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  Flutter <span className="text-sky-400 text-sm font-semibold bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">สำหรับมือใหม่</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">คู่มือ & ห้องทดลองเรียนรู้ Flutter ภาษาไทย</p>
            </div>
          </div>

          {/* Quiz score indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            <span>ความคืบหน้าแบบทดสอบ:</span>
            <span className="font-semibold text-sky-400">{quizCompletedCount} / 10 ข้อ</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 overflow-x-auto scrollbar-none pb-2 pt-1 border-t border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`tab-btn-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : item.id === 'animations'
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                        : 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
