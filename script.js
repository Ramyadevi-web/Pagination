let table = document.createElement("table");
let thead = document.createElement("thead");
let th1 = document.createElement("th");
let th2 = document.createElement("th");
let th3 = document.createElement("th");
th1.innerText = "ID";
th2.innerText = "Name";
th3.innerText = "Email";
table.setAttribute("class","tableStyle");            
thead.setAttribute("class","tableStyle");
th1.setAttribute("class","tableStyle");
th2.setAttribute("class","tableStyle");
th3.setAttribute("class","tableStyle");

let tbody = document.createElement("tbody");
let tablediv = document.createElement("div");
tablediv.setAttribute("class","tableflex");


thead.append(th1,th2,th3);
table.append(thead);
tablediv.append(table);
document.body.append(tablediv);

//Getting JSON data
let dataPerPage=10;
let currPage = 1;
let talbeData = new XMLHttpRequest();
talbeData.open("GET","/data.json");
talbeData.send();


//Table Onload Function
talbeData.onload = function(){
let data = JSON.parse(talbeData.response);
    for(let i = 0; i <dataPerPage;i++){
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        tr.setAttribute("id",`tr${i+1}`);
        td1.setAttribute("id",`td1${i}`);
        td2.setAttribute("id",`td2${i}`);
        td3.setAttribute("id",`td3${i}`);
        tr.className = "tableStyle";
        td1.className = "tableStyle";
        td2.className = "tableStyle";
        td3.className = "tableStyle";
        tr.append(td1,td2,td3);
        tbody.append(tr);
        table.append(tbody);
    }
    for(let i = 0; i < dataPerPage;i++){
        document.getElementById(`td1${i}`).innerText = data[i].id;
        document.getElementById(`td2${i}`).innerText = data[i].name;
        document.getElementById(`td3${i}`).innerText = data[i].email;
    }
}

//Pagination UI
let div = document.createElement("div");
div.setAttribute("class","pagination");
let prevLink = document.createElement("a");
prevLink.setAttribute("href","#");
// prevLink.setAttribute= (className,"previous");
prevLink.id = "previous";
prevLink.innerText = "Prev";
div.append(prevLink);
prevLink.addEventListener("click",prevPage);
for(let i = 1; i <=10;i++){
let link = document.createElement("a");
link.setAttribute("href","#"); 
link.id = "pageNumBut";
link.innerText = i;
div.append(link);
link.addEventListener("click",function(){displayData(i)});
}
let nextLink = document.createElement("a");
nextLink.setAttribute("href","#");
nextLink.innerText = "Next";
nextLink.id = "pr";
div.append(nextLink);
document.body.append(div);


//Function for each PageNUmber
function displayData(pageNum){
    currPage = pageNum;
    if(currPage == 1){
      let button = document.getElementById("pageNumBut");
      console.log("disbl");
      button.disabled = true;
      console.log(button.disabled);
    }
    let start = (pageNum-1)*10;
    let end = (pageNum*dataPerPage);
    let data = JSON.parse(talbeData.response);
    for(let i = start,j=0; i <=end,j<=10;i++,j++){
        document.getElementById(`td1${j}`).innerText = data[i].id;
        document.getElementById(`td2${j}`).innerText = data[i].name;
        document.getElementById(`td3${j}`).innerText = data[i].email;
    }
}

//Function for Previous Page
function prevPage(){
   console.log(`currentpage ${currPage}`);
   if(currPage == 1){
    console.log("if")
    button.disabled = true;
    console.log("fdid",button.disabled);
   }else{
    displayData(currPage-1);
   }
}
