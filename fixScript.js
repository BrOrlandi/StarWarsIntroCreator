
var p = fetch('https://starwarsopening.firebaseio.com/openings.json');
p.then(function(data){
    return data.json();
}).then(function(data){
    var keys = Object.keys(data);
    var c = 0;
    for(var i=0;i<keys.length;i++){
        var k = keys[i];
        var obj = data[k];
        if(obj.text == "321321321"){
            c++;
            var fb = new Firebase('https://starwarsopening.firebaseio.com/openings/'+k);
            //fb.on("value", function(snapshot) {
            //    var o = snapshot.val();
            //    console.log(o);
            //});
            fb.remove();
        }
    }
    console.log(c);
});

// count script
var p = fetch('https://starwarsopening.firebaseio.com/openings.json');
p.then(function(data){
    return data.json();
}).then(function(data){
    var keys = Object.keys(data);
    console.log(keys.length);
});
