$(function () {

    //Mostrar as opçoes consoante a escolha da primeira select
    $('.select1').change(function () {
        const str = $('.select1 option:selected').text();
        if(str === 'Rua'){
            $('.ruaCC option').remove();
            $('.ruaCC').append('<option>Avenida da Liberdade</option>');
            $('.ruaCC').append('<option>Avenida Central</option>');
            $('.ruaCC').append('<option>Rua de Caires</option>');
            $('.ruaCC').append('<option>N14 Bosch</option>');
            $('.ruaCC').append('<option>Rua Nova de Santa Cruz</option>');
            $('.ruaCC').append('<option>Avenida João Paulo II</option>');
            $('.ruaCC').append('<option>Avenida Padre Júlio Fragata</option>');
            $('.ruaCC').append('<option>Rua Costa Gomes</option>');
        }
        if(str === 'Freguesia'){
            $('.ruaCC option').remove();
            $('.ruaCC').append('<option>Maximinos</option>');
            $('.ruaCC').append('<option>S. Vitor</option>');
            $('.ruaCC').append('<option>S. José e S. Lázaro</option>');
            $('.ruaCC').append('<option>Real</option>');
        }
    }).trigger("change");

    //Mostrar e ocular selection da previsao a longo prazo
    $('.select2').change(function () {
        const str = $('.select2 option:selected').text();
        if(str === 'Rua'){
            $('.ruaCL option').remove();
            $('.ruaCL').append('<option>Avenida da Liberdade</option>');
            $('.ruaCL').append('<option>Avenida Central</option>');
            $('.ruaCL').append('<option>Rua de Caires</option>');
            $('.ruaCL').append('<option>N14 Bosch</option>');
            $('.ruaCL').append('<option>Rua Nova de Santa Cruz</option>');
            $('.ruaCL').append('<option>Avenida João Paulo II</option>');
            $('.ruaCL').append('<option>Avenida Padre Júlio Fragata</option>');
            $('.ruaCL').append('<option>Rua Costa Gomes</option>');
        }
        if(str === 'Freguesia'){
            $('.ruaCL option').remove();
            $('.ruaCL').append('<option>Maximinos</option>');
            $('.ruaCL').append('<option>S. Vitor</option>');
            $('.ruaCL').append('<option>S. José e S. Lázaro</option>');
            $('.ruaCL').append('<option>Real</option>');
        }
    }).trigger("change");


    //Ao clicar no botao curto prazo
    $('#prazoc').click(function () {
        const freguesia_or_rua = $('.select1 option:selected').text();
        const second_select1 = $('.ruaCC option:selected').text();
        console.log(freguesia_or_rua);
        console.log(second_select1);
        manda_prazo(freguesia_or_rua,second_select1);
    });

    //Ao Clicar no botao longo prazo
    $('#prazol').click(function () {
       const freguesia_or_rua2 = $('.select2 option:selected').text();
       const second_select2 = $('.ruaCL option:selected').text();
       console.log(freguesia_or_rua2);
       console.log(second_select2);
       manda_prazo(freguesia_or_rua2,second_select2);
    });

    //Quando a pagina estiver pronta ocultar as duas select com varias opçoes
    $(document).ready(function () {
        $('.ruaCC').css("opacity",1);
        $('.ruaCL').css("opacity",1);
    });


    //Funcao responsavel pelo pedido ajax ao servidor
    function manda_prazo(freg_rua, select) {
        var url1 = "http://127.0.0.1:5000/da?sele1="+freg_rua+"&sele2="+select;

        //pedido ajax
        $.ajax({
            type: 'GET',
            url: url1,
            crossDomain: true,
            success: function (data) {
                console.log(data);
                $('#response').empty()
                $('#response').append(data.name)
                
            }
        });
    }

});