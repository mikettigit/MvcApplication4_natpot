    
    window["Modals"] = function Modals() {
        this.nameMod = 'i am Modals';

    };

    Modals.prototype.attrModalId = 'modal-id';
    
    Modals.prototype.idFormSuccess = "modal_success";

    Modals.prototype.classShowModal = 'show_modal';
    Modals.prototype.classIsShowing = 'modals_active';
    Modals.prototype.closerModalsBtn = '.close_modal';
    Modals.prototype.closerOverlay = '.modal_back';

    Modals.prototype.open = function(modal_id){
        var element_modal = $('['+this.attrModalId+'='+modal_id+']');
        element_modal.addClass(this.classShowModal);
        $('body').addClass(this.classIsShowing);

        if(element_modal.find('.modal_box').outerHeight(true) > $(window).height()){
            element_modal.find('.modal_back').css("height",element_modal.find('.modal_box').outerHeight(true)+"px");
            
        }else{
            element_modal.find('.modal_back').css("height","100%");
        }




    }

    Modals.prototype.close = function(modal_id){
        Modals.prototype.closeCallBack(modal_id);
        $('['+this.attrModalId+'='+modal_id+']').removeClass(this.classShowModal);
        $('body').removeClass(this.classIsShowing);

        if(modal_id=='a_modal_confirm'){
            $('body').removeClass('msg_admin_confirm');
            // $('.btn_a_modal_cofirm_true').off('click',function(){
            //         console.log('off3');
            // });
        }

    }

    Modals.prototype.closeCallBack = function(modal_id){

    }

    $(Modals.prototype.closerModalsBtn).on('click',function(){
        var modal_id = $(this).closest('.modals').attr(Modals.prototype.attrModalId);
        Modals.prototype.close(modal_id);
    });

    $(Modals.prototype.closerOverlay).on('click',function(){
        var modal_id = $(this).closest('.modals').attr(Modals.prototype.attrModalId);
        Modals.prototype.close(modal_id);
    });