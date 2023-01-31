const step = document.querySelectorAll(`.stepWrapper`);
const nextButton = document.querySelectorAll(`.nextButton`);
const previousButton = document.querySelectorAll(`.previousButton`)
const input = document.querySelectorAll(`.input`);
const invalidText = document.querySelectorAll(`.invalidText`);
const stepNumber = document.querySelectorAll(`.circleNumeration`);
const plans = document.querySelectorAll(`.selectPlanChild`);
const planSwitch = document.querySelector(`.switch`);
const checkboxWrapper = document.querySelectorAll(`.addonsChild`);
const change = document.querySelector(`.changeButton`);
const summaryPlanPrice = document.querySelector(`.summaryPlanPrice`);
const chosenAddonPrice = document.querySelectorAll(`.chosenAddonPrice`);
const chosenAddon = document.querySelectorAll(`.chosenAddon`);


let currentStep = 0;
let validate = false;
const regEx = /^\+?[1-9]\d{1,14}$/;

showStep(currentStep);


/* SHOW ACTIVE STEP + ACTIVE CIRCLE */
function showStep(e) {
    step.forEach(step => step.classList.remove(`show`));
    stepNumber.forEach(number => number.classList.remove(`activeCircle`));
    step[e].classList.add(`show`);
    if (currentStep <= 3) {
        stepNumber[e].classList.add(`activeCircle`);
    } else {
        stepNumber[3].classList.add(`activeCircle`);
    }
}


/* VALIDATION IN STEP 1 */
function handleValidation() {
    for (let i = 0; i < input.length; i++) {

        if (input[i].value === "") {
            input[i].classList.add(`invalid`);
            invalidText[i].classList.remove(`hidden`);
            invalidText[i].innerText = `This field is required`;
            validate = false;
        }

        if (!input[1].value.includes(`@`) && input[1].value !== "") {
            invalidText[1].innerText = `Please check your email`;
            invalidText[1].classList.remove(`hidden`);
            input[1].classList.add(`invalid`);
            validate = false;
        }

        if (!input[2].value.match(regEx) && input[2].value !== "") {
            invalidText[2].innerText = `Please check phone number`;
            input[2].classList.add(`invalid`);
            invalidText[2].classList.remove(`hidden`);
            validate = false;
        }

        if (input[i].value !== "" && input[1].value.includes(`@`) && input[2].value.match(regEx)) {
            validate = true;
        }
    }
}

/* SHOW WHICH PLAN YOU HAVE CHOSEN */

function handlePlanChoice(e) {
    plans.forEach(plan => plan.classList.remove(`selectedPlan`));
    e.currentTarget.classList.add(`selectedPlan`);
}

/* CHANGE PLAN NAME ON LAST PAGE DEPENDING ON WHAT PLAN YOU HAVE CHOSEN */
function handleSummaryPlan() {
    const summaryPlan = document.querySelector(`.summaryPlan`);

    for (let i = 0; i < plans.length; i++) {

        if (plans[i].classList.contains(`selectedPlan`)) {
            const x = plans[i].firstElementChild.nextElementSibling.firstElementChild;
            const y = x.nextElementSibling;
            summaryPlan.innerText = `${x.textContent}`;
            summaryPlanPrice.innerText = `${y.textContent}`;
        }
    }
}

/* CHANGE PLAN AND ADDONS ON TOGGLE IN STEP 2 */
function handleToggle() {
    const toggleText = document.querySelectorAll(`.toggleText`);
    const yearly = document.querySelectorAll(`.yearly`);

    const priceToggleArcade = document.querySelector(`.priceToggleArcade`);
    const priceToggleAdvanced = document.querySelector(`.priceToggleAdvanced`);
    const priceTogglePro = document.querySelector(`.priceTogglePro`);

    const addonsPriceOne = document.querySelector(`.addonsPriceOne`);
    const addonsPriceTwo = document.querySelector(`.addonsPriceTwo`);
    const addonsPriceThree = document.querySelector(`.addonsPriceThree`);

    if (planSwitch.checked === true) {
        toggleText[1].classList.add(`toggleOn`);
        toggleText[0].classList.remove(`toggleOn`);
        yearly.forEach(plan => plan.classList.add(`show`));

        priceToggleArcade.textContent = `$90/yr`;
        priceToggleAdvanced.textContent = `$120/yr`;
        priceTogglePro.textContent = `$150/yr`;

        addonsPriceOne.textContent = `$10/yr`;
        addonsPriceTwo.textContent = `$20/yr`;
        addonsPriceThree.textContent = `$20/yr`;
    }

    if (planSwitch.checked === false) {
        toggleText[1].classList.remove(`toggleOn`);
        toggleText[0].classList.add(`toggleOn`);
        yearly.forEach(plan => plan.classList.remove(`show`));

        priceToggleArcade.textContent = `$9/mo`;
        priceToggleAdvanced.textContent = `$12/mo`;
        priceTogglePro.textContent = `$15/mo`;

        addonsPriceOne.textContent = `$1/mo`;
        addonsPriceTwo.textContent = `$2/mo`;
        addonsPriceThree.textContent = `$2/mo`;
    }
}

/* HANDLE ALL CHANGES ON NEXT BUTTON */
function handleButtonNext(e) {
    handleValidation();
    if (e.currentTarget === nextButton[0] && validate === true) {
        currentStep = 1;
        showStep(currentStep);
    }
    if (e.currentTarget === nextButton[1]) {
        currentStep = 2;
        handleSummaryPlan();
        showStep(currentStep);
    }
    if (e.currentTarget === nextButton[2]) {
        currentStep = 3;
        handleSummaryAddons();
        handleSummaryTotal();
        showStep(currentStep);
    }
    if (e.currentTarget === nextButton[3]) {
        currentStep = 4;
        showStep(currentStep);
    }
}

/* HANDLE ALL CHANGES ON PREV BUTTON */
function handleButtonPrevious(e) {
    if (e.currentTarget === previousButton[1]) {
        currentStep = 0;
        showStep(currentStep);
    }
    if (e.currentTarget === previousButton[2]) {
        currentStep = 1;
        showStep(currentStep);
    }
    if (e.currentTarget === previousButton[3]) {
        currentStep = 2;
        showStep(currentStep);
    }
}

/* SHOW CHECKBOXES YOU HAVE CHOSEN FROM STEP 3 ON LAST PAGE */
function handleAddonsCheckbox(e) {
    let checkbox = e.currentTarget.firstElementChild.firstElementChild;
    const checkboxes = document.querySelectorAll(`.checkboxContainer input`);
    const addonsPrice = document.querySelectorAll(`.addonsPrice`);

    if (checkbox.checked === false) {
        e.currentTarget.classList.add(`addonsChildChecked`);
        checkbox.checked = 1;
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                chosenAddon[i].classList.add(`show`);
                chosenAddonPrice[i].textContent = `${addonsPrice[i].textContent}`;
            }
        }
    } else if (checkbox.checked === true) {
        e.currentTarget.classList.remove(`addonsChildChecked`);
        checkbox.checked = 0;
        for (let i = 0; i < checkboxes.length; i++) {
            if (!checkboxes[i].checked) {
                chosenAddon[i].classList.remove(`show`);
            }
        }
    }
}

/* SHOW CHECKBOXES CORRECT PRICE LAST PAGE */
function handleSummaryAddons() {
    const addonsPrice = document.querySelectorAll(`.addonsPrice`);
    const chosenAddonPrice = document.querySelectorAll(`.chosenAddonPrice`);
    for (let i = 0; i < addonsPrice.length; i++) {
        chosenAddonPrice[i].textContent = addonsPrice[i].textContent;
    }

}

/* CALCULATE TOTAL PRICE DEPENDING ON WHAT WAS CHOSEN */
function handleSummaryTotal() {
    const summaryTotalPrice = document.querySelector(`.summaryTotalPrice`);
    const planPrice = parseInt(summaryPlanPrice.textContent.replace(/[^0-9]/g, ``), 10);
    let totalPrice = 0;

    for (let i = 0; i < chosenAddonPrice.length; i++) {
        const addonPrice = parseInt(chosenAddonPrice[i].textContent.replace(/[^0-9]/g, ``), 10);

        if (chosenAddon[i].classList.contains(`show`)) {
            totalPrice += addonPrice;
        }
    }

    totalPrice += planPrice;
    if (planSwitch.checked === true) {
        summaryTotalPrice.textContent = `+$${totalPrice}/yr`;
    }
    if (planSwitch.checked === false) {
        summaryTotalPrice.textContent = `+$${totalPrice}/mo`;
    }
}


/* EVENT LISTENERS */

input.forEach(letter => letter.addEventListener(`input`, (e) => {
    e.currentTarget.parentNode.firstElementChild.classList.add(`hidden`);
    e.currentTarget.classList.remove(`invalid`);
}))

change.addEventListener(`click`, (e) => {
    if (e.currentTarget === change) {
        currentStep = 1;
        showStep(currentStep);
    }
})

planSwitch.addEventListener(`click`, handleToggle);
plans.forEach(plan => plan.addEventListener(`click`, handlePlanChoice));
nextButton.forEach(button => button.addEventListener(`click`, handleButtonNext));
previousButton.forEach(button => button.addEventListener(`click`, handleButtonPrevious));
checkboxWrapper.forEach(check => check.addEventListener(`click`, handleAddonsCheckbox));
