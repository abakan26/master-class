import 'jquery';
import 'bootstrap';
import './scss/style.scss';
import Inputmask from "inputmask";


window.onload = () => {


};

const modal_phone = document.getElementById("modal_phone");

var header_mask = new Inputmask("+7 999 999-99-99");
header_mask.mask(modal_phone);

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
};
function validate(inp_name, inp_phone) {

    if (inp_name.value === '') {
        return false
    }else if (inp_phone.value.search('_') !== -1 || inp_phone.value === '') {
        return false
    }
    return true
}


