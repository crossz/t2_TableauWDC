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
            id: "trf_verification_time",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "current_smoker",
            dataType: tableau.dataTypeEnum.string
        },  {
            id: "current_symptoms",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "family_history_of_npc",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "previous_npc_scree",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "byRiskFactor",
            alias: "Schema for By Risk Factor",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

  
    // Download the data
    myConnector.getData = function(table, doneCallback) {

        $.getJSON("https://take2healthdataextractionapi.herokuapp.com/csP0Dashboard/orderByRiskFactor", function(resp) {
            var dataSource = resp.table,
                tableData = [];
            
            // Iterate over the JSON object
            for (var i = 0 ; i < dataSource.length; i++) {
                tableData.push({
                    "Master_Lab_ID": dataSource[i]["Master_Lab_ID"],
                    "specimen_accessioning_time": dataSource[i]["specimen_accessioning_time"],
                    "trf_verification_time": dataSource[i]["trf_verification_time"],
                    "current_smoker": dataSource[i]["current_smoker"],
                    "current_symptoms": dataSource[i]["current_symptoms"],
                    "family_history_of_npc": dataSource[i]["family_history_of_npc"],
                    "previous_npc_scree": dataSource[i]["previous_npc_scree"]
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
            tableau.connectionName = "byRiskFactor"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
