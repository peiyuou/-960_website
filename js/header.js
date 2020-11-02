new Vue({
  el: "#header_cart",
  data() {
    return {
      cart_items: [],
    };
  },
  mounted() {
    this.receive_storage();
    this.check_member_api();
  },
  methods: {
    receive_storage() {
      if (localStorage.getItem("cart")) {
        let get_id = localStorage.getItem("cart");
        this.cart_items = JSON.parse(get_id);
        this.cart_items.forEach((card, index) => {
          $(`.cus_${this.cart_items[index].ski_no}`).addClass("cart_clicked");
        });
      }
      // for (let i = 0; i < this.cart_items.length; i++) {
      //     $(`.cus_${this.cart_items[i].ski_no}`).addClass("cart_clicked");
      // }
    },
    add_storage() {
      let ss = " ";
      // this.cart_items.forEach((item) => {
      //     ss += JSON.stringify(item) + "*";
      // });
      ss = JSON.stringify(this.cart_items);

      localStorage.setItem("cart", ss);
    },

    remove_item(index) {
      $(`.cus_${this.cart_items[index].ski_no}`).removeClass("cart_clicked");
      // e.currentTarget.classList.remove('cart_clicked');
      this.cart_items.splice(index, 1);
      this.add_storage();
    },
    check_member_api() {
      axios
        .get("./php/memberStateCheck.php")
        .then((res) => {
          if (res.status == 200) {
            // console.log(res.data);
            if (res.data != 0) {
              let memName = res.data.split(";")[1];
              // $("div.member > a").html("Hi," + memName);
              $("div.member > a").attr("href", "member.html");
              $("#header_logOut").css("display", "block");
            }
          }
          // this.hot_course = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
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
        return discount;
      } else {
        return 0;
      }
    },
    final_price() {
      let final = this.add_total - this.discount;
      return final;
    },
  },
});

$(document).ready(function () {
  // header

  $(".cart").click(function () {
    $(".side_cart").toggleClass("cart_off");
  });

  $("#cart_close").click(function () {
    $(".side_cart").addClass("cart_off");
  });
  // ---------------------------
  // 漢堡

  // hamburger icon 的切換
  $("button.hamburger").on("click", function () {
    $(this).toggleClass("is-active");
  });

  $("button.hamburger").on("click", function () {
    $("body").toggleClass("scroll_disable");
  });

  // ----------------
  // 點擊按鈕，選單縮放
  $("button.btn_switch").on("click", function () {
    $(".header_nav").slideToggle();
  });

  //頁面切換nav的class
  // $('#text_page').click(function () {
  //     $(this).addClass('active');
  // });
  // if (document.URL == "127.0.0.1:5504/dest/test_before.html") {
  //     $('#text_page').addClass('active');
  // }
});
