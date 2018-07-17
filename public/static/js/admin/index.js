layui.use('form', function () {
    var form = layui.form,
        jq = layui.jquery;
    form.on('submit(login_index)', function (data) {
        loading = layer.load(2, {
            shade: [0.2, '#000']
        });

        var param = data.field;

        jq.post('/admin/auth/login.html', param, function (data) {
            if (data.code == 200) {
                layer.close(loading);
                layer.msg(data.msg, {icon: 1, time: 1000}, function () {
                    location.href = '/admin/index/index.html';
                });
            } else {
                layer.close(loading);
                layer.msg(data.msg, {icon: 2, anim: 6, time: 2000});
            }
        }, 'json');
        return false;
    });

    var sta = 0; // 定时器开关 0 表示关  1表示开
    var time = 60; //时间

    $('.js-logo .forget-pw .forget').click(function () {
        $('.js-logo').hide();
        $('.js-forget').show();
    });
    //获取验证码
    $('.get-yzm').click(function () {
        if (sta == 0) {
            //发送验证码
            console.log('验证码：123456');
            var set = setInterval(function () {
                if(time > 0){
                    time --;
                    $('.get-yzm').html( time +'s');
                    sta = 1;
                }else {
                    sta = 0;
                    time = 60;
                    $('.get-yzm').html( '获取验证码');
                    clearInterval(set);
                }
            },1000)
        }
    })


})