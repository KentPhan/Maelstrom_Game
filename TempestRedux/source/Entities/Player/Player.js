var Player = /** @class */ (function (){
   
    function Player(pIndex, position)
    {
        this.PIndex = pIndex;
        this.Position = position;
        this.PrevKey = 0;

        this.FlipCooldown = 0.1;
        this.FlipCurrentCooldown = 0;

        this.MoveCooldown = 0.08;
        this.MoveCurrentCooldown = 0;

        // this.BulletCooldown = 0.1;
        // this.BulletCurrentCooldown = 0;
        this.Sprite = TempestGame.getInstance().GetCurrentScene().add.image(0,0,'player');
        this.Sprite.scaleX = 1;
        this.Sprite.scaleY = 1;
    }

    Player.prototype.Update = function (deltaTime) {
        var input = InputManager.getInstance();
        var currentMap = LevelManager.getInstance().GetCurrentLevel().GetMap();

        var angle = Math.atan2(0 - this.Position.x, 0 + this.Position.y);
        this.Sprite.rotation = angle;

        // Return... Cause you need a map
        if(currentMap == null)
            return;

        if(this.MoveCurrentCooldown <= 0 && input.GetNegativeInput(this.Position))
        {
            
            this.PIndex = currentMap.GetNextIndexNegative(this.PIndex);
            this.Position =  currentMap.GetEdgeVectorPosition(this.PIndex)
            currentMap.DrawMap();

            this.MoveCurrentCooldown = this.MoveCooldown;
        }
        else if(this.MoveCurrentCooldown <= 0 && input.GetPositiveInput(this.Position))
        {
            

            this.PIndex = currentMap.GetNextIndexPositive(this.PIndex);
            this.Position = currentMap.GetEdgeVectorPosition(this.PIndex)
            currentMap.DrawMap();

            this.MoveCurrentCooldown = this.MoveCooldown;
        }
        else if(input.GetPrimaryInput())
        {
            // Flip stuff
            if(this.FlipCurrentCooldown < 0)
            {
                // Flip to other size
                this.PIndex = currentMap.GetFlipIndex(this.PIndex)
                this.Position = currentMap.GetEdgeVectorPosition(this.PIndex)    
                this.FlipCurrentCooldown = this.FlipCooldown;

                // Destroy all enemies in current PIndex
                var enemies = EnemyManager.getInstance().GetEnemiesInMapIndex(this.PIndex);
                for(var i = 0; i < enemies.length; i++)
                {
                    enemies[i].IMustDie();
                    TempestGame.getInstance().AddToScore()
                }
                if(TempestGame.getInstance().GetScore() >= 100)
                {
                    LevelManager.getInstance().TriggerCredits();
                    return;
                }
                    
                currentMap.DrawMap();
            }

            // Bullet stuff
            // if(this.BulletCurrentCooldown < 0)
            // {
            //     BulletManager.getInstance().FireBullet(this.PIndex);
            //     this.PrevKey = input.space.keyCode;
            //     this.BulletCurrentCooldown = this.BulletCooldown;
            // }
        }
        this.FlipCurrentCooldown -= deltaTime;
        this.MoveCurrentCooldown -= deltaTime;
        this.Sprite.setPosition(this.Position.x, this.Position.y, 0)
        // this.BulletCurrentCooldown -= deltaTime;
    };

    Player.prototype.Draw = function (graphics) {
        // graphics.fillCircle(this.Position.x,this.Position.y, 25);
    };

    Player.prototype.GetPIndex = function () {
        return this.PIndex;
    };

    Player.prototype.SetPIndex = function (pIndex) {
        this.PIndex = pIndex;
    };

    Player.prototype.SetPPosition = function (position) {
        this.Position = position;
    };

    Player.prototype.AttemptToWipeAss = function(){
        this.Sprite.visible = false;
        this.Sprite.destroy();
        this.Sprite = null;
    }

    return Player;
}())
