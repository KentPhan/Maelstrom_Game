var Player = /** @class */ (function (){
   
    function Player(pIndex, position, mapRef)
    {
        this.PIndex = pIndex;
        this.Position = position;
        this.Map = mapRef;
        this.KeyDown = false;
    }

    Player.prototype.Update = function (input) {
        if(input.left.isDown && !this.KeyDown)
        {
            this.PIndex = this.Map.GetNextIndexCCW(this.PIndex);
            this.Position =  this.Map.GetIndexVectorPosition(this.PIndex)
            this.KeyDown = true;
        }
        else if(input.right.isDown&& !this.KeyDown)
        {
            this.PIndex = this.Map.GetNextIndexCW(this.PIndex);
            this.Position = this.Map.GetIndexVectorPosition(this.PIndex)
            this.KeyDown = true;
        }
        else if(input.left.isUp && input.right.isUp)
        {
            this.KeyDown = false;
        }
    };

    Player.prototype.Draw = function (graphics) {
        graphics.fillCircle(this.Position.x,this.Position.y, 25);
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
