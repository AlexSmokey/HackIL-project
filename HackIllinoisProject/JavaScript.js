var accessToken = null;
var rr;
var chosenNumber;
var playlists;
var daString = [];
var playlist;
var playlistToWrite;
//var pageState = "main";
function authorizeSpotifyUser() {
    var client_id = '370053704ef5450daee5eb58ca905af5';
    var redirect_uri = 'http://localhost:49829/MainPage.aspx';
    var url = 'https://accounts.spotify.com/authorize?client_id=' + client_id +
        '&response_type=token' +
        '&scope=user-library-read' +
        '&redirect_uri=' + encodeURIComponent(redirect_uri);
    document.location = url;

    //setState("iSpotify");
}

function getToken() {
    var add = this.location.hash.replace(/#/g, '');
    var all = add.split('&');
    var args = {};
    all.forEach(function (keyvalue) {
        var idx = keyvalue.indexOf('=');
        var key = keyvalue.substring(0, idx);
        var val = keyvalue.substring(idx + 1);
        args[key] = val;
    });
    accessToken = args["access_token"];

    return args;

}

function callSpotify(url, data, callback) {

    var result;
    $.ajax(url, {
        dataType: 'json',
        data: data,
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (r) {
            console.log("Playlists:", r);

            callback(r);
        },
        error: function (r) {
            confirm("FAIL");
            callback(null);
        }
    });

    return result;
}

function displayPlaylists(r)
{
    playlists = r;
    var list = $("#item-list");
    rr = r;
    for (var i = 0; i < r.items.length; i++) {
        list.append(playlistButtonGen(i));
    }
}

var playlistButtonGen = function (i) {
    

    var string = '<div id="export">Export <button id = "exportButton" onclick="playlistAction(' + i + ')"> ' + "  " + playlists.items[i].name + " " + '</button></div>';
    return $(string);

}

var playlistAction = function(index){
    var userid = playlists.items[index].owner.id;
    var plid = playlists.items[index].id;
    var url = "https://api.spotify.com/v1/users/" + userid + "/playlists/" + plid + "/tracks";

    playlist = playlists.items[index];
    var len = playlist.tracks.total;
    var os = 0;
    var lim = 100;
    for (var i = 0; i <= Math.floor(len / 100); i++)
    {
        if (i === Math.floor(len / 100))
            lim = len - os;
        url = "https://api.spotify.com/v1/users/" + userid + "/playlists/" + plid + "/tracks?offset=" + os + "&limit=" + lim;
        $.ajax(url, {
            dataType: 'json',
            data: null,
            limit: lim,
            offset: os,
            async: false,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (r) {
                getTracks(r);
            },
            error: function (r) {
                confirm("FAIL");
                getTracks(null);
            }
        });
        os = os + 100;
    }


}

function getTracks(r)
{
    $("#songlist").show();
    console.log("TRACKS", r);
        for (var i = 0; i < r.items.length; i++)
        {
            daString.push(r.items[i].track.name + ":::" + r.items[i].track.artists[0].name + ":::" + r.items[i].track.album.name);
        }
}


function getSongs()
{
    var list = $("#songlist");
    for (var i = 0; i < daString.length; i++)
    {
        list.append('<p id = "song">' + daString[i] + "</p>");
    }
}

function clearSongs() {
    daString = [];
    $("#songlist").text("");
}

function importSpotify() {

    //authorizeSpotifyUser();
    //getToken();
    //callSpotify("https://api.spotify.com/v1/me", null, cbBeta());



}

function cbBeta(r)
{
    var user = r.id;
    var url = "https://api.spotify.com/v1/users/" + user + "/playlists?name=ImportedPlayList&public=false";
    callSpotify(url, null, cbBeta());

}

function cbCharlie(r)
{
    playlistToWrite = r;

    for (var i = 0; i < daString.length; i++)
    {
        var res = daString[i].split(":::");
        var url = "https://api.spotify.com/v1/search?q=name:" + res[0] + "%20artist:" + res[1] + "%20album:" + res[2] + "&type=track";
        callSpotify(url, null, cbDelta);
    }

}


function cbDelta(r)
{
    console.log(r);

}

function comingSoon(str)
{
    $("#err").text(str);
}


function authorizeItunesUser()
{
    comingSoon("iTunes functionality coming as soon as iTunes API comes out");
}

function authorizeGMusicUser()
{
    comingSoon("Google Music functionality coming soon");
}

function importItunes()
{
    comingSoon("iTunes functionality coming as soon as iTunes API comes out");
}

function importGMusic()
{
    comingSoon("Google Music functionality coming soon");
}