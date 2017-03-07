$(document).ready(function () {

    $("form").submit(function (e) {

        e.preventDefault();
        
        var form_data = new FormData(this);

        form_data.append("2fea14ff-d8e3-42c1-a230-3917b7a640c9", "2fea14ff-d8e3-42c1-a230-3917b7a640c9");

        $.ajax({
            url: "/Home/Post",
            data: form_data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST'
        });

        return false;

    });

    $(document).ajaxSuccess(function (event, xhr, settings) {
        data = JSON.parse(xhr.responseText);
        alert(data.Message);
        $(".quform-loading-wrap").hide();
    });

});
