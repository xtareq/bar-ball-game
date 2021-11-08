
  export class RandomObjectMover{
     $object:any 
     $container: any
     container_is_window:boolean
     pixels_per_second = 250
     current_position = {x: 0, y: 0}
     is_running = false 
     boundEvent:any

     constructor(obj:any, container:any) {
        this.$object = obj;
        this.$container = container;
        this.container_is_window = container === window;
        this.pixels_per_second = 250;
        this.current_position = { x: 0, y: 0 };
        this.is_running = false;
     }
// Set the speed of movement in Pixels per Second.
     setSpeed(pxPerSec){
        this.pixels_per_second = pxPerSec;
     }

     _getContainerDimensions(){
        if (this.$container === window) {
            return { 'height' : this.$container.innerHeight, 'width' : this.$container.innerWidth };
        } else {
             return { 'height' : this.$container.clientHeight, 'width' : this.$container.clientWidth };
        }
     }

     _generateNewPosition(){
        // Get container dimensions minus div size
        var containerSize = this._getContainerDimensions();
        var availableHeight = containerSize.height - this.$object.clientHeight;
        var availableWidth = containerSize.width - this.$object.clientHeight;
        
        // Pick a random place in the space
        var y = Math.floor(Math.random() * availableHeight);
        var x = Math.floor(Math.random() * availableWidth);

        console.log(y);
        
        
        return { x: x, y: y };   
     }

     _calcDelta(a,b){
        var dx   = a.x - b.x;         
        var dy   = a.y - b.y;         
        var dist = Math.sqrt( dx*dx + dy*dy ); 
        return dist;
     }

     _moveOnce(){
               // Pick a new spot on the page
      var next = this._generateNewPosition();
      
      // How far do we have to move?
      var delta = this._calcDelta(this.current_position, next);
      
      // Speed of this transition, rounded to 2DP
      var speed = Math.round((delta / this.pixels_per_second) * 100) / 100;
      
      //console.log(this.current_position, next, delta, speed);
            
      this.$object.style.transition='transform '+speed+'s linear';
      this.$object.style.transform='translate3d('+next.x+'px, '+next.y+'px, 0)';
      
      // Save this new position ready for the next call.
      this.current_position = next;
     }

     start(){
           
        if (this.is_running) {
            return;
        }
        
        // Make sure our object has the right css set
        this.$object.willChange = 'transform';
        this.$object.pointerEvents = 'auto';
        
        this.boundEvent = this._moveOnce.bind(this)
        
        // Bind callback to keep things moving
        this.$object.addEventListener('transitionend', this.boundEvent);
        
        // Start it moving
        this._moveOnce();
        
        this.is_running = true;
     }


     stop(){
        if (!this.is_running) {
            return;
          }
          
          this.$object.removeEventListener('transitionend', this.boundEvent);
          
          this.is_running = false;
     }

  }
  


