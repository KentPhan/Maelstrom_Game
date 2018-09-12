var StandardEnemy = /** @class */ (function (){
   
    // Should pool... But Fuck it... Maybe Later
    function StandardEnemy(pIndex, position, direction, mapRef)
    {
        this.PIndex = pIndex;
        this.Position = position;

        this.Map = mapRef;
        
        this.Speed =  100.0;
        this.ScaleSpeed = .1;
        this.Direction = direction;

        // THIS IS REALLL SHITTY I THINK
        this.Sprite = window.Scene.add.image(0,0,'alien');
        this.Sprite.scaleX = 0.2;
        this.Sprite.scaleY = 0.2;        
    }

    StandardEnemy.prototype.Update = function (deltaTime) {
        var velocity = new Vector2(this.Direction.x * this.Speed * deltaTime, this.Direction.y * this.Speed * deltaTime);
        this.Position.add(velocity);
        this.Sprite.setPosition(this.Position.x, this.Position.y, 0)
        this.Sprite.setScale(this.Sprite.scaleX + (this.ScaleSpeed * deltaTime), this.Sprite.scaleY + (this.ScaleSpeed * deltaTime));
        console.log(this.Position);
    };

    StandardEnemy.prototype.Draw = function (graphics) {
        //graphics.fillCircle(this.Position.x,this.Position.y, 10);
    };

    return StandardEnemy;
}())
