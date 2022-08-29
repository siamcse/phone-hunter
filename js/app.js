const loadPhones = async(searchText) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}
const displayPhones = (phones) =>{
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.innerHTML = '';
    
    const notFound = document.getElementById('not-found');
    if(phones.length === 0){
        notFound.classList.remove('d-none');
    }
    else{
        notFound.classList.add('d-none');
    }
    phones.slice(0,10).forEach(phone =>{
        console.log(phone);
        const {phone_name,image,brand} = phone;
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="card p-4">
                <img src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional
                content. This content is a little bit longer.</p>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    })
}
document.getElementById('search-btn').addEventListener('click',function(){
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText);
    searchField.value = '';
})
// loadPhones();