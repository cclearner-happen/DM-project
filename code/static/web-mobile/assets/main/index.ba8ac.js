window.__require=function e(t,i,n){function o(s,r){if(!i[s]){if(!t[s]){var a=s.split("/");if(a=a[a.length-1],!t[a]){var d="function"==typeof __require&&__require;if(!r&&d)return d(a,!0);if(c)return c(a,!0);throw new Error("Cannot find module '"+s+"'")}s=a}var l=i[s]={exports:{}};t[s][0].call(l.exports,function(e){return o(t[s][1][e]||e)},l,l.exports,e,t,i,n)}return i[s].exports}for(var c="function"==typeof __require&&__require,s=0;s<n.length;s++)o(n[s]);return o}({Game:[function(e,t){"use strict";cc._RF.push(t,"9395b5ToqdBnpGDzhtpiLRV","Game");var i=e("Player"),n=e("Ground");cc.Class({extends:cc.Component,properties:{ground:{default:null,type:n},player:{default:null,type:i},btnNode:{default:null,type:cc.Node},gameOverNode:{default:null,type:cc.Node},restartNode:{default:null,type:cc.Node},gameWinNode:{default:null,type:cc.Node},audioclip:{default:null,type:cc.AudioClip}},onLoad:function(){this.enabled=!1},onStartGame:function(){this.enabled=!0,this.btnNode.x=3e3,this.gameOverNode.active=!1,this.restartNode.active=!1,this.gameWinNode.active=!1,this.player.start(),this.ground.start(),this.timer=0;var e=this;e.audioclip?cc.audioEngine.playMusic(e.audioclip,!0):cc.assetManager.loadRemote("../../static//music/my_music.mp3",function(t,i){e.audioclip=i,cc.audioEngine.playMusic(i,!0)})},update:function(e){if(this.player.node.x>this.node.width/2||this.player.node.x<-this.node.width/2||this.player.node.y>this.node.height/2||this.player.node.y<-this.node.height/2)return this.gameOver(),void(this.enabled=!1);this.timer>=19&&(this.gameWin(),this.enabled=!1),this.timer+=e,console.log(this.timer)},gameOver:function(){this.gameOverNode.active=!0,this.restartNode.active=!0,this.player.enabled=!1,this.player.stopMove(),this.ground.stopMove(),cc.audioEngine.stopMusic(this.audioclip)},gameWin:function(){this.gameWinNode.active=!0,this.player.enabled=!1,this.player.stopMove(),cc.audioEngine.stopMusic(this.audioclip)},reloadScene:function(){cc.director.loadScene("main")}}),cc._RF.pop()},{Ground:"Ground",Player:"Player"}],Ground:[function(e,t){"use strict";cc._RF.push(t,"c037f42znVC2L2l9z/WK2yL","Ground"),cc.Class({extends:cc.Component,properties:{speed:-100},onLoad:function(){this.RigidBody=this.getComponent(cc.RigidBody),this.enabled=!1},start:function(){this.enabled=!0;var e=this.RigidBody.linearVelocity;e.x=-100,this.RigidBody.linearVelocity=e},stopMove:function(){var e=this.RigidBody.linearVelocity;e.x=0,this.RigidBody.linearVelocity=e},update:function(){this.node.x<=-2320&&0!=this.RigidBody.linearVelocity.x&&this.stopMove()}}),cc._RF.pop()},{}],Player:[function(e,t){"use strict";cc._RF.push(t,"cd981n/8pFP0J/6fYUYELMu","Player"),cc.Class({extends:cc.Component,properties:{player:{default:null,type:cc.Node},direction:0,MOVE_SPEED:80,jumpHeight:65,jumpDuration:.5},onLoad:function(){this.enabled=!1,cc.director.getPhysicsManager().enabled=!0,this.RigidBody=this.player.getComponent(cc.RigidBody)},onDestroy:function(){cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyPressed,this),cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyReleased,this)},onKeyPressed:function(e){switch(e.keyCode){case cc.macro.KEY.d:case cc.macro.KEY.right:this.direction=1;break;case cc.macro.KEY.space:this.on_player_jump()}},onKeyReleased:function(e){switch(e.keyCode){case cc.macro.KEY.d:case cc.macro.KEY.right:this.direction=0}},update:function(){0!=this.direction?this.on_player_walk():this.player_stop()},start:function(){this.enabled=!0,cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyPressed,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyReleased,this)},stopMove:function(){this.node.stopAllActions()},on_player_walk:function(){var e=this.RigidBody.linearVelocity;e.x=this.MOVE_SPEED,this.RigidBody.linearVelocity=e},player_stop:function(){var e=this.RigidBody.linearVelocity;e.x=0,this.RigidBody.linearVelocity=e},runJumpAction:function(){var e=cc.tween().by(this.jumpDuration,{y:this.jumpHeight},{easing:"sineOut"}),t=cc.tween().by(this.jumpDuration,{y:-this.jumpHeight},{easing:"sineIn"});return cc.tween().sequence(e,t)},on_player_jump:function(){var e=this.runJumpAction();cc.tween(this.node).then(e).start()}}),cc._RF.pop()},{}],collide:[function(e,t){"use strict";cc._RF.push(t,"d2c7efah4NGXK5kT5n6Fqpj","collide"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){cc.director.getCollisionManager().enabled=!0,cc.director.getCollisionManager().enabledDebugDraw=!0,cc.director.getCollisionManager().enabledDrawBoundingBox=!0,this.touchingNumber=0},onCollisionEnter:function(){this.node.color=cc.Color.RED,this.touchingNumber++},onCollisionStay:function(){},onCollisionExit:function(){this.touchingNumber--,0===this.touchingNumber&&(this.node.color=cc.Color.WHITE)}}),cc._RF.pop()},{}],ground_control:[function(e,t){"use strict";cc._RF.push(t,"c54ea19a/1HdrVaJL0D1l8C","ground_control"),cc.Class({extends:cc.Component,properties:{parent:{default:null,type:cc.Node}},onLoad:function(){this.RigidBody=this.getComponent(cc.RigidBody)},update:function(){var e=this.parent.getComponent(cc.RigidBody);if(e.linearVelocity.x!=this.RigidBody.linearVelocity.x){var t=this.RigidBody.linearVelocity;t.x=e.linearVelocity.x,this.RigidBody.linearVelocity=t}}}),cc._RF.pop()},{}]},{},["Game","Ground","Player","collide","ground_control"]);