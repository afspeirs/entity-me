import fs from 'fs';

fs.readFile('./dist/site.webmanifest', 'utf8', (err, data) => {
  const webmanifest = JSON.parse(data);
  const branchName = process.env.HEAD;

  if (branchName && branchName !== 'main') {
    webmanifest.name += ` (${branchName})`;
  }

  const webmanifestApple = JSON.parse(JSON.stringify(webmanifest));
  webmanifestApple.icons = [
    {
      src: '/icon-apple-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ];

  fs.writeFile('./dist/manifest.webmanifest', JSON.stringify(webmanifest, null, 2), (error) => {
    if (error) console.log('An error has occurred ', error); // eslint-disable-line no-console
  });
  fs.writeFile('./dist/manifest-apple.webmanifest', JSON.stringify(webmanifestApple, null, 2), (error) => {
    if (error) console.log('An error has occurred ', error); // eslint-disable-line no-console
  });
});
