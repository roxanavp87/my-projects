/**
 * Created by roxana on 4/29/17.
 */


$('document').ready(function () {
    'use strict';

    // Declarations for Google Map API
    var map, lat, lng, mapOptions, marker, infowindow;

    //Declarations for weather API
    var object, city = "San Antonio, TX", url = "http://api.openweathermap.org/data/2.5/forecast/daily";
    var weatherOptions = {
        APPID: "daccf0a60cafe2bdc646583c5f8fbdbb",
        q: city,
        cnt: 16,
        units: "imperial"
    };

    function updateInfoWindow() {
        var content = '';
        content  = '<b style="font-size: 15px">Today </b>';
        content += '<br> <img src="http://openweathermap.org/img/w/' + object.list[0].weather[0].icon + '.png">';
        content += '<br>' + parseInt(object.list[0].temp.max) + '&deg;' + '/' + parseInt(object.list[0].temp.min) + '&deg;'+ '</b>';
        infowindow = new google.maps.InfoWindow({
            content: content
        });
        infowindow.open(map, marker);
    }

    function renderMap(lat, lng) {
        mapOptions = {
            zoom: 8,
            center: {lat: lat, lng: lng}
        };
        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        marker = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: {lat: lat, lng: lng}
        });

        updateInfoWindow();
    }

    function update3DaysForecast(data) {
        console.log(data);

        data.list.forEach(function (list, index) {
            var output = '';
            output = getDate(index);
            output += '<br> <img src="http://openweathermap.org/img/w/' + list.weather[0].icon + '.png">';
            output += '<br><b class="temp">' + parseInt(list.temp.max) + '&deg;' + '/' + parseInt(list.temp.min) + '&deg;'+ '</b>';
            output += '<br>' + firstLetterUpperCase(list.weather[0].description);
            output += '<br><img class="icons" src="img/humidity.png">' + list.humidity + '%';
            output += '<br><img class="icons" src="img/wind.png"> ' + degToCompassDir(list.deg)+ ' ' + parseInt(list.speed) + ' MPH';
            output += '<br><a class="more">More</a>';
            output += '<div class="more-info"><img class="icons" src="img/pressure.png"> ' + parseInt(list.pressure) + ' hPa';
            output += '<br><img class="icons" src="img/cloudiness.png"> ' + list.clouds + ' %';
            output += '<br><a class="less">Less</a></div>';
            $('#day' + (index+1)).html(output);
        });

        $('#city').text(data.city.name);

        //Update global variables
        lat = data.city.coord.lat;
        lng = data.city.coord.lon;
        object = data;

        //Update background to current weather
        $('body').css('background-image', 'url("img/' + (data.list[0].weather[0].main).toLowerCase() + '.gif")');
    }

    function updateForecastAndMap(data) {
        update3DaysForecast(data);

        renderMap(lat, lng);

        marker.addListener('click', markerBounceAnimation);

        marker.addListener('dragend', function(event){
            markerDragEnd(event);
        });
    }

    function markerBounceAnimation() {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }

    function markerDragEnd(event) {

        weatherOptions.lat = event.latLng.lat();
        weatherOptions.lon = event.latLng.lng();
        delete weatherOptions.q;

        $.get(url, weatherOptions).done(function (data) {
            update3DaysForecast(data);
            updateInfoWindow();
        });
    }

    function getDate(day) {  //today: day=0, tomorrow: day=1, dayAfterTomorrow: day=2 ...
        var today = new Date(), date, indexDayOfWeek;
        var dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
        var month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        if(day != 0) {
            day = new Date(today.getTime() + day * (24 * 60 * 60 * 1000));
            indexDayOfWeek = day.getDay();
            date = month[day.getMonth()] + ' ' + day.getDate();
            return '<span class="dayOfWeek">' + dayOfWeek[indexDayOfWeek] + '</span> <br>' + date;
        } else {
            return '<span class="dayOfWeek"> Today </span> <br>' + month[today.getMonth()] + ' ' + today.getDate();
        }
    }

    function degToCompassDir(deg) {
        var compassDir = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"];
        return compassDir[Math.round(deg/22.5)];
    }

    function firstLetterUpperCase(string) {
        return (string.substring(0,1)).toUpperCase() + string.substring(1,string.length);
    }

    function toggleColClass(days, cols) {
        for(var i=1; i<=days; i++) {
            if(days % 4 === 0) {
                $('#day' + i).toggleClass('col-xs-6 col-sm-' + cols + ' hide');
            } else {
                $('#day' + i).toggleClass('col-xs-' + cols + ' hide');
            }
        }
    }


    $.get(url, weatherOptions).done(function (data) {

        //Update 3 days forecast and google maps
        updateForecastAndMap(data);


        $('.forecast').click(function () {
            //Update background when it clicked a forecast
            $('body').css('background-image', 'url("img/' + (object.list[$(this).attr('data-day')].weather[0].main).toLowerCase() + '.gif")');
        });

        $('#btn-go').click(function (event) {
            event.preventDefault();
            weatherOptions.q = $('#search').val();
            delete weatherOptions.lat;
            delete weatherOptions.lng;

            $.get(url, weatherOptions).done(function (data) {
                //Update 3 days forecast and google maps
                updateForecastAndMap(data);
            });
        });

        $('.options').click(function () {

            $('.options').each(function (i, option) {
                $(option).removeClass('active');
            });
            $(this).addClass('active');

            $('.forecast').removeClass('col-xs-12 col-xs-6 col-xs-4 col-xs-3 col-sm-3').addClass('hide');

            switch ($(this).attr('data-option')) {
                case '1':                                 //Today
                    $('#day1').toggleClass('col-xs-12 hide');
                    break;
                case '3':                                 //3 days forecast
                    toggleColClass(3, 4);
                    break;
                case '4':                                 //4 days forecast
                    toggleColClass(4, 3);
                    break;
                case '6':                                 //6 days forecast
                    toggleColClass(6, 4);
                    break;
                case '8':                                 //8 days forecast
                    toggleColClass(8, 3);
                    break;
                case '16':                                 //16 days forecast
                    toggleColClass(16, 3);
                    break;
            }
        });

        $('.more').click(function (event) {
            event.preventDefault();
            $('.more').next().slideToggle();
            $('.more').slideToggle();
        });

        $('.less').click(function (event) {
            event.preventDefault();
            $('.less').parent().slideToggle();
            $('.less').parent().prev().show();
        });

    });

});
