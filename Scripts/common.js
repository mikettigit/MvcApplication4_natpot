function init_yandex_maps()
{
  $(".yandex_map").each(function() {
    var el=$(this);
    var map=new ymaps.Map(el.get(0), {
      center: el.data("center").split(","),
      zoom: el.data("zoom"),
      type: el.data("map-type"),
      behaviors: ["default","scrollZoom"]
    });
    map.controls.add("smallZoomControl");
    if (el.data("baloon-title")!="")
    {
      map.balloon.open(map.getCenter(), {
        content: "<div><b>"+el.data("baloon-title")+"</b></div>"+(el.data("baloon-descr")!=""?"<p>"+el.data("baloon-descr")+"</p>":"")
      },{
        closeButton: true
      });
    }
  });
}

$(document).ready(function() {

  $(".coolimage").fancybox({
    helpers : {
      title : {
        type : 'inside'
      }
    }
  });
  if ($(".yandex_map").length>0)
  {
    var script=document.createElement('script');
    script.type='text/javascript';
    script.src="http://api-maps.yandex.ru/2.0/?load=package.standard&lang=ru-RU&onload=init_yandex_maps";
    $("body").append(script);
  }

  $(".akcia3").hover(
          function () { $(this).find('.dropdown').stop().show(300); },
          function () { $(this).find('.dropdown').stop().hide(0); }
  );

});