ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity',
    'impact.game',
    'game.entities.spell'
)
.defines(function(){
    EntityPlayer = ig.Entity.extend({
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        idleAnimationSheet: new ig.AnimationSheet('media/champions/wizard/Idle.png', 250, 250),
        runAnimationSheet: new ig.AnimationSheet('media/champions/wizard/Run.png', 250, 250),
        jumpAnimationSheet: new ig.AnimationSheet('media/champions/wizard/Jump.png', 250, 250),
        fallAnimationSheet: new ig.AnimationSheet('media/champions/wizard/Fall.png', 250, 250),
        attack1AnimationSheet: new ig.AnimationSheet('media/champions/wizard/Attack1.png', 250, 250),
        attack2AnimationSheet: new ig.AnimationSheet('media/champions/wizard/Attack2.png', 250, 250),
        size: {x: 40, y: 58},
        flip: false,
        accelGround: 200,
        accelAir: 310,
        jump: 200,
        cooldownAttackTimeout: 1000,
        isInCooldownAttack: false,
        cooldownIsLoading: false,
        friction: {x: 500, y: 0},
        maxVel: {x: 100, y: 300},
        offset: {x: 108, y: 110},

        init: function(x, y, settings){
            this.parent(x, y, settings);
            this.anims.idle = new ig.Animation( this.idleAnimationSheet, 0.1, [0,1,2,3,4,5,6,7] );
            this.anims.run = new ig.Animation( this.runAnimationSheet, 0.1, [0,1,2,3,4,5,6,7] );
            this.anims.jump = new ig.Animation( this.jumpAnimationSheet, 0.1, [0,1] );
            this.anims.fall = new ig.Animation( this.fallAnimationSheet, 0.1, [0,1] );
            this.anims.attack1 = new ig.Animation( this.attack1AnimationSheet, 0.1, [0,1,2,3,4,5,6,7] );
            this.anims.attack2 = new ig.Animation( this.attack2AnimationSheet, 0.1, [0,1,2,3,4,5,6,7]);
        },

        update: function(){
            var accel = this.standing ? this.accelGround : this.accelAir;

            if(ig.input.state('left')){
                this.flip = true;
                this.accel.x = -accel;
                this.currentAnim.flip.x = true;
            } else if(ig.input.state('right')){
                this.accel.x = accel;
                this.flip = false;
                this.currentAnim.flip.x = false;
            } else {
                this.accel.x = 0;
            }

            if(this.standing && ig.input.state('jump') && this.vel.y == 0) {
                this.vel.y = -this.jump;
                this.falling = false;
            } else if(!this.standing && !ig.input.state('jump') && !this.falling){
                this.vel.y = Math.floor(this.vel.y/3);
                this.falling = true;
            }


            if(this.standing && ig.input.state('attack1')) {
                this.currentAnim = this.anims.attack1;
                let fireBall;
            
                if(!this.isInCooldownAttack) {
                    if(this.flip) {
                        fireBall = ig.game.spawnEntity('EntitySpell', this.pos.x - 64, this.pos.y);
                        fireBall.vel.x = -500;
                        setTimeout(() => {
                            fireBall.currentAnim.flip.x = true;
                        },10)
                    } else {
                        fireBall = ig.game.spawnEntity('EntitySpell', this.pos.x + 64, this.pos.y);
                        fireBall.vel.x = 500;
                        setTimeout(() => {
                            fireBall.currentAnim.flip.x = false;
                        },10)
                    }
                    this.isInCooldownAttack = true;

                } else if (!this.cooldownIsLoading) {
                    this.cooldownIsLoading = true;
                    setTimeout(() => {
                        this.isInCooldownAttack = false;
                        this.cooldownIsLoading = false;
                    }, 1000);
                }


            } else if (this.standing && ig.input.state('attack2')) {
                this.currentAnim = this.anims.attack2;
            } else if(this.vel.y < 0 && !this.standing) {
                this.currentAnim = this.anims.jump;
            } else if(this.vel.y > 0 && !this.standing) {
                this.currentAnim = this.anims.fall;
            } else if(this.vel.x != 0) {
                this.currentAnim = this.anims.run;
            } else {
                this.currentAnim = this.anims.idle;
            }

            
            this.parent();
        },

    });
});
