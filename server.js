// // server.js
// const express = require("express");
// const path = require("path");
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// // serve frontend
// app.use(express.static(path.join(__dirname, "public")));

// // ==== Core data: questions + archetypes (ใช้เป็น single source of truth) ====
// const tieBreak = ["Mirror","Bridge","Seed","River","Flame","Roots","Sanctuary","Lighthouse","Horizon"];

// const questions = [
//   {
//     id: 1,
//     sceneKey: "crossroad",
//     background: "bg2.png",
//     question: "เมื่อคุณต้องตัดสินใจบางอย่าง คุณมักฟังเสียงไหนก่อน?",
//     options: [
//       { id: "1A", text: "เสียงของความมั่นใจในใจ", archetype: "Flame" },
//       { id: "1B", text: "เสียงของความถูกต้อง", archetype: "Bridge" },
//       { id: "1C", text: "เสียงของอิสระในตัวเอง", archetype: "Seed" },
//       { id: "1D", text: "เสียงของคนที่คุณรัก", archetype: "Sanctuary" },
//     ],
//   },
//   {
//     id: 2,
//     sceneKey: "storm",
//     background: "bg3.png",
//     question: "ในวันที่ทุกอย่างไม่เป็นไปตามแผน คุณจะทำยังไงก่อน?",
//     options: [
//       { id: "2A", text: "ตั้งสติ แล้ววางแผนใหม่", archetype: "Seed" },
//       { id: "2B", text: "ปล่อยให้ตัวเองพักก่อน", archetype: "River" },
//       { id: "2C", text: "โทรหาใครสักคนที่เข้าใจ", archetype: "Bridge" },
//       { id: "2D", text: "เงียบแล้วฟังหัวใจตัวเอง", archetype: "Mirror" },
//     ],
//   },
//   {
//     id: 3,
//     sceneKey: "mirror-lake",
//     background: "bg4.png",
//     question: "ถ้าคนในกระจกพูดกับคุณได้ เขาจะบอกว่าอะไร?",
//     options: [
//       { id: "3A", text: "คุณทำดีแล้ว อย่ากดดันตัวเองเลย", archetype: "Sanctuary" },
//       { id: "3B", text: "ถึงเวลาไปให้ไกลกว่านี้แล้วนะ", archetype: "Flame" },
//       { id: "3C", text: "ขอบคุณที่ยังไม่ยอมแพ้", archetype: "Seed" },
//       { id: "3D", text: "คุณยังมีความหมาย แม้ไม่มีใครเห็น", archetype: "Mirror" },
//     ],
//   },
//   {
//     id: 4,
//     sceneKey: "bridge",
//     background: "bg2.png", // TODO: เปลี่ยนเป็นรูปสะพานทีหลัง
//     question: "เมื่อมีคนขอความช่วยเหลือ คุณจะทำยังไง?",
//     options: [
//       { id: "4A", text: "หยุดช่วยทันที", archetype: "Bridge" },
//       { id: "4B", text: "มองสถานการณ์ก่อน แล้วค่อยตัดสินใจ", archetype: "Sanctuary" },
//       { id: "4C", text: "ช่วยถ้ามันสอดคล้องกับเป้าหมายของฉัน", archetype: "Flame" },
//       { id: "4D", text: "ถามว่าเขาอยากได้อะไรจริง ๆ", archetype: "Mirror" },
//     ],
//   },
//   {
//     id: 5,
//     sceneKey: "fire-inside",
//     background: "bg3.png", // TODO: เปลี่ยนเป็นรูปกองไฟทีหลัง
//     question: "อะไรจุดไฟในใจคุณได้เสมอ?",
//     options: [
//       { id: "5A", text: "การเห็นตัวเองพัฒนา", archetype: "Seed" },
//       { id: "5B", text: "การได้ทำให้คนอื่นยิ้ม", archetype: "Bridge" },
//       { id: "5C", text: "ความฝันที่ฉันยังไม่ยอมแพ้", archetype: "Flame" },
//       { id: "5D", text: "การได้ใช้ชีวิตในแบบฉันเอง", archetype: "River" },
//     ],
//   },
//   {
//     id: 6,
//     sceneKey: "horizon",
//     background: "bg4.png", // TODO: เปลี่ยนเป็นรูปขอบฟ้า sunrise ทีหลัง
//     question: "คุณอยากให้คนจำคุณว่าเป็นคนแบบไหน?",
//     options: [
//       { id: "6A", text: "คนที่ไม่หยุดเติบโต", archetype: "Seed" },
//       { id: "6B", text: "คนที่ทำให้โลกดีขึ้น", archetype: "Bridge" },
//       { id: "6C", text: "คนที่ไม่กลัวความจริง", archetype: "Mirror" },
//       { id: "6D", text: "คนที่ใช้ชีวิตอย่างมีความสุข", archetype: "River" },
//     ],
//   },
// ];

// const archetypes = {
//   Seed: {
//     key: "Seed",
//     title: "Seed — ผู้เริ่มต้นแสง",
//     meaning: "ผู้ที่เติบโตจากภายใน เห็นความงอกงามแม้ในความเงียบ",
//     warm: "คุณเติบโตจากความไม่รู้เป็นความเข้าใจ โลกนี้อ่อนโยนขึ้นเพราะมีคุณอยู่ตรงนี้",
//     affirm: [
//       "ฉันเติบโตได้ แม้ในวันที่เดินช้า",
//       "การเริ่มใหม่ไม่ใช่การถอยหลัง แต่คือความกล้าของหัวใจ",
//     ],
//     quote: "You are quietly growing, and that is a miracle too.",
//   },
//   Flame: {
//     key: "Flame",
//     title: "Flame — ผู้จุดไฟกล้าหาญ",
//     meaning: "ผู้สร้างแรงบันดาลใจด้วยความกล้า แม้ใจสั่นก็ยังเลือกจะลุกขึ้นอีกครั้ง",
//     warm: "คุณคือไฟแห่งแรงบันดาลใจ ไม่ใช่เพราะคุณไม่กลัว แต่เพราะคุณยังเลือกจะลุกขึ้นเสมอ",
//     affirm: [
//       "ฉันเลือกก้าวต่อ แม้วันที่หัวใจสั่น",
//       "แรงของฉันไม่ใช่ความวู่วาม แต่เป็นความกล้าที่ซื่อสัตย์",
//     ],
//     quote: "Your courage lights the path.",
//   },
//   River: {
//     key: "River",
//     title: "River — ผู้ไหลผ่านอย่างลึกและสงบ",
//     meaning: "ผู้ที่อ่อนโยนแต่หนักแน่น ความอ่อนไหวคือพลังที่พาให้เติบโต",
//     warm: "คุณรู้จักปล่อยให้ชีวิตไหลไปตามทางของมัน และยังคงเติบโตอย่างงดงาม",
//     affirm: [
//       "ความอ่อนไหวของฉันคือพลัง ไม่ใช่จุดอ่อน",
//       "ฉันอนุญาตให้ตัวเองนิ่ง และงอกงามในความเงียบ",
//     ],
//     quote: "Soft is strong.",
//   },
//   Horizon: {
//     key: "Horizon",
//     title: "Horizon — ผู้มองเห็นไกลกว่าใคร",
//     meaning: "ผู้ถือแผนที่ของอนาคตในใจ เห็นสิ่งที่ยังไม่เกิดขึ้น",
//     warm: "หัวใจคุณชอบถามว่า ‘เราเกิดมาทำไม’ และคุณไม่เคยให้คำตอบที่เล็กเกินไป",
//     affirm: [
//       "ฉันมองไกล และฉันเดินไปถึง",
//       "ความฝันของฉันคือแผนที่ ไม่ใช่แค่ความฝันลอย ๆ",
//     ],
//     quote: "See further. Walk steady.",
//   },
//   Lighthouse: {
//     key: "Lighthouse",
//     title: "Lighthouse — แสงที่พาคนกลับบ้าน",
//     meaning: "ผู้ชี้แสงและพาคนอื่นเข้าฝั่ง",
//     warm: "คุณคือเหตุผลที่บางคนไม่หลงทาง อย่าลืมว่าคนส่องทางก็สมควรได้พักเหมือนกัน",
//     affirm: [
//       "การช่วยเหลือคนอื่นไม่ลดคุณค่าของฉัน",
//       "ฉันสมควรได้รับแสงอุ่นเช่นกัน",
//     ],
//     quote: "Your light helps others arrive.",
//   },
//   Sanctuary: {
//     key: "Sanctuary",
//     title: "Sanctuary — ที่พักหัวใจ",
//     meaning: "ผู้มอบความปลอดภัยและความสงบ",
//     warm: "คุณทำให้โลกช้าลงอย่างสวยงาม ในความเงียบของคุณ คนอื่นรู้สึกปลอดภัยที่จะเป็นตัวเอง",
//     affirm: [
//       "ฉันคือพื้นที่ปลอดภัย ไม่ใช่ที่รองรับ",
//       "ความสงบของฉันคือพลังที่รักษาไปทีละน้อย",
//     ],
//     quote: "Rest is returning home.",
//   },
//   Bridge: {
//     key: "Bridge",
//     title: "Bridge — ผู้เชื่อมใจคน",
//     meaning: "ผู้เชื่อมโลกผ่านความเข้าใจและความสัมพันธ์จริงใจ",
//     warm: "คุณเชื่อมโลกผ่านความเข้าใจ คุณคือสะพานระหว่างความต่าง",
//     affirm: [
//       "ความอ่อนไหวของฉันคือสะพาน ไม่ใช่ภาระ",
//       "ฉันเชื่อมคนด้วยความจริงใจ และนั่นคือของขวัญ",
//     ],
//     quote: "Connection is a quiet revolution.",
//   },
//   Mirror: {
//     key: "Mirror",
//     title: "Mirror — ผู้ซื่อสัตย์กับความจริง",
//     meaning: "ผู้กล้ามองความจริงอย่างอ่อนโยน",
//     warm: "คุณเห็นตัวเองอย่างที่เป็น และนั่นคือความกล้าที่ยิ่งใหญ่ที่สุด",
//     affirm: [
//       "ฉันซื่อสัตย์กับหัวใจและความเจ็บปวดของตัวเอง",
//       "ความจริงของฉันนำทางฉันไปสู่เสรีภาพ",
//     ],
//     quote: "Honesty heals.",
//   },
//   Roots: {
//     key: "Roots",
//     title: "Roots — ผู้ฝังรากมั่นคง",
//     meaning: "ผู้ยืนอยู่บนตัวตนและคุณค่าลึก ๆ ของตัวเอง",
//     warm: "ความมั่นคงของคุณทำให้คนรอบตัวรู้สึกปลอดภัย คุณคือรากที่ทำให้ต้นไม้ยืนหยัด",
//     affirm: [
//       "ฉันมั่นคงเพราะรู้จักรากของตัวเอง",
//       "การอยู่กับตัวเองคือพลัง ไม่ใช่ความโดดเดี่ยว",
//     ],
//     quote: "Stand firm. Grow kind.",
//   },
// };

// // ---- API ----

// // ส่งชุดคำถาม + meta
// app.get("/api/questions", (req,res)=>{
//   res.json({ questions });
// });

// // รับคำตอบ → คำนวณ archetype → ส่งผล +ข้อความกลับ
// app.post("/api/evaluate", (req,res)=>{
//   const { name, answers } = req.body; // answers: [{questionId, optionId}]
//   if (!Array.isArray(answers) || answers.length === 0) {
//     return res.status(400).json({ error: "invalid answers" });
//   }

//   const score = {};
//   Object.keys(archetypes).forEach(k => score[k] = 0);

//   for (const ans of answers) {
//     const q = questions.find(q => q.id === ans.questionId);
//     if (!q) continue;
//     const opt = q.options.find(o => o.id === ans.optionId);
//     if (!opt) continue;
//     score[opt.archetype] += 1;
//   }

//   let max = Math.max(...Object.values(score));
//   let candidates = Object.keys(score).filter(k => score[k] === max);
//   let winner = candidates.length === 1 ? candidates[0] : tieBreak.find(k => candidates.includes(k));

//   const result = archetypes[winner];

//   // log เพื่อ debug; ถ้าอยากเก็บลง DB ค่อยต่อเพิ่มตรงนี้
//   console.log("Result:", { name, winner, score });

//   res.json({
//     name,
//     winner,
//     score,
//     archetype: result,
//   });
// });

// // fallback ส่ง index.html
// app.get("*",(req,res)=>{
//   res.sendFile(path.join(__dirname,"public","index.html"));
// });

// app.listen(PORT, ()=> {
//   console.log(`BYC Journey running at http://localhost:${PORT}`);
// });