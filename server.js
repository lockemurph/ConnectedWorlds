var http = require("http");
var url = require("url");


function start(router)
{
   http.createServer(function(request, response)
   {
		var pathname = url.parse(request.url).pathname;
		router(pathname);

		var fullBody = '';

		request.on('data', function(chunk)
		{
		    fullBody+=chunk;
    	});

    	request.on('end', function()
    	{

			var databaseUrl = "ludem:candycandy@ds063809.mongolab.com:63809/murphdb"; // "username:password@example.com/mydb"
    		var collections = ["stars"]
    		var db = require("mongojs").connect(databaseUrl, collections);
    		console.log(pathname);
            if(pathname == "/load")
            {
					console.log(pathname);
					var galaxy = db.stars.find();
									var galaxyAsText ="";

									db.stars.find(function(err, starss)
									{
										if( err || !starss)
										{
											 console.log("No stars found");
										}
										else
										{
											starss.forEach( function(star)
											{
											   galaxyAsText += star.xpos + "," + star.ypos + "," + star.subimage + "," + star.name + ",";
											});

										response.writeHead(200, {"Content-Type" : "text/plain"});
										response.write(galaxyAsText);
										response.end();
					      			   }
    		     });



			}
            else
            {
		    		console.log(pathname);
					var json = JSON.parse(fullBody);

    		db.stars.save(json, function(err, saved)
    		{
				if( err || !saved )
				{
					console.log("Star not saved");
				}

				var galaxy = db.stars.find();
				var galaxyAsText ="";

				db.stars.find(function(err, starss)
				{
					if( err || !starss)
					{
						 console.log("No stars found");
					}
					else
					{
						starss.forEach( function(star)
						{
						   galaxyAsText += star.xpos + "," + star.ypos + "," + star.subimage + "," + star.name + ",";
						});

					response.writeHead(200, {"Content-Type" : "text/plain"});
					response.write(galaxyAsText);
					response.end();
      			   }
    		     });


		});
}

    });


}).listen(8888);

console.log("Start Server");

}
exports.start = start;