$(document).ready(function () {
    $(".MeasurementFormSubmit").click(function () {

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

        clientPhoneField = thisButton.parent().find("[name=clientPhone]");
        clientPhoneField.removeClass("error");
        phoneChars = " +-()1234567890";
        phoneString = clientPhoneField.val();
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

            pageTracker._trackEvent("Заявка на замер - отправка", document.location.href, phoneString + "|" + nameString, 1);
            $("#YandexMetrikaWrapper").attr("src", "/MeasurementSend");

            thisButton.attr("disabled", "disabled");

            $.post('/Home/MeasurementRequest',
            {
                name: nameString,
                phone: phoneString,
                email: emailString
            },
            function (data) {
                alert(data.Message);
                thisButton.removeAttr("disabled");
                $.fancybox.close();
            }, "json");

        }

    });

    function measurementAsk()
    {
        dynamicForm = $("#MeasurementForm");
        $.fancybox(dynamicForm);
        pageTracker._trackEvent("Заявка на замер - открытие", document.location.href, "natpotolki", 1);
        $("#YandexMetrikaWrapper").attr("src", "/MeasurementOpen");
        return false;
    }

    $(".measurementAsk").click(function () {
        return measurementAsk();
    })

    $("a").click(function () {
        if ($(this).attr("href").toLowerCase().indexOf("measurementrequest") > -1) {
            return measurementAsk();
        }
    })
});
