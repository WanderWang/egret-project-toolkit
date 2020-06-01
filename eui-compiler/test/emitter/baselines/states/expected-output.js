skins.MyComponent2 = function (_super) {
    __extends(MyComponent2, _super);
    function MyComponent2() {
        var _this = _super.call(this) || this;
        _this.skinParts = [];
        _this.width = 400;
        var a1 = new eui.Image();
        a1.width = 100;
        a1.source = 'a_png';
        _this.elementsContent = [a1];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [
                new eui.SetProperty('a1', 'source', 'button_down_png')
            ]),
            new eui.State('disabled', [])
        ];
        return _this;
    }
    return MyComponent2;
}(eui.Skin);