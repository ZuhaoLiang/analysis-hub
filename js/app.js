/* ======================================
   万象分析 · 核心分析引擎
   Life Discovery Hub - Main Logic
   ====================================== */

// ===== 全局状态 =====
const AppState = {
  user: null,
  mbtiScores: { EI: 0, SN: 0, TF: 0, JP: 0 },
  mbtiCurrent: 0,
  mbtiResults: null,
  allResults: {}
};

// ===== MBTI 初始化（需页面加载后） =====
function initMBTI() {
  console.log('🧠 MBTI 初始化...');
  renderMBTIQuestion();
}

function renderMBTIQuestion() {
  const qs = MBTIData.questions;
  const current = AppState.mbtiCurrent;
  
  if (current >= qs.length) {
    finishMBTI();
    return;
  }
  
  const q = qs[current];
  const progress = ((current) / qs.length) * 100;
  
  const progressFill = $('#mbti-progress .progress-fill');
  const progressText = $('#mbti-progress .progress-text');
  const questionText = $('#mbti-question .question-text');
  
  if (progressFill) progressFill.style.width = progress + '%';
  if (progressText) progressText.textContent = `${current}/${qs.length}`;
  if (questionText) questionText.textContent = q.text;
  
  // 绑定按钮
  $$('#mbti-question .opt-btn').forEach(function(btn) {
    btn.onclick = function() {
      const val = parseInt(this.dataset.value);
      const score = val * q.dir;
      AppState.mbtiScores[q.dim] += score;
      AppState.mbtiCurrent++;
      renderMBTIQuestion();
    };
  });
}

function finishMBTI() {
  const qContainer = $('#mbti-question');
  const resultContainer = $('#mbti-result');
  
  if (qContainer) qContainer.style.display = 'none';
  if (resultContainer) {
    resultContainer.style.display = 'block';
    resultContainer.innerHTML = '';
  }
  
  const result = MBTIData.analyze(AppState.mbtiScores);
  AppState.mbtiResults = result;
  AppState.allResults.mbti = result;
  
  renderMBTIResult(result);
  renderSummary();
}

function renderMBTIResult(result) {
  const container = $('#mbti-result');
  if (!container) return;
  
  const t = result.data;
  
  container.innerHTML = ''
    + '<div class="result-card" style="text-align:center; border-color: ' + t.color + '44;">'
    + '<div style="font-size:48px; margin-bottom:8px;">🧠</div>'
    + '<div style="font-size:32px; font-weight:900; color:' + t.color + '; letter-spacing:4px;">' + result.type + '</div>'
    + '<div style="font-size:20px; font-weight:700; margin:4px 0;">' + t.name + '</div>'
    + '<div style="font-size:13px; color:var(--text-secondary); margin-bottom:16px;">' + t.en + '</div>'
    + '<div style="font-size:14px; color:var(--text-secondary); max-width:400px; margin:0 auto 16px; line-height:1.7;">' + t.desc + '</div>'
    + '</div>'
    
    + '<div class="result-grid auto" style="grid-template-columns:repeat(4,1fr);">'
    + result.dimensions.map(function(d) {
      var pct = Math.abs(d.value)/5*100;
      return '<div class="result-card" style="text-align:center;">'
        + '<div style="font-size:12px; color:var(--text-muted); margin-bottom:4px;">' + d.name + '</div>'
        + '<div style="height:4px; background:rgba(255,255,255,0.08); border-radius:2px; margin:8px 0;position:relative;">'
        + '<div style="position:absolute; height:100%; border-radius:2px; background:var(--accent-gold); width:' + pct + '%;'
        + (d.value < 0 ? 'left:0;' : 'right:0;') + '"></div></div>'
        + '<div style="font-size:14px; color:var(--accent-gold);">' + d.label + '</div>'
        + '</div>';
    }).join('')
    + '</div>'
    
    + '<div class="result-grid auto" style="grid-template-columns:repeat(2,1fr);">'
    + '<div class="result-card"><div class="card-title"><i class="fas fa-star"></i> 优势</div><div class="card-desc">' + t.strengths + '</div></div>'
    + '<div class="result-card"><div class="card-title"><i class="fas fa-exclamation-triangle"></i> 短板</div><div class="card-desc">' + t.weaknesses + '</div></div>'
    + '<div class="result-card"><div class="card-title"><i class="fas fa-briefcase"></i> 适合职业</div><div class="card-desc">' + t.career + '</div></div>'
    + '<div class="result-card"><div class="card-title"><i class="fas fa-heart"></i> 爱情观</div><div class="card-desc">' + t.love + '</div></div>'
    + '<div class="result-card" style="grid-column:1/-1;"><div class="card-title"><i class="fas fa-lightbulb"></i> 成长建议</div><div class="card-desc">' + t.advice + '</div></div>'
    + '</div>';
}

// =============================================
// 全系统运行 — 公开为全局函数供 inline script 调用
// =============================================
window.runAllSystems = function(year, month, day, hour, user) {
  console.log('🚀 开始全系统分析:', year, month, day, hour);
  AppState.allResults = { user: user };
  
  try { renderZodiac(year, month, day, hour); } catch(e) { console.error('Zodiac error:', e); }
  try { renderBazi(year, month, day, hour, user); } catch(e) { console.error('Bazi error:', e); }
  try { renderAstrology(year, month, day, hour); } catch(e) { console.error('Astrology error:', e); }
  try { renderZiwei(year, month, day, hour, user.gender); } catch(e) { console.error('Ziwei error:', e); }
  try { renderMayan(year, month, day); } catch(e) { console.error('Mayan error:', e); }
  try { renderHumanDesign(year, month, day, hour); } catch(e) { console.error('HumanDesign error:', e); }
  
  // MBTI 需用户交互
  initMBTI();
};

// =============================================
// 星座模块
// =============================================
function renderZodiac(year, month, day, hour) {
  const sunSign = Astronomy.westernZodiac(month, day);
  const rising = ZodiacData.risingSign(hour);
  const moon = ZodiacData.moonSign(month, day);
  const compat = ZodiacData.compatibility[sunSign.name] || '';
  const chineseZodiac = Astronomy.chineseZodiac(year);
  
  AppState.allResults.zodiac = { sunSign, rising, moon, compat, chineseZodiac };
  AppState.allResults.zodiacSign = sunSign;
  
  const container = $('#zodiac-result');
  if (!container) return;
  
  container.innerHTML = ''
    + '<div class="result-card" style="text-align:center;">'
    + '<div style="font-size:60px;">' + sunSign.symbol + '</div>'
    + '<div style="font-size:28px; font-weight:700; letter-spacing:4px;">' + sunSign.name + '</div>'
    + '<div style="font-size:13px; color:var(--text-muted);">' + sunSign.element + '象 · ' + sunSign.quality + ' · 守护星' + sunSign.ruler + '</div>'
    + '</div>'
    
    + '<div class="result-grid auto">'
    + '<div class="result-card"><div class="card-title"><i class="fas fa-sun"></i> 太阳星座</div><div class="card-value">' + sunSign.name + ' ' + sunSign.symbol + '</div><div class="card-desc">' + sunSign.personality.slice(0, 60) + '...</div></div>'
    + '<div class="result-card"><div class="card-title"><i class="fas fa-arrow-up"></i> 上升星座</div><div class="card-value">' + rising + '</div><div class="card-desc">你在外的面具和给人的第一印象</div></div>'
    + '<div class="result-card"><div class="card-title"><i class="fas fa-moon"></i> 月亮星座</div><div class="card-value">' + moon + '</div><div class="card-desc">你的情感需求和情绪反应模式</div></div>'
    + '<div class="result-card"><div class="card-title"><i class="fas fa-dragon"></i> 生肖</div><div class="card-value">' + chineseZodiac.animal + ' · ' + chineseZodiac.element + '</div><div class="card-desc">' + chineseZodiac.element + '命' + chineseZodiac.animal + '</div></div>'
    + '</div>'
    
    + '<div class="result-grid auto">'
    + '<div class="result-card"><div class="card-title"><i class="fas fa-brain"></i> 性格特质</div><div class="card-desc">' + sunSign.personality + '</div></div>'
    + '<div class="result-card"><div class="card-title"><i class="fas fa-check-circle" style="color:var(--accent-teal);"></i> 优势</div><div class="card-desc">' + sunSign.strength + '</div><span class="card-tag">长处</span></div>'
    + '<div class="result-card"><div class="card-title"><i class="fas fa-times-circle" style="color:var(--accent-pink);"></i> 弱点</div><div class="card-desc">' + sunSign.weakness + '</div><span class="card-tag">需注意</span></div>'
    + '<div class="result-card"><div class="card-title"><i class="fas fa-briefcase"></i> 职业方向</div><div class="card-desc">' + sunSign.career + '</div></div>'
    + '<div class="result-card"><div class="card-title"><i class="fas fa-heart"></i> 爱情</div><div class="card-desc">' + sunSign.love + '</div><span class="card-tag">最佳配对：' + compat + '</span></div>'
    + '<div class="result-card"><div class="card-title"><i class="fas fa-heartbeat"></i> 健康</div><div class="card-desc">' + sunSign.health + '</div></div>'
    + '<div class="result-card"><div class="card-title"><i class="fas fa-star"></i> 幸运信息</div><div class="card-desc">' + sunSign.luck + '</div></div>'
    + '</div>';
}

// =============================================
// 星盘模块
// =============================================
function renderAstrology(year, month, day, hour) {
  const jd = Astronomy.julianDay(year, month, day, hour);
  const planets = Astronomy.planetPositions(jd);
  const sunSign = Astronomy.westernZodiac(month, day);
  
  const reading = AstrologyData.generateReading(planets, sunSign.name);
  AppState.allResults.astrology = reading;
  
  const container = $('#chart-data');
  if (!container) return;
  
  container.innerHTML = ''
    + '<div class="result-card" style="grid-column:1/-1;"><div class="card-title"><i class="fas fa-sun"></i> 星盘总览</div><div class="card-desc">' + reading.summary + '</div></div>'
    + reading.planets.map(function(p) {
      return '<div class="result-card"><div class="card-title">' + p.symbol + ' ' + p.name + '</div><div class="card-value" style="font-size:16px;">' + p.sign + '</div><div class="card-desc">' + p.info.desc + '</div><span class="card-tag">对应：' + p.info.body + '</span></div>';
    }).join('')
    + '<div class="result-card" style="grid-column:1/-1;"><div class="card-title"><i class="fas fa-home"></i> 宫位系统</div>'
    + '<div class="result-grid auto" style="grid-template-columns:repeat(4,1fr);">'
    + reading.houses.map(function(h) {
      return '<div style="background:rgba(255,255,255,0.03); padding:12px; border-radius:8px; text-align:center;">'
        + '<div style="font-weight:700; color:var(--accent-gold); font-size:13px;">第' + h.num + '宫</div>'
        + '<div style="font-size:14px; margin:4px 0;">' + h.name + '</div>'
        + '<div style="font-size:11px; color:var(--text-muted);">' + h.keywords + '</div></div>';
    }).join('')
    + '</div></div>';
  
  drawChart(planets);
}

function drawChart(planets) {
  const canvas = $('#chart-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  var size = Math.min(600, window.innerWidth - 40);
  canvas.width = size;
  canvas.height = size;
  
  const cx = size/2, cy = size/2;
  const outerR = size/2 - 20;
  const midR = outerR * 0.75;
  const innerR = outerR * 0.65;
  
  ctx.clearRect(0, 0, size, size);
  
  const colors12 = ['#ff6b6b','#ffa94d','#ffd43b','#69db7c','#38d9a9','#22b8cf','#339af0','#748ffc','#9775fa','#f06595','#f783ac','#e599f7'];
  const signNames = ['♈白羊','♉金牛','♊双子','♋巨蟹','♌狮子','♍处女','♎天秤','♏天蝎','♐射手','♑摩羯','♒水瓶','♓双鱼'];
  
  for (let i = 0; i < 12; i++) {
    const startAngle = (i / 12) * 2 * Math.PI - Math.PI/2;
    const endAngle = ((i + 1) / 12) * 2 * Math.PI - Math.PI/2;
    
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, startAngle, endAngle);
    ctx.arc(cx, cy, midR, endAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = colors12[i] + '15';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    const midAngle = (startAngle + endAngle) / 2;
    const textR = (outerR + midR) / 2;
    const tx = cx + Math.cos(midAngle) * textR;
    const ty = cy + Math.sin(midAngle) * textR;
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = Math.max(10, size/40) + 'px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(signNames[i], tx, ty + 4);
  }
  
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, 2 * Math.PI);
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1;
  ctx.stroke();
  
  planets.forEach(function(p) {
    const deg = parseFloat(p.degree);
    const angle = (deg / 360) * 2 * Math.PI - Math.PI/2;
    const r = outerR * 0.6;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, 2*Math.PI);
    ctx.fillStyle = 'rgba(212,168,71,0.3)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(212,168,71,0.6)';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    ctx.fillStyle = '#d4a847';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(p.symbol, x, y + 4);
  });
  
  ctx.beginPath();
  ctx.arc(cx, cy, 3, 0, 2*Math.PI);
  ctx.fillStyle = '#d4a847';
  ctx.fill();
}

// =============================================
// 八字模块
// =============================================
function renderBazi(year, month, day, hour, user) {
  const bazi = Astronomy.bazi(year, month, day, hour, user.timezone);
  const result = BaziEngine.analyze(bazi, year, month, day, hour, user.gender);
  
  AppState.allResults.bazi = bazi;
  AppState.allResults.baziResult = result;
  
  const container = $('#bazi-result');
  if (!container) return;
  
  const pillars = [result.bazi.year, result.bazi.month, result.bazi.day, result.bazi.hour];
  
  container.innerHTML = ''
    + '<div class="result-card" style="text-align:center;">'
    + '<div style="display:flex; justify-content:center; gap:12px; margin-bottom:16px; flex-wrap:wrap;">'
    + pillars.map(function(p) {
      return '<div style="background:rgba(212,168,71,0.1); padding:8px 16px; border-radius:8px; text-align:center;">'
        + '<div style="font-size:24px; font-weight:900; color:var(--accent-gold); letter-spacing:4px;">' + p.full + '</div>'
        + '<div style="font-size:11px; color:var(--text-muted); margin-top:4px;">' + p.gan + '' + p.zhi + '</div></div>';
    }).join('')
    + '</div>'
    + '<div style="font-size:14px; color:var(--text-secondary);">年柱' + result.nanyin.year + ' · 月柱' + result.nanyin.month + ' · 日柱' + result.nanyin.day + ' · 时柱' + result.nanyin.hour + '</div>'
    + '</div>'
    
    + '<div class="result-grid auto">'
    + '<div class="result-card"><div class="card-title"><i class="fas fa-dragon"></i> 生肖</div><div class="card-value">' + result.shengxiao + '</div></div>'
    + '<div class="result-card"><div class="card-title"><i class="fas fa-user"></i> 日主</div><div class="card-value">' + result.riZhu + ' · ' + result.riZhuWuxing + '</div><div class="card-desc">日干代表你自己</div></div>'
    + '<div class="result-card"><div class="card-title"><i class="fas fa-cube"></i> 五行分布</div>'
    + '<div style="display:flex; gap:8px; flex-wrap:wrap;">'
    + Object.entries(result.wuxing).map(function(e) {
      var bars = '';
      for (var i = 0; i < 3; i++) { bars += (i < e[1]) ? '●' : '○'; }
      return '<span style="padding:4px 12px; border-radius:6px; background:rgba(255,255,255,0.05); font-size:13px;">' + e[0] + ': <strong style="color:var(--accent-gold);">' + bars + '</strong></span>';
    }).join('')
    + '</div></div></div>'
    
    + '<div class="result-card"><div class="card-title"><i class="fas fa-balance-scale"></i> 命理分析</div><div class="card-desc" style="white-space:pre-line;">' + result.analysis + '</div></div>'
    
    + '<div class="result-card"><div class="card-title"><i class="fas fa-tags"></i> 十神</div>'
    + '<div class="result-grid auto" style="grid-template-columns:repeat(3,1fr);">'
    + Object.entries(result.shishen).map(function(e) {
      var k = e[0], v = e[1];
      var label = k === 'year' ? '年柱' : k === 'month' ? '月柱' : '时柱';
      return '<div style="text-align:center;"><div style="font-size:12px; color:var(--text-muted);">' + label + '</div><div style="font-weight:700; color:var(--accent-teal); font-size:14px;">' + v.name + '</div><div style="font-size:11px; color:var(--text-secondary);">' + (v.relation === '生我' ? '被生' : v.relation === '克我' ? '被克' : v.relation) + '·' + v.gender + '</div></div>';
    }).join('')
    + '</div></div>';
}

// =============================================
// 紫微斗数模块
// =============================================
function renderZiwei(year, month, day, hour, gender) {
  const chart = ZiweiEngine.generateChart(year, month, day, hour, gender);
  const analysis = ZiweiEngine.analyze(chart);
  
  AppState.allResults.ziwei = analysis;
  
  const gridContainer = $('#ziwei-chart');
  const analysisContainer = $('#ziwei-analysis');
  
  if (gridContainer) {
    gridContainer.innerHTML = chart.map(function(p) {
      var stars = p.mainStars.map(function(s) { 
        return '<span class="star-name" style="color:' + s.info.color + ';">' + s.info.symbol + ' ' + s.name + '</span>';
      }).join('');
      if (!stars) stars = '<span style="color:#444; font-size:11px;">无主星</span>';
      var aux = p.auxStars.map(function(s) {
        return '<span style="color:' + s.info.color + '; font-size:10px; display:inline-block; margin:1px 2px;">' + s.name + '</span>';
      }).join('');
      return '<div class="ziwei-cell"><span class="palace-name">' + p.palace + '</span>' + stars + (aux ? '<div style="font-size:10px; margin-top:4px; border-top:1px solid rgba(255,255,255,0.05); padding-top:2px;">' + aux + '</div>' : '') + '</div>';
    }).join('');
  }
  
  if (analysisContainer) {
    analysisContainer.innerHTML = ''
      + '<div class="result-card" style="grid-column:1/-1;"><div class="card-title"><i class="fas fa-star"></i> 十二宫详解</div><div class="card-desc">紫微斗数十四主星入十二宫，配合六吉六煞，推断一生格局。</div></div>'
      + analysis.map(function(a) {
        return '<div class="result-card" style="border-left: 3px solid ' + a.color + ';">'
          + '<div class="card-title"><span style="color:' + a.color + ';">' + a.starSymbol + '</span> ' + a.palace
          + '<span style="font-weight:400; font-size:12px; color:var(--text-muted); margin-left:auto;">' + a.keywords + '</span></div>'
          + '<div style="font-size:12px; color:var(--accent-gold); margin-bottom:6px;">主星：' + a.mainStars + ' | ' + a.starType + '</div>'
          + '<div class="card-desc" style="margin-bottom:6px;">' + a.fortune + '</div>'
          + '<div class="card-desc" style="margin-bottom:6px; line-height:1.7;">' + a.mainDesc + '</div>'
          + (a.auxStars !== '无' ? '<div style="font-size:12px; color:var(--text-secondary); border-top:1px solid rgba(255,255,255,0.05); padding-top:6px;"><span style="color:var(--accent-teal);">辅星：</span>' + a.auxStars + '</div><div class="card-desc" style="font-size:12px; margin-top:4px;">' + a.auxDesc + '</div>' : '')
          + '</div>';
      }).join('');
  }
}

// =============================================
// 玛雅图腾模块
// =============================================
function renderMayan(year, month, day) {
  const result = MayanEngine.analyze(year, month, day);
  AppState.allResults.mayan = result;
  
  const container = $('#mayan-result');
  if (!container) return;
  
  const g = result.info.mainGlyph;
  const t = result.info.mainTone;
  
  const colorEmoji = g.color === '红' ? '🔴' : g.color === '白' ? '⚪' : g.color === '蓝' ? '🔵' : '🟡';
  const colorHex = g.color === '红' ? '#ef4444' : g.color === '白' ? '#e2e8f0' : g.color === '蓝' ? '#3b82f6' : '#eab308';
  
  container.innerHTML = ''
    + '<div class="result-card" style="text-align:center;">'
    + '<div style="font-size:60px;">' + colorEmoji + '</div>'
    + '<div style="font-size:32px; font-weight:900; letter-spacing:4px; color:' + colorHex + ';">' + g.name + '</div>'
    + '<div style="font-size:18px;">' + result.info.galacticSignature + '</div>'
    + '<div style="font-size:24px; margin:8px 0; color:var(--accent-gold);">KIN ' + result.info.kin + '</div>'
    + '</div>'
    
    + '<div class="result-grid auto">'
    + '<div class="result-card"><div class="card-title"><i class="fas fa-music"></i> 银河音阶</div><div class="card-value" style="font-size:18px;">' + t.name + ' 调性' + t.num + '</div><div class="card-desc">行动：' + t.action + ' · 力量：' + t.power + '</div></div>'
    + '<div class="result-card"><div class="card-title"><i class="fas fa-question-circle"></i> 生命提问</div><div class="card-desc" style="font-size:15px;">"' + result.info.full.question + '"</div></div>'
    + '<div class="result-card"><div class="card-title"><i class="fas fa-wave-square"></i> 波符</div><div class="card-value" style="font-size:18px;">' + result.info.wave.name + '</div><div class="card-desc">第' + result.info.wave.positionNum + '格 · ' + result.info.wave.position + '</div></div>'
    + '<div class="result-card"><div class="card-title">🎨 颜色家族</div><div class="card-desc">' + result.info.colorFamily + '</div></div>'
    + '</div>'
    
    + '<div class="result-card"><div class="card-title"><i class="fas fa-book"></i> 图腾解读</div><div class="card-desc" style="white-space:pre-line;">' + result.analysis + '</div></div>'
    
    + '<div class="result-grid auto" style="grid-template-columns:repeat(3,1fr);">'
    + [result.info.guide, result.info.similar, result.info.opposite].filter(Boolean).map(function(p) {
      var ce = p.color === '红' ? '🔴' : p.color === '白' ? '⚪' : p.color === '蓝' ? '🔵' : '🟡';
      return '<div class="result-card" style="text-align:center;"><div style="font-size:24px;">' + ce + '</div><div class="card-value" style="font-size:16px;">' + p.name + '</div><div class="card-desc">' + p.keyword + '</div></div>';
    }).join('')
    + '</div>';
}

// =============================================
// 人类图模块
// =============================================
function renderHumanDesign(year, month, day, hour) {
  const result = HumanDesignEngine.analyze(year, month, day, hour);
  AppState.allResults.humandesign = result;
  
  const container = $('#humandesign-analysis');
  if (!container) return;
  
  container.innerHTML = ''
    + '<div class="result-card" style="grid-column:1/-1;"><div class="card-title"><i class="fas fa-bolt"></i> ' + result.typeInfo.type + ' · ' + result.typeInfo.typeData.en + '</div><div class="card-desc" style="white-space:pre-line; font-size:14px;">' + result.summary + '</div></div>'
    + '<div class="result-grid auto">'
    + '<div class="result-card" style="text-align:center;"><div style="font-size:36px;">' + result.typeInfo.typeData.symbol + '</div><div class="card-value" style="font-size:18px;">' + result.typeInfo.type + ' (' + result.typeInfo.typeData.pct + ')</div><div class="card-desc">' + result.typeInfo.typeData.en + '</div></div>'
    + '<div class="result-card"><div class="card-title"><i class="fas fa-route"></i> 人生策略</div><div class="card-desc">' + result.typeInfo.typeData.strategy + '</div></div>'
    + '<div class="result-card"><div class="card-title"><i class="fas fa-compass"></i> 内在权威</div><div class="card-value" style="font-size:18px;">' + result.typeInfo.authority + '型</div></div>'
    + '<div class="result-card"><div class="card-title"><i class="fas fa-user-tag"></i> 人生角色</div><div class="card-value" style="font-size:18px;">' + result.typeInfo.profileKey + '</div><div class="card-desc">' + (result.typeInfo.profile ? result.typeInfo.profile.desc : '') + '</div></div>'
    + '</div>';
  
  drawBodyGraph(result.bodyGraph);
}

function drawBodyGraph(bg) {
  const canvas = $('#bodygraph-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  canvas.width = 600;
  canvas.height = 700;
  
  ctx.clearRect(0, 0, 600, 700);
  
  ctx.strokeStyle = 'rgba(212,168,71,0.15)';
  ctx.lineWidth = 3;
  ctx.setLineDash([5, 5]);
  bg.channels.forEach(function(pair) {
    var c1 = bg.centers.find(function(c) { return c.number === pair[0]; });
    var c2 = bg.centers.find(function(c) { return c.number === pair[1]; });
    if (c1 && c2) {
      ctx.beginPath();
      ctx.moveTo(c1.x, c1.y);
      ctx.lineTo(c2.x, c2.y);
      ctx.stroke();
    }
  });
  ctx.setLineDash([]);
  
  bg.centers.forEach(function(c) {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, 2*Math.PI);
    ctx.fillStyle = 'rgba(212,168,71,0.08)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(212,168,71,0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(c.name, c.x, c.y + 4);
  });
  
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.font = '12px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('BodyGraph · 人体图', 300, 680);
}

// =============================================
// 综合报告
// =============================================
function renderSummary() {
  const allResults = AppState.allResults;
  if (!allResults.mbti) return;
  
  const summary = SummaryEngine.generate(allResults);
  
  const container = $('#summary-result');
  if (!container) return;
  
  container.innerHTML = ''
    + '<div style="text-align:center; margin-bottom:24px;">'
    + '<h3 style="font-size:22px; color:var(--accent-gold); letter-spacing:2px;">' + summary.title + '</h3>'
    + '<div style="width:40px; height:2px; background:var(--accent-gold); margin:12px auto;"></div></div>'
    
    + '<div class="result-grid auto">'
    + summary.sections.map(function(s) {
      return '<div class="result-card" style="grid-column:1/-1;"><div class="card-desc" style="font-size:14px; line-height:1.8;">' + s + '</div></div>';
    }).join('')
    + '</div>'
    
    + '<div class="result-card" style="margin-top:16px; border-color:rgba(212,168,71,0.3);">'
    + '<div class="card-title"><i class="fas fa-lightbulb" style="color:var(--accent-gold);"></i> 综合洞察</div>'
    + summary.insights.map(function(i) {
      return '<div style="font-size:14px; line-height:1.8; margin-bottom:12px; padding-left:16px; border-left:2px solid rgba(212,168,71,0.2);">' + i + '</div>';
    }).join('')
    + '</div>'
    
    + '<div style="text-align:center; margin-top:16px; color:var(--text-muted); font-size:12px; font-style:italic;">'
    + '以上分析综合了MBTI、星座、星盘、八字、紫微斗数、玛雅图腾和人类图七大系统。<br>人生充满可能，此分析仅供参考。</div>';
}

console.log('✅ app.js 加载完成，系统就绪！');
console.log('🌐 七大系统已全部注册');
