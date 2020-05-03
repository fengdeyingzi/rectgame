

class BoardSprite extends egret.Sprite{
    _sprite:egret.Sprite;
    _run_type:number;
    _direction:number; //运动方向
    _isSleep:boolean = false;
    _UP:number = 0;
    _DOWN:number = 1;
    _LEFT:number = 2;
    _RIGHT:number = 3;

    v:number = 3;

    constructor(){
        super();
    }

    public init(){
        var board:egret.Bitmap = new egret.Bitmap();
        board.texture = RES.getRes("board");
        this.addChild(board);
        this._direction = this._RIGHT;
        this.setRunType(0);
        this._sprite = null;
        this._isSleep = false;
    }

    //在板子上添加一个精灵
    public addSprite(sprite:egret.Sprite){
        if(!this._isSleep){
        this._sprite = sprite;
        sprite.x = this.x;
        sprite.y = this.y;
        this.setSleep(false);
        }
        
    }

    //移除一个精灵
    public removeSprite(sprite:egret.Sprite){
        this._sprite = null;
    }

    //获取精灵
    public getSprite():egret.Sprite{
        return this._sprite;
    }

    //设置板子是否休眠
    public setSleep(isSleep:boolean){
        this._isSleep = isSleep;
    }

    //
    public isSleep():boolean{
        return this._isSleep;
    }

    private getRandomNumInt(min: number, max: number) {
        var Range = max - min;
        var Rand = Math.random(); //获取[0-1）的随机数
        return (min + Math.round(Rand * Range)); //放大取整
    }

    //设置板子运动方式 0不运动 1只有在有精灵的情况下才运动 2只有在没精灵的情况下运动 3始终运动 
    public setRunType(runType:number){
        this._run_type = runType;
        this.v = this.getRandomNumInt(3,6);
    }


    //板子运动事件
    public logoc(stage:egret.Stage){
        
        switch(this._run_type){
            case 1:
            // if(this._sprite!=null){
            //     this.run(stage);
            // }
            if(this._sprite==null){
                this.run(stage);
            }
            break;
            case 2:
            if(this._sprite==null){
                this.run(stage);
            }
            break;
            case 3: //没有精灵才运动
            if(this._sprite==null){
                this.run(stage);
            }
            
        }
    }


    private run(stage:egret.Stage){
        var sw:number = stage.stageWidth;
        var sh:number = stage.stageHeight;
        switch(this._direction){
            case this._UP:
            this.y -= 3;
            if(this.getSprite()!=null){
                this.getSprite().y -= 3;
            }
            if((this.y<=0))this._direction = this._DOWN;
            break;
            case this._DOWN:
            this.y+= 3;
            if(this.getSprite()!=null){
                this.getSprite().y += 3;
            }
            if((this.y+this.height)>sh)this._direction = this._UP;
            break;
            case this._LEFT:
            this.x-=this.v;
            if(this.getSprite()!=null){
                this.getSprite().x -= 3;
            }
            if(this.x<=0)this._direction = this._RIGHT;
            break;
            case this._RIGHT:
            this.x+=this.v;
            if(this.getSprite()!=null){
                this.getSprite().x += 3;
            }
            if((this.x+this.width)>sw)this._direction = this._LEFT;
        }
        
    }

}