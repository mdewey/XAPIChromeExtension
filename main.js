var lrsURL = "https://glass.waxlrs.com/TCAPI/statements";
var userName = "Rn64adyD1CfS1fZq7DEJ";
var password = "NlWDNSGKgTzMWP0tTrzm";

$(function(){
	$( "#tabs" ).tabs();
	
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
			 
			 $("#debug").html(JSON.stringify(statement));
			 $("#title").html(activeTab.title);
			 $("#url").html(activeTab.url);
			  if (!window.btoa) {
				window.btoa = function (str) {
					return Base64.encode(str);
				}
			}
			var encodedPassword = btoa(userName+":"+password);
			console.log(statement);
			 $.ajax
			({
			  type: "POST",
			  url: lrsURL,
			  async: true,
			  headers: {"Authorization": "Basic "+encodedPassword},
			  password: password,
			  data: JSON.stringify(statement),
			  contentType:"application/json; charset=utf-8",
			  success: function (){
				alert('Check your LRS'); 
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


