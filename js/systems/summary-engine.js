/* ======================================
   综合引擎 · 七大系统交叉解读
   ====================================== */

const SummaryEngine = {
  generate: function(allResults) {
    const { user, mbti, zodiac, zodiacSign, astrology, bazi, baziResult, ziwei, mayan, humandesign } = allResults;
    
    const sections = [];
    let title = `${user.name}的全面人生解读报告`;
    
    // MBTI 片段
    if (mbti) {
      sections.push(`【人格画像】你的MBTI类型是${mbti.type}（${mbti.data.name}），本质上是${mbti.data.desc.slice(0,30)}。`);
    }
    
    // 星座片段
    if (zodiac) {
      sections.push(`【星座特质】太阳${zodiacSign.name}（${zodiacSign.symbol}），${zodiacSign.element}象${zodiacSign.quality}星座，守护星${zodiacSign.ruler}。你的上升星座为${zodiac.rising}，月亮落在${zodiac.moon}。`);
    }
    
    // 八字片段
    if (baziResult) {
      sections.push(`【传统命理】你是${baziResult.shengxiao}年生人，八字为【${baziResult.bazi.year.full}年 ${baziResult.bazi.month.full}月 ${baziResult.bazi.day.full}日 ${baziResult.bazi.hour.full}时】。日主${baziResult.riZhu}五行属${baziResult.riZhuWuxing}。`);
    }
    
    // 星盘片段
    if (astrology && astrology.planets && astrology.planets.length > 0) {
      const planetNames = astrology.planets.slice(0, 5).map(p => p.name).join('、');
      sections.push(`【星空格局】你的星盘中${planetNames}等行星的能量分布为你的性格提供了宇宙维度的解读。`);
    }
    
    // 紫微片段
    if (ziwei && ziwei.length > 0) {
      const hasStar = ziwei.filter(p => p.star !== '无主星');
      const starNames = hasStar.slice(0, 3).map(p => `${p.palace}（${p.star}）`).join('、');
      sections.push(`【紫微命盘】你的命盘中${starNames}等宫位构成了你的人生格局。`);
    }
    
    // 玛雅片段
    if (mayan) {
      const kin = mayan.info;
      sections.push(`【玛雅印记】你的银河印记是【${kin.galacticSignature}】，KIN ${kin.kin}，位于${kin.wave.name}的第${kin.wave.positionNum}格。你是${kin.mainGlyph.desc.slice(0,20)}。`);
    }
    
    // 人类图片段
    if (humandesign) {
      sections.push(`【人类赋能】你属于${humandesign.typeInfo.type}能量类型（${humandesign.typeInfo.typeData.desc.slice(0,20)}），人生角色${humandesign.typeInfo.profileKey}，内在权威为${humandesign.typeInfo.authority}型。`);
    }
    
    // 综合启发性段落
    const insights = this.generateInsights(mbti, zodiacSign, baziResult, mayan, humandesign);
    
    return {
      title: title,
      sections: sections,
      insights: insights
    };
  },

  generateInsights: function(mbti, zodiac, bazi, mayan, hd) {
    const insights = [];
    
    // 基于交叉系统的启发
    if (mbti && zodiac) {
      const ie = mbti.scores.EI >= 0 ? '外向' : '内向';
      const element = zodiac.element;
      const elementEnergy = element === '火' || element === '风' ? '向外释放' : '向内沉淀';
      insights.push(`你的能量流动：${ie}的你在星座能量上呈现${element}象的${elementEnergy}趋势，内外呼应，构成了你独特的能量交互模式。`);
    }
    
    if (mbti && bazi) {
      insights.push(`内在驱动力：MBTI告诉你"你如何与世界互动"，八字揭示了你与生俱来的五行能量格局。两者的结合揭示了你在"天然倾向"和"潜在能量"之间的张力。`);
    }
    
    if (mayan && zodiac) {
      insights.push(`时间维度的你：星座基于太阳历，玛雅印记基于卓尔金历。一个属于太阳系，一个属于银河系。两者共同定位了你在宇宙中的独特时空坐标。`);
    }
    
    if (hd) {
      insights.push(`核心提醒：根据人类图，你的"非自己主题"是"${hd.typeInfo.typeData.notSelf}"——当你感到这种情绪时，停下来重新校准。`);
    }
    
    if (insights.length === 0) {
      insights.push('你是一个独特的宇宙存在。没有两张相同的命盘，没有两段相同的人生。以上分析仅供多维参考。');
    }
    
    insights.push('✨ 知人者智，自知者明。七大系统从不同维度照亮了你的某一个侧面，而真正的你，比所有系统的总和还要丰富。');
    
    return insights;
  }
};
