//obtains the data from the file

function displayElement(fileName, divLocation)
{
	$.get(fileName, function(data) {
		//process text file line by line
		document.getElementById(divLocation).innerHTML = data;
	});
}

$("member").change(function(){
	$("ltv").empty();
	AJAXPopulateLTVs();
})

function AJAXPopulateLTVs()
{
	//reference the selected element
	$LTVPicker = $('#ltv');
	//request json data and parse into the selected element
	$.ajax({
	  url: '../assets/json/text.json',
	  dataType:'json',
	  success:function(data){
		$LTVPicker.append('<option id="Select">-- Select the LTV --</option>');
		//iterate over the data and append a select option
		$.each(arcs.members.title, function(key, ltvVal){
			$LTVPicker.append('<option id="' + ltvVal.id + '">' + ltvVal.name + '</option>');
		})
	  },
	  error:function(){
		//if there is an error append a 'none available' option
		$LTVPicker.html('<option id="-1">none available</option>');
	  }
	});
}

function AJAXPopulateMembers()
{
	//reference the selected element
	$memberPicker = $("member");
	//request json data and parse into the selected element
	$.ajax({
		console.log(JSON.parse("assets/text.json"))
	});
}

AJAXPopulateMembers();