import React, { useState } from 'react';
import { TabType } from './types';
import { Navbar } from './components/Navbar';
import { GettingStartedTab } from './components/GettingStartedTab';
import { PlaygroundTab } from './components/PlaygroundTab';
import { CoreConceptsTab } from './components/CoreConceptsTab';
import { AnimationsTab } from './components/AnimationsTab';
import { SnippetsTab } from './components/SnippetsTab';
import { GotchasTab } from './components/GotchasTab';
import { QuizTab } from './components/QuizTab';
import { ExternalLink, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('intro');
  const [quizCompletedCount, setQuizCompletedCount] = useState<number>(0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white">
      {/* Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        quizCompletedCount={quizCompletedCount} 
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'intro' && (
          <GettingStartedTab onGoToPlayground={() => setActiveTab('playground')} />
        )}

        {activeTab === 'playground' && (
          <PlaygroundTab />
        )}

        {activeTab === 'concepts' && (
          <CoreConceptsTab />
        )}

        {activeTab === 'animations' && (
          <AnimationsTab />
        )}

        {activeTab === 'snippets' && (
          <SnippetsTab />
        )}

        {activeTab === 'gotchas' && (
          <GotchasTab />
        )}

        {activeTab === 'quiz' && (
          <QuizTab onScoreUpdate={setQuizCompletedCount} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950/80 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">Flutter สำหรับมือใหม่</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              สร้างด้วย <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> เพื่อชุมชนนักพัฒนาไทย
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href="https://flutter.dev" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-sky-400 flex items-center gap-1 transition"
            >
              <span>เว็บทางการ flutter.dev</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://pub.dev" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-sky-400 flex items-center gap-1 transition"
            >
              <span>คลังแพ็กเกจ pub.dev</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://dart.dev" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-sky-400 flex items-center gap-1 transition"
            >
              <span>ภาษา Dart</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
