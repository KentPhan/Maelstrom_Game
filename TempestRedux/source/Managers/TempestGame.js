
var TempestGame = /** @class */ (function ()
{
    // Singleton
    var instance;
    
    function init(game, scene)
    {
        // Private methods and variables
        // function privateMethod(){
        //     console.log( "I am private" );
        // }

        
        //var privateRandomNumber = Math.random();
        var _camera = null;
        var _scene = scene;

        var _graphics = _scene.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa }});;
        var _input = _scene.input.keyboard.createCursorKeys();

        // Map TEMP till we get something better.
        var points = [
            new Vector2(-150,-100),
            new Vector2(0,-110),
            new Vector2(50,-100),
            new Vector2(100,0),
            new Vector2(100,100),
            new Vector2(0,100),
            new Vector2(-100,100),
            new Vector2(-100,0),
        ]
        var _currentMap = new Map(points);

        // Current Managers
        var _enemyManager = new EnemyManager.getInstance()
        var _bulletManager = new BulletManager.getInstance();

        return{

            Create: function () {
                _camera = new Camera(_scene);
            },
        
            Update:  function () {
                var deltaTime = game.loop.delta/1000;
        
                _currentMap.Update(_input);
        
                _enemyManager.Update(deltaTime);
                _bulletManager.Update(deltaTime);
            },
        
            Draw: function () {
                _graphics.clear();
                _currentMap.Draw(_graphics);
        
                _enemyManager.Draw(_graphics);
                _bulletManager.Draw(_graphics);
            },

            GetCurrentMap : function(){
                return _currentMap;
            },

            GetGraphics: function(){
                return _graphics;
            },

            GetCurrentScene: function(){
                return _scene;
            }

            //publicProperty: "I am also public",
            //   getRandomNumber: function() {
            //     return privateRandomNumber;
            //   }
            
        }
    };
    return{
        getInstance: function(game, scene){
            if ( !instance ) {
                instance = init(game, scene);
              }
         
              return instance;
        }
    };
})();