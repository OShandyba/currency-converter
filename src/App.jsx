import * as React from 'react'
import { useState } from 'react'

const CURRENCY_API_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json'


// const currencyApi = () => {
//     return fetch(CURRENCY_API_URL)
//         .then(res => res.json())
// }
// function currencyApi(defaultOptions = {}) {
//     const [data, setData] = useState(null)

//     const currencyData = (options = {}) => {
//         return fetch(CURRENCY_API_URL)
//             .then(res => res.json())
//             .then(data => setData(data))
//     }
//     return [data, currencyData]

// }

function App() {
    const [currencies, setCurrencies] = useState(null)

    React.useEffect(() => {
        fetch(CURRENCY_API_URL)
            .then(res => res.json())
            .then(data => setCurrencies(data))
    }, [])
    console.log(currencies)

    return (
        <div>
            <div className='header'>
                <h1>Curency converter</h1>
            </div>
            <div className='upper-body'>
                <input type="number" id="you-have" />
                <select type="text" id="currency-one">
                    {
                        currencies !== null ? Object.entries(currencies).map(([key, currency]) => (
                            <option key={key}>{currency}</option>
                        )
                        ) : <option value="loading" selected >Loading</option>
                    }
                </select>
            </div>
            <div>calculating</div>
            <div className='lower-body'>
                <input type="number" id="you-will-have" />
                <select type="text" id="currency-two">
                    {
                        currencies !== null ? Object.entries(currencies).map(([key, currency]) => (
                            <option key={key}>{currency}</option>
                        )
                        ) : <option value="loading" selected >Loading</option>
                    }
                </select>
            </div>
        </div>
    )

}
export default App