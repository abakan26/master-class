import 'jquery';
import 'bootstrap';
import './scss/style.scss';
import Inputmask from "inputmask";
import * as EmailValidator from 'email-validator';

window.onload = () => {


};

const phone = document.getElementById("phone");

var mask = new Inputmask("+7 999 999-99-99");

mask.mask(phone);

/*
const second_phone = document.getElementById("form_phone");


const second_btn = document.getElementById('form_btn');
const second_name = document.getElementById('form_name');
second_name.oninput = (event) => {
    event.preventDefault();
    validate(second_name, second_phone) ? second_btn.disabled = false : second_btn.disabled = true
};
second_phone.oninput = (event) => {
    event.preventDefault();
    validate(second_name, second_phone) ? second_btn.disabled = false : second_btn.disabled = true
};*/


function valide_inputmask(input) {
    const str = input.value;
    return str.search('_') === -1 && str !== ''
};
function valide_lenght(input, start, end){
    const str = input.value;
    const len = str.length;
    return len >= start && len <= end
}
function onlyLetters(input){
    return /^[а-яА-Яa-zA-ZёЁ]*$/.test(input.value);
}
var btn_disabled = true;
var name = document.getElementById("name");
var count = document.getElementById("child_count")
var email = document.getElementById("email");
var day = document.getElementById("day");
var month = document.getElementById("month");
var year = document.getElementById("year");
var child_name = document.getElementById("child_name");
var child__second_name = document.getElementById("child__second_name");
var mask_year = new Inputmask("2099");
mask_year.mask(year);
var mask_day = new Inputmask("99");
mask_day.mask(day);
var mask_month = new Inputmask("99");
mask_month.mask(month);
day.oninput = (e) => {
    if (valide_inputmask(e.target)) {
        month.focus()
    }else {
        btn_disabled = false
    }
};
month.oninput = (e) => {
    if (valide_inputmask(e.target)) year.focus()
    else {
        btn_disabled = false
    }
};
month.oninput = (e) => {
    if (!valide_inputmask(e.target)) {
        btn_disabled = false
    }
};
name.oninput = () => {
    btn_disabled = validate();
    if (!onlyLetters(name)){
        show_error('name_error', true, 'имя должно содержать только буквы');
        return true}else { show_error('name_error', false)}
    if (!valide_lenght(name, 3, 20)){
        show_error('name_error', true, "имя должно содержать не менее 3 букв");
        return true} else { show_error('name_error', false)}
};
phone.oninput = () => {
    btn_disabled = validate();

    if (!valide_inputmask(phone)){
        show_error('phone_error', true);
        return true } else {show_error('phone_error', false);}
};
email.oninput = () => {
    btn_disabled = validate();
    if (!EmailValidator.validate(email.value)){
        show_error('email_error', true);
        return true } else {show_error('email_error', false);}
};
count.oninput = () => {
    btn_disabled = validate();
};
child_name.oninput = () => {
    btn_disabled = validate();
    if (!onlyLetters(child_name)) {
        show_error('child_secondname_error', true, 'фамилия должно содержать только буквы');
        return true
    } else {
        show_error('child_secondname_error', false)
    }
    if (!valide_lenght(child_name, 3, 20)) {
        show_error('child_secondname_error', true, "фамилия должно содержать не менее 3 букв");
        return true
    } else {
        show_error('child_secondname_error', false)
    }
};
child__second_name.oninput = () => {
    btn_disabled = validate();
    if (!onlyLetters(child__second_name)){
        show_error('child_name_error', true, 'имя должно содержать только буквы');
        return true}else { show_error('child_name_error', false)}
    if (!valide_lenght(child__second_name, 3, 20)){
        show_error('child_name_error', true, "имя должно содержать не менее 3 букв");
        return true} else { show_error('child_name_error', false)}
};

function validate() {
    if (!onlyLetters(name)){ return true}
    if (!valide_lenght(name, 3, 20)){return true}
    if (!valide_inputmask(phone)){ return true }
    if (!EmailValidator.validate(email.value)){return true}
    if (!valide_lenght(count, 1, 10)){return true}
    if (!onlyLetters(child_name)){return true}
    if (!valide_lenght(child_name, 3, 20)){return true}
    if (!onlyLetters(child__second_name)){return true}
    if (!valide_lenght(child__second_name, 3, 20)){return true}
    return false
};

function show_error(element, bool, mess="проверьте введенные данные") {
    if(bool){
        var div = document.getElementById(element);
        div.classList.add('show');
        div.innerText = mess
    } else {
        document.getElementById(element).classList.remove('show')
    }

}


document.getElementById("submit").onclick = (e)=>{
    if(btn_disabled){
        e.preventDefault()
        show_error('submit_error', true, 'проверьте правильность введенных данных')
    }else {show_error('submit_error', false)}
};