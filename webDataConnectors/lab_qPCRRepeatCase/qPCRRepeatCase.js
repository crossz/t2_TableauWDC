(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "Master_Lab_ID",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "specimen_accessioning_time",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "approval_time",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "is_qPCR",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "is_repeat",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "qPCRRepeatCaseSchema",
            alias: "Schema for qPCR Repeat Case Dashboard",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

  
    // Download the data
    myConnector.getData = function(table, doneCallback) {

        $.getJSON("https://t2-lims-dashboard-testenv.herokuapp.com/labP0Dashboard/qPCRRepeatCase", function(resp) {
            var dataSource = resp.table,
                tableData = [];
            
            // Iterate over the JSON object
            for (var i = 0 ; i < dataSource.length; i++) {
                tableData.push({
                    "Master_Lab_ID": dataSource[i]["Master_Lab_ID"],
                    "specimen_accessioning_time": dataSource[i]["specimen_accessioning_time"],
                    "approval_time": dataSource[i]["approval_time"],
                    "is_qPCR": dataSource[i]["is_qPCR"],
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
            tableau.connectionName = "qPCRRepeatCase"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
