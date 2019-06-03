//obtains the data from the file

function displayElement(fileName, divLocation)
{
	$.get(fileName, function(data) {
		//process text file line by line
		document.getElementById(divLocation).innerHTML = data;
	});
}

$("#member").change(function(){
	$("#ltvs").empty();
	AJAXPopulateLTVs();
	$("#member").trigger("chosen:updated");
});

$("#ltvs").change(function(){
	$("#vid iframe").prop("src", "");
	$("#text").empty();
	AJAXPopulatePage();
	$("#ltvs").trigger("chosen:updated");
});


var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;


function onYouTubeIframeAPIReady() {
	player = new YT.Player('vid', {
		videoId: '',
		events: {
			'onReady': onPlayerReady,
			'loadLTV': loadLTV
		}	
	});
}
// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	player.setSize(
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function loadLTV(e) {
    var href;
    var target = e.target || e.srcElement;
    if (target.tagName === 'A') {
        href = target.getAttribute('href');
		//tell the browser not to respond to the link click
		e.preventDefault();
		console.log(href);
    }
}

//listen for link click events at the document level
if (document.addEventListener) {
    document.addEventListener('click', loadLTV);
} else if (document.attachEvent) {
    document.attachEvent('onclick', loadLTV);
}

function AJAXPopulatePage()
{
	$.ajax({
		url: '../assets/json/text.json',
		dataType:'json',
		success:function(data){
			var currLTV = $("#ltvs option:selected").text();
			var LTVId = parseInt(currLTV.substring(1));
			console.log(LTVId);
			var memberID = 0;
			$.each(data.arcs, function(key, val){
			//find the correct member/arc
				if(data.arcs[key].member === $("#member option:selected").text()){return;}
				memberID++;
			})
			var link = data.arcs[memberID].ltvs[LTVId-1].link;
			// populate quotes
			$("#text").append("<h1>Quotes</h1>");
			$("#text").append("<table>");
			$("#text").append("<tr><th>Quotes</th><th>Translation</th></tr>");
			$.each(data.arcs[memberID].ltvs[LTVId-1].quotes, function(key, val){
				var timestampLink = data.arcs[memberID].ltvs[LTVId-1].link + val.timestamp
				$("#text").append("<tr><th><a href=" + timestampLink + ">"+val.korean+"</a></th><th><a href=" + timestampLink + ">" +val.translation + "</a></th></tr>");
			})
			$("#text").append("</table>");
			
			$("#text").append("<p></p>");
			$("#text").append("<h1>Definitons</h1>");
			$("#text").append("<table>");
			$("#text").append("<tr><th>English</th><th>Korean</th><th>POS (Part of Speech)</th></tr>");
			$.each(data.arcs[memberID].ltvs[LTVId-1].definitions, function(key, val){
				$("#text").append("<tr><th>"+val.korean+"</th><th>"+val.translation+"</th><th>"+val.pos+"</th></tr>");
			})
			$("#text").append("</table>");
			
			//YT Player stuff to add the video
			player.loadVideoById(data.arcs[memberID].ltvs[LTVId-1].link, 0, "default");
		},
		error:function(){
			//if there is an error append a 'none available' option
			$LTVPicker.html('<option id="-1">none available</option>');
	  }
	});
}

function AJAXPopulateLTVs()
{
	//request json data and parse into the selected element
	$.ajax({
	  url: '../assets/json/text.json',
	  dataType:'json',
	  success:function(data){
			//reference the selected element
			var $LTVPicker = $('#ltvs');
			var memberId = 0;
			var ltvId = 0;
			$LTVPicker.append('<option id="Select">-- Select the LTV --</option>');
			$.each(data.arcs, function(key, val){
			//find the correct member/arc
				if(data.arcs[key].member === $("#member option:selected").text()){return;}
				memberId++;
			})
			console.log(memberId);
			//check if the member is undef
			if(data.arcs[memberId] !== undefined){
				//append for each LTV in the html for that member
				$.each(data.arcs[memberId].ltvs, function(key, ltvVal){
					console.log(ltvVal.title);
					$LTVPicker.append('<option id="' + ltvId + '">' + ltvVal.title + '</option>');
					console.log($LTVPicker)
					ltvId++;
				})
			}
		//refresh the picker
		$('.selectpicker').selectpicker('refresh');
	  },
	  error:function(){
		//if there is an error append a 'none available' option
		$LTVPicker.html('<option id="-1">none available</option>');
	  }
	});
}

function AJAXPopulateMembers()
{
	//request json data and parse into the selected element
	$.ajax({
	  url: '../assets/json/text.json',
	  dataType:'json',
	  success:function(data){
		 //reference the selected element
		$memberPicker = $('#member');
		currentMember = "";
		id = 0;
		$memberPicker.append('<option id="Select">-- Select the Arc --</option>');
		$.each(data.arcs, function(key, ltvVal){
			if(currentMember !== data.arcs[key].member)
			{
				currentMember = data.arcs[key].member;
				$memberPicker.append('<option id="' +id+ '">' +data.arcs[key].member+ '</option>');
				console.log(data.arcs[key].member);
				id++;
				console.log($memberPicker)
			}
		})
	  },
	  error:function(){
		//if there is an error append a 'none available' option
		$memberPicker.html('<option id="-1">none available</option>');
	  }
	});
}

$(document).ready(function() {
	AJAXPopulateMembers();
});
