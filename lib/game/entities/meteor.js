ig.module(
    'game.entities.meteor'
)
.requires(
    'impact.entity',
    'impact.game',
    'game.entities.spell'
)
.defines(function(){
    EntityMeteor = ig.Entity.extend({
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.PASSIVE,
        idleAnimationSheet: new ig.AnimationSheet('media/champions/Meteor Man/Idle.png', 162, 162),
        runAnimationSheet: new ig.AnimationSheet('media/champions/Meteor Man/Run.png', 162, 162),
        jumpAnimationSheet: new ig.AnimationSheet('media/champions/Meteor Man/Jump.png', 162, 162),
        fallAnimationSheet: new ig.AnimationSheet('media/champions/Meteor Man/Fall.png', 162, 162),
        attack1AnimationSheet: new ig.AnimationSheet('media/champions/Meteor Man/Attack1.png', 162, 162),
        attack2AnimationSheet: new ig.AnimationSheet('media/champions/Meteor Man/Attack2.png', 162, 162),
        size: {x: 15, y: 58},
        flip: false,
        accelGround: 200,
        accelAir: 310,
        jump: 200,
        cooldownAttackTimeout: 1000,
        isInCooldownAttack: false,
        cooldownIsLoading: false,
        maxVel: {x: 100, y: 300},
        friction: {x: 500, y: 0},
        offset: {x: 70, y: 40},
        isAttacking: false,

        init: function(x, y, settings){
            this.parent(x, y, settings);
            this.anims.idle = new ig.Animation( this.idleAnimationSheet, 0.1, [0,1,2,3,4,5,6,7] );
            this.anims.run = new ig.Animation( this.runAnimationSheet, 0.1, [0,1,2,3,4,5,6,7] );
            this.anims.jump = new ig.Animation( this.jumpAnimationSheet, 0.1, [0,1] );
            this.anims.fall = new ig.Animation( this.fallAnimationSheet, 0.1, [0,1] );
            this.anims.attack1 = new ig.Animation( this.attack1AnimationSheet, 0.1, [0,1,2,3,4,5,6] );
            this.anims.attack2 = new ig.Animation( this.attack2AnimationSheet, 0.1, [0,1,2,3,4,5,6]);
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


            if(!this.cooldownIsLoading && this.standing && ig.input.state('attack1')) {
                this.isAttacking = true;
                this.currentAnim = this.anims.attack1.rewind();
                let fireBall;
            
                if(!this.isInCooldownAttack) {
                    if(this.flip) {
                        setTimeout(() => {
                            fireBall = ig.game.spawnEntity('EntitySpell', this.pos.x - 64,  this.pos.y + 20);
                            fireBall.vel.x = -500;
                            setTimeout(() => {
                                fireBall.currentAnim.flip.x = true;
                                this.isAttacking = false;
                            },10)
                        }, 600);
                    } else {
                        setTimeout(() => {
                            fireBall = ig.game.spawnEntity('EntitySpell', this.pos.x, this.pos.y + 20);
                            fireBall.vel.x = 500;
                            setTimeout(() => {
                                fireBall.currentAnim.flip.x = false;
                                this.isAttacking = false;
                            },10)
                        }, 600);
                    }
                    this.isInCooldownAttack = true;

                } else if (!this.cooldownIsLoading) {
                    this.cooldownIsLoading = true;
                    setTimeout(() => {
                        this.isInCooldownAttack = false;
                        this.cooldownIsLoading = false;
                    }, 1000);
                }


            } else if (!this.cooldownIsLoading && this.standing && !this.isAttacking && ig.input.state('attack2')) {
                this.currentAnim = this.anims.attack2.rewind();
            } else if(this.vel.y < 0 && !this.standing && !this.isAttacking) {
                this.currentAnim = this.anims.jump;
            } else if(this.vel.y > 0 && !this.standing && !this.isAttacking) {
                this.currentAnim = this.anims.fall;
            } else if(this.vel.x != 0 && !this.isAttacking) {
                this.currentAnim = this.anims.run;
            } else if (!this.isAttacking) {
                this.currentAnim = this.anims.idle;
            }

            
            this.parent();
        },

    });
});
