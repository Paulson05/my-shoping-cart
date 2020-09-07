const cartbtn = document.querySelector('.cart-btn');
const closebtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDom = document.querySelector("cart");
const cartoverlay = document.querySelector(".cart-overlay");
const cartitem = document.querySelector(".cart-items");
const carttotal = document.querySelector(".cart-total");
const  cartcontent = document.querySelector(".cart-content"); 
const productsDOM = document.querySelector(".product-center");
 
let cart = []; 
  
let buttonsDOM  = [];
class Products{
async getproducts(){
try {
    let result = await fetch("product.json");
    let data =  await result.json()


    let products = data.items;
    products = products.map(item => {
        const {title, price} = item.fields;
        const {id} = item.sys;
        const  image = item.fields.image.fields.file.url;
        return{title, price, id, image};
       
    });

    return products;
}  catch (error){
// console.log(error);   
}
}
};

class UI {
    displayproducts(products){
      let result = "";
      products.forEach(product => {
          result +=`   <article class="product">
          <div class="img-container">
              <img src="${product.image}" alt="" class="product-img">
              <button class="bag-btn" data-id=${product.id}>add to bag</button>
          </div>
          <h3>${product.title}</h3>
          <h4>${product.price}</h4>
        </article `
      });
      productsDOM.innerHTML = result;
      
      }

  getbagbuttons(){
      const buttons  = [...document.querySelectorAll (".bag-btn")]; 
    //   console.log(buttons);
      
  
  buttons.forEach(button => {
      let id = button.dataset.id;
    //   console.log(id);
      let incart = cart.find(item => item.id === id);
      if (incart){
          button.innerHTML  = "in cart";
          button.disabled  = true;
      } else{
          button.addEventListener("click", event=>{
              event.target.innerText = "in cart";
              event.target.disabled = true;

              // get produdt form product
              let cartitem = {...Storage.getproducts(id), amount:1};
            //   console.log(cartitem);
              // add product to the cart
            cart = [... cart, cartitem];
            // console.log(cart);
              // save cart in local storage
              Storage.savecart(cart)
              // set cart value
              this.setcartvalues(cart);
              // display cart item
              this.addcartitem(cartitem);
               //show the cart
               this.showcart();

          } );
      }

       } );
}
setcartvalues(cart){
    let temptotal = 0;
    let itemtotal  = 0;
    cart.map(item =>{
        temptotal += item.price * item.amount;
        itemtotal += item.amount;
    });
    carttotal.innerText = parseFloat(temptotal.toFixed(2));
    cartitem.innerText = itemtotal;
    // console.log(carttotal, cartitem);
} 
addcartitem(item){
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `<img src=${item.image} alt="" class="product-img">
    <div>
        <h4>${item.title}</h4>
        <h5>${item.price}</h5>
        <span class="remove-item" data-id${item.id}>remove</span>
    </div>
    <div>
        <i class="fa fa-cheveron-up " data-id${item.id}i>
        <p class="item-amount">${item.amount}</p>
        <i class="fa fa-chevron-down" data-id${item.id}></i>
    </div>`;
    
cartcontent.appendChild(div);

}
showcart(){
    cartoverlay.classList.add("transparentbcg");
    cartDom.classList.add("showcart");
}
// setupApp(){
//   cart = Storage.getcart();
//   this.setcartvalues(cart);
//   this.populate(cart);
//   cartbtn.addEventListener("click", this.showcart);
//   closebtn.addEventListener("click", this.hidecart); 
// }
// populatecart(cart){
//     cart.forEach(item => this.addcartitem(item));
// }
// hidecart(){
//     cartoverlay.classList.remove("transparentbcg");
//     cartDom.classList.remove("showcart");
// }
};
class Storage{
    static  saveProducts(products){
        localStorage.setItem("products", JSON.stringify(products));
    }
        
    static getproducts(id){
        let products  = JSON.parse(localStorage.getItem("products"));
        return products.find(product => product.id === id )
    }

    static savecart(cart){
        localStorage.setItem("cart", JSON.stringify(cart ))
    }
    static getcart(){
        return localStorage.getItem("cart")?JSON.parse(localStorage.getItem('cart')):[]
    }
}
document.addEventListener("DOMContentLoaded",() =>{
const ui = new UI();
const products = new Products();
// setup app
// ui.setupApp();  

// get all product
products
.getproducts()
.then(products =>{
    //    ui.displayproducts(products);
   Storage.saveProducts(products);
}).then(()=>{
    ui.getbagbuttons();
}); 

});


