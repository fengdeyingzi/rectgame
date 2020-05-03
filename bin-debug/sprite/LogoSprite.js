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
var LogoSprite = (function (_super) {
    __extends(LogoSprite, _super);
    function LogoSprite() {
        var _this = _super.call(this) || this;
        _this.isClose = false;
        _this.alpha = 1;
        return _this;
    }
    LogoSprite.prototype.init = function (stage) {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xffffff);
        bg.graphics.drawRect(0, 0, stage.stageWidth, stage.$stageHeight);
        bg.graphics.endFill();
        this.logo = new egret.Bitmap();
        this.logo.texture = RES.getRes("logo");
        this.logo.x = (stage.stageWidth - this.logo.width) / 2;
        this.logo.y = (stage.$stageHeight - this.logo.height) / 2;
        this.addChild(bg);
        this.addChild(this.logo);
        this.alpha = 1;
        this.logo.alpha = 0;
    };
    LogoSprite.prototype.logoc = function (stage) {
        console.log("logo run");
        if (!this.isClose) {
            var a = this.logo.alpha;
            a += 0.005;
            if (a > 1)
                a = 1;
            if (a < 0)
                a = 0;
            this.logo.alpha = a;
            if (this.logo.alpha >= 1) {
                this.onClose();
                this.isClose = true;
            }
        }
    };
    LogoSprite.prototype.setOnClose = function (onClose) {
        this.onClose = onClose;
    };
    return LogoSprite;
}(egret.Sprite));
__reflect(LogoSprite.prototype, "LogoSprite");
//# sourceMappingURL=LogoSprite.js.map