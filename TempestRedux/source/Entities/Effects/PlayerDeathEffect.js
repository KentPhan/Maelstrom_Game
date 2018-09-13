var PlayerDeathEffect = /** @class */ (function (){
   
    function PlayerDeathEffect()
    {
        var scene = TempestGame.getInstance().GetCurrentScene();
        this.particles = scene.add.particles('alien');
        this.emitter = this.particles.createEmitter({speed: 100, scale: {start: 1, end: 0}, blendMode: 'ADD'});

        //this.Emit();
    }

    PlayerDeathEffect.prototype.Emit = function()
    {
        this.emitter.start(true, 2000, null, 10);
    }

    PlayerDeathEffect.prototype.Update = function (deltaTime,input) {
        
    };

    /*
    PlayerDeathEffect.prototype.Draw = function (graphics) {
        graphics.fillCircle(this.Position.x,this.Position.y, 25);
    };
    */

    return PlayerDeathEffect;
}())
