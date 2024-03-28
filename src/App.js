export default function App() {
  const nowDateTime = new Date().toLocaleString();

  return (
    <div className="app container-md">
      <header>
        <h1>КОНВЕРТЕР ВАЛЮТ ОНЛАЙН</h1>
      </header>
      <div className="main">
        {/* https://www.cbr-xml-daily.ru/daily_json.js */}
        <CurrencySelect selectedValue={0} />
        <button type="button" className="btn btn-primary btn-left-right">
          ↔
        </button>
        <CurrencySelect selectedValue={2} />
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

function CurrencySelect({ selectedValue }) {
  return (
    <select className="form-select form-select-sm">
      <option value={0}>Российский рубль [RUR]</option>
      <option value={1}>Доллар США [USD]</option>
      <option value={2}>Евро [EUR]</option>
      <option value={3}>Китайский юань[CYN]</option>
    </select>
  );
}
