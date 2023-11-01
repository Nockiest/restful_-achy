export default class Cell {
    constructor(index, startValue){
        this.index = index
        this.value = startValue
    }

    changeValue(newValue) {
        if (typeof(newValue)!= "string"){
            console.log("DONT CHANGE VALUE TO SOMETHING DIFFERENT THAN A STRING")
            return
            
        }

        this.value = newValue
        console.log("value changed sucesfully ", this.value)
    }
}