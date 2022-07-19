(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "Master_Lab_ID",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "internal_TAT",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "report_delivery_time",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "specimen_accessioning_time",
            dataType: tableau.dataTypeEnum.datetime
        }];

        var tableSchema = {
            id: "cs_byTAT",
            alias: "Schema for By TAT(CS) Dashboard",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

  
    // Download the data
    myConnector.getData = function(table, doneCallback) {

        $.getJSON("https://take2healthdataextractionapi.herokuapp.com/csP0Dashboard/orderByTAT", function(resp) {
            var dataSource = resp.table,
                tableData = [];
            
            // Iterate over the JSON object
            for (var i = 0 ; i < dataSource.length; i++) {
                tableData.push({
                    "Master_Lab_ID": dataSource[i]["Master_Lab_ID"],
                    "internal_TAT": dataSource[i]["internal_TAT"],
                    "report_delivery_time": dataSource[i]["report_delivery_time"],
                    "specimen_accessioning_time": dataSource[i]["specimen_accessioning_time"]
                });
            }


            table.appendRows(tableData);
            doneCallback();
        });
    };
    tableau.registerConnector(myConnector);

    
    $(document).ready(function() {
        $("#submitButton").click(function() {
            console.log("It is working!");
            tableau.connectionName = "cs_byTAT"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
