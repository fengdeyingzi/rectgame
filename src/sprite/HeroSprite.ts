
class HeroSprite extends egret.Sprite {
     _isDetach:boolean = false;

    constructor() {
        super();

    }

    public init(){
        // var rect:egret.Shape = new egret.Shape();
        // rect.width = 60;
        // rect.height = 60;
        // rect.graphics.beginFill(0xffffff);
        // rect.graphics.drawRect(0,0, 60,60);
        // rect.graphics.endFill();
        var rect:egret.Bitmap = new egret.Bitmap();
        rect.texture = RES.getRes("rect");
        this.addChild(rect);
    }

    //将主角脱离 true
    public detach(isDetach:boolean){
        this._isDetach = isDetach;
    }

public isDetach():boolean{
    return this._isDetach;
}

    //获取主角中心x
    public getCenterX():number{
        return this.x+this.width/2;
    }

    //获取主角中心y
    public getCenterY():number{
        return this.y+this.height/2;
    }

    //主角运动 只有在脱离板子时才进行运动
    public logoc(){
        if(this._isDetach){
            this.y-=16;
        }
    }

}