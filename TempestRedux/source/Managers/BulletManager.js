var BulletManager = (function (){

    var instance;

    function init() {
 
        // Singleton
     
        // Private methods and variables
        // function privateMethod(){
        //     console.log( "I am private" );
        // }
     
        var _allBullets = [];
        var _bulletsToAdd = [];

        //var privateRandomNumber = Math.random();
     
        return {
     
          // Public methods and variables
        //   publicMethod: function () {
        //     console.log( "The public can see me!" );
        //   },

            Update: function(deltaTime){

                // Add to add bullets
                for(var i = 0; i < _bulletsToAdd.length; i++)
                {
                    _allBullets.push(_bulletsToAdd[i]);
                }
                _bulletsToAdd = [];

                // Update all bullets
                for(var i = 0; i < _allBullets.length; i++)
                {
                    _allBullets[i].Update(deltaTime);
                }
            },

            Draw: function(graphics){

                // Draw all bullets
                for(var i = 0; i < _allBullets.length; i++)
                {
                    _allBullets[i].Draw(graphics);
                }
                
            },

            FireBullet: function(pIndex){
                var start = TempestGame.getInstance().GetCurrentMap().GetIndexVectorPosition(pIndex)
                var end = new Vector2(0,0);
                var newBullet = new StandardBullet(pIndex,start, end)
                _bulletsToAdd.push(newBullet);
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
        getInstance: function () {
     
          if ( !instance ) {
            instance = init();
          }
     
          return instance;
        }
      };
})();