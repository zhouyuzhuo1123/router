function wechatimg(data){
    if(data.return_code==100){
        location.href="../../";
    }else{
         var lv=new Wechatimg(data);
    }
};

$(function(){
    var oHead = document.getElementsByTagName('HEAD').item(0); 
    var oScript= document.createElement("script"); 
    oScript.type = "text/javascript"; 
    oScript.src=siteConfig.getpayset+'?store_user_id=20&type=1&callback=wechatimg&t='+new Date().getTime(); 
    oHead.appendChild(oScript); 
});
var tpl=[
        '<img id="uploadimg" data-original="{{wei_pay.qrcode_url}}"  src="../../img/grey.jpg" width="100%" data-img="{{wei_pay.qrcode_url}}" alt=""/>',
        '<a class="reset store-submit-btn">重新上传</a>'
].join('');
  

var Wechatimg=function(data){
    this.data=data;
    this.init();
    this.event();
    this.upload();

};
Wechatimg.prototype.init=function(){
    if(this.data.return_code==0){
        var html=Render.tpl(tpl,this.data.data);
        $('#wechatimg-preview').html(html);
        $("img").lazyload({
                effect : "fadeIn"
        });
        $('#file_input').show();
    }else{
        $('#file_input').show();
    }
};
Wechatimg.prototype.event=function(){
    $('#wechatimg-preview').on('click','.submit-ok',function(){
        var imgsrc=$('#uploadimg').attr('data-img');
        $.post(apiurl.weixinpayset,{store_user_id:20,qrcode_url:imgsrc},function(data){
            if(data.return_code==0){
                location.href="Receivables.html";
            }else{
                $.toast(data.message)
            }

        })
    });
    $('#wechatimg-preview').on('click','.reset',function(){
        $('#wechatimg-preview').html('');
    })
};
Wechatimg.prototype.upload=function(){
    var imgplace = document.getElementById("wechatimg-preview"); //获取显示图片的div元素
    var input = document.getElementById("file_input"); //获取选择图片的input元素
          //这边是判断本浏览器是否支持这个API。
    if(typeof FileReader==='undefined'){ 
        imgplace.innerHTML = "抱歉，你的浏览器不支持 FileReader"; 
        input.setAttribute('disabled','disabled'); 
    }else{ 
        input.addEventListener('change',readFile,false); //如果支持就监听改变事件，一旦改变了就运行readFile函数。
    }     
    function readFile(){ 
        var file = this.files[0]; //获取file对象
        //判断file的类型是不是图片类型。
        if(!/image\/\w+/.test(file.type)){ 
            $.toast("文件必须为图片！"); 
            return false; 
        } 
        var reader = new FileReader(); //声明一个FileReader实例
        reader.readAsDataURL(file); //调用readAsDataURL方法来读取选中的图像文件
        //最后在onload事件中，获取到成功读取的文件内容，并以插入一个img节点的方式显示选中的图片
        reader.onload = function(e){ 
            imgplace.innerHTML = '<img id="uploadimg" src="'+this.result+'" width="100%" data-img="" alt=""/><div class="selectSitting-btn"><div><a class="reset">重置</a></div><div><a href="javascript:" class="submit-ok">保存</a></div></div>';
            doUpload();
        } 
        function doUpload() {  
             var formData = new FormData($( "#uploadPicture" )[0]);  
             $.ajax({  
                  url: apiurl.uploadPicture,  
                  type: 'POST',  
                  data: formData,   
                  cache: false,  
                  contentType: false,  
                  processData: false,  
                  success: function (data) {  
                      $.toast('上传图片成功')
                      $('#uploadimg').attr('data-img',data.data.img.filename.path)  
                  },  
                  error: function (data) {  
                      $.toast('上传图片失败','forbidden') 
                  }  
             });  
        } 
    }
}
      