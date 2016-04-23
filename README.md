# s.js

- zepto.js + moment.js + lib.js for **68ko**.

lib.js provides 8 functions:

```
# extract query param from the URL
$param(name)

# Fill a template with data
$tpl(str, data)

# HTTP GET
$get(url, onSuccess, onFailure)

# HTTP POST
$post(url, data, onSuccess, onFailure)

# math round
$round(val)

# Put k/v in the local storage
$lsSet(key, value)

# Get k/v in the local storage
$lsGet(key)

# Remove k/v in the local storage
$lsRm(key)
```

