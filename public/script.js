window.addEventListener('DOMContentLoaded', function() {

  let forth = document.querySelector('div.forth');
  forth.style.display = 'none';
  const form = document.getElementById('queryForm');
  let get;
  let set;
  
  let countValue = 0;
  let buttonValue;

  document.addEventListener('click', (event) => {

    let  target = event.target;

    let buttonGetter = target.closest('button.getter');
    let buttonSetter = target.closest('button.setter');

    if(buttonGetter) {
        get = 1;
      document.querySelector('.wrapper_get').classList.remove('hidden');
      if(set) {
        document.querySelector('.updater_entry').classList.add('hidden');
        set = 0;
      }
    };

    if(buttonSetter) {
      set = 1
      document.querySelector('.updater_entry').classList.remove('hidden');
      if(get) {
       document.querySelector('.wrapper_get').classList.add('hidden');
       get = 0; 
      }
    };

    let finder = target.closest('.finder');

    if(finder) {
      buttonValue = finder.value;
      let halfButtonLeft = document.querySelector('.half_left');  
      let halfButtonRight = document.querySelector('.half_right');
  
      halfButtonRight.classList.remove('hidden');
      halfButtonLeft.classList.remove('hidden');
    };


    let halfButton = target.closest('.half');
    
    if(halfButton) {
      buttonValue = halfButton.value;
    };

  });

  form.onsubmit = function(event) {
    event.preventDefault();
    let  target = event.target;

    let queryForm = target.closest('#queryForm');

      fetch("/query", {
      method: "POST",
      credentials: "include", // "omit" by default, for cookies to work
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        select1: this.select1[this.select1.selectedIndex].value,
        select2: this.select2[this.select2.selectedIndex].value,
        select3: this.select3[this.select3.selectedIndex].value,
        select4: this.select4[this.select4.selectedIndex].value,
        input: this.inputValue.value,
        orderBy: this.orderBy[this.orderBy.selectedIndex].value,
        queryLimit: this.queryLimit[this.queryLimit.selectedIndex].value,
        sorting: this.sortingID[this.sortingID.selectedIndex].value,
        buttonValue:buttonValue,
      })
    })
    .then(async response => {

      response =  await response.json()
      let divTable = document.querySelector('div.table-result');

      let ulMessage = document.querySelector('ul.message');

      if (response.table) {
        ulMessage.innerHTML = `<li>${response.result.message} || Total rows: ${response.result.counter || 0}  || Pages: ${response.result.pages + 1 || 0} || Page: ${response.result.page  + 1 || 0}</li>`; 
        divTable.innerHTML = response.result.table;
          
      } else {
        
        let li = '';
        for (let i in response.result) {
          li += `<li>${response.result[i].message}</li>`;
        };
          ulMessage.innerHTML = li;
      }
    })
    .catch(function(err) {
      alert("Error: " + err.message);
    });
  }

  const formUpd = document.querySelector('#updForm');

  formUpd.onsubmit = function(event) {
    event.preventDefault();
    let  target = event.target;

      fetch("/update", {
          method: "POST",
          credentials: "include", // "omit" by default, for cookies to work
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
         
            id: this.updateId.value,
            title: this.updateTitle.value,
            date: this.updateDate.value,
            author: this.updateAuthor.value,
            description: this.updateDesc.value,
            image: this.updatePic.value,
            isbn: this.updateIsbn.value,
       
          })
        })
        .then(async response => {

          response =  await response.json()
console.log('=====res======');
          console.log(    response      );
console.log('=====res======');
          let divTable = document.querySelector('div.table-result');

          let ulMessage = document.querySelector('ul.message');

          if (response.table) {
            ulMessage.innerHTML = `<li>${response.result.message} || Total rows: ${response.result.counter || 0}  || Pages: ${response.result.pages + 1 || 0} || Page: ${response.result.page  + 1 || 0}</li>`; 
            divTable.innerHTML = response.result.table;
              
          } else {
            
            let li = '';
            for (let i in response.result) {
              li += `<li>${response.result[i].message}</li>`;
            };
              ulMessage.innerHTML = li;
          }
        })
        .catch(function(err) {
          alert("Error: " + err.message);
        });

  }






  let select3Value;
  let select4Value;
  let inputValue;
  document.addEventListener('change', function (event) {



    if(event.target.closest('#select3')) {

      select3Value = document.querySelector('#select3');      
      select3Value = select3Value[select3Value.selectedIndex].value ;
    } else if(event.target.closest('#select4')) {

       select4Value = document.querySelector('#select4');
       select4Value = select4Value[select4Value.selectedIndex].value;
    } else if(event.target.closest('#inputValue')) {

      inputValue = document.querySelector('#inputValue').value;
    };




    if(select3Value && select4Value && inputValue) {

      forth.style.display = 'block';
    } else {

      forth.style.display = 'none';
    }


  })
});