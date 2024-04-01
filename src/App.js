import { useEffect, useState } from "react";

export default function App() {
  const queryCourse = "https://www.cbr-xml-daily.ru/daily_json.js"; //"https://www.cbr-xml-daily.ru/latest.js";
  const [fromCurrency, setFromCurrency] = useState(0);
  const [toCurrency, setToCurrency] = useState(15);
  const [ratesCurrency, setRateCurrency] = useState({});
  const [sum, setSum] = useState(0);

  function handleChangeFromCurrency(selected) {
    setFromCurrency(selected);
    //
  }

  function handleChangeToCurrency(selected) {
    setToCurrency(selected);
    //
  }

  function handleCurrencyReverse() {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    console.log(`Currency reversed ${fromCurrency} <-> ${toCurrency}`);
  }

  const { Date: ratesDateTime, Valute: rates } = ratesCurrency;

  const ratesDate =
    ratesDateTime.split("T")[0] +
    " " +
    ratesDateTime.split("T")[1].split("+")[0] +
    " Мск";

  let currArray = [
    {
      code: "RUR",
      nominal: 1,
      value: 1,
      name: "Российский рубль",
    },
  ];
  for (var key in rates) {
    currArray.push({
      code: rates[key].CharCode,
      nominal: rates[key].Nominal,
      value: rates[key].Value,
      name: rates[key].Name,
    });
  }

  const calcKoef =
    currArray[fromCurrency]?.value /
    (currArray[toCurrency]?.value / currArray[toCurrency]?.nominal);

  console.log(ratesDate, currArray);

  useEffect(function () {
    async function fetchCourse() {
      // запрос на сервер
      try {
        const res = await fetch(queryCourse);
        if (!res.ok) throw new Error("Error loading rates...");
        const data = await res.json();
        setRateCurrency(data);
        console.log("Rates loaded.");
        console.log(data);
      } catch (err) {
        console.log(err.Message);
      }
    }
    fetchCourse();
  }, []);

  return (
    <div className="app container-md">
      <header>
        <h1>КОНВЕРТЕР ВАЛЮТ ОНЛАЙН</h1>
      </header>
      <div className="main">
        <CurrencySelect
          key={"from"}
          currList={currArray}
          selectedCurrency={fromCurrency}
          onChangeCurrency={handleChangeFromCurrency}
        />
        <button
          type="button"
          className="btn btn-primary btn-left-right"
          onClick={() => handleCurrencyReverse()}
        >
          ↔
        </button>
        <CurrencySelect
          key={"to"}
          currList={currArray}
          selectedCurrency={toCurrency}
          onChangeCurrency={handleChangeToCurrency}
        />
        <input
          type="text"
          className="form-control"
          value={sum}
          placeholder="Введите сумму..."
          onChange={(e) => setSum(Number(e.target.value))}
        />
        <span></span>
        <input
          type="text"
          className="form-control"
          value={((sum * calcKoef) / currArray[fromCurrency].nominal).toFixed(
            2
          )}
          placeholder="Расчетное значение..."
          disabled
        />
      </div>
      <div style={{ marginTop: "1em" }}>
        {calcKoef && (
          <span>
            {currArray[fromCurrency].nominal} {currArray[fromCurrency].name} ={" "}
            {Math.round(calcKoef * 100) / 100} {currArray[toCurrency].name}
          </span>
        )}
      </div>

      <footer>Курсы установлены: {ratesDate}</footer>
      <a href="https://www.cbr-xml-daily.ru/">Курсы ЦБ РФ в XML и JSON, API</a>
    </div>
  );
}

function CurrencySelect({ selectedCurrency, currList, onChangeCurrency }) {
  return (
    <select
      className="form-select form-select-sm"
      value={selectedCurrency}
      onChange={(e) => onChangeCurrency(e.target.value)}
    >
      {currList.map((curr, i) => (
        <option value={i}>
          {curr.name} [{curr.code}]
        </option>
      ))}
    </select>
  );
}
