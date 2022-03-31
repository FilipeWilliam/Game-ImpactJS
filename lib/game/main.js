ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
    'game.levels.florest'
	)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	gravity: 300,
	init: function(){
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.SPACE, 'jump');
		ig.input.bind(ig.KEY.Z, 'attack1');
		ig.input.bind(ig.KEY.X, 'attack2');
		this.loadLevel(LevelFlorest);
	},

	update: function() {
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 600, 312, 2 );

});
