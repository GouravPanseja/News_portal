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




    const API_KEY = "pub_31316966056ee632a7b5467c6acdea760f673";
    const url = "https://newsdata.io/api/1/news?apikey=";   
    
    
    const arr= ['india','world','','computers','bollywood','book','film','hollywood','war','army','press']
    
    let initialTopic=arr[Math.floor((Math.random()*10))];
    console.log(initialTopic);
    window.addEventListener('load',()=> fetchNews(initialTopic));
    
    function reload(){
        window.location.reload();
    }
    
    async function fetchNews(querry){
        const res = await fetch(`${url}${API_KEY}&q=${querry}`);
        const data= await res.json();


        if (data.status =! 'success'){
            alert('The website has stopped responding');
            return;
        }
       
      bindData(data.results)      /* accessign the value of articles key in the data object to bind it*/
    }
    
    function bindData(results){ 
    
        const cardsContainer = document.getElementById('cards-container');
        const newsCardTemplate =document.getElementById('template-news-card');
    
    
        cardsContainer.innerHTML= '';  // making the container empty before again putting something into it
    
        results.forEach((result) =>{
            
            if(result.image_url==null){
                console.log('no data');
                return;

            }
                
            


        

               //firstElemetChild is req bcz the content returns the inner html in the form of a documentFragment
            const cardClone = newsCardTemplate.content.firstElementChild.cloneNode(true);  // cardClone becomes exact copy of the content of the template ie, card
    
            fillDataInCard(cardClone,result);
            console.log(result);
            cardsContainer.appendChild(cardClone); 

            
        
    
    
    
        })  
    }
    
    function fillDataInCard(cardClone,result){
         const newsImg = cardClone.querySelector('#news-img');
         const newsTitle = cardClone.querySelector('#news-title');
         const newsSource = cardClone.querySelector('#news-source');
         const newsDesc = cardClone.querySelector('#news-description'); 
    
        console.log(result.image_url);

        if(result.image_url==null){
            newsImg.src= 'https://via.placeholder.com/400x200';
        }
        else{
            newsImg.src= result.image_url;
        }
        
        newsTitle.innerHTML= result.title;
        newsDesc.innerHTML= result.description;
    
        // const date = new Date(article.publishedAt).toLocaleString('en-US', {timeZone:'Asia/Jakarta'});   // converting time to readable 12H format of our local timeZone
    
        newsSource.innerHTML = `${result.source_id} · ${result.pubDate}`
    
    
       
        cardClone.addEventListener('click',()=>{                  
            window.open(result.link,'_blank')   // opens the page in a new tab
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
    