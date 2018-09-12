
var TempestGame = /** @class */ (function () {
    var self = this;
    self.Scene = null;
    self.Graphics = null;
    self.Input = null;
    self.Camera = null;
    self.Map = null;
    self.Player =null;

    function TempestGame(scene) {
        
        self.Scene = scene;
        self.Graphics = scene.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa }, fillStyle:{color:0x000000} });;
        self.Input = scene.input.keyboard.createCursorKeys();

        // Map TEMP till we get something better.
        var points = [
            new Vector2(-100,-100),
            new Vector2(0,-100),
            new Vector2(100,-100),
            new Vector2(100,0),
            new Vector2(100,100),
            new Vector2(0,100),
            new Vector2(-100,100),
            new Vector2(-100,0),
        ]

        self.Map = new Map(points);
    }
    TempestGame.prototype.Create = function () {
        self.Camera = new Camera(self.Scene);
    };
    TempestGame.prototype.Update = function () {
        self.Map.Update(self.Input);
    };
    TempestGame.prototype.Draw = function () {
        self.Graphics.clear();
        self.Map.Draw(self.Graphics);
        
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