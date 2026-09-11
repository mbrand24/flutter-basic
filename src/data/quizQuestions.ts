import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'ข้อใดคือคำสั่ง Terminal สำหรับตรวจเช็คว่าเครื่องของเราติดตั้งเครื่องมือสำหรับ Flutter ครบถ้วนแล้วหรือไม่?',
    options: [
      'flutter check',
      'flutter doctor',
      'flutter test --all',
      'flutter status'
    ],
    correctAnswer: 1,
    explanation: '`flutter doctor` คือคำสั่งมาตรฐานของ Flutter สำหรับสแกนหาสภาพแวดล้อม (SDK, Android Studio, Xcode, Chrome, VS Code) ว่าพร้อมพัฒนาหรือไม่',
    topic: 'CLI & Setup'
  },
  {
    id: 2,
    question: 'ใน Flutter วลีใดสรุปกฎสถาปัตยกรรมการจัด Layout ของ Widget ได้ถูกต้องที่สุด?',
    options: [
      'Children request size, Parent obeys, Alignment sets margin',
      'Constraints go down, Sizes go up, Parent sets position',
      'Sizes go down, Constraints go up, Child sets position',
      'Widgets render first, Layout calculates later'
    ],
    correctAnswer: 1,
    explanation: 'กฎเหล็กของ Flutter คือ: "Constraints go down (แม่ส่งกรอบข้อจำกัดลงไป), Sizes go up (ลูกแจ้งขนาดที่ต้องการกลับขึ้นมา), Parent sets position (แม่เป็นผู้กำหนดตำแหน่งพิกัด x, y)"',
    topic: 'Layout Concept'
  },
  {
    id: 3,
    question: 'หากต้องการสร้างหน้าจอที่มีปุ่มกดเพิ่มตัวเลขนับแต้ม (Counter) และให้หน้าจออัปเดตตัวเลขใหม่ทันที ควรเลือกใช้ Widget แบบใด?',
    options: [
      'StatelessWidget',
      'StatefulWidget ร่วมกับ setState()',
      'InheritedWidget แบบเดี่ยวๆ',
      'ConstWidget'
    ],
    correctAnswer: 1,
    explanation: 'StatefulWidget ร่วมกับ setState() ใช้สำหรับสร้าง Widget ที่มีข้อมูลเปลี่ยนแปลงได้ (Mutable State) และต้องการสั่งให้ Flutter วาด UI ใหม่ตามค่านั้น',
    topic: 'State Management'
  },
  {
    id: 4,
    question: 'เมื่อใส่รายการ Widget ใน Column แล้วเกิดปัญหา "A RenderFlex overflowed by ... pixels" วิธีแก้ไขที่นิยมที่สุดคืออะไร?',
    options: [
      'เปลี่ยนโทรศัพท์ให้หน้าจอใหญ่ขึ้น',
      'Wrap (หุ้ม) Column ด้วย SingleChildScrollView หรือใช้ Expanded สำหรับพื้นที่ยืดหยุ่น',
      'ลบ AppBar ทิ้งเพื่อให้มีพื้นที่มากขึ้น',
      'เปลี่ยนจาก Column เป็น Row เสมอ'
    ],
    correctAnswer: 1,
    explanation: 'Column เริ่มต้นจะไม่สามารถเลื่อน Scroll ได้ หากเนื้อหาล้น การหุ้มด้วย SingleChildScrollView จะทำให้เลื่อนแนวตั้งได้ หรือใช้ Expanded เพื่อไม่ให้ข้อความดันเกินขอบ',
    topic: 'Error & Debugging'
  },
  {
    id: 5,
    question: 'Widget ใดทำหน้าที่เป็น "โครงร่างมาตรฐานของหน้าจอ" ตามแบบฉบับ Material Design ที่มี AppBar, Body, FloatingActionButton?',
    options: [
      'Container',
      'MaterialApp',
      'Scaffold',
      'Center'
    ],
    correctAnswer: 2,
    explanation: '`Scaffold` คือ Widget โครงร่างสำหรับ 1 หน้าจอ มีช่องสำหรับใส่ appBar, body, floatingActionButton, drawer, bottomNavigationBar ครบวงจร',
    topic: 'Widgets'
  },
  {
    id: 6,
    question: 'คำสั่งใดใช้สำหรับ "ย้อนกลับไปยังหน้าจอก่อนหน้า" ในระบบ Navigation ของ Flutter?',
    options: [
      'Navigator.pop(context);',
      'Navigator.back(context);',
      'Navigator.previous();',
      'Navigator.remove();'
    ],
    correctAnswer: 0,
    explanation: 'ระบบ Routing ของ Flutter ทำงานแบบ Stack ดังนั้นการย้อนกลับจะใช้ `Navigator.pop(context)` ซึ่งเป็นการดึงหน้าจอบนสุดออกจาก Stack',
    topic: 'Navigation'
  },
  {
    id: 7,
    question: 'ในไฟล์ pubspec.yaml ของ Flutter ข้อควรระวังสูงสุดเกี่ยวกับ Syntax คือเรื่องใด?',
    options: [
      'ห้ามใช้ตัวอักษรภาษาอังกฤษพิมพ์ใหญ่',
      'การเว้นวรรค (Indentation) ต้องใช้ Space 2 เคาะ ห้ามกดปุ่ม Tab เด็ดขาด',
      'ต้องปิดท้ายทุกบรรทัดด้วยเซมิโคลอน (;)',
      'ต้องใส่เครื่องหมายปีกกา { } เสมอ'
    ],
    correctAnswer: 1,
    explanation: 'YAML format เข้มงวดมากเรื่องการย่อหน้า (Indentation) หากเผลอใช้ปุ่ม Tab จะทำให้โปรแกรม parse ไม่ผ่านทันที ต้องใช้ Space เสมอ',
    topic: 'Pubspec & Config'
  },
  {
    id: 8,
    question: 'ใน Dart Null Safety เครื่องหมาย `??` ในโค้ด `String name = inputName ?? "ไม่ระบุชื่อ";` มีความหมายอย่างไร?',
    options: [
      'ตรวจสอบว่า inputName เป็นจริงหรือไม่',
      'ถ้า inputName เป็น null ให้ใช้ค่า "ไม่ระบุชื่อ" แทน (If-null operator)',
      'บังคับว่า inputName ห้ามเป็น null เด็ดขาด',
      'เปรียบเทียบว่าเท่ากับ "ไม่ระบุชื่อ" หรือไม่'
    ],
    correctAnswer: 1,
    explanation: '`??` เรียกว่า If-null operator หรือ Null Coalescing Operator ถ้าตัวแปรฝั่งซ้ายเป็น null จะคืนค่าฝั่งขวามาแทน ช่วยป้องกัน NullPointerException ได้อย่างปลอดภัย',
    topic: 'Dart Basics'
  },
  {
    id: 9,
    question: 'หากต้องการแสดงข้อมูลใน List จำนวน 10,000 รายการ โดยไม่ให้แอปกระตุกหรือกิน RAM มหาศาล ควรใช้ Widget ใด?',
    options: [
      'Column(children: list.map(...).toList())',
      'SingleChildScrollView(child: Column(...))',
      'ListView.builder(...)',
      'Row(...)'
    ],
    correctAnswer: 2,
    explanation: '`ListView.builder` ทำงานแบบ On-demand (Lazy rendering) โดยจะสร้างเฉพาะ Widget ที่มองเห็นบนหน้าจอเท่านั้น จึงรองรับข้อมูลหลักหมื่นชิ้นได้อย่างราบรื่น',
    topic: 'Performance & List'
  },
  {
    id: 10,
    question: 'ฟังก์ชันปุ่มลัด (Shortcut) ใดของ Flutter ที่ช่วยอัปเดตการแก้ไขโค้ด UI ไปยังหน้าจอจำลองได้ในเสี้ยววินาทีโดยไม่ต้องปิดแอปเปิดใหม่?',
    options: [
      'Hot Reload (กดปุ่ม r)',
      'Fast Compile',
      'Live Preview',
      'Instant Build'
    ],
    correctAnswer: 0,
    explanation: 'Hot Reload ของ Flutter ใช้เวลาเพียงไม่กี่ร้อยมิลลิวินาทีในการฉีดโค้ดใหม่เข้าไปใน Dart VM โดยที่ State เดิมยังอยู่ครบถ้วน ทำให้การพัฒนาแอปเร็วมาก',
    topic: 'Developer Experience'
  }
];
