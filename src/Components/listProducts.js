import React, { Component } from 'react'
import "../CSS/ListProduct.css"

export default class ListProducts extends Component {
    constructor(props){
        super(props);
        this.state={
            totalQuantity:this.calculateTotal(this.props.ListProducts),
            totalPrice:this.calculateTotalPrice(this.props.ListProducts),
        }
    }
    handleEditClick = (product) => {
        this.setState({ selectedProduct: product });
      };      
    handleEditOrView = (product,actionName) =>{
        this.props.onHandleEditOrView(true, product, actionName);
        const subtotal = product.price * product.quantity;
        const productWithSubtotal = { ...product, subtotal: subtotal };
        this.props.onHandleEditOrView(true, productWithSubtotal, actionName);
    }
    onHandleEditOrView = (toggle, actionName, product) => {
        this.props.onHandleEditOrView(toggle, actionName, product);
    }
    handleDelete = (productID) => {
        if(window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không ?')){
            this.props.onDeleteProduct(productID);
        }
    }
    updateTotal = (totalQuantity, totalPrice) => {
        this.setState({
          totalQuantity: totalQuantity,
        });
        this.setState({
          totalPrice: totalPrice,  
        })
      };
      
    calculateTotal = () => {
        if (this.props.ListProducts && this.props.ListProducts.length > 0) {
          let totalQuantity = 0;
          this.props.ListProducts.forEach((product) => {
            totalQuantity += parseInt(product.quantity, 10) ;
          });
          return totalQuantity;
        } else {
          return 0;
        }
    };
    calculateTotalPrice = () => {
        if (this.props.ListProducts && this.props.ListProducts.length > 0) {
          let totalPrice = 0;
          this.props.ListProducts.forEach((product) => {
            totalPrice += parseInt(product.price, 10) ;
          });
          return totalPrice;
        } else {
          return 0;
        }
    };
    calculateTotalSubtotal = () => {
        if (this.props.ListProducts && this.props.ListProducts.length > 0) {
          let totalSubtotal = 0;
          this.props.ListProducts.forEach((product) => {
            totalSubtotal += parseInt(product.subtotal, 10) ;
          });
          return totalSubtotal;
        } else {
          return 0;
        }
    };
    componentDidUpdate(prevProps) {
        if (prevProps.ListProducts !== this.props.ListProducts) {
          const totalQuantity = this.calculateTotal(this.props.ListProducts);
          const totalPrice = this.calculateTotalPrice(this.props.ListProducts);
          const totalSubtotal = this.calculateTotalSubtotal(this.props.ListProducts);
          this.updateTotal(totalQuantity, totalPrice, totalSubtotal);
        }
      }
  render() {     
    let renderProducts = this.props.ListProducts;
    let elementProduct = renderProducts.map((renderProducts,index)=>{
        return(
            <>
            <tr key={index} className='product-table'>
                <td>{index+1}</td>
                <td>{renderProducts.productID}</td>
                <td>{renderProducts.productName}</td>
                <td>{renderProducts.quantity}</td>
                <td><span style={{ color: 'red', display: 'inline-block', marginRight: '4px' }}>$</span>{renderProducts.price}</td>
                <td><span style={{ color: 'red', display: 'inline-block', marginRight: '4px' }}>$</span>{renderProducts.subtotal}</td>
                <td>
                    <div>
                        <button className='btn view'
                            onClick={()=>this.props.onHandleEditOrView(true, "Close", renderProducts)}
                        >
                            View
                        </button>
                        <button className='btn edit'
                            onClick={() => this.props.onHandleEditOrView(true,"Update" ,renderProducts )}
                        >
                            Edit
                        </button>
                        <button className='btn delete'
                            onClick={() =>this.props.onDeleteProduct(renderProducts.productID)}
                        >
                            Delete
                        </button>
                    </div>
                </td>
            </tr>
            </>
        )
    })
    return (
        <>
            <h3 className='card-title'>Danh sách sản phẩm</h3>
            <div>
                <table className='table table-bordered'>
                    <thead>
                        <tr className='product-table'>
                            <th>#</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elementProduct}
                        <tr>
                            <td></td>
                            <td></td>
                            <td style={{ verticalAlign: 'middle', textAlign: 'center' }}><b>Total</b></td>
                            <td style={{ verticalAlign: 'middle', textAlign: 'center' }}><b>{this.calculateTotal()}</b></td>
                            <td style={{ verticalAlign: 'middle', textAlign: 'center' }}><span style={{ color: 'black', display: 'inline-block', marginRight: '4px' }}>$</span><b>{this.calculateTotalPrice()}</b></td>
                            <td style={{ verticalAlign: 'middle', textAlign: 'center' }}><span style={{ color: 'black', display: 'inline-block', marginRight: '4px' }}>$</span><b>{this.props.totalSubtotal}</b></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
  }
}
