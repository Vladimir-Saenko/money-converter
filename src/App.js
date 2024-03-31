import { useEffect, useState } from "react";

export default function App() {
  const queryCourse = "https://www.cbr-xml-daily.ru/daily_json.js"; //"https://www.cbr-xml-daily.ru/latest.js";
  const [fromCurrency, setFromCurrency] = useState(0);
  const [toCurrency, setToCurrency] = useState(2);
  const [ratesCurrency, setRateCurrency] = useState({});

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

  const { Date: ratesDate, Valute: rates } = ratesCurrency;

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
          selectedCurrency={toCurrency}
          onChangeCurrency={handleChangeToCurrency}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Введите сумму..."
        />
        <span></span>
        <input
          type="text"
          className="form-control"
          placeholder="Расчетное значение..."
          disabled
        />
      </div>

      <footer>Курсы установлены: {ratesDate}</footer>
      <a href="https://www.cbr-xml-daily.ru/">Курсы ЦБ РФ в XML и JSON, API</a>
    </div>
  );
}

function CurrencySelect({ selectedCurrency, onChangeCurrency }) {
  return (
    <select
      className="form-select form-select-sm"
      value={selectedCurrency}
      onChange={(e) => onChangeCurrency(e.target.value)}
    >
      <option value={0}>Российский рубль [RUR]</option>
      <option value={1}>Доллар США [USD]</option>
      <option value={2}>Евро [EUR]</option>
      <option value={3}>Китайский юань[CYN]</option>
    </select>
  );
}
