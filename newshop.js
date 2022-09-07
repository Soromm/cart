//cart
let cartIcon = document.querySelector("#cart-icon")
let cart = document.querySelector(".cart")
let closeCart = document.querySelector("#close-cart")

// open cart
cartIcon.addEventListener("click", function open() {
    cart.classList.add("active")
})

//close cart
closeCart.addEventListener("click", function close() {
    cart.classList.remove("active")
})

//cart working js
if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}else{
    ready()
}

// making function button
function ready() {
    //remove item from cart
    let removeCartButtons = document.getElementsByClassName("cart-remove")
    console.log(removeCartButtons)
    for(let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem)
    }
    // Quantity changes
    let quantityInputs = document.getElementsByClassName("cart-quantity")
    for(let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener("change", quantityChanged)
    }
    // Add to cart
    let addCart = document.getElementsByClassName("add-cart")
    for(let i = 0; i < addCart.length; i++) {
        let buttons = addCart[i]
        buttons.addEventListener("click", addCartClicked)
    }
    // buy Button work
    document
        .getElementsByClassName("btn-buy")[0]
        .addEventListener("click", buyButtonClicked)
}
// Buy Button
function buyButtonClicked() {
    alert("Your Order is placed")
    let cartContent = document.getElementsByClassName("cart-content")[0]
    while(cartContent.hasChildNodes ()) {
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal()
}

// remove item from cart
function removeCartItem (event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateTotal()
}

// quantity changed
function quantityChanged(event) {
    let input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateTotal()
}
//Add to Cart
function addCartClicked(event) {
    let button = event.target
    let shopProducts = button.parentElement
    let title = shopProducts.getElementsByClassName("product-title")[0].innerText
    let price = shopProducts.getElementsByClassName("price")[0].innerText
    let productImg = shopProducts.getElementsByClassName("product-img")[0].src
    addProductToCart(title, price, productImg)
    updateTotal()
}

function addProductToCart(title, price, productImg) {
    let cartShopBox = document.createElement("div")
        cartShopBox.classList.add("cart-box")
    let cartItems = document.getElementsByClassName("cart-content")[0]
    let cartItemsNames = cartItems.getElementsByClassName("cart-product-title")
    for(let i = 0; i < cartItemsNames.length; i++) {
        if(cartItemsNames[i].innerText == title){
            alert("already in cart")
            return;
        }
       
    }
   
    let cartBoxContent = `
   <img src="${productImg}" alt="" class="cart-img">
   <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
       <input type="number" value="1" class="cart-quantity">
   </div>
        <!--Remove cart-->
   <i class="fas fa-trash-alt cart-remove"></i>`

    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox)
    cartShopBox
        .getElementsByClassName("cart-remove")[0]
        .addEventListener("click", removeCartItem)
    cartShopBox
        .getElementsByClassName("cart-quantity")[0]
        .addEventListener("change", quantityChanged)

}


// Update total
function updateTotal () {
    let cartContent = document.getElementsByClassName("cart-content")[0]
    let cartBoxes = cartContent.getElementsByClassName("cart-box")
    let total = 0
    for(let i = 0; i < cartBoxes.length; i++){
        let cartBox = cartBoxes[i]
        let priceElement = cartBox.getElementsByClassName("cart-price")[0]
        let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0]
        let price  = parseFloat(priceElement.innerText.replace("$",""))
        let quantity = quantityElement.value
        total = total + price * quantity
    }
        // if price contain some cent
        total = Math.round(total * 100) / 100

        document.getElementsByClassName("total-price")[0].innerText = "$" + total
    
}