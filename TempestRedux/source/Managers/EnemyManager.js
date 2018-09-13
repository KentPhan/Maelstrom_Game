var EnemyManager = (function (){

    var instance;

    function init() {
 
        // Singleton
     
        var _enemySpawnTimeLimit = 1.0;
        var _currentSpawnTimer = 5; 
        var _allEnemies = [];

        return {
     
            // Public methods and variables
            //   publicMethod: function () {
            //     console.log( "The public can see me!" );
            //   },

            Update: function(deltaTime){
                _currentSpawnTimer -= deltaTime;

                // Spawning more enemies timer Probs need to swap for something smarter and better later
                if(_currentSpawnTimer <=0)
                {
                    var index = TempestGame.getInstance().GetCurrentMap().GetRandomIndex();
                    var start = new Vector2(0,0);
                    var end = TempestGame.getInstance().GetCurrentMap().GetIndexVectorPosition(index);

                    var newEnemy = new StandardEnemy(index,start, end)
                    _allEnemies.push(newEnemy);
                    
                    _currentSpawnTimer = _enemySpawnTimeLimit;
                }

                // Update all enemies
                for(var i = 0; i < _allEnemies.length; i++)
                {
                    // Check for ones that must die
                    if(_allEnemies[i].MustIDie())
                    {
                        _allEnemies.splice(i,1)
                        i--;
                        continue;
                    }

                    _allEnemies[i].Update(deltaTime);
                }
            },

            Draw: function(graphics){

                // Draw all enemies
                for(var i = 0; i < _allEnemies.length; i++)
                {
                    _allEnemies[i].Draw(graphics);
                }
                
            },

            GetEnemiesInMapIndex(index)
            {
                var enemiesInMapIndex = [];
                for(var i = 0; i < _allEnemies.length; i++)
                {
                    if(_allEnemies[i].GetPIndex() == index)
                    {
                        enemiesInMapIndex.push(_allEnemies[i]);
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