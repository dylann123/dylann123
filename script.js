let pagenum = 1
let scrolling = false
let lastScrollY = 0

window.scrollTo(0, 0)

$(document).bind("mousewheel", function (e) {
	stepPage(e.originalEvent.wheelDelta)
});

$(document).bind("keydown", function (e) {
	if (e.keyCode == 40)
		stepPage(-1)
	else if (e.keyCode == 38)
		stepPage(1)
})

function stepPage(delta) {
	if (scrolling)
		return
	scrolling = true
	if (delta < 0 && pagenum < 5)
		pagenum++
	else if (delta > 0 && pagenum > 1)
		pagenum--
	else {
		scrolling = false
		return
	}
	pageNumDisplay(delta < 0)
	let nextPage = document.getElementsByClassName("section")[pagenum - 1]
	$("html, body").animate(
		{ scrollTop: nextPage.offsetTop },
		1000,
		"easeInOutQuint"
	)
	let index = 2
	for(let img of document.getElementById("hexcontainer").children){
		if(pagenum == 2 && img.tagName == "IMG"){
			$(img).animate({opacity: 1}, 1000*index)
			index+=0.5
		}
	}
	if(pagenum == 1){
		document.getElementById("background-s1").style.opacity = "1"
	}else{
		document.getElementById("background-s1").style.opacity = "0.2"
	}
}

function pageNumDisplay(scrolldown) {
	let element = document.createElement("div");
	element.className = "pagenum pagenumafter"
	if (scrolldown) {
		element.style.animation = "enterUp 1s ease-in-out"
		document.getElementsByClassName("pagenumbefore")[0].style.animation = "exitUp 1s ease-in-out"
	}
	else {
		element.style.animation = "enterDown 1s ease-in-out"
		document.getElementsByClassName("pagenumbefore")[0].style.animation = "exitDown 1s ease-in-out"
	}
	document.getElementsByClassName("pagenumbefore")[0].style.textShadow = "0px 0px 0px rgba(0, 0, 0, 0)"
	element.innerText = pagenum
	document.body.appendChild(element)
	element.addEventListener("animationend", function () {
		if (element.className.includes("pagenumbefore"))
			return
		document.getElementsByClassName("pagenumbefore")[0].remove()
		element.className = "pagenum pagenumbefore"
		element.style.animation = ""
		scrolling = false
		lastScrollY = window.scrollY
	});
}