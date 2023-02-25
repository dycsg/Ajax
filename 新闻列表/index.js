$(function() {
    // 给时间补零
    function padZero() {
        if (n < 0){
            return '0' + n;
        }else{
            return n
        }
    }
    // 定义时间过滤器
    template.defaults.imports.dateFormat = function(dtStr) {
        var dt  = new Date(dtStr);

        var y = dt.getFullYear();
        var m = padZero(dt.getMonth() + 1)   //调用padZero函数
        var d = padZero(dt.getDate());

        var hh = padZero(d.getHours());
        var mm = padZero(d.getMinutes())
        var ss = padZero(d.getSeconds());
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }   
    
    // 获取新闻列表函数
    function getNewsList() {
        $.get('http://www.liulongbin.top:3006/api/news', 
        function(res){
            if(res.status !== 200) {
                return alert("请求失败！")
            }
            // 运营商操作
            for(var i = 0; i < res.data.length; i++) {
                //把每一项的tags属性 从字符串改造成字符串的数组
                res.data[i].tags = res.data[i].tags.split(',')
            }

            // 把获取到的数据给它
            var htmlStr = template('tpl-news', res)
            // 渲染页面
            $("#news-list").html(htmlStr)
        })
    }
    getNewsList()
})