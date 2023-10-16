/* q= includes all the keywords that are to searched for in the articles, use "" to search for exact phrases ex "indian money" and for more than one keywords use AND, OR, NOT in the url.
   Endpoints options:-
    1. everything -includes every article 
    2. top-headings-
    3. sources- 
    
The response from the api is in the form of an object that contains three key value pairs 
1. status : gives status of the request 'ok' for succesful
2. total results: 
3. articles: an array of objects containg individual article and its data
    Each article contain:-
    *    */




const API_KEY = "1cf8d2b55e704091b3387bf1b2b90765";
const url = "https://newsapi.org/v2/everything?q=";   


const arr= ['india','indian economy','america','europe','science','engineering','computers','current Affairs','Peace','Nature','animals']

let initialTopic=arr[Math.floor((Math.random()*10))];
console.log(initialTopic);
window.addEventListener('load',()=> fetchNews(initialTopic));

function reload(){
    window.location.reload();
}

async function fetchNews(querry){
    const res = await fetch(`${url}${querry}&apiKey=${API_KEY}`);
    const data= await res.json();
    bindData(data.articles)      /* accessign the value of articles key in the data object to bind it*/
}

function bindData(articles){ 

    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate =document.getElementById('template-news-card');


    cardsContainer.innerHTML= '';  // making the container empty before again putting something into it

    articles.forEach((article) =>{
        if(!article.urlToImage){    // urlToImage is a key in the article object that contains url of the image as value therefore, if the url is not present we won't wnat it in the page
            return;
        }
        
        //firstElemetChild is req bcz the content returns the inner html in the form of a documentFragment
        const cardClone = newsCardTemplate.content.firstElementChild.cloneNode(true);  // cardClone becomes exact copy of the content of the template ie, card

        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);



    })  
}

function fillDataInCard(cardClone,article){
     const newsImg = cardClone.querySelector('#news-img');
     const newsTitle = cardClone.querySelector('#news-title');
     const newsSource = cardClone.querySelector('#news-source');
     const newsDesc = cardClone.querySelector('#news-description'); 


    newsImg.src= article.urlToImage;
    newsTitle.innerHTML= article.title;
    newsDesc.innerHTML= article.description;

    const date = new Date(article.publishedAt).toLocaleString('en-US', {timeZone:'Asia/Jakarta'});   // converting time to readable 12H format of our local timeZone

    newsSource.innerHTML = `${article.source.name} · ${date}`


   
    cardClone.addEventListener('click',()=>{                  
        window.open(article.url,'_blank')   // opens the page in a new tab
    })
}

function unSelectPrev(){

   Array.from(document.getElementsByClassName('nav-item')).forEach((navItem)=>{

        navItem.style.color='#183b56';

        })
}


function onNavItemClick(id) {

        unSelectPrev();
        fetchNews(id);

        document.getElementById(id).style.color='#2294ed'; 
    }

const searchButton = document.getElementById('search-button')
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click',()=>{    

    if(searchText.value.trim()==''){
        alert('Please input a valid Topic')
    }
    else{
        fetchNews(searchText.value);
        unSelectPrev();
    }
})

// const API_KEY = "1d3a0eefa97b499d8fbc4ee93eeb40b7";
// const url = "https://newsapi.org/v2/everything?q=";

// window.addEventListener("load", () => fetchNews("India"));

// function reload() {
//     window.location.reload();
// }

// async function fetchNews(query) {
//     const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
//     const data = await res.json();
//     bindData(data.articles);
// }

// function bindData(articles) {
//     const cardsContainer = document.getElementById("cards-container");
//     const newsCardTemplate = document.getElementById("template-news-card");

//     cardsContainer.innerHTML = "";

//     articles.forEach((article) => {
//         if (!article.urlToImage) return;
//         const cardClone = newsCardTemplate.content.cloneNode(true);
//         fillDataInCard(cardClone, article);
//         cardsContainer.appendChild(cardClone);
//     });
// }

// function fillDataInCard(cardClone, article) {
//     const newsImg = cardClone.querySelector("#news-img");
//     const newsTitle = cardClone.querySelector("#news-title");
//     const newsSource = cardClone.querySelector("#news-source");
//     const newsDesc = cardClone.querySelector("#news-desc");

//     newsImg.src = article.urlToImage;
//     newsTitle.innerHTML = article.title;
//     newsDesc.innerHTML = article.description;

//     const date = new Date(article.publishedAt).toLocaleString("en-US", {
//         timeZone: "Asia/Jakarta",
//     });

//     newsSource.innerHTML = `${article.source.name} · ${date}`;

//     cardClone.firstElementChild.addEventListener("click", () => {
//         window.open(article.url, "_blank");
//     });
// }

// let curSelectedNav = null;
// function onNavItemClick(id) {
//     fetchNews(id);
//     const navItem = document.getElementById(id);
//     curSelectedNav?.classList.remove("active");
//     curSelectedNav = navItem;
//     curSelectedNav.classList.add("active");
// }

// const searchButton = document.getElementById("search-button");
// const searchText = document.getElementById("search-text");

// searchButton.addEventListener("click", () => {
//     const query = searchText.value;
//     if (!query) return;
//     fetchNews(query);
//     curSelectedNav?.classList.remove("active");
//     curSelectedNav = null;
// });