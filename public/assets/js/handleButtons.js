//obtains the data from the file

function displaySong(fileName, divLocation)
{
	$.get(fileName, function(data) {
		//process text file line by line
		document.getElementById(divLocation).innerHTML = data;
	});
}

// JQuery event handlers

$("#artist").change(function(){
	$("#album").empty();
	$("#songs").empty();
	$("#types").empty();
	$("#lyrics").empty();
	AJAXPopulateAlbums();
	$("#artist").trigger("chosen:updated");
});

$("#album").change(function(){
	$("#songs").empty();
	$("#types").empty();
	$("#lyrics").empty();
	AJAXPopulateSongs();
	$("#album").trigger("chosen:updated");
});

$("#songs").change(function(){
	$("#types").empty();
	$("#lyrics").empty();
	displaySongs();
	$("#songs").trigger("chosen:updated");
});


//AJAX methods to populate the dropdowns 

function AJAXPopulateArtists()
{
	//get a reference to the select element
	$artistPicker = $('#artist');
	//request the JSON data and parse into the select element
	$.ajax({
	  url: '../assets/json/kpoplyrics.json',
	  dataType:'json',
	  success:function(data){
		$artistPicker.append('<option id="Select">-- Select an Artist --</option>');
		//iterate over the data and append a select option
		$.each(data.artists, function(key, val){
		  $artistPicker.append('<option id="' + val.id + '">' + val.name + '</option>');
		})
		
	  },
	  error:function(){
		//if there is an error append a 'none available' option
		$artistPicker.html('<option id="-1">none available</option>');
	  }
	});
}

function AJAXPopulateAlbums()
{
	//get a reference to the select element
	$albumPicker = $('#album');
	//request the JSON data and parse into the select element
	$.ajax({
	  url: '../assets/json/kpoplyrics.json',
	  dataType:'json',
	  success:function(data){
		//compare the values from artists->albums
		loadArtists = 0;
		$albumPicker.append('<option id="Select">-- Select an Album --</option>');
		$.each(data.artists, function(key, val){
			if(val.name === $("#artist option:selected").text())
			{  
				return false;
			}
			loadArtists++;
		});
		if(data.artists[loadArtists] === undefined)
		{
			//do nothing
		}
		else
		{
			$.each(data.artists[loadArtists].albums, function(key, val){
				$albumPicker.append('<option id="' + val.id + '">' + val.name + '</option>');
			});
		}
	  },
	  error:function(){
		//if there is an error append a 'none available' option
		$albumPicker.html('<option id="-1">none available</option>');
	  }
	});
}

function AJAXPopulateSongs()
{
	//get a reference to the select element
	$songPicker = $('#songs');
	//request the JSON data and parse into the select element
	$.ajax({
	  url: '../assets/json/kpoplyrics.json',
	  dataType:'json',
	  success:function(data){
		//compare the values from artists->albums
		loadArtists = 0;
		$songPicker.append('<option id="Select">-- Select a Song --</option>');
		$.each(data.artists, function(key, val){
			if(val.name === $("#artist option:selected").text())
			{  
				return false;
			}
			loadArtists++;
		});
		//compare the values from albums->songs
		loadAlbums = 0;
		$.each(data.artists[loadArtists].albums, function(key, val){
			if(val.name === $("#album option:selected").text())
			{  
				return false;
			}
			loadAlbums++;
		});
		
		$.each(data.artists[loadArtists].albums[loadAlbums].songs, function(key, val){
		  $songPicker.append('<option id="' + val.id + '">' + val.name + '</option>');
		})
	  },
	  error:function(){
		//if there is an error append a 'none available' option
		$songPicker.html('<option id="-1">none available</option>');
	  }
	});
}

function displaySongs()
{
	//request the JSON data and parse into the select element
	$.ajax({
	  url: '../assets/json/kpoplyrics.json',
	  dataType:'json',
	  success:function(data){
		//compare the values from artists->albums
		loadArtists = 0;
		$.each(data.artists, function(key, val){
			if(val.name === $("#artist option:selected").text())
			{  
				return false;
			}
			loadArtists++;
		});
		//compare the values from albums->songs
		loadAlbums = 0;
		$.each(data.artists[loadArtists].albums, function(key, val){
			if(val.name === $("#album option:selected").text())
			{  
				return false;
			}
			loadAlbums++;
		});
		//compare the values from songs->types
		loadSongs = 0;
		$.each(data.artists[loadArtists].albums[loadAlbums].songs, function(key, val){
			if(val.name === $("#songs option:selected").text())
			{  
				return false;
			}
			loadSongs++;
		});
		//load the yt video
		//display the title
		document.getElementById("songTitle").innerHTML = $("#songs option:selected").text();
		//add the three references to the types so you can display the song
		englishRef = data.artists[loadArtists].albums[loadAlbums].songs[loadSongs].english;
		hangulRef = data.artists[loadArtists].albums[loadAlbums].songs[loadSongs].hangeul;
		romanRef = data.artists[loadArtists].albums[loadAlbums].songs[loadSongs].romanized;
		group = data.artists[loadArtists].albums[loadAlbums].songs[loadSongs].group;
		console.log(englishRef);
		displaySong(englishRef, "english");
		displaySong(hangulRef, "hangul");
		displaySong(romanRef, "roman");
		
		//display the group
		displaySong(group, "group");
	  },
	  error:function(){
		//if there is an error append a 'none available' option
		$typesPicker.html('<option id="-1">none available</option>');
	  }
	});
}

//initially we must populate the artists
AJAXPopulateArtists();

