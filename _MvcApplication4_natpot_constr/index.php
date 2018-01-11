<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->


    <title>Конструктор потолков</title>

    <!-- Bootstrap -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="libs/fontello/css/fontello.css" rel="stylesheet">
    <link href="libs/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    
    <link href="libs/datetimepicker/css/bootstrap-datetimepicker.min.css" rel="stylesheet">


    <link href="libs/farbtastic/farbtastic.css" rel="stylesheet">
    <link rel="stylesheet" href="libs/modals/modals.css">

    <link rel="stylesheet" href="css/constructor.css">

    <link rel="stylesheet" href="css/int/int2.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/s2.css">
    <link rel="stylesheet" href="css/media.css">





  </head>
  <body ajax-file="../../ajax.php" ajax="ajax.php">

   
    


    <div class="container">
        <div class="row">
            

              <?php 
            /*
            c_construct
            */

            // fn_debug($_GET);

            $dir = opendir('construct/bg');
            $count_f_bg = 0;
            while($file = readdir($dir)){
                if($file == '.' || $file == '..' || is_dir('construct/bg' . $file)){
                    continue;
                }
                $count_f_bg++;
            }



            $const_g = array();


            $const_g['level_1'] = !empty($_GET['c_level_1']) ? $_GET['c_level_1'] : 'rgb(147, 205, 130)';
            $const_g['level_2'] = !empty($_GET['c_level_2']) ? $_GET['c_level_2'] : 'rgb(0, 171, 150)';
            
            $img_bg = !empty($_GET['img_bg']) ? $_GET['img_bg'] : 0;

            if((int)$img_bg>0){
                $bg_level = (int)$_GET['img_bg'];

                $bg_id = $_GET['c_level_'.$bg_level];

                $const_g['level_'.$bg_level] = 'url("#bg'.$_GET["form"].'_'.$bg_id.'")';
                
            }




            $const_g['c_meb'] = !empty($_GET['c_meb']) ? $_GET['c_meb'] : 'rgb(144, 238, 192)';
            $const_g['c_wall'] = !empty($_GET['c_wall']) ? $_GET['c_wall'] : 'rgb(206, 229, 189)';

            $const_g['light'] = !empty($_GET['light']) ? $_GET['light'] : '1';
            $const_g['light'] = $const_g['light']=='1' ? $const_g['light'] = ' show_light' : '';

            $const_g['light_l'] = !empty($_GET['light_l']) ? $_GET['light_l'] : '';
            $const_g['light_l']= $const_g['light_l']=='1' ? $const_g['light_l'] = ' show_light' : '';

            $const_g['material'] = !empty($_GET['material']) ? $_GET['material'] : 'g';

            $const_g['form'] = !empty($_GET['form']) ? $_GET['form'] : '8';
            $const_g['form'] = (int)$const_g['form'];


            $count_celling = 17;


            $colors['g'] = array(
            '#F6F7F3,L01','#F6F7F3,L100','#E3E3D9,L38','#C2C0B6,L53','#FDD1B0,L23','#FAB99A,L79','#F59795,L24','#FCDED7,L30',
            '#C3C2BF,L54','#8E8D88,L55','#5A5B5B,L28','#262521,L03','#F15A38,L61','#D7182A,L12','#F499B9,L09','#D58E9A,L76',

            '#E4E4E2,L103','#F9F3D7,L57','#F7F1D2,L58','#FCF9E8,L04','#EE7080,L74','#E56299,L75','#CF4087,L10','#CB6C63,L08',

            '#ECDFBF,L29','#E7DFC0,L42','#E3D1AE,L101','#C9B997,L40','#C41F44,L39','#B0004D,L77','#940034,L11','#5C0E33,L25',

            '#D4DAEF,L27','#A698C9,L91','#9F76B4,L406','#85478D,L92','#C9E9E6,L65','#A4DAD2,L33','#87D1D1,L67','#8FA98B,L41',

            '#C1D1E0,L44','#88BADC,L83','#A1DBE4,L26','#94D6DB,L87','#00A071,L72','#60BB46,L21','#93CD82,L68','#BBAF59,L47',

            '#6098C3,L84','#25A8DE,L86','#09A3D3,L17','#1E70B8,L37','#004B43,L19','#00A665,L20','#00A658,L70','#5CC4B7,L407',

            '#0094C0,L85','#0072BC,L16','#0C4DA2,L36','#750C6B,L48','#00586C,L35','#00AB96,L34','#007686,L102','#0097AC,L18',

            '#004A8F,L15','#003878,L88','#032659,L14','#630C67,L51','#FFEC95,L05','#FCB658,L06','#F6E83C,L81','#FFDE00,L31',

            '#F68B1F,L07','#F36F21,L60','#DF6D27,L62','#FFC20E,L82','#E28F38,L59','#A88467,L104','#955436,L64','#A87662,L63',

            '#4E2E25,L105','#3A1916,L45','#3F1A1E,L43','#983F30,L50'
            );

            $colors['m'] = array('#F9FAFC,M01','#F9F8EF,M112','#F6F8F3,M93','#F4F2DD,M99','#E2D5B5,M42','#F5E3E1,M132','#E7CBC8,M30','#F6DDBE,M22','#F4DB98,M95','#F8F4C5,M04','#F1E8A7,M58','#F3E94A,M05','#E6AE37,M82','#928980,M55','#5C5545,M110',
            '#D5D5DD,M27','#D7E4DB,M65','#BFD692,M96'
            );


            $colors['s'] = array('#F6F7F2,SE01','#FBFBFB,S01','#F5F3E6,S99','#F5F3CA,S57','#FCFAE5,S04','#FCF3D6,S58','#E8BD78,S133','#F9EDD5,S22',
            '#F5DAC5,S132','#EDC393,S23','#CB7941,S08','#D7C2AF,S30','#DAE6DA,S65','#DBE6BC,S131','#9EBB79,S41','#DCDFF0,S27',
            '#8AA5D4,S83','#282554,S97','#2F2E33,S03'
            );

            function generate_static_colors($collors){

                $content = '<ul class="colors_grid">';
                $count_color = 1;
                foreach ($collors as $key => $color) {

                    $v_col = explode(',',$color);

                    $content .= '<li class="color_el" color="'.$v_col[0].'">
                        <div class="color_pic" style="background-color:'.$v_col[0].' "></div>
                        <div class="color_title">'.$v_col[1].'</div>
                    </li>';

                    $count_color++;
                }
                $content .= '</ul>';

                echo($content);
            }

            function material_init($const_g,$material){

                if($const_g['material']==$material){
                    echo 'active_m';
                }else{
                    echo '';
                }
            }

            function material_init_r($const_g,$material){

                if($const_g['material']==$material){
                    echo ' checked';
                }else{
                    echo '';
                }
            }



             ?>

            <style>
                .level_1{
                    fill: <?php echo $const_g['level_1']; ?>;
                }

                .level_2{
                    fill: <?php echo $const_g['level_2']; ?>;
                }

                .color_meb{
                    fill: <?php echo $const_g['c_meb']; ?>;
                }

                .svg_wall{
                    background-color: <?php echo $const_g['c_wall']; ?>;
                }

                .celling {
                    background-image: url("construct/celling/<?php echo $const_g['form'] ?>/<?php echo $const_g['material'] ?>-min.png");
                }
            </style>

                <section id="constructor" base_url="" material="<?php echo $const_g['material'] ?>" form="<?php echo $const_g['form'] ?>">
                        
                    <div class="container">
                        <div class="s2_row clearfix">



                        <div class="0_flex_box_center colors_block 0_flex-wrap row">
                            
                           <div class="col-md-6">
                                <div class="row">
                                <div class="col-md-12">
                                    
                                </div>
                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="0_fl-25 b_color_celling col-md-6">
                                            <h3>Цвет первого уровня</h3>
                                            <!-- <div class="color_picker cp_celling_1"></div> -->
                                            <div class="colors_box" level="1">
                                                <div class="colors_group show_colors" group="g"><?php generate_static_colors($colors['g']); ?></div>
                                                <div class="colors_group" group="m"><?php generate_static_colors($colors['m']); ?></div>
                                                <div class="colors_group" group="s"><?php generate_static_colors($colors['s']); ?></div>
                                            </div>

                                        </div>
                                        <div class="0_fl-25 b_color_celling col-md-6">
                                            <h3>Цвет второго уровня</h3>
                                            <!-- <div class="color_picker cp_celling_2"></div> -->
                                            <div class="colors_box" level="2">
                                                <div class="colors_group show_colors" group="g"><?php generate_static_colors($colors['g']); ?></div>
                                                <div class="colors_group" group="m"><?php generate_static_colors($colors['m']); ?></div>
                                                <div class="colors_group" group="s"><?php generate_static_colors($colors['s']); ?></div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                            </div>
                           </div>


                           <div class="col-md-6">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="c_row">
                                             <h3>Материал потолка</h3>
                                             <div class="radio_group">
                                                <div class="radio-item">
                                                    <label value="g" class="m_cel_el <?php  material_init($const_g,'g'); ?> "><input class="" type="radio" name="material" <?php material_init_r($const_g,'g') ?> value="g">Глянец</label>
                                                    <label value="m" class="m_cel_el <?php  material_init($const_g,'m'); ?>"><input class="" type="radio" name="material"  <?php material_init_r($const_g,'m') ?> value="m">Мат</label>
                                                    <label value="s" class="m_cel_el <?php  material_init($const_g,'s'); ?>"><input class="" type="radio" name="material"  <?php material_init_r($const_g,'s') ?> value="s">Сатин</label>
                                                </div>                      

                                                <div class="light_buttons"> 
                                                    <button class="toggle_light">Показать/скрыть светильники</button>
                                                    <button class="toggle_light_l">Показать/скрыть люстру</button> 
                                                </div>

                                            </div>

                                        </div> <!-- material light -->
                                    </div>
                                    <div class="controolls 0_flex_box_center col-md-12">
                                        <div class="0_fl-70">
                                            <h3>Форма потолка</h3>
                                            <div class="f_celling">
                                                <?php 
                                                for($i=1;$i<=$count_celling;$i++){
                                                    $cl_activ_el = '';
                                                    if($i==$const_g['form']){
                                                        $cl_activ_el = 'active_form';
                                                    }

                                                    $image = 'background-image:url(construct/th/'.$i.'.svg)';
                                                    if($i==17){
                                                        $image = '';
                                                    }

                                                    echo('<div class="f_cel_el '.$cl_activ_el.'" style="'.$image.'" value="'.$i.'">'.$i);
                                                        //include ("construct/celling/$i/svg.svg"); 
                                                    echo('</div>');
                                                }
                                                ?>
                                            </div>
                                            
                                        </div>  
                                    </div>
                                </div>
                               <div class="row">
                                    
                                   
                               </div>
                               
                           </div>

                        </div> <!-- colors_block -->

                        <div class="row">
                            <div class="col-md-12">
                                <h3>Фотопечать</h3>
                                <div class="photo_box clear">
                                    <?php 
                                        for ($i=1; $i<=$count_f_bg; $i++) { 
                                            echo('<div class="photo_item" img_id="'.$i.'" style="background-image: url(construct/bg/'.$i.'.jpg);">
                                    </div>');
                                        }
                                    ?>
                                    

                                    


                                </div>
                                
                            </div>
                            <div class="col-md-12">
                                <div class="text-center">
                                    <button class="btn swap_level" level_img="1"><i class="fa fa-retweet" aria-hidden="true"></i> поменять уровни местами</button>
                                    <!--<div class="light_on_controll">
                                        <button class="btn set_on_light" light="cold"><i class="fa fa-lightbulb-o" aria-hidden="true"></i><span>Холодный белый свет</span></button>
                                        <button class="btn set_on_light" light="warm"><i class="fa fa-lightbulb-o" aria-hidden="true"></i><span>Теплый свет</span></button>
                                        <button class="btn set_on_light" light="white"><i class="fa fa-lightbulb-o" aria-hidden="true"></i><span>Естественно белый</span></button>


                                    </div>-->
                                </div>
                            </div>
                        </div>


                        
                        <div class="_flex_box_center construct_main_box">
                            <div class="c_center clear">
                                
                                <div class="construct_box">
                                    <!-- <div></div> -->
                                    <div class="svg_wall"></div>
                                    <div class="video_bg">
                                        <video class="covervid-video2" autoplay="" loop="" muted="" poster="">
                                                <source src="construct/video/4.mp4" type="video/mp4">
                                                
                                        </video>
                                    </div>
                                    <div class="svg_meb"><?php include "construct/int/2/meb.svg"; ?></div>
                                    <div class="logo_company">
                                        <!--<div class="logo_img"></div>-->
                                        <!-- <div class="logo_sliders">
                                            
                                            <div>
                                                <div class="ls_item" style="background-image: url(construct/bg/1.jpg)"></div>
                                            </div>
                                            <div>
                                                <div class="ls_item" style="background-image: url(construct/bg/2.jpg)"></div>
                                            </div>
                                            <div>
                                                <div class="ls_item" style="background-image: url(construct/bg/3.jpg)"></div>
                                            </div>
                                            <div>
                                                <div class="ls_item" style="background-image: url(construct/bg/4.jpg)"></div>
                                            </div>
                                            <div>
                                                <div class="ls_item" style="background-image: url(construct/bg/5.jpg)"></div>
                                            </div>
                                            <div>
                                                <div class="ls_item" style="background-image: url(construct/bg/6.jpg)"></div>
                                            </div>
                                            <div>
                                                <div class="ls_item" style="background-image: url(construct/bg/7.jpg)"></div>
                                            </div>



                                        </div>  -->
                                        <div class="logo_info">
                                            Ваш <br>логотип
                                        </div>
                                        <!--<div class="logo_overlay"></div>   -->
                                    </div>
                                    <div class="controlls_btn">
                                        
                                        <button class="btn btn-success btn_open_modal_zam">Вызов замерщика</button>
                                    </div>
                                    <div class="svg_celling">
                                        <?php 
                                        for ($i=1;$i<=$count_celling;$i++){
                                            $active_form_x = '';
                                            if( $i==$const_g['form'] ){
                                                $active_form_x = ' show_layer';
                                            }

                                            echo('<div calling_id="'.$i.'" id="cell_n_'.$i.'" class="celling_layer '.$active_form_x.'">');
                                            // include ("construct/celling/$i/svg.svg");   
                                            $svg_c = file_get_contents("construct/celling/$i/svg.svg");
                                            echo(str_replace('</svg>', '', $svg_c));

                                            echo('
                                                <defs>
                                                ');

                                            for($im=1;$im<=$count_f_bg;$im++){
                                                // echo('
                                                //     <pattern id="bg'.$i.'_'.$im.'" x="0" y="-20%" height="100%" width="100%">
                                                //   <image x="0" width="2200" height="1200" y="0" xlink:href="construct/bg/'.$im.'.jpg"></image>
                                                // </pattern>
                                                // ');

                                                echo('
                                                    <pattern id="bg'.$i.'_'.$im.'" x="-5%" y="-20%" patternTransform="scale(1)" patternUnits="userSpaceOnUse" height="700" width="2200" viewBox="64 0 1900 1200" preserveAspectRatio="none">
                                                  <image x="0" width="100%" height="100%" y="0" xlink:href="construct/bg/'.$im.'.jpg"></image>
                                                </pattern>
                                                ');

                                            }

                                                echo('
                                                </defs>
                                                ');
                                            echo('</svg>');
                                            echo('</div>');
                                        }
                                        ?>
                                    </div>

                                    <div class="int"></div>
                                    <div class="celling"></div>
                                    <div class="light <?php echo $const_g['light'] ?>"></div>
                                    <div class="light_l <?php echo $const_g['light_l'] ?>"></div>
                                    <div class="light_on"></div>
                                </div>
                                <div class="controlls_int">
                                    <div class=" b_color_int ">
                                        <h3 class="text-center">цвет стен</h3>
                                        <div class="color_picker cp_wall"></div>
                                    </div>
                                    <div class="text-center">
                                        <button class="btn btn-primary select_oboi">Выбрать обои</button>
                                    </div>
                                    <div class=" b_color_int ">
                                        <h3 class="text-center">цвет мебели</h3>
                                        <div class="color_picker cp_meb"></div>
                                    </div>
                                </div>
                            </div> <!-- c_center -->
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <h3>Популярный выбор клиентов </h3>
                                <div class="pressets_box clear">
                                    
                                    <?php 
                                        for($i=1;$i<=4;$i++){
                                            echo('
                                                <div class="presset_item" presset_id="'.$i.'" style="background-image: url(construct/pressets/'.$i.'.jpg)">
                                                </div>
                                            ');
                                        }
                                    ?>
                                    




                                </div>
                            </div>
                        </div>
                            

                            



                        </div> <!-- s2_row -->
                    </div> <!-- container -->
                </section>


        </div>

        
        

    </div>


   <div class="modals an-down" modal-id="modal_get_zam">
      <div class="modal_back"></div>
        <div class="modal_box modal_get_zam">
            <div class="close_modal" modal-action="closer">
              <i class="bi_interface-cross"></i>
            </div>

          <div class="modal_title">Вызвать замерщика</div>
          <p class="modal_description text-center">Оставьте заявку на вызов замерщика</p>
          <form action="" class="ajax-form required form-small" func_after="fn_after_get_zam" func="get_zam" callback="fn_success">
                  
                  <div class="form-group required">
                      <label for="">Ваше имя</label>
                    <div class="form_control">
                        <input type="text" name="user_name" class="form-control required" placeholder="Введите Ваше имя">
                    </div>
                  </div>
                  
                  <div class="form-group required">
                    <label for="">Ваш телефон</label>
                    <div class="form_control">
                        <input type="text" name="user_phone" class="form-control required" placeholder="Введите Ваш телефон">
                    </div>
                  </div>

                  <!-- <div class="form-group">
                    <label for="">Ваш email</label>
                    <div class="form_control">
                        <input type="text" name="user_email" class="form-control" placeholder="Введите Ваш email">
                    </div>
                  </div> -->

                  <div class="form-group required">
                    <label for="">Дата и время замера</label>
                    <div class="form_control">
                        <input type="text" name="user_time" class="form-control required" placeholder="Укажите удобное время для замера">
                    </div>
                  </div>
                  
                  <div class="form-group required">
                    <label for="">Ваш адрес</label>
                    <div class="form_control">
                        <!-- <input type="text" name="user_time" class="form-control required" placeholder="Укажите удобное время, для замера"> -->
                        <textarea type="text" name="user_adress" class="form-control required" placeholder="Укажите Ваш адрес"></textarea>
                    </div>
                  </div>

                  
                  
                  
                  <div class="form-group text-center">
                      <button class="btn btn-success btn_primary  btn_small" type="submit">Отправить</button>
                  </div>
                  
              </form>

        </div>
    </div>

    <div class="modals an-down" modal-id="modal_order">
      <div class="modal_back"></div>
        <div class="modal_box modal_order">
            <div class="close_modal" modal-action="closer">
              <i class="bi_interface-cross"></i>
            </div>

          <div class="modal_title">Заявка на консультацию</div>
          <p class="modal_description text-center">Оставьте заявку на консультацию. Наш специалист перезвонит Вам и ответит на интересующий Вас вопрос.</p>
          <form action="" class="ajax-form required form-small" func="send_email" callback="fn_success">
                  
                  <div class="form-group required">
                      <label for="">Ваше имя</label>
                    <div class="form_control">
                        <input type="text" name="user_name" class="form-control required" placeholder="Введите Ваше имя">
                    </div>
                  </div>
                  
                  <div class="form-group required">
                    <label for="">Ваш телефон</label>
                    <div class="form_control">
                        <input type="text" name="user_phone" class="form-control required" placeholder="Введите Ваш телефон">
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="">Ваш сайт</label>
                    <div class="form_control">
                        <input type="text" name="site_name" class="form-control" placeholder="Введите адрес сайта">
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="">Ваш email</label>
                    <div class="form_control">
                        <input type="text" name="user_email" class="form-control" placeholder="Введите Ваш email">
                    </div>
                  </div>
                  
                  
                  
                  <div class="form-group text-center">
                    <input type="hidden" value="Конструктор потолков. Консультация." name="theme_msg">
                      <button class="btn btn-success btn_primary  btn_small" type="submit">Отправить</button>
                  </div>
                  
              </form>

        </div>
    </div>
    <div class="modals an-down" modal-id="modal_success">
        <div class="modal_back"></div>
        <div class="modal_box modal_success">
            <div class="close_modal" modal-action="closer">
              <i class="bi_interface-cross"></i>
            </div>

            <div class="modal_title">Спасибо за заявку!</div>
            <p class="modal_description text-center">Наш менеджер перезвонит Вам в ближайшее время</p>


        </div>
    </div>





    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->

    <script src="libs/moment/moment-with-locales.js"></script>
    <script src="libs/datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
    
    <script src="bootstrap/js/bootstrap.min.js"></script>

    <script src="libs/farbtastic/farbtastic.js"></script>
    <script src="libs/modals/modals.js"></script>
    <script src="libs/input_mask/js/jquery.inputmask.js"></script>
    <script src="js/construct.js"></script>


    <!-- <script src="libs/modals/modals.js"></script>
    <script src="libs/ajax/ajax.js"></script>
    <script src="libs/input_mask/js/jquery.inputmask.js"></script>
    <script src="libs/forms/forms.js"></script> -->


    <!-- <script src="js/main.js"></script> -->
    <?php include "vendor_c.php"; ?>
  </body>
</html>

