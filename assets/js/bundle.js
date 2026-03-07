(function(){"use strict";function d(t){const e=t.trim();if(!e)return{command:"",args:[]};const n=e.split(/\s+/);return{command:n[0].toLowerCase(),args:n.slice(1)}}function _(){return{currentDirectory:"~",commandHistory:[],historyIndex:-1}}const s={help:{description:"Show all available commands",execute:(t,e)=>{const n=["cat","pwd","cd","clear","help"];return{output:`<div class="help-list">${Object.entries(s).filter(([i])=>!n.includes(i)).map(([i,c])=>`<span class="help-command">${i}</span><span>${c.description}</span>`).join("")}</div>`}}},about:{description:"Learn about me",execute:()=>({output:`Hi! I'm Tony, a software developer from Fall Creek, WI.

I'm a Principal Software Engineer at Jamf with 20+ years of experience building software that people enjoy using. 
I'm an enthusiastic learner who loves clean code, elegant solutions, and creating great user experiences.

This website is my personal terminal - feel free to explore!`})},blog:{description:"Read my blog posts",execute:()=>({output:`Blog Posts
==========

No posts yet. Check back soon!

Use 'ls' to look around.`})},experience:{description:"See my work history",execute:()=>({output:`Work Experience
===============

Coming soon! My resume is being prepared.

Use 'ls' to look around.`})},contact:{description:"Get in touch",execute:()=>({output:`Contact Info
=============

Coming soon! Links to my social profiles will be here.

Use 'ls' to look around.`})},ls:{description:"List directory contents",execute:(t,e)=>e.currentDirectory==="~"?{output:"about.txt  blog/  experience.txt  contact.txt"}:{output:"No files here."}},cat:{description:"Print file contents",execute:t=>{const e=t[0];if(!e)return{error:"cat: missing file operand"};if(e.endsWith("/"))return{error:`cat: ${e}: Is a directory`};const n={"about.txt":s.about.execute(),"experience.txt":s.experience.execute(),"contact.txt":s.contact.execute()};return e in n?n[e]:{error:`cat: ${e}: No such file`}}},pwd:{description:"Print working directory",execute:(t,e)=>({output:e.currentDirectory})},cd:{description:"Change directory",execute:(t,e)=>{const n=t[0];return!n||n==="~"?{output:"",state:{currentDirectory:"~"}}:n==="blog"?{output:"",state:{currentDirectory:`~/${n}`}}:{error:`cd: no such directory: ${n}`}}},clear:{description:"Clear the terminal",execute:()=>({clear:!0})}},p=Object.keys(s);function f(t,e){const{command:n,args:r}=d(t);if(!n)return{output:""};if(s[n]){const i=s[n].execute(r,e);return i.state?{...i,state:{...e,...i.state}}:i}return{error:`Command not found: ${n}. Type 'help' for available commands.`}}function y(t){const e=t.split(/\s+/).pop();return e?p.filter(n=>n.startsWith(e)):[]}const g=`
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
`,h="Type 'help' to get started.";let o={currentDirectory:"~",commandHistory:[],historyIndex:-1};function u(t,e,n=0){return new Promise(r=>{let i=0;t.textContent="";function c(){i<e.length?(t.textContent+=e.charAt(i),i++,setTimeout(c,n)):r()}c()})}function a(t){const e=document.getElementById("terminal-content"),n=document.createElement("div");n.className="output",n.innerHTML=t,e.appendChild(n)}function x(t){const e=document.getElementById("terminal-content"),n=document.createElement("div");n.className="output-command",n.textContent=`guest@tony: ${t}`,e.appendChild(n)}function C(){const t=document.getElementById("terminal-content");t.innerHTML=""}function E(){const t=document.getElementById("terminal");t.scrollTop=t.scrollHeight}function l(){return`guest@tony:${o.currentDirectory}$`}function I(t){const e=t.trim();if(!e)return;x(e),o.commandHistory.push(e),o.historyIndex=o.commandHistory.length;const{runCommand:n}=globalThis.terminalEngine,r=n(t,o);r.clear?C():r.output?a(r.output):r.error&&a(`<span class="error">${r.error}</span>`),r.state&&(o={...o,...r.state}),E(),b()}function v(t){if(t.key==="Enter"){const e=t.target,n=e.value,r=e.closest(".command-line");I(n),r.remove(),m()}else if(t.key==="ArrowUp")t.preventDefault(),o.historyIndex>0&&(o.historyIndex--,t.target.value=o.commandHistory[o.historyIndex]);else if(t.key==="ArrowDown")t.preventDefault(),o.historyIndex<o.commandHistory.length-1?(o.historyIndex++,t.target.value=o.commandHistory[o.historyIndex]):(o.historyIndex=o.commandHistory.length,t.target.value="");else if(t.key==="Tab"){t.preventDefault();const e=t.target,n=e.value,r=n.split(/\s+/).pop(),{getTabCompletions:i}=globalThis.terminalEngine,c=i(r);if(c.length===1){const T=n.slice(0,n.length-r.length)+c[0];e.value=T}else c.length>1&&a(n+`
`+c.join("  "))}}function b(){document.querySelectorAll(".prompt").forEach(e=>e.textContent=l())}async function w(){const t=document.getElementById("terminal-content"),e=document.createElement("div");e.className="ascii-art",t.appendChild(e),await u(e,g);const n=document.createElement("div");n.className="welcome-message",t.appendChild(n),await u(n,h),m(),document.getElementById("command-input").focus()}function m(){const t=document.getElementById("terminal-content"),e=document.createElement("div");e.className="command-line",e.innerHTML=`
    <span class="prompt">${l()}</span>
    <div class="input-area">
      <input type="text" id="command-input" autocomplete="off" spellcheck="false" autofocus>
    </div>
  `,t.appendChild(e);const n=document.getElementById("command-input");n.addEventListener("keydown",v),n.focus()}document.addEventListener("click",()=>{var t;(t=document.getElementById("command-input"))==null||t.focus()}),document.addEventListener("DOMContentLoaded",w),globalThis.terminalEngine={runCommand:f,createState:_,getTabCompletions:y}})();
