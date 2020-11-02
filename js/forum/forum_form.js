new Vue({
  el: "#forum_form",
  data() {
    return {
      isOpen: false,
      isShareOpen: false,
      sendmsg:[],
    }
  },
  computed: {

  },
  methods: {
    typeDropdown() {
      if (this.isOpen) {
        this.isOpen = false;
      } else {
        this.isOpen = true
      }
    },
    selectType(type) {
      this.type = type
      this.typeDropdown()
    },
    shareDropdown() {
      if (this.isShareOpen) {
        this.isShareOpen = false;
      } else {
        this.isShareOpen = true
      }
    },
    selectQU(type) {
      this.type = type
      this.shareDropdown()
    },
    sendMsg(){
          axios.post('./php/memberStateCheck.php')
             .then(res => {
              console.log(res);
              this.memberCheck = res.data;
              if (this.memberCheck == 0) {
              alert("請先登入會員");
             window.location.href = "./member_sign_in.html"
            } else {
              
            sessionStorage.setItem("memNo", this.memberCheck.split(";")[0]);
            const memNo = sessionStorage.getItem('memNo');
            
            let DIS_NAME =  document.getElementById("text_topic").value;
            console.log(DIS_NAME);
            let DIS_CLASS =  $("input[name='quType']:checked").val();
            console.log(DIS_CLASS)
            let IND_NO = $("input[name='sortType']:checked").val();
            console.log(IND_NO)
            let DIS_CONTENT = document.getElementById("content").value;
            console.log(DIS_CONTENT)
            
           if(DIS_NAME==""||DIS_CONTENT==""){
                 alert("請填寫內容")
              }else{
                axios.get('./php/forum_discuss.php?action=sendMsg&DIS_NAME=' + DIS_NAME + '&DIS_CLASS=' + DIS_CLASS + '&IND_NO=' + IND_NO + '&DIS_CONTENT=' + DIS_CONTENT + '&MEM_NO=' + memNo).then(res => {
                  console.log(res.data)

                  document.getElementById("content").value="";
                  document.getElementById("text_topic").value="";
                  this.sendmsg.push(res.data[0]);
                  window.location.href = "./forum_discuss.html";
                }) 
              }
            }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
});