ig.module(
        'game.entities.spell'
    )
    .requires(
        'impact.entity',
        'impact.entity-pool'
    )
    .defines(function () {
        EntitySpell = ig.Entity.extend({
            spellId: null,
            type: this.type,
            checkAgainst: this.checkAgainst,
            collides: ig.Entity.COLLIDES.LITE,
            serverComunicationInterval: 10,
            gravityFactor: 0,
            flip: true,
            maxVel: {
                x: 1000,
                y: 0,
            },
            size: {
                x: 35,
                y: 20
            },
            offset: {
                x: 20,
                y: 5
            },

            animSheet: new ig.AnimationSheet('media/champions/wizard/fireball/fireball-sheet.png', 64, 32),

            handleMovementTrace: function (res) {
                console.log(this.vel);
                this.pos.x += this.vel.x * ig.system.tick;
                this.pos.y += this.vel.y * ig.system.tick;
            },

            check: function (other) {
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
                if(this.serverComunicationInterval < 1 && !!this.pos.x) {
                    this.serverComunicationInterval = 5;
                    socket.emit('recieveDataSpell', this.pos.x, this.spellId);
                }
        
                this.serverComunicationInterval -= 1;
                this.parent();
            },

            removeIfOutOfScreen: function () {
                if (this.pos.x > ig.system.width) {
                    this.kill();
                }
            }
        });
    ig.EntityPool.enableFor( EntitySpell );
})