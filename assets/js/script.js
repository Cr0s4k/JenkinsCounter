function getPercentatge(num){
    var num = parseFloat(num);
    num = 100 - num;
    return num.toString() + "%";
}

function getChamps(callback) {
    $.get("/getAllChamps", function (data) {
        callback(data);
    })
}

$(document).ready(function(){
    $("#champ").keyup(function (e) {
        if(e.keyCode == 13){
            $("#search").click();
        }
    });

    getChamps(function(data){
        $("#champ").autocomplete({
            source: data
        });
    });

    $("#search").click(function(){
        if(!$("#search").hasClass("disabled")){
            $(".champInfo.row").remove();
            $(".alert").slideToggle();
            $("#search").toggleClass("disabled");
            $.get("/getChamps", {champ: $("#champ").val()},function(data){
                $(".alert").slideToggle();
                $("#search").toggleClass("disabled");
                for(var i = 0; i < data.length; i++){
                    var div = $("<div class='champInfo row align-items-center'></div>");
    
                    var name = $("<div class='champName col-12 col-sm-4'></div>");
                    var h4 = $("<h4>" + data[i].name + "</h4>");
                    name.append(h4);
    
                    var rate = $("<div class='champRate col-8 col-sm-4'></div>");
                    var rateString = getPercentatge(data[i].winRate);
                    var divProgress = $("<div class='progress'></div>");
                    var divProgressBar = $("<div class='progress-bar'></div>");
                    divProgressBar.text(rateString);
                    divProgressBar.css("width", rateString);
                    divProgress.append(divProgressBar);
                    rate.append(divProgress);
    
                    var divImg = $("<div class='champImg col-12 col-sm-3'></div>")
                    var img = $("<img>");
                    img.attr("src", data[i].urlImage);
                    divImg.append(img);
    
                    div.append(divImg);
                    div.append(name);
                    div.append(rate);
                    if($("#champ").val().toLowerCase().replace("'", "") != data[i].name.toLowerCase().replace("'", ""))
                        $(".container-fluid").append(div);
                }
            });
        }
    });

    $("#aboutUs").click(function(){
        $(".modal").toggle("slow");
    });

    $(".closeButton").click(function(){
        $(".modal").toggle("slow");
    });
});