import React, { useState } from 'react';
import { SETUP_STEPS, CLI_COMMANDS } from '../data/flutterContent';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  Terminal, 
  ExternalLink, 
  Layers, 
  Sparkles, 
  Zap, 
  Monitor, 
  Apple, 
  Command, 
  Keyboard
} from 'lucide-react';

interface GettingStartedTabProps {
  onGoToPlayground: () => void;
}

export const GettingStartedTab: React.FC<GettingStartedTabProps> = ({ onGoToPlayground }) => {
  const [selectedOS, setSelectedOS] = useState<'windows' | 'macos' | 'linux'>('windows');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepNumber) 
        ? prev.filter(s => s !== stepNumber) 
        : [...prev, stepNumber]
    );
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 p-6 sm:p-10">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-400 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>เส้นทางเริ่มต้นพัฒนาแอปตั้งแต่ 0 ถึงพร้อมใช้งาน</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug mb-3">
            ยินดีต้อนรับสู่โลก <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500">Flutter</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
            Flutter คือ UI Toolkit โอเพนซอร์สจาก Google สำหรับสร้างแอปพลิเคชันที่ทำงานได้ทั้ง 
            <strong className="text-sky-300 font-semibold"> Android, iOS, Web และ Desktop </strong> 
            จากโค้ดภาษา <strong className="text-cyan-300 font-semibold">Dart</strong> เพียงชุดเดียว ด้วยประสิทธิภาพระดับ Native 60-120 FPS
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              id="hero-start-playground-btn"
              onClick={onGoToPlayground}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm transition shadow-lg shadow-sky-500/25"
            >
              <Zap className="w-4 h-4" />
              ลองเล่น Widget Playground สดๆ
            </button>
            <a
              href="https://docs.flutter.dev"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition border border-slate-700"
            >
              เอกสารทางการ (Official Docs)
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>
      </section>

      {/* 3 Pillars of Flutter */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-sky-400" />
          3 จุดเด่นที่ทำให้ Flutter เหมาะที่สุดสำหรับมือใหม่
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl bg-slate-850 bg-slate-800/50 border border-slate-700/60 hover:border-sky-500/40 transition">
            <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold mb-3">
              ⚡
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Stateful Hot Reload</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              แก้ไขโค้ด ปรับสี ขยับปุ่ม แล้วกดบันทึก หน้าจอมือถือจะอัปเดตผลลัพธ์ในเวลาไม่ถึง 1 วินาที โดยข้อมูลในแอปไม่สูญหาย!
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-850 bg-slate-800/50 border border-slate-700/60 hover:border-sky-500/40 transition">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold mb-3">
              🧱
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Everything is a Widget</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              ทุกสิ่งทุกอย่างคือ Widget! ไม่ว่าจะเป็นปุ่ม ข้อความ ไอคอน การเว้นระยะ (Padding) หรือการจัดวางกึ่งกลาง (Center) ประกอบกันง่ายเหมือนต่อเลโก้
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-850 bg-slate-800/50 border border-slate-700/60 hover:border-sky-500/40 transition">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold mb-3">
              🎯
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Multi-Platform จริง</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              เขียนโค้ดครั้งเดียวปล่อยขึ้นได้ทั้ง Google Play Store, Apple App Store, เว็บแอป และ Windows/Mac โดยไม่ต้องเรียนรู้ Swift หรือ Kotlin แยก
            </p>
          </div>
        </div>
      </section>

      {/* Step by Step Setup Checklist */}
      <section className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ขั้นตอนการติดตั้งแบบทีละขั้น (Step-by-Step)
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              ทำตาม 5 ขั้นตอนนี้ เครื่องของคุณจะพร้อมเขียนแอป Flutter ทันที
            </p>
          </div>

          {/* OS Switcher */}
          <div className="inline-flex p-1 rounded-lg bg-slate-900 border border-slate-700">
            <button
              onClick={() => setSelectedOS('windows')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
                selectedOS === 'windows' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Windows
            </button>
            <button
              onClick={() => setSelectedOS('macos')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
                selectedOS === 'macos' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Apple className="w-3.5 h-3.5" />
              macOS
            </button>
            <button
              onClick={() => setSelectedOS('linux')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
                selectedOS === 'linux' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Linux
            </button>
          </div>
        </div>

        {/* Steps container */}
        <div className="space-y-4">
          {SETUP_STEPS.map((step) => {
            const isDone = completedSteps.includes(step.step);
            return (
              <div
                key={step.step}
                className={`p-4 rounded-xl border transition-all ${
                  isDone 
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-300' 
                    : 'bg-slate-900/60 border-slate-700/80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleStep(step.step)}
                    className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition flex-shrink-0 ${
                      isDone
                        ? 'bg-emerald-500 text-white ring-2 ring-emerald-400/30'
                        : 'bg-slate-800 border border-slate-600 text-slate-300 hover:border-sky-400'
                    }`}
                  >
                    {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.step}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={`text-base font-semibold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                        {step.title}
                      </h3>
                      <button
                        onClick={() => toggleStep(step.step)}
                        className="text-xs text-slate-400 hover:text-sky-300 whitespace-nowrap"
                      >
                        {isDone ? 'ทำแล้ว' : 'ติ๊กเมื่อเสร็จ'}
                      </button>
                    </div>
                    <p className="text-sm text-slate-300 mt-1 leading-relaxed">{step.desc}</p>

                    {step.command && (
                      <div className="mt-3 relative group">
                        <div className="flex items-center justify-between bg-slate-950 rounded-lg px-3.5 py-2 border border-slate-800 font-mono text-xs text-sky-300">
                          <span className="truncate">{step.command}</span>
                          <button
                            onClick={() => handleCopy(step.command!, `step-${step.step}`)}
                            className="ml-2 p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition flex-shrink-0"
                            title="คัดลอกคำสั่ง"
                          >
                            {copiedIndex === `step-${step.step}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {step.tip && (
                      <div className="mt-2.5 flex items-start gap-1.5 text-xs text-amber-300/90 bg-amber-500/10 px-3 py-1.5 rounded-md border border-amber-500/20">
                        <span className="font-bold">💡 เคล็ดลับ:</span>
                        <span>{step.tip}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion summary */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>ความพร้อมระบบ: {completedSteps.length} จาก {SETUP_STEPS.length} ขั้นตอน</span>
          {completedSteps.length === SETUP_STEPS.length && (
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              🎉 ยอดเยี่ยม! เครื่องของคุณพร้อมพัฒนาแอป Flutter แล้ว
            </span>
          )}
        </div>
      </section>

      {/* CLI Commands Cheat Sheet */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-sky-400" />
          คำสั่ง Command Line (CLI) พื้นฐานที่ใช้บ่อยที่สุด
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {CLI_COMMANDS.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-3 hover:border-slate-700 transition"
            >
              <div className="min-w-0">
                <code className="text-xs sm:text-sm font-semibold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20 font-mono block mb-1.5 truncate">
                  {item.cmd}
                </code>
                <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
              <button
                onClick={() => handleCopy(item.cmd, `cli-${idx}`)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition flex-shrink-0"
                title="คัดลอกคำสั่ง"
              >
                {copiedIndex === `cli-${idx}` ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* VS Code Super Shortcuts */}
      <section className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-indigo-500/20">
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <Keyboard className="w-5 h-5 text-indigo-400" />
          คีย์ลัดใน VS Code ที่สาย Flutter ทุกคนต้องรู้!
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="font-mono font-bold text-amber-400 block mb-1">Alt + Enter (Cmd + .)</span>
            <span className="text-slate-300">Quick Fix: หุ้ม Widget (Wrap with Widget, Padding, Center) หรือลบ Widget ได้ทันที</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="font-mono font-bold text-sky-400 block mb-1">r (ใน Terminal ขณะรัน)</span>
            <span className="text-slate-300">Hot Reload อัปเดตการแสดงผลบนหน้าจอทันทีโดยคงสถานะแอปเดิม</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="font-mono font-bold text-cyan-400 block mb-1">Shift + Alt + F</span>
            <span className="text-slate-300">Format Document จัดระเบียบวรรคและ Indentation ให้สวยงามอัตโนมัติ</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="font-mono font-bold text-emerald-400 block mb-1">ใส่เครื่องหมาย comma (,)</span>
            <span className="text-slate-300">ใส่จุลภาคต่อท้ายวงเล็บเสมอ จะทำให้ Dart Formatter ตัดบรรทัดให้อ่านง่ายเป็นระเบียบ</span>
          </div>
        </div>
      </section>
    </div>
  );
};
