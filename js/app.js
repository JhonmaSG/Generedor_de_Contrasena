export function generatedPassword() {
  let forma = document.forms["forma"];

  let itemList = document.getElementById("categorias");
  let collection = itemList.selectedOptions;

  const peliculas = [
    "Inception",
    "Titanic",
    "Avatar",
    "Matrix",
    "Gladiator",
    "Interstellar",
    "Joker",
    "Parasite",
    "Frozen",
    "Coco",
    "Up",
    "ToyStory",
    "FindingNemo",
    "TheLionKing",
    "Aladdin",
    "Mulan",
    "Shrek",
    "HarryPotter",
    "LordOfTheRings",
    "StarWars",
  ];
  const tecnologia = [
    "JavaScript",
    "Python",
    "Blockchain",
    "AI",
    "Cloud",
    "IoT",
    "BigData",
    "MachineLearning",
    "Cybersecurity",
    "5G",
    "Quantum Computing",
    "AR",
    "VR",
    "Robotics",
    "Drones",
    "Wearables",
    "3DPrinting",
    "Biotechnology",
    "Nanotechnology",
    "EdgeComputing",
  ];
  const musica = [
    "Rock",
    "Jazz",
    "Pop",
    "Classical",
    "Hip-hop",
    "Blues",
    "Reggae",
    "Country",
    "Electronic",
    "Folk",
    "Soul",
    "R&B",
    "Metal",
    "Punk",
    "Disco",
    "Funk",
    "Gospel",
    "Opera",
    "Salsa",
    "Reggaeton",
  ];
  const deportes = [
    "Futbol",
    "Baloncesto",
    "Tenis",
    "Natacion",
    "Ciclismo",
    "Atletismo",
    "Boxeo",
    "Rugby",
    "Criquet",
    "Golf",
    "Voleibol",
    "Beisbol",
    "Hockey",
    "Esqui",
    "Snowboard",
    "Surf",
    "Skateboarding",
    "Escalada",
    "Karate",
    "Judo",
  ];

  //Const and lets
  let length = forma["length"].value;
  let useUpperCase = forma["uppercase"].checked;
  let useLowerCase = forma["lowercase"].checked;
  let useNumbers = forma["numbers"].checked;
  let useSymbols = forma["symbols"].checked;

  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numbersChars = "0123456789";
  const symbolsChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  let char = "";
  if (useUpperCase) char += `${upperCaseChars}`;
  if (useLowerCase) char += `${lowerCaseChars}`;
  if (useNumbers) char += `${numbersChars}`;
  if (useSymbols) char += `${symbolsChars}`;

  if (char === "") {
    alert("Selecciona al menos un tipo de carácter.");
    return;
  }

  let password = "";
  //console.log(collection[1]);
  if(true) {
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * char.length);
        password += char[randomIndex];
      }
    
      document.getElementById("password").value = password;
  }
}

document.getElementById("copy").addEventListener("click", function () {
  const passwordInput = document.getElementById("password");
  passwordInput.select();
  navigator.clipboard
    .writeText(passwordInput.value)
    .then(() => showNotification("¡Contraseña copiada!"))
    .catch(() => showNotification("Error al copiar la contraseña"));
});

function showNotification(message, duration = 1500) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.classList.remove("hidden");
  notification.style.opacity = "1";

  //ocultar
  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      notification.classList.add("hidden");
    }, 300);
  }, duration);
}

function cambiarLongitud(accion) {
  let longitud = document.getElementById("length");
  let valorActual = parseInt(longitud.value);

  if (accion === "sumar" && valorActual < longitud.max) {
    longitud.value = valorActual + 1;
  } else if (accion === "restar" && valorActual > longitud.min) {
    longitud.value = valorActual - 1;
  }
}

function resetFormulario() {
  document.getElementById("password").value = "";
}

document
  .getElementById("resetFormButton")
  .addEventListener("click", resetFormulario);
document.getElementById("generar").addEventListener("click", generatedPassword);
document
  .getElementById("sumar")
  .addEventListener("click", () => cambiarLongitud("sumar"));
document
  .getElementById("restar")
  .addEventListener("click", () => cambiarLongitud("restar"));

window.generatedPassword = generatedPassword;
