var Camera = /** @class */ (function (){
    var self = this;
    //var instance;

    function Camera(scene)
    {
        // Generate an empty sprite in the middle of the world. Have camera follow it to center camera
        // ... I know... its fucking stupid...
        var origin = scene.add.image(0,0);
        scene.cameras.main.startFollow(origin, true);
    }

    return Camera;

    /*
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
      */
}())
