class Main extends eui.UILayer {
    private static WIDTH = 1080;
    private static HEIGHT = 1920;
    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView: LoadingUI;
    /**
       * 屏幕宽
       */
    private ScreenWidth: number;
    /**
     * 屏幕高
     */
    private ScreenHeight: number;
    /**
     * 玩牌区7列牌组的Group数组
     */
    private myColumn: egret.Sprite[];
    /**
     * 提交区4列牌组的Group数组，每列最下方有一张底图
     */
    private mySuit: egret.Sprite[];
    /**
     * 废牌区牌组的Group
     */
    private myWaste: egret.Sprite;
    /**
     * 手牌区牌组的Group，最下方有一张底图
     */
    private myFree: egret.Sprite;
    /**
     * 游戏的牌组数据
     */
    private solitaire: Solitaire;
    /**
     * 所做有效操作的记录
     */
    private record: Records[];
    /**
     * 点击回退按钮的次数
     */
    private touchCount: number;
    /**
     * 点击移牌的张数
     */
    private clickDragCardCount: number;
    /**
     * 竖屏下收，废，手牌区距顶部的距离
     */
    private firstTop: number;
    /**
     * 竖屏下收，废，手牌区距玩牌区的距离
     */
    private SecondTop: number;
    /**
     * 是否横屏
     */
    private isCrossScreen: boolean;

    /**
     * 收，废，手牌区的Group
     */
    private myGroup: egret.Sprite;
    /**
     * 收牌区Group
     */
    private mySuitBg: egret.Sprite;
    /**
     * 手牌区Group
     */
    private myFreeBg: egret.Sprite;
    /**
     * 玩牌区Group
     */
    private myColumns: egret.Sprite;
    /**
     * 点击手牌区的次数
     */
    private onclickCount: number;
    /**
     * 手牌区的默认图
     */
    private handsBgImage: eui.Image;
    /**
     * 游戏背景图
     */
    private backGroundImage: eui.Image;
    /**
     * 玩牌区7列的默认图的数组
     */
    private columnBgImage: eui.Image[];
    /**
     * 下方游戏按钮点击后的界面：
     * 1.随机发牌
     * 2.重玩本局
     * 3.取消
     */
    private gameGroup: egret.Sprite;
    /**
     * 点击下方设置按钮出现的设置界面
     */
    private settingsGroup: egret.Sprite;
    /**
     * 底部按钮的Group
     */
    private bottomGroup: egret.Sprite;
    /**
     * 计时器是否开始计时
     */
    private isStart: boolean;
    /**
     * 显示时间的TextField 
     */
    private timeText: egret.TextField;
    /**
     * 计时器 
     */
    private timer: egret.Timer;
    /**
     * 显示成绩的TextField 
     */
    private scoreText: egret.TextField;
    /**
     * 显示移动步数的TextField 
     */
    private movesText: egret.TextField;
    /**
     * 成绩
     */
    private score: number;
    /**
     * 移动步数
     */
    private moves: number;
    /**
     * 判断是否重复点击手牌区的变量
     */
    private isLoopDraw: boolean;
    /**
     * 设置界面的滚动区域scroller
     */
    private scroller: eui.Scroller;
    /**
     * 设置界面滚动区域的视口，scrollerViewport
     */
    private scrollerViewport: eui.Group;
    /**
     * 点击到的那张牌
     */
    private dblCardGroup: CardGroup;

    /**
     * 收牌特效的上面一条
     */
    private topParticle: particle.GravityParticleSystem;
    /**
     * 收牌特效的下面一条
     */
    private bottomParticle: particle.GravityParticleSystem;
    /**
     * 收牌特效的左边一条
     */
    private leftParticle: particle.GravityParticleSystem;
    /**
     * 收牌特效的右边一条
     */
    private rightParticle: particle.GravityParticleSystem;
    /**
     * 移动牌的Group
     */
    private draggedObject: CardGroup;
    /**
     * 点击点x坐标和牌的x坐标差值
     */
    private offsetX: number;
    /**
     * 点击点y坐标和牌的y坐标差值
     */
    private offsetY: number;
    /**
     * 点击点的x坐标
     */
    private beginX: number;
    /**
     * 点击点的y坐标
     */
    private beginY: number;
    /**
     * 点击移动的牌的数据,Card
     */
    private dragCard: Card;
    /**
     * 开始点击的牌处于玩牌区的列数。
     */
    private beginColumnsI: number;
    /**
     * 开始点击的牌处于收牌区的列数。
     */
    private beginSuitsI: number;
    /**
     * 语言：中文，英文，繁体
     */
    private language: string;
    /**
     * 语言配置文件加载的json
     */
    private textValue: JSON;
    /**
     * 游戏所用语言对应的json数据
     */
    private textDatas: JSON;

    /**
     * 下方设置按钮区域的Group
     */
    private settings: eui.Group;
    /**
     * 下方蝙蝠玩按钮区域的Group
     */
    private batGame: eui.Group;
    /**
     * 下方游戏按钮区域的Group
     */
    private game: eui.Group;
    /**
     * 下方提示按钮区域的Group
     */
    private hint: eui.Group;
    /**
     * 下方回退按钮区域的Group
     */
    private restore: eui.Group;
    /**
     * 设置界面的标题
     */
    private settingsTitle: eui.Label;
    /**
     * 设置界面的设置项的Group数组
     */
    private settingsButtonGroups: egret.Sprite[];
    /**
     * 游戏规则
     */
    private gameRules: eui.Label;

    /**
     * 点击移牌设置项：1.开2.关3.自动
     * 默认是3.自动
     */
    private isDblclick: number;
    /**
     * 当前计分类型：1.无 2.标准 3.维加斯
     * 默认为标准
     */
    private scoreType: number;
    /**
     * 下一次游戏的计分类型：
     */
    private nextScoreType: number;
    /**
     * 翻手牌区所有牌的次数
     */
    private drowCount: number;
    /**
     * 重力感应设置项，默认为自动
     */
    private Orientation: number;
    /**
     * web下横屏缩放比x
     */
    private scaleXX: number;
    /**
     * web下横屏缩放比y
     */
    private scaleYY: number;
    /**
     * 是否移动
     */
    private isMove: boolean;
    /**
     * 发牌音效
     */
    private dealSound: egret.Sound;
    /**
     * 翻牌音效
     */
    private flopSound: egret.Sound;
    /**
     * 收牌音效
     */
    private soundSound: egret.Sound;
    /**
     * 是否完成游戏
     */
    private isOverGame: boolean;
    /**
     * 结束界面动画MovieClip
     */
    private mc: egret.MovieClip;
    /**
     * 结束界面，计分模式和移牌张数
     */
    private modeDraw: eui.Label;
    /**
     * 结束界面，成绩标题
     */
    private scoreLabel: eui.Label;
    /**
     * 结束界面，步数标题
     */
    private movesLabel: eui.Label;
    /**
     * 结束界面，时间标题
     */
    private timeLabel: eui.Label;
    /**
     * 结束界面，成绩数据
     */
    private scoreData: eui.Label;
    /**
     * 结束界面，步数数据
     */
    private movesData: eui.Label;
    /**
     * 结束界面，时间数据
     */
    private timeData: eui.Label;
    /**
     * 结束界面，下方重新开始新游戏的按钮
     */
    private newGameButton: eui.Image;
    /**
     * 结束界面，下方重新开始新游戏按钮上的字
     */
    private newGameButtonLabel: eui.Label
    /**
     * 原始宽
     */
    private defaultWidth: number;
    /**
     * 原始高
     */
    private defaultHeight: number;
    /**
     * 玩牌区每一列的宽度和其间隔所占大小
     */
    private columnI_X: number;
    /**
     * 音量
     */
    private soundVolume: number;
    /**
     * 设置界面的背景图
     */
    private settingsBGBitmap: egret.Bitmap;
    /**
     * 设置界面顶部区域Group
     */
    private settingsTopGroup: egret.Sprite;
    /**
     * 顶部字的半透明底
     */
    private topShape: egret.Shape;
    /** 
     * if(orientation == "landscape_left") this.leftScreen = false;
     * else if(orientation == "landscape_right") this.leftScreen = true;
     */
    private leftScreen: boolean;
    /**
     * 是否发牌完成
     */
    private isOverDeal: boolean;
    /**
     * 打开设置或者游戏按钮界面的半透明底
     */
    private shp: egret.Shape;
    /**
     * 点击游戏按钮的界面上按钮的图.
     * 1.随机发牌
     * 2.重玩本局
     * 3.取消
     */
    private buttonGameImage: eui.Image;
    /**
     * 结束界面的group
     */
    private wonGroup: eui.Group;
    /**
     * 顶部阴影高度
     */
    private topH: number;
    /**
     * 顶部字体大小
     */
    private topSize: number;

    private hintType: number;

    private vegasCumulativeType: number;

    private constructor() {
        super();
        this.mGroup = new eui.Group();
        this.mGroup.width = Main.WIDTH;
        this.mGroup.height = Main.HEIGHT;
        this.mGroup.touchEnabled = true;
        this.addChild(this.mGroup);
        this.mGroup.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);

        this.backGroundImage = new eui.Image();
        this.backGroundImage.percentWidth = this.backGroundImage.percentHeight = 100;
        this.mGroup.addChild(this.backGroundImage);
        this.backGroundImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this);

        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB || egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddStage, this);
        }

        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        this.addEventListener(egret.Event.CLOSE, this.saveScore, this);
    }

    protected createChildren(): void {
        super.createChildren();

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
    }
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        let theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.addChild(this.loadingView);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }
    private isThemeLoadEnd: boolean = false;
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }
    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            // if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
            //     this.messageToNative();
            // }
            this.createScene();
        }
    }

    private test: eui.Label;
    private mGroup: eui.Group;

    /**
     * 和navite消息交互
     */
    // private messageToNative() {
    //     egret.ExternalInterface.addCallback("sendToJS", (message: string) => {
    //         egret.log("xxx msg form native = " + message);
    //         var params = JSON.parse(message);
    //         var type = params['type'];
    //         var data = params['data'];
    //         if (type == "info") {
    //             this.defaultHeight = data["screen"]["height"];
    //             this.defaultWidth = this.defaultHeight * 0.5625;

    //             this.ScreenWidth = data["screen"]["width"] > data["screen"]["height"] ? data["screen"]["height"] : data["screen"]["width"];
    //             this.ScreenHeight = data["screen"]["height"] > data["screen"]["width"] ? data["screen"]["height"] : data["screen"]["width"];

    //             var language = String(data["lang"]);
    //             if (language.indexOf("zh-Hant") != -1 || language.indexOf("zh-Hant-CN") != -1 || language.indexOf("zh-TW") != -1) {
    //                 this.language = "traditionalChinese";
    //             } else if (language.indexOf("zh-Hans") != -1 || language.indexOf("zh-Hans-CN") != -1 || language.indexOf("zh-CN") != -1) {
    //                 this.language = "chinese";
    //             } else if (language.indexOf("en") != -1) {
    //                 this.language = "english";
    //             }
    //             var str = egret.localStorage.getItem("language")
    //             if (str != undefined) {
    //                 this.language = str;
    //             }
    //             this.textValue = RES.getRes("language_json");
    //             this.textDatas = this.textValue[this.language];

    //             if (data["orientation"] == "landscape_left" || data["orientation"] == "landscape_right") {//横屏
    //                 this.isCrossScreen = true;
    //                 if (data["orientation"] == "landscape_left") {
    //                     this.leftScreen = false;
    //                 } else {
    //                     this.leftScreen = true;
    //                 }
    //             } else if (data["orientation"] == "portrait") {//竖屏
    //                 this.isCrossScreen = false;
    //             }
    //             this.startInit();
    //             this.Screen();
    //         } else if (type == "show_ad") {
    //             //this.mGroup.rotation = 0;
    //             // this.show_ad_over = 0;
    //             // this.test.text = String(this.group_bg.width + "  " + this.group_bg.height);
    //             if (egret.Capabilities.os == "Android") {
    //                 egret.setTimeout(() => {
    //                     this.startGame();
    //                 }, this, 500);
    //             } else {
    //                 this.startGame();
    //             }
    //         } else if (type == "orientation") {
    //             if (data == "landscape_left" || data == "landscape_right") {
    //                 if (data == "landscape_left") {
    //                     this.leftScreen = false;
    //                 } else {
    //                     this.leftScreen = true;
    //                 }
    //                 // if (this.show_ad_over == 1) {
    //                 //     return;
    //                 // }          
    //                 this.resetCrossScreen();
    //                 //this.crossScreen();
    //             } else if (data == "portrait" || data == "portrait_upside_down") {
    //                 //this.verticalScreen();
    //                 // if (this.show_ad_over == 1) {
    //                 //     return;
    //                 // }
    //                 this.resetVerticalScreen();
    //             }
    //         }
    //     });

    //     var send = {
    //         type: "info"
    //     };
    //     egret.ExternalInterface.call("sendToNative", JSON.stringify(send));
    // }

    private createScene() {
        platform.showShareMenu({
            withShareTicket: true
        });
        platform.onShareAppMessage(function () {
            // 用户点击了“转发”按钮
            return {
                title: "",
                imageUrl: ""//RES.getRes("share_jpg")
            }
        })
        if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
            this.startCreateScene();
        }
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private onAddStage(): void {
        this.stage.addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, this.onOrientationChange, this);
    }

    private onOrientationChange(e: egret.StageOrientationEvent): void {
        if (window.orientation == 90 || window.orientation == -90) {
            this.crossScreen();
        } else if (window.orientation == 0) {
            this.verticalScreen();
        }
    }

    private bottomGroupY: number;
    /**
     * 点击显示或隐藏下方横条
     */
    private touchTap(e: egret.TouchEvent) {
        if (this.mGroup.getChildIndex(this.gameGroup) != -1 || this.mGroup.getChildIndex(this.settingsGroup) != -1) {
            return;
        }
        if (this.isOverGame) {
            return;
        }
        if (e.stageY < 1920 / 2) {
            return;
        }

        if (this.mGroup.getChildIndex(this.bottomGroup) == -1) {
            this.mGroup.addChild(this.bottomGroup);
            egret.Tween.get(this.bottomGroup).to({ y: this.bottomGroupY }, 100, egret.Ease.sineIn);
        } else {
            egret.Tween.get(this.bottomGroup).to({ y: 1920 }, 100, egret.Ease.sineIn).wait(100).call(() => {
                if (this.mGroup.getChildIndex(this.bottomGroup) != -1) {
                    this.mGroup.removeChild(this.bottomGroup);
                }
            }, this);
        }
    }

    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateScene(): void {
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
            this.ScreenWidth = this.width;
            this.ScreenHeight = this.height;
        }
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB || egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
            this.defaultWidth = window.innerWidth;
            this.defaultHeight = this.defaultWidth / 0.5625;
            this.language = "chinese";
            var str = egret.localStorage.getItem("language");
            if (str) {
                this.language = str;
            }
            this.textValue = RES.getRes("language_json");
            this.textDatas = this.textValue[this.language];
            this.isCrossScreen = false;
            if (window.orientation == 90 || window.orientation == -90) {
                this.isCrossScreen = true;
            } else if (window.orientation == 0) {
                this.isCrossScreen = false;
            }
            this.startInit();
            this.Screen();
            // this.isCrossScreen = true;
            // this.ScreenCrossBegin();
        }
    }

    private saveScore() {
        var vegasCumulativeType = egret.localStorage.getItem("vegasCumulativeType");
        if (this.scoreType == 3 && vegasCumulativeType != undefined && vegasCumulativeType == "2") {
            egret.localStorage.setItem("score", String(this.score));
        }
    }

    private startInit() {
        this.solitaire = new Solitaire();
        this.solitaire.shuffle();
        this.solitaire.init();
        var str;
        this.clickDragCardCount = 1;
        str = egret.localStorage.getItem("clickDragCardCount");
        if (str != undefined) {
            if (str == "1") {
                this.clickDragCardCount = 1;
            } else if (str == "3") {
                this.clickDragCardCount = 3;
            }
        }
        this.hintType = 2;
        str = egret.localStorage.getItem("hintType")
        if (str != undefined) {
            if (str == "1") {
                this.hintType = 1;
            } else if (str == "2") {
                this.hintType = 2;
            }
        }
        this.vegasCumulativeType = 1;
        str = egret.localStorage.getItem("vegasCumulativeType")
        if (str != undefined) {
            if (str == "1") {
                this.vegasCumulativeType = 1;
            } else if (str == "2") {
                this.vegasCumulativeType = 2;
            }
        }
        this.scoreType = 2;
        this.score = 0;
        str = egret.localStorage.getItem("scoreType")
        if (str != undefined) {
            if (str == "1") {
                this.scoreType = 1;
            } else if (str == "2") {
                this.scoreType = 2;
                this.score = 0;
            } else if (str == "3") {
                this.scoreType = 3;
                this.drowCount = 0;
                var vegasCumulativeType = egret.localStorage.getItem("vegasCumulativeType");
                var score = egret.localStorage.getItem("score");
                if (vegasCumulativeType != undefined && vegasCumulativeType == "2" && score != undefined) {
                    this.score = Number(score) - 52;
                    this.saveScore();
                } else {
                    this.score = -52;
                }
            }
        }
        this.soundVolume = 2;//声音默认最大
        str = egret.localStorage.getItem("soundVolume")
        if (str != undefined) {
            if (str == "1") {
                this.soundVolume = 1;
            } else if (str == "2") {
                this.soundVolume = 2;
            }
        }
        this.isDblclick = 3;//自动
        str = egret.localStorage.getItem("isDblclick")
        if (str != undefined) {
            if (str == "1") {
                this.isDblclick = 1;
            } else if (str == "2") {
                this.isDblclick = 2;
            } else if (str == "3") {
                this.isDblclick = 3;
            }
        }
        this.moves = 0;
        this.Orientation = 3;//重力感应，默认为自动
        this.dealSound = new egret.Sound();
        this.dealSound = RES.getRes("deal_mp3");//音效加载
        this.flopSound = new egret.Sound();
        this.flopSound = RES.getRes("flop_mp3");//音效加载
        this.soundSound = new egret.Sound();
        this.soundSound = RES.getRes("sound_mp3");//音效加载
        this.isLoopDraw = false;
        this.lastClickDragCardCount = -1;//初始化自动完成时保存的移牌张数

        this.record = [];

        this.columnI_X = ((this.ScreenWidth * 1080 / this.defaultWidth - 7 * 149) / 6 + 149) * this.defaultWidth / this.ScreenWidth;

        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB || egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
            this.columnI_X = ((window.innerWidth * 1080 / this.defaultWidth - 7 * 149) / 6 + 149) * this.defaultWidth / window.innerWidth;
        }
    }

    private resetCrossScreen() {
        // var width = Main.WIDTH;
        // var height = Main.HEIGHT;
        // this.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;

        // if (this.leftScreen) {
        //     this.mGroup.x = 0;
        //     this.mGroup.y = height;
        //     this.mGroup.rotation = -90;
        // } else {
        //     this.mGroup.x = width;
        //     this.mGroup.y = 0;
        //     this.mGroup.rotation = 90;
        // }
        // if (!this.isCrossScreen) {
        //     this.mGroup.width = height;
        //     this.mGroup.height = width;
        // }
        // var scaleX, scaleY;
        // scaleX = 1; scaleY = 1;
        // var suitY = (width - 230 * 4 - 100) / 5;

        // // if (this.mGroup.getChildIndex(this.bottomGroup) != -1) {
        // //     this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.bottomGroup), this.mGroup.numChildren - 1);
        // // }
        // if (this.mGroup.getChildIndex(this.wonGroup) != -1) {
        //     var backGroundImage = this.mGroup.getChildAt(0);
        //     backGroundImage.width = Main.HEIGHT;
        //     backGroundImage.height = Main.WIDTH;
        //     this.mc.x = 420;
        //     this.mc.y = -300;
        //     this.modeDraw.x = (this.mGroup.height - this.modeDraw.width) / 2;
        //     this.modeDraw.y = 500;
        //     this.scoreLabel.x = 600;
        //     this.scoreLabel.y = 650;
        //     this.movesLabel.x = 900;
        //     this.movesLabel.y = 650;
        //     this.timeLabel.x = 1200;
        //     this.timeLabel.y = 650;

        //     this.scoreData.x = 600 + (this.scoreLabel.width - this.scoreData.width) / 2;
        //     this.scoreData.y = 700;
        //     this.movesData.x = 900 + (this.movesLabel.width - this.movesData.width) / 2;
        //     this.movesData.y = 700;
        //     this.timeData.x = 1200 + (this.timeLabel.width - this.timeData.width) / 2;
        //     this.timeData.y = 700;
        //     this.newGameButton.y = 900;
        //     this.newGameButton.x = (this.mGroup.height - this.newGameButton.texture.textureWidth) / 2;
        //     return;
        // }
        // // this.group_bg.graphics.beginFill(0x000000, 1);
        // // this.group_bg.graphics.drawRect(0, 0, this.group_bg.width, this.group_bg.height);
        // // this.group_bg.graphics.endFill();

        // this.topShape.graphics.clear();
        // this.topShape.graphics.beginFill(0x000000, 0.1);
        // this.topShape.graphics.drawRect(0, 0, height, suitY + 50);
        // this.topShape.graphics.endFill();
        // this.topShape.y = width - (suitY + 50);

        // this.myGroup.x = 0;
        // this.myGroup.y = suitY + 50;

        // for (var i = 0; i < 4; i++) { //左上收牌区
        //     this.mySuit[i].x = 0;
        //     this.mySuit[i].y = i * (230 + suitY);
        //     this.mySuit[i].getChildAt(0).scaleX = scaleX;
        //     this.mySuit[i].getChildAt(0).scaleY = scaleY;
        //     for (var j = 1; j < this.mySuit[i].numChildren; j++) {
        //         var suitsCard = this.mySuit[i].getChildAt(j) as CardGroup;
        //         this.ScaleCardGroup(suitsCard, scaleX, scaleY);
        //     }
        // }
        // this.myFreeBg.x = width + (height - width) / 3;
        // this.myFreeBg.y = 0;

        // this.myWaste.x = (height - width) / 4;
        // this.myWaste.y = 150;
        // for (var i = 0; i < this.solitaire.wastes.length; i++) {
        //     var wastesCard = this.myWaste.getChildAt(i) as CardGroup;
        //     this.ScaleCardGroup(wastesCard, scaleX, scaleY);
        // }

        // this.myFree.x = (height - width) / 3;
        // this.myFree.y = this.myWaste.y + 230 + 50;
        // this.handsBgImage.scaleX = scaleX;
        // this.handsBgImage.scaleY = scaleY;
        // for (var i = 0; i < this.solitaire.hands.length; i++) {
        //     var handsCard = this.myFree.getChildAt(1 + i) as CardGroup;
        //     this.ScaleCardGroup(handsCard, scaleX, scaleY);
        // }

        // // this.myGroup.graphics.beginFill(0x00FFFF, 1);
        // // this.myGroup.graphics.drawRect(0, 0, this.myGroup.width, this.myGroup.height);
        // // this.myGroup.graphics.endFill();

        // this.myColumns.y = 0;
        // this.myColumns.x = (height - width) / 3;
        // for (var i = 0; i < 7; i++) {
        //     this.columnBgImage[i].scaleX = scaleX;
        //     this.columnBgImage[i].scaleY = scaleY;
        //     this.columnBgImage[i].x = this.myColumns.x + this.columnI_X * i;
        //     this.columnBgImage[i].y = 0;
        // }
        // for (var i = 0; i < this.solitaire.columns.length; i++) {
        //     for (var j = 0; j < this.solitaire.columns[i].length; j++) {
        //         var cardGroup = this.myColumn[i].getChildAt(j) as CardGroup;
        //         this.ScaleCardGroup(cardGroup, scaleX, scaleY);
        //     }
        // }

        // // this.myColumns.graphics.beginFill(0xFFF8DC, 1);
        // // this.myColumns.graphics.drawRect(0, 0, this.myColumns.width, this.myColumns.height);
        // // this.myColumns.graphics.endFill();

        // if (this.scoreType != 1) {
        //     this.scoreText.x = (height / 3 - this.scoreText.width) / 2;
        //     this.scoreText.y = width - (suitY + 50);
        // }
        // this.movesText.y = width - (suitY + 50);
        // this.movesText.x = height / 3 + this.scoreText.x;
        // if (this.scoreType == 1) {
        //     this.movesText.x = height / 3;
        // }

        // this.timeText.y = width - (suitY + 50);
        // this.timeText.x = height / 3 * 2 + this.scoreText.x;
        // if (this.scoreType == 1) {
        //     this.timeText.x = height / 3 * 2;
        // }

        // this.bottomGroup.y = width - this.bottomGroup.height;
        // for (var i = 0; i < this.bottomGroup.numChildren; i++) {
        //     if (i == 0) {
        //         var image = this.bottomGroup.getChildAt(i) as eui.Image;
        //         image.width = height;
        //         continue;
        //     }
        //     var button = this.bottomGroup.getChildAt(i) as egret.Sprite;
        //     if (i <= 2) {
        //         button.x = (100 + button.width) * (i - 1) + 149;
        //     } else {
        //         button.x = height - (100 + button.width) * (6 - i);
        //     }
        // }
        // if (this.mGroup.getChildIndex(this.settingsGroup) != -1) {
        //     this.shp.graphics.clear();
        //     this.shp.graphics.beginFill(0x000000, 0.3);
        //     this.shp.graphics.drawRect(0, 0, height, width);
        //     this.shp.graphics.endFill();
        //     this.settingsGroup.x = (height - this.settingsBGBitmap.width) / 2;
        //     this.settingsGroup.height = width - this.settingsGroup.y - this.bottomGroup.height;
        //     this.scroller.height = this.settingsGroup.height - this.settingsTopGroup.height - 40;
        //     this.scroller.x = 952;
        //     this.scroller.rotation = 90;
        //     this.scroller.height = 952;
        //     this.scroller.width = this.settingsGroup.height - this.settingsTopGroup.height - 40;

        //     var datas = this.textDatas["settingsButton"];
        //     for (var key in datas) {
        //         var i = Number(key);
        //         this.settingsButtonGroups[i].y = 902;
        //         if (i == 8) {
        //             this.settingsButtonGroups[i].x = 164 * 7 + 70;
        //         } else {
        //             this.settingsButtonGroups[i].x = 164 * i;
        //         }
        //         this.settingsButtonGroups[i].rotation = -90;
        //     }
        //     this.gameRules.y = 872;
        //     this.gameRules.x = 164 * 7 + 170;
        //     this.gameRules.rotation = -90;
        //     this.scroller.scrollPolicyV = eui.ScrollPolicy.OFF;
        //     this.scroller.scrollPolicyH = eui.ScrollPolicy.ON;
        //     this.settingsBGBitmap.height = this.settingsGroup.height;
        // }

        // if (this.mGroup.getChildIndex(this.gameGroup) != -1) {
        //     this.shp.graphics.clear();
        //     this.shp.graphics.beginFill(0x000000, 0.3);
        //     this.shp.graphics.drawRect(0, 0, height, width);
        //     this.shp.graphics.endFill();
        //     this.gameGroup.x = (height - this.buttonGameImage.texture.textureWidth) / 2;
        //     this.gameGroup.y = width / 3;
        // }

        // this.isCrossScreen = true;
    }

    // private resetVerticalScreen() {
    //     this.mGroup.x = 0;
    //     this.mGroup.y = 0;
    //     this.mGroup.rotation = 0;
    //     if (this.isCrossScreen) {
    //         this.mGroup.width = Main.WIDTH;
    //         this.mGroup.height = Main.HEIGHT;
    //     }

    //     var scaleX, scaleY;
    //     if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
    //         scaleX = this.defaultWidth / this.ScreenWidth;
    //         scaleY = this.defaultHeight / this.ScreenHeight;
    //     } else {
    //         scaleX = this.defaultWidth / window.innerWidth;
    //         scaleY = this.defaultHeight / window.innerHeight;
    //     }

    //     if (this.mGroup.getChildIndex(this.wonGroup) != -1) {
    //         // var backGroundImage = this.mGroup.getChildAt(0);
    //         // backGroundImage.width = this.mGroup.width;
    //         // backGroundImage.height = this.mGroup.height;
    //         this.mc.x = 0;
    //         this.mc.y = -100;
    //         this.modeDraw.x = (this.mGroup.width - this.modeDraw.width) / 2;
    //         this.modeDraw.y = 850;
    //         this.scoreLabel.x = 180;
    //         this.scoreLabel.y = 1000;
    //         this.movesLabel.x = 480;
    //         this.movesLabel.y = 1000;
    //         this.timeLabel.x = 780;
    //         this.timeLabel.y = 1000;

    //         this.scoreData.x = 180 + (this.scoreLabel.width - this.scoreData.width) / 2;
    //         this.scoreData.y = 1100;
    //         this.movesData.x = 480 + (this.movesLabel.width - this.movesData.width) / 2;
    //         this.movesData.y = 1100;
    //         this.timeData.x = 780 + (this.timeLabel.width - this.timeData.width) / 2;
    //         this.timeData.y = 1100;
    //         this.newGameButton.y = 1500;
    //         this.newGameButton.x = (this.mGroup.width - this.newGameButton.texture.textureWidth) / 2;
    //         return;
    //     }
    //     // if (this.mGroup.getChildIndex(this.test) == -1) {
    //     //     this.test = new eui.Label();
    //     //     this.mGroup.addChild(this.test);
    //     //     this.test.x = 300; this.test.y = 300;
    //     // }
    //     // this.test.text = String(this.group_bg.width + "  " + this.group_bg.height);

    //     this.topShape.graphics.clear();
    //     this.topShape.graphics.beginFill(0x000000, 0.1);
    //     this.topShape.graphics.drawRect(0, this.firstTop - 108, this.mGroup.width, 78);
    //     this.topShape.graphics.endFill();
    //     this.topShape.y = this.firstTop - 108;

    //     this.myGroup.x = 0;
    //     this.myGroup.y = this.firstTop;

    //     for (var i = 0; i < 4; i++) { //左上收牌区
    //         this.mySuit[i].x = i * 158.5;
    //         this.mySuit[i].y = 0;
    //         this.mySuit[i].getChildAt(0).scaleX = scaleX;
    //         this.mySuit[i].getChildAt(0).scaleY = scaleY;
    //         for (var j = 1; j < this.mySuit[i].numChildren; j++) {
    //             var suitsCard = this.mySuit[i].getChildAt(j) as CardGroup;
    //             this.ScaleCardGroup(suitsCard, scaleX, scaleY);
    //         }
    //     }
    //     this.myFreeBg.x = 270 * 2.25;
    //     this.myFreeBg.y = 0;

    //     this.myWaste.x = 60;
    //     this.myWaste.y = 0;
    //     for (var i = 0; i < this.solitaire.wastes.length; i++) {
    //         var wastesCard = this.myWaste.getChildAt(i) as CardGroup;
    //         this.ScaleCardGroup(wastesCard, scaleX, scaleY);
    //     }

    //     this.myFree.x = 320;
    //     this.myFree.y = 0;
    //     this.handsBgImage.scaleX = scaleX;
    //     this.handsBgImage.scaleY = scaleY;
    //     for (var i = 0; i < this.solitaire.hands.length; i++) {
    //         var handsCard = this.myFree.getChildAt(1 + i) as CardGroup;
    //         this.ScaleCardGroup(handsCard, scaleX, scaleY);
    //     }

    //     this.myColumns.x = 0;
    //     this.myColumns.y = 230 + this.firstTop + this.SecondTop;
    //     for (var i = 0; i < 7; i++) {
    //         this.columnBgImage[i].scaleX = scaleX;
    //         this.columnBgImage[i].scaleY = scaleY;
    //         this.columnBgImage[i].x = this.myColumn[i].x;
    //         this.columnBgImage[i].y = this.firstTop + this.SecondTop + 230;
    //     }
    //     for (var i = 0; i < this.solitaire.columns.length; i++) {
    //         for (var j = 0; j < this.solitaire.columns[i].length; j++) {
    //             var cardGroup = this.myColumn[i].getChildAt(j) as CardGroup;
    //             this.ScaleCardGroup(cardGroup, scaleX, scaleY);
    //         }
    //     }

    //     if (this.scoreType != 1) {
    //         this.scoreText.x = 60; this.scoreText.y = (this.topH - this.topSize) / 2;
    //     }
    //     this.movesText.x = 280; this.movesText.y = (this.topH - this.topSize) / 2;
    //     if (this.scoreType == 1) {
    //         this.movesText.x = 150;
    //     }

    //     this.timeText.x = 500; this.timeText.y = (this.topH - this.topSize) / 2;
    //     if (this.scoreType == 1) {
    //         this.timeText.x = 450;
    //     }


    //     this.bottomGroup.y = this.mGroup.height - this.bottomGroup.height;
    //     for (var i = 0; i < this.bottomGroup.numChildren; i++) {
    //         if (i == 0) {
    //             var image = this.bottomGroup.getChildAt(i) as eui.Image;
    //             image.width = this.mGroup.width;
    //             continue;
    //         }
    //         var button = this.bottomGroup.getChildAt(i) as egret.Sprite;
    //         if (i <= 2) {
    //             button.x = (160) * (i - 1) + 10;
    //         } else {
    //             button.x = this.mGroup.width - 20 - (160) * (6 - i);
    //         }
    //     }


    //     if (this.mGroup.getChildIndex(this.settingsGroup) != -1) {
    //         this.shp.graphics.clear();
    //         this.shp.graphics.beginFill(0x000000, 0.3);
    //         this.shp.graphics.drawRect(0, 0, this.mGroup.width, this.mGroup.height);
    //         this.shp.graphics.endFill();
    //         this.settingsGroup.x = (1080 - this.settingsBGBitmap.width) / 2;
    //         this.settingsGroup.height = this.mGroup.height - this.settingsGroup.y - this.bottomGroup.height;
    //         this.scroller.height = this.settingsGroup.height - this.settingsTopGroup.height - 40;
    //         this.settingsBGBitmap.height = this.settingsGroup.height;

    //         this.scroller.x = 20;
    //         this.scroller.rotation = 0;
    //         this.scroller.width = 952;
    //         this.scroller.height = this.settingsGroup.height - this.settingsTopGroup.height - 40;
    //         /*
    //                     var datas = this.textDatas["settingsButton"];
    //                     for (var key in datas) {
    //                         var i = Number(key);
    //                         this.settingsButtonGroups[i].rotation = 0;
    //                         this.settingsButtonGroups[i].x = 20;
    //                         if (i == 8) {
    //                             this.settingsButtonGroups[i].y = 164 * 7 + 70;
    //                         } else {
    //                             this.settingsButtonGroups[i].y = 164 * i;
    //                         }
    //                     }
    //                     this.gameRules.rotation = 0;
    //                     this.gameRules.x = 70;
    //                     this.gameRules.y = 164 * 7 + 170;
    //                     this.scroller.scrollPolicyV = eui.ScrollPolicy.ON;
    //                     this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
    //                     */
    //     }

    //     if (this.mGroup.getChildIndex(this.gameGroup) != -1) {
    //         this.shp.graphics.clear();
    //         this.shp.graphics.beginFill(0x000000, 0.3);
    //         this.shp.graphics.drawRect(0, 0, this.mGroup.width, this.mGroup.height);
    //         this.shp.graphics.endFill();
    //         this.gameGroup.x = (this.mGroup.width - this.buttonGameImage.texture.textureWidth) / 2;
    //         this.gameGroup.y = 1220;
    //     }
    //     // this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.myColumnsStart, this);
    //     // this.myColumns.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this);
    //     this.isCrossScreen = false;
    // }

    private async Screen() {
        this.firstTop = 158;
        this.topH = 138;
        var result: boolean = await SystemUtil.isAndroid();
        if (result) {
            console.log("isAndroid")
            this.firstTop = 210;
            this.topH = 180;
        }
        this.topSize = 40;
        this.SecondTop = 20 * 2.4;

        this.backGroundImage.source = RES.getRes("backGround_jpg");
        this.columnBgImage = [];
        for (var i = 0; i < 7; i++) {
            this.columnBgImage[i] = new eui.Image();
            this.columnBgImage[i].source = RES.getRes("columnBG_png");
            this.columnBgImage[i].width = 149;
            this.columnBgImage[i].height = 230;
            this.columnBgImage[i].x = 7 + i * (this.columnI_X - 3);

            this.columnBgImage[i].y = this.firstTop + this.SecondTop + 230;
            this.mGroup.addChild(this.columnBgImage[i]);
        }

        this.topShape = new egret.Shape();
        this.topShape.graphics.beginFill(0x000000, 0.1);
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB || egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
            this.topShape.graphics.drawRect(0, 0, 1080, this.topH);
        } else if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
            this.topShape.graphics.drawRect(0, 0, this.ScreenWidth * 1080 / this.defaultWidth, this.firstTop - 10);
        }
        this.topShape.graphics.endFill();
        this.mGroup.addChild(this.topShape);
        this.scoreType = this.nextScoreType ? this.nextScoreType : this.scoreType;
        this.scoreText = new egret.TextField();
        this.scoreText.size = this.topSize;
        this.scoreText.bold = true;
        if (this.scoreType != 1) {
            this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
            this.mGroup.addChild(this.scoreText);
        }
        this.scoreText.x = 60; this.scoreText.y = (this.topH - this.topSize) / 2;

        this.movesText = new egret.TextField();
        this.movesText.bold = true;
        this.movesText.text = this.textDatas["moves"] + ": " + this.moves + " ";
        this.movesText.size = this.topSize;
        this.mGroup.addChild(this.movesText);
        this.movesText.x = 280; this.movesText.y = (this.topH - this.topSize) / 2;
        if (this.scoreType == 1) {
            this.movesText.x = 150;
        }

        this.timeText = new egret.TextField();
        this.timeText.bold = true;
        this.timeText.size = this.topSize;
        this.mGroup.addChild(this.timeText);
        this.timeText.x = 500;
        if (this.scoreType == 1) {
            this.timeText.x = 450;
        }
        this.timeText.y = (this.topH - this.topSize) / 2;
        this.timeText.text = this.textDatas["time"] + ": 00:00";
        this.timer = new egret.Timer(1000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.isStart = false;

        this.myGroup = new egret.Sprite();
        this.mGroup.addChild(this.myGroup);
        this.myGroup.x = 0;
        this.myGroup.y = this.firstTop;

        this.mySuitBg = new egret.Sprite();
        this.myGroup.addChild(this.mySuitBg);
        this.mySuitBg.x = 10;
        this.mySuitBg.y = 0;
        this.mySuit = [];
        for (var i = 0; i < 4; i++) { //左上收牌区
            this.mySuit[i] = new egret.Sprite();
            this.mySuitBg.addChild(this.mySuit[i]);
            this.mySuit[i].x = i * 158.5;
            var image = new eui.Image();
            image.source = RES.getRes("suits_png");
            image.width = 149;
            image.height = 230;
            this.mySuit[i].addChild(image);
        }

        this.myFreeBg = new egret.Sprite();//右上手牌区
        this.myGroup.addChild(this.myFreeBg);
        this.myFreeBg.x = 265 * 2.25;
        this.myFreeBg.y = 0;

        this.myWaste = new egret.Sprite();//废牌区
        this.myFreeBg.addChild(this.myWaste);
        this.myWaste.x = 60;
        this.myWaste.width = 149 + 40 * 2.25;
        this.myWaste.height = 230;

        this.myFree = new egret.Sprite();//手牌
        this.myFreeBg.addChild(this.myFree);
        this.myFree.width = 149;
        this.myFree.height = 230;
        this.myFree.x = 320;

        this.handsBgImage = new eui.Image();
        this.handsBgImage.source = RES.getRes("hands_png");
        this.handsBgImage.width = 149;
        this.handsBgImage.height = 230;
        this.myFree.addChild(this.handsBgImage);
        this.handsBgImage.x = 0;
        this.handsBgImage.y = 0;

        this.myColumns = new egret.Sprite(); //下方7列
        this.mGroup.addChild(this.myColumns);
        this.myColumns.x = 7;
        this.myColumns.y = 230 + this.firstTop + this.SecondTop;

        this.bottomGroup = new egret.Sprite();
        this.mGroup.addChild(this.bottomGroup);
        var bottomBG = new eui.Image();
        bottomBG.texture = RES.getRes("bottom_png");
        bottomBG.height = bottomBG.texture.textureHeight;
        this.bottomGroup.addChild(bottomBG);
        this.bottomGroup.height = bottomBG.height
        this.bottomGroup.y = this.stage.stageHeight - bottomBG.height;
        this.bottomGroupY = this.mGroup.height - bottomBG.height;

        this.settings = this.createBottomBottonGroup("settings_png", this.textDatas["settings"]);
        this.settings.x = 10;
        this.settings.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.setSettingsGroup();
        }, this);

        this.batGame = this.createBottomBottonGroup("蝙蝠玩_png", this.textDatas["batGame"]);
        this.batGame.x = 170;
        this.batGame.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.setbatGameGroup();
        }, this);

        this.game = this.createBottomBottonGroup("game_png", this.textDatas["game"]);
        this.game.x = 580;
        this.game.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.setGameGroup();
        }, this);

        this.hint = this.createBottomBottonGroup("hint_png", this.textDatas["hint"], "hint");
        this.hint.x = 740;
        this.hint.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.hintComplete();
        }, this);

        this.restore = this.createBottomBottonGroup("restore_png", this.textDatas["restore"]);
        this.restore.x = 900;
        this.restore.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.touchCount = 0;
            this.launchTween();
        }, this);


        this.solitaire.deleteData();
        // if (this.mGroup.getChildIndex(this.test) == -1) {
        //     this.test = new eui.Label();
        //     this.mGroup.addChild(this.test);
        //     this.test.x = 300; this.test.y = 300;
        // }
        // this.test.text = String(this.group_bg.width + "  " + this.group_bg.height);

        if (this.isCrossScreen) {
            // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            // this.crossScreen(true);
            // }else{
            this.resetCrossScreen();
            // }
        } else {
            this.verticalScreen();
        }
        this.removeChild(this.loadingView);
        this.startGame();
    }

    private crossScreen(isStartGame = false) {
        // this.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;

        // this.scaleXX = this.defaultWidth / this.ScreenHeight;
        // this.scaleYY = this.defaultHeight / this.ScreenWidth;
        // this.columnI_X = ((this.ScreenHeight * 1080 / this.defaultWidth * 3 / 5 - 7 * 149) / 6 + 149) * this.scaleXX;
        // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB || egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
        //     this.scaleXX = this.defaultWidth / window.innerWidth;
        //     this.scaleYY = this.defaultHeight / window.innerHeight;
        //     this.columnI_X = ((window.innerWidth * 1080 / this.defaultWidth * 3 / 5 - 7 * 149) / 6 + 149) * this.scaleXX;
        // }

        // var scaleX = this.scaleXX;
        // var scaleY = this.scaleYY;

        // if (this.mGroup.getChildIndex(this.wonGroup) != -1) {
        //     this.mc.scaleY = scaleY;
        //     this.mc.y = -400;
        //     this.modeDraw.scaleY = scaleY;
        //     this.scoreLabel.scaleY = scaleY;
        //     this.movesLabel.scaleY = scaleY;
        //     this.timeLabel.scaleY = scaleY;
        //     this.scoreData.scaleY = scaleY;
        //     this.movesData.scaleY = scaleY;
        //     this.timeData.scaleY = scaleY;
        //     this.newGameButton.scaleY = scaleY;
        //     return;
        // }

        // for (var i = 0; i < 7; i++) {
        //     this.columnBgImage[i].scaleX = scaleX;
        //     this.columnBgImage[i].scaleY = scaleY;
        //     this.columnBgImage[i].x = 70 * 2.25 + i * this.columnI_X;
        //     this.columnBgImage[i].y = 0;
        //     var index = this.mGroup.getChildIndex(this.columnBgImage[i])
        //     this.mGroup.swapChildrenAt(index, i + 1);
        // }

        // this.handsBgImage.scaleX = scaleX;
        // this.handsBgImage.scaleY = scaleY;

        // this.myGroup.x = 0;
        // this.myGroup.y = 50 * 2.4;
        // for (var i = 0; i < 4; i++) {
        //     this.mySuit[i].x = 0;
        //     this.mySuit[i].y = 180 * i * 2.4;
        //     this.mySuit[i].getChildAt(0).scaleX = scaleX;
        //     this.mySuit[i].getChildAt(0).scaleY = scaleY;
        //     if (this.mySuit[i].numChildren > 1) {
        //         for (var j = 1; j < this.mySuit[i].numChildren; j++) {
        //             var suitsCard = this.mySuit[i].getChildAt(j) as CardGroup;
        //             this.scaleCardGroup(suitsCard, scaleX, scaleY);
        //         }
        //     }
        // }
        // this.myFreeBg.x = 370 * 2.25;
        // this.myFreeBg.y = 50 * 2.4;
        // this.myWaste.x = 20 * 2.25;
        // for (var i = 0; i < this.solitaire.wastes.length; i++) {
        //     var wastesCard = this.myWaste.getChildAt(i) as CardGroup;
        //     this.scaleCardGroup(wastesCard, scaleX, scaleY);
        // }
        // this.myFree.x = 50 * 2.25;
        // this.myFree.y = 220 * 2.4;
        // this.myFree.width *= scaleX;
        // this.myFree.height *= scaleY;
        // for (var i = 0; i < this.solitaire.hands.length; i++) {
        //     var handsCard = this.myFree.getChildAt(1 + i) as CardGroup;
        //     this.scaleCardGroup(handsCard, scaleX, scaleY);
        // }

        // this.myColumns.x = 70 * 2.25;
        // this.myColumns.y = 0;
        // for (var i = 0; i < this.solitaire.columns.length; i++) {
        //     if (this.solitaire.columns[i].length > 0)
        //         this.myColumn[i].x = i * this.columnI_X;
        //     for (var j = 0; j < this.solitaire.columns[i].length; j++) {
        //         var cardGroup = this.myColumn[i].getChildAt(j) as CardGroup;
        //         cardGroup.y = cardGroup.y * scaleY;
        //         this.scaleCardGroup(cardGroup, scaleX, scaleY);
        //     }
        // }

        // for (var i = 0; i < this.bottomGroup.numChildren; i++) {
        //     var button = this.bottomGroup.getChildAt(i) as egret.Sprite;
        //     if (i == 0) {
        //         button.scaleY = scaleY;
        //         continue;
        //     }
        //     button.getChildAt(0).scaleX = scaleX;
        //     button.getChildAt(0).scaleY = scaleY;
        //     button.getChildAt(0).y *= scaleY;
        //     button.getChildAt(1).scaleX = scaleX;
        //     button.getChildAt(1).scaleY = scaleY;
        //     button.getChildAt(1).y *= scaleY;
        // }
        // this.bottomGroup.y = this.stage.stageHeight - this.bottomGroup.height * scaleY;

        // if (this.mGroup.getChildIndex(this.settingsGroup) != -1) {
        //     this.settingsGroup.scaleX = scaleX;
        //     this.settingsGroup.scaleY = scaleY;
        //     this.settingsGroup.x = (1080 - this.settingsBGBitmap.width * scaleX) / 2;
        //     //     this.settingsGroup.getChildAt(0).height = window.innerHeight - this.settingsGroup.x-this.bottomGroup.height-100;
        // }

        // if (this.mGroup.getChildIndex(this.gameGroup) != -1) {
        //     this.gameGroup.y = 700;
        //     for (var i = 0; i < this.gameGroup.numChildren; i++) {
        //         var button = this.gameGroup.getChildAt(i) as egret.Sprite;
        //         button.scaleY = scaleY;
        //         button.scaleX = scaleX;
        //         button.y *= scaleY;
        //     }
        //     this.gameGroup.x = (1080 - this.buttonGameImage.texture.textureWidth * scaleX) / 2;
        // }
        // if (this.scoreType != 1) {
        //     this.scoreText.scaleX = scaleX;
        //     this.scoreText.scaleY = scaleY;
        //     this.scoreText.y = 1825;
        // }
        // this.movesText.scaleX = scaleX;
        // this.movesText.scaleY = scaleY;
        // this.movesText.y = 1825;

        // this.timeText.scaleX = scaleX;
        // this.timeText.scaleY = scaleY;
        // this.timeText.y = 1825;

        // if (this.mGroup.getChildIndex(this.settingsGroup) != -1 || this.mGroup.getChildIndex(this.gameGroup) != -1) {
        //     this.mGroup.swapChildrenAt(this.myColumns.parent.getChildIndex(this.myColumns), this.myColumns.parent.numChildren - 2);
        //     if (this.mGroup.getChildIndex(this.bottomGroup) != -1) {
        //         this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.bottomGroup), this.mGroup.numChildren - 2);
        //     }
        // } else {
        //     if (this.mGroup.getChildIndex(this.bottomGroup) != -1) {
        //         this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.bottomGroup), this.mGroup.numChildren - 1);
        //         this.mGroup.swapChildrenAt(this.myColumns.parent.getChildIndex(this.myColumns), this.myColumns.parent.numChildren - 2);
        //     } else {
        //         this.mGroup.swapChildrenAt(this.myColumns.parent.getChildIndex(this.myColumns), this.myColumns.parent.numChildren - 1);
        //     }
        // }
        // this.mGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.myColumnsStart, this);
        // this.myColumns.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this);
        // this.isCrossScreen = true;
    }

    private ScaleCardGroup(cardGroup, scaleX, scaleY) {
        cardGroup.getChildAt(0).scaleX = scaleX;
        cardGroup.getChildAt(0).scaleY = scaleY;
        cardGroup.getChildAt(1).scaleX = scaleX;
        cardGroup.getChildAt(1).scaleY = scaleY;
        cardGroup.getChildAt(2).scaleX = scaleX;
        cardGroup.getChildAt(2).scaleY = scaleY;
        cardGroup.getChildAt(3).scaleX = scaleX;
        cardGroup.getChildAt(3).scaleY = scaleY;
        if (cardGroup.numChildren > 4) {
            cardGroup.getChildAt(4).scaleX = scaleX;
            cardGroup.getChildAt(4).scaleY = scaleY;
        }
    }

    private verticalScreen(isStartGame = false) {
        this.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;

        var scaleX = this.defaultWidth / this.ScreenWidth;
        var scaleY = this.defaultHeight / this.ScreenHeight;
        this.columnI_X = ((this.ScreenWidth * 1080 / this.defaultWidth - 7 * 149) / 6 + 149) * scaleX;

        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB || egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
            scaleX = this.defaultWidth / window.innerWidth;
            scaleY = this.defaultHeight / window.innerHeight;
            this.columnI_X = ((window.innerWidth * 1080 / this.defaultWidth - 7 * 149) / 6 + 149) * scaleX;
        }

        if (this.mGroup.getChildIndex(this.wonGroup) != -1) {
            this.mc.scaleY = scaleY;
            this.mc.y = -100;
            this.modeDraw.scaleY = scaleY;
            this.scoreLabel.scaleY = scaleY;
            this.movesLabel.scaleY = scaleY;
            this.timeLabel.scaleY = scaleY;
            this.scoreData.scaleY = scaleY;
            this.movesData.scaleY = scaleY;
            this.timeData.scaleY = scaleY;
            this.newGameButton.scaleY = scaleY;
            return;
        }

        for (var i = 0; i < 7; i++) {
            this.columnBgImage[i].scaleX = scaleX;
            this.columnBgImage[i].scaleY = scaleY;
            this.columnBgImage[i].x = 7 + i * (this.columnI_X - 3);
            this.columnBgImage[i].y = 230 * scaleY + this.firstTop + this.SecondTop;
        }

        this.handsBgImage.scaleX = scaleX;
        this.handsBgImage.scaleY = scaleY;
        this.myGroup.x = 0;
        this.myGroup.y = this.firstTop;
        for (var i = 0; i < 4; i++) {
            this.mySuit[i].x = this.columnI_X * i;
            this.mySuit[i].y = 0;
            this.mySuit[i].getChildAt(0).scaleX = scaleX;
            this.mySuit[i].getChildAt(0).scaleY = scaleY;
            if (this.mySuit[i].numChildren > 1) {
                for (var j = 1; j < this.mySuit[i].numChildren; j++) {
                    var suitsCard = this.mySuit[i].getChildAt(j) as CardGroup;
                    suitsCard.getChildAt(0).scaleX = scaleX;
                    suitsCard.getChildAt(0).scaleY = scaleY;
                    suitsCard.getChildAt(1).scaleX = scaleX;
                    suitsCard.getChildAt(1).scaleY = scaleY;
                    suitsCard.getChildAt(2).scaleX = scaleX;
                    suitsCard.getChildAt(2).scaleY = scaleY;
                    suitsCard.getChildAt(3).scaleX = scaleX;
                    suitsCard.getChildAt(3).scaleY = scaleY;
                    //           if (!this.isCrossScreen) {
                    suitsCard.getChildAt(1).x /= this.scaleXX;
                    suitsCard.getChildAt(1).y /= this.scaleYY;
                    suitsCard.getChildAt(2).x /= this.scaleXX;
                    suitsCard.getChildAt(2).y /= this.scaleYY;
                    suitsCard.getChildAt(3).x /= this.scaleXX;
                    suitsCard.getChildAt(3).y /= this.scaleYY;
                    //          }
                }
            }
        }
        this.myFreeBg.x = 265 * 2.25;
        this.myFreeBg.y = 0;

        this.myWaste.x = 60;
        for (var i = 0; i < this.solitaire.wastes.length; i++) {
            var wastesCard = this.myWaste.getChildAt(i) as CardGroup;
            wastesCard.getChildAt(0).scaleX = scaleX;
            wastesCard.getChildAt(0).scaleY = scaleY;
            wastesCard.getChildAt(1).scaleX = scaleX;
            wastesCard.getChildAt(1).scaleY = scaleY;
            wastesCard.getChildAt(2).scaleX = scaleX;
            wastesCard.getChildAt(2).scaleY = scaleY;
            wastesCard.getChildAt(3).scaleX = scaleX;
            wastesCard.getChildAt(3).scaleY = scaleY;
            wastesCard.getChildAt(1).x /= this.scaleXX;
            wastesCard.getChildAt(1).y /= this.scaleYY;
            wastesCard.getChildAt(2).x /= this.scaleXX;
            wastesCard.getChildAt(2).y /= this.scaleYY;
            wastesCard.getChildAt(3).x /= this.scaleXX;
            wastesCard.getChildAt(3).y /= this.scaleYY;
        }
        this.myFree.x = 320;
        this.myFree.y = 0;
        this.myFree.width = 149;
        this.myFree.height = 230;
        for (var i = 0; i < this.solitaire.hands.length; i++) {
            var handsCard = this.myFree.getChildAt(i + 1) as CardGroup;
            handsCard.getChildAt(0).scaleX = scaleX;
            handsCard.getChildAt(0).scaleY = scaleY;
            handsCard.getChildAt(1).scaleX = scaleX;
            handsCard.getChildAt(1).scaleY = scaleY;
            handsCard.getChildAt(2).scaleX = scaleX;
            handsCard.getChildAt(2).scaleY = scaleY;
            handsCard.getChildAt(3).scaleX = scaleX;
            handsCard.getChildAt(3).scaleY = scaleY;
            if (handsCard.numChildren > 4) {
                handsCard.getChildAt(4).scaleX = scaleX;
                handsCard.getChildAt(4).scaleY = scaleY;
            }
            handsCard.getChildAt(1).x /= this.scaleXX;
            handsCard.getChildAt(1).y /= this.scaleYY;
            handsCard.getChildAt(2).x /= this.scaleXX;
            handsCard.getChildAt(2).y /= this.scaleYY;
            handsCard.getChildAt(3).x /= this.scaleXX;
            handsCard.getChildAt(3).y /= this.scaleYY;
        }

        this.myColumns.x = 7;
        this.myColumns.y = 230 * scaleY + this.firstTop + this.SecondTop;
        for (var i = 0; i < this.myColumns.numChildren; i++) {
            this.myColumn[i].x = i * (this.columnI_X - 3);
            var columnCardY = 0;
            for (var j = 0; j < this.solitaire.columns[i].length; j++) {
                var cardGroup = this.myColumn[i].getChildAt(j) as CardGroup;
                cardGroup.y = columnCardY;
                if (!cardGroup.card.status) {
                    columnCardY += 25;
                } else {
                    columnCardY += 61;
                }
                cardGroup.getChildAt(0).scaleX = scaleX;
                cardGroup.getChildAt(0).scaleY = scaleY;
                cardGroup.getChildAt(1).scaleX = scaleX;
                cardGroup.getChildAt(1).scaleY = scaleY;
                cardGroup.getChildAt(2).scaleX = scaleX;
                cardGroup.getChildAt(2).scaleY = scaleY;
                cardGroup.getChildAt(3).scaleX = scaleX;
                cardGroup.getChildAt(3).scaleY = scaleY;
                if (cardGroup.numChildren > 4) {
                    cardGroup.getChildAt(4).scaleX = scaleX;
                    cardGroup.getChildAt(4).scaleY = scaleY;
                }
                cardGroup.getChildAt(1).x /= this.scaleXX;
                cardGroup.getChildAt(1).y /= this.scaleYY;
                cardGroup.getChildAt(2).x /= this.scaleXX;
                cardGroup.getChildAt(2).y /= this.scaleYY;
                cardGroup.getChildAt(3).x /= this.scaleXX;
                cardGroup.getChildAt(3).y /= this.scaleYY;
            }
        }

        for (var i = 0; i < this.bottomGroup.numChildren; i++) {
            var button = this.bottomGroup.getChildAt(i) as egret.Sprite;
            if (i == 0) {
                button.scaleY = 1 / scaleY;
                console.log(button);
                continue;
            }
            button.getChildAt(0).scaleX = scaleX;
            button.getChildAt(0).scaleY = scaleY;
            button.getChildAt(1).scaleX = scaleX;
            button.getChildAt(1).scaleY = scaleY;
            if (this.isCrossScreen) {
                button.getChildAt(0).y /= this.scaleYY;
                button.getChildAt(1).y /= this.scaleYY;
            }
        }
        this.bottomGroup.y = this.stage.stageHeight - this.bottomGroup.height;

        if (this.mGroup.getChildIndex(this.settingsGroup) != -1) {
            this.settingsGroup.scaleX = scaleX;
            this.settingsGroup.scaleY = scaleY;
            this.settingsGroup.x = (1080 - this.settingsBGBitmap.width * scaleX) / 2;
        }

        if (this.mGroup.getChildIndex(this.gameGroup) != -1) {
            this.gameGroup.y = 1220;
            for (var i = 0; i < this.gameGroup.numChildren; i++) {
                var button = this.gameGroup.getChildAt(i) as egret.Sprite;
                button.scaleX = 1;
                button.scaleY = scaleY;
                if (this.isCrossScreen) {
                    button.y /= this.scaleYY;
                }
            }
            this.gameGroup.x = (1080 - this.buttonGameImage.texture.textureWidth) / 2;
        }
        if (this.scoreType != 1) {
            this.scoreText.scaleX = scaleX;
            this.scoreText.scaleY = scaleY;
            this.scoreText.y = (this.topH - this.topSize) / 2;
        }
        this.movesText.scaleX = scaleX;
        this.movesText.scaleY = scaleY;
        this.movesText.y = (this.topH - this.topSize) / 2;

        this.timeText.scaleX = scaleX;
        this.timeText.scaleY = scaleY;
        this.timeText.y = (this.topH - this.topSize) / 2;

        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.myColumnsStart, this);
        this.myColumns.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this);
        this.isCrossScreen = false;
    }

    private myColumnsStart() {
        this.dblCardGroup = null;
    }

    private createBottomBottonGroup(imageSource, text, str = null) {
        var Group = new eui.Group();
        if (str == null) {
            this.bottomGroup.addChild(Group);
        } else if (str == "hint") {
            if (this.hintType == 2) {
                this.bottomGroup.addChild(Group);
            }
        }
        Group.width = 160;
        var image = new eui.Image();
        image.texture = RES.getRes(imageSource);
        Group.addChild(image);
        image.x = (Group.width - image.texture.textureWidth) / 2;
        image.y = 20;
        var label = new eui.Label();
        label.text = text;
        Group.addChild(label);
        label.bold = true; label.size = 38;
        label.x = (Group.width - label.width) / 2;
        label.y = 116;
        return Group;
    }

    private setSettingsGroup() {
        if (this.mGroup.getChildIndex(this.settingsGroup) != -1) {
            this.closeSettings();
            return;
        }
        if (this.virtualCount > 0) {
            return;
        }
        if (this.mGroup.getChildIndex(this.gameGroup) != -1) {
            this.removeGameGroup();
        }
        this.addCoverShape();

        this.settingsGroup = new egret.Sprite();
        this.mGroup.addChild(this.settingsGroup);
        this.settingsGroup.x = 44;
        this.settingsGroup.y = 60;
        this.settingsBGBitmap = new egret.Bitmap();
        this.settingsBGBitmap.texture = RES.getRes("settingsBG_png");
        var rect: egret.Rectangle = new egret.Rectangle(30, 20, 64, 416);
        this.settingsBGBitmap.scale9Grid = rect;
        this.settingsBGBitmap.width *= 8;
        this.settingsBGBitmap.height *= 3.55;
        this.settingsGroup.addChild(this.settingsBGBitmap);
        this.settingsTopGroup = new egret.Sprite();
        this.settingsGroup.addChild(this.settingsTopGroup);
        this.settingsTopGroup.x = 20;
        this.settingsTopGroup.y = 12;
        this.settingsTopGroup.width = 952;
        this.settingsTopGroup.height = 168;
        this.settingsTitle = new eui.Label();
        this.settingsTitle.text = this.textDatas['settingsTitle'];
        this.settingsTopGroup.addChild(this.settingsTitle);
        this.settingsTitle.size = 48;
        this.settingsTitle.x = (this.settingsTopGroup.width - this.settingsTitle.width) / 2;
        this.settingsTitle.y = 60;

        var Xsprite = new eui.Group();
        this.settingsTopGroup.addChild(Xsprite);
        Xsprite.x = this.settingsTopGroup.width - 150;
        Xsprite.width = 150;
        Xsprite.height = 150;
        Xsprite.touchEnabled = true;
        var image = new eui.Image();
        image.source = RES.getRes("Ｘ_png");
        Xsprite.addChild(image);
        image.x = 60;
        image.y = 60;
        Xsprite.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.closeSettings();
        }, this);

        this.scroller = new eui.Scroller();
        this.settingsGroup.addChild(this.scroller);
        this.scroller.x = 20;
        this.scroller.y = 180;

        this.scrollerViewport = new eui.Group();
        this.settingsButtonGroups = [];

        var str;
        var datas = this.textDatas["settingsButton"];
        for (var key in datas) {
            var i = Number(key);
            var title = datas[i].title; var defaultClick;
            var button1 = datas[i].content["button1"] ? datas[i].content["button1"] : null;
            var button2 = datas[i].content["button2"] ? datas[i].content["button2"] : null;
            var button3 = datas[i].content["button3"] ? datas[i].content["button3"] : null;
            if (i == 0) {
                defaultClick = this.Orientation;
            } else if (i == 1) {
                defaultClick = this.clickDragCardCount == 1 ? 1 : 2;
            } else if (i == 2) {
                defaultClick = this.hintType;
            } else if (i == 3) {
                defaultClick = this.nextScoreType ? this.nextScoreType : this.scoreType;
            } else if (i == 4) {
                defaultClick = this.vegasCumulativeType;
            } else if (i == 5) {
                defaultClick = this.soundVolume;
            } else if (i === 6) {
                if (this.language == "english") {
                    defaultClick = 1;
                } else if (this.language == "chinese") {
                    defaultClick = 2;
                } else if (this.language == "traditionalChinese") {
                    defaultClick = 3;
                }
            } else if (i == 7) {
                defaultClick = this.isDblclick;
            } else if (i == 8) {
                defaultClick = -1;
            } else if (i == 9) {
                defaultClick = 0;
            }
            if (i != 0) {
                this.settingsButtonGroups[i] = this.settingsButtonGroup(title, button1, button2, button3, defaultClick);
            }
            if (i > 0 && i < 9) {
                this.settingsButtonGroups[i].y = 164 * (i - 1);
            } else if (i == 9) {
                this.settingsButtonGroups[i].y = 164 * 7 + 70;
            }
        }


        this.gameRules = new eui.Label();
        this.gameRules.x = 70; this.gameRules.width = 800;
        this.gameRules.size = 34;
        this.gameRules.text = datas[9].content;
        this.gameRules.fontFamily = "Frutiger";
        this.scrollerViewport.addChild(this.gameRules);
        this.gameRules.y = 164 * 7 + 170;
        // var Shape = new egret.Sprite();
        // Shape.graphics.beginFill(0xFF0000, 0.5);
        // Shape.graphics.drawRect(this.gameRules.x, this.gameRules.y, this.gameRules.width, this.gameRules.height);
        // Shape.graphics.endFill();
        // this.scrollerViewport.addChild(Shape);
        this.scroller.width = this.settingsGroup.width;
        this.scroller.height = this.settingsGroup.height - this.settingsTopGroup.height - 40;

        // var label: egret.TextField = new egret.TextField();
        // label.width = 800;
        // label.textFlow = new egret.HtmlTextParser().parser(
        //      "<font size=32>Klondike Solitaire uses a standard 52 card deck of playing cards without jokers.\n\nThe objective of the game is to expose all cards and move them into the foundation piles. There are 4 foundation piles (one for each suit) that are represented on the screen by the A with a rectangle drawn around it. These piles are built upward in suit from Aces to Kings.\n\nThere are 7 tableau columns that are built downward (in decreasing rank, from Kings to Aces) in alternating colors (red, black). Partial or complete piles can be moved from one column to another if they are built down by alternate colors and decreasing rank. Any empty column can only be filled with a King or a pile of cards with a King at the top.\n\nThere is 1 stock pile. The stock pile contains cards that have not yet been moved to a foundation pile or a tableau column. You can go through the stock pile as many times as you want turning over either 1 or 3 cards at a time depending on the setting of the Draw 3 option. Tap the empty stock pile to run through the stock pile a second time and subsequent times.\n\nWhen cards are turned over from the stock pile they go into the waste pile, you can move the top card from the waste pile to any legal location in the foundation piles or tableau columns.\n\nCards can be moved by dragging and dropping a single card or a group of cards. Cards can be dragged from the waste pile, foundation piles and tableau columns. Cards can be dropped on the tableau columns and the foundation piles. Double tapping a card will move it to the foundation pile if it is a legal move. A single tap on the stock pile will turn over either 1 or 3 cards (depending on the option setting) onto the waste pile.\n\nNot all games have a solution, a draw 1 card game is easier to win than draw 3 card game.\n\nVegas Scoring:\nThe objective is to earn more points than is wagered. Each game is started with a debt of -52 points representing the score. Each card moved to the foundation pile is awarded +5 points. When the Draw 3 option is on, 3 passes are allowed through the stock pile, otherwise only one pass is allowed. When the Vegas cumulative option is on then the point total is maintained between games. When the Vegas cumulative option is off then the point total is reset at the start of each new game.\n\nStandard Scoring:\nEach new game starts off at 0 points. Each card that is moved to the foundation receives 10 points. Each card that is moved to a tableau column receives 5 points. Each card that is turned over in the tableau column receives 5 points. When a card is moved from the foundation piles there is a loss of 15 points. Each undo request is a loss of 2 points in addition to the points that are subtracted from undoing a move. When the Draw 3 option is on there is a loss of 20 points for each pass through the stock pile after the 3rd time. When the Draw 3 option is off there is a loss of 100 points for each pass through the stock pile. For timed games only: there is a loss of 2 points for every 10 seconds of play, a bonus is awarded if the game is won. Bonus points are based on the time taken to win the game, shorter games receive larger bonuses. Bonus points are calculated with the formula of 700,000 / (seconds to win the game). Bonus points for a game that takes less than 25 seconds are the same as for a 25 second game.\n\nHints:\nThe hint feature is intended to aid the player in identifying available moves which can be made in the playing area. Tap the button labeled \"Hint\" to activate the hint mechanism. The hint mechanism was not designed to show all available moves, only those deemed to possibly be productive in arriving at a solution.</font>" 
        // );
        // this.scrollerViewport.addChild(label);
        // label.x = 70
        // label.y = 164 * 7 + 170;


        this.scroller.viewport = this.scrollerViewport;
        this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.scroller.verticalScrollBar = null;
        this.scroller.horizontalScrollBar = null;
        if (this.isCrossScreen) {
            // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            //     var scaleX = this.scaleXX, scaleY = this.scaleYY;
            //     this.settingsGroup.scaleX = scaleX;
            //     //   this.settingsGroup.scaleY = scaleY;
            //     this.settingsGroup.x = (1080 - this.settingsBGBitmap.width * scaleX) / 2;
            // }else{
            this.shp.graphics.clear();
            this.shp.graphics.beginFill(0x000000, 0.3);
            this.shp.graphics.drawRect(0, 0, Main.HEIGHT, Main.WIDTH);
            this.shp.graphics.endFill();
            this.settingsGroup.x = (Main.HEIGHT - this.settingsBGBitmap.width) / 2;
            this.settingsGroup.height = Main.WIDTH - this.settingsGroup.y - this.bottomGroup.height;
            this.scroller.height = this.settingsGroup.height - this.settingsTopGroup.height - 40;
            this.scroller.x = 952;
            this.scroller.rotation = 90;
            this.scroller.height = 952;
            this.scroller.width = this.settingsGroup.height - this.settingsTopGroup.height - 40;

            var datas = this.textDatas["settingsButton"];
            for (var key in datas) {
                var i = Number(key);
                this.settingsButtonGroups[i].y = 902;
                if (i == 8) {
                    this.settingsButtonGroups[i].x = 164 * 7 + 70;
                } else {
                    this.settingsButtonGroups[i].x = 164 * i;
                }
                this.settingsButtonGroups[i].rotation = -90;
            }
            this.gameRules.y = 872;
            this.gameRules.x = 164 * 7 + 170;
            this.gameRules.rotation = -90;
            this.scroller.scrollPolicyV = eui.ScrollPolicy.OFF;
            this.scroller.scrollPolicyH = eui.ScrollPolicy.ON;
            this.settingsBGBitmap.height = this.settingsGroup.height;
            // }
        }
    }

    private setbatGameGroup() {
        // var send = {
        //     type: "more_game"
        // };
        // egret.ExternalInterface.call("sendToNative", JSON.stringify(send));
        this.Won();
    }

    private closeSettings() {
        this.mGroup.removeChild(this.settingsGroup);
        this.mGroup.removeChild(this.shp);
    }

    private settingsButtonGroup(nameText, buttonText1, buttonText2, buttonText3, defaultClick) {
        var settingsButtonGroup = new egret.Sprite();
        this.scrollerViewport.addChild(settingsButtonGroup);
        settingsButtonGroup.x = 20;

        var nameGroup = new egret.Sprite();
        nameGroup.height = 66;
        settingsButtonGroup.addChild(nameGroup);
        var image = new eui.Image();
        image.source = RES.getRes("settingsButtonBG_png");
        nameGroup.addChild(image);
        var label = new eui.Label();
        label.text = nameText;
        nameGroup.addChild(label);
        label.x = 40;
        label.size = 36;
        label.y = 15;
        if (defaultClick == -1 && buttonText1 == null) {
            var image = new eui.Image();
            image.source = RES.getRes("jiantou_png");
            nameGroup.addChild(image);
            image.x = 600;
            image.y = 15;
            image.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                // var send = {
                //     type: "share"
                // };
                // egret.ExternalInterface.call("sendToNative", JSON.stringify(send));
            }, this);
        }

        if (buttonText1 != null) {
            var contentGroup = new egret.Sprite();
            settingsButtonGroup.addChild(contentGroup);
            contentGroup.y = 66;
            contentGroup.height = 98;
            var isclick = false;
            if (defaultClick == 1) {
                isclick = true;
            }
            this.createContentButtonGroup(contentGroup, buttonText1, isclick, 1);
        }
        if (buttonText2 != null) {
            var isclick = false;
            if (defaultClick == 2) {
                isclick = true;
            }
            this.createContentButtonGroup(contentGroup, buttonText2, isclick, 2);
        }
        if (buttonText3 != null) {
            var isclick = false;
            if (defaultClick == 3) {
                isclick = true;
            }
            this.createContentButtonGroup(contentGroup, buttonText3, isclick, 3);
        }
        return settingsButtonGroup;
    }

    private buttonClick(e: egret.TouchEvent) {
        var buttonGroup = e.currentTarget as egret.Sprite;
        var image = buttonGroup.getChildAt(0) as eui.Image;
        image.source = RES.getRes("click_png");
        var label = buttonGroup.getChildAt(1) as eui.Label;
        label.textColor = 0x00FFF0;
        var buttonParentGroup = buttonGroup.parent;
        var len = buttonParentGroup.numChildren;
        var index = buttonParentGroup.getChildIndex(buttonGroup);
        for (var i = 0; i < len; i++) {
            if (i == index) {
                continue;
            }
            var button = buttonParentGroup.getChildAt(i) as egret.Sprite;
            var image = button.getChildAt(0) as eui.Image;
            image.source = RES.getRes("noclick_png");
            var label = button.getChildAt(1) as eui.Label;
            label.textColor = 0xFFFFFF;
        }
        var settingsButtonGroup = buttonGroup.parent.parent;
        var settingsIndex = this.scrollerViewport.getChildIndex(settingsButtonGroup);
        this.changeData(settingsIndex, index)
    }

    private changeData(settingsIndex, index) {
        /*if (settingsIndex == 0) {
            if (index == 0) {
                if (this.isCrossScreen) {
                    this.resetVerticalScreen();
                }
                this.Orientation = 1;
            } else if (index == 1) {
                if (!this.isCrossScreen) {
                    this.resetCrossScreen();
                }
                this.Orientation = 2;
            } else {
                this.Orientation = 3;
            }
        } else */

        if (settingsIndex == 0) {
            if (index == 0) {
                if (this.clickDragCardCount != 1) {
                    egret.localStorage.setItem("clickDragCardCount", "1");
                }
                this.clickDragCardCount = 1;
            } else {
                if (this.clickDragCardCount != 3) {
                    egret.localStorage.setItem("clickDragCardCount", "3");
                }
                this.clickDragCardCount = 3;
            }
        } else if (settingsIndex == 1) {
            if (index == 0 && this.bottomGroup.getChildIndex(this.hint) != -1) {
                if (this.hintType != 1) {
                    egret.localStorage.setItem("hintType", "1");
                }
                this.hintType == 1;
                this.bottomGroup.removeChild(this.hint);
            } else if (index == 1 && this.bottomGroup.getChildIndex(this.hint) == -1) {
                if (this.hintType != 2) {
                    egret.localStorage.setItem("hintType", "2");
                }
                this.hintType == 2;
                this.bottomGroup.addChild(this.hint);
            }
        } else if (settingsIndex == 2) {
            this.nextScoreType = index + 1;
            egret.localStorage.setItem("scoreType", String(this.nextScoreType));
        } else if (settingsIndex == 3) {
            this.vegasCumulativeType = index + 1;
            egret.localStorage.setItem("vegasCumulativeType", String(this.vegasCumulativeType));
            if (index == 0) {
                egret.localStorage.removeItem("score");
            }
        } else if (settingsIndex == 4) {
            this.soundVolume = index + 1;
            egret.localStorage.setItem("soundVolume", String(this.soundVolume));
        } else if (settingsIndex == 5) {
            var lastLanguage = this.language;
            if (index == 1) {
                if (this.language == "chinese") {
                    return;
                }
                this.language = "chinese";
                this.textDatas = this.textValue[this.language];
                egret.localStorage.setItem("language", "chinese");
            } else if (index == 0) {
                if (this.language == "english") {
                    return;
                }
                this.language = "english";
                this.textDatas = this.textValue[this.language];
                egret.localStorage.setItem("language", "english");
            } else if (index == 2) {
                if (this.language == "traditionalChinese") {
                    return;
                }
                this.language = "traditionalChinese";
                this.textDatas = this.textValue[this.language];
                egret.localStorage.setItem("language", "traditionalChinese");
            }
            this.changeLanguage(lastLanguage);
        } else if (settingsIndex == 6) {
            this.isDblclick = index + 1;
            egret.localStorage.setItem("isDblclick", String(this.isDblclick));
        }
    }

    private changeLanguage(lastLanguage) {
        if (this.scoreType != 1) {
            this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";;
        }
        this.timeText.text = this.textDatas["time"] + ": " + this.getTime();
        this.movesText.text = this.textDatas["moves"] + ": " + this.moves + " ";
        var settings = this.settings.getChildAt(1) as eui.Label;
        settings.text = this.textDatas["settings"];
        settings.x = (this.settings.width - settings.width) / 2;
        var batGame = this.batGame.getChildAt(1) as eui.Label;
        batGame.text = this.textDatas["batGame"];
        batGame.x = (this.batGame.width - batGame.width) / 2;
        var game = this.game.getChildAt(1) as eui.Label;
        game.text = this.textDatas["game"];
        game.x = (this.game.width - game.width) / 2;
        var hint = this.hint.getChildAt(1) as eui.Label;
        hint.text = this.textDatas["hint"];
        hint.x = (this.hint.width - hint.width) / 2;
        var restore = this.restore.getChildAt(1) as eui.Label;
        restore.text = this.textDatas["restore"];
        restore.x = (this.restore.width - restore.width) / 2;


        this.settingsTitle.text = this.textDatas['settingsTitle'];
        this.settingsTitle.x = (this.settingsTopGroup.width - this.settingsTitle.width) / 2;
        var datas = this.textDatas["settingsButton"];
        for (var i = 0; i < this.settingsButtonGroups.length; i++) {
            if (i == 0) {
                continue;
            }
            var nameGroup = this.settingsButtonGroups[i].getChildAt(0) as egret.Sprite;
            var title = nameGroup.getChildAt(1) as eui.Label;
            title.text = datas[i].title;
            if (this.settingsButtonGroups[i].numChildren > 1) {
                var content = this.settingsButtonGroups[i].getChildAt(1) as egret.Sprite;
                for (var j = 0; j < content.numChildren; j++) {
                    var button = content.getChildAt(j) as egret.Sprite;
                    var label = button.getChildAt(1) as eui.Label;
                    label.text = datas[i].content["button" + (j + 1)];
                }
            }
        }
        this.gameRules.text = datas[9].content;
    }

    private createContentButtonGroup(contentGroup, buttonText, isclick, i) {
        var buttonGroup = new eui.Group();
        contentGroup.addChild(buttonGroup);
        if (i == 1) {
            buttonGroup.x = 50;
        } else if (i == 2) {
            buttonGroup.x = 300;
        } else if (i == 3) {
            buttonGroup.x = 550;
        }
        buttonGroup.height = 98;
        var image = new eui.Image();
        if (isclick == true) {
            image.source = RES.getRes("click_png");
        } else {
            image.source = RES.getRes("noclick_png");
        }
        buttonGroup.addChild(image);
        image.y = 31;
        var label = new eui.Label();
        label.text = buttonText;
        buttonGroup.addChild(label);
        label.x = 60;
        label.size = 32;
        label.y = 33;
        if (isclick == true) {
            label.textColor = 0x00FFF0;
        }
        buttonGroup.touchEnabled = true;
        buttonGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buttonClick, this);
    }

    private removeGameGroupTween() {
        egret.Tween.get(this.gameGroup).to({ y: 1920 }, 100, egret.Ease.sineIn).wait(100).call(this.removeGameGroup, this);
    }

    private removeGameGroup() {
        this.mGroup.removeChild(this.gameGroup);
        this.mGroup.removeChild(this.shp);
    }

    private addCoverShape() {
        this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.bottomGroup), this.mGroup.numChildren - 1);
        this.shp = new egret.Shape();
        this.shp.graphics.beginFill(0x000000, 0.3);
        //  if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
        //      this.shp.graphics.drawRect(0, 0, window.innerWidth * 1080 / this.defaultWidth, window.innerHeight * 1920 / this.defaultHeight);
        // } else if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
        if (!this.isCrossScreen) {
            this.shp.graphics.drawRect(0, 0, this.mGroup.width, this.mGroup.height);
        } else {
            this.shp.graphics.drawRect(0, 0, Main.HEIGHT, Main.WIDTH);
        }
        // } 
        this.shp.graphics.endFill();
        this.mGroup.addChild(this.shp);
        this.mGroup.swapChildren(this.shp, this.bottomGroup);
        this.shp.touchEnabled = true;
        this.shp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shpTap, this);
    }

    private shpTap(e: egret.TouchEvent) {
        // if (e.stageY <= this.gameGroup.y) {
        if (this.mGroup.getChildIndex(this.gameGroup) != -1) {
            this.removeGameGroupTween();
        }
        //    }
    }

    private setGameGroup() {
        if (!this.isOverDeal) {
            return;
        }
        if (this.virtualCount != 0) {
            return;
        }
        if (this.mGroup.getChildIndex(this.gameGroup) != -1) {
            this.removeGameGroupTween();
            return;
        }
        if (this.mGroup.getChildIndex(this.settingsGroup) != -1) {
            this.closeSettings();
        }
        this.addCoverShape();
        this.gameGroup = new egret.Sprite();
        this.gameGroup.name = "game";
        this.mGroup.addChild(this.gameGroup);
        //      this.gameGroup.x = 76;
        var datas = this.textDatas["gameButton"];
        for (var key in datas) {
            var i = Number(key);
            var buttonGameGroup = this.createButtonGameGroup("gameButton_png", datas[i]);
            this.gameGroup.addChild(buttonGameGroup);
            if (i == 0) {
                buttonGameGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                    this.randStartGame();
                }, this);
            } else if (i == 1) {
                buttonGameGroup.y = 150;
                buttonGameGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                    this.reStartGame();
                }, this);
            } else if (i == 2) {
                buttonGameGroup.y = 350;
                buttonGameGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeGameGroupTween, this);
            }
            if (this.isCrossScreen) {
                // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                //     buttonGameGroup.scaleX = this.scaleXX;
                //     buttonGameGroup.scaleY = this.scaleYY;
                //     buttonGameGroup.y *= this.scaleYY;
                // } else {
                var scale_X, scale_Y;
                if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                    scale_X = this.defaultWidth / this.ScreenWidth;
                    scale_Y = this.defaultHeight / this.ScreenHeight;
                } else {
                    scale_X = this.defaultWidth / window.innerWidth;
                    scale_Y = this.defaultHeight / window.innerHeight;
                }
                buttonGameGroup.scaleX = scale_X;
                buttonGameGroup.scaleY = scale_Y;
                buttonGameGroup.y *= scale_Y;
                // }
            }
        }
        this.gameGroup.x = (this.mGroup.width - this.buttonGameImage.texture.textureWidth) / 2;
        if (this.isCrossScreen) {
            var scaleX;
            if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                scaleX = this.defaultWidth / this.ScreenWidth;
            } else {
                scaleX = this.defaultWidth / window.innerWidth;
            }
            this.gameGroup.x = (Main.HEIGHT - this.buttonGameImage.texture.textureWidth * scaleX) / 2;
        }
        this.gameGroup.y = 1920;
        var y = 1220;
        if (this.isCrossScreen) {
            y = Main.WIDTH / 3;
        }
        egret.Tween.get(this.gameGroup).to({ y: y }, 100, egret.Ease.sineIn);
    }

    private createButtonGameGroup(imageName, text) {
        var buttonGameGroup = new egret.Sprite();
        this.buttonGameImage = new eui.Image();
        this.buttonGameImage.texture = RES.getRes(imageName);
        buttonGameGroup.addChild(this.buttonGameImage);
        var label = new eui.Label();
        label.text = text;
        buttonGameGroup.addChild(label);
        label.size = 50;
        label.x = (this.buttonGameImage.texture.textureWidth - label.width) / 2;
        label.y = (this.buttonGameImage.texture.textureHeight - label.height) / 2;
        return buttonGameGroup;
    }

    private startGame() {
        this.isOverGame = false;
        this.isLoopDraw = false;
        this.isOverDeal = false;
        this.solitaire.init();
        this.moves = 0;
        this.movesText.text = this.textDatas["moves"] + ": " + this.moves + " ";
        var scaleX, scale_X, scale_Y, scaleY;
        if (this.isCrossScreen) {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                scaleX = this.defaultWidth / this.ScreenWidth;
                scaleY = this.defaultHeight / this.ScreenHeight;
            } else {
                scaleX = this.defaultWidth / window.innerWidth;
                scaleY = this.defaultHeight / window.innerHeight;
            }
        } else {
            scale_X = this.defaultWidth / this.ScreenWidth;
            scale_Y = this.defaultHeight / this.ScreenHeight;
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB || egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
                scale_X = this.defaultWidth / window.innerWidth;
                scale_Y = this.defaultHeight / window.innerHeight;
            }
        }
        for (var i = 0; i < this.solitaire.hands.length; i++) {
            var wasteCardGroup = new CardGroup(this.solitaire.hands[i]);
            wasteCardGroup.x = 0;
            wasteCardGroup.y = 0;
            if (this.isCrossScreen) {
                // this.scaleCardGroup(wasteCardGroup, scaleX, scaleY, true);
                this.scaleCardGroup(wasteCardGroup, 1, 1, true);
            } else {
                this.scaleCardGroup(wasteCardGroup, scale_X, scale_Y, true);
            }
            this.myFree.addChild(wasteCardGroup);
        }
        this.onclickCount = 0;
        this.myFree.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        var xx = 0;

        var cardGroups = [];
        this.myColumn = [];
        for (var i = 0; i < 7; i++) {
            this.myColumn[i] = new egret.Sprite();
            this.myColumn[i].x = i * (this.columnI_X - 3);
            this.myColumns.addChild(this.myColumn[i]);
            for (var j = i; j < 7; j++) {
                cardGroups[xx] = new CardGroup(this.solitaire.columns[j][i]);
                cardGroups[xx].touchEnabled = true;
                cardGroups[xx].anchorOffsetX = 149 / 2;
                if (this.isCrossScreen) {
                    cardGroups[xx].anchorOffsetX = 149 / 2 * scaleX;
                    //this.scaleCardGroup(cardGroups[xx], scaleX, scaleY, true);
                    this.scaleCardGroup(cardGroups[xx], 1, 1, true);
                } else {
                    cardGroups[xx].anchorOffsetX = 149 / 2 * scale_X;
                    this.scaleCardGroup(cardGroups[xx], scale_X, scale_Y, true);
                }
                this.mGroup.addChild(cardGroups[xx]);
                cardGroups[xx].x = 240 * 2.25;
                cardGroups[xx].y = 600 * 2.4;
                if (this.isCrossScreen) {//test
                    // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                    // cardGroups[xx].x = 240 * 2.25;
                    // cardGroups[xx].y = 600 * 2.4;
                    // } else {
                    cardGroups[xx].x = (this.mGroup.height - 149) / 2;
                    cardGroups[xx].y = this.mGroup.width - this.bottomGroup.height - 250;
                    //        }
                }
                xx++;
            }
        }
        xx = 0;
        for (var i = 0; i < 7; i++) {
            for (var j = i; j < 7; j++) {
                var x;
                var y = this.firstTop + this.SecondTop + 230 + i * 25;
                if (this.isCrossScreen) {
                    x = j * this.columnI_X + 149 / 2 * scaleX + this.myColumns.x;
                    y = i * 25 * scaleY;
                } else {
                    x = j * this.columnI_X + 149 / 2 * scale_X;
                    y = this.firstTop + this.SecondTop + 230 * scale_Y + i * 25;
                }
                var currentObject = cardGroups[xx];
                var tween = egret.Tween.get(currentObject).wait(105 * xx)
                    .call(this.soundDeal, this, [currentObject])
                    .to({ x: x, y: y }, 105, egret.Ease.sineIn);
                if (j == i) {
                    tween.call(this.swapObject, this, [currentObject])
                        .to({ scaleX: 0 }, 50, egret.Ease.sineOut)
                        .call(function (cardGroup: CardGroup) {
                            this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(cardGroup), cardGroup.parent.numChildren - 1);
                            if (this.mGroup.getChildIndex(this.settingsGroup) != -1) {
                                this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.settingsGroup), this.mGroup.numChildren - 1);
                            }
                            cardGroup.updataCard(true);
                        }, this, [currentObject])
                        .to({ scaleX: 1 }, 50, egret.Ease.sineOut).call(this.addTomyColumn, this, [i, j, currentObject]);
                } else {
                    tween.call(this.addTomyColumn, this, [i, j, currentObject]);
                }
                xx++;
            }
        }
    }

    private soundDeal(currentObject) {
        // if (egret.Capabilities.os == "Android") {
        //     var send = {
        //         type: "sound",
        //         data: "deal"
        //     };
        //     egret.ExternalInterface.call("sendToNative", JSON.stringify(send));
        // } else {
        var sound = this.dealSound.play(0, 1);
        sound.volume = this.soundVolume - 1;
        // }
        this.swapObject(currentObject);
    }

    private scaleCardGroup(cardGroup, scaleX, scaleY, isStartGame = false) {
        cardGroup.getChildAt(0).scaleX = scaleX;
        cardGroup.getChildAt(0).scaleY = scaleY;
        cardGroup.getChildAt(1).scaleX = scaleX;
        cardGroup.getChildAt(1).scaleY = scaleY;
        cardGroup.getChildAt(2).scaleX = scaleX;
        cardGroup.getChildAt(2).scaleY = scaleY;
        cardGroup.getChildAt(3).scaleX = scaleX;
        cardGroup.getChildAt(3).scaleY = scaleY;
        if (cardGroup.numChildren > 4) {
            cardGroup.getChildAt(4).scaleX = scaleX;
            cardGroup.getChildAt(4).scaleY = scaleY;
        }
        // if (isStartGame) {
        this.scaleCardGroupXY(cardGroup, scaleX, scaleY);
        //    }
    }

    private scaleCardGroupXY(cardGroup, scaleX, scaleY) {
        cardGroup.getChildAt(1).x *= scaleX;
        cardGroup.getChildAt(1).y *= scaleY;
        cardGroup.getChildAt(2).x *= scaleX;
        cardGroup.getChildAt(2).y *= scaleY;
        cardGroup.getChildAt(3).x *= scaleX;
        cardGroup.getChildAt(3).y *= scaleY;
    }

    private removeCardGroup() {
        for (var i = 0; i < 4; i++) { //左上收牌区
            for (var j = 0; j < this.solitaire.suits[i].length; j++) {
                this.mySuit[i].removeChildAt(1);
            }
        }
        this.myWaste.removeChildren();
        for (var i = 0; i < this.solitaire.hands.length; i++) {
            this.myFree.removeChildAt(1);
        }
        for (var i = 0; i < this.solitaire.columns.length; i++) {
            this.myColumn[i].removeChildren();
        }
        this.solitaire.deleteData();
    }

    private removeTopGroup() {//重新计分计数计时
        var vegasCumulativeType = egret.localStorage.getItem("vegasCumulativeType");
        this.saveScore();
        this.scoreType = this.nextScoreType ? this.nextScoreType : this.scoreType;
        if (this.scoreType == 3) {
            this.drowCount = 0;
            var score = egret.localStorage.getItem("score");
            if (vegasCumulativeType != undefined && vegasCumulativeType == "2" && score != undefined) {
                this.score = Number(score) - 52;
                this.saveScore();
            } else {
                this.score = -52;
            }
        } else {
            this.score = 0;
        }
        this.moves = 0;
        this.timer.reset();
        this.isStart = false;
        if (this.scoreType != 1) {
            this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";;
            this.scoreText.size = this.topSize;
            this.mGroup.addChild(this.scoreText);
            this.scoreText.x = 60;
        }
        this.movesText.text = this.textDatas["moves"] + ": " + this.moves + " ";
        this.movesText.x = 280;
        if (this.scoreType == 1) {
            this.movesText.x = 150;
        }
        this.timeText.text = this.textDatas["time"] + ": 00:00";
        this.timeText.x = 500;
        if (this.scoreType == 1) {
            this.timeText.x = 450;
        }
        this.lastClickDragCardCount = -1;
    }

    private resetTopGroup() {
        if (this.scoreType == 1) {
            if (this.mGroup.getChildIndex(this.scoreText) != -1) {
                this.mGroup.removeChild(this.scoreText);
            }
            if (this.isCrossScreen) {
                this.movesText.x = this.mGroup.height / 3;
                this.timeText.x = this.mGroup.height / 3 * 2;
            } else {
                this.movesText.x = 150;
                this.timeText.x = 450;
            }
        } else {
            if (this.mGroup.getChildIndex(this.scoreText) == -1) {
                this.mGroup.addChild(this.scoreText);
            }
            if (this.isCrossScreen) {
                this.scoreText.x = (this.mGroup.height / 3 - this.scoreText.width) / 2;
                this.movesText.x = this.mGroup.height / 3 + this.scoreText.x;
                this.timeText.x = this.mGroup.height / 3 * 2 + this.scoreText.x;
            } else {
                this.scoreText.x = 60;
                this.movesText.x = 280;
                this.timeText.x = 500;
            }
        }
    }

    private show_ad_over: number;
    private reStartGame() {
        if (this.mGroup.getChildIndex(this.gameGroup) != -1) {
            this.removeGameGroup();
        } else if (this.mGroup.getChildIndex(this.wonGroup) != -1) {
            this.mGroup.removeChild(this.wonGroup);
        }
        this.removeCardGroup();
        this.removeTopGroup();
        this.resetTopGroup();
        if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
            var send = {
                type: "show_ad"
            };
            this.show_ad_over = 1;
            egret.ExternalInterface.call("sendToNative", JSON.stringify(send));
        }
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB || egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
            this.startGame();
        }
    }

    private randStartGame() {
        this.solitaire.shuffle();
        this.reStartGame();
    }

    private timerFunc() {
        var second = this.timer.delay * this.timer.currentCount / 1000;
        if (second % 10 == 0 && this.scoreType == 2) {
            console.log("10!")
            this.score -= 2;
            if (this.score < 0) {
                this.score = 0;
            }
            this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
        }
        this.timeText.text = this.textDatas["time"] + ": " + this.getTime();
    }

    private getTime() {
        var second = this.timer.delay * this.timer.currentCount / 1000;

        var minute = 0;
        if (second >= 60) {
            minute = Math.floor(second / 60);
            second = second % 60;
        }
        if (second < 10) {
            var str = ":0" + second;
        } else {
            str = ":" + second;
        }
        if (minute < 10) {
            return "0" + minute + str;
        } else {
            return minute + str;
        }
    }

    private swapObject(nParentObject) {
        var parentObject = nParentObject.parent;
        if (parentObject) {
            parentObject.swapChildrenAt(parentObject.getChildIndex(nParentObject), parentObject.numChildren - 1);
        }
        if (parentObject.parent) {
            parentObject.parent.swapChildrenAt(parentObject.parent.getChildIndex(parentObject), parentObject.parent.numChildren - 1);
        }
        if (parentObject.parent.parent) {
            parentObject.parent.parent.swapChildrenAt(parentObject.parent.parent.getChildIndex(parentObject.parent), parentObject.parent.parent.numChildren - 1);
        }
        if (this.mGroup.getChildIndex(this.settingsGroup) != -1) {
            this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.settingsGroup), this.mGroup.numChildren - 1);
        }
        if (this.isCrossScreen) {
            if (this.mGroup.getChildIndex(this.bottomGroup) != -1) {
                this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.bottomGroup), this.mGroup.numChildren - 1);
            }
        }
    }

    private flopAnimation(cardGroup: CardGroup, isWaste = false, isSuit = false) {
        if (!isSuit) {
            // if (egret.Capabilities.os == "Android") {
            //     var send = {
            //         type: "sound",
            //         data: "flop"
            //     };
            //     egret.ExternalInterface.call("sendToNative", JSON.stringify(send));
            // } else {
            var sound = this.flopSound.play(0, 1);
            sound.volume = this.soundVolume - 1;
            // }
        }
        if (!this.isCrossScreen) {
            cardGroup.anchorOffsetX = 149 / 2;
            if (!isWaste) {
                cardGroup.x += 149 / 2;
            }
            egret.Tween.get(cardGroup).to({ scaleX: 0 }, 30, egret.Ease.sineOut).call(function (cardGroup: CardGroup) {
                cardGroup.updataCard(true);
            }, this, [cardGroup]).to({ scaleX: 1 }, 30, egret.Ease.sineOut).call(function (cardGroup: CardGroup) {
                cardGroup.anchorOffsetX = 0;
                if (!isWaste) {
                    cardGroup.x -= 149 / 2;
                }
            }, this, [cardGroup]).wait(60).call(this.isflopWon, this, [isWaste]);
        } else {
            cardGroup.anchorOffsetX = 149 * this.scaleXX / 2;
            if (!isWaste) {
                cardGroup.x += 149 * this.scaleXX / 2;
            }
            egret.Tween.get(cardGroup).to({ scaleX: 0 }, 30, egret.Ease.sineOut).call(function (cardGroup: CardGroup) {
                cardGroup.updataCard(true);
            }, this, [cardGroup]).to({ scaleX: 1 }, 30, egret.Ease.sineOut).call(function (cardGroup: CardGroup) {
                cardGroup.anchorOffsetX = 0;
                if (!isWaste) {
                    cardGroup.x -= 149 * this.scaleXX / 2;
                }
            }, this, [cardGroup]).wait(60).call(this.isflopWon, this, [isWaste]);;
        }
        if (!isWaste && this.scoreType == 2) {
            this.score += 5;
            this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
        }
    }

    private isflopWon(isWaste) {
        if (this.solitaire.isDfsOver() && !isWaste) {
            this.autoComplete();
        }
    }

    private addTomyColumn(i: number, j: number, cardGroup: CardGroup) {
        this.myColumn[j].addChild(cardGroup);
        cardGroup.anchorOffsetX = 0;
        cardGroup.x = 0;
        cardGroup.y = i * 25;
        if (this.isCrossScreen) {//test
            var scaleY;
            if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                scaleY = this.defaultHeight / this.ScreenHeight;
            } else {
                scaleY = this.defaultHeight / window.innerHeight;
            }
            cardGroup.y = i * 25 * scaleY;
        }
        cardGroup.touchEnabled = true;
        cardGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dblclick, this);
        cardGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMove, this);
        cardGroup.addEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
        cardGroup.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.stopMove, this);
        cardGroup.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.stopMove, this);

        if (i == 6 && j == 6) {
            this.isOverDeal = true;
        }
    }

    private dblclick(e: egret.TouchEvent): void {
        console.log("dblclick");
        if (this.mGroup.getChildIndex(this.gameGroup) != -1 || this.mGroup.getChildIndex(this.settingsGroup) != -1) {
            return;
        }
        if (this.isDblclick == 2) {//关闭
            return;
        }
        if (this.isMove) {
            this.isMove = false;
            return;
        }
        this.dblCardGroup = e.currentTarget as CardGroup;
        if (this.dblCardGroup.card.status) {
            this.autoMove(e.stageX, e.stageY, this.dblCardGroup);
        }
        this.dblCardGroup = null;
        if (this.isCrossScreen) {
            if (this.mGroup.getChildIndex(this.bottomGroup) != -1) {
                this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.bottomGroup), this.mGroup.numChildren - 1);
                this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.myColumns), this.mGroup.numChildren - 2);
            } else {
                this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.myColumns), this.mGroup.numChildren - 1);
            }
        }
        this.dragCard = null;
        this.draggedObject = null;
    }

    private autoMove(stageX, stageY, cardGroup: CardGroup) {
        var hasMove = false;
        if (!this.isCrossScreen) {
            var scale_Y = this.defaultHeight / window.innerHeight;
            if (stageY >= this.firstTop + 230 * scale_Y + this.SecondTop) {
                hasMove = this.autoMoveColumn(stageX, cardGroup);
            } else if (stageX >= this.columnI_X * 4) {
                hasMove = this.autoMoveWaste(cardGroup);
            } else {
                hasMove = this.autoMoveSuit(stageX, cardGroup);
            }
        } else {
            var e_stageX = stageY; var e_stageY = this.mGroup.width - stageX;
            if (this.leftScreen) {
                e_stageX = this.mGroup.height - stageY;
                e_stageY = stageX;
            }
            var suitY = (this.mGroup.width - 230 * 4 - 100) / 5;
            stageX = e_stageX;
            stageY = e_stageY;
            if (stageX >= this.myColumns.x && stageX <= this.myColumns.x + this.mGroup.width) {
                hasMove = this.autoMoveColumn(stageX, cardGroup);
            } else if (stageX > this.myColumns.x + this.mGroup.width) {
                hasMove = this.autoMoveWaste(cardGroup);
            } else if (stageX < this.myColumns.x && stageY >= 50 + suitY) {
                hasMove = this.autoMoveSuit(stageY, cardGroup);
            }
        }
        if (!hasMove && this.isCrossScreen) {
            var nParentObject = this.myColumns;
            nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
        }
        if (hasMove && this.solitaire.isWon()) {
            this.Won();
        }
    }

    private Soundsound() {
        // if (egret.Capabilities.os == "Android") {
        //     var send = {
        //         type: "sound",
        //         data: "sound"
        //     };
        //     egret.ExternalInterface.call("sendToNative", JSON.stringify(send));
        // } else {
        var sound = this.soundSound.play(0, 1);
        sound.volume = this.soundVolume - 1;
        // }
    }

    private autoMoveColumn(stageX, cardGroup: CardGroup) {
        var cardParent = cardGroup.parent; var i;
        var j = cardParent.getChildIndex(cardGroup);
        for (var index = 0; index < 7; index++) {
            if (this.solitaire.columns[index].length == 0) {
                continue;
            }
            if (!this.isCrossScreen) {
                if (index * this.columnI_X <= stageX && stageX <= index * this.columnI_X + 149) {
                    i = index;
                    break;
                }
            } else {
                // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                //     if (index * this.columnI_X + 70 * 2.25 <= stageX && stageX <= 70 * 2.25 + index * this.columnI_X + 149 * this.scaleXX) {
                //         i = index;
                //         break;
                //     }
                // } else {
                if (index * this.columnI_X + this.myColumns.x <= stageX && stageX <= this.myColumns.x + index * this.columnI_X + 149) {
                    i = index;
                    break;
                }
                // }
            }
        }
        if (i == undefined) {
            var offsetX = 20; var x = cardGroup.x;
            egret.Tween.get(cardGroup).to({ x: x - offsetX }, 25, egret.Ease.sineIn)
                .to({ x: x + offsetX }, 50, egret.Ease.sineIn)
                .to({ x: x }, 25, egret.Ease.sineIn);
            return false;
        }
        var y = cardGroup.y; var suitY = (this.mGroup.width - 230 * 4 - 100) / 5;
        if (this.solitaire.columns[i].length == j + 1) {
            var result = this.isSuitsCard(cardGroup.card, cardGroup);
            if (result != null) {
                if (!this.isCrossScreen) {
                    cardGroup.x = (i - result) * this.columnI_X;
                    cardGroup.y = 230 + this.SecondTop + y;
                } else {
                    // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                    //     cardGroup.x = 70 * 2.25 + i * this.columnI_X;
                    //     cardGroup.y = y - (result * 180 + 50) * 2.4;
                    // } else {
                    cardGroup.x = this.myColumns.x + i * this.columnI_X;
                    cardGroup.y = y - (result * (230 + suitY) + 50 + suitY);
                    //}
                }
                var nParentObject = cardGroup.parent.parent;
                if (this.mGroup.getChildIndex(this.bottomGroup) != -1) {
                    this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.bottomGroup), this.mGroup.numChildren - 1);
                    nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 2);
                } else {
                    nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
                }
                var tween = egret.Tween.get(cardGroup).to({ x: 0, y: 0 }, 100, egret.Ease.sineIn).call(this.Soundsound, this);
                if (this.isCrossScreen) {
                    tween.wait(100).call(this.swapObject, this, [this.myColumns]);
                }
                this.solitaire.columns[i].pop();
                var len = this.solitaire.columns[i].length;
                var isflopAnimation = false;
                if (len > 0) {
                    if (!this.solitaire.columns[i][len - 1].status) {
                        var currentCardGroup = this.myColumn[i].getChildAt(len - 1) as CardGroup;
                        this.flopAnimation(currentCardGroup);
                        isflopAnimation = true;
                    }
                }
                var record = new Records(cardGroup, cardParent as egret.Sprite, "columns", i, "suits", result, isflopAnimation);
                this.record.push(record);
                this.setParticle(result, cardGroup.card);
                if (this.scoreType == 2) {
                    this.score += 10;
                    this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
                } else if (this.scoreType == 3) {
                    this.score += 5;
                    this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
                    this.saveScore();
                }
                this.moves++;
                this.movesText.text = this.textDatas["moves"] + ": " + this.moves + " ";
                this.isLoopDraw = false;
                return true;
            }
        }
        var res = this.isColumnMoveCard(cardGroup.card, cardGroup, i, j);
        if (res != null) {
            this.solitaire.columns[i] = this.solitaire.columns[i].slice(0, j);
            var len = this.solitaire.columns[i].length;
            var isflopAnimation = false;
            if (len > 0) {
                if (!this.solitaire.columns[i][len - 1].status) {
                    var currentCardGroup = this.myColumn[i].getChildAt(len - 1) as CardGroup;
                    this.flopAnimation(currentCardGroup);
                    isflopAnimation = true;
                }
            }
            var record = new Records(cardGroup, cardParent as egret.Sprite, "columns", i, "columns", res, isflopAnimation);
            this.record.push(record);
            this.moves++;
            this.movesText.text = this.textDatas["moves"] + ": " + this.moves + " ";
            this.isLoopDraw = false;
            return true;
        }
        var offsetX = 20;
        for (var k = j; k < this.solitaire.columns[i].length; k++) {
            var currentCard = cardParent.getChildAt(k);
            var x = currentCard.x;
            egret.Tween.get(currentCard).to({ x: x - offsetX }, 25, egret.Ease.sineIn)
                .to({ x: x + offsetX }, 50, egret.Ease.sineIn)
                .to({ x: x }, 25, egret.Ease.sineIn);
        }
        return false;
    }

    private autoMoveWaste(cardGroup: CardGroup) {
        var cardParent = cardGroup.parent;
        var index = cardParent.getChildIndex(cardGroup);
        var len = this.solitaire.wastes.length;
        if (len - 1 != index) {
            return false;
        }
        var x = cardGroup.x;
        var suitY = (this.mGroup.width - 230 * 4 - 100) / 5;
        var result = this.isSuitsCard(cardGroup.card, cardGroup);
        if (result != null) {
            if (!this.isCrossScreen) {
                cardGroup.x = (667.5 + x) - result * this.columnI_X;
                cardGroup.y = 0;
            } else {
                // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                //     cardGroup.x = 390 * 2.25 + x;
                //     cardGroup.y = 100 * 2.4 - (result * 180 + 50) * 2.4;
                // } else{
                cardGroup.x = this.myFreeBg.x + this.myWaste.x + x;
                cardGroup.y = this.myGroup.y + 150 - (result * (230 + suitY) + 50 + suitY);
                // }
            }
            var nParentObject = cardGroup.parent;
            nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1)
            var nParentObject = cardGroup.parent.parent;
            nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
            var tween = egret.Tween.get(cardGroup).to({ x: 0, y: 0 }, 100, egret.Ease.sineIn).call(this.Soundsound, this);;
            if (this.isCrossScreen) {
                tween.wait(100).call(this.swapObject, this, [this.myColumns]);
            }
            this.solitaire.wastes.pop();
            var wasteNum = this.myWaste.numChildren;
            if (wasteNum >= 3) {
                for (var k = 0; k < 2; k++) {
                    egret.Tween.get(this.myWaste.getChildAt(wasteNum - 1 - k)).to({ x: 20 * (2 - k) * 2.25 }, 100, egret.Ease.sineIn);
                }
            }
            var record = new Records(cardGroup, cardParent as egret.Sprite, "wastes", 1, "suits", result);
            this.record.push(record);
            this.setParticle(result, cardGroup.card);
            if (this.scoreType == 2) {
                this.score += 10;
                this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
            } else if (this.scoreType == 3) {
                this.score += 5;
                this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
                this.saveScore();
            }
            this.moves++;
            this.movesText.text = this.textDatas["moves"] + ": " + this.moves + " ";
            this.isLoopDraw = false;
            return true;
        } else {
            var res = this.isMoveToColumnCard(cardGroup.card, cardGroup);
            if (res != null) {
                this.solitaire.wastes.pop();
                var wasteNum = this.myWaste.numChildren;
                if (wasteNum >= 3) {
                    for (var k = 0; k < 2; k++) {
                        this.myWaste.getChildAt(wasteNum - 1 - k).x = 20 * (2 - k) * 2.25;
                    }
                }
                record = new Records(cardGroup, cardParent as egret.Sprite, "wastes", 1, "columns", res);
                this.record.push(record);
                if (this.scoreType == 2) {
                    this.score += 5;
                    this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
                }
                this.moves++;
                this.movesText.text = this.textDatas["moves"] + ": " + this.moves + " ";
                this.isLoopDraw = false;
                return true;
            }
            var offsetX = 20; var x = cardGroup.x;
            egret.Tween.get(cardGroup).to({ x: x - offsetX }, 25, egret.Ease.sineIn)
                .to({ x: x + offsetX }, 50, egret.Ease.sineIn)
                .to({ x: x }, 25, egret.Ease.sineIn);
            return false;
        }
    }

    private autoMoveSuit(stageX, cardGroup: CardGroup) {
        var cardParent = cardGroup.parent; var index;
        var suitY = (this.mGroup.width - 230 * 4 - 100) / 5;
        for (var i = 0; i < 4; i++) {
            if (this.solitaire.suits[i].length == 0) {
                continue;
            }
            if (!this.isCrossScreen) {
                if (i * this.columnI_X <= stageX && stageX <= i * this.columnI_X + 149) {
                    index = i;
                    break;
                }
            } else {
                // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                //     if ((i * 180 + 50) * 2.4 <= stageX && stageX <= (i * 180 + 50) * 2.4 + 230 * this.scaleYY) {
                //         index = i;
                //         break;
                //     }
                // } else{
                if (i * (230 + suitY) + 50 + suitY <= stageX && stageX <= i * (230 + suitY) + 50 + suitY + 230) {
                    index = i;
                    break;
                }
                // }
            }
        }
        var res = this.isMoveToColumnCard(cardGroup.card, cardGroup, index);
        if (res != null) {
            this.solitaire.suits[index].pop();
            var record = new Records(cardGroup, cardParent as egret.Sprite, "suits", index, "columns", res);
            this.record.push(record);
            if (this.scoreType == 2) {
                this.score -= 15;
                if (this.score < 0) {
                    this.score = 0;
                }
                this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
                console.log("1!")
            } else if (this.scoreType == 3) {
                this.score -= 5;
                this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
            }
            this.moves++;
            this.movesText.text = this.textDatas["moves"] + ": " + this.moves + " ";
            return true;
        }
        var offsetX = 20; var x = cardGroup.x;
        egret.Tween.get(cardGroup).to({ x: x - offsetX }, 25, egret.Ease.sineIn)
            .to({ x: x + offsetX }, 50, egret.Ease.sineIn)
            .to({ x: x }, 25, egret.Ease.sineIn);
        return false;
    }

    private isMoveToColumnCard(card: Card, cardGroup: CardGroup, isSuits = -1) {
        var suitY = (this.mGroup.width - 230 * 4 - 100) / 5;
        for (var i = 0; i < 7; i++) {
            var xx; var yy;
            if (isSuits == -1) {
                if (!this.isCrossScreen) {
                    xx = 667.5 + cardGroup.x - i * this.columnI_X;
                    yy = -this.SecondTop - 230;
                } else {
                    // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                    //     xx = (390 - 70) * 2.25 + cardGroup.x - i * this.columnI_X;
                    //     yy = 100 * 2.4;
                    // } else {
                    xx = (this.myFreeBg.x + this.myWaste.x) - this.myColumns.x + cardGroup.x - i * this.columnI_X;
                    yy = this.myGroup.y + 150;
                    // }
                }
            } else {
                if (!this.isCrossScreen) {
                    xx = cardGroup.parent.x - i * this.columnI_X;
                    yy = -this.SecondTop - 230;
                } else {
                    // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                    //     xx = -70 * 2.25 - i * this.columnI_X;
                    //     yy = (50 + 180 * isSuits) * 2.4;
                    // } else {
                    xx = -this.myColumns.x - i * this.columnI_X;
                    yy = 50 + suitY + (230 + suitY) * isSuits;
                    // }
                }
            }
            var len = this.solitaire.columns[i].length;
            if (len > 0) {
                if (this.solitaire.columns[i][len - 1].color != card.color && this.solitaire.columns[i][len - 1].value == card.value + 1) {
                    var y = this.myColumn[i].getChildAt(this.myColumn[i].numChildren - 1).y;
                    this.myColumn[i].addChild(cardGroup);
                    cardGroup.x = xx;
                    cardGroup.y = yy;
                    var nParentObject = cardGroup.parent;
                    nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
                    var nParentObject = cardGroup.parent.parent;
                    nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
                    var tween;
                    if (!this.isCrossScreen) {
                        tween = egret.Tween.get(cardGroup).to({ x: 0, y: y + 61 }, 100, egret.Ease.sineIn);
                    } else {
                        // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                        //     tween = egret.Tween.get(cardGroup).to({ x: 0, y: y + 61 * this.scaleYY }, 100, egret.Ease.sineIn).wait(100).call(this.swapObject, this, [this.myColumns]);
                        // } else {
                        tween = egret.Tween.get(cardGroup).to({ x: 0, y: y + 61 }, 100, egret.Ease.sineIn).wait(100).call(this.swapObject, this, [this.myColumns]);
                        // }
                    }
                    this.solitaire.columns[i].push(card);
                    return i;
                }
            } else {
                if (card.value == 13) {
                    if (this.myColumn[i].numChildren > 0) {
                        y = this.myColumn[i].getChildAt(this.myColumn[i].numChildren - 1).y;
                    }
                    this.myColumn[i].addChild(cardGroup);
                    cardGroup.x = xx;
                    cardGroup.y = yy;
                    var nParentObject = cardGroup.parent;
                    nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
                    var nParentObject = cardGroup.parent.parent;
                    nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
                    if (this.myColumn[i].numChildren > 1) {
                        if (!this.isCrossScreen) {
                            egret.Tween.get(cardGroup).to({ x: 0, y: y + 61 }, 100, egret.Ease.sineIn);
                        } else {
                            // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                            //     egret.Tween.get(cardGroup).to({ x: 0, y: y + 61 * this.scaleYY }, 100, egret.Ease.sineIn).wait(100).call(this.swapObject, this, [this.myColumns]);
                            // } else {
                            egret.Tween.get(cardGroup).to({ x: 0, y: y + 61 * this.scaleYY }, 100, egret.Ease.sineIn).wait(100).call(this.swapObject, this, [this.myColumns]);
                            // }
                        }
                    } else {
                        tween = egret.Tween.get(cardGroup).to({ x: 0, y: 0 }, 100, egret.Ease.sineIn);
                        if (this.isCrossScreen) {
                            tween.wait(100).call(this.swapObject, this, [this.myColumns]);
                        }
                    }
                    this.solitaire.columns[i].push(card);
                    return i;
                }
            }
        }
        return null;
    }

    private isColumnMoveCard(card: Card, cardGroup: CardGroup, index, j) {
        for (var i = 0; i < 7; i++) {
            if (i == index) {
                continue;
            }
            var len = this.solitaire.columns[i].length;
            if (len > 0) {
                if (this.solitaire.columns[i][len - 1].color != card.color && this.solitaire.columns[i][len - 1].value == card.value + 1) {
                    var cardLen = this.solitaire.columns[index].length;
                    var cards = this.solitaire.columns[index].slice(j);
                    this.solitaire.columns[i] = this.solitaire.columns[i].concat(cards);
                    var cardParent = cardGroup.parent;
                    var xx = cardParent.x - this.myColumn[i].x;
                    var y = this.myColumn[i].getChildAt(this.myColumn[i].numChildren - 1).y;
                    for (var k = j; k < cardLen; k++) {
                        var currentCard = cardParent.getChildAt(j);
                        var yy = currentCard.y;
                        this.myColumn[i].addChild(currentCard);
                        this.swapObject(currentCard);
                        currentCard.x = xx;
                        currentCard.y = yy;
                        if (!this.isCrossScreen) {
                            y += 61;
                        } else {
                            // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                            //     y += 61 * this.scaleYY;
                            // } else {
                            y += 61;
                            // }
                        }
                        egret.Tween.get(currentCard).to({ x: 0, y: y }, 100, egret.Ease.sineIn);
                    }
                    if (this.isCrossScreen) {
                        egret.Tween.get(this).wait(100).call(this.swapObject, this, [this.myColumns]);
                    }
                    return i;
                }
            } else {
                if (card.value == 13) {
                    var cardLen = this.solitaire.columns[index].length;
                    var cards = this.solitaire.columns[index].slice(j);
                    this.solitaire.columns[i] = this.solitaire.columns[i].concat(cards);
                    var cardParent = cardGroup.parent;
                    var xx = cardParent.x - this.myColumn[i].x;
                    if (this.myColumn[i].numChildren > 0) {
                        y = this.myColumn[i].getChildAt(this.myColumn[i].numChildren - 1).y;
                    } else {
                        y = 0;
                    }
                    for (var k = j; k < cardLen; k++) {
                        var currentCard = cardParent.getChildAt(j);
                        var yy = currentCard.y;
                        this.myColumn[i].addChild(currentCard);
                        this.swapObject(currentCard);
                        currentCard.x = xx;
                        currentCard.y = yy;
                        if (this.myColumn[i].numChildren > 1) {
                            if (!this.isCrossScreen) {
                                y += 61;
                            } else {
                                // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                                //     y += 61 * this.scaleYY;
                                // } else {
                                y += 61;
                                // }
                            }
                        }
                        egret.Tween.get(currentCard).to({ x: 0, y: y }, 100, egret.Ease.sineIn);
                    }
                    if (this.isCrossScreen) {
                        egret.Tween.get(this).wait(100).call(this.swapObject, this, [this.myColumns]);
                    }
                    return i;
                }
            }
        }
        return null;
    }

    private isSuitsCard(card, cardGroup) {
        for (var j = 0; j < 4; j++) {
            var suitsILen = this.solitaire.suits[j].length;
            if (suitsILen == 13) {
                continue;
            }
            if (suitsILen == 0) {
                if (card.value == 1) {
                    this.solitaire.suits[j].push(card);
                    this.mySuit[j].addChild(cardGroup);
                    cardGroup.x = 0;
                    cardGroup.y = 0;
                    return j;
                }
            } else {
                var suitsICard = this.solitaire.suits[j][suitsILen - 1];
                if (card.suit == suitsICard.suit && card.value == suitsICard.value + 1) {
                    this.solitaire.suits[j].push(card);
                    this.mySuit[j].addChild(cardGroup);
                    cardGroup.x = 0;
                    cardGroup.y = 0;
                    return j;
                }
            }
        }
        return null;
    }

    private setParticle(i, card: Card) {
        var topX, topY, bottomX, bottomY, leftX, leftY, rightX, rightY;
        var topConfig, bottomConfig, leftConfig, rightConfig;
        var scale_X, scale_Y;
        if (!this.isCrossScreen) {
            scale_X = this.defaultWidth / this.ScreenWidth;
            scale_Y = this.defaultHeight / this.ScreenHeight;
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB || egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
                scale_X = this.defaultWidth / window.innerWidth;
                scale_Y = this.defaultHeight / window.innerHeight;
            }
            topX = i * this.columnI_X / scale_X + 149 / 2; topY = 5; bottomX = i * this.columnI_X / scale_X + 149 / 2; bottomY = 230 - 5;
            leftX = i * this.columnI_X / scale_X + 5; leftY = 230 / 2; rightX = i * this.columnI_X / scale_X + 149 - 5; rightY = 230 / 2;
            topConfig = RES.getRes("topParticle_json"); bottomConfig = RES.getRes("bottomParticle_json");
            leftConfig = RES.getRes("leftParticle_json"); rightConfig = RES.getRes("rightParticle_json");
        } else {
            var suitY = (this.mGroup.width - 230 * 4 - 100) / 5;
            scale_X = this.defaultWidth / this.ScreenWidth;
            scale_Y = this.defaultHeight / this.ScreenHeight;
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB || egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
                scale_X = this.defaultWidth / window.innerWidth;
                scale_Y = this.defaultHeight / window.innerHeight;
            }
            topX = 149 / 2; topY = i * (230 + suitY) / scale_Y + 5; bottomX = 149 / 2; bottomY = i * (230 + suitY) / scale_Y + 230 - 5;
            leftX = 10; leftY = i * (230 + suitY) / scale_Y + 230 / 2; rightX = 149 + 5; rightY = i * (230 + suitY) / scale_Y + 230 / 2;
            topConfig = RES.getRes("crossTopParticle_json"); bottomConfig = RES.getRes("crossBottomParticle_json");
            leftConfig = RES.getRes("crossLeftParticle_json"); rightConfig = RES.getRes("crossRightParticle_json");
        }
        var time = 500;
        var texture = RES.getRes(card.suit + "Parts_png");

        texture.scaleX = scale_X;
        texture.scaleY = scale_Y;

        this.topParticle = new particle.GravityParticleSystem(texture, topConfig);
        this.topParticle.emitterX = topX;
        this.topParticle.emitterY = topY;
        this.topParticle.scaleX = scale_X;
        this.topParticle.scaleY = scale_Y;
        this.topParticle.start(time);

        this.bottomParticle = new particle.GravityParticleSystem(texture, bottomConfig);
        this.bottomParticle.emitterX = bottomX;
        this.bottomParticle.emitterY = bottomY;
        this.bottomParticle.scaleX = scale_X;
        this.bottomParticle.scaleY = scale_Y;
        this.bottomParticle.start(time);

        this.leftParticle = new particle.GravityParticleSystem(texture, leftConfig);
        this.leftParticle.emitterX = leftX;
        this.leftParticle.emitterY = leftY;
        this.leftParticle.scaleX = scale_X;
        this.leftParticle.scaleY = scale_Y;
        this.leftParticle.start(time);

        this.rightParticle = new particle.GravityParticleSystem(texture, rightConfig);
        this.rightParticle.emitterX = rightX;
        this.rightParticle.emitterY = rightY;
        this.rightParticle.scaleX = scale_X;
        this.rightParticle.scaleY = scale_Y;
        this.rightParticle.start(time);

        this.mySuitBg.addChild(this.topParticle);
        this.mySuitBg.addChild(this.bottomParticle);
        this.mySuitBg.addChild(this.leftParticle);
        this.mySuitBg.addChild(this.rightParticle);
    }

    private getGroupNumY(group: egret.Sprite, isflopAnimation: boolean) {
        var GroupNumY = 0;
        if (group.numChildren > 0) {
            for (var i = 0; i < group.numChildren; i++) {
                var cardGroup = group.getChildAt(i) as CardGroup;
                if (!cardGroup.card.status) {
                    // if (this.isCrossScreen && egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                    //     GroupNumY += 25 * this.scaleYY;
                    // }
                    // else {
                    GroupNumY += 25;
                    // }
                } else {
                    if (i == group.numChildren - 1 && isflopAnimation == true) {
                        // if (this.isCrossScreen && egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                        //     GroupNumY += 25 * this.scaleYY;
                        // }
                        // else {
                        GroupNumY += 25;
                        // }
                    } else {
                        // if (this.isCrossScreen && egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                        //     GroupNumY += 61 * this.scaleYY;
                        // }
                        // else {
                        GroupNumY += 61;
                        // }
                    }
                }
            }
        }
        return GroupNumY;
    }

    private launchTween() {
        if (this.mGroup.getChildIndex(this.gameGroup) != -1 || this.mGroup.getChildIndex(this.settingsGroup) != -1) {
            return;
        }
        if (this.virtualCount != 0) {
            return;
        }
        this.touchCount++;
        if (this.touchCount == 1) {
            this.tweenLoad();
        }
    }

    private tweenLoad() {
        var record = this.record.pop();
        if (!record) {
            this.touchCount--;
            return;
        }
        var card = record.card;
        var group = record.group;
        var groupX = group.localToGlobal().x;
        var groupY = group.localToGlobal().y;

        var groupNumX = 0;
        var groupNumY;
        if (!this.isCrossScreen) {
            if (record.begin == "columns") {
                groupNumY = this.getGroupNumY(group, record.isflopAnimation);
            }
            if (groupY < 230 + this.firstTop) {
                if (667 <= groupX && groupX <= 910) {
                    groupNumX = group.numChildren < 3 ? group.numChildren * 48 : 96;
                }
                groupNumY = 0;
            }
            var nParentObject = card.parent;
            if (nParentObject == null) {
                return;
            }
            if (nParentObject.parent) {
                nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
            }
            nParentObject = card.parent.parent;
            if (nParentObject.parent) {
                nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
            }
            if (card.parent && card.parent.localToGlobal().y < 230 + this.firstTop) {
                nParentObject = card.parent.parent.parent;
                nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
            }
            var x = groupX + groupNumX - card.parent.localToGlobal().x;
            var y = groupY + groupNumY - card.parent.localToGlobal().y;
            var cardParentObject = card.parent;
            var index = cardParentObject.getChildIndex(card);
            var numCardParentChildren = cardParentObject.numChildren;
            var tween: egret.Tween, countX = 0, countY = 0;
            if (record.endIndex != 1 && record.begin == "hands") {
                for (var k = 0; k < record.endIndex; k++) {
                    var draggedObject = cardParentObject.getChildAt(cardParentObject.numChildren - 1 - k);
                    var xx = x + countX * 20 * 2.25;
                    tween = egret.Tween.get(draggedObject).to({ x: xx, y: y }, 300, egret.Ease.sineIn);
                }
            } else {
                for (var j = index; j < numCardParentChildren; j++) {
                    var draggedObject = cardParentObject.getChildAt(j);
                    var yy = y + countY * 61;
                    var xx = x + countX * 20 * 2.25;
                    if (record.begin == "columns") {
                        countY++;
                    }
                    if (record.end == "hands") {
                        countX++;
                    }
                    tween = egret.Tween.get(draggedObject).to({ x: xx, y: yy }, 100, egret.Ease.sineIn);
                }
            }
        } else {
            /* if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                 if (record.begin == "columns") {
                     groupNumY = this.getGroupNumY(group, record.isflopAnimation);
                 }
                 if ((groupX >= 370 * 2.25 && groupY >= 100 * 2.4) || (groupX < 70 * 2.25 && groupY >= 50 * 2.4)) {
                     if (groupX >= 370 * 2.25 && groupY >= 100 * 2.4 && groupY <= 235 * 2.4) {
                         groupNumX = group.numChildren < 3 ? group.numChildren * 20 * 2.25 : 40 * 2.25;
                     }
                     groupNumY = 0;
                 }
                 var nParentObject = card.parent;
                 nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
                 nParentObject = card.parent.parent;
                 nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
                 var cardParentX = card.parent.localToGlobal().x;
                 var cardParentY = card.parent.localToGlobal().y;
     
                 nParentObject = card.parent.parent.parent;
                 nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
     
                 var x = groupX + groupNumX - cardParentX;
                 var y = groupY + groupNumY - cardParentY;
                 var cardParentObject = card.parent;
                 var index = cardParentObject.getChildIndex(card);
                 var numCardParentChildren = cardParentObject.numChildren;
                 var tween: egret.Tween, countX = 0, countY = 0;
                 if (record.endIndex != 1 && record.begin == "hands") {
                     for (var k = 0; k < record.endIndex; k++) {
                         var draggedObject = cardParentObject.getChildAt(cardParentObject.numChildren - 1 - k);
                         var xx = x + countX * 20 * this.scaleYY * 2.25;
                         tween = egret.Tween.get(draggedObject).to({ x: xx, y: y }, 300, egret.Ease.sineIn);
                     }
                 } else {
                     for (var j = index; j < numCardParentChildren; j++) {
                         var draggedObject = cardParentObject.getChildAt(j);
                         var yy = y + countY * 61 * this.scaleYY;
                         var xx = x + countX * 20 * this.scaleYY * 2.25;
                         if (record.begin == "columns") {
                             countY++;
                         }
                         if (record.end == "hands") {
                             countX++;
                         }
                         tween = egret.Tween.get(draggedObject).to({ x: xx, y: yy }, 100, egret.Ease.sineIn);
                     }
                 }
             } else{*/
            var groupX = group.localToGlobal().y;
            var groupY = this.mGroup.width - group.localToGlobal().x;

            if (record.begin == "columns") {
                groupNumY = this.getGroupNumY(group, record.isflopAnimation);
            }
            var suitY = (this.mGroup.width - 230 * 4 - 100) / 5;
            if ((groupX >= this.myColumns.x + this.mGroup.width && groupY >= this.myGroup.y + 150) || (groupX < this.myColumns.x && groupY >= 50 + suitY)) {
                if (groupX >= this.myColumns.x + this.mGroup.width && groupY >= this.myGroup.y + 150 && groupY <= this.myGroup.y + 150 + 230) {
                    groupNumX = group.numChildren < 3 ? group.numChildren * 20 * 2.25 : 40 * 2.25;
                }
                groupNumY = 0;
            }
            var nParentObject = card.parent;
            nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
            nParentObject = card.parent.parent;
            nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
            var cardParentX = card.parent.localToGlobal().y;
            var cardParentY = this.mGroup.width - card.parent.localToGlobal().x;

            nParentObject = card.parent.parent.parent;
            nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);

            var x = groupX + groupNumX - cardParentX;
            var y = groupY + groupNumY - cardParentY;
            var cardParentObject = card.parent;
            var index = cardParentObject.getChildIndex(card);
            var numCardParentChildren = cardParentObject.numChildren;
            var tween: egret.Tween, countX = 0, countY = 0;
            if (record.endIndex != 1 && record.begin == "hands") {
                for (var k = 0; k < record.endIndex; k++) {
                    var draggedObject = cardParentObject.getChildAt(cardParentObject.numChildren - 1 - k);
                    var xx = x + countX * 20 * 2.25;
                    tween = egret.Tween.get(draggedObject).to({ x: xx, y: y }, 300, egret.Ease.sineIn);
                }
            } else {
                for (var j = index; j < numCardParentChildren; j++) {
                    var draggedObject = cardParentObject.getChildAt(j);
                    var yy = y + countY * 61;
                    var xx = x + countX * 20 * 2.25;
                    if (record.begin == "columns") {
                        countY++;
                    }
                    if (record.end == "hands") {
                        countX++;
                    }
                    tween = egret.Tween.get(draggedObject).to({ x: xx, y: yy }, 100, egret.Ease.sineIn);
                }
            }
            //}
        }
        tween.wait(30).call(this.fallback, this, [record]).call(this.touchCount_, this);
    }

    private touchCount_() {
        this.touchCount--;//点击次数
        if (this.touchCount > 0) {
            this.tweenLoad();
        }
    }

    private fallback(record: Records) {
        var scale_X = 1, scale_Y = 1;
        if (!this.isCrossScreen) {
            scale_X = this.defaultWidth / this.ScreenWidth;
            scale_Y = this.defaultHeight / this.ScreenHeight;
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB || egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
                scale_X = this.defaultWidth / window.innerWidth;
                scale_Y = this.defaultHeight / window.innerHeight;
            }
        }
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB || egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
            scale_X = this.defaultWidth / window.innerWidth;//test
            scale_Y = this.defaultHeight / window.innerHeight;
        } else {
            scale_X = this.defaultWidth / this.ScreenWidth;//test
            scale_Y = this.defaultHeight / this.ScreenHeight;
        }

        var cardGroup = record.card;
        var group = record.group;
        var cardParentObject = cardGroup.parent;
        var index = cardParentObject.getChildIndex(cardGroup);
        var numCardParentChildren = cardParentObject.numChildren;
        if (record.end != "hands") {
            group.addChild(cardGroup);
            cardGroup.x = 0;
        }

        var card;
        if (record.end == "suits") {
            card = this.solitaire.suits[record.endIndex].pop();
        } else if (record.end == "columns") {
            if (record.begin == "columns") {
                card = this.solitaire.columns[record.endIndex].slice(index);
            } else {
                card = this.solitaire.columns[record.endIndex].pop();
            }
        } else if (record.end == "wastes") {
            cardGroup.y = 0;
            if (record.endIndex != 1) {
                card = this.solitaire.wastes.pop();
                this.solitaire.hands.push(card);
                if (this.isCrossScreen && egret.Capabilities.runtimeType == egret.RuntimeType.WEB || egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
                    cardGroup.updataCard(false, this.isCrossScreen, this.scaleXX, this.scaleYY);
                } else {
                    cardGroup.updataCard(false, this.isCrossScreen, scale_X, scale_Y);
                }

                for (var i = 1; i < record.endIndex; i++) {
                    var currentObject = cardParentObject.getChildAt(cardParentObject.numChildren - 1) as CardGroup;
                    group.addChild(currentObject);
                    currentObject.x = 0;
                    currentObject.y = 0;
                    card = this.solitaire.wastes.pop();
                    this.solitaire.hands.push(card);
                    if (this.isCrossScreen && egret.Capabilities.runtimeType == egret.RuntimeType.WEB || egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
                        currentObject.updataCard(false, this.isCrossScreen, this.scaleXX, this.scaleYY);
                    } else {
                        currentObject.updataCard(false, this.isCrossScreen, scale_X, scale_Y);
                    }
                }
                var numWasteChildren = this.myWaste.numChildren;
                if (numWasteChildren >= 3) {
                    for (var i = 3; i > 0; i--) {
                        this.myWaste.getChildAt(numWasteChildren - i).x = (3 - i) * 20 * 2.25;
                    }
                } else {
                    for (var i = 0; i < numWasteChildren; i++) {
                        this.myWaste.getChildAt(i).x = i * 20 * 2.25;
                    }
                }
                var nParentObject = this.myColumns;
                nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
                this.moves++;
                this.movesText.text = this.textDatas["moves"] + ": " + this.moves + " ";
                return;
            }
            card = this.solitaire.wastes.pop();
            var numWasteChildren = this.myWaste.numChildren;
            if (numWasteChildren >= 3) {
                for (var i = 3; i > 0; i--) {
                    this.myWaste.getChildAt(numWasteChildren - i).x = (3 - i) * 20 * 2.25;
                }
            }
        } else if (record.end == "hands") {//hands
            var numChild: number = this.myFree.numChildren;
            for (var t: number = 1; t < numChild; t++) {
                var cardGroup = this.myFree.getChildAt(this.myFree.numChildren - 1) as CardGroup;
                if (t == numChild - 2) {
                    cardGroup.x = 20 * 2.25;
                } else if (t == numChild - 1) {
                    cardGroup.x = 40 * 2.25;
                } else {
                    cardGroup.x = 0;
                }
                cardGroup.y = 0;
                this.myWaste.addChild(cardGroup);
                cardGroup.updataCard(true);
            }
            this.solitaire.wastes = this.solitaire.hands.reverse();
            this.solitaire.hands = [];

            if (this.scoreType == 2) {
                this.score = record.endIndex - 2;
                this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
            }

            var nParentObject = this.myColumns;
            nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
            this.moves++;
            this.movesText.text = this.textDatas["moves"] + ": " + this.moves + " ";
            return;
        }

        if (record.begin == "suits") {
            this.solitaire.suits[record.beginIndex].push(card);
            cardGroup.y = 0;
        } else if (record.begin == "columns") {
            cardGroup.x = 0;
            cardGroup.y = this.getGroupNumY(group, record.isflopAnimation) - 61;
            /* if (this.isCrossScreen && egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                 cardGroup.y = this.getGroupNumY(group, record.isflopAnimation) - 61 * this.scaleYY;//横屏
             }*/
            if (group.numChildren > 1) {
                var lastCardGroup = group.getChildAt(group.numChildren - 2) as CardGroup;
                if (group.numChildren > 2 && this.solitaire.columns[record.beginIndex][group.numChildren - 3].status == true) {
                } else {
                    this.solitaire.columns[record.beginIndex][group.numChildren - 1]
                    if (group.numChildren - 2 < record.beginIndex) {
                        var dragCardData;
                        if (record.end != "columns") {
                            dragCardData = card;
                        } else {
                            dragCardData = card[0];
                        }
                        if (record.isflopAnimation) {
                            /* if (this.isCrossScreen && egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                                 lastCardGroup.updataCard(false, this.isCrossScreen, this.scaleXX, this.scaleYY);
                             } else {*/
                            lastCardGroup.updataCard(false, this.isCrossScreen, scale_X, scale_Y);
                            // }
                        }
                    }
                }
            }
            for (var j = index + 1; j < numCardParentChildren; j++) {
                var draggedObject = cardParentObject.getChildAt(index);
                draggedObject.x = 0;
                draggedObject.y = this.getGroupNumY(group, false);

                group.addChild(draggedObject);
                this.solitaire.columns[record.endIndex].pop();
            }
            this.solitaire.columns[record.beginIndex] = this.solitaire.columns[record.beginIndex].concat(card);
            if (record.end == "columns") {
                this.solitaire.columns[record.endIndex].pop();
            }
            var columnsLen = this.solitaire.columns[record.endIndex].length;
            if (columnsLen > 0 && !this.solitaire.columns[record.endIndex][columnsLen - 1].status) {
                var columnCard = this.myColumn[record.endIndex].getChildAt(columnsLen - 1) as CardGroup;
                columnCard.updataCard(true, this.isCrossScreen);
            }
        } else if (record.begin == "wastes") {
            this.solitaire.wastes.push(card);
            var numWasteChildren = group.numChildren;
            cardGroup.y = 0;
            if (numWasteChildren < 3) {
                cardGroup.x = 20 * (numWasteChildren - 1) * 2.25;
            } else {
                for (var i = 3; i > 0; i--) {
                    this.myWaste.getChildAt(numWasteChildren - i).x = (3 - i) * 20 * 2.25;
                }
            }
        } else if (record.begin == "hands") {
            this.solitaire.hands.push(card);
            /*  if (this.isCrossScreen && egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                  cardGroup.updataCard(false, this.isCrossScreen, this.scaleXX, this.scaleYY);
              } else {*/
            cardGroup.updataCard(false, this.isCrossScreen, scale_X, scale_Y);
            // }
        }
        if (this.scoreType == 2) {
            this.score -= 2;
            console.log("2!")
            if ((record.begin == "columns" || record.begin == "wastes") && record.end == "suits") {
                this.score -= 10;
            } else if (record.begin == "wastes" && record.end == "columns") {
                this.score -= 5;
            } else if (record.begin == "suits") {
                if (this.score < 0) {
                    this.score = 0;
                }
                this.score += 10;
            }

            if (record.isflopAnimation) {
                this.score -= 5;
                console.log("3!")
            }

            if (this.score < 0) {
                this.score = 0;
            }
            this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
        } else if (this.scoreType == 3) {
            if (record.end == "suits") {
                this.score -= 5;
                this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
            } else if (record.begin == "suits") {
                this.score += 5;
                this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
            }
            this.saveScore();
        }
        this.moves++;
        this.movesText.text = this.textDatas["moves"] + ": " + this.moves + " ";
        var nParentObject = this.myColumns;
        nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
    }

    private onClick() {
        if (!this.isStart) {
            this.timer.start();
            this.isStart = true;
        }
        if (this.mGroup.getChildIndex(this.gameGroup) != -1 || this.mGroup.getChildIndex(this.settingsGroup) != -1) {
            return;
        }
        if (this.myFree.getChildIndex(this.virtualGroupForHand) != -1 || this.myFree.getChildIndex(this.virtualImageForHand) != -1) {
            return;
        }
        if (this.isAddToHandTweenOver == false) {
            return;
        }
        if (this.clickDragCardCount == 1 && this.myFree.numChildren != 1) {
            this.onclickCount++;
            if (this.onclickCount == 1) {
                this.onclickEventTween();
            }
        } else {
            this.onClickEvent();
        }
        if (this.clickDragCardCount == 1 && this.scoreType == 3 && this.drowCount == 1) {
            return;
        } else if (this.drowCount == 3 && this.scoreType == 3) {
            return;
        }
        this.moves++;
        this.movesText.text = this.textDatas["moves"] + ": " + this.moves + " ";
        var nParentObject = this.myColumns;
        nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
    }

    private addToWaste(cardGroup: CardGroup, i: number) {
        this.myWaste.addChild(cardGroup);
        this.solitaire.wastes.push(cardGroup.card);
        cardGroup.x = 260;
        cardGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMove, this);
        cardGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dblclick, this);
        cardGroup.addEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
        cardGroup.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.stopMove, this);
        cardGroup.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.stopMove, this);
    }

    private onClickEvent() {
        var record, draggedObject;
        if (this.myFree.numChildren == 1) {
            this.onclickBackEvent();
            return;
        }
        var wastesNumChildren = this.myWaste.numChildren;
        var handsNumChildren = this.myFree.numChildren;
        if (handsNumChildren >= 3 + 1) {
            if (wastesNumChildren >= 2) {
                for (var i = 2; i > 0; i--) {
                    egret.Tween.get(this.myWaste.getChildAt(wastesNumChildren - i)).to({ x: 0, y: 0 }, 200, egret.Ease.sineIn)
                }
            }
            for (var i = 0; i < 3; i++) {
                draggedObject = this.myFree.getChildAt(handsNumChildren - 1 - i) as CardGroup;
                draggedObject.updataCard(true);
                if (i == 2) {
                    draggedObject.parent.swapChildrenAt(draggedObject.parent.getChildIndex(draggedObject), draggedObject.parent.numChildren - 1);
                }
                this.addToWaste(draggedObject, i);
                this.swapObject(this.myWaste);
                egret.Tween.get(draggedObject).to({ x: i * 20 * 2.25, y: 0 }, 200, egret.Ease.sineIn);
                this.solitaire.hands.pop();
            }
        } else if (handsNumChildren == 3) {
            if (wastesNumChildren >= 2) {
                for (var i = 2; i > 0; i--) {
                    egret.Tween.get(this.myWaste.getChildAt(wastesNumChildren - i)).to({ x: 0, y: 0 }, 200, egret.Ease.sineIn)
                }
            }
            var isWasteNull = false;
            if (wastesNumChildren == 0) {
                isWasteNull = true;
            }
            for (var i = 0; i < 2; i++) {
                draggedObject = this.myFree.getChildAt(handsNumChildren - 1 - i) as CardGroup;
                draggedObject.updataCard(true);
                if (i == 1) {
                    draggedObject.parent.swapChildrenAt(draggedObject.parent.getChildIndex(draggedObject), draggedObject.parent.numChildren - 1);
                }
                this.addToWaste(draggedObject, i);
                this.swapObject(this.myWaste);
                var x = i * 20 * 2.25;
                if (!isWasteNull) {
                    x = (i + 1) * 20 * 2.25;
                }
                egret.Tween.get(draggedObject).to({ x: x, y: 0 }, 200, egret.Ease.sineIn);
                this.solitaire.hands.pop();
            }
        } else {
            if (wastesNumChildren < 3) {
                x = 20 * wastesNumChildren * 2.25;
            } else {
                for (var i = 2; i > 0; i--) {
                    egret.Tween.get(this.myWaste.getChildAt(wastesNumChildren - i)).to({ x: (2 - i) * 20 * 2.25, y: 0 }, 100, egret.Ease.sineIn);
                }
                x = 40 * 2.25;
            }
            draggedObject = this.myFree.getChildAt(handsNumChildren - 1) as CardGroup;
            draggedObject.updataCard(true);
            this.addToWaste(draggedObject, i);
            this.swapObject(this.myWaste);
            egret.Tween.get(draggedObject).to({ x: x, y: 0 }, 200, egret.Ease.sineIn);
            this.solitaire.hands.pop();
        }

        record = new Records(draggedObject, this.myFree as egret.Sprite, "hands", 3, "wastes", 3);
        this.record.push(record);
        this.dragCard = null;
        this.draggedObject = null;
    }

    private isAddToHandTweenOver: boolean;
    private addToHandTween(cardGroup: CardGroup) {
        this.isAddToHandTweenOver = false;
        this.myFree.addChild(cardGroup);
        var x = (this.myWaste.x + cardGroup.x) - this.myFree.x;
        egret.Tween.get(cardGroup).to({ x: x }).to({ x: 0 }, 100, egret.Ease.sineIn).wait(100).call(this.removeHandCardEventListener, this, [cardGroup]);
    }

    private removeHandCardEventListener(cardGroup) {
        cardGroup.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMove, this);
        cardGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.dblclick, this);
        cardGroup.removeEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
        cardGroup.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.stopMove, this);
        cardGroup.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.stopMove, this);
        this.isAddToHandTweenOver = true;
    }

    private onclickBackEvent() {
        this.drowCount++;
        if (this.clickDragCardCount == 1 && this.scoreType == 3 && this.drowCount >= 1) {
            if (this.drowCount > 1) {
                this.drowCount--;
            }
            return;
        } else if (this.drowCount >= 3 && this.scoreType == 3) {
            if (this.drowCount > 3) {
                this.drowCount--;
            }
            return;
        }
        if (this.myWaste.numChildren == 0) {
            return;
        }
        var scale_X, scale_Y;
        if (!this.isCrossScreen) {
            scale_X = this.defaultWidth / this.ScreenWidth;
            scale_Y = this.defaultHeight / this.ScreenHeight;
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB || egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
                scale_X = this.defaultWidth / window.innerWidth;
                scale_Y = this.defaultHeight / window.innerHeight;
            }
        }
        this.isLoopDraw = true;
        var numChild: number = this.myWaste.numChildren;
        for (var t: number = 0; t < numChild; t++) {
            var cardGroup = this.myWaste.getChildAt(this.myWaste.numChildren - 1) as CardGroup;
            this.addToHandTween(cardGroup);
            var card = this.solitaire.wastes[this.myWaste.numChildren];
            cardGroup.updataCard(false, this.isCrossScreen, scale_X, scale_Y);
        }

        var draggedObject = this.myFree.getChildAt(this.myFree.numChildren - 1) as CardGroup;//000
        var record = new Records(draggedObject, this.myWaste as egret.Sprite, "wastes", 1, "hands", this.score);//记录
        this.solitaire.hands = this.solitaire.wastes.reverse();
        this.solitaire.wastes = [];
        this.record.push(record);
        if (this.scoreType == 2) {
            if (this.clickDragCardCount == 1) {
                console.log("4!")
                this.score -= 100;
            } else {
                console.log("5!")
                this.score -= 20;
            }
            if (this.score < 0) {
                this.score = 0;
            }
            this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
        }
        this.dragCard = null;
        this.draggedObject = null;
        if (this.solitaire.isDfsOver()) {
            this.autoComplete();
        }
    }

    private onclickEventTween() {
        if (this.myFree.numChildren == 1) {
            this.onclickBackEvent();
            this.onclickCount--;
            if (this.onclickCount > 0) {
                this.onclickEventTween();
            }
            return;
        }
        var draggedObject;
        this.swapObject(this.myFree);
        draggedObject = this.myFree.getChildAt(this.myFree.numChildren - 1) as CardGroup;
        var numChildren = this.myWaste.numChildren; var x;
        if (numChildren < 3) {
            x = 20 * numChildren * 2.25;
        } else {
            for (var i = 2; i > 0; i--) {
                egret.Tween.get(this.myWaste.getChildAt(numChildren - i)).to({ x: (2 - i) * 20 * 2.25, y: 0 }, 100, egret.Ease.sineIn);
            }
            x = 40 * 2.25;
        }
        var card = this.solitaire.hands.pop();
        this.solitaire.wastes.push(card);
        if (!this.isCrossScreen) {
            egret.Tween.get(draggedObject).call(this.flopAnimation, this, [draggedObject, true]).to({ x: 149 / 2, anchorOffsetX: 149 / 2 })
                .to({ x: -260 + x, y: 0, anchorOffsetX: 0 }, 60, egret.Ease.sineIn)
                .wait(100).call(this.isOverClickTween, this, [draggedObject]);
        } else {//横屏
            /*if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                egret.Tween.get(draggedObject).to({ anchorOffsetX: 149 / 2, x: 149 / 2 }).call(this.flopAnimation, this, [draggedObject, true])
                    .to({ x: -30 * 2.25 + x, y: -220 * 2.4, anchorOffsetX: 0 }, 60, egret.Ease.sineIn)
                    .wait(100).call(this.isOverClickTween, this, [draggedObject]);
            } else {*/
            egret.Tween.get(draggedObject).to({ anchorOffsetX: 149 / 2, x: 149 / 2 }).call(this.flopAnimation, this, [draggedObject, true])
                .to({ x: this.myWaste.x - this.myFree.x + x, y: this.myWaste.y - this.myFree.y, anchorOffsetX: 0 }, 60, egret.Ease.sineIn)
                .wait(100).call(this.isOverClickTween, this, [draggedObject]);
            //}
        }

        draggedObject.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMove, this);
        draggedObject.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dblclick, this);
        draggedObject.addEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
        draggedObject.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.stopMove, this);
        draggedObject.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.stopMove, this);
        var record = new Records(draggedObject, this.myFree as egret.Sprite, "hands", 1, "wastes", 1);
        this.record.push(record);
        this.dragCard = null;
        this.draggedObject = null;
    }

    private isOverClickTween(draggedObject) {
        this.myWaste.addChild(draggedObject);// 移牌pop and push
        draggedObject.anchorOffsetX = 0;
        var numChildren = this.myWaste.numChildren;
        if (numChildren >= 3) {
            draggedObject.x = 40 * 2.25;
        } else if (numChildren == 2) {
            draggedObject.x = 20 * 2.25;
        } else {
            draggedObject.x = 0;
        }
        draggedObject.y = 0;

        this.dragCard = null;
        this.draggedObject = null;
        this.onclickCount--;
        if (this.onclickCount > 0) {
            this.onclickEventTween();
        }
        if (this.solitaire.isDfsOver()) {
            this.moves++;
            this.movesText.text = this.textDatas["moves"] + ": " + this.moves + " ";
            this.autoComplete();
        }
        if (this.isCrossScreen) {
            if (this.mGroup.getChildIndex(this.bottomGroup) != -1) {
                this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.bottomGroup), this.mGroup.numChildren - 1);
            }
        }
    }

    private startMove(e: egret.TouchEvent): void {
        if (this.mGroup.getChildIndex(this.gameGroup) != -1 || this.mGroup.getChildIndex(this.settingsGroup) != -1) {
            return;
        }
        if (this.dragCard && this.dragCard.moveState == "start") {
            return;
        }
        egret.log("X:" + e.stageX + " Y:" + e.stageY);
        console.log("start");
        this.isMove = false;
        if (!this.isStart) {
            this.timer.start();
            this.isStart = true;
        }
        this.draggedObject = e.currentTarget;
        if (!this.isCrossScreen) {
            this.beginX = e.stageX;
            this.beginY = e.stageY;
            this.offsetX = this.beginX - this.draggedObject.parent.x;
            if (this.beginY >= 230 + this.firstTop) {
                for (var i = 0; i < 7; i++) {
                    if (i * this.columnI_X <= this.beginX && this.beginX < i * this.columnI_X + 149) {
                        this.beginColumnsI = i;
                        this.beginSuitsI = -1;
                        var j = this.draggedObject.parent.getChildIndex(this.draggedObject);
                        this.dragCard = this.solitaire.columns[i][j];
                        break;
                    }
                }
                this.offsetY = this.beginY - (this.firstTop + this.SecondTop + 230) - this.draggedObject.y;
            } else {
                this.beginColumnsI = -1;
                if (this.beginX >= 667 && this.beginX < this.myFreeBg.x + this.myFree.x) {
                    this.offsetX = this.beginX - this.draggedObject.parent.x + 60;
                    this.dragCard = this.solitaire.wastes[this.solitaire.wastes.length - 1];
                    this.beginSuitsI = -1;
                } else {
                    for (var i = 0; i < 4; i++) {
                        if (this.columnI_X * i <= this.beginX && this.beginX <= this.columnI_X * i + 149) {
                            this.dragCard = this.solitaire.suits[i][this.solitaire.suits[i].length - 1];
                            this.beginSuitsI = i;
                            break;
                        }
                    }
                }
            }
            var nParentObject;
            if (this.beginY < this.firstTop + 230) {
                this.offsetY = this.beginY - this.firstTop - this.draggedObject.parent.y;
                nParentObject = this.draggedObject.parent.parent.parent;
                nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
            }
            nParentObject = this.draggedObject.parent;
            nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
            nParentObject = this.draggedObject.parent.parent;
            nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
        } else {//横屏
            /*  if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                  this.beginX = e.stageX;
                  this.beginY = e.stageY;
                  this.offsetX = this.beginX - this.draggedObject.parent.x - 70 * 2.25;
                  if (this.beginX >= 70 * 2.25 && this.beginX < 370 * 2.25) {
                      for (var i = 0; i < 7; i++) {
                          if (i * this.columnI_X + 70 * 2.25 <= this.beginX && this.beginX < (i + 1) * this.columnI_X + 70 * 2.25 - 5 * this.scaleXX) {
                              this.beginColumnsI = i;
                              this.beginSuitsI = -1;
                              var j = this.draggedObject.parent.getChildIndex(this.draggedObject);
                              this.dragCard = this.solitaire.columns[i][j];
                              break;
                          }
                      }
                      this.offsetX = this.beginX - this.draggedObject.parent.x - 70 * 2.25;
                      this.offsetY = this.beginY - this.draggedObject.y;
                  } else {
                      this.beginColumnsI = -1;
                      if (this.beginX >= 370 * 2.25 && this.beginY >= 100 * 2.4 && this.beginY <= 235 * 2.4) {
                          this.offsetX = this.beginX - 390 * 2.25;
                          this.offsetY = this.beginY - this.draggedObject.parent.y - 100 * 2.4;
                          this.dragCard = this.solitaire.wastes[this.solitaire.wastes.length - 1];
                          this.beginSuitsI = -1;
                      } else if (this.beginX < 70 * 2.25 && this.beginY >= 50 * 2.4) {
                          for (var i = 0; i < 4; i++) {
                              if (i * 180 * 2.4 + 50 * 2.4 <= this.beginY && this.beginY <= (i * 180 * 2.4 + 50 * 2.4 + 230 * this.scaleYY)) {
                                  this.dragCard = this.solitaire.suits[i][this.solitaire.suits[i].length - 1];
                                  this.beginSuitsI = i;
                                  this.offsetX = this.beginX;
                                  this.offsetY = this.beginY - this.draggedObject.parent.y - 50 * 2.4;
                                  break;
                              }
                          }
                      }
         
                  }
                  var nParentObject;
                  if (this.beginX < 70 * 2.25 || this.beginX >= 370 * 2.25) {
                      nParentObject = this.draggedObject.parent.parent.parent;
                      if (this.mGroup.getChildIndex(this.bottomGroup) != -1) {
                          this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.bottomGroup), this.mGroup.numChildren - 1);
                          nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 2);
                      } else {
                          nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
                      }
                  }
                  nParentObject = this.draggedObject.parent;
                  nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
                  nParentObject = this.draggedObject.parent.parent;
                  nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
         
              } else {*/
            var e_stageX = e.stageY; var e_stageY = Main.WIDTH - e.stageX;
            if (this.leftScreen) {
                e_stageX = Main.HEIGHT - e.stageY;
                e_stageY = e.stageX;
            }
            this.beginX = e_stageX;
            this.beginY = e_stageY;
            this.offsetX = this.beginX - this.draggedObject.parent.x - this.myColumns.x;
            if (this.beginX >= this.myColumns.x && this.beginX <= this.myColumns.x + Main.WIDTH) {
                for (var i = 0; i < 7; i++) {
                    if (i * this.columnI_X + this.myColumns.x <= this.beginX && this.beginX < i * this.columnI_X + this.myColumns.x + 149) {
                        this.beginColumnsI = i;
                        this.beginSuitsI = -1;
                        var j = this.draggedObject.parent.getChildIndex(this.draggedObject);
                        this.dragCard = this.solitaire.columns[i][j];
                        break;
                    }
                }
                this.offsetX = this.beginX - this.draggedObject.parent.x - this.myColumns.x;
                this.offsetY = this.beginY - this.draggedObject.y;
            } else {
                var suitY = (Main.WIDTH - 230 * 4 - 100) / 5;
                this.beginColumnsI = -1;
                if (this.beginX >= this.myColumns.x + Main.WIDTH && this.beginY >= this.myGroup.y + 150 && this.beginY <= this.myGroup.y + 150 + 230) {
                    this.offsetX = this.beginX - (this.myFreeBg.x + this.myWaste.x);
                    this.offsetY = this.beginY - (this.myGroup.y + 150);
                    this.dragCard = this.solitaire.wastes[this.solitaire.wastes.length - 1];
                    this.beginSuitsI = -1;
                } else if (this.beginX < this.myColumns.x && this.beginY >= 50 + suitY) {
                    for (var i = 0; i < 4; i++) {
                        if (i * (230 + suitY) + 50 + suitY <= this.beginY && this.beginY <= i * (230 + suitY) + 230) {
                            this.dragCard = this.solitaire.suits[i][this.solitaire.suits[i].length - 1];
                            this.beginSuitsI = i;
                            this.offsetX = this.beginX;
                            this.offsetY = this.beginY - this.draggedObject.parent.y - (50 + suitY);
                            break;
                        }
                    }
                }

            }
            var nParentObject;
            if (this.beginX < this.myColumns.x || this.beginX >= this.myColumns.x + Main.WIDTH) {
                nParentObject = this.draggedObject.parent.parent.parent;
                if (this.mGroup.getChildIndex(this.bottomGroup) != -1) {
                    this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.bottomGroup), this.mGroup.numChildren - 1);
                    nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 2);
                } else {
                    nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
                }
            }
            nParentObject = this.draggedObject.parent;
            nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
            nParentObject = this.draggedObject.parent.parent;
            nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
            // }
        }
        console.log(this.dragCard);
        if (this.dragCard) {
            this.dragCard.moveState = "start";
        }
    }

    private onMove(e: egret.TouchEvent): void {
        console.log("move");
        if (this.mGroup.getChildIndex(this.gameGroup) != -1 || this.mGroup.getChildIndex(this.settingsGroup) != -1) {
            return;
        }
        // this.test.text = "move";
        if (!this.draggedObject || !this.dragCard) {
            return;
        }
        this.isMove = true;
        if (!this.isCrossScreen) {
            if (this.beginY >= this.firstTop + 230 && !this.solitaire.isDraggable(this.dragCard.id)) {
                return;
            }
            var numChildren = this.draggedObject.parent.numChildren;
            var index = this.draggedObject.parent.getChildIndex(this.draggedObject);
            if (this.beginY < this.firstTop + 230) {
                if (index != numChildren - 1) {
                    return;
                }
                this.draggedObject.x = e.stageX - this.draggedObject.parent.x - this.offsetX;
                if (this.beginX >= 667 && this.beginX <= 910) {
                    if (this.solitaire.wastes.length < 2)
                        this.draggedObject.x = e.stageX - this.offsetX;
                    else if (this.solitaire.wastes.length < 3)
                        this.draggedObject.x = e.stageX - this.offsetX + 20 * 2.25;
                    else
                        this.draggedObject.x = e.stageX - this.offsetX + 40 * 2.25;
                }
                this.draggedObject.y = e.stageY - this.firstTop - this.offsetY;
            } else {
                this.draggedObject.x = e.stageX - this.draggedObject.parent.x - this.offsetX;
                this.draggedObject.y = e.stageY - (this.firstTop + this.SecondTop + 230) - this.offsetY;//判断
                var index = this.draggedObject.parent.getChildIndex(this.draggedObject);
                var numChildren = this.draggedObject.parent.numChildren;
                var count = 1;
                for (var i = index + 1; i < numChildren; i++) {
                    var draggedObject = this.draggedObject.parent.getChildAt(i);
                    draggedObject.x = this.draggedObject.x;
                    draggedObject.y = this.draggedObject.y + 61 * count;
                    count++;
                }
            }
        } else {//横屏
            /* if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                 if (this.beginX >= 70 * 2.25 && this.beginX < 370 * 2.25) {
                     var nParentObject = this.myColumns;
                     nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
                 }
                 if (this.beginX >= 70 * 2.25 && this.beginX < 370 * 2.25 && !this.solitaire.isDraggable(this.dragCard.id)) {
                     return;
                 }
                 var numChildren = this.draggedObject.parent.numChildren;
                 var index = this.draggedObject.parent.getChildIndex(this.draggedObject);
                 if ((this.beginX < 70 * 2.25 && this.beginY >= 50 * 2.4) || (this.beginX >= 370 * 2.25 && this.beginY >= 100 * 2.4 && this.beginY <= 235 * 2.4)) {
                     if (index != numChildren - 1) {
                         return;
                     }
                     this.draggedObject.x = e.stageX - this.draggedObject.parent.x - this.offsetX;
                     this.draggedObject.y = e.stageY - 50 * 2.4 - this.draggedObject.parent.y - this.offsetY;
                     if (this.beginX > 370 * 2.25 && this.beginY >= 100 * 2.4 && this.beginY <= 235 * 2.4) {
                         if (this.solitaire.wastes.length == 1)
                             this.draggedObject.x = e.stageX - 390 * 2.25 - this.offsetX;
                         else if (this.solitaire.wastes.length == 2)
                             this.draggedObject.x = e.stageX + 20 * 2.25 - 390 * 2.25 - this.offsetX;
                         else
                             this.draggedObject.x = e.stageX + 40 * 2.25 - 390 * 2.25 - this.offsetX;
                         this.draggedObject.y = e.stageY - 100 * 2.4 - this.offsetY;
                     }
                 } else {
                     this.draggedObject.x = e.stageX - this.draggedObject.parent.x - 70 * 2.25 - this.offsetX;
                     this.draggedObject.y = e.stageY - this.offsetY;//判断
                     var index = this.draggedObject.parent.getChildIndex(this.draggedObject);
                     var numChildren = this.draggedObject.parent.numChildren;
                     var count = 1;
                     for (var i = index + 1; i < numChildren; i++) {
                         var draggedObject = this.draggedObject.parent.getChildAt(i);
                         draggedObject.x = this.draggedObject.x;
                         draggedObject.y = this.draggedObject.y + 61 * this.scaleYY * count;
                         count++;
                     }
                 }
             } else{*/
            if (this.beginX >= this.myColumns.x && this.beginX <= this.myColumns.x + Main.WIDTH) {
                var nParentObject = this.myColumns;
                nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
            }
            if (this.beginX >= this.myColumns.x && this.beginX <= this.myColumns.x + Main.WIDTH && !this.solitaire.isDraggable(this.dragCard.id)) {
                return;
            }
            var e_stageX = e.stageY; var e_stageY = Main.WIDTH - e.stageX;
            if (this.leftScreen) {
                e_stageX = Main.HEIGHT - e.stageY;
                e_stageY = e.stageX;
            }
            var suitY = (Main.WIDTH - 230 * 4 - 100) / 5;
            var numChildren = this.draggedObject.parent.numChildren;
            var index = this.draggedObject.parent.getChildIndex(this.draggedObject);
            if ((this.beginX < this.myColumns.x && this.beginY >= 50 + suitY) || (this.beginX >= this.myColumns.x + Main.WIDTH && this.beginY >= (this.myGroup.y + 150) && this.beginY <= (this.myGroup.y + 150 + 230))) {
                if (index != numChildren - 1) {
                    return;
                }
                this.draggedObject.x = e_stageX - this.draggedObject.parent.x - this.offsetX;
                this.draggedObject.y = e_stageY - (50 + suitY) - this.draggedObject.parent.y - this.offsetY;
                if (this.beginX >= this.myColumns.x + Main.WIDTH && this.beginY >= this.myGroup.y + 150 && this.beginY <= this.myGroup.y + 150 + 230) {
                    if (this.solitaire.wastes.length == 1)
                        this.draggedObject.x = e_stageX - (this.myFreeBg.x + this.myWaste.x) - this.offsetX;
                    else if (this.solitaire.wastes.length == 2)
                        this.draggedObject.x = e_stageX + 20 - (this.myFreeBg.x + this.myWaste.x) - this.offsetX;
                    else
                        this.draggedObject.x = e_stageX + 40 - (this.myFreeBg.x + this.myWaste.x) - this.offsetX;
                    this.draggedObject.y = e_stageY - (this.myGroup.y + 150) - this.offsetY;
                }
            } else {
                this.draggedObject.x = e_stageX - this.draggedObject.parent.x - this.myColumns.x - this.offsetX;
                this.draggedObject.y = e_stageY - this.offsetY;//判断
                var index = this.draggedObject.parent.getChildIndex(this.draggedObject);
                var numChildren = this.draggedObject.parent.numChildren;
                var count = 1;
                for (var i = index + 1; i < numChildren; i++) {
                    var draggedObject = this.draggedObject.parent.getChildAt(i);
                    draggedObject.x = this.draggedObject.x;
                    draggedObject.y = this.draggedObject.y + 61 * count;
                    count++;
                }
            }
            //}
        }
    }

    private stopMove(e: egret.TouchEvent): void {
        // this.test.textColor = 0x000000;
        // this.test.text = String("stop");
        if (this.dragCard && this.dragCard.moveState == "stop") {
            this.dragCard = null;
            return;
        }
        if (!this.draggedObject || !this.dragCard) {
            return;
        }
        this.dragCard.moveState = "stop";
        if (this.mGroup.getChildIndex(this.gameGroup) != -1 || this.mGroup.getChildIndex(this.settingsGroup) != -1) {
            return;
        }
        if (!this.isMove) {
            return;
        }
        console.log("stop");
        if (!this.draggedObject || !this.dragCard) {
            return;
        }
        if (!this.solitaire.isDraggable(this.dragCard.id))
            return;
        var numChildren = this.draggedObject.parent.numChildren;
        var index = this.draggedObject.parent.getChildIndex(this.draggedObject);
        if (!this.isCrossScreen) {
            var X = e.stageX - this.offsetX;
            if (this.beginY < this.firstTop + 230) {
                if (this.beginX >= 667) {
                    if (index != numChildren - 1) {
                        return;
                    }
                    if (this.solitaire.wastes.length < 2)
                        X = e.stageX - (this.beginX - 667.5);
                    else if (this.solitaire.wastes.length < 3)
                        X = e.stageX - (this.beginX - 667.5 - 20 * 2.25);
                    else
                        X = e.stageX - (this.beginX - 667.5 - 40 * 2.25);
                }
            }
            if (e.stageY - this.offsetY < this.firstTop + 230) {
                if (index == numChildren - 1) {
                    for (var i = 0; i < 4; i++) {
                        if (i * this.columnI_X - 149 / 2 < X && X < i * this.columnI_X + 149 / 2) {
                            if (!this.solitaire.isSuitAddable(i, this.dragCard)) {
                                break;
                            }
                            var card, record;
                            var isflopAnimation = false;
                            if (this.beginY >= this.firstTop + 230) {
                                if (index > 0) {
                                    var currentCard = this.myColumn[this.beginColumnsI].getChildAt(index - 1) as CardGroup;
                                    if (!this.solitaire.columns[this.beginColumnsI][index - 1].status) {
                                        this.flopAnimation(currentCard, true);
                                        isflopAnimation = true;
                                    }
                                }
                                card = this.solitaire.columns[this.beginColumnsI].pop();
                                record = new Records(this.draggedObject, this.draggedObject.parent as egret.Sprite, "columns", this.beginColumnsI, "suits", i, isflopAnimation);
                                if (this.scoreType == 2) {
                                    this.score += 10;
                                    this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
                                } else if (this.scoreType == 3) {
                                    this.score += 5;
                                    this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
                                    this.saveScore();
                                }
                                this.setParticle(i, this.draggedObject.card);
                                this.Soundsound();
                            } else {
                                if (this.beginX >= 667) {
                                    card = this.solitaire.wastes.pop();
                                    var wasteNum = this.myWaste.numChildren;
                                    if (wasteNum > 3) {
                                        for (var k = 0; k < 2; k++) {
                                            this.myWaste.getChildAt(wasteNum - 2 - k).x = 20 * (2 - k) * 2.25;
                                        }
                                    }
                                    record = new Records(this.draggedObject, this.draggedObject.parent as egret.Sprite, "wastes", 1, "suits", i);
                                    this.Soundsound();
                                    if (this.scoreType == 2) {
                                        this.score += 10;
                                        this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
                                    } else if (this.scoreType == 3) {
                                        this.score += 5;
                                        this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
                                        this.saveScore();
                                    }
                                    this.setParticle(i, this.draggedObject.card);
                                } else {
                                    card = this.solitaire.suits[this.beginSuitsI].pop();
                                    record = new Records(this.draggedObject, this.draggedObject.parent as egret.Sprite, "suits", this.beginSuitsI, "suits", i);
                                }
                            }
                            this.record.push(record);
                            this.solitaire.suits[i].push(card);
                            this.mySuit[i].addChild(this.draggedObject);
                            this.draggedObject.x = 0;
                            this.draggedObject.y = 0;
                            this.dragCard = null;
                            this.draggedObject = null;
                            this.moves++;
                            this.movesText.text = this.textDatas["moves"] + ": " + this.moves + " ";
                            if (this.solitaire.isWon()) {
                                this.Won();
                            }
                            this.isLoopDraw = false;
                            return;
                        }
                    }
                }
            } else {
                for (var i = 0; i < 7; i++) {
                    if (i == this.beginColumnsI) {
                        continue;
                    }
                    if (i * this.columnI_X - 149 / 2 < X && X < i * this.columnI_X + 149 / 2) {
                        var count = this.myColumn[i].numChildren;//点击点和牌高度判断
                        var columnNumY = this.getColumNumY(i);
                        if (count == 0 && (-80 > e.stageY - this.offsetY - (this.firstTop + this.SecondTop + 230) || e.stageY - this.offsetY - (this.firstTop + this.SecondTop + 230) > 230)) {
                            continue;
                        } else if (count > 0 && (columnNumY - 80 > e.stageY - this.offsetY - (this.firstTop + this.SecondTop + 230) || e.stageY - this.offsetY - (this.firstTop + this.SecondTop + 230) > 230 + columnNumY)) {
                            continue;
                        }
                        var numChildren = this.draggedObject.parent.numChildren;
                        var parentObject = this.draggedObject.parent;
                        var record;
                        var isflopAnimation = false;
                        if (this.beginY >= this.firstTop + 230) {                            //当移动牌时 pop and add
                            if (!this.solitaire.isAddable(i, this.solitaire.columns[this.beginColumnsI][index])) {
                                break;
                            }
                            if (index > 0) {
                                var currentCard = this.myColumn[this.beginColumnsI].getChildAt(index - 1) as CardGroup;
                                if (!this.solitaire.columns[this.beginColumnsI][index - 1].status) {
                                    this.flopAnimation(currentCard);
                                    isflopAnimation = true;
                                }
                            }
                            var cards = this.solitaire.columns[this.beginColumnsI].slice(index);
                            this.solitaire.columns[i] = this.solitaire.columns[i].concat(cards);
                            this.solitaire.columns[this.beginColumnsI].pop();//pop
                            record = new Records(this.draggedObject, this.draggedObject.parent as egret.Sprite, "columns", this.beginColumnsI, "columns", i, isflopAnimation);
                        } else {
                            if (this.beginX >= 667 && this.beginX <= 910) {
                                if (!this.solitaire.isAddable(i, this.solitaire.wastes[this.solitaire.wastes.length - 1])) {
                                    break;
                                }
                                card = this.solitaire.wastes.pop();
                                this.solitaire.columns[i].push(card);
                                var wasteNum = this.myWaste.numChildren;
                                if (wasteNum > 3) {
                                    for (var k = 0; k < 2; k++) {
                                        this.myWaste.getChildAt(wasteNum - 2 - k).x = 20 * (2 - k) * 2.25;
                                    }
                                }
                                record = new Records(this.draggedObject, this.draggedObject.parent as egret.Sprite, "wastes", 1, "columns", i);
                                if (this.scoreType == 2) {
                                    this.score += 5;
                                    this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
                                }
                            } else {
                                if (!this.solitaire.isAddable(i, this.solitaire.suits[this.beginSuitsI][this.solitaire.suits[this.beginSuitsI].length - 1])) {
                                    break;
                                }
                                card = this.solitaire.suits[this.beginSuitsI].pop();
                                this.solitaire.columns[i].push(card);
                                record = new Records(this.draggedObject, this.draggedObject.parent as egret.Sprite, "suits", this.beginSuitsI, "columns", i);
                                if (this.scoreType == 2) {
                                    this.score -= 15;
                                    console.log("6!")
                                    if (this.score < 0) {
                                        this.score = 0;
                                    }
                                    this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
                                } else if (this.scoreType == 3) {
                                    this.score -= 5;
                                    this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
                                }
                            }
                        }
                        this.record.push(record);

                        this.myColumn[i].addChild(this.draggedObject); //当移动牌时 pop and add
                        this.draggedObject.x = 0;
                        this.draggedObject.y = this.getColumNumY(i);
                        for (var j = index + 1; j < numChildren; j++) {
                            var draggedObject = parentObject.getChildAt(index);
                            this.myColumn[i].addChild(draggedObject);
                            draggedObject.x = 0;
                            draggedObject.y = this.getColumNumY(i);
                            this.solitaire.columns[this.beginColumnsI].pop();//pop
                        }
                        this.dragCard = null;
                        this.draggedObject = null;
                        this.moves++;
                        this.movesText.text = this.textDatas["moves"] + ": " + this.moves + " ";
                        this.isLoopDraw = false;
                        return;
                    }
                }
            }

            if (this.beginY < this.firstTop + 230) {
                var x = 0;
                if (this.beginX >= 667 && this.beginX <= 910) {
                    if (this.solitaire.wastes.length < 3)
                        x = 20 * (this.solitaire.wastes.length - 1) * 2.25;
                    else
                        x = 40 * 2.25;
                }
                egret.Tween.get(this.draggedObject).to({ x: x, y: 0 }, 100, egret.Ease.sineIn)
            } else {
                var parentObject = this.draggedObject.parent;
                var columnCardY = 0;
                for (var j = 0; j < index; j++) {
                    var cardGroup = parentObject.getChildAt(j) as CardGroup;
                    if (!cardGroup.card.status) {
                        columnCardY += 25;
                    } else {
                        columnCardY += 61;
                    }
                }
                for (var j = index; j < numChildren; j++) {
                    var draggedObject = parentObject.getChildAt(j);
                    egret.Tween.get(draggedObject).to({ x: 0, y: columnCardY }, 100, egret.Ease.sineIn)
                    columnCardY += 61
                }
            }
            this.dragCard = null;
            this.draggedObject = null;
        } else {//横屏
            /* if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
           var X = e.stageX - this.offsetX;
           if (this.beginX > 370 * 2.25 && this.beginY >= 100 * 2.4 && this.beginY <= 235 * 2.4) {
               if (index != numChildren - 1) {
                   return;
               }
               if (this.solitaire.wastes.length < 2)
                   X = e.stageX - (this.beginX - 390 * 2.25);
               else if (this.solitaire.wastes.length < 3)
                   X = e.stageX - (this.beginX - 410 * 2.25);
               else
                   X = e.stageX - (this.beginX - 430 * 2.25);
           }
           var Y = e.stageY - this.offsetY;
           if (X <= 149 * this.scaleXX) {
               if (index == numChildren - 1) {
                   for (var i = 0; i < 4; i++) {
                       if ((i * 180 + 50) * 2.4 - 230 * this.scaleYY / 2 <= Y && Y <= (i * 180 + 50) * 2.4 + 230 * this.scaleYY / 2) {
                           if (!this.solitaire.isSuitAddable(i, this.dragCard)) {
                               break;
                           }
                           var card, record;
                           var isflopAnimation = false;
                           if (this.beginX >= 70 * 2.25 && this.beginX < 370 * 2.25) {
                               if (index > 0) {
                                   var currentCard = this.myColumn[this.beginColumnsI].getChildAt(index - 1) as CardGroup;
                                   if (!this.solitaire.columns[this.beginColumnsI][index - 1].status) {
                                       this.flopAnimation(currentCard, true);
                                       isflopAnimation = true;
                                   }
                               }
                               card = this.solitaire.columns[this.beginColumnsI].pop();
                               record = new Records(this.draggedObject, this.draggedObject.parent as egret.Sprite, "columns", this.beginColumnsI, "suits", i, isflopAnimation);
                               this.Soundsound();
                               if (this.scoreType == 2) {
                                   this.score += 10;
                                   this.scoreText.text = this.textDatas["score"] +": " + this.score;
                               } else if (this.scoreType == 3) {
                                   this.score += 5;
                                   this.scoreText.text = this.textDatas["score"] +": " + this.score;
                               }
                               this.setParticle(i, this.draggedObject.card);
                           } else {
                               if (this.beginX >= 390 * 2.25) {
                                   card = this.solitaire.wastes.pop();
                                   var wasteNum = this.myWaste.numChildren;
                                   if (wasteNum > 3) {
                                       for (var k = 0; k < 2; k++) {
                                           this.myWaste.getChildAt(wasteNum - 2 - k).x = 20 * (2 - k) * 2.25;
                                       }
                                   }
                                   record = new Records(this.draggedObject, this.draggedObject.parent as egret.Sprite, "wastes", 1, "suits", i);
                                   this.Soundsound();
                                   if (this.scoreType == 2) {
                                       this.score += 10;
                                       this.scoreText.text = this.textDatas["score"] +": " + this.score;
                                   } else if (this.scoreType == 3) {
                                       this.score += 5;
                                       this.scoreText.text = this.textDatas["score"] +": " + this.score;
                                   }
                                   this.setParticle(i, this.draggedObject.card);
                               } else {
                                   card = this.solitaire.suits[this.beginSuitsI].pop();
                                   record = new Records(this.draggedObject, this.draggedObject.parent as egret.Sprite, "suits", this.beginSuitsI, "suits", i);
                               }
                           }
                           this.record.push(record);
                           this.solitaire.suits[i].push(card);
                           this.mySuit[i].addChild(this.draggedObject);
                           this.draggedObject.x = 0;
                           this.draggedObject.y = 0;
                           this.dragCard = null;
                           this.draggedObject = null;
                           this.moves++;
                           this.movesText.text = this.textDatas["moves"] + ": " + this.moves+" ";
                           if (this.solitaire.isWon()) {
                               this.Won();
                           }
                           if (this.mGroup.getChildIndex(this.bottomGroup) != -1) {
                               this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.bottomGroup), this.mGroup.numChildren - 1);
                               this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.myColumns), this.mGroup.numChildren - 2);
                           } else {
                               this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.myColumns), this.mGroup.numChildren - 1);
                           }
                           this.isLoopDraw = false;
                           return;
                       }
                   }
               }
           } else {
               for (var i = 0; i < 7; i++) {
                   if (i == this.beginColumnsI) {
                       continue;
                   }
                   if (i * this.columnI_X + 70 * 2.25 - 149 * this.scaleXX / 2 < X && X <= i * this.columnI_X + 70 * 2.25 + 149 * this.scaleXX / 2) {
                       var count = this.myColumn[i].numChildren;//点击点和牌高度判断
                       
                       var columnNumY = this.getColumNumY(i);
                       if (count == 0 && (-60 * 2.4 > e.stageY - this.offsetY || e.stageY - this.offsetY > 230 * this.scaleYY)) {
                           continue;
                       } else if (count > 0 && (columnNumY - 60 * 2.4 > e.stageY - this.offsetY || e.stageY - this.offsetY > (230 + columnNumY) * this.scaleYY)) {
                           continue;
                       }
                       var numChildren = this.draggedObject.parent.numChildren;
                       var parentObject = this.draggedObject.parent;
                       var record;
                       var isflopAnimation = false;
                       if (this.beginX >= 70 * 2.25 && this.beginX <= 360 * 2.25) {                           //当移动牌时 pop and add
                           if (!this.solitaire.isAddable(i, this.solitaire.columns[this.beginColumnsI][index])) {
                               break;
                           }
                           if (index > 0) {
                               var currentCard = this.myColumn[this.beginColumnsI].getChildAt(index - 1) as CardGroup;
                               if (!this.solitaire.columns[this.beginColumnsI][index - 1].status) {
                                   this.flopAnimation(currentCard);
                                   isflopAnimation = true;
                               }
                           }
                           var cards = this.solitaire.columns[this.beginColumnsI].slice(index);
                           this.solitaire.columns[i] = this.solitaire.columns[i].concat(cards);
                           this.solitaire.columns[this.beginColumnsI].pop();//pop
                           record = new Records(this.draggedObject, this.draggedObject.parent as egret.Sprite, "columns", this.beginColumnsI, "columns", i, isflopAnimation);
                       } else {
                           if (this.beginX > 370 * 2.25 && this.beginY >= 100 * 2.4 && this.beginY <= 235 * 2.4) {
                               if (!this.solitaire.isAddable(i, this.solitaire.wastes[this.solitaire.wastes.length - 1])) {
                                   break;
                               }
                               card = this.solitaire.wastes.pop();
                               this.solitaire.columns[i].push(card);
                               var wasteNum = this.myWaste.numChildren;
                               if (wasteNum > 3) {
                                   for (var k = 0; k < 2; k++) {
                                       this.myWaste.getChildAt(wasteNum - 2 - k).x = 20 * (2 - k) * 2.25;
                                   }
                               }
                               record = new Records(this.draggedObject, this.draggedObject.parent as egret.Sprite, "wastes", 1, "columns", i);
                               if (this.scoreType == 2) {
                                   this.score += 5;
                                   this.scoreText.text = this.textDatas["score"] +": " + this.score;
                               }
         
                           } else if (this.beginX < 70 * 2.25 && this.beginY >= 50 * 2.4) {
                               if (!this.solitaire.isAddable(i, this.solitaire.suits[this.beginSuitsI][this.solitaire.suits[this.beginSuitsI].length - 1])) {
                                   break;
                               }
                               card = this.solitaire.suits[this.beginSuitsI].pop();
                               this.solitaire.columns[i].push(card);
                               record = new Records(this.draggedObject, this.draggedObject.parent as egret.Sprite, "suits", this.beginSuitsI, "columns", i);
                               if (this.scoreType == 2) {
                                   this.score -= 15;
                                   if (this.score < 0) {
                                       this.score = 0;
                                   }
                                   this.scoreText.text = this.textDatas["score"] +": " + this.score;
                               } else if (this.scoreType == 3) {
                                   this.score -= 5;
                                   this.scoreText.text = this.textDatas["score"] +": " + this.score;
                               }
                           }
                       }
                       this.record.push(record);
                       this.myColumn[i].addChild(this.draggedObject); //当移动牌时 pop and add
                       this.draggedObject.x = 0;
                       this.draggedObject.y = this.getColumNumY(i);
                       for (var j = index + 1; j < numChildren; j++) {
                           var draggedObject = parentObject.getChildAt(index);
                           this.myColumn[i].addChild(draggedObject);
                           draggedObject.x = 0;
                           draggedObject.y = this.getColumNumY(i);
                           this.solitaire.columns[this.beginColumnsI].pop();//pop
                       }
                       this.dragCard = null;
                       this.draggedObject = null;
                       this.moves++;
                       this.movesText.text = this.textDatas["moves"] + ": " + this.moves+" ";
                       if (this.mGroup.getChildIndex(this.bottomGroup) != -1) {
                           this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.bottomGroup), this.mGroup.numChildren - 1);
                           this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.myColumns), this.mGroup.numChildren - 2);
                       } else {
                           this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.myColumns), this.mGroup.numChildren - 1);
                       }
                       this.isLoopDraw = false;
                       return;
                   }
               }
           }
           if (this.beginX < 70 * 2.25 && this.beginY >= 50 * 2.4) {
               egret.Tween.get(this.draggedObject).to({ x: 0, y: 0 }, 100, egret.Ease.sineIn);
           } else if (this.beginX > 370 * 2.25 && this.beginY >= 100 * 2.4 && this.beginY <= 235 * 2.4) {
               var x = 0;
               if (this.solitaire.wastes.length < 3)
                   x = 20 * (this.solitaire.wastes.length - 1) * 2.25;
               else
                   x = 40 * 2.25;
               egret.Tween.get(this.draggedObject).to({ x: x, y: 0 }, 100, egret.Ease.sineIn);
           } else if (this.beginX >= 70 * 2.25 && this.beginX < 370 * 2.25) {
               var parentObject = this.draggedObject.parent;
               var columnCardY = 0;
               for (var j = 0; j < index; j++) {
                   var cardGroup = parentObject.getChildAt(j) as CardGroup;
                   if (!cardGroup.card.status) {
                       columnCardY += 25 * this.scaleYY;
                   } else {
                       columnCardY += 61 * this.scaleYY;
                   }
               }
               for (var j = index; j < numChildren; j++) {
                   var draggedObject = parentObject.getChildAt(j);
                   egret.Tween.get(draggedObject).to({ x: 0, y: columnCardY }, 200, egret.Ease.sineIn);
                   columnCardY += 61 * this.scaleYY;
               }
           }
           if (this.mGroup.getChildIndex(this.bottomGroup) != -1) {
               this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.bottomGroup), this.mGroup.numChildren - 1);
               this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.myColumns), this.mGroup.numChildren - 2);
           } else {
               this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.myColumns), this.mGroup.numChildren - 1);
           }
           this.dragCard = null;
           this.draggedObject = null;
        }else{*/
            var e_stageX = e.stageY; var e_stageY = Main.WIDTH - e.stageX;
            if (this.leftScreen) {
                e_stageX = Main.HEIGHT - e.stageY;
                e_stageY = e.stageX;
            }
            var X = e_stageX - this.offsetX;
            if (this.beginX > this.myColumns.x + Main.WIDTH && this.beginY >= this.myGroup.y + 150 && this.beginY <= this.myGroup.y + 150 + 230) {
                if (index != numChildren - 1) {
                    return;
                }
                if (this.solitaire.wastes.length < 2)
                    X = e_stageX - (this.beginX - (this.myFreeBg.x + this.myWaste.x));
                else if (this.solitaire.wastes.length < 3)
                    X = e_stageX - (this.beginX - (this.myFreeBg.x + this.myWaste.x + 20 * 2.25));
                else
                    X = e_stageX - (this.beginX - (this.myFreeBg.x + this.myWaste.x + 40 * 2.25));
            }
            var Y = e_stageY - this.offsetY;
            var suitY = (Main.WIDTH - 230 * 4 - 100) / 5;
            if (X <= 149) {
                if (index == numChildren - 1) {
                    for (var i = 0; i < 4; i++) {
                        if ((i * (230 + suitY) + 50 + suitY) - 230 / 2 <= Y && Y <= (i * (230 + suitY) + 50 + suitY) + 230 / 2) {
                            if (!this.solitaire.isSuitAddable(i, this.dragCard)) {
                                break;
                            }
                            var card, record;
                            var isflopAnimation = false;
                            if (this.beginX >= this.myColumns.x && this.beginX < this.myColumns.x + Main.WIDTH) {
                                if (index > 0) {
                                    var currentCard = this.myColumn[this.beginColumnsI].getChildAt(index - 1) as CardGroup;
                                    if (!this.solitaire.columns[this.beginColumnsI][index - 1].status) {
                                        this.flopAnimation(currentCard, true);
                                        isflopAnimation = true;
                                    }
                                }
                                card = this.solitaire.columns[this.beginColumnsI].pop();
                                record = new Records(this.draggedObject, this.draggedObject.parent as egret.Sprite, "columns", this.beginColumnsI, "suits", i, isflopAnimation);
                                this.Soundsound();
                                if (this.scoreType == 2) {
                                    this.score += 10;
                                    this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
                                } else if (this.scoreType == 3) {
                                    this.score += 5;
                                    this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
                                    this.saveScore();
                                }
                                this.setParticle(i, this.draggedObject.card);
                            } else {
                                if (this.beginX >= (this.myFreeBg.x + this.myWaste.x)) {
                                    card = this.solitaire.wastes.pop();
                                    var wasteNum = this.myWaste.numChildren;
                                    if (wasteNum > 3) {
                                        for (var k = 0; k < 2; k++) {
                                            this.myWaste.getChildAt(wasteNum - 2 - k).x = 20 * (2 - k) * 2.25;
                                        }
                                    }
                                    record = new Records(this.draggedObject, this.draggedObject.parent as egret.Sprite, "wastes", 1, "suits", i);
                                    this.Soundsound();
                                    if (this.scoreType == 2) {
                                        this.score += 10;
                                        this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
                                    } else if (this.scoreType == 3) {
                                        this.score += 5;
                                        this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
                                        this.saveScore();
                                    }
                                    this.setParticle(i, this.draggedObject.card);
                                } else {
                                    card = this.solitaire.suits[this.beginSuitsI].pop();
                                    record = new Records(this.draggedObject, this.draggedObject.parent as egret.Sprite, "suits", this.beginSuitsI, "suits", i);
                                }
                            }
                            this.record.push(record);
                            this.solitaire.suits[i].push(card);
                            this.mySuit[i].addChild(this.draggedObject);
                            this.draggedObject.x = 0;
                            this.draggedObject.y = 0;
                            this.dragCard = null;
                            this.draggedObject = null;
                            this.moves++;
                            this.movesText.text = this.textDatas["moves"] + ": " + this.moves + " ";
                            if (this.solitaire.isWon()) {
                                this.Won();
                            }

                            if (this.mGroup.getChildIndex(this.bottomGroup) != -1) {
                                this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.bottomGroup), this.mGroup.numChildren - 1);
                                this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.myColumns), this.mGroup.numChildren - 2);
                            } else {
                                this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.myColumns), this.mGroup.numChildren - 1);
                            }
                            this.isLoopDraw = false;
                            return;
                        }
                    }
                }
            } else {
                for (var i = 0; i < 7; i++) {
                    if (i == this.beginColumnsI) {
                        continue;
                    }
                    if (i * this.columnI_X + this.myColumns.x - 149 / 2 < X && X <= i * this.columnI_X + this.myColumns.x + 149 / 2) {
                        var count = this.myColumn[i].numChildren;//点击点和牌高度判断

                        var columnNumY = this.getColumNumY(i);
                        if (count == 0 && (-60 > e_stageY - this.offsetY || e_stageY - this.offsetY > 230)) {
                            continue;
                        } else if (count > 0 && (columnNumY - 60 > e_stageY - this.offsetY || e_stageY - this.offsetY > (230 + columnNumY))) {
                            continue;
                        }
                        var numChildren = this.draggedObject.parent.numChildren;
                        var parentObject = this.draggedObject.parent;
                        var record;
                        var isflopAnimation = false;
                        if (this.beginX >= this.myColumns.x && this.beginX <= this.myColumns.x + Main.WIDTH) {                           //当移动牌时 pop and add
                            if (!this.solitaire.isAddable(i, this.solitaire.columns[this.beginColumnsI][index])) {
                                break;
                            }
                            if (index > 0) {
                                var currentCard = this.myColumn[this.beginColumnsI].getChildAt(index - 1) as CardGroup;
                                if (!this.solitaire.columns[this.beginColumnsI][index - 1].status) {
                                    this.flopAnimation(currentCard);
                                    isflopAnimation = true;
                                }
                            }
                            var cards = this.solitaire.columns[this.beginColumnsI].slice(index);
                            this.solitaire.columns[i] = this.solitaire.columns[i].concat(cards);
                            this.solitaire.columns[this.beginColumnsI].pop();//pop
                            record = new Records(this.draggedObject, this.draggedObject.parent as egret.Sprite, "columns", this.beginColumnsI, "columns", i, isflopAnimation);
                        } else {
                            if (this.beginX >= this.myColumns.x + Main.WIDTH && this.beginY >= this.myGroup.y + 150 && this.beginY <= this.myGroup.y + 150 + 230) {
                                if (!this.solitaire.isAddable(i, this.solitaire.wastes[this.solitaire.wastes.length - 1])) {
                                    break;
                                }
                                card = this.solitaire.wastes.pop();
                                this.solitaire.columns[i].push(card);
                                var wasteNum = this.myWaste.numChildren;
                                if (wasteNum > 3) {
                                    for (var k = 0; k < 2; k++) {
                                        this.myWaste.getChildAt(wasteNum - 2 - k).x = 20 * (2 - k) * 2.25;
                                    }
                                }
                                record = new Records(this.draggedObject, this.draggedObject.parent as egret.Sprite, "wastes", 1, "columns", i);
                                if (this.scoreType == 2) {
                                    this.score += 5;
                                    this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
                                }

                            } else if (this.beginX < this.myColumns.x && this.beginY >= 50 + suitY) {
                                if (!this.solitaire.isAddable(i, this.solitaire.suits[this.beginSuitsI][this.solitaire.suits[this.beginSuitsI].length - 1])) {
                                    break;
                                }
                                card = this.solitaire.suits[this.beginSuitsI].pop();
                                this.solitaire.columns[i].push(card);
                                record = new Records(this.draggedObject, this.draggedObject.parent as egret.Sprite, "suits", this.beginSuitsI, "columns", i);
                                if (this.scoreType == 2) {
                                    this.score -= 15;
                                    console.log("7!")
                                    if (this.score < 0) {
                                        this.score = 0;
                                    }
                                    this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
                                } else if (this.scoreType == 3) {
                                    this.score -= 5;
                                    this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
                                }
                            }
                        }
                        this.record.push(record);
                        this.myColumn[i].addChild(this.draggedObject); //当移动牌时 pop and add
                        this.draggedObject.x = 0;
                        this.draggedObject.y = this.getColumNumY(i);
                        for (var j = index + 1; j < numChildren; j++) {
                            var draggedObject = parentObject.getChildAt(index);
                            this.myColumn[i].addChild(draggedObject);
                            draggedObject.x = 0;
                            draggedObject.y = this.getColumNumY(i);
                            this.solitaire.columns[this.beginColumnsI].pop();//pop
                        }
                        this.dragCard = null;
                        this.draggedObject = null;
                        this.moves++;
                        this.movesText.text = this.textDatas["moves"] + ": " + this.moves + " ";
                        if (this.mGroup.getChildIndex(this.bottomGroup) != -1) {
                            this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.bottomGroup), this.mGroup.numChildren - 1);
                            this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.myColumns), this.mGroup.numChildren - 2);
                        } else {
                            this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.myColumns), this.mGroup.numChildren - 1);
                        }
                        this.isLoopDraw = false;
                        return;
                    }
                }
            }
            if (this.beginX < this.myColumns.x && this.beginY >= 50 + suitY) {
                egret.Tween.get(this.draggedObject).to({ x: 0, y: 0 }, 100, egret.Ease.sineIn);
            } else if (this.beginX > this.myColumns.x + Main.WIDTH && this.beginY >= this.myGroup.y + 150 && this.beginY <= this.myGroup.y + 150 + 230) {
                var x = 0;
                if (this.solitaire.wastes.length < 3)
                    x = 20 * (this.solitaire.wastes.length - 1) * 2.25;
                else
                    x = 40 * 2.25;
                egret.Tween.get(this.draggedObject).to({ x: x, y: 0 }, 100, egret.Ease.sineIn);
            } else if (this.beginX >= this.myColumns.x && this.beginX < this.myColumns.x + Main.WIDTH) {
                var parentObject = this.draggedObject.parent;
                var columnCardY = 0;
                for (var j = 0; j < index; j++) {
                    var cardGroup = parentObject.getChildAt(j) as CardGroup;
                    if (!cardGroup.card.status) {
                        columnCardY += 25;
                    } else {
                        columnCardY += 61;
                    }
                }
                for (var j = index; j < numChildren; j++) {
                    var draggedObject = parentObject.getChildAt(j);
                    egret.Tween.get(draggedObject).to({ x: 0, y: columnCardY }, 200, egret.Ease.sineIn);
                    columnCardY += 61;
                }
            }
            if (this.mGroup.getChildIndex(this.bottomGroup) != -1) {
                this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.bottomGroup), this.mGroup.numChildren - 1);
                this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.myColumns), this.mGroup.numChildren - 2);
            } else {
                this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.myColumns), this.mGroup.numChildren - 1);
            }
            this.dragCard = null;
            this.draggedObject = null;
            //}
        }
    }

    private getColumNumY(i: number) {
        var columnNumY = 0;
        if (this.myColumn[i].numChildren == 0) {
            return 0;
        }
        for (var k = 0; k < this.myColumn[i].numChildren - 1; k++) {
            if (!this.solitaire.columns[i][k].status) {
                columnNumY += 25;
            } else {
                columnNumY += 61;
            }
        }
        return columnNumY;
    }

    private getColumNumYForHint(i: number) {
        var columnNumY = 0;
        if (this.solitaire.columns[i].length == 0) {
            return 0;
        }
        for (var k = 0; k < this.solitaire.columns[i].length - 1; k++) {
            if (!this.solitaire.columns[i][k].status) {
                columnNumY += 25;
            } else {
                columnNumY += 61;
            }
        }
        return columnNumY;
    }

    private autoComplete() {//自动完成
        console.log("autoComplete");
        var suitY = (this.mGroup.width - 230 * 4 - 100) / 5;
        for (var i = 0; i < 7; i++) {
            var columnsILen = this.solitaire.columns[i].length;
            if (columnsILen == 0) {
                continue;
            }
            var columnsICard = this.solitaire.columns[i][columnsILen - 1];
            var cardGroup = this.myColumn[i].getChildAt(columnsILen - 1) as CardGroup;
            var scaleY = this.defaultHeight / window.innerHeight;
            var result = this.isSuitCard(columnsICard);
            if (result != null) {
                this.solitaire.columns[i].pop();
                var x, y;
                if (this.isCrossScreen) {
                    x = -cardGroup.parent.x - this.myColumns.x;
                    y = 50 + suitY + (230 + suitY) * result;
                } else {
                    x = result * this.columnI_X - cardGroup.parent.x;
                    y = -(230 * scaleY) - this.SecondTop;
                }
                egret.Tween.get(cardGroup).call(this.swapObject, this, [cardGroup]).to({ x: x, y: y }, 100, egret.Ease.sineOut)
                    .wait(100).call(this.suitCardGroup, this, [result, cardGroup]);

                var record = new Records(cardGroup, this.myColumn[i] as egret.Sprite, "columns", i, "suits", result);
                this.record.push(record);
                if (this.scoreType == 2) {
                    this.score += 10;
                    this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
                } else if (this.scoreType == 3) {
                    this.score += 5;
                    this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
                    this.saveScore();
                }
                this.setParticle(result, cardGroup.card);
                this.isLoopDraw = false;
                return;
            }
        }
        var wastesLen = this.solitaire.wastes.length;
        if (wastesLen > 0) {
            var wastesCard = this.solitaire.wastes[wastesLen - 1];
            var cardGroup = this.myWaste.getChildAt(wastesLen - 1) as CardGroup;
            var res = this.isSuitCard(wastesCard)
            if (res != null) {
                this.solitaire.wastes.pop();
                var x, y;
                if (!this.isCrossScreen) {
                    x = -667.5 + res * this.columnI_X;
                    y = 0;
                } else {
                    x = this.myFreeBg.x + this.myWaste.x;
                    y = -(50 + suitY) + (230 + suitY) * result;
                }
                egret.Tween.get(cardGroup).call(this.swapObject, this, [cardGroup]).to({ x: x, y: y }, 100, egret.Ease.sineOut)
                    .wait(100).call(this.suitCardGroup, this, [res, cardGroup]);

                var record = new Records(cardGroup, this.myWaste as egret.Sprite, "wastes", 1, "suits", res);
                this.record.push(record);
                if (this.scoreType == 2) {
                    this.score += 10;
                    this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
                } else if (this.scoreType == 3) {
                    this.score += 5;
                    this.scoreText.text = this.textDatas["score"] + ": " + this.score + " ";
                    this.saveScore();
                }
                this.setParticle(res, cardGroup.card);
                this.isLoopDraw = false;
                return;
            }
        }
        this.onclickCount = 1;
        if (this.lastClickDragCardCount == -1) {
            this.lastClickDragCardCount = this.clickDragCardCount;
        }
        this.clickDragCardCount = 1;
        this.onclickEventTween();
    }

    private lastClickDragCardCount: number;

    private suitCardGroup(j, cardGroup) {
        this.mySuit[j].addChild(cardGroup);
        cardGroup.x = 0;
        cardGroup.y = 0;
        this.moves++;
        this.movesText.text = this.textDatas["moves"] + ": " + this.moves + " ";
        this.Soundsound();
        if (this.solitaire.isWon()) {
            this.timer.stop();
            this.Won();
        } else {
            this.autoComplete();
        }
    }

    private isSuitCard(card: Card) {
        for (var j = 0; j < 4; j++) {
            var suitsILen = this.solitaire.suits[j].length;
            if (suitsILen == 13) {
                continue;
            }
            if (suitsILen == 0) {
                if (card.value == 1) {
                    this.solitaire.suits[j].push(card);
                    return j;
                }
            } else {
                var suitsICard = this.solitaire.suits[j][suitsILen - 1];
                if (card.suit == suitsICard.suit && card.value == suitsICard.value + 1) {
                    this.solitaire.suits[j].push(card);
                    return j;
                }
            }
        }
        return null;
    }

    private virtualCount = 0;

    private hintLabel: eui.Label;
    private hintAddMessage(type, result = -1) {
        this.hintLabel = new eui.Label();
        this.hintLabel.size = 60;
        if (type == "move") {
            for (var count = 0; count < result; count++) {
                egret.Tween.get(this.hintLabel).wait(20 + 600 * count).call(this.addHintLabel, this, [type, count + 1, result])
                    .to({ alpha: 1 }, 500, egret.Ease.sineIn)
                    .call(this.removeLabel, this, [this.hintLabel]);
            }
        } else {
            egret.Tween.get(this.hintLabel).wait(20 + 600 * count).call(this.addHintLabel, this, [type])
                .to({ alpha: 1 }, 500, egret.Ease.sineIn)
                .call(this.removeLabel, this, [this.hintLabel]);
        }
    }

    private addHintLabel(type, count = 0, result = 0) {
        if (type == "move") {
            this.hintLabel.text = this.textDatas["hintMove"] + count + this.textDatas["hintMoveSign"] + result + "  ";
        } else if (type == "draw") {
            this.hintLabel.text = this.textDatas["hintDraw"];
        } else if (type == "recycle") {
            this.hintLabel.text = this.textDatas["hintRecycle"];
        }
        this.mGroup.addChild(this.hintLabel);
        this.hintLabel.x = (this.mGroup.width - this.hintLabel.width) / 2;
        this.hintLabel.y = Main.HEIGHT - this.bottomGroup.height - this.hintLabel.height - 100;
    }

    private hintComplete() {//提示完成
        if (!this.isOverDeal) {
            return;
        }
        if (this.virtualCount != 0) {
            return;
        }
        if (this.mGroup.getChildIndex(this.gameGroup) != -1 || this.mGroup.getChildIndex(this.settingsGroup) != -1) {
            return;
        }
        if (this.mGroup.getChildIndex(this.hintLabel) != -1) {
            return;
        }
        if (this.isCrossScreen) {
            if (this.mGroup.getChildIndex(this.bottomGroup) != -1) {
                this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.bottomGroup), this.mGroup.numChildren - 1);
                this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.myColumns), this.mGroup.numChildren - 2);
            } else {
                this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.myColumns), this.mGroup.numChildren - 1);
            }
        }
        var result = this.hintIsSuit();
        if (result > 0) {
            this.hintAddMessage("move", result);
            return;
        } else {
            var count = this.hintMoveColumn();
            var res = this.hintMoveWaste(count);
            if (res != false) {
                count = res;
            }
            if (count != 0) {
                this.hintAddMessage("move", count);
            } else if (res == false && count == 0) {
                var isMove = this.hintMoveHand();
                if (!isMove) {
                    this.hintLabel = new eui.Label();
                    this.hintLabel.text = this.textDatas["hintMessage"];
                    this.hintLabel.size = 60;
                    egret.Tween.get(this.hintLabel).call(this.addLabel, this).to({ alpha: 1 }, 200, egret.Ease.sineIn)
                        .wait(300).call(this.removeLabel, this);
                    if (this.isCrossScreen) {
                        this.hintLabel.scaleX = this.scaleXX;
                        this.hintLabel.scaleY = this.scaleYY;
                    }
                }
            }
        }
    }

    private addLabel() {
        this.mGroup.addChild(this.hintLabel);
        this.hintLabel.x = (this.mGroup.width - this.hintLabel.width) / 2;
        this.hintLabel.y = Main.HEIGHT - this.bottomGroup.height - this.hintLabel.height - 100;;
    }

    private removeLabel() {
        if (this.mGroup.getChildIndex(this.hintLabel) != -1) {
            this.mGroup.removeChild(this.hintLabel);
        }
    }

    private virtualGroupForHand: CardGroup;
    private virtualImageForHand: eui.Image;
    private hintMoveHand() {
        var handLen = this.solitaire.hands.length;
        var scale_X = this.defaultWidth / this.ScreenWidth;
        var scale_Y = this.defaultHeight / this.ScreenHeight;
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB || egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
            scale_X = this.defaultWidth / window.innerWidth;
            scale_Y = this.defaultHeight / window.innerHeight;
        }
        if (handLen > 0) {
            var card = this.solitaire.hands[handLen - 1];
            this.virtualGroupForHand = new CardGroup(card, true);
            // if (this.myFree.getChildIndex(this.virtualGroupForHand) != -1) {
            //     this.virtualCount--;
            // }
            this.myFree.addChild(this.virtualGroupForHand);
            this.virtualCount++;
            this.virtualGroupForHand.x = 0; this.virtualGroupForHand.y = 0;
            var wastesLen = this.solitaire.wastes.length;
            var x, y;
            if (!this.isCrossScreen) {
                this.virtualGroupForHand.scaleX = scale_X;
                this.virtualGroupForHand.scaleY = scale_Y;
                x = wastesLen >= 2 ? -260 + 40 * 2.25 : -260 + 20 * 2.25 * wastesLen;
                y = 0;
            } else {
                // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                //     virtualGroup.scaleX = this.scaleXX;
                //     virtualGroup.scaleY = this.scaleYY;
                //     x = wastesLen >= 2 ? 2.25 * 10 : 20 * 2.25 * wastesLen - 30 * 2.25;
                //     y = -220 * 2.4;
                // } else {
                this.virtualGroupForHand.scaleX = 1;
                this.virtualGroupForHand.scaleY = 1;
                x = wastesLen >= 2 ? 40 * 2.25 + this.myWaste.x - this.myFree.x : 20 * 2.25 * wastesLen + this.myWaste.x - this.myFree.x;
                y = -230 - 50;
                // }
            }
            egret.Tween.get(this.virtualGroupForHand).call(this.swapWasteObject, this, [this.virtualGroupForHand]).to({ x: x, y: y }, 300, egret.Ease.sineOut)
                .wait(300).call(this.removeVirtualCardGroup, this, [this.virtualGroupForHand]);
            this.hintAddMessage("draw");
            return true;
        } else if (this.solitaire.wastes.length > 0) {
            if (this.clickDragCardCount == 1 && this.scoreType == 3 && this.drowCount >= 0) {
                return false;
            } else if (this.clickDragCardCount == 3 && this.scoreType == 3 && this.drowCount == 3) {
                return false;
            }
            if (this.isLoopDraw) {
                return false;
            }
            this.virtualImageForHand = new eui.Image();
            this.virtualImageForHand.source = RES.getRes("virtual_png");
            this.virtualImageForHand.touchEnabled = false;
            // if (this.myFree.getChildIndex(this.virtualImageForHand) != -1) {
            //     this.virtualCount--;
            // }
            this.myFree.addChild(this.virtualImageForHand);
            this.virtualCount++;
            this.virtualImageForHand.x = -7;
            this.virtualImageForHand.y = -5.5;
            this.virtualImageForHand.alpha = 0;
            if (!this.isCrossScreen) {
                this.virtualImageForHand.scaleX = scale_X;
                this.virtualImageForHand.scaleY = scale_Y;
            } else {
                // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                //     virtualImage.scaleX = this.scaleXX;
                //     virtualImage.scaleY = this.scaleYY;
                // } else{
                this.virtualImageForHand.scaleX = 1;
                this.virtualImageForHand.scaleY = 1;
                // }
            }
            if (this.isCrossScreen) {
                if (this.mGroup.getChildIndex(this.bottomGroup) != -1) {
                    this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.bottomGroup), this.mGroup.numChildren - 1);
                    this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.myColumns), this.mGroup.numChildren - 2);
                } else {
                    this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.myColumns), this.mGroup.numChildren - 1);
                }
            }
            egret.Tween.get(this.virtualImageForHand).to({ alpha: 1 }, 200, egret.Ease.sineOut).wait(200).to({ alpha: 0 }, 100, egret.Ease.sineOut)
                .wait(300).call(this.removeVirtualCardGroup, this, [this.virtualImageForHand]);
            this.hintAddMessage("recycle");
            return true;
        }
        return false;
    }

    private hintMoveWaste(count) {
        var scale_X = this.defaultWidth / this.ScreenWidth;
        var scale_Y = this.defaultHeight / this.ScreenHeight;
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB || egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
            scale_X = this.defaultWidth / window.innerWidth;
            scale_Y = this.defaultHeight / window.innerHeight;
        }
        var wasteLen = this.solitaire.wastes.length;
        if (wasteLen == 0) {
            return false;
        }
        var card = this.solitaire.wastes[wasteLen - 1];
        var result = this.hintIsWasteMoveCard(card);
        if (result != null) {
            var virtualGroup = new CardGroup(card, true);
            this.myWaste.addChild(virtualGroup);
            this.virtualCount++;

            virtualGroup.x = wasteLen >= 3 ? 40 * 2.25 : 20 * 2.25 * (wasteLen - 1);
            virtualGroup.y = 0;
            var x, y, len = this.solitaire.columns[result].length;
            y = this.getColumNumYForHint(result);
            if (!this.isCrossScreen) {
                virtualGroup.scaleX = scale_X;
                virtualGroup.scaleY = scale_Y;
                x = result * this.columnI_X - 667.5;
                if (len != 0) {
                    y += 61;
                }
                y += 230 * scale_Y + this.SecondTop;
            } else {
                // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                //     virtualGroup.scaleX = this.scaleXX;
                //     virtualGroup.scaleY = this.scaleYY;
                //     x = result * this.columnI_X - 320 * 2.25;
                //     if (len != 0) {
                //         y += 61 * this.scaleYY;
                //     }
                //     y -= 100 * 2.4;
                // } else{
                virtualGroup.scaleX = 1;
                virtualGroup.scaleY = 1;
                x = result * this.columnI_X - (this.myFreeBg.x + this.myWaste.x - this.myColumns.x);
                if (len != 0) {
                    y += 61;
                }
                y -= (this.myGroup.y + 150);
                // }
            }
            egret.Tween.get(virtualGroup).wait(600 * count + 20).call(this.swapWasteObject, this, [virtualGroup]).to({ x: x, y: y }, 400, egret.Ease.sineOut)
                .wait(200).call(this.removeVirtualCardGroup, this, [virtualGroup]);
            count++;
            return count;
        }
        return false;
    }

    private swapWasteObject(nParentObject) {
        if (this.isCrossScreen) {
            if (this.mGroup.getChildIndex(this.bottomGroup) != -1) {
                this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.bottomGroup), this.mGroup.numChildren - 2);
            }
        }
        nParentObject.parent.swapChildrenAt(nParentObject.parent.getChildIndex(nParentObject), nParentObject.parent.numChildren - 1);
        var parentObject = nParentObject.parent;
        parentObject.parent.swapChildrenAt(parentObject.parent.getChildIndex(parentObject), parentObject.parent.numChildren - 1);
        parentObject = nParentObject.parent.parent;
        parentObject.parent.swapChildrenAt(parentObject.parent.getChildIndex(parentObject), parentObject.parent.numChildren - 1);
        parentObject = nParentObject.parent.parent.parent;
        parentObject.parent.swapChildrenAt(parentObject.parent.getChildIndex(parentObject), parentObject.parent.numChildren - 1);
    }

    private hintIsWasteMoveCard(card: Card) {
        for (var index = 0; index < 7; index++) {
            var len = this.solitaire.columns[index].length;
            if ((len == 0 && card.value == 13) || (len > 0 && this.solitaire.columns[index][len - 1].color != card.color && this.solitaire.columns[index][len - 1].value == card.value + 1)) {
                return index;
            }
        }
        return null;
    }

    private hintMoveColumn() {
        var count = 0;
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < this.solitaire.columns[i].length; j++) {
                var card = this.solitaire.columns[i][j];
                if (card.status == true) {
                    var result = this.hintIsColumnMoveCard(card, i, j);
                    if (result != null) {
                        var virtualGroup = this.createVirtualGroup(i, j);
                        this.myColumn[i].addChild(virtualGroup);
                        this.virtualCount++;

                        var x, y, len = this.solitaire.columns[result].length;
                        y = this.getColumNumYForHint(result);
                        if (!this.isCrossScreen) {
                            virtualGroup.x = 0;
                            virtualGroup.y = 25 * j;
                            x = result * this.columnI_X - this.myColumn[i].x;
                            if (len != 0) {
                                y += 61;
                            }
                        } else {
                            virtualGroup.x = 0;
                            virtualGroup.y = 25 * j;
                            x = result * this.columnI_X - this.myColumn[i].x;
                            if (len != 0) {
                                y += 61;
                            }
                        }
                        egret.Tween.get(virtualGroup).wait(600 * count + 20).call(this.swapObject, this, [virtualGroup.parent]).to({ x: x, y: y }, 400, egret.Ease.sineOut)
                            .wait(200).call(this.removeVirtualCardGroup, this, [virtualGroup]);
                        count++;
                    }
                    break;
                }
            }
        }
        return count;
    }

    private createVirtualGroup(ii, jj) {
        var scale_X = this.defaultWidth / this.ScreenWidth;
        var scale_Y = this.defaultHeight / this.ScreenHeight;
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB || egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
            scale_X = this.defaultWidth / window.innerWidth;
            scale_Y = this.defaultHeight / window.innerHeight;
        }
        var len = this.solitaire.columns[ii].length;
        var virtualGroup = new egret.Sprite(); var count = 0;
        for (var j = jj; j < len; j++) {
            var card = this.solitaire.columns[ii][j];
            var virtualCardGroup = new CardGroup(card, true);
            virtualGroup.addChild(virtualCardGroup);
            virtualCardGroup.x = 0;
            virtualCardGroup.y = 61 * count;
            if (this.isCrossScreen) {
                // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                //     virtualCardGroup.scaleX = this.scaleXX;
                //     virtualCardGroup.scaleY = this.scaleYY;
                // }else{
                virtualGroup.scaleX = 1;
                virtualGroup.scaleY = 1;
                // }
            } else {
                virtualGroup.scaleX = scale_X;
                virtualGroup.scaleY = scale_Y;
            }
            count++;
        }

        return virtualGroup;
    }

    private hintIsColumnMoveCard(card: Card, i, j) {
        for (var index = 0; index < 7; index++) {
            if (index == i) {
                continue;
            }
            var len = this.solitaire.columns[index].length;
            if (len > 0 && this.solitaire.columns[index][len - 1].color != card.color && this.solitaire.columns[index][len - 1].value == card.value + 1) {
                return index;
            } else if (len == 0 && card.value == 13) {
                if (j == 0) {
                    return null;
                }
                return index;
            }
        }
        return null;
    }

    private hintIsSuit() {
        //  console.log("hintIsSuit");
        var scale_X = this.defaultWidth / this.ScreenWidth;
        var scale_Y = this.defaultHeight / this.ScreenHeight;
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB || egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
            scale_X = this.defaultWidth / window.innerWidth;
            scale_Y = this.defaultHeight / window.innerHeight;
        }
        var count = 0;
        var suitY = (Main.WIDTH - 230 * 4 - 100) / 5;
        for (var i = 0; i < 7; i++) {
            var columnsILen = this.solitaire.columns[i].length;
            if (columnsILen == 0) {
                continue;
            }
            var columnsICard = this.solitaire.columns[i][columnsILen - 1];
            var cardGroup = this.myColumn[i].getChildAt(columnsILen - 1) as CardGroup;
            var result = this.hintSuitCard(columnsICard);
            if (result != null) {
                var virtualGroup = new CardGroup(columnsICard, true);
                cardGroup.parent.addChild(virtualGroup);
                this.virtualCount++;

                virtualGroup.x = cardGroup.x; virtualGroup.y = cardGroup.y;
                var x, y;
                if (!this.isCrossScreen) {
                    virtualGroup.scaleX = scale_X;
                    virtualGroup.scaleY = scale_Y;
                    x = result * this.columnI_X - cardGroup.parent.x;
                    y = -230 * scale_Y - this.SecondTop;
                } else {
                    // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                    //     virtualGroup.scaleX = this.scaleXX;
                    //     virtualGroup.scaleY = this.scaleYY;
                    //     x = -cardGroup.parent.x - 70 * 2.25;
                    //     y = (50 + 180 * result) * 2.4;
                    // } else{
                    virtualGroup.scaleX = 1;
                    virtualGroup.scaleY = 1;
                    x = -cardGroup.parent.x - this.myColumns.x;
                    y = 50 + suitY + (230 + suitY) * result;
                    // }
                }
                egret.Tween.get(virtualGroup).wait(600 * count + 20).call(this.swapObject, this, [virtualGroup.parent]).to({ x: x, y: y }, 400, egret.Ease.sineOut)
                    .wait(200).call(this.removeVirtualCardGroup, this, [virtualGroup]);
                count++;
            }
        }
        var wastesLen = this.solitaire.wastes.length;
        if (wastesLen > 0) {
            var wastesCard = this.solitaire.wastes[wastesLen - 1];
            var cardGroup = this.myWaste.getChildAt(wastesLen - 1) as CardGroup;
            var res = this.hintSuitCard(wastesCard)
            if (res != null) {
                var virtualGroup = new CardGroup(wastesCard, true);
                cardGroup.parent.addChild(virtualGroup);
                this.virtualCount++;
                virtualGroup.x = cardGroup.x; virtualGroup.y = cardGroup.y;
                var x, y;
                if (!this.isCrossScreen) {
                    virtualGroup.scaleX = scale_X;
                    virtualGroup.scaleY = scale_Y;
                    x = -667.5 + res * this.columnI_X;
                    y = 0;
                } else {
                    // if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                    //     virtualGroup.scaleX = this.scaleXX;
                    //     virtualGroup.scaleY = this.scaleYY;
                    //     x = -390 * 2.25;
                    //     y = (-50 + 180 * res) * 2.4;
                    // } else {
                    virtualGroup.scaleX = 1;
                    virtualGroup.scaleY = 1;
                    x = -(this.myFreeBg.x + this.myWaste.x);
                    y = -150 + (230 + suitY) * res;
                    // }
                }
                if (this.isCrossScreen) {
                    if (this.mGroup.getChildIndex(this.bottomGroup) != -1) {
                        this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.bottomGroup), this.mGroup.numChildren - 1);
                        this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.myColumns), this.mGroup.numChildren - 2);
                    } else {
                        this.mGroup.swapChildrenAt(this.mGroup.getChildIndex(this.myColumns), this.mGroup.numChildren - 1);
                    }
                }
                egret.Tween.get(virtualGroup).wait(600 * count + 20).call(this.swapWasteObject, this, [virtualGroup]).to({ x: x, y: y }, 400, egret.Ease.sineOut)
                    .wait(200).call(this.removeVirtualCardGroup, this, [virtualGroup]);
                count++;
                return count;
            }
        }
        return count;
    }

    private removeVirtualCardGroup(cardGroup) {
        cardGroup.parent.removeChild(cardGroup);
        this.virtualCount--;
    }

    private hintSuitCard(card: Card) {
        for (var j = 0; j < 4; j++) {
            var suitsILen = this.solitaire.suits[j].length;
            if (suitsILen == 13) {
                continue;
            }
            if (suitsILen == 0) {
                if (card.value == 1) {
                    return j;
                }
            } else {
                var suitsICard = this.solitaire.suits[j][suitsILen - 1];
                if (card.suit == suitsICard.suit && card.value == suitsICard.value + 1) {
                    return j;
                }
            }
        }
        return null;
    }

    private timerWinFunc() {
        this.winImage.source = RES.getRes(this.winTimer.currentCount + "_png");
        if (this.winTimer.currentCount == this.winTimer.repeatCount) {
            this.winTimer.reset();
        }
    }

    private winTimer: egret.Timer;
    private winImage: eui.Image;
    private Won() {
        this.isOverGame = true;
        if (this.lastClickDragCardCount != -1) {
            this.clickDragCardCount = this.lastClickDragCardCount;
            this.lastClickDragCardCount = -1;
        }

        this.wonGroup = new eui.Group();
        this.mGroup.addChild(this.wonGroup);
        //    this.mGroup.removeChildren();
        var backGroundImage = new eui.Image();
        backGroundImage.source = RES.getRes("winBG_jpg");
        this.wonGroup.addChild(backGroundImage);

        this.winImage = new eui.Image();
        this.wonGroup.addChild(this.winImage);
        this.winImage.y = -100;
        this.winImage.source = RES.getRes("1_png");
        this.winTimer = new egret.Timer(50, 18);
        this.winTimer.addEventListener(egret.TimerEvent.TIMER, this.timerWinFunc, this);
        this.winTimer.start();
        // timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        // var data = RES.getRes("win_json");
        // var txtr = RES.getRes("win_png");
        // var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        // this.mc = new egret.MovieClip(mcFactory.generateMovieClipData("win"));
        // this.wonGroup.addChild(this.mc);
        // this.mc.gotoAndPlay(1);
        // this.mc.y = -100;

        this.modeDraw = new eui.Label();
        if (this.scoreType == 1) {
            this.modeDraw.text = this.textDatas["modeDraw"][0] + this.clickDragCardCount;
        } else if (this.scoreType == 2) {
            this.modeDraw.text = this.textDatas["modeDraw"][1] + this.clickDragCardCount;
        } else if (this.scoreType == 3) {
            this.modeDraw.text = this.textDatas["modeDraw"][2] + this.clickDragCardCount;
        }
        this.modeDraw.size = 65;
        this.modeDraw.textColor = 0x92d2ad;
        this.wonGroup.addChild(this.modeDraw);
        this.modeDraw.x = (Main.WIDTH - this.modeDraw.width) / 2;
        this.modeDraw.y = 850;

        this.scoreLabel = new eui.Label();
        this.wonGroup.addChild(this.scoreLabel);
        this.scoreLabel.text = this.textDatas["score"];
        this.scoreLabel.size = 55;
        this.scoreLabel.textColor = 0x92d2ad;
        this.scoreLabel.x = 180;
        this.scoreLabel.y = 1000;

        this.movesLabel = new eui.Label();
        this.wonGroup.addChild(this.movesLabel);
        this.movesLabel.text = this.textDatas["moves"];
        this.movesLabel.size = 50;
        this.movesLabel.textColor = 0x92d2ad;
        this.movesLabel.x = 480;
        this.movesLabel.y = 1000;

        this.timeLabel = new eui.Label();
        this.wonGroup.addChild(this.timeLabel);
        this.timeLabel.text = this.textDatas["time"];
        this.timeLabel.size = 55;
        this.timeLabel.textColor = 0x92d2ad;
        this.timeLabel.x = 780;
        this.timeLabel.y = 1000;

        this.scoreData = new eui.Label();
        this.wonGroup.addChild(this.scoreData);
        if (this.scoreType == 1) {
            this.scoreData.text = "none";
        } else {
            this.scoreData.text = String(this.score);
        }
        this.scoreData.size = 50;
        this.scoreData.textColor = 0xeafff3;
        this.scoreData.x = 180 + (this.scoreLabel.width - this.scoreData.width) / 2;
        this.scoreData.y = 1100;

        this.movesData = new eui.Label();
        this.wonGroup.addChild(this.movesData);
        this.movesData.text = String(this.moves);
        this.movesData.size = 50;
        this.movesData.textColor = 0xeafff3;
        this.movesData.x = 480 + (this.movesLabel.width - this.movesData.width) / 2;
        this.movesData.y = 1100;

        this.timeData = new eui.Label();
        this.wonGroup.addChild(this.timeData);
        this.timeData.text = this.getTime();
        this.timeData.size = 50;
        this.timeData.textColor = 0xeafff3;
        this.timeData.x = 780 + (this.timeLabel.width - this.timeData.width) / 2;
        this.timeData.y = 1100;

        this.newGameButton = new eui.Image();
        this.newGameButton.texture = RES.getRes("newGameButton_png");
        this.wonGroup.addChild(this.newGameButton);
        this.newGameButton.x = (this.stage.stageWidth - this.newGameButton.texture.textureWidth) / 2;
        this.newGameButton.y = 1500;
        this.newGameButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.randStartGame, this);

        this.newGameButtonLabel = new eui.Label();
        this.wonGroup.addChild(this.newGameButtonLabel);
        this.newGameButtonLabel.text = this.textDatas["newGameButton"];
        this.newGameButtonLabel.size = 62;
        this.newGameButtonLabel.textColor = 0x1c643b;
        this.newGameButtonLabel.x = (this.stage.stageWidth - this.newGameButtonLabel.textWidth) / 2;
        this.newGameButtonLabel.y = this.newGameButton.y - 5 + (this.newGameButton.texture.textureHeight - this.newGameButtonLabel.size) / 2;


        // if (this.isCrossScreen) {
        //     // this.mc.scaleY = this.scaleYY;
        //     // this.mc.y = -400;
        //     // this.modeDraw.scaleY = this.scaleYY;
        //     // this.scoreLabel.scaleY = this.scaleYY;
        //     // this.movesLabel.scaleY = this.scaleYY;
        //     // this.timeLabel.scaleY = this.scaleYY;
        //     // this.scoreData.scaleY = this.scaleYY;
        //     // this.movesData.scaleY = this.scaleYY;
        //     // this.timeData.scaleY = this.scaleYY;
        //     // this.newGameButton.scaleY = this.scaleYY;

        //     backGroundImage.width = Main.HEIGHT;
        //     backGroundImage.height = Main.WIDTH;
        //     this.mc.x = 420;
        //     this.mc.y = -300;
        //     this.modeDraw.x = (Main.HEIGHT - this.modeDraw.width) / 2;
        //     this.modeDraw.y = 500;
        //     this.scoreLabel.x = 600;
        //     this.scoreLabel.y = 650;
        //     this.movesLabel.x = 900;
        //     this.movesLabel.y = 650;
        //     this.timeLabel.x = 1200;
        //     this.timeLabel.y = 650;

        //     this.scoreData.x = 600 + (this.scoreLabel.width - this.scoreData.width) / 2;
        //     this.scoreData.y = 700;
        //     this.movesData.x = 900 + (this.movesLabel.width - this.movesData.width) / 2;
        //     this.movesData.y = 700;
        //     this.timeData.x = 1200 + (this.timeLabel.width - this.timeData.width) / 2;
        //     this.timeData.y = 700;
        //     this.newGameButton.y = 900;
        //     this.newGameButton.x = (Main.HEIGHT - this.newGameButton.texture.textureWidth) / 2;
        // }
    }
}