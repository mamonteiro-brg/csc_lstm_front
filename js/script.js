$(function () {

    //Mostrar as opçoes consoante a escolha da primeira select
    $('.select1').change(function () {
        const str = $('.select1 option:selected').text();
        if(str === 'Rua'){
            $('.ruaCC option').remove();
            $('.ruaCC').append('<option>Avenida Padre Julio Fragata</option>');
        }
        if(str === 'Freguesia'){
            $('.ruaCC option').remove();
            $('.ruaCC').append('<option>S. Vitor</option>');
        }
    }).trigger("change");

    //Mostrar e ocular selection da previsao a longo prazo
    $('.select2').change(function () {
        const str = $('.select2 option:selected').text();
        if(str === 'Rua'){
            $('.ruaCL option').remove();
            $('.ruaCL').append('<option>Avenida Padre Julio Fragata</option>');
        }
        if(str === 'Freguesia'){
            $('.ruaCL option').remove();
            $('.ruaCL').append('<option>S. Vitor</option>');
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
                console.log(tipo)
                //console.log(data);
                $('#response').empty();
                var titulo;
                console.log(tipo)
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

                    var ant = val_a[tamanho_a-5];
                    var exato = val_p[tamanho_p-5];

                    console.log(ant);
                    console.log(exato);

                    if(exato > ant){
                        console.log("Estou no if");
                        var vermelho = document.createElement("img");
                        vermelho.src = "img/red_arrow.png";
                        vermelho.class = "semaforo_vermelho";
						var caixa_vermelho_ant = document.createElement("p");
                        caixa_vermelho_ant.class = "vermelho_ant";
                        caixa_vermelho_ant.innerText = ant;
                        var caixa_vermelho_exato = document.createElement("p");
                        caixa_vermelho_exato.class = "vermelho_exato";
                        caixa_vermelho_exato.innerText = exato;
                        var texto = document.createElement("span");
                        texto.class = "informacao";
                        texto.innerText = "O Fluxo de Trânsito previsto aumentou relativamente ao valor das 20h  " + freg_rua + " : " + select;
                        $("#response").append(vermelho);
                        $("#response").append(texto);
                        $("#response").append(caixa_vermelho_ant);
                        $("#response").append(caixa_vermelho_exato);
                    }
                    else{
                        console.log("Estou no else");
                        var verde = document.createElement("img");
                        verde.src = "img/green_arrow.png";
                        verde.class = "semaforo_verde";
                        var caixa_verde_ant = document.createElement("p");
                        caixa_verde_ant.class = "verde_ant";
                        caixa_verde_ant.innerText = ant;
                        var caixa_verde_exato = document.createElement("p");
                        caixa_verde_exato.class = "verde_exato";
                        caixa_verde_exato.innerText = exato;
                        var texto = document.createElement("span");
                        texto.class = "informacao";
                        texto.innerText = "O Fluxo de Trânsito previsto baixou relativamente ao valor das 20h " + freg_rua + " : " + select;
                        $("#response").append(verde);
                        $("#response").append(texto);
                        $("#response").append(caixa_verde_ant);
                        $("#response").append(caixa_verde_exato);
                    }
                }
                else{
                    titulo = "Previsão a Longo Prazo na " + freg_rua + " : "  + select;
                    // xaxis dynamic
                    console.log("Estarei aqui")
                    var obj_l = JSON.parse(data);
                    console.log("Estou aqui");
                    var val_a_l = [];
                    var val_p_l = [];
                    $.each(obj_l,function (key,value) {
                        console.log("Interacao");
                        val_a_l.push(value.Atual);
                        val_p_l.push(value.Previsao);
                    });
                    
					
					//console.log("Motra array");
					//console.log(va_mostra_a);
					
					//conca_a_l = [].concat.apply([],va_mostra_a);
					
					//console.log(conca_a_l);
					
					val_a_l = val_a_l.map(Number);
					val_p_l = val_p_l.map(Number);


					for(var j = 0; j < val_p_l.length;j++){
					    //debugger;
					    val_p_l[j] = (val_p_l[j] < 0)? -1*val_p_l[j]:(val_p_l[j]);
                    }
					console.log("Abs");
					console.log(val_p_l);

					//console.log(va_mostra_a);
					//console.log("Previsao");
					//console.log(va_mostra_p);
					
					va_ultimos_a = val_a_l.slice(val_a_l.length-24,val_a_l.length);
					va_ultimos_p = val_p_l.slice(val_p_l.length-24,val_p_l.length);
					
					

                    chave_int = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

                    var options = {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: titulo,
                            align: 'center'
                        },
                        series: [{
                            name: 'real',
                            data: va_ultimos_a
                        }, {
                            name: 'predict',
                            data: va_ultimos_p
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