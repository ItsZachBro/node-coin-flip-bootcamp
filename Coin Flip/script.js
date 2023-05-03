async function flipCoin() {
    const response = await fetch('/coin-flip');
    const data = await response.json();
    document.getElementById('result').textContent = data.result;
    const imageUrl = data.result === 'HEADS' ? 'heads.gif' : 'tails.gif';
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.querySelector('h1').style.display = 'none';
  }