
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
                
            },
            GetCounterClockWiseInput(){

            },

            GetPrimaryInput(){

            },

            GetEscapeInput(){
                if(_input.esc.isDown)
                    return true;
                else
                    return false;
            },

            GetEnterInput(){
                if(_input.enter.isDown)
                    return true;
                else
                    return false;
                },

            GetInput: function(){
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