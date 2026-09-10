import fs from 'fs';
import path from 'path';

console.log("Running Content Integrity and Regression Verification...\n");

const root = process.cwd();
let failed = false;

function assert(condition, msg) {
  if (!condition) {
    console.error(`[FAIL] ${msg}`);
    failed = true;
  } else {
    console.log(`[PASS] ${msg}`);
  }
}

// 1. Verify projects.ts
const projectsPath = path.join(root, 'data', 'projects.ts');
assert(fs.existsSync(projectsPath), 'data/projects.ts exists');
const projectsContent = fs.readFileSync(projectsPath, 'utf8');

const requiredSlugs = [
  'live-f1-intelligence',
  'f1-lap-time-simulator',
  'racemind-ai',
  'f1-race-manager',
  'ea-fc-intelligence',
  'vyaparpulse',
  'ignict',
];

for (const slug of requiredSlugs) {
  assert(projectsContent.includes(`slug: "${slug}"`), `Project slug '${slug}' verified`);
}

// 2. Verify education.ts
const educationPath = path.join(root, 'data', 'education.ts');
assert(fs.existsSync(educationPath), 'data/education.ts exists');
const educationContent = fs.readFileSync(educationPath, 'utf8');

assert(educationContent.includes('VIT-AP University'), 'Education institution is VIT-AP University');
assert(
  educationContent.includes('Integrated M.Tech — Computer Science & Engineering'),
  'Education program is Integrated M.Tech — Computer Science & Engineering'
);

// Forbidden academic inflation fields in the exported object
const linesWithoutComments = educationContent
  .split('\n')
  .filter(l => !l.trim().startsWith('*') && !l.trim().startsWith('//') && !l.trim().startsWith('/*'))
  .join('\n');

const forbiddenStrings = ['CGPA', 'GPA', 'Grade', 'Percentage', 'Rank #', 'Marks', 'cgpa', 'gpa'];
for (const term of forbiddenStrings) {
  assert(!linesWithoutComments.includes(term), `No inflated academic property '${term}' in education.ts`);
}

// 3. Verify experience.ts
const experiencePath = path.join(root, 'data', 'experience.ts');
assert(fs.existsSync(experiencePath), 'data/experience.ts exists');
const expContent = fs.readFileSync(experiencePath, 'utf8');
assert(expContent.includes('Independent Motorsport / eSports'), 'Experience includes Independent Motorsport / eSports');
assert(expContent.includes('IGNICT'), 'Experience includes IGNICT');

// 4. Verify specialized visualization files exist
const visuals = [
  'components/work/ArchitecturePipeline.tsx',
  'components/work/TelemetryFlowVisual.tsx',
  'components/work/NumericalDecomposition.tsx',
  'components/work/RaceMindSessionVisual.tsx',
  'components/work/IgnictMatchingVisual.tsx',
  'components/work/ProjectIndexRow.tsx',
  'components/home/SignatureVisual.tsx',
  'components/home/visual/SignatureCanvas.tsx',
];

for (const v of visuals) {
  const p = path.join(root, v);
  assert(fs.existsSync(p), `Required visualization component ${v} exists`);
}

console.log("\n--------------------------------------------------");
if (failed) {
  console.error("Content Integrity Verification FAILED.");
  process.exit(1);
} else {
  console.log("All Content Integrity and Regression Checks PASSED cleanly.");
}
