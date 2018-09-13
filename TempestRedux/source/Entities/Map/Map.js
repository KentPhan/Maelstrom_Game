var Map = /** @class */ (function (){
    
    function Map(game, points)
    {
        this.ExPoints = points;
        this.InnerScale = 0.075;
        this.TotalScale = 2.5;

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

    Map.prototype.Create = function(){
        //Spawn Player
        var pIndex = 1
        var offset = new Vector2((this.ExPoints[pIndex + 1].x - this.ExPoints[pIndex].x)* 0.5, (this.ExPoints[pIndex + 1].y - this.ExPoints[pIndex].y)* 0.5)
        var newPosition = new Vector2(this.ExPoints[pIndex].x + offset.x, this.ExPoints[pIndex].y + offset.y)
        this.Player = new Player(pIndex, newPosition);
    }

    Map.prototype.Update = function(deltaTime , input){
        this.Player.Update(deltaTime, input);
    }


    Map.prototype.Draw = function(graphics){
        var playerIndex = this.Player.GetPIndex();
        var playerFlipIndex = this.GetFlipIndex(playerIndex);

        if(this.ExPoints.length <= 1)
            return;


        // Draw Outside
        var firstVector = this.ExPoints[0]
        graphics.moveTo(firstVector.x,firstVector.y);
        for(var i = 1; i < this.ExPoints.length; i++)
        {
            // graphics.lineStyle(1, 0xF00000, 1)
            var vector = this.ExPoints[i];
            graphics.lineTo(vector.x, vector.y);
            // graphics.strokePath();

            // if(i == playerFlipIndex)
            // {
            //     console.log(playerFlipIndex);
            //     graphics.lineStyle(1, 0xFFFF33, 1)
            //     var vector = this.ExPoints[i];
            //     graphics.lineTo(vector.x, vector.y);
            //     graphics.strokePath();
            // }
            // else
            // {
            //     graphics.lineStyle(1, 0xF00000, 1)
            //     var vector = this.ExPoints[i];
            //     graphics.lineTo(vector.x, vector.y);
            //     graphics.strokePath();
            // }
        }
        graphics.lineTo(firstVector.x, firstVector.y);
        graphics.strokePath();

        // Draw Inside
        firstVector = this.InPoints[0]
        graphics.moveTo(firstVector.x,firstVector.y);
        for(var i = 1; i < this.InPoints.length; i++)
        {;
            var vector = this.InPoints[i];
            graphics.lineTo(vector.x, vector.y);
        }
        graphics.lineTo(firstVector.x, firstVector.y);
        graphics.strokePath();

        // Draw Pathing Lines
        for(var i = 0; i < this.ExPoints.length; i++)
        {
            graphics.moveTo(this.ExPoints[i].x, this.ExPoints[i].y);
            graphics.lineTo(this.InPoints[i].x, this.InPoints[i].y);
            graphics.strokePath();
        }

        //TODO: Draw Player here FOR NOW. probs move later
        this.Player.Draw(graphics);
    }

    Map.prototype.GetNextIndexCW = function(index){
        var nextIndex = index + 1;
        if(nextIndex >= this.ExPoints.length)
            return 0;
        else
            return nextIndex;
    }

    Map.prototype.GetFlipIndex = function(index){
        var divisor = (index + (this.ExPoints.length/2));

        return divisor % this.ExPoints.length;

        // if(divisor < this.ExPoints.length)
        //     return divisor % this.ExPoints.length;
        // else
        //     return this.ExPoints.length % divisor;
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

    Map.prototype.GetIndexVectorPosition  = function(index){
        
        // Caluclates player positions always to the right of the index in the ExPoints
        var nextIndex = index + 1;
        if(nextIndex >= this.ExPoints.length)
            nextIndex = 0;

        var offset = new Vector2((this.ExPoints[nextIndex].x - this.ExPoints[index].x)* 0.5, (this.ExPoints[nextIndex].y - this.ExPoints[index].y)* 0.5)
        return new Vector2(this.ExPoints[index].x + offset.x, this.ExPoints[index].y + offset.y);
    }

    return Map;
}())
