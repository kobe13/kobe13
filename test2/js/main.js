"use strict";

// ***** NAVIGATION START ***** //
//push menu
$("#show-menu").click(function () {
    $(".navigation").toggleClass('navigation--active');
    $(".content, header").toggleClass('content--menu-active');
    $("body").toggleClass('overlay');
});

//show dropdown items
$(".dropdown").click(function () {
    var dropdownActiveItems = $(this).find('ul:first'),
        dropdownItems = $(".dropdown > ul");

    dropdownItems.addClass('is-hidden');

    if (dropdownActiveItems.hasClass('dropdown--active')) {
        dropdownActiveItems.addClass('is-hidden').removeClass('dropdown--active');
    } else {
        dropdownItems.removeClass('dropdown--active');
        dropdownActiveItems.removeClass('is-hidden').addClass('dropdown--active');
    }

});
// ***** NAVIGATION END ***** //

// ***** GRID SYSTEM START ***** //
//grid system for the articles
var gridSystemArticle = function (viewPort) {
    var container = $(".content"),
        containerWidth = container.width(),
        offsetLeft = container.offset().left,
        offsetTop = (container.offset().top) + 20,
        articles = $(".content > article"),
        articleWidth = containerWidth / viewPort;

    articles.each(function (e, item) {
        $(item).offset({
            top: offsetTop,
            left: offsetLeft
        });
        offsetLeft += articleWidth;

        if (offsetLeft >= (containerWidth + container.offset().left - 10)) {
            offsetTop += 250;
            offsetLeft = container.offset().left;
        }
    });

};

//grid system resize
var gridSystemResize = function () {
//Initialize the grid system
    gridSystemArticle(4);
    var windowWidth = $(window).width();

    if (windowWidth <= 659) {
        gridSystemArticle(2);
    } else {
        gridSystemArticle(4);
    }

//on resize function
    $(window).resize(function () {
        var windowWidth = $(this).width();

        if (windowWidth <= 659) {
            gridSystemArticle(2);
        }
        else {
            gridSystemArticle(4);
        }

    });
};

gridSystemResize();
// ***** GRID SYSTEM END ***** //
