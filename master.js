// ===========================================
// = The master file for my personal website =
// ===========================================
var getWidth = 337;
var setWidth = 0;
$(document).ready(function() {
    var queryhash = window.location.hash
    switch (queryhash) {
    case "#info":
        document.title = "Jakub Hampl - Info";
        initialShowInfo();
        break;
    case "#contact":
        document.title = "Jakub Hampl - Kontakt";
        initialShowContact();
        break;
    case "#portfolio":
        document.title = "Jakub Hampl - Portfolio";
        initialShowPortfolio();
        break;
    default:
        initialShowInfo();
        break;
    }
    $("h2").hide();
    $("#nav-info").click(showInfo);
    $("#nav-portfolio").click(showPortfolio);
    $("#nav-contact").click(showContact);
   	$('#my-photo').fancyZoom({
        scaleImg:
        true,
        closeOnClick: true,
        directory: 'images'
    });
	$("#my-photo").tooltip({ 
	    /* tooltip configuration goes here */ 

	    // one configuration property 
	    position: ['center', 'right'], 

	    // another property 
	    opacity: 0.7, 

	    // ... the rest of the configuration properties 
	});
    
	
		$("div.scrollable").scrollable({
			size: 1,
			clickable: false,
		});
	
	//load the twitter data
	
	postLoad('http://twitter.com/statuses/user_timeline/kopomir.json?callback=myTwitCb&amp;count=5');
	
});

function myTwitCb(twitters) {
	try {
		var statusHTML = [];
		  for (var i=0; i<7; i++){
		    var username = twitters[i].user.screen_name;
		    var status = twitters[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
		      return '<a href="'+url+'">'+url+'</a>';
		    }).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
		      return  reply.charAt(0)+'<a href="http://www.twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
		    });
		    statusHTML.push('<li><span>'+status+'</span> <a style="font-size:85%" href="http://twitter.com/'+username+'/statuses/'+twitters[i].id+'">'+relative_time(twitters[i].created_at)+'</a></li>');
		  }
		  document.getElementById('twitter_update_list').innerHTML = statusHTML.join('') + document.getElementById('twitter_update_list').innerHTML;
		
		$("div#twitter_div").scrollable({
			size: 1,
			clickable: false,

		});
	} catch(e) {
		$("div#twitter_div").hide();
	}
	
}


function relative_time(time_value) {
  var values = time_value.split(" ");
  time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
  var parsed_date = Date.parse(time_value);
  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
  var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
  delta = delta + (relative_to.getTimezoneOffset() * 60);

  if (delta < 60) {
    return 'less than a minute ago';
  } else if(delta < 120) {
    return 'about a minute ago';
  } else if(delta < (60*60)) {
    return (parseInt(delta / 60)).toString() + ' minutes ago';
  } else if(delta < (120*60)) {
    return 'about an hour ago';
  } else if(delta < (24*60*60)) {
    return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
  } else if(delta < (48*60*60)) {
    return '1 day ago';
  } else {
    return (parseInt(delta / 86400)).toString() + ' days ago';
  }
}



function postLoad(what) {
  // var head = document.getElementsByTagName("head")[0];
   script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = what;
   $('head').append(script);   
}


function initialShowPortfolio() {
    $("#content").hide();
    $("#container").removeClass();
    $("#container").addClass("portfolio");
    $(".node").hide();
    $("#portfolio").show();
    setTimeout("$('#content').slideDown('slow');", 1000);
}
function initialShowInfo() {
    $("#content").hide();
    $("#container").removeClass();
    $("#container").addClass("info");
    $(".node").hide();
    $("#info").show();
    setTimeout("$('#content').slideDown('slow');", 1000);
}
function initialShowContact() {
    $("#content").hide();
    $("#container").removeClass();
    $("#container").addClass("contact");
    $(".node").hide();
    $("#contact").show();
    setTimeout("$('#content').slideDown('slow');", 1000);
}
function showInfo() {
    if ($("#container").hasClass("info")) {}
    else {
        document.title = "Jakub Hampl - Info";
        $("#content").slideUp(500);
        $(".node").fadeOut(500);
        setTimeout("$('.node').hide();", 500);
        setTimeout("$('#info').show();", 500);
        $("#content").slideDown(500);
        $("#container").removeClass();
        $("#container").addClass("info");
    }
}
function showPortfolio() {
    document.title = "Jakub Hampl - Portfolio";
    if ($("#container").hasClass("portfolio")) {}
    else {
        $("#content").slideUp(500);
        $(".node").fadeOut(500);
        setTimeout("$('.node').hide();", 500);
        setTimeout("$('#portfolio').show();", 500);
        $("#content").slideDown(500);
        $("#container").removeClass();
        $("#container").addClass("portfolio");
    }
}
function showContact() {
    if ($("#container").hasClass("contact")) {}
    else {
        document.title = "Jakub Hampl - Contact";
        $("#content").slideUp(500);
        $(".node").fadeOut(500);
        setTimeout("$('.node').hide();", 500);
        setTimeout("$('#contact').show();", 500);
        $("#content").slideDown(500);
        $("#container").removeClass();
        $("#container").addClass("contact");
    }
}
