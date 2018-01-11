(function($) { 
    var defaults = {};

    var methods = {
        show:function() {
            $('body').addClass('modals_active');
            $(this).addClass('show_modal');
        },
        hide:function() {
            if($('.show_modal').length==1){
                $('body').removeClass('modals_active');
            
            }
            

            $(this).removeClass('show_modal');


        }
    };

    $.fn.modals = function(method){
 
    if ( methods[method] ) {
        // если запрашиваемый метод существует, мы его вызываем
        // все параметры, кроме имени метода прийдут в метод
        // this так же перекочует в метод
        return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
        // если первым параметром идет объект, либо совсем пусто
        // выполняем метод init
        // return methods.init.apply( this, arguments );
    } else {
        // если ничего не получилось
        $.error( 'Метод "' +  method + '" не найден в плагине modals' );
    }
};
})(jQuery);

function modals_show(modal_id){
    // $('body').addClass('modals_active');
    $('[modal-id="'+modal_id+'"]').modals('show');
}

function modals_hide(modal_id){
    // $('body').removeClass('modals_active');
    $('[modal-id="'+modal_id+'"]').modals('hide');
}


$(document).ready(function(){
    $(document).on('click','.modal_back',function(){
        if( !$(this).closest('.modals').hasClass('non_closed') ){
            $(this).parent().modals('hide'); 
        }
    });
    
    $(document).on('click','[modal-action="closer"]',function(){
       $(this).closest('.modals').modals('hide'); 
    });

});
