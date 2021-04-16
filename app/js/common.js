for(var cart of document.querySelectorAll('.hit__product-icon')) {
  cart.addEventListener('click', function(event) {
    this.classList.toggle('is-active');
  });
 }

document.querySelector('.js-burger').addEventListener('click', function(event) {
    this.classList.toggle('is-active');   
    document.querySelector('.js-dropdown').classList.toggle('is-active');
 
});


$(document).ready(function() {
  $('.carousel-js').on('init', function(event, slick) {
    slick.$slider.append('<div class="counter-slider"><span>'+(slick.currentSlide + 1)+'</span>/'+slick.slideCount+'</div>');
  });
  $('.carousel-js').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    
    slick.$slider.find('.counter-slider span').text(nextSlide + 1);
  });

    $('.carousel-js').slick({
        arrows:  true,
        /*dots: true,*/
        fade: true,
    });

    
    $('.carousel-hit-js').slick({        
      dots: false,
      infinite: true, 
      /*variableWidth: true,*/       
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        
        {
          breakpoint: 1030,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true,
            arrows:  false
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows:  false
          }
        }
        
      ]
    });

    
    $('.phone-js').inputmask('+7 (999) 999-99-99');
    $.validator.addMethod('phone-js', function(value , element){
        return this.optional(element) || $(element).inputmask('unmaskedvalue').length === 10;
    }, 'Введите корректный номер');

    $.validator.addMethod("email-js", function(value, element) {
        return this.optional(element) || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
    }, "Введите корректный email");

    $('.form-js').validate({
        errorPlacement: function(error, element) {
            var $parent = element.parent();
            $parent.append(error);
        },
        submitHandler: function(form) {
            $(form).trigger("formSubmit");
        }        
    });

    $('.form-js').on('formSubmit', function() {
        //alert('Форма отправлена');
    });

    $('.input-name-js').on('input', function() {
        var value = $(this).val();
        value = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s\-]/ig, '');
        $(this).val(value);
    });


    });
