/* ======================================
   紫微斗数引擎 · 增强版
   十四主星 + 六吉六煞 + 详细宫位解读
   ====================================== */

const ZiweiEngine = {
  // 十四主星
  mainStars: {
    '紫微': { code:'紫', symbol:'👑', type:'帝王', desc:'帝王之星，统领全局，尊贵非凡，化气为尊', color:'#f0c850' },
    '天机': { code:'机', symbol:'🧠', type:'智谋', desc:'智慧之星，思辨敏捷，善谋略，化气为善', color:'#4a7cf7' },
    '太阳': { code:'日', symbol:'☀️', type:'官禄', desc:'光明之星，慷慨热情，贵气照人，化气为贵', color:'#f97316' },
    '武曲': { code:'武', symbol:'⚔️', type:'财帛', desc:'财富之星，刚毅果决，理财能手，化气为财', color:'#dc2626' },
    '天同': { code:'同', symbol:'🎵', type:'福德', desc:'福气之星，温和慈善，人缘好，化气为福', color:'#06d6a0' },
    '廉贞': { code:'廉', symbol:'⚖️', type:'次桃花', desc:'次桃花星，刚正不阿，情感丰富，化气为囚', color:'#e11d48' },
    '天府': { code:'府', symbol:'🏛️', type:'库藏', desc:'库藏之星，稳重保守，积攒能力，化气为库', color:'#65a30d' },
    '太阴': { code:'阴', symbol:'🌙', type:'田宅', desc:'温柔之星，细腻敏感，有艺术气质，化气为富', color:'#8b5cf6' },
    '贪狼': { code:'狼', symbol:'🐺', type:'桃花', desc:'第一桃花星，多才多艺，社交能手，化气为欲', color:'#ec4899' },
    '巨门': { code:'巨', symbol:'🚪', type:'口舌', desc:'是非之星，口才出众，以言为业，化气为暗', color:'#6366f1' },
    '天相': { code:'相', symbol:'🤝', type:'印绶', desc:'辅佐之星，协调沟通，温和有礼，化气为印', color:'#0d9488' },
    '天梁': { code:'梁', symbol:'🏔️', type:'荫寿', desc:'长寿之星，慈悲为怀，有领导风范，化气为荫', color:'#74b200' },
    '七杀': { code:'杀', symbol:'🗡️', type:'肃杀', desc:'将星之首，果断强势，威震四方，化气为威', color:'#7c3aed' },
    '破军': { code:'破', symbol:'💥', type:'消耗', desc:'变革之星，破旧立新，开创局面，化气为耗', color:'#f43f5e' }
  },

  // 六吉星
  auspiciousStars: {
    '文昌': { code:'昌', symbol:'📚', desc:'文星之首，才华横溢，学业有成', color:'#4a7cf7' },
    '文曲': { code:'曲', symbol:'🎭', desc:'才艺之星，口才出众，艺术天赋', color:'#06d6a0' },
    '左辅': { code:'辅', symbol:'🤲', desc:'助力之星，贵人相助，人缘广阔', color:'#f0c850' },
    '右弼': { code:'弼', symbol:'🤝', desc:'辅助之星，幕后助力，稳固支持', color:'#65a30d' },
    '天魁': { code:'魁', symbol:'🏆', desc:'贵人星，长辈提携，机遇之门', color:'#f97316' },
    '天钺': { code:'钺', symbol:'⚜️', desc:'贵人星，同辈相助，仕途顺遂', color:'#8b5cf6' }
  },

  // 六煞星
  maleficStars: {
    '擎羊': { code:'羊', symbol:'⚡', desc:'刑伤之星，冲突激烈，快速应验', color:'#dc2626' },
    '陀罗': { code:'陀', symbol:'🌀', desc:'拖延之星，反复纠缠，迟来结果', color:'#7c3aed' },
    '火星': { code:'火', symbol:'🔥', desc:'暴躁之星，突发变动，热情冲动', color:'#ef4444' },
    '铃星': { code:'铃', symbol:'🔔', desc:'惊愕之星，意外冲击，暗中不利', color:'#f43f5e' },
    '地空': { code:'空', symbol:'💨', desc:'空虚之星，理想落空，财务波动', color:'#6366f1' },
    '地劫': { code:'劫', symbol:'🌪️', desc:'劫煞之星，突遭变故，得而复失', color:'#a21caf' }
  },

  // 十二宫名称与详细解读
  palaceNames: ['命宫','兄弟宫','夫妻宫','子女宫','财帛宫','疾厄宫','迁移宫','交友宫','官禄宫','田宅宫','福德宫','父母宫'],
  
  palaceDetail: {
    '命宫': {
      keywords:'自我·性格·一生格局',
      fortune:'命运核心，决定一生的基本格局和方向',
      detail: function(star) {
        if (!star) return '命宫无主星，需借对宫（迁移宫）来看。一生格局多变，受环境影响较大。';
        const map = {
          '紫微': '帝王坐命，气质尊贵，有领导才能，不甘人下。自尊心强，有主见，重面子。',
          '天机': '聪明绝顶，思虑周密，擅长策划。但易钻牛角尖，心思过细，缺乏执行力。',
          '太阳': '光明磊落，热心助人，胸怀宽广。但过于直率，易得罪人。庙旺则吉，落陷则劳碌。',
          '武曲': '刚毅果断，性格刚强，有管理能力。财运佳，但人际关系易有距离感。',
          '天同': '温和谦让，人缘极佳，有福气。但过于懒散，缺乏进取心，容易安于现状。',
          '廉贞': '聪明干练，有才艺，情感丰富。但易招惹是非，情路多波折。'
        };
        return map[star.name] || star.name + '坐命，性格受' + star.name + '星特质影响较大。';
      }
    },
    '兄弟宫': {
      keywords:'手足·朋友·沟通',
      fortune: '兄弟姐妹缘分、人际关系的暗示',
      detail: function(star) {
        if (!star) return '兄弟宫无主星，手足缘分较淡或感情疏离。';
        const map = {
          '紫微': '兄弟姐妹中有杰出之人，能得他们相助。',
          '天机': '与兄弟姐妹关系融洽，常有思想交流。',
          '武曲': '兄弟姐妹个性刚强，相处时有竞争关系。',
          '天同': '手足情深，相处和睦，能得到兄弟姐妹的关怀。'
        };
        return map[star.name] || star.name + '星入兄弟宫，与手足间的关系受此星特质影响。';
      }
    },
    '夫妻宫': {
      keywords:'婚姻·伴侣·感情',
      fortune: '婚姻状况、配偶特质和感情生活的核心宫位',
      detail: function(star) {
        if (!star) return '夫妻宫无主星，需借对宫（官禄宫）来看。婚姻格局受六煞星影响较大。';
        const map = {
          '紫微': '配偶有社会地位，自尊心强，年龄可能较大。婚姻中你需给予对方足够的尊重。',
          '天机': '配偶聪明机敏，善解人意。但感情中容易出现猜忌和犹豫不决。',
          '太阳': '配偶光明正大，热心外向。但太阳落陷时夫妻易有聚少离多的情况。',
          '武曲': '配偶性格刚强，经济能力强。但感情表达较为冷淡，需互相理解。',
          '天同': '婚姻美满，伴侣温柔体贴，夫妻生活和谐愉快。',
          '太阴': '配偶温柔细腻，有艺术气质。感情细腻丰富，婚姻生活浪漫有情调。',
          '贪狼': '配偶多才多艺，社交能力强。但桃花较重，需注意感情中的诱惑。',
          '廉贞': '情感丰富，但感情之路易有波折。配偶占有欲强，需互相包容。'
        };
        return map[star.name] || '夫妻感情受' + star.name + '特质影响，需要双方用心经营。';
      }
    },
    '子女宫': {
      keywords:'子女·创作·晚年',
      fortune: '子女缘分、创作能力的展现',
      detail: function(star) {
        if (!star) return '子女宫无主星，与子女缘分需看四化。';
        return star.name + '入子女宫，子女受其星性影响，聪明或有特殊才能。';
      }
    },
    '财帛宫': {
      keywords:'财富·理财·经济',
      fortune: '财富状况和理财能力',
      detail: function(star) {
        if (!star) return '财帛宫无主星，财运起伏较大，需借对宫（福德宫）看。';
        const map = {
          '紫微': '财运丰隆，能聚财。但花销也大，有"大进大出"的倾向。',
          '武曲': '正财星入财帛宫，财运极佳，善于理财，是致富的象征。最吉利的财星组合。',
          '太阴': '财源稳定，擅长储蓄。偏向通过不动产或稳健投资获利。',
          '天府': '财库安稳，善于守财。不愁吃穿，但发大财的机会较少。'
        };
        return map[star.name] || star.name + '入财帛宫，财运受其星性影响。';
      }
    },
    '疾厄宫': {
      keywords:'健康·体质·疾病',
      fortune: '身体状况和抵抗力的强弱',
      detail: function(star) {
        if (!star) return '疾厄宫无主星，体质中等，需注意生活习惯。';
        const map = {
          '天同': '体质良好，一生少病，有福气。',
          '太阳': '心脏和眼睛需注意，火力旺盛但也要防过犹不及。',
          '武曲': '呼吸系统和骨骼需留意，个性刚强也容易积劳成疾。'
        };
        return map[star.name] || '需留意' + star.name + '星对应的身体部位健康。';
      }
    },
    '迁移宫': {
      keywords:'外出·人际·变动',
      fortune: '外出运势和社交能力',
      detail: function(star) {
        if (!star) return '迁移宫无主星，外出发展需更多努力。';
        return star.name + '入迁移宫，外出发展有利，能结交各方朋友。';
      }
    },
    '交友宫': {
      keywords:'朋友·社交·助力',
      fortune: '人际关系和朋友圈',
      detail: function(star) {
        if (!star) return '交友宫无主星，朋友不多但贵在精。';
        const map = {
          '紫微': '朋友中有地位高者，社交圈高端但你也会付出较多。',
          '天同': '人缘极好，朋友众多，常能得朋友帮助。'
        };
        return map[star.name] || '朋友类型受' + star.name + '星影响。';
      }
    },
    '官禄宫': {
      keywords:'事业·学业·地位',
      fortune: '事业发展和成就高度',
      detail: function(star) {
        if (!star) return '官禄宫无主星，事业方向需借对宫（夫妻宫）看。';
        const map = {
          '紫微': '事业上有领导才能，适合管理岗位或自主创业。有领袖气质。',
          '太阳': '官禄宫最喜太阳，事业光明，仕途顺畅，有公职缘。',
          '武曲': '适合金融、军警、工程技术等方向。实干起家，凭实力晋升。',
          '天同': '适合文化、教育、服务行业。工作环境和谐，但升迁步调较慢。'
        };
        return map[star.name] || star.name + '入官禄宫，事业发展受其星性引导。';
      }
    },
    '田宅宫': {
      keywords:'房产·家庭·积蓄',
      fortune: '不动产和家庭环境',
      detail: function(star) {
        if (!star) return '田宅宫无主星，房产运需借对宫（子女宫）看。';
        const map = {
          '紫微': '能得祖产，或靠自己置产。住宅地段佳，家居有品味。',
          '太阴': '田宅宫主星，房产运佳，善于通过房地产积累财富。',
          '天府': '不动产丰足，居家安稳，是理财的好位置。'
        };
        return map[star.name] || star.name + '入田宅宫，置业能力受其星性影响。';
      }
    },
    '福德宫': {
      keywords:'精神·福气·晚年',
      fortune: '精神生活和晚运',
      detail: function(star) {
        if (!star) return '福德宫无主星，精神追求多变。';
        const map = {
          '天同': '福德宫主星在此，福气深厚，晚年幸福美满。',
          '太阳': '心地光明，乐善好施。晚年精神生活充实丰富。'
        };
        return map[star.name] || '精神生活受' + star.name + '星影响。';
      }
    },
    '父母宫': {
      keywords:'父母·遗传·背景',
      fortune: '双亲缘分和家族背景',
      detail: function(star) {
        if (!star) return '父母宫无主星，与父母缘分较淡，或需借对宫看。';
        return star.name + '入父母宫，父母一方有此星特质。';
      }
    }
  },

  // 四化星
  huas: {
    '化禄': { code:'禄', desc:'财禄入命，财运亨通', color:'#06d6a0' },
    '化权': { code:'权', desc:'权威入命，升迁有望', color:'#4a7cf7' },
    '化科': { code:'科', desc:'功名入命，名声远播', color:'#f0c850' },
    '化忌': { code:'忌', desc:'是非入命，需注意所在宫位', color:'#dc2626' }
  },

  // 根据生辰生成紫微命盘（增强简化版）
  generateChart: function(year, month, day, hour, gender) {
    const palaceCount = 12;
    
    // 紫微星定位（简化公式）
    const ziweiIndex = ((year * 3 + month * 7 + day * 5) % palaceCount + palaceCount) % palaceCount;
    
    // 十四主星排列（紫微系 + 天府系）
    const starChart = this.calculateStarPositions(ziweiIndex);
    
    // 构建命盘
    const chart = [];
    for (let i = 0; i < 12; i++) {
      const palaceName = this.palaceNames[(ziweiIndex + i) % 12];
      const stars = starChart.filter(function(s) { return s.palaceOffset === i; });
      
      chart.push({
        palace: palaceName,
        mainStars: stars.filter(function(s) { return s.rank === 'main'; }),
        auxStars: stars.filter(function(s) { return s.rank === 'aux'; }),
        allStars: stars
      });
    }

    return chart;
  },

  calculateStarPositions: function(ziweiIndex) {
    // 十四主星入宫位置（偏移量）
    const mainStarOffsets = {
      '紫微': 0, '天机': 1, '太阳': 4, '武曲': 5, '天同': 6, '廉贞': 8,
      '天府': 0, '太阴': 1, '贪狼': 2, '巨门': 3, '天相': 4, '天梁': 5, '七杀': 6, '破军': 9
    };
    
    const starList = [];
    const mainNames = ['紫微','天机','太阳','武曲','天同','廉贞','天府','太阴','贪狼','巨门','天相','天梁','七杀','破军'];
    
    mainNames.forEach(function(name) {
      var info = ZiweiEngine.mainStars[name];
      var offset = mainStarOffsets[name];
      if (offset !== undefined) {
        starList.push({
          name: name,
          info: info,
          palaceOffset: (ziweiIndex + offset) % 12,
          rank: 'main'
        });
      }
    });
    
    // 六吉星
    var auxNames = Object.keys(ZiweiEngine.auspiciousStars);
    auxNames.forEach(function(name, idx) {
      var offset = ((ziweiIndex + idx * 3 + Math.floor(idx / 2) * 5) % 12);
      starList.push({
        name: name,
        info: ZiweiEngine.auspiciousStars[name],
        palaceOffset: offset,
        rank: 'aux'
      });
    });
    
    // 六煞星
    var badNames = Object.keys(ZiweiEngine.maleficStars);
    badNames.forEach(function(name, idx) {
      var offset = ((ziweiIndex + idx * 7 + 3) % 12);
      starList.push({
        name: name,
        info: ZiweiEngine.maleficStars[name],
        palaceOffset: offset,
        rank: 'aux'
      });
    });
    
    return starList;
  },

  // 命盘解读（增强版）
  analyze: function(chart) {
    var analysis = [];
    
    chart.forEach(function(palace) {
      var pd = ZiweiEngine.palaceDetail[palace.palace] || { keywords:'', fortune:'' };
      var mainStarNames = palace.mainStars.map(function(s) { return s.name; }).join('、');
      var mainDesc = '';
      
      if (palace.mainStars.length > 0) {
        var firstStar = palace.mainStars[0];
        // 传递firstStar对象（含name属性）而非info，修复undefined错误
        mainDesc = pd.detail ? pd.detail(firstStar) : '';
      } else {
        mainDesc = '无主星，借对宫查看。命运受辅星影响较大，格局灵活多变。';
      }
      
      var auxStarNames = palace.auxStars.map(function(s) {
        return s.name;
      });
      
      var auxDesc = '';
      if (auxStarNames.length > 0) {
        var goodAux = auxStarNames.filter(function(n) { return ZiweiEngine.auspiciousStars[n]; });
        var badAux = auxStarNames.filter(function(n) { return ZiweiEngine.maleficStars[n]; });
        if (goodAux.length > 0) auxDesc += ('吉星：' + goodAux.join('、') + '。带来助力与好运。');
        if (badAux.length > 0) auxDesc += ('煞星：' + badAux.join('、') + '。需多加留意和化解。');
      }
      
      var starDetails = palace.mainStars.map(function(s) { return s.name + ' ' + s.info.desc; }).join('；');
      
      analysis.push({
        palace: palace.palace,
        keywords: pd.keywords || '',
        fortune: pd.fortune || '',
        mainStars: mainStarNames || '无主星',
        starSymbol: palace.mainStars.length > 0 ? palace.mainStars[0].info.symbol : '—',
        starType: palace.mainStars.length > 0 ? palace.mainStars[0].info.type : '—',
        color: palace.mainStars.length > 0 ? palace.mainStars[0].info.color : '#666',
        mainDesc: mainDesc,
        auxStars: auxStarNames.join('、') || '无',
        auxDesc: auxDesc,
        starDetail: starDetails
      });
    });
    
    return analysis;
  }
};
