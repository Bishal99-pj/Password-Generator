const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~"
}

const generatePassword = ()=>{
    let staticPwd = "",
    randomPwd = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;

    options.forEach(option=>{
        if(option.checked){
            if(option.id !== "exc-duplicate" && option.id !== "spaces"){
                staticPwd += characters[option.id];
            }else if (option.id === "spaces") {
                staticPwd += `  ${staticPwd}  `;
            }else{
                excludeDuplicate= true;
            }
        }
    });

// main code

    for (let i = 0; i < passLength; i++) {
        let randomchar = staticPwd[Math.floor(Math.random()* staticPwd.length)];
        if(excludeDuplicate){
            !randomPwd.includes(randomchar) || randomchar == " " ? randomPwd += randomchar : i--;
        }else{
            randomPwd += randomchar;
        } 
    }
    passwordInput.value = randomPwd;
};

const updatePassIndicator = ()=>{
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <=16 ? "medium" : "strong"; 
}

const updateSlider = ()=>{
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}

updateSlider();

// function to copy password

function unsecuredCopytoClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy'); 
    } catch (err) {
        console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(textArea);
}

const copyPassword = ()=>{
    // navigator.clipboard.write(passwordInput.value);
    unsecuredCopytoClipboard(passwordInput.value);
    copyIcon.innerText = "check";
    copyIcon.style.color = "#4285f4";
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#707070";
    }, 1500);
}

copyIcon.addEventListener("click" , copyPassword);
lengthSlider.addEventListener("input" , updateSlider);
generateBtn.addEventListener("click" , generatePassword);