
//Toggles between show and hide state for lang/nation selector bar
let lang_select = document.querySelector("#lang-selector-text");
let lang_close = document.querySelector("#lang-selector-close");
lang_select.addEventListener("click",(event)=>{
	lang_select.classList.add("collapse");
	lang_select.classList.remove("show");
	lang_close.classList.add("show");
	lang_close.classList.remove("collapse");
});
lang_close.addEventListener("click",(event)=>{
	lang_select.classList.remove("collapse");
	lang_select.classList.add("show");
	lang_close.classList.remove("show");
	lang_close.classList.add("collapse");
});

//Picking a language/nation selector from the list-group using class .india-news, .china-news, .us-news
let in_news = document.querySelector(".india-news");
let in_tick = document.querySelector(".india-news~span");
let cn_news = document.querySelector(".china-news");
let cn_tick = document.querySelector(".china-news~span");
let us_news = document.querySelector(".us-news");
let us_tick = document.querySelector(".us-news~span");
let lang_info = document.getElementById("lang-selector-text-info");
in_news.addEventListener("click",function(event){
	in_tick.classList.remove("invisible");
	in_tick.classList.add("visible");
	cn_tick.classList.remove("visible");
	cn_tick.classList.add("invisible");
	us_tick.classList.remove("visible");
	us_tick.classList.add("invisible");
	lang_info.innerText = in_news.innerText;
	fetch("/country?value=in")
	.then(res=>res.json())
	.then((data)=>{
		console.log(data);
	})
	.catch((err)=>{
		console.error(err);
	});
});
cn_news.addEventListener("click",function(event){
	in_tick.classList.remove("visible");
	in_tick.classList.add("invisible");
	cn_tick.classList.remove("invisible");
	cn_tick.classList.add("visible");
	us_tick.classList.remove("visible");
	us_tick.classList.add("invisible");
	lang_info.innerText = cn_news.innerText;
	fetch("/country?value=cn")
	.then(res=>res.json())
	.then((data)=>{
		console.log(data);
	})
	.catch((err)=>{
		console.error(err);
	});
});
us_news.addEventListener("click",function(event){
	in_tick.classList.remove("visible");
	in_tick.classList.add("invisible");
	cn_tick.classList.remove("visible");
	cn_tick.classList.add("invisible");
	us_tick.classList.remove("invisible");
	us_tick.classList.add("visible");
	lang_info.innerText = us_news.innerText;
	fetch("/country?value=us")
	.then(res=>res.json())
	.then((data)=>{
		console.log(data);
	})
	.catch((err)=>{
		console.error(err);
	});
});