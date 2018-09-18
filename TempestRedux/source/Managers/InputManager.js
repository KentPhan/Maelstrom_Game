
var InputManager = /** @class */ (function ()
{
    // Singleton
    var instance;
    
    function init()
    {
        // Private methods and variables
        // function privateMethod(){
        //     console.log( "I am private" );
        // }
        
        //var privateRandomNumber = Math.random();
        // important game variables in phaser
        var _input = null;

        var _keyCodes = Phaser.Input.Keyboard.KeyCodes;
        var _keyboardInput = null;
        var _prevKey = {
            Left:false,
            Right:false,
            Space: false,
            Esc: false,
            Enter: false,
            Shift: false
        };


        var _prevMousePosition = null;
        var _minimumMagnitude = 10;
        var _prevMousePress ={
            LeftClick: false
        }

        var Schemes = {
            Keyboard:0,
            Mouse:1
        }
        var _schemeState = Schemes.Keyboard;
        var _schemeText = "Keyboard";
        var _instructionText = "SHIFT to Switch"

        
        return{

            Initialize: function(){
                _input = TempestGame.getInstance().GetCurrentScene().input;
                _keyboardInput = _input.keyboard.addKeys(
                    {
                        enter: _keyCodes.ENTER,
                        esc: _keyCodes.ESC,
                        up:_keyCodes.UP,
                        down:_keyCodes.DOWN,
                        left:_keyCodes.LEFT,
                        right:_keyCodes.RIGHT,
                        space:_keyCodes.SPACE,
                        shift:_keyCodes.SHIFT
                    });
                _mousePointerInput = _input.mousePointer;

                // Pointer lock shit
                var canvas = game.canvas;
                canvas.onclick = function(){
                    _input.mouse.requestPointerLock();
                    console.log("Locking pointer");
                }


                _schemeText = TempestGame.getInstance().GetCurrentScene().add.text( (config.width/2) - 170 , 15 - (config.height/2) , _schemeText, { font: "Bold 32px Arial", fill: '#ffffff' });
                _instructionText = TempestGame.getInstance().GetCurrentScene().add.text( (config.width/2) - 270 , (config.height/2) - 55 , _instructionText, { font: "Bold 32px Arial", fill: '#ffffff' });
            },

            Create: function () {                
                
            }, 

            GetPositiveInput(playerPosition){
                var positive = false;

                if(_schemeState == Schemes.Keyboard)
                {
                    //Right
                    positive = (_keyboardInput.right.isDown && !_prevKey.Right);
                    _prevKey.Right = (positive) ? true : !(_keyboardInput.right.isUp);
                }
                else
                {
                    // // Mouse controls
                    // if(_prevMousePosition != null && playerPosition != null)
                    // {
                    //     var currentPos = _mousePointerInput.position;
                    //     var mouseDirection = new Vector2(currentPos.x - _prevMousePosition.x, currentPos.y - _prevMousePosition.y);

                        
                    //     //console.log(mouseDirection.length());
                    //     if(mouseDirection.length() < _minimumMagnitude)
                    //     {
                    //         _prevMousePosition =  _mousePointerInput.prevPosition;
                    //         return false;
                    //     }

                    //     var directionNormal = new Vector2(playerPosition.y, playerPosition.x * -1)
                    //     positive = (mouseDirection.dot(directionNormal) > 0)
                    // }
                    // _prevMousePosition =  _mousePointerInput.prevPosition;

                    // Mouse controls 2.0 With locking
                    if(playerPosition != null)
                    {
                        var mouseDirection = new Vector2(_mousePointerInput.movementX, _mousePointerInput.movementY)

                        if(mouseDirection.length() < _minimumMagnitude)
                        {
                            return false;
                        }

                        var directionNormal = new Vector2(playerPosition.y, playerPosition.x * -1)
                        positive = (mouseDirection.dot(directionNormal) > 0)
                    }
                }

                return positive;
            },

            GetNegativeInput(playerPosition){
                var positive = false;

                if(_schemeState == Schemes.Keyboard)
                {
                    // Left
                    var positive = (_keyboardInput.left.isDown && !_prevKey.Left);
                    _prevKey.Left = (positive) ? true : !(_keyboardInput.left.isUp);
                }
                else
                {
                    // // Mouse controls
                    // if(_prevMousePosition != null && playerPosition != null)
                    // {
                    //     var currentPos = _mousePointerInput.position;
                    //     var mouseDirection = new Vector2(currentPos.x - _prevMousePosition.x, currentPos.y - _prevMousePosition.y);

                    //     //console.log(mouseDirection.length());
                    //     if(mouseDirection.length() < _minimumMagnitude)
                    //     {
                    //         _prevMousePosition =  _mousePointerInput.prevPosition;
                    //         return false;
                    //     }

                    //     var directionNormal = new Vector2(playerPosition.y * -1, playerPosition.x)
                    //     positive = (mouseDirection.dot(directionNormal) > 0)
                    // }
                    // _prevMousePosition =  _mousePointerInput.prevPosition;

                    // Mouse controls 2.0 With locking
                    if(playerPosition != null)
                    {
                        var mouseDirection = new Vector2(_mousePointerInput.movementX, _mousePointerInput.movementY)

                        if(mouseDirection.length() < _minimumMagnitude)
                        {
                            return false;
                        }

                        var directionNormal = new Vector2(playerPosition.y * -1, playerPosition.x)
                        positive = (mouseDirection.dot(directionNormal) > 0)
                    }
                }

                return positive;
            },

            GetPrimaryInput(){
                var positive = false;
                if(_schemeState == Schemes.Keyboard)
                {
                    // Space bar
                    positive = (_keyboardInput.space.isDown && !_prevKey.Space);
                    _prevKey.Space = (positive) ? true : !(_keyboardInput.space.isUp);
                }
                else
                {
                    // Mouse click
                    positive = (_mousePointerInput.primaryDown && !_prevMousePress.LeftClick);
                    _prevMousePress.LeftClick = (positive) ? true : (_mousePointerInput.primaryDown);
                }
                
                
                return positive;
            },

            GetEscapeInput(){
                var positive = (_keyboardInput.esc.isDown && !_prevKey.Esc);
                _prevKey.Esc = (positive) ? true : !(_keyboardInput.esc.isUp);
                return positive;
            },

            GetEnterInput(){
                var positive = (_keyboardInput.enter.isDown && !_prevKey.Enter);
                _prevKey.Enter = (positive) ? true : !(_keyboardInput.enter.isUp);
                return positive;
            },

            GetSwapInput(){
                var positive = (_keyboardInput.shift.isDown && !_prevKey.Shift);
                _prevKey.Shift = (positive) ? true : !(_keyboardInput.shift.isUp);
                return positive;
            },


            SwapSchemes(){
                if(_schemeState == Schemes.Keyboard)
                {
                    _schemeState = Schemes.Mouse;
                    _schemeText.text = "Mouse";
                }
                else
                {
                    _schemeState = Schemes.Keyboard;
                    _schemeText.text = "Keyboard";
                }
            },

            GetInput()
            {
                return _input;
            }


            //publicProperty: "I am also public",
            //   getRandomNumber: function() {
            //     return privateRandomNumber;
            //   }
            
        }
    };
    return{
        getInstance: function(){
            if ( !instance ) {
                instance = init();
              }
         
              return instance;
        }
    };
})();