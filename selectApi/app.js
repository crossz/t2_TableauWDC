
function app1()  {
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
            id: "is_qPCR",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "is_repeat",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "qPCRRepeatCaseSchema",
            alias: "Schemafor qPCR Repeat Case Dashboard",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://take2healthdataextractionapi.herokuapp.com/dataextraction", function(resp) {
            var dataSourceTable = resp.table,
                tableData = [];
            
            // Iterate over the JSON object
            for (var i = 0 ; i < dataSourceTable.length; i++) {
                tableData.push({
                    "Master_Lab_ID": dataSourceTable[i]["Master_Lab_ID"],
                    "approval_time": dataSourceTable[i]["approval_time"],
                    "is_qPCR": dataSourceTable[i]["is_qPCR"],
                    "is_repeat": dataSourceTable[i]["is_repeat"]
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };
    tableau.registerConnector(myConnector);
    tableau.connectionName = "T_qPCRRepeatCase"; // This will be the data source name in Tableau
    tableau.submit(); // This sends the connector object to Tableau

};


