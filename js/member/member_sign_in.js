let memData = {
    register: false,
    signIn : true,
    screenWidth : 0
}
let changeSignType = new Vue({
    el : '#mem_log_change',
    data : memData,
    mounted() {
        this.screenWidth = document.documentElement.clientWidth;
    },
    created() {
        window.addEventListener('resize', this.changeWidth);
    },
    destroyed() {
        window.removeEventListener('resize', this.changeWidth);
    },
    methods: {
        changeWidth(e){
            this.screenWidth = document.documentElement.clientWidth;
        },
        changePage(){
            var memAccount = document.querySelector('.input_div #account').value;
            var memCode = document.querySelector('.input_div #code').value;
            var formData = new FormData();
            formData.append('memAccount', memAccount);
            formData.append('memCode', memCode);
            axios
            .post('./php/memberSignInCheck.php',formData)
            .then((resp) => {
                if(resp.data == 0){
                    alert('帳號或密碼錯誤，請重新輸入');
                    document.querySelector('.input_div #code').value = "";
                }
                else if(resp.data == -1){
                    alert('此帳戶已被停權，禁止使用');
                    document.querySelector('.input_div #code').value = "";
                }
                else{
                    window.location.href = "./member.html";
                }
            })
        },
        changePageSignUp(){
            var memAccount = document.querySelector('.input_div #account').value;
            var memCode = document.querySelector('.input_div #code').value;
            var memCodeAgain = document.querySelector('.input_div #code_again').value;
            var memName = document.querySelector('.input_div #memName').value
            var emailCheck = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!emailCheck.test(memAccount)){
                alert("請輸入正確的email格式");
            }
            else if(memCode.length < 10){
                alert("密碼長度至少為10");
                document.querySelector('.input_div #code').value = "";
                document.querySelector('.input_div #code_again').value = "";
            }
            else if((memCode == memCodeAgain)&&emailCheck.test(memAccount)&&memName.length>0){
                var formData = new FormData();
                formData.append('memAccount', memAccount);
                formData.append('memCode', memCode);
                formData.append('memName', memName);
                axios
                .post('./php/memberSignUp.php',formData)
                .then((resp) => {
                    if(resp.data == 1){
                        alert('此電子郵件已有人申請，請重新輸入');
                        document.querySelector('.input_div #account').value = "";
                        document.querySelector('.input_div #memName').value = "";
                        document.querySelector('.input_div #code').value = "";
                        document.querySelector('.input_div #code_again').value = "";
                    }
                    else{
                        alert('會員註冊成功');
                        window.location.href = "./member.html";
                    }
                    // console.table(resp.data)
                })
                .catch(error => console.log(error))
            }
            else{
                alert('欄位為空或密碼輸入錯誤，請從新輸入');
                document.querySelector('.input_div #code').value = "";
                document.querySelector('.input_div #code_again').value = "";
            }
        }
    }
})