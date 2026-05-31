const fs = require('fs');
const path = require('path');
const file = path.join(process.env.USERPROFILE, '.openclaw/workspace/analysis-hub/index.html');
let h = fs.readFileSync(file, 'utf8');

// ===== 1. Remove 生肖 card from 星座 section =====
var zodiacLine = h.indexOf('class="emoji-dragon"></i> 生肖<', 2400);
if (zodiacLine > 0) {
  var lineStart = h.lastIndexOf('\n', zodiacLine);
  var lineEnd = h.indexOf('\n', zodiacLine);
  var fullLine = h.substring(lineStart, lineEnd);
  h = h.substring(0, lineStart) + h.substring(lineEnd);
  console.log('✅ 生肖 removed from zodiac');
}

// ===== 2. Add card-title to MBTI profile card and dimension cards =====
// Fix dimension cards - add card-title div
var dimCardOld = '+ \'<div class="result-card" style="text-align:center;">\'\\n    + \'<div style="font-size:12px; color:var(--text-muted); margin-bottom:4px;">\' + d.name';
var dimCardNew = '+ \'<div class="result-card" style="text-align:center;">\'\\n    + \'<div class="card-title" style="font-size:12px; color:var(--text-muted); margin-bottom:4px;">\' + d.name';
// Actually the dimension cards have inline styling without card-title class
// Let me add card-title by modifying the renderMBTIResult function

// Find the dimension rendering section
var dimRender = h.indexOf("result.dimensions.map(function(d)");
if (dimRender > 0) {
  // Find the first div inside dimension cards
  var firstDiv = h.indexOf("'<div style=\"font-size:12px", dimRender);
  if (firstDiv > 0) {
    h = h.substring(0, firstDiv) + "'<div class=\"card-title\" style=\"font-size:12px; color:var(--text-muted); margin-bottom:4px;\">' + d.name + '</div>' + '<div style=\"height:4px; background:rgba(255,255,255,0.08); border-radius:2px; margin:8px 0;position:relative;\">'" + h.substring(firstDiv + "'<div style=\"font-size:12px; color:var(--text-muted); margin-bottom:4px;\">' + d.name + '</div>' + '<div style=\"height:4px; background:rgba(255,255,255,0.08); border-radius:2px; margin:8px 0;position:relative;\">'".length + firstDiv);
    console.log('✅ MBTI dimension cards now have card-title');
  }
}

// Fix the main profile card - add card-title
var profileCardOld = "'<div class=\"result-card\" style=\"text-align:center;\">'\\n    + '<div style=\"font-size:48px; margin-bottom:8px;\">\\uD83E\\uDDD0</div>'\\n    + '<div style=\"font-size:32px; font-weight:900; color:' + t.color + '; letter-spacing:4px;\">' + result.type + '</div>'";
var profileCardNew = "'<div class=\"result-card\" style=\"text-align:center;\">'\\n    + '<div style=\"font-size:48px; margin-bottom:8px;\">\\uD83E\\uDDD0</div>'\\n    + '<div class=\"card-title\" style=\"font-size:32px; font-weight:900; color:' + t.color + '; letter-spacing:4px;\">' + result.type + '</div>'";
// Hmm this is getting messy with escaping. Let me use a simpler approach.

// Actually, let me just search for the profile card and fix it
var profileSearch = h.indexOf("font-size:48px; margin-bottom:8px;\">🧠</div>");
if (profileSearch > 0) {
  var afterEmoji = h.indexOf("</div>", profileSearch);
  var beforeType = h.indexOf("font-size:32px", profileSearch);
  if (beforeType > 0) {
    // Add class="card-title" to the type div
    h = h.substring(0, beforeType) + "class=\"card-title\" style=\"font-size:32px; font-weight:900; color:' + t.color + '; letter-spacing:4px;\">" + h.substring(h.indexOf('>', beforeType) + 1);
    console.log('✅ MBTI profile card now has card-title');
  }
}

// ===== 3. Check ziwei palace order =====
// Standard order: 命宫, 兄弟宫, 夫妻宫, 子女宫, 财帛宫, 疾厄宫, 迁移宫, 交友宫, 官禄宫, 田宅宫, 福德宫, 父母宫
// Check the actual order in the code
var palaceStart = h.indexOf("palaces:");
if (palaceStart > 0) {
  var palaceBlock = h.substring(palaceStart, palaceStart + 500);
  console.log('Palace data fragment:', palaceBlock.substring(0, 200).replace(/\n/g, ' '));
}

// ===== 4. Also add card-title to dimension label =====
var labelTag = h.indexOf("font-size:14px; color:var(--accent-gold);\">' + d.label + '</div>", dimRender);
if (labelTag > 0 && labelTag < dimRender + 500) {
  // Already has content, just checking
}

// ===== Check syntax =====
fs.writeFileSync(file, h, 'utf8');
var m = h.match(/<script>([\s\S]*?)<\/script>/);
if (m) {
  var ck = path.join(process.env.USERPROFILE, '.openclaw/workspace/analysis-hub/__ck.js');
  fs.writeFileSync(ck, m[1], 'utf8');
  try {
    require('child_process').execSync('node --check "' + ck + '"', { stdio: 'pipe' });
    console.log('✅ Syntax OK');
  } catch(e) {
    console.log('❌ ' + (e.stderr || '').toString().substring(0, 200));
    try { fs.unlinkSync(ck); } catch(ex) {}
    process.exit(1);
  }
  try { fs.unlinkSync(ck); } catch(ex) {}
}

console.log('✅ Size: ' + (fs.statSync(file).size/1024).toFixed(0) + ' KB');
