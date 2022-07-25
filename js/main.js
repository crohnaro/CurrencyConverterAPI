
const currenciesUrl = `https://free.currconv.com/api/v7/currencies?apiKey=cc2ed161120ff7b607bd` // Variavel global responsavel por pegar a lista de Currencies da API
const calcCurrencieUrl = ``

const Main = {
  
  init : function() {
    this.fetchCurrencies()
    this.calcCurrency()
  },


  calcCurrency: function(){

  },

  fetchCurrencies: function() { //Function responsavel por popular o select da page via API
    fetch(currenciesUrl) // usando fetch para pegar os dados via JSON
        .then(response => response.json())
        .then (currencies =>{

          const currenciesStringfy = JSON.stringify(currencies)
          const currenciesObj = JSON.parse(currenciesStringfy)
          const currenciesResults = currenciesObj.results
          const currenciesKeys = Object.values(currenciesResults)


          const fromCurrencie = document.querySelector('#fromCurrencie')
          const toCurrencie = document.querySelector('#toCurrencie')
          
          for(let i = 0; i < currenciesKeys.length; i++){
            

            const opt = document.createElement("option")
            opt.value = currenciesKeys[i].id
            opt.innerHTML = `${currenciesKeys[i].id} - ${currenciesKeys[i].currencyName}`
            
            const opt1 = document.createElement("option")
            opt1.value = currenciesKeys[i].id
            opt1.innerHTML = `${currenciesKeys[i].id} - ${currenciesKeys[i].currencyName}`
            
            


            fromCurrencie.appendChild(opt)
            toCurrencie.appendChild(opt1)
          }
        })
  } 
  
}

Main.init()




/*const myList = document.querySelector("select");
const currenciesUrl = `https://free.currconv.com/api/v7/currencies?apiKey=cc2ed161120ff7b607bd`

fetch(currenciesUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    for (const product of data.products) {
      const listItem = document.createElement("li");
      
      const nameElement = document.createElement("strong");
      nameElement.textContent = product.Name;
      
      const priceElement = document.createElement("strong");
      priceElement.textContent = `£${product.Price}`;

      listItem.append(
        nameElement,
        ` can be found in ${product.Location}. Cost: `,
        priceElement,
      );
      myList.appendChild(listItem);
    }
  })
  .catch((error) => {
    const p = document.createElement("p");
    p.appendChild(document.createTextNode(`Error: ${error.message}`));
    document.body.insertBefore(p, myList);
  });

*/


/*let dropdown = document.getElementById('fromCurrencie');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Selecione a';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

const url = 'https://free.currconv.com/api/v7/currencies?apiKey=cc2ed161120ff7b607bd;

const request = new XMLHttpRequest();
request.open('GET', url, true);

request.onload = function() {
  if (request.status === 200) {
    const data = JSON.parse(request.responseText);
    let option;
    for (let i = 0; i < data.length; i++) {
      option = document.createElement('option');
      option.text = data[i].name;
      option.value = data[i].abbreviation;
      dropdown.add(option);
    }
   } else {
    // Reached the server, but it returned an error
  }   
}

request.onerror = function() {
  console.error('An error occurred fetching the JSON from ' + url);
};

request.send();*/