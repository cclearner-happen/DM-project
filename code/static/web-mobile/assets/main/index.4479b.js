window.__require=function e(t,i,o){function n(r,a){if(!i[r]){if(!t[r]){var s=r.split("/");if(s=s[s.length-1],!t[s]){var d="function"==typeof __require&&__require;if(!a&&d)return d(s,!0);if(c)return c(s,!0);throw new Error("Cannot find module '"+r+"'")}r=s}var u=i[r]={exports:{}};t[r][0].call(u.exports,function(e){return n(t[r][1][e]||e)},u,u.exports,e,t,i,o)}return i[r].exports}for(var c="function"==typeof __require&&__require,r=0;r<o.length;r++)n(o[r]);return n}({Game:[function(e,t){"use strict";cc._RF.push(t,"9395b5ToqdBnpGDzhtpiLRV","Game");var i=e("Player"),o=e("Ground");cc.Class({extends:cc.Component,properties:{ground:{default:null,type:o},player:{default:null,type:i},btnNode:{default:null,type:cc.Node},gameOverNode:{default:null,type:cc.Node},restartNode:{default:null,type:cc.Node},gameWinNode:{default:null,type:cc.Node},audioclip:{default:null,type:cc.AudioClip},mgr:cc.Node,item:cc.Prefab},onLoad:function(){this.enabled=!1;for(var e=0;e<40;e++){var t=cc.instantiate(this.item);this.mgr.addChild(t),t.y=0,t.x=28*e-560+14}window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext||window.msAudioContext},onStartGame:function(){this.enabled=!0,this.btnNode.x=3e3,this.gameOverNode.active=!1,this.restartNode.active=!1,this.gameWinNode.active=!1,this.player.start(),this.ground.start(),this.timer=0;var e=this;cc.assetManager.loadRemote("../../static//music/my_music.mp3",function(t,i){e.audioclip=i;var o=new(0,window.AudioContext);e.audioBufferSourceNode=o.createBufferSource(),e.audioBufferSourceNode.buffer=i._audio,e.analyser=o.createAnalyser(),e.analyser.fftSize=256,e.audioBufferSourceNode.connect(e.analyser),e.analyser.connect(o.destination),e.audioBufferSourceNode.start(0)})},update:function(e){if(this.player.node.x>this.node.width/2||this.player.node.x<-this.node.width/2||this.player.node.y>this.node.height/2||this.player.node.y<-this.node.height/2)return this.gameOver(),void(this.enabled=!1);this.timer>=19&&(this.gameWin(),this.enabled=!1),this.timer+=e,this.analyser&&(this.dataArray=new Uint8Array(this.analyser.frequencyBinCount),this.analyser.getByteFrequencyData(this.dataArray),this.draw(this.dataArray))},draw:function(e){for(var t=0;t<40;t++){var i=1.2*e[3*t];i<5&&(i=5);var o=this.mgr.children[t];o.height=cc.misc.lerp(o.height,i,.4)}},gameOver:function(){this.gameOverNode.active=!0,this.restartNode.active=!0,this.player.enabled=!1,this.player.stopMove(),this.ground.stopMove(),this.audioBufferSourceNode.stop()},gameWin:function(){this.gameWinNode.active=!0,this.player.enabled=!1,this.player.stopMove(),this.audioBufferSourceNode.stop()},reloadScene:function(){cc.director.loadScene("main")}}),cc._RF.pop()},{Ground:"Ground",Player:"Player"}],Ground:[function(e,t){"use strict";cc._RF.push(t,"c037f42znVC2L2l9z/WK2yL","Ground"),cc.Class({extends:cc.Component,properties:{speed:-100},onLoad:function(){this.RigidBody=this.getComponent(cc.RigidBody),this.enabled=!1},start:function(){this.enabled=!0;var e=this.RigidBody.linearVelocity;e.x=-100,this.RigidBody.linearVelocity=e},stopMove:function(){var e=this.RigidBody.linearVelocity;e.x=0,this.RigidBody.linearVelocity=e},update:function(){this.node.x<=-2320&&0!=this.RigidBody.linearVelocity.x&&this.stopMove()}}),cc._RF.pop()},{}],Player:[function(e,t){"use strict";cc._RF.push(t,"cd981n/8pFP0J/6fYUYELMu","Player"),cc.Class({extends:cc.Component,properties:{player:{default:null,type:cc.Node},direction:0,MOVE_SPEED:80,jumpHeight:65,jumpDuration:.5},onLoad:function(){this.enabled=!1,cc.director.getPhysicsManager().enabled=!0,this.RigidBody=this.player.getComponent(cc.RigidBody)},onDestroy:function(){cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyPressed,this),cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyReleased,this)},onKeyPressed:function(e){switch(e.keyCode){case cc.macro.KEY.d:case cc.macro.KEY.right:this.direction=1;break;case cc.macro.KEY.space:this.on_player_jump()}},onKeyReleased:function(e){switch(e.keyCode){case cc.macro.KEY.d:case cc.macro.KEY.right:this.direction=0}},update:function(){0!=this.direction?this.on_player_walk():this.player_stop()},start:function(){this.enabled=!0,cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyPressed,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyReleased,this)},stopMove:function(){this.node.stopAllActions()},on_player_walk:function(){var e=this.RigidBody.linearVelocity;e.x=this.MOVE_SPEED,this.RigidBody.linearVelocity=e},player_stop:function(){var e=this.RigidBody.linearVelocity;e.x=0,this.RigidBody.linearVelocity=e},runJumpAction:function(){var e=cc.tween().by(this.jumpDuration,{y:this.jumpHeight},{easing:"sineOut"}),t=cc.tween().by(this.jumpDuration,{y:-this.jumpHeight},{easing:"sineIn"});return cc.tween().sequence(e,t)},on_player_jump:function(){var e=this.runJumpAction();cc.tween(this.node).then(e).start()}}),cc._RF.pop()},{}],collide:[function(e,t){"use strict";cc._RF.push(t,"d2c7efah4NGXK5kT5n6Fqpj","collide"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){cc.director.getCollisionManager().enabled=!0,cc.director.getCollisionManager().enabledDebugDraw=!0,cc.director.getCollisionManager().enabledDrawBoundingBox=!0,this.touchingNumber=0},onCollisionEnter:function(){this.node.color=cc.Color.RED,this.touchingNumber++},onCollisionStay:function(){},onCollisionExit:function(){this.touchingNumber--,0===this.touchingNumber&&(this.node.color=cc.Color.WHITE)}}),cc._RF.pop()},{}],ground_control:[function(e,t){"use strict";cc._RF.push(t,"c54ea19a/1HdrVaJL0D1l8C","ground_control"),cc.Class({extends:cc.Component,properties:{parent:{default:null,type:cc.Node}},onLoad:function(){this.RigidBody=this.getComponent(cc.RigidBody)},update:function(){var e=this.parent.getComponent(cc.RigidBody);if(e.linearVelocity.x!=this.RigidBody.linearVelocity.x){var t=this.RigidBody.linearVelocity;t.x=e.linearVelocity.x,this.RigidBody.linearVelocity=t}}}),cc._RF.pop()},{}]},{},["Game","Ground","Player","collide","ground_control"]);