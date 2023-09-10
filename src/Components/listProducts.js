import React, { Component } from 'react'
import "../CSS/ListProduct.css"

export default class ListProducts extends Component {
    constructor(props){
        super(props);
        this.state={
            totalQuantity:this.calculateTotalQuantity(this.props.ListProducts),
        }
    }
    handleEditClick = (product) => {
        this.setState({ selectedProduct: product });
      };      
    handleEditOrView = (product,actionName) =>{
        this.props.onHandleEditOrView(true, product, actionName);
    }
    onHandleEditOrView = (toggle, actionName, product) => {
        this.props.onHandleEditOrView(toggle, actionName, product);
    }
    handleDelete = (productID) => {
        if(window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không ?')){
            this.props.onDeleteProduct(productID);
        }
    }
    updateTotalQuantity = (totalQuantity) => {
        this.setState({
          totalQuantity: totalQuantity,
        });
      };
      
    calculateTotalQuantity = () => {
        if (this.props.ListProducts && this.props.ListProducts.length > 0) {
          let totalQuantity = 0;
          this.props.ListProducts.forEach((product) => {
            totalQuantity += product.quantity;
          });
          return totalQuantity;
        } else {
          return 0;
        }
    };
    componentDidUpdate(prevProps){
        if(prevProps.ListProducts !== this.props.ListProducts){
            const totalQuantity = this.calculateTotalQuantity();
            this.updateTotalQuantity(totalQuantity);
        }
    }
  render() {     
    let renderProducts = this.props.ListProducts;
    let elementProduct = renderProducts.map((renderProducts,index)=>{
        const subtotal = renderProducts.price * renderProducts.quantity;
        console.log(subtotal);
        return(
            <>
            <tr key={index} className='product-table'>
                <td>{index+1}</td>
                <td>{renderProducts.productID}</td>
                <td>{renderProducts.productName}</td>
                <td>{renderProducts.quantity}</td>
                <td><span style={{ color: 'red', display: 'inline-block', marginRight: '4px' }}>$</span>{renderProducts.price}</td>
                <td><span style={{ color: 'red', display: 'inline-block', marginRight: '4px' }}>$</span>{subtotal}</td>
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
                            <td style={{ verticalAlign: 'middle', textAlign: 'center' }}><b>{this.calculateTotalQuantity()}</b></td>
                            <td style={{ verticalAlign: 'middle', textAlign: 'center' }}><span style={{ color: 'black', display: 'inline-block', marginRight: '4px' }}>$</span><b>Price</b></td>
                            <td style={{ verticalAlign: 'middle', textAlign: 'center' }}><span style={{ color: 'black', display: 'inline-block', marginRight: '4px' }}>$</span><b>Subtotal</b></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
  }
}
