var one = `
    <div class="page one" id="one">
      <p class="title">
        北京辅仁淑凡软件科技有限公司
        <br/>3D电子沙盘个体报告
      </p>

      <p class="table_title">个人基本信息</p>
      <table class="info">
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
      <p class="table_title">沙盘过程信息</p>

      <table class="info">
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
        <tr>
          <td class="key">第一步</td>
          <td>{{SandPlayProcess.ProcessStep[0]}}</td>
          <td class="key">第二步</td>
          <td>{{SandPlayProcess.ProcessStep[1]}}</td>
          <td class="key">第三步</td>
          <td>{{SandPlayProcess.ProcessStep[2]}}</td>
        </tr>
        <tr>
          <td class="key">第四步</td>
          <td>{{SandPlayProcess.ProcessStep[3]}}</td>
          <td class="key">第五步</td>
          <td colspan="3">{{SandPlayProcess.ProcessStep[4]}}</td>
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

function htmlRender(data, options) {
  options = {
    minimize: true,
    bail: true,
    debug: true
  }
  document.getElementById('app').innerHTML = template.render(one, data, options);
}