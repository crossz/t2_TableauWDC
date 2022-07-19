(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "Master_Lab_ID",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "approval_time",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "is_NGS",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "is_repeat",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "ngsRepeatCaseSchema",
            alias: "Schema for NGS Repeat Case Dashboard",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

  
    // Download the data
    myConnector.getData = function(table, doneCallback) {

        $.getJSON("https://take2healthdataextractionapi.herokuapp.com/labP0Dashboard/ngsRepeatCase", function(resp) {
            var dataSource = resp.table,
                tableData = [];
            
            // Iterate over the JSON object
            for (var i = 0 ; i < dataSource.length; i++) {
                tableData.push({
                    "Master_Lab_ID": dataSource[i]["Master_Lab_ID"],
                    "approval_time": dataSource[i]["approval_time"],
                    "is_NGS": dataSource[i]["is_NGS"],
                    "is_repeat": dataSource[i]["is_repeat"]
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
            tableau.connectionName = "ngsRepeatCase"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
