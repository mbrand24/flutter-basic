import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Zap, 
  Heart, 
  Flame, 
  Layers, 
  ArrowRight, 
  Smartphone, 
  Sliders, 
  Code2, 
  Eye, 
  BookOpen, 
  Star, 
  Bell, 
  CheckCircle2, 
  Shuffle,
  Volume2,
  RefreshCw,
  Info
} from 'lucide-react';

export type AnimationType = 
  | 'animated_container'
  | 'animated_opacity'
  | 'elastic_bounce'
  | 'animated_crossfade'
  | 'hero_transition'
  | 'animated_rotation'
  | 'slide_banner'
  | 'animated_switcher';

export type CurveType = 'easeInOut' | 'bounceOut' | 'elasticOut' | 'fastOutSlowIn' | 'linear';

export const AnimationsTab: React.FC = () => {
  const [selectedAnim, setSelectedAnim] = useState<AnimationType>('animated_container');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [durationMs, setDurationMs] = useState<number>(600);
  const [selectedCurve, setSelectedCurve] = useState<CurveType>('easeInOut');
  const [copied, setCopied] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'code' | 'concept'>('code');

  // Hero screen simulation state
  const [heroDetailedView, setHeroDetailedView] = useState<boolean>(false);

  // Animated Switcher counter
  const [counterNum, setCounterNum] = useState<number>(1);

  // Like button pop count
  const [likeCount, setLikeCount] = useState<number>(42);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // Trigger animation toggle
  const handleToggle = () => {
    setIsToggled(prev => !prev);
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), durationMs);
  };

  const handleReset = () => {
    setIsToggled(false);
    setIsLiked(false);
    setHeroDetailedView(false);
    setCounterNum(1);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get CSS transition timing function based on Flutter Curve
  const getCssTiming = (curve: CurveType): string => {
    switch (curve) {
      case 'bounceOut':
        return 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      case 'elasticOut':
        return 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      case 'fastOutSlowIn':
        return 'cubic-bezier(0.4, 0.0, 0.2, 1.0)';
      case 'easeInOut':
        return 'ease-in-out';
      case 'linear':
      default:
        return 'linear';
    }
  };

  // Generate Dart Code for the current animation
  const generateDartCode = (): string => {
    const curveName = `Curves.${selectedCurve}`;
    const durationCode = `Duration(milliseconds: ${durationMs})`;

    switch (selectedAnim) {
      case 'animated_container':
        return `// 1. Implicit Animation: AnimatedContainer
// เปลี่ยนรูปทรง สี ขนาด ขอบมนแบบอัตโนมัติ ไม่ต้องมี Controller!
import 'package:flutter/material.dart';

class MyAnimatedBox extends StatefulWidget {
  const MyAnimatedBox({super.key});

  @override
  State<MyAnimatedBox> createState() => _MyAnimatedBoxState();
}

class _MyAnimatedBoxState extends State<MyAnimatedBox> {
  bool _isExpanded = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        setState(() {
          _isExpanded = !_isExpanded;
        });
      },
      child: AnimatedContainer(
        duration: const ${durationCode},
        curve: ${curveName},
        width: _isExpanded ? 240 : 140,
        height: _isExpanded ? 160 : 140,
        padding: EdgeInsets.all(_isExpanded ? 20 : 12),
        decoration: BoxDecoration(
          color: _isExpanded ? Colors.indigoAccent : Colors.skyBlue,
          borderRadius: BorderRadius.circular(_isExpanded ? 28 : 12),
          boxShadow: [
            BoxShadow(
              color: (_isExpanded ? Colors.indigo : Colors.skyBlue).withOpacity(0.4),
              blurRadius: _isExpanded ? 20 : 8,
              offset: Offset(0, _isExpanded ? 10 : 4),
            ),
          ],
        ),
        child: Center(
          child: Text(
            _isExpanded ? 'ขยายร่างสำเร็จ! ✨' : 'แตะฉันสิ 👆',
            style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          ),
        ),
      ),
    );
  }
}`;

      case 'animated_opacity':
        return `// 2. AnimatedOpacity: ค่อยๆ แสดงหรือซ่อน Widget
import 'package:flutter/material.dart';

class FadeBannerExample extends StatefulWidget {
  const FadeBannerExample({super.key});

  @override
  State<FadeBannerExample> createState() => _FadeBannerExampleState();
}

class _FadeBannerExampleState extends State<FadeBannerExample> {
  bool _visible = true;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        AnimatedOpacity(
          opacity: _visible ? 1.0 : 0.0,
          duration: const ${durationCode},
          curve: ${curveName},
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.amber.shade700,
              borderRadius: BorderRadius.circular(16),
            ),
            child: const Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.notifications_active, color: Colors.white),
                SizedBox(width: 8),
                Text('โปรโมชั่นพิเศษวันนี้ ลด 50%!', style: TextStyle(color: Colors.white)),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        ElevatedButton(
          onPressed: () => setState(() => _visible = !_visible),
          child: Text(_visible ? 'ซ่อนการแจ้งเตือน' : 'แสดงการแจ้งเตือน'),
        ),
      ],
    );
  }
}`;

      case 'elastic_bounce':
        return `// 3. Elastic Bounce: ปุ่มกดเด้งดึ๋ง น่าสัมผัส (Explicit Animation)
import 'package:flutter/material.dart';

class BounceLikeButton extends StatefulWidget {
  const BounceLikeButton({super.key});

  @override
  State<BounceLikeButton> createState() => _BounceLikeButtonState();
}

class _BounceLikeButtonState extends State<BounceLikeButton>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  bool _isLiked = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const ${durationCode},
    );

    _scaleAnimation = Tween<double>(begin: 1.0, end: 1.35).animate(
      CurvedAnimation(
        parent: _controller,
        curve: ${curveName},
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose(); // อย่าลืม dispose เพื่อคืน memory!
    super.dispose();
  }

  void _handleTap() {
    setState(() => _isLiked = !_isLiked);
    _controller.forward().then((_) => _controller.reverse());
  }

  @override
  Widget build(BuildContext context) {
    return ScaleTransition(
      scale: _scaleAnimation,
      child: IconButton(
        iconSize: 56,
        icon: Icon(
          _isLiked ? Icons.favorite : Icons.favorite_border,
          color: _isLiked ? Colors.rose : Colors.grey,
        ),
        onPressed: _handleTap,
      ),
    );
  }
}`;

      case 'animated_crossfade':
        return `// 4. AnimatedCrossFade: สลับ 2 หน้าจอ/วิดเจ็ตแบบเนียนตา
import 'package:flutter/material.dart';

class CrossFadeExample extends StatefulWidget {
  const CrossFadeExample({super.key});

  @override
  State<CrossFadeExample> createState() => _CrossFadeExampleState();
}

class _CrossFadeExampleState extends State<CrossFadeExample> {
  bool _showContent = false;

  @override
  Widget build(BuildContext context) {
    return AnimatedCrossFade(
      duration: const ${durationCode},
      firstCurve: ${curveName},
      secondCurve: ${curveName},
      crossFadeState: _showContent 
          ? CrossFadeState.showSecond 
          : CrossFadeState.showFirst,
      // Widget แรก: แสดงสถานะกำลังโหลด (Skeleton)
      firstChild: Container(
        height: 90,
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.grey.shade800,
          borderRadius: BorderRadius.circular(16),
        ),
        child: const Center(child: CircularProgressIndicator()),
      ),
      // Widget ที่สอง: ข้อมูลที่โหลดเสร็จแล้ว
      secondChild: Container(
        height: 90,
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.emerald.shade800,
          borderRadius: BorderRadius.circular(16),
        ),
        child: const Center(
          child: Text('โหลดข้อมูลสำเร็จพร้อมแสดงผล! 🎉', style: TextStyle(color: Colors.white)),
        ),
      ),
    );
  }
}`;

      case 'hero_transition':
        return `// 5. Hero Animation: เคลื่อนย้ายรูปภาพหรือการ์ดข้ามหน้าจอแบบลื่นไหล
import 'package:flutter/material.dart';

// หน้าที่ 1: หน้าหลักที่มีรายการ
class FirstScreen extends StatelessWidget {
  const FirstScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (_) => const DetailScreen()),
        );
      },
      child: Hero(
        tag: 'avatar-hero-tag', // **ต้องตรงกันกับหน้าถัดไป**
        child: ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: Image.network(
            'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?w=400',
            width: 100,
            height: 100,
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }
}

// หน้าที่ 2: หน้าแสดงรายละเอียดเต็มจอ
class DetailScreen extends StatelessWidget {
  const DetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('หน้ารายละเอียด')),
      body: Column(
        children: [
          Hero(
            tag: 'avatar-hero-tag', // **Tag ตรงกับหน้าแรก**
            child: Image.network(
              'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?w=800',
              width: double.infinity,
              height: 300,
              fit: BoxFit.cover,
            ),
          ),
          const Padding(
            padding: EdgeInsets.all(16.0),
            child: Text('รูปภาพบินจากขนาดเล็กสู่เต็มจออย่างนุ่มนวล!'),
          ),
        ],
      ),
    );
  }
}`;

      case 'animated_rotation':
        return `// 6. AnimatedRotation & Flip Effect
import 'package:flutter/material.dart';

class FlipBadgeExample extends StatefulWidget {
  const FlipBadgeExample({super.key});

  @override
  State<FlipBadgeExample> createState() => _FlipBadgeExampleState();
}

class _FlipBadgeExampleState extends State<FlipBadgeExample> {
  double _turns = 0.0;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => setState(() => _turns += 1.0), // หมุน 1 รอบ (360 องศา)
      child: AnimatedRotation(
        turns: _turns,
        duration: const ${durationCode},
        curve: ${curveName},
        child: Container(
          width: 100,
          height: 100,
          decoration: BoxDecoration(
            color: Colors.amber,
            shape: BoxShape.circle,
            boxShadow: [
              BoxShadow(
                color: Colors.amber.withOpacity(0.4),
                blurRadius: 16,
              ),
            ],
          ),
          child: const Icon(Icons.star, size: 50, color: Colors.white),
        ),
      ),
    );
  }
}`;

      case 'slide_banner':
        return `// 7. SlideTransition: สไลด์แบนเนอร์หรือ Bottom Sheet ขึ้นมาจากขอบจอ
import 'package:flutter/material.dart';

class SlideNotificationExample extends StatefulWidget {
  const SlideNotificationExample({super.key});

  @override
  State<SlideNotificationExample> createState() => _SlideNotificationExampleState();
}

class _SlideNotificationExampleState extends State<SlideNotificationExample>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<Offset> _offsetAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const ${durationCode},
      vsync: this,
    );

    _offsetAnimation = Tween<Offset>(
      begin: const Offset(0.0, 1.5), // เริ่มต้นอยู่นอกจอด้านล่าง
      end: Offset.zero,              // สิ้นสุดที่ตำแหน่งจริง
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: ${curveName},
    ));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SlideTransition(
      position: _offsetAnimation,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.skyBlue,
          borderRadius: BorderRadius.circular(16),
        ),
        child: const Text('ข้อความสไลด์ขึ้นมาอย่างนุ่มนวล!'),
      ),
    );
  }
}`;

      case 'animated_switcher':
        return `// 8. AnimatedSwitcher: แอนิเมชันเมื่อข้อมูล/ตัวเลขเปลี่ยน (เช่น Badge นับแต้ม)
import 'package:flutter/material.dart';

class ScoreCounter extends StatefulWidget {
  const ScoreCounter({super.key});

  @override
  State<ScoreCounter> createState() => _ScoreCounterState();
}

class _ScoreCounterState extends State<ScoreCounter> {
  int _count = 0;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        IconButton(
          icon: const Icon(Icons.remove),
          onPressed: () => setState(() => _count = (_count > 0) ? _count - 1 : 0),
        ),
        AnimatedSwitcher(
          duration: const ${durationCode},
          transitionBuilder: (Widget child, Animation<double> animation) {
            return ScaleTransition(scale: animation, child: child);
          },
          child: Text(
            '$_count',
            key: ValueKey<int>(_count), // **สำคัญมาก: ต้องระบุ Key เพื่อให้รู้ว่าค่าเปลี่ยน!**
            style: const TextStyle(fontSize: 48, fontWeight: FontWeight.bold),
          ),
        ),
        IconButton(
          icon: const Icon(Icons.add),
          onPressed: () => setState(() => _count++),
        ),
      ],
    );
  }
}`;

      default:
        return '';
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Flutter Animation Mastery
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            แอนิเมชันทำให้แอปน่าสนใจและมีชีวิตชีวา
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            เคล็ดลับของแอป Flutter ระดับท็อปคือ <strong className="text-amber-300">Micro-interactions</strong> และ <strong className="text-sky-300">Smooth 60/120 FPS Animations</strong> ที่ตอบสนองการสัมผัสของผู้ใช้ ทดลองเล่นปรับแต่ง Curves และคัดลอกโค้ดไปใช้ได้ทันที
          </p>
        </div>
      </div>

      {/* Main Interactive Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Animation Selection & Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Animation Selector */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-sky-400" />
                เลือกประเภทแอนิเมชันยอดนิยม
              </h2>
              <span className="text-[11px] text-slate-400 font-mono">8 Interactive Types</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'animated_container', label: 'AnimatedContainer', tag: 'รูปทรง/สี' },
                { id: 'animated_opacity', label: 'AnimatedOpacity', tag: 'ค่อยๆ เลือน' },
                { id: 'elastic_bounce', label: 'Elastic Bounce', tag: 'ปุ่มกดเด้งดึ๋ง' },
                { id: 'animated_crossfade', label: 'CrossFade', tag: 'สลับ 2 วิดเจ็ต' },
                { id: 'hero_transition', label: 'Hero Transition', tag: 'บินข้ามหน้า' },
                { id: 'animated_rotation', label: 'AnimatedRotation', tag: 'หมุน 360°' },
                { id: 'slide_banner', label: 'SlideTransition', tag: 'สไลด์ขึ้น' },
                { id: 'animated_switcher', label: 'AnimatedSwitcher', tag: 'นับแต้มหมุน' },
              ].map((anim) => {
                const isSelected = selectedAnim === anim.id;
                return (
                  <button
                    key={anim.id}
                    onClick={() => {
                      setSelectedAnim(anim.id as AnimationType);
                      handleReset();
                    }}
                    className={`p-2.5 rounded-xl text-left transition flex flex-col justify-between border ${
                      isSelected
                        ? 'bg-sky-500/15 border-sky-400 text-white font-medium shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-mono font-semibold truncate">{anim.label}</span>
                    <span className={`text-[10px] mt-1 ${isSelected ? 'text-sky-300' : 'text-slate-400'}`}>
                      {anim.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Parameters Panel */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              ปรับจูนพารามิเตอร์ (Duration & Curves)
            </h2>

            {/* Duration Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300">ระยะเวลา (Duration):</span>
                <span className="font-mono text-sky-400 font-bold">{durationMs} ms ({(durationMs / 1000).toFixed(1)} วินาที)</span>
              </div>
              <input
                type="range"
                min="200"
                max="2000"
                step="100"
                value={durationMs}
                onChange={(e) => setDurationMs(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>200ms (เร็วปานสายฟ้า)</span>
                <span>800ms (นุ่มนวล)</span>
                <span>2000ms (สโลว์โมชั่น)</span>
              </div>
            </div>

            {/* Animation Curves */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-300">เส้นโค้งความเร่ง (Curves):</span>
                <span className="font-mono text-amber-300 text-[11px]">{selectedCurve}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'easeInOut', label: 'Curves.easeInOut', desc: 'ชะลอหัว-ท้าย มาตรฐาน' },
                  { id: 'bounceOut', label: 'Curves.bounceOut', desc: 'เด้งกระดอนเหมือนลูกบอล' },
                  { id: 'elasticOut', label: 'Curves.elasticOut', desc: 'ยางยืดดีดตัว มีชีวิตชีวา' },
                  { id: 'fastOutSlowIn', label: 'Curves.fastOutSlowIn', desc: 'สไตล์ Material 3' },
                  { id: 'linear', label: 'Curves.linear', desc: 'ความเร็วคงที่สม่ำเสมอ' },
                ].map((curve) => (
                  <button
                    key={curve.id}
                    onClick={() => setSelectedCurve(curve.id as CurveType)}
                    className={`p-2 rounded-lg text-left text-xs border transition ${
                      selectedCurve === curve.id
                        ? 'bg-amber-500/15 border-amber-400 text-amber-200 font-medium'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-mono text-[11px] truncate">{curve.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 truncate">{curve.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Play Trigger & Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleToggle}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>แตะเพื่อทดสอบแอนิเมชัน</span>
              </button>

              <button
                onClick={handleReset}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                title="รีเซ็ตสถานะเดิม"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Phone Mockup Live Preview & Code Tab (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Phone Frame Simulator */}
          <div className="bg-slate-950 rounded-3xl p-6 border-4 border-slate-800 shadow-2xl relative overflow-hidden flex flex-col items-center">
            {/* Status Bar */}
            <div className="w-full max-w-sm flex items-center justify-between text-[11px] text-slate-400 px-4 py-1.5 mb-4 bg-slate-900/80 rounded-full border border-slate-800">
              <span className="font-mono font-bold text-slate-200">09:41</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.2 rounded font-mono">
                  {isPlaying ? 'Animating...' : '60 FPS Idle'}
                </span>
                <span>●●●</span>
              </div>
            </div>

            {/* Mobile Canvas Stage */}
            <div className="w-full max-w-sm h-[360px] bg-slate-900/90 rounded-2xl border border-slate-800 p-4 flex flex-col items-center justify-center relative overflow-hidden select-none">
              
              {/* 1. Animated Container */}
              {selectedAnim === 'animated_container' && (
                <div 
                  onClick={handleToggle}
                  style={{
                    width: isToggled ? '240px' : '150px',
                    height: isToggled ? '170px' : '150px',
                    backgroundColor: isToggled ? '#6366f1' : '#0284c7',
                    borderRadius: isToggled ? '32px' : '16px',
                    boxShadow: isToggled ? '0 20px 30px -10px rgba(99, 102, 241, 0.5)' : '0 10px 15px -3px rgba(2, 132, 199, 0.3)',
                    transitionDuration: `${durationMs}ms`,
                    transitionTimingFunction: getCssTiming(selectedCurve),
                  }}
                  className="cursor-pointer transition-all flex flex-col items-center justify-center p-4 text-white text-center group border border-white/20"
                >
                  <Sparkles className={`w-8 h-8 mb-2 transition-transform ${isToggled ? 'rotate-45 scale-110 text-amber-300' : 'text-white'}`} />
                  <span className="font-bold text-sm">
                    {isToggled ? 'AnimatedContainer!' : 'แตะฉันเลย'}
                  </span>
                  <span className="text-[11px] text-white/80 mt-1">
                    {isToggled ? 'ขนาด สี เงา เปลี่ยนนุ่มนวล' : 'ขนาด: 150x150'}
                  </span>
                </div>
              )}

              {/* 2. Animated Opacity */}
              {selectedAnim === 'animated_opacity' && (
                <div className="flex flex-col items-center gap-6 w-full px-4">
                  <div 
                    style={{
                      opacity: isToggled ? 0 : 1,
                      transitionDuration: `${durationMs}ms`,
                      transitionTimingFunction: getCssTiming(selectedCurve),
                    }}
                    className="w-full p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg border border-amber-300/30 flex items-center gap-3 transition-opacity"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-xs">แจ้งเตือนลดราคา 50%</div>
                      <div className="text-[11px] text-amber-100">โปรโมชั่นสิ้นสุดเที่ยงคืนนี้!</div>
                    </div>
                  </div>

                  <button
                    onClick={handleToggle}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-sky-400 font-semibold border border-slate-700 hover:bg-slate-750 transition"
                  >
                    {isToggled ? 'แสดงแบนเนอร์ (Fade In)' : 'ซ่อนแบนเนอร์ (Fade Out)'}
                  </button>
                </div>
              )}

              {/* 3. Elastic Bounce */}
              {selectedAnim === 'elastic_bounce' && (
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                  <button
                    onClick={() => {
                      setIsLiked(!isLiked);
                      setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
                      handleToggle();
                    }}
                    style={{
                      transform: isToggled ? 'scale(1.4)' : 'scale(1.0)',
                      transitionDuration: `${durationMs}ms`,
                      transitionTimingFunction: getCssTiming(selectedCurve),
                    }}
                    className="w-24 h-24 rounded-full bg-slate-800/80 border-2 border-slate-700 flex items-center justify-center shadow-xl transition-transform active:scale-90 group"
                  >
                    <Heart 
                      className={`w-12 h-12 transition-colors ${
                        isLiked 
                          ? 'text-rose-500 fill-rose-500 filter drop-shadow(0 0 10px rgba(244,63,94,0.6))' 
                          : 'text-slate-400 group-hover:text-rose-400'
                      }`} 
                    />
                  </button>
                  <div>
                    <div className="text-xl font-bold font-mono text-white">{likeCount} Likes</div>
                    <div className="text-xs text-slate-400 mt-1">แตะหัวใจเพื่อทดสอบ Elastic Bounce!</div>
                  </div>
                </div>
              )}

              {/* 4. Animated CrossFade */}
              {selectedAnim === 'animated_crossfade' && (
                <div className="w-full px-4 flex flex-col items-center gap-4">
                  <div className="w-full h-32 relative">
                    {/* View 1: Skeleton Loading */}
                    <div 
                      style={{
                        opacity: isToggled ? 0 : 1,
                        pointerEvents: isToggled ? 'none' : 'auto',
                        transitionDuration: `${durationMs}ms`,
                        transitionTimingFunction: getCssTiming(selectedCurve),
                      }}
                      className="absolute inset-0 p-4 rounded-2xl bg-slate-800/70 border border-slate-700 flex flex-col justify-between animate-pulse transition-opacity"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-700"></div>
                        <div className="space-y-1.5 flex-1">
                          <div className="h-3.5 bg-slate-700 rounded w-3/4"></div>
                          <div className="h-2.5 bg-slate-700 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="h-3 bg-slate-700 rounded w-full"></div>
                    </div>

                    {/* View 2: Loaded Content */}
                    <div 
                      style={{
                        opacity: isToggled ? 1 : 0,
                        pointerEvents: isToggled ? 'auto' : 'none',
                        transitionDuration: `${durationMs}ms`,
                        transitionTimingFunction: getCssTiming(selectedCurve),
                      }}
                      className="absolute inset-0 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-600/40 text-white flex flex-col justify-between shadow-lg transition-opacity"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/30 flex items-center justify-center text-emerald-300 font-bold">
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                          <div className="font-bold text-xs text-emerald-200">ดาวน์โหลดสำเร็จแล้ว</div>
                          <div className="text-[10px] text-emerald-400">พร้อมใช้งานทันที (100%)</div>
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-300">CrossFade สลับสอง View อย่างราบรื่นไร้รอยต่อ</div>
                    </div>
                  </div>

                  <button
                    onClick={handleToggle}
                    className="px-4 py-2 rounded-xl bg-sky-500 text-white text-xs font-semibold shadow hover:bg-sky-400 transition"
                  >
                    {isToggled ? 'สลับกลับเป็นหน้า Loading' : 'สลับเป็นหน้าข้อมูลสำเร็จ'}
                  </button>
                </div>
              )}

              {/* 5. Hero Transition Simulator */}
              {selectedAnim === 'hero_transition' && (
                <div className="w-full h-full relative p-2 flex flex-col justify-center">
                  {!heroDetailedView ? (
                    /* Master List Screen */
                    <div className="space-y-3">
                      <div className="text-xs text-slate-400 text-center font-medium">
                        หน้า 1: แตะที่การ์ดเพื่อดูแอนิเมชัน Hero บินข้ามหน้า!
                      </div>
                      <div 
                        onClick={() => setHeroDetailedView(true)}
                        className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center gap-3 cursor-pointer hover:bg-slate-750 transition active:scale-98"
                      >
                        {/* Hero Element */}
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                          <Star className="w-8 h-8 fill-white/80 text-white" />
                        </div>
                        <div className="flex-1">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">tag: 'hero-star'</span>
                          <h4 className="text-xs font-bold text-white mt-1">คอร์ส Flutter Animation 101</h4>
                          <p className="text-[10px] text-slate-400">แตะเพื่อขยายเต็มจอ &rarr;</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Detail Screen */
                    <div className="absolute inset-0 bg-slate-900 rounded-2xl p-4 flex flex-col justify-between animate-fadeIn">
                      <div className="space-y-4">
                        {/* Expanded Hero Element */}
                        <div 
                          style={{
                            transitionDuration: `${durationMs}ms`,
                            transitionTimingFunction: getCssTiming(selectedCurve),
                          }}
                          className="w-full h-36 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center justify-center text-white shadow-xl relative overflow-hidden"
                        >
                          <Star className="w-16 h-16 fill-white/90 text-white animate-pulse" />
                          <span className="text-xs font-bold mt-2">Flutter Hero Component</span>
                        </div>
                        <div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">tag: 'hero-star' ขยายสมบูรณ์</span>
                          <h3 className="text-sm font-bold text-white mt-1">รายละเอียดคอร์สขั้นสูง</h3>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            Hero Animation ตรวจจับพิกัดต้นทางและปลายทาง แล้ววาดส่วนโค้งการบิน (RectTween) ให้อัตโนมัติ
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setHeroDetailedView(false)}
                        className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition"
                      >
                        &larr; บินกลับไปยังหน้ารายการ (Navigator.pop)
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 6. Animated Rotation */}
              {selectedAnim === 'animated_rotation' && (
                <div className="flex flex-col items-center justify-center gap-5">
                  <div
                    onClick={handleToggle}
                    style={{
                      transform: `rotate(${isToggled ? 360 : 0}deg)`,
                      transitionDuration: `${durationMs}ms`,
                      transitionTimingFunction: getCssTiming(selectedCurve),
                    }}
                    className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center shadow-xl shadow-amber-500/30 cursor-pointer text-white"
                  >
                    <Flame className="w-12 h-12 fill-white text-white" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-slate-300 font-bold block">
                      {isToggled ? 'หมุน 360 องศาเรียบร้อย!' : 'แตะที่กล่องเพื่อหมุนเกลียว'}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">turns: {isToggled ? '1.0' : '0.0'}</span>
                  </div>
                </div>
              )}

              {/* 7. Slide Transition */}
              {selectedAnim === 'slide_banner' && (
                <div className="w-full h-full relative flex flex-col justify-end p-2">
                  <div className="text-center mb-auto pt-6 text-xs text-slate-400">
                    จำลอง Modal Bottom Sheet หรือ Notification Bar ที่เลื่อนมาจากใต้จอ
                  </div>

                  <div
                    style={{
                      transform: isToggled ? 'translateY(0%)' : 'translateY(120%)',
                      transitionDuration: `${durationMs}ms`,
                      transitionTimingFunction: getCssTiming(selectedCurve),
                    }}
                    className="w-full p-4 rounded-2xl bg-gradient-to-br from-sky-600 to-blue-700 text-white shadow-2xl border border-sky-400/40 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-300" />
                        ชำระเงินเรียบร้อยแล้ว!
                      </span>
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">฿1,250.00</span>
                    </div>
                    <p className="text-[11px] text-sky-100">
                      ใบเสร็จถูกส่งไปยังอีเมลของคุณเรียบร้อยแล้ว
                    </p>
                  </div>

                  <button
                    onClick={handleToggle}
                    className="mt-4 w-full py-2 rounded-xl bg-slate-800 text-xs text-sky-400 font-semibold border border-slate-700"
                  >
                    {isToggled ? 'สไลด์ลง (Slide Down)' : 'สไลด์ขึ้น (Slide Up Sheet)'}
                  </button>
                </div>
              )}

              {/* 8. Animated Switcher */}
              {selectedAnim === 'animated_switcher' && (
                <div className="flex flex-col items-center justify-center gap-6">
                  <div className="text-xs text-slate-400">
                    เปลี่ยนตัวเลขพร้อมแอนิเมชัน Zoom & Switch
                  </div>

                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => setCounterNum(prev => Math.max(1, prev - 1))}
                      className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg flex items-center justify-center border border-slate-700"
                    >
                      -
                    </button>

                    <div 
                      key={counterNum}
                      style={{
                        animationDuration: `${durationMs}ms`,
                      }}
                      className="text-5xl font-extrabold font-mono text-sky-400 animate-bounce"
                    >
                      {counterNum}
                    </div>

                    <button
                      onClick={() => setCounterNum(prev => prev + 1)}
                      className="w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-bold text-lg flex items-center justify-center shadow-lg shadow-sky-500/30"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-400 text-center max-w-xs">
                    เมื่อ <code className="text-amber-300">ValueKey(counter)</code> มีการเปลี่ยนแปลง Flutter จะสลับวิดเจ็ตเก่าออกและเอาตัวใหม่ออกมาด้วย transition ที่ตั้งไว้
                  </div>
                </div>
              )}
            </div>

            {/* Hint below preview */}
            <div className="w-full flex items-center justify-between text-[11px] text-slate-400 px-4 mt-3">
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-sky-400" />
                ลองปรับ Curve และ Duration ด้านซ้ายเพื่อดูความต่าง
              </span>
              <span className="font-mono text-sky-400">{selectedCurve}</span>
            </div>
          </div>

          {/* Dart Code & Architecture Explanation Tabs */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 bg-slate-950/80 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveCodeTab('code')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    activeCodeTab === 'code'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5 inline mr-1" />
                  Flutter Code (พร้อมใช้)
                </button>
                <button
                  onClick={() => setActiveCodeTab('concept')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    activeCodeTab === 'concept'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 inline mr-1" />
                  หลักการ & เทคนิค
                </button>
              </div>

              {activeCodeTab === 'code' && (
                <button
                  onClick={() => copyCode(generateDartCode())}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">คัดลอกแล้ว!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>คัดลอกโค้ด Dart</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Code Tab Content */}
            {activeCodeTab === 'code' && (
              <div className="p-4 bg-slate-950 text-xs font-mono overflow-x-auto max-h-[380px] scrollbar-thin text-slate-300">
                <pre>{generateDartCode()}</pre>
              </div>
            )}

            {/* Concept Tab Content */}
            {activeCodeTab === 'concept' && (
              <div className="p-6 space-y-4 text-xs text-slate-300 leading-relaxed">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  เข้าใจระบบแอนิเมชันของ Flutter ใน 3 นาที
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <h4 className="font-bold text-sky-400 mb-1">1. Implicit Animations (เริ่มต้นแนะนำตัวนี้)</h4>
                    <p className="text-slate-400">
                      ขึ้นต้นด้วยคำว่า <code className="text-white">Animated...</code> เช่น <code className="text-white">AnimatedContainer</code>, <code className="text-white">AnimatedOpacity</code> คุณไม่ต้องยุ่งกับ AnimationController ไม่ต้องเขียน initState/dispose แค่เปลี่ยนตัวแปรค่าใหม่แล้วสั่ง <code className="text-amber-300">setState()</code> ตัว Flutter จะทำการ Interpolate ค่าระหว่างเก่าไปหาใหม่อย่างนุ่มนวลให้อัตโนมัติ!
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <h4 className="font-bold text-amber-400 mb-1">2. Explicit Animations (ควบคุมได้เบ็ดเสร็จ)</h4>
                    <p className="text-slate-400">
                      ใช้เมื่อต้องการแอนิเมชันที่เล่นวนซ้ำ (Looping), หมุนตลอดเวลา, เล่นย้อนกลับ (Reverse), หรือรอจังหวะสั่งเริ่ม-หยุด ต้องใช้ <code className="text-white">AnimationController</code> ร่วมกับ <code className="text-white">SingleTickerProviderStateMixin</code> และอย่าลืมเรียก <code className="text-rose-400">controller.dispose()</code> เสมอเพื่อป้องกัน Memory Leak
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-start gap-2.5 text-sky-200">
                  <Sparkles className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">เคล็ดลับระดับมือโปร:</strong> สำหรับแอปยุคใหม่ที่ต้องการเขียนแอนิเมชันแบบสั้นกระชับ สามารถติดตั้งแพ็กเกจยอดนิยม <code className="bg-slate-900 px-1.5 py-0.5 rounded text-amber-300 font-mono">flutter_animate</code> ซึ่งช่วยให้เขียน Chained Syntax ได้ในบรรทัดเดียว เช่น <code className="font-mono text-white">myWidget.animate().fadeIn().scale().shimmer()</code>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Animation Packages & Ecosystem */}
      <section className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              แพ็กเกจช่วยทำแอนิเมชันยอดฮิตใน pub.dev
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              เครื่องมือที่ช่วยยกระดับความสวยงามให้แอปของคุณเหมือนมืออาชีพทำ
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 hidden sm:block">Recommended for Beginners</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              name: 'flutter_animate',
              category: 'Chained Animations',
              stars: '99% Popularity',
              desc: 'เขียนแอนิเมชันสุดลื่นไหลต่อกันเป็นห่วงโซ่ เช่น .fadeIn().slideY().tint() เขียนง่ายในบรรทัดเดียว',
              url: 'https://pub.dev/packages/flutter_animate',
            },
            {
              name: 'lottie',
              category: 'Vector & After Effects',
              stars: 'Official Google Partner',
              desc: 'แสดงผลแอนิเมชัน vector คุณภาพสูงไฟล์ json เช่น พลุเฉลิมฉลอง, ไอคอนดาวน์โหลด, checkmark',
              url: 'https://pub.dev/packages/lottie',
            },
            {
              name: 'rive',
              category: 'Interactive Game-grade',
              stars: 'State Machines',
              desc: 'แอนิเมชันที่ขยับตามการแตะหรือเมาส์ เช่น หน้าตาตัวการ์ตูนที่มองตามนิ้ว หรือแถบเลื่อนระดับพลัง',
              url: 'https://pub.dev/packages/rive',
            },
            {
              name: 'shimmer',
              category: 'Loading Skeletons',
              stars: 'Essential UI',
              desc: 'เอฟเฟกต์แสงเงาวาบสำหรับทำหน้าจอกำลังโหลด (Skeleton Loader) สไตล์ Facebook และ Shopee',
              url: 'https://pub.dev/packages/shimmer',
            },
          ].map((pkg, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm text-white font-mono">{pkg.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono">
                    {pkg.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {pkg.desc}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-850 flex items-center justify-between text-[11px]">
                <span className="text-amber-400 font-mono flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {pkg.stars}
                </span>
                <a 
                  href={pkg.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-sky-400 hover:underline flex items-center gap-0.5"
                >
                  <span>pub.dev</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
