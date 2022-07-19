(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "Master_Lab_ID",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "v01_report_sign_off_time",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "is_v01_report_result_authorized",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "is_v02_report_result_authorized",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "v01_end_process",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "v01_report_result",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "v02_end_process",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "v02_test_result",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "qPCRPositive_and_ngsPositive",
            alias: "Schema for qPCR Positive and NGS Positive",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

  
    // Download the data
    myConnector.getData = function(table, doneCallback) {

        $.getJSON("https://take2healthdataextractionapi.herokuapp.com/labP0Dashboard/positiveResult", function(resp) {
            var dataSource = resp.table,
                tableData = [];
            
            // Iterate over the JSON object
            for (var i = 0 ; i < dataSource.length; i++) {
                tableData.push({
                    "Master_Lab_ID": dataSource[i]["Master_Lab_ID"],
                    "v01_report_sign_off_time": dataSource[i]["v01_report_sign_off_time"],
                    "is_v01_report_result_authorized": dataSource[i]["is_v01_report_result_authorized"],
                    "is_v02_report_result_authorized": dataSource[i]["is_v02_report_result_authorized"],
                    "v01_report_signoff_time": dataSource[i]["v01_report_signoff_time"],
                    "v01_end_process": dataSource[i]["v01_end_process"],
                    "v01_report_result": dataSource[i]["v01_report_result"],
                    "v02_end_process": dataSource[i]["v02_end_process"],
                    "v02_test_result": dataSource[i]["v02_test_result"]
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
            tableau.connectionName = "qPCRPositive_and_ngsPositive"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
