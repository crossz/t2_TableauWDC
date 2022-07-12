/* 建立 Connector 物件 
   文檔請看：https://tableau.github.io/webdataconnector/docs/wdc_tutorial.html
*/

console.log("This is working ");

(function () {
    var myConnector = tableau.makeConnector();

    /* 設定Api的JSON Schema */
    myConnector.getSchema = function (schemaCallback) {

    };

    /* 從Api取得JSON數據 */
    myConnector.getData = function (table, doneCallback) {

    };

    tableau.registerConnector(myConnector);
})();