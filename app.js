document.addEventListener('DOMContentLoaded', function() {
    var cartItems = [];

    var addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var productCard = this.closest('.card');
            var productName = productCard.querySelector('.card-title').textContent;
            var productPrice = productCard.querySelector('.card-text').textContent;

            var cartItem = {
                name: productName,
                price: parseFloat(productPrice.replace('$', ''))
            };

            cartItems.push(cartItem);
            updateCart();
        });
    });

    function updateCart() {
        var cartItemsContainer = document.getElementById('cart-items');
        var cartTotal = document.getElementById('cart-total');
        cartItemsContainer.innerHTML = '';

        var total = 0;

        cartItems.forEach(function(item, index) {
            var row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>1</td>
                <td>$${item.price.toFixed(2)}</td>
                <td><button class="btn btn-danger remove-item" data-index="${index}">Remove</button></td>
            `;
            cartItemsContainer.appendChild(row);

            total += item.price;
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;

        var removeButtons = cartItemsContainer.querySelectorAll('.remove-item');
        removeButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var index = this.getAttribute('data-index');
                cartItems.splice(index, 1);
                updateCart();
            });
        });
    }
});
