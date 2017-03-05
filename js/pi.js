$(function() {

	pi.init();

	$('#allon').on('click', function(){
		$.ajax({
			type: 'PUT',
			url: urls.group0onoff,
			data: '{"on": true, "bri": 100}'
		});
	});

	$('#alloff').on('click', function(){
		$.ajax({
			type: 'PUT',
			url: urls.group0onoff,
			data: '{"on": false}'
		});
	});

	$('#bedon').on('click', function(){
		$.ajax({
			type: 'PUT',
			url: urls.bedonoff,
			data: '{"on": true, "bri": 100, "hue":65280}'
		});

	});

	$('#bedoff').on('click', function(){
		$.ajax({
			type: 'PUT',
			url: urls.bedonoff,
			data: '{"on": false}'
		});
		$.ajax({
			type: 'PUT',
			url: urls.api+'3/state',
			data: '{"on": false}'
		});
	});

	$('#tvoff').on('click', function(){
		$(this).removeClass('success');
		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: urls.tv,
			data: '{"key": "Standby"}'
		});
	});

});

var urls = {
	'api':			'http://HUEBRIDGEIP/api/HUEUSERID/lights/',
	'group0onoff':	'http://HUEBRIDGEIP/api/HUEUSERID/groups/0/action',
	'group0state':	'http://HUEBRIDGEIP/api/HUEUSERID/groups/0/',
	'bedonoff':		'http://HUEBRIDGEIP/api/HUEUSERID/groups/6/action',
	'bedstate':		'http://HUEBRIDGEIP/api/HUEUSERID/groups/6/',
	'tado':			'https://my.tado.com/api/v2/homes/HOMEID/zones/1/state?username=USERNAME&password=PASSWORD',
	'tv':			'http://TVIP:1925/1/input/key',
	'watchtv':		'http://TVIP:1925/1/sources/current',
	'tvon':			'http://TVIP:1925/1/ambilight/measured',
	'weatherData':	'https://api.darksky.net/forecast/DARKSKYAPIID/YOURLATITUDE,YOURLONGITUDE?units=UNITS&callback=?'
}
var moons = {
	'new':		'<i class="wi wi-moon-alt-new"></i> New Moon',
	'waxc1':	'<i class="wi wi-moon-alt-waxing-crescent-1"></i> Waxing Crescent',
	'waxc2':	'<i class="wi wi-moon-alt-waxing-crescent-2"></i> Waxing Crescent',
	'waxc3':	'<i class="wi wi-moon-alt-waxing-crescent-3"></i> Waxing Crescent',
	'waxc4':	'<i class="wi wi-moon-alt-waxing-crescent-4"></i> Waxing Crescent',
	'waxc5':	'<i class="wi wi-moon-alt-waxing-crescent-5"></i> Waxing Crescent',
	'waxc6':	'<i class="wi wi-moon-alt-waxing-crescent-6"></i> Waxing Crescent',
	'quarter1':	'<i class="wi wi-moon-alt-first-quarter"></i> First Quarter',
	'waxg1':	'<i class="wi wi-moon-alt-waxing-gibbous-1"></i> Waxing Gibbous',
	'waxg2':	'<i class="wi wi-moon-alt-waxing-gibbous-2"></i> Waxing Gibbous',
	'waxg3':	'<i class="wi wi-moon-alt-waxing-gibbous-3"></i> Waxing Gibbous',
	'waxg4':	'<i class="wi wi-moon-alt-waxing-gibbous-4"></i> Waxing Gibbous',
	'waxg5':	'<i class="wi wi-moon-alt-waxing-gibbous-5"></i> Waxing Gibbous',
	'waxg6':	'<i class="wi wi-moon-alt-waxing-gibbous-6"></i> Waxing Gibbous',
	'full':		'<i class="wi wi-moon-alt-full"></i> Full Moon',
	'wang1':	'<i class="wi wi-moon-alt-waning-gibbous-1"></i> Waning Gibbous',
	'wang2':	'<i class="wi wi-moon-alt-waning-gibbous-2"></i> Waning Gibbous',
	'wang3':	'<i class="wi wi-moon-alt-waning-gibbous-3"></i> Waning Gibbous',
	'wang4':	'<i class="wi wi-moon-alt-waning-gibbous-4"></i> Waning Gibbous',
	'wang5':	'<i class="wi wi-moon-alt-waning-gibbous-5"></i> Waning Gibbous',
	'wang6':	'<i class="wi wi-moon-alt-waning-gibbous-6"></i> Waning Gibbous',
	'quarter2':	'<i class="wi wi-moon-alt-third-quarter"></i> Last Quarter',
	'wanc1':	'<i class="wi wi-moon-alt-waning-crescent-1"></i> Waning Crescent',
	'wanc2':	'<i class="wi wi-moon-alt-waning-crescent-2"></i> Waning Crescent',
	'wanc3':	'<i class="wi wi-moon-alt-waning-crescent-3"></i> Waning Crescent',
	'wanc4':	'<i class="wi wi-moon-alt-waning-crescent-4"></i> Waning Crescent',
	'wanc5':	'<i class="wi wi-moon-alt-waning-crescent-5"></i> Waning Crescent',
	'wanc6':	'<i class="wi wi-moon-alt-waning-crescent-6"></i> Waning Crescent',
}

var pi = {
	init: function() {
		window.addEventListener('contextmenu', function(e) { e.preventDefault(); })
		pi.time();
		pi.weather();
		pi.tado();
		pi.tvstatus();
		pi.hue();
		setInterval( function() {
			pi.hue();
			pi.tvstatus();
		}, 5000);
		setInterval( function() {
			pi.tado();
			pi.weather();
		}, 3600000);
	},
	time: function() {
		setInterval( function() {
			$('#time').html(moment().format('HH:mm')).attr('datetime', moment().format('HHmm')).append('<span>'+moment().format('dddd Do MMMM, YYYY')+'</span>');
			pi.daynight();
		}, 1000);
	},
	daynight: function() {
		if($('#time').attr('datetime') > '0700' && $('#time').attr('datetime') < '2200') {
			$('body').removeClass('night').addClass('day');
			$('.button').removeClass('hollow');
		} else {
			$('body').removeClass('day').addClass('night');
			$('.button').addClass('hollow');
		}
	},
	tvstatus: function() {
		$.getJSON(urls.watchtv, function(data){
			if(exists(data.id)) {
				$('#tvoff').addClass('success');
			} else {
				$('#tvoff').removeClass('success');
			}

		});
	},
	weather: function() {
		$.getJSON(urls.weatherData, function(weather){

			var summary = weather.currently.summary,
				summaryIcon = weather.currently.icon,
				num = weather.currently.cloudCover,
				moon = weather.daily.data[0].moonPhase,
				sunrise = weather.daily.data[0].sunriseTime,
				sunset = weather.daily.data[0].sunsetTime,
				pred = '',
				moonPhase = '';
			if(summaryIcon == 'wind') {summaryIcon = 'strong-wind'};
			if(num == 0) {var text = 'Clear', cIcon = 'wi-clear-day'};
			if(num > 0 && num <= 0.4) {var text = 'Scattered Clouds', cIcon = 'wi-day-cloudy-high'};
			if(num >= 0.41 && num <= 0.75) {var text = 'Broken Clouds', cIcon = 'wi-cloudy'};
			if(num >= 0.76 && num <= 1) {var text = 'Overcast', cIcon = 'wi-cloud'};
			if(moon => 0.99 && moon <= 0.01) {moonPhase = moons.new};
			if(moon > 0.01 && moon < 0.05) {moonPhase = moons.waxc1};
			if(moon > 0.06 && moon < 0.10) {moonPhase = moons.waxc2};
			if(moon > 0.10 && moon < 0.14) {moonPhase = moons.waxc3};
			if(moon > 0.14 && moon < 0.18) {moonPhase = moons.waxc4};
			if(moon > 0.18 && moon < 0.22) {moonPhase = moons.waxc5};
			if(moon > 0.22 && moon < 0.25) {moonPhase = moons.waxc6};
			if(moon == 0.25) {moonPhase = moons.quarter1};
			if(moon > 0.25 && moon < 0.29) {moonPhase = moons.waxg1};
			if(moon > 0.29 && moon < 0.33) {moonPhase = moons.waxg2};
			if(moon > 0.33 && moon < 0.37) {moonPhase = moons.waxg3};
			if(moon > 0.37 && moon < 0.41) {moonPhase = moons.waxg4};
			if(moon > 0.41 && moon < 0.45) {moonPhase = moons.waxg5};
			if(moon > 0.45 && moon < 0.49) {moonPhase = moons.waxg6};
			if(moon == 0.5) {moonPhase = moons.full};
			if(moon > 0.5 && moon < 0.54) {moonPhase = moons.wang1};
			if(moon > 0.54 && moon < 0.58) {moonPhase = moons.wang2};
			if(moon > 0.58 && moon < 0.62) {moonPhase = moons.wang3};
			if(moon > 0.62 && moon < 0.66) {moonPhase = moons.wang4};
			if(moon > 0.66 && moon < 0.70) {moonPhase = moons.wang5};
			if(moon > 0.70 && moon < 0.75) {moonPhase = moons.wang6};
			if(moon == 0.75) {moonPhase = moons.quarter2};
			if(moon > 0.75 && moon < 0.79) {moonPhase = moons.wanc1};
			if(moon > 0.79 && moon < 0.83) {moonPhase = moons.wanc2};
			if(moon > 0.83 && moon < 0.87) {moonPhase = moons.wanc3};
			if(moon > 0.87 && moon < 0.91) {moonPhase = moons.wanc4};
			if(moon > 0.91 && moon < 0.95) {moonPhase = moons.wanc5};
			if(moon > 0.95 && moon < 0.99) {moonPhase = moons.wanc6};

			pred += '<strong><i class="wi wi-'+summaryIcon+'"></i> '+summary + '</strong><br />';

			pred += '<i class="wi wi-thermometer"></i> ' + weather.currently.temperature+'<i class="wi wi-celsius"></i> <small>(Feels like '+weather.currently.apparentTemperature+'<i class="wi wi-celsius"></i>)</small><br />';

			pred += '<small>Max: '+weather.daily.data[0].temperatureMax+'<i class="wi wi-celsius"></i> | Min: '+weather.daily.data[0].temperatureMin+'<i class="wi wi-celsius"></i></small><br />';

			pred += '<i class="wi wi-strong-wind"></i> Wind: <i class="wi wi-wind towards-'+weather.currently.windBearing+'-deg"></i> '+degToCompass(weather.currently.windBearing)+' '+weather.currently.windSpeed+' mph<br />';
			pred += '<i class="wi '+cIcon+'"></i> '+ text + '<br />';

			if(weather.currently.precipIntensity > 0) {
				pred += '<i class="wi wi-rain"></i> Rain: '+Math.round(weather.currently.precipProbability * 100, 2)+'% '+Math.round(weather.currently.precipIntensity * 10, 2)+'mm/hr '+weather.currently.precipType+'<br />';
			} else {
				pred += '<i class="wi wi-rain"></i> Rain: '+Math.round(weather.currently.precipProbability * 100, 2)+'%<br />';
			}

			if(weather.currently.nearestStormDistance > 0) {
				pred += 'Nearest rain: <i class="wi wi-wind towards-'+weather.currently.nearestStormBearing+'-deg"></i> '+degToCompass(weather.currently.nearestStormBearing)+' '+weather.currently.nearestStormDistance+' miles<br />';
			}

			pred += '<i class="wi wi-humidity"></i> Humidity: ' + Math.round(weather.currently.humidity * 100) + '%<br />';

			if(exists(weather.daily.data[0].moonPhase)) {
				pred += ''+moonPhase+'<br />';
			}

			pred += '<i class="wi wi-sunrise"></i> '+moment.unix(sunrise).format('HH:mm a')+' | <i class="wi wi-sunset"></i> '+moment.unix(sunset).format('HH:mm a');

			$('#weather').html(pred);

		});
	},
	tado: function() {
		$.getJSON(urls.tado, function(data){
			var current = data.sensorDataPoints.insideTemperature.celsius;
			$('#tado').html('<strong><i class="wi wi-barometer"></i> tado&deg; '+ current + '<i class="wi wi-celsius"></i></strong>');
		});
	},
	hue: function() {
		$.getJSON(urls.group0state, function(all){

			$.getJSON(urls.bedstate, function(bed){

				if(all.state.all_on == true && all.state.any_on == true && bed.state.all_on == true && bed.state.any_on == true) {
					$('button:not(#tvoff)').removeClass('success');
					$('#allon').addClass('success');
					$('#bedon').addClass('success');
				}
				if(all.state.all_on == false && all.state.any_on == true && bed.state.all_on == true && bed.state.any_on == true) {
					$('button:not(#tvoff)').removeClass('success');
					$('#allon').addClass('success');
					$('#bedon').addClass('success');
				}
				if(all.state.all_on == false && all.state.any_on == true && bed.state.all_on == false && bed.state.any_on == true) {
					$('button:not(#tvoff)').removeClass('success');
					$('#allon').addClass('success');
					$('#bedon').addClass('success');
				}
				if(all.state.all_on == false && all.state.any_on == true && bed.state.all_on == false && bed.state.any_on == false) {
					$('button:not(#tvoff)').removeClass('success');
					$('#bedoff').addClass('success');
					$('#allon').addClass('success');
				}
				if(all.state.all_on == false && all.state.any_on == false) {
					$('button:not(#tvoff)').removeClass('success');
					$('#alloff').addClass('success');
				}

			});

		});

	}

}

function exists(data) {

	if(!data || data==null || data=='undefined' || typeof(data)=='undefined') return false;
	else return true;

}

function degToCompass(num) {

	var val = Math.floor((num / 22.5) + 0.5);
	var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
	return arr[(val % 16)];

}