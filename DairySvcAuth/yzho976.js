// function to show homepage
function showhomepage(){
    if (document.getElementById("home").style.display = "none") {
        document.getElementById("home").style.display = "block";
        document.getElementById("product").style.display = "none";
        document.getElementById("map").style.display = "none";
        document.getElementById("news").style.display = "none";
        document.getElementById("guestbook").style.display = "none";
        document.getElementById("register").style.display = "none";
        document.getElementById("login").style.display = "none";
        document.getElementById("nav1").style.backgroundColor = "white";
        document.getElementById("nav2").style.backgroundColor = "brown";
        document.getElementById("nav3").style.backgroundColor = "brown";
        document.getElementById("nav4").style.backgroundColor = "brown";
        document.getElementById("nav5").style.backgroundColor = "brown";
        document.getElementById("nav6").style.backgroundColor = "brown";
    }
}

// function to show homepage
function showproductpage(){
    showproduct();
    if (document.getElementById("product").style.display = "none") {
        document.getElementById("home").style.display = "none";
        document.getElementById("product").style.display = "block";
        document.getElementById("map").style.display = "none";
        document.getElementById("news").style.display = "none";
        document.getElementById("guestbook").style.display = "none";
        document.getElementById("register").style.display = "none";
        document.getElementById("login").style.display = "none";
        document.getElementById("nav1").style.backgroundColor = "brown";
        document.getElementById("nav2").style.backgroundColor = "white";
        document.getElementById("nav3").style.backgroundColor = "brown";
        document.getElementById("nav4").style.backgroundColor = "brown";
        document.getElementById("nav5").style.backgroundColor = "brown";
        document.getElementById("nav6").style.backgroundColor = "brown";
    }
}

// function to show products
function showproduct() {
    // fetch contents
    const fetchPromise = fetch("http://localhost:8188/DairyService.svc/items", 
      {
          headers:{
            "Accept" : "application/json",
          },
      });
    const streamPromise = fetchPromise.then((response) => response.json());
        
    let f = document.getElementById("product");
    let c = document.getElementById("showpdt");
    let content = "";

    // put fetched contents into webpage
    const update = (data) => {
        console.log(data);
        for(let i=0; i<data.length; i++){
            content += "<div class='pdtdiv'><img style='width: 150px; height: 150px;' src='http://localhost:8188/DairyService.svc/itemimg?id=" + data[i].ItemId + 
            "'/><p>" +data[i].Title+ "</p><p>" + data[i].Origin + "</p><p>" + data[i].Type + "</p><p>$ " +
             data[i].Price + "</p><button id=" + data[i].ItemId + " onclick='buyitem(this.id)'>BUY</button></div>";
        }
        c.innerHTML = content;
            f.appendChild(c);
    }

    streamPromise.then(update);
}

// function to search products

let boo = 0;
let timer;

function starttimer () {
    timer = setTimeout(function(){
        boo = 1; go();}, 200);
}
function closetimer() {
    clearTimeout(timer);
    boo = 0;
}

function go(){
    if(boo){
        searchproduct();
    }
}

function searchproduct(){
    // fetch contents
    let search_term = document.getElementById("searchbar").value;
    const fetchPromise = fetch("http://localhost:8188/DairyService.svc/search?term=" + search_term, 
      {
          headers:{
            "Accept" : "application/json",
          },
      });
    const streamPromise = fetchPromise.then((response) => response.json());
        
    let f = document.getElementById("product");
    let c = document.getElementById("showpdt");
    let content = "";

    // put fetched contents into webpage
    const update = (data) => {
        console.log(data);
        for(let i=0; i<data.length; i++){
            content += "<div class='pdtdiv'><img style='width: 150px; height: 150px;' src='http://localhost:8188/DairyService.svc/itemimg?id=" + data[i].ItemId + 
            "'/><p>" +data[i].Title+ "</p><p>" + data[i].Origin + "</p><p>" + data[i].Type + "</p><p>$ " + data[i].Price + 
            "</p><button id=" + data[i].ItemId + " onclick='buyitem(this.id)'>BUY</button></div>";
        }
        c.innerHTML = content;
            f.appendChild(c);
    }

    streamPromise.then(update);
}

function buyitem(itemid){
    if(loggedin == false){
        alert("You are not logged in. Please login first!")
        document.getElementById("product").style.display = "none";
        document.getElementById("login").style.display = "block";
    }else{
        const xhr = new XMLHttpRequest();
        let buyurl = "http://localhost:8189/Service.svc/buy?id=" + itemid; 
        xhr.open("GET", buyurl, true, username, password);
        xhr.withCredentials = true;
        xhr.onload = function(){
            let doc = new DOMParser().parseFromString(xhr.response, 'text/html');
	        doc.body.textContent;
            alert(doc.body.textContent);
        }
        xhr.send(null);
    }
}

//function to show mappage
function showmappage(){
    // get location info when the page is loaded
    showlocation();
    if (document.getElementById("map").style.display = "none") {
        document.getElementById("home").style.display = "none";
        document.getElementById("product").style.display = "none";
        document.getElementById("map").style.display = "block";
        document.getElementById("news").style.display = "none";
        document.getElementById("guestbook").style.display = "none";
        document.getElementById("register").style.display = "none";
        document.getElementById("login").style.display = "none";
        document.getElementById("nav1").style.backgroundColor = "brown";
        document.getElementById("nav2").style.backgroundColor = "brown";
        document.getElementById("nav3").style.backgroundColor = "white";
        document.getElementById("nav4").style.backgroundColor = "brown";
        document.getElementById("nav5").style.backgroundColor = "brown";
        document.getElementById("nav6").style.backgroundColor = "brown";
    }
}

//function to show location info
function showlocation(){
    //fetch contents
    const fetchPromise = fetch("http://localhost:8188/DairyService.svc/vcard");
    const streamPromise = fetchPromise.then((response) => response.text());
        
    let f = document.getElementById("map");
    let c = document.getElementById("showloc");
    let content = "";
    let tel = "";
    let email = "";
    let loc = "";
    let out = "";

    // put fetched contents into webpage
    const update = (data) => {
        console.log(data);
        content = data;
        content = content.split("\n");
        content.forEach(element =>{
            if(element.includes("TEL")){
                let temp_tel = element.split(":");
                tel = temp_tel[1];
            }
        });
        content.forEach(element =>{
            if(element.includes("EMAIL")){
                let temp_email = element.split(":");
                email = temp_email[1];
            }
        });
        content.forEach(element =>{
            if(element.includes("ADR;")){
                let temp_add = element.split(":");
                loc = temp_add[1];
                loc = loc.replace(RegExp(";;", "g"), " ")
            }
        });
        out += "<p>" + loc + "</p><a style='margin-right: 10px;' href='mailto: " + email + "'>📧: " + email + 
        "</a><a style='margin-left: 10px;' href='tel: " + tel + "'>📞: " + tel + "</a><div></div><a href='http://localhost:8188/DairyService.svc/vcard'>Add us to your address book</a>";
        c.innerHTML = out;
        f.appendChild(c);
    }

    streamPromise.then(update);
}

//function to show newspage
function shownewspage(){
    //get news when page is loaded
    shownews();
    if (document.getElementById("news").style.display = "none") {
        document.getElementById("home").style.display = "none";
        document.getElementById("product").style.display = "none";
        document.getElementById("map").style.display = "none";
        document.getElementById("news").style.display = "block";
        document.getElementById("guestbook").style.display = "none";
        document.getElementById("register").style.display = "none";
        document.getElementById("login").style.display = "none";
        document.getElementById("nav1").style.backgroundColor = "brown";
        document.getElementById("nav2").style.backgroundColor = "brown";
        document.getElementById("nav3").style.backgroundColor = "brown";
        document.getElementById("nav4").style.backgroundColor = "white";
        document.getElementById("nav5").style.backgroundColor = "brown";
        document.getElementById("nav6").style.backgroundColor = "brown";
        
    }
}

//function to get news
function shownews(){
    //fetch content
    const fetchPromise = fetch("http://localhost:8188/DairyService.svc/news", 
      {
          headers:{
            "Accept" : "application/json",
          },
      });
    const streamPromise = fetchPromise.then((response) => response.json());
        
    let f = document.getElementById("news");
    let c = document.getElementById("shownws");
    let content = "";

    // put fetched contents into webpage
    const update = (data) => {
        console.log(data);
        for(let i=0; i<data.length; i++){
            content += "<div style='border: 2px solid;'><a href='" + data[i].linkField + "'><h3>" + data[i].titleField + 
            "</h3>\n<img style='width: 100%; height: auto;' src='" + data[i].enclosureField.urlField + "'/></a>\n" + "<p>" + 
            data[i].pubDateField + "</p><p style='font-weight: bold;'> " + data[i].descriptionField + "</p>\n</div><div style='height: 10px;'></div>";
        }
        c.innerHTML = content;
            f.appendChild(c);
    }

        streamPromise.then(update);

}

//function to get guestbookpage
function showguestbookpage(){
    getcomments();
    if (document.getElementById("guestbook").style.display == "none") {
        document.getElementById("home").style.display = "none";
        document.getElementById("product").style.display = "none";
        document.getElementById("map").style.display = "none";
        document.getElementById("news").style.display = "none";
        document.getElementById("guestbook").style.display = "block";
        document.getElementById("register").style.display = "none";
        document.getElementById("login").style.display = "none";
        document.getElementById("nav1").style.backgroundColor = "brown";
        document.getElementById("nav2").style.backgroundColor = "brown";
        document.getElementById("nav3").style.backgroundColor = "brown";
        document.getElementById("nav4").style.backgroundColor = "brown";
        document.getElementById("nav5").style.backgroundColor = "white";
        document.getElementById("nav6").style.backgroundColor = "brown";
    }
}

function getcomments(){
    let cmts = document.getElementById("showcmt");
	while (cmts.firstChild) {
		cmts.removeChild(cmts.firstChild);
    }

    const fetchPromise = fetch("http://localhost:8188/DairyService.svc/htmlcomments");
    const streamPromise = fetchPromise.then((response) => response.text());

    const update = (data) => {
        console.log(data);	
		cmts.insertAdjacentHTML("beforeend", data);
    }

    streamPromise.then(update);
}

//function to submit comments
function submitcomment(){
    //post comment
    let name = document.getElementById("nm").value;
    let comment = document.getElementById("cmt").value;
    let jsoncomment = JSON.stringify(comment);
    const fetchPromise = fetch("	http://localhost:8188/DairyService.svc/comment?name=" + name, 
        {
            headers:{
                "Content-Type" : "application/json",
            },
            method: "POST",
            body: jsoncomment
        });

    // when post is done, no matter it success or not, refresh the comments
    fetchPromise.then(
        function(){
            getcomments();
            document.getElementById("nm").value = "";
            document.getElementById("cmt").value = "";
        }
    )

}

function showregisterpage(){
    if (document.getElementById("register").style.display = "none") {
        document.getElementById("home").style.display = "none";
        document.getElementById("product").style.display = "none";
        document.getElementById("map").style.display = "none";
        document.getElementById("news").style.display = "none";
        document.getElementById("guestbook").style.display = "none";
        document.getElementById("register").style.display = "block";
        document.getElementById("login").style.display = "none";
        document.getElementById("nav1").style.backgroundColor = "brown";
        document.getElementById("nav2").style.backgroundColor = "brown";
        document.getElementById("nav3").style.backgroundColor = "brown";
        document.getElementById("nav4").style.backgroundColor = "brown";
        document.getElementById("nav5").style.backgroundColor = "brown";
        document.getElementById("nav6").style.backgroundColor = "white";
    }
}

function register(){
    let regiusername = document.getElementById("username").value;
    let regipassword = document.getElementById("password").value;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8188/DairyService.svc/register", true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    if(regiusername=="" || regipassword==""){
        alert("Invalid username or password!")
    }else{
        let registerinfo;
            registerinfo = JSON.stringify(
                {
                    Name : regiusername,
                    Password : regipassword
                }
            );
        xhr.onload = function () {
            alert(xhr.responseText);
        }
        xhr.send(registerinfo); 
    }
    

}

let loggedin = false;
function showloginpage(){
    if (document.getElementById("register").style.display = "none") {
        document.getElementById("home").style.display = "none";
        document.getElementById("product").style.display = "none";
        document.getElementById("map").style.display = "none";
        document.getElementById("news").style.display = "none";
        document.getElementById("guestbook").style.display = "none";
        document.getElementById("register").style.display = "none";
        document.getElementById("login").style.display = "block";
        document.getElementById("nav1").style.backgroundColor = "brown";
        document.getElementById("nav2").style.backgroundColor = "brown";
        document.getElementById("nav3").style.backgroundColor = "brown";
        document.getElementById("nav4").style.backgroundColor = "brown";
        document.getElementById("nav5").style.backgroundColor = "brown";
        document.getElementById("nav6").style.backgroundColor = "brown";
    }
}

let username = "";
let password = "";
function login(){
    username = document.getElementById("loginun").value;
    password = document.getElementById("loginpw").value;
    if(username == "" || password == ""){
        alert("Please enter username and password!")
    }else{
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8189/Service.svc/user", true, username, password);
        xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onload = function(){
            if (this.status === 200) {
                loggedin = true;
                document.getElementById("login").style.display = "none";
                document.getElementById("home").style.display = "block";
                document.getElementById("loginbut").style.display = "none";
                document.getElementById("logoutbut").style.display = "block";
                document.getElementById("loginun").value = "";
                document.getElementById("loginpw").value = "";
                alert("Login succeeded");
            } else {
                username = "";
                password = "";
                alert("Login failed"); 
            }
        }
        xhr.send(null);
    }
}

function logout(){
    loggedin = false;
    document.getElementById("loginbut").style.display = "block";
    document.getElementById("logoutbut").style.display = "none";
    username = "";
    password = "";
    alert("Logout succeeded"); 
}

