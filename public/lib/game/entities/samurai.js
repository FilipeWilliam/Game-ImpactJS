ig.module(
  'game.entities.samurai'
)
.requires(
  'game.entities.basePlayer',
  'impact.game',
)
.defines(function () {
  EntitySamurai = BasePlayer.extend({
      socketId: null,
      type: ig.Entity.TYPE.B,
      checkAgainst: ig.Entity.TYPE.A,
      collides: ig.Entity.COLLIDES.ACTIVE,
      accelGround: 200,
      accelAir: 310,
      jump: 250,
      health: 2,
      cooldownAttackTimeout: 1000,
      offset: {
          x: 85,
          y: 67
      },
      size: {
          x: 28,
          y: 54
      },

      idleAnimationSheet: new ig.AnimationSheet('media/champions/samurai/Idle.png', 200, 200),
      runAnimationSheet: new ig.AnimationSheet('media/champions/samurai/Run.png', 200, 200),
      jumpAnimationSheet: new ig.AnimationSheet('media/champions/samurai/Jump.png', 200, 200),
      fallAnimationSheet: new ig.AnimationSheet('media/champions/samurai/Fall.png', 200, 200),
      attack1AnimationSheet: new ig.AnimationSheet('media/champions/samurai/Attack1.png', 200, 200),
      attack2AnimationSheet: new ig.AnimationSheet('media/champions/samurai/Attack2.png', 200, 200),
      receiveDamageAnimationSheet: new ig.AnimationSheet('media/champions/samurai/Take hit.png', 200, 200),
      dieAnimationSheet: new ig.AnimationSheet('media/champions/samurai/Death.png', 200, 200),
  });
});