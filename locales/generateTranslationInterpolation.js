import fs from 'fs';

import translations from './en/en.js';

function extractPlaceholders(template) {
  const matches = template.match(/{{(\w+)}}/g);
  return matches ? matches.map((match) => match.replace(/[{}]/g, '')) : [];
}

// Generate TypeScript interface from translation object
function generateInterface(translations) {
  const placeholders = {};

  for (const [key, value] of Object.entries(translations)) {
    const keys = extractPlaceholders(value);
    if (keys.length > 0) {
      placeholders[key] = new Set(keys);
    }
  }

  let interfaceStr = 'export default interface TranslationInterpolation {\n';
  for (const [key, keys] of Object.entries(placeholders)) {
    const props = Array.from(keys)
      .map((placeholder) => `  ${placeholder}: string|number;`)
      .join('\n');
    interfaceStr += `  ${key}: {\n${props}\n  };\n`;
  }
  interfaceStr += '}';

  return interfaceStr;
}

const interfaceStr = generateInterface(translations);
fs.writeFileSync('./locales/TranslationInterpolation.ts', interfaceStr);
console.log(
  'TypeScript interface generated and saved to TranslationInterpolation.ts'
);
