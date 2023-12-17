document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndDisplay();

    function appendDataToContainer(data) {
        const container = document.getElementById('productContainer');

        const productBox = document.createElement('div');
        productBox.className = 'productBox';

        const productImage = document.createElement('img');
        productImage.src = `img/${data.foto}`;
        productImage.alt = 'Product Image';

        const productName = document.createElement('h3');
        productName.textContent = data.nama;

        const productDetail = document.createElement('p');
        productDetail.textContent = data.detail_produk;

        const productCategory = document.createElement('p');
        productCategory.textContent = `Kategori: ${data.kategori}`;

        const productType = document.createElement('p');
        productType.textContent = `Jenis: ${data.jenis}`;

        const productPrice = document.createElement('p');
        productPrice.textContent = `Harga: ${data.harga}`;

        productBox.appendChild(productImage);
        productBox.appendChild(productName);
        productBox.appendChild(productDetail);
        productBox.appendChild(productCategory);
        productBox.appendChild(productType);
        productBox.appendChild(productPrice);

        container.appendChild(productBox);
    }

    function fetchDataAndDisplay() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'get_products.php', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    const responseData = JSON.parse(xhr.responseText);
                    displayData(responseData);
                } else {
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.send();
    }

    function displayData(data) {
        const container = document.getElementById('productContainer');
        container.innerHTML = ''; 

        data.forEach(function (item) {
            appendDataToContainer(item);
        });
    }

});
