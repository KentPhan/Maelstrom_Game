// Could swap this in for a level builder if we had time





var LevelManager = /** @class */ (function ()
{
    // Singleton
    var instance;
   
    function init()
    {
        // Private methods and variables
        // function privateMethod(){
        //     console.log( "I am private" ); 
        // }
         //Levels
        var Levels = {
            START:1,
            GAMEOVER:2,
            CREDITS:3,
            LEVEL_1:4,
            properties:{
                1: {IS_UI:true, TEXT:"Start Game", X:-160, Y:-20},
                2: {IS_UI:true, TEXT:"ALL YOUR BASE ARE\n     BELONG TO US", X:-380, Y:-50},
                3: {IS_UI:true, TEXT:"Our Great Credits:", X:-320, Y:-20},
                4: {IS_UI:false,
                    MAP_POINTS:[
                        new Vector2(-90,-75),
                        new Vector2(-80,-50),
                        new Vector2(-70,-25),
                        new Vector2(-60,0),
                        new Vector2(-50,25),
                        new Vector2(-40,50),
                        new Vector2(-30,75),
                        new Vector2(-20,100),
                        // SpecialPoints.BoundStart,
                        // SpecialPoints.BoundEnd,
                        new Vector2(20,100),
                        new Vector2(30,75),
                        new Vector2(40,50),
                        new Vector2(50,25),
                        new Vector2(60,0),
                        new Vector2(70,-25),
                        new Vector2(80,-50),
                        new Vector2(90,-75),
                        new Vector2(100,-100),
                        // SpecialPoints.BoundStart,
                        // SpecialPoints.BoundEnd,
                        new Vector2(-100,-100),
                    ]
                }
                // 4: {IS_UI:false,
                //     MAP_POINTS:[
                //         new Vector2(-10,100),
                //         new Vector2(10,100),
                //         new Vector2(15,80),
                //         new Vector2(30,50),
                //         new Vector2(70,40),
                //         new Vector2(100,35),
                //         new Vector2(100,-35),
                //         SpecialPoints.BoundEnd,
                //         SpecialPoints.BoundStart,//new Vector2(50,-50),
                //         new Vector2(50,-75),
                //         new Vector2(10,-100),
                //         new Vector2(-10,-100),
                //         new Vector2(-50,-75),
                //         new Vector2(-50,-50),
                //         new Vector2(-100,-35),
                //         new Vector2(-100,35),
                //         new Vector2(-70,40),
                //         new Vector2(-30,50),
                //         new Vector2(-15,80)
                //     ]
                // }
            }
        };

        

        //var privateRandomNumber = Math.random();
        var _currentLevelState = null;
        var _currentLevel = null;
        var _currentCamera = null;
        

        function LoadLevel(level){
            var enemyManager = EnemyManager.getInstance();

            // Clear enemies
            enemyManager.ResetEnemies();
            enemyManager.DeactivateEnemies();

            // Clean up
            _currentLevelState = level;
            _currentLevel.AttemptToWipeAss();
            delete _currentLevel;

            // Instantiate new level
            _currentLevel = new Level(Levels.properties[_currentLevelState])
            TempestGame.getInstance().ShowScore();
            return;
        }

        function LoadMenu(level){
            var enemyManager = EnemyManager.getInstance();

            // Clear enemies
            enemyManager.ResetEnemies();
            enemyManager.DeactivateEnemies();
            
            // Clean up
            _currentLevelState = level;
            _currentLevel.AttemptToWipeAss();
            delete _currentLevel; // Don't know if javascripts shitty garbage collector actually does anything with this
            
            _currentLevel = new Level(Levels.properties[_currentLevelState])

            TempestGame.getInstance().HideScore();
            TempestGame.getInstance().ClearScore();
            return;
        }

        
        return{

            Initialize: function () {

                _currentCamera = new Camera(TempestGame.getInstance().GetCurrentScene());
                _currentLevelState = Levels.START;
                _currentLevel = new Level(Levels.properties[_currentLevelState]);
            }, 
        
            Update:  function (deltaTime) {
                if(_currentLevel != null)
                {
                    var input = InputManager.getInstance();
                    switch(_currentLevelState)
                    {
                        case Levels.START:
                            if(input.GetEnterInput())
                                LoadLevel(Levels.LEVEL_1)
                            break;
                        case Levels.GAMEOVER:
                            if(input.GetEnterInput())
                                LoadMenu(Levels.START)
                            break;
                        case Levels.CREDITS:
                            if(input.GetEnterInput())
                                LoadMenu(Levels.START)
                            break;
                        case Levels.LEVEL_1:
                            if(input.GetEscapeInput())
                                LoadMenu(Levels.START)
                            break;
                    }

                    if(input.GetSwapInput())
                        input.SwapSchemes();


                    //console.log(input.GetInput().mousePointer.movementX + " " + input.GetInput().mousePointer.movementY);
                    //console.log(input.GetInput().mousePointer.prevPosition.x + ""  + input.GetInput().mousePointer.prevPosition.y + " " + input.GetInput().mousePointer.position.x + "" + input.GetInput().mousePointer.position.y);
                    _currentLevel.Update(deltaTime);
                }
            },

            TriggerGameOver: function(){
                LoadMenu(Levels.GAMEOVER)
            },

            TriggerCredits: function(){
                LoadMenu(Levels.CREDITS)
            },

            GetCurrentLevel: function(){
                return _currentLevel;
            },

            GetCurrentCamera: function(){
                return _currentCamera;
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