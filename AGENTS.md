# Tony's Terminal

## Structure

This is a jekyll static site with the following additional javascript stuff.

```
src/js/            # Source code
├── engine/        # Pure CLI logic (100% test coverage required)
│   ├── index.js   # runCommand(cmd, args, state) → {output|error|clear}
│   ├── commands.js # Command handlers
│   ├── parser.js  # Input parsing
│   └── state.js   # State management
├── ui/            # DOM code (not tested)
│   └── terminal.js
└── index.js       # Entry point

assets/js/         # Built output (do not edit)
└── bundle.js

test/
└── engine.test.js # Vitest tests
```

## Adding a Command

In `engine/commands.js`:

```javascript
export const commands = {
  greeting: {
    description: 'Say hello',
    execute: (args, state) => ({
      output: `Hello, ${args[0] || 'friend'}!`
    }),
  },
};
```

## Commands return

- `{ output: 'text' }` - show to user
- `{ error: 'text' }` - show error
- `{ clear: true }` - clear terminal
- `{ output: '...', state: {...} }` - output + state change

## Run Tests

Always run all tests after each change is made.

```
npm test
```

## Build

```
npm run build   # minify JS
jekyll build   # build site
```
