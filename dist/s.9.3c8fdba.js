(function(){this.$loadTpls=function(f,a){var b=document.createElement("div"),d=f.length;f.forEach(function(c,g){var e=document.createElement("div");e.setAttribute("id","tpl-"+g);b.appendChild(e);$(e).load(c+"?v="+v,function(){d--;0==d&&a()})});document.body.appendChild(b)};var h={};this.$tpl=function a(b,d){var c;/\W/.test(b)?c=new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+b.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,
"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):((c=h[b])||((elem=document.getElementById(b))?c=elem.innerHTML:(console.error("Template #"+b+" not found"),c="no template"),c=a(c)),c=h[b]=c);return d?c(d):c};this.$get=function(a,b,d,c){var g={},e=localStorage.getItem("auth");e&&(g["X-Auth"]=e);$.ajax({type:"GET",url:a,contentType:"application/json",headers:g,success:function(a){"object"===typeof a?b(a):b(JSON.parse(a))},
error:function(a,b,e){401!==a.status||c||(window.location="/",localStorage.removeItem("auth"));d?d(e):console.error("error on "+a.responseURL+" status="+a.status)}})};this.$post=function(a,b,d,c,g){var e={},f=localStorage.getItem("auth");f&&(e["X-Auth"]=f);$.ajax({type:"POST",url:a,data:JSON.stringify(b),contentType:"application/json",headers:e,success:function(a){"object"===typeof a?d(a):d(JSON.parse(a))},error:function(a,b,d){401!==a.status||g||(window.location="/",localStorage.removeItem("auth"));
c?c(d):console.error("error on "+a.responseURL+" status="+a.status)}})};this.$loadTpl=function(a){obj=actions[a];$get(obj.url,function(b){obj.transform&&(b=eval(obj.transform)(b));$(".tpl."+a).html($tpl("tpl_"+a,b));obj.onSuccess&&eval(obj.onSuccess)()})};this.$call=function(a){if(null==a){for(first in actions)break;a=first}obj=actions[a];for(var b in actions)b==a?$(".action-"+b).addClass("active"):($(".tpl."+b).html(""),$(".action-"+b).removeClass("active"));args="";r=$param("r");null!=r&&(args=
"&r="+r);window.history.pushState(a,a,"?p="+a+args);obj.loading&&$(".tpl."+a).html($tpl("tpl_loading"));$loadTpl(a)};this.$bind=function(a){for(var b in a)$(".action-"+b).on("click",function(){action=$(this).attr("class").replace(/.*action-/,"").replace(" active","");$call(action)});r=$param("r");null!=r&&null!=r&&setInterval(function(){$call($param("p"))},1E3*r)};this.$initActions=function(){actions&&($bind(actions),$call($param("p")))};this.$param=function(a){var b=window.location.href;a=a.replace(/[\[\]]/g,
"\\$&");return(a=(new RegExp("[?&]"+a+"(=([^&#]*)|&|#|$)")).exec(b))?a[2]?decodeURIComponent(a[2].replace(/\+/g," ")):"":null};this.$roundNumeral=function(a){return isNaN(a)?a:numeral(a).format("0 0.00 a")};this.$round=function(a){return isNaN(a)?a:Number(a.toFixed(2))};this.$fromNow=function(a){return moment.unix(a).add(0,"hours").fromNow()};this.$lsSet=function(a,b){if(Array.isArray(b)||"object"===typeof b)b=JSON.stringify(b);localStorage.setItem(a,b)};this.$lsGet=function(a){(value=localStorage.getItem(a))&&
"{"===value[0]&&(value=JSON.parse(value));return value};this.$lsRm=function(a){localStorage.removeItem(a)};this.$scrollToBottom=function(a,b){function d(){var a=Math.min(1,(Date.now()-h)/b);c.scrollTop=e*a+f;1>a&&setTimeout(d,10)}var c=a[0],f=c.scrollTop,e=c.scrollHeight-a.height()-f,h=Date.now();d()};this.$setElementHeight=function(a,b){$(a).height($(window).height()-b)};this.$ws=null;var k=!1,f=0;this.$WS=function(a,b){wsProto="ws:";"https:"==window.location.protocol&&(wsProto="wss:");this.$ws=
new WebSocket(wsProto+"//"+window.location.host+"/ws");this.$ws.onopen=function(){f=1;k||(k=!0,a&&a(this.$ws))};this.$ws.onmessage=b;this.$ws.onerror=function(a){};this.$ws.onclose=function(d){d=1E3*Math.min(15,Math.pow(2,f)-1);$("#send").attr("placeholder","Connexion lost, retry in "+d/1E3+" s...");setTimeout(function(){f++;$WS(a,b)},d)}}})();