var nota = document.getElementsByClassName('tabela')[0];

var refApagar = firebase.database().ref('Apagar');

var datInput = document.getElementById("data1");
var mesInput = document.getElementById("mes1");
var ctgInput = document.getElementById("categoria1");
var dscInput = document.getElementById("descricao1");
var cartInput = document.getElementById("cartao1");
var pagInput = document.getElementById("pagamento1");
var valorInput = document.getElementById("valor1");

function criarCard() {

    var card = {
    dat: datInput.value,
    mes: mesInput.value,
    ctg: ctgInput.value,
    dsc: dscInput.value,
    cart: cartInput.value,
    pag: pagInput.value,
    vlr: valorInput.value
    };

     refApagar.push(card).then(snapshot =>{
       console.log();
       adicionaNotaATela(card, snapshot.key);

       })
       location.reload();
};



 function allTit() {

    var vl = 0;

    refApagar.orderByChild('Apagar').on('child_added', snapshot =>{
       console.log();

       adicionaNotaATela(snapshot.val(), snapshot.key);
      
       
       vl += parseFloat(snapshot.val().vlr);

    })
    
    setTimeout(function (){
    
        document.getElementById("result").innerText = `Valor total: ${vl} R$`;
    }, 2000);

    return vl;
    
    
};


function titCtg(){
    var ctgInput = document.getElementById("categoria1");
    var butCtg = ctgInput.value;

    refApagar.orderByChild('ctg').equalTo(butCtg).on('child_added', snapshot =>{
        console.log(butCtg);

    adicionaNotaATela(snapshot.val(), snapshot.key);

    vl += parseFloat(snapshot.val().vlr);

    })

    setTimeout(function (){
       
        document.getElementById("result").innerText = `Valor total: ${vl.toFixed(2)} R$`;
        
    }, 2000);

    return vl;
}

var vl = 0;
function titMes(){

    var vl = 0;
    var mesInput = document.getElementById("mes1");
    var butMes = mesInput.value;
  


    refApagar.orderByChild('mes').equalTo(butMes).on('child_added', snapshot =>{
      
    adicionaNotaATela(snapshot.val(), snapshot.key);
    vl += parseFloat(snapshot.val().vlr);

    })
    
    setTimeout(function (){
        
        document.getElementById("result").innerText = `Valor total: ${vl.toFixed(2)} R$`;
    }, 2000)

    return vl;
}

function titDate(){
    var dateInput = document.querySelector("#data1");
    var date2 = dateInput.value;
    


    refApagar.orderByChild('dat').equalTo(date2).on('child_added', snapshot =>{
    
    adicionaNotaATela(snapshot.val(), snapshot.key);
    
    })
}

function titCart(){
    var cartInput = document.getElementById("cartao1");
    var cart = cartInput.value;


    refApagar.orderByChild('cart').equalTo(cart).on('child_added', snapshot =>{
        
    adicionaNotaATela(snapshot.val(), snapshot.key);
    vl += parseFloat(snapshot.val().vlr);


    })

    setTimeout(function (){
        
        document.getElementById("result").innerText = `Valor total: ${vl.toFixed(2)} R$`;
    }, 2000)

    return vl;
}

function titPag(){
    var pagInput = document.getElementById("pagamento1");
    var pag = pagInput.value;


    refApagar.orderByChild('pag').equalTo(pag).on('child_added', snapshot =>{
       
    adicionaNotaATela(snapshot.val(), snapshot.key);
    vl += parseFloat(snapshot.val().vlr);

    })

    setTimeout(function (){
    
        document.getElementById("result").innerText = `Valor total: ${vl.toFixed(2)} R$`;
    }, 2000)

    return vl;
}


function reload(){

    location.reload();
    
}


function deletar(id){

    var card = document.getElementById(id);

    refApagar.child(id).set(null).then(() =>{
        card.remove();
    })

}

function adicionaNotaATela(informacao, id) {
/**
 * LINHA DA TABELA
 */

    
    let tr = document.createElement("tr");
    tr.id = id;
    tr.setAttribute('data-bs-toggle', "collapse");
    tr.setAttribute('data-bs-target', "#"+id+"");
    tr.setAttribute('aria-expanded', "false");
    tr.setAttribute('aria-controls', ""+id+"");
    tr.classList.add('tabela');

    let divColapse = document.createElement("div")
    divColapse.id = ""+id+"";
    divColapse.classList.add('collapse', 'collapse-vertical');


    // ===================================

    /**
     * DATA DA TABELA
     */
    let tdDate = document.createElement("td");
    tdDate.innerText = informacao.dat;
    tr.appendChild(tdDate);
    // ===================================

    /**
     * MÊS DA TABELA
     */
    let tdMes = document.createElement("td");
    tdMes.innerText = informacao.mes;
    tr.appendChild(tdMes);

    /**
     * CATEGORIA DA TABELA
     */
    let tdCtg = document.createElement("td");
    tdCtg.innerText = informacao.ctg;
    tr.appendChild(tdCtg);

    /**
     * DESCRIÇÃO DA TABELA
     */
    let tdDsc = document.createElement("td");
    tdDsc.innerText = informacao.dsc;
    tr.appendChild(tdDsc);

    /**
     * CARTÃO TABELA
     */
    let tdCart = document.createElement("td");
    tdCart.innerText = informacao.cart;
    tr.appendChild(tdCart);

    /**
     * PAGAMENTO DA TABELA
     */
    let tdPag = document.createElement("td");
    tdPag.innerText = informacao.pag;
    tr.appendChild(tdPag);
    // ===================================

    // Botão de excluir
    let tdValor = document.createElement("td");
    tdValor.id = "valor"
    tdValor.innerText = informacao.vlr + " R$";
    tr.appendChild(tdValor);

    

  
    // ===================================
    /**
     * BOTÃO EXCLUIR
    */
    var excluir = document.createElement("td");
    excluir.classList.add('text-danger', 'fw-bold');
    excluir.setAttribute('onclick', "deletar('" + id + "')");
    excluir.setAttribute('type', "Submit");
    excluir.innerText = "EXCLUIR"
    divColapse.appendChild(excluir);
    //================

    nota.appendChild(tr);
    nota.appendChild(divColapse);
 }


// modal Titulos a pagar

var addModalHtml = document.querySelector("#modal");
var addBtnModalHtml = document.querySelector("#btnModal");

var addFormsApagar = document.getElementsByClassName("modal-content");

var formsApagr = firebase.database().ref("FormularioApagar");
var modalApagar = firebase.database().ref('Modal');

document.addEventListener("DOMContentLoaded", function () {

    modalApagar.orderByChild('Modal').on('child_added', snapshot =>{
         console.log();
         modalATela(snapshot.val());
      })
  
  });

function modalATela(informacao){

    /**
     * MODAL FADER
     */


    let modalFade = document.createElement("div");
    modalFade.id = "exampleModal"
    modalFade.classList.add('modal', 'fade');
    modalFade.setAttribute('tabindex', "-1");
    modalFade.setAttribute('aria-labelledby', "exampleModalLabel");
    modalFade.setAttribute('aria-hidden', "true");
    // console.log(addModalHtml);
    /**
     * MODAL DIALOG
     */

    let modalDialog = document.createElement("div");
    modalDialog.classList.add('modal-dialog');
    modalFade.appendChild(modalDialog);

    /**
     * MODAL CONTENT
     */

    let modalContent = document.createElement("div");
    modalContent.classList.add('modal-content', 'position-relative');
    modalDialog.appendChild(modalContent);

    /**
     * MODAL HEADER
     */

    let modalHeader = document.createElement("div");
    modalHeader.classList.add('modal-header');
    modalContent.appendChild(modalHeader);

    let h5 = document.createElement("h5");
    h5.classList.add('modal-title');
    h5.id = "exampleModalLabel";
    h5.innerText = informacao.tit;
    modalHeader.appendChild(h5);

    /**
     * MODAL BODY --> MODAL CONTENT
     */

     let body = document.createElement("div");
     body.classList.add('modal-body');
     body.innerText = informacao.dsc;
     modalContent.appendChild(body);

    /**
     * MODAL FORMULÁRIO A PAGAR
     */

     let formApagar = document.createElement("div");
     formApagar.id = "modal-content";
     modalContent.appendChild(formApagar);

     let data = document.createElement("input");
     data.id = "data1";
     data.classList.add('form-control', 'd-flex');
     data.setAttribute('type', "date");
     data.setAttribute('placeholder', "Data");
     formApagar.appendChild(data);

     /**
      * FORMULÁRIO DE SELEÇÃO DE MÊS
      */
     let selectMes = document.createElement("select")
     selectMes.id = "mes";
     selectMes.classList.add("form-select");
     selectMes.setAttribute('aria-label',"Default select example");
     formApagar.appendChild(selectMes);

     let optionsMes = document.createElement("option");
     optionsMes.innerText = "Selecione o mês";
     selectMes.appendChild(optionsMes);

     let optionsJan = document.createElement("option");
     optionsJan.setAttribute('value', "Janeiro");
     optionsJan.innerText = "Janeiro";
     selectMes.appendChild(optionsJan);

     let optionsFev = document.createElement("option");
     optionsFev.setAttribute('value', "Fevereiro");
     optionsFev.innerText = "Fevereiro";
     selectMes.appendChild(optionsFev);

     let optionsMar = document.createElement("option");
     optionsMar.setAttribute('value', "Março");
     optionsMar.innerText = "Março";
     selectMes.appendChild(optionsMar);

     let optionsAbr = document.createElement("option");
     optionsAbr.setAttribute('value', "Abril");
     optionsAbr.innerText = "Abril";
     selectMes.appendChild(optionsAbr);

     let optionsMai = document.createElement("option");
     optionsMai.setAttribute('value', "Maio");
     optionsMai.innerText = "Maio";
     selectMes.appendChild(optionsMai);

     let optionsJun = document.createElement("option");
     optionsJun.setAttribute('value', "Junho");
     optionsJun.innerText = "Junho";
     selectMes.appendChild(optionsJun);

     let optionsJul = document.createElement("option");
     optionsJul.setAttribute('value', "Julho");
     optionsJul.innerText = "Julho";
     selectMes.appendChild(optionsJul);

     let optionsAgo = document.createElement("option");
     optionsAgo.setAttribute('value', "Agosto");
     optionsAgo.innerText = "Agosto";
     selectMes.appendChild(optionsAgo);

     let optionsSet = document.createElement("option");
     optionsSet.setAttribute('value', "Setembro");
     optionsSet.innerText = "Setembro";
     selectMes.appendChild(optionsSet);

     let optionsOut = document.createElement("option");
     optionsOut.setAttribute('value', "Outubro");
     optionsOut.innerText = "Outubro";
     selectMes.appendChild(optionsOut);

     let optionsNov = document.createElement("option");
     optionsNov.setAttribute('value', "Novembro");
     optionsNov.innerText = "Novembro";
     selectMes.appendChild(optionsNov);

     let optionsDez = document.createElement("option");
     optionsDez.setAttribute('value', "Dezembro");
     optionsDez.innerText = "Dezembro";
     selectMes.appendChild(optionsDez);
    // ================================

    let selectCtg = document.createElement("select")
     selectCtg.id = "categoria";
     selectCtg.classList.add("form-select");
     selectCtg.setAttribute('aria-label',"Default select example");
     formApagar.appendChild(selectCtg);

     let optionsCtg = document.createElement("option");
     optionsCtg.innerText = "Selecione a categoria";
     selectCtg.appendChild(optionsCtg);

     let optionsLanche = document.createElement("option");
     optionsLanche.setAttribute('value', "Lanche");
     optionsLanche.innerText = "Lanche";
     selectCtg.appendChild(optionsLanche);

     let optionsConstr = document.createElement("option");
     optionsConstr.setAttribute('value', "Construção");
     optionsConstr.innerText = "Construção";
     selectCtg.appendChild(optionsConstr);

     let optionsMerc = document.createElement("option");
     optionsMerc.setAttribute('value', "Mercado");
     optionsMerc.innerText = "Mercado";
     selectCtg.appendChild(optionsMerc);

     let optionsMoto = document.createElement("option");
     optionsMoto.setAttribute('value', "Moto");
     optionsMoto.innerText = "Moto";
     selectCtg.appendChild(optionsMoto);

     let optionsUber = document.createElement("option");
     optionsUber.setAttribute('value', "Uber");
     optionsUber.innerText = "Uber";
     selectCtg.appendChild(optionsUber);

     let optionsRoup = document.createElement("option");
     optionsRoup.setAttribute('value', "Roupas");
     optionsRoup.innerText = "Roupas";
     selectCtg.appendChild(optionsRoup);

     let optionsBelez = document.createElement("option");
     optionsBelez.setAttribute('value', "Beleza");
     optionsBelez.innerText = "Beleza";
     selectCtg.appendChild(optionsBelez);

     let optionsPass = document.createElement("option");
     optionsPass.setAttribute('value', "Passeio");
     optionsPass.innerText = "Passeio";
     selectCtg.appendChild(optionsPass);

     let optionsViag = document.createElement("option");
     optionsViag.setAttribute('value', "Viagem");
     optionsViag.innerText = "Viagem";
     selectCtg.appendChild(optionsViag);

     let optionsOutr = document.createElement("option");
     optionsOutr.setAttribute('value', "Outro");
     optionsOutr.innerText = "Outro";
     selectCtg.appendChild(optionsOutr);
    //  ================================
    /**
     * INPUT DESCRIÇÃO
     */

    let inputDsc = document.createElement("input")
    inputDsc.id = "descricao";
    inputDsc.classList.add('form-control', 'd-flex');
    inputDsc.setAttribute('type',"text");
    inputDsc.setAttribute('placeholder',"Descrição");
    formApagar.appendChild(inputDsc);
    //=================================
    /**
     * INPUT PAGAMENTO
     */

    let selectPag = document.createElement("select")
     selectPag.id = "pagamento";
     selectPag.classList.add("form-select");
     selectPag.setAttribute('aria-label',"Default select example");
     formApagar.appendChild(selectPag);

     let optionsPag = document.createElement("option");
     optionsPag.innerText = "Selecione o pagamento";
     selectPag.appendChild(optionsPag);

     let optionsAvista = document.createElement("option");
     optionsAvista.setAttribute('value', "A vista");
     optionsAvista.innerText = "A vista";
     selectPag.appendChild(optionsAvista);

     let optionsDebito = document.createElement("option");
     optionsDebito.setAttribute('value', "Débito");
     optionsDebito.innerText = "Débito";
     selectPag.appendChild(optionsDebito);

     let optionsCredito = document.createElement("option");
     optionsCredito.setAttribute('value', "Crédito");
     optionsCredito.innerText = "Crédito";
     selectPag.appendChild(optionsCredito);
    //=====================================
    /**
     * INPUT VALOR
     */

    let inputVlr = document.createElement("input")
    inputVlr.id = "valor";
    inputVlr.classList.add('form-control', 'd-flex');
    inputVlr.setAttribute('type',"number");
    inputVlr.setAttribute('placeholder',"Valor");
    formApagar.appendChild(inputVlr);
    //============================================

    let btnCriaApag = document.createElement("Button")
    btnCriaApag.classList.add('btn', "btn-success");
    btnCriaApag.setAttribute('type',"button");
    btnCriaApag.setAttribute('onclick',"criarCard()");
    btnCriaApag.innerText = "Adicionar Título";
    formApagar.appendChild(btnCriaApag);
    
    // col-md-6 offset-md-3

    /**
     * MODAL FOOTER
     */

    let footer = document.createElement("div");
    footer.classList.add('modal-footer');
    modalContent.appendChild(footer);

    /**
     * MODAL BOTÕES
     */

    let butClose = document.createElement("button");
    butClose.classList.add('btn', 'btn-danger');
    butClose.setAttribute('type', "button");
    butClose.setAttribute('data-bs-dismiss', "modal");
    butClose.innerText = "Fechar";
    footer.appendChild(butClose);

    let butModal = document.createElement("button")
    butModal.classList.add('btn', 'btn-primary');
    butModal.setAttribute('type', "button");
    butModal.setAttribute('data-bs-toggle', "modal");
    butModal.setAttribute('data-bs-target', "#exampleModal");
    butModal.innerText = informacao.btn;

    addModalHtml.appendChild(modalFade);
    addBtnModalHtml.appendChild(butModal);

}

// AGENDAMENTO

var genderHtml = document.getElementsByClassName("agende")[0];
var genderCard = document.querySelector("#agendeCard");


var genderBdGen = firebase.database().ref('Agendamentos/Agendamento');
var genderBdVal = firebase.database().ref('Agendamentos/Validação/Formulário');


// tabAreaComp

    var datGenderInp = document.getElementById("dateGenderSet");
    var nameGenderInp = document.getElementById("nameGenderSet");
    var telGenderInp = document.getElementById("telGenderSet");
    var semGenderInp = document.getElementById("semana");
    var horGenderInp = document.getElementById("hora");

    

function creatGender() {

    var datGenderInp = document.getElementById("dateGenderSet");
    var nameGenderInp = document.getElementById("nameGenderSet");
    var telGenderInp = document.getElementById("telGenderSet");
    var semGenderInp = document.getElementById("semana");
    var horGenderInp = document.getElementById("hora");

    var gender = {
    datGender: datGenderInp.value,
    semGender: semGenderInp.value,
    horGender: horGenderInp.value,
    nameGender: nameGenderInp.value,
    telGender: telGenderInp.value,
    buttonDel: "delCard"
    };



    genderBdGen.push(gender).then(snapshot =>{
        // console.log(gender);
        
    //    adicionaNotaATela(gender, snapshot.key);
            
       })

       location.reload();
    //    alert('Agendado!');
   
};



document.addEventListener("DOMContentLoaded", function () {

   
    genderBdVal.orderByChild("Agendamentos/Validação/Formulário").on('child_added', snapshot =>{
        console.log();
        genderForm(snapshot.val());
        
     });


    genderBdGen.orderByChild("Agendamentos/Agendamento").on('child_added', snapshot =>{
        console.log();

        if(snapshot.exists()){

            // alert("Você tem um agendamento");
            document.getElementById("nav-login-tab").classList.add('bg-success');
        }

            addGenderCard(snapshot.val(), snapshot.key);

       

       
        

     });


});


// DATA ATUAL

        var monName = new Array ("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
        var now = new Date;
        var dateCurrent = ""+  now.getFullYear () +"-" + monName [now.getMonth() ]  +  "-" + ("0" + now.getDate()).slice(-2) +"";

        // $(function(){
   
        //     $("#Data").on("change", function(){
               
        //        var d = this.value.split("-");
        //        var data = new Date(d[0], d[1]-1, d[2]).getDay();
        //        var dia_semana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'][data];
        //        $("#semana").val(dia_semana);
               
        //     }).change();
            
        //  });
        //  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        //  <strong><label for="Data">Data Reserva</label></strong>
        //  <input type="date" id="Data" name="Data" value="2019-04-23"/>
        //  <br>
        //  <strong><label for="Dia">Dia da Semana/Utilização</label></strong>
        //  <input type="text" id="Dia" name="Dia" style="width:220px"/>
    


function genderForm(informacao, id) {

    // console.log(genderHtml);
    
   

    let divForm = document.createElement("div");
    divForm.classList.add('row', 'text-center', 'col-md-6', 'offset-md-3', 'border');

    let tit = document.createElement("h2");
    tit.innerText = "Agende seu horário";
    divForm.appendChild(tit);
    

    let divFloatDate = document.createElement("div");
    divFloatDate.classList.add('form-floating', 'col-md-6', 'offset-md-3');
    divForm.appendChild(divFloatDate);


    let floatDate = document.createElement("input");
    floatDate.id = "dateGenderSet";
    floatDate.classList.add('form-control');
    floatDate.setAttribute('type', "date");
    floatDate.setAttribute('placeholder', "dateGenderSet");
    divFloatDate.appendChild(floatDate);

    let labelDategen = document.createElement("label");
    labelDategen.setAttribute('for', "floatingInput");
    labelDategen.innerText = "Data";
    divFloatDate.appendChild(labelDategen);

    /**
      * SELEÇÃO DE SEMANA
      */

     let divFloatSem = document.createElement("div");
     divFloatSem.classList.add('form-floating', 'col-md-6', 'offset-md-3', 'text-center');
     divForm.appendChild(divFloatSem);

     let selectSem = document.createElement("input")
     selectSem.id = "semana";
     selectSem.classList.add("form-control");
     selectSem.setAttribute('type',"text");
     selectSem.setAttribute('name',"semana");
     divFloatSem.appendChild(selectSem);

     let labelSem = document.createElement("label");
    labelSem.setAttribute('for', "floatingInput");
    labelSem.innerText = "Dia da Semana";
    divFloatSem.appendChild(labelSem);

        $(function(){
    
            $("#dateGenderSet").on("change", function(){
            
            var d = this.value.split("-");
            var data = new Date(d[0], d[1]-1, d[2]).getDay();
            var dia_semana = ['DOMINGO', 'SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'][data];
            $("#semana").val(dia_semana);
            
            }).change();
            
        });

    /**
      * SELEÇÃO DE HORÁRIO
      */

     let divFloaHor = document.createElement("div");
     divFloaHor.classList.add('form-floating', 'col-md-6', 'offset-md-3');
     divForm.appendChild(divFloaHor);

     let selectHor = document.createElement("select")
     selectHor.id = "hora";
     selectHor.classList.add("form-select");
     selectHor.setAttribute('aria-label',"Default select example");
     divFloaHor.appendChild(selectHor);

     let optionsHor = document.createElement("option");
     optionsHor.innerText = "Selecione A hora";
     selectHor.appendChild(optionsHor);

     let optionsHor01 = document.createElement("option");
     optionsHor01.setAttribute('value', "08:00 - 09:00");
     optionsHor01.innerText = "08:00 - 09:00";
     selectHor.appendChild(optionsHor01);

     let optionsHor02 = document.createElement("option");
     optionsHor02.setAttribute('value', "10:00 - 11:00");
     optionsHor02.innerText = "10:00 - 11:00";
     selectHor.appendChild(optionsHor02);

     let optionsHor03 = document.createElement("option");
     optionsHor03.setAttribute('value', "14:00 - 15:00");
     optionsHor03.innerText = "14:00 - 15:00";
     selectHor.appendChild(optionsHor03);

     let optionsHor04 = document.createElement("option");
     optionsHor04.setAttribute('value', "16:00 - 17:00");
     optionsHor04.innerText = "16:00 - 17:00";
     selectHor.appendChild(optionsHor04);

     let labelHor = document.createElement("label");
     labelHor.setAttribute('for', "floatingInput");
     labelHor.innerText = "Selecione o horário";
     divFloaHor.appendChild(labelHor);
    //==================================

    let divFloatName = document.createElement("div");
    divFloatName.classList.add('form-floating', 'col-md-6', 'offset-md-3');
    divForm.appendChild(divFloatName);

    let floatName = document.createElement("input");
    floatName.id = "nameGenderSet";
    floatName.classList.add('form-control');
    floatName.setAttribute('type', "text");
    floatName.setAttribute('placeholder', "Nome");
    divFloatName.appendChild(floatName);

    let labelNamegen = document.createElement("label");
    labelNamegen.setAttribute('for', "floatingInput");
    labelNamegen.innerText = "Nome";
    divFloatName.appendChild(labelNamegen);
    //==================================

    let divFloatTel = document.createElement("div");
    divFloatTel.classList.add('form-floating', 'col-md-6', 'offset-md-3');
    divForm.appendChild(divFloatTel);

    let floatTel = document.createElement("input");
    floatTel.id = "telGenderSet";
    floatTel.classList.add('form-control');
    floatTel.setAttribute('type', "number");
    floatTel.setAttribute('placeholder', ""+informacao.telGender+"");
    divFloatTel.appendChild(floatTel);

    let labelTelgen = document.createElement("label");
    labelTelgen.setAttribute('for', "floatingInput");
    labelTelgen.innerText = "Telefone";
    divFloatTel.appendChild(labelTelgen);


    
    // ==================================

    let btnCreatGender = document.createElement("Button")
    btnCreatGender.classList.add('btn', "btn-success", 'col-3', 'text-center');
    btnCreatGender.setAttribute('type',"reset");
    btnCreatGender.setAttribute('onclick',"creatGender()");
    btnCreatGender.innerText = "Agendar";
    divFloatTel.appendChild(btnCreatGender);



    genderHtml.appendChild(divForm);
    
}

function delCard(id){

    var gender = document.getElementById(id);

    genderBdGen.child(id).set(null).then(() =>{
        gender.remove();
    })
    

}

function addGenderCard(informacao, id){

    let br = document.createElement("br");
    genderCard.appendChild(br);

    let br1 = document.createElement("br");
    genderCard.appendChild(br1);


    let divCard = document.createElement("div");
    divCard.id = id;
    divCard.classList.add('card', 'text-dark', 'bg-light', 'col-4');
    // divCard.setAttribute('style',"max-width: 18rem;");

    let divCardHaeder = document.createElement("div");
    divCardHaeder.classList.add('card-header');
    divCardHaeder.innerText = informacao.nameGender;
    divCard.appendChild(divCardHaeder);

    let divBody = document.createElement("div");
    divBody.classList.add('card-body', 'text-center');
    divCard.appendChild(divBody);

    let h5 = document.createElement("h5");
    h5.innerText = informacao.datGender;
    divBody.appendChild(h5);


        var hor = informacao.horGender;
        var sem = informacao.semGender;
        var dat = informacao.datGender;
        var nam = informacao.nameGender;
        var tel = informacao.telGender;
   

        if(dateCurrent > dat){
            
            genderBdGen.child(id).set(null).then(() =>{

                gender.remove();

            });

        };
        

    let p = document.createElement("p");
    p.innerText = informacao.telGender;
    divBody.appendChild(p);

    let semana = document.createElement("p");
    semana.innerText = informacao.semGender;
    divBody.appendChild(semana);

    let hora = document.createElement("p");
    hora.innerText = informacao.horGender;
    divBody.appendChild(hora);

    let buttDel = document.createElement("button");
    buttDel.classList.add('btn', 'btn-danger');
    buttDel.setAttribute('type', "button");
    buttDel.setAttribute('onclick', ""+informacao.buttonDel+"('" + id + "')");
    buttDel.innerText = "Deletar";
    divBody.appendChild(buttDel);

    

    genderCard.appendChild(divCard);
}

// Questionário logomarca

var question = firebase.database().ref('Questionario');



function creatPerg(){

    


        var pergInp = document.getElementById("userLogin1");
        var perg01Inp = document.getElementById("pergunta01");
        var perg02Inp = document.getElementById("pergunta02");
        var perg03Inp = document.getElementById("pergunta03");
        var perg04Inp = document.getElementById("pergunta04");
        var perg05Inp = document.getElementById("pergunta05");
        var perg06Inp = document.getElementById("pergunta06");
        var perg07Inp = document.getElementById("pergunta07");
        var perg08Inp = document.getElementById("pergunta08");
        var perg09Inp = document.getElementById("pergunta09");
        var perg10Inp = document.getElementById("pergunta10");
        var perg11Inp = document.getElementById("pergunta11");
        var perg12Inp = document.getElementById("pergunta12");
        var perg13Inp = document.getElementById("pergunta13");
        var perg14Inp = document.getElementById("pergunta14");
        var perg15Inp = document.getElementById("pergunta15");
        var perg16Inp = document.getElementById("pergunta16");
        var perg17Inp = document.getElementById("pergunta17");
        var perg18Inp = document.getElementById("pergunta18");
        var perg19Inp = document.getElementById("pergunta19");
       


      var  perguntas = {
          perg: pergInp.innerText,
          perg01 : perg01Inp.value,
          perg02 : perg02Inp.value,
          perg03 : perg03Inp.value,
          perg04 : perg04Inp.value,
          perg05 : perg05Inp.value,
          perg06 : perg06Inp.value,
          perg07 : perg07Inp.value,
          perg08 : perg08Inp.value,
          perg09 : perg09Inp.value,
          perg10 : perg10Inp.value,
          perg11 : perg11Inp.value,
          perg12 : perg12Inp.value,
          perg13 : perg13Inp.value,
          perg14 : perg14Inp.value,
          perg15 : perg15Inp.value,
          perg16 : perg16Inp.value,
          perg17 : perg17Inp.value,
          perg18 : perg18Inp.value,
          perg19 : perg19Inp.value

      }



      question.push(perguntas).then(snapshot =>{
        // console.log(gender);
        
    //    adicionaNotaATela(gender, snapshot.key);
            
       })

       location.reload();
       alert('Questionário Enviado!');
   
};
