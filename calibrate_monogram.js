import fs from 'fs';
import opentype from 'opentype.js';

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

// 1. Monogram Dimensions:
// The C in the reference image:
// Center is around x = 165, y = 240, scale ~340.
const monoCSize = 345;
const monoCPath = cinzel.getPath("C", 30, 360, monoCSize).toPathData(2);

// In the reference image:
// Gold Swoop (Left arm of V):
// Starts under the belly of C (x=65, y=365)
// Loops under the curve of C, then ascends up-right at ~48 deg through the center of C
// Reaching top apex at (x=415, y=140)
// Stroke width is ~24 at curve, tapering to ~12 at top.
const goldSwoop = `M 65 365 C 105 408 175 402 230 354 L 410 138 C 413 134 416 128 418 122 C 414 130 398 162 384 195 L 228 350 C 182 396 118 402 65 365 Z`;

// Navy Descending Arm (Right arm of V):
// Starts around (x=240, y=178)
// Descends diagonally down-right to (x=285, y=435) forming the sharp pointed tip of V
// Right edge goes from (x=285, y=435) up through (x=324, y=408) up to (x=282, y=178)
const navyArm = `M 240 178 L 278 348 L 285 435 L 324 408 L 282 178 Z`;

// Sparkle Star above the gold apex:
// Center at (424, 88)
// 4-point concave star
const starPath = `M 424 52 Q 424 88 454 88 Q 424 88 424 124 Q 424 88 394 88 Q 424 88 424 52 Z`;

// 2. Right Typography Block:
// Starts at x = 485
const startX = 485;
const careerY = 250;
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

// Tagline: GUIDING CAREERS. BUILDING FUTURES.
const taglineY = 405;
const taglineFontSize = 32.5;
const dummyTagline = getPathString(pjs, "GUIDING CAREERS. BUILDING FUTURES.", 0, taglineY, taglineFontSize, 0);
const rawTaglineWidth = dummyTagline.finalX;
const numGaps = "GUIDING CAREERS. BUILDING FUTURES.".length - 1;
const neededTracking = (totalRightX - startX - rawTaglineWidth) / numGaps;
const finalTagline = getPathString(pjs, "GUIDING CAREERS. BUILDING FUTURES.", startX, taglineY, taglineFontSize, neededTracking);

function createSvg(navyCol, goldCol, bgCol = null) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1520 480" width="100%" height="100%" fill="none">
  ${bgCol ? `<rect width="1520" height="480" fill="${bgCol}" />` : ''}
  <!-- MONOGRAM EMBLEM -->
  <g id="cv-monogram">
    <!-- Deep Navy 'C' -->
    <path d="${monoCPath}" fill="${navyCol}" />
    <!-- Gold Swoop Arm of 'V' -->
    <path d="${goldSwoop}" fill="${goldCol}" />
    <!-- Navy Downward Arm of 'V' with sharp bottom tip -->
    <path d="${navyArm}" fill="${navyCol}" />
    <!-- 4-Point Golden Sparkle Star -->
    <path d="${starPath}" fill="${goldCol}" />
  </g>

  <!-- TYPOGRAPHY SECTION -->
  <g id="brand-typography">
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
  </g>
</svg>`;
}

const logoDark = createSvg('#042247', '#C9932B', null);
const logoWhiteBg = createSvg('#042247', '#C9932B', '#FFFFFF');
const logoLight = createSvg('#FFFFFF', '#E5C66B', null);

fs.writeFileSync('public/careerverse-logo.svg', logoDark);
fs.writeFileSync('public/careerverse-logo-white-bg.svg', logoWhiteBg);
fs.writeFileSync('public/careerverse-logo-white.svg', logoLight);
console.log("Vector SVGs regenerated and written to public/");
