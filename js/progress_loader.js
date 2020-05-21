var db = firebase.firestore()
var gracing_div=document.getElementById('groupRacing')
var sracing_div=document.getElementById('signalRacing')
var sitem_div=document.getElementById('signalItem')
var templateId=["round","time","result","replay"];
var catgoryList={'sracing':"個人競速",'sitem':"個人道具",'gracing':"團體競速"}
var catgoryDivList={'sracing':sracing_div,'sitem':sitem_div,'gracing':gracing_div}
var nameDict={}

db.collection("enroll-Info").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      var data=doc.data();
      nameDict[doc.id]=data['id'];
    });
});

function getTime(time){
  var date=time.toDate();
  return (date.getMonth()+1) + "/" +  date.getDate();
}

function covertValue(value){
  if(value=="-1"){
    return "棄賽";
  }else{
    return value;
  }
}

function getGroupResult(score){
  var result="";
  Object.entries(score).forEach(([key, value]) => {
    result+=(nameDict[key]+"("+covertValue(value)+")"+":");
  });
  return result.slice(0,-1);
}

function getSignalResult(score,advance){
  var result="";
  var counter=0;
  advance.forEach(function(player){
    result+=(nameDict[player]+"("+score[player]+")"+" ");
    if(counter==1){
      result+="<br>";
    }
    counter++
  });
  return result;
}

function getReplay(replay){
  if(replay=="-"){
    return "<p>無紀錄</p>";
  }else{
    return '<a href="'+replay+'" target="_blank" rel="noopener noreferrer"><i class="fa fa-play"></i></a>';
  }
}

db.collection("match-Info").orderBy("round").orderBy("group").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var template = document.getElementById('match-info-template').content.cloneNode(true);
        var data=doc.data();
        if(data['status']=='finished'){
          template.getElementById(templateId[0]).innerHTML="<p>"+data['round']+"-"+data['group']+"</p>";
          template.getElementById(templateId[1]).innerHTML="<p>"+getTime(data['matchTime'])+"</p>";
          if(data['cat']=='gracing'){
            template.getElementById(templateId[2]).innerHTML="<p>"+getGroupResult(data['player'])+"</p>";
          }else{
            template.getElementById(templateId[2]).innerHTML="<p>"+getSignalResult(data['player'],data['advanced'])+"</p>";
          }
          template.getElementById(templateId[3]).innerHTML=getReplay(data['replay']);
          catgoryDivList[data['cat']].appendChild(template)
        }
    });
});
