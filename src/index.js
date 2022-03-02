let addToy = false;
const url = "http://localhost:3000/toys"
let container = document.getElementById("toy-collection");

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }

    
  });

 

//load toy info
  fetch(url)
  .then((response)=>{
    return response.json();
    //console.log(response);
  })
  .then((data)=>{
    data.forEach(element => {
      makeCard(element);
    });
  })
});

 //patch config 
 let patchConfig = {
  method : "PATCH",
  headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"
},
body: JSON.stringify({
  "likes": 0
})
};
// config for post task
let postConfig = {
  method : "POST",
  headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"
},
body: JSON.stringify({
  "name": "Jessie",
  "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
  "likes": 0
})
};

//add new card click event
let formsub = document.querySelector('.add-toy-form');
formsub.addEventListener('submit',(event)=>{
  event.preventDefault();
  
  let nameinp = document.getElementById('name').value;
  let imginp = document.getElementById('image').value;
  postConfig.body =JSON.stringify({
    "name": nameinp,
    "image": imginp,
    "likes": 0
  })
  fetch(url,postConfig)
  .then(resp=>resp.json())
  .then(data=>{
    makeCard(data)
     console.log(data)
  })
})


 



//card making function
function makeCard(element){
  let toydiv = document.createElement("div");
    toydiv.classList.add("card");
    let toyName = document.createElement("h2");
    toyName.innerHTML = element.name;
    let toyimg = document.createElement("img");
    toyimg.src=element.image;
    toyimg.classList.add("toy-avatar");
    let likes = document.createElement("p");
    likes.innerHTML=`${element.likes} likes`;   
    let button = document.createElement('button');
    button.classList.add('like-btn');
    button.id = element.id;
    button.innerHTML= 'Like';
    //like event listener
    //function is made to go inside other fetches so this thing cant work with element param
     button.addEventListener("click",()=>{
    
        console.log('clicked!');
        fetch(url,patchConfig)
        .then(resp=> resp.json())
        .then(data=>{
         // this is where stuff should be patched
         console.log(data);
        })
  
      })

    //add info here vvvv
    toydiv.appendChild(toyName);
    toydiv.appendChild(toyimg);
    toydiv.appendChild(likes);
    toydiv.appendChild(button)
    container.appendChild(toydiv);

}
