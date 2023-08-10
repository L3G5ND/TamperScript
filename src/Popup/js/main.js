import "./ScriptEditor.js"

let contentPage = 2
let numberOfPages = 3

let navigationTabs = document.getElementsByClassName('navigation-tab')

function updatePopup() {
    for (let i = 1; i <= numberOfPages; i++) {
        let contentItem = document.getElementsByClassName('content-page')[i-1]
        if (i === contentPage) {
            contentItem.style.display = 'block'
        } else {
            contentItem.style.display = 'none'
        }
    }
    for (let i = 1; i <= numberOfPages; i++) {
        let underline = navigationTabs[i-1].getElementsByClassName('navigation-underline')[0]
        if (i === contentPage) {
            underline.style['background-color'] = 'rgb(65, 65, 65)'
            underline.style.width = '36px'
        } else {
            underline.style['background-color'] = 'rgb(50, 50, 50)'
            underline.style.width = '0px'
        }
    }
}

for (let i = 1; i <= numberOfPages; i++) {
    let tab = navigationTabs[i-1]
    let underline = tab.getElementsByClassName('navigation-underline')[0]
    tab.addEventListener('click', () => {
        contentPage = i
        updatePopup()
    })
    tab.addEventListener("mouseover", () => {
        if (contentPage !== i) {
            underline.style.width = '36px'
        }
    })
    tab.addEventListener("mouseout", () => {
        if (contentPage !== i) {
            underline.style.width = '0px'
        }
    })
}

updatePopup()
