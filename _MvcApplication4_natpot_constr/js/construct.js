jQuery(function($) {

$(document).ready(function(){

	$('.cp_meb').farbtastic(function(color){
		// $('#wall1').css('fill',color);
		// //$('.wall').css('fill',color);
		// $('.color2').css('background-color',color);
		$('.color_meb').css('fill',color);

	});
	$('.cp_wall').farbtastic(function(color){
		// $('#wall1').css('fill',color);
		// //$('.wall').css('fill',color);
		// $('.color2').css('background-color',color);

		$('.svg_wall').css('background-image','none').css('background-color',color);

	});

	$('.color_el').on('click',function(){
		var level = $(this).closest('.colors_box').attr('level');
		var color = $(this).attr('color');

		$('.level_'+level).css('fill',color);
		$('.level_'+level).removeClass('img_bg');
		$('.colors_box[level="'+level+'"]').find('.color_el.active').removeClass('active');



		$(this).addClass('active');
	});

	// $('.cp_celling_1').farbtastic(function(color){
	// 	$('.level_1').css('fill',color);
	// });

	// $('.cp_celling_2').farbtastic(function(color){
	// 	$('.level_2').css('fill',color);
	// });


	var get_m = $('#constructor').attr('material');
	var get_f = $('#constructor').attr('form');

	load_celling(get_f,get_m);


	$('.f_cel_el').on('click',function(){
		$('.f_cel_el').removeClass('active_form');
		$(this).addClass('active_form');

		// var form_celling = $("#form_celling :selected").val();
		var form_celling = $(".f_cel_el.active_form").attr('value');
		// var material_celling = $("#material_celling :selected").val();
		var material_celling = $(".m_cel_el.active_m").attr('value');
		
		


		load_celling(form_celling,material_celling);
	});

	function cb_change_form(form_celling){
		if(form_celling==17){
			// console.log('form 17');
			// $('.light_on_controll')
			$('#constructor').addClass('on_light');


		}else{
			$('#constructor').removeClass('on_light');
			$('#constructor').removeClass('active_light_on');

		}
	}

	$(document).on('click','.set_on_light',function(){
		var light_type = $(this).attr("light");
		var light_type_on = $('#constructor').attr('on_light_type');
		if( !$('#constructor').hasClass('active_light_on') ){
			
			$('#constructor').addClass('active_light_on');
		}else{
			if(light_type==light_type_on){
				$('#constructor').removeClass('active_light_on');

			}
		}



			//$('.light_on').addClass();
			$('#constructor').attr('on_light_type',light_type);
			


	}); //

	$('.m_cel_el').on('click',function(){
		$('.m_cel_el').removeClass('active_m');
		$(this).addClass('active_m');

		// var form_celling = $("#form_celling :selected").val();
		var form_celling = $(".f_cel_el.active_form").attr('value');
		// var material_celling = $("#material_celling :selected").val();
		var material_celling = $(".m_cel_el.active_m").attr('value');

		load_celling(form_celling,material_celling);
	});


	// $('.material_select').on('click',function(){
	// 	$('.m_cell_el').removeClass('active_m');
	// 	$(this).find('.m_cell_el').addClass('active_m');

	// 	var form_celling = $(".f_cel_el.active_form").attr('value');
	// 	// var material_celling = $("#material_celling :selected").val();
	// 	var material_celling = $(".m_cel_el.active_m").attr('value0');
	// 	// var material_celling = $(".m_cel_el.active_m").val();

	// 	console.log(material_celling);

	// 	load_celling(form_celling,material_celling);

	// });


	$('.select_cell').change(function(){
		// var form_celling = $("#form_celling :selected").val();
		var form_celling = $(".f_cel_el.active_form").attr('value');
		// var material_celling = $("#material_celling :selected").val();
		var material_celling = $(".m_cel_el.active_m").attr('value');

		load_celling(form_celling,material_celling);
		//console.log(form_celling,material_celling);
		
	});

	$('.toggle_light').on('click',function(){
		$('.light').toggleClass('show_light');
	});
	$('.toggle_light_l').on('click',function(){
		$('.light_l').toggleClass('show_light');
	});

	function load_celling(celling_id,celling_type){

		var base_url = $('#constructor').attr('base_url');

		var png_file=base_url+"construct/celling/"+celling_id+"/"+celling_type+"-min.png";
		$('.celling').css('background-image','url("'+png_file+'")');
		$('.celling_layer').removeClass('show_layer');
		$('#cell_n_'+celling_id).addClass('show_layer');

		$('.colors_group').removeClass('show_colors');
		$('.colors_group[group="'+celling_type+'"]').addClass('show_colors');

		$('.light').css('background-image','url("'+base_url+'construct/celling/'+celling_id+'/svet.png")');
		$('.light_l').css('background-image','url("'+base_url+'construct/lustr/min/'+celling_id+'-min.png")');

		cb_change_form(celling_id);

		//$('.celling_color').css('display','none');
		//$('#ce_'+celling_id).css('display','block');
	}


	
	 
	$('.ajax_field').focus(function(){
		$(this).removeClass('no_validation');
	});

	$('.btn_open_modal_zam').on('click',function(){
		modals_show('modal_get_zam');
		console.log(getParamsConstruct());
	});

	$('input[name="user_phone"]').inputmask('+7(999)999-9999');


	$('.ajax-form').on('submit',function(e){
		// собираем данные с формы, формируем объект с данными. Вызывается функция с именем в атрибуте func_after до ajax запроса. и если она вернет true, то выполнится ajax запрос с функцией из атрибута func у формы на сервере, а так же выполнится callback функция из атрибута callback формы.

		//console.log();
		var btn_active_event = $(document.activeElement,this);

		e.preventDefault();

		if(btn_active_event.hasClass('no_submit_element')){
			return false;
		}

		var btn_submit = $(this).find('[type="submit"]');
		if( btn_submit.hasClass('disabled') ){
			return false;
		}

		btn_submit.addClass('disabled');

		// var form_data = JSON.stringify($(this).serializeArray());
		if( $(this).hasClass('required') ){
			// controlls_data = JSON.stringify($(this).serializeArray());
			// controlls_data.forEach(function());
			var ri = 0;
			$(this).find('.form-control.required').each(function(i, elem){
				// console.log($(elem));
				var type = $(elem).attr('type');
				var name = $(elem).attr('name');
				var value;
				if(type=='text' || type === undefined || type === 'password'){
					value = $(elem).val();
				}

				if(name=='user_phone'){
					var phobe_value = $(elem).inputmask('unmaskedvalue');
					if(phobe_value.length<10){
						value = '';
					}else{
						value = phobe_value;
					}
				}

				if( value == '' ){
					var form_controll = $(elem).closest('.form_control');

					if( !form_controll.hasClass('no_valid') ){
						form_controll.addClass('no_valid');
						form_controll.append('<div class="nv_msg">Пожалуйста, заполните это поле</div>');
					}

					ri++;
				}
				// var value = $(elem).attr('');
			});

			if( ri>0 ){
				// console.log('required none');
				//msg('Ошибка','Пожалуйста, заполните обязательные поля');
				scroll_to_element($('.no_valid'));
				btn_submit.removeClass('disabled');
				return false;
			}


		}

		var data = form_data($(this));

		var func = $(this).attr('func');

		var func_after_ajax = $(this).attr("func_after");
		var callback = $(this).attr("callback");

		if(func_after_ajax===undefined || func_after_ajax===''){
			func_after_ajax = function(){
				return true;
			}
		}

		if(callback===undefined || callback===''){
			callback = function(){

			}
		}

		if(eval(func_after_ajax)(data)){

			get_ajax(func,data,function(responce){
				eval(callback)(responce);
			});

		}
		// console.log(JSON.stringify(data));
	}); //ajax-form

	$(document).on('focus','.no_valid',function(){
		$(this).removeClass('no_valid');
		$(this).find('.nv_msg').remove();
	});

	function fn_success(response){
		if(response['status']){
			modals_hide('modal_get_zam');
			modals_hide('modal_order');
			modals_show('modal_success');

			$('.modal_get_zam').find('button[type="submit"]').removeClass("disabled");
			$('.modal_order').find('button[type="submit"]').removeClass("disabled");

		}
	}

	function fn_after_get_zam(data){
		// console.log(data);
		// var construct_data = {};

		// construct_data['img_bg'] = 0;
		// if( $('.show_layer').find('.level_1').hasClass('img_bg') ){
		// 	construct_data['c_level_1'] = $('.show_layer').find('.level_1').attr('idbg');
		// 	construct_data['img_bg'] = 1;	
		// }else{
		// 	construct_data['c_level_1'] = $('.show_layer').find('.level_1').css('fill').trimAll();
		// }

		// if( $('.show_layer').find('.level_2').hasClass('img_bg') ){
		// 	construct_data['c_level_2'] = $('.show_layer').find('.level_2').attr('idbg');
		// 	construct_data['img_bg'] = 2;	
		// }else{
		// 	construct_data['c_level_2'] = $('.show_layer').find('.level_2').css('fill').trimAll();
		// }




				
		// construct_data['form'] = $('.active_form').attr('value');			
		// construct_data['material'] = $('.active_m').attr('value');

		// construct_data['c_meb'] = $('.color_meb').css('fill').trimAll();
		// construct_data['c_wall'] = $('.svg_wall').css('background-color').trimAll();
		var construct_data = getParamsConstruct();

		var l_gen = 'c_level_1='+construct_data['c_level_1']+'&c_level_2='+construct_data['c_level_2']+'&form='+construct_data['form']+'&material='+construct_data['material']+'&c_meb='+construct_data['c_meb']+'&c_wall='+construct_data['c_wall']+'&img_bg='+construct_data['img_bg'];

		 data['link_construct'] = 'http://lplive.ru/c_photo/?'+l_gen;
		// console.log(data);

		console.log(data['link_construct']);
		return true;

	}

	function getParamsConstruct(){
		var construct_data = {};

		construct_data['img_bg'] = 0;
		if( $('.show_layer').find('.level_1').hasClass('img_bg') ){
			construct_data['c_level_1'] = $('.show_layer').find('.level_1').attr('idbg');
			construct_data['img_bg'] = 1;	
		}else{
			construct_data['c_level_1'] = $('.show_layer').find('.level_1').css('fill').trimAll();
		}

		if( $('.show_layer').find('.level_2').hasClass('img_bg') ){
			construct_data['c_level_2'] = $('.show_layer').find('.level_2').attr('idbg');
			construct_data['img_bg'] = 2;	
		}else{
			construct_data['c_level_2'] = $('.show_layer').find('.level_2').css('fill').trimAll();
		}




				
		construct_data['form'] = $('.active_form').attr('value');			
		construct_data['material'] = $('.active_m').attr('value');

		construct_data['c_meb'] = $('.color_meb').css('fill').trimAll();
		construct_data['c_wall'] = $('.svg_wall').css('background-color').trimAll();

		return construct_data;
	}

	$(document).on('click','.photo_item',function(){
		var calling_id = $('.show_layer').attr('calling_id');
		var img_id = $(this).attr("img_id");

		// $('#cell_n_'+calling_id).find('.level_2').css('fill','url(#bg'+calling_id+'_'+img_id+')');

		var level_set = $(".swap_level").attr('level_img');


		// $('#cell_n_'+calling_id).find('.level_'+level_set).css('fill','url(#bg'+calling_id+'_'+img_id+')');

		$('.celling_layer').each(function(i, elem){
			var cel_id = $(elem).attr('calling_id');
			// img_id
			var level = level_set;
			if(cel_id==17){
				level = 1;
			}
			$(elem).find('.level_'+level).css('fill','url(#bg'+cel_id+'_'+img_id+')');
			$(elem).find('.level_'+level).addClass("img_bg");
			$(elem).find('.level_'+level).attr("idbg",img_id);
		});



	});

	$(document).on('click','.swap_level',function(){

		var calling_id = $('.show_layer').attr('calling_id');
		if(calling_id==17){
			return false;
		}

		
		$('.celling_layer').each(function(i, elem){
			var cel_id = $(elem).attr('calling_id');
			
			if(cel_id!=17){
				var el_l1 = $(elem).find('.level_1');
				var el_l2 = $(elem).find('.level_2');

				var l1 = {};
				var l2 = {};

				l1['fill'] = el_l1.css('fill');
				if(el_l1.hasClass('img_bg')){
					l1['class'] = 1;
				}
				l1['idbg'] = el_l1.attr('idbg');



				l2['fill'] = el_l2.css('fill');
				if(el_l2.hasClass('img_bg')){
					l2['class'] = 1;
				}
				l2['idbg'] = el_l2.attr('idbg');



				el_l1.css('fill',l2['fill']);
				if(l2['class']==1){
					if(l1['class']!=1){
						el_l1.addClass('img_bg');
					}
				}else{
					el_l1.removeClass('img_bg');
				}
				el_l1.attr('idbg',l2['idbg']);




				el_l2.css('fill',l1['fill']);
				if(l1['class']==1){
					if(l2['class']!=1){
						el_l2.addClass('img_bg');
					}
				}else{
					el_l2.removeClass('img_bg');
				}
				el_l2.attr('idbg',l1['idbg']);




				// el_l2.css('fill',l1);
				
			}else{

			}

			
		});




		if( $(this).attr('level_img')=='1' ){
			$(this).attr('level_img','2');
		}else{
			$(this).attr('level_img','1');
		}

	});


	var pressets = {
		'1': {
			c_level_1: 'rgb(255,236,149)',
			c_level_2: '6',
			c_meb: 'rgb(129,238,254)',
			c_wall: 'rgb(243,234,155)',
			form: '8',
			img_bg: 2,
			material: 'g'
		},

		'2': {
			c_level_1: '5',
			c_level_2: 'rgb(161,219,228)',
			c_meb: 'rgb(129,173,254)',
			c_wall: 'rgb(155,231,243)',
			form: '16',
			img_bg: 1,
			material: 'g'
		},

		'3': {
			c_level_1: "12",
			c_level_2: "rgb(247,241,210)",
			c_meb: "rgb(129,254,164)",
			c_wall: "rgb(252,254,220)",
			form: "4",
			img_bg: 1,
			material: "m"
		},

		'4': {
			c_level_1:	"rgb(147,205,130)",
			c_level_2:	"9",
			c_meb:	"rgb(181,243,149)",
			c_wall:	"rgb(212,255,173)",
			form:	"10",
			img_bg:	2,
			material:	"g"
		}


	};

	$(document).on('click','.presset_item',function(){
		var presset_id = $(this).attr('presset_id');

		var presset = pressets[presset_id];
		// console.log(presset);
		$('.level_1').css('fill',presset['c_level_1']);
		$('.level_2').css('fill',presset['c_level_2']);
		$('.svg_wall').css('background-color',presset['c_wall']);
		$('.color_meb').css('fill',presset['c_meb']);

		if(presset['img_bg']>0){

			$('.celling_layer').each(function(i, elem){
				var calling_id = $(elem).attr('calling_id');
				$(elem).find('.level_'+presset.img_bg).css('fill','url(#bg'+calling_id+'_'+presset['c_level_'+presset.img_bg]+')');

			});

			$('.swap_level').attr('level_img',presset.img_bg);
			// $('.level_'+presset.img_bg).css('fill',presset['c_level_'+presset.img_bg]);
		}

		$('.f_cel_el').removeClass('active_form');
		$('.f_cel_el[value="'+presset['form']+'"]').addClass('active_form');
		
		load_celling(presset['form'],presset['material']);


	});

	$(document).on('click','.select_oboi',function(){
		// console.log('ok');
		var o_id = $('.svg_wall').attr("oboi");
		
		
		if(o_id===undefined){
			o_id = 1;
		}else{
			o_id = parseInt(o_id);
			if(o_id<11){
				o_id++;
			}else{
				o_id = 1;
			}
		}

		$('.svg_wall').attr("oboi",o_id).css('background-image','url("construct/oboi/'+o_id+'.jpg")');

	});
	

	// var owl = $('.logo_sliders');

	// owl.owlCarousel({
	//     items:1,
	//     loop:true,
	//     margin:0,
	//     autoplay:true,
	//     autoplayTimeout:1000,
	//     autoplayHoverPause:true
	// });

	$('input[name="user_time"]').datetimepicker({
		locale: 'ru',
		stepping: 30,
	});

	$('.open_order_c').on('click',function(){
		modals_show('modal_order');
	});


}); //ready



/*
c_level_1:"12"
c_level_2:"rgb(247,241,210)"
c_meb:"rgb(129,254,164)"
c_wall:"rgb(252,254,220)"
form:"4"
img_bg:1
material:"m"
*/

function go_data_fields(el_form){

	var type = el_form.attr("type");
	var el_inputs = el_form.find('.ajax_field');
	var data_fields = undefined;
	data_fields = {};
	data_fields['type']=type;
	var validation = 0;
	el_inputs.each(function(i, elem){

		if( $(elem).attr('type')=='checkbox' ){

			if( $(elem).prop('checked') ){
				data_fields[$(elem).attr('name')]=1;
			}else{
				data_fields[$(elem).attr('name')]=0;
			}

		}else{
			data_fields[$(elem).attr('name')]=$(elem).val();
		}


		if( $(elem).hasClass('required_field') && $(elem).val()=='' ){
			$(elem).addClass('no_validation');
			validation++;
		}

	});
	if(validation>0){
		return false;
	}else{
		return data_fields;
	}
}




function scroll_to_element(elem,speed,cb) {
	var menu_h = $('.nav_scroll').height()+35;
	var target = elem;
	var pos = target.offset().top-menu_h;

	if(speed===undefined){
		var speed_scroll = 100;
	}else{
		var speed_scroll = speed;
	}

	if(cb!==undefined){
		var call_back = cb();
	}else{
		var call_back = function() {
			
		}
	}

	$("html, body").animate({ scrollTop: pos + "px" }, speed_scroll, function(){
		call_back();
	});
}

function get_ajax(funcName,data,cbSuccess) {


	$.ajax({
		type: 'POST',
		url: $('body').attr('ajax'),
		data: {data:JSON.stringify(data),func:funcName},
		success: function(response){
			try{
				var response = JSON.parse(response);
			} catch(err){
				console.log('error json parse');
				var response = {status:false};
			}
			cbSuccess(response);
		},
		error: function(response){
			console.log('Error getJson');
			return false;
		}
	});


}

function form_data(form){

	var form_data = form.serializeArray();
	// console.log(form_data);

	var data = {};
	form_data.forEach(function(item, i, arr){
		data[item['name']] = item['value'];
	});

	return data;
}


String.prototype.trimAll=function()
// убирает все пробелы в строке s
{
  var r=/\s+/g;
  return this.replace(r,'');
}




}); //