import fs from 'fs';
import opentype from 'opentype.js';
import { execSync } from 'child_process';

const cinzelBuf = fs.readFileSync('/tmp/fonts/Cinzel-Bold.ttf');
const cinzel = opentype.parse(cinzelBuf.buffer.slice(cinzelBuf.byteOffset, cinzelBuf.byteOffset + cinzelBuf.byteLength));

const pjsBuf = fs.readFileSync('/tmp/fonts/PlusJakartaSans-Bold.ttf');
const pjs = opentype.parse(pjsBuf.buffer.slice(pjsBuf.byteOffset, pjsBuf.byteOffset + pjsBuf.byteLength));

function getPathString(font, text, x, y, fontSize, letterSpacing = 0) {
  let curX = x;
  let allCommands = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const glyph = font.charToGlyph(ch);
    const glyphPath = glyph.getPath(curX, y, fontSize);
    allCommands.push(...glyphPath.commands);
    const advance = (glyph.advanceWidth / font.unitsPerEm) * fontSize;
    curX += advance + letterSpacing;
  }
  const p = new opentype.Path();
  p.commands = allCommands;
  return { pathData: p.toPathData(2), finalX: curX - letterSpacing };
}

// 1. Monogram
// Monogram C:
const monoCSize = 356;
const monoCPath = cinzel.getPath("C", 30, 362, monoCSize).toPathData(2);

// Monogram Gold Swoop:
// Elegant curve under C, sweeping up to apex
const goldSwoop = `M 68 368 C 105 408 175 402 232 352 L 406 138 C 409 133 413 127 417 120 C 414 128 398 162 384 195 L 230 350 C 182 396 118 402 68 368 Z`;

// Monogram Navy Right Arm of V:
const navyArm = `M 245 178 L 280 348 C 285 372 292 400 298 428 L 322 428 C 312 398 300 360 286 312 L 282 178 Z`;

// Sparkle Star:
const starPath = `M 420 54 Q 420 88 448 88 Q 420 88 420 122 Q 420 88 392 88 Q 420 88 420 54 Z`;

// 2. Right Typography Block:
const startX = 490;
const careerY = 248;
const fontSizeCareer = 126;

const careerRes = getPathString(cinzel, "CAREER", startX, careerY, fontSizeCareer, 0);
const verseRes = getPathString(cinzel, "VERSE", careerRes.finalX, careerY, fontSizeCareer, 0);
const totalRightX = verseRes.finalX;

// INDIA
const indiaY = 328;
const indiaFontSize = 46;
const indiaLetterSpacing = 36;
const indiaRes = getPathString(cinzel, "INDIA", 0, indiaY, indiaFontSize, indiaLetterSpacing);
const indiaWidth = indiaRes.finalX;
const indiaStartX = startX + (totalRightX - startX - indiaWidth) / 2;
const finalIndia = getPathString(cinzel, "INDIA", indiaStartX, indiaY, indiaFontSize, indiaLetterSpacing);

const lineLeftEnd = Math.round(indiaStartX - 34);
const lineRightStart = Math.round(indiaStartX + indiaWidth + 34);
const lineY = 316;

// Tagline
const taglineY = 404;
const taglineFontSize = 32.5;
const dummyTagline = getPathString(pjs, "GUIDING CAREERS. BUILDING FUTURES.", 0, taglineY, taglineFontSize, 0);
const rawTaglineWidth = dummyTagline.finalX;
const numGaps = "GUIDING CAREERS. BUILDING FUTURES.".length - 1;
const neededTracking = (totalRightX - startX - rawTaglineWidth) / numGaps;
const finalTagline = getPathString(pjs, "GUIDING CAREERS. BUILDING FUTURES.", startX, taglineY, taglineFontSize, neededTracking);

function createSvg(navyCol, goldCol, bgCol = null) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1520 480" width="1520" height="480" fill="none">
  ${bgCol ? `<rect width="1520" height="480" fill="${bgCol}" />` : ''}
  <!-- MONOGRAM EMBLEM -->
  <!-- C -->
  <path d="${monoCPath}" fill="${navyCol}" />
  <!-- Gold Swoop -->
  <path d="${goldSwoop}" fill="${goldCol}" />
  <!-- Navy Right Arm of V -->
  <path d="${navyArm}" fill="${navyCol}" />
  <!-- Sparkle Star -->
  <path d="${starPath}" fill="${goldCol}" />

  <!-- TYPOGRAPHY -->
  <!-- CAREER -->
  <path d="${careerRes.pathData}" fill="${navyCol}" />
  <!-- VERSE -->
  <path d="${verseRes.pathData}" fill="${goldCol}" />

  <!-- Left Gold Line -->
  <line x1="${startX}" y1="${lineY}" x2="${lineLeftEnd}" y2="${lineY}" stroke="${goldCol}" stroke-width="3.5" stroke-linecap="round" />
  
  <!-- INDIA -->
  <path d="${finalIndia.pathData}" fill="${navyCol}" />

  <!-- Right Gold Line -->
  <line x1="${lineRightStart}" y1="${lineY}" x2="${Math.round(totalRightX)}" y2="${lineY}" stroke="${goldCol}" stroke-width="3.5" stroke-linecap="round" />

  <!-- Tagline: GUIDING CAREERS. BUILDING FUTURES. -->
  <path d="${finalTagline.pathData}" fill="${navyCol}" />
</svg>`;
}

const logoSvg = createSvg('#042247', '#C9932B', null);
const logoSvgWhiteBg = createSvg('#042247', '#C9932B', '#FFFFFF');
const logoSvgLight = createSvg('#FFFFFF', '#E5C66B', null);

fs.writeFileSync('public/careerverse-logo.svg', logoSvg);
fs.writeFileSync('public/careerverse-logo-white-bg.svg', logoSvgWhiteBg);
fs.writeFileSync('public/careerverse-logo-white.svg', logoSvgLight);

console.log("SVGs successfully generated with pure vector outlines!");

// Render PNG
try {
  execSync('convert -density 200 public/careerverse-logo-white-bg.svg public/careerverse-logo.png');
  console.log("Rendered high-resolution PNG: public/careerverse-logo.png");
} catch (e) {
  console.error("PNG convert error:", e.message);
}
