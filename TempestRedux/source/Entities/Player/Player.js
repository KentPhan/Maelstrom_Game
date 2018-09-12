var Player = /** @class */ (function (){
   
    function Player(pIndex, position, mapRef)
    {
        this.PIndex = pIndex;
        this.Position = position;
        this.Map = mapRef;
        this.PrevKey = 0;
    }

    Player.prototype.Update = function (input) {
        if(input.left.isDown && this.PrevKey != input.left.keyCode)
        {
            this.PIndex = this.Map.GetNextIndexCCW(this.PIndex);
            this.Position =  this.Map.GetIndexVectorPosition(this.PIndex)
            this.PrevKey = input.left.keyCode;
        }
        else if(input.right.isDown && this.PrevKey != input.right.keyCode)
        {
            this.PIndex = this.Map.GetNextIndexCW(this.PIndex);
            this.Position = this.Map.GetIndexVectorPosition(this.PIndex)
            this.PrevKey = input.right.keyCode;
        }
        else if(input.space.isDown && this.PrevKey != input.space.keyCode)
        {

            this.PrevKey = input.space.keyCode;
        }
        else if (input.space.isUp && input.left.isUp && input.right.isUp)
        {
            this.PrevKey = 0;
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
