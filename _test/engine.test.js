import { describe, it, expect, beforeEach } from 'vitest';
import { runCommand, createState, getTabCompletions, commands } from '../_src/js/engine/index.js';
import { parseInput } from '../_src/js/engine/parser.js';

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
      expect(result.output).toContain('>about<');
      expect(result.output).toContain('Learn about me');
    });

    it('contains visible commands', () => {
      const result = runCommand('help', state);
      expect(result.output).toContain('>about<');
      expect(result.output).toContain('>blog<');
      expect(result.output).toContain('>experience<');
      expect(result.output).toContain('>contact<');
    });

    it('excludes hidden commands', () => {
      const result = runCommand('help', state);
      expect(result.output).not.toContain('cd');
      expect(result.output).not.toContain('pwd');
      expect(result.output).not.toContain('clear');
      expect(result.output).not.toContain('cat');
      expect(result.output).not.toContain('>help<');
    });

    it('contains command descriptions', () => {
      const result = runCommand('help', state);
      expect(result.output).toContain('>about<');
      expect(result.output).toContain('Learn about me');
      expect(result.output).toContain('>blog<');
      expect(result.output).toContain('blog posts');
      expect(result.output).toContain('>experience<');
      expect(result.output).toContain('See my work history');
      expect(result.output).toContain('>contact<');
      expect(result.output).toContain('Get in touch');
    });

    it('returns html structure', () => {
      const result = runCommand('help', state);
      expect(result.output).toContain('<div class="help-list">');
      expect(result.output).toContain('<span class="help-command">');
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

    it('lists blog directory', () => {
      state.currentDirectory = '~/blog';
      const result = runCommand('ls', state);
      expect(result.output).toContain('the-developer-mind-and-qa');
      expect(result.output).toContain('svn-eclipse-mountain-lion-and-homebrew');
    });

    it('lists blog directory with -l flag', () => {
      state.currentDirectory = '~/blog';
      const result = runCommand('ls -l', state);
      expect(result.output).toContain('Feb');
      expect(result.output).toContain('2013');
      expect(result.output).toContain('The Developer Mind and QA');
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

  describe('cat command', () => {
    it('reads about.txt', () => {
      const result = runCommand('cat about.txt', state);
      expect(result.output).toContain("I'm Tony");
      expect(result.output).toContain('Principal Software Engineer');
    });

    it('reads experience.txt', () => {
      const result = runCommand('cat experience.txt', state);
      expect(result.output).toContain('Work Experience');
    });

    it('reads contact.txt', () => {
      const result = runCommand('cat contact.txt', state);
      expect(result.output).toContain('Contact Info');
    });

    it('returns error for directory', () => {
      const result = runCommand('cat blog/', state);
      expect(result.error).toContain('Is a directory');
    });

    it('returns error for missing file', () => {
      const result = runCommand('cat missing.txt', state);
      expect(result.error).toContain('No such file');
    });

    it('returns error for missing operand', () => {
      const result = runCommand('cat', state);
      expect(result.error).toContain('missing file operand');
    });

    it('reads blog post by slug', () => {
      state.currentDirectory = '~/blog';
      const result = runCommand('cat the-developer-mind-and-qa', state);
      expect(result.output).toContain('Why is it that a software developer');
      expect(result.output).not.toContain('layout: post');
    });

    it('returns error for missing blog post', () => {
      state.currentDirectory = '~/blog';
      const result = runCommand('cat nonexistent-post', state);
      expect(result.error).toContain('No such post');
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

  it('returns empty when no input provided', () => {
    const completions = getTabCompletions('');
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
