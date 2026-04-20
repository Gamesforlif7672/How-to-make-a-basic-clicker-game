const starterCode = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Clicker Game</title>
</head>
<body>
  <p>Template</p>

  <script>
    // Step 1: Add the score and buttons to the page.
    // const scoreEl = document.getElementById('score');
    // const clickBtn = document.getElementById('clickButton');
    // const upgradeBtn = document.getElementById('upgradeButton');
    // const resetBtn = document.getElementById('resetButton');
    // const powerInfo = document.getElementById('powerInfo');

    // Step 2: Start the game with three numbers.
    // let score = 0;
    // let clickPower = 1;
    // let upgradeCost = 10;

    // Step 3: Add a function that updates the text on the page.
    // function updateDisplay() {
    //   scoreEl.textContent = score;
    //   powerInfo.textContent = 'Click power: ' + clickPower;
    //   upgradeBtn.textContent = 'Buy upgrade (' + upgradeCost + ' pts)';
    // }

    // Step 4: Add code that runs when each button is pressed.
    // clickBtn.addEventListener('click', () => { ... });
    // upgradeBtn.addEventListener('click', () => { ... });
    // resetBtn.addEventListener('click', () => { ... });
  <\/script>
</body>
</html>`;

const steps = [
  {
    title: 'Step 1: Add the score and buttons',
    instruction: 'Let’s start by making the things you see on the game page.\n\nIn the <body> part, type these lines to add: \n- A number that shows your score (use <span id="score">0</span>)\n- A button to click for points (use <button id="clickButton">Click me!</button>)\n- A button to buy upgrades (use <button id="upgradeButton">Upgrade</button>)\n- A button to reset the game (use <button id="resetButton">Reset</button>)\n- A spot to show your click power (use <span id="powerInfo"></span>)\n\nDon’t worry about what “id” means yet. Just copy the lines and put them inside <body> before <script>.',
    validate(code) {
      const has = pattern => pattern.test(code);
      return {
        ok: has(/id=["']score["']/i) && has(/id=["']clickButton["']/i) && has(/id=["']upgradeButton["']/i) && has(/id=["']resetButton["']/i) && has(/id=["']powerInfo["']/i) && has(/<script>/i),
        message: 'Great! You added the score and all the buttons the game needs.',
      };
    },
  },
  {
    title: 'Step 2: Add the game numbers',
    instruction: 'Now we’ll make the game remember your score and how strong your clicks are.\n\nInside the <script> part, type these lines:\n- let score = 0;\n- let clickPower = 1;\n- let upgradeCost = 10;\n\nThese lines tell the computer to remember three numbers. Don’t change anything else yet.',
    validate(code) {
      const has = pattern => pattern.test(code);
      return {
        ok: has(/let\s+score\s*=\s*0/i) && has(/let\s+clickPower\s*=\s*1/i) && has(/let\s+upgradeCost\s*=\s*10/i),
        message: 'Awesome! The game now remembers your score, click power, and upgrade cost.',
      };
    },
  },
  {
    title: 'Step 3: Show the numbers on the page',
    instruction: 'Let’s make the numbers on the page change when you play.\n\nStill inside <script>, type this:\n- function updateDisplay() {\n    scoreEl.textContent = score;\n    powerInfo.textContent = "Click power: " + clickPower;\n    upgradeBtn.textContent = "Buy upgrade (" + upgradeCost + " pts)";\n  }\n\nThis tells the computer how to update the page. Don’t worry if you don’t understand “function” yet.',
    validate(code) {
      const has = pattern => pattern.test(code);
      return {
        ok: has(/function\s+updateDisplay\s*\(/i) && has(/scoreEl\.textContent/i),
        message: 'Nice! The game can now update the numbers you see.',
      };
    },
  },
  {
    title: 'Step 4: Make the click button work',
    instruction: 'Now let’s make the main button give you points.\n\nType this inside <script>:\n- clickBtn.addEventListener("click", () => {\n    score += clickPower;\n    updateDisplay();\n  });\n\nThis means: when you click the button, your score goes up, and the page updates.',
    validate(code) {
      const has = pattern => pattern.test(code);
      return {
        ok: has(/clickBtn\.addEventListener\(\s*['"]click['"]/i) && has(/score\s*\+\=\s*clickPower/i) && has(/updateDisplay\s*\(/i),
        message: 'Great! The click button now gives you points.',
      };
    },
  },
  {
    title: 'Step 5: Make upgrades and reset work',
    instruction: 'Last step!\n\nAdd these two pieces inside <script>:\n\n1. For the upgrade button:\nupgradeBtn.addEventListener("click", () => {\n  if (score >= upgradeCost) {\n    score -= upgradeCost;\n    clickPower += 1;\n    upgradeCost = Math.ceil(upgradeCost * 2.2);\n    updateDisplay();\n  }\n});\n\n2. For the reset button:\nresetBtn.addEventListener("click", () => {\n  score = 0;\n  clickPower = 1;\n  upgradeCost = 10;\n  updateDisplay();\n});\n\nThis lets you buy upgrades and restart the game.',
    validate(code) {
      const has = pattern => pattern.test(code);
      return {
        ok: has(/upgradeBtn\.addEventListener\(\s*['"]click['"]/i) && has(/score\s*-\=\s*upgradeCost/i) && has(/clickPower\s*\+\=\s*1/i) && has(/Math\.ceil\(upgradeCost\s*\*\s*2\.2\)/i) && has(/resetBtn\.addEventListener\(\s*['"]click['"]/i) && has(/score\s*=\s*0/i) && has(/clickPower\s*=\s*1/i) && has(/upgradeCost\s*=\s*10/i),
        message: 'You did it! The upgrade and reset buttons now work.',
      };
    },
  },
];

let currentStep = 0;
const codeField = document.getElementById('gameCode');
const runButton = document.getElementById('runButton');
const loadStarterButton = document.getElementById('loadStarterButton');
const preview = document.getElementById('preview');
const consoleOutput = document.getElementById('console');
const stepTitle = document.getElementById('stepTitle');
const stepInstructions = document.getElementById('stepInstructions');
const stepFeedback = document.getElementById('stepFeedback');

function renderStep() {
  if (currentStep >= steps.length) {
    stepTitle.textContent = 'All steps complete!';
    stepInstructions.textContent = 'Nice work — the clicker game is built. You can keep improving styles or add new features.';
    runButton.textContent = 'Run game';
    return;
  }

  stepTitle.textContent = steps[currentStep].title;
  stepInstructions.textContent = steps[currentStep].instruction;
  stepFeedback.textContent = `Complete step ${currentStep + 1} of ${steps.length}.`;
  runButton.textContent = 'Run step';
}

function loadStarter() {
  currentStep = 0;
  codeField.value = starterCode;
  consoleOutput.textContent = 'Starter code loaded. Follow the first step and press Run step.';
  renderStep();
  runCode();
}

function runCode() {
  const code = codeField.value;
  consoleOutput.textContent = 'Running code and checking step...';
  const blob = new Blob([code], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  preview.src = url;

  if (currentStep >= steps.length) {
    stepFeedback.textContent = 'All steps are complete; the game is ready!';
    return;
  }

  const result = steps[currentStep].validate(code);
  if (result.ok) {
    currentStep += 1;
    stepFeedback.textContent = `Step complete! ${result.message}`;
    if (currentStep < steps.length) {
      stepFeedback.textContent += ` Next: ${steps[currentStep].title}`;
    }
    renderStep();
  } else {
    stepFeedback.textContent = `Step not complete: ${result.message}`;
  }
}

renderStep();
loadStarterButton.addEventListener('click', loadStarter);
runButton.addEventListener('click', runCode);
