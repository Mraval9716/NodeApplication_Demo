window.onload = CreateTableFromJSON;
function CreateTableFromJSON() {
    var menu = [
        { number: "1", name: "Chicken Curry Roti", description: "Chicken roti cooked delicately with Indian spices.", price: "13.70", available: "yes" },
        { number: "2", name: "Goat Roti (Bone-In)", description: "Goat roti cooked with mixed vegetables and Indian spices.", price: "14.70", available: "yes" },
        { number: "3", name: "Jerk Chicken Meal", description: "Savoury and tasty jerk chicken.", price: "8.00", available: "no" },
        { number: "4", name: "Fried Chicken Meal", description: "Enjoy this crispy and tasty golden-fried chicken.", price: "13.50", available: "yes" },
        { number: "5", name: "Boneless Curry Chicken Meal", description: "Home-style curry chicken.", price: "12.50", available: "yes" }
    ]
    var menuDescriptions = {
        "number": "Item Number",
        "name": "Name",
        "description": "Description",
        "price": "Price ($)",
        "available": "Available"
    }
    /*Extract value for HTML header*/
    var col = [];
    for (var key in menu[0]) {
        if (col.indexOf(key) === -1) {
            col.push(key);
        }
    }
    /*Create dynamic table*/
    var table = document.createElement("table");

    /*Create HTML table header row using the extracted headers above.*/
    var tr = table.insertRow(-1);                   // Table row

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // Table header
        if (col[i] in menuDescriptions) {
            th.innerHTML = menuDescriptions[col[i]];
        } else {
            th.innerHTML = col[i];
        }
        tr.appendChild(th);
    }
    var th = document.createElement("th");          // Table header
    th.innerHTML = "Options";
    tr.appendChild(th);

    /*Add json data to table rows*/
    for (var i = 0; i < menu.length; i++) {

    tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = menu[i][col[j]];
        }
        var tabOptionCell = tr.insertCell(-1);
        var editLink = document.createElement('a');
        var edithref = 'editMenuItem';
        editLink.href = edithref;
        editLink.innerHTML = 'Edit';
        tabOptionCell.appendChild(editLink);

        tabOptionCell.appendChild(document.createTextNode(" "));
        var deleteLink = document.createElement('a');
        var deletehref = 'deleteMenuItem';
        deleteLink.innerHTML = 'Delete';
        deleteLink.href = deletehref;
        tabOptionCell.appendChild(deleteLink);
    }

    /*Finally add the newly created table with json data to a container*/
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}