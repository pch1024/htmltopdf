var all = `
    <div class="page all" id="all">
      <p class="title">
        北京辅仁淑凡软件科技有限公司
        <br/>3D电子沙盘团体报告
      </p>

      <p class="table_title">团体基本信息</p>
      <table class="info">
        <tr>
          <td class="key">学校</td>
          <td>{{GroupInfo.EntityName}}</td>
          <td class="key">参与人员</td>
          <td colspan="3">{{GroupInfo.Student}}</td>
        </tr>
      </table>
      <p class="table_title">沙盘过程信息</p>


      <table class="info">
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


      <table class="info">
        <tr>
          <td class="key">轮次</td>
          {{each SandPlayProcess.ProcessStep.Student}}
            <td class="key">{{$value}}</td>
          {{/each}}
        </tr>
        <tr>
          <td class="key">第1轮</td>
          {{each SandPlayProcess.ProcessStep['1']}}
            <td>{{$value}}</td>
          {{/each}}
        </tr>
        <tr>
          <td class="key">第2轮</td>
          {{each SandPlayProcess.ProcessStep['2']}}
            <td>{{$value}}</td>
          {{/each}}
        </tr>
        <tr>
          <td class="key">第3轮</td>
          {{each SandPlayProcess.ProcessStep['3']}}
            <td>{{$value}}</td>
          {{/each}}
        </tr>
        <tr>
          <td class="key">最后调整</td>
          {{each SandPlayProcess.ProcessStep['LastAdjust']}}
            <td>{{$value}}</td>
          {{/each}}
        </tr>
        <tr>
          <td class="key">共计使用沙具</td>
          <td colspan="5">{{SandPlayProcess.TotalModelCount}}</td>
        </tr>
        <tr>
          <td class="key">重复使用沙具</td>
          <td colspan="5">{{SandPlayProcess.RepeatModels.join('，')}}</td>
        </tr>
      </table>

      <p class="table_title">来访者信息</p>
      <p class="text">{{VisitorsFeel}}</p>
      <p class="text">{{VisitorSummary}}</p>
      <p class="table_title">咨询师记录信息</p>
      <p class="text">{{CounselorRecord}}</p>
      <p class="text">{{CounselorOpinion}}</p>
      <p class="table_title">沙盘整体图片</p>
      <p class="text">四边图</p>
      <div class="img">
        {{each Pictures.AroundPic}}
            <img src="{{$value}}" alt="四边图">
        {{/each}}
      </div>
      <p class="text">俯视图</p>
      <div class="img">
         {{each Pictures.OverLookPic}}
            <img src="{{$value}}" alt="俯视图">
        {{/each}}
      </div>
    </div>
`

htmlRender(json)

function htmlRender(data) {

  var options = {
    minimize: true,
    bail: true,
    debug: true
  }
  document.getElementById('app').innerHTML = template.render(all, data, options);
}