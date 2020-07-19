//https://mattsnider.com/use-a-string-buffer-for-better-performance/
class StringBuffer {
    constructor(){
        this.buffer = [];

        this.index = 0;
    }

    append(str){
        this.buffer[this.index] = str;

        this.index += 1;
        
        return this;
    }

    toString(){
        return this.buffer.join("");
    }
}

module.exports = StringBuffer;