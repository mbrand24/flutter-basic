import { CodeSnippet, GotchaItem } from '../types';

export interface SetupStep {
  step: number;
  title: string;
  desc: string;
  command?: string;
  tip?: string;
  iconName: string;
}

export const SETUP_STEPS: SetupStep[] = [
  {
    step: 1,
    title: 'ติดตั้ง Flutter SDK & Git',
    desc: 'ดาวน์โหลด Flutter SDK จาก flutter.dev และติดตั้ง Git บนเครื่อง แตกไฟล์ไว้ที่ path ปลอดภัย เช่น C:\\src\\flutter หรือ ~/development/flutter แล้วตั้งค่า Environment Variable (PATH)',
    command: 'git --version && flutter --version',
    tip: 'หลีกเลี่ยงการวางโฟลเดอร์ Flutter ไว้ใน C:\\Program Files เพราะอาจติดสิทธิ์ Administrator',
    iconName: 'Download'
  },
  {
    step: 2,
    title: 'รันคำสั่ง flutter doctor เพื่อตรวจเช็ค',
    desc: 'เครื่องมืออัจฉริยะของ Flutter ที่จะสแกนระบบและบอกว่าคุณขาดเครื่องมืออะไรบ้าง เช่น Android SDK, Xcode (สำหรับ Mac), Chrome หรือ VS Code',
    command: 'flutter doctor',
    tip: 'หากมีเครื่องหมาย [!] หรือ [X] ให้ทำตามคำแนะนำที่ระบุไว้ใน terminal ได้เลย',
    iconName: 'Stethoscope'
  },
  {
    step: 3,
    title: 'ติดตั้ง VS Code และ Extensions',
    desc: 'ติดตั้ง Visual Studio Code พร้อมปลั๊กอินสำคัญ 2 ตัว: "Flutter" และ "Dart" จะช่วยให้มี Auto-complete, Hot Reload, Widget Inspector และ Debugging ครบครัน',
    tip: 'กด Ctrl+Shift+P (หรือ Cmd+Shift+P) แล้วพิมพ์ "Flutter: New Project" เพื่อเริ่มโปรเจกต์ได้ทันที',
    iconName: 'Code2'
  },
  {
    step: 4,
    title: 'สร้างโปรเจกต์แรก (First App)',
    desc: 'สร้างโฟลเดอร์โปรเจกต์ใหม่และสั่งสร้างเทมเพลตมาตรฐาน Flutter จะสร้างโค้ดตัวอย่าง Counter App ให้พร้อมทดสอบ',
    command: 'flutter create my_first_app\ncd my_first_app',
    tip: 'ชื่อโปรเจกต์ต้องเป็นตัวพิมพ์เล็ก คั่นด้วยเครื่องหมาย underscore (_) เท่านั้น เช่น my_first_app',
    iconName: 'FolderPlus'
  },
  {
    step: 5,
    title: 'เปิด Emulator / อุปกรณ์จริง แล้วสั่ง Run',
    desc: 'เปิด Android Emulator หรือเสียบสายมือถือจริง (เปิด USB Debugging) หรือจะรันบน Chrome ก่อนก็ได้ แล้วกดรันเพื่อเริ่มเขียนโค้ด',
    command: 'flutter run',
    tip: 'เมื่อรันอยู่ กดปุ่ม r เพื่อ "Hot Reload" (อัปเดต UI ภายในเสี้ยววินาทีโดยไม่ต้องเริ่มแอปใหม่!)',
    iconName: 'PlayCircle'
  }
];

export const CLI_COMMANDS = [
  { cmd: 'flutter doctor', desc: 'ตรวจเช็คความพร้อมของระบบ เครื่องมือ และ SDK ทั้งหมด' },
  { cmd: 'flutter create <app_name>', desc: 'สร้างโปรเจกต์ใหม่พร้อมไฟล์โครงสร้างครบชุด' },
  { cmd: 'flutter run', desc: 'สั่งรันแอปบนอุปกรณ์ที่เลือก (กด r เพื่อ Hot Reload, R เพื่อ Restart)' },
  { cmd: 'flutter run -d chrome', desc: 'สั่งรันแอปบนเว็บเบราว์เซอร์ Chrome สะดวกและเร็วที่สุดสำหรับผู้เริ่มต้น' },
  { cmd: 'flutter devices', desc: 'แสดงรายการอุปกรณ์ (Emulators, สมาร์ทโฟน, Web) ที่เชื่อมต่ออยู่' },
  { cmd: 'flutter pub get', desc: 'ดาวน์โหลด Package และ Dependencies ที่ระบุไว้ใน pubspec.yaml' },
  { cmd: 'flutter clean', desc: 'ล้างไฟล์ build แคชทิ้ง (มีประโยชน์มากเวลาโปรเจกต์ค้างหรือมีบั๊กประหลาด)' },
  { cmd: 'flutter build apk --release', desc: 'คอมไพล์ไฟล์ APK สำหรับติดตั้งบนอุปกรณ์ Android จริง' }
];

export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'hello_world',
    category: 'basics',
    title: '1. โครงสร้าง main.dart มาตรฐาน (Hello World)',
    subtitle: 'จุดเริ่มต้นของทุกแอป Flutter เข้าใจ runApp() และ MaterialApp',
    description: 'ไฟล์ main.dart คือ Entry Point ของแอปพลิเคชัน โดยฟังก์ชัน main() จะเรียก runApp() เพื่อรัน Root Widget เสมอ',
    code: `import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'แอปแรกของฉัน',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('ยินดีต้อนรับสู่ Flutter'),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
      ),
      body: const Center(
        child: Text(
          'สวัสดีครับ Flutter มือใหม่!',
          style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    notes: [
      'main() คือจุดเริ่มต้นการทำงานของโปรแกรม Dart',
      'runApp() นำ Widget ไปวาดลงบนหน้าจออุปกรณ์',
      'MaterialApp ให้โครงสร้าง Design System ของ Google (Theme, Navigator, Localization)',
      'Scaffold เปรียบเหมือน "โครงร่างหน้าจอ" ที่มี AppBar, Body, Drawer, BottomNavigationBar'
    ],
    tags: ['main.dart', 'StatelessWidget', 'Scaffold', 'MaterialApp']
  },
  {
    id: 'stateful_counter',
    category: 'state',
    title: '2. StatefulWidget & การใช้ setState()',
    subtitle: 'ทำให้หน้าจอโต้ตอบได้ เมื่อค่าตัวแปรเปลี่ยน หน้าจอจะวาดใหม่',
    description: 'เมื่อต้องการให้ UI อัปเดตตามการคลิกหรือการเปลี่ยนค่าของข้อมูล เราต้องใช้ StatefulWidget ควบคู่กับคำสั่ง setState()',
    code: `import 'package:flutter/material.dart';

class CounterPage extends StatefulWidget {
  const CounterPage({super.key});

  @override
  State<CounterPage> createState() => _CounterPageState();
}

class _CounterPageState extends State<CounterPage> {
  int _counter = 0;

  void _incrementCounter() {
    // คำสั่ง setState แจ้งเตือน Flutter ให้รันฟังก์ชัน build() ใหม่อีกครั้ง
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('ตัวนับแต้ม')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('คุณกดปุ่มไปแล้วกี่ครั้ง:', style: TextStyle(fontSize: 18)),
            Text(
              '$_counter',
              style: const TextStyle(fontSize: 48, fontWeight: FontWeight.bold, color: Colors.indigo),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'เพิ่มค่า',
        child: const Icon(Icons.add),
      ),
    );
  }
}`,
    notes: [
      'StatefulWidget แยกออกเป็น 2 คลาส: คลาส Widget และคลาส State',
      'ตัวแปรที่เปลี่ยนแปลงได้ (Mutable State) จะถูกประกาศไว้ในคลาส _State',
      'ห้ามเปลี่ยนค่าตัวแปรโดยไม่เรียก setState() เพราะ UI จะไม่อัปเดตบนหน้าจอ'
    ],
    tags: ['StatefulWidget', 'setState', 'Interactive', 'State']
  },
  {
    id: 'listview_builder',
    category: 'ui',
    title: '3. ListView.builder แสดงรายการข้อมูลแบบไดนามิก',
    subtitle: 'เรนเดอร์ List ขนาดยาวอย่างมีประสิทธิภาพ (Lazy Loading)',
    description: 'เหมาะสำหรับการแสดงรายการสินค้า แชท หรือโพสต์ โดยจะสร้างเฉพาะ Widget ที่กำลังแสดงผลบนหน้าจอ ช่วยประหยัด RAM',
    code: `import 'package:flutter/material.dart';

class ProductListScreen extends StatelessWidget {
  final List<String> products = [
    'แอปเปิ้ลสด (Fuji)',
    'กล้วยหอมทอง',
    'ส้มสายน้ำผึ้ง',
    'แตงโมหวานกรอบ',
    'มะม่วงน้ำดอกไม้',
    'สับปะรดภูแล',
  ];

  ProductListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('รายการผลไม้')),
      body: ListView.builder(
        itemCount: products.length,
        itemBuilder: (context, index) {
          final item = products[index];
          return Card(
            margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            child: ListTile(
              leading: CircleAvatar(
                backgroundColor: Colors.amber.shade100,
                child: Text('\${index + 1}'),
              ),
              title: Text(item, style: const TextStyle(fontWeight: FontWeight.w600)),
              subtitle: Text('รหัสสินค้า: SKU-00\${index + 1}'),
              trailing: const Icon(Icons.arrow_forward_ios, size: 16),
              onTap: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('คุณเลือก: \$item')),
                );
              },
            ),
          );
        },
      ),
    );
  }
}`,
    notes: [
      'itemCount: จำนวนชิ้นทั้งหมดในลิสต์',
      'itemBuilder: ฟังก์ชันที่คืนค่า Widget สำหรับแต่ละ index',
      'Card + ListTile เป็นคู่หูยอดนิยมในการทำ UI แสดงรายการที่สวยงามและเป็นระเบียบ'
    ],
    tags: ['ListView.builder', 'ListTile', 'Card', 'SnackBar']
  },
  {
    id: 'text_field_form',
    category: 'ui',
    title: '4. TextField และ TextEditingController',
    subtitle: 'การรับค่าจากผู้ใช้ การจัดการฟอร์ม และดึงข้อความ',
    description: 'การสร้างช่องกรอกข้อมูล (Input) พร้อมดึงข้อความมาใช้งาน และเคลียร์ค่าเมื่อส่งเสร็จ',
    code: `import 'package:flutter/material.dart';

class InputDemoScreen extends StatefulWidget {
  const InputDemoScreen({super.key});

  @override
  State<InputDemoScreen> createState() => _InputDemoScreenState();
}

class _InputDemoScreenState extends State<InputDemoScreen> {
  // Controller สำหรับควบคุมและดึงค่าจาก TextField
  final TextEditingController _nameController = TextEditingController();
  String _displayName = '';

  @override
  void dispose() {
    // ต้อง dispose controller เสมอเพื่อป้องกัน Memory Leak
    _nameController.dispose();
    super.dispose();
  }

  void _submit() {
    setState(() {
      _displayName = _nameController.text.trim();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('ฟอร์มรับชื่อ')),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            TextField(
              controller: _nameController,
              decoration: InputDecoration(
                labelText: 'ชื่อของคุณ',
                hintText: 'กรุณากรอกชื่อ...',
                prefixIcon: const Icon(Icons.person),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
              ),
            ),
            const SizedBox(height: 16),
            ElevatedButton.icon(
              onPressed: _submit,
              icon: const Icon(Icons.check),
              label: const Text('ยืนยันข้อมูล'),
            ),
            const SizedBox(height: 24),
            if (_displayName.isNotEmpty)
              Text('สวัสดีคุณ: \$_displayName', style: const TextStyle(fontSize: 20, color: Colors.teal)),
          ],
        ),
      ),
    );
  }
}`,
    notes: [
      'TextEditingController ต้องสั่ง .dispose() ในเมธอด dispose() ของ State เสมอ',
      'InputDecoration ใช้ปรับแต่งขอบ สี ไอคอน และข้อความบอกใบ้ (Hint text)',
      'เข้าถึงข้อความในช่องกรอกผ่าน _nameController.text'
    ],
    tags: ['TextField', 'TextEditingController', 'InputDecoration', 'Form']
  },
  {
    id: 'navigation_routes',
    category: 'navigation',
    title: '5. การเปลี่ยนหน้า (Navigator.push & pop)',
    subtitle: 'การสลับหน้าจอ และส่งข้อมูลข้ามหน้าใน Flutter',
    description: 'ระบบ Route เบื้องต้นของ Flutter ใช้แนวคิดแบบ Stack (หน้าใหม่ซ้อนทับหน้าเก่าด้วย push และย้อนกลับด้วย pop)',
    code: `import 'package:flutter/material.dart';

// หน้าแรก (Screen A)
class FirstScreen extends StatelessWidget {
  const FirstScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('หน้าแรก')),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // เดินทางไปหน้าถัดไป (Push)
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => const DetailScreen(message: 'สวัสดีจากหน้าแรก!'),
              ),
            );
          },
          child: const Text('ไปที่หน้ารายละเอียด ->'),
        ),
      ),
    );
  }
}

// หน้าที่สอง (Screen B)
class DetailScreen extends StatelessWidget {
  final String message;
  const DetailScreen({super.key, required this.message});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('หน้ารายละเอียด')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(message, style: const TextStyle(fontSize: 20)),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // ย้อนกลับไปหน้าก่อนหน้า (Pop)
                Navigator.pop(context);
              },
              child: const Text('<- ย้อนกลับ'),
            ),
          ],
        ),
      ),
    );
  }
}`,
    notes: [
      'Navigator.push นำหน้าใหม่มาวางซ้อนบน Navigation Stack',
      'Navigator.pop เอาหน้าจอด้านบนสุดออกเพื่อย้อนกลับ',
      'ส่งข้อมูลไปยังหน้าใหม่ได้ง่ายๆ ผ่าน Constructor ของ Widget ปลายทาง'
    ],
    tags: ['Navigator', 'MaterialPageRoute', 'Routing', 'Push/Pop']
  },
  {
    id: 'pubspec_yaml',
    category: 'basics',
    title: '6. การตั้งค่า pubspec.yaml และใส่รูปภาพ',
    subtitle: 'ศูนย์รวมการลง Package เสริม ฟอนต์ และ Assets รูปภาพ',
    description: 'ไฟล์คอนฟิกหลักของโปรเจกต์ Flutter ต้องระมัดระวังเรื่องการเว้นวรรค (Indentation ห้ามใช้ Tab)',
    code: `name: my_app
description: "A new Flutter project."
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  # เพิ่ม packages เสริมจาก pub.dev เช่น:
  http: ^1.2.0
  shared_preferences: ^2.2.2
  google_fonts: ^6.1.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true

  # เปิดใช้งานรูปภาพในโฟลเดอร์ assets/
  assets:
    - assets/images/
    - assets/icons/logo.png

  # เปิดใช้งานฟอนต์กำหนดเอง
  # fonts:
  #   - family: Prompt
  #     fonts:
  #       - asset: assets/fonts/Prompt-Regular.ttf`,
    notes: [
      'ระวังมาก! YAML ใช้ช่องว่าง (Space) 2 เคาะ ห้ามกด Tab เด็ดขาด',
      'เมื่อแก้ไข pubspec.yaml ให้รัน flutter pub get ทุกครั้งเพื่อดาวน์โหลด',
      'โฟลเดอร์ assets ต้องสร้างไว้ที่ Root นอกโฟลเดอร์ lib'
    ],
    tags: ['pubspec.yaml', 'assets', 'dependencies', 'pub.dev']
  }
];

export const GOTCHAS: GotchaItem[] = [
  {
    id: 'renderflex_overflow',
    title: 'A RenderFlex overflowed by X pixels (แถบเหลืองดำลายเสือ)',
    badge: 'พบบ่อยอันดับ 1',
    symptom: 'หน้าจอแสดงแถบสีเหลืองสลับดำ (Yellow/Black striped bar) พร้อมตัวหนังสือฟ้องว่าเนื้อหาล้นหน้าจอ',
    cause: 'ใส่ Widget ใน Column หรือ Row แล้วเนื้อหายาวเกินขนาดหน้าจอโทรศัพท์ โดยไม่มีตัวรองรับการเลื่อน (Scroll)',
    badCode: `Column(
  children: [
    Container(height: 300, color: Colors.red),
    Container(height: 400, color: Colors.blue),
    Container(height: 300, color: Colors.green), // ล้นหน้าจอแน่นอน!
  ],
)`,
    goodCode: `// วิธีแก้ที่ 1: หุ้มด้วย SingleChildScrollView
SingleChildScrollView(
  child: Column(
    children: [
      Container(height: 300, color: Colors.red),
      Container(height: 400, color: Colors.blue),
      Container(height: 300, color: Colors.green),
    ],
  ),
)

// วิธีแก้ที่ 2: ถ้าต้องการให้แบ่งพื้นที่เท่าๆ กันใช้ Expanded
Row(
  children: [
    const Icon(Icons.star),
    Expanded( // ป้องกันข้อความยาวดันขอบหน้าจอ
      child: Text('ข้อความยาวมากกกกกกกกกกกกกก...'),
    ),
  ],
)`,
    fixExplanation: 'ใช้ SingleChildScrollView เมื่อต้องการให้หน้าจอเลื่อนได้ในแนวตั้ง หรือใช้ Expanded / Flexible เมื่ออยู่ใน Row/Column เพื่อให้ Widget ยืดหยุ่นตามพื้นที่ว่างที่เหลือ',
    tip: 'ใน VS Code วางเคอร์เซอร์ที่ Column แล้วกด Alt+Enter (หรือ Cmd+.) เลือก "Wrap with widget..." แล้วพิมพ์ SingleChildScrollView ได้ใน 2 วินาที!'
  },
  {
    id: 'setstate_after_dispose',
    title: 'setState() called after dispose()',
    badge: 'Async Bug',
    symptom: 'แอปเด้ง Error สีแดงใน Debug Console: "setState() called after dispose(): _MyWidgetState#123(lifecycle state: defunct)"',
    cause: 'มีการเรียกคำสั่ง Async (เช่น รอข้อมูลจาก API หรือ Timer) แล้วผู้ใช้กดเปลี่ยนหน้าหรือปิดหน้านั้นไปก่อนที่คำสั่งจะเสร็จ เมื่อข้อมูลมาถึงแล้วสั่ง setState() แต่หน้าจอนั้นถูกทำลาย (disposed) ไปแล้ว',
    badCode: `void _fetchData() async {
  final data = await http.get(Uri.parse('https://api.example.com/data'));
  // ถ้าผู้ใช้กดย้อนกลับไประหว่างรอ บรรทัดนี้จะพังทันที!
  setState(() {
    _result = data.body;
  });
}`,
    goodCode: `void _fetchData() async {
  final data = await http.get(Uri.parse('https://api.example.com/data'));
  
  // เช็คก่อนว่า Widget นี้ยังแสดงอยู่บนหน้าจอหรือไม่ (mounted)
  if (!mounted) return;
  
  setState(() {
    _result = data.body;
  });
}`,
    fixExplanation: 'เพียงเพิ่มเงื่อนไข `if (!mounted) return;` ก่อนเรียก setState() ในฟังก์ชันที่เป็น async เสมอ',
    tip: 'Dart 3 แนะนำให้ตรวจสอบ mounted เป็น Best Practice เสมอสำหรับ asynchronous callback ใน State class'
  },
  {
    id: 'null_safety_error',
    title: 'Null check operator used on a null value (!)',
    badge: 'Dart Runtime Error',
    symptom: 'แอป Crash พร้อมข้อความ Null check operator used on a null value',
    cause: 'ใช้เครื่องหมาย ! (Bang operator) บังคับบอกโปรแกรมว่าค่านี้ไม่มีทางเป็น null แน่นอน แต่ ณ ตอนรันจริง ค่านั้นกลับเป็น null ขึ้นมาจริงๆ',
    badCode: `String? username; // ตัวแปรนี้อาจเป็น null ได้

// บังคับว่าไม่ null ด้วย !
Text(username!) // หาก username ยังไม่ได้ถูกเซ็ตค่า จะ Crash ทันที!`,
    goodCode: `String? username;

// วิธีที่ 1: ใช้ Null Coalescing (??) กำหนดค่าเริ่มต้นแทน
Text(username ?? 'ผู้เยี่ยมชม')

// วิธีที่ 2: ตรวจสอบแบบปลอดภัย
if (username != null) {
  Text(username);
} else {
  const Text('ไม่มีชื่อ');
}`,
    fixExplanation: 'หลีกเลี่ยงการใช้เครื่องหมาย ! พร่ำเพรื่อ ให้ใช้ ?? เพื่อกำหนด Fallback Default หรือใช้ if ตรวจสอบค่าอย่างรอบคอบ',
    tip: 'เครื่องหมาย ? หมายถึง "อาจเป็นค่าว่างได้", ?? หมายถึง "ถ้าว่างให้ใช้ค่านี้แทน", และ ! หมายถึง "รับประกันว่าไม่ว่างแน่นอน (ถ้าว่างขอพัง)"'
  },
  {
    id: 'incorrect_parent_data',
    title: 'Incorrect use of ParentDataWidget (Expanded / Flexible)',
    badge: 'Layout Error',
    symptom: 'หน้าจอขึ้นจอแดง Error "Incorrect use of ParentDataWidget. Expanded widgets must be placed inside Flex widgets"',
    cause: 'นำ Expanded หรือ Spacer หรือ Flexible ไปวางเป็นลูกของ Widget อื่นที่ไม่ใช่ Row, Column หรือ Flex (เช่น เอาไปวางใต้ Container หรือ Center ตรงๆ)',
    badCode: `Container(
  child: Expanded( // ผิด! Expanded ต้องอยู่ใต้ Row หรือ Column เท่านั้น
    child: Text('Hello'),
  ),
)`,
    goodCode: `Column(
  children: [
    Expanded( // ถูกต้อง! อยู่ใน Column หรือ Row
      child: Container(color: Colors.blue),
    ),
    Container(height: 50, color: Colors.green),
  ],
)`,
    fixExplanation: 'Expanded และ Spacer ถูกออกแบบมาเพื่อคำนวณสัดส่วนของ Flex เท่านั้น ดังนั้นต้องอยู่ใต้ลูกสายตรงของ Row, Column หรือ Flex เสมอ',
    tip: 'ถ้าต้องการให้ Container ขยายเต็มพื้นที่ ให้ใช้ `width: double.infinity` แทน Expanded ได้'
  }
];
