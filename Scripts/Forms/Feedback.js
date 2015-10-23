$(document).ready(function () {
    $(".FeedbackFormSubmit").click(function () {

        isError = false;

        thisButton = $(this);

        clientNameField = thisButton.parent().find("[name=clientName]");
        clientNameField.removeClass("error");
        nameChars = " -ёйцукенгшщзхъфывапролджэячсмитьбюЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ";
        nameString = clientNameField.val();
        if (nameString.length < 3) {
            clientNameField.addClass("error");
            isError = true;
        }
        else {
            i = 0;
            while (ch = nameString.substr(i, 1)) {
                if (nameChars.indexOf(ch) == -1) {
                    clientNameField.addClass("error");
                    isError = true;
                    break;
                }
                i++;
            }
        }

        clientMessageField = thisButton.parent().find("[name=clientMessage]");
        clientMessageField.removeClass("error");
        messageString = clientMessageField.val();
        if (messageString.length < 3)
        {
            clientMessageField.addClass("error");
            isError = true;
        }

        clientPhoneField = thisButton.parent().find("[name=clientPhone]");
        phoneString = clientPhoneField.val();

        clientEmailField = thisButton.parent().find("[name=clientEmail]");
        emailString = clientEmailField.val();

        if (!isError) {

            pageTracker._trackEvent("Отзыв", nameString, messageString, 1);

            thisButton.attr("disabled", "disabled");

            $.post('/Home/FeedbackRequest',
            {
                name: nameString + ", " + phoneString + ", " + emailString,
                message: messageString
            },
            function (data) {
                alert(data.Message);
                thisButton.removeAttr("disabled");
            }, "json");

        }

    });
});