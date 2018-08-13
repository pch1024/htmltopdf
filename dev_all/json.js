var imgurl = ["http://kzproducttest.oss-cn-qingdao.aliyuncs.com/SandPlay3/FB5C8A9144003403/c0126e314f6044b384cca13fd4c019d1/ScreenShot/0.png",
    "http://kzproducttest.oss-cn-qingdao.aliyuncs.com/SandPlay3/FB5C8A9144003403/c0126e314f6044b384cca13fd4c019d1/ScreenShot/1.png",
    "http://kzproducttest.oss-cn-qingdao.aliyuncs.com/SandPlay3/FB5C8A9144003403/c0126e314f6044b384cca13fd4c019d1/ScreenShot/2.png",
    "http://kzproducttest.oss-cn-qingdao.aliyuncs.com/SandPlay3/FB5C8A9144003403/c0126e314f6044b384cca13fd4c019d1/ScreenShot/3.png",
    "http://kzproducttest.oss-cn-qingdao.aliyuncs.com/SandPlay3/FB5C8A9144003403/c0126e314f6044b384cca13fd4c019d1/ScreenShot/4.png"
]

var json = {
    "GroupInfo": {
        "EntityName": "辅仁淑凡",
        "Student": "学生一,学生二"
    },
    "SandPlayProcess": {
        "SandPlayName": "沙盘作品名称",
        "StudentCount": 1,
        "PlayDate": "2018-05-05",
        "UseTime": "00:00:44",
        "ProcessStep": [{
            "Student": ["学生一", "学生二", "学生三"],
            "1": ["添加了模型变色龙", "添加了模型变色龙", "添加了模型变色龙"],
            "2": ["添加了模型变色龙", "添加了模型变色龙", "添加了模型变色龙"],
            "3": ["添加了模型变色龙", "添加了模型变色龙", "添加了模型变色龙"],
            "LastAdjust": ["", "", ""]
        }, {
            "Student": ["学生四", "学生五", ""],
            "1": ["添加了模型变色龙", "添加了模型变色龙", ""],
            "2": ["添加了模型变色龙", "添加了模型变色龙", ""],
            "3": ["添加了模型变色龙", "添加了模型变色龙", ""],
            "LastAdjust": ["", "", ""],
        }],
        "TotalModelCount": "共使用1大类，1小类，1个沙具",
        "RepeatModels": ["模型变色龙：重复一次", "模型变色龙2：重复一次"]
    },
    "VisitorsFeel": "来访者感受",
    "VisitorSummary": "来访者总结",
    "CounselorRecord": "心理咨询师记录",
    "CounselorOpinion": "心理咨询师意见",
    "Pictures": {
        "AroundPic": imgurl,
        "OverLookPic": [imgurl[3]]
    }
}

function httpGet(url) {
    var xmlhttp = null;
    if (window.XMLHttpRequest) { // code for all new browsers
        xmlhttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // code for IE5 and IE6
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttp != null) {
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) { // 4 = "loaded"
                if (xmlhttp.status == 200) { // 200 = OK
                    console.log(xmlhttp.responseText)
                    callData(xmlhttp.responseText)
                } else {
                    alert("Problem retrieving XML data");
                }
            }
        };

        // 前端设置是否带cookie
        // xmlhttp.withCredentials = true;
        xmlhttp.open("GET", url, true);
        xmlhttp.send(null);
    } else {
        alert("Your browser does not support XMLHTTP.");
    }
}

/**
 * 后端数据对接修改部分
 */
httpGet("https://api.github.com");

function callData(data) {
    console.log(data)
    // json = ''
    if (json == '') {
        document.getElementById('app').innerHTML = `<center style="margin-top:400px;color:white">没有数据！</center>`;
        return false;
    }
    htmlRender(json)
}