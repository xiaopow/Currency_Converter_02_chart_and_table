import React from 'react';
import './App.css';
import CurrencyChart from './CurrencyChart'

class Currencies extends React.Component {
  constructor() {
    super();
    this.state = {
      baseCurrency:'USD',
      convertToCurrency:'AUD',
      baseAmount: 1,
      rates: [],
      currencies: [],
      historicData: [],
      pastDates: [],
    };

    this.changeBaseCurrency = this.changeBaseCurrency.bind(this);
    this.changeConvertToCurrency = this.changeConvertToCurrency.bind(this);
    this.changeBaseAmount = this.changeBaseAmount.bind(this);
    this.getConvertedCurrency = this.getConvertedCurrency.bind(this);
    this.callAPI = this.callAPI.bind(this);
    this.callHistoricAPI = this.callHistoricAPI.bind(this);
  }

  componentDidMount() {
   this.callAPI(this.state.baseCurrency);
   this.callHistoricAPI(this.state.baseCurrency, this.state.convertToCurrency)
  }

  callHistoricAPI(baseCurrency, convertToCurrency) {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date()).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

    const apiHistoric = (`https://alt-exchange-rate.herokuapp.com/history?start_at=${startDate}&end_at=${endDate}&base=${baseCurrency}&symbols=${convertToCurrency}`)

      fetch(apiHistoric)
       .then(results => {
          return results.json();
      }).then(data => this.setState({
        historicData: Object.values(data['rates']),
        pastDates: Object.keys(data['rates']),
      }));
  }

  callAPI(base) {
    const apiBase = `https://alt-exchange-rate.herokuapp.com/latest?base=${base}`;

    fetch(apiBase)
     .then(results => {
        return results.json();
    }).then(data => this.setState({
      rates: data['rates'],
      currencies: Object.keys(data['rates']).sort(),
    }));
 }

 changeBaseCurrency(e) {
   this.setState({ baseCurrency: e.target.value});
   this.callAPI(e.target.value);
   this.callHistoricAPI(e.target.value, this.state.convertToCurrency);
 }

  changeConvertToCurrency(e) {
    this.setState({ convertToCurrency: e.target.value });
    this.callHistoricAPI(this.state.baseCurrency, e.target.value)
  }

  changeBaseAmount(e) {
    this.setState({ baseAmount: e.target.value });
  }

  getConvertedCurrency(baseAmount,convertToCurrency,rates) {
    return Number.parseFloat(baseAmount * rates[convertToCurrency]).toFixed(4);
  }

  getPastRates(e) {
    let ratesArray = []
    Object.values(e).map(price => ratesArray = ratesArray.concat(Number(Object.values(price))))
    return ratesArray
  }

  render() {
    const {currencies, rates, baseCurrency, baseAmount, convertToCurrency, historicData, pastDates} = this.state;

    const historicRates = this.getPastRates(historicData)
    const currencyChoice = currencies.map(currency =>
       <option key={currency} value={currency}> {currency} </option>
     );
    const result = this.getConvertedCurrency(baseAmount, convertToCurrency, rates);

    // Exchange Table
    const tableRows = Object.keys(rates).map(function(key) {
      const convertedRate = (Number.parseFloat(rates[key]) * baseAmount).toFixed(4);
      const countryCode = key;

      return(
        <tr key={key}>
          <td className="country-code">{countryCode}</td>
          <td className="converted-rate">{convertedRate} </td>
        </tr>
       )
     })

     return(
       <div className="container-fluid w-75 text-center converter">
         <div className="row">
           <div className="col-sm-5 pt-2">
             <form className='form main'>

            <div className="py-4">
              <h3>Convert from: {baseCurrency}</h3>
               <select
                  value={baseCurrency}
                  onChange={this.changeBaseCurrency}>{currencyChoice}
                   <option>{baseCurrency}</option>
               </select>
            </div>

            <div>
              <h3>Convert to: {convertToCurrency}</h3>
              <select
                value={convertToCurrency}
                onChange={this.changeConvertToCurrency}>{currencyChoice}
              </select>
            </div>

            <h3>Amount:</h3>
              <input type='number'
                     id='base-amount'
                     defaultValue={baseAmount}
                     className="amount-box"
                     onChange={this.changeBaseAmount}>
             </input>
            <h3>{baseAmount} {baseCurrency} is equal to {result} {convertToCurrency}</h3>
          </form>
        </div>
          <hr />

            <div className="col-sm-7">
                <div>
                   <CurrencyChart
                     pastDates={pastDates}
                     historicRates={historicRates}
                     baseCurrency={baseCurrency}
                     compareCurrency={convertToCurrency}
                  />
                 </div>
            </div>

            <div className="col-sm-12 mx-auto pt-5">
               <h5 className="currency-list currency-table">Exchange Rates Table</h5>
                 <table className="table table-striped table-custom">
                   <thead>
                      <tr>
                        <th className="country-code">Country</th>
                        <th className="converted-rate">{baseAmount}.00 {baseCurrency}</th>
                      </tr>
                     </thead>
                      <tbody>{tableRows}</tbody>
                 </table>
             </div>
         </div>
      </div>
     );
   }
 }

export default Currencies
