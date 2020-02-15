const Discord = require('discord.js');
var cheerio = require("cheerio");
var request = require("request");

const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret

 

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on("message", function(message) {
 
    var parts = message.content.split(" "); // Splits message into an array for every space, our layout: "<command> [search query]" will become ["<command>", "search query"]
 
    
    if (parts[0] === "!bghit") { 
 
        
        image(message, parts); 
 
    }
 
});

function image(message, parts) {
 
    
 
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
        message.channel.send({files: [urls[0]]});
    });
 
client.on('message', message => {

    if (message.content === 'zab') {

       message.reply('zob');

       }

})

// THIS  MUST  BE  THIS  WAY


