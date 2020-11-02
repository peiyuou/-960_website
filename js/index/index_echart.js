new Vue({
    el: '.secondScreen',
    data: {
        myChart: '',
        option: new Object(),
        salAvg: '',
        salStages: [],

    },
    created() {

        this.stageRWD();
        $(window).resize(function() {
            this.myChart.resize();
        })

    },
    mounted() {
        this.salChart();
        this.salStage();
    },
    methods: {
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
    }
})