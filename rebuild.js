const fs = require('fs');
const path = require('path');
const file = path.join(process.env.USERPROFILE, '.openclaw/workspace/analysis-hub/index.html');
let h = fs.readFileSync(file, 'utf8');
const changes = [];

// ===== 1. Add nav links =====
const nav = h.indexOf('</nav>');
const navLinks = `
        <a href="#numerology" class="nav-link" data-system="numerology">• 灵数</a>
        <a href="#lunarmansion" class="nav-link" data-system="lunarmansion">• 星宿</a>
        <a href="#zhengyu" class="nav-link" data-system="zhengyu">• 政余</a>`;
// Insert before </nav>
h = h.substring(0, nav) + navLinks + h.substring(nav);
changes.push('nav links');

// ===== 2. Add HTML sections after humandesign section =====
const humandesignEnd = h.indexOf('</section>', h.indexOf('humandesign'));
const summaryStart = h.indexOf('<!-- ===== 综合报告', humandesignEnd);
const newSections = `
  <!-- ===== 灵数系统 ===== -->
  <section id="numerology" class="section system-section" data-system="numerology">
    <div class="section-inner">
      <div class="system-header">
        <span class="system-icon">🔢</span>
        <h2 class="section-title">灵数 · 生命数字</h2>
        <p class="section-desc">Numerology · 生命道路数字 · 天赋使命 · 灵魂目标</p>
      </div>
      <div id="numerology-result" class="result-grid"></div>
    </div>
  </section>

  <!-- ===== 星宿系统 ===== -->
  <section id="lunarmansion" class="section system-section" data-system="lunarmansion">
    <div class="section-inner">
      <div class="system-header">
        <span class="system-icon">🌙</span>
        <h2 class="section-title">星宿 · 二十八宿</h2>
        <p class="section-desc">Chinese Lunar Mansions · 二十八宿命运解读</p>
      </div>
      <div id="lunarmansion-result" class="result-grid"></div>
    </div>
  </section>

  <!-- ===== 政余系统 ===== -->
  <section id="zhengyu" class="section system-section" data-system="zhengyu">
    <div class="section-inner">
      <div class="system-header">
        <span class="system-icon">⚖️</span>
        <h2 class="section-title">政余 · 政余星命</h2>
        <p class="section-desc">ZhengYu Astrology · 星命推演 · 格局变迁</p>
      </div>
      <div id="zhengyu-result" class="result-grid"></div>
    </div>
  </section>
`;
h = h.substring(0, humandesignEnd + 12) + newSections + h.substring(humandesignEnd + 12);
changes.push('HTML sections');

// ===== 3. Add JS data and render functions =====
// Find the insertion point - right before renderSummary
const renderSummaryPos = h.indexOf('function renderSummary(');
const beforeSummary = h.lastIndexOf('\n// ', renderSummaryPos - 1);

const jsCode = `
// =============================================
// 灵数 · 生命数字密码
// =============================================
const NumerologyData = {
  lifePathDesc: {\n    1: { name:'开创者', trait:'独立、开创、领导', desc:'数字1是万物之始。你天生就是领导者。', strength:'勇敢果断、领导力强', weakness:'过于自我、缺乏耐心', career:'CEO、创业者、项目经理', love:'需要能欣赏你独立个性的伴侣。', color:'#FF4444', advice:'相信自己的直觉，但也要给他人发光的机会。' },
    2: { name:'调和者', trait:'敏感、合作、平衡', desc:'数字2是关系的化身。你天生善于理解他人。', strength:'善解人意、合作能力强', weakness:'过于敏感、优柔寡断', career:'心理咨询师、外交官、设计师', love:'你的温柔是最动人的魅力。', color:'#FF8800', advice:'你的敏感是天赋不是负担。学会在照顾他人的同时照顾自己。' },
    3: { name:'表达者', trait:'创意、乐观、社交', desc:'数字3是快乐和创造的能量。', strength:'创意十足、口才出众', weakness:'三分钟热度、情绪化', career:'作家、演员、设计师、讲师', love:'你需要一个能欣赏你社交魅力的伴侣。', color:'#FFCC00', advice:'不要让外界的评价熄灭你的热情。' },
    4: { name:'建设者', trait:'稳定、务实、勤奋', desc:'数字4是稳定的基石。', strength:'务实可靠、组织力强', weakness:'固执、缺乏变通', career:'建筑师、会计师、工程师', love:'最可靠的伴侣，爱藏在日复一日的付出中。', color:'#44BB44', advice:'生活不只是工作。给惊喜留一些空间。' },
    5: { name:'自由者', trait:'自由、冒险、好奇', desc:'数字5是自由的灵魂。', strength:'适应力强、兴趣广泛', weakness:'不负责任、容易冲动', career:'旅行家、记者、营销专家', love:'需要能给你空间和自由的伴侣。', color:'#44BBFF', advice:'真正的自由不是逃避，而是选择的勇气。' },
    6: { name:'守护者', trait:'责任、奉献、关爱', desc:'数字6是无条件的爱。', strength:'责任感强、爱心满满', weakness:'完美主义、过度牺牲', career:'教师、医生、社工、设计师', love:'家是你心灵的中心。爱是双向的付出。', color:'#8844FF', advice:'先给自己的氧气面罩戴好，再去帮助别人。' },
    7: { name:'探寻者', trait:'智慧、沉思、分析', desc:'数字7是知识追寻者。', strength:'深度思考、分析力强', weakness:'孤僻冷漠、过度分析', career:'科学家、哲学家、研究员', love:'需要能理解你独处需求的伴侣。', color:'#4488FF', advice:'有些答案在体验中，不在思考中。' },
    8: { name:'掌控者', trait:'权力、财富、成就', desc:'数字8是力量和成就的化身。', strength:'商业头脑、决策力强', weakness:'工作狂、控制欲强', career:'企业家、投资家、高管', love:'最强的人也需要一个温暖的港湾。', color:'#CC3333', advice:'真正的丰盛是物质富足和精神丰盈的平衡。' },
    9: { name:'人道者', trait:'大爱、智慧、包容', desc:'数字9是智慧的终点。', strength:'胸怀广阔、富有同情心', weakness:'过于理想化、容易沮丧', career:'慈善家、艺术家、NGO工作者', love:'伟大的爱要从身边的人开始实践。', color:'#CC8833', advice:'先爱自己，才能真正地爱他人。' }
  },
  analyze: function(birthDate) {
    var date = new Date(birthDate);
    var y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate();
    var sum = y.toString().split('').reduce(function(a,b){return a+ +b;},0) + m + d;
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce(function(a,b){return a+ +b;},0);
    }
    var data = this.lifePathDesc[sum] || this.lifePathDesc[1];
    return { lifePath:sum, data:data };
  }
};

function renderNumerology(year, month, day) {
  var result = NumerologyData.analyze(year+'-'+month+'-'+day);
  var c = $('#numerology-result');
  if (!c) return;
  var d = result.data;
  AppState.allResults.numerology = result;
  c.innerHTML = '<div class="result-card" style="text-align:center;"><div style="font-size:60px;">🔢</div><div style="font-size:28px; font-weight:700; color:'+d.color+';">生命数字 '+result.lifePath+'</div><div style="color:var(--accent-gold); margin:4px 0; font-size:18px;">'+d.name+'</div><div style="font-size:14px; color:var(--text-secondary); line-height:1.8; max-width:500px; margin:0 auto;">'+d.desc+'</div></div><div class="result-grid auto"><div class="result-card"><div class="card-title">🧠 核心特质</div><div class="card-desc">'+d.trait+'</div></div><div class="result-card"><div class="card-title" style="color:var(--accent-teal);">✅ 优势</div><div class="card-desc">'+d.strength+'</div></div><div class="result-card"><div class="card-title" style="color:var(--accent-pink);">⚠️ 成长方向</div><div class="card-desc">'+d.weakness+'</div></div><div class="result-card"><div class="card-title">💼 适合职业</div><div class="card-desc">'+d.career+'</div></div><div class="result-card"><div class="card-title" style="color:var(--accent-pink);">❤️ 爱情指引</div><div class="card-desc">'+d.love+'</div></div><div class="result-card"><div class="card-title" style="color:var(--accent-gold);">💡 成长建议</div><div class="card-desc">'+d.advice+'</div></div></div>';
}

// =============================================
// 星宿 · 二十八宿 (简化版)
// =============================================
const LunarMansionData = {
  mansions: [
    {id:1,name:'角宿',icon:'🦌',dir:'东',group:'青龙',animal:'木蛟',dates:'03.21-04.04',desc:'角宿为东方青龙之首。角宿之人天生领袖气质，行事果断。',personality:'果断自信、领导力强',strength:'开拓精神、决策力',weakness:'急躁冲动、缺乏耐心',career:'企业家、项目经理、运动员',love:'主动而真诚，但需学会倾听',luck:'青色·数字3·东方'},
    {id:2,name:'亢宿',icon:'🦒',dir:'东',group:'青龙',animal:'金龙',dates:'04.05-04.19',desc:'亢宿为青龙之颈。亢宿之人聪明机敏，口才出众。',personality:'聪明机智、口才出众',strength:'沟通能力、学习力',weakness:'缺乏韧性、好胜',career:'媒体人、教师、营销专家',love:'善于表达但勿过于强势',luck:'金色·数字5·东南'},
    {id:3,name:'氐宿',icon:'🦚',dir:'东',group:'青龙',animal:'土貉',dates:'04.20-05.04',desc:'氐宿为青龙之胸。氐宿之人踏实稳重，行事谨慎。',personality:'沉稳踏实、谨慎周密',strength:'稳定可靠、理财能力',weakness:'保守固执、慢热',career:'金融分析师、工程师',love:'一生的忠诚是最动人的情话',luck:'棕色·数字6·东北'}
  ],
  get: function(m,d){var md=m*100+d;for(var i=0;i<this.mansions.length;i++){var p=this.mansions[i].dates.split('-'),s=p[0].split('.'),e=p[1].split('.'),ss=parseInt(s[0])*100+parseInt(s[1]),ee=parseInt(e[0])*100+parseInt(e[1]);if(md>=ss&&md<=ee)return this.mansions[i]}return this.mansions[0]}
};

function renderLunarMansion(month, day) {
  var m = LunarMansionData.get(month, day);
  var c = $('#lunarmansion-result');
  if (!c) return;
  AppState.allResults.lunarmansion = m;
  c.innerHTML = '<div class="result-card" style="text-align:center;"><div style="font-size:60px;">'+m.icon+'</div><div style="font-size:28px; font-weight:700;">'+m.name+'</div><div style="font-size:14px; color:var(--accent-gold); margin:4px 0;">'+m.group+' · '+m.animal+' · '+m.dir+'方</div><div style="font-size:13px; color:var(--text-secondary); line-height:1.8;">'+m.desc+'</div></div><div class="result-grid auto"><div class="result-card"><div class="card-title">🧠 性格特质</div><div class="card-desc">'+m.personality+'</div></div><div class="result-card"><div class="card-title" style="color:var(--accent-teal);">✅ 优势</div><div class="card-desc">'+m.strength+'</div></div><div class="result-card"><div class="card-title" style="color:var(--accent-pink);">⚠️ 成长点</div><div class="card-desc">'+m.weakness+'</div></div><div class="result-card"><div class="card-title">💼 适合职业</div><div class="card-desc">'+m.career+'</div></div><div class="result-card"><div class="card-title" style="color:var(--accent-pink);">❤️ 爱情</div><div class="card-desc">'+m.love+'</div></div><div class="result-card"><div class="card-title">🍀 幸运信息</div><div class="card-desc">'+m.luck+'</div></div></div>';
}

// =============================================
// 政余 · 政余星命 (简化版)
// =============================================
const ZhengyuData = {
  patterns: [
    {id:'mu',name:'木星守命',icon:'🌳',element:'木',season:'春',desc:'如春日之木，生机勃勃。天生向上的生命力。',personality:'积极向上、有生命力',strength:'生命韧性、包容力',career:'教育、环保、艺术创作',love:'像春天一样温暖，但需保持底线'},
    {id:'huo',name:'火星照命',icon:'🔥',element:'火',season:'夏',desc:'如夏日骄阳，热情四射。天生的领导者。',personality:'热情奔放、领导力强',strength:'热情、感染力、行动力',career:'管理、演艺、创业',love:'轰轰烈烈，也要学会在平淡中保持温度'},
    {id:'tu',name:'土星镇守',icon:'⛰️',element:'土',season:'四季',desc:'如大地般稳固。最可靠的坚实后盾。',personality:'沉稳可靠、务实进取',strength:'稳定性、责任心、耐力',career:'建筑、金融、工程',love:'行动比言语更深情的告白'}
  ],
  analyze: function(y,m,d){return this.patterns[(m+((y%8)%3))%this.patterns.length];}
};

function renderZhengyu(year, month, day) {
  var p = ZhengyuData.analyze(year, month, day);
  var c = $('#zhengyu-result');
  if (!c) return;
  AppState.allResults.zhengyu = p;
  c.innerHTML = '<div class="result-card" style="text-align:center;"><div style="font-size:60px;">'+p.icon+'</div><div style="font-size:28px; font-weight:700;">'+p.name+'</div><div style="font-size:14px; color:var(--accent-gold); margin:4px 0;">五行属'+p.element+' · '+p.season+'</div><div style="font-size:13px; color:var(--text-secondary); line-height:1.8;">'+p.desc+'</div></div><div class="result-grid auto"><div class="result-card"><div class="card-title">🧠 性格特质</div><div class="card-desc">'+p.personality+'</div></div><div class="result-card"><div class="card-title" style="color:var(--accent-teal);">✅ 优势</div><div class="card-desc">'+p.strength+'</div></div><div class="result-card"><div class="card-title">💼 职业方向</div><div class="card-desc">'+p.career+'</div></div><div class="result-card"><div class="card-title" style="color:var(--accent-pink);">❤️ 爱情指引</div><div class="card-desc">'+p.love+'</div></div></div>';
}
`;

const insertPos = h.lastIndexOf('\n', renderSummaryPos - 1) + 1;
h = h.substring(0, insertPos) + '\n' + jsCode + '\n' + h.substring(insertPos);
changes.push('JS engines + render functions');

// ===== 4. Add render calls to runAllSystems =====
const runSystemsEnd = h.indexOf('// MBTI 需用户交互');
const newCalls = `  try { renderNumerology(year, month, day); } catch(e) { console.error('Numerology error:', e); }\n  try { renderLunarMansion(month, day); } catch(e) { console.error('Mansion error:', e); }\n  try { renderZhengyu(year, month, day); } catch(e) { console.error('Zhengyu error:', e); }\n`;
h = h.substring(0, runSystemsEnd) + newCalls + h.substring(runSystemsEnd);
changes.push('render calls in runAllSystems');

// ===== Verify syntax =====
fs.writeFileSync(file, h, 'utf8');
var m = h.match(/<script>([\s\S]*?)<\/script>/);
if (m) {
  var ck = path.join(process.env.USERPROFILE, '.openclaw/workspace/analysis-hub/__ck.js');
  fs.writeFileSync(ck, m[1], 'utf8');
  try {
    require('child_process').execSync('node --check "' + ck + '"', { stdio: 'pipe' });
    console.log('✅ Syntax OK');
  } catch(e) {
    console.log('❌ ' + (e.stderr || '').toString().substring(0, 200));
    fs.unlinkSync(ck);
    process.exit(1);
  }
  fs.unlinkSync(ck);
}

console.log('✅ Changes: ' + changes.join(', '));
console.log('✅ Size: ' + (fs.statSync(file).size/1024).toFixed(0) + ' KB');
