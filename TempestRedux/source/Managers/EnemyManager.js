var EnemyManager = (function (){

    var instance;

    function init() {
 
        // Singleton
     
        var _enemySpawnTimeLimit = 1.0;
        var _currentSpawnTimer = 5; 

        // Need to pool because Javascripts garbage collector is a POS. But I mean... my code is probably a POS too.
        var _activeEnemies = [];
        var _standardPool = [];
        var _perPoolSize = 10;

        return {
     
            // Public methods and variables
            //   publicMethod: function () {
            //     console.log( "The public can see me!" );
            //   },

            InitializePools: function(){
                for(var i = 0; i < _perPoolSize; i++)
                {
                    _standardPool.push(new StandardEnemy())
                }
                
            },

            Update: function(deltaTime){
                _currentSpawnTimer -= deltaTime;

                // Spawning more enemies timer Probs need to swap for something smarter and better later
                if(_currentSpawnTimer <=0)
                {
                    var index = TempestGame.getInstance().GetCurrentMap().GetRandomIndex();
                    var start = new Vector2(0,0);
                    var end = TempestGame.getInstance().GetCurrentMap().GetIndexVectorPosition(index);

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

                    _activeEnemies[i].Update(deltaTime);
                }
            },

            Draw: function(graphics){

                // Draw all enemies
                for(var i = 0; i < _activeEnemies.length; i++)
                {
                    _activeEnemies[i].Draw(graphics);
                }
                
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