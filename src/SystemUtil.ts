/**
 *
 * @author xsq
 *
 */
class SystemUtil {
    /**
    * 判断当前运行环境是否是 Native
    */
    public static isNative(): boolean {
        return egret.Capabilities.runtimeType == egret.RuntimeType.RUNTIME2;
    }

    /**
    * 判断当前运行环境是否是 手机
    */
    public static isMobile(): boolean {
        return egret.Capabilities.isMobile;
    }

    /**
    * 判断当前运行环境是否是 Android
    */
    public static async isAndroid() {
        var result: boolean = false;
        var data = await platform.getSystemInfo();
        if (data) {
            var system: string = data.system;
            var index = system.indexOf("Android");
            result = (index != -1);
        }
        return result;
    }

    /**
    * 判断当前运行环境是否是 微信
    */
    public static isWX(): boolean {
        var result: boolean = false;
        var str: string = window.navigator.userAgent;
        if (str && (str.indexOf("MicroMessenger") != -1)) {
            result = true;
        }
        return result;
    }

    /**
    * 发生消息给Native
    */
    public static sendToNative(sendType: string, sendData?: string): void {
        if (SystemUtil.isNative()) {
            var send = {
                type: sendType
            };
            if (sendData) {
                send["data"] = sendData;
            }
            egret.ExternalInterface.call("sendToNative", JSON.stringify(send));
        }
    }

    /**
     * 判断data是否存在
     */
    public static isVoid(data: any): boolean {
        return data == null || data == undefined;
    }

    //判断两个时间戳是否是同一天
    public static isSameDay(currentTime: number, beforeTime: number): boolean {
        if (beforeTime == null || beforeTime == undefined || beforeTime == 0
            || currentTime == null || currentTime == undefined || currentTime == 0) {
            return false;
        }
        var currentDate: Date = new Date(currentTime);
        var beforeDate: Date = new Date(beforeTime);
        var currentYear: number = currentDate.getFullYear();
        var beforeYear: number = beforeDate.getFullYear();
        var currentMonth: number = currentDate.getMonth();
        var beforeMonth: number = beforeDate.getMonth();
        var currentDay: number = currentDate.getDay();
        var beforeDay: number = beforeDate.getDay();
        var result: boolean = currentYear == beforeYear
            && currentMonth == beforeMonth
            && currentDay == beforeDay;
        return result;
    }

    //判断两个时间戳是否连续
    public static isConsecutiveDay(currentTime: number, beforeTime: number): boolean {
        var currentDate: Date = new Date(currentTime);
        var beforeDate: Date = new Date(beforeTime);
        var currentYear: number = currentDate.getFullYear();
        var beforeYear: number = beforeDate.getFullYear();
        var currentMonth: number = currentDate.getMonth();
        var beforeMonth: number = beforeDate.getMonth();
        var currentDay: number = currentDate.getDay();
        var beforeDay: number = beforeDate.getDay();
        var value: number = currentDay - beforeDay;
        var result: boolean = currentYear == beforeYear
            && currentMonth == beforeMonth
            && value == 1;
        return result;
    }

    /**
     * 判断本地时间是否是同一天，凌晨12点重置
     * @param time 毫秒
     */
    public static isToday(time: number): boolean {
        var d = new Date();
        d.setTime(time);
        var todaysDate = new Date();
        if (d.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
            return true;
        } else {
            return false;
        }
    }

    //判断两个时间戳相差多少小时
    public static getDiffTime(currentTime: number, beforeTime: number): any {
        var diff = currentTime - beforeTime;
        var a = 24 * 60 * 60 * 1000;
        var b = 60 * 60 * 1000;
        var c = 60 * 1000;
        var day = Math.floor(diff / a);
        var hour = Math.floor(diff % a / b);
        var minute = Math.floor(diff % a % b / c);
        var second = Math.floor(diff % a % b % c);
        return { "day": day, "hour": hour, "minute": minute, "second": second };
    }

    public static getDiffTimeStr(currentTime: number, beforeTime: number): string {
        var obj = SystemUtil.getDiffTime(currentTime, beforeTime);
        var str = null;
        if (obj.day > 0) {
            str = obj.day + "天";
        } else if (obj.hour > 0) {
            str = obj.hour + "小时";
        } else if (obj.minute > 0) {
            str = obj.minute + "分钟";
        } else if (obj.second > 0) {
            str = obj.second + "秒";
        }
        return str;
    }

    public static getAngle(px, py, mx, my) {//获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
        var x = Math.abs(px - mx);
        var y = Math.abs(py - my);
        var z = Math.sqrt(x * x + y * y);
        var cos = y / z;
        var radina = Math.acos(cos);//用反三角函数求弧度

        var angle = 180 / (Math.PI / radina);//将弧度转换成角度
        return angle;
    }

    public static getEgretAngle(px, py, mx, my) {//获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
        var x = Math.abs(px - mx);
        var y = Math.abs(py - my);
        var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        var cos = y / z;
        var radina = Math.acos(cos);//用反三角函数求弧度
        var angle = Math.floor(180 / (Math.PI / radina));//将弧度转换成角度

        if (mx > px && my > py) {//鼠标在第四象限
            angle = 180 - angle;
        }

        if (mx == px && my > py) {//鼠标在y轴负方向上
            angle = 180;
        }

        if (mx > px && my == py) {//鼠标在x轴正方向上
            angle = 90;
        }

        if (mx < px && my > py) {//鼠标在第三象限
            angle = 180 + angle;
        }

        if (mx < px && my == py) {//鼠标在x轴负方向
            angle = 270;
        }

        if (mx < px && my < py) {//鼠标在第二象限
            angle = 360 - angle;
        }

        return angle;
    }

    public static dist(x1, y1, x2, y2): number {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }

    //判断两个矩形是否相交
    public static checkRect(startX1, endX1, startY1, endY1, startX2, endX2, startY2, endY2): boolean {
        return SystemUtil.checkPoint(startX1, endX1, startY1, endY1, startX2, endX2, startY2, endY2)
            || SystemUtil.checkPoint(startX2, endX2, startY2, endY2, startX1, endX1, startY1, endY1)
    }
    public static checkPoint(startX1, endX1, startY1, endY1, startX2, endX2, startY2, endY2): boolean {
        var result = false;
        if (((startX1 >= startX2 && startX1 <= endX2)
            || (endX1 >= startX2 && endX1 <= endX2))
            && ((startY1 >= startY2 && startY1 <= endY2)
                || (endY1 >= startY2 && endY1 <= endY2))) {
            result = true;
        }
        return result;
    }

    public static Square(num) {
        return num * num
    }

    //弧度转角度
    public static RadToAngle(rad) {
        return 180 / Math.PI * rad;
    }

    //角度转弧度
    public static AngleToRad(angle) {
        return Math.PI / 180 * angle;
    }

    //抛物线长度
    public static ParabolaLength(startPoint: egret.Point, middlePoint: egret.Point, endPoint: egret.Point) {
        var l = SystemUtil.dist(startPoint.x, startPoint.y, endPoint.x, endPoint.y);//抛物线的水平投影长度
        var minY = Math.min(startPoint.y, endPoint.y);
        var h = Math.abs(middlePoint.y - minY);//抛物线的矢高
        var len = l + (8 * Math.pow(h, 2)) / (3 * Math.pow(l, 2)) * l;
        return len;
    }

    public static ResData = {};

    public static getResUrl(resName: string): string {
        var resUrl = "";
        for (var i in SystemUtil.ResData) {
            var temp = SystemUtil.ResData[i];
            if (temp.name == resName) {
                resUrl = "resource/" + temp.url;
                break;
            }
        }
        return resUrl;
    }
}