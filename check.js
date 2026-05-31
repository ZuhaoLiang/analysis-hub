const fs = require('fs');
const h = fs.readFileSync('index.html', 'utf8');
console.log('Dollar function:', h.indexOf('function $(') > 0);
console.log('has DCL:', h.indexOf('DOMContentLoaded') > 0);
console.log('has submit:', h.indexOf('form.addEventListener') > 0);
console.log('has ContentPack:', h.indexOf('ContentPack') > 0);
console.log('has $ in DCL:', h.indexOf('$', h.indexOf('DOMContentLoaded')) > 0);
console.log('has DetailMap:', h.indexOf('var DetailMap') > 0);
console.log('has bindAllExpand:', h.indexOf('bindAllExpand') > 0);
console.log('has runAllSystems:', h.indexOf('window.runAllSystems') > 0);
console.log('has zodiac-result:', h.indexOf('zodiac-result') > 0);
console.log('has master-form:', h.indexOf('master-form') > 0);
// Content check around script end
var scriptEnd = h.lastIndexOf('</script>');
console.log('Before </script>:', h.substring(scriptEnd - 300, scriptEnd).replace(/\n/g, '\\n'));
