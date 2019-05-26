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
        const tipo = "curto";
        console.log(freguesia_or_rua);
        console.log(second_select1);
        manda_prazo(freguesia_or_rua,second_select1,tipo);
    });

    //Ao Clicar no botao longo prazo
    $('#prazol').click(function () {
       const freguesia_or_rua2 = $('.select2 option:selected').text();
       const second_select2 = $('.ruaCL option:selected').text();
       const tipo = "longo";
       console.log(freguesia_or_rua2);
       console.log(second_select2);
       manda_prazo(freguesia_or_rua2,second_select2,tipo);
    });

    //Quando a pagina estiver pronta ocultar as duas select com varias opçoes
    $(document).ready(function () {
        $('.ruaCC').css("opacity",1);
        $('.ruaCL').css("opacity",1);
    });


    //Funcao responsavel pelo pedido ajax ao servidor
    function manda_prazo(freg_rua, select,tipo) {
        var url1 = "http://127.0.0.1:5000/da?sele1="+freg_rua+"&sele2="+select+"&tipo="+tipo;

        //pedido ajax
        $.ajax({
            type: 'GET',
            url: url1,
            crossDomain: true,
            success: function (data) {
                console.log(data);
                $('#response').empty();
                var titulo;
                var tit = data.tipo;
                console.log(tit);
                if(tipo === "curto"){
                    console.log("Entrei AQUI");
                    titulo = "Previsão a Curto Prazo";
                    // series dynamic
					console.log("Data");
					//console.log(data);
					var obj = JSON.parse(data);
					//console.log(obj);
                    var val_a = [];
					var val_p = [];
					$.each(obj,function (key,value) {
						console.log("Interacao");
						val_a.push(value.Atual);
						val_p.push(value.Previsao);
                    });
                    
                    //console.log(val_c);
					console.log(val_a);
					console.log(val_p);

                    console.log("PASSEI");

                    var tamanho_a  = val_a.length;
					var tamanho_p = val_p.length;

                    var ant = val_a[tamanho_a-1];
                    var exato = val_p[tamanho_p-1];

                    console.log(ant);
                    console.log(exato);

                    if(exato > ant){
                        console.log("Estou no if");
                        var vermelho = document.createElement("img");
                        vermelho.src = "img/semaforo_vermelho.png";
                        vermelho.class = "semaforo_vermelho";
						var caixa_vermelho_ant = document.createElement("p");
                        caixa_vermelho_ant.class = "vermelho_ant";
                        caixa_vermelho_ant.innerText = ant;
                        var caixa_vermelho_exato = document.createElement("p");
                        caixa_vermelho_exato.class = "vermelho_exato";
                        caixa_vermelho_exato.innerText = exato;
                        var texto = document.createElement("span");
                        texto.class = "informacao";
                        texto.innerText = "O Fluxo de Trânsito aumentou relativamente à uma hora atrás na " + freg_rua + " : " + select;
                        $("#response").append(vermelho);
                        $("#response").append(texto);
                        $("#response").append(caixa_vermelho_ant);
                        $("#response").append(caixa_vermelho_exato);
                    }
                    else{
                        console.log("Estou no else");
                        var verde = document.createElement("img");
                        verde.src = "img/semaforo_green.png";
                        verde.class = "semaforo_verde";
                        var caixa_verde_ant = document.createElement("p");
                        caixa_verde_ant.class = "verde_ant";
                        caixa_verde_ant.innerText = ant;
                        var caixa_verde_exato = document.createElement("p");
                        caixa_verde_exato.class = "verde_exato";
                        caixa_verde_exato.innerText = exato;
                        var texto = document.createElement("span");
                        texto.class = "informacao";
                        texto.innerText = "O Fluxo de Trânsito baixou relativamente à uma hora atrás na " + freg_rua + " : " + select;
                        $("#response").append(verde);
                        $("#response").append(texto);
                        $("#response").append(caixa_verde_ant);
                        $("#response").append(caixa_verde_exato);
                    }
                }
                else{
                    titulo = "Previsão a Longo Prazo na " + freg_rua + " : "  + select;
                    // xaxis dynamic
                    let chave = [];
                    $.each(data, function (key,value) {
                        chave.push(key);
                    });
                    var chave_int = chave.map(Number);
                    console.log(chave);
                    console.log(chave_int);

                    // series dynamic

                    var val = [];
                    $.each(data,function (key,value) {
                        val.push(value);
                    });
                    console.log(val);

                    // chart
                    var options = {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: titulo,
                            align: 'center'
                        },
                        series: [{
                            name: 'predict',
                            data: val,
                        }],
                        xaxis: {
                            categories: chave_int,
                        }
                    };

                    var chart = new ApexCharts(document.querySelector("#response"), options);

                    chart.render();
                }


                
            }
        });
    }

});