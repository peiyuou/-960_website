let memData = {
    loadData:'',
    loadDataTemp: new Array(),
    memberCheck: 0,
    title: ['會員資料', '我的分析', '我的課程', '我的收藏', '我的明信片', '訂單紀錄'],
    // title: ['會員資料', '我的分析', '我的課程', '我的收藏', '我的明信片', '訂單紀錄', '訊息'],
    liTitle: ['liDat', 'liAna', 'liClas', 'liCol', 'liPos', 'liOrd'],
    // liTitle: ['liDat', 'liAna', 'liClas', 'liCol', 'liPos', 'liOrd', 'liMes'],
    secTitle: ['文章', '課程'],
    memberAccuse: ['重傷、歧視、挑釁、謾罵他人', '交換個人資料', '惡意洗版、重複張貼', '包含色情、露點、性騷擾之內容', '包含廣告、商業宣傳之內容', '其他原因'],
    member: new Object(),
    memberTemp: {
        name: '',
        birthday: '',
        tel: '',
        code: '',
    },
    memberNo: '',
    memberName: '',
    memberAnalysis: new Array(),
    analysisResult: new Array(),
    memberClass: new Array(),
    memberClassCollection: new Array(),
    memberArticle: new Array(),
    memberArticleMessage: new Array(),
    memberArticleOverlay: '',
    memberPostCard: new Array(),
    memberOrder: new Array(),
    memberOrderList: new Array(),
    accuseIsOpen: false,
    currentPage: '會員資料',
    checkAnalysisResult: false,
    checkMemClass: false,
    checkMemClassCollection: false,
    checkMemArticle: false,
    checkMemPostcard: false,
    checkMemOrder: false,
    checkMemMessage: false,
    collecttionChange: false,
    liSecondArrow: -1,
    myChart: '',
    posTemp: '',
    rwdClickPage: false,
    rwdUse: false,
    repIndex: -1,
    repNo: -1,
    repConNum: -1,
    fixMode: false,
    fixNewCode: false,
    newCodeEqual: false,
    newCodeEqualWord: false,
    memImage: null,
    screenWidth : 0
}

let changeMemContent = new Vue({
    el: '#mem_change',
    data: memData,
    mounted() {
        axios
        .post('./php/memberStateCheck.php')
        .then((resp) => {
            this.memberCheck = resp.data;
            // localStorage.memNo = this.memberCheck.split(';')[0];
            if(this.memberCheck == 0){
                window.location.href="./member_sign_in.html"
            }
            else{
                this.memberNo = this.memberCheck.split(';')[0];
                this.memberName = this.memberCheck.split(';')[1];
                var formData = new FormData();
                formData.append('memNo', this.memberCheck.split(';')[0]);
                axios
                .post('./php/memberLoadData.php', formData)
                .then((resp) => {
                    // console.log(resp.data);
                    this.loadData = resp.data;
                    this.loadData = this.loadData.split(']');
                    for(var i = 0; i < this.loadData.length-1; i++){
                        this.loadData[i] = this.loadData[i] + ']';
                        this.loadDataTemp[i] = JSON.parse(this.loadData[i]);
                    }
                    this.member.name = this.loadDataTemp[0][0].MEM_NAME;
                    this.member.tel = this.loadDataTemp[0][0].MEM_TEL;
                    this.member.code = this.loadDataTemp[0][0].MEM_CODE;
                    this.member.email = this.loadDataTemp[0][0].MEM_EMAIL;
                    this.member.src = this.loadDataTemp[0][0].MEM_PIC;
                    this.member.no = this.loadDataTemp[0][0].MEM_NO;
                    this.memImage = this.loadDataTemp[0][0].MEM_PIC;
                    this.member.codeCheck = "";
                    this.member.newCode = "";
                    this.member.checkNewcode = "";
                    for(var i = 0; i < this.loadDataTemp[1].length; i++){
                        this.memberAnalysis.push(new Object());
                        this.memberAnalysis[i].testDate = this.loadDataTemp[1][i].QUIZ_RES_DATE;
                        this.memberAnalysis[i].industType = this.loadDataTemp[1][i].IND_CLASS;
                        this.memberAnalysis[i].industTypeInfo = this.loadDataTemp[1][i].IND_INFO;
                        this.analysisResult.push(new Array(6));
                        this.analysisResult[i][0] = this.loadDataTemp[1][i].QUIZ_RES_TYPE_R;
                        this.analysisResult[i][1] = this.loadDataTemp[1][i].QUIZ_RES_TYPE_I;
                        this.analysisResult[i][2] = this.loadDataTemp[1][i].QUIZ_RES_TYPE_A;
                        this.analysisResult[i][3] = this.loadDataTemp[1][i].QUIZ_RES_TYPE_S;
                        this.analysisResult[i][4] = this.loadDataTemp[1][i].QUIZ_RES_TYPE_E;
                        this.analysisResult[i][5] = this.loadDataTemp[1][i].QUIZ_RES_TYPE_C;
                    }
                    for(var i = 0; i < this.loadDataTemp[2].length; i++){
                        this.memberClass.push(new Object());
                        this.memberClass[i].name = this.loadDataTemp[2][i].SKI_NAME;
                        this.memberClass[i].teacher = this.loadDataTemp[2][i].SKI_TEC_NAME;
                        this.memberClass[i].src = this.loadDataTemp[2][i].SKI_IMG;
                        this.memberClass[i].no = this.loadDataTemp[2][i].SKI_NO;
                    }
                    for(var i = 0; i < this.loadDataTemp[3].length; i++){
                        this.memberClassCollection.push(new Object());
                        this.memberClassCollection[i].name = this.loadDataTemp[3][i].SKI_NAME;
                        this.memberClassCollection[i].teacher = this.loadDataTemp[3][i].SKI_TEC_NAME;
                        this.memberClassCollection[i].src = this.loadDataTemp[3][i].SKI_IMG;
                        this.memberClassCollection[i].no = this.loadDataTemp[3][i].SKI_NO;
                    }
                    var artNO = -1;
                    var artMesNO = 0;
                    var artNoCon = 0;
                    var disNoTemp = 0;
                    var mesNoTemp = 0;
                    for(var i = 0; i < this.loadDataTemp[4].length; i++){
                        if(artNoCon != parseInt(this.loadDataTemp[4][i].DIS_NO)){
                            artNoCon = this.loadDataTemp[4][i].DIS_NO;
                            artNO = artNO + 1;
                            this.memberArticle.push(new Object());
                            this.memberArticle[artNO].title = this.loadDataTemp[4][i].DIS_NAME;
                            this.memberArticle[artNO].no = this.loadDataTemp[4][i].DIS_NO;
                            this.memberArticle[artNO].art = this.loadDataTemp[4][i].MEM_NAME;
                            this.memberArticle[artNO].artPic = this.loadDataTemp[4][i].MEM_PIC;
                            this.memberArticle[artNO].collect = true;
                            this.memberArticle[artNO].date = this.loadDataTemp[4][i].DIS_DATE;
                            this.memberArticle[artNO].content = this.loadDataTemp[4][i].DIS_CONTENT.split(';');
                            this.memberArticle[artNO].disClass = this.loadDataTemp[4][i].DIS_CLASS;
                            this.memberArticle[artNO].disColNum = 0;
                            this.memberArticle[artNO].backgroundColor = this.loadDataTemp[4][i].IND_COLOR;
                            this.memberArticle[artNO].indClass = this.loadDataTemp[4][i].IND_CLASS;
                            disNoTemp = this.loadDataTemp[4][i].DIS_NO;
                            if(this.loadDataTemp[8].find(function(item){return item.DIS_NO == disNoTemp})){
                                this.memberArticle[artNO].like = true;
                            }
                            else{
                                this.memberArticle[artNO].like = false;
                            }
                            if(this.loadDataTemp[10].find(function(item){return item.DIS_NO == disNoTemp})){
                                this.memberArticle[artNO].report = true;
                            }
                            else{
                                this.memberArticle[artNO].report = false;
                            }
                            artMesNO = 0;
                            this.memberArticleMessage.push(new Array());
                            this.memberArticleMessage[artNO].push(new Object());
                            this.memberArticleMessage[artNO][artMesNO].name = this.loadDataTemp[4][i].留言者;
                            this.memberArticleMessage[artNO][artMesNO].no = this.loadDataTemp[4][i].DIS_MES_NO;
                            this.memberArticleMessage[artNO][artMesNO].content = this.loadDataTemp[4][i].DIS_MES_CONTENT;
                            this.memberArticleMessage[artNO][artMesNO].date = this.loadDataTemp[4][i].DIS_MES_DATE;
                            this.memberArticleMessage[artNO][artMesNO].src = this.loadDataTemp[4][i].留言者照片;
                            mesNoTemp = this.loadDataTemp[4][i].DIS_MES_NO;
                            if(this.loadDataTemp[9].find(function(item){return item.DIS_MES_NO == mesNoTemp})){
                                this.memberArticleMessage[artNO][artMesNO].like = true;
                            }
                            else{
                                this.memberArticleMessage[artNO][artMesNO].like = false;
                            }
                            if(this.loadDataTemp[11].find(function(item){return item.DIS_MES_NO == mesNoTemp})){
                                this.memberArticleMessage[artNO][artMesNO].report = true;
                            }
                            else{
                                this.memberArticleMessage[artNO][artMesNO].report = false;
                            }
                            artMesNO = artMesNO + 1;
                        }
                        else{
                            this.memberArticleMessage[artNO].push(new Object());
                            this.memberArticleMessage[artNO][artMesNO].name = this.loadDataTemp[4][i].留言者;
                            this.memberArticleMessage[artNO][artMesNO].no = this.loadDataTemp[4][i].DIS_MES_NO;
                            this.memberArticleMessage[artNO][artMesNO].content = this.loadDataTemp[4][i].DIS_MES_CONTENT;
                            this.memberArticleMessage[artNO][artMesNO].date = this.loadDataTemp[4][i].DIS_MES_DATE;
                            this.memberArticleMessage[artNO][artMesNO].src = this.loadDataTemp[4][i].留言者照片;
                            mesNoTemp = this.loadDataTemp[4][i].DIS_MES_NO;
                            if(this.loadDataTemp[9].find(function(item){return item.DIS_MES_NO == mesNoTemp})){
                                this.memberArticleMessage[artNO][artMesNO].like = true;
                            }
                            else{
                                this.memberArticleMessage[artNO][artMesNO].like = false;
                            }
                            if(this.loadDataTemp[11].find(function(item){return item.DIS_MES_NO == mesNoTemp})){
                                this.memberArticleMessage[artNO][artMesNO].report = true;
                            }
                            else{
                                this.memberArticleMessage[artNO][artMesNO].report = false;
                            }
                            artMesNO = artMesNO + 1;
                        }
                    }
                    for(var i = 0;i <  this.memberArticle.length; i++){
                        this.memberArticle[i].mesLength = this.memberArticleMessage[i].length;
                    }
                    for(var i = 0; i < this.loadDataTemp[5].length; i++){
                        this.memberPostCard.push(new Object());
                        this.memberPostCard[i].creatDate = this.loadDataTemp[5][i].POS_CRE_DATE;
                        this.memberPostCard[i].sentDate = this.loadDataTemp[5][i].POS_SEN_DATE;
                        this.memberPostCard[i].postSrc = this.loadDataTemp[5][i].POS_PIC;
                        this.memberPostCard[i].no = this.loadDataTemp[5][i].POS_NO;
                        this.memberPostCard[i].postSrcBack = this.loadDataTemp[5][i].POS_PIC_BACK;
                        if(new Date(this.loadDataTemp[5][i].POS_SEN_DATE) <= new Date()){
                            this.memberPostCard[i].postSend = true;
                        }
                        else{
                            this.memberPostCard[i].postSend = false;
                        }
                    }
                    var orderNo;
                    var orderNoCon = 0;
                    var orderLisCon;
                    for(var i = 0; i < this.loadDataTemp[7].length; i++){
                        this.memberOrder.push(new Object());
                        this.memberOrderList[i] = new Array();
                        for(var orderNo = 0; orderNo < parseInt(this.loadDataTemp[7][i].商品數量); orderNo++){
                            if(parseInt(this.loadDataTemp[7][i].商品數量) == 1){
                                this.memberOrder[i].title = this.loadDataTemp[6][orderNoCon + orderNo].SKI_NAME;
                                this.memberOrder[i].ordNo = this.loadDataTemp[6][orderNoCon + orderNo].ORD_NO;
                                this.memberOrder[i].buyDate = this.loadDataTemp[6][orderNoCon + orderNo].ORD_DATE.split(' ')[0];
                                this.memberOrder[i].price = this.loadDataTemp[6][orderNoCon + orderNo].ORD_AMOUNT;
                                orderLisCon = 0;
                                this.memberOrderList[i].push(new Object());
                                this.memberOrderList[i][orderLisCon].name = this.loadDataTemp[6][orderNoCon + orderNo].SKI_NAME;
                                this.memberOrderList[i][orderLisCon].teacher = this.loadDataTemp[6][orderNoCon + orderNo].SKI_TEC_NAME;
                                this.memberOrderList[i][orderLisCon].src = this.loadDataTemp[6][orderNoCon + orderNo].SKI_IMG;
                                this.memberOrderList[i][orderLisCon].no = this.loadDataTemp[6][orderNoCon + orderNo].SKI_NO;
                            }
                            else if(orderNo == 0){
                                this.memberOrder[i].title = this.loadDataTemp[7][i].商品數量 + "門課程";
                                this.memberOrder[i].ordNo = this.loadDataTemp[6][orderNoCon + orderNo].ORD_NO;
                                this.memberOrder[i].buyDate = this.loadDataTemp[6][orderNoCon + orderNo].ORD_DATE.split(' ')[0];
                                this.memberOrder[i].price = this.loadDataTemp[6][orderNoCon + orderNo].ORD_AMOUNT;
                                orderLisCon = 0;
                                this.memberOrderList[i] = new Array();
                                this.memberOrderList[i].push(new Object());
                                this.memberOrderList[i][orderLisCon].name = this.loadDataTemp[6][orderNoCon + orderNo].SKI_NAME;
                                this.memberOrderList[i][orderLisCon].teacher = this.loadDataTemp[6][orderNoCon + orderNo].SKI_TEC_NAME;
                                this.memberOrderList[i][orderLisCon].src = this.loadDataTemp[6][orderNoCon + orderNo].SKI_IMG;
                                this.memberOrderList[i][orderLisCon].no = this.loadDataTemp[6][orderNoCon + orderNo].SKI_NO;
                            }
                            else{
                                orderLisCon = orderLisCon + 1;
                                this.memberOrderList[i].push(new Object());
                                this.memberOrderList[i][orderLisCon].name = this.loadDataTemp[6][orderNoCon + orderNo].SKI_NAME;
                                this.memberOrderList[i][orderLisCon].teacher = this.loadDataTemp[6][orderNoCon + orderNo].SKI_TEC_NAME;
                                this.memberOrderList[i][orderLisCon].src = this.loadDataTemp[6][orderNoCon + orderNo].SKI_IMG;
                                this.memberOrderList[i][orderLisCon].no = this.loadDataTemp[6][orderNoCon + orderNo].SKI_NO;
                            }
                        }
                        orderNoCon = orderNoCon + orderNo;
                    }
                    artNO = this.memberArticle.length;
                    for(var i = 0;i < this.loadDataTemp[12].length; i++){
                        disNoTemp = this.loadDataTemp[12][i].DIS_NO;
                        if(this.memberArticle.find(function(item){return item.no == disNoTemp})){
                            // console.log(this.loadDataTemp[12][i].DIS_NO)
                        }
                        else{
                            this.memberArticle.push(new Object());
                            console.log(this.memberArticle);
                            this.memberArticle[artNO].title = this.loadDataTemp[12][i].DIS_NAME;
                            this.memberArticle[artNO].no = this.loadDataTemp[12][i].DIS_NO;
                            this.memberArticle[artNO].art = this.loadDataTemp[12][i].MEM_NAME;
                            this.memberArticle[artNO].artPic = this.loadDataTemp[12][i].MEM_PIC;
                            this.memberArticle[artNO].collect = true;
                            this.memberArticle[artNO].date = this.loadDataTemp[12][i].DIS_DATE;
                            this.memberArticle[artNO].content = this.loadDataTemp[12][i].DIS_CONTENT.split(';');
                            this.memberArticle[artNO].disClass = this.loadDataTemp[12][i].DIS_CLASS;
                            this.memberArticle[artNO].disColNum = 0;
                            this.memberArticle[artNO].backgroundColor = this.loadDataTemp[12][i].IND_COLOR;
                            this.memberArticle[artNO].indClass = this.loadDataTemp[12][i].IND_CLASS;
                            if(this.loadDataTemp[8].find(function(item){return item.DIS_NO == disNoTemp})){
                                this.memberArticle[artNO].like = true;
                            }
                            else{
                                this.memberArticle[artNO].like = false;
                            }
                            this.memberArticle[artNO].mesLength = 0
                            this.memberArticleMessage.push(new Array());
                        }
                    }
                    // console.log(resp.data);
                    // console.log(this.loadDataTemp);
                    // console.log(this.memberClass);

                    this.screenWidth = document.documentElement.clientWidth;
                    this.myChart = Array(this.analysisResult.length);
                    if(this.screenWidth >= 992){
                        var liChange = document.querySelectorAll('.mem_list>ul>li');
                        liChange[0].style.backgroundColor = '#A0CADB';
                    }
                    if(this.screenWidth < 768){
                        this.rwdUse = true;
                    }
                    else{
                        this.rwdUse = false;
                    }
                    if(this.analysisResult.length != 0){
                        this.checkAnalysisResult = true;
                    }
                    if(this.memberClass.length != 0){
                        this.checkMemClass = true;
                    }
                    if(this.memberClassCollection.length != 0){
                        this.checkMemClassCollection = true;
                    }
                    if(this.memberArticle.length != 0){
                        this.checkMemArticle = true;
                    }
                    if(this.memberPostCard.length != 0){
                        this.checkMemPostcard = true;
                    }
                    if(this.memberOrder.length != 0){
                        this.checkMemOrder = true;
                    }
                    // if(this.memberMessage.length != 0){
                    //     this.checkMemMessage = true;
                    // }
                });
            }
        });
    },
    created() {
        window.addEventListener('resize', this.changeWidth);
        window.addEventListener('resize', this.plotRadarReSize);
        window.addEventListener('load', function(){
            if(document.documentElement.clientWidth > 991){
                document.querySelector("#header_cart").style.display = "block";
            }
            else{
                document.querySelector("#header_cart").style.display = "none";
            }
        });
        window.addEventListener('resize', function(){
            if(document.documentElement.clientWidth > 991){
                document.querySelector("#header_cart").style.display = "block";
            }
            else{
                document.querySelector("#header_cart").style.display = "none";
            }
        });
    },
    destroyed() {
        window.removeEventListener('resize', this.changeWidth);
    },
    methods: {
        changeWidth(e){
            this.screenWidth = document.documentElement.clientWidth;
            if(this.screenWidth < 992){
                var liChange = document.querySelectorAll('.mem_list>ul>li');
                for(var i = 0; i < liChange.length; i++){
                    liChange[i].style.backgroundColor = 'transparent';
                }
            }
            if(this.screenWidth < 768){
                this.rwdUse = true;
            }
            else{
                this.rwdUse = false;
            }
        },
        changePages(e){
            var liChange = document.querySelectorAll('.mem_list>ul>li');
            var liShowSecond = document.querySelectorAll('.mem_list>ul>li')[3].querySelector('ul');
            for(var i = 0; i < liChange.length; i++){
                liChange[i].style.backgroundColor = 'transparent';
            }
            liChange[e].style.backgroundColor = '#A0CADB';
            if(e != 3){
                liShowSecond.classList.remove('li_sec_show');
                this.liSecondArrow = -1;
            }
            else if(this.screenWidth < 975 && e == 3){
                liShowSecond.classList.toggle('li_sec_show');
                this.liSecondArrow = -1;
            }
            else{
                liShowSecond.classList.add('li_sec_show');
                this.liSecondArrow = 0;
                this.collecttionChange = false;
            }
            this.currentPage = this.title[e];
        },
        changeSecondPages(e){
            this.currentPage = this.title[3];
            if(975 < this.screenWidth){
                var liChange = document.querySelectorAll('.mem_list>ul>li');
                for(var i = 0; i < liChange.length; i++){
                // liChange[i].style.backgroundColor = 'transparent';
                }
            }
            this.liSecondArrow = e;
            if(e == 0){
                this.collecttionChange = false;
            }
            else{
                this.collecttionChange = true;
            }
        },
        rwdChangePages(e){
            if(this.screenWidth < 975 && e != 3){
                return this.rwdClickPage = !this.rwdClickPage;
            };
        },
        changeImage(e){
            var input = e.target;
            if (input.files){
                var reader = new FileReader();
                reader.onload = (e) => {
                  this.member.src = e.target.result;
                  this.memImage = e.target.result;
                }
                reader.readAsDataURL(input.files[0]);
                imageSend = new FormData();
                imageSend.append('imageStore', input.files[0]);
                imageSend.append('memNo', this.memberCheck.split(';')[0]);
                axios
                .post('./php/memberUpdateImage.php',imageSend)
                .then((resp) => {
                    console.log(resp.data);
                })
            }
        },
        showPage(index){
            document.querySelectorAll('.mem_ana_area')[index].querySelector('.mem_ana_det').classList.toggle('show');
            var arrowChange = document.querySelectorAll('.mem_ana_area')[index].querySelector('.fas');
            var spanText = document.querySelectorAll('.mem_ana_area')[index].querySelector('span');
            if(spanText.textContent == "詳細資訊"){
                spanText.textContent = "關閉資訊";
                arrowChange.style.transform = "rotate(180deg)";
            }
            else{
                spanText.textContent = "詳細資訊";
                arrowChange.style.transform = "rotate(0deg)";
            }
        },
        plotRadar(index, anaValue){
            this.myChart[index] = echarts.init(document.querySelectorAll('.mem_ana_area')[index].querySelector('.mem_plot'), null, {renderer: 'svg'});
            var option = {
                baseOption: {
                    title: {
                        text: '分析結果',
                        show: false
                    },
                    tooltip: {},
                    legend: {
                        data: ['分析結果'],
                        show: false
                    },
                    radar: {
                        shape: 'circle',
                        name: {
                            textStyle: {
                                color: 'black',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 1]
                            }
                        },
                        indicator: [
                            { name: '實作型（R）', max: 100},
                            { name: '研究型（I）', max: 100},
                            { name: '文藝型（A）', max: 100},
                            { name: '社會型（S）', max: 100},
                            { name: '企業型（E）', max: 100},
                            { name: '事務型（C）', max: 100}
                        ]
                    },
                    series: [{
                        name: '分析結果',
                        type: 'radar',
                        areaStyle: {normal: {}},
                        data: [
                            {
                                value: anaValue,
                                name: '分析結果'
                            }
                        ],
                        lineStyle: {
                            color: "rgba(50, 87, 200, 1)"
                        },
                        symbolSize: 10,
                        symbol: "diamond"
                    }]
                },
                media: [
                    {
                        query: {
                            minWidth: 200,
                            maxHeight: 300
                        },
                        option: {
                            series:[{
                                center: ['50%', '50%']
                            }]
                        }
                    }
                ]
            };
            this.myChart[index].setOption(option);
        },
        plotRadarReSize(){
            if(document.querySelectorAll('.mem_plot').length > 0){
                for(var i = 0; i < this.myChart.length; i = i + 1){
                    if(typeof this.myChart[i] != "undefined"){
                        // console.log(i);
                        var index = i;
                        var anaValue = this.analysisResult[i];
                        if (this.myChart[index] != null && this.myChart[index] != "" && this.myChart[index] != undefined) {
                            this.myChart[index].dispose();//銷燬
                        }
                        this.myChart[index] = echarts.init(document.querySelectorAll('.mem_ana_area')[index].querySelector('.mem_plot'), null, {renderer: 'svg'});
                        var option = {
                            baseOption: {
                                title: {
                                    text: '分析結果',
                                    show: false
                                },
                                tooltip: {},
                                legend: {
                                    data: ['分析結果'],
                                    show: false
                                },
                                radar: {
                                    shape: 'circle',
                                    name: {
                                        textStyle: {
                                            color: 'black',
                                            backgroundColor: '#999',
                                            borderRadius: 3,
                                            padding: [3, 1]
                                        }
                                    },
                                    indicator: [
                                        { name: '實作型（R）', max: 100},
                                        { name: '研究型（I）', max: 100},
                                        { name: '文藝型（A）', max: 100},
                                        { name: '社會型（S）', max: 100},
                                        { name: '企業型（E）', max: 100},
                                        { name: '事務型（C）', max: 100}
                                    ]
                                },
                                series: [{
                                    name: '分析結果',
                                    type: 'radar',
                                    areaStyle: {normal: {}},
                                    data: [
                                        {
                                            value: anaValue,
                                            name: '分析結果'
                                        }
                                    ],
                                    lineStyle: {
                                        color: "rgba(50, 87, 200, 1)"
                                    },
                                    symbolSize: 10,
                                    symbol: "diamond"
                                }]
                            },
                            media: [
                                {
                                    query: {
                                        minWidth: 200,
                                        maxHeight: 300
                                    },
                                    option: {
                                        series:[{
                                            center: ['50%', '50%']
                                        }]
                                    }
                                }
                            ]
                        };
                        this.myChart[index].setOption(option);
                    }
                }
            }
        },
        showOrderPage(index){
            document.querySelectorAll('.mem_ord_area')[index].querySelector('.mem_ord_det').classList.toggle('show');
            var arrowChange = document.querySelectorAll('.mem_ord_area')[index].querySelector('.fas');
            var spanText = document.querySelectorAll('.mem_ord_area')[index].querySelector('span');
            if(spanText.textContent == "詳細資訊"){
                spanText.textContent = "關閉資訊";
                arrowChange.style.transform = "rotate(180deg)";
            }
            else{
                spanText.textContent = "詳細資訊";
                arrowChange.style.transform = "rotate(0deg)";
            }
        },
        oldDataTempSave(tempData){
            if(!this.fixMode){
                this.memberTemp.name = tempData.name;
                this.memberTemp.tel = tempData.tel;
                this.memberTemp.birthday = tempData.birthday;
                this.memberTemp.code = tempData.code;
                this.fixMode = !this.fixMode;
            }
            else if(this.member.newCode.length < 10 && (this.member.codeCheck.length != 0)){
                alert("密碼長度至少為10");
                this.member.newCode = '';
                this.member.checkNewcode = '';
                this.member.codeCheck = '';
                this.newCodeEqualWord = false;
            }
            else if(this.newCodeEqual || (this.member.codeCheck.length == 0)){
                var formMemberData = new FormData();
                formMemberData.append('memNo', this.memberCheck.split(';')[0]);
                formMemberData.append('memName', this.member.name);
                formMemberData.append('memTel', this.member.tel);
                if(this.member.codeCheck.length == 0){
                    formMemberData.append('memCode', this.memberTemp.code);
                }
                else{
                    formMemberData.append('memCode', this.member.newCode);
                }
                axios
                .post('./php/memberUpdateData.php',formMemberData)
                this.member.code = tempData.checkNewcode;
                this.fixMode = !this.fixMode;
                this.member.newCode = '';
                this.member.checkNewcode = '';
                this.member.codeCheck = '';
                this.memberTemp.name = '';
                this.memberTemp.tel = '';
                this.memberTemp.birthday = '';
                this.memberTemp.code = '';
                this.newCodeEqualWord = false;
                this.newCodeEqual = false;
            }
            else{
                alert("錯誤！請確認：1.欄位不可為空2.新密碼是否輸入正確")
                this.member.newCode = '';
                this.member.checkNewcode = '';
                this.member.codeCheck = '';
                this.newCodeEqualWord = false;
            }
            this.fixNewCode = false;
        },
        oldDataTempUse(tempData){
            if(!this.fixMode){
                this.member.name = tempData.name;
                this.member.tel = tempData.tel;
                this.member.birthday = tempData.birthday;
                this.member.code = tempData.code;
                this.member.codeCheck = '';
                this.member.newCode = '';
                this.member.checkNewcode = '';
                this.newCodeEqualWord = false;
                this.newCodeEqual = false;
            }
            this.fixNewCode = false;
        },
        checkCode(value){
            if(value == this.memberTemp.code){
                this.fixNewCode = true;
            }
        },
        checkNewCodeEqual(value){
            if(value == this.member.newCode){
                this.newCodeEqual = true;
            }
            else{
                this.newCodeEqual = false;
            }
        },
        openArtPage(index){
            document.querySelector('.mem_overlay').classList.add('artShow');
            this.memberArticleOverlay = this.memberArticle[index];
            this.memberArticleOverlay.index = index;
        },
        openPosPage(index){
            this.posTemp = this.memberPostCard[index];
            document.querySelector('.ove_pos').classList.add('artShow');
        },
        closeArtPage(){
            document.querySelector('.mem_overlay').classList.remove('artShow');
        },
        closePosPage(){
            document.querySelector('.ove_pos').classList.remove('artShow');
            this.posNo = -1;
        },
        sendMessage(DIS_NO, index, msgIndex){
            var msgTemp = document.querySelector('.send_msg').value;
            if(msgTemp.length == 0){
                alert("請輸入訊息")
            }
            else{
                var dateTemp = new Date().getFullYear() + '-' + (new Date().getMonth()+1<10 ? '0' : '') + parseInt(new Date().getMonth()+1) + '-' + (new Date().getDate()<10 ? '0' : '') + new Date().getDate();
                this.memberArticleMessage[index].push(new Object());
                this.memberArticleMessage[index][msgIndex].name = this.memberName;
                this.memberArticleMessage[index][msgIndex].content = msgTemp;
                this.memberArticleMessage[index][msgIndex].date = dateTemp;
                this.memberArticleMessage[index][msgIndex].src = this.member.src;
                this.memberArticleMessage[index][msgIndex].like = false;
                this.memberArticleMessage[index][msgIndex].report = false;
                this.memberArticle[index].mesLength = msgIndex + 1;
                document.querySelector('.send_msg').value = "";
                var mesData = new FormData();
                mesData.append('DIS_NO', DIS_NO);
                mesData.append('MEM_NO', this.memberNo);
                mesData.append('DIS_MES_CONTENT', msgTemp);
                mesData.append('DIS_MES_DATE', dateTemp);
                axios
                .post('./php/memberInsertMessage.php', mesData)
                .then((resp) => {
                    this.memberArticleMessage[index][msgIndex].no = resp.data;
                })
            }
        },
        changeCollect(DIS_NO){
            var colData = new FormData();
            colData.append('DIS_NO', DIS_NO);
            colData.append('MEM_NO', this.memberNo);
            axios
            .post('./php/memberArticleCollect.php', colData)
        },
        changeArticleLike(DIS_NO){
            var colData = new FormData();
            colData.append('DIS_NO', DIS_NO);
            colData.append('MEM_NO', this.memberNo);
            axios
            .post('./php/memberArticleLike.php', colData)
        },
        changeMessageLike(MES_NO){
            var colData = new FormData();
            colData.append('DIS_MES_NO', MES_NO);
            colData.append('MEM_NO', this.memberNo);
            axios
            .post('./php/memberMessageLike.php', colData)
            .then((resp) => {console.log(resp.data)})
        },
        closeAccuse(){
            if(this.repIndex != -1){
                document.querySelectorAll('.radio')[this.repIndex].checked = false;
            }
            this.repConNum = -1;
            this.repNo = -1;
        },
        sendReport(){
            var repData = new FormData();
            repData.append('REP_CON_TEMP', this.repConNum);
            repData.append('REP_NO', this.repNo);
            repData.append('MEM_NO', this.memberNo);
            repData.append('ART_REP_CONTENT', this.memberAccuse[this.repIndex]);
            axios
            .post('./php/memberReport.php', repData)
            .then((resp) =>{
                console.log(resp.data);
                if(resp.data == 1){
                    alert("感謝您的檢舉，我們將盡速處裡")
                }
                else{
                    alert("您已經檢舉過了")
                }
            })
            this.accuseIsOpen = false;
            this.repConNum = -1;
            this.repNo = -1;
        },
        goToClass(no){
            var videoUrl = './php/member-video.php';
            var videoForm = document.createElement("form");
            videoForm.action = videoUrl;
            videoForm.method = "POST";
            videoForm.style.display = "none";
            var videoData = document.createElement("input");
            videoData.type = "hidden";
            videoData.name = "SKI_NO";
            videoData.value = no;
            videoForm.appendChild(videoData);
            document.body.appendChild(videoForm);
            videoForm.submit();
            document.body.removeChild(videoForm);
        }
    },
})