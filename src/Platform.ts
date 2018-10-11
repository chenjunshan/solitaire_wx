/** 
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
declare interface Platform {
    SDKWxa: any;

    openDataContext: any;

    vibrateShort(): Promise<any>;
    vibrateLong(): Promise<any>;

    onShow(data): Promise<any>;
    offShow(data): Promise<any>;

    onHide(data): Promise<any>;
    offHide(data): Promise<any>;

    getLaunchOptionsSync(): Promise<any>;

    getSystemInfo(): Promise<any>;

    getSystemInfoSync(): Promise<any>;

    login(): Promise<any>;

    getUserInfo(): Promise<any>;

    showModal(data): Promise<any>;

    createUserInfoButton(data): Promise<any>;
    getSetting(): Promise<any>;
    openSetting(): Promise<any>;

    showShareMenu(data): Promise<any>;
    hideShareMenu(): Promise<any>;
    shareAppMessage(data): Promise<any>;
    updateShareMenu(data): Promise<any>;
    onShareAppMessage(data): Promise<any>;
    offShareAppMessage(data): Promise<any>;
    getShareInfo(data): Promise<any>;

    createGameClubButton(data): Promise<any>;

    hideToast(): Promise<any>;

    hideLoading(): Promise<any>;

    showToast(data): Promise<any>;

    showLoading(data): Promise<any>;

    createBannerAd(data): Promise<any>;
    createRewardedVideoAd(data): Promise<any>;

    setUserCloudStorage(data): Promise<any>;
    removeUserCloudStorage(data): Promise<any>;
    getUserCloudStorage(data): Promise<any>;
    getFriendCloudStorage(data): Promise<any>;
    getGroupCloudStorage(data): Promise<any>;

    getNextFriendCloudStorage(data): Promise<any>;

    getEndFriendCloudStorage(data): Promise<any>;

    clearSharedCanvas(): Promise<any>;
    openSharedCanvas(): Promise<any>;
    closeSharedCanvas(): Promise<any>;
    loadResSharedCanvas(): Promise<any>;

    previewImage(data): Promise<any>;
    checkSession(): Promise<any>;
}

class DebugPlatform implements Platform {
    SDKWxa = null;
    openDataContext = null;

    async vibrateShort() {
        return false;
    }
    async vibrateLong() {
        return false;
    }

    async onShow() {
        return false;
    }
    async offShow() {
        return false;
    }

    async onHide() {
        return false;
    }
    async offHide() {
        return false;
    }

    async getLaunchOptionsSync() {
        return false;
    }

    async getSystemInfo() {
        return false;
    }

    async getSystemInfoSync() {
        return false;
    }
    async login() {
        return true;
    }
    async getUserInfo() {
        return { username: "test" };
    }
    async showModal(data) {
        return false;
    }

    async createUserInfoButton() {
        return false;
    }
    async getSetting() {
        return { authSetting: { 'scope.userInfo': true } };
    }
    async openSetting() {
        return false;
    }

    async showShareMenu(data) {
        return false;
    }
    async hideShareMenu() {
        return false;
    }
    async shareAppMessage(data) {
        return false;
    }
    async updateShareMenu(data) {
        return false;
    }
    async onShareAppMessage(data) {
        return false;
    }
    async offShareAppMessage(data) {
        return false;
    }
    async getShareInfo(data) {
        return false;
    }

    async createGameClubButton(data) {
        return false;
    }

    async hideToast() {
        return false;
    }
    async hideLoading() {
        return false;
    }
    async showToast(data) {
        return false;
    }
    async showLoading(data) {
        return false;
    }

    async createBannerAd(data) {
        return false;
    }

    async createRewardedVideoAd(data) {
        return false;
    }

    async setUserCloudStorage(data) {
        return false;
    }
    async removeUserCloudStorage(data) {
        return false;
    }
    async getUserCloudStorage(data) {
        return false;
    }
    async getFriendCloudStorage(data) {
        return false;
    }
    async getGroupCloudStorage(data) {
        return false;
    }

    async getNextFriendCloudStorage(data) {
        return false;
    }

    async getEndFriendCloudStorage(data) {
        return false;
    }

    async clearSharedCanvas() {
        return false;
    }

    async openSharedCanvas() {
        return false;
    }
    async closeSharedCanvas() {
        return false;
    }
    async loadResSharedCanvas() {
        return false;
    }

    async previewImage(data) {
        return false;
    }

    async checkSession() {
        return false;
    }
}


if (!window.platform) {
    window.platform = new DebugPlatform();
}



declare let platform: Platform;

declare interface Window {

    platform: Platform
}