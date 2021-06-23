//Variables
let country_value = "in";

//Element selectors
let body = document.querySelector("body");
let main = document.querySelector("main");
let close_menu = document.querySelector(".bi-x");
let us_news = document.querySelector(".us-news");
let in_news = document.querySelector(".india-news");
let menu_body = document.getElementById("menu-body");
let us_tick = document.querySelector(".us-news~span");
let navbar_nav = document.querySelector(".navbar-nav");                    
let hamburger_menu = document.querySelector(".bi-list");
let in_tick = document.querySelector(".india-news~span");
let social_links = document.getElementById("social-links");
let illustration = document.querySelector(".illustration");
let news_container = document.querySelector("#news-container");
let lang_select = document.querySelector("#lang-selector-text");
let lang_close = document.querySelector("#lang-selector-close");
let lang_info = document.getElementById("lang-selector-text-info");
let spinner_container = document.querySelector(".spinner-container");
let lang_selector_body = document.querySelector("#lang-selector-body");

//Selecting topmost two bars in the header
let first_topbar = document.querySelector(".first-top-bar");
let second_topbar = document.querySelector(".second-top-bar");

//Link selectors (NodeList)
let health =   	 document.querySelectorAll(".health");
let general =  	 document.querySelectorAll(".general");
let science =  	 document.querySelectorAll(".science");
let business = 	 document.querySelectorAll(".business");
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
	body.classList.toggle("overflow-toggle");
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

/*
	Function: loadContent
	Functionality : Using data received from the API and loading it onto the screen
	Parameter: data => data using which articles will be loaded onto the screen 
	Return : undefined (nothing is being returned)
*/
let loadContent = (data) =>{

	//News container should be emptied before loading new data
	news_container.innerHTML = '';

	//Spinners should be visible when the fetching process starts
	spinner_container.classList.remove("d-flex");
	spinner_container.classList.add("d-none");
	
	console.log(data);

	//If data.articles isn't undefined => NewsAPI is not rate limited & that the content must be loaded
	if(data.articles){

		//Remove the illustrations before the data loads, if it is already not collapsed 
		illustration.classList.add("collapse");

		//Removing articles w/ incomplete information (description, image) by splicing  it's data 
		data.articles.forEach((element,index)=>{
			if(element.description==null){
				data.articles.splice(index,1);
			}
			if(element.urlToImage==null){
				data.articles.splice(index,1);
			}
		});

		//Iterating through individual articles to be loaded 
		data.articles.forEach((element,index)=>{	

			//Loading the topmost content
			if(index==0){
				let title = element.title;		//Stores title received from the API
				let lastDashPos = 0;			//Character after last dash position => source name 
				
				//Checking whether element is last - and removing the source name from element.title
				title.split('').forEach((element,index)=>{
					if(element=='-' && element.indexOf("-",index)==-1){
						lastDashPos=index;
					}
				});
				title = title.substr(0,lastDashPos);
			
				//Adding content to the news_container
				/*
					d-flex flex-wrap flex-lg-nowrap flex-row flex-lg-row-reverse align-items-stretch : Container containing the topmost news article will a flexbox with items stretching along the perpendicular axis where, when :
					1. When window width<992px : content of flexbox will wrap, direction of flexbox will be row
					2. When window width>992px : content of flexbox will not wrap, direction of flexbox will be row-reverse

					w-100 bg-dark text-light p-3 p-lg-0 : Width of the container will be 100% of the window width and will have dark background w/ white text and medium padding when window width<992px & no padding when window width>992px

					small : Smaller paragraph text
				*/
				news_container.innerHTML += `
					<div class="d-flex flex-wrap flex-lg-nowrap flex-row flex-lg-row-reverse align-items-stretch w-100 bg-dark text-light p-3 p-lg-0">
						<div class="col-lg-4 p-3 top-text-container">
							<p class="small hover-grey">${element.source.name.toUpperCase()}</p>
							<a href="${element.url}" target="_blank" class="d-block h3 fw-bolder news-title hover-grey link-light text-decoration-none mb-3">${title}</a>
							<p class="mb-3">${element.description}</p>
							<p class="small">${element.publishedAt.substr(0,element.publishedAt.indexOf("T"))}</p>
						</div>
						<div class="col-lg-8 top-img-container p-lg-0 p-1 d-flex justify-content-center align-items-center">
							<img class="top-img" src="${element.urlToImage}">
						</div>
					</div>
				`;
			}

			//Loading the other news which must be even in number to load the contents perfectly
			else if (index>0&index<=data.articles.length-(data.articles.length%3)){

				let title = element.title;				//Stores title received from the API
				let description = element.description;	//Stores description received from the API
				let lastDashPos = 0;

				//Removing source name from the title
				if(title){
					title.split('').forEach((element,index)=>{
						//Checking whether element is last -
						if(element=='-' && element.indexOf("-",index)==-1){
							lastDashPos=index;
						}
					});
				}
				title = title.substr(0,lastDashPos);
			
				news_container.innerHTML += `
					<div class="card col-lg-4">
						<div class="bottom-img-container">
							<img class="bottom-img" src="${element.urlToImage}">
						</div>
						<div class="p-3 d-flex flex-column justify-content-between">
							<div>
								<p class="small hover-dark-grey w-100">
									${element.source.name.toUpperCase()}
								</p>
								<a 
									href="${element.url}" 
									target="_blank" 
									class="d-block h4 fw-bolder news-title hover-dark-grey text-dark link-dark text-decoration-none w-100">
										${title}
								</a>
							</div>
							<div class="d-flex flex-column justify-content-between">
								<p class="mb-3">${description}</p>
								<p class="small">${element.publishedAt.substr(0,element.publishedAt.indexOf("T"))}</p>
							</div>
						</div>
					</div>
				`;
			}
		});
	}

	//When the NewsAPI gets rate limited then show the illustration with text
	else{
		illustration.classList.remove("collapse");
	}
}

//Picking a language/nation selector from the list-group using class .india-news, .china-news, .us-news
in_news.addEventListener("click",function(event){
	news_container.innerHTML+='';
	in_tick.classList.remove("invisible");
	in_tick.classList.add("visible");
	us_tick.classList.remove("visible");
	us_tick.classList.add("invisible");
	lang_info.innerText = in_news.innerText;
	spinner_container.classList.remove("d-none");
	spinner_container.classList.add("d-flex");
	fetch("/country?value=in")
	.then(res=>res.json())
	.then((data)=>{
		country_value='in';
		loadContent(data);
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
	us_tick.classList.remove("invisible");
	us_tick.classList.add("visible");
	lang_info.innerText = us_news.innerText;
	spinner_container.classList.remove("d-none");
	spinner_container.classList.add("d-flex");
	fetch("/country?value=us")
	.then(res=>res.json())
	.then((data)=>{
		country_value='us';
		loadContent(data);
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
		loadContent(data);
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

let splash_container = document.querySelector(".splash");
document.addEventListener("DOMContentLoaded", () => {
	window.setInterval(()=>{
		splash_container.classList.add("collapse");
	},1000);
});