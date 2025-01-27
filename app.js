const cat = document.getElementById('category');
const car = document.getElementById('cards');
const err = document.getElementById('error');
const pro = document.getElementById('products');
const loader = document.getElementById('loader');
const gallery = document.getElementById('gallery');

console.log("error",err);

loader.style.display = 'block';
pro.style.display = 'none';
fetch(`https://openapi.programming-hero.com/api/peddy/categories`).then(res => res.json()).then(data => {
    const categories = data.categories;
    categories.forEach(category => {
        const option = document.createElement('div');
        option.id = `categories-${category.id}`;
        option.classList.add('border','border-gray-200','rounded-lg','p-4','flex','items-center','cursor-pointer','hover:bg-gray-200','justify-center','m-4');
        option.addEventListener('click',()=>{
           clicked(category.id); 
        })
        option.innerHTML = `
        <img src="${category.category_icon} class="w-1/2" alt="icon">
        <p class="font-bold text-xl pl-3">${category.category}</p>
        
        `;
        cat.appendChild(
        option);
    
    });
});
let card = null;
fetch(`https://openapi.programming-hero.com/api/peddy/pets`).then(res => res.json()).then(data => {
    card = data.pets;
    setTimeout(() => {
    loader.style.display = 'none';
    pro.style.display = 'flex';
    document.getElementById('sort').addEventListener('click', () => {
    card.sort((a,b)=>b.price-a.price);
    car.innerHTML="";
    card.forEach(cards => {
   
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('flex');
            cardDiv.innerHTML = `<div class="card bg-base-100 w-full shadow-xl mx-2">
        <figure class=" lg:px-6 pt-10">
        <img
          src="${cards.image}"
          alt="Shoes"
          class="rounded-xl" />
        </figure>
        <div class="card-body">
        <h2 class="card-title">${cards.pet_name}</h2>
        <p><i class="fa-regular fa-rectangle-list fa-xs"></i>
        Breed:${cards.breed ? cards.breed:'Not Availble'}</p>
        <p><i class="fa-regular fa-calendar fa-xs"></i>
        Birth:${cards.date_of_birth ? cards.date_of_birth:'Not Availble'}</p>
        <p><i class="fa-solid fa-venus fa-xs"></i>
        Gender:${cards.gender ? cards.gender :'Not Availble'}</p>
        <p><i class="fa-solid fa-dollar-sign fa-xs"></i>
        Price:${cards.price? cards.price :'Not Availble'}</p>
        <div class="grid grid-cols-3 gap-4 text-back w-full pt-2"">
            <button class="btn btn-ghost border border-gray-200" onclick=liked(${cards.petId})><i id="like-icon-${cards.petId}" class="fa-regular fa-thumbs-up fa-lg"></i></button>
            <button class="btn btn-ghost border-gray-200 " onclick=adopted(${cards.petId}) id="adopted${cards.petId}">Adopt</button>
            <button class="btn btn-ghost border-gray-200 " onclick=Details(${cards.petId}) id="details${cards.petId}">Details</button>
            </div>
        </div>
        </div>
            `;
            car.appendChild(cardDiv);
        });
    })
   
card.forEach(cards => {
   
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('flex');
    cardDiv.innerHTML = `<div class="card bg-base-100 w-full shadow-xl mx-2">
<figure class=" lg:px-6 pt-10">
<img
  src="${cards.image}"
  alt="Shoes"
  class="rounded-xl" />
</figure>
<div class="card-body">
<h2 class="card-title">${cards.pet_name}</h2>
<p><i class="fa-regular fa-rectangle-list fa-xs"></i>
Breed:${cards.breed ? cards.breed:'Not Availble'}</p>
<p><i class="fa-regular fa-calendar fa-xs"></i>
Birth:${cards.date_of_birth ? cards.date_of_birth:'Not Availble'}</p>
<p><i class="fa-solid fa-venus fa-xs"></i>
Gender:${cards.gender ? cards.gender :'Not Availble'}</p>
<p><i class="fa-solid fa-dollar-sign fa-xs"></i>
Price:${cards.price? cards.price :'Not Availble'}</p>
<div class="grid grid-cols-3 gap-4 text-back w-full pt-2"">
    <button class="btn btn-ghost border border-gray-200" onclick=liked(${cards.petId})><i id="like-icon-${cards.petId}" class="fa-regular fa-thumbs-up fa-lg"></i></button>
    <button class="btn btn-ghost border-gray-200 " onclick=adopted(${cards.petId}) id="adopted${cards.petId}">Adopt</button>
    <button class="btn btn-ghost border-gray-200 " onclick=Details(${cards.petId}) id="details${cards.petId}">Details</button>
    </div>
</div>
</div>
    `;
    car.appendChild(cardDiv);
});
    }, 2000);
    

});

const likepost = [];
const adop = [];
const last= [];



function liked(id){
    if(!likepost.includes(id)){
    likepost.push(id);
    const likeid = document.getElementById(`like-icon-${id}`);
    likeid.classList.remove('fa-regular');
    likeid.classList.add('fa-solid');
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`).then(res => res.json()).then(data => {
    const petImge = data.petData.image;
   
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('flex','h-44','p-2');
    cardDiv.id = `gallery-${id}`;
    cardDiv.innerHTML = `
    <img src="${petImge}" alt="Shoes" class="rounded-xl w-84"/>`
    gallery.appendChild(cardDiv);
    
    });
    console.log(likepost);
}
else{
    const likeid = document.getElementById(`like-icon-${id}`);
    likepost.pop(id);
    likeid.classList.add('fa-regular');
    likeid.classList.remove('fa-solid');
    const cardDiv = document.getElementById(`gallery-${id}`);
    cardDiv.remove();
    console.log(likepost);
}
}
function clicked(id){
    
    last.push(id);
    
    if(last.length === 1)
    {
        const cat = document.getElementById(`categories-${id}`);
        let name = cat.querySelector('p').innerText;    
        cat.classList.add('bg-gray-200','rounded-5xl');
        document.getElementById('sort').addEventListener('click',function(e){
            
            
        });
        fetch(`https://openapi.programming-hero.com/api/peddy/category/${name}`).then(res => res.json()).then(data => {
            card = data.data;
            car.innerHTML = '';
            loader.style.display = 'block';
            pro.style.display = 'none';
            setTimeout(() => {
            loader.style.display = 'none';
            pro.style.display = 'flex';
            if(card.length === 0){
  
                err.classList.remove('hidden');
                err.classList.add('flex');
                car.appendChild(err);
            }
            else{
                err.classList.add('hidden');
                err.classList.remove('flex');
                document.getElementById('sort').addEventListener('click', () => {
                    card.sort((a,b)=>b.price-a.price);
                    car.innerHTML="";
                    card.forEach(cards => {
                   
                            const cardDiv = document.createElement('div');
                            cardDiv.classList.add('flex');
                            cardDiv.innerHTML = `<div class="card bg-base-100 w-full shadow-xl mx-2">
                        <figure class=" lg:px-6 pt-10">
                        <img
                          src="${cards.image}"
                          alt="Shoes"
                          class="rounded-xl" />
                        </figure>
                        <div class="card-body">
                        <h2 class="card-title">${cards.pet_name}</h2>
                        <p><i class="fa-regular fa-rectangle-list fa-xs"></i>
                        Breed:${cards.breed ? cards.breed:'Not Availble'}</p>
                        <p><i class="fa-regular fa-calendar fa-xs"></i>
                        Birth:${cards.date_of_birth ? cards.date_of_birth:'Not Availble'}</p>
                        <p><i class="fa-solid fa-venus fa-xs"></i>
                        Gender:${cards.gender ? cards.gender :'Not Availble'}</p>
                        <p><i class="fa-solid fa-dollar-sign fa-xs"></i>
                        Price:${cards.price? cards.price :'Not Availble'}</p>
                        <div class="grid grid-cols-3 gap-4 text-back w-full pt-2"">
                            <button class="btn btn-ghost border border-gray-200" onclick=liked(${cards.petId})><i id="like-icon-${cards.petId}" class="fa-regular fa-thumbs-up fa-lg"></i></button>
                            <button class="btn btn-ghost border-gray-200 " onclick=adopted(${cards.petId}) id="adopted${cards.petId}">Adopt</button>
                            <button class="btn btn-ghost border-gray-200 " onclick=Details(${cards.petId}) id="details${cards.petId}">Details</button>
                            </div>
                        </div>
                        </div>
                            `;
                            car.appendChild(cardDiv);
                        });
                    })
                card.forEach(cards => {
                    
                    const cardDiv = document.createElement('div');
                    cardDiv.classList.add('flex');
                    cardDiv.innerHTML = `<div class="card bg-base-100 w-full shadow-xl mx-2">
                <figure class=" lg:px-6 pt-10">
                <img
                  src="${cards.image}"
                  alt="Shoes"
                  class="rounded-xl" />
                </figure>
                <div class="card-body">
                <h2 class="card-title">${cards.pet_name}</h2>
                <p><i class="fa-regular fa-rectangle-list fa-xs"></i>
                Breed:${cards.breed ? cards.breed:'Not Availble'}</p>
                <p><i class="fa-regular fa-calendar fa-xs"></i>
                Birth:${cards.date_of_birth ? cards.date_of_birth:'Not Availble'}</p>
                <p><i class="fa-solid fa-venus fa-xs"></i>
                Gender:${cards.gender ? cards.gender :'Not Availble'}</p>
                <p><i class="fa-solid fa-dollar-sign fa-xs"></i>
                Price:${cards.price? cards.price :'Not Availble'}</p>
                <div class="grid grid-cols-3 gap-4 text-back w-full pt-2"">
                    <button class="btn btn-ghost border border-gray-200" onclick=liked(${cards.petId})><i id="like-icon-${cards.petId}" class="fa-regular fa-thumbs-up fa-lg"></i></button>
                    <button class="btn btn-ghost border-gray-200 " onclick=adopted(${cards.petId}) id="adopted${cards.petId}">Adopt</button>
                    <button class="btn btn-ghost border-gray-200 " onclick=Details(${cards.petId}) id="details${cards.petId}">Details</button>
                    </div>
                </div>
                </div>
                    `;
                    car.appendChild(cardDiv);
                });
            }
        
            }, 2000);
            
        });
    }
    else{
        const la = last.shift(id);
        const prev = document.getElementById(`categories-${la}`);
        prev.classList.remove('bg-gray-200','rounded-2xl');
        const cat = document.getElementById(`categories-${id}`);
        cat.classList.add('bg-gray-200','rounded-2xl');
        let name = cat.querySelector('p').innerText;
        fetch(`https://openapi.programming-hero.com/api/peddy/category/${name}`).then(res => res.json()).then(data => {
            card = data.data;
            document.getElementById('sort').addEventListener('click', () => {
                card.sort((a,b)=>b.price-a.price);
                car.innerHTML="";
                card.forEach(cards => {
               
                        const cardDiv = document.createElement('div');
                        cardDiv.classList.add('flex');
                        cardDiv.innerHTML = `<div class="card bg-base-100 w-full shadow-xl mx-2">
                    <figure class=" lg:px-6 pt-10">
                    <img
                      src="${cards.image}"
                      alt="Shoes"
                      class="rounded-xl" />
                    </figure>
                    <div class="card-body">
                    <h2 class="card-title">${cards.pet_name}</h2>
                    <p><i class="fa-regular fa-rectangle-list fa-xs"></i>
                    Breed:${cards.breed ? cards.breed:'Not Availble'}</p>
                    <p><i class="fa-regular fa-calendar fa-xs"></i>
                    Birth:${cards.date_of_birth ? cards.date_of_birth:'Not Availble'}</p>
                    <p><i class="fa-solid fa-venus fa-xs"></i>
                    Gender:${cards.gender ? cards.gender :'Not Availble'}</p>
                    <p><i class="fa-solid fa-dollar-sign fa-xs"></i>
                    Price:${cards.price? cards.price :'Not Availble'}</p>
                    <div class="grid grid-cols-3 gap-4 text-back w-full pt-2"">
                        <button class="btn btn-ghost border border-gray-200" onclick=liked(${cards.petId})><i id="like-icon-${cards.petId}" class="fa-regular fa-thumbs-up fa-lg"></i></button>
                        <button class="btn btn-ghost border-gray-200 " onclick=adopted(${cards.petId}) id="adopted${cards.petId}">Adopt</button>
                        <button class="btn btn-ghost border-gray-200 " onclick=Details(${cards.petId}) id="details${cards.petId}">Details</button>
                        </div>
                    </div>
                    </div>
                        `;
                        car.appendChild(cardDiv);
                    });
                })
            car.innerHTML = '';
            loader.style.display = 'block';
            pro.style.display = 'none';
            setTimeout(() => {
            loader.style.display = 'none';
            pro.style.display = 'flex';
            if(card.length === 0){
                err.classList.remove('hidden');
                err.classList.add('flex');
                car.appendChild(err);
            }
            else{
                card.forEach(cards => {
                    err.classList.add('hidden');
                    err.classList.remove('flex');
                    document.getElementById('sort').addEventListener('click', () => {
                        card.sort((a,b)=>b.price-a.price);
                        car.innerHTML="";
                        card.forEach(cards => {
                       
                                const cardDiv = document.createElement('div');
                                cardDiv.classList.add('flex');
                                cardDiv.innerHTML = `<div class="card bg-base-100 w-full shadow-xl mx-2">
                            <figure class=" lg:px-6 pt-10">
                            <img
                              src="${cards.image}"
                              alt="Shoes"
                              class="rounded-xl" />
                            </figure>
                            <div class="card-body">
                            <h2 class="card-title">${cards.pet_name}</h2>
                            <p><i class="fa-regular fa-rectangle-list fa-xs"></i>
                            Breed:${cards.breed ? cards.breed:'Not Availble'}</p>
                            <p><i class="fa-regular fa-calendar fa-xs"></i>
                            Birth:${cards.date_of_birth ? cards.date_of_birth:'Not Availble'}</p>
                            <p><i class="fa-solid fa-venus fa-xs"></i>
                            Gender:${cards.gender ? cards.gender :'Not Availble'}</p>
                            <p><i class="fa-solid fa-dollar-sign fa-xs"></i>
                            Price:${cards.price? cards.price :'Not Availble'}</p>
                            <div class="grid grid-cols-3 gap-4 text-back w-full pt-2"">
                                <button class="btn btn-ghost border border-gray-200" onclick=liked(${cards.petId})><i id="like-icon-${cards.petId}" class="fa-regular fa-thumbs-up fa-lg"></i></button>
                                <button class="btn btn-ghost border-gray-200 " onclick=adopted(${cards.petId}) id="adopted${cards.petId}">Adopt</button>
                                <button class="btn btn-ghost border-gray-200 " onclick=Details(${cards.petId}) id="details${cards.petId}">Details</button>
                                </div>
                            </div>
                            </div>
                                `;
                                car.appendChild(cardDiv);
                            });
                        })
                    const cardDiv = document.createElement('div');
                    cardDiv.classList.add('flex');
                    cardDiv.innerHTML = `<div class="card bg-base-100 w-full shadow-xl mx-2">
                <figure class=" lg:px-6 pt-10">
                <img
                  src="${cards.image}"
                  alt="Shoes"
                  class="rounded-xl" />
                </figure>
                <div class="card-body">
                <h2 class="card-title">${cards.pet_name}</h2>
                <p><i class="fa-regular fa-rectangle-list fa-xs"></i>
                Breed:${cards.breed ? cards.breed:'Not Availble'}</p>
                <p><i class="fa-regular fa-calendar fa-xs"></i>
                Birth:${cards.date_of_birth ? cards.date_of_birth:'Not Availble'}</p>
                <p><i class="fa-solid fa-venus fa-xs"></i>
                Gender:${cards.gender ? cards.gender :'Not Availble'}</p>
                <p><i class="fa-solid fa-dollar-sign fa-xs"></i>
                Price:${cards.price? cards.price :'Not Availble'}</p>
                <div class="grid grid-cols-3 gap-4 text-back w-full pt-2"">
                    <button class="btn btn-ghost border border-gray-200" onclick=liked(${cards.petId})><i id="like-icon-${cards.petId}" class="fa-regular fa-thumbs-up fa-lg"></i></button>
                    <button class="btn btn-ghost border-gray-200 " onclick=adopted(${cards.petId}) id="adopted${cards.petId}">Adopt</button>
                    <button class="btn btn-ghost border-gray-200 " onclick=Details(${cards.petId}) id="details${cards.petId}">Details</button>
                    </div>
                </div>
                </div>
                    `;
                    car.appendChild(cardDiv);
                });
            }
        
            }, 2000);
            
        });
    }

}
function adopted(id){
    if(!adop.includes(id)){
        adop.push(id);
        const likeid = document.getElementById(`adopted${id}`);
        console.log(likeid);
        
        likeid.innerText ='Adopted';
        likeid.classList.add('bg-gray-200');
        const modalhtml = `
        <dialog id="my_modal_4" class="modal">
                  <div class="modal-box text-center"> 
                    <h3 class="text-3xl font-bold">Congratulations!</h3>
                    <p class="py-4 texl-lg text-gray-400">Adoption process has been start for your pet</p>
                    <p class="texl-5xl font-bold" id="countdown"></p>
                    <div class="modal-action">
                      <form method="dialog">
                        <!-- if there is a button, it will close the modal -->
                        <button class="btn hidden" id="close-modal">Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>
                `;
                const modalContainer = document.createElement('div');
                modalContainer.innerHTML = modalhtml;
                car.appendChild(modalContainer);
            
                const modal = document.getElementById('my_modal_4');
                modal.showModal();
                let Countdown = document.getElementById('countdown');
                let count = 3;
                Countdown.innerText = count;
                Countdown.classList.add('text-3xl');
                const countDiv = setInterval(()=>{
                    count--;
                    Countdown.innerText = count;
                    if(count === 0){
                        modal.close();
                        clearInterval(countDiv);
                    }
                },1000);

    
        document.getElementById('close-modal').addEventListener('click',function(e){
            e.preventDefault();
            clearInterval(countDiv);
            modal.close();
        });
    }
 

}


function Details(id){
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`).then(res=>res.json()).then(data=>{
    console.log(data.petData);
    const modalhtml = `
        <dialog id="my_modal_1" class="modal">
              <div class="modal-box max-w-lg lg:max-w-xl space-y-1">
              <img class="w-full m-auto h-52 lg:h-72" src="${data.petData.image}" alt="Pet Image"> 
                <h3 class="text-3xl font-bold pt-2">${data.petData.pet_name}</h3>
                <div class="flex flex-col lg:flex-row justify-start lg:gap-4 text-gray-500">
                    <div class="">
                    <p><i class="fa-regular fa-rectangle-list fa-xs"></i>
                Breed: ${data.petData.breed ? data.petData.breed:'Not Availble'}</p>
                
                <p><i class="fa-solid fa-venus fa-xs"></i>
                Gender: ${data.petData.gender ? data.petData.gender :'Not Availble'}</p>
                <p><i class="fa-solid fa-venus fa-xs"></i>
                Vaccinated status: ${data.petData.vaccinated_status ? data.petData.vaccinated_status :'Not Availble'}</p>
                
                    </div>
                    <div class="">
                    <p><i class="fa-regular fa-calendar fa-xs"></i>
                Birth: ${data.petData.date_of_birth ? data.petData.date_of_birth:'Not Availble'}</p>
                <p><i class="fa-solid fa-dollar-sign fa-xs"></i>
                Price: ${data.petData.price? data.petData.price :'Not Availble'}</p>
                    </div>
                </div>
                <p class="texl-xl  font-bold">Details Information</p>
                <p class=" text-gray-500"> ${data.petData.pet_details}</p>
                <div class="modal-action">
                  <form method="dialog" class="w-screen">
                    <!-- if there is a button, it will close the modal -->
                    <button class="btn bg-[#0E7A8133] text-[#0E7A81] w-full" id="closemodal">Close</button>
                  </form>
                </div>
              </div>
            </dialog>`

    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalhtml;
    car.appendChild(modalContainer);

    const modal = document.getElementById('my_modal_1');
    modal.showModal();
    document.getElementById('closemodal').addEventListener('click',function(e){
        e.preventDefault();
        modal.close();
    });
    });
    
}

