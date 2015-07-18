var number = [50000, 30000, 40000, 10000, 20000];//配列

number.sort(
  function (a,b){
    if(a < b)return -1;
    if(a > b)return 1;
    return 0;
  }
);//配列をソート

var APIKEY = "ffb6062385e7eb4f";
 var endpoint = "http://webservice.recruit.co.jp/ab-road-air/ticket/v1/";

function createCondition(deperture, destination, month, cheep){
  return {
    key: APIKEY,
    city: destination,
    dept_detail: deperture,
    ym:month,
    order:cheep,
    format: "jsonp"
  };
}

function renderTicket(ticket, index){
  var a = document.createElement("a");
  var elm = document.createElement("div");
  elm.textContent = ticket.price.min + "円";
  elm.classList.add("box"+index);
  a.href=ticket.urls.pc;
  a.appendChild(elm);
  return a;
}

function TicketTitle(ticket, index){
  var url = document.createElement("div");
  url.textContent = ticket.title;
  url.classList.add("migi" + index);
  return url;
}


function compareTicket(a, b){
  return a.price.min -  b.price.min;
}

function dataLoaded(data){
  console.log(data);
  var outer = document.querySelector("#output");
  var tickets = data.results.ticket;
  tickets.sort(compareTicket); // チケットを並び替える
  var i = 0;
  while(i < tickets.length){
    outer.appendChild(renderTicket(tickets[i], i));
    outer.appendChild(TicketTitle(tickets[i], i));
    i = i + 1;
  }
}

function search(){
  var a = document.getElementById("month").value;
  console.log(a);
  var place = document.getElementById("deperture").value;
  jQuery.ajax({
    url: endpoint,
    data: createCondition(place, "IST", a, "1"),
    dataType: "jsonp",
    success:dataLoaded,
  //  success:urlLoaded,
  });
}

var start = document.querySelector("#start");
start.addEventListener("click", search);
