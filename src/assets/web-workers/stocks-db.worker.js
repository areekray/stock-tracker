var stocksDatabase = [];
var storeData = function(stocks) {
    stocks.forEach(element => {
        let stockIndex = findStockIndex(stocksDatabase, element);
        if(stockIndex >= 0) {
            stocksDatabase[stockIndex].prices.push(element.price);
            stocksDatabase[stockIndex].timeStamps.push(formatTime(element.timeStamp));
        }else {
            stocksDatabase.push({
                name: element.name,
                prices: [element.price],
                timeStamps: [formatTime(element.timeStamp)]
            })
        }
    });
}

var findStockIndex = function(database, stock) {
    let stockIndex = -1;
    database.some((element, index) => {
        if(element.name === stock.name) {
            stockIndex = index;
            return true;
        }
    });
    return stockIndex;
}

var getStockHistory = function (stockName) {
    let stock = null
    stocksDatabase.some(element => {
        if(element.name === stockName) {
            stock = element;
            return true;
        }
    });
    return stock;
}

var formatTime = function(date) {
    let hr = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let ampm = 'am';
    if( hr > 12 ) {
        hr -= 12;
        ampm = "pm";
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    return `${hr}:${min}:${sec} ${ampm}`;
}

var onmessage = function (e) {
    if(!e || !e.data || !e.data.action) { return }
    switch (e.data.action) {
        case 'store':
            storeData(e.data.stocks);
            postMessage(true);
            break;
        case 'history':
            postMessage(getStockHistory(e.data.stockName));
            break;    
        default:
            break;
    }
    
}