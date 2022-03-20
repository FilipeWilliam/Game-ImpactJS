ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function(){
    EntityPlayer = ig.Entity.extend({

        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.ACTIVE,
        
        animSheet: new ig.AnimationSheet('media/run.png', 80, 75),
        size: {x: 40, y: 72},
        flip: false,
        accelGround: 200,
        accelAir: 310,
        jump: 360,
        friction: {x: 500, y: 0},
        maxVel: {x: 100, y: 160},


        init: function(x, y, settings){
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [1]);
            this.addAnim('run', 0.10, [1, 0]);
            this.addAnim('jump', 1, [2]);
            this.addAnim('fall', 0.4, [2]);
        },

        update: function(){
            // Add left/right movement logic
            var accel = this.standing ? this.accelGround : this.accelAir;
            if(ig.input.state('left')){
                this.accel.x = -accel;
                this.flip = true;
            } else if(ig.input.state('right')){
                this.accel.x = accel;
                this.flip = false;
            } else
                this.accel.x = 0;

            // Jumping logic: CASE 1
            if(this.standing && ig.input.state('jump')) {
                if(this.vel.y == 0) {
                    this.vel.y = -this.jump;
                    this.falling = false;
                }
            }

            // Jumping logic: CASE 2
            else if(!this.standing && !ig.input.state('jump') && !this.falling){
                this.vel.y = Math.floor(this.vel.y/3);
                this.falling = true;
            }

            this.currentAnim.flip.x = this.flip;

            this.parent();
            
            if(this.vel.y < 0 && !this.standing)
                this.currentAnim = this.anims.jump;
            else if(this.vel.y > 0 && !this.standing)
                this.currentAnim = this.anims.fall;
            else if(this.vel.x != 0)
                this.currentAnim = this.anims.run;
            else
                this.currentAnim = this.anims.idle;

        },

    });
});
