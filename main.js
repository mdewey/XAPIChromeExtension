$(function(){
	 chrome.tabs.getCurrent(function(tab)
	{
		chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
			 var activeTab = arrayOfTabs[0];
			 var title = activeTab.title;
			 var url = activeTab.url;
			
			 var lrs = getLRSFromStorage();
			 
			 var email = lrs.email;
			 var endpoint = lrs.endpoint +"/statements";
		     var username = lrs.username;
			 var password = lrs.password;
		
			 var statement = {
								"actor": {
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


