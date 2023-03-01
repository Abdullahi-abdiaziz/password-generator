const
    lengthSlider = document.querySelector('.pass-length input'),
    options = document.querySelectorAll('.option input'),
    copyIcon = document.querySelector('.input-box span'),
    passwordInput = document.querySelector('.input-box input'),
    passwordIndicator = document.querySelector('.pass-indicator'),
    generateBtn = document.querySelector('.generate-btn');

const characters = {
    lowercase : "abcdefghijklmnopqrstuvwxyz",
    uppercase : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers : "1234567890",
    symbols : "{([~!@#$%^&*])}+|_-:?<>.,;"
};

const generatepassword = () => {
    let staticPassword = "",
    randomPassword = "",
    excludeDuplicates = false,
    passLength = lengthSlider.value;

    options.forEach(option => { // looping through each options checkbox
        if(option.checked) { // if checkbox is checked
            if(option.id !== "exc-duplicates" && option.id !== "spaces") {
                staticPassword += characters[option.id]
            }
            else if(option.id === "spaces") {
                staticPassword += `  ${staticPassword}  `;
            }
            else {
                excludeDuplicates = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplicates) {
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        }
        else {
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword;
}
updatePassIndicator = () => {
    passwordIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}
const updateSlider = () => {
    document.querySelector('.pass-length span').innerText = lengthSlider.value;
    generatepassword();
    updatePassIndicator();
}
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = 'check';
    setTimeout(() => {
        copyIcon.innerText = "copy_all"
    }, 1500)
}
copyIcon.addEventListener('click', copyPassword);
lengthSlider.addEventListener('input', updateSlider);
generateBtn.addEventListener('click', generatepassword)