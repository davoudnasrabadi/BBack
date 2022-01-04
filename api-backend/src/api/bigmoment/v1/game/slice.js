class Slice {

    constructor(x,y,path,isEdge){
        this.x = x;
        this.y = y;
        this.path = path;
        this.isEdge = isEdge;
    }
    getSlice(){
        return {
           x:this.x,
           y:this.y,
           path:this.path,
           isEdge:this.isEdge
        }
    }
}

module.exports ={
    Slice
}