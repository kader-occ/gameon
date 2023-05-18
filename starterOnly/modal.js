function editNav() {
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formRegister = document.getElementsByName("reserve");
const formSucces = document.getElementById('formSucces');
const closeBtn = document.querySelector(".close");
const contentModal = document.querySelector('.content');
const btnSubmitFormRegister = document.querySelector(".btn-submit");
const inputFirstName = document.querySelector("#first");
const inputLastName = document.querySelector("#last");
const inputEmail = document.querySelector("#email");
const inputBirthDate = document.querySelector("#birthdate");
const inputLocation = document.getElementsByName('location');
const inputCGU = document.getElementsByName('cgu');
const btnSubmit = document.getElementById("btnSubmit");
const errorForm = document.getElementById("errorForm");
const btnCloseFormSucces = document.getElementById('btnCloseFormSucces')

formSucces.style.display = 'none'

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
	modalbg.style.display = "block";
}

//Fermer le modal event
closeBtn.addEventListener('click', closeModal)

//Fermer le modal form
function closeModal() {
	contentModal.style.animation = "modalclose 0.8s forwards"
	setTimeout(() => {
		location.reload()
	}, 300);
}

//Button sublit form Event
btnSubmitFormRegister.addEventListener("click", (ev) => {
	ev.preventDefault()
	validate()
})

//Fonction input validation
function inputFormValidation(champs, type, element, msg = "") {
	element.textContent = msg;
	if (type === "error") {
		champs.classList.remove('formSucces')
		champs.classList.add('formError')
	} else {
		champs.classList.remove('formError')
		champs.classList.add('formSucces')
	}
}

//Fonction validation champ Prénom 
function valideFirstName() {
	if (inputFirstName.value.length < 2) {
		inputFormValidation(inputFirstName, 'error', errorFirst, "Veuillez entrer 2 caractères ou plus pour le champ du prénom !")
		return false;
	} else {
		inputFormValidation(inputFirstName, 'succes', errorFirst)
		return true;
	}
}

//Fonction validation champ Nom 
function valideLastName() {
	if (inputLastName.value.length < 2) {
		inputFormValidation(inputLastName, 'error', errorLast, "Veuillez entrer 2 caractères ou plus pour le champ du nom !")
		return false;
	} else {
		inputFormValidation(inputLastName, 'succes', errorLast)
		return true;
	}
}

//Fonction validation champ Email
const validateFormatEmail = () => {
	return inputEmail.value.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
};

function valideEmail() {
	if (validateFormatEmail()) {
		inputFormValidation(inputEmail, 'succes', errorEmailFormat)
		return true;
	} else {
		inputFormValidation(inputEmail, 'error', errorEmailFormat, "Format email invalide !")
		return false;
	}
}

//Fonction validation champ Date de naisssance 
function valideBirthDate() {
	if (inputBirthDate.value.length < 10) {
		inputFormValidation(inputBirthDate, 'error', errorBirthdate, "Date de naissance incomplète !")
		return false;
	} else {
		let anneeNaissance = inputBirthDate.value.split("-")[0];
		if (anneeNaissance > 1900 && anneeNaissance < 2020) {
			inputFormValidation(inputBirthDate, 'succes', errorBirthdate)
			return true;
		} else {
			inputFormValidation(inputBirthDate, 'error', errorBirthdate, "Année de naissance incorrecte !")
			return false;
		}

	}
}

//Fonction check tournoi Location
function validateLocation() {
	let location = document.querySelectorAll('input[name="location"]:checked');
	if (location[0] === undefined) {
		errorLocation.textContent = "Ville tournoi requis !"
		return false
	} else {
		errorLocation.textContent = ""
		return true
	}
}

//Fonction check CGU
function validateCGU() {
	let cgu = document.querySelector('input[name="cgu"]:checked');
	if (!cgu) {
		errorForm.textContent = "Veuillez accepter les conditions d'utilisation !"
		return false
	} else {
		btnSubmit.disabled = false;
		errorForm.textContent = ""
		return true;
	}
}

//Valider le formulaire d'inscription
function validate() {
	if (valideFirstName() && valideLastName() && valideEmail() && valideBirthDate() && validateLocation() && validateCGU()) {
		formRegister[0].style.display = 'none'
		formSucces.style.display = "flex"
	}
}

btnCloseFormSucces.addEventListener('click', closeModal)
