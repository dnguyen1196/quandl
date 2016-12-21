define(function (require) {
	var api = require('../quandl/quandlapi');
	var math = require('../tools/math.min');

	$("#search_button").click(function(){
		// Get the stock names and the start/end dates
		var stock1 = $("#stock-picker-search-1").val();
		var stock2 = $("#stock-picker-search-2").val();
		var start_date = $("#start-date-picker").datepicker("getDate");
		var end_date = $("#end-date-picker").datepicker("getDate");

		var start_date = stringFormat(start_date);
		var end_date = stringFormat(end_date);

		var query_1 = {stock:stock1, start:start_date, end:end_date}
		var query_2 = {stock:stock2, start:start_date, end:end_date}


		// Perform two calls to the api
		var stock_data_1 = api.get_json_data(query_1);
		var stock_data_2 = api.get_json_data(query_2);

		console.log(stock_data_1);
		console.log(stock_data_2);

	});

	// Function to convert between date formats into string to send HTTP request
	function stringFormat(date){
		return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
	}


	// Funcitont to calculate covariance between two stock data series
 	function calculateCovariance(stock_data_1, stock_data_2){
 		var product_array = [];
 		for (var i = 0; i < stock_data_1[0].length; i++) {
 			product_array.append(stock_data_1[0][i]*stock_data_2[0][i]);
 		}
 		return math.mean(product_array) - math.mean(stock_data_1) * math.mean(stock_data_2);
 	}

 	function performLinearRegression(data) {
 		// TODO
 	}

});
