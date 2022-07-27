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
        }, {
            id: "current_symptoms_opt_0",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "current_symptoms_opt_1",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "current_symptoms_opt_2",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "current_symptoms_opt_3",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "current_symptoms_opt_4",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "current_symptoms_opt_5",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "current_symptoms_opt_6",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "current_symptoms_opt_7",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "current_symptoms_opt_8",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "current_symptoms_opt_9",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "current_symptoms_opt_10",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "current_symptoms_opt_11",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "current_symptoms_opt_12",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "current_symptoms_opt_13",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "current_symptoms_opt_14",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "current_symptoms_opt_15",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "current_symptoms_opt_16",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "current_symptoms_opt_17",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "current_symptoms_opt_18",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "current_symptoms_opt_19",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "current_symptoms_opt_20",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "current_symptoms_opt_21",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "family_history_of_npc_opt_0",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "family_history_of_npc_opt_1",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "family_history_of_npc_opt_2",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "family_history_of_npc_opt_3",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "family_history_of_npc_opt_4",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "family_history_of_npc_opt_5",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "family_history_of_npc_opt_6",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "family_history_of_npc_opt_7",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "family_history_of_npc_opt_8",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "family_history_of_npc_opt_9",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "previous_npc_screen_opt_0",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "previous_npc_screen_opt_1",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "previous_npc_screen_opt_2",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "previous_npc_screen_opt_3",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "previous_npc_screen_opt_4",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "previous_npc_screen_opt_5",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "previous_npc_screen_opt_6",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "previous_npc_screen_opt_7",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "previous_npc_screen_opt_8",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "previous_npc_screen_opt_9",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "previous_npc_screen_opt_10",
             dataType: tableau.dataTypeEnum.string
        }, {
            id: "previous_npc_screen_opt_11",
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

        $.getJSON("https://t2-lims-dashboard-testenv.herokuapp.com/csP0Dashboard/orderByRiskFactor", function(resp) {
            var dataSource = resp.table,
                tableData = [];
            
            // Iterate over the JSON object
            for (var i = 0 ; i < dataSource.length; i++) {
                tableData.push({
                    "Master_Lab_ID": dataSource[i]["Master_Lab_ID"],
                    "specimen_accessioning_time": dataSource[i]["specimen_accessioning_time"],
                    "trf_verification_time": dataSource[i]["trf_verification_time"],
                    "current_smoker": dataSource[i]["current_smoker"],
                    "current_symptoms_opt_0": dataSource[i]["current_symptoms_opt_0"],
                    "current_symptoms_opt_1": dataSource[i]["current_symptoms_opt_1"],
                    "current_symptoms_opt_2": dataSource[i]["current_symptoms_opt_2"],
                    "current_symptoms_opt_3": dataSource[i]["current_symptoms_opt_3"],
                    "current_symptoms_opt_4": dataSource[i]["current_symptoms_opt_4"],
                    "current_symptoms_opt_5": dataSource[i]["current_symptoms_opt_5"],
                    "current_symptoms_opt_6": dataSource[i]["current_symptoms_opt_6"],
                    "current_symptoms_opt_7": dataSource[i]["current_symptoms_opt_7"],
                    "current_symptoms_opt_8": dataSource[i]["current_symptoms_opt_8"],
                    "current_symptoms_opt_9": dataSource[i]["current_symptoms_opt_9"],
                    "current_symptoms_opt_10": dataSource[i]["current_symptoms_opt_10"],
                    "current_symptoms_opt_11": dataSource[i]["current_symptoms_opt_11"],
                    "current_symptoms_opt_12": dataSource[i]["current_symptoms_opt_12"],
                    "current_symptoms_opt_13": dataSource[i]["current_symptoms_opt_13"],
                    "current_symptoms_opt_14": dataSource[i]["current_symptoms_opt_14"],
                    "current_symptoms_opt_15": dataSource[i]["current_symptoms_opt_15"],
                    "current_symptoms_opt_16": dataSource[i]["current_symptoms_opt_16"],
                    "current_symptoms_opt_17": dataSource[i]["current_symptoms_opt_17"],
                    "current_symptoms_opt_18": dataSource[i]["current_symptoms_opt_18"],
                    "current_symptoms_opt_19": dataSource[i]["current_symptoms_opt_19"],
                    "current_symptoms_opt_20": dataSource[i]["current_symptoms_opt_20"],
                    "current_symptoms_opt_21": dataSource[i]["current_symptoms_opt_21"],
                    "family_history_of_npc_opt_0": dataSource[i]["family_history_of_npc_opt_0"],
                    "family_history_of_npc_opt_1": dataSource[i]["family_history_of_npc_opt_1"],
                    "family_history_of_npc_opt_2": dataSource[i]["family_history_of_npc_opt_2"],
                    "family_history_of_npc_opt_3": dataSource[i]["family_history_of_npc_opt_3"],
                    "family_history_of_npc_opt_4": dataSource[i]["family_history_of_npc_opt_4"],
                    "family_history_of_npc_opt_5": dataSource[i]["family_history_of_npc_opt_5"],
                    "family_history_of_npc_opt_6": dataSource[i]["family_history_of_npc_opt_6"],
                    "family_history_of_npc_opt_7": dataSource[i]["family_history_of_npc_opt_7"],
                    "family_history_of_npc_opt_8": dataSource[i]["family_history_of_npc_opt_8"],
                    "family_history_of_npc_opt_9": dataSource[i]["family_history_of_npc_opt_9"],
                    "previous_npc_screen_opt_0": dataSource[i]["previous_npc_screen_opt_0"],
                    "previous_npc_screen_opt_1": dataSource[i]["previous_npc_screen_opt_1"],
                    "previous_npc_screen_opt_2": dataSource[i]["previous_npc_screen_opt_2"],
                    "previous_npc_screen_opt_3": dataSource[i]["previous_npc_screen_opt_3"],
                    "previous_npc_screen_opt_4": dataSource[i]["previous_npc_screen_opt_4"],
                    "previous_npc_screen_opt_5": dataSource[i]["previous_npc_screen_opt_5"],
                    "previous_npc_screen_opt_6": dataSource[i]["previous_npc_screen_opt_6"],
                    "previous_npc_screen_opt_7": dataSource[i]["previous_npc_screen_opt_7"],
                    "previous_npc_screen_opt_8": dataSource[i]["previous_npc_screen_opt_8"],
                    "previous_npc_screen_opt_9": dataSource[i]["previous_npc_screen_opt_9"],
                    "previous_npc_screen_opt_10": dataSource[i]["previous_npc_screen_opt_10"],
                    "previous_npc_screen_opt_11": dataSource[i]["previous_npc_screen_opt_11"]
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
