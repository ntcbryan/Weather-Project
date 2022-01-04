document.querySelector('.busca').addEventListener('submit', async  (event)=>{
    event.preventDefault();//Previne o comportamento padrão de enviar o formulario, ja que nao podemos deixar isso acontecer

    let input = document.querySelector('#searchInput').value; // pega o valor digitado

    //"Se input é diferente de vazio"
    if (input !== ''){
        clearInfo();
        showWarning('Carregando...')
        let url = (`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}
        &appid=fae3ec2e5dc3c875b09859047d0ed598&units=metric&lang=pt_br`);
       
        let results = await fetch(url); //pega o resultado da requisição
        let json = await results.json(); //transformou o resultado em um objeto(json)

        //na api quando não é encontrado a cidade da erro e o cod é 404, quando da certo o codigo é 200
        //esse if e para caso nao seja digitado uma cidade valida
        if(json.cod === 200){
            showInfo({
                //aqui é um objeto e estamos pegando as info do json 
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                //dentro de weather tem um array por isso tem um [0] aqui
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
            });
        }else{
            clearInfo();
            showWarning('não encontramos essa localização')
        }
    }else{}
})

//funcão para mostrar as info no html, vai receber o json e exibir 
function showInfo(json){
    showWarning('')//aqui estamos substituido a msg de "Carregando" por nada, para ela sumir

    /* aqui é as modificações no html/css */
    //aqui vai receber o nome e a estado do json da api e jogar no html
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}` 
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup:>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<spam>km/h</spam>`
    
    //quando usar a função showInfo, vai liberar o display da class resultado de none para block e ai o quadro vai aparecer
    document.querySelector('.resultado').style.display = 'block'

    //aqui é a imagem do clima q pegamos o id dela no json e mudamos pois cada link é uma img diferente
   // document.querySelector('.temp img').setAttribute('scr',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.temp img').setAttribute('src', 
    `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
}
function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none'
}
function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}