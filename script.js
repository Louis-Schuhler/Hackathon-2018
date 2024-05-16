var image;

function loadGIF() {

    document.getElementById("imgClickAndChange").src = "img/GIF.JPG";

    var val = document.getElementById("searchtext").value
   
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://api.giphy.com/v1/gifs/search?q=" + val.split(' ').join('+') + "&api_key=NhEPr6DtewNp95j4pv4TFaMbE3lHqqs9&limit=1", true);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var myArr = JSON.parse(this.responseText);
            image =  myArr.data[0].images.original.url;
            //document.getElementById("imgClickAndChange").src
            document.getElementById("title").innerText = myArr.data[0].title;
        }
    };

    xhttp.send();

}      

function changeImage(){
    document.getElementById("imgClickAndChange").src = image;
}
