var Background = /** @class */ (function (){
   
    function Background()
    {
        var scene = TempestGame.getInstance().GetCurrentScene();
        this.Sprite = TempestGame.getInstance().GetCurrentScene().add.image(0,0,'background');
        this.Sprite2 = TempestGame.getInstance().GetCurrentScene().add.image(0,0,'stars_01');
        this.Sprite.depth = -10;
        this.Sprite2.depth = -9;
    }
    
    return Background;
}())