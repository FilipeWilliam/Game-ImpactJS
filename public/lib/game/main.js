ig.module(
		'game.main'
	)
	.requires(
		'impact.game',
		'impact.font',
		'impact.sound',
		'game.levels.florest',
		'game.levels.industrial',
		'game.entities.spell',
		'game.entities.meteor',
		'game.entities.wizard',
		'game.entities.samurai',
	)
	.defines(function () {

		MyGame = ig.Game.extend({
			font: new ig.Font('media/font.png'),
			gravity: 300,
			gameMinute: 1,
			gameSecond: 0,
			deltaTimer: null,
			timerFinished: false,

			init: function () {
				ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
				ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
				ig.input.bind(ig.KEY.SPACE, 'jump');
				ig.input.bind(ig.KEY.Z, 'attack1');
				ig.input.bind(ig.KEY.X, 'attack2');
				this.loadLevel(LevelFlorest);
				this.deltaTimer = new ig.Timer(1);
			},

			update: function () {
				this.parent();
			},

			draw: function () {
				this.parent();
				if(isMatchFinished) {
					this.font.draw('Fim de jogo!', 290, 150, ig.Font.ALIGN.CENTER);
				};

				this.font.draw(currentMatchMinute, 290, 10, ig.Font.ALIGN.CENTER);
				this.font.draw(':', 293, 10, ig.Font.ALIGN.CENTER);
				this.font.draw(currentMatchSecond, 300, 10, ig.Font.ALIGN.CENTER);

				let currentPlayer = ig.game.entities.find(player => player.socketId === currentSocketId);
				let enemyPlayer = ig.game.entities.find(player => player.socketId !== currentSocketId);

				if(currentPlayer) {
					this.font.draw('Seu jogador: ' + currentPlayer.health, 50, 10, ig.Font.ALIGN.CENTER);
					this.font.draw('Pontos: ' + currentPoint, 50, 20, ig.Font.ALIGN.CENTER);
				}

				if(enemyPlayer) {
					this.font.draw('Oponente: ' + enemyPlayer.health, 550, 10, ig.Font.ALIGN.CENTER);
					this.font.draw('Pontos: ' + enemyPoint, 550, 20, ig.Font.ALIGN.CENTER);
				}
			}
		});


		ig.main('#canvas', MyGame, 60, 600, 320, 2);
	});