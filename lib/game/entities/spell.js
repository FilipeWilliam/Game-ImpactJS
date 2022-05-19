ig.module(
    'game.entities.spell'
)
.requires(
    'impact.entity'
)
.defines(function () {
    EntitySpell = ig.Entity.extend({
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet('media/champions/wizard/fireball/fireball-sheet.png', 64, 32),
        size: {x: 20, y: 20},
        flip: true,

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