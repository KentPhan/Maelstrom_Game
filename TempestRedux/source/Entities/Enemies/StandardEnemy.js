var StandardEnemy = /** @class */ (function (){
   


    // TODO rename to Flipper
    function StandardEnemy()
    {
        this.Active = false;
        this.EnemyStates = {
            "TowardsEdge":1,
            "OnEdge":2,
            "MovingOnEdge":3
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

        // When moving towards edge
        this.Speed =  60.0;
        this.ScaleSpeed = .25;

        // When on edge
        this.EdgeSpeedTimer = 1.5;
        this.CurrentEdgeSpeedTimer = this.EdgeSpeedTimer;
        this.EdgeMoveSpeed = 250;
        this.EdgeMoveDestination = null;
        this.EdgeMoveIndexDestination = null;
        this.EdgeMoveDirection = null;
        

        this.Direction = null;

        // THIS IS REALLL SHITTY I THINK
        this.Sprite = TempestGame.getInstance().GetCurrentScene().add.sprite(0,0,'pulsar');
        this.Sprite.visible = false;
        this.Sprite.scaleX = 0.001;
        this.Sprite.scaleY = 0.001;
        

        this.AngrySprite = TempestGame.getInstance().GetCurrentScene().add.sprite(0,0, 'pulsar_angry')
        this.AngrySprite.visible = false;
        this.AngrySprite.scaleX = 1;
        this.AngrySprite.scaleY = 1;

        

        this.DeathParticle = new PlayerDeathEffect();

        //audio
        this.DeathSound = TempestGame.getInstance().GetCurrentScene().sound.add('explosion_sfx');

        this.DangerTint = 0xf00f00;
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
                this.Sprite.anims.stop();
                this.AngrySprite.anims.play('pulsar_idle',true)
                this.AngrySprite.setPosition(this.Position.x, this.Position.y, 0)
            }
        }
        else if (this.CurrentState == this.EnemyStates.OnEdge)
        {
            
            var player = LevelManager.getInstance().GetCurrentLevel().GetPlayer();
            var playerIndex = player.GetPIndex();

            if(playerIndex == this.PIndex && !player.IsImmortal())
            {
                player.Die();
            }

            // Pick a random direction to rotate
            this.CurrentEdgeSpeedTimer -= deltaTime;
            if(this.CurrentEdgeSpeedTimer <= 0)
            {
                var currentMap = LevelManager.getInstance().GetCurrentLevel().GetMap();

                if(this.IWillGoThisWay == this.Rotation.Negative)
                {
                    this.EdgeMoveIndexDestination = currentMap.GetNextIndexNegative(this.PIndex);
                    if(this.PIndex == this.EdgeMoveIndexDestination)
                        this.IWillGoThisWay = this.Rotation.Positive;
                }
                else
                {
                    this.EdgeMoveIndexDestination = currentMap.GetNextIndexPositive(this.PIndex);
                    if(this.PIndex == this.EdgeMoveIndexDestination)
                        this.IWillGoThisWay = this.Rotation.Negative;
                }

                if(this.PIndex != this.EdgeMoveIndexDestination)
                {
                    this.EdgeMoveDestination = currentMap.GetEdgeVectorPosition(this.EdgeMoveIndexDestination);
                    this.EdgeMoveDirection = new Vector2(this.EdgeMoveDestination.x - this.Position.x, this.EdgeMoveDestination.y - this.Position.y);
                    this.EdgeMoveDirection.normalize();
                    this.CurrentState = this.EnemyStates.MovingOnEdge;
                }
                this.CurrentEdgeSpeedTimer = this.EdgeSpeedTimer;
            }
        }
        else if (this.CurrentState == this.EnemyStates.MovingOnEdge){
            
            
            // Move on edge
            var velocity = new Vector2(this.EdgeMoveDirection.x * deltaTime * this.EdgeMoveSpeed, this.EdgeMoveDirection.y * deltaTime * this.EdgeMoveSpeed);
            this.Position.add(velocity);

            //if position is past destination
            var DistanceToEdgeDestination = new Vector2(this.EdgeMoveDestination.x - this.Position.x, this.EdgeMoveDestination.y - this.Position.y);
            if(DistanceToEdgeDestination.dot(this.EdgeMoveDirection) <= 0)
            {
                this.Position = this.EdgeMoveDestination;
                this.PIndex = this.EdgeMoveIndexDestination;
                this.CurrentState = this.EnemyStates.OnEdge;
            }
            
            this.AngrySprite.setPosition(this.Position.x, this.Position.y, 0)
        }
    };

    StandardEnemy.prototype.GetPIndex = function () {
        return this.PIndex;
    };

    StandardEnemy.prototype.GetPosition = function () {
        return this.Position;
    };

    StandardEnemy.prototype.IMustLive = function(pIndex, position, endPosition)
    {
        this.Active = true;

        this.Sprite.visible = true;
        this.Sprite.scaleX = 0.15;
        this.Sprite.scaleY = 0.15;
        this.Sprite.anims.play('pulsar_idleC', true);
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

    StandardEnemy.prototype.IMustDie = function()
    {
        if(!this.Active)
        {
            return;
        }

        this.DeathParticle.GetEmitter().setPosition(this.Position.x, this.Position.y);
        //this.DeathParticle.GetEmitter().tint = this.DangerTint;
        this.DeathParticle.GetEmitter().explode();
        TempestGame.getInstance().GetCurrentScene().cameras.main.shake(350, 0.01);
        this.DeathSound.play();
        
        this.Active = false;
        this.Sprite.visible = false;
        this.AngrySprite.visible = false;
        this.AngrySprite.anims.stop();

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
