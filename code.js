// task type {fun,input, callback}
// fun is a promise 
// input is the promise input when it called
// callback when the promise ended, it take err, data as response 
this.tasks = [] ;
this.runningCount = 0;
const MAX_RUNS = 3;

let nextTask = () => {
    // if there is no more task or there is task already running return 
    if (this.tasks.length === 0 || this.runningCount >= MAX_RUNS) {
        return;
    }

    // slice first task to run it
    let task = this.tasks.shift();

    // run first task
    this.runningCount++ ;
    console.log(`Tasks runningCount = ${this.runningCount} `)


    let {fun,input, callback} = task  ;

    // call the promise, 
    // when promise finish call next task and return current task error or data in the callback
    fun(input)
        .then((d)=>{
            this.runningCount-- ;
            nextTask();
            // set error with null ; 
            callback(null,d)
        })
        .catch((e)=>{
            this.runningCount-- ;
            nextTask();
            callback(e,null)
        });

}

let addTask = (fun,input, callback) => {
    let task = {fun,input, callback};
    this.tasks.push(task);
    // if there is no task running run new one 
    if(this.tasks.length <= MAX_RUNS && this.runningCount <= MAX_RUNS){
        nextTask();
    }
};


module.exports = {
    addTask
}
