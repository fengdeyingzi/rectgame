// import {GameStage} from 'stage/GameStage';

class Main extends egret.DisplayObjectContainer {
    static instance?: egret.DisplayObjectContainer;
    static currentStage?: egret.DisplayObjectContainer;

    static nextState(state: egret.DisplayObjectContainer): void {
        if (Main.currentStage) {
          Main.instance!.removeChild(Main.currentStage);
        }
        Main.currentStage = state;
        
        Main.instance!.addChild(Main.currentStage);
      }

      
    


    public constructor() {
        super();
        Main.instance = this;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    

    

    private async onAddToStage(event: egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        
       
        this.stage.orientation = egret.OrientationMode.AUTO;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.addImage, this);
        await this.loadResource();
        // await RES.loadConfig("resource/default.res.json","resource/");
        // console.log("开始加载资源组");
        // await RES.loadGroup("game1");
        egret.lifecycle.addLifecycleListener((context) => {
            context.onUpdate = () => {
                this.onUpdate();
            }
        });

        egret.lifecycle.onPause = () => {
            console.log("onPause");
        }

        egret.lifecycle.onResume = () => {
            console.log("onResume");
        }




    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("game1", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }


    private addImage(){
        var gameStage = new LogoStage(this.stage!.stageWidth, this.stage!.stageHeight);
        Main.nextState(gameStage);
    }

     isOnUpdateListener(obj: any): obj is OnUpdateListener {
        return 'onUpdate' in obj && typeof obj.onUpdate === 'function';
      }

    onUpdate() {
        if (this.isOnUpdateListener(Main.currentStage)) {
            Main.currentStage.onUpdate();
          }
      }
    
}