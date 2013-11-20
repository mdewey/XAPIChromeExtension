//TODO: load from storage and populate on settings load

// Saves options to localStorage.
function save_options() {
  var allParents = $(".js-parent");
  var allLRSs = []
  allParents.each(function(item, element){
	
	var email = $(element).find(".email").val();
	var lrs = $(element).find(".lrs").val();
	var usr = $(element).find(".username").val();
	var pwd = $(element).find(".password").val();

	
	var thisLRS = 
	{
		email : email,
		endpoint : lrs,
		username : usr, 
		password : pwd
	};

	if (!(typeof email != 'undefined' && typeof lrs != 'undefined' && typeof usr != 'undefined' && typeof pwd != 'undefined'))
	{
		console.log("not saving: ");
		console.log(thisLRS);
	}
	else
	{
		allLRSs.push(thisLRS);
	}
  });
    
	setAllLRSFromStorage(allLRSs);
	
  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

function addMore(){
	var number = 1 + Math.floor(Math.random() * 6);
	var removeButton = $("<button>").html("-").click(function() {
			$(this).parent().remove();
		
	});
	var emailLabel = $("<div>").html("My email for this LRS");
	var lrsLabel = $("<div>").html("LRS Endpoint");
	var usernameLabel = $("<div>").html("User name");
	var passwordLabel = $("<div>").html("Password");
	var br = $("<br/>");
	
	var emailTextBox = $("<input>").attr("type", "email").attr("class", "email").attr("placeholder", "email@something.com");
	var lrsTextBox = $("<input>").attr("type", "text").attr("class", "lrs").attr("placeholder", "ex:https://glass.waxlrs.com/TCAPI/");
	var userTextBox = $("<input>").attr("type", "text").attr("class", "username").attr("placeholder", "user name for basic ath");
	var pwdTextBox = $("<input>").attr("type", "text").attr("class", "password").attr("placeholder", "password for basic auth");
	
	var anotherOne = $("<div class='js-parent'>")
		.append(emailLabel)
		.append(emailTextBox)
		.append(br)                                 
		.append(lrsLabel)
		.append(lrsTextBox)
		.append(br)
		.append(usernameLabel)
		.append(userTextBox)
		.append(br)
		.append(passwordLabel)
		.append(pwdTextBox)
		.append(removeButton);
	$("#container").append(anotherOne);	
}

function addOne(lrs)
{
	var number = 1 + Math.floor(Math.random() * 6);
	var removeButton = $("<button>").html("-").click(function() {
			$(this).parent().remove();
		
	});
	var emailLabel = $("<div>").html("My email for this LRS");
	var lrsLabel = $("<div>").html("LRS Endpoint");
	var usernameLabel = $("<div>").html("User name");
	var passwordLabel = $("<div>").html("Password");
	var br = $("<br/>");
	
	var emailTextBox = $("<input>").attr("type", "email").attr("class", "email").attr("placeholder", "email@something.com").val(lrs.email);
	var lrsTextBox = $("<input>").attr("type", "text").attr("class", "lrs").attr("placeholder", "ex:https://glass.waxlrs.com/TCAPI/").val(lrs.endpoint);
	var userTextBox = $("<input>").attr("type", "text").attr("class", "username").attr("placeholder", "user name for basic ath").val(lrs.username);
	var pwdTextBox = $("<input>").attr("type", "text").attr("class", "password").attr("placeholder", "password for basic auth").val(lrs.password);
	
	var anotherOne = $("<div class='js-parent'>")
		.append(emailLabel)
		.append(emailTextBox)
		.append(br)                                 
		.append(lrsLabel)
		.append(lrsTextBox)
		.append(br)
		.append(usernameLabel)
		.append(userTextBox)
		.append(br)
		.append(passwordLabel)
		.append(pwdTextBox)
		.append(removeButton);
	$("#container").append(anotherOne);	
}

// Restores select box state to saved value from localStorage.
function restore_options() {
	var lrss = getAllLRSFromStorage();
	
	for (var i = 0; i < lrss.length; i++)
	{
		addOne(lrss[i]);
	}
	
	if (lrss.length === 0)
	{
		addOne();
	}
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
document.querySelector('#addMore').addEventListener('click', addMore);
