var reStructureList = (list) => {
    return list.map(function (item) {
        return {
            name: item[0],
            price: item[1],
            timeStamp: new Date(),
            difference: 0
        }
    });
}
var configuring = false;

var updateStocks = (oldStockList, newStockList) => {
    let removableList = []
    oldStockList.some(oldStock => {
        if(newStockList.length > 0){
            newStockList.some((newStock) => {
                if(oldStock.name === newStock.name) {
                    oldStock.difference = (newStock.price - oldStock.price);
                    oldStock.price = newStock.price;
                    oldStock.timeStamp = new Date();
                    removableList.push(newStock.name);
                    return true;
                }
            });
        }else {
            return true;
        }        
    });
    newStockList = newStockList.filter(function(item) {
        return !removableList.includes(item.name)
    });
    if(newStockList.length > 0) {
        oldStockList = oldStockList.concat(newStockList);
    }
    return oldStockList;
}

var removeRedundant = function(list) {
    let uniqueNames = [], removableIndexes = [];
    list.forEach((element, index) => {
        if(uniqueNames.indexOf(element.name) >= 0) {
            removableIndexes.push(index);
        }else {
            uniqueNames.push(element.name);
        }
    });
    return list.filter(function(item, index) {
        return removableIndexes.indexOf(index) < 0 }
    );
}

var onmessage = function (e) {
    if(!e || !e.data || configuring) { return }
    configuring = true;
    e.data.newStockList = removeRedundant(reStructureList(e.data.newStockList));
    if(e.data.oldStockList && e.data.oldStockList.length > 0) {
        postMessage(updateStocks(e.data.oldStockList, e.data.newStockList));
    }else {
        postMessage(e.data.newStockList);
    }
    configuring = false;
}