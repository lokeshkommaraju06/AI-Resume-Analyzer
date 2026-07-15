import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
import fs from 'fs';

async function test() {
    try {
        const dataBuffer = fs.readFileSync('package.json');
        const data = await pdfParse(dataBuffer);
        console.log("Success:", data.text);
    } catch(e) {
        console.error('ERROR:', e.message);
    }
}
test();
