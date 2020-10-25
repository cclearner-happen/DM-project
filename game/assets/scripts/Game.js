const Player=require('Player');
const Ground=require('Ground');
cc.Class({
    extends: cc.Component,

    properties: {
        ground:{
            default:null,
            type:Ground
        },

        player:{
            default:null,
            type:Player
        },

        btnNode:{
            default:null,
            type:cc.Node
        },

        gameOverNode:{
            default:null,
            type:cc.Node
        },

        restartNode:{
            default:null,
            type:cc.Node
        },

        gameWinNode:{
            default:null,
            type:cc.Node
        },

        audioclip:{
            default:null,
            type:cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.enabled=false;
    },

    onStartGame:function(){
        this.enabled=true;
        this.btnNode.x=3000;
        this.gameOverNode.active=false;
        this.restartNode.active=false;
        this.gameWinNode.active=false;
        this.player.start();
        this.ground.start();
        this.timer = 0;

        let self=this;
        if (!self.audioclip) {
            var absolutePath="../../static//music/my_music.mp3"
            cc.assetManager.loadRemote(absolutePath,function(err,audioClip){
            self.audioclip=audioClip;
            cc.audioEngine.playMusic(audioClip,true);
            });
        }else{
            cc.audioEngine.playMusic(self.audioclip, true);
        }
    },

    update (dt) {
        //玩家超出屏幕范围则触发失败逻辑
        if(this.player.node.x>this.node.width/2||
            this.player.node.x<-this.node.width/2||
            this.player.node.y>this.node.height/2||
            this.player.node.y<-this.node.height/2){
                this.gameOver();
                this.enabled=false;
                return;
            } 
        if(this.timer>=19){
            this.gameWin();
            this.enabled=false;
        }
        this.timer += dt;
        console.log(this.timer);
    },

    gameOver:function(){
        this.gameOverNode.active=true;
        this.restartNode.active=true;
        this.player.enabled=false;
        this.player.stopMove();
        this.ground.stopMove();
        //停止背景音乐
        cc.audioEngine.stopMusic(this.audioclip);
    },

    gameWin:function(){
        this.gameWinNode.active=true;
        this.player.enabled=false;
        this.player.stopMove();
        cc.audioEngine.stopMusic(this.audioclip);
    },

    reloadScene:function(){
        //重新载入场景
        cc.director.loadScene('main');
    }
});
