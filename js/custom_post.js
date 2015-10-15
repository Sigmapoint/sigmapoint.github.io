
//function handle_post_data(data){
//    var automail_url = "https://arcane-hollows-9396.herokuapp.com/sigma"
//
//    var xhr = new XMLHttpRequest();
//    xhr.open("POST", automail_url, false);
//    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
//
//    // send the collected data as JSON
//    xhr.send(JSON.stringify(data));
//
//    console.log("Done");
//}

function isValidEmail(email) {
    var re = /^[^@]+@[^@]+$/;  // same string used as pattern in _layouts/page.html

    if(re.exec(email)){
        return true;
    }

    return false;
}

function post_data(){
    var email_field_id = "field29185149";
    var message_field_id = "field29185136";
    var submit_button_id = "fsSubmitButton1892401";

    var email = document.getElementById(email_field_id).value;
    var message = document.getElementById(message_field_id).value;

    var data = {
        'E-Mail': email,
        'Message': message,
    }

    if(message && message.length > 0 && isValidEmail(email)) {

        var submit_button = document.getElementById(submit_button_id);
        submit_button.disabled = true;
        var submit_button_old_value = submit_button.value;
        submit_button.value = 'Sending...';

        //var automail_url = "https://arcane-hollows-9396.herokuapp.com/sigma";
        var automail_url = "https://sigmapoint.pl/api/mailing/sigma";

        $.ajax(automail_url, {
            data : JSON.stringify(data),
            contentType : 'application/json',
            type : 'POST',
            success: function () {
                submit_button.disabled = false;
                submit_button.value = submit_button_old_value;

                window.location.href = "/thank-you/";
                mixpanel.track("send contact form");
                console.log("Done");
            },
        });
    }
}
