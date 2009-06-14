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
    $('#my-photo').overlay();
    $('#shifter').addClass('shifter');
    $('.paner').addClass('pane').removeClass('paner');
    $('.quicknav').show();
    $('a.shiftleft').click(function() {
        setWidth = setWidth - getWidth;
        $('#shifter').animate({
            left: setWidth
        },
        500);
        return false;
    });
    $('a.shiftright').click(function() {
        setWidth = setWidth + getWidth;
        $('#shifter').animate({
            left: setWidth
        },
        500);
        return false;
    });
});
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
