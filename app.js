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
console.log(error);   
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
};
class Storage{
    static storage.saveProducts(products){
        localStorage.setItem("products", JSON.stringify(products));
    }
        

}
document.addEventListener("DOMContentLoaded",() =>{
const ui = new UI();
const products = new Products();

products.getproducts().then(products => 
ui.displayproducts(products)) ; 

});


