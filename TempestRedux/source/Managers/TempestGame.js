
var TempestGame = /** @class */ (function () {
    var self = this;

    function TempestGame(scene, phaser) {
        
        this.Scene = scene;
        self.Graphics = scene.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });;
        this.Input = scene.input;
    
        // Remove
        this.text = this.Scene.add.text(50, 50, '');
        
        // Map
        var points = [
            new Vector2(100,0),
            new Vector2(0,0),
            new Vector2(0,100),
            new Vector2(100,100),
        ]

        self.Map = new Map();
        // self.Camera = new Camera(scene);

    }
    TempestGame.prototype.Create = function () {
        
    };
    TempestGame.prototype.Update = function () {
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

        // // Remove
        // this.text.setText("Line Height: " + height);
    };
    return TempestGame;
}());