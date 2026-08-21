const fs = require('fs');
const urls = [
'https://ibb.co.com/Jw4sYKd2', 'https://ibb.co.com/ZRV2rPp6', 'https://ibb.co.com/g5HPGKy', 'https://ibb.co.com/yFDSN1p1',
'https://ibb.co.com/gbG1GXJM', 'https://ibb.co.com/60f2mcx3', 'https://ibb.co.com/cXFQ9xKM', 'https://ibb.co.com/XrJDzwYC',
'https://ibb.co.com/W4wrgg4c', 'https://ibb.co.com/M5RNs3C5', 'https://ibb.co.com/0RJZD80z', 'https://ibb.co.com/Vcwv20kV',
'https://ibb.co.com/0y1J8szw', 'https://ibb.co.com/SXR5ZGL7', 'https://ibb.co.com/356sZJ0C', 'https://ibb.co.com/0RgMwHcn',
'https://ibb.co.com/QvVLYb8B', 'https://ibb.co.com/TDjJJJWN', 'https://ibb.co.com/0yMLLbrj', 'https://ibb.co.com/pvrXHy1f',
'https://ibb.co.com/5WGcYgwQ', 'https://ibb.co.com/C5mrjGQ6', 'https://ibb.co.com/xb9QwvG', 'https://ibb.co.com/QvqhKT5j',
'https://ibb.co.com/k6cXQKFr', 'https://ibb.co.com/GQ7j3xH7', 'https://ibb.co.com/0Rwsf97w', 'https://ibb.co.com/0yXDB2Bp',
'https://ibb.co.com/hx4Fy6DN', 'https://ibb.co.com/gFjhCGyb', 'https://ibb.co.com/msNYyd7', 'https://ibb.co.com/LXZ7Yj87',
'https://ibb.co.com/FbQHFD4H', 'https://ibb.co.com/PZKyrBRk', 'https://ibb.co.com/m5qZ53jY', 'https://ibb.co.com/H0GwM8n',
'https://ibb.co.com/ymFS6rYM', 'https://ibb.co.com/wNBd4nJR', 'https://ibb.co.com/qh9WLFZ', 'https://ibb.co.com/7tyhN0zm',
'https://ibb.co.com/gFvyssGN', 'https://ibb.co.com/qMVG3XWf', 'https://ibb.co.com/Dg8vFHTT', 'https://ibb.co.com/HDdnSVnz',
'https://ibb.co.com/j9pGcKzJ', 'https://ibb.co.com/HT98ztXt', 'https://ibb.co.com/Xk6ZZG40', 'https://ibb.co.com/chYkLytd',
'https://ibb.co.com/wZC55bX5', 'https://ibb.co.com/nNfkbTyw', 'https://ibb.co.com/Y4ysBFvN', 'https://ibb.co.com/vv3stwpk',
'https://ibb.co.com/3mrbxMjj', 'https://ibb.co.com/bg2XdwWK', 'https://ibb.co.com/Y4ktY26b'
];

async function run() {
  const galleryPath = 'src/data/gallery.json';
  const data = JSON.parse(fs.readFileSync(galleryPath, 'utf8'));
  for (let i = 0; i < urls.length; i++) {
    const r = await fetch(urls[i]);
    const t = await r.text();
    const match = t.match(/<link rel="image_src" href="([^"]+)"/);
    if (match) {
      data[i].image = match[1];
      console.log('Got: ' + match[1]);
    } else {
      console.log('Failed for ' + urls[i]);
    }
  }
  fs.writeFileSync(galleryPath, JSON.stringify(data, null, 2) + '\n');
  console.log('Success! gallery.json updated.');
}
run();
