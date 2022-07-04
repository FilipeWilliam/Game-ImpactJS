ig.module(
    'game.entities.basePlayer'
  )
  .requires(
    'impact.entity',
    'impact.game',
    'game.entities.spell'
  )
  .defines(function () {
    BasePlayer = ig.Entity.extend({
      type: this.type,
      checkAgainst: this.checkAgainst,
      collides: this.collides,
      socketId: this.socketId,
      enemySocketId: this.enemySocketId,
      idleAnimationSheet: this.idleAnimationSheet,
      runAnimationSheet: this.runAnimationSheet,
      jumpAnimationSheet: this.jumpAnimationSheet,
      fallAnimationSheet: this.fallAnimationSheet,
      attack1AnimationSheet: this.attack1AnimationSheet,
      attack2AnimationSheet: this.attack2AnimationSheet,
      receiveDamageAnimationSheet: this.receiveDamageAnimationSheet,
      dieAnimationSheet: this.dieAnimationSheet,
      serverComunicationInterval: 10,
      enemyAnimation: 0,
      enemyFlip: 0,
      myAnimation: 0,
      isAttacking: false,
      isDie: false,
      isTakeDamage: false,
      isInTakeDamageAnimation: false,
      isDying: false,
      isInDiyngAnimation: false,
      flip: false,
      isInCooldownAttack: false,
      cooldownIsLoading: false,
      size: this.size,
      accelGround: this.accelGround,
      accelAir: this.accelAir,
      jump: this.jump,
      cooldownAttackTimeout: this.cooldownAttackTimeout,
      offset: this.offset,
      health: this.health,
      animationType: {
        IDLE: 0,
        JUMP: 1,
        FALL: 2,
        RUN: 3,
        ATTACKING: 4,
        TAKE_DAMAGE:5,
        DYING: 6,
      },
      maxVel: {
        x: 100,
        y: 300
      },
      friction: {
        x: 500,
        y: 0
      },

      init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.anims.idle = new ig.Animation(this.idleAnimationSheet, 0.1, [0, 1, 2, 3, 4, 5, 6, 7]);
        this.anims.run = new ig.Animation(this.runAnimationSheet, 0.1, [0, 1, 2, 3, 4, 5, 6, 7]);
        this.anims.jump = new ig.Animation(this.jumpAnimationSheet, 0.1, [0, 1]);
        this.anims.fall = new ig.Animation(this.fallAnimationSheet, 0.1, [0, 1]);
        this.anims.attack1 = new ig.Animation(this.attack1AnimationSheet, 0.1, [0, 1, 2, 3, 4, 5, 6]);
        this.anims.attack2 = new ig.Animation(this.attack2AnimationSheet, 0.1, [0, 1, 2, 3, 4, 5, 6]);
        this.anims.receiveDamage = new ig.Animation(this.receiveDamageAnimationSheet, 0.1, [0, 1, 2]);
        this.anims.die = new ig.Animation(this.dieAnimationSheet, 0.1, [0, 1, 2, 3, 4, 5, 6]);
      },

      update: function () {      
        if (this.pos.y > ig.system.heigth) {
          this.kill();
        }

        var accel = this.standing ? this.accelGround : this.accelAir;

        if(this.socketId === currentSocketId) {
          if (ig.input.state('left')) {
            this.moveLeft(accel);
          } else if (ig.input.state('right')) {
            this.moveRight(accel);
          } else {
            this.accel.x = 0;
          }

          if (this.standing && ig.input.state('jump') && this.vel.y == 0) {
            this.vel.y = -this.jump;
            this.falling = false;
          } else if (!this.standing && !ig.input.state('jump') && !this.falling) {
            this.vel.y = Math.floor(this.vel.y / 3);
            this.falling = true;
          }
  
          if (this.isDying) {
            if (!this.isInDiyngAnimation) {
              this.currentAnim = this.anims.die.rewind();
              this.myAnimation = this.animationType.DYING;
              this.isInDiyngAnimation = true;
            } else if (this.currentAnim.loopCount > 0) {
              this.kill();
              this.isDying = false;
              this.isInDiyngAnimation = false;
            }
  
          } else if (this.isTakeDamage) {
            if (!this.isInTakeDamageAnimation) {
              this.currentAnim = this.anims.receiveDamage.rewind();
              this.myAnimation = this.animationType.TAKE_DAMAGE;
              this.isInTakeDamageAnimation = true;
              this.receiveDamage(1);
            } else if (this.currentAnim.loopCount > 0) {
              this.isTakeDamage = false;
              this.isInTakeDamageAnimation = false;
            }
  
          } else if (!this.cooldownIsLoading && this.standing && ig.input.state('attack1')) {
            this.isAttacking = true;
            this.myAnimation = this.animationType.ATTACKING;
            this.currentAnim = this.anims.attack1.rewind();
            this.currentAnim.flip.x = this.flip;

            if (!this.isInCooldownAttack) {
              this.handleAttack();
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
          } else if (this.vel.y < 0 && !this.standing && !this.isAttacking) {
            this.myAnimation = this.animationType.JUMP;
            this.currentAnim = this.anims.jump;
          } else if (this.vel.y > 0 && !this.standing && !this.isAttacking) {
            this.myAnimation = this.animationType.FALL;
            this.currentAnim = this.anims.fall;
          } else if (this.vel.x != 0 && !this.isAttacking) {
            this.myAnimation = this.animationType.RUN;
            this.currentAnim = this.anims.run;
          } else if (!this.isAttacking) {
            this.myAnimation = this.animationType.IDLE;
            this.currentAnim = this.anims.idle;
          }
          
          if(this.serverComunicationInterval < 1) {
            this.serverComunicationInterval = 5;
            socket.emit('recieveData', this.pos.x, this.pos.y, this.myAnimation, this.flip, this.socketId);
          }

          this.serverComunicationInterval -= 1;
          this.parent();
        } else {
          switch(this.enemyAnimation) {
            case this.animationType.DYING:
              if (!this.isInDiyngAnimation) {
                this.currentAnim = this.anims.die.rewind();
                this.isInDiyngAnimation = true;
              } else if (this.currentAnim.loopCount > 0) {
                this.kill();
                this.isInDiyngAnimation = false;
              }
              break;

            case this.animationType.TAKE_DAMAGE: 
              this.currentAnim = this.anims.receiveDamage.rewind();
              this.currentAnim.flip.x =  this.enemyFlip;
              break;

            case this.animationType.JUMP: 
              this.currentAnim = this.anims.jump;
              this.currentAnim.flip.x =  this.enemyFlip;
              break;

            case this.animationType.RUN: 
              this.currentAnim = this.anims.run;
              this.currentAnim.flip.x =  this.enemyFlip;
              break;

            case this.animationType.IDLE:
              this.currentAnim = this.anims.idle;
              this.currentAnim.flip.x =  this.enemyFlip;
              break;

            case this.animationType.ATTACKING:
              this.currentAnim = this.anims.attack1;
              this.currentAnim.flip.x =  this.enemyFlip;
              break;

            case this.animationType.FALL:
              this.currentAnim = this.anims.fall;
              this.currentAnim.flip.x =  this.enemyFlip;
              break;
          }

          this.parent();
        }
      },

      handleAttack: function () {
        let attackProperties = this.createAttackProperties();
        let attackSettings = this.inheritSettings();
        let currentFlip = this.currentAnim.flip.x;

        setTimeout(() => {
          socket.emit('createAttack',  attackProperties, this.pos.y + 20, currentFlip, attackSettings);

          setTimeout(() => {
            this.isAttacking = false;
          }, 10)
        }, 600);
      },

      createAttackProperties: function () {
        let settings = {
          positionX: this.pos.x,
          attackVel: -100
        }

        if (this.flip) {
          settings.positionX -= 64;
          return settings;
        }

        settings.positionX += 64;
        settings.attackVel = settings.attackVel * -1;
        return settings;
      },

      inheritSettings: function () {
        return {
          type: this.type,
          checkAgainst: (this.type == ig.Entity.TYPE.A) ? ig.Entity.TYPE.B : ig.Entity.TYPE.A,
        }
      },

      moveLeft: function (accel) {
        this.flip = true;
        this.accel.x = -accel;
        this.currentAnim.flip.x = true;
      },

      moveRight: function (accel) {
        this.accel.x = accel;
        this.flip = false;
        this.currentAnim.flip.x = false;
      },

      handleDamageReceive: function () {
        if (this.health > 1) {
          this.isTakeDamage = true;
        } else {
          this.isDying = true;
        }
      }
    });
  });