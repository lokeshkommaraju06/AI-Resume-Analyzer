import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
const filePath = path.join(__dirname, 'package.json');
const fileContent = fs.readFileSync(filePath);

const postDataHead = Buffer.from(
  '--' + boundary + '\r\n' +
  'Content-Disposition: form-data; name="resume"; filename="package.pdf"\r\n' +
  'Content-Type: application/pdf\r\n\r\n'
);

const postDataMiddle = Buffer.from(
  '\r\n--' + boundary + '\r\n' +
  'Content-Disposition: form-data; name="jobDescription"\r\n\r\n' +
  'Test Job Description\r\n' +
  '--' + boundary + '--\r\n'
);

const postData = Buffer.concat([postDataHead, fileContent, postDataMiddle]);

const options = {
  hostname: '127.0.0.1',
  port: 5000,
  path: '/api/analyze',
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=' + boundary,
    'Content-Length': postData.length
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(`ERROR: ${e.message}`);
});

req.write(postData);
req.end();
