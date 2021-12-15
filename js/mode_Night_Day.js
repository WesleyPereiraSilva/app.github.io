// Pre loader

//<![CDATA[

    $(window).on('load', function () {
        setTimeout(() => {
            
                $('#preloader .inner').fadeOut();
                $('#preloader').delay(350).fadeOut('slow'); 
                $('body').delay(350).css({'overflow': 'visible'});
                       
        }, 3000);
    })
   
    //]]>

// autenticação

function loginGoogle() {

    var provider = new firebase.auth.GoogleAuthProvider();
    console.log(provider);
    
    firebase.auth().signInWithPopup(provider).then(()=>{

        console.log('usuario', resposta.user);
        console.log('token', resposta.credetial.acessToken);

    }).catch(erro =>{
        console.log('erro', erro);
    });

    setTimeout(function () {
        window.location.reload();
    }, 5000);

}

var refLogin = firebase.database().ref('Users');


function createLogin() {
    var nome5 = document.getElementById("nomeLogin").value;
    var email5 = document.getElementById("email").value;
    var senha5= document.getElementById("senha").value;

    var login = {
        nomeVl: nome5,
        emailVl: email5,
        senhaVl: senha5
    }

    if(email5 == "" || senha5 == "" || nome5 == ""){

        alert("Preencha o campo vazio!");

    }else{

        refLogin.push(login).then(snapshot => {
            // addCardATela(value.val(), value.key);  
        firebase.auth().createUserWithEmailAndPassword(email5, senha5).then(user => {
    
            setTimeout(function () {
                window.location.reload();
            }, 800);
    
        }).catch(err => {
            console.log('error', error);
        });

    
        });
    
 
    }  

    setTimeout(function () {
        window.location.reload();
    }, 3000);

}

function loginEmail() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    if(email == "" || senha == ""){

        alert("Preencha o campo vazio!");

    }else{

        firebase.auth().signInWithEmailAndPassword(email, senha).then(() => {

            setTimeout(function () {
                window.location.reload();
            }, 800);
    
        }).catch(err => {
            console.log('error', err);
    
            alert('Login ou Senha incorreta!', err);
        });
        
    }

}

function logout() {

    firebase.auth().signOut().then(() => {

       
        setTimeout(function () {
            location.reload();
        }, 800);



    });
};

document.addEventListener("DOMContentLoaded", function () {

    firebase.auth().onAuthStateChanged((usuario) => {
        if (usuario) {
         
            document.getElementById("statusUserLogin").innerText = "Seja Bem Vindo";
            document.getElementById("userLogin1").innerText = usuario.email;

        } else {
           
            document.getElementById("statusUserLogout").innerText = "O seu usuário não está logado: logue-se para ver mais recursos.";

        }
    })


});

function reload(){

    setTimeout(function () {
        location.reload();
    }, 800);

};

/**
 * Listener de dom ready
 */
 document.addEventListener("DOMContentLoaded", function () {
    // nova instância do firebaseui
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    // configurações do firebaseui
    var config = {
        callbacks : {
            singInSuccessWithAutResult: function(authResult){

                console.log('authResult', authResult)
                return false;
                
            }
        },
        signInOptions: [
            //  firebase.auth.EmailAuthProvider.PROVIDER_ID,
            //  firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            //  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            //  firebase.auth.GithubAuthProvider.PROVIDER_ID,
             {
                 provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                 defaultCountry: 'BR'
             }
        ],
        signInFlow: 'popup'

    };

    //inicializa o firebase UI
    ui.start('#firebaseui-auth', config);


 });



// cards menu principal

var body = document.getElementsByClassName('homeImg')[0];

var NOMES = ["Anderson", "Beatriz", "Caio", "Daniela", "Everton", "Fabiana", "Gabriel", "Hortencia", "Igor", "Joana"];
var cards = [];

var refHomeImg = firebase.database().ref('HomeImg');

function criarCard() {
    inputCtg = document.getElementById('inputGroupSelect04');
    inputImg = document.getElementById('imagem');
    inputTit = document.getElementById('titulo');
    inputDsc = document.getElementById('descricao');

    var cards = {
        ctg: inputCtg.value,
        imgScr: inputImg.value,
        tit: inputTit.value,
        dsc: inputDsc.value
    }

    refHomeImg.push(cards).then(snapshot => {
        // addCardATela(value.val(), value.key);

    })
}




document.addEventListener("DOMContentLoaded", function () {

    refHomeImg.orderByChild('HomeImg').on('child_added', snapshot => {
        console.log();
        addHomeImg(snapshot.val(), snapshot.key);
    })


});

function addHomeImg(informacao, id) {

    //DIV ROW
    let content = document.createElement('div');
    content.id = id;
    content.classList.add('col-4');
    // console.log(body)
    //==========================================
    //DIV COL
    let div_col = document.createElement('div');
    div_col.id = 'col';
    content.appendChild(div_col);
    //==========================================
    //img
    let img = document.createElement('img');
    img.setAttribute('src', "" + informacao.imgScr + "");
    img.classList.add('img-fluid', 'ms-auto');
    div_col.appendChild(img);
    //==========================================
    //body text
    let text_body = document.createElement('div');
    text_body.classList.add('card-body', 'text-center');
    div_col.appendChild(text_body);
    //==========================================
    //card titulo
    let titulo = document.createElement('h5');
    titulo.classList.add('card-title');
    titulo.innerText = informacao.tit;
    text_body.appendChild(titulo);
    //=========================================
    //card text
    let text1 = document.createElement('p');
    text1.classList.add('card-text');
    text1.innerText = informacao.dsc;
    text_body.appendChild(text1);
    //=========================================

    body.appendChild(content);

}

homeItem = document.getElementsByClassName("homeItem")[0];

var refHomeItem = firebase.database().ref('HomeItem');


document.addEventListener("DOMContentLoaded", function () {

    refHomeItem.orderByChild('HomeItem').on('child_added', snapshot => {
        console.log();
        addHomeItem(snapshot.val());
    })


});

function addHomeItem(informacao) {

    //==========================================
    //DIV COL
    let div = document.createElement("div");

    let br = document.createElement("br");
    homeItem.appendChild(br);

    let br1 = document.createElement("br");
    homeItem.appendChild(br1);

    let h2 = document.createElement("h2");
    h2.innerText = informacao.tit1;
    div.appendChild(h2);

    let hr = document.createElement("hr");
    homeItem.appendChild(hr);

    //==========================================
    let row = document.createElement("div")
    row.classList.add('row', 'd-flex', 'justify-content-center');
    div.appendChild(row);

    let col3 = document.createElement("div");
    col3.classList.add("col-4");
    row.appendChild(col3);

    //img
    let img = document.createElement('img');
    img.setAttribute('src', "" + informacao.imgScr + "");
    img.classList.add('img-fluid', 'ms-auto');
    col3.appendChild(img);
    //==========================================
    let col8 = document.createElement("div");
    col8.classList.add('col-8');
    row.appendChild(col8);

    let p = document.createElement("h5");
    p.classList.add('text-center');
    p.innerText = informacao.dsc;
    col8.appendChild(p);


    homeItem.appendChild(div);

}

// caricaturas

var refCar = firebase.database().ref('Caricatura');

var tabMenu = firebase.database().ref('Menu');



document.addEventListener("DOMContentLoaded", function () {

    refCar.orderByChild('Caricatura').on('child_added', snapshot => {
        console.log();
        addCaricaturATela(snapshot.val(), snapshot.key);
    });

    refCont.orderByChild('Orçamento').on('child_added', snapshot => {
        console.log();
        addOrcamento(snapshot.val());
    });

    // clientes artes
    refClienteWesley.orderByChild('ÁreaCliente/Celina').on('child_added', snapshot => {
        console.log();
        addClienteATela(snapshot.val(), snapshot.key);
    });

    refClientePedro.orderByChild('ÁreaCliente/Pedro').on('child_added', snapshot => {
        console.log();
        addClienteATela(snapshot.val(), snapshot.key);
    });

    refClienteEmyle.orderByChild('ÁreaCliente/Emyle').on('child_added', snapshot => {
        console.log();
        addClienteATela(snapshot.val(), snapshot.key);
    });

    refClienteWesleySv.orderByChild('ÁreaCliente/Silviane').on('child_added', snapshot => {
        console.log();
        addClienteATela(snapshot.val(), snapshot.key);
    });

    refClienteCvLuxx.orderByChild('ÁreaCliente/CurvasDeLuxxo').on('child_added', snapshot => {
        console.log();
        addClienteATela(snapshot.val(), snapshot.key);
    });

    tabMenu.orderByChild('Menu/Compromissos').on('child_added', snapshot => {
        console.log();
        menuTab(snapshot.val());
        areaTab(snapshot.val());
    });

    //Clientes videos

    refClienteWesleyVd.orderByChild('ÁreaCliente/CelinaVideo').on('child_added', snapshot => {
        console.log();
        addClienteVideo(snapshot.val(), snapshot.key);
    });

   

});

var refClienteWesleyVd = firebase.database().ref('ÁreaCliente/CelinaVideo');
var refClienteWesley = firebase.database().ref('ÁreaCliente/Celina');
var refClienteWesleySv = firebase.database().ref('ÁreaCliente/Silviane');
var refClienteCvLuxx = firebase.database().ref('ÁreaCliente/CurvasDeLuxxo');
var refClientePedro = firebase.database().ref('ÁreaCliente/Pedro');
refClienteEmyle = firebase.database().ref('ÁreaCliente/Emyle');


function addCaricaturATela(informacao, id) {

    /**
     * DIV COL
     */
    let div_col_sm = document.createElement("div");
    div_col_sm.classList.add('col-4');
    div_col_sm.id = id;
    // ===========================
    /**
     * ESPAÇO SUPERIOR
     */
    let br = document.createElement("br");
    div_col_sm.appendChild(br);
    //
    let br2 = document.createElement("br");
    div_col_sm.appendChild(br2);

    // ===========================
    /**
     * imagem
     */
    let img = document.createElement("img");
    img.setAttribute('src', "" + informacao.imgScr + "");
    img.classList.add('img-fluid', 'ms-auto');
    div_col_sm.appendChild(img);
    // ===========================
    /**
     * div paragrafo descrição da imagem
     */
    let div_parag = document.createElement("div");
    div_parag.classList.add('text-center');
    div_col_sm.appendChild(div_parag);
    // paragrafo
    let parag = document.createElement("p");
    parag.classList.add('text-center');
    parag.innerText = informacao.dsc;
    div_parag.appendChild(parag);
    // ============================
    /**
     * div Titulo da imagem
     */
    let div_tit = document.createElement("div");
    div_tit.classList.add('text-center');
    div_col_sm.appendChild(div_tit);
    //
    let h3 = document.createElement("h3");
    h3.innerText = informacao.tit
    div_tit.appendChild(h3);
    //
    let parag1 = document.createElement("p");
    parag1.innerText = informacao.post;
    div_tit.appendChild(parag1);
    // =============================

    caricature.appendChild(div_col_sm);

}

var caricature = document.querySelector('#caricature');

// ORÇAMENTO

var getMsg = document.getElementsByClassName('nome1')[0];

var refCont = firebase.database().ref('Orçamento');

function criarOrcamento() {
    var inputNom = document.getElementById('nome').value;
    var inputTel = document.getElementById('telefone').value;
    var inputMsg = document.getElementById('mensagem').value;

    var contato = {
        nom: inputNom,
        tel: inputTel,
        msg: inputMsg
    }

    if(inputNom === "" || inputTel === "" || inputMsg === ""){

        alert("Preencha o campo vazio!");

    }else{

        refCont.push(contato).then(snapshot => {
            // addCardATela(value.val(), value.key);
    
        })

    }

    
}


function addOrcamento(informacao) {

    let liveAlert = document.createElement("div")
    liveAlert.classList.add('alert', 'alert-primary', 'alert-dismissible');
    liveAlert.setAttribute('role', "alert");
    liveAlert.id = "liveAlert";
    liveAlert.innerText = "Mensagem: " + " " + informacao.msg + " ";


    let br = document.createElement("br");
    liveAlert.appendChild(br);

    let br1 = document.createElement("br");
    liveAlert.appendChild(br1);

    let strong = document.createElement("strong")
    strong.innerText = "Autor: " + informacao.nom;
    liveAlert.appendChild(strong);

    let button = document.createElement("button")
    button.classList.add('btn-close');
    button.setAttribute('type', "button", 'aria-label', "Close")
    button.setAttribute('data-bs-dismiss', "alert")
    liveAlert.appendChild(button);

    getMsg.appendChild(liveAlert);
};

// ÁREA DO CLIENTE


function addClienteATela(informacao, id) {

    /**
     * DIV COL
     */
    let div_col_sm = document.createElement("div");
    div_col_sm.classList.add('col-4');
    div_col_sm.id = id
    // ===========================
    /**
     * ESPAÇO SUPERIOR
     */
    let br = document.createElement("br");
    div_col_sm.appendChild(br);
    //
    let br2 = document.createElement("br");
    div_col_sm.appendChild(br2);

    // ===========================
    /**
     * imagem
     */
    let img = document.createElement("img");
    img.setAttribute('src', "" + informacao.imgScr + "");
    img.classList.add('img-fluid', 'ms-auto');
    img.classList.add("rounded-3");
    div_col_sm.appendChild(img);


    // ===========================
    /**
     * div paragrafo descrição da imagem
     */
    let div_parag = document.createElement("div");
    div_parag.classList.add('text-center');
    div_col_sm.appendChild(div_parag);
    // paragrafo
    let parag = document.createElement("p");
    parag.classList.add('text-center');
    parag.innerText = informacao.dsc;
    div_parag.appendChild(parag);
    // ============================
    /**
     * div Titulo da imagem
     */
    let div_tit = document.createElement("div");
    div_tit.classList.add('text-center');
    div_col_sm.appendChild(div_tit);
    //
    let h3 = document.createElement("h3");
    h3.innerText = informacao.tit
    div_tit.appendChild(h3);
    //
    let parag1 = document.createElement("p");
    parag1.innerText = informacao.post;
    div_tit.appendChild(parag1);
    // =============================

    /**
     * div Titulo da imagem
     */
     let div_link = document.createElement("a");
     div_link.setAttribute('href', ""+informacao.link+"");
     div_link.setAttribute('target', "_blank");
     div_col_sm.appendChild(div_link);

     let butLink = document.createElement("button")
     butLink.id = "butLink";
     butLink.classList.add('btn','btn-outline-secondary');
     butLink.innerText = "baixar Imagem";
     div_link.appendChild(butLink);



    getCliente.appendChild(div_col_sm);

}
var getCliente = document.getElementById('areaCliente');


function addClienteVideo(informacao, id) {

    let cardVd = document.createElement("div");
    cardVd.id = id;
    cardVd.classList.add('card');
    cardVd.classList.add('col-4');

    let br = document.createElement("br");
    cardVd.appendChild(br);

    let iframe = document.createElement("iframe");
    iframe.classList.add("rounded-3");
    iframe.setAttribute('src', ""+informacao.urlVd+"");
    iframe.setAttribute('width', ""+informacao.larg+"");
    iframe.setAttribute('heigth', ""+informacao.alt+"");
    iframe.setAttribute('frameborder', "0");
    iframe.setAttribute('allow', "autoplay; gyroscope; picture-in-picture");
    iframe.setAttribute('allowfullscreen', "yes");
    iframe.setAttribute('controlslist', "download");
    cardVd.appendChild(iframe);

    // <iframe src="https://drive.google.com/file/d/1gV17fwt2MT9K6uqIpeL0xfM3Sktqwrg0/preview" width="1280" height="720" allow="autoplay" controlslist="download" allowfullscreen="yes"></iframe>

    let cardBody = document.createElement("div");
    cardBody.classList.add('card-body');
    cardVd.appendChild(cardBody);

    
    let div_link = document.createElement("a");
     div_link.setAttribute('href', ""+informacao.linkVd+"");
     div_link.setAttribute('target', "_blank");
     cardBody.appendChild(div_link);

     let butLink = document.createElement("button")
     butLink.id = "butLink";
     butLink.classList.add('btn','btn-outline-secondary');
     butLink.innerText = "Baixar Video";
     div_link.appendChild(butLink);


    getClienteVd.appendChild(cardVd);

}

var getClienteVd = document.getElementById('areaClienteVideo');


// MENU COMPROMISSOS



function menuTab(informacao1){

    let butTab = document.createElement("button");
    butTab.classList.add('nav-link', 'text-dark');
    butTab.id = "nav-"+informacao1.tab+"-tab";
    butTab.setAttribute('data-bs-toggle', "tab");
    butTab.setAttribute('data-bs-target', "#nav-"+informacao1.tab+"");
    butTab.setAttribute('type', "button");
    butTab.setAttribute('role', "tab");
    butTab.setAttribute('aria-controls', "nav-"+informacao1.tab+"");
    butTab.setAttribute('aria-selected', "false");
    butTab.innerText = informacao1.tab;

    tabOrig.appendChild(butTab);

    // console.log(tabOrig);
}

var tabOrig = document.getElementById("menu_initial");


function areaTab(informacao2){


    let divTab = document.createElement("div");
    divTab.classList.add('tab-pane', 'fade', 'text-center');
    divTab.id = "nav-"+informacao2.areaTab+"";
    divTab.setAttribute('role', "tabpanel");
    divTab.setAttribute('aria-labelledby', "tab");
    divTab.setAttribute('aria-controls', "nav-"+informacao2.areaTab+"-tab");

    let tit = document.createElement("h1")
    tit.innerText = "Hello word";
    divTab.appendChild(tit);



    areaTabOrig.appendChild(divTab);

  
}


var areaTabOrig = document.getElementById("nav-tabContent");
