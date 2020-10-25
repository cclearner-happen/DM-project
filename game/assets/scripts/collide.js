// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        this.touchingNumber = 0;
    },

    onCollisionEnter: function (other,self) {
        this.node.color = cc.Color.RED;
        this.touchingNumber ++;
    },

    onCollisionStay: function (other,self) { },
        
    onCollisionExit: function () {
        this.touchingNumber --;
        if (this.touchingNumber === 0) {
        this.node.color = cc.Color.WHITE; 
        }
    }
    // update (dt) {},
});
