var Map = /** @class */ (function (){
    

    // TODO Strange issue occuring where this might be getting called upon ending level and switching to UI
    function Map(points)
    {
        this.ExPoints = [];
        for(var i = 0; i < points.length; i++)
        {
            this.ExPoints.push(new Vector2(points[i].x,points[i].y));
        }
        
        this.InnerScale = 0.075;
        this.TotalScale = 2.5;
        this.BaseLineColor = 0xF00000;
        this.FlipLineColor = 0xFFFF33;

        if(this.ExPoints.length <= 1)
            return;

        // Total scale for making a level bigger
        for(var i = 0; i < this.ExPoints.length; i++)
        {
            this.ExPoints[i].x *= this.TotalScale; 
            this.ExPoints[i].y *= this.TotalScale; 
        }
            
        // Scale of inner relative to total scale
        this.InPoints = [];
        for(var i = 0; i < this.ExPoints.length; i++)
        {
            this.InPoints.push(
                new Vector2
                (this.ExPoints[i].x * this.InnerScale,
                     this.ExPoints[i].y * this.InnerScale))
        }
    }

    Map.prototype.Update = function(deltaTime){
        
    }

    Map.prototype.Draw = function(graphics){
    }

    Map.prototype.DrawMap = function()
    {
        var graphics = TempestGame.getInstance().GetGraphics()
        graphics.clear();

        if(this.ExPoints.length <= 1)
            return;

        // For drawing map stuff relevant to player
        var currentPlayer = LevelManager.getInstance().GetCurrentLevel().GetPlayer();
        var playerIndex = (currentPlayer) ? currentPlayer.GetPIndex() : null;
        var playerFlipIndex = this.GetFlipIndex(playerIndex);

        // Draw Outside
        for(var i = 0; i < this.ExPoints.length; i++)
        {
            var nextPoint;
            if(i >= (this.ExPoints.length - 1))
            {
                nextPoint = this.ExPoints[0];
            }
            else
            {
                nextPoint = this.ExPoints[i+1];
            }

            // Draw lines
            if(playerFlipIndex >= 0  && i == playerFlipIndex)
                graphics.lineStyle(1, this.FlipLineColor, 1);
            else
                graphics.lineStyle(1, this.BaseLineColor, 1)
            graphics.lineBetween(this.ExPoints[i].x,this.ExPoints[i].y,nextPoint.x,nextPoint.y);         
        }

        //Draw Inside
        for(var i = 0; i < this.InPoints.length; i++)
        {
            var nextPoint;
            if(i >= (this.InPoints.length - 1))
            {
                nextPoint = this.InPoints[0];
            }
            else
            {
                nextPoint = this.InPoints[i+1];
            }

            // Draw lines
            if(playerFlipIndex >= 0 && i == playerFlipIndex)
                graphics.lineStyle(1, this.FlipLineColor, 1);
            else
                graphics.lineStyle(1, this.BaseLineColor, 1)
            graphics.lineBetween(this.InPoints[i].x,this.InPoints[i].y,nextPoint.x,nextPoint.y);
        }

        // // Draw Pathing Lines
        for(var i = 0; i < this.ExPoints.length; i++)
        {
            // Define color
            var nextIndex =  ((this.ExPoints.length - 1 ) == playerFlipIndex)? 0 : playerFlipIndex + 1;
            if(playerFlipIndex >= 0 && (i == playerFlipIndex  || i == nextIndex))
                graphics.lineStyle(1, this.FlipLineColor, 1);
            else
                graphics.lineStyle(1, this.BaseLineColor, 1)

            graphics.lineBetween(this.ExPoints[i].x,this.ExPoints[i].y, this.InPoints[i].x, this.InPoints[i].y);
        }
    }

    Map.prototype.GetNextIndexCW = function(index){
        var nextIndex = index + 1;
        if(nextIndex >= this.ExPoints.length)
            return 0;
        else
            return nextIndex;
    }

    Map.prototype.GetFlipIndex = function(index){
        if(index < 0)
            return null;
        var divisor = (index + (this.ExPoints.length/2));
        return divisor % this.ExPoints.length;
    }

    Map.prototype.GetNextIndexCCW = function(index){
        var nextIndex = index -  1 ;
        if(nextIndex < 0)
            return this.ExPoints.length - 1;
        else
            return nextIndex;
    }

    Map.prototype.GetCenter = function(){
        return new Vector2(0,0);
    }

    Map.prototype.GetRandomIndex = function(){
        return Math.floor(Math.random() * this.ExPoints.length)
    }

    Map.prototype.GetEdgeVectorPosition  = function(index){
        
        // Caluclates player positions always to the right of the index in the ExPoints
        var nextIndex = index + 1;
        if(nextIndex >= this.ExPoints.length)
            nextIndex = 0;

        var offset = new Vector2((this.ExPoints[nextIndex].x - this.ExPoints[index].x)* 0.5, (this.ExPoints[nextIndex].y - this.ExPoints[index].y)* 0.5)
        return new Vector2(this.ExPoints[index].x + offset.x, this.ExPoints[index].y + offset.y);
    }

    Map.prototype.AttemptToWipeAss = function(){
        this.ExPoints = null;
        this.InPoints = null;
    }

    return Map;
}())
