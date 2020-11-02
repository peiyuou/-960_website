//課程vue--要套資料


//postcard
Vue.component('cards', {
    template: `
  <div class="cards">
    <div class="line"></div>
    <div class="allCard">
        <div class="card card--animated" v-for="card in postcards">
            <img class="postCard" :src="card.POS_PIC" alt="">
        </div>
    </div>

  </div> `,
    data() {
        return {
            postcards: []
        }
    },
    methods: {
        slick() {
            $('.allCard').slick({
                slidesToShow: 2,
                autoplay: true,
                autoplaySpeed: 2000,
                arrows: false,
                slidesToScroll: 1,
                pauseOnHover: false,
                responsive: [{
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 571,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    },
                ]
            });
        }
    },

    mounted() {
        // this.postcard_data();
        axios
            .get('./php/front_index_postcard.php')
            .then((res) => { this.postcards = res.data });



    },
    updated() {
        this.slick();

    },
});

new Vue({
    el: '#img'
})



new Vue({
    el: '.message',
    data: {
        messages: [],
        // courses: [],

    },

    methods: {
        forum_data() {
            axios
                .get('./php/front_index_forum.php')
                .then((res) => { this.messages = res.data });

        },



        slick_data() {
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
        }
    },
    mounted() {
        this.forum_data();
    },
    updated() {
        // this.slick_forum();
        this.slick_data();
    },
});


new Vue({
    el: '.screen',
    data: {
        // messages: [],
        courses: [],

    },

    methods: {

        course_data() {
            axios
                .get('./php/front_index_course.php')
                .then((res) => { this.courses = res.data });
        },

        slick_data() {

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
        }
    },
    mounted() {
        this.course_data();
    },
    updated() {
        // this.slick_forum();
        this.slick_data();
    },
});