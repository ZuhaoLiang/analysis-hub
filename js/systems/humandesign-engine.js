/* ======================================
   人类图引擎 · Human Design
   ====================================== */

const HumanDesignEngine = {
  // 5种能量类型
  types: {
    '显示者': {
      en:'Manifestor', symbol:'🎙️', pct:'8%',
      desc:'能够独立发起行动的能量类型，是世界的"发动机"。你有能力在不等待他人的情况下启动事物。',
      strategy:'告知——在行动前告知相关的人，可以减少阻力，让你的能量顺畅展现。',
      aura:'封闭而具保护性的能量场，像一道盾牌。',
      notSelf:'愤怒——当你感受到愤怒时，说明你偏离了正确的运作方式。',
      advice:'你的使命是发起和开创。记得在行动前告知他人，这不是请求许可，而是释放能量。'
    },
    '显示生产型': {
      en:'Manifesting Generator', symbol:'⚡', pct:'35%',
      desc:'结合了显示者和生产者特质的能量。你是多才多艺、高效能的赋能者，能同时处理多项任务。',
      strategy:'等待回应 + 告知——先对外界刺激做出回应，再通过告知来有效推进。',
      aura:'开放且包裹性的能量场，环绕并覆盖他人。',
      notSelf:'不耐烦——当你感到不耐烦时，意味着你在强行推进而非等待正确的回应。',
      advice:'你拥有强大的多重处理能力，但关键是先通过回应找到正确的方向，然后快速执行。'
    },
    '生产型': {
      en:'Generator', symbol:'🔋', pct:'37%',
      desc:'持续的生产力和创造力来源，是世界的"建设者"。你拥有持续工作的能量，当你做热爱之事时能量无限。',
      strategy:'等待回应——不要主动发起，而是对生活中的事物做出回应。你的"嗯"或"嗯哼"就是信号。',
      aura:'开放而包裹的能量场，像温暖的怀抱。',
      notSelf:'挫败感——当你感到挫败时，说明你在做不喜欢的事或错误的方向。',
      advice:'找到能让你满足感爆棚的事情，那就是你正确的方向。回应而非发起。'
    },
    '投射者': {
      en:'Projector', symbol:'👁️', pct:'21%',
      desc:'天生的引导者和顾问，能看到他人的能量系统。你是这个世界的"指引者"，不是来工作的。',
      strategy:'等待邀请——在特定领域成功的关键是等待正确的人认识到你的价值并发来邀请。',
      aura:'聚焦且吸收型的能量场，能深入他人。',
      notSelf:'苦涩——当你感到苦涩时，说明你在错误的关系或环境中。',
      advice:'你不是来工作的，你是来引导的。等待认可的邀请，你的能力需要在正确的平台上发挥。'
    },
    '反映者': {
      en:'Reflector', symbol:'🌙', pct:'1%',
      desc:'最稀有、最敏感的类型，像一面纯净的镜子反映周遭环境。你是社区健康的"温度计"。',
      strategy:'等待28天——在做重大决定前，等待一个完整的月亮周期。你的决策需要时间。',
      aura:'开放且坚韧的能量场，如同抗敏的筛网。',
      notSelf:'失望——当你感到失望时，说明你处在不适合的环境中。',
      advice:'你是珍贵的"镜子"，你的价值在于反映出周围环境的品质。选择好的环境对你至关重要。'
    }
  },

  // 9个能量中心
  centers: [
    { num:1, name:'头顶中心', sanskrit:'顶轮', desc:'灵感、压力、形而上的思考' },
    { num:2, name:'脑中心', sanskrit:'眉心轮', desc:'概念化、思维方式、分析能力' },
    { num:3, name:'喉咙中心', sanskrit:'喉轮', desc:'沟通、表达、行动的外显' },
    { num:4, name:'G中心', sanskrit:'心轮', desc:'方向、爱、自我认同、存在' },
    { num:5, name:'意志力中心', sanskrit:'太阳神经丛', desc:'意志力、自我价值、承诺' },
    { num:6, name:'荐骨中心', sanskrit:'脐轮', desc:'生命能量、工作活力、性创造力' },
    { num:7, name:'脾中心', sanskrit:'本我轮', desc:'直觉、本能、生存意识、健康' },
    { num:8, name:'情绪中心', sanskrit:'腹轮', desc:'情绪感知、敏感度、感受力' },
    { num:9, name:'根部中心', sanskrit:'海底轮', desc:'压力、肾上腺素、行动驱动力' }
  ],

  // 6条人生角色（Profile）
  profiles: {
    '1/3': { name:'探究者/烈士', desc:'在尝试和错误中学习的探究者，通过亲身经历获得智慧。' },
    '1/4': { name:'探究者/机会主义者', desc:'通过深入研究后建立稳固的社交网络，学习后分享。' },
    '2/4': { name:'隐士/机会主义者', desc:'需要独处的天才，但社交网络是施展才华的舞台。' },
    '2/5': { name:'隐士/异端者', desc:'孤独的天才，被召唤来解决大众问题，有强大的影响力。' },
    '3/5': { name:'烈士/异端者', desc:'在错误中成长，经历足以让他人借鉴的实践者。' },
    '3/6': { name:'烈士/人生典范', desc:'通过试错走向智慧的榜样，年轻时犯错，中年后成为楷模。' },
    '4/1': { name:'机会主义者/探究者', desc:'建立在深厚研究基础上的社交网络，深入且稳固。' },
    '4/6': { name:'机会主义者/人生典范', desc:'通过社交接触找到真理，最终在人生中找到可作为榜样的角色。' },
    '5/1': { name:'异端者/探究者', desc:'被赋予解决实际问题的研究型领袖，有实用权威。' },
    '5/2': { name:'异端者/隐士', desc:'看似孤僻却有解决实际问题的超人能力。' },
    '6/2': { name:'人生典范/隐士', desc:'经历了三个阶段：试错、观察、成为榜样。' },
    '6/3': { name:'人生典范/烈士', desc:'通过经验积累智慧，最终超越自我成为榜样。' }
  },

  // 内在权威
  authorities: {
    '情绪型': '你的决策需要经历情绪波动的完整周期。不要在不稳定的情绪下做决定，等待清明时刻。',
    '荐骨型': '你的身体会给你最直接的"嗯"或"嗯哼"的回应。关注身体的声觉回应。',
    '直觉型': '你的直觉在当下给你清晰的信号。关注身体在当下的感知。',
    '意志力型': '你的意志力中心定义，承诺就是你的力量。关注你真正愿意承诺的事情。',
    '自我投射型': '你的G中心引导你朝正确的方向。关注你内心深处的"方向感"。',
    '环境型': '你的决策需要与周围环境和人互动后获得清晰。'
  },

  // 人生类型判定（简化版）
  determineType: function(year, month, day, hour) {
    // 基于出生数据判定（简化算法）
    const total = year + month + day + Math.floor(hour);
    const typeNum = total % 5;
    const types = ['显示者','显示生产型','生产型','投射者','反映者'];
    const type = types[typeNum];
    return {
      type: type,
      typeData: this.types[type],
      profileKey: `${(year % 6) + 1}/${(day % 6) + 1}`,
      profile: this.profiles[`${(year % 6) + 1}/${(day % 6) + 1}`],
      authority: Object.keys(this.authorities)[month % 6]
    };
  },

  // 绘制人体图（BodyGraph）的简化画布数据
  bodyGraphData: function() {
    return {
      centers: [
        { id:'head', x:300, y:40, r:22, name:'头顶中心', number:1 },
        { id:'ajna', x:300, y:120, r:22, name:'脑中心', number:2 },
        { id:'throat', x:300, y:200, r:20, name:'喉咙中心', number:3 },
        { id:'g', x:240, y:300, r:20, name:'G中心', number:4 },
        { id:'ego', x:360, y:300, r:18, name:'意志力中心', number:5 },
        { id:'sacral', x:300, y:390, r:22, name:'荐骨中心', number:6 },
        { id:'spleen', x:210, y:460, r:18, name:'脾中心', number:7 },
        { id:'solar', x:390, y:460, r:18, name:'情绪中心', number:8 },
        { id:'root', x:300, y:540, r:20, name:'根部中心', number:9 }
      ],
      channels: [
        [1,2], [2,3], [3,4], [3,5], [4,6], [4,7], [5,8], [6,7], [6,8], [7,9], [8,9]
      ]
    };
  },

  analyze: function(year, month, day, hour) {
    const typeInfo = this.determineType(year, month, day, hour);
    const bodyGraph = this.bodyGraphData();
    const authorityDesc = this.authorities[typeInfo.authority] || '';
    
    const summary = [];
    summary.push(`你的人类图类型：【${typeInfo.type}】—— ${typeInfo.typeData.desc}`);
    summary.push(`人生角色：【${typeInfo.profileKey}】${typeInfo.profile?.desc || ''}`);
    summary.push(`策略：${typeInfo.typeData.strategy}`);
    summary.push(`内在权威：${typeInfo.authority}型——${authorityDesc}`);
    summary.push(`非自己主题：${typeInfo.typeData.notSelf}`);
    summary.push(`能量场特质：${typeInfo.typeData.aura}`);
    summary.push(`给你的建议：${typeInfo.typeData.advice}`);
    
    return {
      typeInfo: typeInfo,
      bodyGraph: bodyGraph,
      summary: summary.join('\n')
    };
  }
};
