const puppeteer = require("puppeteer")

//abreMaps()

const abreMaps = async () => {
    try {
        const browser = await puppeteer.launch({ headless: false })
        const page = await browser.newPage()
        await page.goto("https://www.google.com.br/maps")
        await page.waitFor("input[id = searchboxinput ]")
        await page.type("input[id = searchboxinput ]", "Maringá PR; Alfaiataria");
        await page.keyboard.press("Enter")

        await page.waitFor("div[data-result-index]");

        //Número de comércios
        const numComercio = await page.evaluate(() => {
            return document.querySelectorAll('div[data-result-index]').length

        })

        //Iniciando listas
        let listName = []
        let listRating = []
        let listAddress = []
        let listFone = []

        for (let i = 1; i <= numComercio; i++) {
            await page.click(`div[data-result-index='${i}']`)
            await page.waitFor("h1 span");

            const getName = await page.evaluate(() => {
                //Pega os nomes
                var name = document.querySelector("h1 span", [1]).innerText;

                return name
            })
            //coloca na lista de nomes
            listName.push(getName)

            const getRating = await page.evaluate(() => {
                //Pega os rate
                var rate = document.querySelector(".section-star-display");
                if (rate) {
                    return rate.innerText
                }
                else {
                    return "N/A"
                }
            })
            listRating.push(getRating)

            const getAdress = await page.evaluate(() => {
                const nodeAddress = document.querySelectorAll('button[data-item-id="address"]');
                if (nodeAddress.length != 0) {
                    const addressArray = [...nodeAddress]
                    const jsonAddress = addressArray.map(endCommerce => ({
                        ariaLabel: endCommerce.ariaLabel
                    }))
                    return jsonAddress[0].ariaLabel
                } else {
                    return "N/A"
                }

            })
            listAddress.push(getAdress)

            const getFone = await page.evaluate(() => {
                const nodeFone = document.querySelectorAll('button[data-tooltip="Copiar número de telefone"]');
                if (nodeFone.length != 0) {
                    console.log(nodeFone)
                    const foneArray = [...nodeFone]
                    console.log("++++++++++++" + foneArray + "+++++++++++++++")

                    const jsonFone = foneArray.map(foneCommerce => ({
                        ariaLabel: foneCommerce.ariaLabel
                    }))
                    console.log(jsonFone)

                    return jsonFone[0].ariaLabel
                } else {
                    return "N/A"
                }
            })
            listFone.push(getFone)
            console.log(listFone)

            await page.click(`button[jsaction="pane.place.backToList"]`)
            await page.waitFor("div[data-result-index]");
        }

        let listaF = []
        listaF.push(listName)
        listaF.push(listFone)
        listaF.push(listAddress)
        listaF.push(listRating)
        console.log(listaF);

    } catch (err) {
        console.log("Ocorreu um erro!")
        console.log(err);
    }

}


abreMaps()



    // const commerceList = await page.evaluate(() => {
    //     //Pega os nomes
    //     const nodeListName = document.querySelectorAll('div h3');
    //     var len = (nodeListName.length)
    //     const nameArray = [...nodeListName]
    //     console.log(nameArray)
    //     const jsonListName = nameArray.map(commerce => ({
    //         innerText: commerce.innerText
    //     }))

    //     let listName = []
    //     for (let i = 0; i < len; i++) {
    //         listName.push(jsonListName[i].innerText)

    //     }
    //     subCommerceList()
    //     return listName

    //     //Pega a avaliação
    //     // const nodeListRating = document.querySelectorAll('.cards-rating-score');
    //     // var len = (nodeListName.length)
    //     // const nameArray = [...nodeListName]
    //     // console.log(nameArray)
    //     // const jsonListName = nameArray.map(commerce => ({
    //     //     innerText: commerce.innerText
    //     // }))

    //     // let listName = []
    //     // for (let i = 0; i < len; i++) {
    //     //     listName.push(jsonListName[i].innerText)

    //     // }


    // })