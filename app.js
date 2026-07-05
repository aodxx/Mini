// ============================================================
// 🔗 CONFIG
// ============================================================
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwUizsMlGCi8BPJQK5OaU7jKZTRp_L33dtdPBtghW60tX1dLtDWysLThqe3r07VTjv-/exec';
const USER_ID = localStorage.getItem('userId') || 'user-' + Math.random().toString(36).substr(2, 9);
localStorage.setItem('userId', USER_ID);

// ============================================================
// 🏷️ ROOM NUMBERS (ชั้น 2 · ห้อง 201–205 ผูกกับหมวดหมู่)
// ============================================================
const ROOM_NUMBERS = {
  navigation: '201',
  dataviz: '202',
  relationship: '203',
  simulation: '204',
  calculator: '205'
};

// ============================================================
// 📖 LESSON CONTENT (ห้องเรียน ชั้น 1 · ห้อง 101–105)
// ============================================================
const LESSONS = [
  {
    category: 'navigation',
    room: '101',
    icon: '🗂️',
    iconBg: '#E9E4F7',
    title: 'Navigation — พาไปถูกที่',
    body: 'ส่วนที่ช่วยสลับดูเนื้อหาโดยไม่ต้องโหลดหน้าใหม่ เช่น แท็บ อคอร์เดียน หรือแคโรเซล ใช้ตอนมีข้อมูลหลายชุดแต่พื้นที่จอจำกัด',
    example: 'ตัวอย่าง: แท็บสลับดูข้อมูลสินค้าแต่ละประเภทในหน้าเดียว'
  },
  {
    category: 'dataviz',
    room: '102',
    icon: '📈',
    iconBg: '#D8F0F3',
    title: 'Data Visualization — เห็นตัวเลขเป็นภาพ',
    body: 'แปลงตัวเลขดิบให้เป็นกราฟที่อ่านง่ายและโต้ตอบได้ เช่น กราฟเส้นหรือกราฟแท่งด้วย Chart.js ใช้เมื่อต้องเล่าเรื่องด้วยข้อมูล',
    example: 'ตัวอย่าง: กราฟยอดขายรายเดือนที่ hover ดูตัวเลขแต่ละจุดได้'
  },
  {
    category: 'relationship',
    room: '103',
    icon: '🕸️',
    iconBg: '#DCF3E6',
    title: 'Relationship — แสดงความสัมพันธ์',
    body: 'ผังที่แสดงว่าอะไรเชื่อมกับอะไร เช่น ผังความคิด ผังองค์กร หรือกราฟเครือข่าย เหมาะกับข้อมูลที่มีลำดับชั้นหรือการเชื่อมโยงกันไปมา',
    example: 'ตัวอย่าง: ผังองค์กรที่คลิกขยาย-หุบแต่ละแผนกได้'
  },
  {
    category: 'simulation',
    room: '104',
    icon: '🎴',
    iconBg: '#FBE7D2',
    title: 'Simulation — จำลองให้ลองทำ',
    body: 'ส่วนที่ให้ผู้ใช้ลงมือทำตามหรือฝึกทีละขั้น เช่น บัตรคำพลิกได้ หรือขั้นตอนสอนใช้งานแบบ step-by-step เหมาะกับการสอนและทบทวน',
    example: 'ตัวอย่าง: บัตรคำศัพท์ที่คลิกแล้วพลิกดูคำแปล'
  },
  {
    category: 'calculator',
    room: '105',
    icon: '⚖️',
    iconBg: '#FBDDE0',
    title: 'Calculator — คำนวณให้ทันที',
    body: 'รับค่าจากผู้ใช้แล้วประมวลผลออกมาเป็นตัวเลขทันที เช่น คำนวณ BMI ดอกเบี้ยเงินกู้ หรือแปลงหน่วย ใช้เมื่อมีสูตรที่ตายตัว',
    example: 'ตัวอย่าง: กรอกน้ำหนักส่วนสูงแล้วได้ค่า BMI ทันที'
  }
];

// ============================================================
// 📘 TEXTBOOKS (ตำราเรียน — หยิบไปปรับใช้ได้) ผูกกับห้อง 101–105
// ============================================================
const TEXTBOOKS = {
  navigation: {
    title: '🗂️ ตำราเรียน: Navigation',
    room: '101',
    body:
`หัวข้อ: Navigation — พาไปถูกที่

1) นิยาม
ส่วนติดต่อผู้ใช้ที่ให้สลับดูเนื้อหาหลายชุดในพื้นที่เดียวกัน โดยไม่ต้องโหลดหน้าใหม่ เช่น แท็บ (Tabs), อคอร์เดียน (Accordion), แคโรเซล (Carousel)

2) ใช้ตอนไหน
- มีข้อมูลหลายหมวดแต่พื้นที่จอจำกัด
- อยากให้ผู้ใช้โฟกัสทีละเรื่อง ไม่ใช่เห็นทุกอย่างพร้อมกัน
- ข้อมูลมีลำดับความสำคัญไม่เท่ากัน (อคอร์เดียนซ่อนของที่ไม่สำคัญไว้ก่อน)

3) ส่วนประกอบหลัก
- ตัวควบคุม (แท็บหัวข้อ / หัวข้อที่กดขยายได้ / ปุ่มเลื่อนซ้าย-ขวา)
- พื้นที่แสดงเนื้อหาที่เปลี่ยนไปตามตัวควบคุม
- สถานะ "กำลังเลือกอยู่" ที่ต้องเห็นชัดเจนเสมอ

4) โครงสร้างคร่าวๆ (ปรับใช้ได้กับทุกเฟรมเวิร์ก)
   [ปุ่มหัวข้อ 1] [ปุ่มหัวข้อ 2] [ปุ่มหัวข้อ 3]
   ------------------------------------------
   |  เนื้อหาของหัวข้อที่กำลังเลือกอยู่        |
   ------------------------------------------
   กด ปุ่ม → เปลี่ยน state ตัวที่เลือก → render เนื้อหาใหม่ → ปุ่มเดิม active ออก ปุ่มใหม่ active เข้า

5) จุดที่มักพลาด
- ลืมทำ keyboard navigation (ลูกศรซ้าย-ขวาเปลี่ยนแท็บ)
- อคอร์เดียนเปิดได้ทีละอันเกินไป ทำให้หน้ายาวจนหาไม่เจอ
- แคโรเซลเลื่อนอัตโนมัติเร็วเกินไปจนอ่านไม่ทัน

6) แบบฝึกหัดให้ลองทำ
ให้ผู้เรียนลองเปลี่ยน Tabs Example ในห้องศึกษา (ห้อง 201) จาก 3 แท็บ เป็น 5 แท็บ แล้วสังเกตว่าโครงสร้างปุ่ม-เนื้อหาเปลี่ยนตามที่อธิบายไว้ในข้อ 4 หรือไม่`
  },
  dataviz: {
    title: '📈 ตำราเรียน: Data Visualization',
    room: '102',
    body:
`หัวข้อ: Data Visualization — เห็นตัวเลขเป็นภาพ

1) นิยาม
การแปลงตัวเลขดิบให้เป็นภาพกราฟที่อ่านง่ายและโต้ตอบได้ เช่น กราฟเส้น กราฟแท่ง ด้วยไลบรารีอย่าง Chart.js

2) ใช้ตอนไหน
- ต้องการเล่าแนวโน้ม (แนวโน้มยอดขาย, การเติบโต) ไม่ใช่แค่ตัวเลขเดี่ยวๆ
- ต้องการเปรียบเทียบหลายค่าพร้อมกัน
- ผู้ดูต้อง hover/คลิกเพื่อดูรายละเอียดเจาะจุด

3) ส่วนประกอบหลัก
- แกน X / แกน Y พร้อมป้ายกำกับ
- ชุดข้อมูล (dataset) หนึ่งชุดหรือมากกว่า พร้อมสี/สัญลักษณ์แยกกัน
- Tooltip ที่โผล่เมื่อชี้ตรงจุดข้อมูล
- Legend บอกว่าสีไหนคือชุดข้อมูลไหน

4) โครงสร้างคร่าวๆ
   ข้อมูลดิบ (array ของตัวเลข) 
        ↓
   กำหนด labels (แกน X) + datasets (แกน Y)
        ↓
   ส่งเข้าไลบรารีกราฟ (เช่น new Chart(ctx, {type, data, options}))
        ↓
   ไลบรารีวาดกราฟ + จัดการ hover/tooltip ให้อัตโนมัติ

5) จุดที่มักพลาด
- สีชุดข้อมูลใกล้กันเกินไปจนแยกไม่ออก
- ไม่ตั้งค่า responsive ทำให้กราฟล้นจอมือถือ
- ใส่ข้อมูลเยอะเกินไปในกราฟเดียวจนอ่านไม่รู้เรื่อง

6) แบบฝึกหัดให้ลองทำ
ลองเอา Line Chart ในห้องศึกษา (ห้อง 202) เปลี่ยนข้อมูลเป็นยอดขายจริงของคุณ 6 เดือนล่าสุด แล้วดูว่าต้องแก้ labels กับ dataset ตรงไหนบ้าง`
  },
  relationship: {
    title: '🕸️ ตำราเรียน: Relationship',
    room: '103',
    body:
`หัวข้อ: Relationship — แสดงความสัมพันธ์

1) นิยาม
ผังที่แสดงว่าอะไรเชื่อมกับอะไร เช่น ผังความคิด (Mindmap), ผังองค์กร (Org Chart), กราฟเครือข่าย (Network Graph), แผนผังกระบวนการ (Flowchart)

2) ใช้ตอนไหน
- ข้อมูลมีลำดับชั้น (ใครอยู่เหนือใคร)
- ข้อมูลเชื่อมโยงกันไปมาแบบไม่เป็นเส้นตรง
- ต้องอธิบาย "ขั้นตอน" ที่มีทางแยก (ถ้า-แล้ว)

3) ส่วนประกอบหลัก
- โหนด (Node) = จุดข้อมูลแต่ละอัน
- เส้นเชื่อม (Edge) = ความสัมพันธ์ระหว่างโหนด
- ทิศทาง (ถ้ามี) = บอกว่าอะไรเป็นเหตุ อะไรเป็นผล

4) โครงสร้างคร่าวๆ
   โหนดหลัก
     ├── โหนดลูก 1
     │     └── โหนดหลาน 1.1
     ├── โหนดลูก 2
     └── โหนดลูก 3
   
   ข้อมูล = รายการโหนด + รายการเส้นเชื่อม (ใคร-เชื่อม-กับใคร)
        ↓
   ไลบรารี (D3.js / Mermaid.js) คำนวณตำแหน่งและวาดให้อัตโนมัติ

5) จุดที่มักพลาด
- ใส่โหนดเยอะเกินไปในภาพเดียวจนเป็นเส้นยุ่งอ่านไม่ออก
- ไม่ให้ผู้ใช้คลิกขยาย/หุบ ทำให้ผังยาวเกินจอ
- ตั้งชื่อโหนดสั้นเกินจนไม่รู้ว่าหมายถึงอะไร

6) แบบฝึกหัดให้ลองทำ
ใช้ตัว Dynamic Prompt Generator ในห้องศึกษา (ห้อง 203) กรอกโครงสร้างแผนกจริงของทีมคุณ แล้วลองเทียบว่าผังที่ได้ตรงกับความสัมพันธ์จริงไหม`
  },
  simulation: {
    title: '🎴 ตำราเรียน: Simulation',
    room: '104',
    body:
`หัวข้อ: Simulation — จำลองให้ลองทำ

1) นิยาม
ส่วนที่ให้ผู้ใช้ลงมือทำตามหรือฝึกทีละขั้น เช่น บัตรคำพลิกได้ (Flashcards), ขั้นตอนสอนใช้งานทีละสเต็ป (Step Tutorial)

2) ใช้ตอนไหน
- ต้องการให้ผู้เรียนทบทวนเนื้อหาด้วยตัวเอง (ท่องจำ)
- ต้องสอนขั้นตอนที่มีลำดับตายตัว ทีละก้าว
- อยากให้ผู้ใช้ "ลองทำ" แทนที่จะ "อ่านอย่างเดียว"

3) ส่วนประกอบหลัก
- หน่วยเนื้อหาย่อยๆ ที่แบ่งเป็นชิ้นๆ ได้ (การ์ด 1 ใบ = 1 คำศัพท์, สเต็ป 1 อัน = 1 ขั้นตอน)
- ตัวควบคุมเดินหน้า-ถอยหลัง (ปุ่ม, ปัด, หรือคลิกพลิก)
- ตัวบอกความคืบหน้า (การ์ดใบที่เท่าไหร่ / สเต็ปไหนแล้ว)

4) โครงสร้างคร่าวๆ
   [การ์ด/สเต็ปที่ 1] → คลิก/กดถัดไป → [การ์ด/สเต็ปที่ 2] → ... → [จบชุด]
   
   เก็บ index ปัจจุบันไว้ในตัวแปรเดียว แล้วเปลี่ยนแค่ index เวลาเดินหน้า-ถอยหลัง

5) จุดที่มักพลาด
- ไม่มีทางย้อนกลับ ทำให้พลาดขั้นตอนแล้วต้องเริ่มใหม่ทั้งหมด
- บัตรคำเยอะเกินไปในชุดเดียวจนล้า ควรแบ่งชุดละ 10-15 ใบ
- ไม่บอกความคืบหน้า ทำให้ผู้เรียนไม่รู้ว่าเหลืออีกกี่ขั้น

6) แบบฝึกหัดให้ลองทำ
ลองแก้ Flashcards ในห้องศึกษา (ห้อง 204) ให้ใช้คำศัพท์ของวิชาที่คุณสอนจริง แล้วสังเกตว่าต้องแก้ข้อมูลตรงไหนโดยไม่ต้องแตะโครงสร้างการพลิกการ์ด`
  },
  calculator: {
    title: '⚖️ ตำราเรียน: Calculator',
    room: '105',
    body:
`หัวข้อ: Calculator — คำนวณให้ทันที

1) นิยาม
ส่วนที่รับค่าจากผู้ใช้แล้วประมวลผลตามสูตรที่ตายตัว แสดงผลลัพธ์ทันที เช่น คำนวณ BMI ดอกเบี้ยเงินกู้ หรือแปลงหน่วย

2) ใช้ตอนไหน
- มีสูตรคำนวณที่ชัดเจน ไม่เปลี่ยนบ่อย
- ผู้ใช้ต้องกรอกค่าไม่กี่ตัวแล้วอยากเห็นผลทันที ไม่ต้องกดส่งฟอร์ม
- อยากลดการคำนวณด้วยมือที่ผิดพลาดง่าย

3) ส่วนประกอบหลัก
- ช่องกรอกค่าตั้งต้น (input) พร้อมหน่วยกำกับชัดเจน
- สูตรคำนวณ (function ที่รับค่า input แล้วคืนผลลัพธ์)
- พื้นที่แสดงผลลัพธ์ที่อัปเดตทันทีที่ผู้ใช้พิมพ์หรือกดคำนวณ

4) โครงสร้างคร่าวๆ
   [ช่องกรอกค่า A] [ช่องกรอกค่า B]
              ↓ (พิมพ์ทีไร คำนวณใหม่ทันที)
        function คำนวณ(A, B) → ผลลัพธ์
              ↓
   [ แสดงผลลัพธ์ + คำอธิบายสั้นๆ ว่าหมายถึงอะไร ]

5) จุดที่มักพลาด
- ไม่ตรวจค่าที่กรอก (เช่น กรอกน้ำหนักติดลบ) ทำให้ผลลัพธ์ไร้ความหมาย
- ไม่บอกหน่วยชัดเจน (กิโลกรัม vs ปอนด์) ทำให้ผลลัพธ์ผิดพลาด
- ปัดเศษตัวเลขผลลัพธ์ไม่สมเหตุสมผล (ทศนิยมยาวเกินจำเป็น)

6) แบบฝึกหัดให้ลองทำ
ลองต่อยอด BMI Calculator ในห้องศึกษา (ห้อง 205) ให้เพิ่มคำแนะนำภาษาไทยตามช่วงค่า BMI ที่คำนวณได้ โดยไม่แก้สูตรคำนวณเดิม`
  }
};

// ============================================================
// 📦 FALLBACK DATA (14 Components)
// ============================================================
const FALLBACK_COMPONENTS = [
  { id: "tabs-example", title: "Tabs Example", category: "navigation", categoryLabel: "NAVIGATION", emoji: "🗂️", gradient: "from-indigo-500 to-purple-500", description: "สลับดูเนื้อหาด้วยแท็บ", templatePrompt: "จงสร้าง Tabs Component...", htmlFileUrl: "tabs-example.html" },
  { id: "accordion-example", title: "Accordion Example", category: "navigation", categoryLabel: "NAVIGATION", emoji: "📋", gradient: "from-purple-500 to-pink-500", description: "ขยาย-หุบเนื้อหา", templatePrompt: "จงสร้าง Accordion Component...", htmlFileUrl: "accordion-example.html" },
  { id: "carousel-example", title: "Carousel Example", category: "navigation", categoryLabel: "NAVIGATION", emoji: "🎠", gradient: "from-pink-500 to-rose-500", description: "เลื่อนดูแบบสไลด์", templatePrompt: "จงสร้าง Carousel Component...", htmlFileUrl: "carousel-example.html" },
  { id: "chartjs-line", title: "Line Chart", category: "dataviz", categoryLabel: "DATA VISUALIZATION", emoji: "📈", gradient: "from-blue-500 to-cyan-500", description: "กราฟเส้น interactive", templatePrompt: "จงสร้าง Line Chart ด้วย Chart.js...", htmlFileUrl: "chartjs-line.html" },
  { id: "chartjs-bar", title: "Bar Chart", category: "dataviz", categoryLabel: "DATA VISUALIZATION", emoji: "📊", gradient: "from-cyan-500 to-teal-500", description: "กราฟแท่ง", templatePrompt: "จงสร้าง Bar Chart ด้วย Chart.js...", htmlFileUrl: "chartjs-bar.html" },
  { id: "d3-mindmap", title: "D3 Mindmap", category: "relationship", categoryLabel: "RELATIONSHIP", emoji: "🧠", gradient: "from-green-500 to-emerald-500", description: "ผังความคิด", templatePrompt: "จงสร้าง Mindmap ด้วย D3.js...", htmlFileUrl: "d3-mindmap.html", hasDynamicPrompt: true },
  { id: "mermaid-flowchart", title: "Mermaid Flowchart", category: "relationship", categoryLabel: "RELATIONSHIP", emoji: "🔀", gradient: "from-emerald-500 to-teal-500", description: "แผนผังกระบวนการ", templatePrompt: "จงสร้าง Flowchart ด้วย Mermaid.js...", htmlFileUrl: "mermaid-flowchart.html", hasDynamicPrompt: true },
  { id: "network-graph", title: "Network Graph", category: "relationship", categoryLabel: "RELATIONSHIP", emoji: "🕸️", gradient: "from-teal-500 to-cyan-500", description: "กราฟเครือข่าย", templatePrompt: "จงสร้าง Network Graph ด้วย D3.js...", htmlFileUrl: "network-graph.html", hasDynamicPrompt: true },
  { id: "org-chart", title: "Org Chart", category: "relationship", categoryLabel: "RELATIONSHIP", emoji: "🏢", gradient: "from-lime-500 to-green-500", description: "โครงสร้างองค์กร", templatePrompt: "จงสร้าง Org Chart...", htmlFileUrl: "org-chart.html", hasDynamicPrompt: true },
  { id: "flashcards", title: "Flashcards", category: "simulation", categoryLabel: "SIMULATION", emoji: "🎴", gradient: "from-orange-500 to-amber-500", description: "บัตรคำพลิกได้", templatePrompt: "จงสร้าง Flashcards...", htmlFileUrl: "flashcards.html" },
  { id: "step-tutorial", title: "Step Tutorial", category: "simulation", categoryLabel: "SIMULATION", emoji: "👣", gradient: "from-amber-500 to-yellow-500", description: "สอนแบบทีละขั้น", templatePrompt: "จงสร้าง Step Tutorial...", htmlFileUrl: "step-tutorial.html" },
  { id: "bmi-calculator", title: "BMI Calculator", category: "calculator", categoryLabel: "CALCULATOR", emoji: "⚖️", gradient: "from-red-500 to-rose-500", description: "คำนวณ BMI", templatePrompt: "จงสร้าง BMI Calculator...", htmlFileUrl: "bmi-calculator.html" },
  { id: "loan-calculator", title: "Loan Calculator", category: "calculator", categoryLabel: "CALCULATOR", emoji: "💰", gradient: "from-rose-500 to-pink-500", description: "คำนวณเงินกู้", templatePrompt: "จงสร้าง Loan Calculator...", htmlFileUrl: "loan-calculator.html" },
  { id: "unit-converter", title: "Unit Converter", category: "calculator", categoryLabel: "CALCULATOR", emoji: "🔄", gradient: "from-fuchsia-500 to-purple-500", description: "แปลงหน่วย", templatePrompt: "จงสร้าง Unit Converter...", htmlFileUrl: "unit-converter.html" }
];

// ============================================================
// 🌐 GLOBAL VARS
// ============================================================
let components = [];
let favorites = [];
let showcaseItems = [];
let isUsingFallback = false;

// ============================================================
// 🚪 ROOM NAVIGATION
// ============================================================
function showRoom(roomId, btn) {
  document.querySelectorAll('.room').forEach(r => r.classList.remove('active'));
  const target = document.getElementById('room-' + roomId);
  if (target) target.classList.add('active');

  document.querySelectorAll('#roomNav .plaque').forEach(p => p.classList.remove('active'));
  const plaque = btn || document.querySelector(`.plaque[data-room="${roomId}"]`);
  if (plaque) plaque.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// 📖 RENDER LESSONS (ห้องเรียน)
// ============================================================
function renderLessons() {
  const grid = document.getElementById('lessonGrid');
  if (!grid) return;
  grid.innerHTML = LESSONS.map(l => `
    <div class="lesson-card p-6 fade-in">
      <div class="flex items-start gap-4 mb-3">
        <div class="lesson-icon" style="background:${l.iconBg}">${l.icon}</div>
        <div>
          <div class="mono text-xs" style="color:var(--muted)">ห้อง ${l.room}</div>
          <h3 class="font-bold text-lg">${l.title}</h3>
        </div>
      </div>
      <p class="text-sm mb-2" style="color:var(--ink)">${l.body}</p>
      <p class="text-xs mb-4" style="color:var(--muted)">${l.example}</p>
      <div class="flex flex-wrap gap-2">
        <button onclick="openTextbook('${l.category}')" class="text-sm font-semibold px-4 py-2 rounded-lg text-white" style="background:var(--board)">
          📘 เปิดตำราเรียน
        </button>
        <button onclick="jumpToStudio('${l.category}')" class="text-sm font-semibold px-4 py-2 rounded-lg" style="background:var(--paper-2); color:var(--ink)">
          ดู Template ห้อง ${ROOM_NUMBERS[l.category]} →
        </button>
      </div>
    </div>
  `).join('');
}

function jumpToStudio(category) {
  showRoom('studio', document.querySelector('[data-room="studio"]'));
  const chip = Array.from(document.querySelectorAll('#filterBar .filter-chip'))
    .find(b => b.getAttribute('onclick') && b.getAttribute('onclick').includes(`'${category}'`));
  filterCards(category, chip);
}

// ============================================================
// 🧠 AI LESSON BUILDER (Gemini via GAS backend)
// ============================================================
let currentAiLesson = null;
let savedLessonsCache = [];

async function generateLesson() {
  const topic = document.getElementById('lessonTopicInput').value.trim();
  const sourceText = document.getElementById('lessonSourceInput').value.trim();
  const category = document.getElementById('lessonCategorySelect').value;
  const statusEl = document.getElementById('lessonGenStatus');
  const btn = document.getElementById('generateLessonBtn');

  if (!topic && !sourceText) {
    alert('กรุณากรอกหัวข้อ หรือวางเนื้อหาอย่างน้อยหนึ่งอย่าง');
    return;
  }

  btn.disabled = true;
  btn.textContent = '⏳ กำลังให้ AI แตกบทเรียน...';
  statusEl.classList.remove('hidden');
  statusEl.textContent = 'กำลังส่งให้ Gemini ประมวลผล อาจใช้เวลา 5-15 วินาที...';
  statusEl.style.color = 'var(--muted)';

  try {
    // ส่งเป็น POST body ธรรมดา (text/plain) เพื่อเลี่ยง CORS preflight กับ Apps Script
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'generateLesson', topic, sourceText, category })
    });
    const lesson = await res.json();

    if (lesson.error) throw new Error(lesson.error);

    currentAiLesson = lesson;
    renderAiLesson(lesson);
    statusEl.textContent = '✅ สร้างบทเรียนสำเร็จ เลื่อนลงไปดูผลลัพธ์ได้เลย';
    statusEl.style.color = '#2E7D46';
    loadSavedLessons();

  } catch (err) {
    statusEl.textContent = '❌ ผิดพลาด: ' + err.message + ' (เช็คว่าตั้งค่า GEMINI_API_KEY และผูก action generateLesson ใน doPost แล้วหรือยัง)';
    statusEl.style.color = 'var(--pen-coral)';
  } finally {
    btn.disabled = false;
    btn.textContent = '⚡ แปลงเป็นบทเรียน 9 ขั้น';
  }
}

function renderAiLesson(lesson) {
  const box = document.getElementById('aiLessonResult');
  box.classList.remove('hidden');
  box.innerHTML = buildLessonHtml(lesson);
  box.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function buildLessonHtml(lesson) {
  const subtopics = (lesson.subtopics || []).map(s => `<li>${escapeHtml(s)}</li>`).join('');
  const related = (lesson.relatedTopics || []).map(t => `<span class="filter-chip" style="cursor:default; color:var(--ink); border-color:rgba(0,0,0,0.15)">${escapeHtml(t)}</span>`).join(' ');

  return `
    <div class="lesson-card p-6">
      <div class="mono text-xs mb-2" style="color:var(--muted)">สร้างโดย AI · ${escapeHtml(lesson.category || '')} · ${lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString('th-TH') : ''}</div>
      <h3 class="display text-2xl font-bold mb-4">${escapeHtml(lesson.title || lesson.topic || 'บทเรียนใหม่')}</h3>

      <div class="mb-4"><b>1) ภาพรวม</b><p class="text-sm mt-1">${escapeHtml(lesson.overview || '')}</p></div>
      <div class="mb-4"><b>2) หัวข้อย่อย</b><ul class="text-sm mt-1 list-disc pl-5">${subtopics}</ul></div>
      <div class="mb-4"><b>3) อธิบายง่ายๆ</b><p class="text-sm mt-1">${escapeHtml(lesson.plainExplanation || '')}</p></div>
      <div class="mb-4"><b>4) โครงสร้าง</b><pre class="prompt-box bg-gray-50 border border-gray-200 rounded-lg p-3 mt-1 text-sm">${escapeHtml(lesson.diagram || '')}</pre></div>
      <div class="mb-4"><b>5) ตัวอย่างจริง</b><p class="text-sm mt-1">${escapeHtml(lesson.realExample || '')}</p></div>
      <div class="mb-4"><b>6) ลองทดลองแก้ไข</b><p class="text-sm mt-1">${escapeHtml(lesson.experiment || '')}</p></div>
      <div class="mb-4"><b>7) ผลลัพธ์ที่ควรเห็น</b><p class="text-sm mt-1">${escapeHtml(lesson.expectedResult || '')}</p></div>
      <div class="mb-4"><b>8) สรุป</b><p class="text-sm mt-1">${escapeHtml(lesson.summary || '')}</p></div>
      <div class="mb-2"><b>9) หัวข้อที่เกี่ยวข้อง</b><div class="flex flex-wrap gap-2 mt-2">${related}</div></div>

      <button onclick="copyLessonText('${lesson.id || ''}')" class="mt-4 px-4 py-2 rounded-lg text-sm font-semibold text-white" style="background:var(--pen-coral)">📋 คัดลอกบทเรียนทั้งหมด</button>
    </div>
  `;
}

function lessonToPlainText(lesson) {
  const subtopics = (lesson.subtopics || []).map((s, i) => `  ${i + 1}. ${s}`).join('\n');
  const related = (lesson.relatedTopics || []).join(', ');
  return `หัวข้อ: ${lesson.title || lesson.topic || ''}
หมวดหมู่: ${lesson.category || ''}

1) ภาพรวม
${lesson.overview || ''}

2) หัวข้อย่อย
${subtopics}

3) อธิบายง่ายๆ
${lesson.plainExplanation || ''}

4) โครงสร้าง
${lesson.diagram || ''}

5) ตัวอย่างจริง
${lesson.realExample || ''}

6) ลองทดลองแก้ไข
${lesson.experiment || ''}

7) ผลลัพธ์ที่ควรเห็น
${lesson.expectedResult || ''}

8) สรุป
${lesson.summary || ''}

9) หัวข้อที่เกี่ยวข้อง
${related}`;
}

function copyLessonText(id) {
  let lesson = currentAiLesson;
  if (id && (!lesson || lesson.id !== id)) {
    lesson = savedLessonsCache.find(l => l.id === id) || lesson;
  }
  if (!lesson) return;
  navigator.clipboard.writeText(lessonToPlainText(lesson)).then(() => {
    alert('✅ คัดลอกบทเรียนแล้ว!');
  });
}

async function loadSavedLessons() {
  const grid = document.getElementById('savedLessonsGrid');
  const header = document.getElementById('savedLessonsHeader');
  if (!grid) return;

  try {
    const res = await fetch(`${APPS_SCRIPT_URL}?action=getLessons`);
    const lessons = await res.json();
    if (!Array.isArray(lessons) || lessons.length === 0) {
      savedLessonsCache = [];
      grid.innerHTML = '';
      if (header) header.style.display = 'none';
      return;
    }
    savedLessonsCache = lessons;
    if (header) header.style.display = 'block';
    grid.innerHTML = lessons.map(l => `
      <div class="lesson-card p-5 cursor-pointer" onclick='(function(){ currentAiLesson = savedLessonsCache.find(x=>x.id==="${l.id}"); renderAiLesson(currentAiLesson); })()'>
        <div class="mono text-xs mb-1" style="color:var(--muted)">${escapeHtml(l.category || '')}</div>
        <h4 class="font-bold">${escapeHtml(l.title || l.topic || '')}</h4>
        <p class="text-xs mt-2" style="color:var(--muted)">${l.createdAt ? new Date(l.createdAt).toLocaleDateString('th-TH') : ''}</p>
      </div>
    `).join('');
  } catch (e) {
    // ยังไม่ได้ต่อ action getLessons หรือ backend ยังไม่พร้อม — เงียบไว้ ไม่รบกวนผู้ใช้
    if (header) header.style.display = 'none';
  }
}

// ============================================================
// 📥 LOAD DATA
// ============================================================
async function loadData() {
  console.log('🔄 Loading data...');

  try {
    if (APPS_SCRIPT_URL.includes('ใส่_ID')) {
      throw new Error('APPS_SCRIPT_URL not configured');
    }

    const compRes = await fetch(`${APPS_SCRIPT_URL}?action=getComponents`);
    const compData = await compRes.json();

    if (compData.error || !Array.isArray(compData) || compData.length === 0) {
      throw new Error('Invalid API response');
    }

    components = compData;

    try {
      const favRes = await fetch(`${APPS_SCRIPT_URL}?action=getFavorites&userId=${USER_ID}`);
      const favData = await favRes.json();
      favorites = Array.isArray(favData) ? favData.map(f => f.componentId) : [];
    } catch (e) {
      favorites = [];
    }

    isUsingFallback = false;

  } catch (error) {
    console.log('⚠️  Using fallback data');
    components = FALLBACK_COMPONENTS;
    const saved = localStorage.getItem('favorites_' + USER_ID);
    favorites = saved ? JSON.parse(saved) : [];
    isUsingFallback = true;
  }

  localStorage.setItem('isUsingFallback', isUsingFallback);
  renderCards('all');
  updateFavCount();
}

// ============================================================
// 🎨 RENDER TEMPLATE CARDS (ห้องศึกษา)
// ============================================================
function renderCards(filter = 'all') {
  const grid = document.getElementById('cardsGrid');
  const emptyState = document.getElementById('emptyFavState');

  if (!grid) return;

  grid.innerHTML = '';

  let filtered;
  if (filter === 'favorites') {
    filtered = components.filter(c => favorites.includes(c.id));
    if (filtered.length === 0) {
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    }
  } else {
    if (emptyState) emptyState.classList.add('hidden');
    filtered = filter === 'all' ? components : components.filter(c => c.category === filter);
  }

  filtered.forEach((item, idx) => {
    const card = createCard(item, idx);
    if (card) grid.appendChild(card);
  });
}

function createCard(item, idx) {
  if (!item || !item.id) return null;

  const card = document.createElement('div');
  card.className = 'tpl-card fade-in relative';
  card.style.animationDelay = (idx * 0.05) + 's';

  const starred = favorites.includes(item.id);
  const roomNo = ROOM_NUMBERS[item.category] || '2XX';

  card.innerHTML = `
    ${starred ? '<div class="fav-badge">⭐ ติดดาวแล้ว</div>' : ''}
    <div class="h-32 bg-gradient-to-br ${item.gradient || 'from-gray-400 to-gray-600'} flex items-center justify-center text-6xl relative">
      ${item.emoji || '📦'}
      <button onclick="toggleFavorite('${item.id}')" class="star-btn absolute top-3 right-3 text-4xl ${starred ? 'star-filled' : 'star-empty'} bg-white/30 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center">
        ${starred ? '★' : '☆'}
      </button>
    </div>
    <div class="p-5">
      <div class="mono text-xs font-semibold mb-1" style="color:var(--muted)">ห้อง ${roomNo} · ${item.categoryLabel || (item.category || '').toUpperCase()}</div>
      <h3 class="text-xl font-bold mb-2">${item.title}</h3>
      <p class="text-sm mb-4" style="color:var(--muted)">${item.description || ''}</p>
      <div class="flex gap-2">
        <a href="${item.htmlFileUrl || item.id + '.html'}" target="_blank" class="flex-1 text-white py-2 rounded-lg text-sm font-semibold text-center" style="background:var(--board)">▶️ เล่น</a>
        <button onclick="${item.hasDynamicPrompt ? `openDynamicModal('${item.id}')` : `openModal('${item.id}')`}" class="flex-1 py-2 rounded-lg text-sm font-semibold" style="background:var(--paper-2); color:var(--ink)">${item.hasDynamicPrompt ? '🎯 Dynamic' : '📋 Prompt'}</button>
      </div>
    </div>
  `;

  return card;
}

function filterCards(category, btn) {
  document.querySelectorAll('#filterBar .filter-chip').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderCards(category);
}

// ============================================================
// ⭐ FAVORITES
// ============================================================
function toggleFavorite(id) {
  const idx = favorites.indexOf(id);
  if (idx === -1) {
    favorites.push(id);
  } else {
    favorites.splice(idx, 1);
  }

  localStorage.setItem('favorites_' + USER_ID, JSON.stringify(favorites));
  updateFavCount();

  const activeBtn = document.querySelector('#filterBar .filter-chip.active');
  const currentFilter = activeBtn ? activeBtn.getAttribute('onclick').match(/'([^']+)'/)?.[1] || 'all' : 'all';
  renderCards(currentFilter);
}

function updateFavCount() {
  const el = document.getElementById('favCountLobby');
  if (el) el.textContent = favorites.length;
}

// ============================================================
// 🏆 SHOWCASE (ห้องโชว์ผลงาน) — เก็บใน localStorage
// ============================================================
function loadShowcase() {
  const saved = localStorage.getItem('showcaseItems');
  showcaseItems = saved ? JSON.parse(saved) : [];
  renderShowcase();
  renderLobbyShowcasePreview();
  updateShowcaseCount();
}

function saveShowcase() {
  localStorage.setItem('showcaseItems', JSON.stringify(showcaseItems));
}

function addShowcaseItem() {
  const title = document.getElementById('scTitle').value.trim();
  const author = document.getElementById('scAuthor').value.trim();
  const url = document.getElementById('scUrl').value.trim();
  const desc = document.getElementById('scDesc').value.trim();

  if (!title || !url) {
    alert('กรุณากรอกอย่างน้อย ชื่อผลงาน และลิงก์');
    return;
  }

  showcaseItems.unshift({
    id: 'sc-' + Date.now(),
    title, author: author || 'ไม่ระบุชื่อ', url, desc,
    createdAt: new Date().toISOString()
  });

  saveShowcase();
  document.getElementById('scTitle').value = '';
  document.getElementById('scAuthor').value = '';
  document.getElementById('scUrl').value = '';
  document.getElementById('scDesc').value = '';

  renderShowcase();
  renderLobbyShowcasePreview();
  updateShowcaseCount();
}

function deleteShowcaseItem(id) {
  showcaseItems = showcaseItems.filter(s => s.id !== id);
  saveShowcase();
  renderShowcase();
  renderLobbyShowcasePreview();
  updateShowcaseCount();
}

function renderShowcase() {
  const grid = document.getElementById('showcaseGrid');
  const empty = document.getElementById('emptyShowcaseState');
  if (!grid) return;

  if (showcaseItems.length === 0) {
    grid.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
    return;
  }
  if (empty) empty.classList.add('hidden');

  grid.innerHTML = showcaseItems.map(item => `
    <div class="showcase-card p-5 fade-in">
      <h3 class="font-bold text-lg mb-1">${escapeHtml(item.title)}</h3>
      <div class="text-xs mb-3" style="color:var(--muted)">โดย ${escapeHtml(item.author)}</div>
      ${item.desc ? `<p class="text-sm mb-4">${escapeHtml(item.desc)}</p>` : ''}
      <div class="flex gap-2">
        <a href="${escapeAttr(item.url)}" target="_blank" class="flex-1 text-white py-2 rounded-lg text-sm font-semibold text-center" style="background:var(--board)">🔗 ดูผลงาน</a>
        <button onclick="deleteShowcaseItem('${item.id}')" class="px-3 py-2 rounded-lg text-sm font-semibold" style="background:#FBE0DD; color:#7A2E24">🗑️</button>
      </div>
    </div>
  `).join('');
}

function renderLobbyShowcasePreview() {
  const box = document.getElementById('lobbyShowcasePreview');
  if (!box) return;
  const latest = showcaseItems.slice(0, 3);
  if (latest.length === 0) {
    box.innerHTML = `<p class="text-sm md:col-span-3" style="color:var(--muted)">ยังไม่มีผลงานแปะไว้ — ไปที่ห้องโชว์ผลงาน (ชั้น 3) เพื่อเป็นคนแรก</p>`;
    return;
  }
  box.innerHTML = latest.map(item => `
    <a href="${escapeAttr(item.url)}" target="_blank" class="block p-4 rounded-lg" style="background:var(--paper-2)">
      <div class="font-semibold mb-1">${escapeHtml(item.title)}</div>
      <div class="text-xs" style="color:var(--muted)">โดย ${escapeHtml(item.author)}</div>
    </a>
  `).join('');
}

function updateShowcaseCount() {
  const el = document.getElementById('showcaseCountLobby');
  if (el) el.textContent = showcaseItems.length;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}
function escapeAttr(str) {
  return (str || '').replace(/"/g, '&quot;');
}

// ============================================================
// 📘 TEXTBOOK MODAL
// ============================================================
function openTextbook(category) {
  const tb = TEXTBOOKS[category];
  if (!tb) return;
  document.getElementById('textbookRoom').textContent = `ห้อง ${tb.room}`;
  document.getElementById('textbookTitle').textContent = tb.title;
  document.getElementById('textbookBody').textContent = tb.body;
  document.getElementById('textbookModal').classList.add('active');
}

function closeTextbook() {
  document.getElementById('textbookModal').classList.remove('active');
}

function copyTextbook() {
  const text = document.getElementById('textbookBody').textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert('✅ คัดลอกตำราแล้ว!');
  });
}

// ============================================================
// 📋 MODALS
// ============================================================
function openModal(id) {
  const item = components.find(c => c.id === id);
  if (!item) return;

  document.getElementById('modalCategory').textContent = `ห้อง ${ROOM_NUMBERS[item.category] || '2XX'} · ${item.categoryLabel}`;
  document.getElementById('modalTitle').textContent = (item.emoji || '') + ' ' + item.title;
  document.getElementById('modalPrompt').textContent = item.templatePrompt || 'No prompt';
  document.getElementById('promptModal').classList.add('active');
}

function closeModal() {
  document.getElementById('promptModal').classList.remove('active');
}

function copyPrompt() {
  const text = document.getElementById('modalPrompt').textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert('✅ คัดลอกแล้ว!');
  });
}

function openDynamicModal() {
  document.getElementById('dynamicPromptModal').classList.add('active');
}

function closeDynamicModal() {
  document.getElementById('dynamicPromptModal').classList.remove('active');
}

function generateDynamicPrompt() {
  const main = document.getElementById('mainNodeInput').value;
  const children = document.getElementById('childNodesInput').value;
  const type = document.getElementById('graphTypeSelect').value;

  if (!main || !children) {
    alert('กรุณากรอกข้อมูล');
    return;
  }

  const prompt = `จงสร้าง Interactive ${type}

โหนดหลัก: ${main}
โหนดลูก: ${children}

ใช้ Tailwind CSS + JavaScript
Responsive และสวยงาม`;

  document.getElementById('dynamicPromptText').textContent = prompt;
  document.getElementById('dynamicPromptResult').classList.remove('hidden');
}

function copyDynamicPrompt() {
  const text = document.getElementById('dynamicPromptText').textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert('✅ คัดลอกแล้ว!');
  });
}

// ============================================================
// 📱 PWA
// ============================================================
let deferredPrompt;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js');
  });
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  setTimeout(() => {
    if (localStorage.getItem('pwaBannerDismissed') !== 'true') {
      document.getElementById('installBanner').classList.add('show');
    }
  }, 3000);
});

function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt = null;
    document.getElementById('installBanner').classList.remove('show');
  }
}

function dismissBanner() {
  document.getElementById('installBanner').classList.remove('show');
  localStorage.setItem('pwaBannerDismissed', 'true');
}

// ============================================================
// 🚀 INIT
// ============================================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeDynamicModal();
    closeTextbook();
  }
});

renderLessons();
loadShowcase();
loadSavedLessons();
loadData();
