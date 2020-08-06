/**
 * 检查表单提交字段非空判断
 * @param formObj  表单对象ID 不局限任何html标签
 * @returns {boolean}  返回true 表示验证通过
 */
function checkField(formObj) {
    if (isNull(formObj)) {
        return true;
    }
    //1.获取所有必填对象
    var objList = $(formObj).find("*[mustField]");
    if (objList.length > 0) {
        for (var i = 0; i < objList.length; i++) {
            //2.判断对象类型
            var obj = $(objList[i]);
            if (obj.is('input')) {
                //单行文本框-必填
                //3.获取当前遍历对象值判断是否为空
                if (isNull(obj.val())) {
                    //返回结果 如果为空 把mustFiled中的类容显示出来，并返回 return false
                    obj.focus();//获取焦点、
                    layer.tips(obj.attr("mustField"), obj, {
                        tips: [3, '#FF784E']
                    });
                    return false;
                }else if(strFormat(obj.attr("checkType") , "") == '0'){
                    //判断身份证号是否正常
                    obj.focus();//获取焦点、
                    layer.tips(obj.attr("checkTypeYu"), obj, {
                        tips: [3, '#FF784E']
                    });
                    return false;
                }
            } else if (obj.is('select')) {
                //下拉列表-必填
                if (isNull(obj.val()) || obj.val() < 0) {
                    layer.msg(obj.attr("mustField"));
                    return false;
                }
            } else if (obj.is('textarea')) {
                //多行文本框-必填
                if (isNull(obj.val())) {
                    layer.msg(obj.attr("mustField"));
                    obj.focus();//获取焦点
                    return false;
                }
            }
        }
    }
    return true;
}

