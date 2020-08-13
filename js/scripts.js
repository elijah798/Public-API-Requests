const gallery = document.getElementById('gallery');
const cards = document.getElementsByClassName('card');

//function to add reusable fetch request
function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(res => res.json())
        .catch(error => console.log(error))
}
//function to check status of the request
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

//public api call to randomUSer
fetchData('https://randomuser.me/api/?results=12')
    .then(data => {

        //for loop to add each retrieved user to a card and modal
        for (var i = 0; i < data.results.length; i++) {
            //variables indicated personal information of retrieved users
            const person = data.results[i];
            const picture = person.picture.large;
            const name = person.name;
            const email = person.email;
            const location = person.location;
            //variable to add date to users DOB
            var date = new Date(person.dob.date);
            //modal template with user information.
            const modal = `<div class="modal-container" style="display:none;" id="${name.first}_${name.last}">
            <div class="modal"">
                <button type="button" id="modal-close-btn" class="modal-close-btn" onclick='this.parentNode.parentNode.style.display = "none"' ><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${picture}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
                    <p class="modal-text">${email}</p>
                    <p class="modal-text cap">${location.city}</p>
                    <hr>
                    <p class="modal-text">(555) 555-5555</p>
                    <p class="modal-text">${location.street.number} ${location.street.name}, ${location.city}, ${location.state} ${location.postcode}</p>
                    <p class="modal-text">Birthday: ${((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()}</p>
                </div>
            </div>
            </div>`
            //html template for cards to display users
            const html = `
        <div class="card cards" id='${name.first}_${name.last}'>
        <div class="card-img-container cards">
            <img class="card-img cards" src="${picture}" alt="profile picture">
        </div>
        <div class="card-info-container cards">
            <h3 id="name" class="card-name cap cards">${name.first} ${name.last}</h3>
            <p class="card-text cards">${email}</p>
            <p class="card-text cap cards">${location.city}, ${location.state}</p>
        </div>
    </div>
    
            
            
    `;
    //adds the modals and cards to index.html
            gallery.innerHTML += html;
            document.getElementById('modals').innerHTML += modal;
        }
    })
    .then(check =>{
//checks to see if a card was clicked on to display modal for that specific person
gallery.addEventListener('click', (e) => {
    if(e.target.classList.contains('cards')){
    //checks to see if the user clicked on a card and nothing else.
    //queryselector that grabs the specific ID of the card to dispaly the modal.
    const selected = e.target.parentNode.querySelector(".card-name").textContent.split(" ").join("_")
    let select = document.querySelectorAll(`#${selected}`);
    select[1].style.display = '';
    }
    
})
    })


