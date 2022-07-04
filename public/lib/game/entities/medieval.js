ig.module(
  'game.entities.medieval'
)
.requires(
  'game.entities.basePlayer',
  'impact.game',
)
.defines(function () {
  EntityMedieval = BasePlayer.extend({
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
      idleAnimationSheet: new ig.AnimationSheet('media/champions/medieval/Idle.png', 180, 180),
      runAnimationSheet: new ig.AnimationSheet('media/champions/medieval/Run.png', 180, 180),
      jumpAnimationSheet: new ig.AnimationSheet('media/champions/medieval/Jump.png', 180, 180),
      fallAnimationSheet: new ig.AnimationSheet('media/champions/medieval/Fall.png', 180, 180),
      attack1AnimationSheet: new ig.AnimationSheet('media/champions/medieval/Attack1.png', 180, 180),
      attack1AnimationSheet: new ig.AnimationSheet('media/champions/medieval/Attack2.png', 180, 180),
      receiveDamageAnimationSheet: new ig.AnimationSheet('media/champions/medieval/Take hit.png', 180, 180),
      dieAnimationSheet: new ig.AnimationSheet('media/champions/medieval/Death.png', 180, 180),
  });
});