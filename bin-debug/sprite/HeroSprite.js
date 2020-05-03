var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var HeroSprite = (function (_super) {
    __extends(HeroSprite, _super);
    function HeroSprite() {
        var _this = _super.call(this) || this;
        _this._isDetach = false;
        return _this;
    }
    HeroSprite.prototype.init = function () {
        // var rect:egret.Shape = new egret.Shape();
        // rect.width = 60;
        // rect.height = 60;
        // rect.graphics.beginFill(0xffffff);
        // rect.graphics.drawRect(0,0, 60,60);
        // rect.graphics.endFill();
        var rect = new egret.Bitmap();
        rect.texture = RES.getRes("rect");
        this.addChild(rect);
    };
    //将主角脱离 true
    HeroSprite.prototype.detach = function (isDetach) {
        this._isDetach = isDetach;
    };
    HeroSprite.prototype.isDetach = function () {
        return this._isDetach;
    };
    //获取主角中心x
    HeroSprite.prototype.getCenterX = function () {
        return this.x + this.width / 2;
    };
    //获取主角中心y
    HeroSprite.prototype.getCenterY = function () {
        return this.y + this.height / 2;
    };
    //主角运动 只有在脱离板子时才进行运动
    HeroSprite.prototype.logoc = function () {
        if (this._isDetach) {
            this.y -= 16;
        }
    };
    return HeroSprite;
}(egret.Sprite));
__reflect(HeroSprite.prototype, "HeroSprite");
//# sourceMappingURL=HeroSprite.js.map