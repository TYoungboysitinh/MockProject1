import React, { Component } from 'react'
import Title from './Components/Title'
import ListProducts from './Components/listProducts'
import "./App.css"
import Footer from './Components/Footer';
import Form from './Components/Form';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        { productID: "P001", productName: "IPhone 11", quantity: 15, price: 1000 },
        { productID: "P002", productName: "IPhone 12", quantity: 20, price: 1250 },
        { productID: "P003", productName: "IPhone 13", quantity: 10, price: 1500 },
        { productID: "P004", productName: "IPhone 14", quantity: 15, price: 2000 },
      ],
      isToggle: false,
      actionName: '',
      product: {},
      totalSubtotal: 0,
    };
    let totalSubtotal = 0;
    const updatedProducts = this.state.products.map((product) => {
      const subtotal = product.price * product.quantity;
      totalSubtotal += subtotal;
      return { ...product, subtotal: subtotal };
    });
    this.state = {
      ...this.state,
      products: updatedProducts,
      totalSubtotal: totalSubtotal,
    };
  }
  handleEditOrView = (toggle, actionName, product) =>{
    this.setState({
      isToggle:toggle,
      actionName:actionName,
      product:product
    })
  }
  componentDidMount() {
    this.calculateInitialTotalSubtotal(this.state.products);
  }
  
  calculateInitialTotalSubtotal = (products) => {
    if (products && products.length > 0) {
      let totalSubtotal = 0;
      products.forEach((product) => {
        totalSubtotal += parseInt(product.subtotal, 10);
      });
      this.setState({
        totalSubtotal: totalSubtotal,
      });
    } else {
      this.setState({
        totalSubtotal: 0,
      });
    }
  };
  
  calculateTotalSubtotal = (products) => {
    if (products && products.length > 0) {
      let totalSubtotal = 0;
      products.forEach((product) => {
        totalSubtotal += parseInt(product.subtotal, 10);
      });
      this.setState({
        totalSubtotal: totalSubtotal,
      });
    } else {
      this.setState({
        totalSubtotal: 0,
      });
    }
  };
  handleSubmit = (toggle, product) => {
    this.setState({
        isToggle: toggle,
    });
    if (this.state.actionName === "Update") {
        const updatedProducts = this.state.products.map((p) => {
            if (p.productID === product.productID) {
                const subtotal = product.price * product.quantity;
                return { ...product, subtotal: subtotal };
            } else {
                return p;
            }
        });

        this.setState({
            products: updatedProducts,
        });
    } else {
        const subtotal = product.price * product.quantity;
        const productWithSubtotal = { ...product, subtotal: subtotal };
        this.setState((prevState) => ({
            products: [...prevState.products, productWithSubtotal],
        }));
    }
    const totalQuantity = this.calculateTotalQuantity(this.state.products);
    this.updateTotal(totalQuantity);
};
calculateTotalQuantity = (products) => {
    if (products && products.length > 0) {
        let totalQuantity = 0;
        products.forEach((product) => {
            totalQuantity += product.quantity;
        });
        return totalQuantity;
    } else {
        return 0;
    }
};
updateTotal = (totalQuantity) => {
    this.setState({
        totalQuantity,
    });
};
  handleDeleteProduct = (productID) =>{
    const updateProduct = this.state.products.filter((product)=>product.productID !== productID );
    this.setState({
      products:updateProduct,
    });
  }
  render() {
    let elementForm = this.state.isToggle===true? <Form renderProducts={this.state.product} renderActionName={this.state.actionName} onSubmit={this.handleSubmit} subtotal={this.state.product.subtotal} /> :"";
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
            updateTotal={this.updateTotal}
            totalSubtotal={this.state.totalSubtotal}
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
