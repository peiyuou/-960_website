// my-components但這邊可以用駝峰式命名禍首字母大寫都可以讓上面html認得
// 一定要先寫組件Vue.component在new Vue前面
Vue.component('front-style', {
  template: `<div class="front_style row style_list">
              <div class="style">
                <img src="./img/post_card/style1.jpg" alt="style1" class="f_img_s1">
              </div>
              <div class="style">
                <img src="./img/post_card/style2.jpg"
                alt="style2"
                class="f_img_s2">
              </div>
              <div class="style">
                <img src="./img/post_card/style3.jpg"
                alt="style3"
                class="f_img_s3">
              </div>
            </div>`,
});

Vue.component('outline-style', {
  template: `<div class="style_all_outline">
            <div class="outline_style row style_list" >
              <div class="style" v-for="(style,index) in outlineStyle">
                <div @click="changeOutline">
                  <img :src="style.POS_MAT_PIC" :alt="style.POS_MAT_NAME" :class="['outline'+index]"> 
                  <p :class="['outlineP'+index]"></p>
                </div>
              </div>
            </div>
          </div>`,
  data() {
    return {
      outlineStyle: [],
      frontOutline: '',
    }
  },

  mounted() {
    axios.get('./php/postcard_frontStyle.php')
      .then(res => this.outlineStyle = res.data);

  },
  updated() {
    // jqueryScript = document.createElement('script');
    // jqueryScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js';

    // jqueryUIScript = document.createElement('script');
    // jqueryUIScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js';

    // document.body.appendChild(jqueryScript);
    // document.body.appendChild(jqueryUIScript);
    $('#phoneFrontAllStyle .front_all_style .front_style .style').addClass('col-3');
    $('#phoneFrontAllStyle .style_all_outline .outline_style .style').addClass('col-3');
    // 第一個加P標籤
    document.querySelector('.outlineP0').innerText = '無邊框';

  },
  methods: {
    // 換正面外框
    changeOutline(e) {
      let N = e.target.getAttribute('class');

      let imgSrc = $(`.${N}`).attr('src');
      $('#mainImg').show().attr('src', imgSrc);
      $(`.${N}`).parent().parent().siblings().removeClass("active");
      $(`.${N}`).parent().parent().addClass("active");

    }
  },

});

Vue.component('stamp-style', {
  template: `<div class="style_all_stamps">
              <div class="stamps_style row style_list">
               <div class="style" v-for="(stamp,index) in stampStyle">
                  <img :src ="stamp.POS_MAT_PIC" :alt="stamp.POS_MAT_NAME" @click = "changeStamp" :class="['stamp'+index]">
                </div>
              </div>
            </div>`,
  data() {
    return {
      stampStyle: [],
      backStamp: '',
    }
  },
  mounted() {
    axios.get('./php/postcard_stampStyle.php')
      .then(res => this.stampStyle = res.data)
  },
  updated() {
    $('#phoneBackAllStyle .style_all_stamps .stamps_style .style').addClass('col-3');
  },

  methods: {
    // 換背面郵票
    changeStamp(e) {
      let N = e.target.getAttribute('class');
      let imgSrc = $(`.${N}`).attr('src');
      $('#mainStamp').show().attr('src', imgSrc);

      $(`.${N}`).parent().siblings().removeClass("active");
      $(`.${N}`).parent().addClass("active");
    }
  },
});
Vue.component('postmark-style', {
  template: `<div class="style_all_postmarks">
              <div class="postmarks_style row style_list">
                <div class="style" v-for="(postmark,index) in postmarkStyle">
                  <img :src ="postmark.POS_MAT_PIC" :alt="postmark.POS_MAT_NAME" @click="changePostmark" :class="['postmark'+index]">
                </div>
              </div>
            </div>`,
  data() {
    return {
      postmarkStyle: [],
      backPostmark: '',
    }
  },
  mounted() {
    axios.get('./php/postcard_postmarkStyle.php')
      .then(res => this.postmarkStyle = res.data)
  },
  updated() {
    $('#phoneBackAllStyle .style_all_postmarks .postmarks_style .style').addClass('col-3');
  },

  methods: {
    // 換背面郵戳
    changePostmark(e) {
      let N = e.target.getAttribute('class');
      let imgSrc = $(`.${N}`).attr('src');
      $('#postmark').show().attr('src', imgSrc);

      $(`.${N}`).parent().siblings().removeClass("active");
      $(`.${N}`).parent().addClass("active");

    }
  },


});
new Vue({
  el: '#desk',

});
new Vue({
  el: '#phoneFrontAllStyle',

});
new Vue({
  el: '#phoneBackAllStyle',

});