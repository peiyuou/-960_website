let vm = new Vue({
  el: "#forum_discuss",
  data() {
    return {
      signIn: true,
      information: [], //討論區所有文章PHP
      searchResult: [], //點擊側邊欄，過濾後的資料
      announcement: [], //公告PHP
      memberCheck: [], //會員登入PHP
      box_msg: [], //燈箱回覆留言的PHP
      showlike: [], //會員曾經按過的愛心
      like_icon: [], //按愛心的PHP
      isOpen: false, //下拉選單的綁定class的expand
      filter: "", //綁定關鍵字搜尋input
      accuseIsOpen: false, //檢舉燈箱
      contentIsOpen: false, //點擊留言板的燈箱
      type: "all", //側邊搜尋欄
      select: "全部文章", //下拉選單預設
      stopScroll: false, //開啟燈箱背景不可以動
      msg: "", //點擊留言開啟燈箱，第一則文章要跟討論版的同步
      isHeart: [], //點擊愛心
      isCollect: [],
      showCollect: [], //會員曾經按錯的收藏
      memberAccuse: [], //檢舉
      repIndex: -1, //文章檢舉的索引值
      repNo: 0, //文章檢舉第幾篇文章
      feedBoxHeart: [], //點擊愛心 綁定的class顏色，但是未完成
      currentPage: 1, //目前的頁碼
      totalPages: 0,
      accuseinnerIsOpen: false, //回覆留言的檢舉燈箱
      repinnerIndex: -1, //燈箱裡回覆留言的檢舉索引值
      repinnerNo: 0, //燈箱裡回覆留言的檢舉第幾篇文章
      showfeedbacklike: [], // 燈箱回覆留言，會員曾經點過的愛心
      category: [
        {
          link_title: "實作型",
          color: "practical_bg_color"
        },
        {
          link_title: "研究型",
          color: "research_bg_color"
        },
        {
          link_title: "文藝型",
          color: "art_bg_color"
        },
        {
          link_title: "社會型",
          color: "social_bg_color"
        },
        {
          link_title: "企業型",
          color: "enterprise_bg_color"
        },
        {
          link_title: "事務型",
          color: "thing_bg_color"
        }
      ],
      memberAccuse: [
        "重傷、歧視、挑釁、謾罵他人",
        "交換個人資料",
        "惡意洗版、重複張貼",
        "包含色情、露點、性騷擾之內容",
        "包含廣告、商業宣傳之內容",
        "其他原因"
      ]
    };
  },
  mounted() {
    //討論區文章和公告PHP
    axios.all([this.getAllDisscuss(this.currentPage), this.getAnnouncement()]);
    //會員登入後可到曾經點過愛心的按鈕
    axios.post("./php/memberStateCheck.php").then(res => {
      console.log(res);
      this.memberCheck = res.data;
      if (this.memberCheck !== 0) {
        sessionStorage.setItem("memNo", this.memberCheck.split(";")[0]);
        const memNo = sessionStorage.getItem("memNo");
        axios
          .get("./php/forum_discuss.php?action=showLike&MEM_NO=" + memNo)
          .then(res => {
            console.log(res.data);
            this.showlike = res.data;
            // this.showlike = res.data[0].DIS_NO.split(',');

            for (let i = 0; i < this.information.length; i++) {
              var disNo = this.information[i].DIS_NO;

              if (
                this.showlike.find(function(item) {
                  return item.DIS_NO == disNo;
                })
              ) {
                // $(`#dis${this.information[i].DIS_NO}`).style('color', 'red');
                // this.isHeart[i] = true;
                this.isHeart.push(true);
              } else {
                this.isHeart.push(false);
              }
            }
            console.log(this.isHeart);
          });
      }
    });

    //會員登入可以看過曾經點過的收藏
    axios.post("./php/memberStateCheck.php").then(res => {
      console.log(res);
      this.memberCheck = res.data;
      if (this.memberCheck !== 0) {
        sessionStorage.setItem("memNo", this.memberCheck.split(";")[0]);
        const memNo = sessionStorage.getItem("memNo");
        axios
          .get("./php/forum_discuss.php?action=showCollect&MEM_NO=" + memNo)
          .then(res => {
            console.log(res.data);
            this.showCollect = res.data;
            // this.showlike = res.data[0].DIS_NO.split(',');

            for (let i = 0; i < this.information.length; i++) {
              // console.log(this.information[i].DIS_NO);
              // console.log(typeof this.information);
              // console.log(this.showCollect)
              // console.log(this.showCollect.length)
              // console.log(JSON.parse(this.showCollect))
              // console.log(typeof this.showCollect)
              // console.log(typeof this.showCollect)
              var disNo = this.information[i].DIS_NO;
              if (
                this.showCollect.find(function(item) {
                  return item.DIS_NO == disNo;
                })
              ) {
                // $(`#dis${this.information[i].DIS_NO}`).style('color', 'red');
                // this.isCollect[i] = true;
                this.isCollect.push(true);
              } else {
                this.isCollect.push(false);
              }
            }
            console.log(this.isCollect);
          });
      }
    });
  },
  watch: {
    stopScroll: function() {
      console.log(this.stopScroll);
      if (this.stopScroll) {
        document.body.classList.add("noScroll");
      } else {
        document.body.classList.remove("noScroll");
      }
    },
    filter: function(value) {
      if (value.length == 0) {
        this.searchResult = this.information;
      }
    },
    //下拉選單
    select: function(value) {
      this.searchResult = this.information;
      if (value == "全部文章") {
        this.searchResult = this.information;
      } else if (value == "熱門討論") {
        this.searchResult = this.information.sort(function(a, b) {
          return a.DIS_LIK_NUM < b.DIS_LIK_NUM ? 1 : -1;
        });
      } else if (value == "選擇分類") {
        this.searchResult = this.searchResult;
      } else {
        this.searchResult = this.information.filter(function(a, b) {
          return a.DIS_CLASS == value;
        });
      }
    }
  },
  methods: {
    //判斷留言文章時，要是會員
    formBtn() {
      axios
        .post("./php/memberStateCheck.php")
        .then(res => {
          console.log(res);
          this.memberCheck = res.data;
          if (this.memberCheck == 0) {
            alert("請先登入會員");
            window.location.href = "./member_sign_in.html";
          } else {
            sessionStorage.setItem("memNo", this.memberCheck.split(";")[0]);
            const memNo = sessionStorage.getItem("memNo");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //討論區文章(會員曾經按過的愛心)PHP
    getAllDisscuss(pageNo) {
      const memNo = sessionStorage.getItem("memNo");
      axios
        .get(
          "./php/forum_discuss.php?action=getAllDiscuss&MEM_NO=" +
            memNo +
            "&pageNo=" +
            pageNo
        )
        .then(res => {
          console.log(res.data);
          this.totalPages = res.data[0].TOTAL_PAGES;
          console.log(this.totalPages);
          this.currentPage = res.data[0].CURRENT_PAGE;
          this.information = res.data;
          this.searchResult = res.data;
          for (var i = 0; i < res.data.length; i++) {
            console.log(this.searchResult[i].DIS_CONTENT);
            this.searchResult[i].DIS_CONTENT = this.searchResult[
              i
            ].DIS_CONTENT.split(";");
            console.log(this.searchResult[i].DIS_CONTENT);
          }
          // console.log(this.searchResult)
        });
    },
    //討論區公告PHP
    getAnnouncement() {
      axios.get("./php/forum_discuss.php?action=getAnn").then(res => {
        this.announcement = res.data;
      });
    },
    //開啟燈箱按鈕
    openContent(index) {
      this.aaa = index;
      if (this.contentIsOpen) {
        this.contentIsOpen = false;
        this.stopScroll = false;
        this.msg = "";
      } else {
        this.contentIsOpen = true;
        this.stopScroll = true;
        // console.log(this.searchResult[index]);
        this.msg = this.searchResult[index];
        this.msg.index = index;
        if (this.isHeart[index]) {
          document.querySelectorAll(".check_content .heart i")[0].style.color =
            "red";
        } else {
          document.querySelectorAll(".check_content .heart i")[0].style.color =
            "#ada9a9";
        }
        // console.log(this.msg);

        if (this.isCollect[index]) {
          document.querySelectorAll(
            ".check_content .collect_btn i"
          )[0].style.color =
            "black";
        } else {
          document.querySelectorAll(
            ".check_content .collect_btn i"
          )[0].style.color =
            "#ada9a9";
        }
      }

      const memNo = sessionStorage.getItem("memNo");
      axios
        .get(
          "./php/forum_discuss.php?action=getMsg&DIS_NO=" +
            this.searchResult[index].DIS_NO +
            "&MEM_NO=" +
            memNo
        )
        .then(res => {
          this.box_msg = res.data;
          console.log(res.data);
          //燈箱內的愛心放進來，要用for迴圈把它box_msg的資料放進來，並檢查按了哪些愛心
          this.feedBoxHeart = new Array();
          for (let i = 0; i < this.box_msg.length; i++) {
            this.feedBoxHeart.push(false);
          }

          axios.post("./php/memberStateCheck.php").then(res => {
            console.log(res);
            this.memberCheck = res.data;
            if (this.memberCheck !== 0) {
              sessionStorage.setItem("memNo", this.memberCheck.split(";")[0]);
              const memNo = sessionStorage.getItem("memNo");
              console.log(memNo);
              axios
                .get(
                  "./php/forum_discuss.php?action=showinnerBoxLike&MEM_NO=" +
                    memNo
                )
                .then(res => {
                  console.log(res.data);
                  this.showfeedbacklike = res.data;
                  console.log(res.data);
                  console.log(this.showfeedbacklike);
                  // this.showlike = res.data[0].DIS_NO.split(',');
                  console.log(this.box_msg);
                  for (let i = 0; i < this.box_msg.length; i++) {
                    var dis_mes_no = this.box_msg[i].DIS_MES_NO;
                    if (
                      this.showfeedbacklike.find(function(item) {
                        return item.DIS_MES_NO == dis_mes_no;

                        //  console.log(item.DIS_MES_NO == dis_mes_no);
                      })
                    ) {
                      // $(`#dis${this.information[i].DIS_NO}`).style('color', 'red');
                      // this.isHeart[i] = true;
                      console.log(i);
                      console.log(
                        document.querySelectorAll(".forum_overlay .heart i")
                          .length
                      );
                      document
                        .querySelectorAll(".forum_overlay .heart i")
                        [i + 1].classList.add("colorRed");
                      this.feedBoxHeart[i] = true;
                    } else {
                      console.log(i);
                      console.log(dis_mes_no);
                      console.log(this.showfeedbacklike);
                      this.feedBoxHeart[i] = false;
                    }
                  }
                  console.log(this.feedBoxHeart);
                  // alert(dis_mes_no);
                  // alert(this.feedBoxHeart)
                });
            }
          });
        })
        .catch(function(error) {
          console.log(error);
        });

      //燈箱裡回覆留言愛心，會員曾經點過的愛心
    },
    //關閉燈箱
    close_openContent() {
      if (this.contentIsOpen) {
        this.contentIsOpen = false;
        this.stopScroll = false;
      } else {
        this.contentIsOpen = true;
        this.stopScroll = true;
      }
    },

    //側邊欄搜尋
    search(e, type) {
      $(".main_side_bar > ul> li > a").removeClass("side_click");
      e.currentTarget.classList.add("side_click");
      this.select = "選擇分類";
      setTimeout(() => {
        //讓watch先做事，我再篩，不然資料會被蓋過去
        this.searchResult = this.information.filter(
          element => element.IND_CLASS == type
        );
      }, 10);
    },
    //關鍵字搜尋
    searchContent() {
      $(".main_side_bar > ul> li > a").removeClass("side_click");
      const keyword = this.filter;
      const result = this.information.filter(element => {
        // console.log(
        //   element.DIS_NAME.indexOf(keyword) != -1 ||
        //     element.DIS_CONTENT.indexOf(keyword) != -1
        // );
        // debugger;
        return (
          element.DIS_NAME.indexOf(keyword) != -1 ||
          element.DIS_CONTENT[0].indexOf(keyword) != -1
        );
        // return element.d_title == type
      });
      this.searchResult = result;
    },
    //關鍵字搜尋，點擊Enter按鈕事件
    submit() {
      this.searchContent();
    },
    //關閉檢舉燈箱
    btn_modal() {
      if (this.accuseIsOpen || this.accuseinnerIsOpen) {
        this.accuseIsOpen = false;
        this.accuseinnerIsOpen = false;
        this.stopScroll = false;
      } else {
        this.accuseIsOpen = true;
        this.accuseinnerIsOpen = true;
        this.stopScroll = true;
      }
    },
    //開啟檢舉燈箱
    accuse_btn() {
      axios
        .post("./php/memberStateCheck.php") // 送去檢查使用者當前狀態
        .then(resp => {
          if (resp.data == 0) {
            document.querySelector(".bg_of_lightbx").style = "display:block";
          } else {
            // alert("尚未燈入")
            console.log(resp.data);
            if (this.accuseIsOpen) {
              this.accuseIsOpen = false;
              this.stopScroll = false;
            } else {
              this.accuseIsOpen = true;
              this.stopScroll = true;
            }
          }
        });
    },
    //點選檢舉燈箱，要先判斷是不是會員
    changeState() {
      var memAccount = document.querySelector(".input_div #account").value;
      var memCode = document.querySelector(".input_div #code").value;
      var formData = new FormData();
      formData.append("memAccount", memAccount);
      formData.append("memCode", memCode);
      axios.post("./php/memberSignInCheck.php", formData).then(resp => {
        if (resp.data == 0) {
          alert("帳號或密碼錯誤，請重新輸入");
          document.querySelector(".input_div #code").value = "";
        } else {
          //登入成功則燈箱移除
          document.querySelector(".bg_of_lightbx").style = "display:none";
          console.log(resp.data);
          location.reload();
        }
      });
    },
    //點選檢舉燈箱，要先判斷是不是會員，登入成功後，關閉燈箱
    btnClose() {
      document.querySelector(".bg_of_lightbx").style = "display:none";
    },
    //送出檢舉內容到資料庫
    sendAccuse() {
      //檢舉PHP
      axios
        .post("./php/memberStateCheck.php")
        .then(res => {
          console.log(res);
          this.memberCheck = res.data;
          if (this.memberCheck == 0) {
            window.location.href = "./member_sign_in.html";
          } else {
            sessionStorage.setItem("memNo", this.memberCheck.split(";")[0]);
            // sessionStorage.setItem("memName", this.memberCheck.split(";")[1]);
            const memNo = sessionStorage.getItem("memNo");
            // console.log(memNo);
            const content = this.memberAccuse[this.repIndex];
            // console.log(content);
            const repNo = this.repNo;
            // console.log(repNo);

            if (this.repIndex == -1) {
              alert("請選擇檢舉原因");
            } else {
              axios.post(
                "./php/forum_discuss.php?action=accuse&DIS_NO=" +
                  repNo +
                  "&MEM_NO=" +
                  memNo +
                  "&ART_REP_CONTENT=" +
                  content
              );
              alert("檢舉成功，將會為您處理");
              location.reload();
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //燈箱內送出檢舉
    accuse_inner_sendBtn() {
      axios
        .post("./php/memberStateCheck.php")
        .then(res => {
          console.log(res);
          this.memberCheck = res.data;
          if (this.memberCheck == 0) {
            window.location.href = "./member_sign_in.html";
          } else {
            sessionStorage.setItem("memNo", this.memberCheck.split(";")[0]);

            const memNo = sessionStorage.getItem("memNo");
            console.log(memNo);
            const content = this.memberAccuse[this.repinnerIndex];
            console.log(content);
            const repinnerNo = this.repinnerNo;
            console.log(repinnerNo);

            if (this.repinnerIndex == -1) {
              alert("請選擇檢舉原因");
            } else {
              axios.post(
                "./php/forum_discuss.php?action=accuse_inner_btn&DIS_MES_NO=" +
                  repinnerNo +
                  "&MEM_NO=" +
                  memNo +
                  "&MES_REP_CONTENT=" +
                  content
              );
              alert("檢舉成功，將會為您處理");
              location.reload();
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //回覆留言裡的檢舉燈箱開啟
    accuse_innerbox_btn() {
      axios
        .post("./php/memberStateCheck.php") // 送去檢查使用者當前狀態
        .then(resp => {
          if (resp.data == 0) {
            document.querySelector(".bg_of_lightbx").style = "display:block";
          } else {
            if (this.accuseinnerIsOpen) {
              this.accuseIsOpen = false;
              this.stopScroll = false;
            } else {
              this.accuseinnerIsOpen = true;
              this.stopScroll = true;
            }
          }
        });
    },
    //愛心
    heart_btn(index, disNo, conNum) {
      //會員登入PHP
      axios
        .post("./php/memberStateCheck.php")
        .then(resp => {
          if (resp.data == 0) {
            document.querySelector(".bg_of_lightbx").style = "display:block";
          } else {
            if (this.isHeart[index]) {
              document
                .querySelectorAll(".tab_contents .heart i")
                [index].classList.remove("colorRed");

              document.querySelectorAll(".tab_contents .heart i")[
                index
              ].style.color =
                "#ada9a9";

              if (
                document.querySelector(".forum_overlay").classList.length == 2
              ) {
                document
                  .querySelectorAll(".check_content .heart i")[0]
                  .classList.remove("colorRed");
                document.querySelectorAll(
                  ".check_content .heart i"
                )[0].style.color =
                  "#ada9a9";
              }
            } else if (!this.isHeart[index]) {
              document
                .querySelectorAll(".tab_contents .heart i")
                [index].classList.add("colorRed");
              document.querySelectorAll(".tab_contents .heart i")[
                index
              ].style.color =
                "red";
              if (
                document.querySelector(".forum_overlay").classList.length == 2
              ) {
                document
                  .querySelectorAll(".check_content .heart i")[0]
                  .classList.add("colorRed");
                document.querySelectorAll(
                  ".check_content .heart i"
                )[0].style.color =
                  "red";
              }
            }

            this.isHeart[index] = !this.isHeart[index];
            console.log(this.isHeart);
            console.log(
              document.querySelectorAll(".check_content .heart i")[index]
                .classList
            );
            sessionStorage.setItem("memNo", this.memberCheck.split(";")[0]);
            const memNo = sessionStorage.getItem("memNo");
            // $(".msg_content .fa-heart").eq(index).toggleClass("colorRed");
            axios.post(
              "./php/forum_discuss.php?action=addFavor&DIS_NO=" +
                disNo +
                "&MEM_NO=" +
                memNo
            );
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //收藏
    collect_btn(index, disNo, conNum) {
      axios
        .post("./php/memberStateCheck.php")
        .then(resp => {
          if (resp.data == 0) {
            document.querySelector(".bg_of_lightbx").style = "display:block";
          } else {
            if (this.isCollect[index]) {
              document
                .querySelectorAll(".tab_contents .collect_btn i")
                [index].classList.remove("colorGray");
              document.querySelectorAll(".tab_contents .collect_btn i")[
                index
              ].style.color =
                "#ada9a9";

              if (
                document.querySelector(".forum_overlay").classList.length == 2
              ) {
                document
                  .querySelectorAll(".check_content .collect_btn i")[0]
                  .classList.remove("colorGray");
                document.querySelectorAll(
                  ".check_content .collect_btn i"
                )[0].style.color =
                  "#ada9a9";
              }
            } else if (!this.isCollect[index]) {
              document
                .querySelectorAll(".tab_contents .collect_btn i")
                [index].classList.add("colorGray");
              document.querySelectorAll(".tab_contents .collect_btn i")[
                index
              ].style.color =
                "black";

              if (
                document.querySelector(".forum_overlay").classList.length == 2
              ) {
                document
                  .querySelectorAll(".check_content .collect_btn i")[0]
                  .classList.add("colorGray");
                document.querySelectorAll(
                  ".check_content .collect_btn i"
                )[0].style.color =
                  "black";
              }
            }

            this.isCollect[index] = !this.isCollect[index];

            sessionStorage.setItem("memNo", this.memberCheck.split(";")[0]);
            const memNo = sessionStorage.getItem("memNo");
            $(".msg_content .fa-bookmark").eq(index).toggleClass("colorGray");
            axios.post(
              "./php/forum_discuss.php?action=addCol&DIS_NO=" +
                disNo +
                "&MEM_NO=" +
                memNo
            );
            //  window.location.href = "./member_sign_in.html"
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //下拉選單
    toggleDropdown() {
      this.isOpen = !this.isOpen;
      $(".main_side_bar > ul> li > a").removeClass("side_click");
    },
    closeOverlay() {
      this.contentIsOpen = false;
      this.stopScroll = false;
    },
    //側邊欄點擊提示
    cart_click_bg(e) {
      $(".main_side_bar > ul> li > a").removeClass("side_click");
      e.currentTarget.classList.add("side_click");
    },
    //燈箱裡的愛心
    heart_btn_feedback(index, mesno) {
      // alert(index)
      console.log(this.feedBoxHeart);
      console.log(index);
      console.log(mesno);

      axios
        .post("./php/memberStateCheck.php")
        .then(resp => {
          if (resp.data == 0) {
            document.querySelector(".bg_of_lightbx").style = "display:block";
          } else {
            if (this.feedBoxHeart[index]) {
              document
                .querySelectorAll(".forum_feedback .heart i")
                [index].classList.remove("colorRed");
            } else {
              document
                .querySelectorAll(".forum_feedback .heart i")
                [index].classList.add("colorRed");
            }
            this.feedBoxHeart[index] = !this.feedBoxHeart[index];
            console.log(this.feedBoxHeart);
            sessionStorage.setItem("memNo", this.memberCheck.split(";")[0]);
            const DIS_MES_NO = this.box_msg[index].DIS_MES_NO;
            const MEM_NO = sessionStorage.getItem("memNo");
            console.log(DIS_MES_NO);
            axios.post(
              "./php/forum_discuss.php?action=addfeedbackFavor&DIS_MES_NO=" +
                DIS_MES_NO +
                "&MEM_NO=" +
                MEM_NO
            );
            // .then(resp=>{
            //   console.log(resp.data)
            //   });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //討論區文章PHP
    sendMsg(msg_DIS_NO) {
      const content = document.getElementById("send_msg").value;

      axios
        .post("./php/memberStateCheck.php")
        .then(resp => {
          if (resp.data == 0) {
            document.querySelector(".bg_of_lightbx").style = "display:block";
          } else {
            if (content.length <= 0) {
              alert("填寫");
              return;
            } else {
              sessionStorage.setItem("memNo", this.memberCheck.split(";")[0]);
              sessionStorage.setItem("memName", this.memberCheck.split(";")[1]);
              const memNo = sessionStorage.getItem("memNo");
              const memName = sessionStorage.getItem("memName");
              axios
                .post(
                  "./php/forum_discuss.php?action=addReplay&DIS_NO=" +
                    msg_DIS_NO +
                    "&MEM_NO=" +
                    memNo +
                    "&content=" +
                    content
                )
                .then(res => {
                  console.log("-----------");
                  console.log(res.data);
                  document.getElementById("send_msg").value = "";
                  this.box_msg.push(res.data[0]);
                });
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
});
