import { useState } from "react";

export default function App() {
  const nowDateTime = new Date().toLocaleString();
  const [fromCurrency, setFromCurrency] = useState(0);
  const [toCurrency, setToCurrency] = useState(2);

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

  return (
    <div className="app container-md">
      <header>
        <h1>КОНВЕРТЕР ВАЛЮТ ОНЛАЙН</h1>
      </header>
      <div className="main">
        {/* https://www.cbr-xml-daily.ru/daily_json.js */}
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

      <footer>Сейчас: {nowDateTime}</footer>
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
