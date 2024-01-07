export function checkEmail(email:string) {
    if(email.length == 0) {
        return '请输入邮箱';
    }
    const emailRegex= /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/

    let valid = emailRegex.test(email);
    if(!valid) {
        return '请输入正确邮箱';
    }
    return '';
}

export function checkPassword(password:string) {
    if(password.length == 0) {
        return "请输入密码";
    }
    if(password.length < 5){
        return "密码长度过于简单";
    }
    if(password.length > 10){
        return "密码长度需要6~10位";
    }
    if(password.match(/(\s)/)){
        return "密码不能包含空格";
    }
    if(!password.match(/([a-zA-Z])+/)){
        return "密码需要至少包含一个字母";
    }
    if(!password.match(/([0-9])+/)){
        return "密码需要至少包含一个数字";
    }
    return "";
}