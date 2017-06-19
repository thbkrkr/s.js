(function(){

  //@ Load HTML templates then call a function
  this.$loadTpls = function $loadTpls(tpls, onSuccess) {
    var tplsE = document.createElement('div')

    var done = tpls.length
    tpls.forEach(function(tpl, i) {
      var tplE = document.createElement('div')
      tplE.setAttribute('id', 'tpl-'+i)
      tplsE.appendChild(tplE)
      $(tplE).load(tpl+'?v='+v, function() {
        done--
        if (done == 0) onSuccess()
      })
    })

    document.body.appendChild(tplsE)
  }

  function getTpl(id) {
    elem = document.getElementById(id)
    if (!elem) {
      console.error('Template #' + id + ' not found')
      return 'no template'
    }
    return elem.innerHTML
  }

  var cache = {}
  //@ Fill a template with data
  this.$tpl = function $tpl(str, data) {
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        $tpl(getTpl(str)) :

      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +

        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +

        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');")

    // Provide some basic currying to the user
    return data ? fn( data ) : fn
  }

  // --

  //@ HTTP GET
  this.$get = function $get(url, onSuccess, onFailure, noauth) {
    var headers = {}
    var auth = localStorage.getItem('auth')
    if (auth) {
      headers['X-Auth'] = auth
    }
    $.ajax({
      type: 'GET',
      url: url,
      contentType: "application/json",
      headers: headers,
      success: function(response) {
        if (typeof response === 'object') {
          onSuccess(response)
        } else {
          onSuccess(JSON.parse(response))
        }
      },
      error: function(xhr, errorType, error) {
        // Redirect to home if authentication error
        if (xhr.status === 401 && !noauth) {
          window.location = AUTH_LOGIN_PATH
          localStorage.removeItem('auth')
        }
        if (!onFailure) {
          console.error("error on " + xhr.responseURL + " status="+ xhr.status)
          return
        }
        onFailure(error)
      }
    })
  }

  //@ HTTP POST
  this.$post = function $post(url, data, onSuccess, onFailure, noauth) {
    var headers = {}
    var auth = localStorage.getItem('auth')
    if (auth) {
      headers['X-Auth'] = auth
    }
    $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify(data),
      contentType: "application/json",
      headers: headers,
      success: function(response) {
        if (typeof response === 'object') {
          onSuccess(response)
        } else {
          onSuccess(JSON.parse(response))
        }
      },
      error: function(xhr, errorType, error) {
        // Redirect to home if authentication error
        if (xhr.status === 401 && !noauth) {
          window.location = AUTH_LOGIN_PATH
          localStorage.removeItem('auth')
        }
        if (!onFailure) {
          console.error("error on " + xhr.responseURL + " status="+ xhr.status)
          return
        }
        onFailure(error)
      }
    })
  }

  // --

  // Call actions[actions].url and bind the result in action template
  this.$loadTpl = function $loadTpl(action) {
    obj = actions[action]

    $get(obj.url, function(data) {
      // Maybe transform data
      if (obj.transform) {
        data = eval(obj.transform)(data)
      }

      // Fill the template
      $('.tpl.'+action).html($tpl('tpl_'+action, data))

      // Maybe do something
      if (obj.onSuccess) {
        eval(obj.onSuccess)()
      }
    })
  }

  //@ Call actions[<action>].url then bind the data result in a template 'tpl_<action>' and
  // place the HTML result in an element with class equals to '.action-<action>'
  this.$call = function $call(action) {
    if (action == null) {
      for (first in actions) break
      action = first
    }

    obj = actions[action]

    // Unactive/active elements and reset template
    for ( var a in actions ) {
      if (a == action) {
        $('.action-'+a).addClass('active')
      } else {
        $('.tpl.'+a).html('')
        $('.action-'+a).removeClass('active')
      }
    }

    args = ""
    r = $param('r')
    if (r != null) args = "&r=" + r
    window.history.pushState(action, action, "?p=" + action + args)

    if (obj.loading) {
      $('.tpl.'+action).html($tpl('tpl_loading'))
    }

    $loadTpl(action)
  }

  //@ Bind actions on click
  this.$bind = function $bind(actions) {
    for ( var k in actions ) {
      $('.action-'+k).on('click', function() {
        action = $(this).attr('class').replace(/.*action-/, '').replace(' active', '')
        $call(action)
      })
    }
    // Refresh
    r = $param('r')
    if (r != null) {
      if (r != null) {
        setInterval(function() {
          $call($param('p'))
        }, 1000*r)
      }
    }
  }

  this.$initActions = function $initActions() {
    if (actions) {
      $bind(actions)
      $call($param('p'))
    }
  }


  // --

  //@ Extract query param from the URL
  this.$param = function $param(name) {
      var url = window.location.href
      name = name.replace(/[\[\]]/g, "\\$&")
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url)
      if (!results) return null
      if (!results[2]) return ''
      return decodeURIComponent(results[2].replace(/\+/g, " "))
  }

  //@ Round number using numeral
  this.$roundNumeral = function $roundNumeral(val) {
    if (isNaN(val)) return val
    return numeral(val).format('0 0.00 a')
  }

  //@ Round number
  this.$round = function $round(val) {
    if (isNaN(val)) return val
    return Number((val).toFixed(2))
  }

  //@ Return from now
  this.$fromNow = function $fromNow(timestamp) {
    var hours = 0
    return moment.unix(timestamp).add(hours, 'hours').fromNow()
  }

  // --

  //@ Put k/v in the local storage
  this.$lsSet = function $lsSet(key, value) {
    if (Array.isArray(value) || typeof value === 'object') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  //@ Get k/v from the local storage
  this.$lsGet = function $lsGet(key) {
    value = localStorage.getItem(key)
    if (value && value[0] === '{') {
      value = JSON.parse(value)
    }
    return value
  }

  //@ Remove k/v from the local storage
  this.$lsRm = function $lsRm(key) {
    localStorage.removeItem(key)
  }

  // --

  //@ Scroll to the bottom of an element in a given duration
  this.$scrollToBottom = function $scrollToBottom(element, duration) {
    var el  = element[0]
    var startPosition = el.scrollTop
    var delta = el.scrollHeight - element.height() - startPosition

    var startTime = Date.now()

    function scroll() {
      var fraction = Math.min(1, (Date.now() - startTime) / duration)
      el.scrollTop = delta * fraction + startPosition
      if(fraction < 1) {
        setTimeout(scroll, 10)
      }
    }
    scroll()
  }

  //@ Resize the element height to the window height less a given height
  this.$setElementHeight = function $setElementHeight(elemClass, height) {
    $(elemClass).height($(window).height() - height)
  }

  var _wsCtx = {
    attempts: 0
  }

  //@ Create a WebSocket
  this.$ws = function (path, onopenF, oncloseF, onmessageF) {
    if (path.indexOf('s://') != -1) {
      url = path
    } else {
      wsProto = 'ws:'
      if (window.location.protocol == 'https:') {
        wsProto = 'wss:'
      }
      url = wsProto + '//' + window.location.host + path
    }

    ws = new WebSocket(url)

    ws.onopen = function() {
      _wsCtx.attempts = 1
      onopenF(path, onopenF)
    }

    ws.onmessage = function(event) {
      onmessageF(event)
    }

    function _generateInterval(k) {
      return Math.min(15, (Math.pow(2, k) - 1)) * 1000
    }

    ws.onclose = function(event) {
      var time = _generateInterval(_wsCtx.attempts)
      oncloseF(time)
      setTimeout(function () {
          _wsCtx.attempts++
          ws = $ws(path, onopenF, oncloseF, onmessageF)
      }, time)
    }

    return ws
  }


})()

