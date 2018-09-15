
var LevelManager = /** @class */ (function ()
{
    // Singleton
    var instance;
    
    //Levels

    function init()
    {
        // Private methods and variables
        // function privateMethod(){
        //     console.log( "I am private" ); 
        // }

        
        //var privateRandomNumber = Math.random();
        var _currentMap = null;
        var _currentCamera = null;
        var _currentPlayer = null;
        
        return{

            Initialize: function () {

                _currentCamera = new Camera(TempestGame.getInstance().GetCurrentScene());

                // Map TEMP till we get something better.
                var points = [
                    new Vector2(-10,100),
                    new Vector2(10,100),
                    new Vector2(15,80),
                    new Vector2(30,50),
                    new Vector2(70,40),
                    new Vector2(100,35),
                    new Vector2(100,-35),
                    new Vector2(50,-50),
                    new Vector2(50,-75),
                    new Vector2(10,-100),
                    new Vector2(-10,-100),
                    new Vector2(-50,-75),
                    new Vector2(-50,-50),
                    new Vector2(-100,-35),
                    new Vector2(-100,35),
                    new Vector2(-70,40),
                    new Vector2(-30,50),
                    new Vector2(-15,80)
                ]
                _currentMap = new Map(points);


                //Spawn Player
                var pIndex = 0
                var newPosition = _currentMap.GetEdgeVectorPosition(pIndex)
                _currentPlayer = new Player(pIndex, newPosition);
            }, 
        
            Update:  function (deltaTime) {
                _currentMap.Update(deltaTime);
                _currentPlayer.Update(deltaTime);
            },

            GetCurrentMap : function(){
                return _currentMap;
            },

            GetCurrentPlayer : function(){
                return _currentPlayer;
            }

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