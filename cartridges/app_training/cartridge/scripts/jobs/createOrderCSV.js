'use strict';

var OrderMgr = require('dw/order/OrderMgr');
var File = require('dw/io/File');
var FileWriter = require('dw/io/FileWriter');
var CSVStreamWriter = require('dw/io/CSVStreamWriter');
var Status = require('dw/system/Status');
var Order = require('dw/order/Order');

/**
 * Formats the order data into an array suitable for CSV writing.
 * @param {dw.order.Order} order - The order object.
 * @returns {Array} - An array of order data.
 */
function formatOrderData(order) {
    var customerName = order.customerName || 'Guest';
    var totalAmount = order.totalGrossPrice.value;
    var currency = order.currencyCode;
    var orderDate = order.creationDate;

    return [order.orderNo, customerName, totalAmount, currency, orderDate];
}

/**
 * Writes the header row to the CSV file.
 * @param {dw.io.CSVStreamWriter} csvWriter - The CSV writer object.
 */
function writeCSVHeader(csvWriter) {
    csvWriter.writeNext(['Order Number', 'Customer Name', 'Total Amount', 'Currency', 'Order Date']);
}

/**
 * Main function to execute the job.
 * @param {Object} parameters - Job parameters.
 * @returns {dw.system.Status} - The status of the job execution.
 */
function execute(parameters) {
    var filePath = parameters.filePath || '/IMPEX/src/orders.csv';
    var orderStatus = parameters.orderStatus || 'all';
    
    // Modify the order search query based on the orderStatus parameter
    var query = 'status != {0}';
    if (orderStatus !== 'all') {
        query = 'status = {0}';
    }
    
    var orders = OrderMgr.searchOrders(query, 'creationDate desc', orderStatus === 'all' ? Order.ORDER_STATUS_CANCELLED : orderStatus);
    var file = new File(filePath);
    var fileWriter = new FileWriter(file);
    var csvWriter = new CSVStreamWriter(fileWriter);

    try {
        // Write CSV header
        writeCSVHeader(csvWriter);

        while (orders.hasNext()) {
            var order = orders.next();
            var orderData = formatOrderData(order);

            // Write order data
            csvWriter.writeNext(orderData);
        }
    } catch (e) {
        return new Status(Status.ERROR, 'ERROR', 'Failed to create CSV file: ' + e.message);
    } finally {
        csvWriter.close();
        fileWriter.close();
    }

    return new Status(Status.OK, 'OK', 'CSV file created successfully.');
}

module.exports = {
    execute: execute
};