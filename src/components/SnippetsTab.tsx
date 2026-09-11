import React, { useState } from 'react';
import { CODE_SNIPPETS } from '../data/flutterContent';
import { CodeSnippet } from '../types';
import { 
  Code2, 
  Copy, 
  Check, 
  Search, 
  Tag, 
  BookOpen, 
  CheckCircle, 
  Terminal,
  ExternalLink
} from 'lucide-react';

export const SnippetsTab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'basics', label: 'พื้นฐาน & โครงสร้าง' },
    { id: 'ui', label: 'หน้าตา UI & ListView' },
    { id: 'state', label: 'จัดการ State' },
    { id: 'navigation', label: 'การเปลี่ยนหน้า (Routing)' },
  ];

  const filteredSnippets = CODE_SNIPPETS.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Code2 className="w-6 h-6 text-sky-400" />
            คลังสูตรโค้ด Flutter พร้อมใช้ (Cheat Sheet & Snippets)
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            รวม Pattern โค้ดที่โปรแกรมเมอร์ Flutter ทุกคนต้องได้ใช้ คัดลอกไปวางในโปรเจกต์ได้ทันที
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ค้นหาสูตรโค้ด เช่น ListView, Form..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:border-sky-400 outline-none"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
              selectedCategory === cat.id
                ? 'bg-sky-500 text-white font-semibold shadow-sm shadow-sky-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Snippet Cards List */}
      <div className="space-y-8">
        {filteredSnippets.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
            <p className="text-sm text-slate-400">ไม่พบโค้ดที่ตรงกับคำค้นหา "{searchQuery}"</p>
          </div>
        ) : (
          filteredSnippets.map((snippet) => (
            <div
              key={snippet.id}
              className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-lg"
            >
              {/* Card Header */}
              <div className="p-5 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-base font-bold text-white">{snippet.title}</h3>
                    {snippet.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400">{snippet.subtitle}</p>
                </div>

                <button
                  onClick={() => handleCopy(snippet.code, snippet.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition border border-slate-700 flex-shrink-0 self-start sm:self-auto"
                  title="คัดลอกโค้ดนี้"
                >
                  {copiedId === snippet.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">คัดลอกแล้ว!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>คัดลอกโค้ด</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code block */}
              <div className="p-4 bg-slate-950 font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto max-h-[420px] scrollbar-thin">
                <pre>
                  <code>{snippet.code}</code>
                </pre>
              </div>

              {/* Notes & Key Takeaways */}
              {snippet.notes && snippet.notes.length > 0 && (
                <div className="p-4 bg-slate-900/60 border-t border-slate-800 text-xs">
                  <div className="font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                    <span>จุดสำคัญที่ควรรู้เกี่ยวกับโค้ดชุดนี้:</span>
                  </div>
                  <ul className="space-y-1 text-slate-400">
                    {snippet.notes.map((note, nIdx) => (
                      <li key={nIdx} className="flex items-start gap-2">
                        <span className="text-sky-400 mt-0.5">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
