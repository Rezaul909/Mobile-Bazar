// showing error massage 
const errorMassage = () =>{
    document.getElementById("phone-details").innerHTML = `
            <h1 class="text-danger text-center fw-bold">4<span class="fs-2">☹️</span>4</h1>
            <h5 class="text-danger text-center fw-normal">Not found. Please enter a valid brand name</h5>
        `;
        toggleSpinner('none');
}
// toggling spinner -----------------------------------------
const toggleSpinner = style => {
    document.getElementById("spinner").style.display = style;
}
// function for loading data ==========================================
const loadData= () =>{
    toggleSpinner('block');
    document.getElementById("phone-details").innerHTML = "";
    document.getElementById("card-container").innerHTML = "";
    const inputField = document.getElementById("input-field");
    const inputValue = inputField.value;

    if(inputValue == ''){
        errorMassage();
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
        fetch(url)
        .then(response => response.json())
        .then(data => displayPhone(data.data))  
        inputField.value = "";
    }
}
// function for displaying data =========================================
const displayPhone = phones => {
    // checking undefined values 
    if(phones == ''){
        errorMassage();
    }
    else{
        const parentDiv = document.getElementById("card-container");
        for(let i=0; i<20; i++){
            const phone = phones[i];
            const div = document.createElement("div");
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100 text-center rounded-pill">
                    <img src="${phone.image}" class="card-img-top rounded-3" alt="...">
                    <div class="card-body">
                        <h4 class="card-title">Model: ${phone.phone_name}</h4>
                        <p class="card-text">Brand: ${phone.brand}</p>
                    </div>
                    <div class="card-footer mx-auto rounded pb-2 mb-2">
                        <a onClick="detailsPhone('${phone.slug}')" href="#" class="btn btn-outline-success fw-bolder">See Details</a>
                    </div>
                </div>
            `;
            parentDiv.appendChild(div);
            toggleSpinner('none');
        }
    } 
}
// function for load phone details =====================================
const detailsPhone = phoneId =>{
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayDetails(data))
}
// function for show phone details =====================================
const displayDetails = phoneId =>{
    document.getElementById("phone-details").innerHTML = "";
    const sensors = phoneId.data.mainFeatures.sensors;
    const phoneDetails = document.getElementById("phone-details");

    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card mx-auto mb-5" style="width: 18rem;">
            <img src="${phoneId.data.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title">Model: ${phoneId.data.name}</h4>
                <p class="card-text">
                    <small>${phoneId.data.releaseDate ? phoneId.data.releaseDate : "No release date found!"}</small>
                </p>
                <p class="card-text">Brand: ${phoneId.data.brand} </p>
                <h5 class="text-info text-decoration-underline">Main Features:</h5>
                <p>
                    <span class="fw-bolder">Chip Set: </span>${phoneId.data.mainFeatures.chipSet}<hr>
                    <span class="fw-bolder">Display: </span>${phoneId.data.mainFeatures.displaySize}<hr>
                    <span class="fw-bolder">Memory: </span>${phoneId.data.mainFeatures.memory}<hr>
                    <span class="fw-bolder">Storage: </span>${phoneId.data.mainFeatures.storage}<hr>
                </p>
                <h5 class="text-info text-decoration-underline">Sensors:</h5>
                <p>${sensors}</p><hr>

                <h5 class="text-info text-decoration-underline">Others:</h5>
                <p>
                    <span class="fw-bolder">Bluetooth: </span>
                    ${phoneId.data.others ?.Bluetooth ? phoneId.data.others.Bluetooth : "Data is not found!"}<hr>
                    <span class="fw-bolder">GPS: </span>
                    ${phoneId.data.others ?.GPS ? phoneId.data.others.GPS : "Data is not found!"}<hr>
                    <span class="fw-bolder">NFC: </span>
                    ${phoneId.data.others ?.NFC ? phoneId.data.others.NFC : "Data is not found!"}<hr>
                    <span class="fw-bolder">Radio: </span>
                    ${phoneId.data.others ?.Radio ? phoneId.data.others.Radio : "Data is not found!"}<hr>
                    <span class="fw-bolder">USB: </span>
                    ${phoneId.data.others ?.USB ? phoneId.data.others.USB : "Data is not found!"}<hr>
                    <span class="fw-bolder">WLAN: </span>
                    ${phoneId.data.others ?.WLAN ? phoneId.data.others.WLAN : "Data is not found!"}
                </p>
            </div>
        </div>
    `;
    phoneDetails.appendChild(div);
}