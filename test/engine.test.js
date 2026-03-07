import { describe, it, expect, beforeEach } from 'vitest';
import { runCommand, createState, getTabCompletions, commands } from '../src/js/engine/index.js';
import { parseInput } from '../src/js/engine/parser.js';

describe('parser', () => {
  it('parses empty input', () => {
    expect(parseInput('')).toEqual({ command: '', args: [] });
    expect(parseInput('   ')).toEqual({ command: '', args: [] });
  });

  it('parses command with no args', () => {
    expect(parseInput('help')).toEqual({ command: 'help', args: [] });
  });

  it('parses command with args', () => {
    expect(parseInput('cd projects')).toEqual({ command: 'cd', args: ['projects'] });
  });

  it('parses command with multiple args', () => {
    expect(parseInput('echo hello world')).toEqual({ command: 'echo', args: ['hello', 'world'] });
  });

  it('trims whitespace', () => {
    expect(parseInput('  help  ')).toEqual({ command: 'help', args: [] });
  });

  it('converts command to lowercase', () => {
    expect(parseInput('HELP')).toEqual({ command: 'help', args: [] });
    expect(parseInput('Help')).toEqual({ command: 'help', args: [] });
  });
});

describe('createState', () => {
  it('creates default state', () => {
    const state = createState();
    expect(state).toEqual({
      currentDirectory: '~',
      commandHistory: [],
      historyIndex: -1,
    });
  });
});

describe('runCommand', () => {
  let state;

  beforeEach(() => {
    state = createState();
  });

  describe('help command', () => {
    it('returns help output', () => {
      const result = runCommand('help', state);
      expect(result.output).toContain('help');
      expect(result.output).toContain('Show all available commands');
    });
  });

  describe('about command', () => {
    it('returns about output', () => {
      const result = runCommand('about', state);
      expect(result.output).toContain("I'm Tony");
      expect(result.output).toContain('Principal Software Engineer');
    });
  });

  describe('blog command', () => {
    it('returns blog output', () => {
      const result = runCommand('blog', state);
      expect(result.output).toContain('Blog Posts');
    });
  });

  describe('experience command', () => {
    it('returns experience output', () => {
      const result = runCommand('experience', state);
      expect(result.output).toContain('Work Experience');
    });
  });

  describe('contact command', () => {
    it('returns contact output', () => {
      const result = runCommand('contact', state);
      expect(result.output).toContain('Contact Info');
    });
  });

  describe('ls command', () => {
    it('lists root directory', () => {
      const result = runCommand('ls', state);
      expect(result.output).toContain('about.txt');
    });
  });

  describe('pwd command', () => {
    it('returns current directory', () => {
      const result = runCommand('pwd', state);
      expect(result.output).toBe('~');
    });

    it('returns current directory when changed', () => {
      state.currentDirectory = '~/blog';
      const result = runCommand('pwd', state);
      expect(result.output).toBe('~/blog');
    });
  });

  describe('cd command', () => {
    it('changes to root', () => {
      state.currentDirectory = '~/blog';
      const result = runCommand('cd', state);
      expect(result.state.currentDirectory).toBe('~');
    });

    it('changes to root with tilde', () => {
      state.currentDirectory = '~/blog';
      const result = runCommand('cd ~', state);
      expect(result.state.currentDirectory).toBe('~');
    });

    it('changes to blog directory', () => {
      const result = runCommand('cd blog', state);
      expect(result.state.currentDirectory).toBe('~/blog');
    });

    it('returns error for invalid directory', () => {
      const result = runCommand('cd invalid', state);
      expect(result.error).toContain('no such directory');
    });
  });

  describe('clear command', () => {
    it('returns clear flag', () => {
      const result = runCommand('clear', state);
      expect(result.clear).toBe(true);
    });
  });

  describe('unknown command', () => {
    it('returns error for unknown command', () => {
      const result = runCommand('unknowncmd', state);
      expect(result.error).toContain('Command not found');
      expect(result.error).toContain('help');
    });
  });

  describe('empty input', () => {
    it('returns empty output', () => {
      const result = runCommand('', state);
      expect(result.output).toBe('');
    });

    it('returns empty output for whitespace', () => {
      const result = runCommand('   ', state);
      expect(result.output).toBe('');
    });
  });
});

describe('getTabCompletions', () => {
  it('returns matching commands', () => {
    const completions = getTabCompletions('he');
    expect(completions).toContain('help');
  });

  it('returns all matches for partial', () => {
    const completions = getTabCompletions('c');
    expect(completions).toContain('cd');
    expect(completions).toContain('clear');
    expect(completions).toContain('contact');
  });

  it('returns empty for no match', () => {
    const completions = getTabCompletions('xyz');
    expect(completions).toHaveLength(0);
  });
});

describe('commands object', () => {
  it('has all required commands', () => {
    expect(commands.help).toBeDefined();
    expect(commands.about).toBeDefined();
    expect(commands.blog).toBeDefined();
    expect(commands.experience).toBeDefined();
    expect(commands.contact).toBeDefined();
    expect(commands.ls).toBeDefined();
    expect(commands.pwd).toBeDefined();
    expect(commands.cd).toBeDefined();
    expect(commands.clear).toBeDefined();
  });

  it('all commands have description', () => {
    Object.entries(commands).forEach(([name, cmd]) => {
      expect(cmd.description).toBeDefined();
    });
  });

  it('all commands have execute function', () => {
    Object.entries(commands).forEach(([name, cmd]) => {
      expect(typeof cmd.execute).toBe('function');
    });
  });
});
