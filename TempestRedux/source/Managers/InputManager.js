
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
        var _keyCodes = Phaser.Input.Keyboard.KeyCodes;
        var _input = null;
        var _prevKey = {
            Left:false,
            Right:false,
            Space: false,
            Esc: false,
            Enter: false,
        };

        var Schemes = {
            Keyboard:0,
            Mouse:1
        }
        var SchemeState = Schemes.Keyboard;

        
        return{

            Initialize: function(){
                _input = TempestGame.getInstance().GetCurrentScene().input.keyboard.addKeys(
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
            },

            Create: function () {                
                
            }, 

            GetClockWiseInput(){
                var positive = (_input.right.isDown && !_prevKey.Right);

                _prevKey.Right = (positive) ? true : !(_input.right.isUp);

                return positive;
            },

            GetCounterClockWiseInput(){
                var positive = (_input.left.isDown && !_prevKey.Left);

                _prevKey.Left = (positive) ? true : !(_input.left.isUp);

                return positive;
            },

            GetPrimaryInput(){

                var positive = (_input.space.isDown && !_prevKey.Space);

                _prevKey.Space = (positive) ? true : !(_input.space.isUp);
                
                return positive;
            },

            GetEscapeInput(){
                var positive = (_input.esc.isDown && !_prevKey.Esc);

                _prevKey.Esc = (positive) ? true : !(_input.esc.isUp);
                
                return positive;
            },

            GetEnterInput(){
                var positive = (_input.enter.isDown && !_prevKey.Enter);

                _prevKey.Enter = (positive) ? true : !(_input.enter.isUp);
                
                return positive;
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