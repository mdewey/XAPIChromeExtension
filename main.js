
var lrsURL = localStorage["LRSendPoint"];
var endpoint = lrsURL +"/statements";
var userName = localStorage["username"];
var password = localStorage["password"];


$(function(){
	 chrome.tabs.getCurrent(function(tab)
	{
		chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
			 var activeTab = arrayOfTabs[0];
			 var title = activeTab.title;
			 var url = activeTab.url;
			
			 var statement = {
								"actor": {
									"objectType": "Agent", 
									"mbox":"mailto:test@example.com" 
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
			var encodedPassword = btoa(userName+":"+password);
			 $.ajax({
			  type: "POST",
			  url: endpoint,
			  async: true,
			  headers: {"Authorization": "Basic "+encodedPassword},
			  password: password,
			  data: JSON.stringify(statement),
			  contentType:"application/json; charset=utf-8",
			  success: function (){
				$("#output").html("Success");
			  },
			   error: function( jqXHR, textStatus, errorThrown )
			   {
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			   }
			});
			 
		});
	});
	}
);


