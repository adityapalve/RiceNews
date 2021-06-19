//Variables
let country_value = "in";

//Element selectors
let body = document.querySelector("body");
let main = document.querySelector("main");
let us_news = document.querySelector(".us-news");
let in_news = document.querySelector(".india-news");
let cn_news = document.querySelector(".china-news");
let menu_body = document.getElementById("menu-body");
let us_tick = document.querySelector(".us-news~span");
let navbar_nav = document.querySelector(".navbar-nav");
let close_menu = document.querySelector(".bi-x");                    
let hamburger_menu = document.querySelector(".bi-list");
let in_tick = document.querySelector(".india-news~span");
let cn_tick = document.querySelector(".china-news~span");
let social_links = document.getElementById("social-links");
let lang_select = document.querySelector("#lang-selector-text");
let lang_close = document.querySelector("#lang-selector-close");
let lang_info = document.getElementById("lang-selector-text-info");
let lang_selector_body = document.querySelector("#lang-selector-body");
let spinner_container = document.querySelector(".spinner-container");
let news_container = document.querySelector("#news-container");

//Link selectors (NodeList)
let general =  	 document.querySelectorAll(".general");
let business = 	 document.querySelectorAll(".business");
let health =   	 document.querySelectorAll(".health");
let science =  	 document.querySelectorAll(".science");
let technology = document.querySelectorAll(".technology");

/*
	When hamburger menu is clicked, then:
	1. .social_links & .navbar_nav must toggle
	2. If .lang_selector_body is opened then it must be closed/collapsed
*/
hamburger_menu.addEventListener("click",(event)=>{
	hamburger_menu.classList.toggle("collapse");
	close_menu.classList.toggle("collapse");
	social_links.classList.toggle("collapse");
	navbar_nav.classList.toggle("collapse");
	//When the lang_selector_body is not collapsed then make it collapse
	if(lang_selector_body.classList.contains("collapse")&&lang_selector_body.classList.contains("show")){
		lang_close.click();
	}
});

/*
	When close menu button is clicked, then:
	1. click hamburger_menu option
*/
close_menu.addEventListener("click",(event)=>{
	hamburger_menu.click();
	//When the lang_selector_body is not collapsed then make it collapse
	if(lang_selector_body.classList.contains("collapse")&&lang_selector_body.classList.contains("show")){
		lang_close.click();
	}
});

/*
	When #lang_selector_text is clicked, then:
	1. Check if the #menu_body is collapsed or not. If not collapsed then click on .bi-list
*/
lang_select.addEventListener("click",(event)=>{
	if(menu_body.classList.contains("collapse")&&menu_body.classList.contains("show")){
		hamburger_menu.click();
	}
});

//Toggles between show and hide state for lang/nation selector bar
lang_select.addEventListener("click",(event)=>{
	lang_select.classList.add("collapse");
	lang_select.classList.remove("show");
	lang_close.classList.add("show");
	lang_close.classList.remove("collapse");
	body.classList.add("overflow-toggle");		//makes the overflow hidden for body => won't be able to scroll
});
lang_close.addEventListener("click",(event)=>{
	lang_select.classList.remove("collapse");
	lang_select.classList.add("show");
	lang_close.classList.remove("show");
	lang_close.classList.add("collapse");
	body.classList.remove("overflow-toggle");	//makes the overflow visible for body
});

//Picking a language/nation selector from the list-group using class .india-news, .china-news, .us-news
in_news.addEventListener("click",function(event){
	news_container.innerHTML+='';
	in_tick.classList.remove("invisible");
	in_tick.classList.add("visible");
	cn_tick.classList.remove("visible");
	cn_tick.classList.add("invisible");
	us_tick.classList.remove("visible");
	us_tick.classList.add("invisible");
	lang_info.innerText = in_news.innerText;
	spinner_container.classList.remove("d-none");
	spinner_container.classList.add("d-flex");
	fetch("/country?value=in")
	.then(res=>res.json())
	.then((data)=>{
		spinner_container.classList.remove("d-flex");
		spinner_container.classList.add("d-none");
		country_value = "in";
		console.log(data);
		news_container.innerHTML+='';
		data.articles.forEach((element,index)=>{
			if(index==0){
				let title = element.title;
				let lastDashPos = title.length-1;
				news_container.innerHTML += `
					<div class="bg-dark text-light p-3 p-lg-0 d-flex flex-wrap flex-lg-nowrap flex-row flex-lg-row-reverse align-items-stretch">
						<div class="col-lg-4 p-3 top-text-container align-middle">
							<p class="small hover-grey">${element.source.name.toUpperCase()}</p>
							<a href="${element.url}" target="_blank" class="d-block h3 fw-bolder news-title hover-grey link-light text-decoration-none mb-3">${title.substr(0,lastDashPos)}</a>
							<p class="mb-3">${element.description}</p>
							<p class="small">${element.publishedAt.substr(0,element.publishedAt.indexOf("T"))}</p>
						</div>
						<div class="col-lg-8 top-img-container p-lg-0 p-1 d-flex justify-content-center align-items-center">
							<img class="top-img" src="${element.urlToImage}">
						</div>
					</div>
				`;
			}
			// ${element.urlToImage}
			// 			
			// 			${element.title}
			// 			
			// 			
			// 			
			// else if (index>=1 && index<=3){
			// 	news_container.innerHTML += `
			// 		<div class="card col-md-4">
			// 			<div class="w-100">
			// 				<img src="${element.urlToImage}" class="card-img-top w-100" alt="${element.title}">
			// 			</div>

			// 			<div class="card-body">
			// 		    	<h5 class="card-title fw-bolder hover-dark-grey">${element.title}</h5>
			// 		    	<p class="card-text">${element.description}</p>
			// 		  	</div>
			// 		</div>
			// 	`;
			// }
		});
				
	})
	.catch((err)=>{
		spinner_container.classList.remove("d-flex");
		spinner_container.classList.add("d-none");
		console.error(err);
	});
});
cn_news.addEventListener("click",function(event){
	main.innerHTML="";
	in_tick.classList.remove("visible");
	in_tick.classList.add("invisible");
	cn_tick.classList.remove("invisible");
	cn_tick.classList.add("visible");
	us_tick.classList.remove("visible");
	us_tick.classList.add("invisible");
	lang_info.innerText = cn_news.innerText;
	spinner_container.classList.remove("d-none");
	spinner_container.classList.add("d-flex");
	fetch("/country?value=cn")
	.then(res=>res.json())
	.then((data)=>{
		spinner_container.classList.remove("d-flex");
		spinner_container.classList.add("d-none");
		country_value = "cn";
		console.log(data);
	})
	.catch((err)=>{
		spinner_container.classList.remove("d-flex");
		spinner_container.classList.add("d-none");
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
	spinner_container.classList.remove("d-none");
	spinner_container.classList.add("d-flex");
	fetch("/country?value=us")
	.then(res=>res.json())
	.then((data)=>{
		spinner_container.classList.remove("d-flex");
		spinner_container.classList.add("d-none");
		country_value = "us";
		console.log(data);
	})
	.catch((err)=>{
		spinner_container.classList.remove("d-flex");
		spinner_container.classList.add("d-none");
		console.error(err);
	});
});

// Function for fetching and displaying content
let fetchAndDisplay=(event)=>{
	spinner_container.classList.remove("d-none");
	spinner_container.classList.add("d-flex");
	fetch(`/news?country=${country_value}&category=${event.srcElement.innerText.toLowerCase()}`)
	.then(res=>res.json())
	.then((data)=>{
		spinner_container.classList.remove("d-flex");
		spinner_container.classList.add("d-none");
		console.log(data);
	})
	.catch((err)=>{
		spinner_container.classList.remove("d-flex");
		spinner_container.classList.add("d-none");
		console.error(err);
	});
};

// Since querySelectorAll returns NodeList upon which forEach() method has to be used to access individual elements
general.forEach((element)=>{
	element.addEventListener("click",(event)=>{
		fetchAndDisplay(event);
	});
});
business.forEach((element)=>{
	element.addEventListener("click",(event)=>{
		fetchAndDisplay(event);
	});
});
health.forEach((element)=>{
	element.addEventListener("click",(event)=>{
		fetchAndDisplay(event);
	});
});
science.forEach((element)=>{
	element.addEventListener("click",(event)=>{
		fetchAndDisplay(event);
	});
});
technology.forEach((element)=>{
	element.addEventListener("click",(event)=>{
		fetchAndDisplay(event);
	});
});

//When internal menu is clicked then the hamburger menu is clicked
let internal_link = document.querySelectorAll(".internal-link");
internal_link.forEach((element)=>{
	element.addEventListener("click",(event)=>{
		hamburger_menu.click();
	});
});

//For displaying the default content click the in_news button
in_news.click();