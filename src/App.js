import React, { Component } from 'react'
import Title from './Components/Title'
import ListProducts from './Components/listProducts'
import "./App.css"
import Footer from './Components/Footer';
import Form from './Components/Form';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      products:[
        {productID:"P001", productName:"IPhone 11", quantity:15, price:1000},
        {productID:"P002", productName:"IPhone 12", quantity:20, price:1250},
        {productID:"P003", productName:"IPhone 13", quantity:10, price:1500},
        {productID:"P004", productName:"IPhone 14", quantity:15, price:2000},
      ],
      isToggle: false,
      actionName:'',
      product:{}
    }
  }
  handleEditOrView = (toggle, actionName, product) =>{
    this.setState({
      isToggle:toggle,
      actionName:actionName,
      product:product
    })
  }
  handleSubmit = (toggle, product) =>{
    this.setState({
      isToggle:toggle,
    })
    if(this.state.actionName === "Update"){
      let{products}=this.state;
      for(let i = 0; i<products.length; i++){
        if(products[i].productID === product.productID){
          products[i]=product;
          break;
        }
      }
      this.setState({
        products:products,
      })
    }
  }
  updateTotalQuantity =(totalQuantity)=>{
    this.setState({
      totalQuantity,
    })
  }
  handleDeleteProduct = (productID) =>{
    const updateProduct = this.state.products.filter((product)=>product.productID !== productID );
    this.setState({
      products:updateProduct,
    });
  }
  render() {
    let elementForm = this.state.isToggle===true? <Form renderProducts={this.state.product} renderActionName={this.state.actionName} onSubmit={this.handleSubmit} /> :"";
    let {products}= this.state;
    let data = this.state.products;
    return (
      <div className='app container'>
        <div className='row'>
          <div>
            <Title />
          </div>
          <div className='col-lg-7'>
          <ListProducts
            ListProducts={data}
            renderProducts={products}
            onHandleEditOrView={this.handleEditOrView}
            onDeleteProduct={this.handleDeleteProduct}
            updateTotalQuantity={this.updateTotalQuantity} 
          />
          </div>
          <div className='col-5'>
            {elementForm}
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}