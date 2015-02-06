function post_data(){
    var email_field_id = "field29185149"
    var message_field_id = "field29185136"
    var automail_url = "https://arcane-hollows-9396.herokuapp.com"


    var email = document.getElementById(email_field_id).value
    var message = document.getElementById(message_field_id).value

    var data = {
        'E-mail': email,
        'Message': message,
    }

    var xhr = new XMLHttpRequest();


    xhr.open("POST", automail_url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // send the collected data as JSON
    xhr.send(JSON.stringify(data));
}
