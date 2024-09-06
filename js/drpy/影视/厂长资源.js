// 地址发布页 https://www.czzy.site
// 地址发布页 https://cz01.vip
var rule = {
    title: '厂长资源',
    host: 'https://www.czys.pro/',
    //host: 'https://www.czzy.site',
    //hostJs: 'print(HOST);let html=request(HOST,{headers:{"User-Agent":PC_UA}});HOST = html.match(/推荐访问<a href="(.*)"/)[1];print("厂长跳转地址 =====> " + HOST)',
    url: '/fyclassfyfilter',
    filterable: 1, //是否启用分类筛选,
    filter_url: '{{fl.cateId}}{{fl.class}}{{fl.area}}/page/fypage',
    class_name: '全部&动漫&国产剧&最新电影&优秀电影',
    class_url: 'movie_bt&/movie_bt_series/dohua&/movie_bt_series/guochanju&zuixindianying&dbtop250',
    filter: {
        "movie_bt": [{
            "key": "area",
            "name": "分类",
            "value": [{
                "v": "",
                "n": "全部"
            }, {
                "v": "/movie_bt_series/dohua",
                "n": "动漫"
            }, {
                "v": "/movie_bt_series/dianshiju",
                "n": "电视剧"
            }, {
                "v": "/movie_bt_series/guochanju",
                "n": "国产剧"
            }, {
                "v": "/movie_bt_series/mj",
                "n": "美剧"
            }, {
                "v": "/movie_bt_series/rj",
                "n": "日剧"
            }, {
                "v": "/movie_bt_series/hj",
                "n": "韩剧"
            }, {
                "v": "/movie_bt_series/hwj",
                "n": "海外剧（其他）"
            }, {
                "v": "/movie_bt_series/dyy",
                "n": "电影"
            }, {
                "v": "/movie_bt_series/huayudianying",
                "n": "华语电影"
            }, {
                "v": "/movie_bt_series/meiguodianying",
                "n": "欧美电影"
            }, {
                "v": "/movie_bt_series/ribendianying",
                "n": "日本电影"
            }, {
                "v": "/movie_bt_series/hanguodianying",
                "n": "韩国电影"
            }, {
                "v": "/movie_bt_series/yingguodianying",
                "n": "英国电影"
            }, {
                "v": "/movie_bt_series/faguodianying",
                "n": "法国电影"
            }, {
                "v": "/movie_bt_series/yindudianying",
                "n": "印度电影"
            }, {
                "v": "/movie_bt_series/eluosidianying",
                "n": "俄罗斯电影"
            }, {
                "v": "/movie_bt_series/jianadadianying",
                "n": "加拿大电影"
            }, {
                "v": "/movie_bt_series/huiyuanzhuanqu",
                "n": "会员专区"
            }]
        }]
    },
    //searchUrl: '/xsseanmch?q=**&p=fypage',
    searchUrl: '/daoyongjiekoshibushiyoubing?q=**&f=_all&p=fypage',
    searchable: 2,
    filterable: 0,
    headers: {
        'User-Agent': 'PC_UA',
        // 'Cookie': 'esc_search_captcha=1'
    },
    play_parse: true,

    // lazy代码:源于海阔香雅情大佬 / 小程序：香情影视 https://pastebin.com/L4tHdvFn
    lazy: `js:
        pdfh = jsp.pdfh;
        var html = request(input);
        var ohtml = pdfh(html, '.videoplay&&Html');
        var url = pdfh(ohtml, "body&&iframe&&src");
        if (url) {
            var _obj={};
            eval(pdfh(request(url),'body&&script&&Html')+'\\n_obj.player=player;_obj.rand=rand');
            function js_decrypt(str, tokenkey, tokeniv) {
                eval(getCryptoJS());
                var key = CryptoJS.enc.Utf8.parse(tokenkey);
                var iv = CryptoJS.enc.Utf8.parse(tokeniv);
                return CryptoJS.AES.decrypt(str, key, {iv: iv,padding: CryptoJS.pad.Pkcs7}).toString(CryptoJS.enc.Utf8);
            };
            let config = JSON.parse(js_decrypt(_obj.player,'VFBTzdujpR9FWBhe', _obj.rand));
            input = {
                 jx: 0,
                 url: config.url,
                 parse: 0
            };
        }else if (/decrypted/.test(ohtml)) {
            var phtml = pdfh(ohtml, "body&&script:not([src])&&Html");
            eval(getCryptoJS());
            var script = phtml.match(/var.*?\\)\\);/g)[0];
            var data = [];
            eval(script.replace(/md5/g, 'CryptoJS').replace('eval', 'data = '));
            input = {
                jx: 0,
                url: data.match(/url:.*?['"](.*?)['"]/)[1],
                parse: 0
            }


        } 
    `,
    推荐: '',
    double: true,
    一级: '.bt_img&&ul&&li;h3.dytit&&Text;img.lazy&&data-original;.jidi&&Text;a&&href',
    二级: {
        "title": "h1&&Text;.moviedteail_list li&&a&&Text",
        "img": "div.dyimg img&&src",
        "desc": ".moviedteail_list li:eq(3) a&&Text;.moviedteail_list li:eq(2) a&&Text;.moviedteail_list li:eq(1) a&&Text;.moviedteail_list li:eq(7)&&Text;.moviedteail_list li:eq(5)&&Text",
        "content": ".yp_context&&Text",
        "tabs": ".mi_paly_box span",
        "lists": ".paly_list_btn:eq(#id) a"
    }
    /*,搜索: `js:
    let cookie = getItem(RULE_CK,'');
    // let cookie = '';
    log('储存的cookie:'+cookie);
    let hhtml=request(input,{withHeaders:true,headers:{Cookie:cookie}});
    let json = JSON.parse(hhtml);
    let html = json.body;
    let setCk = Object.keys(json).find(it=>it.toLowerCase()==='set-cookie');
    cookie = setCk ? json[setCk] : cookie;
    // 3个set-Cookie
    if (Array.isArray(cookie)) {
        cookie = cookie.join(';');
    }
    cookie = cookie.split(';')[0];
    log('set-cookie:'+cookie);
    let code='';
    if(/erphp-search-captcha/.test(html)){
        code = jsp.pdfh(html,'.erphp-search-captcha--button&&Text');
        if(code.includes('=')){
            let a = code.replace('=','').replace(/ /g,'');
            code = eval(a);
            log('回答验证码:'+a+' 答案:'+code);
        }
        let key = jsp.pdfh(html,'.erphp-search-captcha&&input&&name');
        let body = key+'='+code;
        post(input,{body:body,headers:{Cookie:cookie}});
        setItem(RULE_CK,cookie);
        html = getHtml(input);
    }
    // log(html);
    VODS = [];
    let lis=pdfa(html,'.search_list&&ul&&li');
    log(lis.length);
    lis.forEach(function(it){
        VODS.push({
            vod_id: pd(it,'a&&href',input),
			vod_name: pdfh(it,'h3.dytit&&Text'),
			vod_pic: pd(it,'img.lazy&&data-original',input),
			vod_remarks: pdfh(html,'.jidi&&Text')
        });
    
    });`*/
}