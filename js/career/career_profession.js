let carProData = {
    loadData:'',
    loadDataTemp: new Array(),
    industry: new Array(),
    industrySalary: new Array(),
    isDouble: false,
    myChartLHSalary: '',
    myChartIncSalary: '',
    screenWidth: 0,
    rwbChangeProfession: 0,
}

let careerProfessionVueContent = new Vue({
    el: '#car_pro_vue',
    data: carProData,
    mounted() {
        var twoData = false;
        var formData = new FormData();
        if(localStorage.proNo_1 && localStorage.proNo_2){
            formData.append('proNo_1', localStorage.proNo_1);
            formData.append('proNo_2', localStorage.proNo_2);
            formData.append('proNo_2_Use', 1);
            twoData = true;
        }
        else if(localStorage.proNo_1 && !localStorage.proNo_2){
            formData.append('proNo_1', localStorage.proNo_1);
            formData.append('proNo_2_Use', 0);
        }
        else{
            formData.append('proNo_1', localStorage.proNo_2);
            formData.append('proNo_2_Use', 0);
        };
        axios
        .post('./php/carreerProfessionLoadData.php',formData)
        .then((resp) => {
            this.loadData = resp.data;
            this.loadData = this.loadData.split(']');
            for(var i = 0; i < this.loadData.length-1; i++){
                this.loadData[i] = this.loadData[i] + ']';
                this.loadDataTemp[i] = JSON.parse(this.loadData[i]);
            }
            this.industry.push(new Object());
            this.industry[0].typeName = this.loadDataTemp[0][0].類型名稱;
            this.industry[0].backgroundColor = this.loadDataTemp[0][0].類型顏色;
            this.industry[0].name = this.loadDataTemp[0][0].職業名稱;
            this.industry[0].src = this.loadDataTemp[0][0].職業圖片;
            this.industry[0].info = this.loadDataTemp[0][0].職業介紹;
            this.industry[0].content = this.loadDataTemp[0][0].職業內容.split(';').splice(1);
            this.industry[0].skill = this.loadDataTemp[0][0].職業技能.split(';').splice(1);
            if(twoData){
                this.industry.push(new Object());
                this.industry[1].typeName = this.loadDataTemp[0][1].類型名稱;
                this.industry[1].backgroundColor = this.loadDataTemp[0][1].類型顏色;
                this.industry[1].name = this.loadDataTemp[0][1].職業名稱;
                this.industry[1].src = this.loadDataTemp[0][1].職業圖片;
                this.industry[1].info = this.loadDataTemp[0][1].職業介紹;
                this.industry[1].content = this.loadDataTemp[0][1].職業內容.split(';').splice(1);
                this.industry[1].skill = this.loadDataTemp[0][1].職業技能.split(';').splice(1);
            }
            var dataInsertControl = [0, 0];
            for(var i = 0; i < this.loadDataTemp[1].length; i++){
                if(i < 5 && dataInsertControl[0] == 0){
                    this.industrySalary.push(new Object());
                    this.industrySalary[0].typeName = this.loadDataTemp[1][i].類型名稱;
                    this.industrySalary[0].name = this.loadDataTemp[1][i].職業名稱;
                    this.industrySalary[0].salary = new Array();
                    this.industrySalary[0].salary[0 + dataInsertControl[0]*2] = this.loadDataTemp[1][i].最低薪資;
                    this.industrySalary[0].salary[1 + dataInsertControl[0]*2] = this.loadDataTemp[1][i].最高薪資;
                    dataInsertControl[0] = dataInsertControl[0] + 1;
                }
                else if(i < 5){
                    this.industrySalary[0].typeName = this.loadDataTemp[1][i].類型名稱;
                    this.industrySalary[0].name = this.loadDataTemp[1][i].職業名稱;
                    this.industrySalary[0].salary[0 + dataInsertControl[0]*2] = this.loadDataTemp[1][i].最低薪資;
                    this.industrySalary[0].salary[1 + dataInsertControl[0]*2] = this.loadDataTemp[1][i].最高薪資;
                    dataInsertControl[0] = dataInsertControl[0] + 1;
                }
                else if(i >= 5 && dataInsertControl[1] == 0){
                    this.industrySalary.push(new Object());
                    this.industrySalary[1].typeName = this.loadDataTemp[1][i].類型名稱;
                    this.industrySalary[1].name = this.loadDataTemp[1][i].職業名稱;
                    this.industrySalary[1].salary = new Array();
                    this.industrySalary[1].salary[0 + dataInsertControl[1]*2] = this.loadDataTemp[1][i].最低薪資;
                    this.industrySalary[1].salary[1 + dataInsertControl[1]*2] = this.loadDataTemp[1][i].最高薪資;
                    dataInsertControl[1] = dataInsertControl[1] + 1;
                }
                else{
                    this.industrySalary[1].typeName = this.loadDataTemp[1][i].類型名稱;
                    this.industrySalary[1].name = this.loadDataTemp[1][i].職業名稱;
                    this.industrySalary[1].salary[0 + dataInsertControl[1]*2] = this.loadDataTemp[1][i].最低薪資;
                    this.industrySalary[1].salary[1 + dataInsertControl[1]*2] = this.loadDataTemp[1][i].最高薪資;
                    dataInsertControl[1] = dataInsertControl[1] + 1;
                }
            }
            this.lowHeightSalaryPlot();
            this.increaseSalaryPlot();
        }),
        this.screenWidth = document.documentElement.clientWidth;
        if(localStorage.proNo_1 && localStorage.proNo_2){
            this.isDouble = true;
        }
        else if(localStorage.proNo_1 || localStorage.proNo_2){
            this.isDouble = false;
        }
        else{
            alert('請先選擇職業');
            window.location.href = "./career.html";
        }
        // localStorage.clear();
        localStorage.removeItem('proNo_1');
        localStorage.removeItem('proNo_2');
    },
    created() {
        window.addEventListener('resize', this.changeWidth);
        window.addEventListener('resize', this.lowHeightSalaryPlot);
        window.addEventListener('resize', this.increaseSalaryPlot);
    },
    destroyed() {
        window.removeEventListener('resize', this.changeWidth);
        window.removeEventListener('resize', this.lowHeightSalaryPlot);
        window.removeEventListener('resize', this.increaseSalaryPlot);
    },
    methods: {
        changeWidth(e){
            this.screenWidth = document.documentElement.clientWidth;
        },
        changeProfession(index){
            this.rwbChangeProfession = index;
        },
        lowHeightSalaryPlot(){
            if (this.myChartLHSalary != null && this.myChartLHSalary != "" && this.myChartLHSalary != undefined) {
                this.myChartLHSalary.dispose();//銷燬
            }
            var lowSalary_1 = Array(5);
            var hightSalary_1 = Array(5);
            var AreaSalary_1 = Array(5);
            var name_1 = this.industrySalary[0].name;
            for(var temp = 0; temp < 5; temp++){
                lowSalary_1[temp] = this.industrySalary[0].salary[0 + temp*2]
                hightSalary_1[temp] = this.industrySalary[0].salary[1 + temp*2]
                AreaSalary_1[temp] = hightSalary_1[temp] - lowSalary_1[temp];
            }

            this.myChartLHSalary = echarts.init(document.querySelector('.car_pro_lhs_plot'), null, {renderer: 'svg'});

            if(!this.isDouble){
                var option = {
                    title: {
                        text: '最高最低薪資區間',
                        show: false
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter: function (params) {
                            return name_1 + ' - 薪資區間: ' + AreaSalary_1[params[0].dataIndex] + '<br>' + name_1 + ' - 最低薪資: ' + lowSalary_1[params[0].dataIndex] + '<br>' + name_1 + ' - 最高薪資: ' + hightSalary_1[params[0].dataIndex]
                        }
                    },
                    legend: {
                        right: 40,
                        data: [this.industrySalary[0].name + ' - 最高薪資'],
                        formatter: function (name) {
                            return name.split(' ', 1);
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    yAxis: {
                        type: 'category',
                        splitLine: {show: false},
                        data: ['不到一年', '一到三年', '三到五年', '五到十年', '十年以上']
                    },
                    xAxis: {
                        type: 'value',
                        min: 5000 * Math.floor(lowSalary_1[0] / 5000)
                    },
                    series: [
                        {
                            name: this.industrySalary[0].name + ' - 最低薪資',
                            type: 'bar',
                            stack: 'salary',
                            itemStyle: {
                                barBorderColor: 'rgba(0,0,0,0)',
                                color: 'rgba(0,0,0,0)'
                            },
                            data: lowSalary_1
                        },
                        {
                            name: this.industrySalary[0].name + ' - 最高薪資',
                            type: 'bar',
                            stack: 'salary',
                            itemStyle: {
                                barBorderColor: '#119BEB',
                                color: '#119BEB'
                            },
                            label: {
                                show: true,
                                position: 'inside'
                            },
                            data: AreaSalary_1
                        }
                    ]
                };
            }
            else{
                var lowSalary_2 = Array(5);
                var hightSalary_2 = Array(5);
                var AreaSalary_2 = Array(5);
                var name_2 = this.industrySalary[1].name;
                for(var temp = 0; temp < 5; temp++){
                    lowSalary_2[temp] = this.industrySalary[1].salary[0 + temp*2]
                    hightSalary_2[temp] = this.industrySalary[1].salary[1 + temp*2]
                    AreaSalary_2[temp] = hightSalary_2[temp] - lowSalary_2[temp];
                }
                var option = {
                    title: {
                        text: '最高最低薪資區間',
                        show: false
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter: function (params) {
                            return name_1 + ' - 薪資區間: ' + AreaSalary_1[params[0].dataIndex] + '<br>' + name_1 + ' - 最低薪資: ' + lowSalary_1[params[0].dataIndex] + '<br>' + name_1 + ' - 最高薪資: ' + hightSalary_1[params[0].dataIndex] + '<br>' + name_2 + ' - 薪資區間: ' + AreaSalary_2[params[0].dataIndex] + '<br>' + name_2 + ' - 最低薪資: ' + lowSalary_2[params[0].dataIndex] + '<br>' + name_2 + ' - 最高薪資: ' + hightSalary_2[params[0].dataIndex]
                        }
                    },
                    legend: {
                        right: 40,
                        data: [this.industrySalary[0].name + ' - 最高薪資', this.industrySalary[1].name + ' - 最高薪資'],
                        formatter: function (name) {
                            return name.split(' ', 1);
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    yAxis: {
                        type: 'category',
                        splitLine: {show: false},
                        data: ['不到一年', '一到三年', '三到五年', '五到十年', '十年以上']
                    },
                    xAxis: {
                        type: 'value',
                        min: lowSalary_1[0] > lowSalary_2[0]?5000 * Math.floor(lowSalary_2[0] / 5000):5000 * Math.floor(lowSalary_1[0] / 5000)
                    },
                    series: [
                        {
                            name: this.industrySalary[0].name + ' - 最低薪資',
                            type: 'bar',
                            stack: 'salary1',
                            itemStyle: {
                                barBorderColor: 'rgba(0,0,0,0)',
                                color: 'rgba(0,0,0,0)'
                            },
                            data: lowSalary_1
                        },
                        {
                            name: this.industrySalary[0].name + ' - 最高薪資',
                            type: 'bar',
                            stack: 'salary1',
                            itemStyle: {
                                barBorderColor: '#119BEB',
                                color: '#119BEB'
                            },
                            label: {
                                show: true,
                                position: 'inside'
                            },
                            data: AreaSalary_1
                        },
                        {
                            name: this.industrySalary[1].name + ' - 最低薪資',
                            type: 'bar',
                            stack: 'salary2',
                            itemStyle: {
                                barBorderColor: 'rgba(0,0,0,0)',
                                color: 'rgba(0,0,0,0)'
                            },
                            data: lowSalary_2
                        },
                        {
                            name: this.industrySalary[1].name + ' - 最高薪資',
                            type: 'bar',
                            stack: 'salary2',
                            itemStyle: {
                                barBorderColor: '#EE7002',
                                color: '#EE7002'
                            },
                            label: {
                                show: true,
                                position: 'inside'
                            },
                            data: AreaSalary_2
                        }
                    ]
                };
            }
            this.myChartLHSalary.setOption(option);
        },
        increaseSalaryPlot(){
            if (this.myChartIncSalary != null && this.myChartIncSalary != "" && this.myChartIncSalary != undefined) {
                this.myChartIncSalary.dispose();//銷燬
            }
            var lowSalary_1 = Array(5);
            var hightSalary_1 = Array(5);
            var meanSalary_1 = Array(5);
            var increaseSalary_1 = Array(4);
            var name_1 = this.industrySalary[0].name;
            for(var temp = 0; temp < 5; temp++){
                lowSalary_1[temp] = this.industrySalary[0].salary[0 + temp*2];
                hightSalary_1[temp] = this.industrySalary[0].salary[1 + temp*2];
                meanSalary_1[temp] = (parseInt(hightSalary_1[temp]) + parseInt(lowSalary_1[temp])) / 2;
            }
            for(var temp = 1; temp < meanSalary_1.length; temp++){
                increaseSalary_1[temp-1] = ((meanSalary_1[temp] - meanSalary_1[temp-1]) / meanSalary_1[temp-1]) * 100;
                increaseSalary_1[temp-1] = parseFloat(increaseSalary_1[temp-1].toFixed(2))
            }
            this.myChartIncSalary = echarts.init(document.querySelector('.car_pro_inc_plot'), null, {renderer: 'svg'});

            if(!this.isDouble){
                var option = {
                    title: {
                        text: '平均薪資漲幅',
                        show: false
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line'
                        },
                        formatter: function (params) {
                            return name_1 + ': ' + params[0].value + '%'
                        }
                    },
                    legend: {
                        right: 40,
                        data: [name_1 + ' - 薪資漲幅'],
                        formatter: function (name) {
                            return name.split(' ', 1);
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        splitLine: {show: false},
                        data: ['一到三年', '三到五年', '五到十年', '十年以上']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: name_1 + ' - 薪資漲幅',
                            type: 'line',
                            itemStyle: {
                                barBorderColor: '#119BEB',
                                color: '#119BEB'
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: increaseSalary_1
                        }
                    ]
                };
            }
            else{
                var lowSalary_2 = Array(5);
                var hightSalary_2 = Array(5);
                var meanSalary_2 = Array(5);
                var increaseSalary_2 = Array(4);
                var name_2 = this.industrySalary[1].name;
                for(var temp = 0; temp < 5; temp++){
                    lowSalary_2[temp] = this.industrySalary[1].salary[0 + temp*2]
                    hightSalary_2[temp] = this.industrySalary[1].salary[1 + temp*2]
                    meanSalary_2[temp] = parseInt(hightSalary_2[temp]) + parseInt(lowSalary_2[temp])/2;
                }
                for(var temp = 1; temp < meanSalary_2.length; temp++){
                    increaseSalary_2[temp-1] = ((meanSalary_2[temp] - meanSalary_2[temp-1]) / meanSalary_2[temp-1]) * 100
                    increaseSalary_2[temp-1] = parseFloat(increaseSalary_2[temp-1].toFixed(2))
                }
                var option = {
                    title: {
                        text: '平均薪資漲幅',
                        show: false
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line',
                        },
                        formatter: function (params) {
                            if(params.length == 2){
                                return name_1 + ': ' + params[0].value + '%' + '<br>' + name_2 + ': ' + params[1].value + '%'
                            }
                            else if(params.length == 1){
                                return params[0].seriesName.split(' ', 1) + ': ' + params[0].value + '%'
                            }
                        }
                    },
                    legend: {
                        right: 40,
                        data: [name_1 + ' - 薪資漲幅', name_2 + ' - 薪資漲幅'],
                        formatter: function (name) {
                            return name.split(' ', 1);
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        splitLine: {show: false},
                        data: ['一到三年', '三到五年', '五到十年', '十年以上']
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}' + '%'
                        }
                    },
                    series: [
                        {
                            name: name_1 + ' - 薪資漲幅',
                            type: 'line',
                            itemStyle: {
                                barBorderColor: '#119BEB',
                                color: '#119BEB'
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: increaseSalary_1
                        },
                        {
                            name: name_2 + ' - 薪資漲幅',
                            type: 'line',
                            itemStyle: {
                                barBorderColor: '#EE7002',
                                color: '#EE7002'
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: increaseSalary_2
                        }
                    ]
                };
            }
            this.myChartIncSalary.setOption(option);
        }
    }
})