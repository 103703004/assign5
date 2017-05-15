/*
Skycons is a set of ten animated weather glyphs, procedurally generated by JavaScript using the HTML5 canvas tag.
http://darkskyapp.github.io/skycons/
*/

var skycons = new Skycons();

// you can add a icon to a html canvas. simply supply its element id and the weather you want to show.
skycons.add("today", Skycons.PARTLY_CLOUDY_DAY);
skycons.add("day1", Skycons.CLEAR_DAY);
skycons.add("day2", Skycons.CLOUDY);
skycons.add("day3", Skycons.RAIN);

// start all icons animation!
skycons.play();

// update a icon on  canvas by its id
//skycons.set("today", Skycons.PARTLY_CLOUDY_NIGHT);

/*
Get value from Bootstrap dropdown menu
*/
$('#dropdown li').on('click', function () {
    //alert($(this).text());
    $("#city").text($(this).text());
    //console.log($(this).text().substr(0,3));
    var url = findUrl($(this).text().substr(0, 3));
    $.getJSON(url, function (data) {
        if (data.query.results) { // if data.query.results exist , do the following action.
            callback2(data)
        } else {
            console.info("reloading : ", url)
            getJsonUntilSuccess(url, callback2)
        }
    });
});

function callback2(data) {
    var c = tempFtoC(data.query.results.channel.item.condition.temp);
    $(".temperature").text(c);
    $(".date").text(data.query.results.channel.item.forecast[0].date + ": ");
    $("#weather").text(data.query.results.channel.item.forecast[0].text);
    $("#first").text(data.query.results.channel.item.forecast[1].date);
    $("#second").text(data.query.results.channel.item.forecast[2].date);
    $("#third").text(data.query.results.channel.item.forecast[3].date);
    var lowC = tempFtoC(data.query.results.channel.item.forecast[1].low);
    var highC = tempFtoC(data.query.results.channel.item.forecast[1].high);
    $("#firstTemp").text(lowC + "-" + highC);
    lowC = tempFtoC(data.query.results.channel.item.forecast[2].low);
    highC = tempFtoC(data.query.results.channel.item.forecast[2].high);
    $("#secondTemp").text(lowC + "-" + highC);
    lowC = tempFtoC(data.query.results.channel.item.forecast[3].low);
    highC = tempFtoC(data.query.results.channel.item.forecast[3].high);
    $("#thirdTemp").text(lowC + "-" + highC);
    skycons.set("today", getCode(data.query.results.channel.item.forecast[0].code));
    skycons.set("day1", getCode(data.query.results.channel.item.forecast[1].code));
    skycons.set("day2", getCode(data.query.results.channel.item.forecast[2].code));
    skycons.set("day3", getCode(data.query.results.channel.item.forecast[3].code));
}

$(document).ready(function () {

    $.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Taipei%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
        function (data) {
            if (data.query.results) { // if data.query.results exist , do the following action.
                callback1(data)
            } else {
                console.info("reloading")
                getJsonUntilSuccess("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Taipei%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", callback1)
            }
        });

    var $dropdown = $("#dropdown li a");
    $dropdown.each(function (index, element) {
        //console.log($(element).text());
        var url = findUrl($(element).text());
        //console.log(url);
        getJsonUntilSuccess1(url,element)
    });
});

function getJsonUntilSuccess1(url,element) {

    $.getJSON(url, function (data) {

        if (data.query.results) { // if data.query.results exist , do the following action.
            countTemp(data,element)
        } else {
            console.info("reloading : ", url)
            getJsonUntilSuccess1(url,element)
        }

    })

}

function countTemp(data,element) {
    //console.log(data);
    //console.log(data.query.results.channel.item.condition.temp);
    var c = tempFtoC(data.query.results.channel.item.condition.temp);
    $("<span>").text(c + "°C").css("padding-left", "20px").appendTo($(element));
}

function callback1(data) {
    //console.log(data);
    var c = tempFtoC(data.query.results.channel.item.condition.temp);
    //console.log(c);
    $(".temperature").text(c);
    $(".date").text(data.query.results.channel.item.forecast[0].date + ": ");
    $("#weather").text(data.query.results.channel.item.forecast[0].text);
    $("#first").text(data.query.results.channel.item.forecast[1].date);
    $("#second").text(data.query.results.channel.item.forecast[2].date);
    $("#third").text(data.query.results.channel.item.forecast[3].date);
    var lowC = tempFtoC(data.query.results.channel.item.forecast[1].low);
    var highC = tempFtoC(data.query.results.channel.item.forecast[1].high);
    $("#firstTemp").text(lowC + "-" + highC);
    lowC = tempFtoC(data.query.results.channel.item.forecast[2].low);
    highC = tempFtoC(data.query.results.channel.item.forecast[2].high);
    $("#secondTemp").text(lowC + "-" + highC);
    lowC = tempFtoC(data.query.results.channel.item.forecast[3].low);
    highC = tempFtoC(data.query.results.channel.item.forecast[3].high);
    $("#thirdTemp").text(lowC + "-" + highC);
    //console.log(data.query.results.channel.item.forecast[0].code);
    skycons.set("today", getCode(data.query.results.channel.item.forecast[0].code));
    skycons.set("day1", getCode(data.query.results.channel.item.forecast[1].code));
    skycons.set("day2", getCode(data.query.results.channel.item.forecast[2].code));
    skycons.set("day3", getCode(data.query.results.channel.item.forecast[3].code));
}

function getJsonUntilSuccess(url, callback) {

    $.getJSON(url, function (data) {

        if (data.query.results) { // if data.query.results exist , do the following action.
            callback(data)
        } else {
            console.info("reloading : ", url)
            getJsonUntilSuccess(url, callback)
        }

    })

}

function tempFtoC(F) {
    return Math.round((F - 32) * (5 / 9)).toString();
}

function findUrl(text) {
    var url = "";
    //console.log(url);
    if (text === "臺北市")
        url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Taipei%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    else if (text === "新北市")
        url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22New%20Taipei%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    else if (text === "台中市")
        url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Taichung%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    else if (text === "臺南市")
        url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Tainan%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    else if (text === "高雄市")
        url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Kaohsiung%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    else if (text === "基隆市")
        url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Keelung%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    else if (text === "桃園市")
        url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Taoyuan%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    else if (text === "新竹市")
        url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Hsinchu%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    else if (text === "新竹縣")
        url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Guanxi%20Township%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    else if (text === "苗栗縣")
        url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Miaoli%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    else if (text === "彰化縣")
        url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Xizhou%20Township%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    else if (text === "南投縣")
        url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Nantou%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    else if (text === "雲林縣")
        url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Douliu%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    else if (text === "嘉義市")
        url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Chiayi%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    else if (text === "嘉義縣")
        url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Minxiong%20Township%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    else if (text === "屏東縣")
        url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Pingtung%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    else if (text === "宜蘭縣")
        url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Ilan%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    else if (text === "花蓮縣")
        url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Hualien%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    else if (text === "台東縣")
        url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Taitung%20City%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    else if (text === "澎湖縣")
        url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Wang'an%20Township%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    else if (text === "金門縣")
        url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Jinhu%20Township%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    else if (text === "連江縣")
        url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Fengcheng%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    return url;
}

function getCode(code) {
    /*
    /CLEAR_DAY
    /CLEAR_NIGHT
    /PARTLY_CLOUDY_DAY
    /PARTLY_CLOUDY_NIGHT
    /CLOUDY 
    /RAIN 
    /SLEET 雨夾雪
    /SNOW 
    /WIND 
    /FOG 
    */
    //console.log("code:" + code);
    switch (parseInt(code)) {
        case 5:	    //mixed rain and snow
        case 6:	    //mixed rain and sleet
        case 7:	    //mixed snow and sleet
        case 18:	//sleet
        case 35:	//mixed rain and hail
        case 17: 	//hail 冰雹
            //console.log("Skycons.SLEET");
            return Skycons.SLEET;
        case 3: 	//severe thunderstorms
        case 4: 	//thunderstorms 雷雨
        case 8: 	//freezing drizzle
        case 9: 	//drizzle
        case 10: 	//freezing rain
        case 11: 	//showers
        case 12: 	//showers
        case 40: 	//scattered shower
        case 45: 	//thundershowers
        case 47: 	//isolated thundershowers
        case 37: 	//isolated thunderstorms
        case 38: 	//scattered thunderstorms
        case 39: 	//scattered thunderstorms
            //console.log("Skycons.RAIN");
            return Skycons.RAIN;
        case 13: 	//snow flurries
        case 14: 	//light snow showers
        case 15: 	//blowing snow
        case 16: 	//snow
        case 41: 	//heavy snow
        case 42: 	//scattered snow showers
        case 43: 	//heavy snow
        case 46: 	//snow showers
        case 25: 	//cold
            //console.log("Skycons.SNOW");
            return Skycons.SNOW;
        case 19: 	//dust
        case 20: 	//foggy
        case 21: 	//haze
        case 22: 	//smoky
            //console.log("Skycons.FOG");
            return Skycons.FOG;
        case 23: 	//blustery
        case 24: 	//windy
        case 0: 	//tornado
        case 1: 	//tropical storm
        case 2: 	//hurricane
            //console.log("Skycons.WIND");
            return Skycons.WIND;
        case 26: 	//cloudy
        case 27: 	//mostly cloudy (night)
        case 28: 	//mostly cloudy (day)
            //console.log("Skycons.CLOUDY");
            return Skycons.CLOUDY;
        case 29:    //partly cloudy (night)
            //console.log("Skycons.PARTLY_CLOUDY_NIGHT");
            return Skycons.PARTLY_CLOUDY_NIGHT;
        case 30: 	//partly cloudy (day)
        case 44: 	//partly cloudy
            //console.log("Skycons.PARTLY_CLOUDY_DAY");
            return Skycons.PARTLY_CLOUDY_DAY;
        case 31: 	//clear (night)
        case 33: 	//fair (night)
            //console.log("Skycons.CLEAR_NIGHT");
            return Skycons.CLEAR_NIGHT;
        case 32: 	//sunny
        case 34: 	//fair (day)
        case 36: 	//hot
            //console.log("Skycons.CLEAR_DAY");
            return Skycons.CLEAR_DAY;
        default:    //3200 	not available
            console.log(code + " not available");
    }

}