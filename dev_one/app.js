var page = `
    <div class="page one" id="one">
    <div class="footer">单位名称：辅仁淑凡演示</div> 
      <div class='container'>
        {{@ $data.join('')}}
      </div>
    </div>
`
var one = `
    <div class="page one" id="one">
    <div class="footer">单位名称：辅仁淑凡演示</div> 
      <div class='container'>
      <p class="pagetitle">
        北京辅仁淑凡软件科技有限公司
        <br/>3D电子沙盘个体报告
      </p>

      {{if UserInfo!=''}}
        <p class="table_title">个人基本信息</p>
        <table class="info" style="table-layout: fixed; ">
          <tr>
            <td class="key">姓名</td>
            <td>{{UserInfo.Name}}</td>
            <td class="key">性别</td>
            <td>{{UserInfo.Sex}}</td>
            <td class="key">出生日期</td>
            <td>{{UserInfo.Birthday}}</td>
          </tr>
          <tr>
            <td class="key">学校</td>
            <td>{{UserInfo.EntityName}}</td>
            <td class="key">班级</td>
            <td colspan="3">{{UserInfo.GroupName}}</td>
          </tr>
        </table>
      {{/if}}
        
      {{if SandPlayProcess!=''}}
        <p class="table_title">沙盘过程信息</p>
        <table class="info" style="table-layout: fixed;">
          <tr>
            <td class="key">沙盘作品名称</td>
            <td colspan="5">{{SandPlayProcess.SandPlayName}}</td>
          </tr>
          <tr>
            <td class="key">沙盘游戏次数</td>
            <td>{{SandPlayProcess.Round}}</td>
            <td class="key">沙盘游戏日期</td>
            <td>{{SandPlayProcess.PlayDate}}</td>
            <td class="key">沙盘游戏时间</td>
            <td>{{SandPlayProcess.UseTime}}</td>
          </tr>

          {{ set REST = SandPlayProcess.ProcessStep.length%3;}}
          {{ set ROWS = REST == 0 ? SandPlayProcess.ProcessStep.length / 3 : (SandPlayProcess.ProcessStep.length - REST) / 3 + 1; }}

          <% for(var i = 0; i < ROWS; i++){ %>
            <tr>
              {{if SandPlayProcess.ProcessStep[i*3+0]}}
                <td class="key">第{{i*3+1}}步</td>
                <td>{{SandPlayProcess.ProcessStep[i*3+0]}}</td>
              {{/if}}

              {{if SandPlayProcess.ProcessStep[i*3+1]}}
                <td class="key">第{{i*3+2}}步</td>
                <td>{{SandPlayProcess.ProcessStep[i*3+1]}}</td>
              {{else}}
                <td colspan = "2"></td>
              {{/if}}

              {{if SandPlayProcess.ProcessStep[i*3+2]}}
                <td class="key">第{{i*3+3}}步</td>
                <td>{{SandPlayProcess.ProcessStep[i*3+2]}}</td>
              {{else}}
                <td colspan = "2"></td>
              {{/if}}

            </tr>
          <% } %>

          <tr>
            <td class="key">共计使用沙具</td>
            <td colspan="5">{{SandPlayProcess.TotalModelCount}}</td>
          </tr>
          <tr>
            <td class="key">重复使用沙具</td>
            <td colspan="5">{{SandPlayProcess.RepeatModels.join('，')}}</td>
          </tr>
        </table>
      {{/if}}


      {{if VisitorsFeel && VisitorSummary}}
        <p class="table_title">来访者信息</p>
        <p class="text">{{VisitorsFeel}}</p>
        <p class="text">{{VisitorSummary}}</p>
      {{/if}}

      {{if CounselorRecord && CounselorOpinion}}
        <p class="table_title">咨询师记录信息</p>
        <p class="text">{{CounselorRecord}}</p>
        <p class="text">{{CounselorOpinion}}</p>
      {{/if}}

      {{if Pictures!=null && Pictures!=''}}
        
        <p class="table_title">沙盘整体图片</p>
          
        {{if Pictures.AroundPic && Pictures.AroundPic.length>0}}
          <p class="text">四边图</p>
          {{each Pictures.AroundPic}}
              {{if $value}}
               <div class="img" style="background-image: url( {{$value}} )">  </div>
              {{/if}}
          {{/each}}
        {{/if}}

        {{if Pictures.OverLookPic && Pictures.OverLookPic.length>0}}
          <p class="text">俯视图</p>
          {{each Pictures.OverLookPic}}
              {{if $value}}
               <div class="img" style="background-image: url( {{$value}} )">  </div>
              {{/if}}
          {{/each}}
        {{/if}}
      {{/if}}
    </div>
  </div>

`

// htmlRender(json)

function domToString(node) {
  var tmpNode = document.createElement("div");
  tmpNode.appendChild(node.cloneNode(true));
  var str = tmpNode.innerHTML;
  tmpNode = node = null; // prevent memory leaks in IE  
  return str;
}

function htmlRender(data, options) {
  options = {
    minimize: true,
    bail: true,
    debug: true
  }
  document.getElementById('app').innerHTML = template.render(one, data, options);

  autoPage(document.querySelector('.container:last-child'))

  function autoPage(box) {
    var divH = 900,
      _index = 0,
      boxChildren = [];

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
        document.getElementById('app').innerHTML += template.render(page, arr, options)
        var p2 = document.querySelector('.page:last-child .container:last-child');
        var _index = 0
        if (p2.offsetHeight > divH) {
          p2.innerHTML = ''
          arr.forEach(function (node, index) {
            if (p2.offsetHeight < divH) {
              p2.innerHTML += node
              _index = index
            }
          })
          p2.innerHTML = arr.slice(0, _index).join('') // 填入正确的数据
          loop(arr.slice(_index, arr.length));
        }
      }
    }
  }
}