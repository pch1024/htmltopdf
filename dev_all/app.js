var page = `
    <div class="page all" id="all">
    <div class="footer">单位名称：辅仁淑凡演示</div> 
      <div class='container'>
        {{@ $data.join('')}}
      </div>
    </div>
`
var all = `
    <div class="page all" id="all">
    <div class="footer">单位名称：辅仁淑凡演示</div> 
      <div class='container'>
      <p class="page_title">
        北京辅仁淑凡软件科技有限公司
        <br/>3D电子沙盘团体报告
      </p>

      {{if GroupInfo}}
        <p class="table_title">团体基本信息</p>
        <table class="info" style="table-layout: fixed; ">
          <tr>
            <td class="key">学校</td>
            <td>{{GroupInfo.EntityName}}</td>
            <td class="key">参与人员</td>
            <td colspan="3">{{GroupInfo.Student}}</td>
          </tr>
        </table>
      {{/if}}
 
      {{if SandPlayProcess}}
        <p class="table_title">沙盘过程信息</p>
        <table class="info" style="margin-bottom:1rem;table-layout: fixed; ">
          <tr>
            <td class="key">沙盘作品名称</td>
            <td colspan="5">{{SandPlayProcess.SandPlayName}}</td>
          </tr>
          <tr>
            <td class="key">游戏人数</td>
            <td>{{SandPlayProcess.StudentCount}}</td>
            <td class="key">沙盘游戏日期</td>
            <td>{{SandPlayProcess.PlayDate}}</td>
            <td class="key">沙盘游戏时间</td>
            <td>{{SandPlayProcess.UseTime}}</td>
          </tr>
        </table>

        {{if SandPlayProcess.ProcessStep}}
          {{each SandPlayProcess.ProcessStep rows ind}}
            <table class="info" style="margin:0; table-layout: fixed; ">
              <tr>
                <td class="key">轮次</td>
                <td class="key">{{rows.Student[0] }}</td> 
                <td class="key">{{rows.Student[1] }}</td> 
                <td class="key">{{rows.Student[2] }}</td> 
              </tr>
              {{each rows row key}}
                <tr>
                  {{if key != "Student" && key != "LastAdjust"}}
                    <td class="key">第{{key}}轮</td>
                    <td>{{row[0]}}</td> 
                    <td>{{row[1]}}</td> 
                    <td>{{row[2]}}</td> 
                  {{/if}}
                </tr>
              {{/each}}
              <tr>
                <td class="key">最后调整</td>
                <td>{{rows.LastAdjust[0]}}</td>
                <td>{{rows.LastAdjust[1]}}</td>
                <td>{{rows.LastAdjust[2]}}</td>
              </tr>
            </table>
          {{/each}}
          
          <table class="info" style="margin:0">
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

      {{/if}}

      {{ if VisitorsFeel && VisitorSummary }}
      <p class="table_title">来访者信息</p>
      <p class="text">{{VisitorsFeel}}</p>
      <p class="text">{{VisitorSummary}}</p>
      {{/if}}

      {{ if CounselorRecord && CounselorOpinion }}
      <p class="table_title">咨询师记录信息</p>
      <p class="text">{{CounselorRecord}}</p>
      <p class="text">{{CounselorOpinion}}</p>
      {{/if}}

      {{if Pictures}}
        <p class="table_title">沙盘整体图片</p>

        {{if Pictures.AroundPic}}
          <p class="text">四边图</p>
          {{each Pictures.AroundPic}}
               <div class="img" style="background-image: url( {{$value}} )">  </div>
          {{/each}}
        {{/if}}

        {{if Pictures.OverLookPic}}
          <p class="text">俯视图</p>
          {{each Pictures.OverLookPic}}
               <div class="img" style="background-image: url( {{$value}} )">  </div>
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

function htmlRender(data) {

  var options = {
    minimize: true,
    bail: true,
    debug: true
  }
  document.getElementById('app').innerHTML = template.render(all, data, options);

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
          debugger;
          console.log()
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