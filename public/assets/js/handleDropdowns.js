//obtains the data from the file

function displayElement(fileName, divLocation)
{
	$.get(fileName, function(data) {
		//process text file line by line
		document.getElementById(divLocation).innerHTML = data;
	});
}

$("#member").change(function(){
	$("#ltv").empty();
	AJAXPopulateLTVs();
	$("#member").trigger("chosen:updated");
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
		$_.each(data.arcs,function(key, ltvVal){
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
	$memberPicker = $('#member');
	currentMember = "";
	id = 0;
	//request json data and parse into the selected element
	$.ajax({
	  url: '../assets/json/text.json',
	  dataType:'json',
	  
	  success:function(data){
			$memberPicker.append('<option id="Select">-- Select the Arc --</option>');
		  $.each(data.arcs, function(key, ltvVal){
				if(currentMember !== data.arcs[key].member)
				{
					currentMember = data.arcs[key].member;
					$memberPicker.append('<option id="' +id+ '">' +data.arcs[key].member+ '</option>');
					console.log(data.arcs[key].member);
					id++;
				}
		})
	  },
	  error:function(){
		//if there is an error append a 'none available' option
		$memberPicker.html('<option id="-1">none available</option>');
	  }
	});
}

$.fn.selectpicker.Constructor.BootstrapVersion = '4';

$(document).ready(function() {
	AJAXPopulateMembers();
};
