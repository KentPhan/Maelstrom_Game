var StandardEnemy = /** @class */ (function (){
   
    // Should pool... But Fuck it... Maybe Later
    function StandardEnemy(pIndex, position, endPosition)
    {
        this.MustDie = false;
        this.PIndex = pIndex;
        this.Position = position;
        this.EndPosition = endPosition;

        this.Speed =  50.0;
        this.ScaleSpeed = .05;

        var direction = new Vector2(endPosition.x - position.x , endPosition.y - position.y)
        direction.normalize();

        this.Direction = direction;

        // THIS IS REALLL SHITTY I THINK
        this.Sprite = TempestGame.getInstance().GetCurrentScene().add.image(0,0,'alien');
        this.Sprite.scaleX = 0.05;
        this.Sprite.scaleY = 0.05;        
    }

    StandardEnemy.prototype.Update = function (deltaTime) {

        var velocity = new Vector2(this.Direction.x * this.Speed * deltaTime, this.Direction.y * this.Speed * deltaTime);
        this.Position.add(velocity);
        this.Sprite.setPosition(this.Position.x, this.Position.y, 0)
        this.Sprite.setScale(this.Sprite.scaleX + (this.ScaleSpeed * deltaTime), this.Sprite.scaleY + (this.ScaleSpeed * deltaTime));

        var placement = new Vector2(this.EndPosition.x - this.Position.x, this.EndPosition.y - this.Position.y);

        // If past destination, destroy this enemy
        // TODO Add cost of having enemy get past player here
        if((placement.dot(this.Direction) < 0.0))
        {
            this.IMustDie();
        }
    };

    StandardEnemy.prototype.Draw = function (graphics) {
        //graphics.fillCircle(this.Position.x,this.Position.y, 10);
    };

    StandardEnemy.prototype.GetPIndex = function () {
        return this.PIndex;
    };

    StandardEnemy.prototype.GetPosition = function () {
        return this.Position;
    };

    StandardEnemy.prototype.IMustDie = function(){
        this.Sprite.destroy();
        this.MustDie = true;
        return this.MustDie;
    }

    StandardEnemy.prototype.MustIDie = function(){
        return this.MustDie;
    }

    return StandardEnemy;
}())
