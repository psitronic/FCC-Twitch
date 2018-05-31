
$(document).ready(function() {
	var streamName = ["freecodecamp","ESL_SC2","ninja", "highdistortion", "bobross", "annemunition", "AustenMarie", "noopkat", "smashstudios"];
	var url = "https://wind-bow.glitch.me/twitch-api/";

	var name = "";
	var status = "";
	var link = "";
	var logoLink = "";
	var online = false;
	var followers = 0;
	var nrow = 0;

	streamName.forEach((stream, index) => {

		if (index % 3 === 0) {
			nrow ++;
			$("#container").append("<div class='row' id='row" + nrow + "'></div>");
		}

		$("#row" + nrow).append("<div class='col-lg-4 col-sm-6'><div class='offline thumbnail' id='" + stream + "'></div></div>")

		$.when($.getJSON(url + "streams/" + stream + "?callback=?"),
			$.getJSON(url + "channels/" + stream + "?callback=?"))
				.then(function(data1, data2){

					// console.log(data1,data2);

					if(data1[0].stream === null){
						status = data2[0].status;
						name = data2[0].display_name;
						link = data2[0]._links.self;
						logoLink = data2[0].logo;
						followers = data2[0].followers;
						online = false;
					} else {
						status = data1[0].stream.channel.status;
						name = data1[0].stream.channel.display_name;
						link = data1[0]._links.self;
						logoLink = data1[0].stream.channel.logo;
						followers = data1[0].stream.channel.followers;
						online = true;
					}

					$("#" + stream).append("<a href='" + link + "' target='#' id='link_" + stream + "'></a>");

					$("#link_" + stream).append("<img class='logo responsive' src='" + logoLink + "'>");
					$("#link_" + stream).append("<div class='caption'><h3 class='name'>" + name +
						"</h3><p class='status'>" + status + "</p></div>");
					
					if (online) {
						$("#" + stream).removeClass("offline");
					}

				})
				.fail(error);
		});
});


function error() {
	console.log("Unable to retrieve data from Twitch-API");
};