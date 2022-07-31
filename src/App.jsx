import * as React from 'react'
import { useState } from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { fontFamily, fontSize } from '@mui/system';


const CURRENCY_API_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies'

function App() {
    const [currencies, setCurrencies] = useState(null)
    const [currencyRate, setCurrencyRate] = useState(null)
    const [choosenCurrencySource, setChoosenCurrencySource] = useState("usd")
    const [choosenCurrencyTarget, setChoosenCurrencyTarget] = useState("pln")
    const [exchangeAmountSource, setExchangeAmountSource] = useState('')
    const [exchangeAmountTarget, setExchangeAmountTarget] = useState('')


    React.useEffect(() => {
        fetch(CURRENCY_API_URL + '.json')
            .then(res => res.json())
            .then(data => setCurrencies(data))
        if (choosenCurrencySource != null && choosenCurrencySource !== '') {
            fetch(`${CURRENCY_API_URL}/${choosenCurrencySource}.json`)
                .then(res => res.json())
                .then(data => setCurrencyRate(data[choosenCurrencySource]))
        }
    }, [])

    function onChangeSourceCurrency(event) {
        const sourceCurrency = event.target.value

        setChoosenCurrencySource(sourceCurrency)
        fetch(`${CURRENCY_API_URL}/${sourceCurrency}.json`)
            .then(res => res.json())
            .then(data => setCurrencyRate(data[sourceCurrency]))
    }
    function onChangeTargetCurrency(event) {
        setChoosenCurrencyTarget(event.target.value)
    }

    function onChangeAmountSourse(event) {
        const amountSource = event.target.value
        setExchangeAmountSource(amountSource)
        setExchangeAmountTarget((amountSource * currencyRate[choosenCurrencyTarget]).toFixed(3))
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', }}>
                <Paper sx={{ width: '100%', height: '100%', padding: 2, background: 'linear-gradient(to bottom, #cc99ff 28%, #ff99cc 94%)', }} elevation={4}>
                    <Grid container spacing={2} alignContent='center' textAlign='center' sx={{ position: 'relative' }}>
                        <Grid item xs={12} sx={{ paddingTop: '10px', fontSize: '35px', fontFamily: 'sans-serif' }} >
                            Currensy converter
                        </Grid>
                        <Grid item xs={7} sx={{ paddingTop: '20px' }}>
                            <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '100%' }, }} noValidate autoComplete="off">
                                <TextField label="Enter amount to convert" type="number" InputLabelProps={{ shrink: true, }} onChange={onChangeAmountSourse} value={exchangeAmountSource} />
                            </Box>
                        </Grid>
                        <Grid item xs={5} sx={{ paddingTop: '20px' }}>
                            <FormControl fullWidth sx={{ paddingTop: '8px' }}>
                                <InputLabel sx={{ paddingTop: '8px' }}>Currency</InputLabel>
                                <Select label="Currency" onChange={onChangeSourceCurrency} value={choosenCurrencySource}>
                                    {
                                        currencies !== null ? Object.entries(currencies).map(([currenctCode, currencyTitle]) => (
                                            <MenuItem key={currenctCode} value={currenctCode}>{currencyTitle}</MenuItem>
                                        )
                                        ) : <MenuItem value="loading" >Loading</MenuItem>
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sx={{ paddingTop: '60px', fontFamily: 'sans-serif', fontSize: '20px', textAlign: 'center' }}>
                            convert to
                        </Grid>
                        <Grid item xs={7} sx={{ paddingTop: '20px' }}>
                            <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '100%' }, }} noValidate autoComplete="off">
                                <TextField label="You will gain" type="number" InputLabelProps={{ shrink: true, }} readOnly value={exchangeAmountTarget} />
                            </Box>
                        </Grid>
                        <Grid item xs={5} sx={{ paddingTop: '20px' }}>
                            <FormControl fullWidth sx={{ paddingTop: '8px' }}>
                                <InputLabel sx={{ paddingTop: '8px' }}>Currency</InputLabel>
                                <Select onChange={onChangeTargetCurrency} value={choosenCurrencyTarget} label="Currency">
                                    {
                                        currencies !== null
                                            ? Object.entries(currencies).map(([currenctCode, currencyTitle]) => (
                                                <MenuItem key={currenctCode} value={currenctCode}>{currencyTitle}</MenuItem>
                                            ))
                                            : <MenuItem value="loading" >Loading</MenuItem>
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Container>
    )

}
export default App