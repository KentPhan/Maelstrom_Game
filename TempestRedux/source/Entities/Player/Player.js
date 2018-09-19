var Player = /** @class */ (function (){
   
    function Player(pIndex, position)
    {
        this.PlayerStates = {
            TeleportingIn:0,
            TeleportingOut:1,
            Default:2,
            LevelTransitioning:3
        }
        this.CurrentState = this.PlayerStates.Default
        this.TeleportedFrom = null;
        this.TeleportDestination = null;
        this.TeleportDirection = null;
        this.OriginDirection = null;
        this.TransitionCallBack = null;
        
        this.TeleportSpeed = 1500;

        this.PIndex = pIndex;
        this.Position = position;
        this.PrevKey = 0;

        this.PreviousPIndex = null;
        this.FlipCooldown = 0.5;
        this.FlipCurrentCooldown = 0;

        this.MoveCooldown = 0.08;
        this.MoveCurrentCooldown = 0;

        // this.BulletCooldown = 0.1;
        // this.BulletCurrentCooldown = 0;
        this.Sprite = TempestGame.getInstance().GetCurrentScene().add.image(0,0,'player');
        this.FinalScale = 1;
        this.CenterScale = 0.1;
        this.Sprite.scaleX = this.FinalScale;
        this.Sprite.scaleY = this.FinalScale;
        
        //audio
        this.MoveSound = TempestGame.getInstance().GetCurrentScene().sound.add('move_sfx');
        this.DashSound = TempestGame.getInstance().GetCurrentScene().sound.add('dash_sfx');
    }

    Player.prototype.Update = function (deltaTime) {

        var currentMap = LevelManager.getInstance().GetCurrentLevel().GetMap();
        if(this.CurrentState == this.PlayerStates.Default)
        {
            var input = InputManager.getInstance();
    
            var angle = Math.atan2(0 - this.Position.x, 0 + this.Position.y);
            this.Sprite.rotation = angle;
    
            // Return... Cause you need a map
            if(currentMap == null)
                return;
    
            if(this.MoveCurrentCooldown <= 0 && input.GetNegativeInput(this.Position))
            {
                this.MoveSound.play();

                this.PIndex = currentMap.GetNextIndexNegative(this.PIndex);
                this.Position =  currentMap.GetEdgeVectorPosition(this.PIndex)
                currentMap.DrawMap();
    
                this.MoveCurrentCooldown = this.MoveCooldown;
            }
            else if(this.MoveCurrentCooldown <= 0 && input.GetPositiveInput(this.Position))
            {
                this.MoveSound.play();

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
                    this.DashSound.play();

                    var mapCenter = currentMap.GetCenter();

                    // Begin transition to other side
                    this.PreviousPIndex = this.PIndex;
                    this.PIndex = currentMap.GetFlipIndex(this.PIndex)
                    this.TeleportedFrom = new Vector2(this.Position.x, this.Position.y);
                    this.TeleportDestination = currentMap.GetEdgeVectorPosition(this.PIndex);
                    this.OriginDirection = new Vector2(mapCenter.x - this.Position.x, mapCenter.y - this.Position.y);
                    this.OriginDirection.normalize();

                    this.CurrentState = this.PlayerStates.TeleportingIn;
                }
    
                // Bullet stuff
                // if(this.BulletCurrentCooldown < 0)
                // {
                //     BulletManager.getInstance().FireBullet(this.PIndex);
                //     this.PrevKey = input.space.keyCode;
                //     this.BulletCurrentCooldown = this.BulletCooldown;
                // }
            }
        }
        else if (this.CurrentState == this.PlayerStates.TeleportingIn || this.CurrentState == this.PlayerStates.LevelTransitioning)
        {
            var mapCenter = currentMap.GetCenter();
            var velocity = new Vector2( deltaTime * this.OriginDirection.x * this.TeleportSpeed, deltaTime * this.OriginDirection.y * this.TeleportSpeed)
            this.Position.add(velocity);
            
            var ToOriginDestination = new Vector2(mapCenter.x - this.Position.x, mapCenter.y - this.Position.y);

            var totalLength = new Vector2(mapCenter.x - this.TeleportedFrom.x, mapCenter.y - this.TeleportedFrom.y).length();
            var newScale = ((this.FinalScale - this.CenterScale) * (ToOriginDestination.length())) / totalLength; 
            this.Sprite.setScale(newScale, newScale);

            // Check if past center, if so. mark bullet for deletion
            if((ToOriginDestination.dot(this.OriginDirection) < 0.0))
            {
                if(this.CurrentState == this.PlayerStates.LevelTransitioning)
                {
                    this.TransitionCallBack();
                    this.Sprite.visible = false;
                    return;
                }


                this.Position = mapCenter;
                this.TeleportDirection = new Vector2(this.TeleportDestination.x - this.Position.x, this.TeleportDestination.y - this.Position.y);
                this.TeleportDirection.normalize();

                // Point out now
                var angle = Math.atan2(0 + this.TeleportDirection.x, 0 - this.TeleportDirection.y);
                this.Sprite.rotation = angle;
                this.Sprite.setScale(this.CenterScale, this.CenterScale);

                this.CurrentState = this.PlayerStates.TeleportingOut;

                // Destroy all enemies in previous PIndex
                var enemies = EnemyManager.getInstance().GetEnemiesInMapIndex(this.PreviousPIndex);
                for(var i = 0; i < enemies.length; i++)
                {
                    enemies[i].IMustDie();
                    TempestGame.getInstance().AddToScore()
                }
                return;
            }
        }
        else
        {
            var mapCenter = currentMap.GetCenter();
            var velocity = new Vector2( deltaTime * this.TeleportDirection.x * this.TeleportSpeed, deltaTime * this.TeleportDirection.y * this.TeleportSpeed)
            this.Position.add(velocity);

            var ToTeleportDestination = new Vector2(this.TeleportDestination.x - this.Position.x, this.TeleportDestination.y - this.Position.y);
            
            var originLength = new Vector2(mapCenter.x - this.Position.x, mapCenter.y - this.Position.y).length();
            var totalLength = new Vector2(mapCenter.x - this.TeleportDestination.x, mapCenter.y - this.TeleportDestination.y).length();
            var newScale = ((this.FinalScale - this.CenterScale) * (originLength)) / totalLength; 
            this.Sprite.setScale(newScale, newScale);

            // Check if past center, if so. mark bullet for deletion
            if((ToTeleportDestination.dot(this.TeleportDirection) < 0.0))
            {
                this.Position = this.TeleportDestination;
                
                // Point out now
                var angle = Math.atan2(0 - this.Position.x, 0 + this.Position.y);
                this.Sprite.rotation = angle;
                this.Sprite.setScale(this.FinalScale, this.FinalScale);

                this.CurrentState = this.PlayerStates.Default;
                this.FlipCurrentCooldown = this.FlipCooldown;
                currentMap.DrawMap();

                // Destroy all enemies in current PIndex and trigger events if applicable
                var enemies = EnemyManager.getInstance().GetEnemiesInMapIndex(this.PIndex);
                for(var i = 0; i < enemies.length; i++)
                {
                    enemies[i].IMustDie();
                    TempestGame.getInstance().AddToScore()
                }

                if(TempestGame.getInstance().CheckScoreMileStone())
                {
                    LevelManager.getInstance().TriggerNextLevel();
                    return;
                }

                return;
            }
        }
        
        this.FlipCurrentCooldown -= deltaTime;
        this.MoveCurrentCooldown -= deltaTime;
        this.Sprite.setPosition(this.Position.x, this.Position.y, 0)        
        // this.BulletCurrentCooldown -= deltaTime;
    };

    Player.prototype.Draw = function (graphics) {
        // graphics.fillCircle(this.Position.x,this.Position.y, 25);
    };

    Player.prototype.TransitionToNextLevel = function(callback)
    {
        var mapCenter = LevelManager.getInstance().GetCurrentLevel().GetMap().GetCenter();
        this.TeleportedFrom = new Vector2(this.Position.x, this.Position.y);
        this.OriginDirection = new Vector2(mapCenter.x - this.Position.x, mapCenter.y - this.Position.y);
        this.OriginDirection.normalize();
        this.CurrentState = this.PlayerStates.LevelTransitioning;

        this.TransitionCallBack = callback;
    };

    Player.prototype.IsImmortal = function(){
        if(this.CurrentState == this.PlayerStates.TeleportingIn || this.CurrentState == this.PlayerStates.TeleportingOut)
            return true;
        return false;
    }

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
