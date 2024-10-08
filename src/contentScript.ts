import { convertCurrency } from './utils/currencyConverter'

let modal: HTMLDivElement | null = null

function createModal() {
  modal = document.createElement('div')
  modal.style.cssText = `
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    z-index: 10000;
    display: none;
  `
  document.body.appendChild(modal)
}

function showModal(text: string, x: number, y: number) {
  if (!modal) createModal()
  modal!.textContent = text
  modal!.style.left = `${x}px`
  modal!.style.top = `${y}px`
  modal!.style.display = 'block'
}

function hideModal() {
  if (modal) modal.style.display = 'none'
}

document.addEventListener('mouseup', async () => {
  const selection = window.getSelection()
  if (selection && selection.toString().trim()) {
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()

    const text = selection.toString().trim()
    const match = text.match(/(\d+(\.\d+)?)\s*([A-Z]{3})/)
    
    if (match) {
      const [, amount, , sourceCurrency] = match
      const targetCurrency = await new Promise<string>((resolve) => {
        chrome.storage.sync.get('targetCurrency', (result) => {
          resolve(result.targetCurrency || 'USD')
        })
      })

      try {
        const convertedAmount = await convertCurrency(parseFloat(amount), sourceCurrency, targetCurrency)
        showModal(`${amount} ${sourceCurrency} = ${convertedAmount.toFixed(2)} ${targetCurrency}`, rect.left + window.scrollX, rect.top + window.scrollY - 30)
      } catch (error) {
        console.error('Currency conversion failed:', error)
      }
    } else {
      hideModal()
    }
  } else {
    hideModal()
  }
})

document.addEventListener('scroll', hideModal)