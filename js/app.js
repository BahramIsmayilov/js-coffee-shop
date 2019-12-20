eventListener();

function eventListener() {
    const ui = new UI();
    /* hide preloader */
    window.addEventListener("load", function(){
        ui.hidePreloader();
    });

    /*show nav */
    document.querySelector(".navBtn").addEventListener("click", function(){
        ui.navShow();
    });

    /* control the video */
    document.querySelector(".video__switch").addEventListener("click", function(){
        ui.controlVideo()
    });

    /* submit the form */
    document.querySelector(".drink-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.querySelector(".input-name").value;
        const lastName = document.querySelector(".input-lastName").value;
        const email = document.querySelector(".input-email").value;
        
        let value = ui.checkEmpty(name, lastName, email);
        if(value) {
            let customer = new Customer(name, lastName, email);
            ui.addCustomer(customer);
            ui.showFeedback("custumer added to the list", "success");
            ui.emptyValue();
        }
        else{
            ui.showFeedback("some form values empty", "error");
        }
    });

    // display modal
    const links = document.querySelectorAll(".work-item__icon");

    links.forEach(function(item) {
        item.addEventListener("click", function(event) {
            ui.showModal(event);
        })
    });
    //close modal
    document.querySelector(".work-modal__close").addEventListener("click", function() {
        ui.closeModal();
    });
}

/* constructor function */
function UI() {
}

/*hide preloader */
UI.prototype.hidePreloader = function() {
    document.querySelector(".preloader").style.display = "none";
}
/*show nav */
UI.prototype.navShow = function() {
    document.querySelector(".nav").classList.toggle("nav_show");
}
/* control the video */
UI.prototype.controlVideo = function() {
    let btn = document.querySelector(".video_switch-btn");
    if(!btn.classList.contains("btnSlide")) {
        btn.classList.add("btnSlide");
        document.querySelector(".video__item").pause();
    }
    else {
        btn.classList.remove("btnSlide");
        document.querySelector(".video__item").play();
    }
}
/* check for empty values */
UI.prototype.checkEmpty = function(name, lastName, email) {
    let result;
    if(name === "" || lastName === "" || email === "") {
        result = false;
    }
    else {
        result = true;
    }
    return result;
}
/* show feedback */
UI.prototype.showFeedback = function(text, type) {
    const formFeedback = document.querySelector(".drink-form__feedback");
    if(type === "success") {
        formFeedback.classList.add("success");
        formFeedback.innerHTML = text;
        this.removeAlert("success");
    }
    else if(type === "error") {
        formFeedback.classList.add("error");
        formFeedback.innerHTML = text;
        this.removeAlert("error");

    }
}
/* remove alert feedback */
UI.prototype.removeAlert = function(type) {
    setTimeout(function(){
        document.querySelector(".drink-form__feedback").classList.remove(type);
    },3000);
}
//add customer
UI.prototype.addCustomer = function(customer) {
    const images = [1, 2, 3, 4, 5];
    let random = Math.floor(Math.random() * images.length);
    const mainDiv = document.querySelector(".drink-card__list");
    const div = document.createElement("div");
    div.classList.add("person");
    div.innerHTML = `
        <img src="img/person-${random}.jpeg" alt="person" class="person__thumbnail">
        <h4 class="person__name">${customer.name}</h4>
        <h4 class="person__last-name">${customer.lastName}</h4>
    `;
    mainDiv.appendChild(div);
}
function Customer(name, lastName, email) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
}
//clear fields
UI.prototype.emptyValue = function() {
    document.querySelector(".input-name").value = "";
    document.querySelector(".input-lastName").value = "";
    document.querySelector(".input-email").value = "";
}

/* show modal */
UI.prototype.showModal = function(event) {
    event.preventDefault();
   if(event.target.parentElement.classList.contains("work-item__icon")) {
        let id = event.target.parentElement.dataset.id;
        
        const modal = document.querySelector(".work-modal");
        const modalItem = document.querySelector(".work-modal__item");
        
        modal.classList.add("work-modal--show");
        modalItem.style.backgroundImage = `url(../img/work-${id}.jpeg)`;
   }
}
//hide module
UI.prototype.closeModal = function() {
    document.querySelector(".work-modal").classList.remove("work-modal--show");
}