const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const bot = new discord.Client();

bot.on("ready", async () => {

    console.log(`${bot.user.username} is klaar voor gebruik!`)

    bot.user.setActivity("BOT IS NOG IN TESTING", { type: "PLAYING" });
})

bot.on("message", async message => {

    // Als bot bericht stuurt stuur dan return
    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);

    if (command === `${prefix}Hallo`) {

        return message.channel.send("Hallo daar!!")


    }

    if (command === `${prefix}Info`) {

        var botIcon = bot.user.displayAvatarURL;

        var botEmbed = new discord.RichEmbed()
            .setDescription("discord bot info")
            .setColor("#00ffed")
            .setThumbnail(botIcon)
            .addField("Bot naam", "PretPark bot ")
            .addField("Het 1 commando is ", "!Hallo")
            .addField("Het 2 de commando is", "!Info")
            .addField("Het 3 de commando is", "!ServerInfo")
            .addField("De server bot is gemaakt door", "Keano")
            .addField("STAFF COMANDS ", "Hoe kom je bie de commands voor staff doe !Staff")
            .addField("De bot is gemaakt op", bot.user.createdAt)

        return message.channel.send(botEmbed);

    };
    if (command === `${prefix}Staff`) {

        var botIcon = bot.user.displayAvatarURL;

        var botEmbed = new discord.RichEmbed()
            .setDescription("Staff commands")
            .setColor("#00ffed")
            .setThumbnail(botIcon)
            .addField("STAFF", " Dit zijn de staff commands ")
            .addField("Numer 1 van staff commands ", "!Kick @KeanoTTje Bevoorbeeld")
            .addField("Numer 2 van staff commands ", "!Ban KeanoTTje stout doen bevoorbeeld")
            .addField("De bot is gemaakt op", bot.user.createdAt);

        return message.channel.send(botEmbed);

    };


    if (command === `${prefix}ServerInfo`) {

        var icon = message.guild.iconURL

        var serverEmbed = new discord.RichEmbed()
            .setDescription("Server Info")
            .setColor("#00ffed")
            .setThumbnail(icon)
            .addField("Bot naam", bot.user.username)
            .addField("Je bent op de server gekomen op", message.member.joinedAt)
            .addField("Hoeveel leden zijn er", message.guild.memberCount)
            .addField("De server en de bot is gemaakt", "Door Keano")

        return message.channel.send(serverEmbed);
    }

    if (command === `${prefix}Kick`) {

        var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));

        if (!kickUser) return message.channel.send("Deze gebruiker bestaat moet of niet gevoden je kan je zelf niet kicken");

        var reason = arguments.join(" ").slice(22);
        if (!reason) return message.channel.send("Geef een reden op.");
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Hey je hebd geen rank om dit de doen ");
        if (kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Hey daar je bend een admin dus je kan geen staffleden kicken  aleen maar leden");

        var kick = new discord.RichEmbed()
            .setDescription("Kick")
            .setColor("#ee0000")
            .addField("Welke pershoon is er weg", kickUser)
            .addField("Door welk stafflid is deeze pershoon gekicht", message.author)
            .addField("Wat is de reden?", reason);

        var kickChanel = message.guild.channels.find(`name`, "kbn");
        if (!kickChanel) return message.guild.send("Hey we kunen het kanaal niet vinden maak dan het kanaal");

        message.guild.member(kickUser).kick(reason);


        kickChanel.send(kick);

        return;

    }

    if (command === `${prefix}Ban`) {

        var banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));

        if (!banUser) return message.channel.send("Deze gebruiker bestaat niet gevoden je kan je zelf niet banen");

        var reason = arguments.join(" ").slice(22);
        if (!reason) return message.channel.send("Geef een reden op.");
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Hey je heb geen rank om dit de doen ");
        if (banUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Hey daar je bend een admin dus je kan geen staffledenNiet banen  aleen maar leden");

        var kick = new discord.RichEmbed()
            .setDescription("Ban")
            .setColor("#ee0000")
            .addField("Welke pershoon is er weg", banUser)
            .addField("Door welk stafflid is deeze pershoon gekicht", message.author)
            .addField("Wat is de reden?", reason);

        var banChanel = message.guild.channels.find(`name`, "kbn");
        if (!banChanel) return message.guild.send("Hey we kunen het kanaal niet vinden maak dan het kanaal");

        message.guild.member(banUser).ban(reason);


        banChanel.send(ban);


        return;

    }





});

bot.login(botConfig.token);
