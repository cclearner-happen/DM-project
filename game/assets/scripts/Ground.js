cc.Class({
    extends: cc.Component,

    properties: {
        speed:-100
    },

    onLoad(){
        
        this.RigidBody=this.getComponent(cc.RigidBody);
        this.enabled=false;
    },

    start:function(){
        this.enabled=true;
        var v=this.RigidBody.linearVelocity;
        v.x=-100;
        this.RigidBody.linearVelocity=v;
    },

    stopMove:function(){
        var v=this.RigidBody.linearVelocity;
        v.x=0;
        this.RigidBody.linearVelocity=v;
    },
    update (dt) {
        if(this.node.x<=-2320&&this.RigidBody.linearVelocity.x!=0){
            this.stopMove();
        }
            
    },


});
