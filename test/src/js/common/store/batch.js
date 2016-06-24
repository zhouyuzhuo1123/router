function batch(data){
    if(data.return_code>0){
        if(data.return_code==100){
            location.href="../../";
        }else{
            $.toast(data.return_msg, "cancel");
        }
    }else{
         var lv=new Batch(data);
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
  
var foottpl=[
    '{{each item_list as value}}',
        '<div class="history-content-layer">',
            '<p><span class="title">{{value.income_title}}</span><span class="price">{{value.income,value.income_type | change}}</span></p>',
            '<p>{{value.create_time | settime}}</p>',
        '</div>',
    '{{/each}}'
].join('');

var logtpl=[
    '<p style="text-align:center;font-size: 0.65rem;line-height: 2rem;background:#efeff4;color:#FF5000;">暂时没有历史数据</p>'
].join('');

var Batch=function(data){
    this.data=data.data;
    this.init();
    this.event();
    this.log();
};
Batch.prototype.init=function(){
    var html=Render.tpl(tpl,this.data);
    $('.selectContent').html(html);
};
Batch.prototype.event=function(){
    var _this=this;
    $('.selectContent').on('change','.selectBox',function(){
        var parentId=$(this).attr('data-id');
        var _select=$(this).val();
        if(_select=='' || _select==undefined){
            $(this).css('color','#000000');
            $(this).attr('data-select','0')
        }else{
            $(this).parent().siblings().find('.selectBox').attr('data-select','0').css('color','#000000').find('option:first').prop("selected", 'selected');
            $(this).attr('data-select','1').css('color','#ff5000');
            _this.select(parentId,_select);
        }

    });
    $('.test').click(function(){
        var _selectBox=$('.selectBox[data-select="1"]');
        var _config_type=_selectBox.attr('data-id');
        var _income_id=_selectBox.val();
        var _income_type=$('input[type=radio]:checked').val();
        var _income=$('input[type=radio]:checked').siblings('span').find('input').val();
        if(_config_type==undefined){
            $.toast("请在类目、品牌、分类中任选一个", "cancel");
            return;
        }
        if(_income_type=='' || _income_type==undefined){
            $.toast("请选择利润设置", "cancel");
            return;
        }
        if(_income=='' || _income==undefined){
            $.toast("利润设置参数不能为空", "cancel");
            return;
        }
        $.post('http://web2.baobeimt.cn/api/StoreIncome/setIncome',{store_user_id:20,config_type:_config_type,income_id:_income_id,income_type:_income_type,income:_income},function(data){
            if(data.return_code==0){
                 $.toast(data.data.message);
            }
        })
    })
};
Batch.prototype.select=function(v1,v2){
    $('input[name="lirun"]').removeAttr('checked');
    $('input[type="number"]').each(function(){
        $(this).val('')
    })
    $.post('http://web2.baobeimt.cn/api/StoreIncome/getIncome',{store_user_id:20,config_type:v1,income_id:v2},function(data){
        if(data.return_code==0){
            var data=data.data;
            $('input[type="radio"]').each(function(){
                if($(this).val()==data.income_type){
                    $(this).attr('checked','checked');
                    $(this).siblings('span').find('input').val(data.income);
                };
            })

        }
    })
}
Batch.prototype.log=function(){
    var totlePage=1;
    $.post('http://web2.baobeimt.cn/api/StoreIncome/getStoreIncomeLog',function(data){
        if(data.return_code==0){
            if(data.data.total_count_num==0){
                $('.batch-history-content').append(logtpl);
            }else{
                template.helper('change',function(v1,v2){
                    if(v2==2){
                        return v1+'%';
                    }else{
                        return '￥'+v1/100;
                    }
                });
                template.helper('settime',function(v1){
                    var time=new Date(parseInt(v1)*1000);
                    var year=time.getFullYear();
                    var month=time.getMonth()+1;
                    var day=time.getDate();
                    var hour=time.getHours();                    
                    var min=time.getMinutes();
                    var sec=time.getSeconds();
                    return year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec;


                })
                var html=Render.tpl(foottpl,data.data);
                $('.batch-history-content').append(html);
                totlePage=data.data.total_page_num;
            }
        }else{
            $.toast(data.message || '获取历史记录失败','forbidden');
        }
        
    })
    var loading = false;  //状态标记
        var lv=getMore();
        $(document.body).infinite().on("infinite", function() {
          if(loading) return;
          loading = true;
          $('.weui-infinite-scroll').show();
            //模拟延迟
          lv();
        });
        function getMore(){
            var page=1;
            return function(){
                        if(totlePage>page){
                            page++;
                            $.ajax({
                            url:'http://web2.baobeimt.cn/api/StoreIncome/getStoreIncomeLog',
                            type:'post',
                            data:{page:page},
                            success:function(data){
                                    var html=Render.tpl(foottpl,data.data);
                                    $('.batch-history-content').append(html);
                                    loading = false;
                                    $('.weui-infinite-scroll').hide();
                                }
                            })
                        }else{
                            $('.weui-infinite-scroll').remove(); 
                        }
                        
                 };
        };
}
          