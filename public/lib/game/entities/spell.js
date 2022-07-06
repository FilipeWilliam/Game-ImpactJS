ig.module(
        'game.entities.spell'
    )
    .requires(
        'impact.entity',
        'impact.game',
        'impact.entity-pool',
        )
    .defines(function () {
        EntitySpell = ig.Entity.extend({
            spellId: null,
            type: this.type,
            checkAgainst: this.checkAgainst,
            collides: ig.Entity.COLLIDES.LITE,
            serverComunicationInterval: 10,
            gravityFactor: 0,
            animationSpell: this.animationSpell,
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

            handleMovementTrace: function (res) {
                this.pos.x += this.vel.x * ig.system.tick;
                this.pos.y += this.vel.y * ig.system.tick;
            },

            collideWith: function (other) {
                this.kill();
                other.handleDamageReceive();
            },

            init: function (x, y, settings) {
                this.anims.idle = new ig.Animation(this.animationSpell, 0.1, [0, 2, 1, 4, 3]);
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