define(['jquery', 'jqueryui'], function ($) {
    (function ($) {
        $.widget('ui.combobox', {
            _create: function () {
                var that = this;
                var input;
                var select = this.element.hide();
                var selected = select.children(':selected');
                var displayValue = selected.val() ? selected.text() : '';
                var wrapper = this.wrapper = $('<span>')
                        .insertAfter(this.element)
                        .addClass('ui-combobox');

                input = $('<input>')
                    .val(displayValue)
                    .addClass('ui-state-default ui-combobox-input')
                    .appendTo(wrapper)
                    .autocomplete({
                        delay: 0,
                        minLength: 0,
                        source: function (request, response) {
                            // escape all regular expression meaningful words
                            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), 'ig');
                            var responseData = select.children('option').map(function () {
                                var text = $(this).text();
                                if (this.value && (!request.term || matcher.test(text))) {
                                    return {
                                        // make matched word bolder
                                        label: text.replace(
                                            new RegExp(
                                                '(?![^&;]+;)(?!<[^<>]*)(' + $.ui.autocomplete.escapeRegex(request.term) + ')(?![^<>]*>)(?![^&;]+;)', 'gi'),
                                                '<strong>$1</strong>'),
                                        value: text,
                                        option: this
                                    }
                                }
                            });
                            response(responseData);
                        },
                        select: function (event, ui) {
                            ui.item.option.select = true;
                            that._trigger('selected', event, {
                                item: ui.item.option
                            });
                        },
                        change: function (event, ui) {
                            // do some validation if need
                        }
                    })
                    .addClass('ui-widget ui-widget-content ui-corner-left');

                // render suggestion options, make matched word bolder
                input.data('autocomplete')._renderItem = function(ul, item) {
                    return $('<li>')
                        .data('item.autocomplete', item)
                        .append('<a>' + item.label + '</a>')
                        .appendTo(ul);
                }

                $('<a>')
                    // title will ve shown as tooltip
                    .attr('title', 'Show all items.')
                    .val('tabIndex', -1)
                    .appendTo(wrapper)
                    .tooltip()
                    .button({
                        icons: {
                            primary: 'ui-icon-triangle-1-s'
                        },
                        text: false
                    })
                    .removeClass('ui-corner-all')
                    .addClass('ui-corner-right ui-combobox-toggle')
                    // click to show all items
                    .click(function () {
                        // close suggestion options if already visible
                        if (input.autocomplete('widget').is(':visible')) {
                            input.autocomplete('close');
                        } else {
                            this.blur();
                            input.autocomplete('search', '');
                            this.focus();
                        }
                    });
            },

            _setOption: function (key,value) {
                $.Widget.prototype._setOption.apply(this, arguments);
            },

            destory: function () {
                this.wrapper.remove();
                this.element.show();
                $.Widget.prototype.destory.call(this);
            }
        });
    })($);
});