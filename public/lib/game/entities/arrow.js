ig.module(
  'game.entities.arrow'
)
.requires(
  'game.entities.spell',
  'impact.game',
)
.defines(function () {
  EntityArrow = EntitySpell.extend({
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

      animationSpell: new ig.AnimationSheet('media/champions/hunt/arrow/Move.png', 24, 5),
    });
});