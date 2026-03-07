const ASCII_ART = `
 _____
|_   _|__  _ __  _   _
  | |/ _ \\| '_ \\| | | |
  | | (_) | | | | |_| |
  |_|\\___/|_| |_|\\__, |
                  |___/
 _____ _      _          _ _ 
| ____(_) ___| |__   ___| | |__   ___ _ __ __ _  ___ _ __ 
|  _| | |/ __| '_ \\ / _ \\| '_ \\ / _ \\ '__/ _\` |/ _ \\ '__|
| |___| | (__| | | |  __/ | |_) |  __/ | | (_| |  __/ | 
|_____|_|\\___|_| |_|\\___|_|_.__/ \\___|_|  \\__, |\\___|_|
                                          |___/ 
`;

const WELCOME_MESSAGE = `Type 'help' to get started.`;

let state = {
  currentDirectory: '~',
  commandHistory: [],
  historyIndex: -1,
};

function typeText(element, text, speed = 0) {
  return new Promise((resolve) => {
    let i = 0;
    element.textContent = '';
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    }
    type();
  });
}

function addOutput(html) {
  const terminalContent = document.getElementById('terminal-content');
  const outputDiv = document.createElement('div');
  outputDiv.className = 'output';
  outputDiv.innerHTML = html;
  terminalContent.appendChild(outputDiv);
}

function addCommandOutput(command) {
  const terminalContent = document.getElementById('terminal-content');
  const outputDiv = document.createElement('div');
  outputDiv.className = 'output-command';
  outputDiv.textContent = `guest@tony: ${command}`;
  terminalContent.appendChild(outputDiv);
}

function clearTerminal() {
  const terminalContent = document.getElementById('terminal-content');
  terminalContent.innerHTML = '';
}

function scrollToBottom() {
  const terminal = document.getElementById('terminal');
  terminal.scrollTop = terminal.scrollHeight;
}

function getPrompt() {
  return `guest@tony:${state.currentDirectory}$`;
}

function processCommand(input) {
  const trimmed = input.trim();
  if (!trimmed) return;

  addCommandOutput(trimmed);
  state.commandHistory.push(trimmed);
  state.historyIndex = state.commandHistory.length;

  const { runCommand } = globalThis.terminalEngine;

  const result = runCommand(input, state);

  if (result.clear) {
    clearTerminal();
  } else if (result.output) {
    addOutput(result.output);
  } else if (result.error) {
    addOutput(`<span class="error">${result.error}</span>`);
  }

  if (result.state) {
    state = { ...state, ...result.state };
  }

  scrollToBottom();
  updatePrompt();
}

function handleKeyDown(e) {
  if (e.key === 'Enter') {
    const input = e.target;
    const value = input.value;
    const commandLine = input.closest('.command-line');

    processCommand(value);

    commandLine.remove();
    addInputLine();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (state.historyIndex > 0) {
      state.historyIndex--;
      e.target.value = state.commandHistory[state.historyIndex];
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (state.historyIndex < state.commandHistory.length - 1) {
      state.historyIndex++;
      e.target.value = state.commandHistory[state.historyIndex];
    } else {
      state.historyIndex = state.commandHistory.length;
      e.target.value = '';
    }
  } else if (e.key === 'Tab') {
    e.preventDefault();
    const input = e.target;
    const currentValue = input.value;
    const lastWord = currentValue.split(/\s+/).pop();

    const { getTabCompletions } = globalThis.terminalEngine;
    const matches = getTabCompletions(lastWord);

    if (matches.length === 1) {
      const newValue = currentValue.slice(0, currentValue.length - lastWord.length) + matches[0];
      input.value = newValue;
    } else if (matches.length > 1) {
      addOutput(currentValue + '\n' + matches.join('  '));
    }
  }
}

function updatePrompt() {
  const prompts = document.querySelectorAll('.prompt');
  prompts.forEach(p => p.textContent = getPrompt());
}

async function initialize() {
  const terminalContent = document.getElementById('terminal-content');
  const asciiElement = document.createElement('div');
  asciiElement.className = 'ascii-art';
  terminalContent.appendChild(asciiElement);

  await typeText(asciiElement, ASCII_ART);

  const welcomeElement = document.createElement('div');
  welcomeElement.className = 'welcome-message';
  terminalContent.appendChild(welcomeElement);

  await typeText(welcomeElement, WELCOME_MESSAGE);

  addInputLine();
  document.getElementById('command-input').focus();
}

function addInputLine() {
  const terminalContent = document.getElementById('terminal-content');
  const commandLine = document.createElement('div');
  commandLine.className = 'command-line';
  commandLine.innerHTML = `
    <span class="prompt">${getPrompt()}</span>
    <div class="input-area">
      <input type="text" id="command-input" autocomplete="off" spellcheck="false" autofocus>
    </div>
  `;
  terminalContent.appendChild(commandLine);

  const input = document.getElementById('command-input');
  input.addEventListener('keydown', handleKeyDown);
  input.focus();
}

document.addEventListener('click', () => {
  document.getElementById('command-input')?.focus();
});

document.addEventListener('DOMContentLoaded', initialize);
