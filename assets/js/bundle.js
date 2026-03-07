(function(){"use strict";function d(t){const n=t.trim();if(!n)return{command:"",args:[]};const e=n.split(/\s+/);return{command:e[0].toLowerCase(),args:e.slice(1)}}function _(){return{currentDirectory:"~",commandHistory:[],historyIndex:-1}}const c={help:{description:"Show all available commands",execute:(t,n)=>({output:`<div class="help-list">${Object.entries(c).map(([r,i])=>`<span class="help-command">${r}</span><span>${i.description}</span>`).join("")}</div>`})},about:{description:"Learn about me",execute:()=>({output:`Hi! I'm Tony, a software developer from Fall Creek, WI.

I'm a Principal Software Engineer at Jamf with 20+ years of experience building software that people enjoy using. 
I'm an enthusiastic learner who loves clean code, elegant solutions, and creating great user experiences.

This website is my personal terminal - feel free to explore!`})},projects:{description:"View my work",execute:()=>({output:`My Projects
==========

Coming soon! I'm working on adding my project portfolio.

Use 'ls' to look around the virtual filesystem.`})},blog:{description:"Read my blog posts",execute:()=>({output:`Blog Posts
==========

No posts yet. Check back soon!

Use 'ls' to look around.`})},experience:{description:"See my work history",execute:()=>({output:`Work Experience
===============

Coming soon! My resume is being prepared.

Use 'ls' to look around.`})},contact:{description:"Get in touch",execute:()=>({output:`Contact Info
============

Coming soon! Links to my social profiles will be here.

Use 'ls' to look around.`})},ls:{description:"List directory contents",execute:(t,n)=>n.currentDirectory==="~"?{output:"about.txt  projects/  blog/  experience.txt  contact.txt"}:{output:"No files here."}},pwd:{description:"Print working directory",execute:(t,n)=>({output:n.currentDirectory})},cd:{description:"Change directory",execute:(t,n)=>{const e=t[0];return!e||e==="~"?{output:"",state:{currentDirectory:"~"}}:e==="projects"||e==="blog"?{output:"",state:{currentDirectory:`~/${e}`}}:{error:`cd: no such directory: ${e}`}}},clear:{description:"Clear the terminal",execute:()=>({clear:!0})}},p=Object.keys(c);function y(t,n){const{command:e,args:r}=d(t);if(!e)return{output:""};if(c[e]){const i=c[e].execute(r,n);return i.state?{...i,state:{...n,...i.state}}:i}return{error:`Command not found: ${e}. Type 'help' for available commands.`}}function f(t){const n=t.split(/\s+/).pop();return p.filter(e=>e.startsWith(n))}const g=`
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
`,h="Type 'help' to get started.";let o={currentDirectory:"~",commandHistory:[],historyIndex:-1};function u(t,n,e=20){return new Promise(r=>{let i=0;t.textContent="";function s(){i<n.length?(t.textContent+=n.charAt(i),i++,setTimeout(s,e)):r()}s()})}function a(t){const n=document.getElementById("terminal-content"),e=document.createElement("div");e.className="output",e.innerHTML=t,n.appendChild(e)}function x(t){const n=document.getElementById("terminal-content"),e=document.createElement("div");e.className="output-command",e.textContent=`guest@tony: ${t}`,n.appendChild(e)}function C(){const t=document.getElementById("terminal-content");t.innerHTML=""}function E(){const t=document.getElementById("terminal");t.scrollTop=t.scrollHeight}function l(){return`guest@tony:${o.currentDirectory}$`}function v(t){const n=t.trim();if(!n)return;x(n),o.commandHistory.push(n),o.historyIndex=o.commandHistory.length;const{runCommand:e}=window.terminalEngine,r=e(t,o);r.clear?C():r.output?a(r.output):r.error&&a(`<span class="error">${r.error}</span>`),r.state&&(o={...o,...r.state}),E(),I()}function w(t){if(t.key==="Enter"){const n=t.target,e=n.value,r=n.closest(".command-line");v(e),r.remove(),m()}else if(t.key==="ArrowUp")t.preventDefault(),o.historyIndex>0&&(o.historyIndex--,t.target.value=o.commandHistory[o.historyIndex]);else if(t.key==="ArrowDown")t.preventDefault(),o.historyIndex<o.commandHistory.length-1?(o.historyIndex++,t.target.value=o.commandHistory[o.historyIndex]):(o.historyIndex=o.commandHistory.length,t.target.value="");else if(t.key==="Tab"){t.preventDefault();const n=t.target,e=n.value,r=e.split(/\s+/).pop(),{getTabCompletions:i}=window.terminalEngine,s=i(r);if(s.length===1){const b=e.slice(0,e.length-r.length)+s[0];n.value=b}else s.length>1&&a(e+`
`+s.join("  "))}}function I(){document.querySelectorAll(".prompt").forEach(n=>n.textContent=l())}async function k(){const t=document.getElementById("terminal-content"),n=document.createElement("div");n.className="ascii-art",t.appendChild(n),await u(n,g,2);const e=document.createElement("div");e.className="welcome-message",t.appendChild(e),await u(e,h,0),m(),document.getElementById("command-input").focus()}function m(){const t=document.getElementById("terminal-content"),n=document.createElement("div");n.className="command-line",n.innerHTML=`
    <span class="prompt">${l()}</span>
    <div class="input-area">
      <input type="text" id="command-input" autocomplete="off" spellcheck="false" autofocus>
    </div>
  `,t.appendChild(n);const e=document.getElementById("command-input");e.addEventListener("keydown",w),e.focus()}document.addEventListener("click",()=>{var t;(t=document.getElementById("command-input"))==null||t.focus()}),document.addEventListener("DOMContentLoaded",k),globalThis.terminalEngine={runCommand:y,createState:_,getTabCompletions:f}})();
