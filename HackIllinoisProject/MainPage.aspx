<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MainPage.aspx.cs" Inherits="HackIllinoisProject.MainPage" %>

<!doctype html>
<html>
    <head>
        <title>GOEBELOG!!!!</title>
            <style type="text/css">



            </style>
        <script type = "text/javascript" src= "JavaScript.js" > </script>
        <script type = "text/javascript" src= "JavaScript2.js" > </script>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <link rel="stylesheet" type="text/css" href="StyleSheet1.css" />
    </head>
    <body>
        <div id = "mainStyle">
            <div id="MainPage">
                <div id="top">
                    <h1 class="auto-style1">Welcome</h1>
                    
                </div>
                <h1 class="auto-style2">Open-source code for exporting playlists from spotify
                    by Alexander Goebel and Bill Metcalf</h1>
                
                <div id ="exports">
                    <img src="http://i.imgur.com/xalA6bH.png" onclick="authorizeItunesUser()" />
                    <img src="http://i.imgur.com/oLFPpNu.png" onclick="authorizeSpotifyUser()" />
                    <img src="http://i.imgur.com/g3ttpHl.png" onclick="authorizeGMusicUser()" />
                </div>
                <div id ="imports">

                </div>
  
            </div>
            <div id="iSpotify">
                <div id="item-list">
                </div>
                <div>
                    Click here to view songs in the playlist
                    <button onclick = "getSongs()">Show</button>
                    
                </div>
                <div id ="songlist" style="overflow:scroll; height:400px;">
                    
                    
                </div>
                <button onclick ="clearSongs()">Clear</button>
                <div>
                    <img src="http://i.imgur.com/8s2ryCh.png" onclick="importItunes()" />
                    <img src="http://i.imgur.com/lAhkCvM.png" onclick="importSpotify()" />
                    <img src="http://i.imgur.com/RGeapNJ.png" onclick="importGMusic()" />
                </div>
                
              
            </div>
            <div id = "err"></div>
            <div id ="footer">
                <a href ="https://github.com/AlexSmokey/HackIL-project">GITHUB </a>
                <a href ="loggedin.aspx"> ABOUT</a>
            </div>
        </div>
        <script>
            $(document).ready(
               
                function () {
                        var args = getToken();
                        if ('access_token' in args) {
                            accessToken = args['access_token'];
                            $("#MainPage").hide();
                            $("#iSpotify").show();
                            $("#songlist").hide();
                            callSpotify('https://api.spotify.com/v1/me/playlists',null,displayPlaylists);
                        } else {
                            $("#iSpotify").hide();
                        }
                    }
            );
       </script>
    </body>
</html>