import 'jquery';
import validate from 'jquery-validation';
import Inputmask from "inputmask";


const mask_year = new Inputmask("2099");
mask_year.mask(year);
const mask_day = new Inputmask("99");
mask_day.mask(day);
const mask_month = new Inputmask("99");
mask_month.mask(month);
const phone = document.getElementById("phone");
var mask = new Inputmask("+7 999 999-99-99");
mask.mask(phone);

$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    },
    "Проверьте правильность введенных данных"
);

$('#form').validate({
    rules: {
        parent_name: {
            required: true,
            regex: "^[а-яА-Яa-zA-ZёЁ]*$",
            minlength: 3,
            maxlength:15
        },
        phone: {
            required: true,
            regex:"^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$"
        },
        email: {
            email: true
        },
        child_count: {
            required: true,
            maxlength:2
        },
        canal: {
            required: true
        },
        child_name: {
            required: true,
            regex: "^[а-яА-Яa-zA-ZёЁ]*$",
            minlength: 3,
            maxlength:15
        },
        child__second_name: {
            required: true,
            regex: "^[а-яА-Яa-zA-ZёЁ]*$",
            minlength: 3,
            maxlength:15
        },
        day: {
            required: true,
            number: true
        },
        month: {
            required: true,
            number: true
        },
        year: {
            required: true,
            number: true
        }

    },
    messages: {
        parent_name: {
            required:"Это поля обязательно для заполнения",
            minlength:"Проверьте правильность данных (менее 3 букв)",
            maxlength: "Введите неболее 15 букв",
            regex:"Имя должно содержать только буквы"
        },
        phone: {
            required:"Это поля обязательно для заполнения"

        },
        email: {
            email: 'Проверьте правильность email адресса',
            required: "Это поля обязательно для заполнения"
        },
        child_count: {
            required: "Это поля обязательно для заполнения",
            maxlength: 'Проверьте правильность введенных данных'
        },
        canal: {
            required: "Это поля обязательно для заполнения"
        },
        child_name: {
            required:"Это поля обязательно для заполнения",
            minlength:"Проверьте правильность данных (менее 3 букв)",
            maxlength: "Введите неболее 15 букв",
            regex:"Имя должно содержать только буквы"
        },
        child__second_name: {
            required:"Это поля обязательно для заполнения",
            minlength:"Проверьте правильность данных (менее 3 букв)",
            maxlength: "Введите неболее 15 букв",
            regex:"Имя должно содержать только буквы"
        },
        day: {
            required: "Это поля обязательно для заполнения",
            number:"Заполните поле"
        },
        month: {
            required: "Это поля обязательно для заполнения",
            number:"Заполните поле"
        },
        year: {
            required: "Это поля обязательно для заполнения",
            number:"Заполните поле"
        }
    }
});