ymaps.ready(init);
function init(){
    
    var myMap = new ymaps.Map("map", {
      
        center: [56.13884906858732,40.42537349999994],
       
        zoom: 17 ,
        controls: []
    });


myMap.geoObjects.add(new ymaps.Placemark([56.13884906858732,40.42537349999994],{},    
    {
   preset: 'islands#redDotIcon'
}));
}

/*<script src="https://api-maps.yandex.ru/2.1/?apikey=2c9fc255-b8bd-4659-b9e6-44bb0b42eec1&lang=ru_RU"
        type="text/javascript"></script>
        <script src="js/map.js"></script>*/