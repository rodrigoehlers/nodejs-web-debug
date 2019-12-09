# nodejs-web-debug

Node uses the [V8 Inspector Protocol](https://v8.dev/docs/inspector). It is described in `.json` [here](https://github.com/nodejs/node/blob/98819dfa5853d7c8355d70aa1aa7783677c391e5/deps/v8/src/inspector/js_protocol.json) which is fairly difficult to read. I wasn't able to find other documentation which means this will be trial and error.

It can be inspected a bit better with [http://jsonparseronline.com](http://jsonparseronline.com). Copy the content of [RAW V8 Inspector Protocl JSON](https://raw.githubusercontent.com/nodejs/node/98819dfa5853d7c8355d70aa1aa7783677c391e5/deps/v8/src/inspector/js_protocol.json) and paste it to [the page](http://jsonparseronline.com). You will then be able to click through the protocol.

# Running

1. Run `yarn start-node`, which will start `stub.js` with node.
2. Run `yarn start` which will run the example UI.
3. Copy the `ws` url from the terminal you ran `yarn start-node` in.
4. Paste the url into the example UI and hit enter.
5. Enter a full message in the custom message field. This field, pretty prints JSON as soon as it's valid. Press enter to submit, press shift + enter for newline.

The text above the url input, represents the WebSocket state. It can be one of the following states.

| Value     | Meaning                                           |
| --------- | ------------------------------------------------- |
| ENTER URL | You haven't entered a url yet.                    |
| OPEN      | The WebSocket was successfully opened.            |
| CLOSED    | The WebSocket was successfully closed.            |
| ERROR     | There was an error with the WebSocket connection. |

# Things to try

1. Run `npm run start-node2` instead of `npm run start-node`.
2. Send `Debugger.enable`.

```json
{
  "id": 1,
  "method": "Debugger.enable"
}
```

3. Open Chrome Devtools and press on the Node icon on the top left. (What happends after this???)
4. You'll see that the debugger continued to the location we want it to. It is now at the beginning of `stub2.js`. (What happens before this???)
5. The newest message you see should be `Debugger.paused` which is an event, fired because the debugger was paused. There is a lot of information in there.
6. In the Chrome Dev Tools you should see that the debugger is paused on the first line. Try sending another message `Debugger.stepOver`.

```json
{
  "id": 1,
  "method": "Debugger.stepOver"
}
```

7. Try asking for possible breakpoint locations.

```json
{
  "id": 1,
  "method": "Debugger.getPossibleBreakpoints",
  "params": {
    "start": {
      "scriptId": "53",
      "lineNumber": 0,
      "columnNumber": 0
    },
    "end": {
      "scriptId": "53",
      "lineNumber": 3,
      "columnNumber": 0
    }
  }
}
```

8. Evaluate some expressions.

```json
{
  "id": 1,
  "method": "Debugger.evaluateOnCallFrame",
  "params": {
    "callFrameId": "{\"ordinal\":0,\"injectedScriptId\":1}",
    "expression": "1 + 1"
  }
}
```

```json
{
  "id": 1,
  "method": "Debugger.evaluateOnCallFrame",
  "params": {
    "callFrameId": "{\"ordinal\":0,\"injectedScriptId\":1}",
    "expression": "['a', 'b', 'c'].map(e => e.toUpperCase()).join('')"
  }
}
```

# Further thoughts

To implement a debugger that speaks to the V8 Inspector API, it is necessary to create helper methods like `createMessage(message: String, params: Object)` or in Java `String createMessage(String message, Map<String, Object> params)`. This will make it easy to send messages as typing them by hand is not fun.

To implement a debugger the following V8 Inspector API methods should be relevant.

1. `Debugger.enable`
2. `Debugger.disable`
3. `Debugger.stepOver`

# Sources

1. https://github.com/nodejs/node/issues/24025
2. https://cs.chromium.org/chromium/src/v8/test/debugger/test-api.js?type=cs&q=test-api&l=1
3. https://nodejs.org/api/debugger.html
4. https://github.com/nodejs/node/blob/98819dfa5853d7c8355d70aa1aa7783677c391e5/deps/v8/src/inspector/js_protocol.json
