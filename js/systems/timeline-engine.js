/* ======================================
   时间线引擎 · 人生阶段多维解读
   综合七大系统生成生命时间轴
   ====================================== */

const TimelineEngine = {
  // 人生阶段定义
  lifeStages: [
    {
      id: 'childhood',
      name: '童年 · 萌芽期',
      icon: '🌱',
      ageRange: '0–20岁',
      color: '#06d6a0',
      desc: '性格形成、家庭影响、学习启蒙的关键阶段'
    },
    {
      id: 'youth',
      name: '青年 · 探索期',
      icon: '🔥',
      ageRange: '20–35岁',
      color: '#f97316',
      desc: '事业起步、感情探索、自我认知的黄金时期'
    },
    {
      id: 'prime',
      name: '壮年 · 鼎盛期',
      icon: '💪',
      ageRange: '35–50岁',
      color: '#4a7cf7',
      desc: '事业巅峰、家庭建设、社会成就的核心阶段'
    },
    {
      id: 'middle',
      name: '中年 · 沉淀期',
      icon: '🧘',
      ageRange: '50–65岁',
      color: '#8b5cf6',
      desc: '智慧沉淀、传承布局、内心安宁的收获季节'
    },
    {
      id: 'elderly',
      name: '晚年 · 圆满期',
      icon: '✨',
      ageRange: '65岁+',
      color: '#f0c850',
      desc: '颐养天年、精神升华、人生智慧的终极绽放'
    }
  ],

  // 从各系统解读生成时间线
  generate: function(allResults) {
    var stages = JSON.parse(JSON.stringify(this.lifeStages));
    
    stages.forEach(function(stage) {
      stage.insights = [];
      stage.sources = [];
      
      // 星座时间线
      if (allResults.zodiacSign) {
        var z = allResults.zodiacSign;
        var zd = ZodiacData.all[z.name];
        var zInsight = this.zodiacTimeline(stage.id, z.name, zd);
        if (zInsight) {
          stage.insights.push({ system: '星座', icon: '♈', text: zInsight, color: '#d4a847' });
          stage.sources.push('zodiac');
        }
      }
      
      // 八字大运
      if (allResults.baziResult) {
        var bInsight = this.baziTimeline(stage.id, allResults.baziResult, allResults.user);
        if (bInsight) {
          stage.insights.push({ system: '八字', icon: '☯', text: bInsight, color: '#06d6a0' });
          stage.sources.push('bazi');
        }
      }
      
      // 紫微大限
      if (allResults.ziwei && allResults.ziwei.length > 0) {
        var zInsight = this.ziweiTimeline(stage.id, allResults.ziwei);
        if (zInsight) {
          stage.insights.push({ system: '紫微', icon: '⭐', text: zInsight, color: '#f0c850' });
          stage.sources.push('ziwei');
        }
      }
      
      // 玛雅图腾时间线
      if (allResults.mayan) {
        var mInsight = this.mayanTimeline(stage.id, allResults.mayan);
        if (mInsight) {
          stage.insights.push({ system: '玛雅', icon: '🌙', text: mInsight, color: '#8b5cf6' });
          stage.sources.push('mayan');
        }
      }
      
      // 人类图时间线
      if (allResults.humandesign) {
        var hInsight = this.hdTimeline(stage.id, allResults.humandesign);
        if (hInsight) {
          stage.insights.push({ system: '人类图', icon: '🧬', text: hInsight, color: '#06d6a0' });
          stage.sources.push('humandesign');
        }
      }
      
      // MBTI 时间线
      if (allResults.mbti) {
        var mInsight = this.mbtiTimeline(stage.id, allResults.mbti);
        if (mInsight) {
          stage.insights.push({ system: 'MBTI', icon: '🧠', text: mInsight, color: '#4a7cf7' });
          stage.sources.push('mbti');
        }
      }
      
      // 星盘时间线
      if (allResults.astrology) {
        var aInsight = this.astrologyTimeline(stage.id, allResults.astrology);
        if (aInsight) {
          stage.insights.push({ system: '星盘', icon: '🌞', text: aInsight, color: '#f97316' });
          stage.sources.push('astrology');
        }
      }
    }.bind(this));
    
    return stages;
  },

  // ===== 各系统时间线解读 =====

  zodiacTimeline: function(stageId, signName, detail) {
    var base = detail ? (detail.personality || signName) : signName;
    var map = {
      childhood: '童年时期，|的守护星|赋予你|特质。这段经历塑造了你的性格底色，家庭环境对你的影响尤为深远。',
      youth: '青年时代，你开始展露|的锋芒。|的特质在这个阶段被激发，适合大胆探索事业和感情。',
      prime: '壮年是你的黄金时期。|的星能完全释放，在事业和社交上将迎来重要发展。',
      middle: '中年之后，|的内敛能量浮现。你需要学会平衡事业与内心，寻找更深层的满足。',
      elderly: '晚年|的智慧达到顶峰。回顾一生，你的坚韧和独特性格为你积累了丰厚的人生果实。'
    };
    return map[stageId] ? map[stageId].replace(/\|/g, signName) : '';
  },

  baziTimeline: function(stageId, baziResult, user) {
    if (!baziResult || !baziResult.riZhu) return '';
    
    var riZhu = baziResult.riZhu;
    var wx = baziResult.riZhuWuxing;
    var shengxiao = baziResult.shengxiao;
    var most = baziResult.mostWx || '金';
    var least = baziResult.leastWx || '水';
    
    // 简易大运分析（十年一大运，男顺女逆）
    var gender = (user && user.gender) || 'male';
    var daYunMap = {
      childhood: '初运阶段，五行以年柱为主导。|能量充盈，学习能力和适应力在此期奠定基础。',
      youth: '第二步大运开启，|开始发力。事业选择和感情走向受月柱影响深刻。',
      prime: '日主能量达到顶峰，|星入旺位。这是你人生格局定调的关键十年。',
      middle: '运势转入时柱管辖，|的坚韧开始转化为人生智慧。财帛宫能量稳定。',
      elderly: '晚年运归回命宫，|一生积累在此刻绽放。宜守不宜攻，修心为上。'
    };
    
    var text = daYunMap[stageId] || '';
    text = text.replace(/\|/g, riZhu + '（' + wx + '）');
    text += ' 生肖' + shengxiao + '在' + this.stageName(stageId) + '宜' + (most === wx ? '顺势而为' : '补' + least + '为用');
    return text;
  },

  ziweiTimeline: function(stageId, analysis) {
    if (!analysis || analysis.length === 0) return '';
    
    // 从命盘各宫提取时间线关键词
    var findPalace = function(name) {
      return analysis.find(function(a) { return a.palace === name; });
    };
    
    var map = {
      childhood: function() {
        var ming = findPalace('命宫');
        var fumu = findPalace('父母宫');
        var text = '命宫主星' + (ming ? ming.mainStars : '未定') + '，';
        text += '父母宫显示家庭缘分的深浅对你的成长轨迹有重要影响。';
        text += fumu ? ' ' + fumu.mainDesc.slice(0, 30) : '';
        return text;
      },
      youth: function() {
        var fuqi = findPalace('夫妻宫');
        var shiye = findPalace('官禄宫');
        var text = '青年大限入官禄宫，' + (shiye ? shiye.mainDesc.slice(0, 35) : '事业选择在此期开启');
        text += '。' + (fuqi ? '夫妻宫提示：' + fuqi.mainDesc.slice(0, 25) : '感情运势开始萌芽。');
        return text;
      },
      prime: function() {
        var caibo = findPalace('财帛宫');
        var shiye = findPalace('官禄宫');
        var qianyi = findPalace('迁移宫');
        var text = '壮年大限：';
        text += caibo ? '财帛宫' + caibo.mainDesc.slice(0, 30) + '。' : '财运在此期有重要变化。';
        text += shiye ? '官禄宫' + shiye.mainDesc.slice(0, 25) + '。' : '';
        text += qianyi ? '迁移宫提示外出发展机会增多。' : '';
        return text;
      },
      middle: function() {
        var tianzhai = findPalace('田宅宫');
        var fude = findPalace('福德宫');
        var text = '中年转入田宅福德领域：';
        text += tianzhai ? tianzhai.mainDesc.slice(0, 35) + '。' : '置业置产的能量增强。';
        text += fude ? fude.mainDesc.slice(0, 25) + '。' : '精神世界的丰盈成为主题。';
        return text;
      },
      elderly: function() {
        var fude = findPalace('福德宫');
        var zinv = findPalace('子女宫');
        var text = '晚年福德宫为关键，' + (fude ? fude.mainDesc.slice(0, 40) : '精神生活和福报在此期显现');
        text += '。' + (zinv ? '子女宫显示晚辈缘分浓厚。' : '家庭福泽绵长。');
        return text;
      }
    };
    
    return map[stageId] ? map[stageId]() : '';
  },

  mayanTimeline: function(stageId, mayanResult) {
    if (!mayanResult || !mayanResult.info) return '';
    var g = mayanResult.info.mainGlyph;
    var t = mayanResult.info.mainTone;
    var kin = mayanResult.info.kin;
    
    // 卓尔金历260天周期模拟人生相位
    var wavePosition = Math.floor(kin / 52); // 0-4
    var waveMap = ['创始之波', '成长之波', '显化之波', '蜕变之波', '超越之波'];
    var phaseMap = {
      childhood: '你的KIN ' + kin + '（' + g.name + '·调性' + t.num + '）在童年埋下了' + g.keyword + '的种子。这一时期你在' + waveMap[wavePosition % 5] + '中萌发。',
      youth: '青年时期，' + g.color + '色图腾的能量日渐显现。' + g.name + '的力量引导你探索世界，调性' + t.num + '赋予你' + t.action + '的行动力。',
      prime: '壮年是你的力量期。银河印记' + mayanResult.info.galacticSignature + '全面激活，' + g.name + '的' + g.keyword + '能量在此阶段达到峰值。',
      middle: '中年之后，挑战力量（' + (mayanResult.info.opposite ? mayanResult.info.opposite.name : '未知') + '）开始浮现。你需要整合相似力量（' + (mayanResult.info.similar ? mayanResult.info.similar.name : '未知') + '）来平衡人生。',
      elderly: '晚年回望，你整个生命历程如同一首波符交响曲。指引力量' + (mayanResult.info.guide ? mayanResult.info.guide.name : '') + '一直照亮你的旅程。'
    };
    return phaseMap[stageId] || '';
  },

  hdTimeline: function(stageId, hdResult) {
    if (!hdResult || !hdResult.typeInfo) return '';
    
    var type = hdResult.typeInfo.type;
    var profileKey = hdResult.typeInfo.profileKey;
    var authority = hdResult.typeInfo.authority;
    
    // 人类图人生阶段 - 基于Profile的三阶段理论
    var profileStage = {
      childhood: {
        '1/3': '童年你的"探究者/烈士"能量开始运作：你在试错中学习世界，每一次跌倒都是珍贵的经验。',
        '1/4': '童年你像"探究者/机会主义者"：既渴望深入研究，又需要社交链接来验证你的发现。',
        '2/4': '童年你展现"隐士/机会主义者"特质：享受独处的创造力，但被朋友发现你的天赋。',
        '2/5': '童年你就展示"隐士/异端者"气质：看似孤僻，却有解决问题的超常能力。',
        '3/5': '童年是"烈士/异端者"的试炼场：你的经历让同龄人望尘莫及，天生的实践者。',
        '3/6': '童年你经历"烈士/人生典范"第一阶段：错误和挫折成为后来智慧的基石。',
        '4/1': '童年你显现"机会主义者/探究者"：社交圈和研究能力从小就同步发展。',
        '4/6': '童年你就有"机会主义者/人生典范"的影子：通过人际接触感知世界。',
        '5/1': '童年你已是"异端者/探究者"：实用主义的领袖气质早期就显现。',
        '5/2': '童年"异端者/隐士"特质：别人眼里的天才，自己却在寻找独处的安静。',
        '6/2': '童年"人生典范/隐士"第一阶段：在孤独中观察世界，积累内在智慧。',
        '6/3': '童年"人生典范/烈士"开端：用身体和情感去体验，不怕犯错。'
      },
      youth: {
        '1/3': '青年时期，经历成为最好的老师。你在各种尝试中找到自己的道路。',
        '1/4': '青年阶段，你的知识积累开始通过社交网络产生价值。',
        '2/4': '青年时期，你的天赋被更多人发现。在"被邀请"中施展才华。',
        '2/5': '青年时期，你开始被外界注意并期待你解决问题。',
        '3/5': '青年时期，你的试错经验开始帮到他人。实践出真知。',
        '3/6': '青年阶段，你仍在试错中前进，但已开始积累可供分享的智慧。',
        '4/1': '青年阶段，你的社交网络和研究深度开始相辅相成。',
        '4/6': '青年时期，通过社交接触找到自己真正的方向。',
        '5/1': '青年阶段，你被实际问题召唤，实用权威开始建立。',
        '5/2': '青年时期，更多人发现你的"隐藏"能力，期待你出手解决。',
        '6/2': '青年阶段，你从观察者转向主动参与者。第二阶段开启。',
        '6/3': '青年时期，勇敢试错的精神引领你走向广阔的天地。'
      },
      prime: {
        '1/3': '壮年是收获期，你一生的试错经验在此刻凝聚成智慧和专业。',
        '1/4': '壮年你的研究和社交网络形成良性循环，影响力达到顶峰。',
        '2/4': '壮年你已成为被认可的专家，社交网络自动为你打开机会之门。',
        '2/5': '壮年是你发挥影响力的巅峰期，被广泛认可的"问题解决者"。',
        '3/5': '壮年你的人生经历让他人受益匪浅，从实践者升级为导师。',
        '3/6': '壮年是第三阶段的过渡：从试错者向人生典范转变的转折点。',
        '4/1': '壮年你的社交影响力与研究深度达到最佳平衡。',
        '4/6': '壮年是你从社交中提炼智慧的黄金期。',
        '5/1': '壮年是你的实用权威登顶的时期，被行业或社群认可。',
        '5/2': '壮年你的能力完全绽放，从"隐藏的天才"进化为"公认的大师"。',
        '6/2': '壮年你已进入第三阶段——成为真正的人生典范。',
        '6/3': '壮年所有的经历汇聚成独特的人生智慧。'
      },
      middle: {
        '1/3': '中年你进入"内化"阶段，将经验沉淀为传承的智慧。',
        '1/4': '中年你的注意力从外向转向内在，社交网络成为支持系统。',
        '2/4': '中年你更加珍视独处时光，选择性地回应外界邀请。',
        '2/5': '中年你开始有选择地运用影响力，只回应真正重要的召唤。',
        '3/5': '中年你已成为他人眼中的"过来人"，经验型导师的角色。',
        '3/6': '中年如果你完成了前两阶段的功课，此刻已成为智慧榜样。',
        '4/1': '中年你开始专注于最有深度的几个领域，质量重于数量。',
        '4/6': '中年你从社交中萃取智慧，开始向内沉淀。',
        '5/1': '中年你的影响力以深度而非广度著称。',
        '5/2': '中年你更享受退隐与专注，只在必要时出手。',
        '6/2': '中年你完整进入人生典范角色，被追随而不追逐。',
        '6/3': '中年你已走过所有试炼，成为真正意义上的"人生典范"。'
      },
      elderly: {
        default: '晚年你的能量类型' + type + '回归最本质的状态。' + authority + '型内在权威指引你安享岁月。你的人生策略"' + hdResult.typeInfo.typeData.strategy + '"在这时呈现出最完美的诠释——你不再需要证明什么，只需存在。'
      }
    };
    
    var stageMap = { childhood: '童年', youth: '青年', prime: '壮年', middle: '中年', elderly: '晚年' };
    
    if (stageId === 'elderly') {
      return profileStage.elderly.default;
    }
    
    var stageData = profileStage[stageId];
    if (stageData && stageData[profileKey]) {
      return stageData[profileKey];
    }
    
    return '在' + stageMap[stageId] || '此' + '阶段，你的' + type + '能量以' + profileKey + '角色特质运作。';
  },

  mbtiTimeline: function(stageId, mbtiResult) {
    if (!mbtiResult || !mbtiResult.data) return '';
    var type = mbtiResult.type;
    var name = mbtiResult.data.name;
    var dims = mbtiResult.scores || {};
    
    var ei = dims.EI >= 0 ? '外向' : '内向';
    var sn = dims.SN >= 0 ? '直觉' : '实感';
    var tf = dims.TF >= 0 ? '思考' : '情感';
    var jp = dims.JP >= 0 ? '判断' : '感知';
    
    var map = {
      childhood: '童年时，你的' + ei + '（E/I）和' + sn + '（S/N）倾向就已显现。' + name + '人格的种子在家庭和教育环境中萌芽。这个阶段你主要通过' + (ei === '外向' ? '与人互动' : '内心思考') + '来理解世界。',
      youth: '青年是' + name + '型人格的"探索实验期"。你的' + tf + '（T/F）和' + jp + '（J/P）功能在教育、职业和感情的选择中逐渐成熟。MBTI告诉你这个阶段最适合的成长方向：拥抱你的优势功能，同时发展辅助功能。',
      prime: '壮年你的' + type + '型人格达到功能整合的巅峰。' + name + '的优势完全展现在事业和家庭中。你的主导认知功能在这个阶段成为你最有力的工具。',
      middle: '中年是你人格发展的"后半程"转折。' + name + '的阴影面开始浮现，劣势功能的整合成为课题。荣格认为这是人格朝向完整迈进的关键期。',
      elderly: '晚年是' + name + '人格的"智慧期"。所有认知功能在此刻趋向平衡，你的性格不再是非此即彼的选择题，而是一首和谐的协奏曲。'
    };
    
    return map[stageId] || '';
  },

  astrologyTimeline: function(stageId, astrologyResult) {
    if (!astrologyResult || !astrologyResult.planets) return '';
    
    var sunName = '太阳';
    var moonName = '月亮';
    
    // 从星盘数据中找太阳月亮
    var sun = astrologyResult.planets.find(function(p) { return p.name === '太阳'; });
    var moon = astrologyResult.planets.find(function(p) { return p.name === '月亮'; });
    var saturn = astrologyResult.planets.find(function(p) { return p.name === '土星'; });
    var jupiter = astrologyResult.planets.find(function(p) { return p.name === '木星'; });
    
    var map = {
      childhood: '童年时期，月亮（内在情感）的影响力最为强烈。你潜意识中的安全感模式在此期形成。' + (moon ? '月亮落在' + moon.sign + '，塑造了你情感处理的基本方式。' : ''),
      youth: '青年是"土星回归"（约29岁）前的探索期。' + (jupiter ? '木星在' + jupiter.sign + '为你带来成长和扩张的机会。' : '') + '太阳的自我意识在这段经历中不断淬炼。',
      prime: '壮年时期，土星回归已完成，人生格局初步定调。' + (saturn ? '土星在' + saturn.sign + '指示你的事业和责任方向。' : '') + '太阳的力量达到峰值，你的社会角色和自我实现紧密相连。',
      middle: '中年是"天王星对分"（约42岁）和"凯龙回归"的关键期。外在成就开始让位于内在意义的探索。星盘上太阳的原始位置提示着你后半生的进化方向。',
      elderly: '晚年是"木星回归"（约84岁，能活到的话）的智慧期。星盘上的福点和宿命点能量完全展现。你的一生就是这张出生星盘的完美诠释。'
    };
    
    return map[stageId] || '';
  },

  stageName: function(stageId) {
    var names = { childhood: '童年', youth: '青年', prime: '壮年', middle: '中年', elderly: '晚年' };
    return names[stageId] || '';
  }
};
