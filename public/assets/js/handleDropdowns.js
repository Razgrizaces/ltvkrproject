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

function AJAXPopulateLTVs()
{
	//reference the selected element
	$LTVPicker = $('#ltvs');
	memberId = 0;
	ltvId = 0;
	//request json data and parse into the selected element
	$.ajax({
	  url: '../assets/json/text.json',
	  dataType:'json',
	  success:function(data){
			$LTVPicker.append('<option id="Select">-- Select the Arc --</option>');
			$.each(data.arcs, function(key, val){
			//find the correct member/arc
			if(data.arcs[key].member === $("#member option:selected").text()){return;}
			memberId++;
			})
			console.log(memberId);
			if(data.arcs[memberId] !== undefined){
				$.each(data.arcs[memberId].ltvs, function(key, ltvVal){
					console.log(ltvVal.title);
					$LTVPicker.append('<option id="' + ltvId + '">' + ltvVal.title + '</option>');
					console.log($LTVPicker)
					ltvId++;
				})
			}
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
