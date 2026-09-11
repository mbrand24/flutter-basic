import React, { useState } from 'react';
import { GOTCHAS } from '../data/flutterContent';
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Copy, 
  Check, 
  Sparkles, 
  HelpCircle,
  Lightbulb
} from 'lucide-react';

export const GotchasTab: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-amber-400" />
          รวม Error ยอดฮิตของมือใหม่ & วิธีแก้ไขใน 2 นาที
        </h1>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl">
          ไม่ต้องตกใจเมื่อจอขึ้นสีแดงหรือมีแถบเหลืองดำ! 4 ปัญหาข้างล่างนี้คือบั๊กที่โปรแกรมเมอร์ Flutter ทุกคนต้องเคยเจอ ทำความเข้าใจสาเหตุและวิธีแก้ที่ถูกต้องได้ที่นี่
        </p>
      </div>

      {/* Realistic Yellow-Black Hazard Tape Teaser */}
      <div className="rounded-xl overflow-hidden border border-amber-500/40 bg-slate-950 p-4 relative">
        <div className="h-5 w-full rounded bg-[repeating-linear-gradient(45deg,#f59e0b,#f59e0b_12px,#000_12px,#000_24px)] opacity-90 mb-3"></div>
        <div className="flex items-center justify-between text-xs">
          <div className="text-amber-300 font-bold flex items-center gap-2">
            <span>A RenderFlex overflowed by 48.0 pixels on the bottom</span>
          </div>
          <span className="text-slate-400 text-[11px] hidden sm:inline">
            คุ้นตากันไหม? มาดูวิธีแก้กันเลย! 👇
          </span>
        </div>
      </div>

      {/* Gotcha Cards List */}
      <div className="space-y-8">
        {GOTCHAS.map((gotcha, idx) => (
          <div
            key={gotcha.id}
            className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-lg"
          >
            {/* Title & Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </span>
                <h3 className="text-base font-bold text-white">{gotcha.title}</h3>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 self-start sm:self-auto">
                {gotcha.badge}
              </span>
            </div>

            {/* Symptom and Cause */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <div className="font-bold text-rose-400 mb-1 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" />
                  <span>อาการที่แสดง (Symptom):</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{gotcha.symptom}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <div className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  <span>สาเหตุที่แท้จริง (Cause):</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{gotcha.cause}</p>
              </div>
            </div>

            {/* Code Comparison: Bad vs Good */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Bad Code */}
              <div className="rounded-xl overflow-hidden border border-rose-900/60 bg-slate-950 flex flex-col">
                <div className="px-3.5 py-2 bg-rose-950/40 border-b border-rose-900/50 flex items-center gap-1.5 text-rose-300 text-xs font-semibold">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>โค้ดที่ทำให้เกิดปัญหา (Don't do this)</span>
                </div>
                <div className="p-3 font-mono text-xs text-rose-200 leading-relaxed overflow-x-auto flex-1">
                  <pre>
                    <code>{gotcha.badCode}</code>
                  </pre>
                </div>
              </div>

              {/* Good Code */}
              <div className="rounded-xl overflow-hidden border border-emerald-900/60 bg-slate-950 flex flex-col">
                <div className="px-3.5 py-2 bg-emerald-950/40 border-b border-emerald-900/50 flex items-center justify-between text-emerald-300 text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>วิธีแก้ไขที่ถูกต้อง (Recommended Fix)</span>
                  </div>
                  <button
                    onClick={() => handleCopy(gotcha.goodCode, gotcha.id)}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
                    title="คัดลอกโค้ดที่แก้แล้ว"
                  >
                    {copiedId === gotcha.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <div className="p-3 font-mono text-xs text-emerald-200 leading-relaxed overflow-x-auto flex-1">
                  <pre>
                    <code>{gotcha.goodCode}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Explanation & Pro Tip */}
            <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-500/20 text-xs text-slate-300 leading-relaxed space-y-1.5">
              <p>
                <strong className="text-sky-300 font-semibold">สรุปวิธีแก้ไข: </strong>
                {gotcha.fixExplanation}
              </p>
              <div className="flex items-start gap-1.5 text-amber-300 font-medium">
                <Lightbulb className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span>{gotcha.tip}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
