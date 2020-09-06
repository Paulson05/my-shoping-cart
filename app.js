const cartbtn = document.querySelector('.cart-btn');
const closebtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDom = document.querySelector("cart");
const cartoverlay = document.querySelector(".cart-overlay");
const cartitem = document.querySelector(".cart-item");
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
              let cartitem = Storage.getproducts(id);
              console.log(cartitem);
              // add product to the cart
              // save cart in local storage
              // set cart value
              // display cart item
               //show the cart

          } );
      }

       } );

       
}

};
class Storage{
    static  saveProducts(products){
        localStorage.setItem("products", JSON.stringify(products));
    }
        
    static getproducts(id){
        let products  = JSON.parse(localStorage.getItem("products"));
        return products.find(product => product.id === id )
    }
}
document.addEventListener("DOMContentLoaded",() =>{
const ui = new UI();
const products = new Products();

products.getproducts().then(products =>{
    //    ui.displayproducts(products);
   Storage.saveProducts(products);
}).then(()=>{
    ui.getbagbuttons();
}); 

});


