//= require quandlapi.js

define(
        ['./quandlapi'],

function (quandlapi) {
        return{
                get_data: quandlapi.get_quandl_data()
        }
});
