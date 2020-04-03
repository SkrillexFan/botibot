var cheerio = require("cheerio"); /* Used to extract html content, based on jQuery || install with npm install cheerio */
var request = require("request"); /* Used to make requests to URLs and fetch response  || install with npm install request */
var getJSON = require('get-json');
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
    if(parts.includes("!ping"))
     {
        var ping = Date.now() - message.createdTimestamp + " ms";
        message.channel.sendMessage("Ping dyalk a 7bibi howa `" + `${Date.now() - message.createdTimestamp}` + " ms` ");
     }
 
    if(parts.includes("!corona"))
     {
            
         
        getJSON('https://coronavirus-19-api.herokuapp.com/countries/morocco', function(error, response){
            var cases = response.cases;
            var today = response.todayCases;
            var deaths = response.deaths;
            var tdeaths = response.todayDeaths;
            var recovered = response.recovered;
            var critical = response.critical;
            const embed = {
                "url": "https://www.worldometers.info/coronavirus/",
                "color": 5868089,
                "footer": {
                  "icon_url": "https://cdn.discordapp.com/attachments/658879571520913408/666277021311041547/3.0.png",
                  "text": "kamlin ghadi nmoto ila matata"
                },
                "author": {
                  "name": "Corona tnik mon kho",
                  "url": "https://discordapp.com",
                  "icon_url": "https://cdn.discordapp.com/attachments/658879571520913408/666277021311041547/3.0.png"
                },
                "fields": [
                  {
                    "name": "Active Cases",
                    "value": "`"+cases+"`",
                    "inline": true
                  },
                  {
                    "name": "New Cases",
                    "value": "`+"+today+"`"
                  },
                  {
                    "name": "Total Deaths",
                    "value": "`"+deaths+"`"
                  },
                  {
                    "name": "New Deaths",
                    "value": "`+"+tdeaths+"`"
                  },
                  {
                    "name": "Recovered",
                    "value": "`"+recovered+"`"
                  },
                  {
                    "name": "Critical",
                    "value": "`"+critical+"`"
                  }
                ]
              };
              message.channel.send({ embed });
            
        })
     }
  if(parts[0]=="!wjah")
    {
          const avatar = message.mentions.users.first() || message.author;
          const user = message.author;
          let username = user.username;
          const embed = {
            "color": 5868089,
            "description": "`"+username + " bgha tswira ta3 " + avatar.username + "`"
            ,
            "image": {
              "url": avatar.avatarURL
            },
            "author": {
              "name": username,
              "icon_url": user.avatarURL
            }
          };
          message.channel.send({embed});

    }
 
    if(parts[0]=="!mosa3ada")
    {
        const embed = new discord.RichEmbed()
        .setTitle("Hachno t9dr dir akhay sat bro 7bibi")
        .setAuthor("ROJOLA", "","https://cdn.discordapp.com/attachments/658879571520913408/666277021311041547/3.0.png")
        .setColor("#598a39")
        .setDescription("`!bghit` | `!wach` | `!ping` | `!corona`" | `!wjah`)
        message.channel.send({embed})
    }
 
    if(parts.includes("rbk"))
    {
        message.channel.send("<@"+message.member.id+"> Matb9ach t3ayr lah a weld l97ba")
    }
 
    if(parts.includes("rbo"))
    {
        message.channel.send("<@"+message.member.id+"> Matb9ach t3ayr lah a weld l97ba")
    }

    if(parts.includes("rabk"))
    {
        message.channel.send("<@"+message.member.id+"> Matb9ach t3ayr lah a weld l97ba")
    }
    if(parts.includes("rab"))
    {
        message.channel.send("<@"+message.member.id+"> Matb9ach t3ayr lah a weld l97ba")
    }

   
    if (parts[0]=== "!wach")
    {
        parts = check(parts);
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
                    s.replace("kayn","makaynch")
                    message.channel.send("la a sat nta ma3mrk ghadi "+s)
                }
            }
            else
            {
                parts = check(parts);
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
            parts = check(parts);
            var s =  parts.slice(2).join(" ");
            if(rnd>5)
            {
                message.channel.send("ah a sat ghadi "+s);
            }
            else
            {
                message.channel.send("la a sat ma3mrk ghadi "+s);
            }
        }
        else
        {
            parts = check(parts);
            var s =  parts.slice(1).join(" ");

            if(rnd>5)
            {
                message.channel.send("Ah " + s);
            }
            else
            {
                s.replace("kayn","makaynch")
                message.channel.send("La " + s);
            }
            
            
        }

    }
 
});
 function check(arr){
    var res=[];
    for(x of arr)
    {
    	if(x.endsWith("ni"))
        {
        	var s = x.replace(/ni\b/,"k")
            res.push(s);
            
        }
        else if(x.startsWith("n"))
        {
        	res.push(x.replace("n","t"))
        }
        else
        {
        	res.push(x);
        }
    }
    return res;
}
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
        const user = message.author;
        let username = user.username
        let avatar = user.avatarURL;
        let query = parts.slice(1).join(" ");
       // let url = urls[rnd];
        let url = urls[rnd];
       // message.channel.send(url)
        const embed = {
            "color": 5868089,
            "description": query
            ,
            "image": {
              "url": url
            },
            "author": {
              "name": username,
              "icon_url": avatar
            }
          };
     
          message.channel.send({ embed });
      //  message.channel.send({files: [urls[rnd]]});
    });
 
}
