const loadData= () =>{
    const inputField = document.getElementById("input-field");
    const inputValue = inputField.value;

    if(inputValue == ''){
        document.getElementById("phone-details").innerHTML = `
            <h4 class="text-danger text-center fw-bold">Please enter a valid brand name</h4>
        `;
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
        fetch(url)
        .then(response => response.json())
        .then(data => displayPhone(data.data))
        inputField.value = "";
    }
}

const displayPhone = phones => {
    document.getElementById("phone-details").innerHTML = "";
    document.getElementById("card-container").innerHTML = "";
    for(const phone of phones){
        // console.log(phone);
        const parentDiv = document.getElementById("card-container");
        const div = document.createElement("div");
        div.classList.add('col')
        div.innerHTML = `
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4 class="card-title">Model: ${phone.phone_name}</h4>
                    <p class="card-text">Brand: ${phone.brand}</p>
                </div>
                <div class="card-footer">
                    <a onClick="detailsPhone('${phone.slug}')" href="#" class="btn btn-primary">See Details</a>
                </div>
            </div>
        `;
        parentDiv.appendChild(div);
    }
}

const detailsPhone = phoneId =>{
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayDetails(data))
}

const displayDetails = phoneId =>{
    document.getElementById("phone-details").innerHTML = "";
    console.log(phoneId);
    const sensors = phoneId.data.mainFeatures.sensors;
    const phoneDetails = document.getElementById("phone-details");
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card mx-auto mb-5" style="width: 18rem;">
            <img src="${phoneId.data.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title">Model: ${phoneId.data.name}</h4>
                <p class="fst-italic">${phoneId.data.releaseDate}</p>
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
                    <span class="fw-bolder">Bluetooth: </span>${phoneId.data.others.Bluetooth}<hr>
                    <span class="fw-bolder">GPS: </span>${phoneId.data.others.GPS}<hr>
                    <span class="fw-bolder">NFC: </span>${phoneId.data.others.NFC}<hr>
                    <span class="fw-bolder">Radio: </span>${phoneId.data.others.Radio}<hr>
                    <span class="fw-bolder">USB: </span>${phoneId.data.others.USB}<hr>
                    <span class="fw-bolder">WLAN: </span>${phoneId.data.others.WLAN}<hr>
                </p>
            </div>
        </div>
    `;
    phoneDetails.appendChild(div);
}