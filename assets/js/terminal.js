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

const COMMANDS = {
  help: {
    description: 'Show all available commands',
    execute: () => {
      return {
        output: `<div class="help-list">
<span class="help-command">help</span><span>Show all available commands</span>
<span class="help-command">about</span><span>Learn about me</span>
<span class="help-command">projects</span><span>View my work</span>
<span class="help-command">blog</span><span>Read my blog posts</span>
<span class="help-command">experience</span><span>See my work history</span>
<span class="help-command">contact</span><span>Get in touch</span>
<span class="help-command">ls</span><span>List directory contents</span>
<span class="help-command">cd</span><span>Change directory</span>
<span class="help-command">pwd</span><span>Print working directory</span>
<span class="help-command">clear</span><span>Clear the terminal</span>
</div>`,
      };
    },
  },
  about: {
    description: 'Learn about me',
    execute: () => {
      return {
        output: `Hi! I'm Tony, a software developer from Fall Creek, WI.

I'm a Principal Software Engineer at Jamf with 20+ years of experience building software that people enjoy using. 
I'm an enthusiastic learner who loves clean code, elegant solutions, and creating great user experiences.

This website is my personal terminal - feel free to explore!`,
      };
    },
  },
  projects: {
    description: 'View my work',
    execute: () => {
      return {
        output: `My Projects
===========

Coming soon! I'm working on adding my project portfolio.

Use 'ls' to look around the virtual filesystem.`,
      };
    },
  },
  blog: {
    description: 'Read my blog posts',
    execute: () => {
      return {
        output: `Blog Posts
===========

No posts yet. Check back soon!

Use 'ls' to look around.`,
      };
    },
  },
  experience: {
    description: 'See my work history',
    execute: () => {
      return {
        output: `Work Experience
===============

Coming soon! My resume is being prepared.

Use 'ls' to look around.`,
      };
    },
  },
  contact: {
    description: 'Get in touch',
    execute: () => {
      return {
        output: `Contact Info
============

Coming soon! Links to my social profiles will be here.

Use 'ls' to look around.`,
      };
    },
  },
  ls: {
    description: 'List directory contents',
    execute: (args) => {
      const currentDir = state.currentDirectory;
      if (currentDir === '~') {
        return { output: 'about.txt  projects/  blog/  experience.txt  contact.txt' };
      }
      return { output: 'No files here.' };
    },
  },
  pwd: {
    description: 'Print working directory',
    execute: () => {
      return { output: state.currentDirectory };
    },
  },
  cd: {
    description: 'Change directory',
    execute: (args) => {
      const target = args[0];
      if (!target || target === '~') {
        state.currentDirectory = '~';
        return { output: '' };
      }
      if (target === 'projects' || target === 'blog') {
        state.currentDirectory = `~/${target}`;
        return { output: '' };
      }
      return { error: `cd: no such directory: ${target}` };
    },
  },
  clear: {
    description: 'Clear the terminal',
    execute: () => {
      return { clear: true };
    },
  },
};

const TAB_COMPLETION = Object.keys(COMMANDS);

const state = {
  currentDirectory: '~',
  commandHistory: [],
  historyIndex: -1,
};

let isInitialized = false;

function typeText(element, text, speed = 20) {
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

function processCommand(input) {
  const trimmed = input.trim();
  if (!trimmed) return;

  addCommandOutput(trimmed);
  state.commandHistory.push(trimmed);
  state.historyIndex = state.commandHistory.length;

  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  if (COMMANDS[command]) {
    const result = COMMANDS[command].execute(args);
    if (result.clear) {
      clearTerminal();
    } else if (result.output) {
      addOutput(result.output);
    } else if (result.error) {
      addOutput(`<span class="error">${result.error}</span>`);
    }
  } else if (command) {
    addOutput(`<span class="error">Command not found: ${command}. Type 'help' for available commands.</span>`);
  }

  scrollToBottom();
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
    
    const matches = TAB_COMPLETION.filter(cmd => cmd.startsWith(lastWord));
    if (matches.length === 1) {
      const newValue = currentValue.slice(0, currentValue.length - lastWord.length) + matches[0];
      input.value = newValue;
    } else if (matches.length > 1) {
      addOutput(currentValue + '\n' + matches.join('  '));
    }
  }
}

async function initialize() {
  if (isInitialized) return;
  isInitialized = true;

  const terminalContent = document.getElementById('terminal-content');
  const asciiElement = document.createElement('div');
  asciiElement.className = 'ascii-art';
  terminalContent.appendChild(asciiElement);

  await typeText(asciiElement, ASCII_ART, 2);

  const welcomeElement = document.createElement('div');
  welcomeElement.className = 'welcome-message';
  terminalContent.appendChild(welcomeElement);

  await typeText(welcomeElement, WELCOME_MESSAGE, 0);

  addInputLine();
  document.getElementById('command-input').focus();
}

function addInputLine() {
  const terminalContent = document.getElementById('terminal-content');
  const commandLine = document.createElement('div');
  commandLine.className = 'command-line';
  commandLine.innerHTML = `
    <span class="prompt">guest@tony:${state.currentDirectory}$</span>
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
