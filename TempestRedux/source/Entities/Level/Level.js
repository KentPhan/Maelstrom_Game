var Level = /** @class */ (function (){
    var self;
    function Level(properties)
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
            this.Player = new Player(pIndex, newPosition);
            this.Map.DrawMap();
            EnemyManager.getInstance().ActivateEnemies();
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

            self.Map.BeingUnloadMap(function(){
                callback();
            });    
        }
        else
        {
            callback();
        }

        
    };

    Level.prototype.AttemptToWipeAss = function(){
        // Clear any possible drawings of map
        TempestGame.getInstance().GetGraphics().clear();

        if(this.Map != null)
        {
            this.Map.AttemptToWipeAss();
            delete this.Map
        }
        
        if(this.Player != null)
        {
            this.Player.AttemptToWipeAss();
            delete this.Player
        }

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

    return Level;
}())
