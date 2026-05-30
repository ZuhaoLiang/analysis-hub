/* ======================================
   玛雅图腾 · 卓尔金历引擎
   ====================================== */

const MayanEngine = {
  // 13个银河音阶完整信息
  tones: [
    { num:1,  name:'磁性的', action:'吸引', power:'合一', question:'我的目的是什么？' },
    { num:2,  name:'月亮的', action:'挑战', power:'极性', question:'我的挑战是什么？' },
    { num:3,  name:'电力的', action:'服务', power:'连结', question:'最好的服务方式是什么？' },
    { num:4,  name:'自我存在的', action:'定义', power:'形式', question:'我以什么形式服务？' },
    { num:5,  name:'超频的', action:'放射', power:'显化', question:'如何赋予我最大的力量？' },
    { num:6,  name:'韵律的', action:'组织', power:'平等', question:'如何将平等扩展？' },
    { num:7,  name:'共振的', action:'启发', power:'通道', question:'如何调整自己服务他人？' },
    { num:8,  name:'银河的', action:'整合', power:'和谐', question:'我是否活出信仰？' },
    { num:9,  name:'太阳的', action:'意图', power:'脉动', question:'我的意图是什么？' },
    { num:10, name:'行星的', action:'显化', power:'完美', question:'如何达成完美？' },
    { num:11, name:'光谱的', action:'解放', power:'消解', question:'如何释放与放下？' },
    { num:12, name:'水晶的', action:'奉献', power:'普世', question:'如何奉献自己？' },
    { num:13, name:'宇宙的', action:'超越', power:'存在', question:'如何超越自己？' }
  ],

  // 20个太阳图腾完整信息
  glyphs: [
    { num:1,  name:'红龙', color:'红', keyword:'诞生',  tribe:'极性', desc:'源头、诞生、滋养、存在。你是开创者，带着原始的生命力。', affirm:'我为了滋养而诞生' },
    { num:2,  name:'白风', color:'白', keyword:'沟通',  tribe:'智慧', desc:'呼吸、沟通、交流、灵气。你是传递信息的使者。', affirm:'我为了沟通而呼吸' },
    { num:3,  name:'蓝夜', color:'蓝', keyword:'梦境',  tribe:'魔法', desc:'丰盛、梦境、直觉、潜意识。你是梦的实现者。', affirm:'我为了丰盛而梦想' },
    { num:4,  name:'黄种子', color:'黄', keyword:'开花', tribe:'魔法', desc:'目标、觉察、开花、结果。你是种下未来的人。', affirm:'我为了目标而觉察' },
    { num:5,  name:'红蛇', color:'红', keyword:'生存',  tribe:'智慧', desc:'生命力、本能、生存、热情。你用热情点燃生命。', affirm:'我为了生存而激发热情' },
    { num:6,  name:'白世界桥', color:'白', keyword:'死亡', tribe:'魔法', desc:'平等、死亡、连接、机会。你是桥梁，连接两个世界。', affirm:'我为了平等而死' },
    { num:7,  name:'蓝手', color:'蓝', keyword:'疗愈',  tribe:'魔法', desc:'完成、疗愈、知晓、行动。你用手创造和疗愈。', affirm:'我为了疗愈而知晓' },
    { num:8,  name:'黄星星', color:'黄', keyword:'优雅',  tribe:'智慧', desc:'美丽、艺术、优雅、装饰。你是闪亮的星星。', affirm:'我为了美丽而优雅' },
    { num:9,  name:'红月', color:'红', keyword:'净化',  tribe:'魔法', desc:'宇宙之水、净化、流动、情绪。你如潮水般流动。', affirm:'我为了净化而流动' },
    { num:10, name:'白狗', color:'白', keyword:'忠诚',  tribe:'魔法', desc:'心、忠诚、爱、陪伴。你以无条件的爱待人。', affirm:'我为了爱而忠诚' },
    { num:11, name:'蓝猴', color:'蓝', keyword:'魔法',  tribe:'智慧', desc:'幻象、游戏、魔法、欢笑。你用欢笑化解一切。', affirm:'我为了魔法而游戏' },
    { num:12, name:'黄人', color:'黄', keyword:'自由意志',tribe:'智慧', desc:'自由意志、智慧、影响、选择。你是自己的主人。', affirm:'我因自由意志而智慧' },
    { num:13, name:'红天行者',color:'红', keyword:'探索', tribe:'智慧', desc:'空间、探索、觉醒、预言。你是不停探索的旅人。', affirm:'我为了探索而觉醒' },
    { num:14, name:'白巫师',color:'白', keyword:'永恒', tribe:'魔法', desc:'接受、永恒、魔法、当下。你活在永恒的当下。', affirm:'我因接受而永恒' },
    { num:15, name:'蓝鹰',color:'蓝', keyword:'洞见',  tribe:'智慧', desc:'视野、创造、洞见、心智。你看清全貌。', affirm:'我为了洞见而创造' },
    { num:16, name:'黄战士',color:'黄', keyword:'追问', tribe:'智慧', desc:'无畏、追问、智慧、才智。你为真理而战斗。', affirm:'我为了追问而无畏' },
    { num:17, name:'红地球',color:'红', keyword:'导航', tribe:'智慧', desc:'共时性、导航、进化、自然。你与大地同步前进。', affirm:'我为了导航而进化' },
    { num:18, name:'白镜子',color:'白', keyword:'反射', tribe:'魔法', desc:'反射、秩序、无止境、真实。你是真相的镜子。', affirm:'我为了反射而秩序' },
    { num:19, name:'蓝风暴',color:'蓝', keyword:'催化', tribe:'魔法', desc:'自体运生、催化、能量、蜕变。你带来风暴般的变革。', affirm:'我为了催化而运化' },
    { num:20, name:'黄太阳',color:'黄', keyword:'开悟', tribe:'魔法', desc:'宇宙之火、开悟、生命、觉醒。你是照亮世界的光。', affirm:'我为了开悟而燃烧' }
  ],

  // 13个银河调性 & 20个图腾 完整周期表
  calendar: function(year, month, day) {
    // 计算公历到卓尔金历的转换
    const jd = Astronomy.julianDay(year, month, day);
    const tzolkin = Astronomy.mayanTzolkin(jd);
    
    // 找到对应的图腾和音阶
    const glyph = this.glyphs.find(g => g.num === tzolkin.glyph.num);
    const tone = this.tones.find(t => t.num === tzolkin.tone.num);
    
    // 波符计算
    const waveGlyphNum = (tzolkin.glyph.num % 20);
    const waveGlyph = this.glyphs.find(g => g.num === waveGlyphNum);
    
    // 内在神殿/指引力量
    const guideNum = ((tzolkin.glyph.num + 7) % 20);
    const guide = this.glyphs.find(g => g.num === (guideNum === 0 ? 20 : guideNum));
    
    // 相似力量
    const similarNum = ((tzolkin.glyph.num + 10) % 20);
    const similar = this.glyphs.find(g => g.num === (similarNum === 0 ? 20 : similarNum));
    
    // 相反力量
    const oppositeNum = ((tzolkin.glyph.num + 9) % 20);
    const opposite = this.glyphs.find(g => g.num === (oppositeNum === 0 ? 20 : oppositeNum));
    
    // 颜色家族
    const colorFamilies = { '红':'启动族 · 红龙部落','白':'基础族 · 智者部落','蓝':'蜕变族 · 魔法师部落','黄':'成熟族 · 太阳部落' };
    
    // 波符中的位置
    const wavePos = ((tzolkin.tone.num) % 13);
    const wavePositions = ['磁性的','月亮的','电力的','自我存在的','超频的','韵律的','共振的','银河的','太阳的','行星的','光谱的','水晶的','宇宙的'];
    
    return {
      kin: tzolkin.kin,
      galacticSignature: `${tone.num}.${glyph.color}${glyph.name}`,
      
      // 主图腾
      mainGlyph: glyph,
      mainTone: tone,
      
      // 神殿力量
      guide: guide,
      similar: similar,
      opposite: opposite,
      
      // 波符
      wave: {
        name: `${waveGlyph.name}波符`,
        glyph: waveGlyph,
        position: wavePositions[wavePos],
        positionNum: wavePos + 1
      },
      
      // 颜色家族
      colorFamily: colorFamilies[glyph.color],
      
      // 完整信息
      full: {
        signature: tzolkin.fullName,
        question: tone.question,
        affirmation: glyph.affirm,
        desc: glyph.desc
      }
    };
  },

  analyze: function(year, month, day) {
    const info = this.calendar(year, month, day);
    const analysis = this.generateAnalysis(info);
    return { info, analysis };
  },

  generateAnalysis: function(info) {
    const lines = [];
    const g = info.mainGlyph;
    const t = info.mainTone;
    
    lines.push(`你的玛雅印记是【${g.color}${g.name}】—— ${g.desc}`);
    lines.push(`银河音阶是【${t.name}】，调性${t.num}：${t.action}的力量、${t.power}的本体。`);
    lines.push(`你的提问是：${t.question}`);
    lines.push(`肯定语：${info.full.affirmation}`);
    lines.push(`所在的波符：${info.wave.name}，位置：第${info.wave.positionNum}格 ${info.wave.position}`);
    
    // 支持力量
    if (info.guide) lines.push(`🌟 指引力量：【${info.guide.color}${info.guide.name}】— ${info.guide.keyword}`);
    if (info.similar) lines.push(`🤝 相似力量：【${info.similar.color}${info.similar.name}】— ${info.similar.keyword}`);
    if (info.opposite) lines.push(`⚡ 挑战力量：【${info.opposite.color}${info.opposite.name}】— ${info.opposite.keyword}`);
    
    lines.push(`颜色家族：${info.colorFamily}`);
    lines.push(`银河印记：${info.galacticSignature} | KIN ${info.kin}`);
    
    return lines.join('\n');
  }
};
