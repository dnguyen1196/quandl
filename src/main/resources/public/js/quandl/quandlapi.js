define(function(){
        function get_time_series_data(query, tag){
                $.post("http://localhost:8080/data",
                query,
                function(data, status){
                        if (status == "success") {
                                display_plot(data, tag);
                        }
                        else {
                                console.log(data);
                        }
                });
        }

        function display_plot(data, tag) {
                var quandl_data = JSON.parse(data);
                var margin = 60,
                        width = 750,
                        height = 350;

                var parseDate = d3.time.format("%Y-%m-%d").parse;
                var date_format = d3.time.format("%Y-%m");

                var dataset = quandl_data["dataset"];
                col_names = dataset["column_names"]; // Get column names
                timeseries = dataset["data"]; // Get time series data

                /*
                Get the extent (range) of the data in the time series
                Scale the data linearly
                */
                var x_extent = d3.extent(timeseries, function(d){
                        return parseDate(d[0]);
                });
                var x_scale = d3.scale.linear()
                        .range([margin, width - margin])
                        .domain(x_extent);

                var y_extent = d3.extent(timeseries, function(d){
                        return d[1]
                })
                var y_scale = d3.scale.linear()
                        .range([height - margin, margin])
                        .domain(y_extent);

                /*
                Append the svg elements and append the data to the specific tag
                */
                var svg = d3.select(tag)
                        .append("svg")
                        .attr("width", width)
                        .attr("height", height)

                /*
                Enter the data as "circles"
                */
                svg.selectAll("circle")
                        .data(timeseries)
                        .enter()
                        .append("circle")
                        .attr("cx", function(d){
                                return x_scale(parseDate(d[0]));
                        })
                        .attr("cy", function(d){
                                return y_scale(d[1]);
                        })
                        .attr("r", Math.max(width/timeseries.length - 0.5, 1));
                /*
                Add the y axis
                */
                var y_axis = d3.svg.axis().scale(y_scale).orient("left");
                svg.append("g")
                        .attr("class", "y axis")
                        .attr("transform", "translate(" + margin*0.75 + ", 0)")
                        .call(y_axis);
                /*
                Append the x axis
                */
                var x_axis = d3.svg.axis()
                        .scale(x_scale)
                        .tickFormat(function (d){
                                return date_format(new Date(d));
                        })
                        .orient("bottom");

                svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + (height - margin/2) + ")")
                        .call(x_axis);

        }

        function test(){
                console.log("Test success");
        }

        return {
                //Export the only function 
                get_data: get_time_series_data,
                test: test
        };
});
