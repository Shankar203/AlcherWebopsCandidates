// API Read Access Token (v4 auth): eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmU4YTYxYzA0MDY5NjkyZWM3MWQ3NDRkZGMwYjg4ZiIsInN1YiI6IjYwYzRiYjNlYTI4NGViMDAyNzQ4ZjI4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L03d3SsGZ23nC2H5AN4Ei5LJ-FHbJDhRBpnRnL7JZH4
// Example API Request            : https://api.themoviedb.org/3/movie/550?api_key=4be8a61c04069692ec71d744ddc0b88f
// API Key (v3 auth)              : 4be8a61c04069692ec71d744ddc0b88f 


var search=document.getElementById("search");
var imgArr=document.getElementsByClassName("avg-img");
var infoArr=document.getElementsByClassName("info");

search.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    console.log("pressed enter");
    getQuery(search.value)
        .then(function(results){
            console.log("results :",results);
            var filteredResults=results.filter(result=>result.backdrop_path);
            for(let i=0; i<8;i++){
                imgArr[i].src="https://image.tmdb.org/t/p/w500"+filteredResults[i].backdrop_path;
                infoArr[i].innerHTML=`<strong>${filteredResults[i].original_title}</strong><br><br>
                                      IMDB Rating  : ${filteredResults[i].vote_average}<br>
                                      Release-date : ${filteredResults[i].release_date}`;
            }
        })
        .catch(err=>console.error(err));
  }
}); 

const getQuery=async function(query){ 
    const response=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=4be8a61c04069692ec71d744ddc0b88f&query=${query}`);
    const data=await response.json();
    if(response.status!==200){
        throw new Error("===== Can't reach TMDB =====");
    }
    return data.results;
}

const getQueryDetails=async function(query){ 
    const response=await fetch(`https://api.themoviedb.org/3/movie/${ID}?api_key=4be8a61c04069692ec71d744ddc0b88f&query=${query}`);
    const data=await response.json();
    if(response.status!==200){
        throw new Error("===== Can't reach TMDB =====");
    }
    return data.results;
}

/*  
//api to get response
    fetch('https://api.themoviedb.org/3/search/movie?api_key=4be8a61c04069692ec71d744ddc0b88f&query=avengers')
    .then(response => response.json())
    .then(data => console.log(data));

//api to get image
    fetch('https://image.tmdb.org/t/p/w500/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg');

//api to get details
    fetch('https://api.themoviedb.org/3/movie/299534?api_key=4be8a61c04069692ec71d744ddc0b88f&query=avengers')
    .then(response => response.json())
    .then(data => console.log(data));
  */