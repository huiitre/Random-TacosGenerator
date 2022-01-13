const app = {

  init: function() {
    console.log('app : init');
    app.allAddEventListener();
  },

  allAddEventListener: function() {
    /* const allViandes = document.querySelectorAll('.viande input:checked');
    console.log(allViandes); */
    const btn = document.querySelector('.submit button');
    btn.addEventListener('click', app.handleSubmit);
  },

  handleSubmit: function(evt) {
    //* on récup le nom
    const nameInput = document.querySelector('.input-name');

    //* on récupère toute les viandes cochés
    const allViandes = document.querySelectorAll('.viande input:checked');

    //* on récupère toute les sauces cochés
    const allSauces = document.querySelectorAll('.sauce input:checked');

    //* on récup les viande et sauce
    const nbViande = document.querySelector('.nb-viande input:checked').value;
    // console.log('supp viande : ' + suppViande.value);
    const nbSauce = document.querySelector('.nb-sauce input:checked');
    // console.log('supp sauce : ' + suppSauce.value);

    //* on déclare un tab allViandesArray qui va contenir les viandes sélectionnés
    var allViandesArray = [];

    if (allViandes.length >= nbViande) {

      //* on stock toute les values de allViandes dans le tab allViandesArray
      for (let val of allViandes) {
        allViandesArray.push(val.value);
      }

      console.log('---------- debut ----------');

      var randomViande = [];
      var randomNameViande = [];
      
      var i = 0;
      //* tant que randomViande n'est pas en length 3
      while (i != nbViande) {
        randomViande.push(allViandesArray.splice(app.randomArray(allViandesArray), 1));
        i++;
      }
      // console.log(allViandesArray); log qui montre le restant (pas intéressant)
      //* on stock les viandes dans un tableau plus propre
      let newRandomViande = [];
      for (let index in randomViande) {
        for (let val of randomViande[index]) {
          newRandomViande.push(val);
        }
      }

      //* on trie du plus petit au plus grand
      newRandomViande.sort(app.compareNombres);
      
      let j = 0;
      
      for (let val of allViandes) {
        if (val.value == newRandomViande[j]) {
          randomNameViande.push(val.name);
          j++;
        }
      }
      console.log(randomNameViande);
      console.log(newRandomViande);
      console.log(nameInput.value);

      if (nameInput.value !== '') {
        app.displayTacos(nameInput.value, randomNameViande);
        nameInput.value = '';
      } else {
        alert('Veuillez remplir le champ "Nom" !');
      }
    } else {
      alert('Choisis plus de viandes !');g
    }
  },

  createViande: function() {

  },

  randomArray: function(array) {
    let result = Math.floor(Math.random() * array.length | 0);
    return result;
  },

  compareNombres: function(a, b) {
    return a - b;
  },

  displayTacos: function(name, viandes) {

    //* on récupère la section
    const section = document.querySelector('section.result');
    const ul = document.querySelector('.result ul');
    const btnDelete = document.createElement('i');
    btnDelete.classList.add('bi', 'bi-x-square-fill');
    const li = document.createElement('li');
    const spanName = document.createElement('span');
    spanName.classList.add('prenom');
    const spanViande = document.createElement('span');
    spanName.textContent = ' ' + name + ' : ';
    let viandeList = viandes.join(' - ');
    spanViande.textContent = viandeList;

    btnDelete.addEventListener('click', app.removeTacos);
    
    li.append(btnDelete, spanName, spanViande);
    ul.prepend(li);
  },

  removeTacos: function(evt) {
    const parent = evt.target.closest('li');
    parent.remove();
  }
}
document.addEventListener('DOMContentLoaded', app.init);