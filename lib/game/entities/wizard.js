ig.module(
        'game.entities.wizard'
    )
    .requires(
        'game.entities.basePlayer',
        'impact.game',
    )
    .defines(function () {
        EntityWizard = BasePlayer.extend({
            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.B,
            collides: ig.Entity.COLLIDES.ACTIVE,
            accelGround: 200,
            accelAir: 310,
            jump: 200,
            health: 5,
            cooldownAttackTimeout: 1000,
            offset: {
                x: 108,
                y: 97
            },
            size: {
                x: 35,
                y: 69
            },

            idleAnimationSheet: new ig.AnimationSheet('media/champions/wizard/Idle.png', 250, 250),
            runAnimationSheet: new ig.AnimationSheet('media/champions/wizard/Run.png', 250, 250),
            jumpAnimationSheet: new ig.AnimationSheet('media/champions/wizard/Jump.png', 250, 250),
            fallAnimationSheet: new ig.AnimationSheet('media/champions/wizard/Fall.png', 250, 250),
            attack1AnimationSheet: new ig.AnimationSheet('media/champions/wizard/Attack1.png', 250, 250),
            attack2AnimationSheet: new ig.AnimationSheet('media/champions/wizard/Attack2.png', 250, 250),
            receiveDamageAnimationSheet: new ig.AnimationSheet('media/champions/wizard/Take hit.png', 250, 250),
            dieAnimationSheet: new ig.AnimationSheet('media/champions/wizard/Death.png', 250, 250),
        });
    });