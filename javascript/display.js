function loadstory(url, Tfunction,x) {
    var xhttp;
    
    xhttp = new XMLHttpRequest();
   /*alert("Request has been called"); */
    if (x == 1){
         url = url.concat(document.getElementById("HList").value);
    }else if (x == 2){
         url = url.concat(document.getElementById("HInput").value);
        url = url.concat(".txt");
        /*url = url.toLowerCase(url);*/
    }else{
        alert("Invalid Choice.");
        
    }
   
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
           
            Tfunction(this);
        }
    };
    xhttp.open("GET", url, true)
    xhttp.send();
};

function testfunction(xhttp,x) {
    /*alert("Hello!"); */
    if (document.getElementById("display").className == "container"){
        document.getElementById("display").className += " fade1";
        document.getElementById("display").innerHTML = (xhttp.responseText);
        return true;
    }
    if (document.getElementById("display").className.match(/(?:^|\s)fade1(?!\S)/) ){
        document.getElementById("display").className = document.getElementById("display").className.replace( /(?:^|\s)fade1(?!\S)/ , " fade2");
        setTimeout(function(){
            document.getElementById("display").className = document.getElementById("display").className.replace( /(?:^|\s)fade2(?!\S)/ , " fade1");
            document.getElementById("display").innerHTML = (xhttp.responseText);
        },4000)
}
};