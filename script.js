const apiKey = 'YOUR_API_KEY';

const blogContainer = document.getElementById("blog-container");

const searchField = document.getElementById('search-input');

const searchButton = document.getElementById('search-button');

async function fetchRandomNews(){
    try{
    
        const apiUrl= `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apikey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch(error){
        console.error("There is a error fetching random news",error);
        return [];

    }
}

searchButton.addEventListener("click" , async ()=>{
    const query= searchField.value.trim()
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles)
        }catch(error){
            console.log("Error fetching news by query",error);
        }
    }
})


async function fetchNewsQuery(query){
    try{
        const apiUrl= `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log(data);
        return data.articles;
    } catch(error){
        console.error("There is a error fetching random news",error);
        return [];

    }
}

function displayBlogs(articles){
    blogContainer.innerHTML =""
    articles.forEach((article) => {
        const blogCard = document.createElement("div")
        blogCard.classList.add("blog-card");
        const image = document.createElement("img");
        image.src = article.urlToImage;
        image.alt=article.title;

        const title=document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0,30) + "...." : article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement("p"); 
        const truncatedDescription = article.description.length > 150 ? article.description.slice(0,150) + "...." : article.description;
        description.textContent = truncatedDescription;




        blogCard.appendChild(image);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', ()=>{
            window.open(article.url, "_blank");
        })
        blogContainer.append(blogCard);
    });
}

(async ()=>{
   try{
        const articles=await fetchRandomNews();
        displayBlogs(articles);
   }catch(error){
    console.error("There is a error fetching random news",error);
   } 
}) ();