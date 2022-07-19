(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "Master_Lab_ID",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "clinic_call_time",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "report_delivery_time",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "specimen_accessioning_time",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "v01_report_signoff_time",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "end_process",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "doctor_perceived_TAT",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "patient_perceived_TAT",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "internal_TAT",
            dataType: tableau.dataTypeEnum.int
        }];

        var tableSchema = {
            id: "qPCRRepeatCaseSchema",
            alias: "Schema for Tat Dashboard",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

  
    // Download the data
    myConnector.getData = function(table, doneCallback) {

        $.getJSON("https://take2healthdataextractionapi.herokuapp.com/labP0Dashboard/tat", function(resp) {
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

    
    $(document).ready(function() {
        $("#submitButton").click(function() {
            console.log("It is working!");
            tableau.connectionName = "qPCRRepeatCase"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
