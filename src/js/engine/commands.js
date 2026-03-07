export const commands = {
  help: {
    description: 'Show all available commands',
    execute: (args, state) => {
      const commandList = Object.entries(commands)
        .map(([name, cmd]) => `<span class="help-command">${name}</span><span>${cmd.description}</span>`)
        .join('');
      return { output: `<div class="help-list">${commandList}</div>` };
    },
  },
  about: {
    description: 'Learn about me',
    execute: () => ({
      output: `Hi! I'm Tony, a software developer from Fall Creek, WI.

I'm a Principal Software Engineer at Jamf with 20+ years of experience building software that people enjoy using. 
I'm an enthusiastic learner who loves clean code, elegant solutions, and creating great user experiences.

This website is my personal terminal - feel free to explore!`,
    }),
  },
  blog: {
    description: 'Read my blog posts',
    execute: () => ({
      output: `Blog Posts
==========

No posts yet. Check back soon!

Use 'ls' to look around.`,
    }),
  },
  experience: {
    description: 'See my work history',
    execute: () => ({
      output: `Work Experience
===============

Coming soon! My resume is being prepared.

Use 'ls' to look around.`,
    }),
  },
  contact: {
    description: 'Get in touch',
    execute: () => ({
      output: `Contact Info
============

Coming soon! Links to my social profiles will be here.

Use 'ls' to look around.`,
    }),
  },
  ls: {
    description: 'List directory contents',
    execute: (args, state) => {
      if (state.currentDirectory === '~') {
        return { output: 'about.txt  blog/  experience.txt  contact.txt' };
      }
      return { output: 'No files here.' };
    },
  },
  pwd: {
    description: 'Print working directory',
    execute: (args, state) => ({ output: state.currentDirectory }),
  },
  cd: {
    description: 'Change directory',
    execute: (args, state) => {
      const target = args[0];
      if (!target || target === '~') {
        return { output: '', state: { currentDirectory: '~' } };
      }
      if (target === 'blog') {
        return { output: '', state: { currentDirectory: `~/${target}` } };
      }
      return { error: `cd: no such directory: ${target}` };
    },
  },
  clear: {
    description: 'Clear the terminal',
    execute: () => ({ clear: true }),
  },
};

export const TAB_COMPLETION = Object.keys(commands);
