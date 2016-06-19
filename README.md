# s.js

- zepto.js + moment.js + utilities functions (size **73ko**).

```
# Extract query param from the URL
$param(name)

# Fill a template with data
$tpl(str, data)

# HTTP GET
$get(url, onSuccess, onFailure)

# HTTP POST
$post(url, data, onSuccess, onFailure)

# Call actions[actions].url and bind the result in action template
$call(action)

# Bind actions on click
$bind(actions)

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

