/**
 * Created by smit9 
 * https://github.com/smit9
 */
 
(function ($) {

    //use without object
    $.customNotice = function (note, status, options, callback) {
        return $.fn.customNotice(note, options, callback);
    };

    $.fn.customNotice = function (note, status, options, callback) {

        //variables
        var uniqID;

        var settings = {
            'position': 'fixed-top', // fixed-top or fixed-bottom
            'speed': 'fast',
            'height': 100,
            'autoclose': 2000,
            'closeBtn': false,
            'countElements': 1
        };

        //options
        if (options) {
            $.extend(settings, options);
        }

        //if without text
        if (!note) {
            switch (status) {
                case 'success_notice':
                    note = 'Success!';
                    break;
                case 'error_notice':
                    note = 'Error!';
                    break;
                case 'info_notice':
                    note = 'Warning!';
                    break;
                default:
                    console.log('Unknown status for notification');
            }

        }

        // generate a unique ID for notification
        function uniqGen() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        uniqID = uniqGen() + uniqGen() + '-' + uniqGen() + '-' + uniqGen() + '-' + uniqGen() + '-' + uniqGen();

        //check notices
        if ($('div').hasClass('custom-notice')) {

            // limit the number of notifications
            if( $('.custom-notice .custom-notice__item').length < settings['countElements'] ){
                //add new notice
                setNoticeToHtml();
            }else{
                // notifications more than three, delete the last one and display a new one
                $('.custom-notice .custom-notice __item').last().remove();
                setNoticeToHtml();
            }


        } else {

            //create a div and the first notice
            $('body').prepend('<div class="custom-notice ' + settings['position'] + '"></div>');

            // display notification
            setNoticeToHtml();

        }

        // autoclose
        $('.custom-notice').ready(function () {
            // if autoclose, close notice
            if (settings['autoclose']) {
                $('#' + uniqID).delay(settings['autoclose']).fadeOut(settings['speed'], function () {
                    $(this).remove();
                });
            }
        });

        // click close button
        $('.close-notice').on('click', function () {

            $('#' + $(this).attr('data-uniq-id')).delay(settings['autoclose']).fadeOut(settings['speed'], function () {
                $(this).remove();
            });

        });

        // data for callback
        var response =
        {
            'id': uniqID,
            'position': settings['position']
        };

        // Callback
        if (callback) {
            callback(response);
        }
        else {
            return (response);
        }

        // creating html notice
        function setNoticeToHtml(){
            if (settings['closeBtn']) {
                $('.custom-notice').prepend('<div id="' + uniqID + '" style="height:' + settings['height'] + 'px;" class="custom-notice__item custom-notice__' + status + '"><div class="notice-text">' + note + '</div><span class="close-notice" data-uniq-id="' + uniqID + '">x</span></div>');
                $('#' + uniqID).slideDown('fast');
            } else {
                $('.custom-notice').prepend('<div id="' + uniqID + '" style="height:' + settings['height'] + 'px;" class="custom-notice__item custom-notice__' + status + '"><div class="notice-text">' + note + '</div></div>');
                $('#' + uniqID).slideDown('fast');
            }
        }

    }

})(jQuery);
