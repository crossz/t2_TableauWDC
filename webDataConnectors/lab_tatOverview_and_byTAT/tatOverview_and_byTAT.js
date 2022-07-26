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
            id: "tatOverview_and_byTAT",
            alias: "Schema for TAT Overview and By TAT Dashboard",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

  
    // Download the data
    myConnector.getData = function(table, doneCallback) {

        $.getJSON("https://t2-lims-dashboard-testenv.herokuapp.com/labP0Dashboard/tat", function(resp) {
            var dataSource = resp.table,
                tableData = [];
            
            // Iterate over the JSON object
            for (var i = 0 ; i < dataSource.length; i++) {
                tableData.push({
                    "Master_Lab_ID": dataSource[i]["Master_Lab_ID"],
                    "clinic_call_time": dataSource[i]["clinic_call_time"],
                    "report_delivery_time": dataSource[i]["report_delivery_time"],
                    "specimen_accessioning_time": dataSource[i]["specimen_accessioning_time"],
                    "v01_report_signoff_time": dataSource[i]["v01_report_signoff_time"],
                    "end_process": dataSource[i]["end_process"],
                    "doctor_perceived_TAT": dataSource[i]["doctor_perceived_TAT"],
                    "patient_perceived_TAT": dataSource[i]["patient_perceived_TAT"],
                    "internal_TAT": dataSource[i]["internal_TAT"]
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
            tableau.connectionName = "tatOverview_and_byTAT"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
