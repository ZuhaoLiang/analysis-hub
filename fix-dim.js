const fs = require('fs');
const path = require('path');
const file = path.join(process.env.USERPROFILE, '.openclaw/workspace/analysis-hub/index.html');
let h = fs.readFileSync(file, 'utf8');

// Fix dimension card line - find the broken concatenation
var searchStr = '<div class="card-title" style="font-size:12px; color:var(--text-muted); margin-bottom:4px;">';
var idx = h.indexOf(searchStr);
if (idx > 0) {
  var lineStart = h.lastIndexOf('\n', idx);
  var lineEnd = h.indexOf('\n', idx);
  console.log('BROKEN LINE:');
  console.log(h.substring(lineStart, lineEnd));
  
  // Fix: the broken line has some garbage at the end
  var fixed = h.substring(0, lineStart) + 
    "    + '<div class=\"card-title\" style=\"font-size:12px; color:var(--text-muted); margin-bottom:4px;\">' + d.name + '</div>' + '<div style=\"height:4px; background:rgba(255,255,255,0.08); border-radius:2px; margin:8px 0;position:relative;\">"
    + h.substring(lineEnd);
  h = fixed;
}

fs.writeFileSync(file, h, 'utf8');
console.log('Fixed dimension card');

// Check syntax
var m = h.match(/<script>([\s\S]*?)<\/script>/);
if (m) {
  var ck = path.join(process.env.USERPROFILE, '.openclaw/workspace/analysis-hub/__ck.js');
  fs.writeFileSync(ck, m[1], 'utf8');
  try {
    require('child_process').execSync('node --check "' + ck + '"', { stdio: 'pipe' });
    console.log('Syntax OK');
  } catch(e) {
    console.log('ERR: ' + (e.stderr || '').toString().substring(0, 300));
    try { fs.unlinkSync(ck); } catch(ex) {}
  }
  try { fs.unlinkSync(ck); } catch(ex) {}
}
