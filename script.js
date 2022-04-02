const list = document.querySelector("#list");
const typingText = document.querySelector(".typing-text")
const inputField = document.querySelector(".container .input-field")
const timetag = document.querySelector(".time span b")
const mistakeTag = document.querySelector(".mistake span")
let wpmTag = document.querySelector(".wpm span");
let cpmTag = document.querySelector(".cpm span");
const reset = document.querySelector("button");
const text = document.querySelector(".finish")
const result = document.querySelector(".finish span")
const overlay = document.querySelector(".overlay")

let timer,
maxTime = 60, 
timeleft = maxTime,
charIndex = mistakes = isTyping = 0

function randomParagraph() {
    let par = indo
    if(list.value == "ina") {
        par = indo
    }else if(list.value == "eng") {
        par = english
    }
    //menghitung banyak index paragraf
    let randIndex = Math.floor(Math.random()*par.length);
    typingText.innerHTML = ""//fungsi ini digunakan agar saat tombol coba lagi di click tidak akan menambah tulisan baru
    //memasukan hasil dari paragraf acak ke typing text
    par[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag
    });
    typingText.querySelectorAll("span")[0].classList.add("active")
}
list.addEventListener("change", randomParagraph)

function initTyping () {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];
    // jika masih ada waktu fungsi dibawah akan berjalan
   if (charIndex < characters.length - 1 && timeleft > 0) {
         //agar fungsi timer tidak dipanggil setiap user memasukan nilai
    if (!isTyping) {
        timer = setInterval(initTimer, 1000);
        isTyping = true;
        overlay.classList.add("overlayfull")
    }
    //untuk menghapus inputan
    if (typedChar == null) {
        charIndex--;
        if(characters[charIndex].classList.contains("salah")) {
            mistakes--;
        }
        characters[charIndex].classList.remove("benar", "salah")
    //untuk fungsi jika sama
    } else {
        if(characters[charIndex].innerText === typedChar) {
            characters[charIndex].classList.add("benar")
        }else {
            mistakes++;
            characters[charIndex].classList.add("salah")
        }
        //untuk menghitung index karakter yang diketikan
        charIndex++;
    }
    characters.forEach(span => span.classList.remove("active"))
    characters[charIndex].classList.add("active");
    let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeleft) * 60);
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    wpmTag.innerText = wpm
    mistakeTag.innerText = mistakes;
    //menghitung karakter yang dimasukan selama satu menit
    let cpm = charIndex - mistakes
    cpmTag.innerText = cpm;
   }else{ // jika waktu sudah habis maka matikan input field agar user tidak bisa memasukan lagi inputannya
    clearInterval(timer);
    inputField = ""
   }
}

//fungsi untuk mengatur waktu
function initTimer () {
    let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeleft) * 60);
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    wpmTag.innerText = wpm
    mistakeTag.innerText = mistakes;
    //menghitung karakter yang dimasukan selama satu menit
    let cpm = charIndex - mistakes
    cpmTag.innerText = cpm;
    if(timeleft > 0) {
        timeleft--;
        timetag.innerText = timeleft;
    }else {
        clearInterval(timer);
        text.style.display = "block"
        result.innerText = "The result is : Your WPM is " + wpm + ". " + "Your CPM is " + cpm + "." + " With " + mistakes + " mistakes. "
    }
}

function tryAgain () {
    randomParagraph()
    timeleft = maxTime,
    charIndex = mistakes = isTyping = 0
    timetag.innerText = timeleft
    // mistakeTag.innerHTML = mistakes
    mistakeTag.innerText = 0
    wpmTag.innerText = 0
    cpmTag.innerText = 0
    inputField.value = ""
    clearInterval(timer);
    text.style.display = "none"
    overlay.classList.remove("overlayfull")
}
randomParagraph()
inputField.addEventListener('input', initTyping)
reset.addEventListener("click", tryAgain)