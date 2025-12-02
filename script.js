console.log("Pharmacy Practice Version Loaded!");

// add medicines

function addMedicine() {
    let name = document.getElementById("medName").value;
    let qty = document.getElementById("medQty").value;
    let price = document.getElementById("medPrice").value;

    if (name === "" || qty === "" || price === "") {
        alert("Please fill all fields");
        return;
    }

    let table = document.getElementById("medicineTable").querySelector("tbody");

    let newRow = `
        <tr>
            <td>${name}</td>
            <td>${qty}</td>
            <td>${price}</td>
            <td><button onclick="deleteMedicine(this)">Delete</button></td>
        </tr>
    `;

    table.innerHTML += newRow;

    document.getElementById("medName").value = "";
    document.getElementById("medQty").value = "";
    document.getElementById("medPrice").value = "";
}

function deleteMedicine(btn) {
    btn.parentElement.parentElement.remove();
}

function searchMedicine() {
    let filter = document.getElementById("searchBox").value.toLowerCase();
    let rows = document.querySelectorAll("#medicineTable tbody tr");

    rows.forEach(row => {
        let medName = row.children[0].textContent.toLowerCase();
        row.style.display = medName.includes(filter) ? "" : "none";
    });
}


// billing and sales

function addToBill() {
    let name = document.getElementById("billMedName").value;
    let qty = document.getElementById("billQty").value;
    let rate = document.getElementById("billRate").value;

    if (name === "" || qty === "" || rate === "") {
        alert("Please fill all fields");
        return;
    }

    let amount = qty * rate;

    let table = document.getElementById("billTable").querySelector("tbody");

    let newRow = `
        <tr>
            <td>${name}</td>
            <td>${qty}</td>
            <td>${rate}</td>
            <td>${amount}</td>
            <td><button onclick="deleteBillItem(this)">Delete</button></td>
        </tr>
    `;

    table.innerHTML += newRow;

    updateTotal();

    document.getElementById("billMedName").value = "";
    document.getElementById("billQty").value = "";
    document.getElementById("billRate").value = "";
}

function deleteBillItem(btn) {
    btn.parentElement.parentElement.remove();
    updateTotal();
}

function updateTotal() {
    let rows = document.querySelectorAll("#billTable tbody tr");
    let total = 0;

    rows.forEach(row => {
        total += parseFloat(row.children[3].textContent);
    });

    document.getElementById("totalAmount").textContent = total;
}

//

function updateDashboard() {
    updateTotalMedicines();
    updateTotalStock();
    updateTotalSalesItems();
}

function updateTotalMedicines() {
    let rows = document.querySelectorAll("#medicineTable tbody tr");
    document.getElementById("cardTotalMedicines").textContent = rows.length;
}

function updateTotalStock() {
    let rows = document.querySelectorAll("#medicineTable tbody tr");
    let totalStock = 0;

    rows.forEach(row => {
        totalStock += parseInt(row.children[1].textContent);
    });

    document.getElementById("cardTotalStock").textContent = totalStock;
}

function updateTotalSalesItems() {
    let rows = document.querySelectorAll("#billTable tbody tr");
    document.getElementById("cardTotalSales").textContent = rows.length;
}

// Login
function login() {
    let username = document.getElementById("loginUser").value;
    let password = document.getElementById("loginPass").value;
    let errorMsg = document.getElementById("loginError");

    if (username === "admin" && password === "1234") {
        window.location.href = "index.html";  // go to dashboard
    } else {
        errorMsg.textContent = "Invalid username or password!";
    }
}

// Invoice
function generateInvoice() {
    let rows = document.querySelectorAll("#billTable tbody tr");
    if (rows.length === 0) {
        alert("No items in the bill!");
        return;
    }

    let invoiceWindow = window.open("", "Invoice", "width=600,height=700");
    let today = new Date().toLocaleString();

    let html = `
        <html>
        <head>
            <title>Invoice</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h2 { text-align: center; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 10px; text-align: center; }
                th { background: #0077cc; color: white; }
                h3 { text-align: right; margin-top: 20px; }
            </style>
        </head>
        <body>
            <h2>Pharmacy Invoice</h2>
            <p>Date: ${today}</p>
            <table>
                <thead>
                    <tr>
                        <th>Medicine</th>
                        <th>Qty</th>
                        <th>Rate (Rs)</th>
                        <th>Amount (Rs)</th>
                    </tr>
                </thead>
                <tbody>
    `;

    let total = 0;

    rows.forEach(row => {
        let med = row.children[0].textContent;
        let qty = row.children[1].textContent;
        let rate = row.children[2].textContent;
        let amt = row.children[3].textContent;
        total += parseFloat(amt);

        html += `
            <tr>
                <td>${med}</td>
                <td>${qty}</td>
                <td>${rate}</td>
                <td>${amt}</td>
            </tr>
        `;
    });

    html += `
                </tbody>
            </table>
            <h3>Total: Rs ${total}</h3>
            <script>
                window.print();
            </script>
        </body>
        </html>
    `;

    invoiceWindow.document.write(html);
}


