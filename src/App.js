import React ,{ useEffect,useState } from 'react';
import './App.css';
import InputCurrency from './InputCurrency';


const BASE_URL = '//api.exchangerate.host/latest'; 
function App() {
  
  const [currencyOptions, setCurrrencyOptions] = useState([]); 
  const [fromCurrency,setFromCurrency]= useState();
  const [toCurrency,setToCurrency]= useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(); 
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount , fromAmount;
  if(amountInFromCurrency){
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  }else{
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(()=> {
    if(toCurrency !== null && fromCurrency !== null){
    fetch(`${BASE_URL}?base${fromCurrency}&symbols=${toCurrency}`)
    .then(res => res.json())
    .then(data => setExchangeRate(data.rates[toCurrency]))
    }  
  },[fromCurrency,toCurrency]);

  useEffect(() =>{
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrrencyOptions([data.base,...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      }) ;
  },[]); 
  
  

  function handleFromAmountChange(e){
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }
  function handleToAmountChange(e){
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }
  return (
    <>
      <div className='app'>
      <h1>Convert</h1> 
      <InputCurrency 
      onChangeAmount = {handleFromAmountChange}
        currencyOptions = {currencyOptions}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        amount = {fromAmount}
        selectedCurrency={fromCurrency}
      />
          <InputCurrency 
            onChangeCurrency={e => setToCurrency(e.target.value)}
            selectedCurrency={toCurrency}
            onChangeAmount = {handleToAmountChange}
            currencyOptions = {currencyOptions}
            amount = {toAmount}
          />
      </div>
    </> 
  ); 
}
export default App;
