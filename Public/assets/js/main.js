var projects = document.getElementById("projects");

projects.addEventListener("click", function(){
	window.scrollTo({
		top:1500,
		bottom:0,
		behavior: "smooth"
	});
});

var email = document.getElementById("email");

email.addEventListener("click", function(){
	window.scrollTo({
		top:4500,
		bottom:0,
		behavior: "smooth"
	});
});

function sendEmail() {
	document.getElementById("passthrough").click();
};

