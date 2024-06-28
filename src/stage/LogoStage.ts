

class LogoStage extends egret.DisplayObjectContainer implements OnUpdateListener{
    logoSprite:LogoSprite = new LogoSprite();
    stageWidth:number
    stageHeight:number

    public constructor(stageWidth:number, stageHeight:number){
        super();
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    onAddToStage(){
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        console.log("onAddToStage","LogoStage");
        this.logoSprite = new LogoSprite();
        this.logoSprite.init(this.stage);
        this.addChild(this.logoSprite);
        this.logoSprite.setOnClose(()=>{
            this.onLogoClose();
        });
        
    }

    private onLogoClose(){
        
        // this.removeChild(this.logoSprite);
        Main.nextState(new GameStage(this.stageWidth, this.stageHeight));
    }

    onUpdate(){
        this.logoSprite.logoc(this.stage);
    }
}