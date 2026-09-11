import React, { useState } from 'react';
import { 
  Cpu, 
  RotateCw, 
  Plus, 
  Minus, 
  Check, 
  ArrowDown, 
  ArrowUp, 
  Move, 
  Layers, 
  Zap, 
  Sparkles,
  HelpCircle,
  Code,
  FolderTree,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Box,
  Workflow,
  Terminal,
  Compass,
  ArrowRight,
  Copy
} from 'lucide-react';

type StateArch = 'set_state' | 'valuenotifier' | 'provider' | 'riverpod' | 'bloc';
type OverflowFix = 'none' | 'expanded' | 'scroll' | 'wrap';

export const CoreConceptsTab: React.FC = () => {
  // State for interactive counter demo
  const [counter, setCounter] = useState(0);
  const [rebuildFlash, setRebuildFlash] = useState(false);
  const [selectedArch, setSelectedArch] = useState<StateArch>('riverpod');
  const [overflowFix, setOverflowFix] = useState<OverflowFix>('none');
  const [copiedCode, setCopiedCode] = useState(false);

  const increment = () => {
    setCounter(prev => prev + 1);
    setRebuildFlash(true);
    setTimeout(() => setRebuildFlash(false), 500);
  };

  const decrement = () => {
    setCounter(prev => Math.max(0, prev - 1));
    setRebuildFlash(true);
    setTimeout(() => setRebuildFlash(false), 500);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const stateArchitectures = {
    set_state: {
      title: '1. setState (Local UI State)',
      badge: 'Built-in พื้นฐาน',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      difficulty: 'ง่ายมาก',
      summary: 'เหมาะสำหรับ State ในหน้าจอเดียว เช่น การกดเปิด/ปิด Dialog, ตัวเลือก Tab, หรือสวิตช์ในหน้าตั้งค่า',
      pros: ['ไม่ต้องติดตั้ง Package เสริมใดๆ', 'เข้าใจง่ายที่สุด เรียนรู้ได้ทันที', 'ประมวลผลเร็วสำหรับคอมโพเนนต์ขนาดเล็ก'],
      cons: ['ไม่เหมาะกับการแชร์ข้อมูลข้ามหลายหน้าจอ', 'ทำให้ทั้งหน้าจอ Rebuild หากไม่แยก Widget ให้ดี'],
      code: `// การใช้งาน setState ใน StatefulWidget
class CounterWidget extends StatefulWidget {
  const CounterWidget({super.key});

  @override
  State<CounterWidget> createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  int _count = 0;

  void _increment() {
    setState(() {
      _count++; // แจ้ง Flutter ให้รัน build() วาดหน้าใหม่
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('จำนวน: \$_count', style: const TextStyle(fontSize: 24)),
        ElevatedButton(
          onPressed: _increment,
          child: const Text('เพิ่มตัวเลข'),
        ),
      ],
    );
  }
}`
    },
    valuenotifier: {
      title: '2. ValueNotifier & ListenableBuilder',
      badge: 'Modern Built-in',
      badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
      difficulty: 'ง่าย - ปานกลาง',
      summary: 'เครื่องมือจัดการ State น้ำหนักเบาที่มากับ Flutter อยู่แล้ว Rebuild เฉพาะจุดที่ฟังค่า ไม่ต้อง Rebuild ทั้งหน้าจอ',
      pros: ['ไม่ต้องใช้ StatefulWidget ขนาดใหญ่', 'Rebuild เฉพาะ Widget ที่ถูกหุ้มด้วย ListenableBuilder', 'เบามาก ไม่มี dependency ภายนอก'],
      cons: ['หากมีหลาย State ที่ซับซ้อนสัมพันธ์กัน จัดการยากขึ้น'],
      code: `// ValueNotifier + ListenableBuilder (ไม่ต้องลง package เพิ่ม)
final counterNotifier = ValueNotifier<int>(0);

class CounterScreen extends StatelessWidget {
  const CounterScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ListenableBuilder(
          listenable: counterNotifier,
          builder: (context, child) {
            // Rebuild เฉพาะ Text ตัวนี้เท่านั้นเมื่อ counterNotifier เปลี่ยนค่า!
            return Text(
              'แต้ม: \${counterNotifier.value}',
              style: const TextStyle(fontSize: 24),
            );
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => counterNotifier.value++,
        child: const Icon(Icons.add),
      ),
    );
  }
}`
    },
    provider: {
      title: '3. Provider & ChangeNotifier',
      badge: 'Google แนะนำ',
      badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      difficulty: 'ปานกลาง',
      summary: 'มาตรฐานที่ได้รับการยอมรับยาวนาน ใช้ ChangeNotifier เป็นคลาสเก็บสถานะ แล้วสั่ง notifyListeners() เมื่อข้อมูลเปลี่ยน',
      pros: ['มีเอกสารและตัวอย่างการใช้งานเยอะมาก', 'เหมาะสำหรับแอปขนาดเล็กถึงระดับกลาง เช่น ตะกร้าสินค้า', 'แยก Business Logic ออกจาก UI ได้ดี'],
      cons: ['พึ่งพา BuildContext ในการค้นหา Provider ข้ามหน้าจอ', 'อาจเกิด Runtime Exception หากหา Provider ไม่พบ'],
      code: `// 1. สร้าง Model ด้วย ChangeNotifier
class CartModel extends ChangeNotifier {
  final List<String> _items = [];
  List<String> get items => _items;

  void addItem(String item) {
    _items.add(item);
    notifyListeners(); // แจ้งเตือนทุกหน้าที่กำลังฟัง CartModel อยู่
  }
}

// 2. ใช้งานใน Widget ผ่าน Consumer
class CartButton extends StatelessWidget {
  const CartButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<CartModel>(
      builder: (context, cart, child) {
        return Text('สินค้าในตะกร้า: \${cart.items.length} ชิ้น');
      },
    );
  }
}`
    },
    riverpod: {
      title: '4. Flutter Riverpod 2.x',
      badge: 'มาตรฐานยอดนิยม 2024-2026',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      difficulty: 'ปานกลาง',
      summary: 'วิวัฒนาการขั้นสุดยอดจากผู้สร้าง Provider แก้ไขปัญหา BuildContext, ปลอดภัยตอนคอมไพล์ (Compile-Safe), รองรับ AsyncNotifier สำหรับเรียก API',
      pros: ['ไม่ต้องพึ่งพา BuildContext ค้นหาจากที่ไหนก็ได้', 'Compile-time Safe ป้องกัน Bug ตั้งแต่ตอนเขียนโค้ด', 'จัดการ Loading / Error / Data ของ API ได้ง่ายผ่าน AsyncValue'],
      cons: ['ต้องเปลี่ยนจาก StatelessWidget เป็น ConsumerWidget'],
      code: `// Flutter Riverpod 2.x
import 'package:flutter_riverpod/flutter_riverpod.dart';

// 1. ประกาศ StateProvider ทั่วโลก
final counterProvider = StateProvider<int>((ref) => 0);

// 2. สืบทอดจาก ConsumerWidget เพื่อใช้งาน ref
class CounterView extends ConsumerWidget {
  const CounterView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // ดักฟังค่า: ถ้าค่าเปลี่ยน หน้าจอนี้จะ Rebuild อัตโนมัติ
    final count = ref.watch(counterProvider);

    return Scaffold(
      body: Center(child: Text('แต้ม: \$count')),
      floatingActionButton: FloatingActionButton(
        onPressed: () => ref.read(counterProvider.notifier).state++,
        child: const Icon(Icons.add),
      ),
    );
  }
}`
    },
    bloc: {
      title: '5. BLoC / Cubit (Business Logic Component)',
      badge: 'Enterprise Architecture',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      difficulty: 'สูง',
      summary: 'สถาปัตยกรรมระดับองค์กร แยก Event, State และ Logic ออกจากกันอย่างสมบูรณ์แบบ ได้รับความนิยมสูงสุดในแอปการเงิน ธนาคาร และองค์กรใหญ่',
      pros: ['โครงสร้างเข้มงวด คาดเดาการทำงานง่าย (Predictable)', 'เขียน Unit Test Logic ได้ 100% โดยไม่ต้องมี UI', 'เก็บบันทึกประวัติ State Transition ได้ทุกจังหวะ'],
      cons: ['Boilerplate code ค่อนข้างเยอะ ต้องสร้างทั้ง Event, State, Bloc'],
      code: `// BLoC / Cubit ตัวอย่างการใช้งาน
// 1. สร้าง Cubit ควบคุม State
class CounterCubit extends Cubit<int> {
  CounterCubit() : super(0); // ค่าเริ่มต้นคือ 0

  void increment() => emit(state + 1);
  void decrement() => emit(state - 1);
}

// 2. ใช้ BlocBuilder ดักฟัง State ในหน้า UI
class CounterPage extends StatelessWidget {
  const CounterPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<CounterCubit, int>(
      builder: (context, count) {
        return Column(
          children: [
            Text('BLoC Count: \$count'),
            ElevatedButton(
              onPressed: () => context.read<CounterCubit>().increment(),
              child: const Text('เพิ่ม'),
            ),
          ],
        );
      },
    );
  }
}`
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Cpu className="w-6 h-6 text-sky-400" />
          Flutter: State & Layout Architecture ที่นิยมใช้งานจริง
        </h1>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl">
          เจาะลึกโครงสร้างระดับมืออาชีพ: ตั้งแต่วงจรชีวิตของ State, การจัดการ State ยอดนิยม (Riverpod, Bloc, Provider) จนถึงกฎ Layout และการแก้ปัญหา RenderFlex Overflow
        </p>
      </div>

      {/* Section 1: StatelessWidget vs StatefulWidget Interactive Demo */}
      <section className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              1. จำลองการทำงานของ setState() และการ Rebuild หน้าจอ
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              ทดลองกดปุ่มบวกตัวเลขด้านล่าง สังเกตว่าเกิดอะไรขึ้นในวงจร Lifecycle ของ State
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
            Interactive State Engine
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Interactive Counter Mini Simulator */}
          <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center relative overflow-hidden">
            {/* Rebuild Pulse indicator */}
            {rebuildFlash && (
              <div className="absolute inset-0 bg-sky-500/15 pointer-events-none animate-pulse border-2 border-sky-400 rounded-2xl"></div>
            )}

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px] text-slate-400 mb-4">
              <span className={`w-2 h-2 rounded-full ${rebuildFlash ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`}></span>
              <span>{rebuildFlash ? 'กำลังรัน build() ใหม่อีกครั้ง!' : 'สถานะ: ปกติ (Idle)'}</span>
            </div>

            <div className="text-xs text-slate-400 mb-1">ตัวแปรใน State: `int _counter`</div>
            <div className={`text-6xl font-extrabold my-3 font-mono transition-transform duration-150 ${rebuildFlash ? 'scale-110 text-sky-400' : 'text-white'}`}>
              {counter}
            </div>

            <div className="flex items-center justify-center gap-3 mt-4">
              <button
                onClick={decrement}
                className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white flex items-center justify-center font-bold text-lg border border-slate-700 transition"
                title="ลดค่าตัวนับ"
              >
                <Minus className="w-5 h-5" />
              </button>
              <button
                onClick={increment}
                className="px-6 h-12 rounded-xl bg-sky-500 hover:bg-sky-400 active:scale-95 text-white flex items-center gap-2 font-bold text-sm shadow-lg shadow-sky-500/25 transition"
                title="เพิ่มค่าตัวนับ และ trigger setState()"
              >
                <Plus className="w-5 h-5 stroke-[3]" />
                <span>กดปุ่ม (+1)</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
              เมื่อกดปุ่ม คำสั่ง <code className="text-amber-400 bg-amber-500/10 px-1 py-0.5 rounded font-mono">setState(() &#123; _counter++; &#125;)</code> จะส่งสัญญาณบอก Flutter ให้เรียกเมธอด <code className="text-sky-400 bg-sky-500/10 px-1 py-0.5 rounded font-mono">build(context)</code> เพื่อวาดตัวเลขใหม่ลงหน้าจอ
            </p>
          </div>

          {/* Side-by-side comparison table */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* StatelessWidget */}
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
              <div className="flex items-center gap-2 mb-2 font-bold text-sky-400 text-sm">
                <div className="w-6 h-6 rounded bg-sky-500/20 flex items-center justify-center text-xs">1</div>
                StatelessWidget
              </div>
              <p className="text-slate-300 leading-relaxed mb-3">
                เหมาะสำหรับหน้าจอหรือ Widget ที่ <strong className="text-white">ข้อมูลคงที่ ไม่เปลี่ยนแปลง</strong> หลังจากถูกสร้างขึ้น เช่น ข้อความหัวเรื่อง, ไอคอน, หน้าจอ About Us, โลโก้
              </p>
              <ul className="space-y-1.5 text-slate-400">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-sky-400" />
                  <span>มีแค่ฟังก์ชันเดียวคือ <code className="text-slate-200">build()</code></span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-sky-400" />
                  <span>เบา ประมวลผลเร็ว ประหยัดหน่วยความจำ</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-sky-400" />
                  <span>ตัวแปรทั้งหมดต้องเป็น <code className="text-slate-200">final</code></span>
                </li>
              </ul>
            </div>

            {/* StatefulWidget */}
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
              <div className="flex items-center gap-2 mb-2 font-bold text-amber-400 text-sm">
                <div className="w-6 h-6 rounded bg-amber-500/20 flex items-center justify-center text-xs">2</div>
                StatefulWidget
              </div>
              <p className="text-slate-300 leading-relaxed mb-3">
                เหมาะสำหรับหน้าจอที่ <strong className="text-white">ข้อมูลเปลี่ยนไปตามการโต้ตอบ</strong> ของผู้ใช้ เช่น ช่องกรอกฟอร์ม, ตัวนับแต้ม, หน้าที่รอผลจาก API, สวิตช์ Checkbox
              </p>
              <ul className="space-y-1.5 text-slate-400">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                  <span>มี 2 คลาส: Widget class + State class</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                  <span>มี Lifecycle: <code className="text-slate-200">initState()</code>, <code className="text-slate-200">dispose()</code></span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                  <span>สั่ง Rebuild ด้วย <code className="text-slate-200">setState()</code></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Interactive State Architecture Explorer (NEW) */}
      <section className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Workflow className="w-5 h-5 text-indigo-400" />
            2. สถาปัตยกรรม State Management ยอดนิยม (Interactive Code Explorer)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            เลือกดูสถาปัตยกรรมการจัดการข้อมูลที่ Flutter Developer นิยมใช้ในอุตสาหกรรมจริง พร้อมข้อดี-ข้อเสีย และโค้ดตัวอย่างที่นำไปใช้ได้ทันที
          </p>
        </div>

        {/* Tabs for State Architecture */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {(Object.keys(stateArchitectures) as StateArch[]).map((key) => {
            const item = stateArchitectures[key];
            const isSelected = selectedArch === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedArch(key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  isSelected
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </div>

        {/* Selected Architecture Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Details & Pros/Cons */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${stateArchitectures[selectedArch].badgeColor}`}>
                {stateArchitectures[selectedArch].badge}
              </span>
              <span className="text-xs text-slate-400">
                ระดับ: <strong>{stateArchitectures[selectedArch].difficulty}</strong>
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {stateArchitectures[selectedArch].summary}
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  จุดเด่น & ข้อดี
                </span>
                <ul className="space-y-1 text-xs text-emerald-200/80">
                  {stateArchitectures[selectedArch].pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-800/40">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5 mb-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  ข้อจำกัดที่ต้องระวัง
                </span>
                <ul className="space-y-1 text-xs text-rose-200/80">
                  {stateArchitectures[selectedArch].cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-400 mt-0.5">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-3 border-b border-slate-800 bg-slate-900/80">
              <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-sky-400" />
                {selectedArch}.dart
              </span>
              <button
                onClick={() => handleCopy(stateArchitectures[selectedArch].code)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition"
              >
                {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCode ? 'คัดลอกแล้ว' : 'คัดลอกโค้ด'}</span>
              </button>
            </div>
            <pre className="p-4 font-mono text-xs text-sky-200 leading-relaxed overflow-x-auto max-h-[380px] scrollbar-thin">
              <code>{stateArchitectures[selectedArch].code}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Section 3: Interactive RenderFlex Overflow Simulator (NEW) */}
      <section className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            3. ปัญหาคลาสสิก: RenderFlex overflowed by X pixels และ 3 วิธีแก้
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            บั๊กยอดฮิตอันดับ 1 ของมือใหม่คือแถบคาดแถบลายเหลืองดำ (Yellow-Black Warning) เกิดขึ้นเมื่อลูกใน Row/Column มีขนาดใหญ่เกินกว่าหน้าจอจะแสดงได้
          </p>
        </div>

        {/* Overflow Fix Selector */}
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setOverflowFix('none')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              overflowFix === 'none'
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 border border-slate-800'
            }`}
          >
            ⚠️ จำลองการเกิด Overflow Error (เดิมๆ)
          </button>
          <button
            onClick={() => setOverflowFix('expanded')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              overflowFix === 'expanded'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 border border-slate-800'
            }`}
          >
            ✅ วิธีที่ 1: หุ้มด้วย Expanded
          </button>
          <button
            onClick={() => setOverflowFix('scroll')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              overflowFix === 'scroll'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 border border-slate-800'
            }`}
          >
            ✅ วิธีที่ 2: หุ้มด้วย SingleChildScrollView
          </button>
          <button
            onClick={() => setOverflowFix('wrap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              overflowFix === 'wrap'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 border border-slate-800'
            }`}
          >
            ✅ วิธีที่ 3: เปลี่ยนมาใช้ Wrap แทน Row
          </button>
        </div>

        {/* Live Simulator Viewport */}
        <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden">
          <div className="text-xs text-slate-400 mb-2 font-mono">
            จำลองหน้าจอมือถือความกว้าง 320px พร้อมปุ่ม 4 ปุ่ม:
          </div>

          <div className="max-w-[320px] mx-auto p-4 bg-slate-900 rounded-xl border border-slate-700 relative overflow-hidden">
            {overflowFix === 'none' && (
              <div className="relative">
                <div className="flex gap-2 w-[420px]">
                  <div className="px-3 py-2 bg-sky-600 text-white text-xs rounded-lg whitespace-nowrap">ปุ่มเมนูที่ 1</div>
                  <div className="px-3 py-2 bg-sky-600 text-white text-xs rounded-lg whitespace-nowrap">ปุ่มเมนูที่ 2</div>
                  <div className="px-3 py-2 bg-sky-600 text-white text-xs rounded-lg whitespace-nowrap">ปุ่มเมนูที่ 3 กดยาก</div>
                  <div className="px-3 py-2 bg-sky-600 text-white text-xs rounded-lg whitespace-nowrap">ปุ่มเมนูที่ 4</div>
                </div>

                {/* Simulated Yellow Black Warning Strip */}
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-[repeating-linear-gradient(45deg,#f59e0b,#f59e0b_10px,#000_10px,#000_20px)] flex items-center justify-center shadow-lg border-l-2 border-amber-300">
                  <span className="bg-black/90 text-amber-300 text-[9px] font-mono px-1 font-bold">
                    +100px OVERFLOW!
                  </span>
                </div>
              </div>
            )}

            {overflowFix === 'expanded' && (
              <div className="flex gap-1.5 w-full">
                <div className="flex-1 px-2 py-2 bg-emerald-600 text-white text-[11px] rounded-lg text-center truncate font-medium">
                  ปุ่ม 1 (ย่อ)
                </div>
                <div className="flex-1 px-2 py-2 bg-emerald-600 text-white text-[11px] rounded-lg text-center truncate font-medium">
                  ปุ่ม 2 (ย่อ)
                </div>
                <div className="flex-1 px-2 py-2 bg-emerald-600 text-white text-[11px] rounded-lg text-center truncate font-medium">
                  ปุ่ม 3 (ย่อ)
                </div>
              </div>
            )}

            {overflowFix === 'scroll' && (
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                <div className="px-3 py-2 bg-indigo-600 text-white text-xs rounded-lg whitespace-nowrap">ปุ่มเมนู 1</div>
                <div className="px-3 py-2 bg-indigo-600 text-white text-xs rounded-lg whitespace-nowrap">ปุ่มเมนู 2</div>
                <div className="px-3 py-2 bg-indigo-600 text-white text-xs rounded-lg whitespace-nowrap">ปุ่มเมนู 3 (เลื่อนดูได้) 👉</div>
                <div className="px-3 py-2 bg-indigo-600 text-white text-xs rounded-lg whitespace-nowrap">ปุ่มเมนู 4</div>
              </div>
            )}

            {overflowFix === 'wrap' && (
              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-1.5 bg-teal-600 text-white text-xs rounded-lg">ปุ่มที่ 1</div>
                <div className="px-3 py-1.5 bg-teal-600 text-white text-xs rounded-lg">ปุ่มที่ 2</div>
                <div className="px-3 py-1.5 bg-teal-600 text-white text-xs rounded-lg">ปุ่มที่ 3 (ตกมาบรรทัดใหม่)</div>
                <div className="px-3 py-1.5 bg-teal-600 text-white text-xs rounded-lg">ปุ่มที่ 4</div>
              </div>
            )}
          </div>

          <div className="mt-4 text-xs text-slate-300 text-center">
            {overflowFix === 'none' && (
              <span className="text-rose-400 font-medium">
                ❌ ปัญหา: ข้อความและปุ่มในแถวยาวเกินความกว้างหน้าจอ Row จึงไม่สามารถตัดขึ้นบรรทัดใหม่ได้
              </span>
            )}
            {overflowFix === 'expanded' && (
              <span className="text-emerald-400 font-medium">
                ✅ แก้ด้วย Expanded: แบ่งพื้นที่ที่เหลือให้เท่ากันตาม flex factor
              </span>
            )}
            {overflowFix === 'scroll' && (
              <span className="text-indigo-400 font-medium">
                ✅ แก้ด้วย SingleChildScrollView(scrollDirection: Axis.horizontal): เลื่อนดูแนวนอนได้
              </span>
            )}
            {overflowFix === 'wrap' && (
              <span className="text-teal-400 font-medium">
                ✅ แก้ด้วย Wrap: ขึ้นแถวใหม่อัตโนมัติเมื่อชนขอบจอ
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Section 4: Clean Architecture Directory Structure (NEW) */}
      <section className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-sky-400" />
            4. โครงสร้างโฟลเดอร์ Clean Architecture แบบ Feature-First
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            โครงสร้างโฟลเดอร์ที่โปรแกรมเมอร์ Flutter มืออาชีพจัดระเบียบในโปรเจกต์จริง แบ่งตามฟีเจอร์ ดูแลง่าย สเกลได้ไม่รู้จบ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed">
            <div className="text-sky-400 font-bold mb-2">📁 lib/ (Feature-First Structure)</div>
            <div className="pl-2 border-l border-slate-800 space-y-1 text-[11px]">
              <div>├── 📂 <span className="text-amber-300">core/</span> <span className="text-slate-500">// ค่าคงที่ ธีม และตัวเชื่อม Network</span></div>
              <div>│   ├── 📂 theme/</div>
              <div>│   ├── 📂 constants/</div>
              <div>│   └── 📂 network/</div>
              <div>├── 📂 <span className="text-emerald-300">features/</span> <span className="text-slate-500">// แยกตามหน้าการทำงาน</span></div>
              <div>│   ├── 📂 <span className="text-cyan-300">auth/</span> <span className="text-slate-500">// ฟีเจอร์ล็อกอิน/สมัคร</span></div>
              <div>│   │   ├── 📂 data/ <span className="text-slate-500">(API / Repositories)</span></div>
              <div>│   │   ├── 📂 domain/ <span className="text-slate-500">(Entities / UseCases)</span></div>
              <div>│   │   └── 📂 presentation/ <span className="text-slate-500">(Screens / Widgets / Riverpod)</span></div>
              <div>│   └── 📂 <span className="text-cyan-300">cart/</span> <span className="text-slate-500">// ฟีเจอร์ตระกร้าสินค้า</span></div>
              <div>│       ├── 📂 data/</div>
              <div>│       └── 📂 presentation/</div>
              <div>└── 📄 main.dart <span className="text-slate-500">// จุดเริ่มต้นของแอป</span></div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs text-slate-300">
            <h4 className="font-bold text-white flex items-center gap-1.5 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              ทำไมควรจัดโฟลเดอร์แบบ Feature-First?
            </h4>
            <ul className="space-y-2 text-slate-400 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">•</span>
                <span><strong className="text-white">หาโค้ดเจอง่าย:</strong> เมื่อต้องการแก้ไขระบบ Cart ทุกอย่างที่เกี่ยวกับ Cart (หน้าจอ, Controller, API) จะอยู่ในโฟลเดอร์เดียวกัน</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">•</span>
                <span><strong className="text-white">ทำงานร่วมกันในทีมสะดวก:</strong> สมาชิกในทีมสามารถแยกกันพัฒนาคนละ Feature ได้โดยไม่เกิด Git Conflict ทับกัน</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">•</span>
                <span><strong className="text-white">ลบหรือเปลี่ยนง่าย:</strong> หากต้องการถอดฟีเจอร์ใดออก ก็สามารถลบโฟลเดอร์นั้นได้ทั้งชุดโดยไม่กระทบส่วนอื่น</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 5: Layout Rules Diagram */}
      <section className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            5. กฎเหล็กการจัด Layout ของ Flutter ใน 3 วลีทองคำ
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            หากคุณเคยสงสัยว่าทำไมกำหนด width: 200 แล้ว Widget กลับขยายเต็มจอ หรือทำไมข้อความถึงล้นขอบ ให้จำกฎ 3 ข้อนี้ไว้:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Rule 1 */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 relative">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm mb-3">
              <ArrowDown className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">1. Constraints go down</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Widget แม่ (Parent) จะส่ง <strong>ข้อจำกัดขนาด</strong> (BoxConstraints: ความกว้างต่ำสุด-สูงสุด min/max width, height) ลงไปให้ลูก
            </p>
            <div className="mt-3 p-2 bg-slate-900 rounded font-mono text-[11px] text-sky-300 border border-slate-800">
              Parent: "ลูกเอ๋ย เจ้ามีพื้นที่ได้กว้างไม่เกิน 300px นะ"
            </div>
          </div>

          {/* Rule 2 */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 relative">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm mb-3">
              <ArrowUp className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">2. Sizes go up</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Widget ลูก (Child) จะตัดสินใจเลือกขนาดของตัวเอง <strong>ให้อยู่ในกรอบที่แม่ส่งมา</strong> แล้วรายงานขนาดจริงนั้นกลับขึ้นไปให้แม่ทราบ
            </p>
            <div className="mt-3 p-2 bg-slate-900 rounded font-mono text-[11px] text-cyan-300 border border-slate-800">
              Child: "งั้นหนูขอใช้พื้นที่ความกว้าง 180px ครับ"
            </div>
          </div>

          {/* Rule 3 */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 relative">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm mb-3">
              <Move className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">3. Parent sets position</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Widget แม่เป็นผู้กำหนดตำแหน่งพิกัด (Coordinates x, y) ว่าลูกคนนี้จะไปนั่งอยู่ตรงจุดไหนบนหน้าจอ (เช่น จัดชิดซ้าย หรือตรงกลาง)
            </p>
            <div className="mt-3 p-2 bg-slate-900 rounded font-mono text-[11px] text-indigo-300 border border-slate-800">
              Parent: "โอเค แม่จะวางเจ้าไว้ที่พิกัดกึ่งกลาง x: 60, y: 100"
            </div>
          </div>
        </div>

        {/* Insight callout */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold text-amber-300">ตัวอย่างที่พบบ่อย: </strong>
            ทำไมใส่ <code className="bg-slate-950 px-1.5 py-0.5 rounded font-mono text-white">Container(width: 100, height: 100)</code> เป็นลูกของ Scaffold ตรงๆ แล้วมันถึงขยายเต็มหน้าจอ?
            เพราะ Scaffold สั่งให้ลูกต้องขยายเต็มพื้นที่หน้าจอ (Tight Constraints) ดังนั้น Container จึงไม่สามารถเลือกขนาด 100px ตามใจตัวเองได้ เว้นแต่จะหุ้มด้วย <code className="bg-slate-950 px-1.5 py-0.5 rounded font-mono text-sky-300">Center</code> ก่อน!
          </div>
        </div>
      </section>
    </div>
  );
};
