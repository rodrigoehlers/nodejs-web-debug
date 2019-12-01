# nodejs-web-debug

Node uses the [V8 Inspector Protocol](https://v8.dev/docs/inspector). It is described in `.json` [here](https://github.com/nodejs/node/blob/98819dfa5853d7c8355d70aa1aa7783677c391e5/deps/v8/src/inspector/js_protocol.json) which is fairly difficult to read. I wasn't able to find other documentation which means this will be trial and error.

# Running

1. Run `yarn start-node`, which will start `stub.js` with node.
2. Run `yarn start` which will run the example UI.
3. Copy the `ws` url from the terminal you ran `yarn start-node` in.
4. Paste the url into the example UI and hit enter.
5. Enter a command in the custom command field.

The text above the url input, represents the WebSocket state. It can be one of the following states.

| Value     | Meaning                                           |
| --------- | ------------------------------------------------- |
| ENTER URL | You haven't entered a url yet.                    |
| OPEN      | The WebSocket was successfully opened.            |
| CLOSED    | The WebSocket was successfully closed.            |
| ERROR     | There was an error with the WebSocket connection. |

# Things to try

1. Run `Debugger.enable`.
2. Run `Debugger.getStackTrace`.

# Sources

1. https://github.com/nodejs/node/issues/24025
2. https://cs.chromium.org/chromium/src/v8/test/debugger/test-api.js?type=cs&q=test-api&l=1
3. https://nodejs.org/api/debugger.html
4. https://github.com/nodejs/node/blob/98819dfa5853d7c8355d70aa1aa7783677c391e5/deps/v8/src/inspector/js_protocol.json
