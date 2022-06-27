ig.module(
		'game.main'
	)
	.requires(
		'impact.game',
		'impact.font',
		'game.levels.florest',
	)
	.defines(function () {

		MyGame = ig.Game.extend({

			// Load a font
			font: new ig.Font('media/04b03.font.png'),
			gravity: 300,
			init: function () {
				ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
				ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
				ig.input.bind(ig.KEY.SPACE, 'jump');
				ig.input.bind(ig.KEY.Z, 'attack1');
				ig.input.bind(ig.KEY.X, 'attack2');
				this.loadLevel(LevelFlorest);
			},

			update: function () {
				this.parent();
			},

			draw: function () {
				this.parent();
			}
		});


		ig.main('#canvas', MyGame, 60, 600, 320, 2);

	});