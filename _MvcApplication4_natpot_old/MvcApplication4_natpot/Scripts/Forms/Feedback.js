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
        clientPhoneField.removeClass("error");
        phoneChars = " +-()1234567890";
        phoneString = clientPhoneField.val();
        if (phoneString.length > 0) {
            if (phoneString.length < 5) {
                clientPhoneField.addClass("error");
                isError = true;
            }
            else {
                i = 0;
                while (ch = phoneString.substr(i, 1)) {
                    if (phoneChars.indexOf(ch) == -1) {
                        clientPhoneField.addClass("error");
                        isError = true;
                        break;
                    }
                    i++;
                }
            }
        }

        clientEmailField = thisButton.parent().find("[name=clientEmail]");
        clientEmailField.removeClass("error");
        emailChars = "_-.@~qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789";
        emailString = clientEmailField.val();
        if (emailString.length > 0) {
            if (emailString.length < 6) {
                clientEmailField.addClass("error");
                isError = true;
            }
            else {
                i = 0;
                HasAt = false;
                while (ch = emailString.substr(i, 1)) {
                    if (emailChars.indexOf(ch) == -1) {
                        clientEmailField.addClass("error");
                        isError = true;
                        break;
                    }
                    if (ch == "@") {
                        HasAt = true;
                    }
                    i++;
                }
                if (!HasAt) {
                    clientEmailField.addClass("error");
                    isError = true;
                }
            }
        }

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