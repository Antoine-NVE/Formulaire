// ------------
// VARIABLES
// ------------

// Inputs
const nomInput = document.getElementById("nomInput");
const prenomInput = document.getElementById("prenomInput");
const telephoneInput = document.getElementById("telephoneInput");
const emailInput = document.getElementById("emailInput");

// Messages d'erreur
const nomErreur = document.getElementById("nomErreur");
const prenomErreur = document.getElementById("prenomErreur");
const telephoneErreur = document.getElementById("telephoneErreur");
const emailErreur = document.getElementById("emailErreur");

// Boutons
const ajouter = document.getElementById("ajouter");
const trouver = document.getElementById("trouver");
const supprimer = document.getElementById("supprimer");

// Regex email
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Différentes vérifications
let erreur = 0;
let clic = false;
let espace = false;
let autocomplete = true;
let telephoneValue;

// ------------
// FONCTIONS
// ------------

// Teste l'input du nom
function nomTest() {
  erreur++;

  // Si aucune erreur
  if (nomInput.value.length >= 3 && nomInput.value.length <= 15) {
    erreur--;
    nomErreur.style.display = "none";
  }

  // Sinon, si le bouton "Ajouter" a déjà été cliqué
  else if (clic) {
    // Définie l'erreur
    try {
      if (nomInput.value.length == 0) throw "Champ obligatoire";
      if (nomInput.value.length < 3) throw "3 caractères minimum";
      if (nomInput.value.length > 15) throw "15 caractères maximum";
    } catch (error) {
      nomErreur.innerHTML = error;
    }

    // Fais apparaître le message d'erreur
    nomErreur.style.display = "block";
  }
}

// Teste l'input du prénom
function prenomTest() {
  erreur++;

  // Si aucune erreur
  if (prenomInput.value.length >= 3 && prenomInput.value.length <= 15) {
    erreur--;
    prenomErreur.style.display = "none";
  }

  // Sinon, si le bouton "Ajouter" a déjà été cliqué
  else if (clic) {
    // Définie l'erreur
    try {
      if (prenomInput.value.length == 0) throw "Champ obligatoire";
      if (prenomInput.value.length < 3) throw "3 caractères minimum";
      if (prenomInput.value.length > 15) throw "15 caractères maximum";
    } catch (error) {
      prenomErreur.innerHTML = error;
    }

    // Fais apparaître le message d'erreur
    prenomErreur.style.display = "block";
  }
}

// Teste l'input du téléphone
function telephoneTest() {
  erreur++;

  // Si aucune erreur
  if (telephoneInput.value.length == 14) {
    erreur--;
    telephoneErreur.style.display = "none";
  }

  // Sinon, si le bouton "Ajouter" a déjà été cliqué
  else if (clic) {
    // Définie l'erreur
    try {
      if (telephoneInput.value.length == 0) throw "Champ obligatoire";
      if (telephoneInput.value.length > 0) throw "10 chiffres requis";
    } catch (error) {
      telephoneErreur.innerHTML = error;
    }

    // Fais apparaître le message d'erreur
    telephoneErreur.style.display = "block";
  }
}

// Teste l'input de l'email
function emailTest() {
  erreur++;

  // Si aucune erreur
  if (emailRegex.test(emailInput.value) || emailInput.value.length == 0) {
    erreur--;
    emailErreur.style.display = "none";
  }

  // Sinon, si le bouton "Ajouter" a déjà été cliqué
  else if (clic) {
    // Définie l'erreur
    try {
      if (!emailRegex.test(emailInput.value)) throw "Email incorrect";
    } catch (error) {
      emailErreur.innerHTML = error;
    }

    // Fais apparaître le message d'erreur
    emailErreur.style.display = "block";
  }
}

// ------------------
// EVENT LISTENERS
// ------------------

// Détecte le changement du nom
nomInput.addEventListener("input", () => {
  nomInput.value = nomInput.value.trimStart();

  // Passage en majuscules
  nomInput.value = nomInput.value.toUpperCase();

  nomTest();
});

// Détecte le changement du prénom
prenomInput.addEventListener("input", () => {
  prenomInput.value = prenomInput.value.trim();

  // Passe la première lettre en majuscule et le reste en miniscules
  prenomInput.value =
    prenomInput.value.charAt(0).toUpperCase() +
    prenomInput.value.slice(1, prenomInput.value.length).toLowerCase();

  prenomTest();
});

// Détecte le changement du téléphone
telephoneInput.addEventListener("input", () => {
  telephoneInput.value = telephoneInput.value.trim();

  // Crée des espaces tous les 2 chiffres
  if (
    telephoneInput.value.length == 2 ||
    telephoneInput.value.length == 5 ||
    telephoneInput.value.length == 8 ||
    telephoneInput.value.length == 11
  ) {
    autocomplete = true;

    if (espace) {
      telephoneInput.value = telephoneInput.value.substr(
        0,
        telephoneInput.value.length - 1
      );

      espace = false;
    } else {
      telephoneInput.value = telephoneInput.value + " ";

      espace = true;
    }
  } else if (
    telephoneInput.value.length == 3 ||
    telephoneInput.value.length == 6 ||
    telephoneInput.value.length == 9 ||
    telephoneInput.value.length == 12
  ) {
    espace = true;
  } else {
    espace = false;
  }

  // Empêche d'avoir un numéro de plus de 10 chiffres (14 caractères avec les espaces)
  if (telephoneInput.value.length > 14) {
    telephoneInput.value = telephoneInput.value.substr(
      0,
      telephoneInput.value.length - 1
    );
  }

  if (telephoneInput.value.length == 10) {
    for (i = 0; i < 10; i++) {
      if (telephoneInput.value.charAt(i) == " ") {
        autocomplete = false;
      }
    }

    if (autocomplete) {
      telephoneValue = telephoneInput.value.slice(0, 2);
      for (i = 2; i < 9; i = i + 2) {
        telephoneValue += " ";
        telephoneValue += telephoneInput.value.slice(i, i + 2);
      }
      telephoneInput.value = telephoneValue;

      autocomplete = false;
    }
  }

  telephoneTest();
});

// Détecte le changement du mail
emailInput.addEventListener("input", () => {
  emailInput.value = emailInput.value.trim();

  // Passage en minuscules
  emailInput.value = emailInput.value.toLowerCase();

  emailTest();
});

// Détecte le clic du bouton "Ajouter un contact"
ajouter.addEventListener("click", (e) => {
  clic = true;

  // Refais tous les tests
  erreur = 0;
  nomInput.value = nomInput.value.trimEnd();
  nomTest();
  prenomTest();
  telephoneTest();
  emailTest();

  // Si une erreur est présente, enmpêche l'envoi du formulaire
  if (erreur > 0) {
    e.preventDefault();
  }
});
