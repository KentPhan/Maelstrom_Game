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
            LEVEL_2:5,
            LEVEL_3:6,
            LEVEL_4:7,
            LEVEL_5:8,
            LEVEL_6:9,
            LEVEL_7:10,
            properties:{
                1: {IS_UI:true, TEXT:function(){return "        Maelstorm\n\n\n\n\n\nPress Enter to Start"}, X:-200, Y:-300},
                2: {IS_UI:true, TEXT:function(){return "           Game Over\n        Final Score: " + TempestGame.getInstance().GetScore() + "\n\n\n\n\n\nPress Enter to Continue"}, X:-240, Y:-200},
                3: {IS_UI:true, TEXT:function(){return "             You Win!\n         Final Score: "+ TempestGame.getInstance().GetScore()+"\n\n\n\n\n\nPress Enter to Continue"}, X:-240, Y:-200},
                4: {IS_UI:false,SPAWN_RATE:0.7,
                    MAP_POINTS:[
                        new Vector2(0,-100),
                        new Vector2(-50,-87.5),
                        new Vector2(-100,-75),
                        new Vector2(-87.5,-37.5),
                        new Vector2(-75,0),
                        new Vector2(-87.5,37.5),
                        new Vector2(-100,75),
                        new Vector2(-50,87.5),
                        new Vector2(0,100),
                        new Vector2(50,87.5),
                        new Vector2(100,75),
                        new Vector2(87.5,37.5),
                        new Vector2(75,0),
                        new Vector2(87.5,-37.5),
                        new Vector2(100,-75),
                        new Vector2(50,-87.5),
                    ]
                },
                5: {IS_UI:false, SPAWN_RATE:0.8,
                    MAP_POINTS:[
                        new Vector2(-100,-100),
                        new Vector2(-90,-75),
                        new Vector2(-80,-50),
                        new Vector2(-70,-25),
                        new Vector2(-60,0),
                        new Vector2(-50,25),
                        new Vector2(-40,50),
                        new Vector2(-30,75),
                        new Vector2(-20,100),
                        SpecialPoints.BoundStart,
                        SpecialPoints.BoundEnd,
                        new Vector2(100,-100),
                        new Vector2(90,-75),
                        new Vector2(80,-50),
                        new Vector2(70,-25),
                        new Vector2(60,0),
                        new Vector2(50,25),
                        new Vector2(40,50),
                        new Vector2(30,75),
                        new Vector2(20,100),
                        SpecialPoints.BoundStart,
                        SpecialPoints.BoundEnd
                        
                    ]
                },
                
                6: {IS_UI:false,SPAWN_RATE:0.7,
                    MAP_POINTS:[
                        new Vector2(0,-100),
                        new Vector2(-15,-65),
                        new Vector2(-25,-35),
                        new Vector2(-62.5,-35),
                        new Vector2(-100,-35),
                        new Vector2(-70.67,-12.375),
                        new Vector2(-41.34,10.25),
                        new Vector2(-58.17,55.125),
                        new Vector2(-75,100),
                        new Vector2(-37.4,71.07),
                        new Vector2(0,42.14),
                        new Vector2(37.4,71.07),
                        new Vector2(75,100),
                        new Vector2(58.17,55.125),
                        new Vector2(41.34,10.25),
                        new Vector2(70.67,-12.375),
                        new Vector2(100,-35),
                        new Vector2(62.5,-35),
                        new Vector2(25,-35),
                        new Vector2(15,-65),
                    ]
                },
                7: {IS_UI:false,SPAWN_RATE:0.6,
                    MAP_POINTS:[
                        new Vector2(0,-75),
                        new Vector2(-50,-100),
                        new Vector2(-65,-50),
                        new Vector2(-100,-25),
                        new Vector2(-80,0),
                        new Vector2(-100,25),
                        new Vector2(-60,45),
                        new Vector2(-45,90),
                        new Vector2(0,80),
                        new Vector2(45,90),
                        new Vector2(60,45),
                        new Vector2(100,25),
                        new Vector2(80,0),
                        new Vector2(100,-25),
                        new Vector2(65,-50),
                        new Vector2(50,-100),
                    ]
                },
                8: {IS_UI:false,SPAWN_RATE:0.4,
                    MAP_POINTS:[
                        new Vector2(-15,-75),
                        new Vector2(-50,-100),
                        new Vector2(-85,-60),
                        new Vector2(-100,-15),
                        new Vector2(-100,20),
                        new Vector2(-85,60),
                        new Vector2(-50,100),
                        new Vector2(-10,50),
                        new Vector2(10,50),
                        new Vector2(50,100),
                        new Vector2(85,60),
                        new Vector2(100,20),
                        new Vector2(100,-15),
                        new Vector2(85,-60),
                        new Vector2(50,-100),
                        new Vector2(15,-75),
                    ]
                },
                9: {IS_UI:false,SPAWN_RATE:0.2,
                    MAP_POINTS:[
                        new Vector2(-25,-100),
                        new Vector2(-25,-65),
                        new Vector2(-50,-65),
                        new Vector2(-50,-30),
                        new Vector2(-75,-30),
                        new Vector2(-75,-10),
                        new Vector2(-100,-10),
                        new Vector2(-100,10),
                        new Vector2(-75,10),
                        new Vector2(-75,30),
                        new Vector2(-50,30),
                        new Vector2(-50,65),
                        new Vector2(-25,65),
                        new Vector2(-25,100),
                        new Vector2(25,100),
                        new Vector2(25,65),
                        new Vector2(50,65),
                        new Vector2(50,30),
                        new Vector2(75,30),
                        new Vector2(75,10),
                        new Vector2(100,10),
                        new Vector2(100,-10),
                        new Vector2(75,-10),
                        new Vector2(75,-30),
                        new Vector2(50,-30),
                        new Vector2(50,-65),
                        new Vector2(25,-65),
                        new Vector2(25,-100)]            
                },
                10: {IS_UI:false,SPAWN_RATE:0.2,
                    MAP_POINTS:[
                        new Vector2(-20,-100),
                        new Vector2(-20,-80),
                        new Vector2(-40,-80),
                        new Vector2(-40,-60),
                        new Vector2(-60,-60),
                        new Vector2(-60,-40),
                        new Vector2(-80,-40),
                        new Vector2(-80,-20),
                        new Vector2(-100,-20),
                        new Vector2(-100,20),
                        new Vector2(-80,20),
                        new Vector2(-80,40),
                        new Vector2(-60,40),
                        new Vector2(-60,60),
                        new Vector2(-40,60),
                        new Vector2(-40,80),
                        new Vector2(-20,80),
                        new Vector2(-20,100),
                        new Vector2(20,100),
                        new Vector2(20,80),
                        new Vector2(40,80),
                        new Vector2(40,60),
                        new Vector2(60,60),
                        new Vector2(60,40),
                        new Vector2(80,40),
                        new Vector2(80,20),
                        new Vector2(100,20),
                        new Vector2(100,-20),
                        new Vector2(80,-20),
                        new Vector2(80,-40),
                        new Vector2(60,-40),
                        new Vector2(60,-60),
                        new Vector2(40,-60),
                        new Vector2(40,-80),
                        new Vector2(20,-80),
                        new Vector2(20,-100)
                    ]   
                }

                 // MAP_POINTS:[
                  
                    //      
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
            _currentLevel.BeginUnloadLevel(function(){

                var player = null;
                if(!_currentLevel.GetIsUI())
                    player = _currentLevel.GetPlayer();

                _currentLevelState = level;
                _currentLevel.AttemptToWipeAss();
                delete _currentLevel;

                // Instantiate new level
                _currentLevel = new Level(Levels.properties[_currentLevelState], player)

                _currentLevel.BeginLoadLevel(function(){
                    TempestGame.getInstance().ShowScore();
                    EnemyManager.getInstance().ActivateEnemies(Levels.properties[_currentLevelState].SPAWN_RATE);
                })
            })
            return;
        }

        function LoadMenuSkipTransition(level){
            var enemyManager = EnemyManager.getInstance();

            // Clear enemies
            enemyManager.ResetEnemies();
            enemyManager.DeactivateEnemies();
            
            // Clean up
            var player = null;
            if(!_currentLevel.GetIsUI())
                player = _currentLevel.GetPlayer();
            
            if(player != null)
                player.AttemptToWipeAss();
            delete player;
            _currentLevelState = level;
            _currentLevel.AttemptToWipeAss();
            delete _currentLevel;

            // Instantiate new level
            _currentLevel = new Level(Levels.properties[_currentLevelState])
            _currentLevel.BeginLoadLevel(function(){
                TempestGame.getInstance().HideScore();
                TempestGame.getInstance().ClearScore();
            })
            return;
        }

        function LoadMenu(level){
            var enemyManager = EnemyManager.getInstance();

            // Clear enemies
            enemyManager.ResetEnemies();
            enemyManager.DeactivateEnemies();
            
            // Clean up
            _currentLevel.BeginUnloadLevel(function(){

                var player = null;
                if(!_currentLevel.GetIsUI())
                    player = _currentLevel.GetPlayer();
                
                if(player != null)
                    player.AttemptToWipeAss();
                delete player;
                _currentLevelState = level;
                _currentLevel.AttemptToWipeAss();
                delete _currentLevel;

                // Instantiate new level
                _currentLevel = new Level(Levels.properties[_currentLevelState])
                _currentLevel.BeginLoadLevel(function(){
                    TempestGame.getInstance().HideScore();
                    TempestGame.getInstance().ClearScore();
                })
            })
            return;
        }

        
        return{

            Initialize: function () {

                _currentCamera = Camera.getInstance();
                _currentCamera.Initialize();
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
                        default:
                            if(input.GetEscapeInput())
                                //LoadMenu(Levels.START)
                                this.TriggerNextLevel();
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
                LoadMenuSkipTransition(Levels.GAMEOVER)
            },

            TriggerNextLevel: function(){
                switch(_currentLevelState)
                {
                    case Levels.START:
                        LoadLevel(Levels.LEVEL_1)
                        break;
                    case Levels.GAMEOVER:
                        LoadMenu(Levels.START)
                        break;
                    case Levels.CREDITS:
                        LoadMenu(Levels.START)
                        break;
                    case Levels.LEVEL_1:
                        LoadLevel(Levels.LEVEL_2)
                        break;
                    case Levels.LEVEL_2:
                        LoadLevel(Levels.LEVEL_3)
                        break;
                    case Levels.LEVEL_3:
                        LoadLevel(Levels.LEVEL_4)
                        break;
                    case Levels.LEVEL_4:
                        LoadLevel(Levels.LEVEL_5)
                        break;
                    case Levels.LEVEL_5:
                        LoadLevel(Levels.LEVEL_6)
                        break;
                    case Levels.LEVEL_6:
                        LoadLevel(Levels.LEVEL_7)
                        break;
                    case Levels.LEVEL_7:
                        this.TriggerCredits();
                        break;
                }
            },

            TriggerCredits: function(){
                LoadMenuSkipTransition(Levels.CREDITS)
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