var Background = /** @class */ (function (){
   
    function Background()
    {
        var scene = TempestGame.getInstance().GetCurrentScene();
        this.Sprite = TempestGame.getInstance().GetCurrentScene().add.image(0,0,'background');
        this.Sprite2 = TempestGame.getInstance().GetCurrentScene().add.image(0,0,'stars_01');
        this.BoxLeft = TempestGame.getInstance().GetCurrentScene().add.image(-(config.width/2)+150,0,'box_left');
        this.BoxLeft.scaleX =0.15;
        this.BoxLeft.scaleY =0.15;
        this.BoxRight = TempestGame.getInstance().GetCurrentScene().add.image((config.width/2) - 150,0,'box_right');
        this.BoxRight.scaleX =0.15;
        this.BoxRight.scaleY =0.15;
        this.Sprite.depth = -10;
        this.Sprite2.depth = -9;    
        // this.BoxLeft.depth = 0;
        // this.BoxRight.depth = 0;

        
    }
    
    return Background;
}())