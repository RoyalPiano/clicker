var i = 0;
function call_click() {
    var click_node = document.getElementById('click-image');
    i +=1;
    var is_bitcoin = false;
    var is_fall = false;
    if(i%11 == 0) {       
        i = 1
        if (Math.random() <=0.3) {
            is_fall = true;
            click_node.src = document.getElementById('fall').src;
            document.getElementById('title').innerText = "Какая жалость, Илон Маск запостил твит и биток упал на 10%, ты теряешь 10% своих накоплений";
        }
        else {
            document.getElementById('title').innerText = "Поздравляю, ты намайнил биткоин, получаешь x10 очков от мощности твоей фермы";
            click_node.src = document.getElementById('bitcoin').src;
            is_bitcoin = true
        }
    }
    else if (i%2 != 0) {
        document.getElementById('outOfStock').style.visibility = 'visible';
    }
    else {
        document.getElementById('outOfStock').style.visibility = 'hidden';
        click_node.src = document.getElementById('nvidia').src;
        document.getElementById('title').innerText = "Симулятор майнера"
    }
    
    var csrftoken = getCookie('csrftoken')

    click_animation(click_node, 50)

    fetch('app1/call_click/', {
        method: 'POST',
        headers: {
            "X-CSRFToken": csrftoken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            is_bitcoin: is_bitcoin,
            is_fall: is_fall
        })
    }).then(response => {
        if (response.ok) return response.json()
        else return Promise.reject(response)
    }).then(data => {
        document.getElementById('counter').innerText = data
    }).catch(err => console.log(err))    
}

function update_boost(boost_id) {
    const csrftoken = getCookie('csrftoken')

    fetch('app1/update_boost/', {
        method: 'POST',
        headers: {
            "X-CSRFToken": csrftoken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            boost_id: boost_id
        })
    }).then(response => {
        if (response.ok) return response.json()
        else return Promise.reject(response)
    }).then(data => {
        document.getElementById('counter').innerText = data.main_cycle.coins_count
        document.getElementById('click_power').innerText = data.main_cycle.click_power
        
        render_boost(data.boost)
    }).catch(err => console.log(err))
}

function render_boost(boost) {
    const button = document.getElementById(`boost_${boost.id}`)
    button.querySelector('#boost_level').innerText = boost.level
    button.querySelector('#boost_power').innerText = boost.power
    button.querySelector('#boost_price').innerText = boost.price
}

function click_animation(node, time_ms) {
    const css_time = `.0${time_ms}s`
    node.style.cssText = `transition: all ${css_time} linear; transform: scale(0.95);`
    setTimeout(function() {
        node.style.cssText = `transition: all ${css_time} linear; transform: scale(1);`
    }, time_ms)
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}