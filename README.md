# Custom Notifications

Notifications in the website (jquery plugin)

Variables:

note             - notice text (string)

status           - notice yype (string): success_notice, error_notice или info_notice

options          - options for notice: position, speed, height, autoclose и closeBtn

position         - the position of the notification (top or bottom). Possible values: fixed-top or fixed-bottom

speed            - hiding speed

height           - notice height

autoclose        - time before notice closes. False - lock autoclose.

closeBtn         - true to show the close button

countElements    - number of notifications (one by default)


# Examples:

$(this).customNotice('Item successfully created!', 'success_notice');

$(this).customNotice('Error adding information!', 'error_notice', {autoclose : false, closeBtn : true, height : 100} );

$(this).customNotice('Attention here', 'info_notice', {autoclose : false, closeBtn : true, height : 150, position : 'fixed-bottom'} );
