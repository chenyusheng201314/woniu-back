// 地址栏参数解析
// 地址栏参数解析
Vue.prototype.getUrlParam = function() {
    var _arr = location.search.substr(1).split('&');
    var _obj = {};
    for (var i = 0; i < _arr.length; i++) {
        _obj[_arr[i].split('=')[0]] = _arr[i].split('=')[1]
    }
    return _obj;
};

// 10以内的数字 补0
Vue.prototype.fixed0 = function(n) {
    n = Number(n)
    return n >= 10 ? "" + n : "0" + n
}

//校验登录名：只能输入2-10个以字母开头、可带数字、“_”、“.”的字串
Vue.prototype.isRegisterUserName = function(s) {
    var patrn = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){1,9}$/;
    if (!patrn.exec(s)) {
        return false
    } else {
        return true
    }
};
//校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”
Vue.prototype.isTel = function(s) {
    //var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?(\d){1,12})+$/;
    var patrn = /(^(\d{3,4}-)?\d{7,8})$|(13[0-9]{9})/;
    if (!patrn.exec(s)) {
        return false
    } else {
        return true
    }
};
//校验手机 11位数字
Vue.prototype.isTel11 = function(s) {
    var rexp = /(^1[3|4|5|7|8][0-9]{9}$)/
    if (s.length == 11 && rexp.test(s)) {
        return true
    } else {
        return false
    }
};

//时间优化显示
Vue.prototype.timeop = function(s) {
    if (s.toString().length == 1) {
        return '0' + s;
    } else {
        return s;
    }
}

//秒数转时间格式  68 => 01:08
Vue.prototype.num_time = function(num) {
    num = Number(num)
    if (num < 60) {
        if (num < 10) {
            return '00:0' + num + '';
        } else {
            return '00:' + num + '';
        }
    } else {
        var i = parseInt(num / 60) > 9 ? '' + parseInt(num / 60) + ':' : '0' + parseInt(num / 60) + ':';
        var y = parseInt(num % 60) > 9 ? '' + parseInt(num % 60) + '' : '0' + parseInt(num % 60) + '';
        return i + y;
    }
}
//秒转换成分 121 => 02:01
Vue.filter('s_to_m', function(s) {
    var h = parseInt(parseInt(s/60)/60)
    var m = parseInt((s-h*3600)/60)
    var ss = parseInt(s%60)

    // console.log(h,m,ss)
    if(h<10){
        h= '0'+h
    }
    if(m<10){
        m= '0'+m
    }
    if(ss<10){
        ss= '0'+ss
    }
    return h+':'+m+':'+ss
})

// 时间格式 时间戳--》本地时间
Vue.filter('time_formart', function(t) {
    // m = m.toString();
    if (t) {
        var date = new Date(t * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
        return Y + M + D + h + m + s;
    } else {
        return t;
    }
})
// 时间格式 时间戳--》本地时间 精确到天数
Vue.filter('time_formart_day', function(t) {
    // m = m.toString();
    if (t) {
        var date = new Date(t * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        D = date.getDate() + ' ';
        return Y + M + D
    } else {
        return t;
    }
})

// 校验字符串 是否有 http
Vue.filter('http', function(t) {
    t = t.toString();

    if (t.indexOf('http') == -1) {
        return false
    } else {
        return true
    }
})

// src加密
Vue.prototype.to_blob = function() {
    var vids = document.getElementsByTagName('video');
    var vedio;
    var s = 0;
    for (var i = 0; i < vids.length; i++) {
        vedio = vids[i];
        window.URL = window.URL || window.webkitURL;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://video.ondemand-learning.com/18a0f160589745919ef24df5f5704ba5/38734e7ca28b42fe8ffd0a4ffc2f614b-a5b7d8911cc7d347a9c9dd7e9b1d521b.mp4", true);
        xhr.responseType = "blob";
        xhr.onload = function() {
            if (this.status == 200) {
                var blob = this.response;
                vedio.onload = function(e) {
                    window.URL.revokeObjectURL(vedio.src);
                };
                document.getElementsByTagName('video')[s].src = window.URL.createObjectURL(blob);
                s++;
                console.log(window.URL.createObjectURL(blob));
            }
        }
        xhr.send();
    }
}

//下拉菜单选择绑定
Vue.prototype.selected = function(speed) {
    $('body').on('click', '._select_s ._select_t', function(event) {
        event.stopPropagation();
        $('._select_s .items').hide();
        var s = $(this);
        var n = s.next('.items');
        n.is(':hidden') ? n.fadeIn(speed) : n.fadeOut(speed);
    });

    $('body').on('click', '._select_s .items li:not(.undo)', function(event) {
        var s = $(this);
        var c = s.html();
        var id = s.val();
        s.parent().prev().find('.show_item').html(c);
        if(id){
            s.parent().prev().find('.show_item').val(id);
        }
        // s.parent().prev().find('.show_item').val(c);
        s.parent().fadeOut(speed);
    });

    $(document).click(function(event) {
        if (event.target._prevClass != 'undo') {
            $('._select_s .items').hide();
        }
        $('.url_link .box').fadeOut(200);
    });
}

// 字符串去除前后空格
String.prototype.trim = function() {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}
//另类的 下拉菜单选择绑定 上传音频处
// Vue.prototype.selectedButton = function(speed) {
//     $('body').on('click', '.second ._select_t', function(event) {
//         event.stopPropagation();
//         $('._select_s .items').hide();
//         var s = $(this);
//         var n = s.next('.items');
//         n.is(':hidden') ? n.fadeIn(speed) : n.fadeOut(speed);
//     });
//
//     $('body').on('click', '.second .items li:not(.undo)', function(event) {
//         var s = $(this);
//         var c = s.html();
//         // if(c.indexOf('开始录音')){
//         //     $('.second .show_item').html(c);
//         // }
//
//         s.parent().fadeOut(speed);
//     });
//
//     $(document).click(function(event) {
//         if (event.target._prevClass != 'undo') {
//             $('._select_s .items').hide();
//         }
//         $('.url_link .box').fadeOut(200);
//     });
// }

// 数组排重 按对象id排重，，如需按元素排重，去掉“.id”
Vue.prototype.arr_duplicate = function(arr1, arr2) {
    var temp = []; //临时数组1
    var temparray = []; //临时数组2
    for (var i = 0; i < arr2.length; i++) {
        temp[arr2[i].id] = true; //巧妙地方：把数组B的值当成临时数组1的键并赋值为真
    }
    for (var i = 0; i < arr1.length; i++) {
        if (!temp[arr1[i].id]) {
            temparray.push(arr1[i]); //巧妙地方：同时把数组A的值当成临时数组1的键并判断是否为真，如果不为真说明没重复，就合并到一个新数组里，这样就可以得到一个全新并无重复的数组
        }
    }
    return temparray
}

// 元素在数组中的索引
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};


//把制定内容剪切的剪切板
Vue.prototype.copy = function(cl) {
    var Url2 = document.getElementById("" + cl + "").innerText;
    var oInput = document.createElement('input');
    oInput.value = Url2;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    oInput.className = 'oInput';
    oInput.style.display = 'none';
}


//标签控制
Vue.prototype.tag = function() {
    var l = $('.tag_group').length;
    if (l > 0) {
        var t = $('.tag_group');
        for (var i = 0; i < l; i++) {
            var tag_id = t.eq(i).attr('tag_id');
            $('#' + tag_id + ' .tag_con').eq(0).show();
        }
        $('.tag_group .tag_item').click(function(event) {
            var tag_id = $(this).parent().attr('tag_id');
            $('#' + tag_id + ' .tag_con').hide().eq($(this).index()).fadeIn(200);
        });
    }
}
//手机短信验证码发送
Vue.prototype.mobile_code = function(mobile_num) {
    jQuery.ajax({
        url: '/api/Commonthing/mobile_code',
        type: 'POST',
        dataType: 'json',
        data: { mobile: mobile_num },
        success: function(data) {
            if (data.code == 1000) {
                return {
                    is_success: true,
                    code: data.code
                };
            } else {
                return {
                    is_success: false,
                    code: data.msg
                };
            }
        },
    });

}
//金钱格式过滤器 13000 => 130,00
Vue.filter('money_formart', function(m) {
    m = m.toString();
    var s = '';
    if (m.length > 3) {
        for (var i = 0; i < m.length; i++) {
            if (i % 3 == 0 && i != 0) {
                s += ',' + m.substr(i, 1);
            } else {
                s += m.substr(i, 1);
            }
        }
        return s;
    } else {
        return m;
    }
})

//页面弹窗信息
Vue.prototype.sure = function(i) {
    swal({
        title: i.title != '' ? '<div class="swal2-t">' + i.title + '<span class="alert_close" style="float:right;margin-right:25px;cursor:pointer;"><i class="iconfont">&#xe6e9;</i></span></div>' : '',
        html: '<p class="s_title">' + i.s_title + '</p><p>' + i.content + '</p>',
        showConfirmButton: true,
        confirmButtonText: '确定',
        confirmButtonClass: 'btn waves-effect waves-light btn-success',
        showCancelButton: true,
        cancelButtonText: '取消',
        cancelButtonClass: 'btn waves-effect waves-light btn-secondary',
        allowOutsideClick: false
    }).then((result) => {
        if (result.value) {
            i.sure();
        } else {
            i.cancle();
        }
    });

    $('body').on('click', '.alert_close', function(event) {
        swal.close();
    });
}

//页面弹窗信息
Vue.prototype.sure_input = function(i) {
    swal({
        title: i.title != '' ? '<div class="swal2-t">' + i.title + '<span class="alert_close" style="float:right;margin-right:25px;cursor:pointer;">' +
            '<i class="iconfont">&#xe6e9;</i></span></div>' : '',
        html: '<input class="swal2-input" autofocus id="swal_input" type="text" placeholder="请给录制的音频起个名字">',

        showConfirmButton: true,
        confirmButtonText: '确定',
        confirmButtonClass: 'btn waves-effect waves-light btn-success',
        // showCancelButton: true,
        // cancelButtonText: '取消',
        // cancelButtonClass: 'btn waves-effect waves-light btn-secondary',
        allowOutsideClick: false
    }).then((result) => {
        if (result.value) {
            i.sure_inp();
        }
        // else {
        i.cancle();
        // }
    });

    $('body').on('click', '.alert_close', function(event) {
        swal.close();
    });
}

Vue.prototype.msg = function(i) {
    swal({
        html: '<p>' + i.content + '</p>',
        showConfirmButton: false,
        footer: '<button class="btn waves-effect waves-light btn-success alert_close">朕知道了</button>'
    });

    $('body').on('click', '.alert_close', function(event) {
        swal.close();
    });
}

Vue.prototype.msg_img = function(i) {
    swal({
        html: '<div style="text-align:center;"><img src="' + i.url + '"><p style="margin:20px 0 10px;font-size:20px;color:' + (i.type == 'r' ? '#1e990a' : '#d43f55') + '">' + i.title + '</p><p style="color:#333;font-size:16px;">' + i.content + '</p></div>',
        showConfirmButton: true,
        confirmButtonText: i.button_text,
        confirmButtonClass: 'msg_img_s btn waves-effect waves-light btn-' + (i.type == 'r' ? 'success' : 'primary') + '',
        allowOutsideClick: false,
    }).then((result) => {
        if (result.value) {
            i.sure();
        }
    });
}

Vue.prototype.only_img = function(i) {
    swal({
        html: '<div style="text-align:center;"><img style="width:200px;" src="' + i.url + '"><p style="margin:20px 0 10px;font-size:20px;color:' + (i.type == 'r' ? '#1e990a' : '#d43f55') + '">' + i.title + '</p><p style="color:#333;font-size:16px;">' + i.content + '</p></div>',
        showConfirmButton: false,
        allowOutsideClick: false,
    });
}

Vue.prototype.loading = function(i) {
    swal({
        confirmButtonClass: 'load_remove',
        confirmButtonColor: '#fff',
        confirmButtonText: '<span class="load_block"></span><span class="load_block"></span><span class="load_block"></span><span class="load_block"></span><span class="load_block"></span>',
        html: '<p style="text-align:center;font-size:16px;color:#333;">' + i.content + '</p>',
        allowOutsideClick: false, //点击弹框外部时，使其弹框不消失，默认是true
    })
}

Vue.prototype.result = function(i) {
    swal({
        title: '<p style="margin-top:30px;"><img style="margin-right:15px;" src="/static/company/img/' + (i.type == 'r' ? 'right' : (i.type == 'w' ? 'wrong' : 'warn')) + '.png">' + i.content + '</p>',
        showConfirmButton: false,
        width: 300,
        timer: i.timer
    });
}
// 很多内容的话
Vue.prototype.result_many = function(i) {
    swal({
        html: '<p style="margin-top:20px;color: #d43f55;">' + i.list_can + '</p><p style="margin-top: 10px">' + i.content_can + '</p>' +
            '<p style="margin-top:20px;color: #d43f55;">' + i.list_cannot + '</p><p style="margin-top: 10px">' + i.content_cannot + '</p>',
        showConfirmButton: false,
        width: 500,
        timer: i.timer
    });
}



// 带输入框的弹窗
Vue.prototype.input_sure = function(i) {
    swal({
            title: "请输入文件名！",
            text: "",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "输入一些话"
        },
        function(inputValue) {
            if (inputValue === false) return false;

            if (inputValue === "") {
                swal.showInputError("你需要输入一些话！");
                return false
            }

            swal("非常好！", "你输入了：" + inputValue, "success");
        });

}

// 音乐播放器 初始化
Vue.prototype.audio_play = function(data) {
    var _this = this;
    // 音频 播放器 控制
    $('body').on('click',".audio_block .au_play",function(event) {
        var t = $(this).parent().parent();
        var audio = t.find('.au_do')[0];
        var long = audio.duration;
        if (audio.paused) { /*如果已经暂停*/
            $('audio').not(this).each(function() {
                this.pause();
            });
            audio.play(); /*播放*/
            s = setInterval(function() {
                var num = (audio.currentTime) / long * 100;
                t.find('.line_n').css('width', Math.round(num) + '%');
                t.find('.n_time').text(_this.num_time(Math.round(audio.currentTime)));
            }, 1000)
        } else {
            clearInterval(s);
            audio.pause(); /*暂停*/
        }
        audio.onended = function() {
            console.log('播放完成！~');
            clearInterval(s);
            t.find('.line_n').css('width', '100%');
        };

        t.find('.pro_bac').click(function(event) {
            var x = event.offsetX;
            var l = $(this).width();
            audio.currentTime = x / l * long;
            $(this).find('.line_n').css('width', Math.round((audio.currentTime) / long * 100) + '%');
            $(this).find('.n_time').text(_this.num_time(Math.round(audio.currentTime)));
        });
    });
}
// 图片上传
// data = {
//     image:result.toDataURL('image/jpeg'),
//     company_id:'1'
// }
// result = {
//     attachment_id:res.attachment_id,
//     code:res.code,
//     file_url:res.file_url,
//     msg:res.msg
// }
Vue.prototype.up_image = function(data) {
    var result = {};
    $.ajax({
        type: 'POST',
        url: '/api/upload/add',
        data: data,
        success: function(res) {
            result = res
        },
        async: false,
        // dataType: dataType
    });
    return result
}






//序号格式过滤器 1 => 01
Vue.filter('index-format', function(n) {
    n = Number(n)
    return n >= 10 ? "" + n : "0" + n
})

//文字截取过滤 str所要截取的字符串，num需要截取的位置
Vue.filter('substr', function([str, num]) {
    var s;
    if (str.length > num) {
        s = str.substr(0, num) + '...';
    } else {
        s = str;
    }
    return s;
})


// 全局注册
// route: [
//  { con: '内容', is_show（true显示false不显示）: true },
//  { con: '内容', is_show（true显示false不显示）: false }]
Vue.component('arrow', {
    props: ['route'],
    template: '<div><span class="fc_gray " v-for="item in route" :link="item.link"">{{item.con }}<span v-if="item.is_show" class="arrow">></span></span></div>'
})

// 进度条: [
// width 进度条百分比
// bac_color 进度条的背景色
Vue.component('pro', {
    props: ['width', 'bac_color'],
    template: '<div class="p_line"><div class="line" :class="bac_color" :style="{ width: width}"></div></div>'
})

// 展示型卡片列表组件 start
// 简单卡片列表，无编辑，只有链接
// 引用方式 如 <list-simple :lesson_item="lesson_item"></list-simple>
//lesson_item包含items数组 和 title对象
// title为  title:{main:'测评分类',sub:[]}类型  // items，列表数据。
Vue.component('list-simple', {
    template: '<section style="width: 890px;padding: 0;" class="col-md-12 learn-plan">\n' +
        '        <div class="pull-right more cus"  @click="more(lesson_item.id)">更多&nbsp;&nbsp;></div>\n' +
        '        <p class="title" style="margin-bottom: 16px;">{{lesson_item.title.main}}</p>' +
        '        <div class="box_shadow list list-fenfa">\n' +
        '            <ul style="list-style: none;"  v-if="lesson_item.items.length">\n' +
        '                <li class="col-md-3 card card-no-border" v-for="(item,index) in lesson_item.items" v-if="item.id" :key="item.id" @click.stop="to(lesson_item.id,item.id)">\n' +
        '                       <div class="fenfa" v-if="item.fenfa">内容分发次数：<span>{{item.fenfa}}</span></div>\n' +
        '                   <div class="list-border list-bg-gray">\n' +
        // '                       <img :src="item.src" alt="16:9" class="card-img">\n' +

        '                    <div style="position: relative;">  ' +
        '                       <img :src="item.src" alt="16:9" class="card-img">\n' +
        '                       <div v-if="item.state"><span :class="item.state== \'审核失败\'?\'label-danger\':\'label-default\'" class="label  bottom-right" style="position: absolute;bottom: 0px;right: 0px;">\n' +
        '                       <span style="color: #fff;">{{item.state}}</span></div>' +
        '                       <div v-if="item.type"><span class="label-danger" class="label  bottom-right" style="position: absolute;bottom: 0px;right: 0px;background-color: rgba(0,0,0,.4)">\n' +
        '                       <span style="color: #fff;">{{item.type==1?"图文音频课程":"视频课程"}}</span></div>' +
        '                    </div>\n' +

        '                    <div class="card-body">\n' +
        '                        <h4 class="card-title text-over-one">{{item.title}}</h4>\n' +
        '                        <p class="card-text">\n' +
        '                            <span v-if="item.view" class="text-center course-icon text-over-one"><i class="iconfont">&#xe619;</i><span :title="item.view">{{item.view}}</span></span>\n' +
        '                            <span v-if="item.msg"  class="text-center course-icon text-over-one"><i class="iconfont">&#xe70d;</i><span :title="item.msg">{{item.msg}}</span></span>\n' +
        '                            <span v-if="item.praise" class="text-center course-icon text-over-one"><i class="iconfont">&#xe71b;</i><span :title="item.praise">{{item.praise}}</span></span>\n' +
        '                            <span v-if="item.save" class="text-center course-icon text-over-one"><i class="iconfont">&#xe6eb;</i><span :title="item.save">{{item.save}}</span></span>\n' +
        '                        </p>\n' +
        '                        <p class="card-text line">\n' +
        '                            <span v-if="item.time" class="text-left course-icon text-over-one"><span class="time">{{item.time |time_formart}}</span></span>\n' +
        '                            <span v-if="item.money" class="text-right course-icon text-over-one"><span class="money">{{item.money}}</span>&nbsp;<span>学币</span></span>\n' +
        '                            <span v-if="item.online" class="text-right course-icon text-over-one"><span class="money">{{item.online}}</span>&nbsp;<span></span></span>\n' +
        '                        </p>\n' +
        '                    </div>\n' +
        '                    <div class="card-bottom">\n' +
        '                        <img class="avatar-img" :src="item.avatar" alt="">\n' +
        '                        <div class="text-over-one" style="display: inline-block;width: 44%;">{{item.teacher}}</div>\n' +
        '                    <button v-if="item.fenfa_btn" class="btn btn-xs pull-right waves-effect waves-light btn-outline-primary" style="margin-top: -4px;padding: 6px 12px;" @click.stop="fenfa(item.id)">分发</button>\n' +
        '                    </div>\n' +

        '                    </div>\n' +
        '                </li>\n' +
        '                <div style="clear: both"></div>\n' +
        '            </ul>\n' +
        '           <div v-else>\n' +
        '             <div class="text-center"><img src="/static/person/img/index/home_pic.jpg" alt="">\n' +
        '               <p v-if="lesson_item.id == 1" style="padding: 20px;font-size:14px;color: #333;">你还没有学习计划！</p>' +
        '               <p v-else style="padding: 20px;font-size:14px;color: #333;">你买的课程太少了，这里都空空的，快去挑选合适的课程吧！</p>' +
        '               <button v-if="lesson_item.id != 1"  class="btn btn-primary">关注感兴趣的课程</button>' +
        '              </div>\n' +
        '           </div>\n' +
        '        </div>\n' +

        '    </section>',
    props: ['lesson_item'],
    data: function() {
        return {
            change: 1
        }
    },
    methods: {
        // 卡片列表
        more: function(id) {
            this.$emit('more', id);
        },
        to: function(type, id) {
            this.$emit('to', { type_id: type, id: id });
            // console.log("跳转id", id)
            // window.location.href = 'http://www.baidu.com?id='+res.target.parentElement.id
        },
        fenfa: function(id) {
            this.$emit('fenfa', id);
        },
    }
})

// 展示型卡片列表组件 end

// 切换型卡片列表组件 start
// 简单卡片列表，无编辑，只有链接，可按照小标题 切换列表内容
// 引用方式 如 <list-changeData :lesson_item="lesson_item"></list-changeData>
//lesson_item包含items数组 和 title对象
// title为  title:{main:'测评分类',sub:['心里测试','职业测试','能力测试']}类型  // items，列表数据。
Vue.component('list-change-data', {
    template: '<section style="width: 890px;padding: 0;" class="col-md-12 learn-plan">\n' +
        '        <div class="pull-right more"  @click="more(1)">更多&nbsp;&nbsp;></div>\n' +
        '        <p style="margin-bottom: 16px;"><a :class="{subTitle:change != 1,title:change == 1}" @click.prevent="changeData(1)">{{lesson_item.title.main}}</a>' +
        '           <span v-if="lesson_item.title.sub.length">' +
        '             <a :class="{subTitle:change != 2,title:change == 2}" @click.prevent="changeData(2)">{{lesson_item.title.sub[0]}}</a>' +
        '             <a :class="{subTitle:change != 3,title:change == 3}" @click.prevent="changeData(3)">{{lesson_item.title.sub[1]}}</a>' +
        '             <a :class="{subTitle:change != 4,title:change == 4}" @click.prevent="changeData(4)">{{lesson_item.title.sub[2]}}</a>' +
        '          </span></p>\n' +
        '        <div class="box_shadow list">\n' +
        '            <ul style="list-style: none;"  v-if="lesson_item.items.length">\n' +
        '                <li class="col-md-3 card list-bg-gray" v-for="(item,index) in lesson_item.items" :key="item.id" @click.stop="to(item.id)">\n' +
        '                    <div style="position: relative;">  ' +
        '                       <img :src="item.src" alt="16:9" class="card-img">\n' +
        '                       <span :class="item.state== \'审核失败\'?\'label-danger\':\'label-default\'" class="label  bottom-right" style="position: absolute;bottom: 0px;right: 0px;">\n' +
        '                       <span style="color: #fff;">{{item.state}}</span></div>\n' +
        '                    <div class="card-body">\n' +
        '                        <h4 class="card-title text-over-one">{{item.title}}}</h4>\n' +
        '                        <p class="card-text">\n' +
        '                            <span class="text-center course-icon text-over-one"><i class="fa fa-eye"></i><span>{{item.view}}</span></span>\n' +
        '                            <span class="text-center course-icon text-over-one"><i class="fa fa-eye"></i><span>{{item.msg}}</span></span>\n' +
        '                            <span class="text-center course-icon text-over-one"><i class="fa fa-thumbs-o-up"></i><span>{{item.praise}}</span></span>\n' +
        '                            <span class="text-center course-icon text-over-one"><i class="fa fa-star"></i><span>{{item.save}}</span></span>\n' +
        '                        </p>\n' +
        '                        <p class="card-text line">\n' +
        '                            <span class="text-left course-icon text-over-one"><span class="time">{{item.time}}</span></span>\n' +
        '                            <span class="text-right course-icon text-over-one" v-if="item.money"><span class="money">{{item.money}}</span>&nbsp;<span>学币</span></span>\n' +
        '                            <span class="text-right course-icon text-over-one" v-if="item.people"><span class="money">{{item.people}}</span>&nbsp;<span>在线</span></span>\n' +
        '                        </p>\n' +
        '                    </div>\n' +
        '                    <div class="card-bottom text-over-one">\n' +
        '                        <img class="avatar-img" :src="item.avatar" alt="">\n' +
        '                        {{item.teacher}}\n' +
        '                    </div>\n' +
        '                </li>\n' +
        '                <div style="clear: both"></div>\n' +
        '            </ul>\n' +
        '           <div v-else>\n' +
        '             没有内容没有内容没有内容没有内容' +
        '           </div>\n' +
        '        </div>\n' +

        '    </section>',
    props: ['lesson_item'],
    data: function() {
        return {
            change: 1,
            lesson_item: {
                id: '',
                items: [
                    {}
                ],
                title: { main: '', sub: [] }
            }

        }
    },
    methods: {
        // 卡片列表
        more: function(id) {
            console.log(id)
        },
        // 切换列表数据
        changeData: function(id) {
            this.change = id

            this.lesson_item.items = [{
                id: 123,
                state: '未审核',
                href: '',
                src: '/static/company/img/16-9.jpg',
                title: '16:9微课标题微课标题微课标题微课标题',
                view: 124,
                msg: 234,
                praise: 345,
                save: 34,
                time: '1小时40分钟',
                money: 456,
                avatar: '/static/company/img//avatar.jpg',
                teacher: '莎莎讲师111111111'

            }]


            // 请求切换的数据
            console.log('changeDataSUN', id)
        },
        to: function(id) {
            console.log("跳转id", id)
            // window.location.href = 'http://www.baidu.com?id='+res.target.parentElement.id
        },
    }
})
// 切换型卡片列表组件 end





// 人人秀组件 start
// 简单卡片列表，无编辑，只有链接，可按照小标题 切换列表内容
// 引用方式 如 <list-changeData :lesson_item="lesson_item"></list-changeData>
//lesson_item包含items数组 和 title对象
// title为  title:{main:'人人秀',sub:['图文音频点播','图文音频直播']}类型  // items，列表数据。
Vue.component('list-pp-show', {
    template: '<section style="width: 890px;padding: 0;" class="col-md-12 learn-plan">\n' +
        '        <div class="pull-right more"  @click="more(1)">更多&nbsp;&nbsp;></div>\n' +
        '        <p class="title" style="margin-bottom: 16px;">' +
        '           {{lesson_item.title.main}}' +
        '       </p>\n' +
        '        <div class="box_shadow bg-fff">\n' +
        '           <div class="pp-change" v-if="lesson_item.title.sub.length">' +
        '             <a :class="{subTitle:change == 2,titleBaseLine:change == 1}" @click.prevent="changeData(1)">{{lesson_item.title.sub[0]}}</a>' +
        '             <a :class="{subTitle:change == 1,titleBaseLine:change == 2}" @click.prevent="changeData(2)">{{lesson_item.title.sub[1]}}</a>' +
        '           </div>' +
        '            <ul class="list" style="list-style: none;"  v-if="lesson_item.items.length">\n' +

        '                <li class="col-md-3 card list-bg-gray" v-for="(item,index) in lesson_item.items" :key="item.id" @click.stop="to(item.id)">\n' +
        '                    <div style="position: relative;">  ' +
        '                       <img :src="item.src" alt="16:9" class="card-img">\n' +
        // '                       <span :class="item.state== \'已结束\'?\'label-danger\':\'label-default\'" class="label  bottom-right" style="position: absolute;bottom: 0px;right: 0px;">\n' +
        // '                       <span style="color: #fff;">{{item.state}}</span>' +
        '                   </div>\n' +
        '                    <div class="card-body">\n' +
        '                        <h4 class="card-title text-over-one">{{item.title}}}</h4>\n' +
        '                        <p class="card-text">\n' +
        '                            <span class="text-center course-icon text-over-one"><i class="fa fa-eye"></i><span>{{item.view}}</span></span>\n' +
        '                            <span class="text-center course-icon text-over-one"><i class="fa fa-eye"></i><span>{{item.msg}}</span></span>\n' +
        '                            <span class="text-center course-icon text-over-one"><i class="fa fa-thumbs-o-up"></i><span>{{item.praise}}</span></span>\n' +
        '                            <span class="text-center course-icon text-over-one"><i class="fa fa-star"></i><span>{{item.save}}</span></span>\n' +
        '                        </p>\n' +
        '                        <p class="card-text line">\n' +
        '                            <span class="text-left course-icon text-over-one"><span class="time">{{item.time}}</span></span>\n' +
        '                            <span class="text-right course-icon text-over-one" v-if="item.money"><span class="money">{{item.money}}</span>&nbsp;<span>学币</span></span>\n' +
        '                            <span class="text-right course-icon text-over-one" v-if="item.people"><span class="money">{{item.people}}</span>&nbsp;<span>在线</span></span>\n' +
        '                        </p>\n' +
        '                    </div>\n' +
        '                    <div class="card-bottom text-over-one">\n' +
        '                        <img class="avatar-img" :src="item.avatar" alt="">\n' +
        '                        {{item.teacher}}\n' +
        '                    </div>\n' +
        '                </li>\n' +
        '                <div style="clear: both"></div>\n' +
        '            </ul>\n' +
        '           <div v-else>\n' +
        '             没有内容没有内容没有内容没有内容' +
        '           </div>\n' +
        '        </div>\n' +

        '    </section>',
    props: ['lesson_item'],
    data: function() {
        return {
            change: 1,
            lesson_item: {
                id: '',
                items: [
                    {}
                ],
                title: { main: '', sub: [] }
            }

        }
    },
    methods: {
        // 卡片列表
        more: function(id) {
            console.log(id)
        },
        // 切换列表数据
        changeData: function(id) {
            this.change = id

            this.lesson_item.items = [{
                id: 123,
                state: '未审核',
                href: '',
                src: '/static/company/img/16-9.jpg',
                title: '16:9微课标题微课标题微课标题微课标题',
                view: 124,
                msg: 234,
                praise: 345,
                save: 34,
                time: '1小时40分钟',
                money: 456,
                avatar: '/static/company/img//avatar.jpg',
                teacher: '莎莎讲师111111111'

            }]


            // 请求切换的数据
            console.log('changeDataSUN', id)
        },
        to: function(id) {
            console.log("跳转id", id)
            // window.location.href = 'http://www.baidu.com?id='+res.target.parentElement.id
        },
    }
})
// 人人秀组件 end

// 保留两位小数
Vue.filter('fixed_2', function(m) {
    m=Number(m)
    return m.toFixed(2);
})

//b转换成MB 1048576 B => 1 MB
Vue.filter('b_to_mb', function(m) {
    var mb = m / 1024 / 1024
    return mb.toFixed(2);
})

//视频点播上传组件
Vue.component('up-load-video', {
    template: '<div><input type="file" :style="m_style" id="upload" value="多文件上传" multiple :accept="mime"/>' +
        // '<div class="fixed_upload">' +
        // '<button v-if="upload_item.length>0" type="button" id="open_upload" class="btn btn-xs waves-effect waves-light btn-outline-primary">视频传输列表</button>' +
        // '</div>' +
        '<div class="modal fade bs-example-modal-sm" id="file_prosess" style="z-index: 1051;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
        ' <div class="modal-dialog" role="document" style="width:720px;">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h4 class="modal-title" style="flex: 1;">上传列表</h4>' +
        '</div>' +
        '<div class="text-left modal-body-request">' +
        '<li class="upload_li" v-for="(item, index) in upload_item">' +
        '<div style="width:100px;float:left;">' +
        '<svg class="icon" aria-hidden="true" style="width:95px;height:70px;">' +
        '<use xlink:href="#icon-video_fill"></use>' +
        '</svg>' +
        '</div>' +
        '<div class="upload_name">' +
        '<p>{{item.name}}</p>' +
        '<p>{{item.pro_size | b_to_mb}}MB/{{item.size | b_to_mb}}MB</p>' +
        '</div>' +
        '<div class="upload_process">' +
        '<div class="upload_process_in" :style="{width: item.process}">' +
        '</div>' +
        '</div>' +
        '<div class="upload_percent">{{item.process}}' +
        '</div>' +
        '<div class="upload_status">' +
        '<span class="badge" :class="{badge_info_b:item.state==0,badge_primary_b:item.state==1,badge_warning_b:item.state==2,badge_success_b:item.state==3}">{{item.state==0?"等待中":item.state==1?"上传中":item.state==2?"已暂停":"已完成"}}</span>' + //0等待上传，1上传中，2暂停中，3已完成
        '</div>' +
        '<div class="upload_control">' +
        '<i class="iconfont" data-toggle="tooltip" data-placement="top" data-original-title="暂停" v-show="item.state==1" @click=upload_stop(item.uploader,index)>&#xe650;</i>' +
        '<i class="iconfont" data-toggle="tooltip" data-placement="top" data-original-title="恢复上传" v-show="item.state==2" @click=upload_start(item.uploader,index)>&#xe61d;</i>' +
        '</div>' +
        ' </li>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" data-dismiss="modal" aria-label="Close" class="btn waves-effect waves-light btn-success" style="margin-left:538px !important;">收起上传列表</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        // '<video id="vidi" style="display: none" :src="vsrc" @canplaythrough="myFunction($event,0)"></video>'+

    '</div>',
    props: ['mime', 'company_id', 'm_style'],
    data: function() {
        return {
            vsrc:'',
            vsrc1:'',
            vsrc_t:'',
            vsrc_t1:'',
            upload_item: [], //上传列表
            upload_control_item: [], //上传控制列表 实质和上传列表一模一样，只是一个用于显示，一个用于删除清空操作
            upload_vedio_nums: 0, //正在上传视频的个数，用于暂停和上传结束的后续操作判断
            upload_index: 0,
            upload_index_a: 0
        }
    },
    methods: {
        myFunction:function(ele,t) {
            console.log('myFunction',ele)
            // this.vsrc_t = ele.target.duration
            // if(t==0){
            //     this.vsrc_t = ele.target.duration
            // }else {
            //     this.vsrc_t1 = ele.target.duration
            // }

            console.log('565656',this.vsrc_t)
        },

        //获取上传凭证
        get_voucher: function(title, filename, filesize, cateid) {
            var key_info;
            jQuery.ajax({
                url: '/api/Video/create_upload',
                type: 'POST',
                dataType: 'json',
                async: false,
                data: {
                    title: title, //YES     视频标题
                    filename: filename, //YES  视频文件名，带扩展名
                    filesize: filesize, //NO   视频大小单位：字节
                    description: '', //NO    视频描述，长度不超过1024个字节，UTF8编码
                    coverurl: '', //NO   自定义视频封面URL地址
                    cateid: cateid, //YES    视频分类ID，固定值公司视频 (ID:958997537)
                    tags: '' //NO    视频标签，单个标签不超过32字节，最多不超过16个标签。多个用逗号分隔
                },
                success: function(data) {
                    key_info = data;
                }
            });
            return key_info;
        },
        //刷新上传凭证
        update_voucher: function(videoId) {
            jQuery.ajax({
                url: '/api/Video/refresh_upload',
                type: 'POST',
                dataType: 'json',
                data: { videoid: videoId },
                success: function(data) {},
            });
        },
        //创建AliyunUpload.Vod实例,并设置回调
        create_uploader: function(uploadAuth, uploadAddress, videoId, index, size,t) {
            var _this = this;
            var uploader = new AliyunUpload.Vod({
                //分片大小默认1M，不能小于100K
                partSize: 1048576,
                //并行上传分片个数，默认5
                parallel: 5,
                //网络原因失败时，重新上传次数，默认为3
                retryCount: 3,
                //网络原因失败时，重新上传间隔时间，默认为2秒
                retryDuration: 2,
                // 开始上传
                'onUploadstarted': function(uploadInfo) {
                    _this.upload_item[index].state = 1;
                    _this.upload_vedio_nums++;
                    console.log('开始上传了......')
                    // console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
                    //上传方式1, 需要根据uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress，如果videoId有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
                    uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId);
                    //上传方式2
                    // uploader.setSTSToken(uploadInfo, accessKeyId, accessKeySecret,secretToken);
                },
                // 文件上传成功
                'onUploadSucceed': function(uploadInfo) {
                    _this.upload_item[index].state = 3;
                    _this.upload_vedio_nums--;
                    var name = uploadInfo.file.name;
                    //刷新列表看是否有等待中上传文件，若有就开始自动上传(总是保持上传队列最多只有三个文件同时在上传)
                    _this.update_upload_item();

                    // alert(videoId)
                    console.log('000000时长',t)


                    jQuery.ajax({
                        url: '/api/Companycourse/company_save_video',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            company_id: _this.company_id,
                            name: name,
                            videoaudio_url: videoId,
                            size: size,
                            duration: '',
                            type: 2,
                            show_name: name
                        },
                        success: function(data) {
                            if (data.code == 1000) {

                                console.log(name + '已经保存成功')
                            }
                        }
                    });

                    _this.$emit('return_function',videoId);
                    // console.log('上传成功......')
                    // console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
                },
                // 文件上传失败
                'onUploadFailed': function(uploadInfo, code, message) {
                    console.log('你倒霉了，上传失败了......')
                    console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message);
                },
                // 文件上传进度，单位：字节
                'onUploadProgress': function(uploadInfo, totalSize, loadedPercent) {
                    _this.upload_item[index].process = Math.ceil(loadedPercent * 100) + '%';
                    _this.upload_item[index].pro_size = Math.ceil(loadedPercent * 100) / 100 * _this.upload_item[index].size;
                    // console.log('上传进度......')
                    // console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(loadedPercent * 100) + "%");
                },
                // 上传凭证超时
                'onUploadTokenExpired': function(uploadInfo) {
                    var _this = this;
                    console.log('上传凭证超时了......')
                    console.log("onUploadTokenExpired");
                    //凭证超时时，刷新凭证
                    _this.update_voucher(videoId);
                    //上传方式1  实现时，根据uploadInfo.videoId调用刷新视频上传凭证接口重新获取UploadAuth
                    // uploader.resumeUploadWithAuth(uploadAuth);
                    // 上传方式2 实现时，从新获取STS临时账号用于恢复上传
                    // uploader.resumeUploadWithSTSToken(accessKeyId, accessKeySecret, secretToken, expireTime);
                },
                //当前文件上传结束
                'onUploadEnd': function(uploadInfo) {
                    console.log('上传已经全部结束了......')
                    // console.log("onUploadEnd: uploaded all the files" + uploadInfo);
                }
            });
            return uploader;
        },

        //获取到用户选择的文件后，添加到上传列表中
        add_file: function(uploader, file) {
            uploader.addFile(file, null, null, null, null);
        },
        //删除单个上传文件
        delete_file: function(uploader, index) {
            uploader.deleteFile(index);
        },
        //取消单个文件上传
        cancle_file: function(uploader, index) {
            uploader.cancelFile(0);
        },
        //恢复单个文件上传
        resume_file: function(uploader, index) {
            uploader.resumeFile(0);
        },
        //获取上传文件列表
        get_file_lists: function(uploader) {
            uploader.listFiles();
            var list = uploader.listFiles();
            for (var i = 0; i < list.length; i++) {
                log("file:" + list[i].file.name + ", status:" + list[i].state + ", endpoint:" + list[i].endpoint + ", bucket:" + list[i].bucket + ", object:" + list[i].object);
            }
        },
        //清理上传文件列表
        clear_file_lists: function(uploader) {
            uploader.cleanList();
        },
        //开始上传
        upload_start: function(uploader, index) {
            var _this = this;
            if (_this.upload_vedio_nums < 3) {
                uploader.startUpload();
                _this.upload_item[index].state = 1;
            } else {
                _this.result({
                    type: 'r',
                    content: '已有三个文件在上传，请稍候再开始吧',
                    timer: 1500
                });
            }
        },
        //停止上传
        upload_stop: function(uploader, index) {
            var _this = this;
            _this.upload_item[index].state = 2;
            uploader.stopUpload();
            _this.upload_vedio_nums--;
            _this.update_upload_item();
        },
        //上传凭证失效后恢复上传
        resumeUploadWithAuth: function(uploader) {
            uploader.resumeUploadWithAuth(uploadAuth);
        },
        //设置上传凭证
        setUploadAuthAndAddress: function(uploader) {
            uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId);
        },
        //刷新列表等待中的上传文件自动开始上传
        update_upload_item: function() {
            var _this = this;
            if (_this.upload_vedio_nums < 3) {
                var l = 3 - _this.upload_vedio_nums;
                for (var i = 0; i < _this.upload_control_item.length; i++) {
                    if (_this.upload_control_item[i].state == 0) {
                        if (l > 0) {
                            _this.upload_start(_this.upload_control_item[i].uploader, i);
                            l--;
                        }
                    }
                }
            }
        }
    },
    watch:{

        vsrc (newSong,oldSong) {
            // console.log(newSong,oldSong)

            this.myFunction()
        }
    },
    mounted: function() {

        var _this = this;
        var jq = $;
        var key_info = '';
        var upload_array;
        jq('#file_prosess').on('shown.bs.modal', function() {
            //启用tooltip
            jq('[data-toggle="tooltip"]').tooltip();
        })

        jq('body').on('click', '#open_upload', function(event) {
            jq('#file_prosess').modal('toggle');
        });
        document.getElementById("upload").addEventListener('change', function(event) {
            var l = 0
            for (var i = 0; i < event.target.files.length; i++) {
                var fr = new FileReader();
                fr.onloadend = function(e) {
                    // if(i==0){
                    //     _this.vsrc = e.target.result;
                    // }else {
                    //     _this.vsrc1 = e.target.result;
                    // }
                    _this.vsrc = e.target.result;
                };
                fr.readAsDataURL(event.target.files[i]);
                //获取上传凭证
                key_info = _this.get_voucher(event.target.files[i].name, event.target.files[i].name, event.target.files[i].size, 958997537);
                //创建uploader对象
                var uploader = _this.create_uploader(key_info.UploadAuth, key_info.UploadAddress, key_info.VideoId, _this.upload_index_a, event.target.files[i].size,_this.vsrc_t);
                //添加当前文件对象
                _this.add_file(uploader, event.target.files[i]);
                upload_array = {
                    uploader: uploader, //上传对象
                    name: event.target.files[i].name, //上传的文件名
                    pro_size: '', //当前文件上传的大小
                    size: event.target.files[i].size, //获取文件的大小
                    process: 0, //文件的上传百分比
                    state: 0, //文件的上传状态，0等待上传，1上传中，2暂停中，3已完成

                }
                _this.upload_item.push(upload_array);
                _this.upload_control_item.push(upload_array);
                l++;
                _this.upload_index_a++;
            }
            //打开模态框
            jq('#file_prosess').modal('toggle');
            //如果上传队列大于等于三个，就自动开始前三个视频的上传，我们默认支持3个视频的同时上传，若有业务改动，请酌情修改
            if (l > 2) {
                //0位置的视频开始上传
                _this.upload_start(_this.upload_control_item[_this.upload_index].uploader, _this.upload_index);
                _this.upload_index++;
                //1位置的视频开始上传
                _this.upload_start(_this.upload_control_item[_this.upload_index].uploader, _this.upload_index);
                _this.upload_index++;
                //2位置的视频开始上传
                _this.upload_start(_this.upload_control_item[_this.upload_index].uploader, _this.upload_index);
                _this.upload_index++;
            } else {
                //如果上传队列小于三个，就全部开始上传
                for (var i = 0; i < l; i++) {
                    //i位置的视频开始上传
                    _this.upload_start(_this.upload_control_item[_this.upload_index].uploader, _this.upload_index);
                    _this.upload_index++;
                }
            }
        });
    }
})


//OSS音频上传组件
Vue.component('up-load-audio', {
    template: '<div id="audio_upload"><input :accept="mime" :style="m_style"  type="file" id="a_upload" value="多文件上传" multiple  />' +
        '<div class="a_fixed_upload">' +
        '</div>' +
        '<div id="audio_item" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog">' +
        '<div class="modal-dialog" role="document" style="width:720px;">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h4 class="modal-title" style="flex: 1;">上传列表</h4>' +
        '</div>' +
        '<div class="text-left modal-body-request">' +
        '<li class="upload_li" v-for="(item, index) in upload_item">' +
        '<div style="width:100px;float:left;">' +
        '<svg class="icon" aria-hidden="true" style="width:95px;height:70px;">' +
        '<use xlink:href="#icon-audio_fill"></use>' +
        '</svg>' +
        '</div>' +
        '<div class="upload_name">' +
        '<p>{{item.name}}</p>' +
        '<p>{{item.pro_size | b_to_mb}}MB/{{item.size | b_to_mb}}MB</p>' +
        '</div>' +
        '<div class="upload_process">' +
        '<div class="upload_process_in" :style="{width: item.process}">' +
        '</div>' +
        '</div>' +
        '<div class="upload_percent">{{item.process}}' +
        '</div>' +
        '<div class="upload_status">' +
        '<span class="badge" :class="{badge_info_b:item.state==0,badge_primary_b:item.state==1,badge_warning_b:item.state==2,badge_success_b:item.state==3}">{{item.state==0?"等待中":item.state==1?"上传中":item.state==2?"已暂停":"已完成"}}</span>' + //0等待上传，1上传中，2暂停中，3已完成
        '</div>' +
        ' </li>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn waves-effect waves-light btn-success audio_item_close" style="margin-left:538px !important;">收起上传列表</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
    props: ['mime', 'company_id', 'm_style'],
    data: function() {
        return {
            host: '',
            access_id: '',
            access_key: '',
            g_dirname: '',
            g_object_name: '',
            g_object_name_type: 'random_name',
            now: '',
            policyBase64: '',
            bytes: '',
            signature: '',
            file_index: 0,
            upload_item: [],
            policyText: {
                "expiration": "2030-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
                "conditions": [
                    ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制 1000MB
                ]
            }
        }
    },
    methods: {
        //获取上传密钥信息
        get_key_info: function() {
            var _this = this;
            //请求密钥信息
            jQuery.ajax({
                url: '/api/Commonthing/get_ossinfo',
                type: 'POST',
                dataType: 'json',
                success: function(data) {
                    _this.host = data.host;
                    _this.access_id = data.AccessKeyId;
                    _this.access_key = data.AccessKeySecret;
                    //初始化oss upload组件
                    now = timestamp = Date.parse(new Date()) / 1000;
                    _this.policyBase64 = Base64.encode(JSON.stringify(_this.policyText))
                    _this.bytes = Crypto.HMAC(Crypto.SHA1, _this.policyBase64, data.AccessKeySecret, { asBytes: true });
                    _this.signature = Crypto.util.bytesToBase64(_this.bytes);
                    var uploader = _this.create_uploader();
                }
            });
        },
        check_object_radio: function() {
            var tt = document.getElementsByName('myradio');
            for (var i = 0; i < tt.length; i++) {
                if (tt[i].checked) {
                    g_object_name_type = tt[i].value;
                    break;
                }
            }
        },
        get_dirname: function() {
            dir = document.getElementById("a_upload").value;
            if (dir != '' && dir.indexOf('/') != dir.length - 1) {
                dir = dir + '/'
            }
            g_dirname = 'companyaudio/';
        },
        random_string: function(len) {
            len = len || 32;　　
            var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';　　
            var maxPos = chars.length;　　
            var pwd = '';　　
            for (i = 0; i < len; i++) {　　
                pwd += chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        },
        get_suffix: function(filename) {
            pos = filename.lastIndexOf('.')
            suffix = ''
            if (pos != -1) {
                suffix = filename.substring(pos)
            }
            return suffix;
        },
        calculate_object_name: function(filename) {
            var _this = this;
            if (_this.g_object_name_type == 'local_name') {
                _this.g_object_name += "${filename}"
            } else if (_this.g_object_name_type == 'random_name') {
                suffix = _this.get_suffix(filename)
                _this.g_object_name = _this.g_dirname + _this.random_string(10) + suffix
            }
            return ''
        },
        get_uploaded_object_name: function(filename) {
            var _this = this;
            if (_this.g_object_name_type == 'local_name') {
                var tmp_name = _this.g_object_name;
                tmp_name = tmp_name.replace("${filename}", filename);
                return tmp_name
            } else if (_this.g_object_name_type == 'random_name') {
                return _this.g_object_name
            }
        },
        set_upload_param: function(up, filename, ret) {
            console.log(filename);
            var _this = this;
            _this.g_object_name = _this.g_dirname;
            if (filename != '') {
                suffix = _this.get_suffix(filename)
                _this.calculate_object_name(filename)
            }
            new_multipart_params = {
                // 'Filename': 'show/' + _this.g_object_name,
                'key': 'companyaudio/' + _this.g_object_name,
                'policy': _this.policyBase64,
                'OSSAccessKeyId': _this.access_id,
                'success_action_status': '200', //让服务端返回200,不然，默认会返回204
                'signature': _this.signature,
            };

            up.setOption({
                'url': _this.host,
                'multipart_params': new_multipart_params
            });
            up.start();
        },
        create_uploader: function() {
            var _this = this;
            var uploader = new plupload.Uploader({
                runtimes: 'html5,flash,silverlight,html4',
                browse_button: 'a_upload',
                //multi_selection: false,
                container: document.getElementById('audio_upload'),
                flash_swf_url: 'lib/plupload-2.1.2/js/Moxie.swf',
                silverlight_xap_url: 'lib/plupload-2.1.2/js/Moxie.xap',
                url: 'http://oss.aliyuncs.com',
                init: {
                    PostInit: function() {},
                    //有文件加入触发该函数
                    FilesAdded: function(up, files) {
                        var upload_item_array;
                        var s = 0;
                        plupload.each(files, function(file) {
                            upload_item_array = {
                                name: file.name,
                                pro_size: 0,
                                size: file.size,
                                process: '0%',
                                state: 0,
                                file_id: file.id
                            }
                            _this.upload_item.push(upload_item_array)
                            s++;
                        });
                        $('#audio_item').modal('toggle');
                        //自动开始上传
                        _this.set_upload_param(up, '', false);
                    },

                    BeforeUpload: function(up, file) {
                        _this.check_object_radio();
                        _this.get_dirname();
                        _this.set_upload_param(up, file.name, true);
                    },

                    UploadProgress: function(up, file) {
                        _this.upload_item[_this.file_index].state = 1;
                        _this.upload_item[_this.file_index].process = file.percent + '%';
                        _this.upload_item[_this.file_index].pro_size = file.percent / 100 * file.size;
                    },

                    FileUploaded: function(up, file, info) {
                        _this.upload_item[_this.file_index].state = 3;
                        _this.file_index++;
                        var dd = {}
                        jQuery.ajax({
                            url: '/api/Companycourse/company_save_video',
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                company_id: _this.company_id,
                                name: file.name,
                                videoaudio_url: _this.host + '/companyaudio/' + _this.g_object_name,
                                size: file.size,
                                duration: '',
                                type: 1,
                                show_name: file.name
                            },
                            success: function(data) {
                                if (data.code == 1000) {
                                    // console.log(name + '已经保存成功', _this.host + '/companyaudio/' + _this.g_object_name)
                                    dd.name = file.name
                                    dd.url = _this.host + '/companyaudio/' + _this.g_object_name

                                    _this.$emit('return_function', dd);
                                }
                            }
                        });

                    },

                    Error: function(up, err) {
                        console.log(err);
                    }
                }
            });
            uploader.init();
            return uploader;
        }
    },
    mounted: function() {
        var _this = this;
        var jq = $;
        _this.get_key_info();
        jq('body').on('click', '.audio_item_close', function(event) {
            $('#audio_item').modal('toggle');
        });
    }
})