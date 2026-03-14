const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generate() {
  const input = path.join(__dirname, 'public', 'wavygo-brand-logo.png');
  const outputDir = path.join(__dirname, 'public', 'icons');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // WavyGo brand logo is horizontal. Let's fit it inside a square padding.
  
  await sharp(input)
    .resize(170, Math.round(170 * (440/162)), { fit: 'inside' }) // roughly 170px width/height constraint
    .extend({
      top: 11, bottom: 11, left: 11, right: 11,
      background: { r: 255, g: 255, b: 255, alpha: 1 } // White background for the square
    })
    .resize(192, 192, { fit: 'contain', background: '#ffffff' })
    .toFile(path.join(outputDir, 'icon-192x192.png'));

  await sharp(input)
    .resize(450, Math.round(450 * (440/162)), { fit: 'inside' })
    .extend({
      top: 31, bottom: 31, left: 31, right: 31,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .resize(512, 512, { fit: 'contain', background: '#ffffff' })
    .toFile(path.join(outputDir, 'icon-512x512.png'));
    
  console.log('Icons generated successfully.');
}

generate().catch(console.error);
