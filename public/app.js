/* 建立 Connector 物件 
   文檔請看：https://tableau.github.io/webdataconnector/docs/wdc_tutorial.html
*/

(function () {
    var myConnector = tableau.makeConnector();

    /* 設定Api的JSON Schema */
    myConnector.getSchema = function (schemaCallback) {
        // 定義每一個數據的title
        const qPCRRepeatCase = [
            {
                id: "batch_id",
                dataType: tableau.dataTypeEnum.int
            },
            {
                id: "id",
                dataType: tableau.dataTypeEnum.int
            },
            {
                id: "Operation",
                dataType: tableau.dataTypeEnum.string
            },
        ];

        // 設定Json Schema 的名字
        let qPCRRepeatCaseSchema = {
            id: "data_qPCRRepeatCase",
            alis: "Data for qPCR Repeat Case Dashboard",
            columns: qPCRRepeatCase,
        };

        schemaCallback([qPCRRepeatCaseSchema])
    };

    /* 從Api取得JSON數據 */
    myConnector.getData = function (table, doneCallback) {
        let tableDate = []
        var i = 0

        // 用jquery Api request 
        $.getJSON("https://take2healthdataextractionapi.herokuapp.com/dataextraction", function(resp) {
            for (i = 0, len = resp.length; i < len; i++) {
                tableData.push({
                    "batch_id": resp[i].batch_id,
                    "id": resp[i].properties.id,
                    "Operation": resp[i].properties.Operation,
                });
            }
            table.appendRows(tableDate);
            doneCallback();
        });

    };


    /* 註冊Connector 物件 */  
    tableau.registerConnector(myConnector);
})();

/* 將Connector物件與Submit按鈕勾取(hook up)在一起
    當Submit按鈕被點擊時，調用getData function*/
document.querySelector("#submitButton").addEventListener('click', getData)

/* getData function
    初始化Connector 物件，並連接tableau desktop*/
function getData() {
    // 連接器在tableau裏的名字
    tableau.connectionName = "USGS Earthquake Feed";
    tableau.submit()
    
}