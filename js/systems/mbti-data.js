/* ======================================
   MBTI 测试数据与类型分析
   ====================================== */

const MBTIData = {
  questions: [
    // E/I (外向/内向) - 5题
    { id:1, text:"聚会时你更喜欢和人聊天而不是安静待着", dim:'EI', dir:1 },
    { id:2, text:"独处太久会让你感觉精力耗尽", dim:'EI', dir:1 },
    { id:3, text:"你更喜欢和一两个密友深入交流而不是一大群人", dim:'EI', dir:-1 },
    { id:4, text:"你经常是主动开启话题的那个人", dim:'EI', dir:1 },
    { id:5, text:"你的社交圈子很广，认识很多人", dim:'EI', dir:1 },
    // S/N (实感/直觉) - 5题
    { id:6, text:"你更关注事物「是什么」而非「可能是什么」", dim:'SN', dir:-1 },
    { id:7, text:"你经常陷入天马行空的想象中", dim:'SN', dir:1 },
    { id:8, text:"你更喜欢具体明确的任务说明而非开放性的创意任务", dim:'SN', dir:-1 },
    { id:9, text:"你对抽象概念和哲学问题很感兴趣", dim:'SN', dir:1 },
    { id:10, text:"你更相信眼见为实的经验而非直觉", dim:'SN', dir:-1 },
    // T/F (思考/情感) - 5题
    { id:11, text:"做决定时你更依赖逻辑分析而非个人感受", dim:'TF', dir:1 },
    { id:12, text:"你很容易察言观色，感受到别人的情绪", dim:'TF', dir:-1 },
    { id:13, text:"你觉得公平比和睦更重要", dim:'TF', dir:1 },
    { id:14, text:"你常常因为别人的故事而感动落泪", dim:'TF', dir:-1 },
    { id:15, text:"批评别人时你更看重说真话而非考虑对方感受", dim:'TF', dir:1 },
    // J/P (判断/感知) - 5题
    { id:16, text:"你习惯提前制定详细的计划", dim:'JP', dir:1 },
    { id:17, text:"你的生活方式比较随性，不喜欢被时间表束缚", dim:'JP', dir:-1 },
    { id:18, text:"做完决定后你很少会反悔", dim:'JP', dir:1 },
    { id:19, text:"你喜欢留出弹性空间而不是把日程排满", dim:'JP', dir:-1 },
    { id:20, text:"你更喜欢事情有明确的结论和结果", dim:'JP', dir:1 }
  ],

  types: {
    'INTJ': {
      name:'建筑师', en:'Architect', desc:'富有想象力和战略性的思想家，一切皆在计划之中。',
      strengths:'独立自主、远见卓识、高度自信、善于分析',
      weaknesses:'过于挑剔、不善情感表达、固执己见、社交冷淡',
      career:'科学家、工程师、战略顾问、建筑师、程序员',
      love:'追求精神共鸣，需要深度理解和思想层面的一致性',
      advice:'学会欣赏当下，不要为了完美而错过美好的可能性',
      color:'#6366f1'
    },
    'INTP': {
      name:'逻辑学家', en:'Logician', desc:'具有创造力的发明家，对知识有着永不满足的渴望。',
      strengths:'分析力强、创造力丰富、客观理性、思维开阔',
      weaknesses:'社交障碍、完美主义、过于理论化、情感疏离',
      career:'学者、研究员、程序员、数据分析师、发明家',
      love:'喜欢智识型伴侣，对无意义的闲聊感到厌倦',
      advice:'理论与实践需要平衡，偶尔走出脑海，体验真实世界',
      color:'#8b5cf6'
    },
    'ENTJ': {
      name:'指挥官', en:'Commander', desc:'大胆、富有想象力且意志强大的领导者，总能找到或创造解决方案。',
      strengths:'领导力强、高度自信、战略思维、执行力强',
      weaknesses:'专横跋扈、缺乏耐心、情感迟钝、苛求完美',
      career:'CEO、项目经理、律师、企业家、管理顾问',
      love:'寻找能与自己匹敌的伴侣，喜欢直接的沟通方式',
      advice:'软实力同样重要，学会倾听和共情会让你的领导力更卓越',
      color:'#dc2626'
    },
    'ENTP': {
      name:'辩手', en:'Debater', desc:'聪明好奇的思想者，不会放弃任何智力挑战。',
      strengths:'机智幽默、创新思维、善于辩论、适应力强',
      weaknesses:'好胜心强、不够专注、不切实际、敏感度低',
      career:'创业者、营销策划、律师、记者、产品经理',
      love:'喜欢刺激的智力火花碰撞，需要自由不能被束缚',
      advice:'选定一个方向深耕下去，深度和广度同样重要',
      color:'#f97316'
    },
    'INFJ': {
      name:'提倡者', en:'Advocate', desc:'安静而神秘，同时鼓舞人心且不知疲倦的理想主义者。',
      strengths:'洞察力强、理想主义、善解人意、坚定有信念',
      weaknesses:'过于理想化、容易倦怠、对自己太苛刻、过于私密',
      career:'心理咨询师、作家、教师、人力资源、设计师',
      love:'追求灵魂伴侣，渴望深度的情感连接和精神共鸣',
      advice:'保护好你的能量，学会适度放手，不需要拯救所有人',
      color:'#a21caf'
    },
    'INFP': {
      name:'调停者', en:'Mediator', desc:'诗意、善良的利他主义者，总是热情地为正义事业而战。',
      strengths:'共情力强、创意丰富、热爱和谐、忠于价值观',
      weaknesses:'过于理想化、自我批判、情感脆弱、不善计划',
      career:'作家、心理咨询师、设计师、音乐人、公益从业者',
      love:'追求浪漫深刻的爱情，相信灵魂的共鸣',
      advice:'你的敏感是天赋而非弱点，学会用它创造而非承受',
      color:'#ec4899'
    },
    'ENFJ': {
      name:'主人公', en:'Protagonist', desc:'富有魅力且鼓舞人心的天生领导者，能照亮听众的生活。',
      strengths:'感染力强、有责任感、善解人意、组织力强',
      weaknesses:'过度付出、容易受伤、难以拒绝、追求认可',
      career:'教师、培训师、人力资源、公关、政治人物',
      love:'给予型爱人，会全心全意支持伴侣的成长',
      advice:'记得照顾好自己，你的能量需要定期充电',
      color:'#e11d48'
    },
    'ENFP': {
      name:'竞选者', en:'Campaigner', desc:'富有自由精神且热情洋溢的社会活动家，总能找到快乐所在。',
      strengths:'热情洋溢、创意无限、人缘好、好奇心强',
      weaknesses:'容易分心、过于敏感、执行力弱、缺乏条理',
      career:'记者、设计师、演员、心理咨询师、品牌策划',
      love:'浪漫主义诗人，追求充满激情和可能性的关系',
      advice:'把创意的种子种进现实的土壤里，你会惊喜',
      color:'#f59e0b'
    },
    'ISTJ': {
      name:'物流师', en:'Logistician', desc:'实际且注重事实的人，可靠性不容怀疑。',
      strengths:'责任心强、稳重可靠、条理清晰、忠诚踏实',
      weaknesses:'固执保守、不善变通、情感内敛、刻板严肃',
      career:'会计师、审计师、法官、军人、银行从业者',
      love:'用行动表达爱意，承诺对他们是神圣的',
      advice:'偶尔打破常规，新的体验会带来意想不到的成长',
      color:'#1e40af'
    },
    'ISFJ': {
      name:'守卫者', en:'Defender', desc:'非常专注且温暖的守护者，时刻准备保护所爱之人。',
      strengths:'温暖体贴、责任心强、细致耐心、忠诚可靠',
      weaknesses:'过于自我牺牲、害怕改变、压抑感受、过度担忧',
      career:'护士、教师、行政主管、社会工作者、图书馆员',
      love:'细腻温柔的爱人，用点滴关怀编织温暖的关系',
      advice:'你值得被同样对待，学会表达自己的需求',
      color:'#0d9488'
    },
    'ESTJ': {
      name:'总经理', en:'Executive', desc:'出色的管理者，在管理事物和人员方面无与伦比。',
      strengths:'组织力强、执行力高、正直可靠、务实高效',
      weaknesses:'固执专断、过于强势、难以放松、情感迟钝',
      career:'管理者、法官、军官、项目经理、银行家',
      love:'传统而忠诚，认为责任是爱情的重要组成部分',
      advice:'柔软不等于软弱，学会在刚硬中保留温柔的余地',
      color:'#059669'
    },
    'ESFJ': {
      name:'执政官', en:'Consul', desc:'极受欢迎且富有同情心的人，总是热情地帮助他人。',
      strengths:'热心肠、责任心强、善于合作、实际可靠',
      weaknesses:'过于在意他人看法、不愿改变、容易被利用、依赖认可',
      career:'教师、护士、人力资源、公关、社区工作者',
      love:'渴望传统稳定的关系，喜欢被需要和被感激',
      advice:'你的善良是礼物但不是义务，学会说"不"',
      color:'#0891b2'
    },
    'ISTP': {
      name:'鉴赏家', en:'Virtuoso', desc:'大胆而实际的实干家，擅长使用各种形式的工具。',
      strengths:'动手能力强、冷静理性、观察力敏锐、独立灵活',
      weaknesses:'难以投入感情、过于追求刺激、不擅规划、不善表达',
      career:'工程师、程序开发者、飞行员、法医、运动员',
      love:'喜欢一起做事的伴侣，行动比言语更能表达爱意',
      advice:'别忘了处理情绪也是需要练习的技能',
      color:'#65a30d'
    },
    'ISFP': {
      name:'探险家', en:'Adventurer', desc:'灵活有魅力的艺术家，时刻准备体验新鲜事物。',
      strengths:'艺术天赋、敏感细腻、友善随和、热爱自然',
      weaknesses:'过于内敛、容易焦虑、缺乏规划、不敢冲突',
      career:'设计师、摄影师、插画师、舞蹈家、花艺师',
      love:'敏感而深情的爱人，用美和感受来交流',
      advice:'你的声音值得被听见，不要害怕展现真实的自己',
      color:'#d97706'
    },
    'ESTP': {
      name:'企业家', en:'Entrepreneur', desc:'聪明、精力充沛且感知敏锐的人，真正享受冒险和风险。',
      strengths:'行动力强、机智灵活、善于社交、适应力强',
      weaknesses:'缺乏耐心、风险偏好过高、不够敏感、不拘小节',
      career:'创业者、销售经理、运动员、侦探、投资人',
      love:'喜欢刺激有趣的伴侣关系，需要空间和自由',
      advice:'慢下来思考长期后果，不是所有冒险都值得尝试',
      color:'#ca8a04'
    },
    'ESFP': {
      name:'表演者', en:'Entertainer', desc:'天生的表演者，热爱在聚光灯下，让周围充满欢乐。',
      strengths:'积极乐观、善于社交、感染力强、应变力好',
      weaknesses:'容易分心、过于敏感、不善规划、容易冲动',
      career:'演员、主持人、销售、导游、活动策划',
      love:'热情洋溢的爱人，把关系变成一场精彩的冒险',
      advice:'深度与广度同样重要，花时间独处也是成长',
      color:'#f43f5e'
    }
  },

  analyze: function(scores) {
    const EI = scores.EI >= 0 ? 'E' : 'I';
    const SN = scores.SN >= 0 ? 'N' : 'S';
    const TF = scores.TF >= 0 ? 'T' : 'F';
    const JP = scores.JP >= 0 ? 'J' : 'P';
    const type = EI + SN + TF + JP;
    const data = this.types[type];
    return {
      type: type,
      scores: scores,
      dimensions: [
        { name:'外向(E)/内向(I)', value: scores.EI, label: scores.EI >= 0 ? '外向' : '内向', pct: Math.round(Math.abs(scores.EI)/5*100) },
        { name:'直觉(N)/实感(S)', value: scores.SN, label: scores.SN >= 0 ? '直觉' : '实感', pct: Math.round(Math.abs(scores.SN)/5*100) },
        { name:'思考(T)/情感(F)', value: scores.TF, label: scores.TF >= 0 ? '思考' : '情感', pct: Math.round(Math.abs(scores.TF)/5*100) },
        { name:'判断(J)/感知(P)', value: scores.JP, label: scores.JP >= 0 ? '判断' : '感知', pct: Math.round(Math.abs(scores.JP)/5*100) }
      ],
      data: data
    };
  }
};
