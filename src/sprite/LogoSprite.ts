

class LogoSprite extends egret.Sprite {

    isClose: boolean = false;
    logo:egret.Bitmap;
    onClose: Function;
    constructor() {
        super();
        this.alpha = 1;
    }


    public init(stage:egret.Stage) {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xffffff);
        bg.graphics.drawRect(0,0,stage.stageWidth,stage.$stageHeight);
        bg.graphics.endFill();
        this.logo = new egret.Bitmap();
        this.logo.texture = RES.getRes("logo");
        this.logo.x = (stage.stageWidth-this.logo.width)/2;
        this.logo.y = (stage.$stageHeight-this.logo.height)/2;
        this.addChild(bg);
        this.addChild(this.logo);
        this.alpha = 1;
        this.logo.alpha = 0;

    }

    public logoc(stage: egret.Stage) {
        console.log("logo run");
        if (!this.isClose) {
            var a = this.logo.alpha;
            a += 0.005;
            if (a > 1) a = 1;
            if (a < 0) a = 0;
            this.logo.alpha = a;
            if (this.logo.alpha >= 1) {
                this.onClose();
                this.isClose = true;
            }
        }


    }

    public setOnClose(onClose: Function) {
        this.onClose = onClose;
    }
}