$(function () {
    //锁定
    $('.js-clock').click(function () {
        //询问框
        layer.confirm('确定锁定您的账户么？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            //确定之后的提示
            layer.msg('锁定成功', {icon: 4,time:1000});
        }, function(){
            //取消之后的提示
        });
    });

//退出
    $('.js-logout').click(function () {
        //询问框
        layer.confirm('确定退出么？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            //确定之后的提示
            layer.msg('退出成功', {icon: 1,time:1000});
        }, function(){
            //取消之后的提示
        });
    });

//获取信息
    var lesson_name=sessionStorage.getItem('lesson_name');
    $('.lesson-name text').html(lesson_name);


});


