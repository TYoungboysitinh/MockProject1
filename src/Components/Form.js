import React, { Component } from 'react'
import "../CSS/Form.css"

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: '',
      productName: '',
      quantity: '',
      price: '',
    }
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  calculateNewTotal = (updatedProduct, productList) => {
    if (productList && productList.length > 0) {
      let newTotalQuantity = 0;
      let newTotalPrice = 0;
      let newTotalSubtotal = 0;
      productList.forEach((product) => {
        if (product.productID === updatedProduct.productID) {
          newTotalQuantity += updatedProduct.quantity;
          newTotalPrice += updatedProduct.price;
          newTotalSubtotal += updatedProduct.subtotal;
        } else {
          newTotalQuantity += product.quantity;
          newTotalPrice += product.price;
          newTotalSubtotal += product.subtotal;
        }
      });
      return {
        newTotalQuantity,
        newTotalPrice,
        newTotalSubtotal,
      };
    } else {
      return {
        newTotalQuantity: 0,
        newTotalPrice: 0,
        newTotalSubtotal: 0,
      };
    }
  };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(false, this.state);
        const subtotal = this.state.price * this.state.quantity;
        const productWithSubtotal = {
            ...this.state,
            subtotal: subtotal
        };
        this.props.onSubmit(false, productWithSubtotal);
    
        if (typeof this.props.updateTotal === 'function') {
        const newTotals = this.calculateNewTotal(
            this.state,
            this.props.ListProducts
        );
        this.props.updateTotal(newTotals.newTotalQuantity, newTotals.newTotalPrice, newTotals.newTotalSubtotal);
        } else {
        console.error("updateTotal is not a function");
        }
    };
  componentWillMount = () => {
    let { renderActionName, renderProducts } = this.props;
    if (renderActionName === "Close" || renderActionName === "Update") {
      this.setState({
        productID: renderProducts.productID,
        productName: renderProducts.productName,
        quantity: renderProducts.quantity,
        price: renderProducts.price
      })
    } else {
      this.setState({
        productID: '',
        productName: '',
        quantity: 0,
        price: 0
      })
    }
  }

  componentWillReceiveProps = (nextProps) => {
    let { renderActionName, renderProducts } = nextProps; // Sử dụng nextProps ở đây
    if (renderActionName === "Close" || renderActionName === "Update") {
      this.setState({
        productID: renderProducts.productID,
        productName: renderProducts.productName,
        quantity: renderProducts.quantity,
        price: renderProducts.price
      })
    } else {
      this.setState({
        productID: '',
        productName: '',
        quantity: 0,
        price: 0
      })
    }
  }

  render() {
    let { renderActionName } = this.props;
    return (
      <div className='card'>
        <div className='card-body'>
          <div className='title-info'>
            <h3 className='card-title'>Thông tin sản phẩm</h3>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className='form-group row'>
              <label className='form-label'>ID</label>
              <input className='form-input' type="text" name='productID' placeholder='Product ID' value={this.state.productID} onChange={this.handleChange} />
            </div>
            <div className='form-group row'>
              <label className='form-label'>Name</label>
              <input className='form-input' type="text" name='productName' placeholder='Product Name' value={this.state.productName} onChange={this.handleChange} />
            </div>
            <div className='form-group row'>
              <label className='form-label'>Quantity</label>
              <input className='form-input number' type="number" name='quantity' placeholder='0' value={this.state.quantity} onChange={this.handleChange} />
            </div>
            <div className='form-group row'>
              <label className='form-label'>Price</label>
              <input className='form-input number' type="number" name='price' placeholder='0' value={this.state.price} onChange={this.handleChange} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>
              {renderActionName}
            </button>
          </form>
          <div className='ht'>
            <p>Hệ thống đã sẵn sàng...</p>
          </div>
        </div>
      </div>
    )
  }
}
