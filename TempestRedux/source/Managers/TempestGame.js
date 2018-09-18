
var TempestGame = /** @class */ (function ()
{
    // Singleton
    var instance;
    
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

        // Current Managers
        var _enemyManager = new EnemyManager.getInstance();
        var _levelManager = new LevelManager.getInstance();
        var _inputManager = new InputManager.getInstance();
        // var _bulletManager = new BulletManager.getInstance();

        var _score = 0;
        var _scoreText;
        var _pointMilestone = 20;
        var _previousMilestrong = _score;

        return{

            Create: function () {                
                _scoreText = _scene.add.text(-600, -325, "Score: " + _score,  { font: "Bold 32px Arial", fill: '#ffffff' });
                _scoreText.visible = false;
                _enemyManager.InitializePools(); // could probably move this to level maybe
                _levelManager.Initialize();
                _inputManager.Initialize();
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

            AddToScore: function(){
                _score +=5;
                return _scoreText.text =  "Score: " + _score;
            },

            HideScore: function(){
                _scoreText.visible = false;
            },
            
            CheckScoreMileStone: function(){
                if(_score > (_previousMilestrong + _pointMilestone))
                {
                    _previousMilestrong = _score;
                    return true;
                }
                return false;
            },

            ShowScore: function(){
                _scoreText.visible = true;
            },

            GetScore: function()
            {
                return _score;
            },

            ClearScore:function()
            {
                _scoreText.text =  "Score: 0";
                _score = 0;
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