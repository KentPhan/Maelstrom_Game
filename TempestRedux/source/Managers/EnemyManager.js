var EnemyManager = (function (){

    var instance;

    function init(map) {
 
        // Singleton
     
        // Private methods and variables
        // function privateMethod(){
        //     console.log( "I am private" );
        // }
     
        var _map = map; // TODO Convert this variable to singleton grabber from game manager
        var _enemySpawnTimeLimit = 5;
        var _currentSpawnTimer = 5;
        var _allEnemies = [];
        var _howManyMustDie = 0; // A cheat to kill enemies

        //var privateRandomNumber = Math.random();
     
        return {
     
          // Public methods and variables
        //   publicMethod: function () {
        //     console.log( "The public can see me!" );
        //   },

            Update: function(deltaTime){
                _currentSpawnTimer -= deltaTime;
                if(_currentSpawnTimer <=0)
                {
                    var index = _map.GetRandomIndex();
                    var start = new Vector2(0,0);
                    var end = _map.GetIndexVectorPosition(index);
                    var enemyIndex = _allEnemies.length;

                    var newEnemy = new StandardEnemy(index,start, end , _map)
                    _allEnemies.push(newEnemy);
                    
                    _currentSpawnTimer = _enemySpawnTimeLimit;
                }

                //Kill however many must die 
                while(_howManyMustDie > 0)
                {
                    _howManyMustDie--;
                    _allEnemies.shift();// Maybe inefficent?
                }

                // Update all enemies
                for(var i = 0; i < _allEnemies.length; i++)
                {
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

            QueueKillOldestEnemy: function()
            {
                _howManyMustDie++;
            }
     
          //publicProperty: "I am also public",
     
        //   getRandomNumber: function() {
        //     return privateRandomNumber;
        //   }
        };
      };

      return {
 
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function (map) {
     
          if ( !instance ) {
            instance = init(map);
          }
     
          return instance;
        }
      };
})();