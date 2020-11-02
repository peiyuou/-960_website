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
    el: 'main.index',
    data: {
        messages: [],
        courses: [],
        myChart: '',
        option: new Object(),
        salAvg: '',
        salStages: [],

    },
    created() {

        this.stageRWD();


    },

    mounted() {
        this.allData();
        this.salChart();
        this.salStage();
        // window.addEventListener('resize', this.resizMychart);

    },
    methods: {
        allData() {
            axios
                .all([
                    axios.get('./php/front_index_forum.php'),
                    axios.get('./php/front_index_course.php')

                ])
                .then(
                    axios.spread((res1, res2) => {
                        this.messages = res1.data;
                        this.courses = res2.data;
                    })
                )
                .then(() => {
                    script = document.createElement("script");
                    script.src = "./js/index/index_slick.js";
                    document.body.appendChild(script);

                })

        },
        salChart() {
            axios
                .get('./php/front_index_salAvg.php')
                .then((res) => {
                    this.salAvg = res.data
                        // console.log(this.salAvg)
                    var salName = new Array();
                    var sal = new Array();
                    for (let i = 0; i < this.salAvg.length; i++) {
                        salName.push(this.salAvg[i].職業名稱)
                        sal.push(this.salAvg[i].薪資平均)

                    }
                    salName.reverse();
                    sal.reverse();

                    this.myChart = echarts.init(document.getElementById("salGraph"));

                    this.option = {

                            tooltip: {},
                            legend: {
                                data: []
                            },
                            xAxis: {},
                            yAxis: {
                                data: salName,
                                axisLabel: {
                                    fontSize: 14
                                }

                            },
                            series: [{
                                name: "平均薪資",
                                type: "bar",
                                data: sal,
                                itemStyle: {
                                    normal: {

                                        color: function(params) {
                                            var colorList = ['#BCEBFF', '#F5F3ED', '#FFE56C'];
                                            return colorList[params.dataIndex]
                                        }
                                    },
                                },

                            }],


                        },
                        this.myChart.setOption(this.option);


                })


        },

        salStage() {
            axios
                .get('./php/front_index_salStage.php')
                .then((res) => { this.salStages = res.data });
        },
        stageRWD() {
            //stage:rwd時開啟文字
            if ($(window).width() > 991) {
                $(".stageRWD").hide();
            } else {
                $(".stageRWD").show();
            };
            $(window).resize(function() {
                if ($(window).width() > 991) {
                    $(".stageRWD").hide();
                } else {
                    $(".stageRWD").show();
                };
            })
        }
    },
    // destroyed() {
    //     // window.removeEventListener('resize', this.resizeMyChart);
    // },

})