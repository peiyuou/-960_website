new Vue({
    el: "#bg_stage",
    data: {
        members: ["會員管理", "管理員管理"],
        lists: [
            "題庫管理",
            "行業管理",
            "課程管理",
            "文章檢舉管理",
            "留言檢舉管理",
            "訂單管理",
            "明信片素材管理",
            "公告管理",
        ],

        account: true,
        administrator: false,
        quiz: false,
        industry: false,
        skill_class: false,
        article_report: false,
        message_report: false,
        order_mem: false,
        postcard_material: false,
        announcement: false,
        types: [{
                type: "實作型",
                value: "R",
            },
            {
                type: "研究型",
                value: "I",
            },
            {
                type: "文藝型",
                value: "A",
            },
            {
                type: "社會型",
                value: "S",
            },
            {
                type: "企業型",
                value: "E",
            },
            {
                type: "事務型",
                value: "C",
            },
        ],

        orders: [],
        orderList: [],

    },
    methods: {
        show(index) {
            if (index == 0) {
                this.account = true;
                this.administrator = false;
                this.quiz = false;
                this.industry = false;
                this.skill_class = false;
                this.article_report = false;
                this.message_report = false;
                this.order_mem = false;
                this.postcard_material = false;
                this.announcement = false;
            } else {
                this.account = false;
                this.administrator = true;
                this.quiz = false;
                this.industry = false;
                this.skill_class = false;
                this.article_report = false;
                this.message_report = false;
                this.order_mem = false;
                this.postcard_material = false;
                this.announcement = false;
            }
            // alert(index);
        },
        showBoard(index) {
            switch (index) {
                case 0:
                    this.quiz = true;
                    this.account = false;
                    this.administrator = false;
                    this.industry = false;
                    this.skill_class = false;
                    this.article_report = false;
                    this.message_report = false;
                    this.order_mem = false;
                    this.postcard_material = false;
                    this.announcement = false;
                    break;
                case 1:
                    this.industry = true;
                    this.account = false;
                    this.administrator = false;
                    this.quiz = false;
                    this.skill_class = false;
                    this.article_report = false;
                    this.message_report = false;
                    this.order_mem = false;
                    this.postcard_material = false;
                    this.announcement = false;
                    break;
                case 2:
                    this.skill_class = true;
                    this.account = false;
                    this.administrator = false;
                    this.quiz = false;
                    this.industry = false;
                    this.article_report = false;
                    this.message_report = false;
                    this.order_mem = false;
                    this.postcard_material = false;
                    this.announcement = false;
                    break;
                case 3:
                    this.skill_class = false;
                    this.account = false;
                    this.administrator = false;
                    this.quiz = false;
                    this.industry = false;
                    this.article_report = true;
                    this.message_report = false;
                    this.order_mem = false;
                    this.postcard_material = false;
                    this.announcement = false;
                    break;
                case 4:
                    this.skill_class = false;
                    this.account = false;
                    this.administrator = false;
                    this.quiz = false;
                    this.industry = false;
                    this.article_report = false;
                    this.message_report = true;
                    this.order_mem = false;
                    this.postcard_material = false;
                    this.announcement = false;
                    break;
                case 5:
                    this.skill_class = false;
                    this.account = false;
                    this.administrator = false;
                    this.quiz = false;
                    this.industry = false;
                    this.article_report = false;
                    this.message_report = false;
                    this.order_mem = true;
                    this.postcard_material = false;
                    this.announcement = false;
                    break;
                case 6:
                    this.skill_class = false;
                    this.account = false;
                    this.administrator = false;
                    this.quiz = false;
                    this.industry = false;
                    this.article_report = false;
                    this.message_report = false;
                    this.order_mem = false;
                    this.postcard_material = true;
                    this.announcement = false;
                    break;
                case 7:
                    this.skill_class = false;
                    this.account = false;
                    this.administrator = false;
                    this.quiz = false;
                    this.industry = false;
                    this.article_report = false;
                    this.message_report = false;
                    this.order_mem = false;
                    this.postcard_material = false;
                    this.announcement = true;
                    break;
            }
        },
        SearchMEM: function (e) {
            e.preventDefault();
            $.ajax({
                url: "backstage_memberSearch.php",
                type: "POST",
                data: new FormData(document.getElementById("search_mem_form")),
                contentType: false,
                cache: false,
                processData: false,
                success: function (data) {
                    $("#oneMem").html(data);
                },
            });
            $("#allMem").hide();
            $("#backAllMem").show();
            $("#oneMem").show();


            setTimeout(function () {
                let editBtn = $("#oneMem .memberEdit");
                console.log(editBtn.text())
                let td = editBtn.parent().siblings();
                $(".edit.memberEdit").click(function () {
                    let member = {};
                    console.log(td.eq(4).find("option:selected").val())
                    member.MEM_USE = td.eq(4).find("option:selected").val();
                    member.memNo = td.eq(0).text();
                    console.log(member);

                    let memberJson = JSON.stringify(member);
                    let memberXhr = new XMLHttpRequest();
                    // console.log(memberXhr);
                    memberXhr.open("POST", "./backstage_member.php", true);
                    memberXhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    memberXhr.send(`memberJson=${memberJson}`);

                    memberXhr.onload = function () {
                        if (memberXhr.status == 200) {
                            // alert(memberXhr.responseText);
                            location.reload();
                            console.log(memberXhr.responseText);
                        } else {
                            // alert(memberXhr.status);
                        }

                    }
                })

            }, 500)



        },
        backAllMem() {
            $("#backAllMem").hide();
            $("#allMem").show();
            $("#oneMem").hide();
        },

        //查看訂單明細
        searchOrd(e) {
            e.preventDefault();
            $.ajax({
                url: "backstage_orderSearch.php",
                type: "POST",
                data: new FormData(document.getElementById("search_ore_form")),
                contentType: false,
                cache: false,
                processData: false,
                success: function (data) {
                    $("#OrderDetail").html(data);
                },
            });
            $("#backAllOrd").show();
            $("#OrderDetail").show();
            $("#allOrd").hide();
        },

        backAllOrd() {
            $("#backAllOrd").hide();
            $("#OrderDetail").hide();
            $("#allOrd").show();
        },


        edit(e) {
            let td = $(e.target).parent().parent();
            switch (e.target.innerText) {
                case "編輯":
                    e.target.innerText = "確認";
                    td.find("select").show();
                    td.find("input").show();
                    td.find("textarea").show();
                    td.find("select").show();
                    break;
                case "確認":
                    e.target.innerText = "編輯";
                    td.find("select").hide();
                    td.find("input").hide();
                    td.find("textarea").hide();
                    td.find("select").hide();
                    break;
            }
        },
        addForm(e) {
            $(e.target).hide();
            $(e.target).parent().parent().find('table').hide();
            $(e.target).parent().parent().find('form').show();
            $(e.target).parent().parent().find('.back').show();
        },
        cancel_add(e) {
            e.preventDefault();
            $(e.target).hide();
            $(e.target).parent().parent().find('table').show();
            $(e.target).parent().parent().find('form').hide();
            $(e.target).parent().parent().find('.add').show();
            //   window.scrollTo(0, 0);
        },

        deleteSki(e) {
            if (window.confirm("確認刪除此課程？")) {
                let ski_no = $(e.target).parent().parent().find("#ski_no").text();

                var formData = new FormData();
                formData.append("ski_no", ski_no);
                axios
                    .all([axios.post("backstage_skillClass_delete.php", formData)])
                    .then(
                        axios.spread((res) => {
                            if (res.status == 200) {
                                // console.log(res.data);
                                location.reload();
                            }
                        })
                    )
                    .catch((errors) => {
                        console.log(errors);
                    });
            }
        },
        //公告新增
        add_annNew() {
            $("#add_annNew").hide();
            $("#annTable").hide();
            $("#ann_form").show();
            $("#ann_backAd").show();

        },
        ann_backAd() {
            $("#add_annNew").show();
            $("#annTable").show();
            $("#ann_form").hide();
            $("#ann_backAd").hide();
        }
    },
    mounted() {
        axios.get("./backstage_order.php").then((res) => {
            this.orders = res.data;
        });
        axios.get("./backstage_orderDetail.php").then((res) => {
            this.orderList = res.data;
        });
    },

    computed: {},
});