
var TempestGame = /** @class */ (function ()
{
    // Singleton
    var instance;
    // Score Fields
    
    
    function init(scene)
    {
        // Private methods and variables
        // function privateMethod(){
        //     console.log( "I am private" );
        // }
        
        //var privateRandomNumber = Math.random();
        // important game variables in phaser
        var _scene = scene;
        var _graphics = _scene.add.graphics({ });
        var _input = _scene.input.keyboard.createCursorKeys();

        // Current Managers
        var _enemyManager = new EnemyManager.getInstance()
        var _levelManager = new LevelManager.getInstance();
        // var _bulletManager = new BulletManager.getInstance();

        var _score = 0;
        var _scoreText;

        return{

            Create: function () {                
                _scoreText = _scene.add.text(-600, -325, "Score: " + _score,  { font: "Bold 32px Arial", fill: '#ffffff' });

                _enemyManager.InitializePools();
                _levelManager.Initialize();
                //var _playerDeathEffect = new PlayerDeathEffect();
            }, 
        
            Update:  function () {
                var deltaTime = game.loop.delta/1000;

                _enemyManager.Update(deltaTime);
                _levelManager.Update(deltaTime);
            },
        
            Draw: function () {
            },

            GetGraphics: function(){
                return _graphics;
            },

            GetCurrentScene: function(){
                return _scene;
            },

            GetInput: function(){
                return _input;
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
        getInstance: function(scene){
            if ( !instance ) {
                instance = init(scene);
              }
         
              return instance;
        }
    };
})();