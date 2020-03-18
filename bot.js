var cheerio = require("cheerio"); /* Used to extract html content, based on jQuery || install with npm install cheerio */
var request = require("request"); /* Used to make requests to URLs and fetch response  || install with npm install request */
 
var discord = require("discord.js");
var client = new discord.Client();
 
 
// Login into discord using bot token (do not share token with anyone!).
client.login(process.env.BOT_TOKEN);
 
client.on("ready", function() {
    console.log("logged in");
});
 
client.on("message", function(message) {
 
    var parts = message.content.split(" "); // Splits message into an array for every space, our layout: "<command> [search query]" will become ["<command>", "search query"]
 
    /* Simple command manager */
    if (parts[0] === "!bghit") { // Check if first part of message is image command
 
        // call the image function
        image(message, parts); // Pass requester message to image function
 
    }
 
    if(parts.search("rbk") || parts.search("rabk") || parts.search("rab"))
    {
        message.channel.send("@"+message.member.id +" Matb9arch t3ayr rab hadak weld l97ba ")
    }
   
    if (parts[0]=== "!wach")
    {
        var rnd = Math.floor(Math.random() * 10);
        
        if(parts[1] === "ana" )
        {
            if(parts[2] === "ghadi")
            {
                var s = parts.slice(2).join(" ");

                if(rnd>5)
                {
                    message.channel.send("ah a sat nta chi nhar "+s)
                }
                else
                {
                    message.channel.send("la a sat nta ma3mrk ghadi "+s)
                }
            }
            else
            {
                var s =  parts.slice(2).join(" ");

                if(rnd>5)
                {
                    message.channel.send("ah nta " + s);
                }
                else
                {
                    message.channel.send("la nta machi " + s);
                }
            }
             
        }
        else if(parts[1] === "ghadi")
        {
            var s =  parts.slice(2).join(" ");
            if(rnd>5)
            {
                message.channel.send("ah a sat ghadi t"+s);
            }
            else
            {
                message.channel.send("la a sat ma3mrk ghadi t"+s);
            }
        }
        else
        {
            var s =  parts.slice(1).join(" ");

            if(rnd>5)
            {
                message.channel.send("Ah " + s);
            }
            else
            {
                message.channel.send("La " + s);
            }
            
            
        }

    }
 
});
 
function image(message, parts) {
 
    /* extract search query from message */
 
    var search = parts.slice(1).join(" "); // Slices of the command part of the array ["!image", "cute", "dog"] ---> ["cute", "dog"] ---> "cute dog"
    
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + search,
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };
    




    
    request(options, function(error, response, responseBody) {
        if (error) {
            // handle error
            return;
        }
 
        /* Extract image URLs from responseBody using cheerio */
 
        $ = cheerio.load(responseBody); // load responseBody into cheerio (jQuery)
 
        // In this search engine they use ".image a.link" as their css selector for image links
        var links = $(".image a.link");
 
        // We want to fetch the URLs not the DOM nodes, we do this with jQuery's .attr() function
        // this line might be hard to understand but it goes thru all the links (DOM) and stores each url in an array called urls
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        console.log(urls);
        if (!urls.length) {
            // Handle no results
            return;
        }
 
        // Send result
        var rnd = Math.floor(Math.random() * 10)
        message.channel.send({files: [urls[rnd]]});
    });
 
}
