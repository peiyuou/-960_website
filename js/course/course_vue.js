let vm = new Vue({
  el: "#course_main",
  data() {
    return {
      // 共用
      cart_items: [],
      mem_check: 0,
      mem_boughtCourse: [],
      // 燈箱變數
      signIn: true,

      // course_main.html
      category: [
        {
          link_from: "practical",
          link_to: "practical_session",
          link_title: "實作型",
          color: "practical_bg_color",
          courses: [],
        },
        {
          link_from: "research",
          link_to: "research_session",
          link_title: "研究型",
          color: "research_bg_color",
          courses: [],
        },
        {
          link_from: "art",
          link_to: "art_session",
          link_title: "文藝型",
          color: "art_bg_color",
          courses: [],
        },
        {
          link_from: "social",
          link_to: "social_session",
          link_title: "社會型",
          color: "social_bg_color",
          courses: [],
        },
        {
          link_from: "enterprise",
          link_to: "enterprise_session",
          link_title: "企業型",
          color: "enterprise_bg_color",
          courses: [],
        },
        {
          link_from: "thing",
          link_to: "thing_session",
          link_title: "事務型",
          color: "thing_bg_color",
          courses: [],
        },
      ],
      hot_course: [],

      // course_introduce.html
      introduce_no: null,
      introduce_single: {
        ski_no: "",
        ski_name: "",
        ski_buy_num: "",
        ski_price: "",
        ski_time: "",
        ski_intro: "",
        ski_img: "",
        ski_tec_img: "",
        ski_tec_name: "",
        ski_tec_intro: "",
        ski_outline: "",
        ski_stud: "",
        ind_no: "",
        ind_class: "",
        ind_color: "",
      },
      introduce_suggest: [],
      collect_state: 0,

      // course_orderlist.html
      exp_month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      this_month: new Date().getMonth() + 1,

      exp_year: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],

      //course_check.html
      final_order_list: [],
    };
  },
  mounted() {
    // course_main.html
    this.all_course_api();

    // course_introduce.html
    let localURL = new URL(document.location);
    if (localURL.toString().includes("course_introduce")) {
      this.introduce_course_api();
    }
    //   //course_check.html
    if (localURL.toString().includes("course_check")) {
      this.load_order_list();
    }

    // 共用
    this.check_member_api();
  },
  methods: {
    // localStorage
    add_storage() {
      let ss = " ";
      ss = JSON.stringify(this.cart_items);
      localStorage.setItem("cart", ss);
    },
    receive_storage() {
      if (localStorage.getItem("cart")) {
        let get_id = localStorage.getItem("cart");
        this.cart_items = JSON.parse(get_id);
        if (this.cart_items.length > 0) {
          for (let i = 0; i < this.cart_items.length; i++) {
            $(`.cus_${this.cart_items[i].ski_no}`).addClass("cart_clicked");
          }
        }
      }
    },
    // 購物車功能
    add_cart(item, e) {
      // 登入燈箱
      if (this.mem_check == 0) {
        document.querySelector(".bg_of_lightbx").style = "display:block";
      } else {
        // this.add_cart_effect();
        // 若購物車內無商品
        if (this.cart_items.length == 0) {
          this.cart_items.push(item);
        } else {
          let check = true;
          for (i = 0; i < this.cart_items.length; i++) {
            // 若購物車內已有此商品
            if (this.cart_items[i].ski_no == item.ski_no) {
              check = false;
              // alert("購物車內已有此課程囉!");
              $(`.cus_${item.ski_no}`).removeClass("cart_clicked");
              this.cart_items.splice(i, 1);
              return;
            }
          }

          if (check) {
            this.cart_items.push(item);
          }
        }
        this.add_storage();
        $(`.cus_${item.ski_no}`).addClass("cart_clicked");
        this.add_cart_effect(item, e);
      }
    },
    add_cart_effect(item, e) {
      // 加入購物車動畫

      var cart = $("#add_effect");
      var imgtodrag = $(e.target).parents("li").find("img");
      // console.log(imgtodrag);
      if (imgtodrag.length != 0) {
        var imgclone = imgtodrag
          .clone()
          .offset({
            top: imgtodrag.offset().top,
            left: imgtodrag.offset().left,
          })
          .css({
            opacity: "0.8",
            position: "absolute",
            height: "150px",
            width: "150px",
            "z-index": "100",
          })
          .appendTo($("body"))
          .animate(
            {
              top: cart.offset().top + 10,
              left: cart.offset().left + 10,
              width: 75,
              height: 75,
            },
            1000,
            "easeInOutExpo"
          );
        imgclone.animate(
          {
            width: 0,
            height: 0,
          },
          function () {
            $(this).detach();
          }
        );
      }
    },

    // 收藏功能
    add_check_favorite(item) {
      if (this.mem_check == 0) {
        document.querySelector(".bg_of_lightbx").style = "display:block";
      } else {
        var formData = new FormData();
        formData.append("ski_no", item.ski_no);
        formData.append("mem_no", this.mem_check);

        axios.post("./php/course_courseCollect.php", formData).then((res) => {
          if (res.status == 200) {
            // alert(res.data);
            // console.log(res.data);
            this.collect_state = res.data;
            switch (this.collect_state) {
              case 1:
                $(".btn_intro_favor").addClass("cart_clicked");
                break;
              case 0:
                $(".btn_intro_favor").removeClass("cart_clicked");
                break;
            }
          }
        });
      }
    },
    remove_item(index) {
      $(`.cus_${this.cart_items[index].ski_no}`).removeClass("cart_clicked");
      this.cart_items.splice(index, 1);
      this.add_storage();
    },
    // (hot course/ category course 資料庫載入)
    all_course_api() {
      axios
        .all([
          axios.get("./php/course_hot_course.php"),
          axios.get("./php/course_course_list.php"),
          axios.get("./php/course_mem_boughtCourse.php"),
        ])
        .then(
          axios.spread((res1, res2, res3) => {
            // 熱門課程資料
            // console.log(res1);
            this.hot_course = res1.data;

            // OWL套件
            let localURL = new URL(document.location);
            if (localURL.toString().includes("course_main")) {
              script = document.createElement("script");
              script.src = "./js/course/owl_auto_slide.js";
              document.body.appendChild(script);
            }

            // ===================
            // category課程資料
            // console.log(res2);

            // 將課程總覽用filter（當總覽內的ind_class == category的link_title）代入this.category
            for (let i = 0; i < this.category.length; i++) {
              this.category[i].courses = res2.data.filter(
                (item) => item.ind_class == this.category[i].link_title
              );
            }
            // console.log(this.category);

            // =====================
            this.mem_boughtCourse = res3.data;
          })
        )
        .then(() => {
          this.receive_storage();
        })
        .then(() => {
          let script = document.createElement("script");
          script.src = "./js/course/course_main.js";
          document.body.appendChild(script);
        })
        .then(() => {
          if (this.mem_boughtCourse != 0) {
            this.mem_boughtCourse.forEach((course) => {
              $(`button.cus_${course.ski_no}`)
                .text("已購買")
                .addClass("bought");
            });
          }
        })
        .then(() => {
          $(".bought").attr("disabled", "disabled");
        })

        .catch((err) => {
          console.log(err);
        });
    },
    // ========================================
    // （課程介紹/推薦課程  資料庫載入）
    introduce_course_api() {
      //   找網址
      //   new URL(document.location) 尋找當前網址
      //   localUrl.searchParams.get("ski_no")搜尋網址ski_no= 後的資料
      let _this = this;
      let localUrl = new URL(document.location);
      this.introduce_no = localUrl.searchParams.get("ski_no");

      // FormData建立變數傳給php
      var formData = new FormData();
      formData.append("introduce_no", this.introduce_no);

      axios
        .all([
          axios.post("./php/course_introduce.php", formData),
          axios.post("./php/course_introduce_suggest.php", formData),
          axios.post("./php/course_checkCollect.php", formData),
        ])
        .then(
          axios.spread((res1, res2, res3) => {
            // 課程介紹資料
            if (res1.status == 200) {
              if (res1.data != 0) {
                _this.introduce_single = res1.data[0];

                // 切割資料
                let splitItem = function (str) {
                  return str.split(";").splice(1, str.split(";").length - 1);
                };
                // 切割適合對象
                _this.introduce_single.ski_stud = splitItem(
                  _this.introduce_single.ski_stud
                );
                // 切割學到什麼
                _this.introduce_single.ski_harvest = splitItem(
                  _this.introduce_single.ski_harvest
                );
                // 切割課程大綱
                _this.introduce_single.ski_outline = splitItem(
                  _this.introduce_single.ski_outline
                );
              }
            }

            // =================
            // 推薦課程資料
            if (res2.status == 200) {
              if (res2.data != 0) {
                _this.introduce_suggest = res2.data;
              }
            }

            this.$forceUpdate();

            // ==============
            // 課程收藏
            if (res3.status == 200) {
              this.collect_state = res3.data;
              // console.log(res3.data);
              switch (this.collect_state) {
                case 1:
                  $(".btn_intro_favor").addClass("cart_clicked");
                  break;
                case 0:
                  $(".btn_intro_favor").removeClass("cart_clicked");
                  break;
              }
            }
          })
        )
        .then(() => {
          _this.receive_storage();
        })
        .then(() => {
          script = document.createElement("script");
          script.src = "./js/course/owl_auto_slide.js";
          document.body.appendChild(script);
        })
        .then(() => {
          if (this.mem_boughtCourse != 0) {
            this.mem_boughtCourse.forEach((course) => {
              $(`button.cus_${course.ski_no}`)
                .text("已購買")
                .addClass("bought");
            });
          }
        })
        .then(() => {
          $(".bought").attr("disabled", "disabled");
        })
        .then(() => {
          switch (this.collect_state) {
            case 1:
              $(".btn_intro_favor").addClass("cart_clicked");
              break;
            case 0:
              $(".btn_intro_favor").removeClass("cart_clicked");
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    check_member_api() {
      axios
        .get("./php/memberStateCheck.php")
        .then((res) => {
          if (res.status == 200) {
            // console.log(res.data);
            if (res.data != 0) {
              this.mem_check = res.data.split(";")[0];
              $("div.member > a").attr("href", "member.html");
              $("#header_logOut").css("display", "block");
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // ================================
    go_checkout(e) {
      e.preventDefault();
      if (this.cart_items.length == 1) {
        if (window.confirm("再加購一堂課程即可享有8折扣，確定要繼續結帳嗎？")) {
          location.href = "./course_orderlist.html";
        }
      } else {
        location.href = "./course_orderlist.html";
      }
    },
    // orderList傳訂單到資料庫
    orderListSend(item) {
      if (this.mem_check == 0) {
        document.querySelector(".bg_of_lightbx").style = "display:block";
      } else {
        if (item.length > 0) {
          let d_ord_amount = $(".final_price").text().split("$")[1]; //總金額
          let d_ord_pay = "信用卡"; //付款方式
          let d_ord_discount = 0; //是否折扣
          if (item.length > 1) {
            d_ord_discount = 1;
          }
          let arr = [];

          item.forEach((key) => {
            //課程資訊
            arr.push({
              ski_no: key.ski_no,
              ski_price: key.ski_price,
            });
          });

          let d_course_arr = JSON.stringify(arr);

          // 建立php的變數
          var formData = new FormData();
          formData.append("ord_amount", d_ord_amount);
          formData.append("ord_pay", d_ord_pay);
          formData.append("ord_discount", d_ord_discount);
          formData.append("course_arr", d_course_arr);

          // -------------
          // 連結php
          axios
            .all([axios.post("./php/course_send_ordList.php", formData)])
            .then(
              axios.spread((res1, res2) => {
                let ord_no = res1.data[0].ord_no;
                window.location.href = "./course_check.html?ord_no=" + ord_no;
              })
            )

            .catch((err) => {
              console.log(err);
            });
        } else {
          alert("購物車內無課程，請先挑選課程唷！");
          window.location.href = "./course_main.html";
        }
      }
    },
    load_order_list() {
      // 清空購物車
      window.localStorage.removeItem("cart");
      // 擷取網址內的變數
      let localUrl = new URL(document.location);
      let url_ord_no = localUrl.searchParams.get("ord_no");
      // alert(url_ord_no); //okok

      //變成php變數
      let formData = new FormData();
      formData.append("ord_no", url_ord_no);

      // 與php連結
      axios
        .all([axios.post("./php/course_receive_ordList.php", formData)])
        .then(
          axios.spread((res1) => {
            // 課程介紹資料
            if (res1.status == 200) {
              if (res1.data != 0) {
                this.final_order_list = res1.data[0];
                // console.log("訂單資訊：" + this.final_order_list.ord_no);
              }
            }
          })
        )
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    },

    // header登出
    header_logOut() {
      axios
        .get("./php/member_logOut.php")
        .then((res) => {
          if (res.status == 200) {
            location.reload();
            $("#header_logOut").css("display", "none");
            $("div.member > a").attr("href", "member_sign_in.html");
            window.localStorage.removeItem("cart");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // ===========================
    // 登入燈箱
    changeState() {
      var memAccount = document.querySelector(".input_div #account").value;
      var memCode = document.querySelector(".input_div #code").value;
      var formData = new FormData();
      formData.append("memAccount", memAccount);
      formData.append("memCode", memCode);
      axios.post("./php/memberSignInCheck.php", formData).then((resp) => {
        if (resp.data == 0) {
          alert("帳號或密碼錯誤，請重新輸入");
          document.querySelector(".input_div #code").value = "";
        } else if (resp.data == -1) {
          alert("此帳戶已被停權，禁止使用");
        } else {
          alert("會員登入成功");
          //登入成功則燈箱移除
          document.querySelector(".bg_of_lightbx").style = "display:none";
          location.reload();
          //將結果傳至會員儲存
          //這邊要寫把資料傳到資料庫的東西
        }
      });
    },
    btnClose() {
      document.querySelector(".bg_of_lightbx").style = "display:none";
    },
    // 其他功能
    side_click_bg(e) {
      // $(`#${this.category[index].link_from}`).addClass('side_click');
      $(".main_side_bar > ul> li > a").removeClass("side_click");
      e.currentTarget.classList.add("side_click");
    },
    // owl_slide() {
    //   $(".auto_slider").owlCarousel({
    //     loop: true,
    //     margin: 10,
    //     nav: true,
    //     responsive: {
    //       0: {
    //         items: 1,
    //       },
    //       600: {
    //         items: 2,
    //       },
    //       1000: {
    //         items: 3,
    //       },
    //     },
    //   });
    // },
  },
  computed: {
    add_total() {
      let total = 0;
      for (i = 0; i < this.cart_items.length; i++) {
        total += parseInt(this.cart_items[i].ski_price);
      }
      return total;
    },
    discount() {
      if (this.cart_items.length >= 2) {
        let discount = this.add_total * 0.2;
        return Math.round(discount);
      } else {
        return 0;
      }
    },
    final_price() {
      let final = this.add_total - this.discount;
      return Math.round(final);
    },
  },
});
