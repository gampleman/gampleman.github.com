// ===========================================
// = The master file for my personal website =
// ===========================================
var getWidth = 337;
var setWidth = 0;
$(document).ready(function() {
    // A celaner way to do some of the stuff would be through using callbacks on
 	// on the tabs object, but since I'm implementing the efect anyway I chose to
	// implement it all in one place.
	$.tools.addTabEffect("vslide",
    function(tabIndex) {
        if (typeof(tabIndex) != 'undefined') {
            if (!$("#container").hasClass("t-" + tabIndex)) {
                $("#content").slideUp(500);
                $(".node").fadeOut(500);
                setTimeout("$('.node').hide();", 500);
                $("#container").removeClass();
                $(".navigation a").removeClass();
            } else {
                $(".node").hide();
            }
            link = $(".navigation a:eq(" + tabIndex + ")");
            link.addClass("active");
            document.title = "Jakub Hampl - " + link[0].text;
            com = '$(".node:eq(' + tabIndex + ')").show();';
            setTimeout(com, 500);
            $("#content").slideDown(500);
            $("#container").addClass("t-" + tabIndex);
        }
    });
    $(".navigation").tabs("#content > div.node", {
        history: true,
        effect: 'vslide'
    });
    $("h2").hide();
    // TODO Replace this with the overlay widget
    $('#my-photo').fancyZoom({
        scaleImg: true,
        closeOnClick: true,
        directory: 'images'
    });
    $.tools.addTipEffect("slideright",
    function() {
        // show animation
        var opacity = this.getConf().opacity;
        this.getTip().css({ opacity: 0 }).animate({
            left: '+=30',
            opacity: opacity
        }, 300).show();
    },
    function() {
        // hide animation
        this.getTip().animate({
            left: '-=25',
            opacity: 0
        }, 300,  function() {
            $(this).hide().animate({
                left: '-=30'
            }, 0);
        });
    }
    );
    $("#my-photo").tooltip({
        effect: 'slideright',
        position: ['center', 'right'],
        opacity: 0.7,
    });
    $("div.scrollable").scrollable({
        size: 1,
        clickable: false,
    });
    $.getScript('http://twitter.com/statuses/user_timeline/kopomir.json?callback=myTwitCb&amp;count=5');
});

function myTwitCb(twitters) {
    var statusHTML = [];
    for (var i = 0; i < 7 && i < twitters.length; i++) {
        var username = twitters[i].user.screen_name;
        var status = twitters[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g,
        function(url) {
            return '<a href="' + url + '">' + url + '</a>';
        }).replace(/\B@([_a-z0-9]+)/ig,
        function(reply) {
            return reply.charAt(0) + '<a href="http://www.twitter.com/' + reply.substring(1) + '">' + reply.substring(1) + '</a>';
        });
        statusHTML.push('<li><span>' + status + '</span> <a style="font-size:85%" href="http://twitter.com/' + username + '/statuses/' + twitters[i].id + '">' + relative_time(twitters[i].created_at) + '</a></li>');
    }
    $('#twitter_update_list').prepend(statusHTML.join(''));
    $("div#twitter_div").scrollable({
        size: 1,
        clickable: false,
    });
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
    } else if (delta < 120) {
        return 'about a minute ago';
    } else if (delta < (60 * 60)) {
        return (parseInt(delta / 60)).toString() + ' minutes ago';
    } else if (delta < (120 * 60)) {
        return 'about an hour ago';
    } else if (delta < (24 * 60 * 60)) {
        return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
    } else if (delta < (48 * 60 * 60)) {
        return '1 day ago';
    } else {
        return (parseInt(delta / 86400)).toString() + ' days ago';
    }
}