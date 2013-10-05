$(function() {

  var sliderWrapper = $('.slider-wrapper');
  var slider = sliderWrapper.children('.rslides');
  var slogan = $('.slogan');
  var menu = $('.m-menu');

  // Caption positioning

  function sliderCaption() {
    if ($(document).width() < 768) {
      if (sliderWrapper.children('.caption').length === 0) {
        slider.find('.caption').clone().appendTo(sliderWrapper);
      }
    } else {
      if (sliderWrapper.children('.caption').length > 0) {
        sliderWrapper.children('.caption').remove();
      }
    }
  }

  // Slider positioning

  function sloganPosition() {
    slogan.css('margin-top', sliderWrapper.height());
  }

  // Mobile menu

  function mobileMenu() {
    if ($(document).width() > 768) {
      menu.hide();
    } else {
      menu.css('height', $(window).height());

      if (menu.find('ul').length === 0) {
        $('.menu > ul').clone().appendTo(menu);
      }
    }
  }

  // Dealers blocks equal height

  function dealerBlocksHeight() {
    if ($('.map').length !== 0) {
      if ($(document).width() > 1000) {
        $('.map .row').each(function() {
          var highestBox = 0;

          $('.text', this).each(function() {
            if ($(this).height() > highestBox) {
              highestBox = $(this).height();
            }
          });

          $('.text', this).height(highestBox);
        });
      } else {
        $('.map .row .text').height('auto');
      }
    }
  }

  // Home page News-block SLider

  if ($('.bxslider').length !== 0) {
    $('.bxslider').bxSlider({
      auto: true,
      autoControls: false,
      pager: false,
      minSlides: 1,
      maxSlides: 1,
      moveSlides: 1,
      slideMargin: 1
    });
  }

  // Home page and Product page Slider

  if ($('.rslides').length !== 0) {
    $('.rslides').responsiveSlides({
      auto: true,
      pager: true,
      nav: false,
      speed: 500,
      before: function() {},
      after: function() {
        var currentSlide = $('.rslides_here').index();
        sliderWrapper.children('.caption').removeClass('here');
        sliderWrapper.children('.caption').eq(currentSlide).addClass('here');
        sloganPosition();
      }
    });
  }

  // Init

  sloganPosition();
  mobileMenu();
  dealerBlocksHeight();

  // SLider Labels

  sliderWrapper.find('.rslides_tabs li').each(function(index) {
    $(this).find('a').html(slider.find('li').eq(index).find('.name').html());
  });

  $(window).resize(function() {
    sliderCaption();
    sloganPosition();
    mobileMenu();
    dealerBlocksHeight();
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
    $('html, body').animate({
      scrollTop: 0
    }, 'slow');
  });

  // Toggle menu

  $('.m-menu-btn').click(function(e) {
    e.preventDefault();
    menu.toggle();
  });

});
