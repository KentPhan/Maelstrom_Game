var StandardBullet = /** @class */ (function (){
   
    // Should pool... But Fuck it... Maybe Later
    function StandardBullet(pIndex, position, endPosition)
    {
        this.MustDie = false;
        this.PIndex = pIndex;
        this.Position = position;
        this.EndPosition = endPosition;
        
        this.Speed =  300.0;
        this.ScaleSpeed = .07;

        var direction = new Vector2(endPosition.x - position.x , endPosition.y - position.y)
        direction.normalize();

        this.Direction = direction;

        // THIS IS REALLL SHITTY I THINK
        this.Sprite = TempestGame.getInstance().GetCurrentScene().add.image(0,0,'bullet');
        this.Sprite.scaleX = 0.1;
        this.Sprite.scaleY = 0.1;        
    }

    StandardBullet.prototype.Update = function (deltaTime) {
 
        var velocity = new Vector2(this.Direction.x * this.Speed * deltaTime, this.Direction.y * this.Speed * deltaTime);
        this.Position.add(velocity);
        this.Sprite.setPosition(this.Position.x, this.Position.y, 0)
        this.Sprite.setScale(this.Sprite.scaleX - (this.ScaleSpeed * deltaTime), this.Sprite.scaleY - (this.ScaleSpeed * deltaTime));

        var toEndPosition = new Vector2(this.EndPosition.x - this.Position.x, this.EndPosition.y - this.Position.y);

        // Check if past center, if so. mark bullet for deletion
        if((toEndPosition.dot(this.Direction) < 0.0))
        {
            this.IMustDie();
            return;
        }


        // Check if passing an enemy
        var enemies = EnemyManager.getInstance().GetEnemiesInMapIndex(this.PIndex);
        for(var i = 0; i < enemies.length; i++)
        {
            var enemy = enemies[i];
            var enemyPosition = enemy.GetPosition();
            var toEnemy = new Vector2(enemyPosition.x - this.Position.x, enemyPosition.y - this.Position.y);

            // Check if intersecting or passing an enemy
            // TODO Do score here
            if((toEnemy.dot(this.Direction) < 0.0))
            {
                TempestGame.getInstance().AddToScore()
                enemy.IMustDie();
                this.IMustDie();
                return;
            }            
        }
    };

    StandardBullet.prototype.Draw = function (graphics) {
        //graphics.fillCircle(this.Position.x,this.Position.y, 10);
    };

    StandardBullet.prototype.GetPIndex = function () {
        return this.PIndex;
    };

    StandardBullet.prototype.IMustDie = function(){
        this.Sprite.destroy();
        this.MustDie = true;
        return this.MustDie;
    }

    StandardBullet.prototype.MustIDie = function(){
        return this.MustDie;
    }

    return StandardBullet;
}())
