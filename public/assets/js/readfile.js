var HTML_FILE_URL = 'assets/twice/twicetagram/likey_roman.txt';

//obtains the data from the file

//once we have the data, covert the data into colors...
var lyrics = "";
function dataToColors(fileName)
{
	jQuery.get(fileName, function(data) {
		//process text file line by line
		document.getElementById('lyrics').innerHTML = data;
	});
}
dataToColors(HTML_FILE_URL);