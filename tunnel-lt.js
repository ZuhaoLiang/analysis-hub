const localtunnel = require('C:\\Users\\拉里\\AppData\\Roaming\\npm\\node_modules\\localtunnel');
const fs = require('fs');

const URL_FILE = 'C:\\Users\\拉里\\.openclaw\\tunnel-url.txt';

async function startTunnel() {
  try {
    const tunnel = await localtunnel({
      port: 8080,
      local_host: '127.0.0.1',
      max_conn: 50
    });

    const url = tunnel.url;
    fs.writeFileSync(URL_FILE, url);
    console.log('✅ ' + url);

    tunnel.on('error', err => {
      console.error('❌ ' + err.message);
      reconnect();
    });

    tunnel.on('close', () => {
      console.log('⚠️ 断开');
      reconnect();
    });

  } catch (err) {
    console.error('❌ ' + err.message);
    reconnect();
  }
}

function reconnect() {
  setTimeout(startTunnel, 3000);
}

startTunnel();
