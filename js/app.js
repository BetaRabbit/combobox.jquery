requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        jquery: 'jquery/jquery.min',
        jqueryui: 'jquery-ui/jquery-ui.min',
    },
    shim: {
        'jqueryui.combobox': {
            deps: ['jquery', 'jqueryui'],
            exports: 'jqueryui.combobox'
        }
    }
});

require(['app/jqueryui.combobox'], function () {
    $('#combobox').combobox();
});