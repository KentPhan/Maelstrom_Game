var EnemyManager = (function (){

    var instance;

    function init(map) {
 
        // Singleton
     
        // Private methods and variables
        // function privateMethod(){
        //     console.log( "I am private" );
        // }
     
        var _map = map;
        var _enemySpawnTimeLimit = 5;
        var _currentSpawnTimer = 5;
        var allEnemies = [];
     
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
                    var direction = new Vector2(end.x - start.x , end.y - start.y)
                    direction.normalize();
                    var newEnemy = new StandardEnemy(index,start, direction , _map)
                    allEnemies.push(newEnemy);
                    
                    _currentSpawnTimer = _enemySpawnTimeLimit;
                }

                // Update all enemies
                for(var i = 0; i < allEnemies.length; i++)
                {
                    allEnemies[i].Update(deltaTime);
                }
            },

            Draw: function(graphics){

                // Draw all enemies
                for(var i = 0; i < allEnemies.length; i++)
                {
                    allEnemies[i].Draw(graphics);
                }
                
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