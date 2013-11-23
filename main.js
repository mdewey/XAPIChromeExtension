function sendStatement(lrs, title, url)
{

	var email = lrs.email;
	var endpoint = lrs.endpoint +"/statements";
	var username = lrs.username;
	var password = lrs.password;

	var statement = {"actor": {
						"objectType": "Agent", 
						"mbox":"mailto:" + lrs.email
					},
					"verb" : { 
						"id":"http://example.com/learned", 
						"display":{
							"en-US":"learned"
						} 
					},
					"object":{
						"id":url,
						"definition":{
							"name":{ 
								"en-US":title 
							},
							"description":{ 
								"en-US":"I did this site." 
							}
						}
					}
				};

	if (!window.btoa) {
		window.btoa = function (str) {
			return Base64.encode(str);
		}
	}
	
	var encodedPassword = btoa(username+":"+password);
	
	$.ajax({
		type: "POST",
		url: endpoint,
		async: true,
		headers: {"Authorization": "Basic "+encodedPassword, "X-Experience-API-Version" : "1.0.0"},
		password: password,
		data: JSON.stringify(statement),
		contentType:"application/json; charset=utf-8",
		success: function (){
			$("#output").hide();
			$("#success").show();
			$("#success").append("&nbsp;|&nbsp;");
			successCount++;
			MonitorCompletion (successCount + errorCount)
			
		},
		error: function( jqXHR, textStatus, errorThrown ){
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
			$("#failed").show();
			$("#failedCount").append("&nbsp;|&nbsp;");
			errorCount++;
			MonitorCompletion (successCount + errorCount)
			errors.push(lrs);
			var newLi = $("<li>").html(lrs.endpoint);
			$("#errorList").append(newLi);
			
			
		}
	});
}

var successCount = 0;
var errorCount = 0;
var errors = [];
var countOfLRS = 0;

function MonitorCompletion(countDone)
{
	if (countDone === countOfLRS)
	{
		console.log("done");
		$("#complete").show();
	}
}

$(function(){
	$("#showErrorButton").click(function() {console.log("got ehre"); $("#errors").toggle();});
	chrome.tabs.getCurrent(function(tab){
		chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
			var activeTab = arrayOfTabs[0];
			var title = activeTab.title;
			var url = activeTab.url;
			var allLRss = getAllLRSFromStorage();
			console.log(allLRss);
			countOfLRS = allLRss.length	
			if(countOfLRS > 0)
			{
				for (var i = 0; i < allLRss.length; i++)
				{
					sendStatement(allLRss[i], title, url);
				}			
			}
			else
			{
				$("#output").html("Please go the options and fill in an LRS to track what you are learning");
			}
		});
	});
});
	 
		
			
			
		
		
	
	
	



