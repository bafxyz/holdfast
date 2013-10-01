$(function() {

  var sliderWrapper = $('.slider-wrapper');
  var slider =  sliderWrapper.children('.rslides');
  var slogan = $('.slogan');
  var menu = $('.m-menu');

  // Caption positioning
  function sliderCaption() {
    if( $(document).width() < 768 ) {
      if ( sliderWrapper.children('.caption').length === 0 ) {
        slider.find('.caption').clone().appendTo(sliderWrapper);
      }
    } else {
      if ( sliderWrapper.children('.caption').length > 0 ) {
        sliderWrapper.children('.caption').remove();
      }
    }
  }

  // Slider positioning
  function sloganPosition() {
    slogan.css('margin-top', sliderWrapper.height());
  }

  // Mobile menu
  function mobileMenu () {
    if ($(document).width() > 768) {
      menu.hide();
    } else {
      menu.css('height', $(window).height());

      if (menu.find('ul').length === 0 ) {
        $('.menu > ul').clone().appendTo(menu);
      }
    }
  }

  // News SLider
  $('.bxslider').bxSlider({
    auto: true,
    autoControls: false,
    pager: false,
    minSlides: 1,
    maxSlides: 1,
    moveSlides: 1,
    slideMargin: 1
  });

  // Slider
  $('.rslides').responsiveSlides({
    auto: true,
    pager: true,
    nav: false,
    speed: 500,
    before: function() {
    },
    after: function() {
      var currentSlide = $('.rslides_here').index();
      sliderWrapper.children('.caption').removeClass('here');
      sliderWrapper.children('.caption').eq(currentSlide).addClass('here');
      sloganPosition();
    }
  });

  // Init
  sloganPosition();
  mobileMenu();

  // SLider Labels
  sliderWrapper.find('.rslides_tabs li').each(function (index) {
    $(this).find('a').html(slider.find('li').eq(index).find('.name').html());
  });

  $(window).resize(function() {
    sliderCaption();
    sloganPosition();
    mobileMenu();
  });

  // Placeholder for IE
  $('[placeholder]').focus(function() {
    var input = $(this);
    if (input.val() === input.attr('placeholder')) {
      input.val('');
      input.removeClass('placeholder');
    }
  }).blur(function() {
    var input = $(this);
    if (input.val() === '' || input.val() === input.attr('placeholder')) {
      input.addClass('placeholder');
      input.val(input.attr('placeholder'));
    }
  }).blur().parents('form').submit(function() {
    $(this).find('[placeholder]').each(function() {
      var input = $(this);
      if (input.val() === input.attr('placeholder')) {
        input.val('');
      }
    });
  });

  // Back to top
  $('.top-link').click(function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  });

  // Toggle menu
  $('.m-menu-btn').click(function (e) {
    e.preventDefault();
    menu.toggle();
  });

  //Blocks of equal height
  var currentTallest = 0,
     currentRowStart = 0,
     rowDivs = new Array(),
     $el,
     topPosition = 0;

 $('.dealers .row .columns p').each(function() {

   $el = $(this);
   topPostion = $el.position().top;
   
   if (currentRowStart != topPostion) {

     // we just came to a new row.  Set all the heights on the completed row
     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
       rowDivs[currentDiv].height(currentTallest);
     }

     // set the variables for the new row
     rowDivs.length = 0; // empty the array
     currentRowStart = topPostion;
     currentTallest = $el.height();
     rowDivs.push($el);

   } else {

     // another div on the current row.  Add it to the list and check if it's taller
     rowDivs.push($el);
     currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);

  }
   
  // do the last row
   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
     rowDivs[currentDiv].height(currentTallest);
   }
   
 });

});
