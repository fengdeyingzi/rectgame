
class Game extends egret.DisplayObjectContainer {

    // var spr_hero:egret.Sprite;
    list_background: egret.Bitmap[] = new Array<egret.Bitmap>();
    list_board: BoardSprite[] = new Array<BoardSprite>();
    hero: HeroSprite = new HeroSprite();
    //提示文字
    infoText: egret.TextField = new egret.TextField();
    //游戏状态 -1 未运行 0 未开始 1 已开始 2 暂停 3 结束
    gameState: number = -1;
    logoSprite:LogoSprite = new LogoSprite();


    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);


    }

    onTouchDown(event: egret.TouchEvent) {
        console.log("onTouchDown : " + event.stageX + " " + event.stageY);
    }

    onTouchMove(event: egret.TouchEvent) {
        console.log("onTouchMove:" + event.stageX + " " + event.stageY);
    }

    onTouchUp(event: egret.TouchEvent) {
        console.log("onTouchUp" + event.stageX + " " + event.stageY);
        if (this.gameState == 0) {
            if (this.getChildByName("info_text") != null) {
                this.removeChild(this.infoText);
            }
            this.setGameState(1);
            //将方块脱离
            this.hero.detach(true);
        }

        if (this.gameState == 3) {
            this.setGameState(0);
        }

        if (this.gameState == 1) {

            //将方块脱离
            for (var i = 0; i < this.list_board.length; i++) {
                if (this.list_board[i].getSprite() != null) {
                    this.hero.detach(true);
                    this.list_board[i].removeSprite(this.hero);
                    this.list_board[i].setSleep(true);
                    console.log("方块脱离",this.list_board[i].y);
                }
            }


        }

        console.log("当前游戏状态：" + this.gameState);


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


    private async onAddToStage(event: egret.Event) {
        
        
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchUp, this);
        this.stage.orientation = egret.OrientationMode.AUTO;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.addImage, this);
        await this.loadResource();
        // await RES.loadConfig("resource/default.res.json","resource/");
        // console.log("开始加载资源组");
        // await RES.loadGroup("game1");
        egret.lifecycle.addLifecycleListener((context) => {
            context.onUpdate = () => {
                // console.log("onUpdate");
                this.logoSprite.logoc(this.stage);
                if (this.list_background != null && this.gameState != -1) {
                    if (this.list_background[0].y == this.list_background[1].y) {
                        this.list_background[1].y += this.stage.stageHeight;
                    }
                    for (var i: number = 0; i < this.list_background.length; i++) {
                        // console.log(""+i + " "+this.list_background[i].y);
                        this.list_background[i].y += 1;
                        if (this.list_background[i].y > this.stage.stageHeight) {
                            for (var j = 0; j < this.list_background.length; j++) {
                                this.list_background[j].y -= this.stage.stageHeight;
                            }

                        }
                    }

                    this.hero.logoc();

                    for (var n = 0; n < this.list_board.length; n++) {
                        this.list_board[n].logoc(this.stage);
                    }
                    //判断死亡
                    if (this.hero.y < 0 && this.gameState!=3) {
                        this.setGameState(3);

                    }
                    //判断板子是否接住方块
                    for (var nn = 0; nn < this.list_board.length; nn++) {
                        if (!this.list_board[nn].isSleep() && this.list_board[nn].getSprite()==null) {
                            if (this.list_board[nn].hitTestPoint(this.hero.getCenterX(), this.hero.getCenterY())) {
                                this.list_board[nn].addSprite(this.hero);
                                this.hero.detach(false);
                                console.log("接住方块");
                                
                            }
                        }
                    }

                    this.cameraRun();
                }
            }
        });

        egret.lifecycle.onPause = () => {
            console.log("onPause");
        }

        egret.lifecycle.onResume = () => {
            console.log("onResume");
        }




    }

    //设置游戏状态
    private setGameState(state: number) {
        this.gameState = state;
        console.log("切换游戏状态："+state);
        if (this.gameState == 0) {
            this.infoText.text = "点击屏幕\n将方块投进目标位置";
            if (this.getChildByName("info_text") == null) {
                this.addChild(this.infoText);
            }
            for(var i=0;i<this.list_board.length;i++){
                this.list_board[i].init();
                this.list_board[i].x = (this.stage.stageWidth-this.list_board[i].width)/2;
                this.list_board[i].y = i*400+480;
                
                console.log("初始化方块：",i*400+480)
                if(i==1){
                    this.hero.detach(false);
                    this.list_board[i].addSprite(this.hero);
                    
                }
            }
        }
        if (this.gameState == 1) {
            if (this.getChildByName("info_text") != null) {
                this.removeChild(this.infoText);
            }
        }
        if (this.gameState == 3) {
            if (this.getChildByName("info_text") == null) {
                this.addChild(this.infoText);
            }
            this.infoText.text = "游戏结束\n点击屏幕重新开始";
            
        }
    }

//刷新板子
private refBoard(){
    console.log("刷新板子");
    for(var i=0;i<this.list_board.length;i++){
        if(this.list_board[i].isSleep()){
            this.list_board[i].setSleep(false);
            this.list_board[i].x = this.hero.x;
            this.list_board[i].y -= 400*2;
            this.list_board[i].setRunType(this.getRandomNumInt(0,3));
        }
    }
}

  private getRandomNumInt(min: number, max: number) {
        var Range = max - min;
        var Rand = Math.random(); //获取[0-1）的随机数
        return (min + Math.round(Rand * Range)); //放大取整
    }


    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private addImage() {
        console.log("addImage");
        // alert("舞台宽高："+this.stage.stageWidth);
        var background1: egret.Bitmap = this.createBitmapByName("background1");
        background1.width = this.stage.stageWidth;
        background1.height = this.stage.stageHeight;
        this.addChild(background1);


        var background2: egret.Bitmap = this.createBitmapByName("background1");
        background2.x = 0;
        background2.y = this.stage.stageHeight;
        background2.width = this.stage.stageWidth;
        background2.height = this.stage.stageHeight;
        this.addChild(background2);
        this.list_background.push(background1);
        this.list_background.push(background2);
        background1.y = 0;
        background2.y = this.stage.stageHeight;



        // let icon = this.createBitmapByName("egret_icon_png");
        // this.addChild(icon);
        // icon.x = 26;
        // icon.y = 33;
        // background.graphics.beginFill(0xffffff);
        // background.graphics.endFill();
        //添加一个board
        var board1 = new BoardSprite();
        board1.init();
        var board2 = new BoardSprite();
        board2.init();
        var board3 = new BoardSprite();
        this.list_board.push(board1);
        this.list_board.push(board2);
        this.list_board.push(board3);
        this.addChild(board1);
        this.addChild(board2);
        this.addChild(board3);

        //添加主角
        var hero = new HeroSprite();
        hero.init();
        this.hero = hero;
        this.addChild(this.hero);
        //初始化坐标
        board1.x = (this.stage.stageWidth - board1.width) / 2;
        board2.x = (this.stage.stageWidth - board2.width) / 2;
        board3.x = (this.stage.stageWidth - board3.width) / 2;
        hero.x = (this.stage.stageWidth - hero.width) / 2;
        hero.y = this.stage.stageHeight * 4 / 5;
        // board2.y = hero.y;
        board2.addSprite(hero);
        board1.y = hero.y - 400;
        board3.y = hero.y + 400;
        board1.setRunType(0);
        board2.setRunType(0);
        board3.setRunType(0);
        board1.setSleep(false);
        board2.setSleep(false);
        board3.setSleep(false);
        this.infoText.x = 0;
        this.infoText.width = this.stage.stageWidth;
        this.infoText.height = 280;
        this.infoText.y = this.stage.stageHeight / 2;
        this.infoText.textAlign = egret.HorizontalAlign.CENTER;
        this.infoText.text = "点击屏幕\n将方块投进目标位置";
        this.infoText.textColor = 0xffffff;
        this.infoText.name = "info_text";
        this.addChild(this.infoText);
        this.setGameState(0);
        this.logoSprite = new LogoSprite();
        this.logoSprite.init(this.stage);
        this.addChild(this.logoSprite);
        this.logoSprite.setOnClose(()=>{
            this.onLogoClose();
        });

    }

    private onLogoClose(){
        this.removeChild(this.logoSprite);
    }

    //模拟相机移动
    private cameraRun() {
        var v = 6;
        var isOut: boolean = false;//是否超出屏幕
        for (var k = 0; k < this.list_board.length; k++) {
            if (this.list_board[k].y < 80) {
                isOut = true;
                
                break;
            }
        }
        if(this.hero.y < 800) isOut = true;
        if (!this.hero.isDetach() && isOut) {
            this.hero.y += v;
            for (var i = 0; i < this.list_board.length; i++) {
                this.list_board[i].y += v;
                if(this.list_board[i].y > this.stage.stageHeight){
                    //刷新板子
                this.refBoard();
                }
            }
        }

    }

}