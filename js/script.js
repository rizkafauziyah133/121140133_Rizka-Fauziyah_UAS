document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndDisplay();

    const form = document.getElementById('productForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (validateForm()) {
            submitFormData();
        } else {
            alert('Silakan lengkapi semua input sebelum mengirimkan form.');
        }
    });

    const jenisCheckboxes = document.querySelectorAll('input[name="jenis[]"]');
    jenisCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            console.log('Checkbox ' + checkbox.value + ' changed: ' + checkbox.checked);
        });
    });

    const hargaInput = document.getElementById('harga');
    hargaInput.addEventListener('input', function () {
        console.log('Harga changed: ' + hargaInput.value);
    });

    document.addEventListener('click', function (event) {
        if (event.target && event.target.className == 'deleteButton') {
            const row = event.target.parentNode.parentNode;
            const productId = row.getAttribute('data-id');

            deleteData(productId);
        }
    });

    function submitFormData() {
        const formData = new FormData(document.getElementById('productForm'));

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'save_product.php', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    const responseData = JSON.parse(xhr.responseText);

                    setCookie('lastProduct', JSON.stringify(responseData), 1);
                    localStorage.setItem('lastProduct', JSON.stringify(responseData));

                    appendDataToTable(responseData);
                    alert('Data berhasil disubmit!');
                } else {
                    console.error(xhr.statusText);
                    alert('Terjadi kesalahan saat submit data. Silakan coba lagi.');
                }
            }
        };
        xhr.send(formData);
    }

    function appendDataToTable(data) {
        const table = document.getElementById('productTable').getElementsByTagName('tbody')[0];

        const newRow = table.insertRow(-1);

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);
        const cell7 = newRow.insertCell(6); 

        cell1.textContent = data.nama;
        cell2.textContent = data.detail_produk;
        cell3.textContent = data.kategori;
        cell4.textContent = data.jenis;
        cell5.textContent = data.harga;
        cell6.innerHTML = `<img src="img/${data.foto}" alt="Product Image" style="max-width: 100px;">`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.className = 'deleteButton'; 
        cell7.appendChild(deleteButton);

        newRow.setAttribute('data-id', data.id);
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
        const table = document.getElementById('productTable').getElementsByTagName('tbody')[0];

        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }

        data.forEach(function (item) {
            appendDataToTable(item);
        });
    }

    function validateForm() {
        const namaInput = document.getElementById('nama');
        const detailInput = document.getElementById('detail');
        const kategoriInput = document.getElementById('kategori');
        const jenisCheckboxes = document.querySelectorAll('input[name="jenis[]"]');
        const hargaInput = document.getElementById('harga');

        if (namaInput.value.trim() === '' || detailInput.value.trim() === '' || kategoriInput.value.trim() === '' || !isAtLeastOneCheckboxChecked(jenisCheckboxes) || hargaInput.value.trim() === '') {
            return false;
        }

        return true;
    }

    function isAtLeastOneCheckboxChecked(checkboxes) {
        for (const checkbox of checkboxes) {
            if (checkbox.checked) {
                return true;
            }
        }
        return false;
    }

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const cname = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(cname) == 0) {
                return c.substring(cname.length, c.length);
            }
        }
        return "";
    }

    function deleteCookie(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
    }

    function getLocalStorage(key) {
        return localStorage.getItem(key);
    }

    function setLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }

    function deleteLocalStorage(key) {
        localStorage.removeItem(key);
    }

    function deleteProductData(productName) {
        deleteCookie('lastProduct');
        localStorage.removeItem('lastProduct');
    }

    function deleteData(productId) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'delete_product.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    const responseData = JSON.parse(xhr.responseText);

                    const table = document.getElementById('productTable').getElementsByTagName('tbody')[0];
                    const rowToDelete = table.querySelector(`[data-id="${productId}"]`);
                    
                    if (rowToDelete) {
                        table.removeChild(rowToDelete);
                        alert('Data berhasil dihapus!');
                    } else {
                        alert('Tidak dapat menemukan baris data yang sesuai untuk dihapus.');
                    }
                } else {
                    console.error(xhr.statusText);
                    alert('Terjadi kesalahan saat menghapus data. Silakan coba lagi.');
                }
            }
        };
        xhr.send(`id=${productId}`);
    }
});
