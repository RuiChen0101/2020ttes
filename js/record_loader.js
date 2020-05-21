var db = firebase.firestore()
var gracing_div=document.getElementById('groupRacing')
var sracing_div=document.getElementById('signalRacing')
var sitem_div=document.getElementById('signalItem')
var templateId=["track","holder","time"];
var catgoryDivList={'signalRacing':sracing_div,'signalItem':sitem_div,'groupRacing':gracing_div}
db.collection("track-record").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var data=doc.data();
        data["track-list"].forEach(function(track) {
          var template = document.getElementById('record-template').content.cloneNode(true);
          template.getElementById(templateId[0]).innerHTML="<p>"+track+"</p>";
          template.getElementById(templateId[1]).innerHTML="<p>"+data["record"][track]["holder"]+"</p>";
          template.getElementById(templateId[2]).innerHTML="<p>"+data["record"][track]["record"]+"</p>";
          catgoryDivList[doc.id].appendChild(template)
        });
    });
});
