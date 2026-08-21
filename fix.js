const fs = require('fs');

async function fix() {
  const file = './src/data/members.json';
  const members = JSON.parse(fs.readFileSync(file, 'utf-8'));
  let changed = false;

  for (let m of members) {
    if (m.image && m.image.includes('wikipedia')) {
      const match = m.robloxProfile?.match(/users\/(\d+)/);
      if (match) {
        const uid = match[1];
        console.log('Fetching for', m.name, uid);
        try {
          const res = await fetch(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${uid}&size=420x420&format=Png&isCircular=false`);
          const data = await res.json();
          if (data.data && data.data[0] && data.data[0].imageUrl) {
            m.image = data.data[0].imageUrl;
            console.log('Updated', m.name);
            changed = true;
          }
        } catch(e) { 
          console.error(e);
        }
      }
    }
  }

  if (changed) {
    fs.writeFileSync(file, JSON.stringify(members, null, 2));
    console.log('Saved members.json');
  } else {
    console.log('No members needed updating.');
  }
}

fix();
