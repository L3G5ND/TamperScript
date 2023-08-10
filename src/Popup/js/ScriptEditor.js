let menuTabs = document.getElementsByClassName('menu-bar-tab')

for (let i = 0; i < menuTabs.length; i++) {
    let tab = menuTabs[i]
    tab.addEventListener("mouseover", () => {
        tab.style['background-color'] = 'rgb(65, 65, 65)'
    })
    tab.addEventListener("mouseout", () => {
        tab.style['background-color'] = 'transparent'
    })
}

