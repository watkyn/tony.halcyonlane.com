import { runCommand, createState, getTabCompletions } from './engine/index.js';

globalThis.terminalEngine = {
  runCommand,
  createState,
  getTabCompletions,
};

import './ui/terminal.js';
