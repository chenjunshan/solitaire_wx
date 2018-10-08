class LoadingUI extends eui.UILayer {
    public constructor() {
        super();
        // this.width = game.Size.width;
        // this.height = game.Size.height;
        this.initView();
    }

    private initView(): void {
        var shape: egret.Shape = new egret.Shape();
        this.addChild(shape);

        var img: eui.Image = new eui.Image();
        img.horizontalCenter = 0;
        img.verticalCenter = 0;
        RES.getResAsync("bg_loading_png", (data) => {
            img.texture = data;
        }, this);
        this.addChild(img);

        this.addEventListener(egret.Event.RESIZE, () => {
            shape.graphics.clear();
            shape.graphics.beginFill(0x000000);
            shape.graphics.drawRect(0, 0, this.width, this.height);
            shape.graphics.endFill();
            img.height = this.height;
            img.width = 1080 * this.height / 1920;
        }, this);
    }

    public setProgress(current: number, total: number): void {
    }
}