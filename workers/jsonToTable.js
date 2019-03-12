module.exports = class JsonToTable {
  constructor() {
  }

  jsonToTable(resJson) {
    const cols = Object.keys(resJson[0]);
    let headerRow = '';
    let bodyRows = '';
    let bodyCell = '';

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    cols.map((col) => {
      headerRow += '<th>' + capitalizeFirstLetter(col) + '</th>';
    });

    resJson.map(jsonObject => {
      bodyRows += '<tr>';

      for(let key in jsonObject) {
        bodyRows += `<td>${jsonObject[key]}</td>`; 
     } 
      bodyRows += '</tr>';
    });


    let resultString = '<table class="result"><thead><tr>' +
         headerRow +
         '</tr></thead><tbody>' +
         bodyRows +
         '</tbody></table>';

    return resultString;
  };


};

