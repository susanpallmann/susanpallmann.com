$(document).ready(function() {
  globalViewportHeight = getViewportHeight();
  globalPageHeight = getPageHeight();
  heroParallax();
  pattern = 1;
  
  $("#mark").click(function() {
    if (location.pathname == "/") {
      scrollToTop();
    } else {
      redirect("/");
    }
  });
  $('header .sp-icon').mouseleave(function() {
    if (pattern < 3) {
      pattern++;
    } else {
      pattern = 1;
    }
    switch (pattern) {
      case 1:
        $('header').find('.pattern-gif').attr('xlink:href', 'images/Pattern 1.gif');
        break;
      case 2:
        $('header').find('.pattern-gif').attr('xlink:href', 'images/Pattern 2.gif');
        break;
      case 3:
        $('header').find('.pattern-gif').attr('xlink:href', 'images/Pattern 3.gif');
        break;
      default:
        $('header').find('.pattern-gif').attr('xlink:href', 'images/Pattern 1.gif');
    }
  });
  $('footer .sp-icon').mouseleave(function() {
    if (pattern < 2) {
      pattern++;
    } else {
      pattern = 1;
    }
    switch (pattern) {
      case 1:
        $('footer').find('.pattern-gif').attr('xlink:href', 'images/Pattern 1.gif');
        break;
      case 2:
        $('footer').find('.pattern-gif').attr('xlink:href', 'images/Pattern 2.gif');
        break;
      default:
        $('footer').find('.pattern-gif').attr('xlink:href', 'images/Pattern 1.gif');
    }
  });
  
  //Expands or collapses panels with this switch in them
  //When the user clicks on an expand/collapse toggle
  $('.read-more').click(function () {
    var button = $(this);
    var container = $(this).parents('.container');
    
    //jQuery default slideToggle effect
    container.find('.expandable').slideToggle( "fast" );
    
    //If it's already checked
    if (button.attr('aria-checked') === 'true') {
      //Uncheck it, update the icon, expand text
      button.attr('aria-checked','false');
      button.html("Read More");
      container.find('.expandable').addClass('collapsed');
    } else {
      //If it is not checked, check it, update the icon, collapse text
      button.attr('aria-checked','true');
      button.html("Read Less");
      container.find('.expandable').removeClass('collapsed');
    }
  });
});

window.onload = function() {
  /* Adjust these global variables */
  // Speed of hamburger animation (milliseconds). Should match CSS animation speed.
  hamburgerAnimSpeed = 400;
  /* End adjustable variables */

  /* Do not adjust these global variables */
  scrollValue = -100;
  screenWidth = screen.width;
  /* End global variables */

  $("#top_hamburger").click(function() {
    if ($(this).hasClass("animcomplete")) {
      $(this).removeClass("animcomplete");
      $(this).addClass("closed");
      $('#dropdown').find('.expandable').addClass('collapsed');
      $("#dropdown").addClass('collapsed').slideToggle( "fast" );
      setTimeout(function() {
        $("#top_hamburger").removeClass("closed");
      }, hamburgerAnimSpeed);
    } else {
      $(this).addClass("open");
      $('#dropdown').find('.expandable').removeClass('collapsed');
      $("#dropdown").removeClass('collapsed').slideToggle( "fast" );
      setTimeout(function() {
        $("#top_hamburger").removeClass("open");
        $("#top_hamburger").addClass("animcomplete");
      }, hamburgerAnimSpeed);
    }
  });
};
//Returns the position user is scrolled to when called. Ensure this function is called when user has finished scrolling.
function getScrollPosition() {
  var scrollPosition = $(window).scrollTop();
  return scrollPosition;
}
//Returns the full height of the page, even past the viewport. Useful for determining percentage scrolled.
function getPageHeight() {
  var pageHeight = $(document).height();
  globalPageHeight = pageHeight;
  return pageHeight;
}
//Returns the viewport height. Useful for determining if something is visible or not as the user scrolls.
function getViewportHeight() {
  var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  globalViewportHeight = viewportHeight;
  return viewportHeight;
}

function heroParallax() {
  var hero = $('#hero');
  var heroOffset = hero.offset();
  var heroTop = heroOffset.top;
  var heroHeight = hero.height();
  var heroBottom = heroTop + heroHeight;
  var imageModifier = 200;
  var headlineModifier = 50;
  var scrollPosition = getScrollPosition();
  var bottomScrollPosition = scrollPosition + globalViewportHeight;
  var bottomOffset = bottomScrollPosition - heroBottom;
  console.log(scrollPosition + bottomScrollPosition + bottomOffset);
  if (bottomOffset < 0) {
    bottomOffset = 0;
  }
  $(window).scroll(function() {
    var scrollPosition = getScrollPosition();
    var bottomScrollPosition = scrollPosition + globalViewportHeight;
    if ( heroBottom > scrollPosition) {
      if ( heroBottom < bottomScrollPosition) {
        var percentScrolled = 1 - (((heroBottom + bottomOffset) - scrollPosition)/globalViewportHeight);
        console.log(percentScrolled);
        $('img.parallax').css('transform','translateY(-' + imageModifier*percentScrolled + 'px)');
        $('#dramatic-headline').css('transform','translateY(-' + headlineModifier*percentScrolled + 'px)');
      }
    }
  });
}

//Listen for when the user scrolls and then finishes scrolling (that is, stopped scrolling for 250 milliseconds)
$(window).scroll(function() {
  clearTimeout($.data(this, 'scrollTimer'));
  $.data(this, 'scrollTimer', setTimeout(function() {
    console.log("USER STOPPED SCROLLING");
    var scrollPosition = getScrollPosition();
    var pageHeight =  getPageHeight();
    var viewportHeight = getViewportHeight();
    console.log("called function variables correctly and they are" + scrollPosition + " " + pageHeight + " " + viewportHeight);
    var newScrollMax = pageHeight - viewportHeight;
    console.log(newScrollMax);
    var pageScrollPercentage = scrollPosition/newScrollMax;
    console.log(pageScrollPercentage);
    if (pageScrollPercentage > 0) {
    $("#false-after").css("transform", "scaleX(" + pageScrollPercentage + ")" );
    $("#false-after").css("height", "4px");
    } else {
    $("#false-after").css("transform", "scaleX(" + pageScrollPercentage + ")" );
    $("#false-after").css("height", "0px");
    }
    console.log("End function");
    //Scroll timer value
  }, 20));
});
