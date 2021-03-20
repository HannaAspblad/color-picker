const projectContainer = document.querySelector(".project-container")
initColorPicker(projectContainer)

function initColorPicker(projectContainer) {

    //element creation
    const projectTitle = document.createElement("h2")
    const projectIntro = document.createElement("p")
    const projectWrapper = document.createElement("div")
    const inputField = document.createElement("input")
    const dropDown = document.createElement("div")
    const colorList = document.createElement("ul")
    const errorMessage = document.createElement("p")

    //append elements to DOM
    projectContainer.append(projectTitle)
    projectContainer.append(projectIntro)
    projectContainer.append(projectWrapper)
    projectWrapper.append(inputField)
    projectWrapper.append(dropDown)
    dropDown.append(colorList)
    projectWrapper.append(errorMessage)

    //adding classes
    projectWrapper.classList.add("cp-wrapper")
    dropDown.classList.add("cp-drop-down")
    colorList.classList.add("cp-color-list")
    inputField.classList.add("cp-input-field")

    //adding attributes
    inputField.placeholder = "What is your favourite color?"

    //query selectors
    const body = document.querySelector("body")
    const suggestions = document.querySelectorAll(".cp-color-list")

    hideElement(dropDown)

    //intro message
    projectTitle.innerHTML = "Color picker"
    projectIntro.innerHTML =
        `We got an excercise in school to create a color picker accepting the browser colors.
    This is the result. Enjoy!`

    //event listeners
    inputField.addEventListener("keyup", () => {

        clearContainer(colorList)

        if (inputField.value.length < 3) {
            invalidSearch()
        } else {
            populateList()
            showElement(dropDown)
        }

        if (inputField.value.length == 0) {
            clearContainer(colorList)
            hideElement(dropDown)
            resetBackgroundColor()
            clearContainer(errorMessage)
        }

        if (colorList.childElementCount < 1) {
            hideElement(dropDown)
        } else {
            clearContainer(errorMessage)
        }
    })

    suggestions.forEach(link => link.addEventListener("click", (e) => {
        applyBackgroundColor(e.target.innerText)
        inputField.value = e.target.innerText
    }))

    document.addEventListener("click", (e) => {
        if (!dropDown.contains(e.target)) {
            hideElement(dropDown)
        }
    })

    //functions
    function populateList() {
        
        for (let currentColor of allowedColorValues) {
            if (currentColor.includes(inputField.value.toLowerCase())) {
                const colorSuggestion = document.createElement("li")
                colorList.append(colorSuggestion)
                colorSuggestion.innerText = currentColor
            } else {
                invalidColor()
            }
        }
    }

    function applyBackgroundColor(color) {
        body.style.backgroundColor = color
    }

    function invalidSearch() {
        errorMessage.innerHTML = "Enter at least three letters"
    }

    function invalidColor() {
        errorMessage.innerHTML = "No matching color"
    }

    function resetBackgroundColor() {
        body.style.backgroundColor = ""
    }
}

//functions
function hideElement(element) {
    element.style.display = "none"
}

function showElement(element) {
    element.style.display = "block"
}

function clearContainer(container) {
    container.innerHTML = ""
}
