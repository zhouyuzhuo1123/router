$(function(){
  var lv=new BDLogin();
});
jQuery.support.cors = true;
var BDLogin=function(){
        this.lv=new Validator();
        this.init();
        this.event();
    };
    BDLogin.prototype.init=function(){
        if(location.href.indexOf('register')!=-1){
            new PCAS("province","city","district");
        }
    };
    BDLogin.prototype.event=function(){
        var _this=this;
        $('#index1').click(function() {
            var _username=$('#phone').val();
            var _password=$('#password').val();
            if(_this.lv.all()){
                var lv=new ajax({
                    url:apiurl.bdlogin,
                    data:{username:_username,password:_password},
                    success:function(data){
                        if(data.return_code==0){
                            location.href="../personal-store/mine.html";
                        }else{
                            $.toast(data.return_msg, "forbidden");
                        } 
                    }
                });
            };
        });
    };
    

                          
