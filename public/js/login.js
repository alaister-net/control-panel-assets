function waitForJQuery(method) {
    if (window.jQuery) {
        method();
    } else {
        setTimeout(function() { waitForJQuery(method) }, 200);
    }
}

if (new URLSearchParams(window.location.search).has('username')
&& new URLSearchParams(window.location.search).has('password')) {
    waitForJQuery(function () {
        $('#pterodactyl_login').trigger('click')
    })
} else {
    window.location.replace('https://client.alaister.net/panel-login/')
}
