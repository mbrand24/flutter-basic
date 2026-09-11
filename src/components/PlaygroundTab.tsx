import React, { useState } from 'react';
import { 
  WidgetType, 
  ContainerProps, 
  RowColumnProps, 
  TextProps, 
  ButtonProps, 
  CardListTileProps, 
  ScaffoldProps,
  StackPositionedProps,
  GridViewProps,
  WrapChipsProps,
  TextFieldFormsProps,
  ImageDecorationProps
} from '../types';
import { 
  Copy, 
  Check, 
  RotateCw, 
  Sliders, 
  Code2, 
  Layers, 
  Sparkles,
  Square,
  Columns,
  Type,
  MousePointer,
  CreditCard,
  Layout,
  Wifi,
  Battery,
  Signal,
  Bell,
  Heart,
  ShoppingCart,
  Star,
  User,
  Home,
  Settings,
  Plus,
  Grid,
  Tag,
  SlidersHorizontal,
  Image as ImageIcon,
  CheckSquare,
  Search,
  CheckCircle2,
  Trash2
} from 'lucide-react';

export const PlaygroundTab: React.FC = () => {
  const [selectedWidget, setSelectedWidget] = useState<WidgetType>('container');
  const [isReloading, setIsReloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'code' | 'docs'>('code');

  // Widget States
  const [containerProps, setContainerProps] = useState<ContainerProps>({
    width: 220,
    height: 180,
    color: '#0284c7', // sky-600
    padding: 16,
    margin: 8,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#38bdf8', // sky-400
    hasShadow: true,
    alignment: 'center',
    childText: 'Hello Flutter Container!'
  });

  const [rowColProps, setRowColProps] = useState<RowColumnProps>({
    direction: 'column',
    mainAxisAlignment: 'center',
    crossAxisAlignment: 'center',
    itemCount: 3,
    spacing: 12
  });

  const [textProps, setTextProps] = useState<TextProps>({
    content: 'Flutter สำหรับมือใหม่ 💙 พัฒนาแอปสวย เร็ว ลื่นไหล',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    letterSpacing: 0,
    textAlign: 'center',
    maxLines: 3,
    overflowEllipsis: false
  });

  const [buttonProps, setButtonProps] = useState<ButtonProps>({
    variant: 'elevated',
    label: 'กดตรงนี้เพื่อเริ่มงาน',
    icon: 'Sparkles',
    bgColor: '#0284c7',
    textColor: '#ffffff',
    borderRadius: 12,
    elevation: 4,
    paddingV: 12,
    paddingH: 24
  });

  const [cardProps, setCardProps] = useState<CardListTileProps>({
    title: 'นายสมชาย เขียนโค้ด',
    subtitle: 'Flutter Developer ระดับเริ่มต้น กำลังศึกษา Widget Tree',
    leadingIcon: 'User',
    trailingIcon: 'Star',
    elevation: 4,
    borderRadius: 16,
    isThreeLine: false
  });

  const [scaffoldProps, setScaffoldProps] = useState<ScaffoldProps>({
    appBarTitle: 'หน้าแรกของแอป',
    appBarColor: '#0284c7',
    bodyBgColor: '#f8fafc',
    showDrawer: true,
    showFAB: true,
    showBottomNav: true,
    centerTitle: false,
    fabIcon: 'Plus'
  });

  // Expanded Widgets States
  const [stackProps, setStackProps] = useState<StackPositionedProps>({
    stackAlignment: 'center',
    badgeTop: -8,
    badgeRight: -8,
    badgeCount: 3,
    avatarSize: 100,
    showBanner: true,
    showStatusDot: true,
    isOnline: true
  });

  const [gridProps, setGridProps] = useState<GridViewProps>({
    crossAxisCount: 2,
    crossAxisSpacing: 10,
    mainAxisSpacing: 10,
    childAspectRatio: 0.9,
    itemCount: 6,
    cardStyle: 'modern'
  });

  const [wrapProps, setWrapProps] = useState<WrapChipsProps>({
    spacing: 8,
    runSpacing: 8,
    alignment: 'start',
    selectedCategory: 'Flutter',
    showAvatar: true,
    showDeleteIcon: false
  });

  const [formProps, setFormProps] = useState<TextFieldFormsProps>({
    label: 'ชื่อบัญชีผู้ใช้ (Username)',
    hintText: 'เช่น flutter_fan_th',
    helperText: 'ใช้อักขระอังกฤษและตัวเลข',
    isFilled: true,
    hasBorder: true,
    borderRadius: 12,
    showPrefixIcon: true,
    showSuffixClear: true,
    isPassword: false,
    switchValue: true,
    sliderValue: 75,
    checkboxValue: true
  });

  const [imageProps, setImageProps] = useState<ImageDecorationProps>({
    fit: 'cover',
    borderRadius: 20,
    hasGradientOverlay: true,
    hasShadow: true,
    aspectRatio: '16/9',
    imageCategory: 'nature'
  });

  const triggerHotReload = () => {
    setIsReloading(true);
    setTimeout(() => setIsReloading(false), 600);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate Dart Code according to current widget
  const generateDartCode = (): string => {
    switch (selectedWidget) {
      case 'container': {
        const hexColor = containerProps.color.replace('#', '');
        const hexBorder = containerProps.borderColor.replace('#', '');
        return `// ตัวอย่างโค้ด Container ใน Flutter
Container(
  width: ${containerProps.width}.0,
  height: ${containerProps.height}.0,
  margin: const EdgeInsets.all(${containerProps.margin}.0),
  padding: const EdgeInsets.all(${containerProps.padding}.0),
  alignment: Alignment.${containerProps.alignment},
  decoration: BoxDecoration(
    color: const Color(0xFF${hexColor.toUpperCase()}),
    borderRadius: BorderRadius.circular(${containerProps.borderRadius}.0),
    border: Border.all(
      color: const Color(0xFF${hexBorder.toUpperCase()}),
      width: ${containerProps.borderWidth}.0,
    ),
    ${containerProps.hasShadow ? `boxShadow: [
      BoxShadow(
        color: Colors.black.withOpacity(0.15),
        blurRadius: 10.0,
        spreadRadius: 2.0,
        offset: const Offset(0, 4),
      ),
    ],` : ''}
  ),
  child: const Text(
    '${containerProps.childText}',
    style: TextStyle(
      color: Colors.white,
      fontSize: 16,
      fontWeight: FontWeight.bold,
    ),
  ),
)`;
      }
      case 'row_column': {
        const widgetName = rowColProps.direction === 'row' ? 'Row' : 'Column';
        return `// ตัวอย่างโค้ด ${widgetName} จัดวางแนวนอน/แนวตั้ง
${widgetName}(
  mainAxisAlignment: MainAxisAlignment.${rowColProps.mainAxisAlignment},
  crossAxisAlignment: CrossAxisAlignment.${rowColProps.crossAxisAlignment},
  children: [
${Array.from({ length: rowColProps.itemCount }).map((_, i) => `    Container(
      width: ${rowColProps.direction === 'row' ? '60' : '180'},
      height: ${rowColProps.direction === 'row' ? '60' : '45'},
      decoration: BoxDecoration(
        color: Colors.blue[${(i + 4) * 100}],
        borderRadius: BorderRadius.circular(8),
      ),
      child: Center(
        child: Text('ชิ้นที่ ${i + 1}', style: const TextStyle(color: Colors.white)),
      ),
    ),`).join(`\n    const SizedBox(${rowColProps.direction === 'row' ? `width: ${rowColProps.spacing}` : `height: ${rowColProps.spacing}`}),\n`)}
  ],
)`;
      }
      case 'text': {
        const hexColor = textProps.color.replace('#', '');
        return `// ตัวอย่างโค้ด Text และ TextStyle
Text(
  '${textProps.content}',
  textAlign: TextAlign.${textProps.textAlign},
  maxLines: ${textProps.maxLines},
  ${textProps.overflowEllipsis ? `overflow: TextOverflow.ellipsis,` : ''}
  style: TextStyle(
    fontSize: ${textProps.fontSize}.0,
    fontWeight: FontWeight.${textProps.fontWeight},
    color: const Color(0xFF${hexColor.toUpperCase()}),
    letterSpacing: ${textProps.letterSpacing}.0,
  ),
)`;
      }
      case 'button': {
        const hexBg = buttonProps.bgColor.replace('#', '');
        const hexText = buttonProps.textColor.replace('#', '');
        if (buttonProps.variant === 'elevated') {
          return `// ตัวอย่าง ElevatedButton พร้อมปรับ Style
ElevatedButton.icon(
  onPressed: () {
    print('กดปุ่มแล้ว!');
  },
  icon: const Icon(Icons.flash_on),
  label: const Text('${buttonProps.label}'),
  style: ElevatedButton.styleFrom(
    backgroundColor: const Color(0xFF${hexBg.toUpperCase()}),
    foregroundColor: const Color(0xFF${hexText.toUpperCase()}),
    elevation: ${buttonProps.elevation}.0,
    padding: const EdgeInsets.symmetric(
      vertical: ${buttonProps.paddingV}.0,
      horizontal: ${buttonProps.paddingH}.0,
    ),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(${buttonProps.borderRadius}.0),
    ),
  ),
)`;
        } else if (buttonProps.variant === 'outlined') {
          return `// ตัวอย่าง OutlinedButton แบบมีเส้นขอบ
OutlinedButton.icon(
  onPressed: () {},
  icon: const Icon(Icons.flash_on),
  label: const Text('${buttonProps.label}'),
  style: OutlinedButton.styleFrom(
    foregroundColor: const Color(0xFF${hexBg.toUpperCase()}),
    side: const BorderSide(color: const Color(0xFF${hexBg.toUpperCase()}), width: 2),
    padding: const EdgeInsets.symmetric(
      vertical: ${buttonProps.paddingV}.0,
      horizontal: ${buttonProps.paddingH}.0,
    ),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(${buttonProps.borderRadius}.0),
    ),
  ),
)`;
        } else {
          return `// ตัวอย่าง TextButton แบบไม่มีพื้นหลัง
TextButton.icon(
  onPressed: () {},
  icon: const Icon(Icons.flash_on),
  label: const Text('${buttonProps.label}'),
  style: TextButton.styleFrom(
    foregroundColor: const Color(0xFF${hexBg.toUpperCase()}),
  ),
)`;
        }
      }
      case 'card_listtile': {
        return `// ตัวอย่าง Card + ListTile
Card(
  elevation: ${cardProps.elevation}.0,
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(${cardProps.borderRadius}.0),
  ),
  child: ListTile(
    leading: const CircleAvatar(
      backgroundColor: Colors.blueAccent,
      child: Icon(Icons.person, color: Colors.white),
    ),
    title: const Text(
      '${cardProps.title}',
      style: TextStyle(fontWeight: FontWeight.bold),
    ),
    subtitle: const Text('${cardProps.subtitle}'),
    trailing: const Icon(Icons.star, color: Colors.amber),
    onTap: () {
      print('แตะที่รายการนี้');
    },
  ),
)`;
      }
      case 'scaffold': {
        const hexAppBar = scaffoldProps.appBarColor.replace('#', '');
        return `// โครงสร้างหน้าจอหลัก Scaffold + AppBar
Scaffold(
  backgroundColor: Colors.grey[100],
  appBar: AppBar(
    title: const Text('${scaffoldProps.appBarTitle}'),
    centerTitle: ${scaffoldProps.centerTitle},
    backgroundColor: const Color(0xFF${hexAppBar.toUpperCase()}),
    foregroundColor: Colors.white,
    ${scaffoldProps.showDrawer ? `// Flutter จะใส่ไอคอน Hamburger ให้เองอัตโนมัติเมื่อมี drawer` : ''}
  ),
  ${scaffoldProps.showDrawer ? `drawer: const Drawer(
    child: Center(child: Text('เมนูด้านข้าง (Drawer)')),
  ),` : ''}
  body: const Center(
    child: Text('เนื้อหาหลักของหน้าจอ (Body)'),
  ),
  ${scaffoldProps.showFAB ? `floatingActionButton: FloatingActionButton(
    onPressed: () {},
    backgroundColor: const Color(0xFF${hexAppBar.toUpperCase()}),
    child: const Icon(Icons.add, color: Colors.white),
  ),` : ''}
  ${scaffoldProps.showBottomNav ? `bottomNavigationBar: BottomNavigationBar(
    items: const [
      BottomNavigationBarItem(icon: Icon(Icons.home), label: 'หน้าแรก'),
      BottomNavigationBarItem(icon: Icon(Icons.search), label: 'ค้นหา'),
      BottomNavigationBarItem(icon: Icon(Icons.person), label: 'โปรไฟล์'),
    ],
  ),` : ''}
)`;
      }

      case 'stack_positioned': {
        return `// ตัวอย่างโค้ด Stack & Positioned ใน Flutter
Stack(
  alignment: Alignment.${stackProps.stackAlignment},
  clipBehavior: Clip.none,
  children: [
    // 1. วิดเจ็ตฐานล่างสุด: กรอบโปรไฟล์ Avatar
    CircleAvatar(
      radius: ${(stackProps.avatarSize / 2)}.0,
      backgroundColor: Colors.skyBlue,
      child: const Icon(Icons.person, size: 50, color: Colors.white),
    ),
    // 2. ซ้อน Badge แจ้งเตือนด้วย Positioned
    Positioned(
      top: ${stackProps.badgeTop}.0,
      right: ${stackProps.badgeRight}.0,
      child: Container(
        padding: const EdgeInsets.all(6),
        decoration: const BoxDecoration(
          color: Colors.redAccent,
          shape: BoxShape.circle,
        ),
        child: Text(
          '${stackProps.badgeCount}',
          style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
        ),
      ),
    ),
    ${stackProps.showStatusDot ? `// 3. จุดสถานะ Online ที่มุมล่าง
    Positioned(
      bottom: 2.0,
      right: 2.0,
      child: Container(
        width: 16.0,
        height: 16.0,
        decoration: BoxDecoration(
          color: ${stackProps.isOnline ? 'Colors.greenAccent' : 'Colors.grey'},
          shape: BoxShape.circle,
          border: Border.all(color: Colors.white, width: 2.5),
        ),
      ),
    ),` : ''}
  ],
)`;
      }

      case 'gridview': {
        return `// ตัวอย่างโค้ด GridView.builder ใน Flutter
GridView.builder(
  padding: const EdgeInsets.all(12.0),
  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: ${gridProps.crossAxisCount}, // จำนวนคอลัมน์
    crossAxisSpacing: ${gridProps.crossAxisSpacing}.0, // ช่องว่างแนวนอน
    mainAxisSpacing: ${gridProps.mainAxisSpacing}.0,   // ช่องว่างแนวตั้ง
    childAspectRatio: ${gridProps.childAspectRatio}, // อัตราส่วน กว้าง/สูง
  ),
  itemCount: ${gridProps.itemCount},
  itemBuilder: (context, index) {
    return Card(
      elevation: 3,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16.0),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.widgets, size: 36, color: Theme.of(context).primaryColor),
          const SizedBox(height: 8),
          Text(
            'ไอเทม \${index + 1}',
            style: const TextStyle(fontWeight: FontWeight.bold),
          ),
          const Text('฿ 290', style: TextStyle(color: Colors.grey, fontSize: 12)),
        ],
      ),
    );
  },
)`;
      }

      case 'wrap_chips': {
        return `// ตัวอย่างโค้ด Wrap & Chip ใน Flutter (แก้ปัญหา Row ล้นขอบจอ!)
Wrap(
  spacing: ${wrapProps.spacing}.0,       // ระยะห่างระหว่างชิปในแถวเดียวกัน
  runSpacing: ${wrapProps.runSpacing}.0, // ระยะห่างระหว่างแถวใหม่
  alignment: WrapAlignment.${wrapProps.alignment},
  children: [
    'Flutter', 'Dart', 'State', 'Provider', 'Widget', 'Clean Code'
  ].map((tag) {
    final isSelected = tag == '${wrapProps.selectedCategory}';
    return ChoiceChip(
      label: Text(tag),
      selected: isSelected,
      ${wrapProps.showAvatar ? `avatar: CircleAvatar(
        backgroundColor: isSelected ? Colors.white : Colors.blue.shade100,
        child: Text(tag[0], style: const TextStyle(fontSize: 10)),
      ),` : ''}
      onSelected: (selected) {
        // อัปเดตสถานะเลือกชิป
      },
    );
  }).toList(),
)`;
      }

      case 'textfield_forms': {
        return `// ตัวอย่างโค้ด TextField & Form Controls ใน Flutter
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    // ช่องกรอกข้อความพร้อม InputDecoration
    TextField(
      obscureText: ${formProps.isPassword},
      decoration: InputDecoration(
        labelText: '${formProps.label}',
        hintText: '${formProps.hintText}',
        helperText: '${formProps.helperText}',
        filled: ${formProps.isFilled},
        ${formProps.showPrefixIcon ? `prefixIcon: const Icon(Icons.person),` : ''}
        ${formProps.showSuffixClear ? `suffixIcon: IconButton(
          icon: const Icon(Icons.clear),
          onPressed: () {},
        ),` : ''}
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(${formProps.borderRadius}.0),
        ),
      ),
    ),
    const SizedBox(height: 12),
    // สวิตช์เปิด-ปิด
    SwitchListTile(
      title: const Text('เปิดใช้งานการแจ้งเตือน'),
      value: ${formProps.switchValue},
      onChanged: (val) {},
    ),
    // ตัวเลื่อน Slider
    Slider(
      value: ${formProps.sliderValue}.0,
      min: 0,
      max: 100,
      divisions: 10,
      label: '${formProps.sliderValue}',
      onChanged: (val) {},
    ),
  ],
)`;
      }

      case 'image_decoration': {
        return `// ตัวอย่างโค้ด Image & BoxDecoration พร้อม Gradient
Container(
  width: double.infinity,
  height: 200.0,
  decoration: BoxDecoration(
    borderRadius: BorderRadius.circular(${imageProps.borderRadius}.0),
    ${imageProps.hasShadow ? `boxShadow: [
      BoxShadow(
        color: Colors.black.withOpacity(0.2),
        blurRadius: 12,
        offset: const Offset(0, 6),
      ),
    ],` : ''}
    image: const DecorationImage(
      image: NetworkImage('https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?w=600'),
      fit: BoxFit.${imageProps.fit},
    ),
  ),
  child: ${imageProps.hasGradientOverlay ? `Container(
    decoration: BoxDecoration(
      borderRadius: BorderRadius.circular(${imageProps.borderRadius}.0),
      gradient: LinearGradient(
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
        colors: [
          Colors.transparent,
          Colors.black.withOpacity(0.75),
        ],
      ),
    ),
    padding: const EdgeInsets.all(16.0),
    alignment: Alignment.bottomLeft,
    child: const Text(
      'ภาพปกแอปที่น่าประทับใจ ✨',
      style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
    ),
  )` : 'null'},
)`;
      }
    }
  };

  const widgetMenu = [
    { id: 'container' as WidgetType, label: 'Container', icon: Square, desc: 'กล่องปรับขนาด สี ขอบ เงา' },
    { id: 'row_column' as WidgetType, label: 'Row & Column', icon: Columns, desc: 'จัดเรียงแนวนอน / แนวตั้ง' },
    { id: 'stack_positioned' as WidgetType, label: 'Stack & Positioned', icon: Layers, desc: 'วางซ้อนทับ เลเยอร์ บาดจ์' },
    { id: 'gridview' as WidgetType, label: 'GridView', icon: Grid, desc: 'ตารางสินค้า 2-4 คอลัมน์' },
    { id: 'wrap_chips' as WidgetType, label: 'Wrap & Chips', icon: Tag, desc: 'แท็กสินค้า ไร้ปัญหาขอบล้น' },
    { id: 'textfield_forms' as WidgetType, label: 'Form & Inputs', icon: SlidersHorizontal, desc: 'TextField, Switch, Slider' },
    { id: 'image_decoration' as WidgetType, label: 'Image & Deco', icon: ImageIcon, desc: 'รูปภาพ BoxFit & Gradient' },
    { id: 'text' as WidgetType, label: 'Text & TextStyle', icon: Type, desc: 'ข้อความ ขนาดฟอนต์ สี จัดชิด' },
    { id: 'button' as WidgetType, label: 'Buttons', icon: MousePointer, desc: 'ปุ่มกด Elevated / Outlined' },
    { id: 'card_listtile' as WidgetType, label: 'Card & ListTile', icon: CreditCard, desc: 'การ์ดและแถวรายการยอดนิยม' },
    { id: 'scaffold' as WidgetType, label: 'Scaffold & AppBar', icon: Layout, desc: 'โครงสร้างหน้าจอหลัก' }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sliders className="w-6 h-6 text-sky-400" />
            Interactive Widget Playground
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            ปรับเปลี่ยนคุณสมบัติ (Properties) ทางซ้าย สังเกตผลลัพธ์บนมือถือทันที พร้อมรับโค้ด Dart ไปใช้ได้เลย
          </p>
        </div>

        {/* Hot reload simulator button */}
        <button
          onClick={triggerHotReload}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 text-xs font-semibold transition"
          title="จำลองฟังก์ชัน Hot Reload ของ Flutter"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isReloading ? 'animate-spin text-sky-400' : ''}`} />
          <span>จำลอง Hot Reload (r)</span>
        </button>
      </div>

      {/* Widget Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {widgetMenu.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedWidget === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedWidget(item.id)}
              className={`p-3 rounded-xl text-left border transition-all ${
                isSelected
                  ? 'bg-sky-500/15 border-sky-400 text-white shadow-md shadow-sky-500/10 ring-1 ring-sky-400/50'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-sky-400' : 'text-slate-400'}`} />
                <span className="text-sm font-bold truncate">{item.label}</span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-1">{item.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Main Studio Area: Split into 3 Columns on Large Screens */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Properties Controls (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-sky-400" />
              ปรับแต่ง {selectedWidget.toUpperCase()}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              Live Inspector
            </span>
          </div>

          {/* Controls for Container */}
          {selectedWidget === 'container' && (
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>ความกว้าง (width):</span>
                  <span className="font-mono text-sky-400">{containerProps.width} px</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="280"
                  value={containerProps.width}
                  onChange={(e) => setContainerProps({ ...containerProps, width: Number(e.target.value) })}
                  className="w-full accent-sky-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>ความสูง (height):</span>
                  <span className="font-mono text-sky-400">{containerProps.height} px</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="240"
                  value={containerProps.height}
                  onChange={(e) => setContainerProps({ ...containerProps, height: Number(e.target.value) })}
                  className="w-full accent-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">สีพื้นหลัง (color):</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={containerProps.color}
                      onChange={(e) => setContainerProps({ ...containerProps, color: e.target.value })}
                      className="w-8 h-8 rounded border border-slate-700 cursor-pointer bg-transparent"
                    />
                    <span className="font-mono text-slate-400">{containerProps.color}</span>
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">สีเส้นขอบ (border):</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={containerProps.borderColor}
                      onChange={(e) => setContainerProps({ ...containerProps, borderColor: e.target.value })}
                      className="w-8 h-8 rounded border border-slate-700 cursor-pointer bg-transparent"
                    />
                    <span className="font-mono text-slate-400">{containerProps.borderColor}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>รัศมีความโค้งมน (borderRadius):</span>
                  <span className="font-mono text-sky-400">{containerProps.borderRadius} px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={containerProps.borderRadius}
                  onChange={(e) => setContainerProps({ ...containerProps, borderRadius: Number(e.target.value) })}
                  className="w-full accent-sky-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>ระยะขอบใน (padding):</span>
                  <span className="font-mono text-sky-400">{containerProps.padding} px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="32"
                  value={containerProps.padding}
                  onChange={(e) => setContainerProps({ ...containerProps, padding: Number(e.target.value) })}
                  className="w-full accent-sky-500"
                />
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">เปิดเงา (boxShadow):</span>
                <input
                  type="checkbox"
                  checked={containerProps.hasShadow}
                  onChange={(e) => setContainerProps({ ...containerProps, hasShadow: e.target.checked })}
                  className="w-4 h-4 rounded accent-sky-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">ข้อความลูก (child):</label>
                <input
                  type="text"
                  value={containerProps.childText}
                  onChange={(e) => setContainerProps({ ...containerProps, childText: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-400 outline-none"
                />
              </div>
            </div>
          )}

          {/* Controls for Row & Column */}
          {selectedWidget === 'row_column' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1.5 font-semibold">ทิศทางการจัดเรียง (Direction):</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setRowColProps({ ...rowColProps, direction: 'column' })}
                    className={`py-2 px-3 rounded-lg font-medium border text-center transition ${
                      rowColProps.direction === 'column'
                        ? 'bg-sky-500 text-white border-sky-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Column (แนวตั้ง ↕)
                  </button>
                  <button
                    onClick={() => setRowColProps({ ...rowColProps, direction: 'row' })}
                    className={`py-2 px-3 rounded-lg font-medium border text-center transition ${
                      rowColProps.direction === 'row'
                        ? 'bg-sky-500 text-white border-sky-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Row (แนวนอน ↔)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">
                  MainAxisAlignment ({rowColProps.direction === 'column' ? 'แกนหลัก: แนวตั้ง' : 'แกนหลัก: แนวนอน'}):
                </label>
                <select
                  value={rowColProps.mainAxisAlignment}
                  onChange={(e) => setRowColProps({ ...rowColProps, mainAxisAlignment: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-400 outline-none cursor-pointer"
                >
                  <option value="center">center (รวมไว้ตรงกลาง)</option>
                  <option value="start">start (ชิดจุดเริ่มต้น)</option>
                  <option value="end">end (ชิดปลายสุด)</option>
                  <option value="spaceBetween">spaceBetween (กระจายชิดขอบนอก)</option>
                  <option value="spaceAround">spaceAround (กระจายมีช่องว่างรอบ)</option>
                  <option value="spaceEvenly">spaceEvenly (แบ่งช่องไฟเท่ากันหมด)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">
                  CrossAxisAlignment ({rowColProps.direction === 'column' ? 'แกนรอง: แนวนอน' : 'แกนรอง: แนวตั้ง'}):
                </label>
                <select
                  value={rowColProps.crossAxisAlignment}
                  onChange={(e) => setRowColProps({ ...rowColProps, crossAxisAlignment: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-400 outline-none cursor-pointer"
                >
                  <option value="center">center (จัดกึ่งกลางแกนรอง)</option>
                  <option value="start">start (ชิดซ้าย/ชิดบน)</option>
                  <option value="end">end (ชิดขวา/ชิดล่าง)</option>
                  <option value="stretch">stretch (ยืดเต็มความกว้างแกนรอง)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>จำนวนชิ้นลูก (Children Count):</span>
                  <span className="font-mono text-sky-400">{rowColProps.itemCount} ชิ้น</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="5"
                  value={rowColProps.itemCount}
                  onChange={(e) => setRowColProps({ ...rowColProps, itemCount: Number(e.target.value) })}
                  className="w-full accent-sky-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>ระยะห่าง (SizedBox Spacing):</span>
                  <span className="font-mono text-sky-400">{rowColProps.spacing} px</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="24"
                  value={rowColProps.spacing}
                  onChange={(e) => setRowColProps({ ...rowColProps, spacing: Number(e.target.value) })}
                  className="w-full accent-sky-500"
                />
              </div>
            </div>
          )}

          {/* Controls for Text */}
          {selectedWidget === 'text' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">ข้อความ (content):</label>
                <textarea
                  rows={2}
                  value={textProps.content}
                  onChange={(e) => setTextProps({ ...textProps, content: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-400 outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>ขนาดฟอนต์ (fontSize):</span>
                  <span className="font-mono text-sky-400">{textProps.fontSize} pt</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="36"
                  value={textProps.fontSize}
                  onChange={(e) => setTextProps({ ...textProps, fontSize: Number(e.target.value) })}
                  className="w-full accent-sky-500"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">ความหนา (fontWeight):</label>
                <select
                  value={textProps.fontWeight}
                  onChange={(e) => setTextProps({ ...textProps, fontWeight: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-400 outline-none cursor-pointer"
                >
                  <option value="w300">FontWeight.w300 (บาง)</option>
                  <option value="normal">FontWeight.normal (ปกติ 400)</option>
                  <option value="w600">FontWeight.w600 (กึ่งหนา)</option>
                  <option value="bold">FontWeight.bold (หนา 700)</option>
                  <option value="w800">FontWeight.w800 (หนาพิเศษ)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">การจัดวาง (textAlign):</label>
                  <select
                    value={textProps.textAlign}
                    onChange={(e) => setTextProps({ ...textProps, textAlign: e.target.value as any })}
                    className="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-400 outline-none cursor-pointer"
                  >
                    <option value="left">TextAlign.left</option>
                    <option value="center">TextAlign.center</option>
                    <option value="right">TextAlign.right</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">สีตัวอักษร (color):</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={textProps.color}
                      onChange={(e) => setTextProps({ ...textProps, color: e.target.value })}
                      className="w-8 h-8 rounded border border-slate-700 cursor-pointer bg-transparent"
                    />
                    <span className="font-mono text-slate-400">{textProps.color}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Controls for Button */}
          {selectedWidget === 'button' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1.5 font-semibold">ประเภทปุ่ม (Button Variant):</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['elevated', 'outlined', 'text'] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setButtonProps({ ...buttonProps, variant: v })}
                      className={`py-1.5 px-2 rounded-lg font-medium border text-center capitalize transition ${
                        buttonProps.variant === v
                          ? 'bg-sky-500 text-white border-sky-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">ข้อความบนปุ่ม (label):</label>
                <input
                  type="text"
                  value={buttonProps.label}
                  onChange={(e) => setButtonProps({ ...buttonProps, label: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">สีปุ่ม (backgroundColor):</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={buttonProps.bgColor}
                      onChange={(e) => setButtonProps({ ...buttonProps, bgColor: e.target.value })}
                      className="w-8 h-8 rounded border border-slate-700 cursor-pointer bg-transparent"
                    />
                    <span className="font-mono text-slate-400">{buttonProps.bgColor}</span>
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">สีตัวหนังสือ:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={buttonProps.textColor}
                      onChange={(e) => setButtonProps({ ...buttonProps, textColor: e.target.value })}
                      className="w-8 h-8 rounded border border-slate-700 cursor-pointer bg-transparent"
                    />
                    <span className="font-mono text-slate-400">{buttonProps.textColor}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>รัศมีความโค้งมน (borderRadius):</span>
                  <span className="font-mono text-sky-400">{buttonProps.borderRadius} px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={buttonProps.borderRadius}
                  onChange={(e) => setButtonProps({ ...buttonProps, borderRadius: Number(e.target.value) })}
                  className="w-full accent-sky-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>ระดับความนูนเงา (elevation):</span>
                  <span className="font-mono text-sky-400">{buttonProps.elevation} dp</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={buttonProps.elevation}
                  onChange={(e) => setButtonProps({ ...buttonProps, elevation: Number(e.target.value) })}
                  className="w-full accent-sky-500"
                />
              </div>
            </div>
          )}

          {/* Controls for Card & ListTile */}
          {selectedWidget === 'card_listtile' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">หัวข้อหลัก (title):</label>
                <input
                  type="text"
                  value={cardProps.title}
                  onChange={(e) => setCardProps({ ...cardProps, title: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-400 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">คำอธิบายย่อย (subtitle):</label>
                <textarea
                  rows={2}
                  value={cardProps.subtitle}
                  onChange={(e) => setCardProps({ ...cardProps, subtitle: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-400 outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>ระดับความนูนของ Card (elevation):</span>
                  <span className="font-mono text-sky-400">{cardProps.elevation}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={cardProps.elevation}
                  onChange={(e) => setCardProps({ ...cardProps, elevation: Number(e.target.value) })}
                  className="w-full accent-sky-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>รัศมีความโค้งมนของการ์ด:</span>
                  <span className="font-mono text-sky-400">{cardProps.borderRadius} px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="28"
                  value={cardProps.borderRadius}
                  onChange={(e) => setCardProps({ ...cardProps, borderRadius: Number(e.target.value) })}
                  className="w-full accent-sky-500"
                />
              </div>
            </div>
          )}

          {/* Controls for Scaffold & AppBar */}
          {selectedWidget === 'scaffold' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">ชื่อบน AppBar (title):</label>
                <input
                  type="text"
                  value={scaffoldProps.appBarTitle}
                  onChange={(e) => setScaffoldProps({ ...scaffoldProps, appBarTitle: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-400 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">สีแถบ AppBar (backgroundColor):</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={scaffoldProps.appBarColor}
                    onChange={(e) => setScaffoldProps({ ...scaffoldProps, appBarColor: e.target.value })}
                    className="w-8 h-8 rounded border border-slate-700 cursor-pointer bg-transparent"
                  />
                  <span className="font-mono text-slate-400">{scaffoldProps.appBarColor}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="flex items-center justify-between text-slate-300 cursor-pointer">
                  <span>จัดชื่อกึ่งกลาง (centerTitle)</span>
                  <input
                    type="checkbox"
                    checked={scaffoldProps.centerTitle}
                    onChange={(e) => setScaffoldProps({ ...scaffoldProps, centerTitle: e.target.checked })}
                    className="w-4 h-4 rounded accent-sky-500"
                  />
                </label>

                <label className="flex items-center justify-between text-slate-300 cursor-pointer">
                  <span>แสดงปุ่มบวกมุมขวาล่าง (FloatingActionButton)</span>
                  <input
                    type="checkbox"
                    checked={scaffoldProps.showFAB}
                    onChange={(e) => setScaffoldProps({ ...scaffoldProps, showFAB: e.target.checked })}
                    className="w-4 h-4 rounded accent-sky-500"
                  />
                </label>

                <label className="flex items-center justify-between text-slate-300 cursor-pointer">
                  <span>แสดงแถบเมนูด้านล่าง (BottomNavigationBar)</span>
                  <input
                    type="checkbox"
                    checked={scaffoldProps.showBottomNav}
                    onChange={(e) => setScaffoldProps({ ...scaffoldProps, showBottomNav: e.target.checked })}
                    className="w-4 h-4 rounded accent-sky-500"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Controls for Stack & Positioned */}
          {selectedWidget === 'stack_positioned' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">การจัดวางตำแหน่งหลัก (alignment):</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['topStart', 'center', 'bottomEnd'] as const).map((align) => (
                    <button
                      key={align}
                      onClick={() => setStackProps({ ...stackProps, stackAlignment: align })}
                      className={`py-1.5 px-2 rounded-lg font-mono text-[11px] border transition ${
                        stackProps.stackAlignment === align
                          ? 'bg-sky-500 text-white border-sky-400 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>ขนาดรูป Avatar:</span>
                  <span className="font-mono text-sky-400">{stackProps.avatarSize} px</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="140"
                  value={stackProps.avatarSize}
                  onChange={(e) => setStackProps({ ...stackProps, avatarSize: Number(e.target.value) })}
                  className="w-full accent-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Positioned top:</span>
                    <span className="font-mono text-sky-400">{stackProps.badgeTop} px</span>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="40"
                    value={stackProps.badgeTop}
                    onChange={(e) => setStackProps({ ...stackProps, badgeTop: Number(e.target.value) })}
                    className="w-full accent-sky-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Positioned right:</span>
                    <span className="font-mono text-sky-400">{stackProps.badgeRight} px</span>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="40"
                    value={stackProps.badgeRight}
                    onChange={(e) => setStackProps({ ...stackProps, badgeRight: Number(e.target.value) })}
                    className="w-full accent-sky-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>ตัวเลขบน Badge:</span>
                  <span className="font-mono text-sky-400">{stackProps.badgeCount}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="99"
                  value={stackProps.badgeCount}
                  onChange={(e) => setStackProps({ ...stackProps, badgeCount: Number(e.target.value) })}
                  className="w-full accent-sky-500"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="flex items-center justify-between text-slate-300 cursor-pointer">
                  <span>แสดงจุดสถานะออนไลน์ (Online Dot)</span>
                  <input
                    type="checkbox"
                    checked={stackProps.showStatusDot}
                    onChange={(e) => setStackProps({ ...stackProps, showStatusDot: e.target.checked })}
                    className="w-4 h-4 rounded accent-sky-500"
                  />
                </label>
                {stackProps.showStatusDot && (
                  <label className="flex items-center justify-between text-slate-300 cursor-pointer">
                    <span>สถานะกำลังออนไลน์ (สีเขียว)</span>
                    <input
                      type="checkbox"
                      checked={stackProps.isOnline}
                      onChange={(e) => setStackProps({ ...stackProps, isOnline: e.target.checked })}
                      className="w-4 h-4 rounded accent-sky-500"
                    />
                  </label>
                )}
              </div>
            </div>
          )}

          {/* Controls for GridView */}
          {selectedWidget === 'gridview' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">จำนวนคอลัมน์ (crossAxisCount):</label>
                <div className="grid grid-cols-3 gap-2">
                  {([2, 3, 4] as const).map((count) => (
                    <button
                      key={count}
                      onClick={() => setGridProps({ ...gridProps, crossAxisCount: count })}
                      className={`py-1.5 rounded-lg font-mono border transition ${
                        gridProps.crossAxisCount === count
                          ? 'bg-sky-500 text-white border-sky-400 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {count} คอลัมน์
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>อัตราส่วน กว้าง/สูง (childAspectRatio):</span>
                  <span className="font-mono text-sky-400">{gridProps.childAspectRatio}</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.5"
                  step="0.1"
                  value={gridProps.childAspectRatio}
                  onChange={(e) => setGridProps({ ...gridProps, childAspectRatio: Number(e.target.value) })}
                  className="w-full accent-sky-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5 font-mono">
                  <span>0.6 (การ์ดยาว)</span>
                  <span>1.0 (สี่เหลี่ยมจัตุรัส)</span>
                  <span>1.5 (การ์ดกว้าง)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>ระยะห่างแนวนอน:</span>
                    <span className="font-mono text-sky-400">{gridProps.crossAxisSpacing}px</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="20"
                    value={gridProps.crossAxisSpacing}
                    onChange={(e) => setGridProps({ ...gridProps, crossAxisSpacing: Number(e.target.value) })}
                    className="w-full accent-sky-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>ระยะห่างแนวตั้ง:</span>
                    <span className="font-mono text-sky-400">{gridProps.mainAxisSpacing}px</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="20"
                    value={gridProps.mainAxisSpacing}
                    onChange={(e) => setGridProps({ ...gridProps, mainAxisSpacing: Number(e.target.value) })}
                    className="w-full accent-sky-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>จำนวนไอเทมทั้งหมด:</span>
                  <span className="font-mono text-sky-400">{gridProps.itemCount} ชิ้น</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  value={gridProps.itemCount}
                  onChange={(e) => setGridProps({ ...gridProps, itemCount: Number(e.target.value) })}
                  className="w-full accent-sky-500"
                />
              </div>
            </div>
          )}

          {/* Controls for Wrap & Chips */}
          {selectedWidget === 'wrap_chips' && (
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>ระยะห่างแนวนอน (spacing):</span>
                  <span className="font-mono text-sky-400">{wrapProps.spacing} px</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="20"
                  value={wrapProps.spacing}
                  onChange={(e) => setWrapProps({ ...wrapProps, spacing: Number(e.target.value) })}
                  className="w-full accent-sky-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>ระยะห่างแนวตั้ง (runSpacing):</span>
                  <span className="font-mono text-sky-400">{wrapProps.runSpacing} px</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="20"
                  value={wrapProps.runSpacing}
                  onChange={(e) => setWrapProps({ ...wrapProps, runSpacing: Number(e.target.value) })}
                  className="w-full accent-sky-500"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">การจัดชิดแนวนอน (alignment):</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['start', 'center', 'end', 'spaceBetween'] as const).map((align) => (
                    <button
                      key={align}
                      onClick={() => setWrapProps({ ...wrapProps, alignment: align })}
                      className={`py-1.5 px-2 rounded-lg font-mono text-[11px] border transition ${
                        wrapProps.alignment === align
                          ? 'bg-sky-500 text-white border-sky-400 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="flex items-center justify-between text-slate-300 cursor-pointer">
                  <span>แสดง Avatar ในชิป</span>
                  <input
                    type="checkbox"
                    checked={wrapProps.showAvatar}
                    onChange={(e) => setWrapProps({ ...wrapProps, showAvatar: e.target.checked })}
                    className="w-4 h-4 rounded accent-sky-500"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Controls for TextField & Forms */}
          {selectedWidget === 'textfield_forms' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">ป้ายกำกับ (labelText):</label>
                <input
                  type="text"
                  value={formProps.label}
                  onChange={(e) => setFormProps({ ...formProps, label: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-400 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">ข้อความแนะนำ (hintText):</label>
                <input
                  type="text"
                  value={formProps.hintText}
                  onChange={(e) => setFormProps({ ...formProps, hintText: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center justify-between text-slate-300 cursor-pointer p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span>เติมพื้นหลัง (filled)</span>
                  <input
                    type="checkbox"
                    checked={formProps.isFilled}
                    onChange={(e) => setFormProps({ ...formProps, isFilled: e.target.checked })}
                    className="w-4 h-4 rounded accent-sky-500"
                  />
                </label>
                <label className="flex items-center justify-between text-slate-300 cursor-pointer p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span>ซ่อนรหัสผ่าน</span>
                  <input
                    type="checkbox"
                    checked={formProps.isPassword}
                    onChange={(e) => setFormProps({ ...formProps, isPassword: e.target.checked })}
                    className="w-4 h-4 rounded accent-sky-500"
                  />
                </label>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex justify-between text-slate-300">
                  <span>สวิตช์เปิด-ปิด (Switch):</span>
                  <span className="font-mono text-sky-400">{formProps.switchValue ? 'เปิด (ON)' : 'ปิด (OFF)'}</span>
                </div>
                <input
                  type="checkbox"
                  checked={formProps.switchValue}
                  onChange={(e) => setFormProps({ ...formProps, switchValue: e.target.checked })}
                  className="w-4 h-4 rounded accent-sky-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>ตัวเลื่อน Slider:</span>
                  <span className="font-mono text-sky-400">{formProps.sliderValue}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formProps.sliderValue}
                  onChange={(e) => setFormProps({ ...formProps, sliderValue: Number(e.target.value) })}
                  className="w-full accent-sky-500"
                />
              </div>
            </div>
          )}

          {/* Controls for Image & BoxDecoration */}
          {selectedWidget === 'image_decoration' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">การปรับรูปให้พอดี (BoxFit):</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['cover', 'contain', 'fill', 'fitWidth'] as const).map((fitMode) => (
                    <button
                      key={fitMode}
                      onClick={() => setImageProps({ ...imageProps, fit: fitMode })}
                      className={`py-1.5 px-2 rounded-lg font-mono text-[11px] border transition ${
                        imageProps.fit === fitMode
                          ? 'bg-sky-500 text-white border-sky-400 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      BoxFit.{fitMode}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>รัศมีความโค้งมน (borderRadius):</span>
                  <span className="font-mono text-sky-400">{imageProps.borderRadius} px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={imageProps.borderRadius}
                  onChange={(e) => setImageProps({ ...imageProps, borderRadius: Number(e.target.value) })}
                  className="w-full accent-sky-500"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="flex items-center justify-between text-slate-300 cursor-pointer">
                  <span>แสดง Gradient สีดำไล่เงาทับ (ให้ตัวหนังสือเด่น)</span>
                  <input
                    type="checkbox"
                    checked={imageProps.hasGradientOverlay}
                    onChange={(e) => setImageProps({ ...imageProps, hasGradientOverlay: e.target.checked })}
                    className="w-4 h-4 rounded accent-sky-500"
                  />
                </label>

                <label className="flex items-center justify-between text-slate-300 cursor-pointer">
                  <span>แสดงเงาตกกระทบ (BoxShadow)</span>
                  <input
                    type="checkbox"
                    checked={imageProps.hasShadow}
                    onChange={(e) => setImageProps({ ...imageProps, hasShadow: e.target.checked })}
                    className="w-4 h-4 rounded accent-sky-500"
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Center: Live Mobile Device Simulator (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <div className="text-center mb-3">
            <span className="text-xs font-semibold text-sky-400 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              ผลลัพธ์จำลองบนสมาร์ทโฟน (Simulated Screen)
            </span>
          </div>

          {/* Smartphone Frame */}
          <div className={`relative w-[300px] h-[580px] bg-slate-950 rounded-[44px] p-3 shadow-2xl border-4 border-slate-700/80 transition-all duration-300 ${
            isReloading ? 'ring-4 ring-sky-400 scale-[0.99]' : ''
          }`}>
            {/* Camera notch / Dynamic island */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-full z-30 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-950/80 mr-3"></div>
              <div className="w-2 h-2 rounded-full bg-sky-950"></div>
            </div>

            {/* Inner Mobile Screen */}
            <div className="relative w-full h-full bg-slate-100 rounded-[34px] overflow-hidden flex flex-col shadow-inner">
              {/* Status Bar */}
              <div className="h-8 px-6 pt-1 flex items-center justify-between text-[11px] font-semibold text-slate-800 z-20 select-none">
                <span>09:41</span>
                <div className="flex items-center gap-1.5">
                  <Signal className="w-3 h-3 text-slate-700" />
                  <Wifi className="w-3 h-3 text-slate-700" />
                  <Battery className="w-3.5 h-3.5 text-slate-700" />
                </div>
              </div>

              {/* Screen Content based on selected widget */}
              <div className="flex-1 overflow-hidden flex flex-col relative">
                {/* 1. Container Render */}
                {selectedWidget === 'container' && (
                  <div className="flex-1 flex items-center justify-center p-4 bg-slate-50">
                    <div
                      style={{
                        width: `${containerProps.width}px`,
                        height: `${containerProps.height}px`,
                        backgroundColor: containerProps.color,
                        padding: `${containerProps.padding}px`,
                        margin: `${containerProps.margin}px`,
                        borderRadius: `${containerProps.borderRadius}px`,
                        border: `${containerProps.borderWidth}px solid ${containerProps.borderColor}`,
                        boxShadow: containerProps.hasShadow ? '0 8px 16px -2px rgba(0,0,0,0.2)' : 'none',
                        display: 'flex',
                        alignItems: containerProps.alignment === 'topLeft' ? 'flex-start' : containerProps.alignment === 'bottomRight' ? 'flex-end' : 'center',
                        justifyContent: containerProps.alignment === 'topLeft' ? 'flex-start' : containerProps.alignment === 'bottomRight' ? 'flex-end' : 'center'
                      }}
                      className="transition-all duration-150"
                    >
                      <span className="text-white font-bold text-xs text-center drop-shadow-sm break-words">
                        {containerProps.childText}
                      </span>
                    </div>
                  </div>
                )}

                {/* 2. Row & Column Render */}
                {selectedWidget === 'row_column' && (
                  <div className="flex-1 p-4 bg-slate-50 flex flex-col">
                    <div className="text-[10px] text-slate-400 font-mono mb-2 text-center">
                      Direction: {rowColProps.direction.toUpperCase()}
                    </div>
                    <div 
                      className={`flex-1 flex border-2 border-dashed border-sky-300/60 rounded-xl p-3 ${
                        rowColProps.direction === 'column' ? 'flex-col' : 'flex-row'
                      }`}
                      style={{
                        justifyContent: 
                          rowColProps.mainAxisAlignment === 'center' ? 'center' :
                          rowColProps.mainAxisAlignment === 'start' ? 'flex-start' :
                          rowColProps.mainAxisAlignment === 'end' ? 'flex-end' :
                          rowColProps.mainAxisAlignment === 'spaceBetween' ? 'space-between' :
                          rowColProps.mainAxisAlignment === 'spaceAround' ? 'space-around' : 'space-evenly',
                        alignItems: 
                          rowColProps.crossAxisAlignment === 'center' ? 'center' :
                          rowColProps.crossAxisAlignment === 'start' ? 'flex-start' :
                          rowColProps.crossAxisAlignment === 'end' ? 'flex-end' : 'stretch',
                        gap: `${rowColProps.spacing}px`
                      }}
                    >
                      {Array.from({ length: rowColProps.itemCount }).map((_, idx) => (
                        <div
                          key={idx}
                          className={`rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-sm transition-all ${
                            idx === 0 ? 'bg-sky-500' : idx === 1 ? 'bg-indigo-500' : idx === 2 ? 'bg-teal-500' : idx === 3 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{
                            width: rowColProps.direction === 'row' ? '45px' : rowColProps.crossAxisAlignment === 'stretch' ? '100%' : '140px',
                            height: rowColProps.direction === 'column' ? '42px' : rowColProps.crossAxisAlignment === 'stretch' ? '100%' : '50px'
                          }}
                        >
                          {idx + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Text Render */}
                {selectedWidget === 'text' && (
                  <div className="flex-1 p-6 bg-slate-50 flex items-center justify-center">
                    <p
                      style={{
                        fontSize: `${textProps.fontSize}px`,
                        fontWeight: textProps.fontWeight === 'w300' ? 300 : textProps.fontWeight === 'w600' ? 600 : textProps.fontWeight === 'w800' ? 800 : textProps.fontWeight === 'bold' ? 700 : 400,
                        color: textProps.color,
                        textAlign: textProps.textAlign,
                        letterSpacing: `${textProps.letterSpacing}px`,
                        lineHeight: 1.4
                      }}
                      className="transition-all"
                    >
                      {textProps.content}
                    </p>
                  </div>
                )}

                {/* 4. Button Render */}
                {selectedWidget === 'button' && (
                  <div className="flex-1 p-6 bg-slate-50 flex flex-col items-center justify-center gap-4">
                    {buttonProps.variant === 'elevated' && (
                      <button
                        style={{
                          backgroundColor: buttonProps.bgColor,
                          color: buttonProps.textColor,
                          borderRadius: `${buttonProps.borderRadius}px`,
                          boxShadow: `0 ${buttonProps.elevation * 2}px ${buttonProps.elevation * 4}px -1px rgba(0,0,0,0.25)`,
                          padding: `${buttonProps.paddingV}px ${buttonProps.paddingH}px`
                        }}
                        className="flex items-center gap-2 text-xs font-semibold active:scale-95 transition"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{buttonProps.label}</span>
                      </button>
                    )}

                    {buttonProps.variant === 'outlined' && (
                      <button
                        style={{
                          color: buttonProps.bgColor,
                          borderColor: buttonProps.bgColor,
                          borderRadius: `${buttonProps.borderRadius}px`,
                          padding: `${buttonProps.paddingV}px ${buttonProps.paddingH}px`
                        }}
                        className="flex items-center gap-2 text-xs font-semibold border-2 active:scale-95 transition bg-transparent"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{buttonProps.label}</span>
                      </button>
                    )}

                    {buttonProps.variant === 'text' && (
                      <button
                        style={{
                          color: buttonProps.bgColor
                        }}
                        className="flex items-center gap-2 text-xs font-bold active:scale-95 transition py-2 px-4 hover:underline"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{buttonProps.label}</span>
                      </button>
                    )}

                    <span className="text-[11px] text-slate-400 mt-4">ลองแตะปุ่มเพื่อดู Active State</span>
                  </div>
                )}

                {/* 5. Card & ListTile Render */}
                {selectedWidget === 'card_listtile' && (
                  <div className="flex-1 p-4 bg-slate-100 flex flex-col gap-3 justify-center">
                    <div
                      style={{
                        borderRadius: `${cardProps.borderRadius}px`,
                        boxShadow: `0 ${cardProps.elevation * 1.5}px ${cardProps.elevation * 3}px -1px rgba(0,0,0,0.15)`
                      }}
                      className="bg-white p-3 flex items-center gap-3 transition-all"
                    >
                      <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 truncate">{cardProps.title}</h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                          {cardProps.subtitle}
                        </p>
                      </div>
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0" />
                    </div>

                    {/* Secondary preview item to show list look */}
                    <div
                      style={{
                        borderRadius: `${cardProps.borderRadius}px`,
                        boxShadow: `0 ${cardProps.elevation * 1.5}px ${cardProps.elevation * 3}px -1px rgba(0,0,0,0.15)`
                      }}
                      className="bg-white p-3 flex items-center gap-3 opacity-70"
                    >
                      <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                        <Heart className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-800">รายการที่สอง</h4>
                        <p className="text-[11px] text-slate-500">ตัวอย่างจำลองเมื่ออยู่ใน ListView</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. Scaffold & AppBar Render */}
                {selectedWidget === 'scaffold' && (
                  <div className="flex-1 flex flex-col bg-slate-50 relative">
                    {/* Simulated AppBar */}
                    <div
                      style={{ backgroundColor: scaffoldProps.appBarColor }}
                      className="h-12 px-3 text-white flex items-center justify-between shadow-sm z-10"
                    >
                      <div className="flex items-center gap-2">
                        {scaffoldProps.showDrawer && (
                          <div className="w-5 h-5 flex flex-col justify-center gap-1">
                            <div className="w-4 h-0.5 bg-white rounded"></div>
                            <div className="w-4 h-0.5 bg-white rounded"></div>
                            <div className="w-3 h-0.5 bg-white rounded"></div>
                          </div>
                        )}
                        {!scaffoldProps.centerTitle && (
                          <span className="text-xs font-bold truncate max-w-[140px]">
                            {scaffoldProps.appBarTitle}
                          </span>
                        )}
                      </div>

                      {scaffoldProps.centerTitle && (
                        <span className="text-xs font-bold truncate absolute left-1/2 -translate-x-1/2">
                          {scaffoldProps.appBarTitle}
                        </span>
                      )}

                      <div className="flex items-center gap-2">
                        <Bell className="w-3.5 h-3.5 text-white/90" />
                      </div>
                    </div>

                    {/* Simulated Body */}
                    <div className="flex-1 p-4 flex flex-col items-center justify-center text-center">
                      <div className="p-4 rounded-xl bg-white shadow-sm border border-slate-200/80 max-w-[200px]">
                        <span className="text-xs font-semibold text-slate-700 block mb-1">Body พื้นที่หลัก</span>
                        <p className="text-[10px] text-slate-400">ใส่ Widget อื่นๆ เช่น ListView, Column หรือ Form</p>
                      </div>
                    </div>

                    {/* Simulated FloatingActionButton */}
                    {scaffoldProps.showFAB && (
                      <div className="absolute right-4 bottom-14 z-20">
                        <button
                          style={{ backgroundColor: scaffoldProps.appBarColor }}
                          className="w-10 h-10 rounded-full shadow-lg text-white flex items-center justify-center active:scale-95 transition"
                        >
                          <Plus className="w-5 h-5 stroke-[2.5]" />
                        </button>
                      </div>
                    )}

                    {/* Simulated Bottom Navigation */}
                    {scaffoldProps.showBottomNav && (
                      <div className="h-12 bg-white border-t border-slate-200 flex items-center justify-around text-slate-600 z-10">
                        <div className="flex flex-col items-center text-sky-600">
                          <Home className="w-3.5 h-3.5" />
                          <span className="text-[9px] font-bold">หน้าแรก</span>
                        </div>
                        <div className="flex flex-col items-center text-slate-400">
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span className="text-[9px]">สินค้า</span>
                        </div>
                        <div className="flex flex-col items-center text-slate-400">
                          <Settings className="w-3.5 h-3.5" />
                          <span className="text-[9px]">ตั้งค่า</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 7. Stack & Positioned Render */}
                {selectedWidget === 'stack_positioned' && (
                  <div className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-50">
                    <div className="text-center mb-4">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Stack Preview</span>
                      <span className="text-xs text-slate-700">การซ้อนทับกันของวิดเจ็ต (Layering)</span>
                    </div>

                    {/* Stack Parent Box */}
                    <div className="relative p-6 bg-white rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-center">
                      <div className="relative inline-block">
                        {/* Avatar */}
                        <div 
                          style={{ width: `${stackProps.avatarSize}px`, height: `${stackProps.avatarSize}px` }}
                          className="rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 text-white flex items-center justify-center shadow-md overflow-hidden"
                        >
                          <User style={{ width: `${stackProps.avatarSize * 0.5}px`, height: `${stackProps.avatarSize * 0.5}px` }} />
                        </div>

                        {/* Positioned Badge */}
                        <div 
                          style={{
                            top: `${stackProps.badgeTop}px`,
                            right: `${stackProps.badgeRight}px`
                          }}
                          className="absolute bg-rose-500 text-white font-bold text-xs rounded-full min-w-[24px] h-[24px] px-1.5 flex items-center justify-center shadow-md border-2 border-white animate-pulse"
                        >
                          {stackProps.badgeCount}
                        </div>

                        {/* Positioned Status Dot */}
                        {stackProps.showStatusDot && (
                          <div 
                            className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                              stackProps.isOnline ? 'bg-emerald-500' : 'bg-slate-400'
                            }`}
                          />
                        )}
                      </div>
                    </div>

                    <div className="mt-6 p-2.5 rounded-lg bg-sky-50 border border-sky-200/80 text-[11px] text-sky-800 text-center max-w-[220px]">
                      วิดเจ็ตด้านล่างจะอยู่ชั้นหลัง วิดเจ็ตถัดมาจะซ้อนทับอยู่ด้านบนเสมอ
                    </div>
                  </div>
                )}

                {/* 8. GridView Render */}
                {selectedWidget === 'gridview' && (
                  <div className="flex-1 flex flex-col p-3 overflow-y-auto bg-slate-50 scrollbar-none">
                    <div className="flex items-center justify-between mb-2 px-1">
                      <span className="text-xs font-bold text-slate-800">GridView ({gridProps.crossAxisCount} คอลัมน์)</span>
                      <span className="text-[10px] text-sky-600 bg-sky-100 font-semibold px-2 py-0.5 rounded-full">
                        อัตราส่วน {gridProps.childAspectRatio}
                      </span>
                    </div>

                    <div 
                      style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${gridProps.crossAxisCount}, minmax(0, 1fr))`,
                        gap: `${gridProps.crossAxisSpacing}px ${gridProps.mainAxisSpacing}px`
                      }}
                    >
                      {Array.from({ length: gridProps.itemCount }).map((_, idx) => (
                        <div 
                          key={idx}
                          style={{ aspectRatio: gridProps.childAspectRatio }}
                          className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-2.5 flex flex-col items-center justify-center text-center transition hover:shadow-md"
                        >
                          <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center mb-1.5">
                            <Grid className="w-4 h-4" />
                          </div>
                          <span className="text-[11px] font-bold text-slate-800 truncate w-full">สินค้า #{idx + 1}</span>
                          <span className="text-[10px] text-slate-400">฿{(idx + 1) * 120}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 9. Wrap & Chips Render */}
                {selectedWidget === 'wrap_chips' && (
                  <div className="flex-1 flex flex-col p-4 bg-slate-50">
                    <span className="text-xs font-bold text-slate-800 mb-1">หมวดหมู่และป้ายกำกับ (Wrap)</span>
                    <p className="text-[11px] text-slate-500 mb-3">เมื่อข้อความยาวเกินหน้าจอ จะขึ้นแถวใหม่อัตโนมัติโดยไม่เกิด RenderFlex Overflow Error</p>

                    <div 
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: `${wrapProps.runSpacing}px ${wrapProps.spacing}px`,
                        justifyContent: wrapProps.alignment === 'center' ? 'center' : wrapProps.alignment === 'end' ? 'flex-end' : wrapProps.alignment === 'spaceBetween' ? 'space-between' : 'flex-start'
                      }}
                      className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-sm"
                    >
                      {['Flutter', 'Dart', 'State', 'Provider', 'Bloc', 'UI Design', 'Firebase', 'Mobile'].map((tag) => {
                        const isSelected = wrapProps.selectedCategory === tag;
                        return (
                          <button
                            key={tag}
                            onClick={() => setWrapProps({ ...wrapProps, selectedCategory: tag })}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition active:scale-95 ${
                              isSelected
                                ? 'bg-sky-500 text-white font-semibold shadow-sm shadow-sky-500/30'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {wrapProps.showAvatar && (
                              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                                isSelected ? 'bg-white text-sky-600' : 'bg-slate-300 text-slate-700'
                              }`}>
                                {tag[0]}
                              </span>
                            )}
                            <span>{tag}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-auto p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px]">
                      ✅ ตัวเลือกที่เลือกขณะนี้: <strong className="font-semibold">{wrapProps.selectedCategory}</strong>
                    </div>
                  </div>
                )}

                {/* 10. TextField & Forms Render */}
                {selectedWidget === 'textfield_forms' && (
                  <div className="flex-1 flex flex-col p-4 bg-slate-50 space-y-3.5 overflow-y-auto scrollbar-none">
                    <span className="text-xs font-bold text-slate-800">ฟอร์มกรอกข้อมูลผู้ใช้</span>

                    {/* TextField */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700 block">{formProps.label}</label>
                      <div className={`relative flex items-center rounded-xl border transition-all ${
                        formProps.isFilled ? 'bg-white' : 'bg-transparent'
                      } border-slate-300 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20`}>
                        {formProps.showPrefixIcon && (
                          <div className="pl-3 text-slate-400">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                        <input
                          type={formProps.isPassword ? 'password' : 'text'}
                          placeholder={formProps.hintText}
                          className="w-full px-3 py-2 text-xs text-slate-800 bg-transparent outline-none"
                          defaultValue="somchai_flutter"
                        />
                        {formProps.showSuffixClear && (
                          <div className="pr-3 text-slate-400 hover:text-slate-600 cursor-pointer">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 block px-1">{formProps.helperText}</span>
                    </div>

                    {/* SwitchListTile */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold text-slate-800 block">เปิดรับการแจ้งเตือน</span>
                        <span className="text-[10px] text-slate-400">Push Notifications</span>
                      </div>
                      <div 
                        onClick={() => setFormProps({ ...formProps, switchValue: !formProps.switchValue })}
                        className={`w-11 h-6 rounded-full p-0.5 cursor-pointer transition-colors ${
                          formProps.switchValue ? 'bg-sky-500' : 'bg-slate-300'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                          formProps.switchValue ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </div>
                    </div>

                    {/* Slider */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-semibold text-slate-800">ระดับเสียง (Slider)</span>
                        <span className="text-xs font-bold text-sky-600 font-mono">{formProps.sliderValue}%</span>
                      </div>
                      <input 
                        type="range"
                        min="0"
                        max="100"
                        value={formProps.sliderValue}
                        onChange={(e) => setFormProps({ ...formProps, sliderValue: Number(e.target.value) })}
                        className="w-full accent-sky-500"
                      />
                    </div>
                  </div>
                )}

                {/* 11. Image & BoxDecoration Render */}
                {selectedWidget === 'image_decoration' && (
                  <div className="flex-1 flex flex-col p-4 bg-slate-50 items-center justify-center">
                    <div 
                      style={{
                        borderRadius: `${imageProps.borderRadius}px`,
                        boxShadow: imageProps.hasShadow ? '0 12px 25px -4px rgba(0,0,0,0.25)' : 'none'
                      }}
                      className="relative w-full max-w-[240px] h-[180px] overflow-hidden group bg-slate-900"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?w=600"
                        alt="Flutter preview"
                        style={{ objectFit: imageProps.fit as any }}
                        className="w-full h-full block"
                        referrerPolicy="no-referrer"
                      />

                      {/* Gradient Overlay */}
                      {imageProps.hasGradientOverlay && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3">
                          <span className="text-white text-xs font-bold">Bangkok Sunset</span>
                          <span className="text-slate-200 text-[10px]">ตกแต่งด้วย BoxDecoration & BoxFit.{imageProps.fit}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 text-center">
                      <span className="text-xs font-semibold text-slate-700 block">BoxFit.{imageProps.fit}</span>
                      <span className="text-[11px] text-slate-500">BorderRadius: {imageProps.borderRadius}px</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Home indicator bar (iPhone gesture line) */}
              <div className="h-4 flex items-center justify-center bg-slate-100 z-20">
                <div className="w-24 h-1 bg-slate-400/80 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Real-time Dart Code View (3 Cols on XL) */}
        <div className="lg:col-span-3 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between p-3.5 border-b border-slate-800 bg-slate-950/60">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
              <Code2 className="w-4 h-4 text-sky-400" />
              <span>Dart Widget Code</span>
            </div>
            <button
              onClick={() => handleCopyCode(generateDartCode())}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition border border-slate-700"
            >
              {copied ? (
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

          <div className="p-3 bg-slate-950 font-mono text-[11px] text-slate-300 leading-relaxed overflow-x-auto flex-1 max-h-[460px] scrollbar-thin">
            <pre>
              <code>{generateDartCode()}</code>
            </pre>
          </div>

          {/* Quick learning tip footer */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <span className="text-sky-400 font-bold">💡 โน้ต:</span>
            <span>โค้ดด้านบนอัปเดตแบบเรียลไทม์ สามารถนำไปวางลงในฟังก์ชัน `build(BuildContext context)` ของโปรเจกต์คุณได้ทันที</span>
          </div>
        </div>
      </div>
    </div>
  );
};
