var page = `
    <div class="page">
      <div class="topbar">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {{@ $data.join('')}}

    </div>
`
var page2 = `
    <div class="page page2">
      <div class="topbar">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

    <div id="analysis" class="content">
        <div class="box">
            <div class='container'>
                {{@ $data.join('')}}
            </div>
        </div>
    </div>

    </div>
`

var info = `
<div id="info" class="content">
    <div class="top">
    <span class="up"></span>
    <span class="down"></span>
    <p>{{title}}</p>
    </div>
    <div class="box">
        <div class='container'>
            <p class="all">编号：{{id}}</p>
            <p class="half">姓&nbsp;&nbsp;名：&nbsp;&nbsp;{{name}}</p>
            <p class="half">出生日期：&nbsp;&nbsp;{{birthday}}</p>
            <p class="half">年&nbsp;&nbsp;龄：&nbsp;&nbsp;{{age}}</p>
            <p class="half">测试日期：&nbsp;&nbsp;{{testday}}</p>
            <p class="half">性&nbsp;&nbsp;别：&nbsp;&nbsp;{{sex}}</p>
        </div>
    </div>
</div>
`
var header = `
<div id="header" class="header">
    {{if title}}
        <h2>{{title}}</h2>
    {{/if}}
</div>
`
var img = `
<div id="img" class="content">
    <div class="top">
      <span class="up"></span>
      <span class="down"></span>
      <p>{{title}}</p>
    </div>
    <div class="box">
        <img src="{{img}}" alt="房树人画作">
    </div>
</div>
`

/**
 * 智力水平分析
 */
var intelligence = `
<div id="intelligence" class="content">
    <div class="top">
      <span class="up"></span>
      <span class="down"></span>
      <p>{{title}}</p>
    </div>
    <div class="box">
        <p>{{section1.name}}</p>
        <div class="table">
            {{each section1.row1}}
            <span>{{$value}}</span>
            {{/each}}
            {{each section1.row2}}
            <span>{{$value}}</span>
            {{/each}}
            {{each section1.row3}}
            <span>{{$value}}</span>
            {{/each}}
            {{each section1.row4}}
            <span>{{$value}}</span>
            {{/each}}
        </div>
        <p>{{section2.name}}</p>
        <div class="">
            <img src="{{section2.img}}" alt="{{section2.name}}">
        </div>
        <p>{{section3.name}}</p>
        <div class="comment"> {{section3.comment}} </div>
    </div>
</div>
`
/**
 * 房树人问答
 */
var QA = `
<div id="QA" class="content">
    <div class="top">
      <span class="up"></span>
      <span class="down"></span>
      <p>{{title}}</p>
    </div>
    <div class="box">
        {{each questions question index}}
            <p class="type color-{{index}}">{{question.name}}</p>
            {{each question.list qa}}
                <p class="q">{{qa.q}}</p>
                <p class="a">
                    <span class="color-{{index}}">答： </span>
                    {{qa.a}}
                </p>
            {{/each}}
        {{/each}}
    </div>
</div>
`
/**
 * 咨询师总结
 */
var summary = `
<div id="summary" class="content">
    <div class="top">
      <span class="up"></span>
      <span class="down"></span>
      <p>{{title}}</p>
    </div>
    <div class="box">
        <p>{{remark}}</p>
    </div>
</div>
`
/**
 * 人格特质分析
 */
var analysis = `
<div id="analysis" class="content">
    <div class="top">
      <span class="up"></span>
      <span class="down"></span>
      <p>{{title}}</p>
    </div>
    <div class="box">
        <div class='container'>
        {{each types type index}}
            <p class="type color-{{index}}">{{type.name}} : </p>
            <p class="brief">{{type.brief}}</p>
            {{each type.list qa}}
                <p class="q color-{{index}}">{{qa.q}}</p>
                <ol class="a">
                    {{each qa.a}}
                        <li>{{$index+1}}. {{$value}}</li>
                    {{/each}}

                </ol>
            {{/each}}
        {{/each}}
        </div>
    </div>
</div>
`

function domToString(node) {
    var tmpNode = document.createElement("div");
    tmpNode.appendChild(node.cloneNode(true));
    var str = tmpNode.innerHTML;
    tmpNode = node = null; // prevent memory leaks in IE  
    return str;
}

htmlRender(filterData(json))

function filterData(data) {
    var obj = {}
    var briefs = {
        "房": "房子表示的是受测者所出生成长的家庭状况，也是指自己对家庭或一般家庭、家族关系的想法、感情、态度。通过对屋顶、窗、地面线等构成部分的分析，可以了解到受测者在家庭成员中的自我形象，以及空想与现实之间的关系：如安全感，家庭成员与环境的关系等。",
        "树": "表现的是受测者自己几乎无意识感到的自我形象、姿态，表示其内心的平衡状态，从中可显示出受测者的精神及性的成熟度，当然，树的直接涵义表达的是个体与环境的关系，另外是具有生命意义的象征。",
        "人": "反映了人物的自我现实像，包括心理上的及躯体上的（身体状况），有时也表现自己的理想像。另外，有的所表现的是对受测者而言，具有特殊意义的人物，无论是赞美，还是丑化，都对受测者有强烈的情绪关系，好恶及矛盾情感，再者，还反映了受测者对人物的一般人是、概括印象。"
    }
    var types = {
        "重度低下": "1-01",
        "中度低下": "2-01",
        "轻度低下": "3-01",
        "临界状态": "4-01",
        "中等偏下": "5-01",
        "中等": "6-01",
        "中等偏上": "7-01",
        "优秀": "8-01",
    }
    obj.header = {
        title: "房树人测评报告"
    }
    obj.img = {
        title: "房树人画作",
        img: data.PicturePath
    }
    obj.info = {
        id: data.UserInfo.StudentID,
        title: "测试者个人信息",
        name: data.UserInfo.Name,
        age: data.UserInfo.Age + '岁',
        sex: data.UserInfo.Sex,
        testday: data.UserInfo.Birthday,
        birthday: data.UserInfo.TestDate
    }
    obj.analysis = {
        title: "人格特质分析",
        types: []
    }
    data.PersonalityAnalysis.forEach(function (type, index) {
        obj.analysis.types.push({
            name: type.TypeName,
            brief: briefs[type.TypeName],
            list: []
        })

        type.ListQuestion.forEach(function (qa, key) {
            obj.analysis.types[index].list.push({
                q: qa.Question,
                a: qa.ListAnswer
            })
        })
    })


    obj.summary = {
        title: "咨询师总结",
        remark: data.Remark
    }
    obj.intelligence = {
        title: "智力水平分析",
        section1: {
            name: '治理测评结果',
            row1: ['项目得分', '粗分G率', '纯修正分', 'G率智商', '纯修正分智商', '智商等级'],
            row2: [data.LevelAnalysis.IQScoreA, '', '', '', '', ''],
            row3: [data.LevelAnalysis.IQScoreD, data.LevelAnalysis.IQScoreG, data.LevelAnalysis.IQScoreFix, data.LevelAnalysis
                .GIQ, data.LevelAnalysis.FixIQ, data.LevelAnalysis.IQLevel
            ],
            row4: [data.LevelAnalysis.IQScoreS, '', '', '', '', '']
        },
        section2: {
            name: '智力水平总览图',
            img: 'img/' + types[data.LevelAnalysis.IQLevel] + ".jpg"
        },
        section3: {
            name: '评语',
            comment: data.LevelAnalysis.IQComments
        },
    }
    obj.QA = {
        title: "房树人问答",
        questions: []
    }

    data.HTPQuestion.forEach(function (type, index) {
        obj.QA.questions.push({
            name: type.TypeName + ": 参考问题",
            list: []
        })
        type.ListQuestion.forEach(function (item) {
            obj.QA.questions[index].list.push({
                q: item.Question,
                a: item.Answer
            })
        })
    });

    return obj;
}

function htmlRender(obj) {
    console.log(obj)
    var options = {
            minimize: true,
            bail: true,
            debug: true
        },
        pages = [],
        children = [];

    children.push(template.render(header, obj.header, options))
    children.push(template.render(info, obj.info, options))
    children.push(template.render(img, obj.img, options))
    // pages.push(template.render(page, children, options))
    document.getElementById('app').innerHTML = template.render(page, children, options)

    children = []
    children.push(template.render(intelligence, obj.intelligence, options))
    // pages.push(template.render(page, children, options))
    document.getElementById('app').innerHTML += template.render(page, children, options)

    children = []
    children.push(template.render(analysis, obj.analysis, options))
    // pages.push(template.render(page, children, options))
    document.getElementById('app').innerHTML += template.render(page, children, options)

    // document.getElementById('app').innerHTML = pages.join('')

    // 分页--------------------------------------------------------------------开始
    var divH = 900,
        _index = 0,
        boxChildren = [],
        box = document.querySelector('#analysis .container:last-child');

    if (box.offsetHeight > divH) {
        Array.prototype.forEach.call(box.children, function (node) {
            boxChildren.push(domToString(node))
        })
        box.innerHTML = ''
        boxChildren.forEach(function (node, index) {
            if (box.offsetHeight < divH) {
                box.innerHTML += node
                _index = index
            }
        })
        var oldArr = boxChildren.slice(0, _index - 1);
        box.innerHTML = oldArr.join('') // 填入正确的数据

        var newArr = boxChildren.slice(_index - 1, boxChildren.length);

        loop(newArr)

        function loop(arr) {
            document.getElementById('app').innerHTML += template.render(page2, arr, options)
            var p2 = document.querySelector('.page2 .container:last-child');
            var _index = 0
            if (p2.offsetHeight > divH) {
                p2.innerHTML = ''
                arr.forEach(function (node, index) {
                    if (p2.offsetHeight < divH) {
                        p2.innerHTML += node
                        _index = index
                    }
                })
                p2.innerHTML = arr.slice(0, _index - 1).join('') // 填入正确的数据
                loop(arr.slice(_index - 1, arr.length));
            }
        }
    }

    // 分页--------------------------------------------------------------------结束


    children = []
    children.push(template.render(QA, obj.QA, options))
    document.getElementById('app').innerHTML += template.render(page, children, options)

    children = []
    children.push(template.render(summary, obj.summary, options))
    document.getElementById('app').innerHTML += template.render(page, children, options)

}