ig.module(
        'game.entities.meteor'
    )
    .requires(
        'game.entities.basePlayer',
        'impact.game',
    )
    .defines(function () {
        EntityMeteor = BasePlayer.extend({
            socketId: null,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.ACTIVE,
            accelGround: 200,
            accelAir: 310,
            jump: 200,
            health: 8,
            cooldownAttackTimeout: 1000,
            offset: {
                x: 70,
                y: 40
            },
            size: {
                x: 25,
                y: 58
            },

            idleAnimationSheet: new ig.AnimationSheet('media/champions/Meteor Man/Idle.png', 162, 162),
            runAnimationSheet: new ig.AnimationSheet('media/champions/Meteor Man/Run.png', 162, 162),
            jumpAnimationSheet: new ig.AnimationSheet('media/champions/Meteor Man/Jump.png', 162, 162),
            fallAnimationSheet: new ig.AnimationSheet('media/champions/Meteor Man/Fall.png', 162, 162),
            attack1AnimationSheet: new ig.AnimationSheet('media/champions/Meteor Man/Attack1.png', 162, 162),
            attack2AnimationSheet: new ig.AnimationSheet('media/champions/Meteor Man/Attack2.png', 162, 162),
            receiveDamageAnimationSheet: new ig.AnimationSheet('media/champions/Meteor Man/Take hit.png', 162, 162),
            dieAnimationSheet: new ig.AnimationSheet('media/champions/Meteor Man/Death.png', 162, 162),
        });
    });