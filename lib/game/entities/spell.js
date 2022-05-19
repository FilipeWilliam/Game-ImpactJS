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
        collides: ig.Entity.COLLIDES.ACTIVE,
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet('media/champions/wizard/fireball/fireball-sheet.png', 64, 32),
        size: {x: 53, y: 20},
        flip: true,

        handleMovementTrace: function( res ) {
            this.pos.x += this.vel.x * ig.system.tick;
            this.pos.y += this.vel.y * ig.system.tick;
        },

        init: function (x, y, settings) {
            this.anims.idle = new ig.Animation(this.animSheet, 0.1, [0, 1, 2, 3, 4]);
            this.parent(x, y, settings);
        },

        update: function () {
            this.currentAnim = this.anims.idle;
            this.parent();
        }
    })
})