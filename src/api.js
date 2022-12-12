export const serverLogin = async (email, password) => {

    const ops = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    };

    return fetch(`https://loft-taxi.glitch.me/auth`, ops).then(response => response.json())
}

export const serverRegistration = async (email, password, name, surname) => {

    const ops = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password, name, surname}) 
    }

    return fetch(`https://loft-taxi.glitch.me/register`, ops).then(response => response.json())
}