ig.module(
    'game.entities.spell'
)
.requires(
    'impact.entity'
)
.defines(function () {
    EntitySpell = ig.Entity.extend({
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.LITE,
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet('media/champions/wizard/fireball/fireball-sheet.png', 64, 32),
        size: {x: 35, y: 20},
        offset: {x: 20, y: 5},
        flip: true,

        handleMovementTrace: function( res ) {
            this.pos.x += this.vel.x * ig.system.tick;
            this.pos.y += this.vel.y * ig.system.tick;
        },

        collideWith: function (other, axis) {
            this.kill();
            other.handleDamageReceive();
        },

        init: function (x, y, settings) {
            this.anims.idle = new ig.Animation(this.animSheet, 0.1, [0, 2, 1, 4, 3]);
            this.parent(x, y, settings);
        },

        update: function () {
            this.removeIfOutOfScreen();
            this.currentAnim = this.anims.idle;
            this.parent();
        },

        removeIfOutOfScreen: function () {
            if(this.pos.x > ig.system.width){
                this.kill();
            }
        }
    })
})