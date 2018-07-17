new Vue({
    el: '#edit',
    data: {
        lesson_id: '',
        //导航栏
        nav: [
            {
                tit: '训练营管理',
                icon: '/static/images/edit/icon-one.png',
                icon2: '/static/images/edit/icon-one2.png',
                active: true,
            },
            {
                tit: '每日打卡管理',
                icon: '/static/images/edit/icon-two.png',
                icon2: '/static/images/edit/icon-two2.png',
                active: false,
            },
            {
                tit: '用户管理',
                icon: '/static/images/edit/icon-three.png',
                icon2: '/static/images/edit/icon-three2.png',
                active: false,
            },
            {
                tit: '资料库管理',
                icon: '/static/images/edit/icon-four.png',
                icon2: '/static/images/edit/icon-four2.png',
                active: false,
            },
            {
                tit: '数据统计',
                icon: '/static/images/edit/icon-five.png',
                icon2: '/static/images/edit/icon-five2.png',
                active: false,
            },
        ],
        //背景色
        bg: ['#8FCF8F', '#2684B8', '#f98e64', '#2e8bc6', '#8680c4', '#ae73b1', '#d67399', '#f8737e', '#f98e64', '#c3cb2d', '#f3e53b', '#fbb645'],
        //训练营图片名称  传值用
        training_image_name: '',
        //目前的导航名称   默认训练营管理
        now_nav_name: '训练营管理',
        //当前导航状态
        now_nav_state: 4, //默认是0 0表示训练营管理  1表示打卡  2表示学员管理 3资料库 4表示统计图
        //图片裁剪的原始图片
        cropper_img: '/static/images/edit/avatar.jpg',
        //剪辑后的图片
        upload_img: '/static/images/edit/upload.jpg',
        //训练营基本信息
        essential_info: {},
        //训练营内容是否都可以更改
        change_essential: {
            name: false,
            max_per: false,
            start_time: false,
            end_time: false,
            clock_in: false,
            clock_out: false,
            up_img: false,
            con: false,
            save: false,
        },

        //用户筛选条件-姓名
        user_real_name: ['全部', '正常', '冻结'],
        //真实姓名选择框显示
        real_select_show: false,
        //性别
        user_sex: ['全部', '男', '女'],
        //性别选择框显示
        sex_select_show: false,
        //用户排行榜
        user_ranking: ['总学分排行榜', '本周学分排行榜', '今日学分排行榜'],
        //排行榜选择框显示
        ranking_select_show: false,
        //用户筛选条件
        user_condition: {
            name: '',
            real_name: '',
            sex: '全部',
            start_time: '',
            end_time: '',
            ranking: '总学分排行榜',
        },
        user_lists: [
            // {
            //     joins_create_at: "2018-06-25 16:06:13",
            //     point_amount_today: 0,
            //     point_amount_total: 0,
            //     point_amount_week: 0,
            //     task_count: 0,
            //     user_avatar: "https://wx.qlogo.cn/mmopen/vi_32/QkHzS8BSYEibn43oDlXfGrhicKfYLe9el96QqCliaYriaCtZofwXSNTDSD0lib6XJwlMLzvR9FUYLCDaX8viavDxtS0w/132",
            //     user_gender: "男",
            //     user_id: 2,
            //     user_nickname: "周州",
            //     user_truename: "周州分",
            // }
        ],

        //分组信息
        paging_information: {
            current_page: 1,//当前页
            page_total: 100,//总页数
            page_num: 8,//每页显示数量
            show: true,//是否显示
        },
        //分组信息
        paging_information2: {
            current_page: 1,//当前页
            page_total: 100,//总页数
            page_num: 8,//每页显示数量
            show: true,//是否显示
        },
        //获取打卡信息
        clock_info: {
            start_time: '2018-5-20',
            end_time: '2018-7-20',
            time: [
                //数据格式
                // {
                //     moun:'6月',
                //     datail:[
                //         {
                //             date: "2018-06-21"
                //             day: 21
                //             is_active: 0
                //             is_expire: 1
                //             is_topic: 1
                //             month: "6月"
                //             now: false
                //             week: "四"
                //         }
                //     ]
                // }
            ]
        },

        //打卡表格格式
        clock_table_width: {
            width: ''
        },
        //左右滑
        left: 0,
        //滑动控制点击
        move_state: false,
        //课题作业等数据
        class_info: {
            topic_tit: '',
            topic_content: '',
            topic_require: '',
            disable: false,
            now_date: 's'
        },
        //用于控制打卡表格的布局
        num: 0,
        //控制num的赋值
        num_tate: true,

        //资料库列表
        file_list: [
            //数据格式
            // {
            //     file_create_at: "2018-06-27 15:20:20",
            //     file_extension: "docx",
            //     file_id: 12,
            //     file_name: "无内容",
            //     file_url: "https://xiangxue-project.oss-cn-shanghai.aliyuncs.com/vpx_mini/1530084020168910.docx",
            //     material_id: 0,
            //     state: 1,
            //     training_id: 1,
            // },
        ],
        //数据统计概况
        data_statistics_nav: [
            {
                name: '营内人数',
                color: '#ff8761',
                num: 654,
                icon: '/static/images/data/icon1.png',
            },
            {
                name: '打卡总次数',
                color: '#57bdde',
                num: 654,
                icon: '/static/images/data/icon1.png',
            },
            {
                name: '今日入营人数',
                color: '#b198dc',
                num: 654,
                icon: '/static/images/data/icon1.png',
            },
            {
                name: '今日打卡次数',
                color: '#6dc7be',
                num: 654,
                icon: '/static/images/data/icon1.png',
            },
        ],




        // 查看作业
        task:[],
        user_truename:'',
        // 图表初始化
        statistics:{
            training_current_count:0,
            digg_all_count:0,
            user_today_count:0,
            digg_today_count:0,
            all_day:0,
            current_day:0,
            training_name:'训练营课程'

        }
    },
    methods: {
        limit: function () {
            //获取屏幕高度
            var that = this;
            var w_h = $(window).height();
            $('#edit').css({'min-height': w_h - 105});
            that.left = parseInt($('.date-tiem table').css("left"));
        },
        //获取当前的训练营信息
        get_id: function () {
            var cthat = this;
            cthat.lesson_id = sessionStorage.getItem('lesson_id');
            cthat.paging_information.show = true;
            cthat.paging_information2.show = true;
            if (cthat.lesson_id) {
                this.loading({
                    content: '数据加载中 . . .'
                });
                //获取训练营信息
                $.ajax({
                    url: '/admin/Training/training_info',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        training_id: cthat.lesson_id
                    },
                    success: function (data) {
                        cthat.essential_info = data.data;
                        cthat.upload_img = data.data.training_image;
                        cthat.training_image_name = data.data.training_image_name;
                        console.log(cthat.essential_info);
                        cthat.editor_limit();
                    }
                });
                //获取当前训练营的学员
                cthat.paging();
                //打卡信息
                cthat.get_clcok();
                //资料库分页
                cthat.paging2();

            } else {
                cthat.paging_information.show = false;
                cthat.paging_information2.show = false;
                //训练营
                cthat.essential_info = {
                    training_id: '',
                    training_name: "",
                    training_image: "",
                    training_begin_at: "",
                    training_finish_at: "",
                    training_task_begin_at: "",
                    training_task_finish_at: "",
                    training_max_count: '',
                    training_content: '',
                };
                //学员
                cthat.user_lists = [];
                cthat.editor_limit();
            }
        },
        //获取当前训练营的状态 设置权限
        get_tranning_status: function () {
            var that = this;
            var status = sessionStorage.getItem('lesson_statues');
            if (!status || status == '1') {
                that.change_essential = {
                    name: false,
                    max_per: false,
                    start_time: false,
                    end_time: false,
                    clock_in: false,
                    clock_out: false,
                    up_img: false,
                    con: false,
                    save: false,
                };
            } else if (status == '2') {
                that.change_essential = {
                    name: false,
                    max_per: false,
                    start_time: true,
                    end_time: false,
                    clock_in: false,
                    clock_out: false,
                    up_img: false,
                    con: false,
                    save: false,
                };
            } else if (status == '3') {
                that.change_essential = {
                    name: true,
                    max_per: true,
                    start_time: true,
                    end_time: true,
                    clock_in: true,
                    clock_out: true,
                    up_img: true,
                    con: true,
                    save: true,
                };
            }
        },
        //导航切换
        nav_change: function (ind, tit) {
            var cthat = this;
            cthat.now_nav_state = ind;
            cthat.now_nav_name = tit;
            $.each(cthat.nav, function (key, val) {
                if (key == ind) {
                    val.active = true;
                } else {
                    val.active = false;
                }
            })


        },
        //训练营管理-时间选择
        laydata_linit: function () {
            var cthat = this;
            //训练营开始时间
            laydate.render({
                elem: '#start_time',
                theme: '#e0051d',
                type: 'datetime',
                trigger: 'click',
                done: function (value, date) {
                    cthat.essential_info.training_begin_at = value;
                    console.log(value)
                }
            });
            //训练营结束时间
            laydate.render({
                elem: '#end_time',
                theme: '#e0051d',
                type: 'datetime',
                trigger: 'click',
                done: function (value, date) {
                    cthat.essential_info.training_finish_at = value;
                    console.log(value)
                }
            });
            //每天打卡开始时间
            laydate.render({
                elem: '#data_start',
                type: 'time',
                theme: '#e0051d',
                done: function (value, date) {
                    cthat.essential_info.training_task_begin_at = value;
                    console.log(value)
                }
            });
            //每天打卡结束时间
            laydate.render({
                elem: '#data_end',
                type: 'time',
                theme: '#e0051d',
                done: function (value, date) {
                    cthat.essential_info.training_task_finish_at = value;
                    console.log(value)
                }
            });

            //用户管理入营时间
            laydate.render({
                elem: '#user_start_time',
                theme: '#e0051d',
                trigger: 'click',
                done: function (value, date) {
                    console.log(value);
                    cthat.user_condition.start_time = value;
                }
            });
            //用户管理结束时间
            laydate.render({
                elem: '#user_end_time',
                theme: '#e0051d',
                trigger: 'click',
                done: function (value, date) {
                    console.log(value);
                    cthat.user_condition.end_time = value;
                }
            });
        },
        // 图片裁剪
        cropper_init: function () {
            var _this = this;
            var console = window.console || {
                log: function () {
                }
            };
            var $image = $('#image');
            var $dataX = $('#dataX');
            var $dataY = $('#dataY');
            var $dataHeight = $('#dataHeight');
            var $dataWidth = $('#dataWidth');
            var options = {
                aspectRatio: 1440 / 566,
                preview: '.img-preview',
                crop: function (e) {
                    $dataX.val(Math.round(e.x));
                    $dataY.val(Math.round(e.y));
                    $dataHeight.val(Math.round(e.height));
                    $dataWidth.val(Math.round(e.width));
                    // console.log(e);
                }
            };
            // Tooltip
            $('[data-toggle="tooltip"]').tooltip();
            // Cropper
            $image.on({
                'crop.cropper': function (e) {
                },
            }).cropper(options);
            // Buttons
            if (!$.isFunction(document.createElement('canvas').getContext)) {
                $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
            }
            // Options
            $('.docs-toggles').on('change', 'input', function () {
                var $this = $(this);
                var name = $this.attr('name');
                var type = $this.prop('type');
                var cropBoxData;
                var canvasData;

                if (!$image.data('cropper')) {
                    return;
                }
            });
            // Methods
            $('.docs-buttons').on('click', '[data-method]', function () {
                var $this = $(this);
                var data = $this.data();
                var $target;
                var result;
                if ($this.prop('disabled') || $this.hasClass('disabled')) {
                    return;
                }
                if ($image.data('cropper') && data.method) {
                    data = $.extend({}, data); // Clone a new one
                    if (typeof data.target !== 'undefined') {
                        $target = $(data.target);
                        if (typeof data.option === 'undefined') {
                            try {
                                data.option = JSON.parse($target.val());
                            } catch (e) {
                                // console.log(e.message);
                            }
                        }
                    }
                    result = $image.cropper(data.method, data.option, data.secondOption);
                    switch (data.method) {
                        case 'getCroppedCanvas':
                            if (result) {
                                _this.upload_img = result.toDataURL('image/jpeg');
                                var res = _this.up_image({
                                    file_base64: result.toDataURL('image/jpeg')
                                });
                                //获取图片地址
                                _this.upload_img = res.data.file_url;
                                _this.training_image_name = res.data.filename;
                                $('#cropper').on('hidden.bs.modal', function (e) {
                                    $('body').removeClass('modal-open')
                                })
                            }
                            break;
                    }
                    if ($.isPlainObject(result) && $target) {
                        try {
                            $target.val(JSON.stringify(result));
                        } catch (e) {
                            // console.log(e.message);
                        }
                    }
                }
            });
            // Import image
            var $inputImage = $('#inputImage');
            var URL = window.URL || window.webkitURL;
            var blobURL;
            if (URL) {
                $inputImage.change(function () {
                    var files = this.files;
                    var file;

                    if (!$image.data('cropper')) {
                        return;
                    }
                    if (files && files.length) {
                        file = files[0];
                        if (/^image\/\w+$/.test(file.type)) {
                            blobURL = URL.createObjectURL(file);
                            $image.one('built.cropper', function () {
                                URL.revokeObjectURL(blobURL);
                            }).cropper('reset').cropper('replace', blobURL);
                            $inputImage.val('');
                        } else {
                            window.alert('Please choose an image file.');
                        }
                    }
                });
            } else {
                $inputImage.prop('disabled', true).parent().addClass('disabled');
            }
        },
        //编辑器初始化
        editor_limit: function () {
            var cthat = this;

            'use strict';
            //图片适配器
            var _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            var UploadAdapter = function () {
                function UploadAdapter(loader) {
                    _classCallCheck(this, UploadAdapter);

                    this.loader = loader;
                }

                _createClass(UploadAdapter, [{
                    key: 'upload',
                    value: function upload() {
                        var _this = this;
                        var data = new FormData();
                        data.append('file', _this.loader.file);
                        var config = {
                            headers: {'content-type': 'multipart/base64'}
                        };
                        return new Promise(function (resolve, reject) {

                            axios.post('/api/upload/add', data, config).then(function (response) {
                                resolve({
                                    default: response.data.file_url,
                                });
                            }).catch(function (error) {
                                reject(error);
                            });
                        });
                    }
                }, {
                    key: 'abort',
                    value: function abort() {
                    }
                }]);

                return UploadAdapter;
            }();
            //编辑器渲染
            DecoupledEditor
                .create(document.querySelector('#editor'), {
                    image: {
                        toolbar: [],
                        styles: ['imageStyleFull']
                    }
                })
                .then(function (editor) {
                    var toolbarContainer = document.querySelector('#toolbar-container');
                    // 加载了适配器
                    editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
                        return new UploadAdapter(loader);
                    };
                    toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                    editor.setData(cthat.essential_info.training_content);

                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        //训练营保存
        training_submit: function () {
            var that = this;
            var num_zz = /^[0-9]*$/;
            var training_con = document.getElementById("editor").innerHTML;
            var clock_in_h = parseInt(that.essential_info.training_task_begin_at.split(":")[0]);
            var clock_in_m = parseInt(that.essential_info.training_task_begin_at.split(":")[1]);
            var clock_in_s = parseInt(that.essential_info.training_task_begin_at.split(":")[2]);
            var clock_out_h = parseInt(that.essential_info.training_task_finish_at.split(":")[0]);
            var clock_out_m = parseInt(that.essential_info.training_task_finish_at.split(":")[1]);
            var clock_out_s = parseInt(that.essential_info.training_task_finish_at.split(":")[2]);
            if (that.essential_info.training_name == '') {
                layer.alert('训练营名称不能为空！', {
                    icon: 2,
                    skin: 'layer-ext-moon',
                });
            } else if (that.essential_info.training_max_count == '') {
                layer.alert('人数上限不能为空！', {
                    icon: 2,
                    skin: 'layer-ext-moon',
                });
            } else if (!num_zz.test(that.essential_info.training_max_count)) {
                layer.alert('只能输入6位纯数字！', {
                    icon: 2,
                    skin: 'layer-ext-moon',
                });
            } else if (that.essential_info.training_begin_at == '') {
                layer.alert('开营时间不能为空！', {
                    icon: 2,
                    skin: 'layer-ext-moon',
                });
            } else if (that.essential_info.training_finish_at == '') {
                layer.alert('截止时间不能为空！', {
                    icon: 2,
                    skin: 'layer-ext-moon',
                });
            } else if (!moment(that.essential_info.training_begin_at).isBefore(that.essential_info.training_finish_at)) {
                layer.alert('请选择正确开营的时间！', {
                    icon: 2,
                    skin: 'layer-ext-moon',
                });
            } else if (that.essential_info.training_task_begin_at == '') {
                layer.alert('打卡开始时间不能为空！', {
                    icon: 2,
                    skin: 'layer-ext-moon',
                });
            } else if (that.essential_info.training_task_finish_at == '') {
                layer.alert('打卡结束时间不能为空！', {
                    icon: 2,
                    skin: 'layer-ext-moon',
                });
            } else if (clock_in_h > clock_out_h) {
                layer.alert('请选择正确打卡的时间！', {
                    icon: 2,
                    skin: 'layer-ext-moon',
                });
            } else if (clock_in_h == clock_out_h && clock_in_m > clock_out_m) {
                layer.alert('请选择正确打卡的时间！', {
                    icon: 2,
                    skin: 'layer-ext-moon',
                });
            } else if (clock_in_h == clock_out_h && clock_in_m == clock_out_m && clock_in_s > clock_out_s) {
                layer.alert('请选择正确打卡的时间！', {
                    icon: 2,
                    skin: 'layer-ext-moon',
                });
            } else if (training_con == '<p><br data-cke-filler="true"></p>') {
                layer.alert('训练营介绍不能为空！', {
                    icon: 2,
                    skin: 'layer-ext-moon',
                })
            } else {
                that.essential_info.training_content = training_con;
                $.ajax({
                    url: '/admin/Training/training_edit_add',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        training_id: that.essential_info.training_id,
                        training_name: that.essential_info.training_name,
                        training_max_count: that.essential_info.training_max_count,
                        training_begin_at: that.essential_info.training_begin_at,
                        training_finish_at: that.essential_info.training_finish_at,
                        training_task_begin_at: that.essential_info.training_task_begin_at,
                        training_task_finish_at: that.essential_info.training_task_finish_at,
                        training_image: that.training_image_name,
                        training_content: that.essential_info.training_content,
                    },
                    success: function (data) {
                        if (data.code == 1000) {
                            layer.msg('保存成功！');
                            window.location.href = '/admin/index/index.html'
                        }
                        ;
                    }
                })
            }
        },
        //性别选择
        sex_choose: function (sex) {
            this.user_condition.sex = sex;
        },
        //性别下拉框显示
        sex_select_type_change: function () {
            this.sex_select_show = !this.sex_select_show;
        },
        //排行榜下拉框显示
        ranking_select_type_change: function () {
            this.ranking_select_show = !this.ranking_select_show;
        },
        //排行榜选择
        ranking_choose: function (data) {
            this.user_condition.ranking = data;
        },
        // 查看作业
        modal_task:function (index,id) {
            console.log(index,id)
            this.user_truename = this.user_lists[index].user_truename
            var that = this
            $.ajax({
                type: "POST",
                data: {
                    training_id: that.lesson_id,
                    user_id: id,
                },
                url: "/admin/user/user_task_list",
                // async:false,
                success: function (res) {
                    // console.log('作业', res)
                    if (res.code == 1000) {
                        that.task = res.data
                    } else {
                        that.result({
                            type: 'wa',
                            content: res.msg,
                            timer: 1500

                        })
                    }
                }
            });
        },
        // 切换该条作业是否显示
        task_show:function (index,id) {
            var that = this
            $.ajax({
                type: "POST",
                data: {
                    task_id: id
                },
                url: "/admin/user/task_show",
                // async:false,
                success: function (res) {
                    // console.log('切换显示', res)
                    if (res.code == 1000) {
                        that.task[index].task_show = that.task[index].task_show==1? 0: 1
                    } else {
                        that.result({
                            type: 'wa',
                            content: res.msg,
                            timer: 1500

                        })
                    }
                }
            });

        },
        //学员删除
        user_delete: function (ind, id) {
            var that = this;
            //询问框
            layer.confirm('确定删除该学员么？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                //确定之后的提示
                layer.msg('删除成功', {icon: 1, time: 1000});
                that.user_lists.splice(ind, 1);

                $.ajax({
                    url: '/admin/user/joins_out',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        training_id: that.lesson_id,
                        user_id: id,
                    },
                    success: function (data) {
                    }
                })
            }, function () {
                //取消之后的提示
            });
        },
        //学员搜索
        user_search: function () {
            this.paging_information.current_page = 1;
            this.paging();
        },

        // 学员分页  url传参,不同的分类分别调用
        paging: function () {
            var sex = '',
                order_type = 1,
                that = this;

            if (that.user_condition.sex == '全部') {
                sex = ''
            } else if (that.user_condition.sex == '男') {
                sex = 1
            } else if (that.user_condition.sex == '女') {
                sex = 2
            }
            if (that.user_condition.ranking == '总学分排行榜') {
                order_type = 1
            } else if (that.user_condition.ranking == '本周学分排行榜') {
                order_type = 2
            } else if (that.user_condition.ranking == '今日学分排行榜') {
                order_type = 3
            }
            $('#paging').jqPaginator({
                totalPages: that.paging_information.page_total,
                visiblePages: 5,
                currentPage: that.paging_information.current_page,
                first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
                prev: '<li class="prev"><a href="javascript:void(0);">上一页</a></li>',
                next: '<li class="next"><a href="javascript:void(0);">下一页</a></li>',
                last: '<li class="last"><a href="javascript:void(0);">尾页</a></li>',
                page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',
                onPageChange: function (num) {
                    that.loading({
                        content: '数据加载中 . . .'
                    });
                    //获取学员列表
                    that.paging_information.current_page = num;
                    $.ajax({
                        url: '/admin/user/lists',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            training_id: that.lesson_id,
                            page: that.paging_information.current_page,
                            psize: that.paging_information.page_num,
                            user_nickname: that.user_condition.name,
                            user_truename: that.user_condition.real_name,
                            user_gender: sex,
                            joins_start_time: that.user_condition.start_time,
                            joins_end_time: that.user_condition.end_time,
                            order_type: order_type,
                        },
                        success: function (data) {
                            console.log('xueyuan',data)
                            //关闭弹窗
                            swal.close();
                            //分页处理
                            that.paging_information.page_total = data.data.last_page;
                            $('#paging').jqPaginator('option', {
                                totalPages: data.data.last_page,
                            });
                            that.user_lists = data.data.data;
                        }
                    });
                }
            });
        },
        //打卡表格初始化
        clock_table_limit: function () {
            //必须放在获取数据后面
            var that = this;
            var w_w = $('.date-tiem').width();
            var all = 0;
            var num = 0;
            $.each(that.clock_info.time, function (key, value) {
                all = all + parseInt(value.detail.length);
                $.each(value.detail, function (k, v) {
                    if (v.is_expire == 1) {
                        num++;
                    }
                });
                if (that.num_tate) {
                    that.num = num;
                }
                if ((that.num * 80) - (w_w / 2) > 0) {
                    that.left = -((that.num * 80) - (w_w / 2));
                } else {
                    that.left = 0;
                }
                $('.date-tiem table').css({'left': that.left});
            });
            //表格不够撑满屏幕时 布局
            if (w_w > all * 80) {
                var td_w = $('.date-tiem table td').width();
                that.clock_table_width.width = w_w + 'px';
                $('.turn-left,.turn-right').hide();
                $('.td-cover').css({'width': td_w + 2 + 'px'})
            } else {
                that.clock_table_width.width = all * 80 + 'px';
                $('.turn-left,.turn-right').show();
            }
        },
        //左滑
        turn_left: function () {
            var that = this;
            if (that.move_state) return;
            that.move_state = true;
            if (that.left < 0) {
                that.left += 80;
                $('.date-tiem table').animate({'left': that.left}, 600, function () {
                    that.move_state = false
                })
            } else {
                that.left = 0;
                $('.date-tiem table').animate({'left': that.left}, 600, function () {
                    that.move_state = false
                })
            }
        },
        //右滑
        turn_rigth: function () {
            var that = this;
            var w_w = $('.date-tiem').width();
            if (that.move_state) return;
            that.move_state = true;

            if (that.left > -(parseInt(that.clock_table_width.width) - w_w)) {
                that.left -= 80;
                $('.date-tiem table').animate({'left': that.left}, 600, function () {
                    that.move_state = false
                });
            } else {
                that.left = -(parseInt(that.clock_table_width.width) - w_w)
                $('.date-tiem table').animate({'left': that.left}, 600, function () {
                    that.move_state = false
                });
            }
        },
        //日期选择
        date_choose: function (dis, ind, index, date) {
            var that = this;
            var num = 0;
            var w_w = $('.date-tiem').width();
            that.class_info.now_date = date;
            that.num_tate = false;
            //判断当前日期之前还是之后
            if (dis == 0) {
                $.each(that.clock_info.time, function (key, val) {
                    $.each(val.detail, function (k, v) {
                        if (key == index && k == ind) {
                            v.is_active = 1;
                        } else {
                            v.is_active = 0
                        }
                        if (v.is_active == 0) {
                            num++
                        } else {
                            that.num = num;
                            if ((that.num * 80) - (w_w / 2) > 0) {
                                that.left = -((that.num * 80) - (w_w / 2));
                            } else {
                                that.left = 0;
                            }
                        }
                    })
                });
                $('.date-tiem table').css({'left': that.left});
                that.class_info.disable = false;
            } else {
                that.class_info.disable = true;
            }
            //获取数据
            this.loading({
                content: '数据加载中 . . .'
            });
            $.ajax({
                url: '/admin/topic/showTopic',
                type: 'POST',
                dataType: 'json',
                data: {
                    training_id: that.lesson_id,
                    topic_date: date
                },
                success: function (data) {
                    console.log(data.data);
                    //关闭弹窗
                    swal.close();
                    that.class_info.topic_tit = data.data.topic_title;
                    that.class_info.topic_content = data.data.topic_content;
                    that.class_info.topic_require = data.data.topic_require;
                }
            })
        },
        //获取打卡信息
        get_clcok: function () {
            var that = this;
            var moun = [],
                tmp_json = {};
            this.loading({
                content: '数据加载中 . . .'
            });
            $.ajax({
                url: '/admin/topic/calendar',
                type: 'POST',
                dataType: 'json',
                data: {
                    training_id: that.lesson_id,
                },
                success: function (data) {
                    //关闭弹窗
                    var today = '';
                    swal.close();
                    that.clock_info.start_time = data.data.training_begin_at;
                    that.clock_info.end_time = data.data.training_finish_at;
                    var s = parseInt(data.data.training_begin_at.split('-')[1]);
                    var e = parseInt(data.data.training_finish_at.split('-')[1]);
                    for (var i = 0; i <= (e - s); i++) {
                        moun.push(s + i + '月');
                        tmp_json = {
                            moun: (s + i) + '月',
                            bg: {
                                background: that.bg[i]
                            },
                            detail: [],
                        };
                        that.clock_info.time.push(tmp_json);
                        $.each(data.data.calendar_data, function (k, v) {
                            if (v.month == (s + i) + '月') {
                                that.clock_info.time[i].detail.push(v);
                            }
                            if (v.is_active == 1) {
                                that.class_info.now_date = v.date;
                            }
                        })
                    }
                    ;
                    //获取当前日期的课程作业信息
                    $.ajax({
                        url: '/admin/topic/showTopic',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            training_id: that.lesson_id,
                            topic_date: that.class_info.now_date,
                        },
                        success: function (data) {
                            //关闭弹窗
                            swal.close();
                            that.class_info.topic_tit = data.data.topic_title;
                            that.class_info.topic_content = data.data.topic_content;
                            that.class_info.topic_require = data.data.topic_require;
                        }
                    })
                },
            })
        },
        //作业课题修改提交
        lesson_submit: function () {
            var that = this;
            $.ajax({
                url: '/admin/topic/updateTopic',
                type: 'POST',
                dataType: 'json',
                data: {
                    training_id: that.lesson_id,
                    topic_date: that.class_info.now_date,
                    topic_title: that.class_info.topic_tit,
                    topic_content: that.class_info.topic_content,
                    topic_require: that.class_info.topic_require,
                },
                success: function (data) {
                    if (data.code == 1000) {
                        layer.msg('保存成功！');
                    }
                }
            })
        },

        //文件编辑
        date_edit: function (ind, id) {
            var that = this;
            that.file_list[ind].state = 0;
        },
        paging2: function () {
            var that = this;
            $('#paging2').jqPaginator({
                totalPages: that.paging_information2.page_total,
                visiblePages: 5,
                currentPage: that.paging_information2.current_page,
                first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
                prev: '<li class="prev"><a href="javascript:void(0);">上一页</a></li>',
                next: '<li class="next"><a href="javascript:void(0);">下一页</a></li>',
                last: '<li class="last"><a href="javascript:void(0);">尾页</a></li>',
                page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',
                onPageChange: function (num) {
                    that.loading({
                        content: '数据加载中 . . .'
                    });
                    that.paging_information2.current_page = num;
                    $.ajax({
                        url: '/admin/material/lists',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            training_id: that.lesson_id,
                            page: that.paging_information2.current_page,
                            psize: that.paging_information2.page_num,
                        },
                        success: function (data) {
                            console.log('date',data)
                            //关闭弹窗
                            swal.close();

                            that.paging_information2.page_total = data.data.last_page;
                            $('#paging2').jqPaginator('option', {
                                totalPages: data.data.last_page?data.data.last_page:1,
                            });
                            $.each(data.data.data, function (key, val) {
                                val.state = 1;
                            });
                            that.file_list = data.data.data;
                        }
                    })
                }
            });
        },
        //文件选择
        file_choose: function () {
            var that = this;
            $('body').on('change', '.file_up', function () {
                var file = this.files[0];
                var type = file.name.split('.')[1];
                var ind = $(this).parents('li').index();
                if (type == 'doc' || type == 'xls' || type == 'ppt' || type == 'pdf' || type == 'docx' || type == 'xlsx' || type == 'pptx') {
                    $(this).parent('.list-btn').siblings('.data_name').html(file.name);
                    that.file_list[ind].file = file;
                } else {
                    //上传不合法文件状态
                    layer.alert('上传文件格式不正确', {icon: 2, time: 2000});
                    console.log('格式不对');
                    $(this).val('');
                    $(this).parent('.list-btn').siblings('.data_name').html('');
                    that.file_list[ind].file = '';
                }
            })
        },
        //添加文件
        file_add: function () {
            var that = this;
            var len = that.file_list.length;
            var tmp = {
                file_name: '',
                file: '',
                state: 0,
                file_id: '',
            };
            if (len <= 100) {
                that.file_list.unshift(tmp)
            } else {
                layer.alert('最多只能上传100个文件', {icon: 2, time: 2000});
            }
        },
        //文件保存
        data_save: function (ind) {
            var that = this;
            if (that.file_list[ind].file_name == '') {
                layer.alert('资料名称不能为空!', {icon: 2, time: 2000});
            } else {
                that.loading({
                    content: '数据加载中 . . .'
                });
                var fd = new FormData();
                fd.append("file", that.file_list[ind].file);
                fd.append("training_id", that.lesson_id);
                fd.append("file_name", that.file_list[ind].file_name);
                fd.append("file_id", that.file_list[ind].file_id);
                $.ajax({
                    url: '/admin/material/add',
                    type: 'POST',
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    data: fd,
                    success: function (data) {
                        if (data.code == 1000) {
                            //关闭弹窗
                            swal.close();
                            layer.msg('保存成功!', {icon: 1, time: 1500})
                            that.paging2();
                        }
                    }
                })
            }
        },
        //文件删除
        delete_file: function (ind, id) {
            var that = this;
            if (id == '') {
                that.file_list.splice(ind, 1);
            } else {
                that.loading({
                    content: '数据加载中 . . .'
                });
                $.ajax({
                    url: '/admin/material/del',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        file_id: id,
                    },
                    success: function (data) {
                        if (data.code == 1000) {
                            //关闭弹窗
                            swal.close();
                            layer.msg('删除成功!', {icon: 1, time: 2000});
                            that.paging2();
                        }
                    }
                })
            }

        },

        // 图标数据初始化
        chart_init:function () {
            var that = this
            $.ajax({
                type: "POST",
                data: {
                    training_id: that.lesson_id
                },
                url: "/admin/user/statistics",
                // async:false,
                success: function (res) {

                    if (res.code == 1000) {
                        console.log('图标数据', res.data)
                        that.statistics = res.data

                        //数据统计柱状图
                        that.echarts_bar();
                        //数据统计折线图
                        // this.echarts_line();

                    } else {
                        that.result({
                            type: 'w',
                            content: res.msg,
                            timer: 1500

                        })
                    }
                }
            });
        },
        //数据统计柱状图
        echarts_bar: function () {
            // console.log('原有人数',this.statistics.joins_list[0].yestday_user_all)
            var that = this
            var myChart = echarts.init(document.getElementById('echarts-bar'));
            option = {
                backgroundColor: "#fff",
                title: {
                    x: "4%",
                    textStyle: {
                        color: '#fff',
                        fontSize: '22'
                    },
                    subtextStyle: {
                        color: '#90979c',
                        fontSize: '16',

                    },
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data:['原有人数','今日增长','增长率']
                },
                calculable: true,
                xAxis: [{
                    type: "category",
                    axisLine: {
                        lineStyle: {
                            color: '#90979c'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitArea: {
                        show: false
                    },
                    axisLabel: {
                        interval: 0,

                    },
                    // data: ['1月份','2月份','3月份','4月份','5月份','6月份','7月份','8月份','9月份','10月份','11月份','12月份'],
                    data: that.statistics.joins_list[0].joins_time,
                }],
                yAxis: [{
                    type: "value",
                    name: '人数',
                    min: 0,
                    max: 20,
                    interval: 1,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#90979c'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        interval: '',

                    },
                    splitArea: {
                        show: false
                    },

                }, {
                        type: 'value',
                        name: '增长率(%)',
                        // min: -1,
                        // max: 1,
                        // interval: 0.1,
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#90979c'
                            }
                        },
                        axisLabel: {
                            formatter: '{value} %'
                        },
                        axisTick: {
                            show: false
                        },
                        splitArea: {
                            show: false
                        },
                    }],

                series: [
                    {
                        name: "原有人数",
                        type: "bar",
                        stack: "总量",
                        barMaxWidth: 35,
                        barGap: "10%",
                        itemStyle: {
                            normal: {
                                color: "#49a5ef",
                                label: {
                                    show: false,
                                    textStyle: {
                                        color: "#fff"
                                    },
                                    position: "insideTop",
                                    formatter: function (p) {
                                        // return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        // data: [709, 1917, 2455, 2610, 1719, 1433, 1544, 3285, 5208, 3372, 2484, 4078],
                        data: that.statistics.joins_list[0].yestday_user_all
                    },
                    {
                        name: "今日增长",
                        type: "bar",
                        stack: "总量",
                        itemStyle: {
                            normal: {
                                color: "#73debc",
                                barBorderRadius: 0,
                                label: {
                                    show: false,
                                    position: "top",
                                    formatter: function (p) {
                                        // return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        // data: [327, 1776, 507, 1200, 800, 482, 204, 1390, 1001, 951, 381, 220]
                        data: that.statistics.joins_list[0].user_count
                    },
                    {
                        name: "增长率",
                        type: "line",
                        yAxisIndex: 1,
                        stack: "总量",
                        symbolSize: 10,
                        symbol: 'circle',
                        itemStyle: {
                            normal: {
                                color: "#4dc1ff",
                                barBorderRadius: 0,
                                label: {
                                    show: true,
                                    position: "top",
                                    formatter: function (p) {
                                        // return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        // data: [1036, 3693, 2962, 3810, 2519, 1915, 1748, 4675, 6209, 4323, 2865, 4298]
                        data: that.statistics.joins_list[0].growth_rate
                    },
                ]
            };

            myChart.setOption(option);
        },

        //数据统计折线图
        echarts_line: function () {
            var myChart = echarts.init(document.getElementById('echarts-line'));
            option = {
                backgroundColor: "#fff",
                title: {
                    x: "4%",
                    textStyle: {
                        color: '#fff',
                        fontSize: '22'
                    },
                    subtextStyle: {
                        color: '#90979c',
                        fontSize: '16',

                    },
                },
                calculable: true,
                xAxis: [{
                    type: "category",
                    axisLine: {
                        lineStyle: {
                            color: '#90979c'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitArea: {
                        show: false
                    },
                    axisLabel: {
                        interval: 0,

                    },
                    data: ['1月份','2月份','3月份','4月份','5月份','6月份','7月份','8月份','9月份','10月份','11月份','12月份'],
                }],
                yAxis: [{
                    type: "value",
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#90979c'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        interval: 0,

                    },
                    splitArea: {
                        show: false
                    },

                }],

                series: [
                    {
                        name: "总数2",
                        type: "line",
                        stack: "总量",
                        symbolSize: 10,
                        symbol: 'circle',
                        itemStyle: {
                            normal: {
                                color: "#4cc1ff",
                                barBorderRadius: 0,
                                label: {
                                    show: true,
                                    position: "top",
                                    formatter: function (p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        data: [709, 1917, 2455, 2610, 1719, 1433, 1544, 3285, 5208, 3372, 2484, 4078],
                    },
                    {
                        name: "总数",
                        type: "line",
                        stack: "总量",
                        symbolSize: 10,
                        symbol: 'circle',
                        itemStyle: {
                            normal: {
                                color: "#34ff18",
                                barBorderRadius: 0,
                                label: {
                                    show: true,
                                    position: "top",
                                    formatter: function (p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        data: [1036, 3693, 2962, 3810, 2519, 1915, 1748, 4675, 6209, 4323, 2865, 4298]
                    },
                ]
            };

            myChart.setOption(option);
        }

    },
    mounted: function () {
        this.limit();
        //获取ID
        this.get_id();
        //获取训练营
        this.get_tranning_status();
        //时间插件初始化
        this.laydata_linit();
        //copper初始化
        this.cropper_init();
        //文件上传
        this.file_choose();

        this.chart_init()




    },
    updated: function () {
        this.clock_table_limit();
    },
});