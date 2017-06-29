# s.js

Goodies + [zepto|jquery][moment][semantic].

- goodies (s.xyz.js **3.1ko**)
- goodies + zepto.js (s.xyz.z.js **29ko**)
- goodies + jquery.js (s.xyz.j.js **88ko**)
- goodies + zepto.js  + moment.js (s.xyz.zm.js (**87ko**)
- goodies + jquery.js + moment.js (s.xyz.jm.js **145ko**)
- goodies + zepto.js  + semantic.js (s.xyz.zs.js **298ko**)
- goodies + jquery.js + semantic.js (s.xyz.js.js **357ko**)
- goodies + zepto.js  + semantic.js + moment.js (s.xyz.zsm.js **356ko**)
- goodies + jquery.js + semantic.js + moment.js (s.xyz.jsm.js **414ko**)

## Goodies

```
# Load HTML templates then call a function
$loadTpls(tpls, onSuccess)

# Fill a template with data
$tpl(str, data)

# HTTP GET
$get(url, onSuccess, onFailure, noauth)

# HTTP POST
$post(url, data, onSuccess, onFailure, noauth)

# @ Sync the result of an HTTP GET (/<action> or obj.url or actions[actions].url or obj.url)
# in a html element (class: ui-<action>) using a template (id: tpl_<action>)
$sync(action, obj)

# Call an action, like $sync with more features:
# toggle '.ui-<action>'' html elements
# update the browser history
# show optionally a loading template
$call(action)

# Bind actions on click
$bind(actions)

# Extract query param from the URL
$param(name)

# Round number using numeral
$roundNumeral(val)

# Round number
$round(val)

# Return from now
$fromNow(timestamp)

# Put k/v in the local storage
$lsSet(key, value)

# Get k/v from the local storage
$lsGet(key)

# Remove k/v from the local storage
$lsRm(key)

# Scroll to the bottom of an element in a given duration
$scrollToBottom(element, duration)

# Resize the element height to the window height less a given height
$setElementHeight(elemClass, height)

# Create a WebSocket
$ws(url, onopenF, oncloseF, onmessageF)

```

