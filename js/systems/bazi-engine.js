/* ======================================
   八字引擎 · 命理分析
   ====================================== */

const BaziEngine = {
  // 五行
  wuxing: ['金','水','木','火','土'],

  // 天干五行
  ganWuxing: { '甲':'木','乙':'木','丙':'火','丁':'火','戊':'土','己':'土','庚':'金','辛':'金','壬':'水','癸':'水' },

  // 地支五行
  zhiWuxing: { '子':'水','丑':'土','寅':'木','卯':'木','辰':'土','巳':'火','午':'火','未':'土','申':'金','酉':'金','戌':'土','亥':'水' },

  // 地支藏干
  zhiCanggan: {
    '子':['癸'], '丑':['己','癸','辛'], '寅':['甲','丙','戊'],
    '卯':['乙'], '辰':['戊','乙','癸'], '巳':['丙','庚','戊'],
    '午':['丁','己'], '未':['己','丁','乙'], '申':['庚','壬','戊'],
    '酉':['辛'], '戌':['戊','辛','丁'], '亥':['壬','甲']
  },

  // 十神关系
  shishen: function(dayGan, otherGan) {
    const ganOrder = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
    const dayIdx = ganOrder.indexOf(dayGan);
    const otherIdx = ganOrder.indexOf(otherGan);
    const diff = ((otherIdx - dayIdx) % 10 + 10) % 10;
    
    const meWuxing = this.ganWuxing[dayGan];
    const otherWuxing = this.ganWuxing[otherGan];
    const relation = this.wuxingRelation(meWuxing, otherWuxing);
    
    // 同阴阳为偏/正
    const sameYinYang = (dayIdx % 2) === (otherIdx % 2);
    const gender = sameYinYang ? '偏' : '正';
    
    const names = {
      '同我': { 正:'比肩', 偏:'劫财' },
      '我生': { 正:'食神', 偏:'伤官' },
      '生我': { 正:'正印', 偏:'偏印' },
      '克我': { 正:'正官', 偏:'七杀' },
      '我克': { 正:'正财', 偏:'偏财' }
    };
    
    return { relation, gender, name: names[relation][gender] };
  },

  // 五行关系
  wuxingRelation: function(me, other) {
    const cycle = ['木','火','土','金','水'];
    const meIdx = cycle.indexOf(me);
    const otherIdx = cycle.indexOf(other);
    const diff = ((otherIdx - meIdx) % 5 + 5) % 5;
    if (diff === 0) return '同我';
    if (diff === 1) return '我生';
    if (diff === 2) return '我克';
    if (diff === 3) return '克我';
    if (diff === 4) return '生我';
    return '同我';
  },

  // 纳音（简化版）
  nanyin: function(gan, zhi) {
    const pairs = {
      '甲子': '海中金', '乙丑': '海中金', '丙寅': '炉中火', '丁卯': '炉中火',
      '戊辰': '大林木', '己巳': '大林木', '庚午': '路旁土', '辛未': '路旁土',
      '壬申': '剑锋金', '癸酉': '剑锋金', '甲戌': '山头火', '乙亥': '山头火',
      '丙子': '涧下水', '丁丑': '涧下水', '戊寅': '城头土', '己卯': '城头土',
      '庚辰': '白蜡金', '辛巳': '白蜡金', '壬午': '杨柳木', '癸未': '杨柳木',
      '甲申': '泉中水', '乙酉': '泉中水', '丙戌': '屋上土', '丁亥': '屋上土',
      '戊子': '霹雳火', '己丑': '霹雳火', '庚寅': '松柏木', '辛卯': '松柏木',
      '壬辰': '长流水', '癸巳': '长流水', '甲午': '沙中金', '乙未': '沙中金',
      '丙申': '山下火', '丁酉': '山下火', '戊戌': '平地木', '己亥': '平地木',
      '庚子': '壁上土', '辛丑': '壁上土', '壬寅': '金箔金', '癸卯': '金箔金',
      '甲辰': '覆灯火', '乙巳': '覆灯火', '丙午': '天河水', '丁未': '天河水',
      '戊申': '大驿土', '己酉': '大驿土', '庚戌': '钗钏金', '辛亥': '钗钏金',
      '壬子': '桑柘木', '癸丑': '桑柘木', '甲寅': '大溪水', '乙卯': '大溪水',
      '丙辰': '沙中土', '丁巳': '沙中土', '戊午': '天上火', '己未': '天上火',
      '庚申': '石榴木', '辛酉': '石榴木', '壬戌': '大海水', '癸亥': '大海水'
    };
    return pairs[gan + zhi] || '未知';
  },

  // 命局分析
  analyze: function(bazi, year, month, day, hour, gender) {
    const tiangan = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
    const dizhi   = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
    
    // 统计五行
    const allChars = [bazi.year.gan, bazi.year.zhi, bazi.month.gan, bazi.month.zhi,
                      bazi.day.gan, bazi.day.zhi, bazi.hour.gan, bazi.hour.zhi];
    
    const wuxingCount = { '金':0, '木':0, '水':0, '火':0, '土':0 };
    allChars.forEach(c => {
      const wx = this.ganWuxing[c] || this.zhiWuxing[c];
      if (wx) wuxingCount[wx]++;
    });
    
    // 找旺衰
    const dayWuxing = this.ganWuxing[bazi.day.gan];
    const sortedWx = Object.entries(wuxingCount).sort((a,b) => b[1] - a[1]);
    const mostWx = sortedWx[0][0];
    const leastWx = sortedWx[sortedWx.length-1][0];
    
    // 日主
    const riZhu = bazi.day.gan;
    const riZhuWuxing = dayWuxing;
    
    // 生肖
    const shengxiaoIdx = (year - 4) % 12;
    const shengxiao = ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'][shengxiaoIdx];
    
    // 十神
    const shishenPillars = {
      year: this.shishen(bazi.day.gan, bazi.year.gan),
      month: this.shishen(bazi.day.gan, bazi.month.gan),
      hour: this.shishen(bazi.day.gan, bazi.hour.gan)
    };

    // 纳音
    const nanyin = {
      year: this.nanyin(bazi.year.gan, bazi.year.zhi),
      month: this.nanyin(bazi.month.gan, bazi.month.zhi),
      day: this.nanyin(bazi.day.gan, bazi.day.zhi),
      hour: this.nanyin(bazi.hour.gan, bazi.hour.zhi)
    };

    // 生成分析文本
    const analysis = this.generateAnalysis(bazi, wuxingCount, dayWuxing, mostWx, leastWx, gender);
    
    return {
      bazi: bazi,
      shengxiao: shengxiao,
      wuxing: wuxingCount,
      riZhu: riZhu,
      riZhuWuxing: riZhuWuxing,
      mostWx: mostWx,
      leastWx: leastWx,
      shishen: shishenPillars,
      nanyin: nanyin,
      analysis: analysis,
      summary: this.summaryText(bazi, wuxingCount, dayWuxing)
    };
  },

  generateAnalysis: function(bazi, wx, dayWx, most, least, gender) {
    const lines = [];
    
    const wxDescriptions = {
      '金': '金性主义，刚毅果断，意志坚定，有决断力和组织能力。',
      '木': '木性主仁，生发向上，温和宽厚，有慈悲心和创造力。',
      '水': '水性主智，智慧灵活，善于变通，有包容力和洞察力。',
      '火': '火性主礼，热情奔放，积极进取，有感染力和领导力。',
      '土': '土性主信，稳重踏实，诚信可靠，有承载力和包容力。'
    };
    
    lines.push(`日主为【${bazi.day.gan}${dayWx}】，${wxDescriptions[dayWx] || ''}`);
    
    // 五行多寡分析
    const missing = Object.entries(wx).filter(([k,v]) => v === 0).map(([k]) => k);
    if (missing.length > 0) {
      lines.push(`命局缺【${missing.join('、')}】，需在这些方面多加留意和补充。`);
    }
    lines.push(`五行最旺：【${most}】，五行最弱：【${least}】。`);
    
    // 格局判断
    const wxStr = Object.entries(wx).sort((a,b) => b[1]-a[1]).map(([k,v]) => `${k}${v}`).join(' ');
    lines.push(`五行分布：${wxStr}`);
    
    // 简评
    if (wx[dayWx] >= 3) {
      lines.push('日主强旺，意志坚定，能担重任。');
    } else if (wx[dayWx] >= 2) {
      lines.push('日主中和，平衡发展。');
    } else {
      lines.push('日主偏弱，宜加强自身能量，多借助外力。');
    }
    
    return lines.join('\n');
  },

  summaryText: function(bazi, wx, dayWx) {
    const signNames = {
      '金': '白虎', '木': '青龙', '水': '玄武', '火': '朱雀', '土': '麒麟'
    };
    return `你是${bazi.year.full}年出生，属${signNames[dayWx]}命格（${dayWx}命）。
八字：${bazi.year.full}年 ${bazi.month.full}月 ${bazi.day.full}日 ${bazi.hour.full}时。
五行分布：${Object.entries(wx).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`${k}${v}`).join('、')}。`;
  }
};
