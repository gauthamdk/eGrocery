const divs = document.querySelectorAll("div");

for(let div of divs) {
	color = window.getComputedStyle(div).color;
	// console.log(color)
	div.innerText = color;
	div.style.color = "black";
	div.style.background = color
}