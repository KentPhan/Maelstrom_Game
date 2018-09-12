var StandardBullet = /** @class */ (function (){
   
    // Should pool... But Fuck it... Maybe Later
    function StandardBullet(pIndex, position, endPosition, mapRef)
    {
        this.PIndex = pIndex;
        this.Position = position;
        this.EndPosition = endPosition;

        this.Map = mapRef;
        
        this.Speed =  300.0;
        this.ScaleSpeed = .1;

        var direction = new Vector2(endPosition.x - position.x , endPosition.y - position.y)
        direction.normalize();

        this.Direction = direction;

        // THIS IS REALLL SHITTY I THINK
        this.Sprite = window.Scene.add.image(0,0,'bullet');
        this.Sprite.scaleX = 0.2;
        this.Sprite.scaleY = 0.2;        
    }

    StandardBullet.prototype.Update = function (deltaTime) {

        var velocity = new Vector2(this.Direction.x * this.Speed * deltaTime, this.Direction.y * this.Speed * deltaTime);
        this.Position.add(velocity);
        this.Sprite.setPosition(this.Position.x, this.Position.y, 0)
        // this.Sprite.setScale(this.Sprite.scaleX + (this.ScaleSpeed * deltaTime), this.Sprite.scaleY + (this.ScaleSpeed * deltaTime));

        var placement = new Vector2(this.EndPosition.x - this.Position.x, this.EndPosition.y - this.Position.y);

        // Slightly more complicated due to different distance. Will also need to rework enemy list if we destroy enemies
        // if((placement.dot(this.Direction) < 0.0))
        // {
        //     this.Sprite.destroy();
        //     //BulletManager.getInstance().QueueKillOldest();
        // }
    };

    StandardBullet.prototype.Draw = function (graphics) {
        //graphics.fillCircle(this.Position.x,this.Position.y, 10);
    };

    return StandardBullet;
}())
