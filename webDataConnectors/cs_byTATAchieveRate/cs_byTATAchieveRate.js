(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "Master_Lab_ID",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "courier_dispatch_time",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "report_delivery_time",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "specimen_accessioning_time",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "trf_scanning_time",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "trf_verification_time",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "internal_TAT",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "porter_Service_TAT",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "partner_TAT",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "trf_Entry_TAT",
            dataType: tableau.dataTypeEnum.int
        }];

        var tableSchema = {
            id: "tatAchieveRate",
            alias: "Schema for TAT Achieve Rate and By TAT Dashboard",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

  
    // Download the data
    myConnector.getData = function(table, doneCallback) {

        $.getJSON("https://t2-lims-dashboard-testenv.herokuapp.com/csP0Dashboard/tatAchieveRate", function(resp) {
            var dataSource = resp.table,
                tableData = [];
            
            // Iterate over the JSON object
            for (var i = 0 ; i < dataSource.length; i++) {
                tableData.push({
                    "Master_Lab_ID": dataSource[i]["Master_Lab_ID"],
                    "courier_dispatch_time": dataSource[i]["courier_dispatch_time"],
                    "report_delivery_time": dataSource[i]["report_delivery_time"],
                    "specimen_accessioning_time": dataSource[i]["specimen_accessioning_time"],
                    "trf_scanning_time": dataSource[i]["trf_scanning_time"],
                    "trf_verification_time": dataSource[i]["trf_verification_time"],
                    "internal_TAT": dataSource[i]["internal_TAT"],
                    "porter_Service_TAT": dataSource[i]["porter_Service_TAT"],
                    "partner_TAT": dataSource[i]["partner_TAT"],
                    "trf_Entry_TAT": dataSource[i]["trf_Entry_TAT"]
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
            tableau.connectionName = "tatAchieveRate"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
