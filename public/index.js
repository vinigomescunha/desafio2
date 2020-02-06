const serverUrl = '';
const hideForms = () => {
  Array.from(document.querySelectorAll('form.form-actions')).forEach(f => {
    f.style.display = 'none';
  });
}
const goToLogin = () => {
  hideForms();
  document.querySelector(`[login-form]`).style.display = 'block';
}
const actionButtons = {
  'cadastro': (ev) => { // caso surja necessidade
  },
  'login': (ev) => { // caso surja necessidade
  }
};
const fetchData = (form, url) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let raw = JSON.stringify(form);
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  return fetch(url, requestOptions);
}
Object.keys(actionButtons).forEach(a => {
  try {
    const el = document.querySelector(`[${a}]`);
    if (el) {
      el.addEventListener('click', (ev) => {
        hideForms();
        ev.preventDefault();
        document.querySelector(`[${a}-form]`).style.display = 'block';
        actionButtons[a].call(this, ev);
      });
    }
  } catch (e) {
    // Erro!
  }
});
hideForms();
const formsActions = {
  'login-form': ev => {
    const target = ev.target;
    const email = target.querySelector('[login-email]').value;
    const token = target.querySelector('[login-token]').value;
    fetchData({
        email,
        token
      }, `${serverUrl}/login`)
      .then(d => d.json())
      .then(d => { console.log('d', d)
        if (d.success) {
          window.location.href = `${serverUrl}/aluno/${d.id}`;
        }
      });

  },
  'cadastro-form': ev => {
    const target = ev.target;
    const nome = target.querySelector('[cadastro-nome]').value;
    const email = target.querySelector('[cadastro-email]').value;
    const token = target.querySelector('[cadastro-token]').value;
    fetchData({
        nome,
        email,
        token
      }, `${serverUrl}/cadastro`)
      .then(d => d.json())
      .then(d => {
        if (d.success) {
          setTimeout(() => {
            goToLogin();
          }, 100)
        }
      });
  }
};
Object.keys(formsActions).forEach(f => {
  const form = document.querySelector(`[${f}]`);
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    formsActions[f].call(this, ev);
  });

});
goToLogin();
