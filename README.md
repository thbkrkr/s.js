# s.js

- zepto.js + moment.js + utilities functions (size **73ko**).
- jquery.js + semantic.js + utilities functions (size **73ko**).

```
# Load HTML templates then call a function
$loadTpls(tpls, onSuccess)

# Fill a template with data
$tpl(str, data)

# HTTP GET
$get(url, onSuccess, onFailure, noauth)

# HTTP POST
$post(url, data, onSuccess, onFailure, noauth)

# Call actions[<action>].url then bind the data result in a template 'tpl_<action>' and place the HTML result in an element with class equals to '.action-<action>'
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
```

