
var LevelManager = /** @class */ (function ()
{
    // Singleton
    var instance;
    // Score Fields
    
    
    function init(game, scene)
    {
        // Private methods and variables
        // function privateMethod(){
        //     console.log( "I am private" ); 
        // }

        
        //var privateRandomNumber = Math.random();
        
        
        return{

            Create: function () {

            }, 
        
            Update:  function () {
                
            },
            

            //publicProperty: "I am also public",
            //   getRandomNumber: function() {
            //     return privateRandomNumber;
            //   }
            
        }
    };
    return{
        getInstance: function(){
            if ( !instance ) {
                instance = init();
              }
         
              return instance;
        }
    };
})();