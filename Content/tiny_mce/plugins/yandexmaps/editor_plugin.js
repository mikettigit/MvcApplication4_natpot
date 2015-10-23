(function() {

  tinymce.PluginManager.requireLangPack('yandexmaps');

  var Node = tinymce.html.Node;
  var Styles = tinymce.html.Styles;
  var JSON = tinymce.util.JSON;
  
  tinymce.create('tinymce.plugins.YandexMapsPlugin',
  {
    init: function(ed, url)
    {
      var self = this;
      this.editor = ed;
      this.url = url;      

      ed.onPreInit.add(function() {
                
        ed.serializer.addNodeFilter('img', function(nodes, name, args) {
          var i = nodes.length, node;          
          while (i--) {
            node = nodes[i];
            if ((node.attr('class')) && (node.attr('class').substring(0,16) == "mceItemYandexMap"))
            {
              self.convert_image_to_div(node);
            }
          }
        });

        ed.parser.addNodeFilter('div', function(nodes) {
          var i = nodes.length;
          while (i--) {
            node = nodes[i];            
            if ((node.attr('class')) && (node.attr('class').substring(0,10) == "yandex_map"))
            {              
              self.convert_div_to_image(node, ed);
            }
          }
        });
        
      });
      
      ed.addCommand('YandexMaps', function() {
        ed.windowManager.open({ file: url + '/yandexmaps.htm', width: 505, height: 625, inline: 1 }, { plugin_url: url });
      });
      
      ed.addButton('yandexmaps', { title: 'yandexmaps.desc', cmd: 'YandexMaps', image: url + '/img/map.gif' });

      ed.onNodeChange.add(function(ed, cm, node) {
        cm.setActive('yandexmaps', (ed.selection.getNode().nodeName == "IMG") && (ed.dom.hasClass(node, 'mceItemYandexMap')));
      });

    },

    convert_data_to_image : function(data, ed) {
      var html = '<img data-mce-src="' + ed.theme.url +'/img/trans.gif" src="' + ed.theme.url +'/img/trans.gif" class="mceItemYandexMap mceItemVisualAid" style="display: block; border:1px dotted #cc0000; background-position:center; background-repeat:no-repeat; background-color:#ffffcc; background-image:url(' + this.url + '/img/map_logo.gif)" ';
      html += 'data-mce-json="{' + "'center':'" + data.center + "', 'width':'" + data.width + "', 'height':'" + data.height + "', 'zoom':'" + data.zoom + "', 'map_type':'" + data.map_type + "', 'baloon_title':'" + escape(data.baloon_title) + "','baloon_descr':'" + escape(data.baloon_descr) + "'}";
      html += '" width="' + data.width + '" height="' + data.height + '">';
      return html;
    },

    convert_image_to_div : function(node) {

      var data, div;

      if (!(data = node.attr('data-mce-json')))
        return;

      data = JSON.parse(data);
      
      div = new Node('div', 1);

      div.attr({
        'data-center':data.center,
        'data-zoom':data.zoom,
        'data-map-type':data.map_type,
        'data-baloon-title':unescape(data.baloon_title),
        'data-baloon-descr':unescape(data.baloon_descr),
        'class':'yandex_map',
        'style':'width: ' + data.width + 'px; height: ' + data.height + 'px;'
      });
      
      node.replace(div);
    },

    convert_div_to_image : function(node, ed) {
      
      var styles, data, image;
      
      styles = (new Styles()).parse(node.attr("style"));
      
      data = {
        center: node.attr("data-center"),
        zoom: node.attr("data-zoom"),
        map_type: node.attr("data-map-type"),
        baloon_title: node.attr("data-baloon-title"),
        baloon_descr: node.attr("data-baloon-descr"),
        width: parseInt(styles.width, 10),
        height: parseInt(styles.height, 10)
      };      
      image = (new Node('img',1)).attr({
        width : data.width + "px",
        height : data.height + "px",
        style : 'display: block; border:1px dotted #cc0000; background-position:center; background-repeat:no-repeat; background-color:#ffffcc; background-image:url(' + this.url + '/img/map_logo.gif)',
        src : ed.theme.url + '/img/trans.gif',
        'class' : 'mceItemYandexMap mceItemVisualAid',
        'data-mce-json' : JSON.serialize(data, "'")
      });      
      node.replace(image);
    }

  }),
    
  tinymce.PluginManager.add('yandexmaps', tinymce.plugins.YandexMapsPlugin);

})();

