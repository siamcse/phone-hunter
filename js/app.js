const loadPhones = async(searchText,dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}
const displayPhones = (phones, dataLimit) =>{
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.innerHTML = '';
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 9){
        phones = phones.slice(0,9);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    //not found display
    const notFound = document.getElementById('not-found');
    if(phones.length === 0){
        notFound.classList.remove('d-none');
    }
    else{
        notFound.classList.add('d-none');
    }
    //display each phone
    phones.forEach(phone =>{
        // console.log(phone);
        const {phone_name,image,brand,slug} = phone;
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="card p-4">
                <img src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional
                    content. This content is a little bit longer.</p>
                    <button onclick="loadPhoneDetails('${slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Details</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    })
    //toggle stop
    toggleSpinner(false);
}
const processSearch = (dataLimit) =>{
    //toggle start
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText,dataLimit);
}
document.getElementById('search-btn').addEventListener('click',function(){
    processSearch(9);
})
//input field enter press eventListener
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(9);
    }
});

// show all 
document.getElementById('show-all-btn').addEventListener('click',function(){
    processSearch();
}) 
// load spinner 
const toggleSpinner = isLoading =>{
    const loader = document.getElementById('loader');
    if(isLoading){
        loader.classList.remove('d-none');
    }
    else{
        loader.classList.add('d-none');
    }
}
const loadPhoneDetails = async model =>{
    const url =`https://openapi.programming-hero.com/api/phone/${model}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}
const displayPhoneDetails = phone =>{
    console.log(phone);
    const {name, image, mainFeatures, releaseDate, brand} = phone;
    const {displaySize,chipSet,memory,sensors} = mainFeatures;
    const phoneTitle = document.getElementById('phoneDetailModalLabel');
    phoneTitle.innerText = name;
    const phoneDetails = document.getElementById('modal-body');
    phoneDetails.innerHTML = `
        <div class="card mb-3" style="max-width: 740px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${image}" class="img-fluid rounded-start" alt="">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Brand: ${brand}</h5>
                        <p class="card-text">${releaseDate ? releaseDate:'Release date not found.'}</p>
                        <p class="card-text">Display: ${displaySize}</p>
                        <p class="card-text">Chipset: ${chipSet}</p>
                        <p class="card-text">Memory: ${memory}</p>
                        <p class="card-text">Sensors: ${sensors}</p>
                    </div>
                </div>
            </div>
        </div>
    `
}
loadPhones('apple');