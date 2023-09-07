const loadPhone = async (searchText = '12') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    //console.log(phones);
    displayPhones(phones);
}

const displayPhones = phones => {
    console.log(phones);
    // 1 where to place 
    const phoneContainer = document.getElementById('phone-container');

    // clear phone container cards before adding new cards

    phoneContainer.textContent = '';

    //more than 12 phone show



    const showAllContainer = document.getElementById('show-all-container');

    if (phones.length > 10) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }


    //display only 10 phones

    phones = phones.slice(0, 10);


    phones.forEach(phone => {
        console.log(phone)
        //2 create a div
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card  bg-gray-100 p-4 shadow-xl`;

        //set innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class= "btn btn-primary" >Show Details</button>
            </div>
        </div>
        `;
        // 4 append child

        phoneContainer.appendChild(phoneCard);
    });

    // hide spinner

    toggleLoadingSpinner(false);
}

const handleShowDetails = async (id) => {
    console.log('SHOW', id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
    console.log(phone);


}

const showPhoneDetails = (phone) => {
    //show the modal
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
<img src="${phone.image}" alt="">
<p><span></span>storage : ${phone?.mainFeatures?.storage
        }</p>
        
        <p><span></span>displaysize : ${phone?.mainFeatures?.displaySize
        }</p>
        <p><span></span>chipset
        : ${phone?.mainFeatures?.chipSet

        }</p>

        <p><span></span>memory
        : ${phone?.mainFeatures?.memory

        }</p>

        <p><span></span>slug
        : ${phone?.others?.slug

        }</p>

        <p><span></span>GPS
        : ${phone?.others?.GPS

        }</p>


`

    //show the modal
    show_details_modal.showModal();
}
//handle search button

const handleSearch = () => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);
}

/*const handleSearch2 = () => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field2');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);
}*/

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}


loadPhone();