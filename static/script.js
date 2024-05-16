var image;
var differences;
var num_frames;
function loadGIF() {
   // $("#loading").css('display', 'block')

    document.getElementById("imgClickAndChange").src = "";

    var val = document.getElementById("searchtext").value
   
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://api.giphy.com/v1/gifs/search?q=" + val.split(' ').join('+') + "&api_key=NhEPr6DtewNp95j4pv4TFaMbE3lHqqs9&limit=1", true);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var myArr = JSON.parse(this.responseText);
            image =  myArr.data[0].images.original.url;

            $.ajax({
              type: "GET",
              url: "/seizure?gif_url="+image,
              success: function(data){
                 console.log(data)
                 var object = JSON.parse(data)
                 isSeizure = object["is_seizure"]
                 differences = object["differences"]
                 num_frames = object["num_frames"]

                $(".row").css("display", "block")

                 if (isSeizure){
                    $("#speakers").text("Warning: this may cause seizures.")
                    document.getElementById("imgClickAndChange").src = "static/GIF.JPG";
                } else {
                    $("#speakers").text("")
                    document.getElementById("imgClickAndChange").src = image;
                }
              }
            });

            //document.getElementById("imgClickAndChange").src
            document.getElementById("title").innerText = myArr.data[0].title;
        }
    };
    xhttp.send();

}      

function apiCall(image) {

}

$(document).ready(function(){
    console.log("aaa")
    $("#speakers").text("")

    $("#imgClickAndChange").click(function(){
        console.log("bbb")
        $("#speakers").text("")
        document.getElementById("imgClickAndChange").src = image;
    })

    $("#button-addon2").click(function(){
        $("#speakers").text("Loading ...")
        $(".row").css("display", "none")
        console.log("ccc")
        loadGIF()
    })
})

function getDifferences() {
    return differences;
}

function getFrames() {
    return num_frames;
}
