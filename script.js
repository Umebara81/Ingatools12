document.addEventListener('DOMContentLoaded', function() {
    console.log("Document loaded, initializing CSV load.");
    loadCSV('cliente_produto.csv');
});

let data = [];

function loadCSV(filePath) {
    console.log("Loading CSV from:", filePath);
    Papa.parse(filePath, {
        download: true,
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: function(results) {
            console.log("CSV parsing complete:", results);
            data = results.data;
            displayTable(data);
        },
        error: function(error) {
            console.error("Error loading CSV:", error);
        }
    });
}

function displayTable(data) {
    const tableHeader = document.getElementById('tableHeader');
    const tableBody = document.getElementById('tableBody');

    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    if (data.length > 0) {
        console.log("Displaying table with headers:", Object.keys(data[0]));
        const headers = Object.keys(data[0]);
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            tableHeader.appendChild(th);
        });

        data.forEach(row => {
            const tr = document.createElement('tr');
            headers.forEach(header => {
                const td = document.createElement('td');
                td.textContent = row[header];
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    } else {
        console.log("No data found in CSV");
    }
}

function searchData() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredData = data.filter(row => {
        return Object.values(row).some(value => 
            value.toString().toLowerCase().includes(searchInput)
        );
    });
    console.log("Filtered data:", filteredData);
    displayTable(filteredData);
}
