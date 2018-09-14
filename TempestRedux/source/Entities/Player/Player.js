var Player = /** @class */ (function (){
   
    function Player(pIndex, position)
    {
        this.PIndex = pIndex;
        this.Position = position;
        this.PrevKey = 0;

        this.FlipCooldown = 0.1;
        this.FlipCurrentCooldown = 0;
        // this.BulletCooldown = 0.1;
        // this.BulletCurrentCooldown = 0;
        this.Sprite = TempestGame.getInstance().GetCurrentScene().add.image(0,0,'bullet');
        this.Sprite.scaleX = 0.1;
        this.Sprite.scaleY = 0.1;        
    }

    Player.prototype.Update = function (deltaTime,input) {
        if(input.left.isDown && this.PrevKey != input.left.keyCode)
        {
            this.PIndex = TempestGame.getInstance().GetCurrentMap().GetNextIndexCCW(this.PIndex);
            this.Position =  TempestGame.getInstance().GetCurrentMap().GetEdgeVectorPosition(this.PIndex)
            this.PrevKey = input.left.keyCode;
            TempestGame.getInstance().GetCurrentMap().DrawMap();
        }
        else if(input.right.isDown && this.PrevKey != input.right.keyCode)
        {
            this.PIndex = TempestGame.getInstance().GetCurrentMap().GetNextIndexCW(this.PIndex);
            this.Position = TempestGame.getInstance().GetCurrentMap().GetEdgeVectorPosition(this.PIndex)
            this.PrevKey = input.right.keyCode;
            TempestGame.getInstance().GetCurrentMap().DrawMap();
        }
        else if(input.space.isDown && this.PrevKey != input.space.keyCode)
        {
            // Flip stuff
            if(this.FlipCurrentCooldown < 0)
            {
                // Flip to other size
                this.PIndex = TempestGame.getInstance().GetCurrentMap().GetFlipIndex(this.PIndex)
                this.Position = TempestGame.getInstance().GetCurrentMap().GetEdgeVectorPosition(this.PIndex)    
                this.PrevKey = input.space.keyCode;
                this.FlipCurrentCooldown = this.FlipCooldown;

                // Destroy all enemies in current PIndex
                var enemies = EnemyManager.getInstance().GetEnemiesInMapIndex(this.PIndex);
                for(var i = 0; i < enemies.length; i++)
                {
                    enemies[i].IMustDie();
                    TempestGame.getInstance().AddToScore()
                }
                TempestGame.getInstance().GetCurrentMap().DrawMap();
            }

            // Bullet stuff
            // if(this.BulletCurrentCooldown < 0)
            // {
            //     BulletManager.getInstance().FireBullet(this.PIndex);
            //     this.PrevKey = input.space.keyCode;
            //     this.BulletCurrentCooldown = this.BulletCooldown;
            // }
        }
        else if (input.space.isUp && input.left.isUp && input.right.isUp)
        {
            this.PrevKey = 0;
        }

        this.FlipCurrentCooldown -= deltaTime;
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

    return Player;
}())
