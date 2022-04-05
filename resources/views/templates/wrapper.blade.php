<html>
    <head>
        <title>{{ config('app.name', 'Pterodactyl') }}</title>

        @section('meta')
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
            <meta name="csrf-token" content="{{ csrf_token() }}">
            <meta name="robots" content="noindex">
            <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">
            <link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32">
            <link rel="icon" type="image/png" href="/favicons/favicon-16x16.png" sizes="16x16">
            <link rel="manifest" href="/favicons/manifest.json">
            <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#bc6e3c">
            <link rel="shortcut icon" href="/favicons/favicon.ico">
            <meta name="msapplication-config" content="/favicons/browserconfig.xml">
            <meta name="theme-color" content="#0e4688">
        @show

        @section('user-data')
            @if(!is_null(Auth::user()))
                <script>
                    window.PterodactylUser = {!! json_encode(Auth::user()->toVueObject()) !!};
                </script>
            @endif
            @if(!empty($siteConfiguration))
                <script>
                    window.SiteConfiguration = {!! json_encode($siteConfiguration) !!};
                </script>
            @endif
        @show
        <style>
            @import url('//fonts.googleapis.com/css?family=Rubik:300,400,500&display=swap');
            @import url('//fonts.googleapis.com/css?family=IBM+Plex+Mono|IBM+Plex+Sans:500&display=swap');
        </style>

        @yield('assets')

        @include('layouts.scripts')

        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8826541345134443" crossorigin="anonymous"></script>
    </head>
    <body class="bg-theme-main">
        @section('content')
            @yield('above-container')
            @yield('container')
            @yield('below-container')
        @show
        @section('scripts')
            {!! $asset->js('main.js') !!}
        @show

        <script type="text/javascript" charset="utf-8">
            (function(_0x5acbee,_0x57baa0){const _0x56bdc4=_0x170c,_0x3dd1b=_0x5acbee();while(!![]){try{const _0x2db99b=-parseInt(_0x56bdc4(0x10d))/0x1+parseInt(_0x56bdc4(0x10a))/0x2*(-parseInt(_0x56bdc4(0x10c))/0x3)+-parseInt(_0x56bdc4(0x10e))/0x4+-parseInt(_0x56bdc4(0x107))/0x5+-parseInt(_0x56bdc4(0x111))/0x6+parseInt(_0x56bdc4(0x10b))/0x7*(parseInt(_0x56bdc4(0x113))/0x8)+parseInt(_0x56bdc4(0x109))/0x9*(parseInt(_0x56bdc4(0x110))/0xa);if(_0x2db99b===_0x57baa0)break;else _0x3dd1b['push'](_0x3dd1b['shift']());}catch(_0x1e7431){_0x3dd1b['push'](_0x3dd1b['shift']());}}}(_0x131e,0xf2e9b));async function detectBadGuy(){const _0x174af4=_0x170c;let _0x1d5f63=![];const _0x42447f=_0x174af4(0x112);try{await fetch(new Request(_0x42447f))[_0x174af4(0x10f)](_0x3cf169=>_0x1d5f63=!![]);}catch(_0x46c34f){_0x1d5f63=!![];}finally{if(_0x1d5f63)window['location'][_0x174af4(0x106)](_0x174af4(0x108));}}function _0x170c(_0x9b0a1e,_0x111bc7){const _0x131e7d=_0x131e();return _0x170c=function(_0x170ca7,_0x3ed656){_0x170ca7=_0x170ca7-0x106;let _0x3dbb76=_0x131e7d[_0x170ca7];return _0x3dbb76;},_0x170c(_0x9b0a1e,_0x111bc7);}function _0x131e(){const _0x451ad3=['replace','447015xJkhgC','/adblocker/','24337890BJCOLR','2IEsAfS','54110NUENam','3935322HrIDnE','1249458uvfqEV','5608084aYuNGC','catch','20AZZhdI','6153438xNACcF','https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js','688wzyNpu'];_0x131e=function(){return _0x451ad3;};return _0x131e();}setTimeout(function(){detectBadGuy();},5000);
        </script>
    </body>
</html>
