var EnemyManager = (function (){

    var instance;

    function init() {
 
        // Singleton
        var _active = false;
        var _enemySpawnTimeLimit = 1.0;
        var _initialSpawnTimer = 3;
        var _currentSpawnTimer = _initialSpawnTimer; 
        

        // Need to pool because Javascripts garbage collector is a POS. But I mean... my code is probably a POS too.
        var _activeEnemies = [];
        var _standardPool = [];
        var _perPoolSize = 100;

        

        return {
     
            // Public methods and variables
            //   publicMethod: function () {
            //     console.log( "The public can see me!" );
            //   },

            InitializePools: function(){
                game.anims.create({
                    key:'pulsar_idle',
                    frames: game.anims.generateFrameNumbers('pulsar_idle', {start:0, end:46}),
                    frameRate:20,
                    repeat:-1
                });
                for(var i = 0; i < _perPoolSize; i++)
                {
                    _standardPool.push(new StandardEnemy())
                }
            },

            Update: function(deltaTime){
                _currentSpawnTimer -= deltaTime;
                // console.log(_activeEnemies.length);
                // Spawning more enemies timer Probs need to swap for something smarter and better later
                if(_currentSpawnTimer <=0 && _active)
                {
                    var currentMap = LevelManager.getInstance().GetCurrentLevel().GetMap();
                    var index = currentMap.GetRandomIndex();
                    var start = new Vector2(0,0);
                    var end = currentMap.GetEdgeVectorPosition(index);

                    var newEnemy = _standardPool.pop();
                    newEnemy.IMustLive(index,start,end)
                    _activeEnemies.push(newEnemy);
                    
                    _currentSpawnTimer = _enemySpawnTimeLimit;
                }

                // Update all enemies
                for(var i = 0; i < _activeEnemies.length; i++)
                {
                    // Check for ones that must die
                    if(!_activeEnemies[i].AreYouAlive())
                    {
                        var removed = _activeEnemies.splice(i,1);
                        _standardPool.push(removed.pop());
                        i--;
                        continue;
                    }

                    if(_active)
                        _activeEnemies[i].Update(deltaTime);
                }
            },

            Draw: function(graphics){
                if(!_active)
                    return;
                // Nothing so far
            },

            GetEnemiesInMapIndex(index)
            {
                var enemiesInMapIndex = [];
                for(var i = 0; i < _activeEnemies.length; i++)
                {
                    if(_activeEnemies[i].GetPIndex() == index)
                    {
                        enemiesInMapIndex.push(_activeEnemies[i]);
                    }
                }
                return enemiesInMapIndex;
            },

            ResetEnemies()
            {
                for(var i = 0; i < _activeEnemies.length; i++)
                {
                    _activeEnemies[i].IMustDie();
                }
            },

            DeactivateEnemies(){
                _active = false;
            },

            ActivateEnemies(spawnFrequency)
            {
                _enemySpawnTimeLimit = spawnFrequency;
                _currentSpawnTimer = _initialSpawnTimer;
                _active = true;
            }
            //   publicProperty: "I am also public",
            //   getRandomNumber: function() {
            //     return privateRandomNumber;
            //   }
        };
      };

      return {
 
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function () {
     
          if ( !instance ) {
            instance = init();
          }
     
          return instance;
        }
      };
})();