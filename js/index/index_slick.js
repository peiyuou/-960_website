$('.message').slick({
    vertical: true,
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [{
            breakpoint: 992,
            settings: {
                slidesToShow: 4,
                // slidesToScroll: 1
            },
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                // slidesToScroll: 1
            }
        },

    ]
});

$('.screen_carousel').slick({
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        },

    ]
});