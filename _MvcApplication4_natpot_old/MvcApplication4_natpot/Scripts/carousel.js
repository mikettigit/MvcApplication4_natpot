/********************************************************/
/*                                                      */
/* ��� ������������ ������� ���������� ����������       */
/* ��������� � ������� � ���� ������������� ������:     */
/*                                                      */
/*  <div class="container">                             */
/*                <ul class="carousel">                 */
/*                        <li>1</li>                    */
/*                        <li>2</li>                    */
/*                        <li>3</li>                    */
/*                        <li>4</li>                    */
/*                        <li>5</li>                    */
/*                        <li>6</li>                    */
/*                </ul>                                 */
/*    </div>                                            */
/* ����� ���� ����� ������� ��������� ��� ������������� */
/* �������    $(window).load(function() {                                          */
/* $('.container').Carousel({                           */
/*  visible: 'auto',//���������� ������������ �� ������ */
/*  rotateBy: 1, //������������ �� 1                    */
/*  speed: 1000, //�������� 1 �������                   */
/*  btnNext: null, // ������ ������ �� ���������        */
/*  btnPrev: null, // ������ ����� �� ���������         */
/*  auto: true, // ���� ��������� ��������              */
/*  margin: 0, // ������ ����� ���������               */
/*  position: "h",// ������������ �� �����������        */
/*  dirAutoSlide: false //����������� ��������          */
/*  });                                                 */
/*  ��� ������������ ��������� �� ���������             */
/*  $('.container').Carousel();                         */
/*                                                      */
/********************************************************/
(function($) {
  $.fn.Carousel = function(options) {
    // ��������� �� ���������
    var settings = {
      visible: 'auto', //���������� ������������ �� ������
      rotateBy: 1, //������������ �� 1
      speed: 1000, //�������� 1 �������
      btnNext: null, // ������ ������ �� ���������
      btnPrev: null, // ������ ����� �� ���������
      auto: true, // ���� ��������� ��������
      margin: 0, // ������ ����� ���������
      position: "h", // ������������ �� �����������
      dirAutoSlide: false //����������� �������� ������ ��� �������������
    };

    return this.each(function() {
      if (options) {
        $.extend(settings, options); //������������� ���������������� ���������
      }

      // ���������� ����������
      var $this = $(this);//������������ ������� (���� � ������� ��������� ��������)
      var $carousel = $this.children(':first');// �������� �������� ������� (UL) �.�. ���� ��������

      $carousel.css({
          'margin': 0,
          'padding': 0,
          'list-style': 'none', // ������� ������ ������
          'width': 'auto'
      });
      $carousel.children('li').css({
        'float': 'left'
      });



      // ����������� �������� �� ������������ ������,
      // � ��������� �������, ����� �������� ������ ��� ������
      if(settings.visible === 'auto'){
        var width = $this.width();
        settings.visible = Math.floor(width/($carousel.children().outerWidth() + settings.margin));
        settings.margin = Math.floor((width - settings.visible*($carousel.children().outerWidth() + settings.margin))/settings.visible);
      }

      var itemWidth = $carousel.children().outerWidth() + settings.margin; // ��������� ������ ��������

      var itemHeight = $carousel.children().outerHeight() + settings.margin;// ��������� ������ ��������
      var itemsTotal = $carousel.children().length; // �������� ����� ���������� ��������� � ��������
      var running = false; // ������������� �������
      var intID = null; // �������� ��������
      var size = itemWidth; // size - ������ ��� ���������� �����, ������� �� ���������� ��������



      // ���� ���������� ��������� ������, ��� ������ ������������ � ���, �������� ������ ����������
      if(settings.visible>=itemsTotal){
        $(settings.btnNext).css({'display': 'none'});
        $(settings.btnPrev).css({'display': 'none'});
        return false;
      }

      if (settings.position == "v")
        size = itemHeight;
      //���� �������� ������������ ��
      if (settings.position == "v")
        $this.css({
          'position': 'relative', // ���������� ��� ����������� ����������� � ��6(7)
          'overflow': 'hidden', // ������ ���, ��� �� ������� � ���������
          'height': settings.visible * size + 'px', // ����� ���������� ������ ������ ������ ���� ������� ���������
          'width': itemWidth - settings.margin //������ ���������� ����� ������ ��������
        });
      else
        $this.css({
          'float': 'right',
          'position': 'relative', // ���������� ��� ����������� ����������� � ��6(7)
          'overflow': 'hidden', // ������ ���, ��� �� ������� � ���������
          'width': settings.visible * size + 'px', // ������ ���������� ������ ������ ������ ���� ������� ���������
//          'height': itemHeight - settings.margin
        });


      //��������� ���������� ����� �� ������� ��������
      if (settings.position == "v")
        $carousel.children('li').css({
          'margin-top': settings.margin / 2 + 'px',
          'margin-bottom': settings.margin / 2 + 'px',
          'float': 'left',
          'width': '60px',
          'height': '40px',
          'padding': '5px',
          'background': '#E2E2E2',
          'font': '20px Calibry italic',
          'color': 'green',
          'border': 'gray 1px solid'
        });
      else
        $carousel.children('li').css({
          'margin-left': settings.margin / 2 + 'px',
          'margin-right': settings.margin / 2 + 'px',
        });
      // � ����������� �� ����������, ����������� ����� ��� ������ ��������
      if (settings.position == "v")
        $carousel.css({
          'position': 'relative', // ��������� ����� �� ���
          'height': 9999 + 'px', // ����������� ���� ��������
          'left': 0,
          'top': 0
        });
      else
        $carousel.css({
          'position': 'relative', // ��������� ����� �� ���
          'width': 9999 + 'px', // ����������� ���� ��������
          'top': 0,
          'left': 0
        });

      //��������� �������� � ����������� dir [true-������; false-�����]
      function slide(dir) {
        var direction = !dir ? -1 : 1; // ������������� �������� �����������
        var Indent = 0; // �������� (��� ul)
        if (!running) {
          // ���� �������� ��������� (��� ��� �� ��������)
          running = true; // ������ ������, ��� �������� � ��������
          if (intID) { // ���� ������� ��������
            window.clearInterval(intID); // ������� ��������
          }
          if (!dir) { // ���� �� ������ � ���������� �������� (��� �� ���������)
            /*
             * ��������� ����� ���������� �������� ��������
             * ����� �������� ���������, ������� ������
             * � ��������� rotateBy (�� ��������� ����� ���� �������)
             */
            $carousel.children(':last').after($carousel.children().slice(0, settings.rotateBy).clone(true));
          } else { // ���� ������ � ����������� ��������
            /*
             * ��������� ����� ������ ��������� ��������
             * ����� �������� ���������, ������� ������
             * � ��������� rotateBy (�� ��������� ����� ���� �������)
             */                                                $carousel.children(':first').before($carousel.children().slice(itemsTotal - settings.rotateBy, itemsTotal).clone(true));
            /*
             * �������� �������� (<ul>)  �� ������/������  ��������,
             * ���������� �� ���������� ���������, ��������
             * � ��������� rotateBy (�� ��������� ����� ���� �������)
             */
            if (settings.position == "v")
              $carousel.css('top', -size * settings.rotateBy + 'px');
            else
              $carousel.css('left', -size * settings.rotateBy + 'px');
          }

          /*
           * �����������  ��������
           * ������� ��������  + ������/������  ������ �������� * ���������� ������������� ��������� * �� ����������� ����������� (1 ��� -1)
           */
          if (settings.position == "v")
            Indent = parseInt($carousel.css('top')) + (size * settings.rotateBy * direction);
          else
            Indent = parseInt($carousel.css('left')) + (size * settings.rotateBy * direction);

          if (settings.position == "v")
            var animate_data = {'top': Indent};
          else
            var animate_data = {'left': Indent};

          // ��������� ��������
          $carousel.animate(animate_data, {queue: false, duration: settings.speed, complete: function() {
              // ����� �������� ���������
              if (!dir) { // ���� �� ������ � ���������� �������� (��� �� ���������)
                // ������� ������� ������ ���������, ������� ������ � rotateBy
                $carousel.children().slice(0, settings.rotateBy).remove();
                // ������������� ����� � ����
                if (settings.position == "v")
                  $carousel.css('top', 0);
                else
                  $carousel.css('left', 0);
              } else { // ���� ������ � ����������� ��������
                // ������� ������� ��������� ���������, ������� ������ � rotateBy
                $carousel.children().slice(itemsTotal, itemsTotal + settings.rotateBy).remove();
              }
              if (settings.auto) { // ���� �������� ������ ������������� �������������
                // ��������� ����� ������� ����� �������� ������� (auto)
                intID = window.setInterval(function() {
                  slide(settings.dirAutoSlide);
                }, settings.auto);
              }
              running = false; // ��������, ��� �������� ���������
            }});
        }
        return false; // ���������� false ��� ����, ����� �� ���� �������� �� ������
      }

      // ��������� ���������� �� ������� click ��� ������ "������"
      $(settings.btnNext).click(function() {
        return slide(false);
      });

      // ��������� ���������� �� ������� click ��� ������ "�����"
      $(settings.btnPrev).click(function() {
        return slide(true);
      });

      if (settings.auto) { // ���� �������� ������ ������������� �������������
        // ��������� ����� ������� ����� ��������� ��������
        intID = window.setInterval(function() {
          slide(settings.dirAutoSlide);
        }, settings.auto);
      }
    });
  };
})(jQuery);