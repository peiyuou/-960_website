// const imagemin = require("gulp-imagemin");

// 計時器
var nowtime=0
setInterval(
  function(){
    nowtime=nowtime+1;
    $(".timimg").text(nowtime);},1000);

// vueHere
let data ={
  quizData:[],
  width:0,
  index:0,
  totalScore : [0,0,0,0,0,0],
}

// var totalScore = [0,0,0,0,0,0]
// 以上順序分別代表[R,A,I,S,E,C] 
// 用if else * 6 去跑
// e.g. if value = A, 就在total[0] 加一

let testtest = new Vue({
  el: '#testProcess',
  data: data,
  mounted() {
    axios
    .get('./php/test_content.php')
    .then((res) =>{
        this.quizData = res.data
    });
  },
  methods: {
      changeIndex(change, value){ //進到下一個
        this.index += change;
        // alert(value);
        if (value ==='R'){
          this.totalScore[0] = this.totalScore[0]+1
        } else if(value ==='I'){
          this.totalScore[1] = this.totalScore[1]+1
        } else if(value ==='A'){
          this.totalScore[2] = this.totalScore[2]+1
        } else if(value ==='S'){
          this.totalScore[3] = this.totalScore[3]+1
        } else if(value ==='E'){
          this.totalScore[4] = this.totalScore[4]+1
        } else if(value ==='C'){
          this.totalScore[5] = this.totalScore[5]+1
        } 

      },
      divWidth(){   
      console.log('click')
    },
    changePage(){
      if( this.index === 18 ){
        // localStorage.result = this.totalScore;
        for(i=0;i<this.totalScore.length;i++){    // 賦予六個值新的值
          if(this.totalScore[i] > 4 ){
          this.totalScore[i] = Math.floor(1/(1 + Math.pow(Math.E, -(this.totalScore[i]-6))) * 100) + Math.floor(Math.random() * 10);
          }else{
          this.totalScore[i] = Math.floor(1/(1 + Math.pow(Math.E, -(this.totalScore[i]-6))) * 100) + Math.floor(Math.random() * 10) + 20 
          };
      };
        localStorage.result = this.totalScore;
        window.location.href = "./test_result.html";
        // localStorage.result = this.totalScore;
      }
    } 
  },
  computed:{
    divStyle:function(){   //進度條每次點擊後增加30px
      return {
        width: this.width+'%',
      }
    }
  }
  
})

