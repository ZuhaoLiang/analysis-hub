# 万象分析 · Life Discovery Hub

✦ 七大系统 · 多维解读 · 重新认识你自己

## 系统架构

```
analysis-hub/
├── index.html         ← 主页面（星空主题单页应用）
├── css/
│   └── style.css      ← 星际主题样式
├── js/
│   ├── app.js         ← 主应用逻辑（UI联动、渲染引擎）
│   └── systems/
│       ├── astronomy.js         ← 天文学辅助库（儒略日、干支、节气等）
│       ├── mbti-data.js         ← MBTI 20题测试 + 16型人格分析
│       ├── zodiac-data.js       ← 西方星座 + 上升/月亮星座
│       ├── astrology-data.js    ← 星盘系统 + 宫位/相位解读
│       ├── bazi-engine.js       ← 八字引擎（五行、十神、纳音）
│       ├── ziwei-engine.js      ← 紫微斗数（14主星、12宫位）
│       ├── mayan-engine.js      ← 玛雅图腾（卓尔金历、20图腾、13音阶）
│       ├── humandesign-engine.js← 人类图（5类型、9中心、BodyGraph）
│       └── summary-engine.js    ← 综合交叉解读引擎
└── server.js          ← 本地服务器
```

## 已实现的系统

| # | 系统 | 状态 | 说明 |
|---|------|------|------|
| 1 | **MBTI** | ✅ 完整 | 20题测试，16型人格详细分析（优势/弱点/职业/爱情/建议） |
| 2 | **星座** | ✅ 完整 | 12星座深度分析 + 上升星座 + 月亮星座 + 生肖 + 匹配度 |
| 3 | **星盘** | ✅ 核心 | 10大行星位置 + 12宫位系统 + 星盘可视化图表 |
| 4 | **八字** | ✅ 完整 | 四柱八字推算 + 五行分布 + 十神关系 + 纳音 + 命理分析 |
| 5 | **紫微斗数** | ✅ 核心 | 14主星排盘 + 12宫位解读 + 命盘可视化 |
| 6 | **玛雅图腾** | ✅ 完整 | KIN计算 + 20图腾 + 13音阶 + 波符 + 指引/相似/挑战力量 |
| 7 | **人类图** | ✅ 核心 | 5种能量类型 + 人生策略 + 内在权威 + BodyGraph图表 |
| — | **综合报告** | ✅ 引擎 | 七系统交叉解读，AI式综合分析 |

## 启动方式

```bash
# 方式一：Node.js
cd analysis-hub
node server.js
# → http://localhost:8080

# 方式二：Python
cd analysis-hub
python -m http.server 8080
# → http://localhost:8080
```

## 使用方法

1. **打开** http://localhost:8080
2. **输入** 昵称、出生日期/时间、地点坐标
3. 点击 **「全面分析」**
4. 完成 **MBTI 20题测评**
5. 滚动浏览所有系统解析结果

## 技术栈

纯前端 · HTML/CSS/JavaScript · 零依赖 · 星空Canvas背景 · 星盘SVG渲染 · 人类图Canvas绘图

> ✦ 知人者智，自知者明。
