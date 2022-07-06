ig.module(
  'game.entities.fireball'
)
.requires(
  'game.entities.spell',
  'impact.game',
)
.defines(function () {
  EntityFireball = EntitySpell.extend({
      flip: true,
      maxVel: {
          x: 1000,
          y: 0,
      },
      size: {
          x: 35,
          y: 20
      },
      offset: {
          x: 20,
          y: 5
      },

      animationSpell: new ig.AnimationSheet('media/champions/wizard/fireball/fireball-sheet.png', 64, 32),
    });
});