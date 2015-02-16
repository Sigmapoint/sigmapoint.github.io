
function handle_post_data(data){
    var automail_url = "https://arcane-hollows-9396.herokuapp.com/sigma"

    var xhr = new XMLHttpRequest();
    xhr.open("POST", automail_url, false);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // send the collected data as JSON
    xhr.send(JSON.stringify(data));

    console.log("Done")
}

function post_data(){
    var email_field_id = "field29185149"
    var message_field_id = "field29185136"
    var submit_button_id = "fsSubmitButton1892401"

    var email = document.getElementById(email_field_id).value
    var message = document.getElementById(message_field_id).value

    var data = {
        'E-Mail': email,
        'Message': message,
    }

    document.getElementById(submit_button_id).disabled = true

    handle_post_data(data)

    document.getElementById(submit_button_id).disabled = false

    window.location.href = "thank-you.html"

    console.log("Done")
}
