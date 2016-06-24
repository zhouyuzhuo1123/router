function batch(data){
    if(data.return_code>0){
        if(data.return_code==100){
            location.href="../../";
        }else{
            $.toast(data.return_msg, "cancel");
        }
    }else{
         var lv=new ProductEdit(data);
    }
};

$(function(){
    var oHead = document.getElementsByTagName('HEAD').item(0); 
    var oScript= document.createElement("script"); 
    oScript.type = "text/javascript"; 
    oScript.src=siteConfig.catbrand_list+'?callback=batch&t='+new Date().getTime(); 
    oHead.appendChild(oScript); 
});
var tpl=[
        '<div class="content">',
            '<select class="selectBox" data-id="1" data-select="0">',
                '<option value="">全部类目</option>',
                '{{each types as value i}}',
                    '<option value="{{value.id}}">{{value.name}}</option>',
                '{{/each}}',
            '</select>',
            // '<span></span>',
        '</div>',
        '<div class="content">',
            '<select class="selectBox" data-id="2" data-select="0">',
                '<option value="">全部品牌</option>',
                '{{each brands as value i}}',
                    '<option value={{value.brand_id}}>{{value.name}}</option>',
                '{{/each}}',
            '</select>',
            // '<span></span>',
        '</div>',
       '<div class="content">',
            '<select class="selectBox" data-id="3" data-select="0">',
                '<option value="">全部分类</option>',
                '{{each cats as value i}}',
                    '<option value="{{value.cid}}">{{value.name}}</option>',
                '{{/each}}',
            '</select>',
            // '<span></span>',
        '</div>'
].join('');
  
var ProductEdit=function(data){
    this.data=data.data;
    this.init();
    this.event();
};
ProductEdit.prototype.init=function(){
    $('b').on('click',function(){
        $(this).siblings('input').val('');
    })
};
ProductEdit.prototype.event=function(){
    
};


          