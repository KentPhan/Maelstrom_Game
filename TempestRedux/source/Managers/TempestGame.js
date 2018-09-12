// TODO NEED TO CHANGE TO INSTANCE LIKE ENEMY MANAGER
var TempestGame = /** @class */ (function () {
    var self = this;
    self.Graphics = null;
    self.Input = null;
    self.Camera = null;
    self.Map = null;
    self.Player =null;

    function TempestGame(game, scene) {
        
        window.Scene = scene;
        self.Graphics = scene.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa }});;
        self.Input = scene.input.keyboard.createCursorKeys();

        // Map TEMP till we get something better.
        var points = [
            new Vector2(-150,-100),
            new Vector2(0,-110),
            new Vector2(150,-100),
            new Vector2(100,0),
            new Vector2(100,100),
            new Vector2(0,100),
            new Vector2(-100,100),
            new Vector2(-100,0),
        ]

        self.Map = new Map(points);
        this.EnemyManager = new EnemyManager.getInstance(self.Map)

        this.BulletManager = new BulletManager.getInstance(self.Map);


    }
    TempestGame.prototype.Create = function () {
        self.Camera = new Camera(window.Scene);
    };
    TempestGame.prototype.Update = function () {
        var deltaTime = self.game.loop.delta/1000;

        self.Map.Update(self.Input);

        this.EnemyManager.Update(deltaTime);
        this.BulletManager.Update(deltaTime);
    };
    TempestGame.prototype.Draw = function () {
        self.Graphics.clear();
        self.Map.Draw(self.Graphics);

        this.EnemyManager.Draw(self.Graphics);
        this.BulletManager.Draw(self.Graphics);
        
        // var line = new Phaser.Geom.Line(0, 300, 400, 100);
        // var pointer = this.Input.activePointer;
        // line.x2 = pointer.x;
        // line.y2 = pointer.y;
        // self.Graphics.strokeLineShape(line);
        // var height = Phaser.Geom.Line.Height(line);
        // self.Graphics.lineStyle(2, 0x00aa00);
        // self.Graphics.lineBetween(2, 300, 2, 300 - height);
    };
    return TempestGame;
}());