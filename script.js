let h1 = document.createElement("h1");
h1.setAttribute("id","title");
h1.innerText = "Student Database";
h1.className = "topContent";
let p = document.createElement("p");
p.setAttribute("id","description");
p.className ="topContent";
p.innerText = "The student details are here in table format.";
let table = document.createElement("table");
table.setAttribute("class","table table-bordered");  
let thead = document.createElement("thead");
let th1 = document.createElement("th");
let th2 = document.createElement("th");
let th3 = document.createElement("th");
th1.innerText = "ID";
th2.innerText = "Name";
th3.innerText = "Email";

let tbody = document.createElement("tbody");
let tablediv = document.createElement("div");
tablediv.setAttribute("class","table-responsive");
thead.append(th1,th2,th3);
table.append(thead);

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
        tr.append(td1,td2,td3);
        tbody.append(tr);
        table.append(tbody);
    }
    for(let i = 0; i < dataPerPage;i++){
        document.getElementById(`td1${i}`).innerText = data[i].id;
        document.getElementById(`td2${i}`).innerText = data[i].name;
        document.getElementById(`td3${i}`).innerText = data[i].email;
    }
    let  prevButton = document.getElementById("previous");
    prevButton.style.display = "none";
}

tablediv.append(table);
document.body.append(h1,p,tablediv);

//Pagination UI
let div = document.createElement("div");
div.setAttribute("id","buttons");
div.setAttribute("class","d-flex justify-content-center");

let firstLink = document.createElement("button");
firstLink.setAttribute("type","button");
firstLink.className = "links active btns";
firstLink.id = "first";
firstLink.innerText = "First";
firstLink.style.backgroundColor = "white";
firstLink.style.color = "blue";
firstLink.style.padding = "5px 15px";
firstLink.style.border = "1px solid #80808036";
firstLink.addEventListener("click",function(){displayData(1)});
div.append(firstLink);
let prevLink = document.createElement("button");
prevLink.setAttribute("type","button");
prevLink.className = "links";
prevLink.id = "previous";
prevLink.innerText = "Prev";
prevLink.style.backgroundColor = "white";
prevLink.style.color = "blue";
prevLink.style.padding = "5px 15px";
prevLink.style.border = "1px solid #80808036";
div.append(prevLink);
prevLink.addEventListener("click",prevPage);


for(let i = 2; i <=9;i++){
let link = document.createElement("button");
link.setAttribute("type","button"); 

link.className="links btns";
link.style.backgroundColor = "white";
link.style.color = "blue";
link.style.padding = "5px 15px";
link.style.border = "1px solid #80808036";
link.id = `but${i}`;
link.innerText = i;
div.append(link);
link.addEventListener("click",function(){displayData(i)});
}


let last = document.createElement("button");
last.setAttribute("type","button");
last.className = "links btns";
last.innerText = "Last";
last.id = "last";
last.style.backgroundColor = "white";
last.style.color = "blue";
last.style.padding = "5px 15px";
last.style.border = "1px solid #80808036";

last.addEventListener("click",function(){displayData(10)});

let nextLink = document.createElement("button");
nextLink.setAttribute("type","button");
nextLink.className = "links";
nextLink.innerText = "Next";
nextLink.id = "next";
nextLink.style.backgroundColor = "white";
nextLink.style.color = "blue";
nextLink.style.padding = "5px 15px";
nextLink.style.border = "1px solid #80808036";

div.append(nextLink);
nextLink.addEventListener("click",nextPage);
div.append(last);
document.body.append(div);


let current,btncontainer,btns;
btncontainer = document.getElementById("buttons");
btns = btncontainer.getElementsByClassName("btns");
for(let i = 0;i < btns.length;i++){
   btns[i].addEventListener("click",function(){
       current = document.getElementsByClassName("active");
       current[0].className = current[0].className.replace("active","");
       console.log(current);
       this.className="active";
   });
 }


//Function for each PageNUmber
function displayData(pageNum){
   
    currPage = pageNum;
   
   
    let prevButton,nextButton,firstButton,lastButton;
    prevButton = document.getElementById("previous");
    nextButton = document.getElementById("next");
    if(currPage == 1){
      prevButton.style.display = "none";
    }else{
        prevButton.style.display="inline";
    }
   
    if(currPage == 10){
        nextButton.style.display = "none";  
      } else{
        nextButton.style.display = "inline";
      }
    let start = (pageNum-1)*10;
    let end = (pageNum*dataPerPage);
    let data = JSON.parse(talbeData.response);
    for(let i = start,j=0; i <=end,j<10;i++,j++){
        document.getElementById(`td1${j}`).innerText = data[i].id;
        document.getElementById(`td2${j}`).innerText = data[i].name;
        document.getElementById(`td3${j}`).innerText = data[i].email;
    }
    
}

//Function for Previous Page
function prevPage(){
    current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace("active","");
    currPage = currPage-1;
    if(currPage==1){
        displayData(currPage);
    }else{
        document.getElementById(`but${currPage}`).className = "active";
        console.log(`td${currPage}`);
        displayData(currPage);
    }
}

//Function for Next Page
function nextPage(){
    current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace("active","");
    currPage = currPage+1;
    if(currPage==10){
        displayData(currPage);
    }else{
        document.getElementById(`but${currPage}`).className = "active";
        console.log(`td${currPage}`);
        displayData(currPage);
    }
 }
