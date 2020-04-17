(function () {
  var w = window,
    C = "___grecaptcha_cfg",
    cfg = (w[C] = w[C] || {}),
    N = "grecaptcha";
  var gr = (w[N] = w[N] || {});
  gr.ready =
    gr.ready ||
    function (f) {
      (cfg["fns"] = cfg["fns"] || []).push(f);
    };
  (cfg["render"] = cfg["render"] || []).push("explicit");
  (cfg["onload"] = cfg["onload"] || []).push("onloadCallback");
  w["__google_recaptcha_client"] = true;
  var d = document,
    po = d.createElement("script");
  po.type = "text/javascript";
  po.async = true;
  po.src =
    "https://www.gstatic.com/recaptcha/releases/zItNOfzbrqVGbb4QFYpPpcrw/recaptcha__en.js";
  var e = d.querySelector("script[nonce]"),
    n = e && (e["nonce"] || e.getAttribute("nonce"));
  if (n) {
    po.setAttribute("nonce", n);
  }
  var s = d.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(po, s);
})();


var appendField = function (form, key, value) {
    var textarea = document.createElement('textarea')
    textarea.setAttribute('name', key)
    textarea.innerHTML = value
    textarea.setAttribute('style', 'display:none')
    form.appendChild(textarea)
  }
  
  var success = function (response) {
    var form = document.querySelector('#passthrough')
  
    try {
      // remove data from sessionStorage
      sessionStorage.removeItem('data')
      sessionStorage.removeItem('sorted_keys')
    } catch (e) { }
  
    // handles the case where user has a button named 'submit'
    document.createElement('form').submit.call(form)
  }
  
  function onloadCallback () {
    var form = document.querySelector('#passthrough')
    var data = {"-subject": "Hector Cano", "_referrer": "http://localhost:8080/?name=Hector+Cano\u0026email=7hecano%40gmail.com\u0026message=d", "_replyto": "7hecano@gmail.com", "_submission_ip": "10.7.236.68", "_submission_nonce": "f01435f9-a42e-4d11-9429-0ec79c61cf0c", "message": "dsdd"}
    var keys = ["-subject", "_replyto", "message"]
  
    try {
      if (sessionStorage.getItem('data')) {
        if (Object.keys(data).length > 1) { // if data is valid overwrite current storage
          sessionStorage.setItem('data', JSON.stringify(data))
          sessionStorage.setItem('sorted_keys', JSON.stringify(keys))
        } else {
          // passed in blank data except submission_nonce
          data = JSON.parse(sessionStorage.getItem('data'))
          keys = JSON.parse(sessionStorage.getItem('sorted_keys'))
        }
      } else {
        sessionStorage.setItem('data', JSON.stringify(data))
        sessionStorage.setItem('sorted_keys', JSON.stringify(keys))
      }
    } catch (e) { /* Safari for iOS in incognito mode doesn't provide sessionStorage. */ }
  
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      if (data.hasOwnProperty(key)) {
        appendField(form, key, data[key])
        delete data[key]
      }
    }
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        appendField(form, key, data[key])
      }
    }
  
    grecaptcha.render('recaptcha', {
      'sitekey': "6LepugcTAAAAAP0ScLpB1xpKEoZx5CdRn4tBtdH4",
      'callback': success,
      'size': window.innerWidth < 480 ? 'compact' : 'normal',
      'hl': "en"
    })
  }
  