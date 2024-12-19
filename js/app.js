export function generatedPassword() {
  let forma = document.forms["forma"];

  const categorias = {
    peliculas: [
      "Inception",
      "Titanic",
      "Avatar",
      "Matrix",
      "Gladiator",
      "Interstel",
      "Joker",
      "Parasite",
      "Frozen",
      "Coco",
      "Up",
      "ToyStory",
      "Nemo",
      "TheLion",
      "Aladdin",
      "Mulan",
      "Shrek",
      "Harry",
      "LordRings",
      "StarWars",
    ],
    tecnologia: [
      "Java",
      "Python",
      "Block",
      "AI",
      "Cloud",
      "IoT",
      "BigData",
      "Machine",
      "Security",
      "5G",
      "QuantumC",
      "AR",
      "VR",
      "Robotic",
      "Drones",
      "Wearables",
      "3DPrint",
      "Biotech",
      "Nanotec",
      "Computing",
    ],
    musica: [
      "Rock",
      "Jazz",
      "Pop",
      "Classical",
      "HipHop",
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
    ],
    deportes: [
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
      "Skateboard",
      "Escalada",
      "Karate",
      "Judo",
    ],
  };

  //Const and lets
  let length = forma["length"].value;
  const minValue = parseInt(forma["length"].min, 10);
  const maxValue = parseInt(forma["length"].max, 10);
  let categoriaSeleccionada = forma["categorias"].value;
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

  //Excepción carácteres
  if (char === "") {
    alert("Selecciona al menos un tipo de carácter.");
    return;
  }

  //Excepción lenght
  if (length < minValue || length > maxValue) {
    alert(`La longitud debe estar entre ${minValue} y ${maxValue} caracteres.`);
    return;
  }

  //Seleccion de categoria
  let palabraAleatoria = "";
  let password = "";
  if (categoriaSeleccionada !== "ninguna") {
    const palabras = categorias[categoriaSeleccionada];
    const randomIndex = Math.floor(Math.random() * palabras.length);
    palabraAleatoria = palabras[randomIndex];
  }

  password = palabraAleatoria;
  while (password.length < length) {
    const randomChar = Math.floor(Math.random() * char.length);
    password += char[randomChar];
  }
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
  document.getElementById("password").value = password;

  const score = calcularStrength(password);
  updateStrengthBar(score);
}

//Calcular Fuerza Password
function calcularStrength(password) {
  let score = 0;

  //puntuación
  if (password.length >= 10) score++;
  if (password.length >= 12) score++;

  if (/[A-Z]/.test(password)) score++; //Mayúsculas
  if (/[a-z]/.test(password)) score++; //Minusculas
  if (/[0-9]/.test(password)) score++; //Numbers
  if (/[^A-Za-z0-9]/.test(password)) score++; //Symbols

  return score;
}

//Update Barra
function updateStrengthBar(score) {
  const strengthBar = document.getElementById("strength-bar");
  const strengthLabel = document.getElementById("strength-label");

  const stringFuerza = "<strong>Fuerza: </strong>"
  const porcentaje = (score / 6) * 100;
  strengthBar.style.width = `${porcentaje}%`;

  if (score <= 2 ){
    strengthBar.className = "strength-bar";
    strengthLabel.innerHTML =  stringFuerza+"Muy Débil";
  }else if ( score == 3 ){
    strengthBar.className = "strength-bar good";
    strengthLabel.innerHTML =  stringFuerza+"Debil";
  }else if ( score == 4 ){
    strengthBar.className = "strength-bar good";
    strengthLabel.innerHTML =  stringFuerza+"Media";
  }else {
    strengthBar.className = "strength-bar strong";
    strengthLabel.innerHTML =  stringFuerza+"Fuerte";
  }
}

//Mostrar Notificación
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

//Acción de longitud min-max
function cambiarLongitud(accion) {
  let longitud = document.getElementById("length");
  let valorActual = parseInt(longitud.value);

  if (accion === "sumar" && valorActual < longitud.max) {
    longitud.value = valorActual + 1;
  } else if (accion === "restar" && valorActual > longitud.min) {
    longitud.value = valorActual - 1;
  }
}

//Evento de copyBoard
document.getElementById("copy").addEventListener("click", function () {
  const passwordInput = document.getElementById("password");
  passwordInput.select();
  navigator.clipboard
    .writeText(passwordInput.value)
    .then(() => showNotification("¡Contraseña copiada!"))
    .catch(() => showNotification("Error al copiar la contraseña"));
});

//Limpiar Formulario
document.getElementById("resetFormButton").addEventListener("click", () => {
  return location.reload();
});

//Generar Password
document.getElementById("generar").addEventListener("click", generatedPassword);

//Sumar longitud
document
  .getElementById("sumar")
  .addEventListener("click", () => cambiarLongitud("sumar"));

//Restar longitud
document
  .getElementById("restar")
  .addEventListener("click", () => cambiarLongitud("restar"));

window.generatedPassword = generatedPassword;
