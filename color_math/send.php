<?php
	$name = htmlspecialchars($_POST["name"]);
	$phone = htmlspecialchars($_POST["phone"]);
	$mail = htmlspecialchars($_POST["mail"]);
	$adres = htmlspecialchars($_POST["adres"]);
	$additionalInfo = htmlspecialchars($_POST["additionalInfo"]);
		
	$subject = "Заказ потолка";
	$from = "noreply@natpotolki.ru";
	
	$message = "<html><body>Новый заказ из флешки.";
	$message .= "<br>Имя: ".$name."\n";
	$message .= "<br>Телефон: ".$phone;
	$message .= "<br>Mail: ".$mail;
	$message .= "<br>Adres: ".$adres;
	$message .= "<br>Дополнительная информация: ".$additionalInfo;
	
	$message .= "<br><br>Выбраные параметры: ";
	$message .= "<br>Тип потолка: ".htmlspecialchars($_POST["ceilName"]);
	$message .= "<br>Значение потолка: ".htmlspecialchars($_POST["ceilValue"]);
	
	$message .= "<br>Тип стены: ".htmlspecialchars($_POST["wallName"]);
	$message .= "<br>Значение стены: ".htmlspecialchars($_POST["wallValue"]);
	
	$message .= "<br>Тип пола: ".htmlspecialchars($_POST["floorName"]);
	$message .= "<br>Значение пола: ".htmlspecialchars($_POST["floorValue"]);

  $message.="</body></html>";
	
	//$message = iconv('utf-8', 'windows-1251', $message);

  $headers="MIME-Version: 1.0\n";
      $headers.="Content-type: text/html; charset=utf-8\n";
      $headers.="From: <".$from.">\n";
      
	//$headers = "From: {$from}";
	//$headers .= "\nReply-To: {$from}";
	//$headers .= "Content-Type: text/html; charset=utf-8";
  mail("Oblako-51@yandex.ru", $subject, $message, $headers);
  mail("lu-bo@yandex.ru", $subject, $message, $headers);

	echo "status=1";
