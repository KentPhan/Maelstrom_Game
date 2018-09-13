
var TempestGame = /** @class */ (function ()
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
        var _camera = null;
        var _scene = scene;

        var _graphics = _scene.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa }});
        var _input = _scene.input.keyboard.createCursorKeys();

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
        var _currentMap = new Map(this, points);

        // Current Managers
        var _enemyManager = new EnemyManager.getInstance()
        var _bulletManager = new BulletManager.getInstance();

        var _score = 0;
        var _scoreText;

        return{

            Create: function () {
                _camera = new Camera(_scene);
                _scoreText = _scene.add.text(-480, -480, "Score: " + _score,  { font: "Bold 32px Arial", fill: '#ffffff' });

                
                var _playerDeathEffect = new PlayerDeathEffect();
            },
        
            Update:  function () {
                var deltaTime = game.loop.delta/1000;
        
                _currentMap.Update(deltaTime, _input);
        
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
            },

            AddToScore: function(){
                return _scoreText.text =  "Score: " + ++_score;
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