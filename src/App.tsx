import React, { useState, useEffect } from 'react'
import { Settings } from 'lucide-react'

function App() {
  const [targetCurrency, setTargetCurrency] = useState('USD')

  useEffect(() => {
    chrome.storage.sync.get('targetCurrency', (result) => {
      if (result.targetCurrency) {
        setTargetCurrency(result.targetCurrency)
      }
    })
  }, [])

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value
    setTargetCurrency(newCurrency)
    chrome.storage.sync.set({ targetCurrency: newCurrency })
  }

  return (
    <div className="w-64 p-4 bg-white">
      <h1 className="text-xl font-bold mb-4 flex items-center">
        <Settings className="mr-2" size={24} />
        Currency Converter
      </h1>
      <label htmlFor="currency" className="block mb-2">
        Target Currency:
      </label>
      <select
        id="currency"
        value={targetCurrency}
        onChange={handleCurrencyChange}
        className="w-full p-2 border rounded"
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
      </select>
    </div>
  )
}

export default App