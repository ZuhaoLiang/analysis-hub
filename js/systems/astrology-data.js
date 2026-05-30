/* ======================================
   星盘分析数据
   ====================================== */

const AstrologyData = {
  // 宫位含义
  houses: [
    { num:1, name:'命宫', desc:'自我、外貌、性格、人生开端', keywords:'个性·外貌·生命力' },
    { num:2, name:'财帛宫', desc:'财富、价值观、物质资源、自我价值', keywords:'金钱·价值观·资源' },
    { num:3, name:'兄弟宫', desc:'沟通、学习、兄弟姐妹、短途旅行', keywords:'交流·学习·邻里' },
    { num:4, name:'田宅宫', desc:'家庭、根源、房产、内在情感', keywords:'家庭·根源·安全感' },
    { num:5, name:'子女宫', desc:'爱情、创意、子女、娱乐、投机', keywords:'恋爱·创造·享乐' },
    { num:6, name:'奴仆宫', desc:'健康、工作、服务、日常规范', keywords:'健康·工作·服务' },
    { num:7, name:'夫妻宫', desc:'婚姻、合作关系、公开的敌人', keywords:'伴侣·合作·契约' },
    { num:8, name:'疾厄宫', desc:'深度变革、遗产、性、心理', keywords:'蜕变·遗产·奥秘' },
    { num:9, name:'迁移宫', desc:'高等教育、旅行、哲学、信仰', keywords:'远行·学问·信仰' },
    { num:10, name:'官禄宫', desc:'事业、社会地位、声望、天命', keywords:'事业·成就·公众' },
    { num:11, name:'福德宫', desc:'社交、理想、团体、希望', keywords:'社交·愿景·群体' },
    { num:12, name:'玄秘宫', desc:'潜意识、灵性、隐藏、修行', keywords:'灵性·秘密·业力' }
  ],

  // 行星含义
  planets: {
    '太阳':   { sign:'自我核心', desc:'你的核心本质、生命力、自我表达', body:'心脏' },
    '月亮':   { sign:'情感本能', desc:'你的情绪反应、潜意识、安全感来源', body:'胃' },
    '水星':   { sign:'思维沟通', desc:'你的思维方式、沟通风格、学习模式', body:'神经系统' },
    '金星':   { sign:'爱与美', desc:'你的爱情观、审美、价值观、社交风格', body:'肾脏' },
    '火星':   { sign:'行动力', desc:'你的行动方式、欲望、能量指向', body:'肌肉' },
    '木星':   { sign:'扩张幸运', desc:'你的好运来源、成长方向、慷慨之处', body:'肝脏' },
    '土星':   { sign:'责任考验', desc:'你的课题、限制、成熟的方向', body:'骨骼' },
    '天王星': { sign:'变革独立', desc:'你的叛逆之处、独特天赋', body:'循环系统' },
    '海王星': { sign:'梦想灵性', desc:'你的灵感、迷惘、需要清醒的领域', body:'松果体' },
    '冥王星': { sign:'深度蜕变', desc:'你的转化力量、最深的驱动力', body:'生殖系统' }
  },

  // 相位角度含义
  aspects: {
    '0°合相':   { symbol:'☌', orb:8, desc:'融合、加强、聚焦', nature:'中性' },
    '60°六分相': { symbol:'⚹', orb:6, desc:'机会、和谐、助力', nature:'吉' },
    '90°四分相': { symbol:'□', orb:6, desc:'挑战、冲突、张力', nature:'凶' },
    '120°三分相': { symbol:'△', orb:8, desc:'天赋、和谐、顺遂', nature:'吉' },
    '180°对分相': { symbol:'☍', orb:8, desc:'对立、互补、投射', nature:'中性' }
  },

  // 星盘解读
  generateReading: function(planets, sunSign) {
    const reading = {
      summary: `${sunSign}的你，太阳赋予你${AstrologyData.planets['太阳'].desc}的特质。`,
      houses: [],
      planets: []
    };

    planets.forEach(p => {
      if (AstrologyData.planets[p.name]) {
        const info = AstrologyData.planets[p.name];
        reading.planets.push({
          name: p.name,
          symbol: p.symbol,
          sign: `${p.sign} ${p.position}`,
          info: info
        });
      }
    });

    // 简易宫位解读
    const houseIdx = Math.floor((parseFloat(planets[0]?.degree || 0) % 360) / 30);
    AstrologyData.houses.forEach(h => {
      reading.houses.push(h);
    });

    return reading;
  }
};
