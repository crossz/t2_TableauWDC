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
    myConnector.getData = function (table, doneCallback) {};

    tableau.registerConnector(myConnector);
})();