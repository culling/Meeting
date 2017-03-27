var twitchUsers = ["cretetion",
    "ESL_SC2",
    "freecodecamp",
    "habathcx",
    "noobs2ninjas",
    "OgamingSC2",
    "oliverstaton",
    "storbeck",
    "RobotCaleb"];


//https://wind-bow.gomix.me/twitch-api/users/ESL_SC2


$(document).ready(function(){
    console.log("Loaded JS");

    getUser();


});

function getUser(){
    var twitchStreamServer  = "https://www.twitch.tv"
    var twitchApiServer     = "https://wind-bow.gomix.me";
    var twitchUrlUsers      = twitchApiServer.concat("/twitch-api/users/");
    var twitchUrlChannel    = twitchApiServer.concat("/twitch-api/channels/");
    var twitchUrlStream     = twitchApiServer.concat("/twitch-api/streams/");
    var callbackTag = "?callback=?";
    var twitchUrlStreamUser;
    
    
    twitchUsers.forEach(function(user){
        var currentStreamsHTML  = "";
        var onlineStatus = "offline" ;

        var twitchUrlUsersUser      = twitchUrlUsers.concat(user, callbackTag );
        var twitchUrlStreamUser     = twitchUrlStream.concat(user, callbackTag );
        
        var twitchStatus = "";
        var userStatusClass;
        //console.log("URL for user"              + user + ": " + twitchUrlUsersUser  );
        //console.log("URL for stream from user"  + user + ": " + twitchUrlStreamUser );

        $.getJSON( twitchUrlChannel.concat(user), function (result){
            //console.log(result);
            twitchStatus = result.status  ;
            console.log("Twtich Status:"+ twitchStatus);                    

            
            $.getJSON(twitchUrlStreamUser, function(twitchUserStream){
                console.log("Twtich Status:"+ twitchStatus);                    
                currentStreamsHTML = "";
                if (twitchUserStream.stream != null){
                    //$(".twitchUserLogo").css({'border-color':'green' })
                    onlineStatus = "online" ;


                    console.log(twitchStatus);
                    userStatusClass =  user.concat("Status")
                    currentStreamsHTML = 
                        '<div class="row">' + 
                            '<div class="col-md-4">' +
                                "<a href=" + twitchUserStream.stream.channel.url  + ">" + twitchUserStream.stream.game + '</a>' +
                            '</div>' +
                            '<div class="col-md-8">' + 
                                "<a href=" + twitchUserStream.stream.channel.url  + ">" +
                                '<i class="' + userStatusClass + '">'+ twitchStatus +'</i>'+ '</a>' +
                            '</div>'+
                        '</div>';
                }else{
                    currentStreamsHTML =
                        '<div class="row">' + 
                            '<div class="col-md-4">' +
                                "<i>" + onlineStatus + '</i>' +
                            '</div>' +
                        '</div>';
                }



                $.getJSON(twitchUrlUsersUser, function(twitchUser){
                    //console.log(twitchUser);
                    $(".twitchUsers").append(
                        '<div class="twitchUser col-md-12 img-thumbnail">'+
                            '<div class="row">' +
                                '<div class="twitchUserLogoDiv col-md-4">' +
                                    '<img class="twitchUserLogo img-thumbnail '+ onlineStatus +  '" src="'+ twitchUser.logo +'">' +  
                                '</div>' +
                                '<div class="col-md-8">' +
                                    twitchUser.display_name +
                                    currentStreamsHTML
                                    +
                                '</div>' +
                            '</div>' +
                        '</div>'
                        );
                } );


            console.log(user);
            console.log(twitchUserStream);
            });
        });        


    });


}