var PlayerDeathEffect = /** @class */ (function (){
   
    function PlayerDeathEffect()
    {
        var scene = TempestGame.getInstance().GetCurrentScene();
        this.emitter = scene.add.particles('death_particle').createEmitter({
            speed: { min: -150, max: 150 },
            angle: { min: 0, max: 360 },
            scale: {start: 0.5, end: 0}, 
            quantity: { min: 7, max: 15 },
            lifespan: { min: 500, max: 800 },
            blendMode: 'ADD',
            rotate: { min: 0, max: 360 },
            radial: true
        })

        this.emitter.on = false;
    }

    PlayerDeathEffect.prototype.GetEmitter = function()
    {
        return this.emitter;
    }
    
    return PlayerDeathEffect;
}())
