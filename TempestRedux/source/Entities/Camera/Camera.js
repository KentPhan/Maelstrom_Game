var Camera = /** @class */ (function (){
    var self = this;

    function Camera(scene)
    {
        self.Scene = scene;
        self.Camera = null;
    }

    Camera.prototype.Preload = function(){
        
    }

    Camera.prototype.Create = function(){
        self.Camera = self.Scene.cameras3d.addOrthographicCamera(800, 600).setPosition(0, 0, 200);
    }

    Camera.prototype.Update = function(){
    }

    return Camera;
}())
