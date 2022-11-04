const {createApp} = Vue;

createApp({

  data(){
    return{

      path: 'assets/img/',
      imgLogo: 'logo.png',
      
      tasks: [
        {
          task: 'Comprare collirio Bubi',
          done: false,
          counter: 1,
        },
        {
          task: 'Comprare biscotti Bubi',
          done: false,
          counter: 4,
        },
        {
          task: 'Fare passeggita con il Bubi',
          done: false,
          counter: 1,
        }
      ],

      newTask: '',
      errorMessage: ''

    }
  },

  methods: {

    getAltImg(){
      // crea stringa alt per img
      const imgLogoArray = this.imgLogo.split('.');
      return imgLogoArray[0];

    },

    addCounter(index) {
      // aumento il counter e dato che il counter esiste metto la task come non completata
      this.tasks[index].counter++;
      this.tasks[index].done = false;

    },

    clickCheck(index){
      // decremento il counter e se arrivo a 0 completo la task
      this.tasks[index].counter--
      if(!this.tasks[index].counter) this.tasks[index].done = true;

    },

    clickDelete(index){
      // porta il counter a 0 completando la task
      this.tasks[index].counter = 0;
      this.tasks[index].done = true;

    },

    eraserTask(index){
      // se completato cancello la task, altrimenti mostro messaggio di errore
      if(this.tasks[index].done) this.tasks.splice(index,1);
      else this.errorMessage = 'Non puoi eliminare una task che non è stata completata'

      this.clearErrorMessage()

    },

    createNewTask(){

      // resetto messaggio di errore
      this.errorMessage = '';

      // se ho inserito meno di 5 caratteri stampo messaggio di errore
      if(this.newTask.length < 5){
        
        this.errorMessage = 'Attenzione! Devi scrivere almeno 5 caratteri';

        this.clearErrorMessage();

      } 
      else {

        // controllo se l'array delle task ne contine gia una uguale a quella appena inserita
        if(this.tasks.find(object => object.task === this.newTask)) {
          // ciclo l'array delle task e appena la trovo aumento il contatore
          this.tasks.forEach(object => {
            if(object.task === this.newTask) object.counter++;
          })

        }
        // altrimenti creo l'oggetto task e lo pusho in prima posizione nell'array delle task
        else {

          const task = {
            task: this.newTask,
            done: false,
            counter: 1,
          }

          this.tasks.unshift(task);
          
        }

      }
      // svuoto il campo di input
      this.newTask = '';

    },

    clearErrorMessage(){
      // cancello i messaggi di errore dopo 3 secondi
      setTimeout(()=>{
        this.errorMessage = '';
      }, 3000)

    },

    deleteAll(){
      // con filter creo un array di task non completate
      const uncompleteTask = this.tasks.filter(task => !(task.done));
      console.log(uncompleteTask);
      console.log(uncompleteTask.length);
      // se non esistono task non completate mostro messaggio di errore
      if(uncompleteTask.length === this.tasks.length) {

        // questo messaggio se esistono le task 
        if(this.tasks.length > 0) {
          this.errorMessage = 'Non ci sono task completate da poter cancellare';
        } 
        // questo messaggio se non ci sono più task
        else if(!this.tasks.length) {
          this.errorMessage = 'Crea almeno una nuova task prima di cancellare';
        }

        this.clearErrorMessage();

      } 
      // faccio diventare l'array task uguale a quello delle task non completate cosi in automatico elimino le task completate
      this.tasks = uncompleteTask;

    }

  },

  mounted() {

  }

}).mount('#app');