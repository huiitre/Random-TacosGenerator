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

    //* on récupère toute les viandes cochés
    const allViandes = document.querySelectorAll('.viande input:checked');

    //* on récupère toute les sauces cochés
    const allSauces = document.querySelectorAll('.sauce input:checked');

    //* on récupère tous les légumes cochés
    const allLegumes = document.querySelectorAll('.legume input:checked');

    //* on récup le choix du nb de viande et sauce de l'utilisateur
    const nbViande = document.querySelector('.nb-viande input:checked').value;
    const nbSauce = document.querySelector('.nb-sauce input:checked').value;

    app.displayTacos(
      app.createTacos(allViandes, nbViande),
      app.createTacos(allSauces, nbSauce),
      app.addLegumes(allLegumes)
    );
  },

  addLegumes: function(array) {
    console.log('here');
    console.log(array);
    const arr = [];

    for (let val of array) {
      arr.push(val.name);
    }
    return arr;
  },

  createTacos: function(array, nb) {
    //* on déclare un tab allViandesArray qui va contenir les viandes sélectionnés
    var arrayValues = [];

    if (array.length >= nb) {

      //* on stock toute les values de l'array dans le tab arrayValues
      for (let val of array) {
        arrayValues.push(val.value);
      }

      var random = [];
      var randomName = [];
      
      var i = 0;
      //* tant que random n'est pas en length 3
      while (i != nb) {
        random.push(arrayValues.splice(app.randomArray(arrayValues), 1));
        i++;
      }
      // console.log(arrayValues); log qui montre le restant (pas intéressant)
      //* on stock les viandes dans un tableau plus propre
      let randomClean = [];
      for (let index in random) {
        for (let val of random[index]) {
          randomClean.push(val);
        }
      }

      //* on trie du plus petit au plus grand
      randomClean.sort(app.compareNombres);
      
      let j = 0;
      
      for (let val of array) {
        if (val.value == randomClean[j]) {
          randomName.push(val.name);
          j++;
        }
      }
      return randomName;
    } else {
      alert('Choisis plus de viandes !');
      return false;
    }
  },

  randomArray: function(array) {
    let result = Math.floor(Math.random() * array.length | 0);
    return result;
  },

  compareNombres: function(a, b) {
    return a - b;
  },

  displayTacos: function(viandes, sauces, legumes) {

    const inputValue = document.querySelector('#name').value;

    if (inputValue !== '') {
      //* on récupère la section
    const section = document.querySelector('section.result');
    const ul = document.querySelector('.result ul');
    const btnDelete = document.createElement('i');
    btnDelete.classList.add('bi', 'bi-x-square-fill');
    const li = document.createElement('li');
    const spanName = document.createElement('span');
    spanName.classList.add('prenom');

    //todo viande
    const spanViande = document.createElement('span');
    spanViande.classList.add('viande-span');
    spanName.textContent = ' ' + inputValue + ' : ';
    let viandeList = viandes.join(' - ');
    spanViande.textContent = viandeList;

    //todo sauce
    const spanSauce = document.createElement('span');
    spanSauce.classList.add('sauce-span');
    let sauceList = sauces.join(' - ');
    spanSauce.textContent = ' | ' + sauceList;

    //todo légumes
    const spanLegume = document.createElement('span');
    spanLegume.classList.add('legume-span');
    let legumeList = legumes.join(' - ');
    spanLegume.textContent = ' | ' + legumeList;

    btnDelete.addEventListener('click', app.removeTacos);
    
    li.append(btnDelete, spanName, spanViande, spanSauce, spanLegume);
    ul.prepend(li);
    
    } else {
      alert('error');
    }
  },

  removeTacos: function(evt) {
    const parent = evt.target.closest('li');
    parent.remove();
  }
}
document.addEventListener('DOMContentLoaded', app.init);