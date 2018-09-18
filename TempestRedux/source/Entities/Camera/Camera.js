// var Camera = /** @class */ (function (){
//     var self = this;
//     //var instance;

//     function Camera(scene)
//     {
        
//     }

//     return Camera;

//     /*
//     return {
 
//         // Get the Singleton instance if one exists
//         // or create one if it doesn't
//         getInstance: function () {
     
//           if ( !instance ) {
//             instance = init();
//           }
     
//           return instance;
//         }
//       };
//       */
// }())




var Camera = /** @class */ (function ()
{
    // Singleton
    var instance;
    
    function init()
    {
        // Private methods and variables
        // function privateMethod(){
        //     console.log( "I am private" );
        // }
        
        //var privateRandomNumber = Math.random();
        // important game variables in phaser

        // Private Variables



        return{
            Initialize: function(){
                // Generate an empty sprite in the middle of the world. Have camera follow it to center camera
                // ... I know... its fucking stupid...
                
                var origin = TempestGame.getInstance().GetCurrentScene().add.image(0,0);
                TempestGame.getInstance().GetCurrentScene().cameras.main.startFollow(origin, true);
            },

            Update:  function () {
                
            },
        
            //publicProperty: "I am also public",
            //   getRandomNumber: function() {
            //     return privateRandomNumber;
            //   }
            
            Shake: function()
            {
                
            }
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
