
cc.Class({
    extends: cc.Component,

    properties: {
        parent:{
            default:null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad () {
        this.RigidBody=this.getComponent(cc.RigidBody);
        
    },

    update (dt) {
        var rigid=this.parent.getComponent(cc.RigidBody);
        if(rigid.linearVelocity.x!=this.RigidBody.linearVelocity.x){
            var v=this.RigidBody.linearVelocity;
            v.x=rigid.linearVelocity.x;
            this.RigidBody.linearVelocity=v;
        }
    },
});
