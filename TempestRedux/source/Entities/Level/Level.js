var Level = /** @class */ (function (){
    var self;
    function Level(properties, player)
    {
        if(properties.IS_UI)
        {
            this.IsUI = true;
            this.Map = null;
            this.Player = null;
            this.Text = properties.TEXT;
            this.UIText = TempestGame.getInstance().GetCurrentScene().add.text( properties.X, properties.Y, this.Text(), { font: "Bold 72px Arial", fill: '#ffffff' });
        }
        else
        {
            this.IsUI = false;
            this.Map = new Map(properties.MAP_POINTS);

            //Spawn Player
            var pIndex = 0
            var newPosition = this.Map.GetEdgeVectorPosition(pIndex)
            this.Map.DrawMap();

            if(player == null)
                this.Player = new Player(pIndex, newPosition);
            else
                this.Player = player;
        }
        self = this;
        
    }

    Level.prototype.Update = function (deltaTime) {
        if(this.IsUI)
        {

        }
        else
        {
            if(this.Map != null)
                this.Map.Update(deltaTime)
            if(this.Player != null)
                this.Player.Update(deltaTime)
        }
    };

    Level.prototype.BeginUnloadLevel = function(callback)
    {
        if(!this.IsUI)
        {
            // this.Player.TransitionToNextLevel(function(){
            //     self.Map.BeingUnloadMap(function(){
            //         callback();
            //     });        
            // });
            self.Player.DeactivatePlayer();
            self.Map.BeginUnloadMap(function(){
                callback();
            });    
        }
        else
        {
            callback();
        }
    };

    Level.prototype.BeginLoadLevel = function(callback)
    {
        if(!this.IsUI)
        {
            self.Map.BeginLoadMap(function(){
                self.Player.ActivatePlayer();
                callback();
            });    
        }
        else
        {
            callback();
        }
    }

    Level.prototype.AttemptToWipeAss = function(){
        // Clear any possible drawings of map
        TempestGame.getInstance().GetGraphics().clear();

        if(this.Map != null)
        {
            this.Map.AttemptToWipeAss();
            delete this.Map
        }
        
        // if(this.Player != null)
        // {
        //     this.Player.AttemptToWipeAss();
        //     delete this.Player
        // }

        if(this.UIText != null)
        {
            this.UIText.visible =false;
            this.UIText.destroy();
            this.UIText = null;
        }

        this.Map = null;
        this.Player = null;
    }

    Level.prototype.GetMap = function () {
        return this.Map;
    };

    Level.prototype.GetPlayer = function () {
        return this.Player;
    };

    Level.prototype.GetIsUI = function(){
        return this.IsUI;
    }

    return Level;
}())
