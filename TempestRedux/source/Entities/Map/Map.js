var Map = /** @class */ (function (){
    var self = this;

    function Map(points)
    {
        self.ExteriorPoints = points;
    }

    Map.prototype.Draw = function(graphics){
        

        
        graphics.lineStyle(1, 0xFF0000, 1);
    
        
        // draw a shape
        graphics.moveTo(50,50);
        graphics.lineTo(250, 50);
        graphics.lineTo(100, 100);
        graphics.lineTo(250, 220);
        graphics.lineTo(50, 220);
        graphics.lineTo(50, 50);
        graphics.strokePath();
        
    }

    return Map;
}())
