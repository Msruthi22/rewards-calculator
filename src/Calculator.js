import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

const endPointURL= 'http://localhost:8995/codingTest/calculate-rewards'

class Calculator extends Component {
  constructor(){
    super()
    this.state = {
      purchasedAmount: 0,
      purchasedDate: "",
      rewardsEarned: 0,
      dataList: [],
      firstMonthPurchasedAmount: 0,
      firstMonthRewards: 0,
      secondMonthPurchasedAmount: 0,
      secondMonthRewards: 0,
      thirdMonthPurchasedAmount: 0,
      thirdMonthRewards: 0,
      totalPurchased: 0
    }
  }

  handleSubmit=(event)=>{
    console.log("handleSubmit", this.state.purchasedAmount, this.state.purchasedDate,"datalist",this.state.dataList);
    axios.put(`${endPointURL}`,
    this.state.dataList)

    .then((response) => {
        this.setState({
          firstMonthPurchasedAmount: response.data.firstMonthPurchasedAmount,
          firstMonthRewards: response.data.firstMonthRewards,
          secondMonthPurchasedAmount: response.data.secondMonthPurchasedAmount,
          secondMonthRewards: response.data.secondMonthRewards,
          thirdMonthPurchasedAmount: response.data.thirdMonthPurchasedAmount,
          thirdMonthRewards: response.data.thirdMonthRewards,
          totalPurchased: response.data.totalPurchased,
          rewardsEarned: response.data.totalRewards

        })
      })
      .catch(function (error) {
        console.log(error);
      }) 
  }
  

  onChangehandler=(e)=>{
    console.log("onChange", e.target.name, e.target.value)
    if(e.target && e.target.name ==="date" ){
      this.setState({purchasedDate: e.target.value})
    }else if(e.target && e.target.name ==="purchasedAmount"){
      this.setState({purchasedAmount: e.target.value})
    }
      // this.setState({transactionAmount: event.target.value,transactionDate: event.traget.value});
  }

  addTransactionToList=(e)=>{
    let newList=this.state.dataList;
    newList.push({"purchasedAmount":this.state.purchasedAmount,"purchasedDate":this.state.purchasedDate});
    this.setState({dataList: newList});
    console.log("dataList", newList);
  }

  handleReset=(e)=>{
    this.setState({dataList: []});
  }

  renderTableData() {
    return this.state.dataList.map((datalist, index) => {
       const { purchasedAmount, purchasedDate } = datalist //destructuring
       return (
          <tr key={index}>
             <td>{purchasedAmount}</td>
             <td>{purchasedDate}</td>
          </tr>
       )
    })
 }
   render() {
    return (
      <div className = "Body-App">
        <h2 className="rewards-message">
        {`Congrats! you are earned ${this.state.rewardsEarned} for your transactions.`}
        </h2>
        <div className="rewards-calculator-form">
          <div className="amount-field">
          <label className="field-label"> Transaction Amount</label>
          <input  type='number'
          name="purchasedAmount" 
          id="totalAmount"
            placeholder="Enter total amount of your transaction"
            onChange={(e,name)=>this.onChangehandler(e,name)}></input>
          </div>
          <div>
          <label  className="field-label"> Transaction Date</label>
          <input
            name="date"
            type="date"
            max={moment().format("YYYY-MM-DD")}
            onChange={e=>this.onChangehandler(e)}
            />
          </div>
          </div>
        <div className="button-section">
        <button  type='add' id="addTransaction" onClick={event =>this.addTransactionToList(event)}>Add to list</button>
        <button  type='reset' id="reset" onClick={event =>this.handleReset(event)}>Reset List</button>
        </div>
        <div>
        <table className="table-list">
          <thead>
          <tr>
            <th>Amount</th>
            <th>Transaction Date</th>    
          </tr>
          </thead>
        <tbody>
          {this.renderTableData()}
        </tbody>
        </table>
        <button  type='submit' id="calculate" onClick={event =>this.handleSubmit(event)}>Calculate</button>
        <p className="rewards-text">{`Your first month total amount is $${this.state.thirdMonthPurchasedAmount} So you got ${this.state.thirdMonthRewards} reward points`}</p>
        <p className="rewards-text">{`Your second month total amount is $${this.state.secondMonthPurchasedAmount} So you got ${this.state.secondMonthRewards} reward points`}</p>
        <p className="rewards-text">{`Your third month total amount is $${this.state.firstMonthPurchasedAmount} So you got ${this.state.firstMonthRewards} reward points`}</p>
        </div>
        <div>
        </div>
        </div>
    );
  }
  componentDidMount(){
}
}
export default Calculator;
