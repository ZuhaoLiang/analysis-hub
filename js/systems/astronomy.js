/* ======================================
   天文学辅助库 · Astronomy Utils
   用于星盘、八字等系统的历法计算
   ====================================== */

const Astronomy = {
  // 儒略日计算
  julianDay: function(year, month, day, hour=12) {
    if (month <= 2) { year--; month += 12; }
    const A = Math.floor(year / 100);
    const B = 2 - A + Math.floor(A / 4);
    const JD = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1))
             + day + hour/24 + B - 1524.5;
    return JD;
  },

  // 计算太阳黄经（简化版）
  solarLongitude: function(jd) {
    const T = (jd - 2451545.0) / 36525;
    const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
    const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
    const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M * Math.PI / 180)
            + (0.019993 - 0.000101 * T) * Math.sin(2 * M * Math.PI / 180)
            + 0.000289 * Math.sin(3 * M * Math.PI / 180);
    let lambda = L0 + C;
    return ((lambda % 360) + 360) % 360;
  },

  // 确定节气（简化版，返回节气索引 0-23）
  solarTerm: function(year, month, day) {
    const terms = [
      '立春','雨水','惊蛰','春分','清明','谷雨',
      '立夏','小满','芒种','夏至','小暑','大暑',
      '立秋','处暑','白露','秋分','寒露','霜降',
      '立冬','小雪','大雪','冬至','小寒','大寒'
    ];
    const jd = this.julianDay(year, month, day);
    const sl = this.solarLongitude(jd);
    const idx = Math.floor(sl / 15);
    return { index: idx % 24, name: terms[idx % 24], longitude: sl };
  },

  // 获取中国年份干支（天干地支）
  chineseYearGanzhi: function(year) {
    const tiangan = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
    const dizhi   = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
    return {
      gan: tiangan[(year - 4) % 10],
      zhi: dizhi[(year - 4) % 12],
      full: tiangan[(year - 4) % 10] + dizhi[(year - 4) % 12]
    };
  },

  // 月柱计算（基于年干 + 月份）
  monthGanzhi: function(yearGan, monthNum) {
    const tiangan = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
    const dizhi   = ['寅','卯','辰','巳','午','未','申','酉','戌','亥','子','丑'];
    // 年干 -> 月干起始
    const ganStart = [2, 4, 6, 8, 0]; // 甲乙丙丁戊
    const startIdx = ganStart[yearGan % 5];
    const ganIdx = (startIdx + monthNum - 1) % 10;
    return { gan: tiangan[ganIdx], zhi: dizhi[monthNum - 1], full: tiangan[ganIdx] + dizhi[monthNum - 1] };
  },

  // 日柱计算（基于儒略日）
  dayGanzhi: function(jd) {
    const tiangan = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
    const dizhi   = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
    const ganIdx = ((Math.floor(jd + 0.5) + 49) % 60) % 10;
    const zhiIdx = ((Math.floor(jd + 0.5) + 49) % 60) % 12;
    return { gan: tiangan[ganIdx], zhi: dizhi[zhiIdx], full: tiangan[ganIdx] + dizhi[zhiIdx] };
  },

  // 时柱计算（基于日干 + 时辰）
  hourGanzhi: function(dayGan, hour) {
    const tiangan = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
    const dizhi   = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
    const hourIdx = Math.floor((hour + 1) / 2) % 12; // 23-1=子, 1-3=丑...
    const startGan = (dayGan % 5) * 2;
    const ganIdx = (startGan + hourIdx) % 10;
    return { gan: tiangan[ganIdx], zhi: dizhi[hourIdx], full: tiangan[ganIdx] + dizhi[hourIdx] };
  },

  // 八字（四柱）
  bazi: function(year, month, day, hour, timezone=8) {
    const utcHour = hour - timezone;
    const adjustedJD = this.julianDay(year, month, day, utcHour);
    
    const yearGanZhi = this.chineseYearGanzhi(year);
    const yearGanIndex = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'].indexOf(yearGanZhi.gan);
    
    // 农历月份近似（基于节气）
    const term = this.solarTerm(year, month, day);
    let lunarMonth = Math.floor(term.index / 2) + 1;
    if (lunarMonth > 12) lunarMonth -= 12;
    // 如果是立春之前，年柱仍用上一年
    let actualYear = year;
    let actualYearGZ = yearGanZhi;
    if (term.index < 1) { // 立春(索引0)之前
      actualYear = year - 1;
      actualYearGZ = this.chineseYearGanzhi(actualYear);
    }
    
    const monthGZ = this.monthGanzhi(
      ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'].indexOf(actualYearGZ.gan),
      lunarMonth
    );
    const dayGZ = this.dayGanzhi(adjustedJD);
    const hourGZ = this.hourGanzhi(
      ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'].indexOf(dayGZ.gan),
      hour
    );
    
    return { year: actualYearGZ, month: monthGZ, day: dayGZ, hour: hourGZ };
  },

  // 生肖
  chineseZodiac: function(year) {
    const animals = ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'];
    const elements = ['金','水','木','火','土'];
    const idx = (year - 4) % 12;
    const elemIdx = Math.floor(((year - 4) % 10) / 2);
    return { animal: animals[idx], element: elements[elemIdx] };
  },

  // 西方星座
  westernZodiac: function(month, day) {
    const signs = [
      { name:'摩羯座', symbol:'♑', date:'12/22-1/19', element:'土', quality:'开创', ruler:'土星' },
      { name:'水瓶座', symbol:'♒', date:'1/20-2/18', element:'风', quality:'固定', ruler:'天王星' },
      { name:'双鱼座', symbol:'♓', date:'2/19-3/20', element:'水', quality:'变动', ruler:'海王星' },
      { name:'白羊座', symbol:'♈', date:'3/21-4/19', element:'火', quality:'开创', ruler:'火星' },
      { name:'金牛座', symbol:'♉', date:'4/20-5/20', element:'土', quality:'固定', ruler:'金星' },
      { name:'双子座', symbol:'♊', date:'5/21-6/20', element:'风', quality:'变动', ruler:'水星' },
      { name:'巨蟹座', symbol:'♋', date:'6/21-7/22', element:'水', quality:'开创', ruler:'月亮' },
      { name:'狮子座', symbol:'♌', date:'7/23-8/22', element:'火', quality:'固定', ruler:'太阳' },
      { name:'处女座', symbol:'♍', date:'8/23-9/22', element:'土', quality:'变动', ruler:'水星' },
      { name:'天秤座', symbol:'♎', date:'9/23-10/22', element:'风', quality:'开创', ruler:'金星' },
      { name:'天蝎座', symbol:'♏', date:'10/23-11/21', element:'水', quality:'固定', ruler:'冥王星' },
      { name:'射手座', symbol:'♐', date:'11/22-12/21', element:'火', quality:'变动', ruler:'木星' }
    ];
    const cutoff = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22];
    // 当天数 < 该月界限日 → 沿用上月星座；否则进入本月星座
    const idx = (day < cutoff[month-1]) ? month - 1 : month % 12;
    return signs[idx];
  },

  // 行星近似位置（简化版，用于星盘）
  planetPositions: function(jd) {
    const T = (jd - 2451545.0) / 36525;
    // 简化版行星黄经
    const planets = [
      { name:'太阳', symbol:'☉', degree: ((280.46646 + 36000.76983*T) % 360 + 360) % 360 },
      { name:'月亮', symbol:'☽', degree: ((218.3165 + 481267.8813*T) % 360 + 360) % 360 },
      { name:'水星', symbol:'☿', degree: ((252.2509 + 538101.6286*T) % 360 + 360) % 360 },
      { name:'金星', symbol:'♀', degree: ((181.9798 + 58517.8157*T) % 360 + 360) % 360 },
      { name:'火星', symbol:'♂', degree: ((355.4530 + 19140.3027*T) % 360 + 360) % 360 },
      { name:'木星', symbol:'♃', degree: ((34.3515 + 3034.9057*T) % 360 + 360) % 360 },
      { name:'土星', symbol:'♄', degree: ((50.0774 + 1222.1138*T) % 360 + 360) % 360 },
      { name:'天王星', symbol:'♅', degree: ((314.0550 + 428.4668*T) % 360 + 360) % 360 },
      { name:'海王星', symbol:'♆', degree: ((304.3486 + 218.4864*T) % 360 + 360) % 360 },
      { name:'冥王星', symbol:'♇', degree: ((238.9293 + 145.2078*T) % 360 + 360) % 360 }
    ];
    
    // 计算星座位置
    const zodiacSigns = ['白羊','金牛','双子','巨蟹','狮子','处女','天秤','天蝎','射手','摩羯','水瓶','双鱼'];
    return planets.map(p => {
      const deg = p.degree % 360;
      const signIdx = Math.floor(deg / 30);
      const posInSign = deg % 30;
      return {
        ...p,
        degree: deg.toFixed(2),
        sign: zodiacSigns[signIdx],
        position: `${zodiacSigns[signIdx]} ${posInSign.toFixed(1)}°`
      };
    });
  },

  // 玛雅卓尔金历
  mayanTzolkin: function(jd) {
    const offset = 584282; // 与卓尔金历的差
    const tzolkinDay = Math.floor(jd - offset) % 260;
    if (tzolkinDay < 0) tzolkinDay += 260;
    
    const tones = [
      { num: 1, name: '磁性的', action: '吸引', power: '合一' },
      { num: 2, name: '月亮的', action: '挑战', power: '极性' },
      { num: 3, name: '电力的', action: '服务', power: '连结' },
      { num: 4, name: '自我存在的', action: '定义', power: '形式' },
      { num: 5, name: '超频的', action: '放射', power: '显化' },
      { num: 6, name: '韵律的', action: '组织', power: '平等' },
      { num: 7, name: '共振的', action: '启发', power: '通道' },
      { num: 8, name: '银河的', action: '整合', power: '和谐' },
      { num: 9, name: '太阳的', action: '意图', power: '脉动' },
      { num: 10, name: '行星的', action: '显化', power: '完美' },
      { num: 11, name: '光谱的', action: '解放', power: '消解' },
      { num: 12, name: '水晶的', action: '奉献', power: '普世' },
      { num: 13, name: '宇宙的', action: '超越', power: '存在' }
    ];
    
    const glyphs = [
      { num: 1, name:'红龙', keyword:'诞生', color:'红' },
      { num: 2, name:'白风', keyword:'沟通', color:'白' },
      { num: 3, name:'蓝夜', keyword:'梦境', color:'蓝' },
      { num: 4, name:'黄种子', keyword:'开花', color:'黄' },
      { num: 5, name:'红蛇', keyword:'生存', color:'红' },
      { num: 6, name:'白世界桥', keyword:'死亡', color:'白' },
      { num: 7, name:'蓝手', keyword:'疗愈', color:'蓝' },
      { num: 8, name:'黄星星', keyword:'优雅', color:'黄' },
      { num: 9, name:'红月', keyword:'净化', color:'红' },
      { num: 10, name:'白狗', keyword:'忠诚', color:'白' },
      { num: 11, name:'蓝猴', keyword:'魔法', color:'蓝' },
      { num: 12, name:'黄人', keyword:'自由意志', color:'黄' },
      { num: 13, name:'红天行者', keyword:'探索', color:'红' },
      { num: 14, name:'白巫师', keyword:'永恒', color:'白' },
      { num: 15, name:'蓝鹰', keyword:'洞见', color:'蓝' },
      { num: 16, name:'黄战士', keyword:'追问', color:'黄' },
      { num: 17, name:'红地球', keyword:'导航', color:'红' },
      { num: 18, name:'白镜子', keyword:'反射', color:'白' },
      { num: 19, name:'蓝风暴', keyword:'催化', color:'蓝' },
      { num: 20, name:'黄太阳', keyword:'开悟', color:'黄' }
    ];
    
    const toneIdx = tzolkinDay % 13;
    const glyphIdx = tzolkinDay % 20;
    
    return {
      kin: tzolkinDay + 1,
      tone: tones[toneIdx],
      glyph: glyphs[glyphIdx],
      fullName: `${tones[toneIdx].name}的${glyphs[glyphIdx].name}`,
      galacticSignature: `${tones[toneIdx].num}·${glyphs[glyphIdx].color}${glyphs[glyphIdx].name}`
    };
  }
};
