// extra function part start here
function getTimeString(time){
    const hour = parseInt(time/3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond/60);
    remainingSecond = remainingSecond % 60 ;
    return `${hour} hour ${minute} minute ${remainingSecond} Second ago`
}

const activeBtnRemove =()=>{
    const buttons = document.getElementsByClassName("category_btn")
    for(let btn of buttons){
        btn.classList.remove("active")
    }
}

// button part start here
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))

}


const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById("categories")

    categories.forEach(item => {

        // create a button 
        const buttonContainer = document.createElement("div")
        buttonContainer.innerHTML = 
        `<button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category_btn">
            ${item.category}
         </button>
        `

      

        // add button a category container 

        categoriesContainer.appendChild(buttonContainer)

    })
}
// button part end here

// load video part start here

const loadVideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error))

}

const loadCategoryVideos = (id) =>{
    
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data =>{
        // remove active class
        activeBtnRemove()

        // add active class
        const activeBtn = document.getElementById(`btn-${id}`)
        activeBtn.classList.add("active")
        displayVideos(data.category)
    })
    .catch(error => console.log(error))
}



const displayVideos = (videos) => {

    const videosContainer = document.getElementById("videos");
    videosContainer.innerHTML = ""

    if(videos.length === 0){
        videosContainer.classList.remove("grid")
        videosContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
            <img src="/ph_tube_API/assets/icon.png"/>
            <h2 class="text-center text-xl font-bold" >
            No Content Here in this Category
            </h2>
        </div>
        `;
        return;
    }
    else{
        videosContainer.classList.add("grid");
    }

    videos.forEach((video) => {
        console.log(video);
        const videoCard = document.createElement("div");
        videoCard.classList = "card card-compact "
        videoCard.innerHTML =
        `
        <figure class="h-[200px] relative">
            <img
            src=${video.thumbnail}
            class="h-full w-full object-cover"
            alt="Shoes" />
            ${
                video.others.posted_date?.length == 0?"":`<span class="absolute right-2 bottom-2 bg-black text-white rounded p-1">${getTimeString(video.others.posted_date)}</span>`
            }
            
        </figure>
        <div class="px-0 py-2 flex gap-2">
            <div>
                <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} />
            </div>
            <div>
                <h2 class="font-bold">${video.title}</h2>
                <div class="flex items-center gap-2">
                    <p class="text-gray-400">${video.authors[0].profile_name}</p>
                    ${video.authors[0].verified === true ? ` <img class="w-7 h-7" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"/>` : "" }
                   
                </div>
                <p></p>
            </div>
        </div>
        `;

        videosContainer.append(videoCard)
    })

}



// video part end here



loadCategories()

loadVideos()



// const cardDemo= {
//     "category_id": "1001",
//     "video_id": "aaab",
//     "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
//     "title": "Midnight Serenade",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
//             "profile_name": "Noah Walker",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "543K",
//         "posted_date": ""
//     },
//     "description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
// }
