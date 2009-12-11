// ===========================================
// = The master file for my personal website =
// ===========================================
$(function() {
   // initialy hide all tabs - we don't do this through css - for accessibillity's sake
	$(".node").fadeOut(0);
	// A cleaner way to do some of the stuff would be through using callbacks on
    // on the tabs object, but since I'm implementing the efect anyway I chose to
   	// implement it all in one place.
	$.tools.tabs.addEffect("vslide",
    function(tabIndex) {
        if (typeof(tabIndex) != 'undefined') {
            if (!$("#container").hasClass("t-" + tabIndex)) {
                $("#container").removeClass();
                $(".navigation a").removeClass();
                $("#content").slideUp(500);
                $(".node").fadeOut(499);
            }
            link = $(".navigation a:eq(" + tabIndex + ")");
            link.addClass("active");
            document.title = "Jakub Hampl - " + link[0].text;
            com = '$(".node:eq(' + tabIndex + ')").show();';
            setTimeout(com, 501);
            $("#content").slideDown(500);
            $("#container").addClass("t-" + tabIndex);
        }
    });
    $(".navigation").tabs("#content > div.node", {
        effect: 'vslide'
    }).history();
    $("h2").hide();
    $("#my-photo").tooltip({
        effect: 'slide',
        bounce: true,
        direction: 'right',
        slideOffset: 40,
        slideInSpeed: 300,
        slideOutSpeed: 300,
        offset: [90, 130],
        relative: true,
        opacity: 0.7,
    });
    $("div.scrollable").scrollable({
        size: 1,
        clickable: false,
    }).navigator();
    $(".icons a").hover(function () {
        $(".icons small").stop(true, true).html(this.title).fadeIn(200);
    }, function () {
        $(".icons small").fadeOut(600);
    });
    //lazy loading the script - it's in tab 3 so people won't see it for a while anyway
    $.getScript('http://twitter.com/statuses/user_timeline/kopomir.json?callback=myTwitCb&amp;count=5');
});

// Most of this code comes from twitter
//this is called by twitter script when it arrives
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
    }).navigator();
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