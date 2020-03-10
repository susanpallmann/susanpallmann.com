$(document).ready(function() {
  /* Calling functions on load & setting some global variables */
  /* Adjust these global variables */
  // Speed of hamburger animation (milliseconds). Should match CSS animation speed.
  hamburgerAnimSpeed = 400;
  /* End adjustable variables */

  /* Do not adjust these global variables */
  // Retrieves height of viewport
  globalViewportHeight = getViewportHeight();
  // Retrieves full height of page, including what's not visible
  globalPageHeight = getPageHeight();
  // Tracks the current pattern under the ligature
  pattern = 1;
  // Can't remember what this is
  scrollValue = -100;
  // Retrieves screen width, just like it says (there's no horizontal scrolling so this is both viewport and window width)
  screenWidth = screen.width;
  
  sortPortfolio();
  heroParallax();
  parallax();

  /* Hamburger Menu Animation */
  $("#top_hamburger").click(function() {
    if ($(this).hasClass("animcomplete")) {
      $(this).removeClass("animcomplete");
      $(this).addClass("closed");
      $("#dropdown").slideToggle( "fast" );
      $('#dropdown').find('.expandable').addClass('collapsed');
      setTimeout(function() {
        $("#top_hamburger").removeClass("closed");
      }, hamburgerAnimSpeed);
    } else {
      $(this).addClass("open");
      $('#dropdown').find('.expandable').removeClass('collapsed');
      $("#dropdown").slideToggle( "fast" );
      setTimeout(function() {
        $("#top_hamburger").removeClass("open");
        $("#top_hamburger").addClass("animcomplete");
      }, hamburgerAnimSpeed);
    }
  });
  
  $(".mark").click(function() {
   //if (location.pathname == "/" || location.pathname == "/index.html") {
    if (location.pathname == "/stage.susanpallmanndesign.com/" || location.pathname == "/stage.susanpallmanndesign.com/index.html") {
      var sort = getParameterByName('sort');
      if (!sort) {
        $("html,body").animate({
          scrollTop: $("body").offset().top - $("header").height()}, "slow");
      } else {
        window.location.assign("https://susanpallmann.github.io/stage.susanpallmanndesign.com/");
      }
    } else {
      window.location.assign("https://susanpallmann.github.io/stage.susanpallmanndesign.com/");
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
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  function sortPortfolio() {
    var sort = getParameterByName('sort');
    if (!sort) {
      $('.tag').removeClass('selected');
      $('.tag-all').addClass('selected');
      return null;
    } else {
      $('.project .column').parents('.project').removeClass('visible').css('display', 'none');
      $('.' + sort).parents('.project').addClass('visible').css('display', 'inline-block');
      $('.tag').removeClass('selected');
      $('.tag-' + sort).addClass('selected');
    }
  }  
  //Expands or collapses panels with this switch in them
  //When the user clicks on an expand/collapse toggle
  $('.read-more').click(function toggleView () {
    var button = $(this);
    var container = $(this).parents('.container');
    
    //jQuery default slideToggle effect
    container.find('.expandable').slideToggle( "fast" );
    
    //If it's already checked
    if (button.attr('aria-checked') === 'true') {
      //Uncheck it, update the icon, expand text
      button.attr('aria-checked','false');
      button.html("View More ▼");
      container.find('.expandable').addClass('collapsed');
    } else {
      //If it is not checked, check it, update the icon, collapse text
      button.attr('aria-checked','true');
      button.html("View Less ▲");
      container.find('.expandable').removeClass('collapsed');
    }
  });
  $('.read-more').keydown(function(e) {
    var code = e.which;
    // 13 = Return, 32 = Space
    if ((code === 13) || (code === 32)) {
      $(this).click();
    }
  });
  //Gallery widget functionality
  $('.gallery-right').click(function() {
    var button = $(this);
    var gallery = button.parents('.gallery');
    var galleryNum = parseInt(gallery.attr('data-img-num'));
    var currentImg = gallery.find('.gallery-img');
    var imgNum = parseInt(currentImg.attr('data-current-img'));
    if (gallery.hasClass('gallery-anim')) {
      currentImg.animate({'opacity':'0'},100);
      if ( imgNum === galleryNum) {
        imgNum = 1;
      } else {
        imgNum++;
      }
      currentImg
        .delay(100)
        .queue(function(next) { $(this).attr('data-current-img',imgNum); next(); })
        .animate({'opacity':'1'},400);
    } else {
      if ( imgNum === galleryNum) {
        imgNum = 1;
      } else {
        imgNum++;
      }
      currentImg.attr('data-current-img',imgNum);
    }
  });
  $('.gallery-left').click(function() {
    var button = $(this);
    var gallery = button.parents('.gallery');
    var galleryNum = parseInt(gallery.attr('data-img-num'));
    var currentImg = gallery.find('.gallery-img');
    var imgNum = parseInt(currentImg.attr('data-current-img'));
    if (gallery.hasClass('gallery-anim')) {
      currentImg.animate({'opacity':'0'},100);
      if ( imgNum === 1) {
        imgNum = galleryNum;
      } else {
        imgNum--;
      }
      currentImg
        .delay(100)
        .queue(function(next) { $(this).attr('data-current-img',imgNum); next(); })
        .animate({'opacity':'1'},400);
    } else {
      if ( imgNum === 1) {
        imgNum = galleryNum;
      } else {
        imgNum--;
      }
      currentImg.attr('data-current-img',imgNum);
    }
  });
  $('.gallery-right').keydown(function(e) {
    var code = e.which;
    // 13 = Return, 32 = Space
    if ((code === 13) || (code === 32)) {
      $(this).click();
    }
  });
  $('.gallery-left').keydown(function(e) {
    var code = e.which;
    // 13 = Return, 32 = Space
    if ((code === 13) || (code === 32)) {
      $(this).click();
    }
  });
});

window.onload = function() {
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
  if ( $('#hero').length ) {
    if ( $('#hero').hasClass('gradient') ) {
      $("#hero").mousemove(function( event ) {
        var w = $(this).width(),
          pct = 360*(+event.pageX)/w,
          bg = "linear-gradient(" + pct + "deg,#FF6666,#DCA1C4)";
        $("#hero").css('background-image', bg);
      });
    } else {
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
      if (bottomOffset < 0) {
        bottomOffset = 0;
      }
      $(window).scroll(function() {
        var scrollPosition = getScrollPosition();
        var bottomScrollPosition = scrollPosition + globalViewportHeight;
        if ( heroBottom > scrollPosition) {
          if ( heroBottom < bottomScrollPosition) {
            var percentScrolled = 1 - (((heroBottom + bottomOffset) - scrollPosition)/globalViewportHeight);
            $('img.parallax').css('transform','translateY(-' + imageModifier*percentScrolled + 'px)');
            $('#dramatic-headline').css('transform','translateY(' + headlineModifier*percentScrolled + 'px)');
          }
        }
      });
    }
  }
}
function parallax() {
  $('.imgParallax').each( function(index) {
    var image = $(this);
    var imageOffset = image.offset();
    var imageTop = imageOffset.top;
    var imageHeight = image.height();
    var imageBottom = imageTop + imageHeight;
    var parallaxModifier = 20;
    var scrollPosition = getScrollPosition();
    var bottomScrollPosition = scrollPosition + globalViewportHeight;
    var bottomOffset = bottomScrollPosition - imageBottom;
    if (bottomOffset < 0) {
      bottomOffset = 0;
    }
    $(window).scroll(function() {
      var scrollPosition = getScrollPosition();
      var bottomScrollPosition = scrollPosition + globalViewportHeight;
      if ( imageBottom > scrollPosition) {
        if ( imageBottom < bottomScrollPosition) {
          var percentScrolled = 1 - (((imageBottom + bottomOffset) - scrollPosition)/globalViewportHeight);
          image.css('background-position-y', (-10+parallaxModifier*percentScrolled) + 'px');
        }
      }
    });
  });
}

//Listen for when the user scrolls and then finishes scrolling (that is, stopped scrolling for 250 milliseconds)
$(window).scroll(function() {
  if ( $("#false-after").length ) {
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() {
      var scrollPosition = getScrollPosition();
      var pageHeight =  getPageHeight();
      var viewportHeight = getViewportHeight();
      var newScrollMax = pageHeight - viewportHeight;
      var pageScrollPercentage = scrollPosition/newScrollMax;
      if (pageScrollPercentage > 0) {
        $("#false-after").css("transform", "scaleX(" + pageScrollPercentage + ")" );
        $("#false-after").css("height", "4px");
      } else {
        $("#false-after").css("transform", "scaleX(" + pageScrollPercentage + ")" );
        $("#false-after").css("height", "0px");
      }
      //Scroll timer value
    }, 100));
  } else {
  }
  /* Get locations of page bottom and an arbitrary height of each element */
  $('.animate-fade-in').each( function(i){
    var fadeLocation = $(this).offset().top + 0.25*($(window).height());
    var windowBottom = $(window).scrollTop() + $(window).height();
    /* If the object is visible in the window, fade in */
    if( windowBottom > fadeLocation ){
      $(this).delay(150).animate({'opacity':'1'},600);
    }
  });
});
/* Please say editing it magically fixed the problem */
