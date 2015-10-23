tinyMCEPopup.requireLangPack();

var data = {center: "68.962086,33.07936", zoom: 13, width: 438, height: 230, map_type: "yandex#map",baloon_title: "",baloon_descr: ""};
var YandexMaps = {

  init: function(ed) {

    var dom = ed.dom, node = ed.selection.getNode(), JSON = tinymce.util.JSON;

    if (dom.hasClass(node, "mceItemYandexMap"))
    {
      if (data = dom.getAttrib(node, 'data-mce-json'))
      {
        data = JSON.parse(data);
        data.baloon_title=unescape(data.baloon_title);
        data.baloon_descr=unescape(data.baloon_descr);
      }
    }

    document.getElementById("coords").value=data.center;        
    document.getElementById("width").value=data.width;
    document.getElementById("height").value=data.height;
    document.getElementById("baloon_title").value=data.baloon_title;
    document.getElementById("baloon_descr").value=data.baloon_descr;
    
    var sel=document.getElementById("map_type");    
    for (var i = 0, j = sel.options.length; i < j; ++i) {      
      if (sel.options[i].value === data.map_type) {
        sel.selectedIndex = i;
        break;
      }
    }    
    ymaps.ready(init);

  },

  insert: function() {

    var frm = document.forms[0];

    var center = map.getCenter();
    var zoom = map.getZoom();    
    var width = frm.width.value;
    var height = frm.height.value;    
    var map_type = frm.map_type.value;
    var baloon_title = frm.baloon_title.value;
    var baloon_descr = frm.baloon_descr.value;

    if (isNaN(width))
      width = 438;

    if (isNaN(height))
      height = 230;

    tinyMCEPopup.execCommand('mceInsertContent', false, tinyMCEPopup.editor.plugins.yandexmaps.convert_data_to_image({
        center: center,
        zoom: zoom,
        width: width,
        height: height,
        map_type: map_type,
        baloon_title: baloon_title,
        baloon_descr: baloon_descr
    }, tinyMCEPopup.editor));
    tinyMCEPopup.close();
  }
};
tinyMCEPopup.onInit.add(YandexMaps.init, YandexMaps);

var map;
function init()
{   
  map=new ymaps.Map("yandex_map", {    
    center: data.center.split(","),
    zoom: data.zoom,
    type: data.map_type,
    behaviors: ['default','scrollZoom']
  });
  map.controls.add('smallZoomControl');
  set_baloon(data.baloon_title,data.baloon_descr);
}
function set_map_type(type)
{
  map.setType(type);
  set_max_zoom();
}
function set_max_zoom()
{ 
  map.zoomRange.get(map.getCenter()).then(function (zoomRange) {    
    map.setZoom(zoomRange[1]);
  });
}
function set_coords(coords)
{
  var coords=coords.split(",");
  map.setCenter(coords);
  set_max_zoom();
}
function set_address(addr)
{
  ymaps.geocode(addr, {
    results: 1
  }).then(
    function (res) {
      var objs=res.geoObjects;
      if (objs.getLength()==0)
      {
        tinyMCEPopup.alert(tinyMCEPopup.getLang('yandexmaps_dlg.error_geocoder'));      
      }
      else
      {
        map.setBounds(objs.get(0).geometry.getBounds());        
        document.getElementById("coords").value=map.getCenter();
        set_max_zoom();
      }
    },
    function (err) {
       tinyMCEPopup.alert(tinyMCEPopup.getLang('yandexmaps_dlg.error_geocoder'));
    }
  );
}
function set_size(width,height)
{
  if (!isNaN(width))  
    document.getElementById('yandex_map').style.width = width + "px";
  if (!isNaN(height))
    document.getElementById('yandex_map').style.height = height + "px";
  map.container.fitToViewport();  
}
function set_baloon(title,descr)
{
  if (title=="")
    return;
  map.balloon.open(map.getCenter(), {
    content: '<div><b>'+title+'</b></div><p>'+descr+'</p>'
  },{
    closeButton: true
  });
}




