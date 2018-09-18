var StandardEnemy = /** @class */ (function (){
   


    // TODO rename to Flipper
    function StandardEnemy()
    {
        this.Active = false;
        this.EnemyStates = {
            "TowardsEdge":1,
            "OnEdge":2
        }

        this.Rotation = {
            "Positive":1,
            "Negative":2
        }
        this.IWillGoThisWay = this.Rotation[Math.floor(Math.random() * 2)];
        this.CurrentState = this.EnemyStates.TowardsEdge;


        this.PIndex = -1;
        this.Position = null;
        this.EndPosition = null;

        this.Speed =  50.0;
        this.EdgeSpeedTimer = 1.5;
        this.CurrentEdgeSpeedTimer = this.EdgeSpeedTimer;
        this.ScaleSpeed = .25;

        this.Direction = null;

        // THIS IS REALLL SHITTY I THINK
        this.Sprite = TempestGame.getInstance().GetCurrentScene().add.image(0,0,'alien');
        this.Sprite.visible = false;
        this.Sprite.scaleX = 0.01;
        this.Sprite.scaleY = 0.01

        this.AngrySprite = TempestGame.getInstance().GetCurrentScene().add.image(0,0, 'alien_angry')
        this.AngrySprite.visible = false;
        this.AngrySprite.scaleX = 1;
        this.AngrySprite.scaleY = 1;


        this.DangerTint = 0xf00f00 ;
    }

    StandardEnemy.prototype.Update = function (deltaTime) {

        if(this.CurrentState == this.EnemyStates.TowardsEdge)
        {
            var velocity = new Vector2(this.Direction.x * this.Speed * deltaTime, this.Direction.y * this.Speed * deltaTime);
            this.Position.add(velocity);
            this.Sprite.setPosition(this.Position.x, this.Position.y, 0)
            this.Sprite.setScale(this.Sprite.scaleX + (this.ScaleSpeed * deltaTime), this.Sprite.scaleY + (this.ScaleSpeed * deltaTime));
    
            var placement = new Vector2(this.EndPosition.x - this.Position.x, this.EndPosition.y - this.Position.y);
    
            // If past destination, destroy this enemy
            // TODO Add cost of having enemy get past player here
            if((placement.dot(this.Direction) < 0.0))
            {
                this.CurrentState = this.EnemyStates.OnEdge;
                this.Sprite.visible = false;
                this.AngrySprite.visible = true;
                this.AngrySprite.setPosition(this.Position.x, this.Position.y, 0)
            }
        }
        else if (this.CurrentState == this.EnemyStates.OnEdge)
        {
            playerIndex = LevelManager.getInstance().GetCurrentLevel().GetPlayer().GetPIndex();
            if(playerIndex == this.PIndex)
                LevelManager.getInstance().TriggerGameOver();


            // this.IMustDie();

            // Pick a random direction to rotate
            this.CurrentEdgeSpeedTimer -= deltaTime;
            if(this.CurrentEdgeSpeedTimer <= 0)
            {
                var currentMap = LevelManager.getInstance().GetCurrentLevel().GetMap();

                if(this.IWillGoThisWay == this.Rotation.Negative)
                {
                    var newIndex  = currentMap.GetNextIndexNegative(this.PIndex);
                    if(this.PIndex == newIndex)
                        this.IWillGoThisWay = this.Rotation.Positive;
                    this.PIndex = newIndex;
                }
                else
                {
                    var newIndex = currentMap.GetNextIndexPositive(this.PIndex);
                    if(this.PIndex == newIndex)
                        this.IWillGoThisWay = this.Rotation.Negative
                        ;
                    this.PIndex = newIndex;
                }

                this.Position =  currentMap.GetEdgeVectorPosition(this.PIndex)
                this.AngrySprite.setPosition(this.Position.x, this.Position.y, 0)
                this.CurrentEdgeSpeedTimer = this.EdgeSpeedTimer;
            }
            
            
        }
    };

    StandardEnemy.prototype.GetPIndex = function () {
        return this.PIndex;
    };

    StandardEnemy.prototype.GetPosition = function () {
        return this.Position;
    };

    StandardEnemy.prototype.IMustLive = function(pIndex, position, endPosition){
        this.Active = true;

        this.Sprite.visible = true;
        this.Sprite.scaleX = 0.15;
        this.Sprite.scaleY = 0.15;        
        this.AngrySprite.visible = false;
        this.AngrySprite.scaleX = 1;
        this.AngrySprite.scaleY = 1;   

        this.CurrentState = this.EnemyStates.TowardsEdge;
        
        this.PIndex = pIndex;
        this.Position = position;
        this.EndPosition = endPosition;

        var direction = new Vector2(endPosition.x - position.x , endPosition.y - position.y)
        direction.normalize();
        this.Direction = direction;
    }

    StandardEnemy.prototype.IMustDie = function(){
        this.Active = false;
        this.Sprite.visible = false;
        this.AngrySprite.visible = false;

        this.PIndex = -1;
        this.Position = null;
        this.EndPosition = null;

        this.Direction = null;
    }

    StandardEnemy.prototype.AreYouAlive = function(){
        return this.Active;
    }

    return StandardEnemy;
}())
