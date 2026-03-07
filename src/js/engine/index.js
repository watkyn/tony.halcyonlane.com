import { parseInput } from './parser.js';
import { createState } from './state.js';
import { commands, TAB_COMPLETION } from './commands.js';

export function runCommand(input, state) {
  const { command, args } = parseInput(input);

  if (!command) {
    return { output: '' };
  }

  if (commands[command]) {
    const result = commands[command].execute(args, state);
    if (result.state) {
      return { ...result, state: { ...state, ...result.state } };
    }
    return result;
  }

  return {
    error: `Command not found: ${command}. Type 'help' for available commands.`,
  };
}

export function getTabCompletions(partial) {
  const lastWord = partial.split(/\s+/).pop();
  return TAB_COMPLETION.filter(cmd => cmd.startsWith(lastWord));
}

export { createState, commands };
