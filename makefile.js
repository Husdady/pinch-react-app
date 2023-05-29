const fs = require('fs');
const { exit } = require('process');
const fileToCreate = './index.html';

const fileTocheck = './build/index.html';
const fileExists = fs.existsSync(fileTocheck);
if (!fileExists) {
  console.log('The file: ', fileTocheck, ', is required to continue.');
  exit(0);
}
const  indexContent = fs.readFileSync(fileTocheck);
const styleName = string_between_strings(`<link href="/static`, `" rel="stylesheet">`, String(indexContent));
const jsName = string_between_strings(`<script defer="defer" src="`, `"></script>`, String(indexContent));
console.log(`/statis${styleName}`);
console.log(jsName);
const stylesContent = fs.readFileSync(`./build/static${styleName}`);
const jsContent = fs.readFileSync(`./build${jsName}`);

const data = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Web site created using create-react-app" />
  <link rel="apple-touch-icon" href="/logo192.png" />
  <link rel="manifest" href="/manifest.json" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <title>React App</title>
  <style>
  ${String(stylesContent)}
  </style>
</head>
<body><noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
<script>
${String(jsContent)}
</script>
</body>
</html>`;
fs.writeFile(
  fileToCreate,
  data,
  function(err) {
    if (err) return console.log(err);
    console.log('index.html file created');
  }
);

function string_between_strings(startStr, endStr, str) {
  let pos = str.indexOf(startStr) + startStr.length;
  return str.substring(pos, str.indexOf(endStr, pos));
}