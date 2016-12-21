
define(function (require) {
	var api = require('./quandlapi');

	$("#search_button").click(function(){
		var stock = $("#stock-picker-search").val();
		var start_date = $("#start-date-picker").datepicker("getDate");
		var end_date = $("#end-date-picker").datepicker("getDate");

		start_date = stringFormat(start_date);
		end_date = stringFormat(end_date);
		query = {stock:stock, start:start_date, end:end_date};

		$("#visualization").empty();
		api.get_data(query, "#visualization");
	});

	function stringFormat(date){
		console.log(date);
		return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
	}

	
});
