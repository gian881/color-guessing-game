import html2canvas from "html2canvas"

async function ChangeFavicon(cor: string) {

    const div = document.createElement('div')
    div.style.backgroundColor = cor
    div.style.width = '16px'
    div.style.height = '16px'
    div.style.borderRadius = '50%'
    div.style.position = 'absolute'
    div.style.top = '-1000px'
    div.style.left = '-1000px'
    div.className = 'favicon'
    document.body.appendChild(div)

    const newFavicon = await html2canvas(document.querySelector('.favicon') as HTMLDivElement, { backgroundColor: null })

    const link = document.querySelector("link[rel*='icon']")
    if (link) {
        link.setAttribute('type', 'image/png')
        link.setAttribute('href', newFavicon.toDataURL('image/png'))
    }
    document.body.removeChild(div)
}

export { ChangeFavicon }