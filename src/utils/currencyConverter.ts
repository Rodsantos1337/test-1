const API_KEY = 'YOUR_API_KEY' // Replace with a real API key

export async function convertCurrency(amount: number, from: string, to: string): Promise<number> {
  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
  const data = await response.json()
  const rate = data.rates[to]
  return amount * rate
}