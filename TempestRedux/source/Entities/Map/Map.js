var Map = /** @class */ (function (){
    var self = this;
    self.ExteriorPoints = null;
    self.InteriorPoints = null;
    self.InnerScale = null;
    self.PlayerPosition = null;

    function Map(points)
    {
        self.ExteriorPoints = points;
        self.InnerScale = 0.25;
        self.TotalScale = 3.0;

        if(self.ExteriorPoints.length <= 1)
            return;

        // Total scale for making a level bigger
        for(var i = 0; i < self.ExteriorPoints.length; i++)
        {
            self.ExteriorPoints[i].x *= TotalScale; 
            self.ExteriorPoints[i].y *= TotalScale; 
        }
            
        // Scale of inner relative to total scale
        self.InteriorPoints = [];
        for(var i = 0; i < self.ExteriorPoints.length; i++)
        {
            self.InteriorPoints.push(
                new Vector2
                (self.ExteriorPoints[i].x * self.InnerScale,
                     self.ExteriorPoints[i].y * self.InnerScale))
        }
    }

    Map.prototype.Draw = function(graphics){
    
        if(self.ExteriorPoints.length <= 1)
            return;

        graphics.lineStyle(1, 0xFF0000, 1);


        // Draw Outside
        var firstVector = self.ExteriorPoints[0]
        graphics.moveTo(firstVector.x,firstVector.y);
        for(var i = 1; i < self.ExteriorPoints.length; i++)
        {
            var vector = self.ExteriorPoints[i];
            graphics.lineTo(vector.x, vector.y);
        }
        graphics.lineTo(firstVector.x, firstVector.y);
        graphics.strokePath();

        // Draw Inside
        firstVector = self.InteriorPoints[0]
        graphics.moveTo(firstVector.x,firstVector.y);
        for(var i = 1; i < self.InteriorPoints.length; i++)
        {;
            var vector = self.InteriorPoints[i];
            graphics.lineTo(vector.x, vector.y);
        }
        graphics.lineTo(firstVector.x, firstVector.y);
        graphics.strokePath();


        // Draw Pathing Lines
        for(var i = 0; i < self.ExteriorPoints.length; i++)
        {
            graphics.moveTo(self.ExteriorPoints[i].x, self.ExteriorPoints[i].y);
            graphics.lineTo(self.InteriorPoints[i].x, self.InteriorPoints[i].y);
            graphics.strokePath();
        }
    }

    return Map;
}())
