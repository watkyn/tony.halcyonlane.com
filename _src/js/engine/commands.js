import blogPosts from '../../../_posts.json';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, ' ')} ${date.getFullYear()}`;
};

const stripFrontmatter = (content) => {
  if (content.startsWith('---')) {
    const endIdx = content.indexOf('---', 3);
    if (endIdx !== -1) {
      return content.slice(endIdx + 3).trim();
    }
  }
  return content;
};

export const commands = {
  help: {
    description: 'Show all available commands',
    execute: (args, state) => {
      const hiddenFromHelp = ['cat', 'pwd', 'cd', 'clear', 'help'];
      const commandList = Object.entries(commands)
        .filter(([name]) => !hiddenFromHelp.includes(name))
        .map(([name, cmd]) => `<span class="help-command">${name}</span><span>${cmd.description}</span>`)
        .join('');
      return { output: `<div class="help-list">${commandList}</div>` };
    },
  },
  about: {
    description: 'Learn about me',
    execute: () => ({
      output: `Hi! I'm Tony, a software developer from Fall Creek, WI.

Right now I'm a Principal Software Engineer at Jamf and work in the macOS management space.
With 20+ years of experience building software, I've seen a bit over the years.
I'm an enthusiastic learner who loves clean code, elegant solutions, and creating great user experiences.

I also love TUI's and hope you like this one!
`,
    }),
  },
  blog: {
    description: 'Read some very outdated blog posts',
    execute: () => ({
      output: `Blog Posts
==========

cd into blog and then use 'ls -l' to look around.`,
    }),
  },
  experience: {
    description: 'See my work history',
    execute: () => ({
      output: `Work Experience
===============

Jamf (10 yrs 10 mos)
Principal Software Engineer
Mar 2022 - Present
Staff Software Engineer
Aug 2020 - Present
Senior Software Engineer
Jun 2015 - Present
- Lead developer for Jamf Pro's management framework on macOS

Freelance Software Developer (1 yr 8 mos)
Nov 2013 - Jun 2015
- Worked for Jamf
- Worked for Homespotter, and iOS real estate agent app

Jamf (2 yrs 5 mos)
Software Architect
Oct 2012 - Oct 2013
Software Developer
Jun 2011 - Oct 2012
- Lead developer for Jamf Pro's management framework on macOS

IDEXX Laboratories (6 yrs 2 mos)
Senior Application Developer
May 2005 - Jun 2011
- Developer for IDEXX-PACS digital imaging software
- iPhone / iPad research and development
- Lead developer on R&D effort of next generation veterinary practice management software

Countertops Inc (3 yrs 3 mos)
Programmer
Mar 2002 - May 2005
- Technical lead for Java development (Tomcat, Eclipse, JUnit, Spring, Struts, Tapestry)
`,
    }),
  },
  contact: {
    description: 'Get in touch',
    execute: () => ({
      output: `Contact Info
=============

<a href="https://www.linkedin.com/in/tonyike/">LinkedIn</a>
<a href="https://github.com/watkyn">Github</a>
<a href="https://x.com/watkyn">X</a>

`,
    }),
  },
  ls: {
    description: 'List directory contents',
    execute: (args, state) => {
      if (state.currentDirectory === '~') {
        return { output: 'about.txt  blog/  experience.txt  contact.txt' };
      }
      if (state.currentDirectory === '~/blog') {
        const longFormat = args.includes('-l');
        const posts = blogPosts.map(p => p.slug);
        
        if (longFormat) {
          const lines = blogPosts.map(p => {
            const date = formatDate(p.date);
            return `-r--r--r--   guest  staff   ${date} ${p.title}`;
          });
          return { output: lines.join('\n') };
        }
        
        return { output: posts.join('  ') };
      }
      return { output: 'No files here.' };
    },
  },
  cat: {
    description: 'Print file contents',
    execute: (args, state) => {
      const target = args[0];
      if (!target) {
        return { error: 'cat: missing file operand' };
      }
      if (target.endsWith('/')) {
        return { error: `cat: ${target}: Is a directory` };
      }

      if (state.currentDirectory === '~/blog') {
        const post = blogPosts.find(p => p.slug === target);
        if (post) {
          return { output: stripFrontmatter(post.content) };
        }
        return { error: `cat: ${target}: No such post` };
      }

      const files = {
        'about.txt': commands.about.execute(),
        'experience.txt': commands.experience.execute(),
        'contact.txt': commands.contact.execute(),
      };
      if (!(target in files)) {
        return { error: `cat: ${target}: No such file` };
      }
      return files[target];
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
