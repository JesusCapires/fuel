
const loader = document.getElementById("loader");

const patronCorreo = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

const estilosValidate = {
    errorElement: 'span',
    errorPlacement: (error, element) => {
        error.addClass('invalid-feedback');
        element.closest('.form-group').append(error);
    },
        highlight: (element) => {
        $(element).addClass('is-invalid').removeClass('is-valid');
    },
        unhighlight: (element) => {
        $(element).removeClass('is-invalid').addClass('is-valid');
    }
}

$(document).ready(function() {
    $.validator.addMethod('ValidarRFC', function(value, element) {
        let re = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
        return this.optional(element) || re.test(value);
    }, 'RFC mal escrito, por favor, ingresa un RFC válido');

    $.validator.addMethod('validaCorreo', (value, element) => patronCorreo.test(value));

    $.validator.addMethod('validaCriterio', (value, element) => $(element).find('option:selected').length === 0 ? false : true);

    jQuery.validator.addMethod("contrasena", function(value, element) {
        return this.optional( element ) || /^(?=.*[0-9])(?=.*[!@#$%^&*+_\-.])[a-zA-Z0-9!@#$%^&*+_\-.]{8,15}$/.test( value );
    }, 'Selecciona una contraseña más segura. Intenta mezclar letras, números y símbolos.(!@#$%^&*+_-.)');

    $('body').tooltip({selector: '[data-bs-toggle="tooltip"]'});
});


const rfcChange =  () => {
    $('#rfc').on('change', function(){
        $(this).val($(this).val().toUpperCase());
    });
}

const validarSoloNums = () => {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '');
}


const initSelect = (elemento, texto) => {
    $("#"+elemento).select2({
        placeholder: texto,
        dropdownParent: $("#modalBase"),
        language: {
            noResults: () =>  "No hay resultado",
            searching: () => "Buscando..",
        }
    });
}


const decimales2 = (number) => {
    const pad = (input, padding) => {
        let length = 2;
        let str = input + "";
        return (length <= str.length) ? str : pad(str + padding, padding);
    }
    let str        = number+"";
    let dot        = str.lastIndexOf('.');
    let isDecimal  = dot != -1;
    let integer    = isDecimal ? str.substr(0, dot) : str;
    let decimals   = isDecimal ? str.substr(dot+1)  : "";
    decimals       = pad(decimals, 0);
    return integer + '.' + decimals;
}

const truncar2 = (n) => {
    let t = n.toString();
    let regex = /(\d*.\d{0,2})/;
    return t.match(regex)[0];
}



const claseStatus = {
    '-1': `bg-danger`,
    '0' : `bg-danger`,
    '1' : `bg-secondary`,
    '2' : `bg-info`,
    '3' : `bg-success`
}


const textoStatus = {
    '-1': `Detenido`,
    '0' : `Cancelado`,
    '1' : `Pendiente`,
    '2' : `En proceso`,
    '3' : `Terminado`
}

const navs = (id) => {
    $('#boton').removeAttr('onclick');
    limpiarFormulario();
    if( id ) {
        $('#lista').removeClass('d-none');
        $('#acciones').addClass('d-none');
        $('#home').removeClass('active');
        $('#home').removeClass('show');
        $('#create').addClass('active');
        $('#create').addClass('show');
        idTemp = '';
    }else{
        $('#acciones').removeClass('d-none');
        $('#lista').addClass('d-none');
        $('#create').removeClass('active');
        $('#create').removeClass('show');
        $('#home').addClass('active');
        $('#home').addClass('show');
    }
}


const limpiarFormulario = (formulario = 'formulario') => {
    $('#'+formulario)[0].reset();
    $('#'+formulario).find(".is-valid").removeClass('is-valid');
    $('#'+formulario).find(".is-invalid").removeClass('is-invalid');
}

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

const formatoNumerico = (numero) =>  new Intl.NumberFormat('en-MX', { minimumFractionDigits: 0 }).format(numero)
const formatoNumericoDecimal = (numero) =>  new Intl.NumberFormat('en-MX', { minimumFractionDigits: 2 }).format(numero)


const ajaxGet = async (url, data) => {
    let response = [];
    await $.ajax({
        url,
        type: 'GET',
        data: data,
        dataType: "json",
        beforeSend: () => {
            loader.classList.remove('d-none');
        },
        success: (data) => {
            response = data;
            loader.classList.add('d-none');
        }
    });
    return response;
}


const ajaxPost = async (url, data) => {
    let response = [];
    await $.ajax({
        url,
        type: 'POST',
        data: data,
        dataType: "json",
        beforeSend: () => {
            loader.classList.remove('d-none');
        },
        success: (data) => {
            response = data;
            loader.classList.add('d-none');
        }
    });
    return response;
}

const ajaxPostForm = async (url, data) => {
    let response = [];
    await $.ajax({
        url,
        type: 'POST',
        data: data,
        dataType: "json",
        processData: false,
        contentType: false,
        beforeSend: () => {
            loader.classList.remove('d-none');
        },
        success: (data) => {
            response = data;
            loader.classList.add('d-none');
        }
    });
    return response;
}