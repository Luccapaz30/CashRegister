let price = 19.5;
let cid = [
    ["PENNY", 0.5], 
    ["NICKEL", 0], 
    ["DIME", 0], 
    ["QUARTER", 0], 
    ["ONE", 0], 
    ["FIVE", 0], 
    ["TEN", 0], 
    ["TWENTY", 0], 
    ["ONE HUNDRED", 0]
];

const currencyValues = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100,
};

const cashInput = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const changeDue = document.getElementById('change-due');

purchaseBtn.addEventListener('click', () => {
    const cash = parseFloat(cashInput.value);
    const change = cash - price; 
    let totalCID = 0;
    let totalChange = 0;

    // Sumar los fondos totales en la caja registradora
    for (let i = 0; i < cid.length; i++) {
        totalCID += cid[i][1];
    }

    // Verificar si hay suficientes fondos en la caja registradora
    if (totalCID < change || change > totalCID) {
        changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
        return; // Salir de la función
    }else if(change < 0){
        alert("Customer does not have enough money to purchase the item")
    }else if(change === 0){
        changeDue.textContent ="No change due - customer paid with exact cash"
    }

    // Verificar si cada tipo de moneda o billete necesario para el cambio está disponible
    for (let i = cid.length - 1; i >= 0; i--) {
        const moneyName = cid[i][0];
        const currenValue = currencyValues[moneyName];
        const reduceChange = Math.floor(change / currenValue);
        const subtotal = Math.min(reduceChange * currenValue, cid[i][1]);
        totalChange += subtotal;
    }

    // Si la suma total de cambios es menor que el cambio requerido, no hay suficientes fondos disponibles
    if (totalChange < change) {
        changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
        return; // Salir de la función
    }
    // Si hay suficientes fondos disponibles, continuar con la lógica de cálculo del cambio
    const changeArray = [];
    let newChange = change;
    for (let i = cid.length - 1; i >= 0; i--) {
        const moneyName = cid[i][0];
        const currenValue = currencyValues[moneyName];
        const reduceChange = Math.floor(newChange / currenValue);
        const subtotal = Math.min(reduceChange * currenValue, cid[i][1]);
        newChange -= subtotal;
        newChange = parseFloat(newChange.toFixed(2));
        changeArray.push([moneyName, subtotal > 0 ? subtotal : 0]);
    }

    if(change===totalCID){
        changeDue.textContent = "Status: CLOSED";
        changeArray.forEach(([moneyName, amount]) => {
            if (amount !== 0) {
                changeDue.textContent += ` ${moneyName}: $${amount.toFixed(2)}`;
            }
        })
    
;
    }else if(change>0){
    // Mostrar el cambio calculado
    changeDue.textContent = "Status: OPEN";
    changeArray.forEach(([moneyName, amount]) => {
        if (amount !== 0) {
            changeDue.textContent += ` ${moneyName}: $${amount.toFixed(2)}`;
        }
    })
    }

    
});
