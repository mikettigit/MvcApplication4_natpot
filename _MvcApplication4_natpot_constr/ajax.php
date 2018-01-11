<?php
session_start();

$req = [];
$req['status'] = true;
if ($_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest') {
	$req['status'] = false;
	echo(json_encode($req));
	return false;
}

$data = json_decode($_POST['data'],true);
// $data_list = json_decode($_POST['data'],true);
// $data = [];
// foreach($data_list as $key => $param){
// //   $data[$param['name']]  =  filter_input($param['value']);
//     $data[$param['name']] = $param['value'];
// }

if (empty($_POST['func'])) {
	$req['status'] = false;
	$req['error'] = 'no func';
	echo(json_encode($req));
	return false;
}

$func = $_POST['func'];

ob_start();


// START get_ajax functions
// 
// if($func == 'my_function'){

// }



if($func == 'get_zam'){
	require 'php_libs/phpmailer/PHPMailerAutoload.php';

	$mail = new PHPMailer();
	$mail->IsHTML(true);
	$mail->CharSet = 'utf-8';
	$mail->From = 'info@lplive.ru';

	$mail->FromName = 'constructor.lplive.ru';
	$mail->Subject = 'Новая заявка на вызов замерщика';
	
	$adressats = ['fire73.ru@yandex.ru'];

	foreach ($adressats as $key => $smail) {
		$mail->AddAddress($smail);
	}

	$titles = array(
		'user_name' => 'Имя', 
		'user_phone' => 'Телефон',
		'user_email' => 'Email',
		'user_adress' => 'Адрес',
		'user_time' => 'Время'
		// 'link_construct' => 'Выбор клиента',
	);

	$content_fields = '';
	foreach ($data as $key => $value) {

		if($titles[$key] != ''){
			$content_fields .= '<div><strong>'.$titles[$key].' :</strong>'.$value.'</div>';
		}
		
	}

	$content_mail = '
	<div>
		'.$content_fields.'
	</div>
	';

	$mail->MsgHTML($content_mail);
	$mail->Send();


}










// END get_ajax functions

$req['ob_get_contents'] = ob_get_contents();
ob_end_clean();

$req['data'] = $data;
$req['func'] = $_POST['func'];
echo(json_encode($req));
return false;