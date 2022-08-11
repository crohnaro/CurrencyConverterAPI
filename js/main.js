//Variaveis Globais a serem utilizadas pelas functions dentro do projeto
const currenciesUrl = `https://free.currconv.com/api/v7/currencies?apiKey=cc2ed161120ff7b607bd`; // Variavel global responsavel por pegar a lista de Currencies da API
const fromCurrencie = document.querySelector("#fromCurrencie");
const toCurrencie = document.querySelector("#toCurrencie");
const optCurr = document.querySelectorAll(".optCurr");
const result = document.querySelector("#result");
const amount = document.querySelector("#amount");

//Function responsavel por popular o select da page via API
const fetchCurrencies = () => {
  fetch(currenciesUrl) // usando fetch para pegar os dados via JSON
    .then((response) => response.json())
    .then((currencies) => {

      const currenciesStringfy = JSON.stringify(currencies); // Foi feito o strinfigy e parse para poder pegar cada objeto
      const currenciesObj = JSON.parse(currenciesStringfy);
      const currenciesResults = currenciesObj.results;
      const currenciesKeys = Object.values(currenciesResults);

      // Loop for para popular cada opção via API com os dados coletados acima
      for (let i = 0; i < currenciesKeys.length; i++) {
        const opt = document.createElement("option");
        opt.value = currenciesKeys[i].id;
        opt.innerHTML = `${currenciesKeys[i].id} - ${currenciesKeys[i].currencyName}`;

        const opt1 = document.createElement("option");
        opt1.value = currenciesKeys[i].id;
        opt1.innerHTML = `${currenciesKeys[i].id} - ${currenciesKeys[i].currencyName}`;

        fromCurrencie.appendChild(opt);
        toCurrencie.appendChild(opt1);
      }
    });
};
fetchCurrencies();

document.getElementById("switch").addEventListener("click", function () {
  [fromCurrencie.value, toCurrencie.value] = [
    toCurrencie.value,
    fromCurrencie.value,
  ];
}),
  // Function que adicionar evento de click e a partir dele realizar o calculo
  document.getElementById("convert").addEventListener("click", function () {
    let currUrl = ""; // resetar o value do option para fazer nova consulta
    if (optCurr.length) {
      //checar se campos estão preenchidos
      currUrl = "";
      optCurr.forEach((opt) => {
        // loop foreach para atribuir os valores para cada opção carregada pela API
        if (currUrl == "") {
          currUrl += opt.value;
        } else {
          currUrl = currUrl + "_" + opt.value;
        }
      });
    }

    //function responsavel por fazer o calculo baseado nas moedas selecionadas
    const calcCurrencieUrl = `https://free.currconv.com/api/v7/convert?q=${currUrl}&compact=ultra&apiKey=cc2ed161120ff7b607bd`;
    fetch(calcCurrencieUrl)
      .then((response) => response.json())
      .then((currValue) => {
        const currValKeys = Object.values(currValue);
        const currValFloat = parseFloat(currValKeys);
        const calcCurrResult = amount.value * currValFloat;
        document.querySelector("#result").innerHTML =
          toCurrencie.value + " " + calcCurrResult.toFixed(2);
        document.querySelector("#resultCurr").innerHTML =
          amount.value + " " + fromCurrencie.value + " = ";
        document.querySelector("#resultFromCurr").innerHTML =
          " 1 " +
          " " +
          fromCurrencie.value +
          " = " +
          currValFloat * 1 +
          " " +
          toCurrencie.value;
        document.querySelector("#resultToCurr").innerHTML =
          " 1 " +
          " " +
          toCurrencie.value +
          " = " +
          1 / currValFloat.toFixed(2) +
          " " +
          fromCurrencie.value;
      });
  });
