// WDC文檔：https://tableau.github.io/webdataconnector/docs/wdc_tutorial.html

(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema 
    myConnector.getSchema = function(schemaCallback) {
        // 定義在tableau裏的Columns名稱和數據類型
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
            alias: "Schema for qPCR Repeat Case Dashboard",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

  
    // Download the data (從API中取得相應的數據)
    myConnector.getData = function(table, doneCallback) {

        $.getJSON("https://t2-lims-dashboard-testenv.herokuapp.com/dataextraction", function(resp) {
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

    // When the [get data] button is clicked 
    $(document).ready(function() {
        $("#submitButton").click(function() {
            console.log("It is working!");
            tableau.connectionName = "qPCRRepeatCase"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
