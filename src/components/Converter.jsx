import { useEffect, useMemo, useState } from 'react';
import Dropdown from './Dropdown';

const currencies = [
  'USD',
  'EUR',
  'GBP',
  'INR',
  'JPY',
  'AUD',
  'CAD',
  'CHF',
  'CNY',
  'SGD',
];

const API_URL = 'https://api.frankfurter.app/latest';

function Converter() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState('0.00');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const parsedAmount = useMemo(() => Number(amount) || 0, [amount]);

  useEffect(() => {
    const controller = new AbortController();

    async function convertCurrency() {
      if (!amount) {
        setConvertedAmount('0.00');
        setExchangeRate(null);
        setError('');
        return;
      }

      if (fromCurrency === toCurrency) {
        setConvertedAmount(parsedAmount.toFixed(2));
        setExchangeRate(1);
        setError('');
        return;
      }

      try {
        setLoading(true);
        setError('');

        const url = `${API_URL}?amount=${parsedAmount || 0}&from=${fromCurrency}&to=${toCurrency}`;
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error('Unable to fetch the latest exchange rate right now.');
        }

        const data = await response.json();
        const rate = data.rates?.[toCurrency];

        if (typeof rate !== 'number') {
          throw new Error('Unexpected API response. Please try again.');
        }

        const unitRate = parsedAmount === 0 ? 0 : rate / parsedAmount;
        setConvertedAmount(rate.toFixed(2));
        setExchangeRate(unitRate);
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Something went wrong while converting currency.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    convertCurrency();

    return () => controller.abort();
  }, [amount, fromCurrency, toCurrency, parsedAmount]);

  function handleSwap() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  return (
    <main className="app-shell">
      <section className="converter-card">
        <p className="eyebrow">React Hooks + Live Exchange Rates</p>
        <h1>Currency Converter</h1>
        <p className="subtitle">
          Enter an amount, choose two currencies, and see the converted result update instantly.
        </p>

        <label className="field-group">
          <span className="field-label">Amount</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Enter an amount"
          />
        </label>

        <div className="currency-row">
          <Dropdown label="From" value={fromCurrency} options={currencies} onChange={setFromCurrency} />

          <button type="button" className="swap-button" onClick={handleSwap}>
            ⇄
          </button>

          <Dropdown label="To" value={toCurrency} options={currencies} onChange={setToCurrency} />
        </div>

        <div className="helper-row">
          <span>Live rates powered by Frankfurter API.</span>
          <span>{fromCurrency} → {toCurrency}</span>
        </div>

        <div className="result-panel">
          <span className="result-label">Converted Amount</span>
          {loading ? (
            <strong>Loading latest rate...</strong>
          ) : (
            <strong>
              {convertedAmount} {toCurrency}
            </strong>
          )}

          {exchangeRate !== null && !loading && !error && (
            <small>
              1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
            </small>
          )}

          {error && <small className="error-text">{error}</small>}
        </div>
      </section>
    </main>
  );
}

export default Converter;
