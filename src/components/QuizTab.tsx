import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  HelpCircle,
  Sparkles,
  Trophy,
  BookOpen
} from 'lucide-react';

interface QuizTabProps {
  onScoreUpdate: (count: number) => void;
}

export const QuizTab: React.FC<QuizTabProps> = ({ onScoreUpdate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelectOption = (optionIndex: number) => {
    if (selectedAnswers[currentQ.id] !== undefined) return; // already answered

    const newAnswers = { ...selectedAnswers, [currentQ.id]: optionIndex };
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);
    onScoreUpdate(Object.keys(newAnswers).length);
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(prev => prev + 1);
      setShowExplanation(selectedAnswers[QUIZ_QUESTIONS[currentIndex + 1].id] !== undefined);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowExplanation(true);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setShowExplanation(false);
    setIsFinished(false);
    onScoreUpdate(0);
  };

  // Calculate score
  const correctCount = Object.entries(selectedAnswers).filter(([qId, ans]) => {
    const q = QUIZ_QUESTIONS.find(item => item.id === Number(qId));
    return q && q.correctAnswer === ans;
  }).length;

  const getRank = (score: number) => {
    if (score >= 9) {
      return {
        title: 'Flutter Junior Developer 🚀',
        desc: 'ยอดเยี่ยมมาก! คุณมีความรู้พื้นฐานโครงสร้าง สถาปัตยกรรม และคำสั่งสำคัญของ Flutter แน่นปึ้ก พร้อมเริ่มสร้างโปรเจกต์จริงได้เลย!',
        color: 'text-emerald-400'
      };
    } else if (score >= 7) {
      return {
        title: 'Flutter Explorer 🌟',
        desc: 'เข้าใจคอนเซ็ปต์หลักได้ดีมาก! ลองเขียนโปรเจกต์ตัวอย่างเพิ่มอีก 1-2 แอปจะคล่องแคล่วและชำนาญยิ่งขึ้น',
        color: 'text-sky-400'
      };
    } else if (score >= 5) {
      return {
        title: 'Flutter Apprentice 📚',
        desc: 'มาถูกทางแล้ว! ทบทวนเรื่อง Layout Constraints และ StatelessWidget vs StatefulWidget อีกนิด คุณจะจับจุดได้เร็วแน่นอน',
        color: 'text-amber-400'
      };
    } else {
      return {
        title: 'Flutter Newbie Seed 🌱',
        desc: 'การเริ่มต้นเรียนสิ่งใหม่ย่อมต้องใช้เวลา แนะนำให้ลองปรับเล่นในแท็บ Widget Playground และอ่านคู่มือเริ่มต้น แล้วกลับมาลองใหม่ได้เสมอ!',
        color: 'text-slate-300'
      };
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>แบบทดสอบความเข้าใจ</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          ทดสอบความรู้ Flutter สำหรับมือใหม่
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          10 ข้อคำถามไฮไลท์ที่จะช่วยวัดว่าคุณพร้อมก้าวสู่งานพัฒนาแอปจริงหรือยัง
        </p>
      </div>

      {!isFinished ? (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          {/* Progress Bar & Counter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-sky-400">
                ข้อที่ {currentIndex + 1} จาก {totalQuestions}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono">
                หัวข้อ: {currentQ.topic}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Text */}
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQ.id] === idx;
              const hasAnswered = selectedAnswers[currentQ.id] !== undefined;
              const isCorrect = currentQ.correctAnswer === idx;

              let optionStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850';

              if (hasAnswered) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/50';
                } else if (isSelected) {
                  optionStyle = 'bg-rose-950/40 border-rose-500 text-rose-200 ring-1 ring-rose-500/50';
                } else {
                  optionStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium flex items-center justify-between gap-3 transition-all ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold flex-shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {hasAnswered && (
                    <div className="flex-shrink-0">
                      {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      {!isCorrect && isSelected && <XCircle className="w-5 h-5 text-rose-400" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showExplanation && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs leading-relaxed space-y-1">
              <div className="font-bold text-sky-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>คำอธิบายเฉลย:</span>
              </div>
              <p className="text-slate-300">{currentQ.explanation}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs text-slate-300 transition"
            >
              ← ย้อนกลับ
            </button>

            {selectedAnswers[currentQ.id] !== undefined && (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition shadow-md shadow-sky-500/20"
              >
                <span>{currentIndex + 1 === totalQuestions ? 'ดูผลคะแนนสรุป' : 'ข้อถัดไป'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results Screen */
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-8 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-500/25">
            <Trophy className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1">
              ผลการทดสอบของคุณ
            </span>
            <div className="text-5xl font-extrabold text-white font-mono mb-2">
              {correctCount} <span className="text-2xl text-slate-500 font-normal">/ {totalQuestions}</span>
            </div>
            <h2 className={`text-xl font-bold ${getRank(correctCount).color}`}>
              {getRank(correctCount).title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
              {getRank(correctCount).desc}
            </p>
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition shadow-lg shadow-sky-500/20"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ทำแบบทดสอบใหม่อีกครั้ง</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
