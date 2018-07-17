new Vue({
    el: '#index',
    data: {
        //正在进行中的 或者未开始的训练营
        underway_lesson: [
            // {
            //     status: 1,
            //     training_begin_at: "2018-07-01",
            //     training_current_count: 0,
            //     training_finish_at: "2018-08-01",
            //     training_id: 6,
            //     training_image: "http://xiangxue-project.oss-cn-shanghai.aliyuncs.com/vpx_mini/1529581599565417.jpeg",
            //     training_max_count: 100,
            //     training_name: "新生训练营1",
            // }
        ],
        //已经结束的训练营
        finish_lesson: [

        ],
    },
    methods: {
        limit: function () {
            //获取屏幕高度
            var w_h = $(window).height();
            $('#index').css({'min-height': w_h - 105});
            sessionStorage.clear();
        },
        //跳转方法
        skip:function (id,name,status) {
            sessionStorage.setItem('lesson_id',id);
            sessionStorage.setItem('lesson_name',name);
            sessionStorage.setItem('lesson_statues',status);
            window.open('/admin/edit/index.html','_blank');
        },
        //新增
        add_lesson:function () {
            sessionStorage.clear();
            window.open('/admin/edit/index.html','_blank');
        },
        get_info:function () {
            var that =this,
                arr = [],
                arr2 = [];
            this.loading({
                content: '数据加载中 . . .'
            });
            $.ajax({
                url:'/admin/Training/training_list',
                type:'POST',
                dataType:'json',
                success:function (data) {
                    console.log(data.data);
                    $.each(data.data,function (key,val) {
                        if(val.status == 1 || val.status ==2){
                            arr.push(val);
                        }else {
                            arr2.push(val);
                        }
                    });
                    that.underway_lesson = arr;
                    that.finish_lesson =arr2;
                    //关闭弹窗
                    swal.close();
                }
            })
        }
    },
    mounted: function () {
        this.limit();
        this.get_info();
    },
});