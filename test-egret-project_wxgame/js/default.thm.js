var egret = window.egret;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


    window.skins=window.skins||{};
    window.generateEUI = {};
    generateEUI.paths = {};
    generateEUI.styles = undefined;
    generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.TextInput":"resource/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml"};
    skins.ButtonSkin = function (_super) {
    __extends(ButtonSkin, _super);
    function ButtonSkin() {
        var _this = _super.call(this) || this;
        _this.skinParts = [
            'labelDisplay',
            'iconDisplay'
        ];
        _this.minHeight = 50;
        _this.minWidth = 100;
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Label();
        _this.labelDisplay = a2;
        a2.top = 8;
        a2.bottom = 8;
        a2.left = 8;
        a2.right = 8;
        a2.size = 20;
        a2.textColor = 16777215;
        a2.verticalAlign = 'middle';
        a2.textAlign = 'center';
        var a3 = new eui.Image();
        _this.iconDisplay = a3;
        a3.horizontalCenter = '0';
        a3.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a3
        ];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'button_down_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'alpha', 0.5)])
        ];
        return _this;
    }
    return ButtonSkin;
}(eui.Skin);

generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = skins.ButtonSkin;
        skins.CheckBoxSkin = function (_super) {
    __extends(CheckBoxSkin, _super);
    function CheckBoxSkin() {
        var _this = _super.call(this) || this;
        _this.skinParts = [
            'labelDisplay',
            'iconDisplay'
        ];
        _this.minHeight = 50;
        _this.minWidth = 100;
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Label();
        _this.labelDisplay = a2;
        a2.top = 8;
        a2.bottom = 8;
        a2.left = 8;
        a2.right = 8;
        a2.size = 20;
        a2.textColor = 16777215;
        a2.verticalAlign = 'middle';
        a2.textAlign = 'center';
        var a3 = new eui.Image();
        _this.iconDisplay = a3;
        a3.horizontalCenter = '0';
        a3.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a3
        ];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'button_down_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'alpha', 0.5)])
        ];
        _this.skinParts = ['labelDisplay'];
        var a1 = new eui.Group();
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        var a2 = new eui.HorizontalLayout();
        a2.verticalAlign = 'middle';
        a1.layout = a2;
        var a3 = new eui.Image();
        _this.a3 = a3;
        a3.fillMode = 'scale';
        a3.alpha = 1;
        a3.source = 'checkbox_unselect_png';
        var a4 = new eui.Label();
        _this.labelDisplay = a4;
        a4.size = 20;
        a4.textColor = 7368816;
        a4.textAlign = 'center';
        a4.verticalAlign = 'middle';
        a4.fontFamily = 'Tahoma';
        a1.elementsContent = [
            a3,
            a4
        ];
        _this.elementsContent = [a1];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a3', 'alpha', 0.7)]),
            new eui.State('disabled', [new eui.SetProperty('a3', 'alpha', 0.5)]),
            new eui.State('upAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_up_png')]),
            new eui.State('downAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_down_png')]),
            new eui.State('disabledAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_disabled_png')])
        ];
        return _this;
    }
    return CheckBoxSkin;
}(eui.Skin);

generateEUI.paths['resource/eui_skins/CheckBoxSkin.exml'] = skins.CheckBoxSkin;
        skins.HScrollBarSkin = function (_super) {
    __extends(HScrollBarSkin, _super);
    function HScrollBarSkin() {
        var _this = _super.call(this) || this;
        _this.skinParts = [
            'labelDisplay',
            'iconDisplay'
        ];
        _this.minHeight = 50;
        _this.minWidth = 100;
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Label();
        _this.labelDisplay = a2;
        a2.top = 8;
        a2.bottom = 8;
        a2.left = 8;
        a2.right = 8;
        a2.size = 20;
        a2.textColor = 16777215;
        a2.verticalAlign = 'middle';
        a2.textAlign = 'center';
        var a3 = new eui.Image();
        _this.iconDisplay = a3;
        a3.horizontalCenter = '0';
        a3.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a3
        ];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'button_down_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'alpha', 0.5)])
        ];
        _this.skinParts = ['labelDisplay'];
        var a1 = new eui.Group();
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        var a2 = new eui.HorizontalLayout();
        a2.verticalAlign = 'middle';
        a1.layout = a2;
        var a3 = new eui.Image();
        _this.a3 = a3;
        a3.fillMode = 'scale';
        a3.alpha = 1;
        a3.source = 'checkbox_unselect_png';
        var a4 = new eui.Label();
        _this.labelDisplay = a4;
        a4.size = 20;
        a4.textColor = 7368816;
        a4.textAlign = 'center';
        a4.verticalAlign = 'middle';
        a4.fontFamily = 'Tahoma';
        a1.elementsContent = [
            a3,
            a4
        ];
        _this.elementsContent = [a1];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a3', 'alpha', 0.7)]),
            new eui.State('disabled', [new eui.SetProperty('a3', 'alpha', 0.5)]),
            new eui.State('upAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_up_png')]),
            new eui.State('downAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_down_png')]),
            new eui.State('disabledAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_disabled_png')])
        ];
        _this.skinParts = ['thumb'];
        _this.minWidth = 20;
        _this.minHeight = 8;
        var a1 = new eui.Image();
        _this.thumb = a1;
        a1.source = 'roundthumb_png';
        a1.scale9Grid = new egret.Rectangle(3, 3, 2, 2);
        a1.height = 8;
        a1.width = 30;
        a1.verticalCenter = '0';
        _this.elementsContent = [a1];
        return _this;
    }
    return HScrollBarSkin;
}(eui.Skin);

generateEUI.paths['resource/eui_skins/HScrollBarSkin.exml'] = skins.HScrollBarSkin;
        skins.HSliderSkin = function (_super) {
    __extends(HSliderSkin, _super);
    function HSliderSkin() {
        var _this = _super.call(this) || this;
        _this.skinParts = [
            'labelDisplay',
            'iconDisplay'
        ];
        _this.minHeight = 50;
        _this.minWidth = 100;
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Label();
        _this.labelDisplay = a2;
        a2.top = 8;
        a2.bottom = 8;
        a2.left = 8;
        a2.right = 8;
        a2.size = 20;
        a2.textColor = 16777215;
        a2.verticalAlign = 'middle';
        a2.textAlign = 'center';
        var a3 = new eui.Image();
        _this.iconDisplay = a3;
        a3.horizontalCenter = '0';
        a3.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a3
        ];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'button_down_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'alpha', 0.5)])
        ];
        _this.skinParts = ['labelDisplay'];
        var a1 = new eui.Group();
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        var a2 = new eui.HorizontalLayout();
        a2.verticalAlign = 'middle';
        a1.layout = a2;
        var a3 = new eui.Image();
        _this.a3 = a3;
        a3.fillMode = 'scale';
        a3.alpha = 1;
        a3.source = 'checkbox_unselect_png';
        var a4 = new eui.Label();
        _this.labelDisplay = a4;
        a4.size = 20;
        a4.textColor = 7368816;
        a4.textAlign = 'center';
        a4.verticalAlign = 'middle';
        a4.fontFamily = 'Tahoma';
        a1.elementsContent = [
            a3,
            a4
        ];
        _this.elementsContent = [a1];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a3', 'alpha', 0.7)]),
            new eui.State('disabled', [new eui.SetProperty('a3', 'alpha', 0.5)]),
            new eui.State('upAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_up_png')]),
            new eui.State('downAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_down_png')]),
            new eui.State('disabledAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_disabled_png')])
        ];
        _this.skinParts = ['thumb'];
        _this.minWidth = 20;
        _this.minHeight = 8;
        var a1 = new eui.Image();
        _this.thumb = a1;
        a1.source = 'roundthumb_png';
        a1.scale9Grid = new egret.Rectangle(3, 3, 2, 2);
        a1.height = 8;
        a1.width = 30;
        a1.verticalCenter = '0';
        _this.elementsContent = [a1];
        _this.skinParts = [
            'track',
            'thumb'
        ];
        _this.minWidth = 20;
        _this.minHeight = 8;
        var a1 = new eui.Image();
        _this.track = a1;
        a1.source = 'track_sb_png';
        a1.scale9Grid = new egret.Rectangle(1, 1, 4, 4);
        a1.percentWidth = 100;
        a1.height = 6;
        a1.verticalCenter = '0';
        var a2 = new eui.Image();
        _this.thumb = a2;
        a2.source = 'thumb_png';
        a2.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2
        ];
        return _this;
    }
    return HSliderSkin;
}(eui.Skin);

generateEUI.paths['resource/eui_skins/HSliderSkin.exml'] = skins.HSliderSkin;
        skins.ItemRendererSkin = function (_super) {
    __extends(ItemRendererSkin, _super);
    function ItemRendererSkin() {
        var _this = _super.call(this) || this;
        _this.skinParts = [
            'labelDisplay',
            'iconDisplay'
        ];
        _this.minHeight = 50;
        _this.minWidth = 100;
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Label();
        _this.labelDisplay = a2;
        a2.top = 8;
        a2.bottom = 8;
        a2.left = 8;
        a2.right = 8;
        a2.size = 20;
        a2.textColor = 16777215;
        a2.verticalAlign = 'middle';
        a2.textAlign = 'center';
        var a3 = new eui.Image();
        _this.iconDisplay = a3;
        a3.horizontalCenter = '0';
        a3.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a3
        ];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'button_down_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'alpha', 0.5)])
        ];
        _this.skinParts = ['labelDisplay'];
        var a1 = new eui.Group();
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        var a2 = new eui.HorizontalLayout();
        a2.verticalAlign = 'middle';
        a1.layout = a2;
        var a3 = new eui.Image();
        _this.a3 = a3;
        a3.fillMode = 'scale';
        a3.alpha = 1;
        a3.source = 'checkbox_unselect_png';
        var a4 = new eui.Label();
        _this.labelDisplay = a4;
        a4.size = 20;
        a4.textColor = 7368816;
        a4.textAlign = 'center';
        a4.verticalAlign = 'middle';
        a4.fontFamily = 'Tahoma';
        a1.elementsContent = [
            a3,
            a4
        ];
        _this.elementsContent = [a1];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a3', 'alpha', 0.7)]),
            new eui.State('disabled', [new eui.SetProperty('a3', 'alpha', 0.5)]),
            new eui.State('upAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_up_png')]),
            new eui.State('downAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_down_png')]),
            new eui.State('disabledAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_disabled_png')])
        ];
        _this.skinParts = ['thumb'];
        _this.minWidth = 20;
        _this.minHeight = 8;
        var a1 = new eui.Image();
        _this.thumb = a1;
        a1.source = 'roundthumb_png';
        a1.scale9Grid = new egret.Rectangle(3, 3, 2, 2);
        a1.height = 8;
        a1.width = 30;
        a1.verticalCenter = '0';
        _this.elementsContent = [a1];
        _this.skinParts = [
            'track',
            'thumb'
        ];
        _this.minWidth = 20;
        _this.minHeight = 8;
        var a1 = new eui.Image();
        _this.track = a1;
        a1.source = 'track_sb_png';
        a1.scale9Grid = new egret.Rectangle(1, 1, 4, 4);
        a1.percentWidth = 100;
        a1.height = 6;
        a1.verticalCenter = '0';
        var a2 = new eui.Image();
        _this.thumb = a2;
        a2.source = 'thumb_png';
        a2.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.skinParts = ['labelDisplay'];
        _this.minHeight = 50;
        _this.minWidth = 100;
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Label();
        _this.labelDisplay = a2;
        a2.top = 8;
        a2.bottom = 8;
        a2.left = 8;
        a2.right = 8;
        a2.size = 20;
        a2.fontFamily = 'Tahoma';
        a2.textColor = 16777215;
        a2.text = '{data}';
        a2.verticalAlign = 'middle';
        a2.textAlign = 'center';
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'button_down_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'alpha', 0.5)])
        ];
        return _this;
    }
    return ItemRendererSkin;
}(eui.Skin);

generateEUI.paths['resource/eui_skins/ItemRendererSkin.exml'] = skins.ItemRendererSkin;
        skins.PanelSkin = function (_super) {
    __extends(PanelSkin, _super);
    function PanelSkin() {
        var _this = _super.call(this) || this;
        _this.skinParts = [
            'labelDisplay',
            'iconDisplay'
        ];
        _this.minHeight = 50;
        _this.minWidth = 100;
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Label();
        _this.labelDisplay = a2;
        a2.top = 8;
        a2.bottom = 8;
        a2.left = 8;
        a2.right = 8;
        a2.size = 20;
        a2.textColor = 16777215;
        a2.verticalAlign = 'middle';
        a2.textAlign = 'center';
        var a3 = new eui.Image();
        _this.iconDisplay = a3;
        a3.horizontalCenter = '0';
        a3.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a3
        ];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'button_down_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'alpha', 0.5)])
        ];
        _this.skinParts = ['labelDisplay'];
        var a1 = new eui.Group();
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        var a2 = new eui.HorizontalLayout();
        a2.verticalAlign = 'middle';
        a1.layout = a2;
        var a3 = new eui.Image();
        _this.a3 = a3;
        a3.fillMode = 'scale';
        a3.alpha = 1;
        a3.source = 'checkbox_unselect_png';
        var a4 = new eui.Label();
        _this.labelDisplay = a4;
        a4.size = 20;
        a4.textColor = 7368816;
        a4.textAlign = 'center';
        a4.verticalAlign = 'middle';
        a4.fontFamily = 'Tahoma';
        a1.elementsContent = [
            a3,
            a4
        ];
        _this.elementsContent = [a1];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a3', 'alpha', 0.7)]),
            new eui.State('disabled', [new eui.SetProperty('a3', 'alpha', 0.5)]),
            new eui.State('upAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_up_png')]),
            new eui.State('downAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_down_png')]),
            new eui.State('disabledAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_disabled_png')])
        ];
        _this.skinParts = ['thumb'];
        _this.minWidth = 20;
        _this.minHeight = 8;
        var a1 = new eui.Image();
        _this.thumb = a1;
        a1.source = 'roundthumb_png';
        a1.scale9Grid = new egret.Rectangle(3, 3, 2, 2);
        a1.height = 8;
        a1.width = 30;
        a1.verticalCenter = '0';
        _this.elementsContent = [a1];
        _this.skinParts = [
            'track',
            'thumb'
        ];
        _this.minWidth = 20;
        _this.minHeight = 8;
        var a1 = new eui.Image();
        _this.track = a1;
        a1.source = 'track_sb_png';
        a1.scale9Grid = new egret.Rectangle(1, 1, 4, 4);
        a1.percentWidth = 100;
        a1.height = 6;
        a1.verticalCenter = '0';
        var a2 = new eui.Image();
        _this.thumb = a2;
        a2.source = 'thumb_png';
        a2.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.skinParts = ['labelDisplay'];
        _this.minHeight = 50;
        _this.minWidth = 100;
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Label();
        _this.labelDisplay = a2;
        a2.top = 8;
        a2.bottom = 8;
        a2.left = 8;
        a2.right = 8;
        a2.size = 20;
        a2.fontFamily = 'Tahoma';
        a2.textColor = 16777215;
        a2.text = '{data}';
        a2.verticalAlign = 'middle';
        a2.textAlign = 'center';
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'button_down_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'alpha', 0.5)])
        ];
        _this.skinParts = [
            'moveArea',
            'titleDisplay',
            'closeButton'
        ];
        _this.minHeight = 230;
        _this.minWidth = 450;
        var a1 = new eui.Image();
        a1.left = 0;
        a1.right = 0;
        a1.bottom = 0;
        a1.top = 0;
        a1.source = 'border_png';
        a1.scale9Grid = new egret.Rectangle(2, 2, 12, 12);
        var a2 = new eui.Group();
        _this.moveArea = a2;
        a2.left = 0;
        a2.right = 0;
        a2.top = 0;
        a2.height = 45;
        var a3 = new eui.Image();
        a3.left = 0;
        a3.right = 0;
        a3.bottom = 0;
        a3.top = 0;
        a3.source = 'header_png';
        var a4 = new eui.Label();
        _this.titleDisplay = a4;
        a4.size = 20;
        a4.fontFamily = 'Tahoma';
        a4.textColor = 16777215;
        a4.wordWrap = false;
        a4.left = 15;
        a4.right = 5;
        a4.verticalCenter = '0';
        a2.elementsContent = [
            a3,
            a4
        ];
        var a5 = new eui.Button();
        _this.closeButton = a5;
        a5.label = 'close';
        a5.bottom = 5;
        a5.horizontalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a5
        ];
        return _this;
    }
    return PanelSkin;
}(eui.Skin);

generateEUI.paths['resource/eui_skins/PanelSkin.exml'] = skins.PanelSkin;
        skins.ProgressBarSkin = function (_super) {
    __extends(ProgressBarSkin, _super);
    function ProgressBarSkin() {
        var _this = _super.call(this) || this;
        _this.skinParts = [
            'labelDisplay',
            'iconDisplay'
        ];
        _this.minHeight = 50;
        _this.minWidth = 100;
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Label();
        _this.labelDisplay = a2;
        a2.top = 8;
        a2.bottom = 8;
        a2.left = 8;
        a2.right = 8;
        a2.size = 20;
        a2.textColor = 16777215;
        a2.verticalAlign = 'middle';
        a2.textAlign = 'center';
        var a3 = new eui.Image();
        _this.iconDisplay = a3;
        a3.horizontalCenter = '0';
        a3.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a3
        ];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'button_down_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'alpha', 0.5)])
        ];
        _this.skinParts = ['labelDisplay'];
        var a1 = new eui.Group();
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        var a2 = new eui.HorizontalLayout();
        a2.verticalAlign = 'middle';
        a1.layout = a2;
        var a3 = new eui.Image();
        _this.a3 = a3;
        a3.fillMode = 'scale';
        a3.alpha = 1;
        a3.source = 'checkbox_unselect_png';
        var a4 = new eui.Label();
        _this.labelDisplay = a4;
        a4.size = 20;
        a4.textColor = 7368816;
        a4.textAlign = 'center';
        a4.verticalAlign = 'middle';
        a4.fontFamily = 'Tahoma';
        a1.elementsContent = [
            a3,
            a4
        ];
        _this.elementsContent = [a1];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a3', 'alpha', 0.7)]),
            new eui.State('disabled', [new eui.SetProperty('a3', 'alpha', 0.5)]),
            new eui.State('upAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_up_png')]),
            new eui.State('downAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_down_png')]),
            new eui.State('disabledAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_disabled_png')])
        ];
        _this.skinParts = ['thumb'];
        _this.minWidth = 20;
        _this.minHeight = 8;
        var a1 = new eui.Image();
        _this.thumb = a1;
        a1.source = 'roundthumb_png';
        a1.scale9Grid = new egret.Rectangle(3, 3, 2, 2);
        a1.height = 8;
        a1.width = 30;
        a1.verticalCenter = '0';
        _this.elementsContent = [a1];
        _this.skinParts = [
            'track',
            'thumb'
        ];
        _this.minWidth = 20;
        _this.minHeight = 8;
        var a1 = new eui.Image();
        _this.track = a1;
        a1.source = 'track_sb_png';
        a1.scale9Grid = new egret.Rectangle(1, 1, 4, 4);
        a1.percentWidth = 100;
        a1.height = 6;
        a1.verticalCenter = '0';
        var a2 = new eui.Image();
        _this.thumb = a2;
        a2.source = 'thumb_png';
        a2.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.skinParts = ['labelDisplay'];
        _this.minHeight = 50;
        _this.minWidth = 100;
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Label();
        _this.labelDisplay = a2;
        a2.top = 8;
        a2.bottom = 8;
        a2.left = 8;
        a2.right = 8;
        a2.size = 20;
        a2.fontFamily = 'Tahoma';
        a2.textColor = 16777215;
        a2.text = '{data}';
        a2.verticalAlign = 'middle';
        a2.textAlign = 'center';
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'button_down_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'alpha', 0.5)])
        ];
        _this.skinParts = [
            'moveArea',
            'titleDisplay',
            'closeButton'
        ];
        _this.minHeight = 230;
        _this.minWidth = 450;
        var a1 = new eui.Image();
        a1.left = 0;
        a1.right = 0;
        a1.bottom = 0;
        a1.top = 0;
        a1.source = 'border_png';
        a1.scale9Grid = new egret.Rectangle(2, 2, 12, 12);
        var a2 = new eui.Group();
        _this.moveArea = a2;
        a2.left = 0;
        a2.right = 0;
        a2.top = 0;
        a2.height = 45;
        var a3 = new eui.Image();
        a3.left = 0;
        a3.right = 0;
        a3.bottom = 0;
        a3.top = 0;
        a3.source = 'header_png';
        var a4 = new eui.Label();
        _this.titleDisplay = a4;
        a4.size = 20;
        a4.fontFamily = 'Tahoma';
        a4.textColor = 16777215;
        a4.wordWrap = false;
        a4.left = 15;
        a4.right = 5;
        a4.verticalCenter = '0';
        a2.elementsContent = [
            a3,
            a4
        ];
        var a5 = new eui.Button();
        _this.closeButton = a5;
        a5.label = 'close';
        a5.bottom = 5;
        a5.horizontalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a5
        ];
        _this.skinParts = [
            'thumb',
            'labelDisplay'
        ];
        _this.minWidth = 30;
        _this.minHeight = 18;
        var a1 = new eui.Image();
        a1.source = 'track_pb_png';
        a1.scale9Grid = new egret.Rectangle(1, 1, 4, 4);
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.verticalCenter = '0';
        var a2 = new eui.Image();
        _this.thumb = a2;
        a2.percentHeight = 100;
        a2.percentWidth = 100;
        a2.source = 'thumb_pb_png';
        var a3 = new eui.Label();
        _this.labelDisplay = a3;
        a3.textAlign = 'center';
        a3.verticalAlign = 'middle';
        a3.size = 15;
        a3.fontFamily = 'Tahoma';
        a3.textColor = 7368816;
        a3.horizontalCenter = '0';
        a3.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a3
        ];
        return _this;
    }
    return ProgressBarSkin;
}(eui.Skin);

generateEUI.paths['resource/eui_skins/ProgressBarSkin.exml'] = skins.ProgressBarSkin;
        skins.RadioButtonSkin = function (_super) {
    __extends(RadioButtonSkin, _super);
    function RadioButtonSkin() {
        var _this = _super.call(this) || this;
        _this.skinParts = [
            'labelDisplay',
            'iconDisplay'
        ];
        _this.minHeight = 50;
        _this.minWidth = 100;
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Label();
        _this.labelDisplay = a2;
        a2.top = 8;
        a2.bottom = 8;
        a2.left = 8;
        a2.right = 8;
        a2.size = 20;
        a2.textColor = 16777215;
        a2.verticalAlign = 'middle';
        a2.textAlign = 'center';
        var a3 = new eui.Image();
        _this.iconDisplay = a3;
        a3.horizontalCenter = '0';
        a3.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a3
        ];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'button_down_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'alpha', 0.5)])
        ];
        _this.skinParts = ['labelDisplay'];
        var a1 = new eui.Group();
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        var a2 = new eui.HorizontalLayout();
        a2.verticalAlign = 'middle';
        a1.layout = a2;
        var a3 = new eui.Image();
        _this.a3 = a3;
        a3.fillMode = 'scale';
        a3.alpha = 1;
        a3.source = 'checkbox_unselect_png';
        var a4 = new eui.Label();
        _this.labelDisplay = a4;
        a4.size = 20;
        a4.textColor = 7368816;
        a4.textAlign = 'center';
        a4.verticalAlign = 'middle';
        a4.fontFamily = 'Tahoma';
        a1.elementsContent = [
            a3,
            a4
        ];
        _this.elementsContent = [a1];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a3', 'alpha', 0.7)]),
            new eui.State('disabled', [new eui.SetProperty('a3', 'alpha', 0.5)]),
            new eui.State('upAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_up_png')]),
            new eui.State('downAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_down_png')]),
            new eui.State('disabledAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_disabled_png')])
        ];
        _this.skinParts = ['thumb'];
        _this.minWidth = 20;
        _this.minHeight = 8;
        var a1 = new eui.Image();
        _this.thumb = a1;
        a1.source = 'roundthumb_png';
        a1.scale9Grid = new egret.Rectangle(3, 3, 2, 2);
        a1.height = 8;
        a1.width = 30;
        a1.verticalCenter = '0';
        _this.elementsContent = [a1];
        _this.skinParts = [
            'track',
            'thumb'
        ];
        _this.minWidth = 20;
        _this.minHeight = 8;
        var a1 = new eui.Image();
        _this.track = a1;
        a1.source = 'track_sb_png';
        a1.scale9Grid = new egret.Rectangle(1, 1, 4, 4);
        a1.percentWidth = 100;
        a1.height = 6;
        a1.verticalCenter = '0';
        var a2 = new eui.Image();
        _this.thumb = a2;
        a2.source = 'thumb_png';
        a2.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.skinParts = ['labelDisplay'];
        _this.minHeight = 50;
        _this.minWidth = 100;
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Label();
        _this.labelDisplay = a2;
        a2.top = 8;
        a2.bottom = 8;
        a2.left = 8;
        a2.right = 8;
        a2.size = 20;
        a2.fontFamily = 'Tahoma';
        a2.textColor = 16777215;
        a2.text = '{data}';
        a2.verticalAlign = 'middle';
        a2.textAlign = 'center';
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'button_down_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'alpha', 0.5)])
        ];
        _this.skinParts = [
            'moveArea',
            'titleDisplay',
            'closeButton'
        ];
        _this.minHeight = 230;
        _this.minWidth = 450;
        var a1 = new eui.Image();
        a1.left = 0;
        a1.right = 0;
        a1.bottom = 0;
        a1.top = 0;
        a1.source = 'border_png';
        a1.scale9Grid = new egret.Rectangle(2, 2, 12, 12);
        var a2 = new eui.Group();
        _this.moveArea = a2;
        a2.left = 0;
        a2.right = 0;
        a2.top = 0;
        a2.height = 45;
        var a3 = new eui.Image();
        a3.left = 0;
        a3.right = 0;
        a3.bottom = 0;
        a3.top = 0;
        a3.source = 'header_png';
        var a4 = new eui.Label();
        _this.titleDisplay = a4;
        a4.size = 20;
        a4.fontFamily = 'Tahoma';
        a4.textColor = 16777215;
        a4.wordWrap = false;
        a4.left = 15;
        a4.right = 5;
        a4.verticalCenter = '0';
        a2.elementsContent = [
            a3,
            a4
        ];
        var a5 = new eui.Button();
        _this.closeButton = a5;
        a5.label = 'close';
        a5.bottom = 5;
        a5.horizontalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a5
        ];
        _this.skinParts = [
            'thumb',
            'labelDisplay'
        ];
        _this.minWidth = 30;
        _this.minHeight = 18;
        var a1 = new eui.Image();
        a1.source = 'track_pb_png';
        a1.scale9Grid = new egret.Rectangle(1, 1, 4, 4);
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.verticalCenter = '0';
        var a2 = new eui.Image();
        _this.thumb = a2;
        a2.percentHeight = 100;
        a2.percentWidth = 100;
        a2.source = 'thumb_pb_png';
        var a3 = new eui.Label();
        _this.labelDisplay = a3;
        a3.textAlign = 'center';
        a3.verticalAlign = 'middle';
        a3.size = 15;
        a3.fontFamily = 'Tahoma';
        a3.textColor = 7368816;
        a3.horizontalCenter = '0';
        a3.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a3
        ];
        _this.skinParts = ['labelDisplay'];
        var a1 = new eui.Group();
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        var a2 = new eui.HorizontalLayout();
        a2.verticalAlign = 'middle';
        a1.layout = a2;
        var a3 = new eui.Image();
        _this.a3 = a3;
        a3.fillMode = 'scale';
        a3.alpha = 1;
        a3.source = 'radiobutton_unselect_png';
        var a4 = new eui.Label();
        _this.labelDisplay = a4;
        a4.size = 20;
        a4.textColor = 7368816;
        a4.textAlign = 'center';
        a4.verticalAlign = 'middle';
        a4.fontFamily = 'Tahoma';
        a1.elementsContent = [
            a3,
            a4
        ];
        _this.elementsContent = [a1];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a3', 'alpha', 0.7)]),
            new eui.State('disabled', [new eui.SetProperty('a3', 'alpha', 0.5)]),
            new eui.State('upAndSelected', [new eui.SetProperty('a3', 'source', 'radiobutton_select_up_png')]),
            new eui.State('downAndSelected', [new eui.SetProperty('a3', 'source', 'radiobutton_select_down_png')]),
            new eui.State('disabledAndSelected', [new eui.SetProperty('a3', 'source', 'radiobutton_select_disabled_png')])
        ];
        return _this;
    }
    return RadioButtonSkin;
}(eui.Skin);

generateEUI.paths['resource/eui_skins/RadioButtonSkin.exml'] = skins.RadioButtonSkin;
        skins.ScrollerSkin = function (_super) {
    __extends(ScrollerSkin, _super);
    function ScrollerSkin() {
        var _this = _super.call(this) || this;
        _this.skinParts = [
            'labelDisplay',
            'iconDisplay'
        ];
        _this.minHeight = 50;
        _this.minWidth = 100;
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Label();
        _this.labelDisplay = a2;
        a2.top = 8;
        a2.bottom = 8;
        a2.left = 8;
        a2.right = 8;
        a2.size = 20;
        a2.textColor = 16777215;
        a2.verticalAlign = 'middle';
        a2.textAlign = 'center';
        var a3 = new eui.Image();
        _this.iconDisplay = a3;
        a3.horizontalCenter = '0';
        a3.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a3
        ];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'button_down_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'alpha', 0.5)])
        ];
        _this.skinParts = ['labelDisplay'];
        var a1 = new eui.Group();
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        var a2 = new eui.HorizontalLayout();
        a2.verticalAlign = 'middle';
        a1.layout = a2;
        var a3 = new eui.Image();
        _this.a3 = a3;
        a3.fillMode = 'scale';
        a3.alpha = 1;
        a3.source = 'checkbox_unselect_png';
        var a4 = new eui.Label();
        _this.labelDisplay = a4;
        a4.size = 20;
        a4.textColor = 7368816;
        a4.textAlign = 'center';
        a4.verticalAlign = 'middle';
        a4.fontFamily = 'Tahoma';
        a1.elementsContent = [
            a3,
            a4
        ];
        _this.elementsContent = [a1];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a3', 'alpha', 0.7)]),
            new eui.State('disabled', [new eui.SetProperty('a3', 'alpha', 0.5)]),
            new eui.State('upAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_up_png')]),
            new eui.State('downAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_down_png')]),
            new eui.State('disabledAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_disabled_png')])
        ];
        _this.skinParts = ['thumb'];
        _this.minWidth = 20;
        _this.minHeight = 8;
        var a1 = new eui.Image();
        _this.thumb = a1;
        a1.source = 'roundthumb_png';
        a1.scale9Grid = new egret.Rectangle(3, 3, 2, 2);
        a1.height = 8;
        a1.width = 30;
        a1.verticalCenter = '0';
        _this.elementsContent = [a1];
        _this.skinParts = [
            'track',
            'thumb'
        ];
        _this.minWidth = 20;
        _this.minHeight = 8;
        var a1 = new eui.Image();
        _this.track = a1;
        a1.source = 'track_sb_png';
        a1.scale9Grid = new egret.Rectangle(1, 1, 4, 4);
        a1.percentWidth = 100;
        a1.height = 6;
        a1.verticalCenter = '0';
        var a2 = new eui.Image();
        _this.thumb = a2;
        a2.source = 'thumb_png';
        a2.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.skinParts = ['labelDisplay'];
        _this.minHeight = 50;
        _this.minWidth = 100;
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Label();
        _this.labelDisplay = a2;
        a2.top = 8;
        a2.bottom = 8;
        a2.left = 8;
        a2.right = 8;
        a2.size = 20;
        a2.fontFamily = 'Tahoma';
        a2.textColor = 16777215;
        a2.text = '{data}';
        a2.verticalAlign = 'middle';
        a2.textAlign = 'center';
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'button_down_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'alpha', 0.5)])
        ];
        _this.skinParts = [
            'moveArea',
            'titleDisplay',
            'closeButton'
        ];
        _this.minHeight = 230;
        _this.minWidth = 450;
        var a1 = new eui.Image();
        a1.left = 0;
        a1.right = 0;
        a1.bottom = 0;
        a1.top = 0;
        a1.source = 'border_png';
        a1.scale9Grid = new egret.Rectangle(2, 2, 12, 12);
        var a2 = new eui.Group();
        _this.moveArea = a2;
        a2.left = 0;
        a2.right = 0;
        a2.top = 0;
        a2.height = 45;
        var a3 = new eui.Image();
        a3.left = 0;
        a3.right = 0;
        a3.bottom = 0;
        a3.top = 0;
        a3.source = 'header_png';
        var a4 = new eui.Label();
        _this.titleDisplay = a4;
        a4.size = 20;
        a4.fontFamily = 'Tahoma';
        a4.textColor = 16777215;
        a4.wordWrap = false;
        a4.left = 15;
        a4.right = 5;
        a4.verticalCenter = '0';
        a2.elementsContent = [
            a3,
            a4
        ];
        var a5 = new eui.Button();
        _this.closeButton = a5;
        a5.label = 'close';
        a5.bottom = 5;
        a5.horizontalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a5
        ];
        _this.skinParts = [
            'thumb',
            'labelDisplay'
        ];
        _this.minWidth = 30;
        _this.minHeight = 18;
        var a1 = new eui.Image();
        a1.source = 'track_pb_png';
        a1.scale9Grid = new egret.Rectangle(1, 1, 4, 4);
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.verticalCenter = '0';
        var a2 = new eui.Image();
        _this.thumb = a2;
        a2.percentHeight = 100;
        a2.percentWidth = 100;
        a2.source = 'thumb_pb_png';
        var a3 = new eui.Label();
        _this.labelDisplay = a3;
        a3.textAlign = 'center';
        a3.verticalAlign = 'middle';
        a3.size = 15;
        a3.fontFamily = 'Tahoma';
        a3.textColor = 7368816;
        a3.horizontalCenter = '0';
        a3.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a3
        ];
        _this.skinParts = ['labelDisplay'];
        var a1 = new eui.Group();
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        var a2 = new eui.HorizontalLayout();
        a2.verticalAlign = 'middle';
        a1.layout = a2;
        var a3 = new eui.Image();
        _this.a3 = a3;
        a3.fillMode = 'scale';
        a3.alpha = 1;
        a3.source = 'radiobutton_unselect_png';
        var a4 = new eui.Label();
        _this.labelDisplay = a4;
        a4.size = 20;
        a4.textColor = 7368816;
        a4.textAlign = 'center';
        a4.verticalAlign = 'middle';
        a4.fontFamily = 'Tahoma';
        a1.elementsContent = [
            a3,
            a4
        ];
        _this.elementsContent = [a1];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a3', 'alpha', 0.7)]),
            new eui.State('disabled', [new eui.SetProperty('a3', 'alpha', 0.5)]),
            new eui.State('upAndSelected', [new eui.SetProperty('a3', 'source', 'radiobutton_select_up_png')]),
            new eui.State('downAndSelected', [new eui.SetProperty('a3', 'source', 'radiobutton_select_down_png')]),
            new eui.State('disabledAndSelected', [new eui.SetProperty('a3', 'source', 'radiobutton_select_disabled_png')])
        ];
        _this.skinParts = [
            'horizontalScrollBar',
            'verticalScrollBar'
        ];
        _this.minWidth = 20;
        _this.minHeight = 20;
        var a1 = new eui.HScrollBar();
        _this.horizontalScrollBar = a1;
        a1.percentWidth = 100;
        a1.bottom = 0;
        var a2 = new eui.VScrollBar();
        _this.verticalScrollBar = a2;
        a2.percentHeight = 100;
        a2.right = 0;
        _this.elementsContent = [
            a1,
            a2
        ];
        return _this;
    }
    return ScrollerSkin;
}(eui.Skin);

generateEUI.paths['resource/eui_skins/ScrollerSkin.exml'] = skins.ScrollerSkin;
        skins.TextInputSkin = function (_super) {
    __extends(TextInputSkin, _super);
    function TextInputSkin() {
        var _this = _super.call(this) || this;
        _this.skinParts = [
            'labelDisplay',
            'iconDisplay'
        ];
        _this.minHeight = 50;
        _this.minWidth = 100;
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Label();
        _this.labelDisplay = a2;
        a2.top = 8;
        a2.bottom = 8;
        a2.left = 8;
        a2.right = 8;
        a2.size = 20;
        a2.textColor = 16777215;
        a2.verticalAlign = 'middle';
        a2.textAlign = 'center';
        var a3 = new eui.Image();
        _this.iconDisplay = a3;
        a3.horizontalCenter = '0';
        a3.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a3
        ];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'button_down_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'alpha', 0.5)])
        ];
        _this.skinParts = ['labelDisplay'];
        var a1 = new eui.Group();
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        var a2 = new eui.HorizontalLayout();
        a2.verticalAlign = 'middle';
        a1.layout = a2;
        var a3 = new eui.Image();
        _this.a3 = a3;
        a3.fillMode = 'scale';
        a3.alpha = 1;
        a3.source = 'checkbox_unselect_png';
        var a4 = new eui.Label();
        _this.labelDisplay = a4;
        a4.size = 20;
        a4.textColor = 7368816;
        a4.textAlign = 'center';
        a4.verticalAlign = 'middle';
        a4.fontFamily = 'Tahoma';
        a1.elementsContent = [
            a3,
            a4
        ];
        _this.elementsContent = [a1];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a3', 'alpha', 0.7)]),
            new eui.State('disabled', [new eui.SetProperty('a3', 'alpha', 0.5)]),
            new eui.State('upAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_up_png')]),
            new eui.State('downAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_down_png')]),
            new eui.State('disabledAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_disabled_png')])
        ];
        _this.skinParts = ['thumb'];
        _this.minWidth = 20;
        _this.minHeight = 8;
        var a1 = new eui.Image();
        _this.thumb = a1;
        a1.source = 'roundthumb_png';
        a1.scale9Grid = new egret.Rectangle(3, 3, 2, 2);
        a1.height = 8;
        a1.width = 30;
        a1.verticalCenter = '0';
        _this.elementsContent = [a1];
        _this.skinParts = [
            'track',
            'thumb'
        ];
        _this.minWidth = 20;
        _this.minHeight = 8;
        var a1 = new eui.Image();
        _this.track = a1;
        a1.source = 'track_sb_png';
        a1.scale9Grid = new egret.Rectangle(1, 1, 4, 4);
        a1.percentWidth = 100;
        a1.height = 6;
        a1.verticalCenter = '0';
        var a2 = new eui.Image();
        _this.thumb = a2;
        a2.source = 'thumb_png';
        a2.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.skinParts = ['labelDisplay'];
        _this.minHeight = 50;
        _this.minWidth = 100;
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Label();
        _this.labelDisplay = a2;
        a2.top = 8;
        a2.bottom = 8;
        a2.left = 8;
        a2.right = 8;
        a2.size = 20;
        a2.fontFamily = 'Tahoma';
        a2.textColor = 16777215;
        a2.text = '{data}';
        a2.verticalAlign = 'middle';
        a2.textAlign = 'center';
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'button_down_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'alpha', 0.5)])
        ];
        _this.skinParts = [
            'moveArea',
            'titleDisplay',
            'closeButton'
        ];
        _this.minHeight = 230;
        _this.minWidth = 450;
        var a1 = new eui.Image();
        a1.left = 0;
        a1.right = 0;
        a1.bottom = 0;
        a1.top = 0;
        a1.source = 'border_png';
        a1.scale9Grid = new egret.Rectangle(2, 2, 12, 12);
        var a2 = new eui.Group();
        _this.moveArea = a2;
        a2.left = 0;
        a2.right = 0;
        a2.top = 0;
        a2.height = 45;
        var a3 = new eui.Image();
        a3.left = 0;
        a3.right = 0;
        a3.bottom = 0;
        a3.top = 0;
        a3.source = 'header_png';
        var a4 = new eui.Label();
        _this.titleDisplay = a4;
        a4.size = 20;
        a4.fontFamily = 'Tahoma';
        a4.textColor = 16777215;
        a4.wordWrap = false;
        a4.left = 15;
        a4.right = 5;
        a4.verticalCenter = '0';
        a2.elementsContent = [
            a3,
            a4
        ];
        var a5 = new eui.Button();
        _this.closeButton = a5;
        a5.label = 'close';
        a5.bottom = 5;
        a5.horizontalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a5
        ];
        _this.skinParts = [
            'thumb',
            'labelDisplay'
        ];
        _this.minWidth = 30;
        _this.minHeight = 18;
        var a1 = new eui.Image();
        a1.source = 'track_pb_png';
        a1.scale9Grid = new egret.Rectangle(1, 1, 4, 4);
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.verticalCenter = '0';
        var a2 = new eui.Image();
        _this.thumb = a2;
        a2.percentHeight = 100;
        a2.percentWidth = 100;
        a2.source = 'thumb_pb_png';
        var a3 = new eui.Label();
        _this.labelDisplay = a3;
        a3.textAlign = 'center';
        a3.verticalAlign = 'middle';
        a3.size = 15;
        a3.fontFamily = 'Tahoma';
        a3.textColor = 7368816;
        a3.horizontalCenter = '0';
        a3.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a3
        ];
        _this.skinParts = ['labelDisplay'];
        var a1 = new eui.Group();
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        var a2 = new eui.HorizontalLayout();
        a2.verticalAlign = 'middle';
        a1.layout = a2;
        var a3 = new eui.Image();
        _this.a3 = a3;
        a3.fillMode = 'scale';
        a3.alpha = 1;
        a3.source = 'radiobutton_unselect_png';
        var a4 = new eui.Label();
        _this.labelDisplay = a4;
        a4.size = 20;
        a4.textColor = 7368816;
        a4.textAlign = 'center';
        a4.verticalAlign = 'middle';
        a4.fontFamily = 'Tahoma';
        a1.elementsContent = [
            a3,
            a4
        ];
        _this.elementsContent = [a1];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a3', 'alpha', 0.7)]),
            new eui.State('disabled', [new eui.SetProperty('a3', 'alpha', 0.5)]),
            new eui.State('upAndSelected', [new eui.SetProperty('a3', 'source', 'radiobutton_select_up_png')]),
            new eui.State('downAndSelected', [new eui.SetProperty('a3', 'source', 'radiobutton_select_down_png')]),
            new eui.State('disabledAndSelected', [new eui.SetProperty('a3', 'source', 'radiobutton_select_disabled_png')])
        ];
        _this.skinParts = [
            'horizontalScrollBar',
            'verticalScrollBar'
        ];
        _this.minWidth = 20;
        _this.minHeight = 20;
        var a1 = new eui.HScrollBar();
        _this.horizontalScrollBar = a1;
        a1.percentWidth = 100;
        a1.bottom = 0;
        var a2 = new eui.VScrollBar();
        _this.verticalScrollBar = a2;
        a2.percentHeight = 100;
        a2.right = 0;
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.skinParts = [
            'textDisplay',
            'promptDisplay'
        ];
        _this.minHeight = 40;
        _this.minWidth = 300;
        var a1 = new eui.Image();
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Rect();
        a2.percentHeight = 100;
        a2.percentWidth = 100;
        a2.fillColor = 16777215;
        var a3 = new eui.EditableText();
        _this.textDisplay = a3;
        _this.a3 = a3;
        a3.verticalCenter = '0';
        a3.left = 10;
        a3.right = 10;
        a3.textColor = 0;
        a3.percentWidth = 100;
        a3.height = 24;
        a3.size = 20;
        var a4 = new eui.Label();
        _this.promptDisplay = a4;
        _this.a4 = a4;
        a4.verticalCenter = '0';
        a4.left = 10;
        a4.right = 10;
        a4.textColor = 11119017;
        a4.percentWidth = 100;
        a4.height = 24;
        a4.size = 20;
        a4.touchEnabled = false;
        _this.elementsContent = [
            a1,
            a2,
            a3,
            a4
        ];
        _this.states = [
            new eui.State('normal', []),
            new eui.State('disabled', [new eui.SetProperty('a3', 'textColor', 16711680)]),
            new eui.State('normalWithPrompt', [new eui.AddItems('a4', '', 1, '')]),
            new eui.State('disabledWithPrompt', [new eui.AddItems('a4', '', 1, '')])
        ];
        return _this;
    }
    return TextInputSkin;
}(eui.Skin);

generateEUI.paths['resource/eui_skins/TextInputSkin.exml'] = skins.TextInputSkin;
        skins.ToggleSwitchSkin = function (_super) {
    __extends(ToggleSwitchSkin, _super);
    function ToggleSwitchSkin() {
        var _this = _super.call(this) || this;
        _this.skinParts = [
            'labelDisplay',
            'iconDisplay'
        ];
        _this.minHeight = 50;
        _this.minWidth = 100;
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Label();
        _this.labelDisplay = a2;
        a2.top = 8;
        a2.bottom = 8;
        a2.left = 8;
        a2.right = 8;
        a2.size = 20;
        a2.textColor = 16777215;
        a2.verticalAlign = 'middle';
        a2.textAlign = 'center';
        var a3 = new eui.Image();
        _this.iconDisplay = a3;
        a3.horizontalCenter = '0';
        a3.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a3
        ];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'button_down_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'alpha', 0.5)])
        ];
        _this.skinParts = ['labelDisplay'];
        var a1 = new eui.Group();
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        var a2 = new eui.HorizontalLayout();
        a2.verticalAlign = 'middle';
        a1.layout = a2;
        var a3 = new eui.Image();
        _this.a3 = a3;
        a3.fillMode = 'scale';
        a3.alpha = 1;
        a3.source = 'checkbox_unselect_png';
        var a4 = new eui.Label();
        _this.labelDisplay = a4;
        a4.size = 20;
        a4.textColor = 7368816;
        a4.textAlign = 'center';
        a4.verticalAlign = 'middle';
        a4.fontFamily = 'Tahoma';
        a1.elementsContent = [
            a3,
            a4
        ];
        _this.elementsContent = [a1];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a3', 'alpha', 0.7)]),
            new eui.State('disabled', [new eui.SetProperty('a3', 'alpha', 0.5)]),
            new eui.State('upAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_up_png')]),
            new eui.State('downAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_down_png')]),
            new eui.State('disabledAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_disabled_png')])
        ];
        _this.skinParts = ['thumb'];
        _this.minWidth = 20;
        _this.minHeight = 8;
        var a1 = new eui.Image();
        _this.thumb = a1;
        a1.source = 'roundthumb_png';
        a1.scale9Grid = new egret.Rectangle(3, 3, 2, 2);
        a1.height = 8;
        a1.width = 30;
        a1.verticalCenter = '0';
        _this.elementsContent = [a1];
        _this.skinParts = [
            'track',
            'thumb'
        ];
        _this.minWidth = 20;
        _this.minHeight = 8;
        var a1 = new eui.Image();
        _this.track = a1;
        a1.source = 'track_sb_png';
        a1.scale9Grid = new egret.Rectangle(1, 1, 4, 4);
        a1.percentWidth = 100;
        a1.height = 6;
        a1.verticalCenter = '0';
        var a2 = new eui.Image();
        _this.thumb = a2;
        a2.source = 'thumb_png';
        a2.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.skinParts = ['labelDisplay'];
        _this.minHeight = 50;
        _this.minWidth = 100;
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Label();
        _this.labelDisplay = a2;
        a2.top = 8;
        a2.bottom = 8;
        a2.left = 8;
        a2.right = 8;
        a2.size = 20;
        a2.fontFamily = 'Tahoma';
        a2.textColor = 16777215;
        a2.text = '{data}';
        a2.verticalAlign = 'middle';
        a2.textAlign = 'center';
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'button_down_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'alpha', 0.5)])
        ];
        _this.skinParts = [
            'moveArea',
            'titleDisplay',
            'closeButton'
        ];
        _this.minHeight = 230;
        _this.minWidth = 450;
        var a1 = new eui.Image();
        a1.left = 0;
        a1.right = 0;
        a1.bottom = 0;
        a1.top = 0;
        a1.source = 'border_png';
        a1.scale9Grid = new egret.Rectangle(2, 2, 12, 12);
        var a2 = new eui.Group();
        _this.moveArea = a2;
        a2.left = 0;
        a2.right = 0;
        a2.top = 0;
        a2.height = 45;
        var a3 = new eui.Image();
        a3.left = 0;
        a3.right = 0;
        a3.bottom = 0;
        a3.top = 0;
        a3.source = 'header_png';
        var a4 = new eui.Label();
        _this.titleDisplay = a4;
        a4.size = 20;
        a4.fontFamily = 'Tahoma';
        a4.textColor = 16777215;
        a4.wordWrap = false;
        a4.left = 15;
        a4.right = 5;
        a4.verticalCenter = '0';
        a2.elementsContent = [
            a3,
            a4
        ];
        var a5 = new eui.Button();
        _this.closeButton = a5;
        a5.label = 'close';
        a5.bottom = 5;
        a5.horizontalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a5
        ];
        _this.skinParts = [
            'thumb',
            'labelDisplay'
        ];
        _this.minWidth = 30;
        _this.minHeight = 18;
        var a1 = new eui.Image();
        a1.source = 'track_pb_png';
        a1.scale9Grid = new egret.Rectangle(1, 1, 4, 4);
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.verticalCenter = '0';
        var a2 = new eui.Image();
        _this.thumb = a2;
        a2.percentHeight = 100;
        a2.percentWidth = 100;
        a2.source = 'thumb_pb_png';
        var a3 = new eui.Label();
        _this.labelDisplay = a3;
        a3.textAlign = 'center';
        a3.verticalAlign = 'middle';
        a3.size = 15;
        a3.fontFamily = 'Tahoma';
        a3.textColor = 7368816;
        a3.horizontalCenter = '0';
        a3.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a3
        ];
        _this.skinParts = ['labelDisplay'];
        var a1 = new eui.Group();
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        var a2 = new eui.HorizontalLayout();
        a2.verticalAlign = 'middle';
        a1.layout = a2;
        var a3 = new eui.Image();
        _this.a3 = a3;
        a3.fillMode = 'scale';
        a3.alpha = 1;
        a3.source = 'radiobutton_unselect_png';
        var a4 = new eui.Label();
        _this.labelDisplay = a4;
        a4.size = 20;
        a4.textColor = 7368816;
        a4.textAlign = 'center';
        a4.verticalAlign = 'middle';
        a4.fontFamily = 'Tahoma';
        a1.elementsContent = [
            a3,
            a4
        ];
        _this.elementsContent = [a1];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a3', 'alpha', 0.7)]),
            new eui.State('disabled', [new eui.SetProperty('a3', 'alpha', 0.5)]),
            new eui.State('upAndSelected', [new eui.SetProperty('a3', 'source', 'radiobutton_select_up_png')]),
            new eui.State('downAndSelected', [new eui.SetProperty('a3', 'source', 'radiobutton_select_down_png')]),
            new eui.State('disabledAndSelected', [new eui.SetProperty('a3', 'source', 'radiobutton_select_disabled_png')])
        ];
        _this.skinParts = [
            'horizontalScrollBar',
            'verticalScrollBar'
        ];
        _this.minWidth = 20;
        _this.minHeight = 20;
        var a1 = new eui.HScrollBar();
        _this.horizontalScrollBar = a1;
        a1.percentWidth = 100;
        a1.bottom = 0;
        var a2 = new eui.VScrollBar();
        _this.verticalScrollBar = a2;
        a2.percentHeight = 100;
        a2.right = 0;
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.skinParts = [
            'textDisplay',
            'promptDisplay'
        ];
        _this.minHeight = 40;
        _this.minWidth = 300;
        var a1 = new eui.Image();
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Rect();
        a2.percentHeight = 100;
        a2.percentWidth = 100;
        a2.fillColor = 16777215;
        var a3 = new eui.EditableText();
        _this.textDisplay = a3;
        _this.a3 = a3;
        a3.verticalCenter = '0';
        a3.left = 10;
        a3.right = 10;
        a3.textColor = 0;
        a3.percentWidth = 100;
        a3.height = 24;
        a3.size = 20;
        var a4 = new eui.Label();
        _this.promptDisplay = a4;
        _this.a4 = a4;
        a4.verticalCenter = '0';
        a4.left = 10;
        a4.right = 10;
        a4.textColor = 11119017;
        a4.percentWidth = 100;
        a4.height = 24;
        a4.size = 20;
        a4.touchEnabled = false;
        _this.elementsContent = [
            a1,
            a2,
            a3,
            a4
        ];
        _this.states = [
            new eui.State('normal', []),
            new eui.State('disabled', [new eui.SetProperty('a3', 'textColor', 16711680)]),
            new eui.State('normalWithPrompt', [new eui.AddItems('a4', '', 1, '')]),
            new eui.State('disabledWithPrompt', [new eui.AddItems('a4', '', 1, '')])
        ];
        _this.skinParts = [];
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.source = 'on_png';
        var a2 = new eui.Image();
        _this.a2 = a2;
        a2.source = 'handle_png';
        a2.horizontalCenter = '-18';
        a2.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.states = [
            new eui.State('up', [new eui.SetProperty('a1', 'source', 'off_png')]),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'off_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'source', 'off_png')]),
            new eui.State('upAndSelected', [new eui.SetProperty('a2', 'horizontalCenter', '18')]),
            new eui.State('downAndSelected', [new eui.SetProperty('a2', 'horizontalCenter', '18')]),
            new eui.State('disabledAndSelected', [new eui.SetProperty('a2', 'horizontalCenter', '18')])
        ];
        return _this;
    }
    return ToggleSwitchSkin;
}(eui.Skin);

generateEUI.paths['resource/eui_skins/ToggleSwitchSkin.exml'] = skins.ToggleSwitchSkin;
        skins.VScrollBarSkin = function (_super) {
    __extends(VScrollBarSkin, _super);
    function VScrollBarSkin() {
        var _this = _super.call(this) || this;
        _this.skinParts = [
            'labelDisplay',
            'iconDisplay'
        ];
        _this.minHeight = 50;
        _this.minWidth = 100;
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Label();
        _this.labelDisplay = a2;
        a2.top = 8;
        a2.bottom = 8;
        a2.left = 8;
        a2.right = 8;
        a2.size = 20;
        a2.textColor = 16777215;
        a2.verticalAlign = 'middle';
        a2.textAlign = 'center';
        var a3 = new eui.Image();
        _this.iconDisplay = a3;
        a3.horizontalCenter = '0';
        a3.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a3
        ];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'button_down_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'alpha', 0.5)])
        ];
        _this.skinParts = ['labelDisplay'];
        var a1 = new eui.Group();
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        var a2 = new eui.HorizontalLayout();
        a2.verticalAlign = 'middle';
        a1.layout = a2;
        var a3 = new eui.Image();
        _this.a3 = a3;
        a3.fillMode = 'scale';
        a3.alpha = 1;
        a3.source = 'checkbox_unselect_png';
        var a4 = new eui.Label();
        _this.labelDisplay = a4;
        a4.size = 20;
        a4.textColor = 7368816;
        a4.textAlign = 'center';
        a4.verticalAlign = 'middle';
        a4.fontFamily = 'Tahoma';
        a1.elementsContent = [
            a3,
            a4
        ];
        _this.elementsContent = [a1];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a3', 'alpha', 0.7)]),
            new eui.State('disabled', [new eui.SetProperty('a3', 'alpha', 0.5)]),
            new eui.State('upAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_up_png')]),
            new eui.State('downAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_down_png')]),
            new eui.State('disabledAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_disabled_png')])
        ];
        _this.skinParts = ['thumb'];
        _this.minWidth = 20;
        _this.minHeight = 8;
        var a1 = new eui.Image();
        _this.thumb = a1;
        a1.source = 'roundthumb_png';
        a1.scale9Grid = new egret.Rectangle(3, 3, 2, 2);
        a1.height = 8;
        a1.width = 30;
        a1.verticalCenter = '0';
        _this.elementsContent = [a1];
        _this.skinParts = [
            'track',
            'thumb'
        ];
        _this.minWidth = 20;
        _this.minHeight = 8;
        var a1 = new eui.Image();
        _this.track = a1;
        a1.source = 'track_sb_png';
        a1.scale9Grid = new egret.Rectangle(1, 1, 4, 4);
        a1.percentWidth = 100;
        a1.height = 6;
        a1.verticalCenter = '0';
        var a2 = new eui.Image();
        _this.thumb = a2;
        a2.source = 'thumb_png';
        a2.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.skinParts = ['labelDisplay'];
        _this.minHeight = 50;
        _this.minWidth = 100;
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Label();
        _this.labelDisplay = a2;
        a2.top = 8;
        a2.bottom = 8;
        a2.left = 8;
        a2.right = 8;
        a2.size = 20;
        a2.fontFamily = 'Tahoma';
        a2.textColor = 16777215;
        a2.text = '{data}';
        a2.verticalAlign = 'middle';
        a2.textAlign = 'center';
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'button_down_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'alpha', 0.5)])
        ];
        _this.skinParts = [
            'moveArea',
            'titleDisplay',
            'closeButton'
        ];
        _this.minHeight = 230;
        _this.minWidth = 450;
        var a1 = new eui.Image();
        a1.left = 0;
        a1.right = 0;
        a1.bottom = 0;
        a1.top = 0;
        a1.source = 'border_png';
        a1.scale9Grid = new egret.Rectangle(2, 2, 12, 12);
        var a2 = new eui.Group();
        _this.moveArea = a2;
        a2.left = 0;
        a2.right = 0;
        a2.top = 0;
        a2.height = 45;
        var a3 = new eui.Image();
        a3.left = 0;
        a3.right = 0;
        a3.bottom = 0;
        a3.top = 0;
        a3.source = 'header_png';
        var a4 = new eui.Label();
        _this.titleDisplay = a4;
        a4.size = 20;
        a4.fontFamily = 'Tahoma';
        a4.textColor = 16777215;
        a4.wordWrap = false;
        a4.left = 15;
        a4.right = 5;
        a4.verticalCenter = '0';
        a2.elementsContent = [
            a3,
            a4
        ];
        var a5 = new eui.Button();
        _this.closeButton = a5;
        a5.label = 'close';
        a5.bottom = 5;
        a5.horizontalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a5
        ];
        _this.skinParts = [
            'thumb',
            'labelDisplay'
        ];
        _this.minWidth = 30;
        _this.minHeight = 18;
        var a1 = new eui.Image();
        a1.source = 'track_pb_png';
        a1.scale9Grid = new egret.Rectangle(1, 1, 4, 4);
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.verticalCenter = '0';
        var a2 = new eui.Image();
        _this.thumb = a2;
        a2.percentHeight = 100;
        a2.percentWidth = 100;
        a2.source = 'thumb_pb_png';
        var a3 = new eui.Label();
        _this.labelDisplay = a3;
        a3.textAlign = 'center';
        a3.verticalAlign = 'middle';
        a3.size = 15;
        a3.fontFamily = 'Tahoma';
        a3.textColor = 7368816;
        a3.horizontalCenter = '0';
        a3.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a3
        ];
        _this.skinParts = ['labelDisplay'];
        var a1 = new eui.Group();
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        var a2 = new eui.HorizontalLayout();
        a2.verticalAlign = 'middle';
        a1.layout = a2;
        var a3 = new eui.Image();
        _this.a3 = a3;
        a3.fillMode = 'scale';
        a3.alpha = 1;
        a3.source = 'radiobutton_unselect_png';
        var a4 = new eui.Label();
        _this.labelDisplay = a4;
        a4.size = 20;
        a4.textColor = 7368816;
        a4.textAlign = 'center';
        a4.verticalAlign = 'middle';
        a4.fontFamily = 'Tahoma';
        a1.elementsContent = [
            a3,
            a4
        ];
        _this.elementsContent = [a1];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a3', 'alpha', 0.7)]),
            new eui.State('disabled', [new eui.SetProperty('a3', 'alpha', 0.5)]),
            new eui.State('upAndSelected', [new eui.SetProperty('a3', 'source', 'radiobutton_select_up_png')]),
            new eui.State('downAndSelected', [new eui.SetProperty('a3', 'source', 'radiobutton_select_down_png')]),
            new eui.State('disabledAndSelected', [new eui.SetProperty('a3', 'source', 'radiobutton_select_disabled_png')])
        ];
        _this.skinParts = [
            'horizontalScrollBar',
            'verticalScrollBar'
        ];
        _this.minWidth = 20;
        _this.minHeight = 20;
        var a1 = new eui.HScrollBar();
        _this.horizontalScrollBar = a1;
        a1.percentWidth = 100;
        a1.bottom = 0;
        var a2 = new eui.VScrollBar();
        _this.verticalScrollBar = a2;
        a2.percentHeight = 100;
        a2.right = 0;
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.skinParts = [
            'textDisplay',
            'promptDisplay'
        ];
        _this.minHeight = 40;
        _this.minWidth = 300;
        var a1 = new eui.Image();
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Rect();
        a2.percentHeight = 100;
        a2.percentWidth = 100;
        a2.fillColor = 16777215;
        var a3 = new eui.EditableText();
        _this.textDisplay = a3;
        _this.a3 = a3;
        a3.verticalCenter = '0';
        a3.left = 10;
        a3.right = 10;
        a3.textColor = 0;
        a3.percentWidth = 100;
        a3.height = 24;
        a3.size = 20;
        var a4 = new eui.Label();
        _this.promptDisplay = a4;
        _this.a4 = a4;
        a4.verticalCenter = '0';
        a4.left = 10;
        a4.right = 10;
        a4.textColor = 11119017;
        a4.percentWidth = 100;
        a4.height = 24;
        a4.size = 20;
        a4.touchEnabled = false;
        _this.elementsContent = [
            a1,
            a2,
            a3,
            a4
        ];
        _this.states = [
            new eui.State('normal', []),
            new eui.State('disabled', [new eui.SetProperty('a3', 'textColor', 16711680)]),
            new eui.State('normalWithPrompt', [new eui.AddItems('a4', '', 1, '')]),
            new eui.State('disabledWithPrompt', [new eui.AddItems('a4', '', 1, '')])
        ];
        _this.skinParts = [];
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.source = 'on_png';
        var a2 = new eui.Image();
        _this.a2 = a2;
        a2.source = 'handle_png';
        a2.horizontalCenter = '-18';
        a2.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.states = [
            new eui.State('up', [new eui.SetProperty('a1', 'source', 'off_png')]),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'off_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'source', 'off_png')]),
            new eui.State('upAndSelected', [new eui.SetProperty('a2', 'horizontalCenter', '18')]),
            new eui.State('downAndSelected', [new eui.SetProperty('a2', 'horizontalCenter', '18')]),
            new eui.State('disabledAndSelected', [new eui.SetProperty('a2', 'horizontalCenter', '18')])
        ];
        _this.skinParts = ['thumb'];
        _this.minWidth = 8;
        _this.minHeight = 20;
        var a1 = new eui.Image();
        _this.thumb = a1;
        a1.source = 'roundthumb_png';
        a1.scale9Grid = new egret.Rectangle(3, 3, 2, 2);
        a1.height = 30;
        a1.width = 8;
        a1.horizontalCenter = '0';
        _this.elementsContent = [a1];
        return _this;
    }
    return VScrollBarSkin;
}(eui.Skin);

generateEUI.paths['resource/eui_skins/VScrollBarSkin.exml'] = skins.VScrollBarSkin;
        skins.VSliderSkin = function (_super) {
    __extends(VSliderSkin, _super);
    function VSliderSkin() {
        var _this = _super.call(this) || this;
        _this.skinParts = [
            'labelDisplay',
            'iconDisplay'
        ];
        _this.minHeight = 50;
        _this.minWidth = 100;
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Label();
        _this.labelDisplay = a2;
        a2.top = 8;
        a2.bottom = 8;
        a2.left = 8;
        a2.right = 8;
        a2.size = 20;
        a2.textColor = 16777215;
        a2.verticalAlign = 'middle';
        a2.textAlign = 'center';
        var a3 = new eui.Image();
        _this.iconDisplay = a3;
        a3.horizontalCenter = '0';
        a3.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a3
        ];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'button_down_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'alpha', 0.5)])
        ];
        _this.skinParts = ['labelDisplay'];
        var a1 = new eui.Group();
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        var a2 = new eui.HorizontalLayout();
        a2.verticalAlign = 'middle';
        a1.layout = a2;
        var a3 = new eui.Image();
        _this.a3 = a3;
        a3.fillMode = 'scale';
        a3.alpha = 1;
        a3.source = 'checkbox_unselect_png';
        var a4 = new eui.Label();
        _this.labelDisplay = a4;
        a4.size = 20;
        a4.textColor = 7368816;
        a4.textAlign = 'center';
        a4.verticalAlign = 'middle';
        a4.fontFamily = 'Tahoma';
        a1.elementsContent = [
            a3,
            a4
        ];
        _this.elementsContent = [a1];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a3', 'alpha', 0.7)]),
            new eui.State('disabled', [new eui.SetProperty('a3', 'alpha', 0.5)]),
            new eui.State('upAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_up_png')]),
            new eui.State('downAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_down_png')]),
            new eui.State('disabledAndSelected', [new eui.SetProperty('a3', 'source', 'checkbox_select_disabled_png')])
        ];
        _this.skinParts = ['thumb'];
        _this.minWidth = 20;
        _this.minHeight = 8;
        var a1 = new eui.Image();
        _this.thumb = a1;
        a1.source = 'roundthumb_png';
        a1.scale9Grid = new egret.Rectangle(3, 3, 2, 2);
        a1.height = 8;
        a1.width = 30;
        a1.verticalCenter = '0';
        _this.elementsContent = [a1];
        _this.skinParts = [
            'track',
            'thumb'
        ];
        _this.minWidth = 20;
        _this.minHeight = 8;
        var a1 = new eui.Image();
        _this.track = a1;
        a1.source = 'track_sb_png';
        a1.scale9Grid = new egret.Rectangle(1, 1, 4, 4);
        a1.percentWidth = 100;
        a1.height = 6;
        a1.verticalCenter = '0';
        var a2 = new eui.Image();
        _this.thumb = a2;
        a2.source = 'thumb_png';
        a2.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.skinParts = ['labelDisplay'];
        _this.minHeight = 50;
        _this.minWidth = 100;
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Label();
        _this.labelDisplay = a2;
        a2.top = 8;
        a2.bottom = 8;
        a2.left = 8;
        a2.right = 8;
        a2.size = 20;
        a2.fontFamily = 'Tahoma';
        a2.textColor = 16777215;
        a2.text = '{data}';
        a2.verticalAlign = 'middle';
        a2.textAlign = 'center';
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'button_down_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'alpha', 0.5)])
        ];
        _this.skinParts = [
            'moveArea',
            'titleDisplay',
            'closeButton'
        ];
        _this.minHeight = 230;
        _this.minWidth = 450;
        var a1 = new eui.Image();
        a1.left = 0;
        a1.right = 0;
        a1.bottom = 0;
        a1.top = 0;
        a1.source = 'border_png';
        a1.scale9Grid = new egret.Rectangle(2, 2, 12, 12);
        var a2 = new eui.Group();
        _this.moveArea = a2;
        a2.left = 0;
        a2.right = 0;
        a2.top = 0;
        a2.height = 45;
        var a3 = new eui.Image();
        a3.left = 0;
        a3.right = 0;
        a3.bottom = 0;
        a3.top = 0;
        a3.source = 'header_png';
        var a4 = new eui.Label();
        _this.titleDisplay = a4;
        a4.size = 20;
        a4.fontFamily = 'Tahoma';
        a4.textColor = 16777215;
        a4.wordWrap = false;
        a4.left = 15;
        a4.right = 5;
        a4.verticalCenter = '0';
        a2.elementsContent = [
            a3,
            a4
        ];
        var a5 = new eui.Button();
        _this.closeButton = a5;
        a5.label = 'close';
        a5.bottom = 5;
        a5.horizontalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a5
        ];
        _this.skinParts = [
            'thumb',
            'labelDisplay'
        ];
        _this.minWidth = 30;
        _this.minHeight = 18;
        var a1 = new eui.Image();
        a1.source = 'track_pb_png';
        a1.scale9Grid = new egret.Rectangle(1, 1, 4, 4);
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.verticalCenter = '0';
        var a2 = new eui.Image();
        _this.thumb = a2;
        a2.percentHeight = 100;
        a2.percentWidth = 100;
        a2.source = 'thumb_pb_png';
        var a3 = new eui.Label();
        _this.labelDisplay = a3;
        a3.textAlign = 'center';
        a3.verticalAlign = 'middle';
        a3.size = 15;
        a3.fontFamily = 'Tahoma';
        a3.textColor = 7368816;
        a3.horizontalCenter = '0';
        a3.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2,
            a3
        ];
        _this.skinParts = ['labelDisplay'];
        var a1 = new eui.Group();
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        var a2 = new eui.HorizontalLayout();
        a2.verticalAlign = 'middle';
        a1.layout = a2;
        var a3 = new eui.Image();
        _this.a3 = a3;
        a3.fillMode = 'scale';
        a3.alpha = 1;
        a3.source = 'radiobutton_unselect_png';
        var a4 = new eui.Label();
        _this.labelDisplay = a4;
        a4.size = 20;
        a4.textColor = 7368816;
        a4.textAlign = 'center';
        a4.verticalAlign = 'middle';
        a4.fontFamily = 'Tahoma';
        a1.elementsContent = [
            a3,
            a4
        ];
        _this.elementsContent = [a1];
        _this.states = [
            new eui.State('up', []),
            new eui.State('down', [new eui.SetProperty('a3', 'alpha', 0.7)]),
            new eui.State('disabled', [new eui.SetProperty('a3', 'alpha', 0.5)]),
            new eui.State('upAndSelected', [new eui.SetProperty('a3', 'source', 'radiobutton_select_up_png')]),
            new eui.State('downAndSelected', [new eui.SetProperty('a3', 'source', 'radiobutton_select_down_png')]),
            new eui.State('disabledAndSelected', [new eui.SetProperty('a3', 'source', 'radiobutton_select_disabled_png')])
        ];
        _this.skinParts = [
            'horizontalScrollBar',
            'verticalScrollBar'
        ];
        _this.minWidth = 20;
        _this.minHeight = 20;
        var a1 = new eui.HScrollBar();
        _this.horizontalScrollBar = a1;
        a1.percentWidth = 100;
        a1.bottom = 0;
        var a2 = new eui.VScrollBar();
        _this.verticalScrollBar = a2;
        a2.percentHeight = 100;
        a2.right = 0;
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.skinParts = [
            'textDisplay',
            'promptDisplay'
        ];
        _this.minHeight = 40;
        _this.minWidth = 300;
        var a1 = new eui.Image();
        a1.percentWidth = 100;
        a1.percentHeight = 100;
        a1.scale9Grid = new egret.Rectangle(1, 3, 8, 8);
        a1.source = 'button_up_png';
        var a2 = new eui.Rect();
        a2.percentHeight = 100;
        a2.percentWidth = 100;
        a2.fillColor = 16777215;
        var a3 = new eui.EditableText();
        _this.textDisplay = a3;
        _this.a3 = a3;
        a3.verticalCenter = '0';
        a3.left = 10;
        a3.right = 10;
        a3.textColor = 0;
        a3.percentWidth = 100;
        a3.height = 24;
        a3.size = 20;
        var a4 = new eui.Label();
        _this.promptDisplay = a4;
        _this.a4 = a4;
        a4.verticalCenter = '0';
        a4.left = 10;
        a4.right = 10;
        a4.textColor = 11119017;
        a4.percentWidth = 100;
        a4.height = 24;
        a4.size = 20;
        a4.touchEnabled = false;
        _this.elementsContent = [
            a1,
            a2,
            a3,
            a4
        ];
        _this.states = [
            new eui.State('normal', []),
            new eui.State('disabled', [new eui.SetProperty('a3', 'textColor', 16711680)]),
            new eui.State('normalWithPrompt', [new eui.AddItems('a4', '', 1, '')]),
            new eui.State('disabledWithPrompt', [new eui.AddItems('a4', '', 1, '')])
        ];
        _this.skinParts = [];
        var a1 = new eui.Image();
        _this.a1 = a1;
        a1.source = 'on_png';
        var a2 = new eui.Image();
        _this.a2 = a2;
        a2.source = 'handle_png';
        a2.horizontalCenter = '-18';
        a2.verticalCenter = '0';
        _this.elementsContent = [
            a1,
            a2
        ];
        _this.states = [
            new eui.State('up', [new eui.SetProperty('a1', 'source', 'off_png')]),
            new eui.State('down', [new eui.SetProperty('a1', 'source', 'off_png')]),
            new eui.State('disabled', [new eui.SetProperty('a1', 'source', 'off_png')]),
            new eui.State('upAndSelected', [new eui.SetProperty('a2', 'horizontalCenter', '18')]),
            new eui.State('downAndSelected', [new eui.SetProperty('a2', 'horizontalCenter', '18')]),
            new eui.State('disabledAndSelected', [new eui.SetProperty('a2', 'horizontalCenter', '18')])
        ];
        _this.skinParts = ['thumb'];
        _this.minWidth = 8;
        _this.minHeight = 20;
        var a1 = new eui.Image();
        _this.thumb = a1;
        a1.source = 'roundthumb_png';
        a1.scale9Grid = new egret.Rectangle(3, 3, 2, 2);
        a1.height = 30;
        a1.width = 8;
        a1.horizontalCenter = '0';
        _this.elementsContent = [a1];
        _this.skinParts = [
            'track',
            'thumb'
        ];
        _this.minWidth = 25;
        _this.minHeight = 30;
        var a1 = new eui.Image();
        _this.track = a1;
        a1.source = 'track_png';
        a1.scale9Grid = new egret.Rectangle(1, 1, 4, 4);
        a1.width = 7;
        a1.percentHeight = 100;
        a1.horizontalCenter = '0';
        var a2 = new eui.Image();
        _this.thumb = a2;
        a2.source = 'thumb_png';
        a2.horizontalCenter = '0';
        _this.elementsContent = [
            a1,
            a2
        ];
        return _this;
    }
    return VSliderSkin;
}(eui.Skin);

generateEUI.paths['resource/eui_skins/VSliderSkin.exml'] = skins.VSliderSkin;
        